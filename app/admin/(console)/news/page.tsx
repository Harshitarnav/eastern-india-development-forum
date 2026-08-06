"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";
import { NEWS_FIELDS } from "@/components/cms/homepage-field-defs";

export default function Page() {
  return (
    <CmsCollectionPage
      title="News"
      collection="news"
      titleKey="title"
      subtitleKey="date"
      fields={NEWS_FIELDS}
    />
  );
}
