import type {
  CmsCollection,
  CmsItemRecord,
  CmsNavItem,
  CmsSeoRecord,
  CmsSettings,
  CmsStoreSnapshot,
} from "@/lib/cms/types";
import {
  DEFAULT_HEADER_LAYOUT,
  DEFAULT_HOMEPAGE,
  DEFAULT_INVESTORS_PAGE,
} from "@/lib/cms/types";
import { mergeAssistant, mergePages } from "@/lib/cms/page-settings";
import { buildSeedSnapshot } from "@/lib/cms/seed";
import { ensureFileStore, writeFileStore } from "@/lib/cms/file-store";
import {
  isSupabaseConfigured,
  readSupabaseStore,
  writeSupabaseStore,
  writeAuditLog,
} from "@/lib/cms/supabase-store";

function cloneSnap(snapshot: CmsStoreSnapshot): CmsStoreSnapshot {
  return JSON.parse(JSON.stringify(snapshot)) as CmsStoreSnapshot;
}

/**
 * Always reload from disk/Supabase.
 * Next.js can isolate module state between Route Handlers and RSC,
 * so an in-memory cache makes admin saves invisible on the public site.
 *
 * When Supabase is configured but empty, bootstrap once from the local
 * file/seed so local + hosted environments share the same content.
 */
export async function getCmsSnapshot(): Promise<CmsStoreSnapshot> {
  const fromSb = await readSupabaseStore();
  if (fromSb) return cloneSnap(fromSb);

  const fromFile = await ensureFileStore();

  if (isSupabaseConfigured()) {
    try {
      await writeSupabaseStore(fromFile);
      const bootstrapped = await readSupabaseStore();
      if (bootstrapped) return cloneSnap(bootstrapped);
    } catch (err) {
      console.error("cms bootstrap to supabase failed", err);
    }
  }

  return cloneSnap(fromFile);
}

export async function saveCmsSnapshot(
  snapshot: CmsStoreSnapshot,
  actorEmail?: string
): Promise<CmsStoreSnapshot> {
  const next = cloneSnap({
    ...snapshot,
    updatedAt: new Date().toISOString(),
  });

  // File store is the source of truth for local/dev (and fallback without Supabase)
  await writeFileStore(next);

  if (isSupabaseConfigured()) {
    try {
      await writeSupabaseStore(next);
    } catch (err) {
      console.error("supabase store write failed", err);
    }
  }

  try {
    await writeAuditLog({
      actor_email: actorEmail,
      action: "save_snapshot",
      detail: { updatedAt: next.updatedAt },
    });
  } catch (err) {
    console.warn("audit log failed", err);
  }

  return next;
}

export async function resetCmsToSeed(actorEmail?: string) {
  const seed = buildSeedSnapshot();
  return saveCmsSnapshot(seed, actorEmail);
}

export async function getCmsSettings(): Promise<CmsSettings> {
  const snap = await getCmsSnapshot();
  return snap.settings;
}

