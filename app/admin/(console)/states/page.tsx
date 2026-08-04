"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="States"
      collection="states"
      titleKey="name"
      subtitleKey="badge"
      fields={[
        { key: "name", label: "Name", required: true },
        { key: "capital", label: "Capital" },
        { key: "badge", label: "Badge" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "successStory", label: "Success story", type: "textarea" },
        { key: "projectsCount", label: "Projects count", type: "number" },
        { key: "investmentAmount", label: "Investment amount" },
      ]}
    />
  );
}
