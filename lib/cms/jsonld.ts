import { getCmsSettings } from "@/lib/cms/repository";

type OrgJsonLdSource = {
  name: string;
  shortName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string[];
  headquarters?: string;
  logo?: string;
  social?: { url: string }[];
  siteUrl?: string;
};

export function organizationJsonLdFromSite(site: OrgJsonLdSource) {
  const siteUrl = site.siteUrl || "https://eidf.org.in";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: siteUrl,
    logo: `${siteUrl}${site.logo || "/images/logo.png"}`,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address?.join(", ") || site.headquarters,
      addressCountry: "IN",
    },
    sameAs: (site.social || []).map((s) => s.url).filter(Boolean),
    description: site.tagline,
  };
}

export async function buildOrganizationJsonLd() {
  const settings = await getCmsSettings();
  return organizationJsonLdFromSite(settings);
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
