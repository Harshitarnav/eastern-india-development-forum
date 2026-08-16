/**
 * How many list items the homepage shows for sections that also have
 * a dedicated page. Full pages always render the complete collection.
 */
export const HOMEPAGE_PREVIEW_LIMITS = {
  schemes: 3,
  tenders: 3,
  projects: 3,
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
