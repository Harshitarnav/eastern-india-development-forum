import { site as seedSite } from "@/content/site";
import type { CmsHomepageSettings, CmsInvestorsPageSettings, CmsStoreSnapshot } from "@/lib/cms/types";
import { DEFAULT_HOMEPAGE, DEFAULT_INVESTORS_PAGE } from "@/lib/cms/types";
import {
  mergeAssistant,
  mergePages,
  type CmsAssistantSettings,
  type CmsPagesSettings,
} from "@/lib/cms/page-settings";

/** Site-shaped object used by public UI (compatible with content/site.ts). */
export type PublicSite = Omit<typeof seedSite, "hero"> & {
  social?: { platform: string; url: string }[];
  loaderMessage?: string;
  loaderTagline?: string;
  logo?: string;
  hero: typeof seedSite.hero & { image?: string };
  analytics?: {
    stateCapital: { name: string; capital: number }[];
    sectors: { name: string; value: number; color: string }[];
  };
  homepage: CmsHomepageSettings;
  investorsPage: CmsInvestorsPageSettings;
  pages: CmsPagesSettings;
  assistant: CmsAssistantSettings;
  testimonials: {
    id: string;
    name: string;
    role?: string;
    quote: string;
    org?: string;
    image?: string;
  }[];
  creatives: {
    id: string;
    title: string;
    category: string;
    image: string;
    downloadUrl: string;
    downloadLabel?: string;
    description: string;
  }[];
  onlineServices: {
    id: string;
    label: string;
    desc: string;
    href: string;
    iconName: string;
  }[];
  sections: Record<string, { title: string; is_visible: boolean }>;
};

const DEFAULT_ONLINE_SERVICES: PublicSite["onlineServices"] = [
  {
    id: "svc-tenders",
    label: "Tenders",
    desc: "RFP & procurement",
    href: "/tenders",
    iconName: "FileText",
  },
  {
    id: "svc-schemes",
    label: "Schemes",
    desc: "Subsidies & incentives",
    href: "/schemes",
    iconName: "LayoutDashboard",
  },
  {
    id: "svc-investors",
    label: "Investors",
    desc: "PPP & industrial parks",
    href: "/investors",
    iconName: "Briefcase",
  },
  {
    id: "svc-projects",
    label: "Projects",
    desc: "Active corridors",
    href: "/projects",
    iconName: "Building2",
  },
  {
    id: "svc-resources",
    label: "Resources",
    desc: "Reports & policies",
    href: "/resources",
    iconName: "BookOpen",
  },
  {
    id: "svc-membership",
    label: "Membership",
    desc: "Join the network",
    href: "/membership",
    iconName: "Users",
  },
  {
    id: "svc-analytics",
    label: "Analytics",
    desc: "Regional dashboards",
    href: "/analytics",
    iconName: "BarChart3",
  },
  {
    id: "svc-contact",
    label: "Help Desk",
    desc: "Get assistance",
    href: "/contact",
    iconName: "ShieldCheck",
  },
];

const DEFAULT_SECTIONS: PublicSite["sections"] = {
  hero: { title: "Hero", is_visible: true },
  onlineServices: { title: "Online Services", is_visible: true },
  impact: { title: "Impact Stats", is_visible: true },
  about: { title: "About", is_visible: true },
  focus: { title: "Focus Areas", is_visible: true },
  map: { title: "State Map", is_visible: true },
  schemes: { title: "Schemes", is_visible: true },
  tenders: { title: "Tenders", is_visible: true },
  projects: { title: "Projects", is_visible: true },
  investors: { title: "Investors", is_visible: true },
  resources: { title: "Resources", is_visible: true },
  events: { title: "Events & News", is_visible: true },
  faq: { title: "FAQs", is_visible: true },
  offices: { title: "Offices", is_visible: true },
  cta: { title: "Bottom CTA", is_visible: true },
};

function itemsOf<T>(snap: CmsStoreSnapshot, collection: string): T[] {
  return snap.items
    .filter((i) => i.collection === collection && i.is_published !== false)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((i) => ({ id: i.id, ...i.data }) as T);
}

