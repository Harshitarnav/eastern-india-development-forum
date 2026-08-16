"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Partners"
      collection="partners"
      titleKey="name"
      fields={[{ key: "name", label: "Partner name", required: true }]}
    />
  );
}
