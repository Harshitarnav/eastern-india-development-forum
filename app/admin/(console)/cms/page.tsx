"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  Save,
  RefreshCw,
  CheckCircle,
  Sparkles,
  Layers,
  BarChart3,
  Settings,
  Menu,
  Database,
  Home,
  Plus,
  Trash2,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { CmsNavigationEditor } from "@/components/cms/CmsNavigationEditor";
import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";
import { CmsHomepageEditor } from "@/components/cms/CmsHomepageEditor";
import { CmsImageField } from "@/components/cms/CmsImageField";
import type { CmsSettings } from "@/lib/cms/types";

const tabs = [
  { id: "general" as const, label: "General", icon: Settings },
  { id: "hero" as const, label: "Hero", icon: Sparkles },
  { id: "homepage" as const, label: "Homepage", icon: Home },
  { id: "nav" as const, label: "Navigation", icon: Menu },
  { id: "stats" as const, label: "Stats", icon: BarChart3 },
  { id: "seed" as const, label: "Seed / Reset", icon: Database },
];

type TabId = (typeof tabs)[number]["id"];

function tabFromParam(value: string | null): TabId {
  if (
    value === "hero" ||
    value === "homepage" ||
    value === "stats" ||
    value === "nav" ||
    value === "seed"
  )
    return value;
  return "general";
}

