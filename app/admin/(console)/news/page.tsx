"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="News"
      collection="news"
      titleKey="title"
      subtitleKey="date"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "date", label: "Date" },
        { key: "summary", label: "Summary", type: "textarea" },
        { key: "tag", label: "Tag" },
      ]}
    />
  );
}
