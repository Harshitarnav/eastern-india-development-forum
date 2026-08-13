"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { CmsImageField } from "@/components/cms/CmsImageField";
import {
  DEFAULT_PAGES,
  mergePages,
  type CmsPagesSettings,
} from "@/lib/cms/page-settings";
import { cn } from "@/lib/utils";

type PageKey = keyof CmsPagesSettings;

const PAGE_TABS: { id: PageKey; label: string }[] = [
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "membership", label: "Membership" },
  { id: "projects", label: "Projects" },
  { id: "schemes", label: "Schemes" },
  { id: "tenders", label: "Tenders" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "resources", label: "Resources" },
  { id: "analytics", label: "Analytics" },
  { id: "creatives", label: "Creatives" },
  { id: "proposals", label: "Proposals" },
  { id: "privacy", label: "Privacy" },
  { id: "terms", label: "Terms" },
];

type FieldSpec = { key: string; label: string; multiline?: boolean; image?: boolean };

const LIST_FIELDS: FieldSpec[] = [
  { key: "crumb", label: "Breadcrumb" },
  { key: "eyebrow", label: "Hero small label" },
  { key: "title", label: "Page title" },
  { key: "description", label: "Page description", multiline: true },
  { key: "primaryCtaLabel", label: "Hero primary button" },
  { key: "primaryCtaHref", label: "Hero primary URL" },
  { key: "secondaryCtaLabel", label: "Hero secondary button" },
  { key: "secondaryCtaHref", label: "Hero secondary URL" },
  { key: "sectionEyebrow", label: "Section small label" },
  { key: "sectionTitle", label: "Section heading" },
  { key: "partnersLabel", label: "Partners row label" },
  { key: "itemCtaLabel", label: "Item / card button" },
  { key: "searchPlaceholder", label: "Search placeholder" },
  { key: "emptyTitle", label: "Empty state title" },
  { key: "emptyDescription", label: "Empty state text", multiline: true },
  { key: "ctaTitle", label: "Bottom CTA title" },
  { key: "ctaDescription", label: "Bottom CTA description", multiline: true },
  { key: "ctaPrimaryLabel", label: "Bottom CTA primary button" },
  { key: "ctaPrimaryHref", label: "Bottom CTA primary URL" },
  { key: "ctaSecondaryLabel", label: "Bottom CTA secondary button" },
  { key: "ctaSecondaryHref", label: "Bottom CTA secondary URL" },
];

