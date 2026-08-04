import { promises as fs } from "fs";
import path from "path";
import type { CmsStoreSnapshot } from "@/lib/cms/types";
import { buildSeedSnapshot } from "@/lib/cms/seed";

const STORE_PATH = path.join(process.cwd(), "data", "cms", "store.json");

export async function readFileStore(): Promise<CmsStoreSnapshot | null> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as CmsStoreSnapshot;
  } catch {
    return null;
  }
}

export async function writeFileStore(snapshot: CmsStoreSnapshot): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(snapshot, null, 2), "utf8");
}

export async function ensureFileStore(): Promise<CmsStoreSnapshot> {
  const existing = await readFileStore();
  if (existing) return existing;
  const seed = buildSeedSnapshot();
  try {
    await writeFileStore(seed);
  } catch {
    // read-only filesystem (e.g. some serverless) — return seed in memory
  }
  return seed;
}
