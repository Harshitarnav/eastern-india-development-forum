import type { Metadata } from "next";
import { getCmsSeo, getCmsSettings } from "@/lib/cms/repository";

export async function buildPageMetadata(
  path: string,
  fallback?: { title?: string; description?: string }
): Promise<Metadata> {
  const [seo, settings] = await Promise.all([
    getCmsSeo(path),
    getCmsSettings(),
  ]);

  const title = seo?.title || fallback?.title || settings.name;
  const description =
    seo?.description || fallback?.description || settings.tagline;
  const ogImage = seo?.og_image || "/images/hero-banner.jpg";
  const siteUrl = settings.siteUrl || "https://eidf.org.in";
  const canonical =
    seo?.canonical || `${siteUrl}${path === "/" ? "" : path}`;

  const robotsValue = seo?.noindex
    ? { index: false as const, follow: false as const }
    : seo?.robots
      ? seo.robots
      : { index: true as const, follow: true as const };

  return {
    title,
    description,
    alternates: { canonical },
    robots: robotsValue,
    openGraph: {
      title: seo?.og_title || title || undefined,
      description: seo?.og_description || description || undefined,
      url: canonical,
      images: [{ url: ogImage }],
      type: "website",
      siteName: settings.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitter_title || title || undefined,
      description: seo?.twitter_description || description || undefined,
      images: [seo?.twitter_image || ogImage],
    },
  };
}

export async function getSeoJsonLd(path: string): Promise<unknown | null> {
  const seo = await getCmsSeo(path);
  return seo?.jsonld ?? null;
}
