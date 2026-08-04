"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Downloads / Reports"
      collection="reports"
      titleKey="title"
      subtitleKey="type"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "type", label: "Type" },
        { key: "year", label: "Year" },
        { key: "url", label: "Download URL" },
        { key: "summary", label: "Summary", type: "textarea" },
      ]}
    />
  );
}
