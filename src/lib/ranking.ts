import fs from "fs";
import path from "path";

/**
 * What each book is good FOR.
 *
 * Two scores, because they are different questions and the same book rarely
 * answers both the same way. A framework earns a SKILL by being runnable: a
 * procedure someone executes this week. A book earns a VIDEO series by being
 * watchable: a turn, a concrete detail, a scene. Poor Charlie's Almanack scores
 * high on the first and middling on the second. Shoe Dog is the reverse.
 *
 * These are editorial judgements about the books themselves, not measurements
 * of the extracted text. Books without an entry are unscored, which is not the
 * same as scoring zero, and the site says so rather than implying a verdict.
 */

export interface CatalogBook {
  slug: string;
  title: string;
  shelf: string;
  sizeKb: number;
  pages: number;
  words: number;
  status: "extracted" | "scanned" | "failed" | "pending";
}

export interface RankedBook extends CatalogBook {
  skill: number;
  video: number;
  why: string;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function readJson<T>(rel: string, fallback: T): T {
  const p = path.join(process.cwd(), rel);
  if (!fs.existsSync(p)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export function loadCatalog(): CatalogBook[] {
  const j = readJson<{ books?: CatalogBook[] }>("data/library.json", {});
  return Array.isArray(j.books) ? j.books : [];
}

export function loadRanked(): {
  ranked: RankedBook[];
  unscored: CatalogBook[];
  catalog: CatalogBook[];
} {
  const catalog = loadCatalog();
  const scores = readJson<{
    scored?: { match: string; skill: number; video: number; why: string }[];
  }>("data/ranking.json", {}).scored ?? [];

  const ranked: RankedBook[] = [];
  const claimed = new Set<string>();

  for (const s of scores) {
    const hit = catalog.find((b) => norm(b.title).includes(norm(s.match)));
    // first match wins, so a duplicate title on two shelves is scored once
    if (!hit || claimed.has(hit.slug)) continue;
    claimed.add(hit.slug);
    ranked.push({ ...hit, skill: s.skill, video: s.video, why: s.why });
  }

  const unscored = catalog.filter(
    (b) => !claimed.has(b.slug) && b.status === "extracted"
  );
  return { ranked, unscored, catalog };
}

/** Ranked for building installable skills. */
export function bestForSkills(ranked: RankedBook[]): RankedBook[] {
  return [...ranked].sort((a, b) => b.skill - a.skill || b.video - a.video);
}

/** Ranked for building a watchable series. */
export function bestForVideo(ranked: RankedBook[]): RankedBook[] {
  return [...ranked].sort((a, b) => b.video - a.video || b.skill - a.skill);
}
