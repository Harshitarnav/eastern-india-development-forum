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
  | "testimonials"
  | "onlineServices";

export type CmsHomepageSectionCopy = {
  eyebrow: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/** Regional Coverage section + InteractiveMap chrome */
export type CmsHomepageMapSettings = CmsHomepageSectionCopy & {
  portalEyebrow: string;
  portalTitle: string;
  hint: string;
  coverageNote: string;
  dataUpdatedLabel: string;
  intelligenceCardLabel: string;
  capitalLabel: string;
  projectsLabel: string;
  sectorsLabel: string;
  spotlightLabel: string;
  exploreCtaLabel: string;
  schemesCtaLabel: string;
};

export type CmsHomepageSettings = {
  onlineServices: {
    title: string;
    helpLabel: string;
    helpHref: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    leadersTitle: string;
  };
  focus: CmsHomepageSectionCopy;
  map: CmsHomepageMapSettings;
  schemes: CmsHomepageSectionCopy;
  tenders: CmsHomepageSectionCopy;
  projects: CmsHomepageSectionCopy;
  investments: CmsHomepageSectionCopy;
  news: CmsHomepageSectionCopy;
  events: CmsHomepageSectionCopy;
  resources: CmsHomepageSectionCopy;
  faq: CmsHomepageSectionCopy;
  offices: CmsHomepageSectionCopy;
  membershipCta: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
    metricsTitle: string;
  };
};

export const DEFAULT_HOMEPAGE: CmsHomepageSettings = {
  onlineServices: {
    title: "Online Services",
    helpLabel: "Help Desk →",
    helpHref: "/contact",
  },
  about: {
    eyebrow: "About the Forum",
    title: "Apex development council for Eastern India",
    description:
      "EIDF operates under Umanand Eastern Foundation as a non-governmental development council bridging state administrations, industry, global investors, and communities across Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North East.",
    ctaLabel: "Read full charter & leadership",
    ctaHref: "/about",
    leadersTitle: "Leadership & Governance",
  },
  focus: {
    eyebrow: "Priority Sectors",
    title: "Strategic development pillars",
    description:
      "Focus areas aligned with state industrial policies and national development priorities.",
  },
  map: {
    eyebrow: "Regional Coverage",
    title: "Explore development across Eastern India",
    description:
      "Select a state to view corridors, pledged capital, and priority sectors.",
    portalEyebrow: "Interactive GIS Portal",
    portalTitle: "Eastern India Regional Map",
    hint: "Tap a state for intelligence",
    coverageNote:
      "Coverage: Bihar, Jharkhand, Odisha, West Bengal, Assam & NE States",
    dataUpdatedLabel: "Data Updated: Live Stream",
    intelligenceCardLabel: "State Intelligence Card",
    capitalLabel: "Capital Pledged",
    projectsLabel: "Facilitated Projects",
    sectorsLabel: "Priority Sectors",
    spotlightLabel: "Impact Spotlight",
    exploreCtaLabel: "Explore Opportunities",
    schemesCtaLabel: "View Schemes",
  },
  schemes: {
    eyebrow: "Government Schemes",
    title: "Subsidies & incentive programmes",
    ctaLabel: "All schemes",
    ctaHref: "/schemes",
  },
  tenders: {
    eyebrow: "Public Procurement",
    title: "Latest tenders & RFPs",
    ctaLabel: "Tender portal",
    ctaHref: "/tenders",
  },
  projects: {
    eyebrow: "Flagship Projects",
    title: "Development corridors in progress",
    ctaLabel: "All projects",
    ctaHref: "/projects",
  },
  investments: {
    eyebrow: "Investment Desk",
    title: "Industrial parks & PPP opportunities",
    ctaLabel: "Investor portal",
    ctaHref: "/investors",
  },
  news: {
    eyebrow: "Press & Media",
    title: "Latest announcements",
  },
  events: {
    eyebrow: "Calendar",
    title: "Upcoming events",
    ctaLabel: "Full calendar →",
    ctaHref: "/events",
  },
  resources: {
    eyebrow: "Knowledge Center",
    title: "Reports & policy downloads",
    ctaLabel: "Full library →",
    ctaHref: "/resources",
  },
  faq: {
    eyebrow: "Help & Transparency",
    title: "Frequently asked questions",
  },
  offices: {
    eyebrow: "Directory",
    title: "Regional offices",
    description:
      "State cells ready to assist with membership, investment, and project facilitation.",
  },
  membershipCta: {
    eyebrow: "Citizen & Diaspora Network",
    title: "Become an official EIDF member",
    description:
      "Access project briefs, RFP notifications, diaspora summits, and a voice in community heritage initiatives.",
    bullets: [
      "Confidential project & RFP updates",
      "Global diaspora investment summit invitations",
      "Voting rights on heritage programmes",
    ],
    primary: { label: "Register for membership", href: "/membership" },
    secondary: { label: "Submit a proposal", href: "/proposals/submit" },
    metricsTitle: "Facilitation Snapshot",
  },
};

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

