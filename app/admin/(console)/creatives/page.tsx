"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Brand creatives"
      description="Posters and downloadable brand assets on /creatives. Membership card copy is in Website CMS → Pages → Creatives."
      collection="creatives"
      titleKey="title"
      subtitleKey="category"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "category", label: "Category" },
        {
          key: "image",
          label: "Image",
          type: "image",
          placeholder: "/images/eidf_poster.jpg",
          folder: "creatives",
        },
        { key: "downloadUrl", label: "Download URL" },
        { key: "downloadLabel", label: "Download button" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
