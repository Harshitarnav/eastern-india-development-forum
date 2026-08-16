import type { MetadataRoute } from "next";
import { getCmsSettings } from "@/lib/cms/repository";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getCmsSettings();
  const base = settings.siteUrl || "https://eidf.org.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
