"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";
import { EVENT_FIELDS } from "@/components/cms/homepage-field-defs";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Events"
      collection="events"
      titleKey="title"
      subtitleKey="date"
      fields={EVENT_FIELDS}
    />
  );
}
