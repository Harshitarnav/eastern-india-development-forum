import { site } from "@/content/site";
import type {
  CmsItemRecord,
  CmsNavItem,
  CmsSeoRecord,
  CmsSettings,
  CmsStoreSnapshot,
} from "@/lib/cms/types";
import { DEFAULT_HEADER_LAYOUT, DEFAULT_HOMEPAGE, DEFAULT_INVESTORS_PAGE } from "@/lib/cms/types";

const GALLERY_SEED = [
  { id: "img-hero", src: "/images/hero-banner.jpg", title: "EIDF Core Development Vision Banner", category: "Identity & Media", description: "Flagship promotional banner illustrating regional infrastructure integration.", location: "Ranchi HQ, Jharkhand", date: "July 2026" },
  { id: "img-poster", src: "/images/eidf_poster.jpg", title: "National Seminar Poster Mockup", category: "Identity & Media", description: "Official print-ready poster template.", location: "Ranchi, Jharkhand", date: "June 2026" },
  { id: "img-logo", src: "/images/logo.png", title: "Official EIDF Symbol & Brand Identity", category: "Identity & Media", description: "Official brand seal.", location: "Ranchi HQ", date: "August 2026" },
  { id: "img-01", src: "/images/eidf_01.jpg", title: "Eastern Skill Centre Corridor Groundwork", category: "Site Visits", description: "Site inspections for vocational campus.", location: "Cuttack, Odisha", date: "May 2026" },
  { id: "img-02", src: "/images/eidf_02.jpg", title: "Ranchi Vocational Lab Setup", category: "Site Visits", description: "Technical laboratories unveiling.", location: "Ranchi, Jharkhand", date: "June 2026" },
  { id: "img-03", src: "/images/eidf_03.jpg", title: "Inland Waterways Sagarmala Freight Hub", category: "Site Visits", description: "NW-1 cargo docking inspection.", location: "Muzaffarpur, Bihar", date: "April 2026" },
  { id: "img-04", src: "/images/eidf_04.jpg", title: "Brahmaputra Organic Agriculture Corridor", category: "Site Visits", description: "Organic certificate operations.", location: "Guwahati, Assam", date: "July 2026" },
  { id: "img-05", src: "/images/eidf_05.jpg", title: "Global Diaspora Investors Roundtable", category: "Seminars", description: "Private capital alignment roundtable.", location: "Kolkata, West Bengal", date: "June 2026" },
  { id: "img-06", src: "/images/eidf_06.jpg", title: "Dignitaries Lighting the Inaugural Lamp", category: "Seminars", description: "National development convention opening.", location: "Umanand Auditorium, Ranchi", date: "June 2026" },
  { id: "img-07", src: "/images/eidf_07.jpg", title: "Panel on Tribal Inclusion & Skill Development", category: "Seminars", description: "Vocational funding pathways panel.", location: "Patna Trade Center, Bihar", date: "May 2026" },
  { id: "img-08", src: "/images/eidf_08.jpg", title: "EIDF State Chapter Officers Group", category: "Community", description: "Regional directors alignment.", location: "Bhubaneswar, Odisha", date: "July 2026" },
  { id: "img-09", src: "/images/eidf_09.jpg", title: "Floral Tribute & Founding Ceremony", category: "Community", description: "Founding ceremony tribute.", location: "Ranchi HQ, Jharkhand", date: "August 2026" },
  { id: "img-10", src: "/images/eidf_10.jpg", title: "Youth Skilling Orientation Drive", category: "Community", description: "Candidate orientation drive.", location: "Muzaffarpur, Bihar", date: "July 2026" },
  { id: "img-11", src: "/images/eidf_11.jpg", title: "Heritage Conservation Inspection Team", category: "Site Visits", description: "Buddhist circuit conservation review.", location: "Gaya, Bihar", date: "March 2026" },
  { id: "img-12", src: "/images/eidf_12.jpg", title: "Smart Water Management Briefing", category: "Site Visits", description: "Solar irrigation briefing.", location: "Bhubaneswar, Odisha", date: "June 2026" },
  { id: "img-13", src: "/images/eidf_13.jpg", title: "Rural Electrification Assessment", category: "Site Visits", description: "Solar micro-grid verification.", location: "Simdega, Jharkhand", date: "May 2026" },
  { id: "img-14", src: "/images/eidf_14.jpg", title: "Diaspora Cultural Integration Meet", category: "Community", description: "Cultural integration meet.", location: "Newtown, Kolkata", date: "July 2026" },
  { id: "img-15", src: "/images/eidf_15.jpeg", title: "EIDF Regional Outreach Moment", category: "Community", description: "Community and stakeholder engagement captured during EIDF regional outreach.", location: "Eastern India", date: "August 2026" },
];