export async function updateCmsSettings(
  patch: Partial<CmsSettings>,
  actorEmail?: string
) {
  const snap = await getCmsSnapshot();
  const nextSettings: CmsSettings = {
    ...snap.settings,
    ...patch,
  };
  if (patch.hero) {
    nextSettings.hero = {
      ...snap.settings.hero,
      ...patch.hero,
      ctas: {
        ...snap.settings.hero?.ctas,
        ...patch.hero.ctas,
        primary: {
          ...snap.settings.hero?.ctas?.primary,
          ...patch.hero.ctas?.primary,
        },
        secondary: {
          ...snap.settings.hero?.ctas?.secondary,
          ...patch.hero.ctas?.secondary,
        },
        tertiary: {
          ...snap.settings.hero?.ctas?.tertiary,
          ...patch.hero.ctas?.tertiary,
        },
      },
      floatingMetrics:
        patch.hero.floatingMetrics ?? snap.settings.hero?.floatingMetrics ?? [],
    };
  }
  if (patch.analytics) {
    nextSettings.analytics = {
      ...snap.settings.analytics,
      ...patch.analytics,
      stateCapital:
        patch.analytics.stateCapital ?? snap.settings.analytics?.stateCapital ?? [],
      sectors: patch.analytics.sectors ?? snap.settings.analytics?.sectors ?? [],
    };
  }
  if (patch.headerLayout) {
    nextSettings.headerLayout = {
      ...DEFAULT_HEADER_LAYOUT,
      ...snap.settings.headerLayout,
      ...patch.headerLayout,
    };
  }
  if (patch.investorsPage) {
    nextSettings.investorsPage = {
      ...DEFAULT_INVESTORS_PAGE,
      ...snap.settings.investorsPage,
      ...patch.investorsPage,
    };
  }
  if (patch.pages) {
    nextSettings.pages = mergePages({
      ...snap.settings.pages,
      ...patch.pages,
    });
  }
  if (patch.assistant) {
    nextSettings.assistant = mergeAssistant({
      ...snap.settings.assistant,
      ...patch.assistant,
    });
  }
  if (patch.homepage) {
    const prev = snap.settings.homepage || DEFAULT_HOMEPAGE;
    const next = patch.homepage;
    nextSettings.homepage = {
      ...DEFAULT_HOMEPAGE,
      ...prev,
      ...next,
      onlineServices: {
        ...DEFAULT_HOMEPAGE.onlineServices,
        ...prev.onlineServices,
        ...next.onlineServices,
      },
      about: { ...DEFAULT_HOMEPAGE.about, ...prev.about, ...next.about },
      focus: { ...DEFAULT_HOMEPAGE.focus, ...prev.focus, ...next.focus },
      map: { ...DEFAULT_HOMEPAGE.map, ...prev.map, ...next.map },
      schemes: { ...DEFAULT_HOMEPAGE.schemes, ...prev.schemes, ...next.schemes },
      tenders: { ...DEFAULT_HOMEPAGE.tenders, ...prev.tenders, ...next.tenders },
      projects: {
        ...DEFAULT_HOMEPAGE.projects,
        ...prev.projects,
        ...next.projects,
      },
      investments: {
        ...DEFAULT_HOMEPAGE.investments,
        ...prev.investments,
        ...next.investments,
      },
      news: { ...DEFAULT_HOMEPAGE.news, ...prev.news, ...next.news },
      events: { ...DEFAULT_HOMEPAGE.events, ...prev.events, ...next.events },
      resources: {
        ...DEFAULT_HOMEPAGE.resources,
        ...prev.resources,
        ...next.resources,
      },
      faq: { ...DEFAULT_HOMEPAGE.faq, ...prev.faq, ...next.faq },
      offices: { ...DEFAULT_HOMEPAGE.offices, ...prev.offices, ...next.offices },
      membershipCta: {
        ...DEFAULT_HOMEPAGE.membershipCta,
        ...prev.membershipCta,
        ...next.membershipCta,
        bullets:
          next.membershipCta?.bullets ??
          prev.membershipCta?.bullets ??
          DEFAULT_HOMEPAGE.membershipCta.bullets,
        primary: {
          ...DEFAULT_HOMEPAGE.membershipCta.primary,
          ...prev.membershipCta?.primary,
          ...next.membershipCta?.primary,
        },
        secondary: {
          ...DEFAULT_HOMEPAGE.membershipCta.secondary,
          ...prev.membershipCta?.secondary,
          ...next.membershipCta?.secondary,
        },
      },
    };
  }
  if (patch.address) {
    nextSettings.address = patch.address;
  }
  if (patch.social) {
    nextSettings.social = patch.social;
  }
  snap.settings = nextSettings;
  return saveCmsSnapshot(snap, actorEmail);
}

