"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Events"
      collection="events"
      titleKey="title"
      subtitleKey="date"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "date", label: "Date" },
        { key: "location", label: "Location" },
        { key: "type", label: "Type" },
        { key: "desc", label: "Description", type: "textarea" },
      ]}
    />
  );
}