function mergeHomepage(
  partial?: Partial<CmsHomepageSettings> | null
): CmsHomepageSettings {
  const src = partial || {};
  return {
    onlineServices: {
      ...DEFAULT_HOMEPAGE.onlineServices,
      ...src.onlineServices,
    },
    about: { ...DEFAULT_HOMEPAGE.about, ...src.about },
    focus: { ...DEFAULT_HOMEPAGE.focus, ...src.focus },
    map: { ...DEFAULT_HOMEPAGE.map, ...src.map },
    schemes: { ...DEFAULT_HOMEPAGE.schemes, ...src.schemes },
    tenders: { ...DEFAULT_HOMEPAGE.tenders, ...src.tenders },
    projects: { ...DEFAULT_HOMEPAGE.projects, ...src.projects },
    investments: { ...DEFAULT_HOMEPAGE.investments, ...src.investments },
    news: { ...DEFAULT_HOMEPAGE.news, ...src.news },
    events: { ...DEFAULT_HOMEPAGE.events, ...src.events },
    resources: { ...DEFAULT_HOMEPAGE.resources, ...src.resources },
    faq: { ...DEFAULT_HOMEPAGE.faq, ...src.faq },
    offices: { ...DEFAULT_HOMEPAGE.offices, ...src.offices },
    membershipCta: {
      ...DEFAULT_HOMEPAGE.membershipCta,
      ...src.membershipCta,
      bullets:
        src.membershipCta?.bullets ?? DEFAULT_HOMEPAGE.membershipCta.bullets,
      primary: {
        ...DEFAULT_HOMEPAGE.membershipCta.primary,
        ...src.membershipCta?.primary,
      },
      secondary: {
        ...DEFAULT_HOMEPAGE.membershipCta.secondary,
        ...src.membershipCta?.secondary,
      },
    },
  };
}

