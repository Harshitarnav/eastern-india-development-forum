"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Projects"
      description="One projects list for the homepage (first 3) and /projects (all)."
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
        {
          key: "image",
          label: "Project image",
          type: "image",
          placeholder: "/images/eidf_01.jpg",
          folder: "projects",
        },
      ]}
    />
  );
}
