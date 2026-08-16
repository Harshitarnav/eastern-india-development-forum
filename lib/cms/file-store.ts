import { promises as fs } from "fs";
import path from "path";
import type { CmsStoreSnapshot } from "@/lib/cms/types";
import { buildSeedSnapshot } from "@/lib/cms/seed";

const STORE_PATH = path.join(process.cwd(), "data", "cms", "store.json");

/** Serialize writes so concurrent CMS API saves cannot corrupt/verify-fail. */
let writeChain: Promise<void> = Promise.resolve();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Atomically replace a file. On Windows, rename-over-existing often fails with
 * EPERM (AV / Explorer / IDE lock), so we retry and fall back to copy+unlink.
 */
async function replaceFile(tmpPath: string, destPath: string) {
  const maxAttempts = 10;
  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      if (process.platform === "win32") {
        try {
          await fs.unlink(destPath);
        } catch (err) {
          const code = (err as NodeJS.ErrnoException).code;
          if (code !== "ENOENT") throw err;
        }
      }
      await fs.rename(tmpPath, destPath);
      return;
    } catch (err) {
      lastError = err;
      const code = (err as NodeJS.ErrnoException).code;
      if (
        code === "EPERM" ||
        code === "EACCES" ||
        code === "EBUSY" ||
        code === "EEXIST"
      ) {
        await sleep(25 * (attempt + 1));
        continue;
      }
      break;
    }
  }

  // Fallback: overwrite in place, then remove temp
  try {
    await fs.copyFile(tmpPath, destPath);
    await fs.unlink(tmpPath).catch(() => undefined);
    return;
  } catch (err) {
    await fs.unlink(tmpPath).catch(() => undefined);
    throw lastError ?? err;
  }
}

export async function readFileStore(): Promise<CmsStoreSnapshot | null> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as CmsStoreSnapshot;
  } catch {
    return null;
  }
}

export async function writeFileStore(snapshot: CmsStoreSnapshot): Promise<void> {
  const run = async () => {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    const tmp = `${STORE_PATH}.${process.pid}.${Date.now()}.tmp`;
    const payload = JSON.stringify(snapshot, null, 2);
    await fs.writeFile(tmp, payload, "utf8");
    await replaceFile(tmp, STORE_PATH);

    // Verify bytes landed (retry for Windows AV/lock timing)
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const raw = await fs.readFile(STORE_PATH, "utf8");
        const parsed = JSON.parse(raw) as CmsStoreSnapshot;
        if (parsed.updatedAt === snapshot.updatedAt) return;
      } catch {
        /* retry */
      }
      await sleep(40 * (attempt + 1));
    }
    throw new Error("CMS file store write verification failed");
  };

  const next = writeChain.then(run, run);
  // Keep chain alive even if this write fails
  writeChain = next.then(
    () => undefined,
    () => undefined
  );
  await next;
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
