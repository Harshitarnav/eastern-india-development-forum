"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Projects"
      description="Featured and portal projects shown on the public site."
      collection="projects"
      titleKey="title"
      subtitleKey="desc"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "tag", label: "Tag" },
        { key: "sector", label: "Sector" },
        { key: "state", label: "State" },
        { key: "desc", label: "Description", type: "textarea" },
        { key: "status", label: "Status" },
        { key: "timeline", label: "Timeline" },
        { key: "budget", label: "Budget" },
        { key: "fundingSource", label: "Funding source" },
        { key: "image", label: "Image key / URL" },
      ]}
    />
  );
}
