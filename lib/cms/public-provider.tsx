"use client";

import React, { createContext, useContext, useMemo } from "react";
import { site as seedSite } from "@/content/site";
import type { PublicSite } from "@/lib/cms/map-to-site";
import type { CmsNavItem } from "@/lib/cms/types";

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
  site: seedSite as PublicSite,
  navigation: defaultNav,
  gallery: [],
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
  return useContext(CmsPublicContext).navigation[location];
}

export function usePublicGallery() {
  return useContext(CmsPublicContext).gallery;
}

export function navFromItems(items: CmsNavItem[], location: CmsNavItem["location"]) {
  return items
    .filter((n) => n.location === location && n.is_visible !== false)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((n) => ({ href: n.href, label: n.label }));
}
