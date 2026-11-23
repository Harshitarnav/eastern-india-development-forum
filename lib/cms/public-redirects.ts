import { getCmsSnapshot } from "@/lib/cms/repository";
import { readFileStore } from "@/lib/cms/file-store";
import {
  peekCachedRedirects,
  setCachedRedirects,
  toPublicRedirects,
  type PublicRedirect,
} from "@/lib/cms/memory-cache";

export type { PublicRedirect };

export function peekPublicRedirects() {
  return peekCachedRedirects();
}

/** Local file only — never wait on Supabase. Used by the request proxy. */
export function warmPublicRedirects() {
  if (peekCachedRedirects()) return;
  void readFileStore()
    .then((snap) => {
      if (!snap) return;
      setCachedRedirects(toPublicRedirects(snap.redirects || []));
    })
    .catch(() => undefined);
}

export async function getPublicRedirects(): Promise<PublicRedirect[]> {
  const cached = peekCachedRedirects();
  if (cached) return cached;

  const snap = await getCmsSnapshot();
  const redirects = toPublicRedirects(snap.redirects || []);
  setCachedRedirects(redirects);
  return redirects;
}
