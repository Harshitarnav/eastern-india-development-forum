/**
 * One-shot Supabase setup: media bucket + CMS seed sync.
 * Schema (tables) must already exist — run supabase/schema.sql in SQL Editor first.
 *
 *   npx tsx scripts/setup-supabase.ts
 */

import path from "path";
import { config as loadEnv } from "dotenv";
import { buildSeedSnapshot } from "../lib/cms/seed";
import { writeFileStore } from "../lib/cms/file-store";
import {
  isSupabaseConfigured,
  writeSupabaseStore,
  readSupabaseStore,
} from "../lib/cms/supabase-store";
import { supabaseAuthHeaders } from "../lib/supabase/headers";

loadEnv({ path: path.join(process.cwd(), ".env.local") });
loadEnv({ path: path.join(process.cwd(), ".env") });

async function ensureMediaBucket() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const list = await fetch(`${url}/storage/v1/bucket`, {
    headers: supabaseAuthHeaders(key),
  });
  if (!list.ok) {
    throw new Error(`List buckets failed: ${list.status} ${await list.text()}`);
  }
  const buckets = (await list.json()) as { id: string }[];
  if (buckets.some((b) => b.id === "eidf-media")) {
    console.log("Storage bucket eidf-media: already exists");
    return;
  }
  const create = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      ...supabaseAuthHeaders(key),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "eidf-media",
      name: "eidf-media",
      public: true,
      file_size_limit: 10485760,
    }),
  });
  if (!create.ok) {
    throw new Error(`Create bucket failed: ${create.status} ${await create.text()}`);
  }
  console.log("Storage bucket eidf-media: created (public)");
}

async function probeTables() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const res = await fetch(`${url}/rest/v1/cms_settings?select=id&limit=1`, {
    headers: {
      ...supabaseAuthHeaders(key),
      Accept: "application/json",
    },
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

async function main() {
  if (!isSupabaseConfigured()) {
    console.error("Supabase not configured. Check .env.local");
    process.exit(1);
  }

  console.log("Project:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  await ensureMediaBucket();

  const probe = await probeTables();
  if (!probe.ok) {
    console.error("\nCMS tables missing or unreachable.");
    console.error(`Status ${probe.status}: ${probe.text}`);
    console.error(
      "\nDo this once in Supabase → SQL Editor:\n" +
        "1. Open supabase/schema.sql from this repo\n" +
        "2. Paste into SQL Editor → Run\n" +
        "3. Re-run: npx tsx scripts/setup-supabase.ts\n"
    );
    process.exit(1);
  }
  console.log("CMS tables: reachable");

  const snapshot = buildSeedSnapshot();
  await writeFileStore(snapshot);
  await writeSupabaseStore(snapshot);
  const verify = await readSupabaseStore();
  if (!verify) {
    console.error("Seed wrote but read-back failed");
    process.exit(1);
  }
  console.log(
    `Synced CMS: items=${verify.items.length} seo=${verify.seo.length} nav=${verify.navigation.length} media=${verify.media.length}`
  );
  console.log("Local + Supabase now share the same data.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
