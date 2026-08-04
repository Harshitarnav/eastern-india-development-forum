"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  Save,
  RefreshCw,
  CheckCircle,
  Sparkles,
  Layers,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";
import { useCMS } from "@/lib/cms-store";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general" as const, label: "General", icon: Settings },
  { id: "hero" as const, label: "Hero", icon: Sparkles },
  { id: "stats" as const, label: "Stats", icon: BarChart3 },
  { id: "tenders" as const, label: "Tenders", icon: FileText },
];

type TabId = (typeof tabs)[number]["id"];

function tabFromParam(value: string | null): TabId {
  if (value === "hero" || value === "stats" || value === "tenders") return value;
  return "general";
}

function WebsiteCMSContent() {
  const searchParams = useSearchParams();
  const { siteData, updateSiteData, resetToDefault, isCMSActive } = useCMS();
  const [activeTab, setActiveTab] = useState<TabId>(() =>
    tabFromParam(searchParams.get("tab"))
  );
  const [formTagline, setFormTagline] = useState(siteData.tagline);
  const [formEmail, setFormEmail] = useState(siteData.email);
  const [formPhone, setFormPhone] = useState(siteData.phone);
  const [formHeadline, setFormHeadline] = useState(siteData.hero.headline);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setActiveTab(tabFromParam(searchParams.get("tab")));
  }, [searchParams]);

  useEffect(() => {
    setFormTagline(siteData.tagline);
    setFormEmail(siteData.email);
    setFormPhone(siteData.phone);
    setFormHeadline(siteData.hero.headline);
  }, [siteData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteData({
      tagline: formTagline,
      email: formEmail,
      phone: formPhone,
      hero: { ...siteData.hero, headline: formHeadline },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
          Website CMS
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Manage website copy, hero banners, tenders, contact info, and impact statistics.
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
              Changes apply live across the public site
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isCMSActive && (
            <span className="flex items-center gap-1 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1.5 text-xs font-bold text-emerald">
              <CheckCircle className="h-3.5 w-3.5" /> CMS Active
            </span>
          )}
          <button
            type="button"
            onClick={resetToDefault}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-2.5 text-xs font-bold text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-surface)]"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reset Default Data
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-2 shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-navy text-gold shadow-md dark:bg-gold dark:text-navy-deep"
                : "text-[var(--admin-muted)] hover:bg-[var(--admin-surface-2)] hover:text-[var(--admin-text)]"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label} Settings
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-6 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-7 shadow-xl md:p-9"
      >
        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald/30 bg-emerald/10 p-4 text-xs font-bold text-emerald-dark dark:text-emerald">
            <CheckCircle className="h-4 w-4" /> CMS changes saved successfully! Site content
            updated live.
          </div>
        )}

        {activeTab === "general" && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-bold text-[var(--admin-text)]">
              General Identity & Contact Settings
            </h3>
            <div>
              <AdminFieldLabel>Site Tagline</AdminFieldLabel>
              <input
                type="text"
                value={formTagline}
                onChange={(e) => setFormTagline(e.target.value)}
                className={adminFieldClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <AdminFieldLabel>Official Support Email</AdminFieldLabel>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className={adminFieldClass}
                />
              </div>
              <div>
                <AdminFieldLabel>Official Support Phone</AdminFieldLabel>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className={adminFieldClass}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "hero" && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-bold text-[var(--admin-text)]">
              Hero Section Headline
            </h3>
            <div>
              <AdminFieldLabel>Main Headline</AdminFieldLabel>
              <textarea
                rows={3}
                value={formHeadline}
                onChange={(e) => setFormHeadline(e.target.value)}
                className={adminFieldClass}
              />
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-bold text-[var(--admin-text)]">
              Impact Counters Overview
            </h3>
            <p className="text-xs text-[var(--admin-muted)]">
              Read-only preview. Editing stats will be available in a future update.
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {siteData.impactStats.map((st) => (
                <div
                  key={st.key}
                  className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4 text-xs transition-all hover:border-gold/30 hover:shadow-md"
                >
                  <div className="text-[var(--admin-muted)]">{st.label}</div>
                  <div className="mt-1 font-display text-lg font-bold text-[var(--admin-text)]">
                    {st.prefix}
                    {st.value}
                    {st.suffix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tenders" && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-bold text-[var(--admin-text)]">
              Active Tenders ({siteData.tenders.length})
            </h3>
            <p className="text-xs text-[var(--admin-muted)]">
              Read-only preview. Tender management will be available in a future update.
            </p>
            <div className="space-y-3">
              {siteData.tenders.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col justify-between gap-2 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4 text-xs sm:flex-row sm:items-center"
                >
                  <span className="font-bold text-[var(--admin-text)]">
                    <span className="font-mono text-gold">{t.tenderNo}</span>: {t.title}
                  </span>
                  <span className="shrink-0 font-bold text-emerald">{t.estimatedCost}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end border-t border-[var(--admin-border)] pt-5">
          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-xs font-bold text-white shadow-lg transition-colors hover:bg-navy-light dark:bg-gold dark:text-navy-deep"
          >
            <Save className="h-4 w-4 text-gold dark:text-navy-deep" /> Save CMS Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default function WebsiteCMSPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl animate-pulse rounded-3xl bg-[var(--admin-surface)] p-8" />}>
      <WebsiteCMSContent />
    </Suspense>
  );
}
