import { figures } from "@/lib/figures";

// The curated roster, hand-picked by Adam on 2026-11-14 (Alexander and Bob Marley removed 2026-11-16). Every other person
// guide is archived: its files, sources and page stay in the codebase and its
// direct link still works, but it is left out of the roster, matching, the
// council, search, the sitemap and the public catalog. To bring a guide back,
// add its slug here.
export const CURATED_PEOPLE = [
  "franklin",
  "lee-kuan-yew",
  "balaji-srinivasan",
  "brad-jacobs",
  "elon",
  "deutsch",
  "sivers",
  "lulie-tanett",
  "nassim-taleb",
  "visakan",
  // Not built yet: stays on the onboarding list until his guide exists.
  "leonardo-da-vinci",
] as const;

const curated = new Set<string>(CURATED_PEOPLE);

export function isCurated(slug: string): boolean {
  return curated.has(slug);
}

/** The person guides shown and matched across the site. */
export const curatedFigures = figures.filter((figure) => isCurated(figure.slug));

export { GUIDE_LINES, GUIDE_TITLES } from "./guideLines";
