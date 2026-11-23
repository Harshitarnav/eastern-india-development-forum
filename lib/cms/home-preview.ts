/**
 * How many list items the homepage shows for sections that also have
 * a dedicated page. Full pages always render the complete collection.
 */
export const HOMEPAGE_PREVIEW_LIMITS = {
  schemes: 1,
  tenders: 0,
  projects: 4,
  investments: 2,
  news: 2,
  events: 2,
  resources: 2,
  values: 4,
} as const;

export function homepagePreview<T>(
  items: T[] | null | undefined,
  key: keyof typeof HOMEPAGE_PREVIEW_LIMITS
): T[] {
  return (items ?? []).slice(0, HOMEPAGE_PREVIEW_LIMITS[key]);
}

/** Show a dash when CMS copy is empty so the field still reads as present. */
export function displayCmsText(value?: string | null, fallback = "—") {
  const text = (value ?? "").trim();
  if (!text || text === "—") return fallback;
  return text;
}

/** Accept real image URLs/paths; treat CMS placeholders like "SKILL_CENTRE" as missing. */
export function cmsMediaUrl(
  src: string | undefined | null,
  fallback: string
): string {
  if (!src) return fallback;
  const value = src.trim();
  if (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }
  return fallback;
}
