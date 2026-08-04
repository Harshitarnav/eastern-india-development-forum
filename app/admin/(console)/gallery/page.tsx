"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";
import { CmsMediaLibrary } from "@/components/cms/CmsMediaLibrary";

export default function Page() {
  return (
    <div className="space-y-10">
      <CmsCollectionPage
        title="Gallery"
        collection="gallery"
        titleKey="title"
        subtitleKey="category"
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "src", label: "Image URL / path", required: true },
          { key: "category", label: "Category" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "location", label: "Location" },
          { key: "date", label: "Date" },
        ]}
      />
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 font-display text-xl font-bold text-[var(--admin-text)]">
          Media library
        </h2>
        <CmsMediaLibrary />
      </div>
    </div>
  );
}
