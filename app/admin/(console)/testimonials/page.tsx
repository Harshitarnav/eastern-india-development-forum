"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

export default function Page() {
  return (
    <CmsCollectionPage
      title="Testimonials"
      collection="testimonials"
      titleKey="name"
      subtitleKey="quote"
      fields={[
        { key: "name", label: "Name", required: true },
        { key: "role", label: "Role" },
        { key: "quote", label: "Quote", type: "textarea", required: true },
        { key: "org", label: "Organisation" },
        {
          key: "image",
          label: "Photo",
          type: "image",
          folder: "testimonials",
        },
      ]}
    />
  );
}
