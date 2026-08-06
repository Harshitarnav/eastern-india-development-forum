"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Eye, EyeOff, Save } from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";
import { BlockGuide, SectionHeadingsCard } from "@/components/cms/SectionHeadingsCard";
import { SERVICE_FIELDS } from "@/components/cms/homepage-field-defs";
import type { CmsHomepageSettings, CmsItemRecord } from "@/lib/cms/types";
import { DEFAULT_HOMEPAGE } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

type SectionKey = keyof Omit<
  CmsHomepageSettings,
  "onlineServices" | "about" | "membershipCta" | "map"
>;

const STANDARD_HEADING_FIELDS = [
  { key: "eyebrow", label: "Small label" },
  { key: "title", label: "Heading" },
  { key: "description", label: "Short description", multiline: true },
  { key: "ctaLabel", label: "Button text" },
  { key: "ctaHref", label: "Button URL" },
];

/** Homepage-only: titles + list content edited here. */
const HOMEPAGE_ONLY_PANELS = [
  {
    id: "services" as const,
    label: "Online services",
    hint: "Section header and quick-link tiles under the hero",
  },
  {
    id: "focus" as const,
    label: "Focus areas",
    hint: "Priority Sectors headings and all sector cards — edit everything here",
  },
  {
    id: "faqs" as const,
    label: "FAQs",
    hint: "FAQ section title and all questions",
  },
  {
    id: "cta" as const,
    label: "Membership CTA",
    hint: "Bottom-of-page membership call-to-action copy and buttons",
  },
  { id: "visibility" as const, label: "Show / hide sections", hint: "" },
];

/** Dedicated public/sidebar pages: homepage edits titles/CTAs only. */
const TITLES_ONLY_PANELS = [
  {
    id: "about" as const,
    label: "About block",
    hint: "Homepage titles only — leaders & values in sidebar",
  },
  {
    id: "map" as const,
    label: "Regional map",
    hint: "Homepage titles & map labels only — states list in sidebar",
  },
  {
    id: "schemes" as const,
    label: "Schemes",
    hint: "Homepage titles only — schemes list in sidebar",
  },
  {
    id: "tenders" as const,
    label: "Tenders",
    hint: "Homepage titles only — tenders list in sidebar",
  },
  {
    id: "projects" as const,
    label: "Projects",
    hint: "Homepage titles only — projects list in sidebar",
  },
  {
    id: "investments" as const,
    label: "Investments",
    hint: "Homepage titles only — investments list in sidebar",
  },
  {
    id: "newsEvents" as const,
    label: "News & events",
    hint: "Homepage titles only — news and events lists in sidebar",
  },
  {
    id: "resources" as const,
    label: "Resources",
    hint: "Homepage titles only — downloads list in sidebar",
  },
  {
    id: "offices" as const,
    label: "Offices",
    hint: "Homepage titles only — offices list in sidebar",
  },
];

const PANELS = [...HOMEPAGE_ONLY_PANELS, ...TITLES_ONLY_PANELS];

type PanelId = (typeof PANELS)[number]["id"];

