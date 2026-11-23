import type { CmsRedirect, CmsStoreSnapshot } from "@/lib/cms/types";

export type PublicRedirect = {
  from_path: string;
  to_path: string;
  status_code: number;
};

const SNAP_TTL_MS = 8_000;
const REDIRECT_TTL_MS = 30_000;

let snapshotCache: { at: number; value: CmsStoreSnapshot } | null = null;
let snapshotInflight: Promise<CmsStoreSnapshot> | null = null;
let redirectCache: { at: number; value: PublicRedirect[] } | null = null;

export function peekCachedSnapshot(): CmsStoreSnapshot | null {
  if (snapshotCache && Date.now() - snapshotCache.at < SNAP_TTL_MS) {
    return snapshotCache.value;
  }
  return null;
}

export function getSnapshotInflight() {
  return snapshotInflight;
}

export function setSnapshotInflight(pending: Promise<CmsStoreSnapshot> | null) {
  snapshotInflight = pending;
}

export function setCachedSnapshot(value: CmsStoreSnapshot) {
  snapshotCache = { at: Date.now(), value };
  setCachedRedirects(toPublicRedirects(value.redirects || []));
}

export function peekCachedRedirects(): PublicRedirect[] | null {
  if (redirectCache && Date.now() - redirectCache.at < REDIRECT_TTL_MS) {
    return redirectCache.value;
  }
  return null;
}

export function setCachedRedirects(value: PublicRedirect[]) {
  redirectCache = { at: Date.now(), value };
}

export function toPublicRedirects(redirects: CmsRedirect[]): PublicRedirect[] {
  return redirects
    .filter((r) => r.is_active !== false)
    .map((r) => ({
      from_path: r.from_path,
      to_path: r.to_path,
      status_code: r.status_code || 301,
    }));
}

export function invalidateCmsMemoryCache() {
  snapshotCache = null;
  snapshotInflight = null;
  redirectCache = null;
}
