"use client";

import type { FieldDef } from "@/components/cms/CmsCollectionPage";

export const SCHEME_FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "authority", label: "Authority" },
  { key: "category", label: "Category" },
  { key: "state", label: "State" },
  { key: "benefits", label: "Benefits", type: "textarea" },
  {
    key: "eligibility",
    label: "Eligibility (one criterion per line)",
    type: "list",
  },
  { key: "applicationProcess", label: "Application process", type: "textarea" },
  { key: "deadline", label: "Deadline" },
];

export const TENDER_FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "tenderNo", label: "Tender no." },
  { key: "issuingAuthority", label: "Issuing authority" },
  { key: "category", label: "Category" },
  { key: "state", label: "State" },
  { key: "estimatedCost", label: "Estimated cost" },
  { key: "publishedDate", label: "Published" },
  { key: "closingDate", label: "Closing date" },
  { key: "status", label: "Status" },
  { key: "docLink", label: "Document link" },
];

export const PROJECT_FIELDS: FieldDef[] = [
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
];

export const INVESTMENT_FIELDS: FieldDef[] = [
  { key: "name", label: "Zone name", required: true },
  { key: "location", label: "Location (city / region)" },
  { key: "state", label: "State" },
  { key: "area", label: "Area (e.g. 600 Acres)" },
  { key: "pppModel", label: "PPP model" },
  {
    key: "focusIndustries",
    label: "Priority sectors (one per line)",
    type: "list",
  },
  {
    key: "incentives",
    label: "Incentives (one per line)",
    type: "list",
  },
  { key: "contactEmail", label: "Contact email" },
];

export const NEWS_FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "date", label: "Date" },
  { key: "source", label: "Source" },
  { key: "category", label: "Category" },
  { key: "summary", label: "Summary", type: "textarea" },
  { key: "url", label: "Link URL" },
];

export const EVENT_FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "type", label: "Type" },
  { key: "date", label: "Date" },
  { key: "location", label: "Location" },
  { key: "mode", label: "Mode (In-Person / Hybrid / Online)" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "registerUrl", label: "Register URL" },
  {
    key: "image",
    label: "Featured image",
    type: "image",
    placeholder: "/images/eidf_06.jpg",
    folder: "events",
  },
];

export const REPORT_FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "category", label: "Category" },
  { key: "author", label: "Author" },
  { key: "date", label: "Date" },
  { key: "fileSize", label: "File size" },
  { key: "summary", label: "Summary", type: "textarea" },
  { key: "downloadUrl", label: "Download URL" },
];

export const IMPACT_FIELDS: FieldDef[] = [
  { key: "key", label: "Key" },
  { key: "label", label: "Label", required: true },
  { key: "value", label: "Value", type: "number" },
  { key: "prefix", label: "Prefix" },
  { key: "suffix", label: "Suffix" },
];

export const SERVICE_FIELDS: FieldDef[] = [
  { key: "label", label: "Label", required: true },
  { key: "desc", label: "Short description" },
  { key: "href", label: "Link URL", required: true },
  {
    key: "iconName",
    label: "Icon name",
    placeholder: "FileText, Building2, Users…",
  },
];