function ManageInSidebar({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-bg)]/50 p-5">
      <p className="text-sm text-[var(--admin-muted)]">
        List content is managed in the sidebar so homepage and the public page
        stay in sync.
      </p>
      <Link
        href={href}
        className="mt-3 inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-gold/20"
      >
        Manage {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function PanelChipGroup({
  title,
  items,
  panel,
  setPanel,
}: {
  title: string;
  items: typeof HOMEPAGE_ONLY_PANELS | typeof TITLES_ONLY_PANELS;
  panel: PanelId;
  setPanel: (id: PanelId) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPanel(item.id)}
            className={cn(
              "rounded-xl px-3 py-2 text-sm font-bold transition-colors",
              panel === item.id
                ? "bg-gold text-navy shadow-sm"
                : "border border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] hover:border-gold/40"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function mergeHomepage(
  partial?: Partial<CmsHomepageSettings> | null
): CmsHomepageSettings {
  const src = partial || {};
  return {
    onlineServices: {
      ...DEFAULT_HOMEPAGE.onlineServices,
      ...src.onlineServices,
    },
    about: { ...DEFAULT_HOMEPAGE.about, ...src.about },
    focus: { ...DEFAULT_HOMEPAGE.focus, ...src.focus },
    map: { ...DEFAULT_HOMEPAGE.map, ...src.map },
    schemes: { ...DEFAULT_HOMEPAGE.schemes, ...src.schemes },
    tenders: { ...DEFAULT_HOMEPAGE.tenders, ...src.tenders },
    projects: { ...DEFAULT_HOMEPAGE.projects, ...src.projects },
    investments: { ...DEFAULT_HOMEPAGE.investments, ...src.investments },
    news: { ...DEFAULT_HOMEPAGE.news, ...src.news },
    events: { ...DEFAULT_HOMEPAGE.events, ...src.events },
    resources: { ...DEFAULT_HOMEPAGE.resources, ...src.resources },
    faq: { ...DEFAULT_HOMEPAGE.faq, ...src.faq },
    offices: { ...DEFAULT_HOMEPAGE.offices, ...src.offices },
    membershipCta: {
      ...DEFAULT_HOMEPAGE.membershipCta,
      ...src.membershipCta,
      bullets:
        src.membershipCta?.bullets ?? DEFAULT_HOMEPAGE.membershipCta.bullets,
      primary: {
        ...DEFAULT_HOMEPAGE.membershipCta.primary,
        ...src.membershipCta?.primary,
      },
      secondary: {
        ...DEFAULT_HOMEPAGE.membershipCta.secondary,
        ...src.membershipCta?.secondary,
      },
    },
  };
}

function SaveCopyButton({
  pending,
  onClick,
  label = "Save headings",
}: {
  pending: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      disabled={pending}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
    >
      <Save className="h-4 w-4" />
      {pending ? "Saving…" : label}
    </button>
  );
}

function sectionValues(
  section: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaHref?: string;
  }
): Record<string, string | undefined> {
  return {
    eyebrow: section.eyebrow,
    title: section.title,
    description: section.description,
    ctaLabel: section.ctaLabel,
    ctaHref: section.ctaHref,
  };
}

export function CmsHomepageEditor() {
  const qc = useQueryClient();
  const [homepage, setHomepage] = useState<CmsHomepageSettings>(DEFAULT_HOMEPAGE);
  const [sections, setSections] = useState<CmsItemRecord[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [panel, setPanel] = useState<PanelId>("services");

  const { data: settingsData } = useQuery({
    queryKey: ["cms-settings"],
    queryFn: async () => {
      const res = await fetch("/api/cms/settings");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()).settings as { homepage?: CmsHomepageSettings };
    },
  });

  const { data: sectionData } = useQuery({
    queryKey: ["cms-items", "sections"],
    queryFn: async () => {
      const res = await fetch("/api/cms/items?collection=sections");
      if (!res.ok) throw new Error("Failed");
      return ((await res.json()).items || []) as CmsItemRecord[];
    },
  });

  useEffect(() => {
    if (settingsData) setHomepage(mergeHomepage(settingsData.homepage));
  }, [settingsData]);

  useEffect(() => {
    if (sectionData) setSections(sectionData);
  }, [sectionData]);

  const saveHomepage = useMutation({
    mutationFn: async (payload: CmsHomepageSettings) => {
      const res = await fetch("/api/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homepage: payload }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Save failed");
      return json;
    },
  });

  const saveSection = useMutation({
    mutationFn: async (item: CmsItemRecord) => {
      const res = await fetch(
        `/api/cms/items/sections/${encodeURIComponent(item.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Section save failed");
      return json;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-items", "sections"] });
    },
  });

  const handleSaveCopy = async () => {
    setError(null);
    try {
      await saveHomepage.mutateAsync(homepage);
      qc.invalidateQueries({ queryKey: ["cms-settings"] });
      setMessage("Saved.");
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  const toggleSection = async (item: CmsItemRecord) => {
    const next: CmsItemRecord = {
      ...item,
      data: {
        ...item.data,
        is_visible: item.data.is_visible === false,
      },
    };
    setSections((prev) => prev.map((s) => (s.id === item.id ? next : s)));
    try {
      await saveSection.mutateAsync(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Visibility save failed");
      qc.invalidateQueries({ queryKey: ["cms-items", "sections"] });
    }
  };

  const updateSectionCopy = (
    key: SectionKey,
    field: "eyebrow" | "title" | "description" | "ctaLabel" | "ctaHref",
    value: string
  ) => {
    setHomepage((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const patchHomepageSection = <K extends keyof CmsHomepageSettings>(
    key: K,
    field: string,
    value: string
  ) => {
    setHomepage((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as object), [field]: value },
    }));
  };

  const activePanel = PANELS.find((p) => p.id === panel);
  const activeHint = activePanel?.hint;

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-sm">
      <div className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)]/60 px-5 py-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--admin-muted)]">
          Website CMS / Homepage
        </div>
        <h2 className="mt-1 font-display text-xl font-bold text-[var(--admin-text)]">
          Homepage sections
        </h2>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Homepage-only blocks edit full content here (titles + list items).
          Blocks that have their own public page only edit section titles and
          CTAs here — manage list items from the matching sidebar admin page so
          both stay in sync.
        </p>
      </div>

      <div className="space-y-4 border-b border-[var(--admin-border)] px-4 py-3 sm:px-5">
        <PanelChipGroup
          title="Homepage-only"
          items={HOMEPAGE_ONLY_PANELS}
          panel={panel}
          setPanel={setPanel}
        />
        <PanelChipGroup
          title="Titles only (lists in sidebar)"
          items={TITLES_ONLY_PANELS}
          panel={panel}
          setPanel={setPanel}
        />
      </div>

      <div className="border-l-4 border-gold bg-[var(--admin-bg)]/30 px-5 py-3">
        <div className="text-sm font-bold text-[var(--admin-text)]">
          Editing: {activePanel?.label}
        </div>
        {activeHint ? (
          <p className="mt-0.5 text-xs text-[var(--admin-muted)]">{activeHint}</p>
        ) : null}
      </div>

      <div className="space-y-6 p-4 sm:p-5">
        {panel === "about" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  About headings
                </h3>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  These appear above the values cards. Click Save headings after
                  editing.
                </p>
              </div>
              {(
                [
                  ["eyebrow", "Small label above the heading"],
                  ["title", "Main heading"],
                  ["description", "Intro paragraph"],
                  ["ctaLabel", "Link button text"],
                  ["ctaHref", "Link button URL"],
                  ["leadersTitle", "Leadership box title (right side)"],
                ] as const
              ).map(([field, label]) => (
                <div key={field}>
                  <AdminFieldLabel>{label}</AdminFieldLabel>
                  {field === "description" ? (
                    <textarea
                      className={cn(adminFieldClass, "min-h-24")}
                      value={homepage.about[field]}
                      onChange={(e) =>
                        setHomepage((prev) => ({
                          ...prev,
                          about: { ...prev.about, [field]: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    <input
                      className={adminFieldClass}
                      value={homepage.about[field]}
                      onChange={(e) =>
                        setHomepage((prev) => ({
                          ...prev,
                          about: { ...prev.about, [field]: e.target.value },
                        }))
                      }
                    />
                  )}
                </div>
              ))}
              {message && <p className="text-sm text-emerald">{message}</p>}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <SaveCopyButton
                pending={saveHomepage.isPending}
                onClick={() => void handleSaveCopy()}
                label="Save headings"
              />
            </div>
            <ManageInSidebar href="/admin/leadership" label="leaders & values" />
          </div>
        )}

        {panel === "services" && (
          <div className="space-y-8">
            <BlockGuide
              items={[
                {
                  title: "Section headings",
                  detail: "Online Services title and help-desk link",
                },
                {
                  title: "Service tiles",
                  detail:
                    "Quick-link cards under the hero (Tenders, Schemes, etc.)",
                },
              ]}
            />
            <SectionHeadingsCard
              title="Section headings"
              description="Shown above the online services tiles on the homepage."
              fields={[
                { key: "title", label: "Section title" },
                { key: "helpLabel", label: "Help link text" },
                { key: "helpHref", label: "Help link URL" },
              ]}
              values={homepage.onlineServices}
              onChange={(key, value) =>
                patchHomepageSection("onlineServices", key, value)
              }
              onSave={() => void handleSaveCopy()}
              pending={saveHomepage.isPending}
              message={message}
              error={error}
              saveLabel="Save services headings"
            />
            <div className="space-y-2">
              <div className="px-1">
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  2. Service tiles
                </h3>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Each tile saves on its own from the list below.
                </p>
              </div>
              <CmsCollectionPage
                title="Online services"
                description="Quick-link tiles under the hero (Tenders, Schemes, etc.)."
                collection="onlineServices"
                titleKey="label"
                subtitleKey="href"
                fields={SERVICE_FIELDS}
              />
            </div>
          </div>
        )}

        {panel === "schemes" && (
          <div className="space-y-8">
            <SectionHeadingsCard
              title="Section headings"
              description="Shown above the scheme cards on the homepage."
              fields={STANDARD_HEADING_FIELDS}
              values={sectionValues(homepage.schemes)}
              onChange={(key, value) =>
                patchHomepageSection("schemes", key, value)
              }
              onSave={() => void handleSaveCopy()}
              pending={saveHomepage.isPending}
              message={message}
              error={error}
              saveLabel="Save schemes headings"
            />
            <ManageInSidebar href="/admin/schemes" label="schemes" />
          </div>
        )}

        {panel === "tenders" && (
          <div className="space-y-8">
            <SectionHeadingsCard
              title="Section headings"
              description="Shown above the tender cards on the homepage."
              fields={STANDARD_HEADING_FIELDS}
              values={sectionValues(homepage.tenders)}
              onChange={(key, value) =>
                patchHomepageSection("tenders", key, value)
              }
              onSave={() => void handleSaveCopy()}
              pending={saveHomepage.isPending}
              message={message}
              error={error}
              saveLabel="Save tenders headings"
            />
            <ManageInSidebar href="/admin/tenders" label="tenders" />
          </div>
        )}

        {panel === "projects" && (
          <div className="space-y-8">
            <SectionHeadingsCard
              title="Section headings"
              description="Shown above the project cards on the homepage."
              fields={STANDARD_HEADING_FIELDS}
              values={sectionValues(homepage.projects)}
              onChange={(key, value) =>
                patchHomepageSection("projects", key, value)
              }
              onSave={() => void handleSaveCopy()}
              pending={saveHomepage.isPending}
              message={message}
              error={error}
              saveLabel="Save projects headings"
            />
            <ManageInSidebar href="/admin/projects" label="projects" />
          </div>
        )}

        {panel === "investments" && (
          <div className="space-y-8">
            <SectionHeadingsCard
              title="Section headings"
              description="Shown above the investment cards on the homepage."
              fields={STANDARD_HEADING_FIELDS}
              values={sectionValues(homepage.investments)}
              onChange={(key, value) =>
                patchHomepageSection("investments", key, value)
              }
              onSave={() => void handleSaveCopy()}
              pending={saveHomepage.isPending}
              message={message}
              error={error}
              saveLabel="Save investments headings"
            />
            <ManageInSidebar href="/admin/investments" label="investments" />
          </div>
        )}

        {panel === "newsEvents" && (
          <div className="space-y-8">
            <SectionHeadingsCard
              step="1"
              title="News headings"
              description="Shown above the news list on the homepage."
              fields={STANDARD_HEADING_FIELDS}
              values={sectionValues(homepage.news)}
              onChange={(key, value) => patchHomepageSection("news", key, value)}
              onSave={() => void handleSaveCopy()}
              pending={saveHomepage.isPending}
              message={message}
              error={error}
              saveLabel="Save news headings"
            />
            <ManageInSidebar href="/admin/news" label="news" />
            <SectionHeadingsCard
              step="2"
              title="Events headings"
              description="Shown above the events list on the homepage."
              fields={STANDARD_HEADING_FIELDS}
              values={sectionValues(homepage.events)}
              onChange={(key, value) =>
                patchHomepageSection("events", key, value)
              }
              onSave={() => void handleSaveCopy()}
              pending={saveHomepage.isPending}
              message={message}
              error={error}
              saveLabel="Save events headings"
            />
            <ManageInSidebar href="/admin/events" label="events" />
          </div>
        )}

        {panel === "resources" && (
          <div className="space-y-8">
            <SectionHeadingsCard
              title="Section headings"
              description="Shown above the resources list on the homepage."
              fields={STANDARD_HEADING_FIELDS}
              values={sectionValues(homepage.resources)}
              onChange={(key, value) =>
                patchHomepageSection("resources", key, value)
              }
              onSave={() => void handleSaveCopy()}
              pending={saveHomepage.isPending}
              message={message}
              error={error}
              saveLabel="Save resources headings"
            />
            <ManageInSidebar href="/admin/downloads" label="downloads" />
          </div>
        )}

        {panel === "cta" && (
          <div className="space-y-8">
            <BlockGuide
              items={[
                {
                  title: "CTA copy",
                  detail: "Eyebrow, heading, paragraph, and benefit lines",
                },
                {
                  title: "Buttons & metrics",
                  detail: "Primary / secondary links and the metrics box title",
                },
              ]}
            />
            <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  1. Membership CTA
                </h3>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Bottom-of-homepage membership call-to-action. Save after
                  editing.
                </p>
              </div>
              {(
                [
                  ["eyebrow", "Small label"],
                  ["title", "Heading"],
                  ["description", "Paragraph"],
                  ["metricsTitle", "Metrics box title"],
                ] as const
              ).map(([field, label]) => (
                <div key={field}>
                  <AdminFieldLabel>{label}</AdminFieldLabel>
                  {field === "description" ? (
                    <textarea
                      className={cn(adminFieldClass, "min-h-24")}
                      value={homepage.membershipCta[field]}
                      onChange={(e) =>
                        setHomepage((prev) => ({
                          ...prev,
                          membershipCta: {
                            ...prev.membershipCta,
                            [field]: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    <input
                      className={adminFieldClass}
                      value={homepage.membershipCta[field]}
                      onChange={(e) =>
                        setHomepage((prev) => ({
                          ...prev,
                          membershipCta: {
                            ...prev.membershipCta,
                            [field]: e.target.value,
                          },
                        }))
                      }
                    />
                  )}
                </div>
              ))}
              <div>
                <AdminFieldLabel>Benefit lines (one per line)</AdminFieldLabel>
                <textarea
                  className={cn(adminFieldClass, "min-h-28")}
                  value={homepage.membershipCta.bullets.join("\n")}
                  onChange={(e) =>
                    setHomepage((prev) => ({
                      ...prev,
                      membershipCta: {
                        ...prev.membershipCta,
                        bullets: e.target.value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean),
                      },
                    }))
                  }
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <AdminFieldLabel>Primary button text</AdminFieldLabel>
                  <input
                    className={adminFieldClass}
                    value={homepage.membershipCta.primary.label}
                    onChange={(e) =>
                      setHomepage((prev) => ({
                        ...prev,
                        membershipCta: {
                          ...prev.membershipCta,
                          primary: {
                            ...prev.membershipCta.primary,
                            label: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <AdminFieldLabel>Primary button URL</AdminFieldLabel>
                  <input
                    className={adminFieldClass}
                    value={homepage.membershipCta.primary.href}
                    onChange={(e) =>
                      setHomepage((prev) => ({
                        ...prev,
                        membershipCta: {
                          ...prev.membershipCta,
                          primary: {
                            ...prev.membershipCta.primary,
                            href: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <AdminFieldLabel>Secondary button text</AdminFieldLabel>
                  <input
                    className={adminFieldClass}
                    value={homepage.membershipCta.secondary.label}
                    onChange={(e) =>
                      setHomepage((prev) => ({
                        ...prev,
                        membershipCta: {
                          ...prev.membershipCta,
                          secondary: {
                            ...prev.membershipCta.secondary,
                            label: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <AdminFieldLabel>Secondary button URL</AdminFieldLabel>
                  <input
                    className={adminFieldClass}
                    value={homepage.membershipCta.secondary.href}
                    onChange={(e) =>
                      setHomepage((prev) => ({
                        ...prev,
                        membershipCta: {
                          ...prev.membershipCta,
                          secondary: {
                            ...prev.membershipCta.secondary,
                            href: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
              {message && <p className="text-sm text-emerald">{message}</p>}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <SaveCopyButton
                pending={saveHomepage.isPending}
                onClick={() => void handleSaveCopy()}
                label="Save membership CTA"
              />
            </div>
          </div>
        )}

        {panel === "visibility" && (
          <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-3">
            <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
              Show or hide homepage sections
            </h3>
            <p className="text-xs text-[var(--admin-muted)]">
              Turn a section off if you do not want it on the public homepage.
            </p>
            {sections.length === 0 && (
              <p className="text-sm text-[var(--admin-muted)]">
                No section rows yet. Run Seed / Reset once to create the list.
              </p>
            )}
            {sections
              .slice()
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((item) => {
                const visible = item.data.is_visible !== false;
                const title = String(
                  item.data.title || item.data.key || item.id
                );
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => void toggleSection(item)}
                    className="flex w-full items-center justify-between rounded-xl border border-[var(--admin-border)] px-4 py-3 text-left"
                  >
                    <span className="text-sm font-bold text-[var(--admin-text)]">
                      {title}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-bold">
                      {visible ? (
                        <>
                          <Eye className="h-4 w-4 text-emerald" /> Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-4 w-4 text-[var(--admin-muted)]" />{" "}
                          Hidden
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}

        {panel === "focus" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm text-[var(--admin-text)]">
              <p className="font-bold">What you are editing</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-[var(--admin-muted)]">
                <li>
                  <strong className="text-[var(--admin-text)]">
                    Section headings
                  </strong>{" "}
                  — “Priority Sectors”, main title, and short intro
                </li>
                <li>
                  <strong className="text-[var(--admin-text)]">
                    Sector cards
                  </strong>{" "}
                  — each focus area (Connectivity, Clean Energy, etc.)
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  1. Section headings
                </h3>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Shown above the focus area cards on the homepage. Save after
                  editing.
                </p>
              </div>
              {(
                [
                  ["eyebrow", "Small label (e.g. Priority Sectors)"],
                  ["title", "Main heading"],
                  ["description", "Short description under the heading"],
                ] as const
              ).map(([field, label]) => (
                <div key={field}>
                  <AdminFieldLabel>{label}</AdminFieldLabel>
                  {field === "description" ? (
                    <textarea
                      className={cn(adminFieldClass, "min-h-24")}
                      value={homepage.focus[field] || ""}
                      onChange={(e) =>
                        updateSectionCopy("focus", field, e.target.value)
                      }
                    />
                  ) : (
                    <input
                      className={adminFieldClass}
                      value={homepage.focus[field] || ""}
                      onChange={(e) =>
                        updateSectionCopy("focus", field, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
              {message && <p className="text-sm text-emerald">{message}</p>}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <SaveCopyButton
                pending={saveHomepage.isPending}
                onClick={() => void handleSaveCopy()}
                label="Save focus headings"
              />
            </div>

            <div className="space-y-2">
              <div className="px-1">
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  2. Sector cards
                </h3>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Add, edit, or remove each focus area card. Each item saves on
                  its own from the list below.
                </p>
              </div>
              <CmsCollectionPage
                title="Focus area cards"
                description="These cards appear under Priority Sectors on the homepage."
                collection="focusAreas"
                titleKey="title"
                subtitleKey="tag"
                fields={[
                  { key: "title", label: "Title", required: true },
                  {
                    key: "tag",
                    label: "Tag (e.g. CONNECTIVITY)",
                    placeholder: "CONNECTIVITY",
                  },
                  {
                    key: "desc",
                    label: "Description",
                    type: "textarea",
                    required: true,
                  },
                  {
                    key: "iconName",
                    label: "Icon name",
                    placeholder:
                      "Truck, Zap, Factory, Cpu, GraduationCap, Sprout…",
                  },
                  {
                    key: "activeProjects",
                    label: "Active projects count",
                    type: "number",
                  },
                ]}
              />
            </div>
          </div>
        )}

        {panel === "map" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  1. Page headings
                </h3>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Shown above the interactive map on the homepage.
                </p>
              </div>
              {(
                [
                  ["eyebrow", "Small label"],
                  ["title", "Main heading"],
                  ["description", "Short description"],
                ] as const
              ).map(([field, label]) => (
                <div key={field}>
                  <AdminFieldLabel>{label}</AdminFieldLabel>
                  {field === "description" ? (
                    <textarea
                      className={cn(adminFieldClass, "min-h-20")}
                      value={homepage.map[field] || ""}
                      onChange={(e) =>
                        setHomepage((prev) => ({
                          ...prev,
                          map: { ...prev.map, [field]: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    <input
                      className={adminFieldClass}
                      value={homepage.map[field] || ""}
                      onChange={(e) =>
                        setHomepage((prev) => ({
                          ...prev,
                          map: { ...prev.map, [field]: e.target.value },
                        }))
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  2. Map portal labels
                </h3>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Text inside the dark map panel and the state detail card.
                </p>
              </div>
              {(
                [
                  ["portalEyebrow", "Map small label"],
                  ["portalTitle", "Map title"],
                  ["hint", "Hint chip text"],
                  ["coverageNote", "Coverage footer note"],
                  ["dataUpdatedLabel", "Data updated label"],
                  ["intelligenceCardLabel", "Detail card label"],
                  ["capitalLabel", "Capital pledged label"],
                  ["projectsLabel", "Projects label"],
                  ["sectorsLabel", "Sectors heading"],
                  ["spotlightLabel", "Spotlight heading"],
                  ["exploreCtaLabel", "Explore button text"],
                  ["schemesCtaLabel", "Schemes button text"],
                ] as const
              ).map(([field, label]) => (
                <div key={field}>
                  <AdminFieldLabel>{label}</AdminFieldLabel>
                  <input
                    className={adminFieldClass}
                    value={homepage.map[field] || ""}
                    onChange={(e) =>
                      setHomepage((prev) => ({
                        ...prev,
                        map: { ...prev.map, [field]: e.target.value },
                      }))
                    }
                  />
                </div>
              ))}
              {message && <p className="text-sm text-emerald">{message}</p>}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <SaveCopyButton
                pending={saveHomepage.isPending}
                onClick={() => void handleSaveCopy()}
                label="Save map headings & labels"
              />
            </div>

            <ManageInSidebar href="/admin/states" label="states" />
          </div>
        )}

        {panel === "faqs" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  1. FAQ section headings
                </h3>
                <p className="mt-1 text-xs text-[var(--admin-muted)]">
                  Title shown above the questions on the homepage.
                </p>
              </div>
              {(
                [
                  ["eyebrow", "Small label"],
                  ["title", "Main heading"],
                ] as const
              ).map(([field, label]) => (
                <div key={field}>
                  <AdminFieldLabel>{label}</AdminFieldLabel>
                  <input
                    className={adminFieldClass}
                    value={homepage.faq[field] || ""}
                    onChange={(e) =>
                      updateSectionCopy("faq", field, e.target.value)
                    }
                  />
                </div>
              ))}
              <SaveCopyButton
                pending={saveHomepage.isPending}
                onClick={() => void handleSaveCopy()}
                label="Save FAQ headings"
              />
            </div>
            <CmsCollectionPage
              title="2. Questions"
              description="FAQ items shown on the homepage."
              collection="faqs"
              titleKey="question"
              subtitleKey="category"
              fields={[
                { key: "question", label: "Question", required: true },
                {
                  key: "answer",
                  label: "Answer",
                  type: "textarea",
                  required: true,
                },
                { key: "category", label: "Category" },
              ]}
            />
          </div>
        )}

        {panel === "offices" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  Offices section headings
                </h3>
              </div>
              {(
                [
                  ["eyebrow", "Small label"],
                  ["title", "Main heading"],
                  ["description", "Short description"],
                ] as const
              ).map(([field, label]) => (
                <div key={field}>
                  <AdminFieldLabel>{label}</AdminFieldLabel>
                  {field === "description" ? (
                    <textarea
                      className={cn(adminFieldClass, "min-h-20")}
                      value={homepage.offices[field] || ""}
                      onChange={(e) =>
                        updateSectionCopy("offices", field, e.target.value)
                      }
                    />
                  ) : (
                    <input
                      className={adminFieldClass}
                      value={homepage.offices[field] || ""}
                      onChange={(e) =>
                        updateSectionCopy("offices", field, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
              {message && <p className="text-sm text-emerald">{message}</p>}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <SaveCopyButton
                pending={saveHomepage.isPending}
                onClick={() => void handleSaveCopy()}
                label="Save offices headings"
              />
            </div>
            <ManageInSidebar href="/admin/offices" label="offices" />
          </div>
        )}
      </div>
    </div>
  );
}