function WebsiteCMSContent() {
  const searchParams = useSearchParams();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabId>(() =>
    tabFromParam(searchParams.get("tab"))
  );
  const [form, setForm] = useState<Partial<CmsSettings>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["cms-settings"],
    queryFn: async () => {
      const res = await fetch("/api/cms/settings");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()).settings as CmsSettings;
    },
  });

  useEffect(() => {
    setActiveTab(tabFromParam(searchParams.get("tab")));
  }, [searchParams]);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async (patch: Partial<CmsSettings>) => {
      const res = await fetch("/api/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Save failed");
      return json;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-settings"] });
      setSaveError(null);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    },
    onError: (err: Error) => {
      setSavedSuccess(false);
      setSaveError(err.message || "Save failed");
    },
  });

  const seed = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/cms/seed", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Seed failed");
      return json;
    },
    onSuccess: (json) => {
      setSeedMsg(
        `Seeded ${json.counts?.items ?? 0} items, ${json.counts?.seo ?? 0} SEO rows.`
      );
      qc.invalidateQueries();
    },
  });

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    save.mutate({
      tagline: form.tagline,
      email: form.email,
      phone: form.phone,
      name: form.name,
      shortName: form.shortName,
      poweredBy: form.poweredBy,
      headquarters: form.headquarters,
      president: form.president,
      regNo: form.regNo,
      loaderMessage: form.loaderMessage,
      loaderTagline: form.loaderTagline,
      siteUrl: form.siteUrl,
      hero: form.hero,
      logo: form.logo,
    });
  };

  const updateCta = (
    which: "primary" | "secondary" | "tertiary",
    field: "label" | "href",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      hero: {
        ...prev.hero!,
        ctas: {
          ...prev.hero!.ctas,
          [which]: { ...prev.hero!.ctas[which], [field]: value },
        },
      },
    }));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
          Website CMS
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Site identity, hero, homepage sections, navigation, and collection
          shortcuts. Changes revalidate the public site.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 shadow-xl md:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 text-gold">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-[var(--admin-text)]">
              Content Workspace
            </div>
            <div className="text-xs text-[var(--admin-muted)]">
              Server-backed CMS with site.ts fallback
            </div>
          </div>
        </div>
        {savedSuccess && (
          <span className="flex items-center gap-1 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1.5 text-xs font-bold text-emerald">
            <CheckCircle className="h-3.5 w-3.5" /> Saved
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold",
              activeTab === tab.id
                ? "bg-gold/15 text-gold"
                : "border border-[var(--admin-border)] text-[var(--admin-text)]"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <form
          onSubmit={handleSaveGeneral}
          className="space-y-4 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
        >
          <CmsImageField
            label="Site logo"
            value={String(form.logo || "/images/logo.png")}
            folder="brand"
            preview="logo"
            placeholder="/images/logo.png"
            onChange={(next) => setForm((prev) => ({ ...prev, logo: next }))}
          />
          {(
            [
              ["name", "Organisation name"],
              ["shortName", "Short name"],
              ["tagline", "Tagline"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["headquarters", "Headquarters"],
              ["president", "President"],
              ["regNo", "Registration no."],
              ["poweredBy", "Powered by"],
              ["siteUrl", "Public site URL"],
              ["loaderMessage", "Loader message"],
              ["loaderTagline", "Loader tagline"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <AdminFieldLabel>{label}</AdminFieldLabel>
              <input
                className={adminFieldClass}
                value={String(form[key] ?? "")}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
          >
            <Save className="h-4 w-4" />{" "}
            {save.isPending ? "Saving…" : savedSuccess ? "Saved ✓" : "Save settings"}
          </button>
          {saveError && <p className="text-sm text-red-500">{saveError}</p>}
        </form>
      )}

      {activeTab === "hero" && form.hero && (
        <form
          onSubmit={handleSaveGeneral}
          className="space-y-4 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
        >
          <div>
            <AdminFieldLabel>Eyebrow</AdminFieldLabel>
            <input
              className={adminFieldClass}
              value={form.hero.eyebrow}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  hero: { ...prev.hero!, eyebrow: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <AdminFieldLabel>Headline</AdminFieldLabel>
            <textarea
              className={cn(adminFieldClass, "min-h-24")}
              value={form.hero.headline}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  hero: { ...prev.hero!, headline: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <AdminFieldLabel>Subheading</AdminFieldLabel>
            <textarea
              className={cn(adminFieldClass, "min-h-28")}
              value={form.hero.subheading}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  hero: { ...prev.hero!, subheading: e.target.value },
                }))
              }
            />
          </div>
          <CmsImageField
            label="Hero banner image"
            value={String(form.hero.image || "/images/hero-banner.jpg")}
            folder="hero"
            placeholder="/images/hero-banner.jpg"
            onChange={(next) =>
              setForm((prev) => ({
                ...prev,
                hero: { ...prev.hero!, image: next },
              }))
            }
          />

          <div className="border-t border-[var(--admin-border)] pt-4 space-y-4">
            <h3 className="font-display text-base font-bold text-[var(--admin-text)]">
              Call-to-action buttons
            </h3>
            {(
              [
                ["primary", "Primary"],
                ["secondary", "Secondary"],
                ["tertiary", "Tertiary"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="grid gap-3 md:grid-cols-2">
                <div>
                  <AdminFieldLabel>{label} label</AdminFieldLabel>
                  <input
                    className={adminFieldClass}
                    value={form.hero?.ctas?.[key]?.label || ""}
                    onChange={(e) => updateCta(key, "label", e.target.value)}
                  />
                </div>
                <div>
                  <AdminFieldLabel>{label} href</AdminFieldLabel>
                  <input
                    className={adminFieldClass}
                    value={form.hero?.ctas?.[key]?.href || ""}
                    onChange={(e) => updateCta(key, "href", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--admin-border)] pt-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-base font-bold text-[var(--admin-text)]">
                Floating metrics
              </h3>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero!,
                      floatingMetrics: [
                        ...(prev.hero?.floatingMetrics || []),
                        { label: "New metric", value: "0" },
                      ],
                    },
                  }))
                }
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-bold"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {(form.hero.floatingMetrics || []).map((metric, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-xl border border-[var(--admin-border)] p-3 md:grid-cols-[1fr_1fr_auto]"
              >
                <input
                  className={adminFieldClass}
                  placeholder="Label"
                  value={metric.label}
                  onChange={(e) =>
                    setForm((prev) => {
                      const rows = [...(prev.hero?.floatingMetrics || [])];
                      rows[index] = { ...rows[index], label: e.target.value };
                      return {
                        ...prev,
                        hero: { ...prev.hero!, floatingMetrics: rows },
                      };
                    })
                  }
                />
                <input
                  className={adminFieldClass}
                  placeholder="Value"
                  value={metric.value}
                  onChange={(e) =>
                    setForm((prev) => {
                      const rows = [...(prev.hero?.floatingMetrics || [])];
                      rows[index] = { ...rows[index], value: e.target.value };
                      return {
                        ...prev,
                        hero: { ...prev.hero!, floatingMetrics: rows },
                      };
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      hero: {
                        ...prev.hero!,
                        floatingMetrics: (prev.hero?.floatingMetrics || []).filter(
                          (_, i) => i !== index
                        ),
                      },
                    }))
                  }
                  className="rounded-lg border border-red-500/30 p-2 text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
          >
            <Save className="h-4 w-4" />{" "}
            {save.isPending ? "Saving…" : savedSuccess ? "Saved ✓" : "Save hero"}
          </button>
          {saveError && <p className="text-sm text-red-500">{saveError}</p>}
        </form>
      )}

      {activeTab === "hero" && !form.hero && (
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 text-sm text-[var(--admin-muted)]">
          Loading hero settings…
        </div>
      )}

      {activeTab === "homepage" && <CmsHomepageEditor />}

      {activeTab === "nav" && <CmsNavigationEditor />}

      {activeTab === "stats" && (
        <CmsCollectionPage
          title="Impact stats"
          collection="impactStats"
          titleKey="label"
          subtitleKey="value"
          fields={[
            { key: "key", label: "Key" },
            { key: "label", label: "Label", required: true },
            { key: "value", label: "Value", type: "number" },
            { key: "prefix", label: "Prefix" },
            { key: "suffix", label: "Suffix" },
          ]}
        />
      )}

      {activeTab === "seed" && (
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6">
          <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
            Re-seed from site.ts
          </h3>
          <p className="mt-2 text-sm text-[var(--admin-muted)]">
            Rebuilds CMS content from the code seed (content/site.ts + gallery).
            This overwrites existing CMS data in the file/Supabase store.
          </p>
          {seedMsg && <p className="mt-3 text-sm text-emerald">{seedMsg}</p>}
          <button
            type="button"
            disabled={seed.isPending}
            onClick={() => {
              if (confirm("Overwrite CMS with seed data?")) seed.mutate();
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-sm font-bold text-amber-700 dark:text-amber-300"
          >
            <RefreshCw className="h-4 w-4" />
            {seed.isPending ? "Seeding…" : "Run seed"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function WebsiteCMSPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-[var(--admin-muted)]">Loading…</div>}>
      <WebsiteCMSContent />
    </Suspense>
  );
}