const EXTRA_FIELDS: Partial<Record<PageKey, FieldSpec[]>> = {
  about: [
    { key: "storyEyebrow", label: "Story small label" },
    { key: "storyTitle", label: "Story heading" },
    { key: "storyBody", label: "Story body", multiline: true },
    { key: "visionTitle", label: "Vision title" },
    { key: "visionBody", label: "Vision body", multiline: true },
    { key: "missionTitle", label: "Mission title" },
    { key: "missionBody", label: "Mission body", multiline: true },
    { key: "storyCtaLabel", label: "Story button" },
    { key: "storyCtaHref", label: "Story button URL" },
    { key: "image", label: "Story image", image: true },
    { key: "imageCaptionEyebrow", label: "Image caption label" },
    { key: "imageCaptionTitle", label: "Image caption title" },
    { key: "leadersEyebrow", label: "Leaders small label" },
    { key: "leadersTitle", label: "Leaders heading" },
    { key: "valuesEyebrow", label: "Values small label" },
    { key: "valuesTitle", label: "Values heading" },
    { key: "testimonialsEyebrow", label: "Testimonials small label" },
    { key: "testimonialsTitle", label: "Testimonials heading" },
  ],
  contact: [
    { key: "officeLabel", label: "Head office label" },
    { key: "officesEyebrow", label: "Offices small label" },
    { key: "officesTitle", label: "Offices heading" },
  ],
  membership: [
    { key: "whyEyebrow", label: "Benefits small label" },
    { key: "whyTitle", label: "Benefits heading" },
    { key: "stepsLabel", label: "Steps label" },
    { key: "donateBand", label: "Donate band text" },
    { key: "donateLinkLabel", label: "Donate link text" },
    { key: "donateLinkHref", label: "Donate link URL" },
  ],
  analytics: [
    { key: "pledgedLabel", label: "Metric — pledged label" },
    { key: "statesLabel", label: "Metric — states label" },
    { key: "corridorsLabel", label: "Metric — corridors label" },
    { key: "chartTitle", label: "Bar chart title" },
    { key: "sectorTitle", label: "Pie chart title" },
  ],
  events: [
    { key: "featuredEyebrow", label: "Featured small label" },
    { key: "calendarEyebrow", label: "Calendar small label" },
    { key: "calendarTitle", label: "Calendar heading" },
    { key: "newsEyebrow", label: "News small label" },
    { key: "newsTitle", label: "News heading" },
    { key: "featuredFallbackImage", label: "Featured fallback image", image: true },
  ],
  creatives: [
    { key: "posterEyebrow", label: "Poster small label" },
    { key: "posterTitle", label: "Poster title" },
    { key: "cardEyebrow", label: "Card small label" },
    { key: "cardTitle", label: "Card title" },
    { key: "cardBadge", label: "Card badge" },
    { key: "cardSampleName", label: "Sample member name" },
    { key: "cardSampleMeta", label: "Sample member meta" },
    { key: "cardBenefitsLabel", label: "Card benefits label" },
  ],
  proposals: [
    { key: "formEyebrow", label: "Form small label" },
    { key: "formTitle", label: "Form heading" },
    { key: "successTitle", label: "Success title" },
    { key: "successBody", label: "Success body ({ref} = reference id)", multiline: true },
    { key: "successCtaLabel", label: "Success button" },
    { key: "successCtaHref", label: "Success button URL" },
    { key: "nextTitle", label: "What happens next — title" },
    { key: "exploreEyebrow", label: "Explore small label" },
    { key: "submitLabel", label: "Submit button" },
    { key: "dprTitle", label: "DPR box title" },
    { key: "dprBody", label: "DPR box text", multiline: true },
  ],
};

function str(value: unknown) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

