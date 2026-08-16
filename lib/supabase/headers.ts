/**
 * Auth headers for Supabase REST / Storage.
 *
 * Legacy JWT keys (`anon` / `service_role`) go in both `apikey` and
 * `Authorization: Bearer`. New keys (`sb_publishable_` / `sb_secret_`) are
 * NOT JWTs — send them only on `apikey` or PostgREST returns 401 Invalid JWT.
 */
export function supabaseAuthHeaders(key: string): Record<string, string> {
  const headers: Record<string, string> = { apikey: key };
  if (!key.startsWith("sb_publishable_") && !key.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${key}`;
  }
  return headers;
}
