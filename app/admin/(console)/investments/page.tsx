"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";
import { INVESTMENT_FIELDS } from "@/components/cms/homepage-field-defs";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import {
  DEFAULT_INVESTORS_PAGE,
  type CmsInvestorsPageSettings,
} from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const PAGE_FIELDS: {
  key: keyof CmsInvestorsPageSettings;
  label: string;
  multiline?: boolean;
}[] = [
  { key: "heroTitle", label: "Page title" },
  { key: "heroDescription", label: "Page description", multiline: true },
  { key: "primaryCtaLabel", label: "Hero primary button text" },
  { key: "primaryCtaHref", label: "Hero primary button URL" },
  { key: "secondaryCtaLabel", label: "Hero secondary button text" },
  { key: "secondaryCtaHref", label: "Hero secondary button URL" },
  { key: "pledgedValue", label: "Metric — pledged capital value" },
  { key: "pledgedLabel", label: "Metric — pledged capital label" },
  { key: "zonesLabel", label: "Metric — zones count label" },
  { key: "statesValue", label: "Metric — states value" },
  { key: "statesLabel", label: "Metric — states label" },
  { key: "sectionEyebrow", label: "Zones section small label" },
  { key: "sectionTitle", label: "Zones section heading" },
  { key: "prioritySectorsLabel", label: "Card label — priority sectors" },
  { key: "incentivesLabel", label: "Card label — incentives" },
  { key: "pppModelLabel", label: "Card label — PPP model" },
  { key: "briefingCtaLabel", label: "Card button text (Schedule briefing)" },
  { key: "ctaTitle", label: "Bottom CTA title" },
  { key: "ctaDescription", label: "Bottom CTA description", multiline: true },
  { key: "ctaPrimaryLabel", label: "Bottom CTA primary button" },
  { key: "ctaPrimaryHref", label: "Bottom CTA primary URL" },
  { key: "ctaSecondaryLabel", label: "Bottom CTA secondary button" },
  { key: "ctaSecondaryHref", label: "Bottom CTA secondary URL" },
];

function InvestorsPageSettings() {
  const qc = useQueryClient();
  const [form, setForm] = useState<CmsInvestorsPageSettings>({
    ...DEFAULT_INVESTORS_PAGE,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["cms-settings"],
    queryFn: async () => {
      const res = await fetch("/api/cms/settings");
      if (!res.ok) throw new Error("Failed to load settings");
      return (await res.json()).settings as {
        investorsPage?: CmsInvestorsPageSettings;
      };
    },
  });

  useEffect(() => {
    if (data?.investorsPage) {
      setForm({ ...DEFAULT_INVESTORS_PAGE, ...data.investorsPage });
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async (investorsPage: CmsInvestorsPageSettings) => {
      const res = await fetch("/api/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investorsPage }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Save failed");
      return json;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-settings"] });
      setError(null);
      setMessage("Investors page settings saved.");
      setTimeout(() => setMessage(null), 2500);
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
          /investors page text
        </h2>
        <p className="mt-1 text-xs text-[var(--admin-muted)]">
          Hero, metrics, section titles, card labels, and bottom CTA for the
          public investors page.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {PAGE_FIELDS.map((field) => (
          <div
            key={field.key}
            className={field.multiline ? "md:col-span-2" : undefined}
          >
            <AdminFieldLabel>{field.label}</AdminFieldLabel>
            {field.multiline ? (
              <textarea
                className={cn(adminFieldClass, "min-h-20")}
                value={form[field.key]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
              />
            ) : (
              <input
                className={adminFieldClass}
                value={form[field.key]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
              />
            )}
          </div>
        ))}
      </div>
      {message && <p className="text-sm text-emerald">{message}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="button"
        disabled={save.isPending}
        onClick={() => save.mutate(form)}
        className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-bold text-navy"
      >
        <Save className="h-4 w-4" />
        {save.isPending ? "Saving…" : "Save page text"}
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <div className="space-y-10">
      <InvestorsPageSettings />
      <CmsCollectionPage
        title="Investment zones"
        description="Each zone card on /investors and the homepage preview: name, location, state, area, PPP model, priority sectors, incentives, and contact email. Use one line per sector / incentive."
        collection="investmentZones"
        titleKey="name"
        subtitleKey="state"
        fields={INVESTMENT_FIELDS}
      />
    </div>
  );
}
