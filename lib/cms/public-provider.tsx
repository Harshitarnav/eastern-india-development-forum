"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { PublicSite } from "@/lib/cms/map-to-site";
import type { CmsHeaderLayout, CmsNavItem } from "@/lib/cms/types";
import { DEFAULT_HEADER_LAYOUT, DEFAULT_HOMEPAGE, DEFAULT_INVESTORS_PAGE } from "@/lib/cms/types";
import { site as seedSite } from "@/content/site";

const defaultOnlineServices = [
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

const defaultSections = {
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

export type CmsPublicValue = {
  site: PublicSite;
  navigation: {
    header: { href: string; label: string }[];
    portal: { href: string; label: string }[];
    footer: { href: string; label: string }[];
  };
  gallery: {
    id: string;
    src: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: string;
  }[];
  headerLayout: CmsHeaderLayout;
};

const defaultNav = {
  header: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/membership", label: "Membership" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ],
  portal: [
    { href: "/tenders", label: "Tenders" },
    { href: "/investors", label: "Investors & PPP" },
    { href: "/schemes", label: "Govt Schemes" },
    { href: "/resources", label: "Knowledge Center" },
    { href: "/analytics", label: "Analytics" },
    { href: "/gallery", label: "Gallery" },
  ],
  footer: [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/membership", label: "Membership" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
    { href: "/tenders", label: "Tenders" },
  ],
};

const defaultValue: CmsPublicValue = {
  site: {
    ...seedSite,
    homepage: DEFAULT_HOMEPAGE,
    investorsPage: DEFAULT_INVESTORS_PAGE,
    onlineServices: defaultOnlineServices,
    sections: defaultSections,
  } as PublicSite,
  navigation: defaultNav,
  gallery: [],
  headerLayout: DEFAULT_HEADER_LAYOUT,
};

const CmsPublicContext = createContext<CmsPublicValue>(defaultValue);

export function CmsPublicProvider({
  value,
  children,
}: {
  value?: Partial<CmsPublicValue> | null;
  children: React.ReactNode;
}) {
  const merged = useMemo<CmsPublicValue>(
    () => ({
      site: (value?.site as PublicSite) || defaultValue.site,
      navigation: value?.navigation || defaultValue.navigation,
      gallery: value?.gallery || defaultValue.gallery,
      headerLayout: {
        ...DEFAULT_HEADER_LAYOUT,
        ...(value?.headerLayout || {}),
      },
    }),
    [value]
  );

  return (
    <CmsPublicContext.Provider value={merged}>{children}</CmsPublicContext.Provider>
  );
}

export function usePublicSite(): PublicSite {
  return useContext(CmsPublicContext).site;
}

export function usePublicNav(location: "header" | "portal" | "footer") {
  const links = useContext(CmsPublicContext).navigation[location] || [];
  return useMemo(() => {
    const seen = new Set<string>();
    return links.filter((link) => {
      const key = link.href || link.label;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [links]);
}

export function usePublicGallery() {
  return useContext(CmsPublicContext).gallery;
}

export function usePublicHeaderLayout(): CmsHeaderLayout {
  return useContext(CmsPublicContext).headerLayout;
}

export function navFromItems(items: CmsNavItem[], location: CmsNavItem["location"]) {
  return items
    .filter((n) => n.location === location && n.is_visible !== false)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((n) => ({ href: n.href, label: n.label }));
}
