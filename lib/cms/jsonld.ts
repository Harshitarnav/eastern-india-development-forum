import { getCmsSettings } from "@/lib/cms/repository";

export async function buildOrganizationJsonLd() {
  const settings = await getCmsSettings();
  const siteUrl = settings.siteUrl || "https://eidf.org.in";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    alternateName: settings.shortName,
    url: siteUrl,
    logo: `${siteUrl}${settings.logo || "/images/logo.png"}`,
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address?.join(", ") || settings.headquarters,
      addressCountry: "IN",
    },
    sameAs: (settings.social || []).map((s) => s.url).filter(Boolean),
    description: settings.tagline,
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
  siteUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
