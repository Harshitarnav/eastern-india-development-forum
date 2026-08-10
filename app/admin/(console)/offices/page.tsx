"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Offices"
      collection="offices"
      titleKey="city"
      subtitleKey="tag"
      fields={[
        { key: "city", label: "City", required: true },
        { key: "tag", label: "Tag" },
        { key: "address", label: "Address", type: "textarea" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
      ]}
    />
  );
}
