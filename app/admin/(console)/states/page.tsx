"use client";

import { CmsCollectionPage } from "@/components/cms/CmsCollectionPage";

const STATE_FIELDS = [
  { key: "id", label: "State id (slug)", placeholder: "bihar", required: true },
  { key: "name", label: "Name", required: true },
  { key: "capital", label: "Capital" },
  { key: "badge", label: "Badge", placeholder: "Agri-Tech & Logistics Hub" },
  { key: "description", label: "Description", type: "textarea" as const },
  { key: "successStory", label: "Success / impact story", type: "textarea" as const },
  { key: "projectsCount", label: "Projects count", type: "number" as const },
  { key: "investmentAmount", label: "Investment amount", placeholder: "₹8,400 Cr" },
  {
    key: "keySectors",
    label: "Priority sectors (one per line)",
    type: "list" as const,
  },
  {
    key: "infrastructure",
    label: "Infrastructure (one per line)",
    type: "list" as const,
  },
  {
    key: "govtInitiatives",
    label: "Govt initiatives (one per line)",
    type: "list" as const,
  },
];

export default function Page() {
  return (
    <CmsCollectionPage
      title="States"
      description="State cards shown on the homepage Regional Coverage map."
      collection="states"
      titleKey="name"
      subtitleKey="badge"
      fields={STATE_FIELDS}
    />
  );
}
