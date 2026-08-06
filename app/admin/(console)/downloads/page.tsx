"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";
import { REPORT_FIELDS } from "@/components/cms/homepage-field-defs";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Downloads / Reports"
      collection="reports"
      titleKey="title"
      subtitleKey="category"
      fields={REPORT_FIELDS}
    />
  );
}
