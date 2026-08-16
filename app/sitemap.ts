import type { MetadataRoute } from "next";
import { getAllCmsSeo, getCmsSettings } from "@/lib/cms/repository";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, seoRows] = await Promise.all([
    getCmsSettings(),
    getAllCmsSeo(),
  ]);
  const base = settings.siteUrl || "https://eidf.org.in";

  const indexed = seoRows.filter((row) => !row.noindex);
  const paths =
    indexed.length > 0
      ? indexed.map((r) => r.path)
      : [
          "/",
          "/about",
          "/projects",
          "/schemes",
          "/tenders",
          "/investors",
          "/resources",
          "/membership",
          "/events",
          "/gallery",
          "/contact",
          "/analytics",
          "/creatives",
          "/proposals/submit",
          "/privacy",
          "/terms",
        ];

  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
