"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <div className="space-y-8">
      <CmsCollectionPage
        title="Analytics — state capital"
        description="Chart series used on the public analytics page (stored in settings.analytics via seed; edit impact-adjacent collections here)."
        collection="impactStats"
        titleKey="label"
        fields={[
          { key: "key", label: "Key" },
          { key: "label", label: "Label" },
          { key: "value", label: "Value", type: "number" },
          { key: "prefix", label: "Prefix" },
          { key: "suffix", label: "Suffix" },
        ]}
      />
      <p className="mx-auto max-w-6xl text-sm text-[var(--admin-muted)]">
        Sector pie and state capital bars are edited under Website CMS → General
        (settings.analytics) after seed. Use Settings save or re-seed to refresh
        chart defaults.
      </p>
    </div>
  );
}
