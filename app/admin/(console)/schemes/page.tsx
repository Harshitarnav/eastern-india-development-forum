"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Government Schemes"
      collection="schemes"
      titleKey="title"
      subtitleKey="authority"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "authority", label: "Authority" },
        { key: "category", label: "Category" },
        { key: "state", label: "State" },
        { key: "benefits", label: "Benefits", type: "textarea" },
        { key: "applicationProcess", label: "Application process", type: "textarea" },
        { key: "deadline", label: "Deadline" },
      ]}
    />
  );
}
