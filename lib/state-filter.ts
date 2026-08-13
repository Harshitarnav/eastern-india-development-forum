/** Match CMS state ids / names for ?state= deep links from the map */
const STATE_ALIASES: Record<string, string[]> = {
  bihar: ["bihar"],
  jharkhand: ["jharkhand"],
  odisha: ["odisha", "orissa"],
  westbengal: ["west bengal", "westbengal", "bengal"],
  assam: ["assam"],
  northeast: ["north east", "northeast", "north-east", "ne"],
};

export function matchesStateFilter(
  value: string | undefined | null,
  stateParam: string | undefined | null
): boolean {
  if (!stateParam) return true;
  if (!value) return false;
  const needle = stateParam.trim().toLowerCase().replace(/[_\s-]+/g, "");
  const hay = value.toLowerCase();
  const aliases = STATE_ALIASES[needle] || [stateParam.toLowerCase()];
  return aliases.some((a) => hay.includes(a));
}

export function stateDisplayName(stateParam: string | undefined | null): string | null {
  if (!stateParam) return null;
  const key = stateParam.trim().toLowerCase().replace(/[_\s-]+/g, "");
  const names: Record<string, string> = {
    bihar: "Bihar",
    jharkhand: "Jharkhand",
    odisha: "Odisha",
    westbengal: "West Bengal",
    assam: "Assam",
    northeast: "North East",
  };
  return names[key] || stateParam;
}