export async function getCmsNavigation(location?: CmsNavItem["location"]) {
  const snap = await getCmsSnapshot();
  const items = snap.navigation.filter((n) => n.is_visible !== false);
  if (!location) return items.sort((a, b) => a.sort_order - b.sort_order);
  return items
    .filter((n) => n.location === location)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function setCmsNavigation(
  navigation: CmsNavItem[],
  actorEmail?: string
) {
  const snap = await getCmsSnapshot();
  snap.navigation = navigation;
  return saveCmsSnapshot(snap, actorEmail);
}

export async function getCmsItems<T = Record<string, unknown>>(
  collection: CmsCollection | string,
  opts?: { includeUnpublished?: boolean }
): Promise<(T & { id: string })[]> {
  const snap = await getCmsSnapshot();
  return snap.items
    .filter((i) => i.collection === collection)
    .filter((i) => (opts?.includeUnpublished ? true : i.is_published !== false))
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((i) => ({ id: i.id, ...(i.data as T) }));
}

export async function getCmsItemRecords(
  collection: CmsCollection | string,
  opts?: { includeUnpublished?: boolean }
): Promise<CmsItemRecord[]> {
  const snap = await getCmsSnapshot();
  return snap.items
    .filter((i) => i.collection === collection)
    .filter((i) => (opts?.includeUnpublished ? true : i.is_published !== false))
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function upsertCmsItem(
  item: CmsItemRecord,
  actorEmail?: string
) {
  const snap = await getCmsSnapshot();
  const idx = snap.items.findIndex(
    (i) => i.collection === item.collection && i.id === item.id
  );
  const nextItem = { ...item, updated_at: new Date().toISOString() };
  if (idx >= 0) snap.items[idx] = nextItem;
  else snap.items.push(nextItem);
  await saveCmsSnapshot(snap, actorEmail);
  try {
    await writeAuditLog({
      actor_email: actorEmail,
      action: idx >= 0 ? "update_item" : "create_item",
      collection: item.collection,
      item_id: item.id,
    });
  } catch {
    /* ignore */
  }
  return nextItem;
}

export async function deleteCmsItem(
  collection: string,
  id: string,
  actorEmail?: string
) {
  const snap = await getCmsSnapshot();
  snap.items = snap.items.filter(
    (i) => !(i.collection === collection && i.id === id)
  );
  await saveCmsSnapshot(snap, actorEmail);
  try {
    await writeAuditLog({
      actor_email: actorEmail,
      action: "delete_item",
      collection,
      item_id: id,
    });
  } catch {
    /* ignore */
  }
}

export async function getCmsSeo(path: string): Promise<CmsSeoRecord | null> {
  const snap = await getCmsSnapshot();
  return snap.seo.find((s) => s.path === path) || null;
}

export async function getAllCmsSeo(): Promise<CmsSeoRecord[]> {
  const snap = await getCmsSnapshot();
  return snap.seo;
}

export async function upsertCmsSeo(record: CmsSeoRecord, actorEmail?: string) {
  const snap = await getCmsSnapshot();
  const idx = snap.seo.findIndex((s) => s.path === record.path);
  const next = { ...record, updated_at: new Date().toISOString() };
  if (idx >= 0) snap.seo[idx] = next;
  else snap.seo.push(next);
  await saveCmsSnapshot(snap, actorEmail);
  return next;
}

export async function getCmsRedirects() {
  const snap = await getCmsSnapshot();
  return snap.redirects.filter((r) => r.is_active !== false);
}

export async function setCmsRedirects(
  redirects: CmsStoreSnapshot["redirects"],
  actorEmail?: string
) {
  const snap = await getCmsSnapshot();
  snap.redirects = redirects;
  return saveCmsSnapshot(snap, actorEmail);
}

export async function getCmsMedia() {
  const snap = await getCmsSnapshot();
  return snap.media;
}

export async function upsertCmsMedia(
  media: CmsStoreSnapshot["media"][number],
  actorEmail?: string
) {
  const snap = await getCmsSnapshot();
  const idx = snap.media.findIndex((m) => m.id === media.id);
  if (idx >= 0) snap.media[idx] = media;
  else snap.media.unshift(media);
  return saveCmsSnapshot(snap, actorEmail);
}

export function invalidateCmsCache() {
  // No process memory cache — kept for API compatibility
}
