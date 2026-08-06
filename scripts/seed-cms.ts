/**
 * One-time CMS seed: writes data/cms/store.json from content/site.ts + gallery seed.
 *
 * Usage:
 *   npx tsx scripts/seed-cms.ts
 * Or from admin: POST /api/cms/seed (authenticated)
 *
 * Requires: run `supabase/schema.sql` in Supabase SQL editor when using cloud sync.
 * Create Storage bucket `eidf-media` (public read) for uploads.
 */

import { promises as fs } from "fs";
import path from "path";
import { buildSeedSnapshot } from "../lib/cms/seed";

async function main() {
  const snapshot = buildSeedSnapshot();
  const out = path.join(process.cwd(), "data", "cms", "store.json");
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, JSON.stringify(snapshot, null, 2), "utf8");
  console.log(`Wrote ${out}`);
  console.log(
    `items=${snapshot.items.length} seo=${snapshot.seo.length} nav=${snapshot.navigation.length} media=${snapshot.media.length}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
