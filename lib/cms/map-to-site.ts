import { site as seedSite } from "@/content/site";
import type { CmsStoreSnapshot } from "@/lib/cms/types";

/** Site-shaped object used by public UI (compatible with content/site.ts). */
export type PublicSite = typeof seedSite & {
  social?: { platform: string; url: string }[];
  loaderMessage?: string;
  loaderTagline?: string;
  analytics?: {
    stateCapital: { name: string; capital: number }[];
    sectors: { name: string; value: number; color: string }[];
  };
};

function itemsOf<T>(snap: CmsStoreSnapshot, collection: string): T[] {
  return snap.items
    .filter((i) => i.collection === collection && i.is_published !== false)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((i) => ({ id: i.id, ...i.data }) as T);
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
    hero: s.hero || seedSite.hero,
    benefits: benefits.length ? benefits : seedSite.benefits,
    applySteps: applySteps.length ? applySteps : seedSite.applySteps,
    partners: partners.length ? partners : seedSite.partners,
    allProjects: (() => {
      const rows = itemsOf<PublicSite["allProjects"][number]>(snap, "allProjects");
      return rows.length ? rows : seedSite.allProjects;
    })(),
    upcomingEvents: (() => {
      const rows = itemsOf<PublicSite["upcomingEvents"][number]>(
        snap,
        "upcomingEvents"
      );
      return rows.length ? rows : seedSite.upcomingEvents;
    })(),
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
  return snap.navigation
    .filter((n) => n.location === location && n.is_visible !== false)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((n) => ({ href: n.href, label: n.label }));
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
