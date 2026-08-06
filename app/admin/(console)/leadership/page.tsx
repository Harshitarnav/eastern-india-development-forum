"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <div className="space-y-10">
      <CmsCollectionPage
        title="Leadership"
        collection="leaders"
        titleKey="name"
        subtitleKey="role"
        fields={[
          { key: "name", label: "Name", required: true },
          { key: "role", label: "Role" },
          {
            key: "image",
            label: "Photo",
            type: "image",
            placeholder: "/images/leaders/name.jpg",
            folder: "leaders",
          },
          { key: "bio", label: "Bio", type: "textarea" },
        ]}
      />
      <CmsCollectionPage
        title="Institutional values"
        collection="values"
        titleKey="title"
        subtitleKey="desc"
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "desc", label: "Description", type: "textarea" },
        ]}
      />
    </div>
  );
}
