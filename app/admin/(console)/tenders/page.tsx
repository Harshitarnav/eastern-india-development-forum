"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Tenders"
      collection="tenders"
      titleKey="title"
      subtitleKey="issuingAuthority"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "tenderNo", label: "Tender no." },
        { key: "issuingAuthority", label: "Issuing authority" },
        { key: "category", label: "Category" },
        { key: "state", label: "State" },
        { key: "estimatedCost", label: "Estimated cost" },
        { key: "publishedDate", label: "Published" },
        { key: "closingDate", label: "Closing date" },
        { key: "status", label: "Status" },
        { key: "docLink", label: "Document link" },
      ]}
    />
  );
}
