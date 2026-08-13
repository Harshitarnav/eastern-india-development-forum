export function sectionVisible(
  sections: Record<string, { is_visible: boolean } | undefined> | undefined,
  key: string
) {
  return sections?.[key]?.is_visible !== false;
}