export interface CmsHeaderLayout {
  menuAlign: "left" | "center" | "right" | "between";
  showTopBar: boolean;
  showSearch: boolean;
  showCta: boolean;
  showPortalsDropdown: boolean;
  showBrandText: boolean;
  brandTextMode: "full" | "short";
  sticky: boolean;
  ctaLabel: string;
  ctaHref: string;
  portalsLabel: string;
  /** Where the Portals dropdown sits among header links */
  portalsPosition: "after-primary" | "before-cta" | "end";
}

export const DEFAULT_HEADER_LAYOUT: CmsHeaderLayout = {
  menuAlign: "between",
  showTopBar: true,
  showSearch: true,
  showCta: true,
  showPortalsDropdown: true,
  showBrandText: true,
  brandTextMode: "full",
  sticky: true,
  ctaLabel: "Join Us",
  ctaHref: "/membership",
  portalsLabel: "Portals",
  portalsPosition: "after-primary",
};

/** Full /investors page chrome (zone cards themselves are investmentZones). */
export type CmsInvestorsPageSettings = {
  heroTitle: string;
  heroDescription: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  pledgedValue: string;
  pledgedLabel: string;
  zonesLabel: string;
  statesValue: string;
  statesLabel: string;
  sectionEyebrow: string;
  sectionTitle: string;
  prioritySectorsLabel: string;
  incentivesLabel: string;
  pppModelLabel: string;
  briefingCtaLabel: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export const DEFAULT_INVESTORS_PAGE: CmsInvestorsPageSettings = {
  heroTitle: "Investor Opportunities",
  heroDescription:
    "FDI, domestic capital, and PPP facilitation across industrial parks, SEZs, and logistics corridors in Eastern India.",
  primaryCtaLabel: "Submit Investment Inquiry",
  primaryCtaHref: "/proposals/submit",
  secondaryCtaLabel: "View Analytics",
  secondaryCtaHref: "/analytics",
  pledgedValue: "₹25,000 Cr+",
  pledgedLabel: "Pledged Capital",
  zonesLabel: "Investment Zones",
  statesValue: "8+",
  statesLabel: "States & UTs",
  sectionEyebrow: "Investment Zones",
  sectionTitle: "Industrial parks & SEZ opportunities",
  prioritySectorsLabel: "Priority sectors",
  incentivesLabel: "Incentives",
  pppModelLabel: "PPP Model",
  briefingCtaLabel: "Schedule briefing",
  ctaTitle: "Looking for a tailored investment briefing?",
  ctaDescription:
    "Submit your capital thesis and sector focus — EIDF will connect you with the right state cell.",
  ctaPrimaryLabel: "Submit Investment Inquiry",
  ctaPrimaryHref: "/proposals/submit",
  ctaSecondaryLabel: "Contact Investor Desk",
  ctaSecondaryHref: "/contact?intent=invest",
};

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
  /** Site / header logo path or uploaded URL */
  logo?: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheading: string;
    image?: string;
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
  headerLayout?: CmsHeaderLayout;
  homepage?: CmsHomepageSettings;
  investorsPage?: CmsInvestorsPageSettings;
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
  { key: "projects", label: "Projects", adminHref: "/admin/projects" },
  { key: "allProjects", label: "Projects (legacy alias)", adminHref: "/admin/projects" },
  { key: "schemes", label: "Government Schemes", adminHref: "/admin/schemes" },
  { key: "tenders", label: "Tenders", adminHref: "/admin/tenders" },
  { key: "investmentZones", label: "Investment Zones", adminHref: "/admin/investments" },
  { key: "reports", label: "Reports / Downloads", adminHref: "/admin/downloads" },
  { key: "events", label: "Events", adminHref: "/admin/events" },
  { key: "news", label: "News", adminHref: "/admin/news" },
  { key: "faqs", label: "FAQs", adminHref: "/admin/cms?tab=homepage" },
  { key: "leaders", label: "Leadership", adminHref: "/admin/leadership" },
  { key: "values", label: "Values", adminHref: "/admin/leadership" },
  { key: "offices", label: "Offices", adminHref: "/admin/offices" },
  { key: "focusAreas", label: "Focus Areas", adminHref: "/admin/cms?tab=homepage" },
  { key: "onlineServices", label: "Online Services", adminHref: "/admin/cms?tab=homepage" },
  { key: "states", label: "States", adminHref: "/admin/states" },
  { key: "partners", label: "Partners", adminHref: "/admin/partners" },
  { key: "benefits", label: "Membership Benefits", adminHref: "/admin/members" },
  { key: "applySteps", label: "Apply Steps", adminHref: "/admin/members" },
  { key: "gallery", label: "Gallery", adminHref: "/admin/gallery" },
  { key: "impactStats", label: "Impact Stats", adminHref: "/admin/analytics" },
  { key: "upcomingEvents", label: "Events (legacy alias)", adminHref: "/admin/events" },
  { key: "sections", label: "Page Sections", adminHref: "/admin/cms?tab=homepage" },
  { key: "testimonials", label: "Testimonials", adminHref: "/admin/testimonials" },
];