function toItems(collection: string, rows: unknown[]): CmsItemRecord[] {
  return rows.map((row, index) => {
    const data = row as Record<string, unknown>;
    const id =
      (typeof data.id === "string" && data.id) ||
      (typeof data.key === "string" && data.key) ||
      `${collection}-${index + 1}`;
    const slug =
      (typeof data.slug === "string" && data.slug) ||
      (typeof data.title === "string"
        ? String(data.title)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : id);
    return {
      id,
      collection,
      data,
      sort_order: index,
      is_published: true,
      slug,
      updated_at: new Date().toISOString(),
    };
  });
}

export function buildSeedSnapshot(): CmsStoreSnapshot {
  const settings: CmsSettings = {
    name: site.name,
    shortName: site.shortName,
    tagline: site.tagline,
    poweredBy: site.poweredBy,
    email: site.email,
    phone: site.phone,
    regNo: site.regNo,
    president: site.president,
    headquarters: site.headquarters,
    address: site.address,
    social: [
      { platform: "LinkedIn", url: "https://www.linkedin.com" },
      { platform: "X", url: "https://x.com" },
      { platform: "YouTube", url: "https://youtube.com" },
    ],
    loaderMessage: "Preparing Your Experience…",
    loaderTagline: "Building the Future of Eastern India",
    logo: "/images/logo.png",
    hero: {
      ...site.hero,
      image: "/images/hero-banner.jpg",
    },
    analytics: {
      stateCapital: [
        { name: "Odisha", capital: 14800 },
        { name: "Jharkhand", capital: 11200 },
        { name: "West Bengal", capital: 9500 },
        { name: "Bihar", capital: 8400 },
        { name: "Assam", capital: 6100 },
        { name: "NE States", capital: 4200 },
      ],
      sectors: [
        { name: "Infrastructure & Ports", value: 35, color: "#f59e0b" },
        { name: "Renewable Energy", value: 25, color: "#10b981" },
        { name: "Manufacturing & SEZ", value: 20, color: "#3b82f6" },
        { name: "Agri-Tech & Skilling", value: 20, color: "#8b5cf6" },
      ],
    },
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://eidf.org.in",
    headerLayout: { ...DEFAULT_HEADER_LAYOUT },
    homepage: { ...DEFAULT_HOMEPAGE },
    investorsPage: { ...DEFAULT_INVESTORS_PAGE },
  };

  const navigation: CmsNavItem[] = [
    ...[
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Membership", href: "/membership" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
    ].map((n, i) => ({
      id: `header-${i}`,
      location: "header" as const,
      label: n.label,
      href: n.href,
      sort_order: i,
      is_visible: true,
    })),
    ...[
      { label: "Tenders", href: "/tenders" },
      { label: "Investors", href: "/investors" },
      { label: "Schemes", href: "/schemes" },
      { label: "Resources", href: "/resources" },
      { label: "Analytics", href: "/analytics" },
      { label: "Gallery", href: "/gallery" },
    ].map((n, i) => ({
      id: `portal-${i}`,
      location: "portal" as const,
      label: n.label,
      href: n.href,
      sort_order: i,
      is_visible: true,
    })),
    ...[
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Membership", href: "/membership" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
      { label: "Tenders", href: "/tenders" },
    ].map((n, i) => ({
      id: `footer-${i}`,
      location: "footer" as const,
      label: n.label,
      href: n.href,
      sort_order: i,
      is_visible: true,
    })),
  ];

  const items: CmsItemRecord[] = [
    ...toItems("projects", site.projects),
    ...toItems("schemes", site.schemes),
    ...toItems("tenders", site.tenders),
    ...toItems("investmentZones", site.investmentZones),
    ...toItems("reports", site.reports),
    ...toItems("events", site.events),
    ...toItems("news", site.news),
    ...toItems("faqs", site.faqs),
    ...toItems("leaders", site.leaders),
    ...toItems("values", site.values),
    ...toItems("offices", site.offices),
    ...toItems("focusAreas", site.focusAreas),
    ...toItems("states", site.statesData),
    ...toItems(
      "partners",
      site.partners.map((name, i) => ({ id: `partner-${i}`, name }))
    ),
    ...toItems(
      "benefits",
      site.benefits.map((b, i) => ({ id: `benefit-${i}`, ...b }))
    ),
    ...toItems(
      "applySteps",
      site.applySteps.map((s, i) => ({ id: `step-${i}`, ...s }))
    ),
    ...toItems("gallery", GALLERY_SEED),
    ...toItems("impactStats", site.impactStats),
    ...toItems("onlineServices", [
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
    ]),
    ...toItems("sections", [
      { id: "hero", key: "hero", title: "Hero", is_visible: true },
      {
        id: "onlineServices",
        key: "onlineServices",
        title: "Online Services",
        is_visible: true,
      },
      { id: "impact", key: "impact", title: "Impact Stats", is_visible: true },
      { id: "about", key: "about", title: "About", is_visible: true },
      { id: "focus", key: "focus", title: "Focus Areas", is_visible: true },
      { id: "map", key: "map", title: "State Map", is_visible: true },
      { id: "schemes", key: "schemes", title: "Schemes", is_visible: true },
      { id: "tenders", key: "tenders", title: "Tenders", is_visible: true },
      { id: "projects", key: "projects", title: "Projects", is_visible: true },
      {
        id: "investors",
        key: "investors",
        title: "Investors",
        is_visible: true,
      },
      {
        id: "resources",
        key: "resources",
        title: "Resources",
        is_visible: true,
      },
      {
        id: "events",
        key: "events",
        title: "Events & News",
        is_visible: true,
      },
      { id: "faq", key: "faq", title: "FAQs", is_visible: true },
      { id: "offices", key: "offices", title: "Offices", is_visible: true },
      { id: "cta", key: "cta", title: "Bottom CTA", is_visible: true },
    ]),
    ...toItems("testimonials", []),
  ];

  const paths = [
    "/",
    "/about",
    "/projects",
    "/schemes",
    "/tenders",
    "/investors",
    "/resources",
    "/membership",
    "/events",
    "/gallery",
    "/contact",
    "/analytics",
    "/creatives",
    "/proposals/submit",
  ];

  const seo: CmsSeoRecord[] = paths.map((path) => {
    const titleMap: Record<string, string> = {
      "/": "Eastern India Development Forum (EIDF)",
      "/about": "About EIDF",
      "/projects": "Projects",
      "/schemes": "Government Schemes",
      "/tenders": "Tender Assistance Center",
      "/investors": "Investor Opportunities",
      "/resources": "Knowledge Center",
      "/membership": "Membership",
      "/events": "Events & News",
      "/gallery": "Media Hub & Gallery",
      "/contact": "Contact",
      "/analytics": "Development Analytics",
      "/creatives": "Brand Creatives",
      "/proposals/submit": "Submit a Proposal",
    };
    return {
      path,
      title: titleMap[path] || "EIDF",
      description: site.tagline,
      robots: "index,follow",
      noindex: false,
      og_title: titleMap[path],
      og_description: site.tagline,
      og_image: "/images/hero-banner.jpg",
      twitter_title: titleMap[path],
      twitter_description: site.tagline,
      twitter_image: "/images/hero-banner.jpg",
      canonical: `${settings.siteUrl}${path === "/" ? "" : path}`,
      jsonld: null,
      hreflang: null,
      updated_at: new Date().toISOString(),
    };
  });

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    settings,
    navigation,
    items,
    seo,
    media: GALLERY_SEED.map((g) => ({
      id: g.id,
      url: g.src,
      alt: g.title,
      title: g.title,
      folder: g.category,
      mime_type: g.src.endsWith(".png") ? "image/png" : "image/jpeg",
    })),
    redirects: [],
  };
}
