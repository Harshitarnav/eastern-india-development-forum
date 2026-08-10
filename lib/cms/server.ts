import { unstable_noStore as noStore } from "next/cache";
import { getCmsSnapshot } from "@/lib/cms/repository";
import {
  getGalleryItems,
  getNavLinks,
  mapSnapshotToPublicSite,
} from "@/lib/cms/map-to-site";
import type { CmsPublicValue } from "@/lib/cms/public-provider";
import { DEFAULT_HEADER_LAYOUT } from "@/lib/cms/types";

export async function getPublicCmsBundle(): Promise<CmsPublicValue> {
  // Prevent Next.js from caching CMS-backed RSC payloads
  noStore();
  const snap = await getCmsSnapshot();
  return {
    site: mapSnapshotToPublicSite(snap),
    navigation: {
      header: getNavLinks(snap, "header"),
      portal: getNavLinks(snap, "portal"),
      footer: getNavLinks(snap, "footer"),
    },
    gallery: getGalleryItems(snap),
    headerLayout: {
      ...DEFAULT_HEADER_LAYOUT,
      ...(snap.settings.headerLayout || {}),
    },
  };
}
