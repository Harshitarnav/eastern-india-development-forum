/**
 * Seed / sync CMS so local + Supabase stay identical.
 *
 * Usage:
 *   npx tsx scripts/seed-cms.ts
 *   npx tsx scripts/seed-cms.ts --from-file   # push existing data/cms/store.json (no rebuild)
 *
 * Requires for cloud sync:
 *   - .env.local with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *   - supabase/schema.sql already run in Supabase SQL editor
 *   - Storage bucket "eidf-media" (public) for uploads
 */

import { promises as fs } from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";
import { buildSeedSnapshot } from "../lib/cms/seed";
import { readFileStore, writeFileStore } from "../lib/cms/file-store";
import {
  isSupabaseConfigured,
  writeSupabaseStore,
} from "../lib/cms/supabase-store";
import type { CmsStoreSnapshot } from "../lib/cms/types";

// Load .env.local then .env (Next-style)
loadEnv({ path: path.join(process.cwd(), ".env.local") });
loadEnv({ path: path.join(process.cwd(), ".env") });

async function main() {
  const fromFile = process.argv.includes("--from-file");
  let snapshot: CmsStoreSnapshot;

  if (fromFile) {
    const existing = await readFileStore();
    if (!existing) {
      console.error("No data/cms/store.json found. Run without --from-file first.");
      process.exit(1);
    }
    snapshot = {
      ...existing,
      updatedAt: new Date().toISOString(),
    };
    console.log("Using existing store.json");
  } else {
    snapshot = buildSeedSnapshot();
    console.log("Built seed from content/site.ts + gallery");
  }

  await writeFileStore(snapshot);
  const out = path.join(process.cwd(), "data", "cms", "store.json");
  console.log(`Wrote ${out}`);
  console.log(
    `items=${snapshot.items.length} seo=${snapshot.seo.length} nav=${snapshot.navigation.length} media=${snapshot.media.length} redirects=${snapshot.redirects.length}`
  );

  if (!isSupabaseConfigured()) {
    console.log(
      "\nSupabase env not set — local file only.\n" +
        "Add NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY to .env.local,\n" +
        "run supabase/schema.sql, then re-run: npm run seed:cms -- --from-file"
    );
    return;
  }

  try {
    await writeSupabaseStore(snapshot);
    console.log("Synced same snapshot to Supabase (local + server now match).");
  } catch (err) {
    console.error("\nSupabase sync failed. Did you run supabase/schema.sql?");
    console.error(err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
