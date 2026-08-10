"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <div className="space-y-10">
      <CmsCollectionPage
        title="Membership benefits"
        description="Benefit cards shown on /membership."
        collection="benefits"
        titleKey="title"
        subtitleKey="desc"
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "desc", label: "Description", type: "textarea" },
        ]}
      />
      <CmsCollectionPage
        title="Apply steps"
        description="Step-by-step apply flow on /membership."
        collection="applySteps"
        titleKey="title"
        subtitleKey="desc"
        fields={[
          { key: "n", label: "Step number", required: true, placeholder: "01" },
          { key: "title", label: "Title", required: true },
          { key: "desc", label: "Description", type: "textarea" },
        ]}
      />
    </div>
  );
}
