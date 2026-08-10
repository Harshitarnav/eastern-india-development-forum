import type { CmsStoreSnapshot } from "@/lib/cms/types";
import { createHash } from "crypto";
import { supabaseAuthHeaders } from "@/lib/supabase/headers";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Stable UUID for seed string ids (e.g. img-hero) so upserts stay idempotent. */
function toUuid(id: string): string {
  if (UUID_RE.test(id)) return id;
  const bytes = Buffer.from(createHash("sha1").update(`eidf:${id}`).digest().subarray(0, 16));
  bytes[6] = (bytes[6]! & 0x0f) | 0x50;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function credentials() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function isSupabaseConfigured() {
  const creds = credentials();
  if (!creds) return false;
  // Ignore placeholder values from .env.example copies
  if (
    /YOUR_PROJECT|your_anon|your_service_role|example\.com/i.test(
      `${creds.url} ${creds.key}`
    )
  ) {
    return false;
  }
  return true;
}

async function sbFetch(pathname: string, init?: RequestInit) {
  const creds = credentials();
  if (!creds) throw new Error("Supabase not configured");
  const res = await fetch(`${creds.url}/rest/v1/${pathname}`, {
    ...init,
    headers: {
      ...supabaseAuthHeaders(creds.key),
      "Content-Type": "application/json",
      Prefer: init?.method === "POST" ? "resolution=merge-duplicates,return=representation" : "return=representation",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${pathname}: ${res.status} ${text}`);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}

/** Load full snapshot from Supabase tables (if seeded). */
export async function readSupabaseStore(): Promise<CmsStoreSnapshot | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const [settingsRows, navigation, items, seo, media, redirects] = await Promise.all([
      sbFetch("cms_settings?id=eq.site&select=data,updated_at"),
      sbFetch("cms_navigation?select=*&order=sort_order.asc"),
      sbFetch("cms_items?select=*&order=sort_order.asc"),
      sbFetch("cms_seo?select=*"),
      sbFetch("cms_media?select=*&order=created_at.desc"),
      sbFetch("cms_redirects?select=*"),
    ]);

    if (!Array.isArray(settingsRows) || settingsRows.length === 0) return null;

    return {
      version: 1,
      updatedAt: settingsRows[0].updated_at || new Date().toISOString(),
      settings: settingsRows[0].data,
      navigation: navigation || [],
      items: (items || []).map((row: Record<string, unknown>) => ({
        id: row.id,
        collection: row.collection,
        data: row.data,
        sort_order: row.sort_order,
        is_published: row.is_published,
        slug: row.slug,
        updated_at: row.updated_at,
      })),
      seo: seo || [],
      media: media || [],
      redirects: redirects || [],
    } as CmsStoreSnapshot;
  } catch (err) {
    console.error("readSupabaseStore", err);
    return null;
  }
}

/** Upsert full snapshot into Supabase (bootstrap / sync). */
export async function writeSupabaseStore(snapshot: CmsStoreSnapshot): Promise<void> {
  if (!isSupabaseConfigured()) return;

  await sbFetch("cms_settings", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      id: "site",
      data: snapshot.settings,
      updated_at: new Date().toISOString(),
    }),
  });

  // Replace navigation
  await sbFetch("cms_navigation?id=neq.00000000-0000-0000-0000-000000000000", {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  }).catch(() => undefined);

  if (snapshot.navigation.length) {
    await sbFetch("cms_navigation", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(
        snapshot.navigation.map((n) => ({
          id: n.id.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          )
            ? n.id
            : undefined,
          location: n.location,
          label: n.label,
          href: n.href,
          parent_id: n.parent_id || null,
          sort_order: n.sort_order,
          is_visible: n.is_visible,
        }))
      ),
    });
  }

  if (snapshot.items.length) {
    await sbFetch("cms_items", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(
        snapshot.items.map((item) => ({
          id: item.id,
          collection: item.collection,
          data: item.data,
          sort_order: item.sort_order,
          is_published: item.is_published,
          slug: item.slug,
          updated_at: new Date().toISOString(),
        }))
      ),
    });
  }

  if (snapshot.seo.length) {
    await sbFetch("cms_seo", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(
        snapshot.seo.map((s) => ({
          ...s,
          updated_at: new Date().toISOString(),
        }))
      ),
    });
  }

  if (snapshot.media.length) {
    await sbFetch("cms_media", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(
        snapshot.media.map((m) => ({
          id: toUuid(m.id),
          url: m.url,
          alt: m.alt,
          title: m.title ?? null,
          mime_type: m.mime_type ?? null,
          folder: m.folder ?? "general",
          size_bytes: m.size_bytes ?? null,
          created_at: m.created_at || new Date().toISOString(),
        }))
      ),
    });
  }

  if (snapshot.redirects.length) {
    await sbFetch("cms_redirects", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(
        snapshot.redirects.map((r) => ({
          id: toUuid(r.id),
          from_path: r.from_path,
          to_path: r.to_path,
          status_code: r.status_code,
          is_active: r.is_active,
          updated_at: new Date().toISOString(),
        }))
      ),
    });
  }
}

export async function supabaseSelect<T = unknown>(
  table: string,
  query = "select=*"
): Promise<T[]> {
  const data = await sbFetch(`${table}?${query}`);
  return (data as T[]) || [];
}

export async function supabaseUpsert(
  table: string,
  row: Record<string, unknown> | Record<string, unknown>[],
  onConflict?: string
) {
  const headers: Record<string, string> = {
    Prefer: "resolution=merge-duplicates,return=representation",
  };
  if (onConflict) headers.Prefer += ``;
  return sbFetch(table, {
    method: "POST",
    headers,
    body: JSON.stringify(row),
  });
}

export async function supabasePatch(
  table: string,
  matchQuery: string,
  patch: Record<string, unknown>
) {
  return sbFetch(`${table}?${matchQuery}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(patch),
  });
}

export async function supabaseDelete(table: string, matchQuery: string) {
  return sbFetch(`${table}?${matchQuery}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
}

export async function writeAuditLog(entry: {
  actor_email?: string;
  action: string;
  collection?: string;
  item_id?: string;
  detail?: unknown;
}) {
  if (!isSupabaseConfigured()) return;
  try {
    await sbFetch("cms_audit_log", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(entry),
    });
  } catch {
    // non-fatal
  }
}
