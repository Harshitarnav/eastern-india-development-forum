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
  const canonical = seo?.canonical || `${settings.siteUrl}${path === "/" ? "" : path}`;
  const robots = seo?.noindex
    ? { index: false, follow: false }
    : seo?.robots
      ? undefined
      : { index: true, follow: true };

  return {
    title,
    description,
    alternates: { canonical },
    robots: seo?.robots
      ? seo.robots
      : robots,
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonical,
      images: [{ url: ogImage }],
      type: "website",
      siteName: settings.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitter_title || title,
      description: seo?.twitter_description || description,
      images: [seo?.twitter_image || ogImage],
    },
  };
}
