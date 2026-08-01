type InsertResult = { ok: true } | { ok: false; error: string };

export async function supabaseInsert(
  table: "membership_applications" | "contact_messages",
  row: Record<string, unknown>,
): Promise<InsertResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return { ok: false, error: "Missing Supabase environment variables" };
  }

  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`supabase insert ${table}`, res.status, text);
    return { ok: false, error: "Could not save submission." };
  }

  return { ok: true };
}