export function mapSnapshotToPublicSite(snap: CmsStoreSnapshot): PublicSite {
  const s = snap.settings;
  const partners = itemsOf<{ name?: string }>(snap, "partners").map(
    (p) => p.name || String((p as { id?: string }).id || "")
  );
  const benefits = itemsOf<{ title: string; desc: string }>(snap, "benefits");
  const applySteps = itemsOf<{ n: string; title: string; desc: string }>(
    snap,
    "applySteps"
  );

  const sectionRows = itemsOf<{
    key?: string;
    title?: string;
    is_visible?: boolean;
  }>(snap, "sections");
  const sections: PublicSite["sections"] = { ...DEFAULT_SECTIONS };
  for (const row of sectionRows) {
    const key = row.key || (row as { id?: string }).id;
    if (!key) continue;
    sections[key] = {
      title: row.title || sections[key]?.title || key,
      is_visible: row.is_visible !== false,
    };
  }

  const onlineServices = itemsOf<PublicSite["onlineServices"][number]>(
    snap,
    "onlineServices"
  );

  return {
    ...seedSite,
    name: s.name || seedSite.name,
    shortName: s.shortName || seedSite.shortName,
    tagline: s.tagline || seedSite.tagline,
    poweredBy: s.poweredBy || seedSite.poweredBy,
    email: s.email || seedSite.email,
    phone: s.phone || seedSite.phone,
    regNo: s.regNo || seedSite.regNo,
    president: s.president || seedSite.president,
    headquarters: s.headquarters || seedSite.headquarters,
    address: s.address?.length ? s.address : seedSite.address,
    logo: s.logo || "/images/logo.png",
    hero: s.hero || seedSite.hero,
    homepage: mergeHomepage(s.homepage),
    investorsPage: {
      ...DEFAULT_INVESTORS_PAGE,
      ...(s.investorsPage || {}),
    },
    pages: mergePages(s.pages),
    assistant: mergeAssistant(s.assistant),
    testimonials: itemsOf<PublicSite["testimonials"][number]>(snap, "testimonials"),
    creatives: (() => {
      const rows = itemsOf<PublicSite["creatives"][number]>(snap, "creatives");
      return rows.length
        ? rows
        : [
            {
              id: "creative-poster",
              title: "Seminar Poster",
              category: "Print Template",
              image: "/images/eidf_poster.jpg",
              downloadUrl: "/images/eidf_poster.jpg",
              downloadLabel: "Download Poster",
              description:
                "Official print-ready poster template for seminars and conventions.",
            },
          ];
    })(),
    onlineServices: onlineServices.length
      ? onlineServices
      : DEFAULT_ONLINE_SERVICES,
    sections,
    benefits: benefits.length ? benefits : seedSite.benefits,
    applySteps: applySteps.length ? applySteps : seedSite.applySteps,
    partners: partners.length ? partners : seedSite.partners,
    impactStats: (() => {
      const rows = itemsOf<PublicSite["impactStats"][number]>(snap, "impactStats");
      return rows.length ? rows : seedSite.impactStats;
    })(),
    statesData: (() => {
      const rows = itemsOf<PublicSite["statesData"][number]>(snap, "states");
      return rows.length ? rows : seedSite.statesData;
    })(),
    focusAreas: (() => {
      const rows = itemsOf<PublicSite["focusAreas"][number]>(snap, "focusAreas");
      return rows.length ? rows : seedSite.focusAreas;
    })(),
    projects: (() => {
      const rows = itemsOf<PublicSite["projects"][number]>(snap, "projects");
      return rows.length ? rows : seedSite.projects;
    })(),
    // Same source as `projects` — kept for older callers / seed shape.
    allProjects: (() => {
      const rows = itemsOf<PublicSite["projects"][number]>(snap, "projects");
      const list = rows.length ? rows : seedSite.projects;
      return list.map((p) => ({
        tag: p.tag,
        title: p.title,
        desc: p.desc,
        img: p.image || "",
        status: p.status || p.state,
      }));
    })(),
    schemes: (() => {
      const rows = itemsOf<PublicSite["schemes"][number]>(snap, "schemes");
      return rows.length ? rows : seedSite.schemes;
    })(),
    tenders: (() => {
      const rows = itemsOf<PublicSite["tenders"][number]>(snap, "tenders");
      return rows.length ? rows : seedSite.tenders;
    })(),
    investmentZones: (() => {
      const rows = itemsOf<PublicSite["investmentZones"][number]>(
        snap,
        "investmentZones"
      );
      return rows.length ? rows : seedSite.investmentZones;
    })(),
    reports: (() => {
      const rows = itemsOf<PublicSite["reports"][number]>(snap, "reports");
      return rows.length ? rows : seedSite.reports;
    })(),
    events: (() => {
      const rows = itemsOf<PublicSite["events"][number]>(snap, "events");
      return rows.length ? rows : seedSite.events;
    })(),
    // Same source as `events` — compact title/date for older callers.
    upcomingEvents: (() => {
      const rows = itemsOf<PublicSite["events"][number]>(snap, "events");
      const list = rows.length ? rows : seedSite.events;
      return list.map((e) => ({ title: e.title, date: e.date }));
    })(),
    news: (() => {
      const rows = itemsOf<PublicSite["news"][number]>(snap, "news");
      return rows.length ? rows : seedSite.news;
    })(),
    leaders: (() => {
      const rows = itemsOf<PublicSite["leaders"][number]>(snap, "leaders");
      return rows.length ? rows : seedSite.leaders;
    })(),
    values: (() => {
      const rows = itemsOf<PublicSite["values"][number]>(snap, "values");
      return rows.length ? rows : seedSite.values;
    })(),
    faqs: (() => {
      const rows = itemsOf<PublicSite["faqs"][number]>(snap, "faqs");
      return rows.length ? rows : seedSite.faqs;
    })(),
    offices: (() => {
      const rows = itemsOf<PublicSite["offices"][number]>(snap, "offices");
      return rows.length ? rows : seedSite.offices;
    })(),
    social: s.social,
    loaderMessage: s.loaderMessage,
    loaderTagline: s.loaderTagline,
    analytics: s.analytics,
  };
}

export function getNavLinks(
  snap: CmsStoreSnapshot,
  location: "header" | "portal" | "footer"
) {
  const seen = new Set<string>();
  return snap.navigation
    .filter((n) => n.location === location && n.is_visible !== false)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((n) => ({ href: n.href, label: n.label }))
    .filter((n) => {
      if (seen.has(n.href)) return false;
      seen.add(n.href);
      return true;
    });
}

export function getGalleryItems(snap: CmsStoreSnapshot) {
  const rows = itemsOf<{
    id: string;
    src: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: string;
  }>(snap, "gallery");
  return rows;
}
