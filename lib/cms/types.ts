export type CmsCollection =
  | "projects"
  | "allProjects"
  | "schemes"
  | "tenders"
  | "investmentZones"
  | "reports"
  | "events"
  | "news"
  | "faqs"
  | "leaders"
  | "values"
  | "offices"
  | "focusAreas"
  | "states"
  | "partners"
  | "benefits"
  | "applySteps"
  | "gallery"
  | "impactStats"
  | "upcomingEvents"
  | "sections"
  | "testimonials";

export interface CmsSeoRecord {
  path: string;
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  robots?: string | null;
  jsonld?: unknown;
  hreflang?: unknown;
  noindex?: boolean;
  updated_at?: string;
}

export interface CmsNavItem {
  id: string;
  location: "header" | "portal" | "footer" | "mobile";
  label: string;
  href: string;
  parent_id?: string | null;
  sort_order: number;
  is_visible: boolean;
}

export interface CmsItemRecord {
  id: string;
  collection: CmsCollection | string;
  data: Record<string, unknown>;
  sort_order: number;
  is_published: boolean;
  slug?: string | null;
  updated_at?: string;
}

export interface CmsMediaRecord {
  id: string;
  url: string;
  alt: string;
  title?: string | null;
  mime_type?: string | null;
  folder?: string | null;
  size_bytes?: number | null;
  created_at?: string;
}

export interface CmsRedirect {
  id: string;
  from_path: string;
  to_path: string;
  status_code: number;
  is_active: boolean;
}

export interface CmsSettings {
  name: string;
  shortName: string;
  tagline: string;
  poweredBy: string;
  email: string;
  phone: string;
  regNo: string;
  president: string;
  headquarters: string;
  address: string[];
  social: { platform: string; url: string }[];
  loaderMessage: string;
  loaderTagline: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheading: string;
    ctas: {
      primary: { label: string; href: string };
      secondary: { label: string; href: string };
      tertiary: { label: string; href: string };
    };
    floatingMetrics: { label: string; value: string }[];
  };
  analytics: {
    stateCapital: { name: string; capital: number }[];
    sectors: { name: string; value: number; color: string }[];
  };
  siteUrl: string;
  robotsExtra?: string;
}

export interface CmsStoreSnapshot {
  version: number;
  updatedAt: string;
  settings: CmsSettings;
  navigation: CmsNavItem[];
  items: CmsItemRecord[];
  seo: CmsSeoRecord[];
  media: CmsMediaRecord[];
  redirects: CmsRedirect[];
}

export const CMS_COLLECTIONS: { key: CmsCollection; label: string; adminHref: string }[] = [
  { key: "projects", label: "Featured Projects", adminHref: "/admin/projects" },
  { key: "allProjects", label: "All Projects", adminHref: "/admin/projects" },
  { key: "schemes", label: "Government Schemes", adminHref: "/admin/schemes" },
  { key: "tenders", label: "Tenders", adminHref: "/admin/tenders" },
  { key: "investmentZones", label: "Investment Zones", adminHref: "/admin/investments" },
  { key: "reports", label: "Reports / Downloads", adminHref: "/admin/downloads" },
  { key: "events", label: "Events", adminHref: "/admin/events" },
  { key: "news", label: "News", adminHref: "/admin/news" },
  { key: "faqs", label: "FAQs", adminHref: "/admin/cms" },
  { key: "leaders", label: "Leadership", adminHref: "/admin/leadership" },
  { key: "values", label: "Values", adminHref: "/admin/leadership" },
  { key: "offices", label: "Offices", adminHref: "/admin/cms" },
  { key: "focusAreas", label: "Focus Areas", adminHref: "/admin/cms" },
  { key: "states", label: "States", adminHref: "/admin/states" },
  { key: "partners", label: "Partners", adminHref: "/admin/partners" },
  { key: "benefits", label: "Membership Benefits", adminHref: "/admin/members" },
  { key: "applySteps", label: "Apply Steps", adminHref: "/admin/members" },
  { key: "gallery", label: "Gallery", adminHref: "/admin/gallery" },
  { key: "impactStats", label: "Impact Stats", adminHref: "/admin/analytics" },
  { key: "upcomingEvents", label: "Upcoming Events", adminHref: "/admin/events" },
  { key: "sections", label: "Page Sections", adminHref: "/admin/cms" },
  { key: "testimonials", label: "Testimonials", adminHref: "/admin/testimonials" },
];
