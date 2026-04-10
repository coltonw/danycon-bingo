// Maps character-count thresholds to CSS class names.
// Classes are defined in style.css.
const TIERS: Array<{ maxLen: number; cls: string }> = [
  { maxLen: 10, cls: "fit-xl" },
  { maxLen: 20, cls: "fit-lg" },
  { maxLen: 35, cls: "fit-md" },
  { maxLen: 50, cls: "fit-sm" },
  { maxLen: Number.POSITIVE_INFINITY, cls: "fit-xs" },
];

export function getFitClass(text: string): string {
  const len = text.length;
  for (const tier of TIERS) {
    if (len <= tier.maxLen) return tier.cls;
  }
  return "fit-xs";
}
