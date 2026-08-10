import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Strip phone display noise so `tel:` links work reliably. */
export function sanitizeTel(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export const CONTACT_INTENT_SUBJECTS: Record<string, string> = {
  donate: "Funding",
  funding: "Funding",
  tender: "Tender Guidance",
  tender_guidance: "Tender Guidance",
  scheme_assistance: "Scheme Assistance",
  invest: "Investment Inquiry",
  event_register: "Event Registration",
  report_request: "Report Request",
  newsletter: "Newsletter",
  media: "Media",
  membership: "Membership",
};

export function subjectFromIntent(intent?: string | null) {
  if (!intent) return "Membership";
  return CONTACT_INTENT_SUBJECTS[intent] || "Membership";
}
