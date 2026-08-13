import { supabaseAuthHeaders } from "@/lib/supabase/headers";
import {
  isSupabaseTemporarilyDown,
  markSupabaseDown,
} from "@/lib/cms/supabase-store";

type InsertResult = { ok: true } | { ok: false; error: string };

const INSERT_TIMEOUT_MS = Number(process.env.SUPABASE_FETCH_TIMEOUT_MS || 4000);

export async function supabaseInsert(
  table: "membership_applications" | "contact_messages" | "project_proposals",
  row: Record<string, unknown>,
): Promise<InsertResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || isSupabaseTemporarilyDown()) {
    return { ok: false, error: "Supabase unavailable" };
  }

  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        ...supabaseAuthHeaders(key),
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(INSERT_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`supabase insert ${table}`, res.status, text);
      return { ok: false, error: "Could not save submission." };
    }

    return { ok: true };
  } catch (err) {
    markSupabaseDown(err);
    return { ok: false, error: "Supabase unreachable" };
  }
}
