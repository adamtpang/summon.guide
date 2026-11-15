import { guideStyles } from "./guideStylesGenerated";

/** The prompt block for a guide's own way of writing, from content/style/<slug>.md. */
export function styleBlock(slug: string): string {
  const style = guideStyles[slug];
  if (!style) return "";
  return `STYLE FILE (how you actually write, measured from your own text; follow it closely, in modern spelling):\n${style}`;
}