export function CmsPagesEditor() {
  const qc = useQueryClient();
  const [pageKey, setPageKey] = useState<PageKey>("about");
  const [pages, setPages] = useState<CmsPagesSettings>(DEFAULT_PAGES);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["cms-settings"],
    queryFn: async () => {
      const res = await fetch("/api/cms/settings");
      if (!res.ok) throw new Error("Failed to load settings");
      return (await res.json()).settings as { pages?: Partial<CmsPagesSettings> };
    },
  });

  useEffect(() => {
    if (data) setPages(mergePages(data.pages));
  }, [data]);

  const save = useMutation({
    mutationFn: async (next: CmsPagesSettings) => {
      const res = await fetch("/api/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages: next }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Save failed");
      return json;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-settings"] });
      setError(null);
      setMessage("Page copy saved. Live site will pick it up from the database.");
      setTimeout(() => setMessage(null), 2800);
    },
    onError: (err: Error) => setError(err.message),
  });

  const current = pages[pageKey] as Record<string, unknown>;
  const isLegal = pageKey === "privacy" || pageKey === "terms";

  const fields = useMemo(() => {
    if (isLegal) {
      return [
        { key: "crumb", label: "Breadcrumb" },
        { key: "title", label: "Page title" },
        { key: "description", label: "Page description", multiline: true },
        { key: "intro", label: "Intro", multiline: true },
        { key: "lastUpdated", label: "Last updated" },
      ] satisfies FieldSpec[];
    }
    return [...LIST_FIELDS, ...(EXTRA_FIELDS[pageKey] || [])];
  }, [isLegal, pageKey]);

  const setField = (key: string, value: unknown) => {
    setPages((prev) => ({
      ...prev,
      [pageKey]: { ...(prev[pageKey] as object), [key]: value },
    }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
          Inner page copy
        </h2>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Titles, descriptions, buttons, and legal text for every public page.
          List items (projects, events, gallery…) stay in their sidebar modules.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PAGE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPageKey(tab.id)}
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-bold",
              pageKey === tab.id
                ? "bg-gold/15 text-gold"
                : "border border-[var(--admin-border)] text-[var(--admin-text)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.multiline || field.image ? "md:col-span-2" : undefined}
          >
            {field.image ? (
              <CmsImageField
                label={field.label}
                value={str(current[field.key])}
                folder="pages"
                onChange={(next) => setField(field.key, next)}
              />
            ) : (
              <>
                <AdminFieldLabel>{field.label}</AdminFieldLabel>
                {field.multiline ? (
                  <textarea
                    className={cn(adminFieldClass, "min-h-24")}
                    value={str(current[field.key])}
                    onChange={(e) => setField(field.key, e.target.value)}
                  />
                ) : (
                  <input
                    className={adminFieldClass}
                    value={str(current[field.key])}
                    onChange={(e) => setField(field.key, e.target.value)}
                  />
                )}
              </>
            )}
          </div>
        ))}

        {pageKey === "creatives" && (
          <ListEditor
            label="Membership card benefits (one per line)"
            values={(pages.creatives.cardBenefits || []) as string[]}
            onChange={(cardBenefits) => setField("cardBenefits", cardBenefits)}
          />
        )}

        {pageKey === "proposals" && (
          <ListEditor
            label="What happens next (one step per line)"
            values={(pages.proposals.nextSteps || []) as string[]}
            onChange={(nextSteps) => setField("nextSteps", nextSteps)}
          />
        )}

        {isLegal && (
          <LegalSectionsEditor
            sections={
              (pageKey === "privacy" ? pages.privacy.sections : pages.terms.sections) ||
              []
            }
            onChange={(sections) => setField("sections", sections)}
          />
        )}
      </div>

      {message && <p className="text-sm text-emerald">{message}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="button"
        disabled={save.isPending}
        onClick={() => save.mutate(pages)}
        className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
      >
        <Save className="h-4 w-4" />
        {save.isPending ? "Saving…" : "Save page copy"}
      </button>
    </div>
  );
}

function ListEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="md:col-span-2">
      <AdminFieldLabel>{label}</AdminFieldLabel>
      <textarea
        className={cn(adminFieldClass, "min-h-28")}
        value={values.join("\n")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
          )
        }
      />
    </div>
  );
}

function LegalSectionsEditor({
  sections,
  onChange,
}: {
  sections: { title: string; body: string }[];
  onChange: (next: { title: string; body: string }[]) => void;
}) {
  return (
    <div className="md:col-span-2 space-y-3">
      <div className="flex items-center justify-between">
        <AdminFieldLabel>Policy sections</AdminFieldLabel>
        <button
          type="button"
          onClick={() => onChange([...sections, { title: "New section", body: "" }])}
          className="inline-flex items-center gap-1 rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-bold"
        >
          <Plus className="h-3.5 w-3.5" /> Add section
        </button>
      </div>
      {sections.map((section, index) => (
        <div
          key={index}
          className="space-y-2 rounded-xl border border-[var(--admin-border)] p-3"
        >
          <div className="flex items-start gap-2">
            <input
              className={adminFieldClass}
              value={section.title}
              onChange={(e) => {
                const next = [...sections];
                next[index] = { ...next[index], title: e.target.value };
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(sections.filter((_, i) => i !== index))}
              className="rounded-lg border border-red-500/30 p-2 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <textarea
            className={cn(adminFieldClass, "min-h-24")}
            value={section.body}
            onChange={(e) => {
              const next = [...sections];
              next[index] = { ...next[index], body: e.target.value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}
