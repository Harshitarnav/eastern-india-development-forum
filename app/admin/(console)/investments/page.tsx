"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Investment Opportunities"
      collection="investmentZones"
      titleKey="name"
      subtitleKey="state"
      fields={[
        { key: "name", label: "Name", required: true },
        { key: "state", label: "State" },
        { key: "sector", label: "Sector" },
        { key: "size", label: "Size" },
        { key: "investment", label: "Investment" },
        { key: "highlights", label: "Highlights", type: "textarea" },
      ]}
    />
  );
}
