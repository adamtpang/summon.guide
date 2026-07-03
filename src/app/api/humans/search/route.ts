import { figures } from "@/lib/figures";
import { NextRequest } from "next/server";

// Search the index of ALL humans — backed by Wikidata (~12M humans with
// P31=Q5), so any person with a Wikipedia presence is findable. Results are
// ranked by sitelink count (how many language editions cover them), the
// classic cheap notability proxy, and cross-referenced against our own
// figures so guides already on the shelf surface first with a direct link.
//
// GET /api/humans/search?q=<name>
// → { results: [{ id, name, description, birthYear, deathYear, dead,
//                 image, wikipediaUrl, notability, onPlatform }] }

const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
const USER_AGENT = "summon.guide/1.0 (https://summon.guide)";

// Wikidata labels that differ from our figure names.
const LABEL_ALIASES: Record<string, string> = {
  "seneca the younger": "seneca",
  "seneca": "seneca",
  "marcus aurelius": "marcus-aurelius",
  "alexander the great": "alexander",
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

function platformSlugFor(label: string): string | null {
  const n = normalize(label);
  if (LABEL_ALIASES[n]) return LABEL_ALIASES[n];
  const hit = figures.find((f) => normalize(f.name) === n);
  return hit ? hit.slug : null;
}

function yearFromWikidataTime(time?: string): string | null {
  // Wikidata times look like "+1961-06-25T00:00:00Z" or "-0004-00-00T00:00:00Z"
  if (!time) return null;
  const m = time.match(/^([+-])(\d{1,6})/);
  if (!m) return null;
  const year = parseInt(m[2], 10);
  if (!year) return null;
  return m[1] === "-" ? `${year} BC` : String(year);
}

type Claim = {
  mainsnak?: {
    datavalue?: { value?: { id?: string; time?: string } | string };
  };
};

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() || "";
  if (q.length < 2) {
    return Response.json({ results: [] });
  }

  try {
    // 1. Label search across all of Wikidata
    const searchUrl = `${WIKIDATA_API}?action=wbsearchentities&search=${encodeURIComponent(q)}&language=en&format=json&type=item&limit=10&origin=*`;
    const searchRes = await fetch(searchUrl, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 3600 },
    });
    if (!searchRes.ok) throw new Error(`wbsearchentities ${searchRes.status}`);
    const searchData = await searchRes.json();
    const candidates: { id: string; label: string; description: string }[] = (
      searchData.search || []
    ).map((s: { id: string; label?: string; description?: string }) => ({
      id: s.id,
      label: s.label || "",
      description: s.description || "",
    }));
    if (candidates.length === 0) return Response.json({ results: [] });

    // 2. Batch-fetch claims to keep only humans (P31=Q5) + enrich
    const ids = candidates.map((c) => c.id).join("|");
    const entUrl = `${WIKIDATA_API}?action=wbgetentities&ids=${ids}&props=claims|sitelinks&format=json&origin=*`;
    const entRes = await fetch(entUrl, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 3600 },
    });
    if (!entRes.ok) throw new Error(`wbgetentities ${entRes.status}`);
    const entData = await entRes.json();

    const results = candidates
      .map((c) => {
        const e = entData.entities?.[c.id];
        if (!e?.claims) return null;
        const claims = e.claims as Record<string, Claim[]>;

        const isHuman = (claims.P31 || []).some(
          (cl) =>
            typeof cl.mainsnak?.datavalue?.value === "object" &&
            (cl.mainsnak.datavalue.value as { id?: string }).id === "Q5"
        );
        if (!isHuman) return null;

        const birthTime = (claims.P569?.[0]?.mainsnak?.datavalue?.value as
          | { time?: string }
          | undefined)?.time;
        const deathTime = (claims.P570?.[0]?.mainsnak?.datavalue?.value as
          | { time?: string }
          | undefined)?.time;
        const imageFile = claims.P18?.[0]?.mainsnak?.datavalue?.value as
          | string
          | undefined;

        const sitelinks = Object.keys(e.sitelinks || {}).length;
        const enTitle = e.sitelinks?.enwiki?.title as string | undefined;

        return {
          id: c.id,
          name: c.label,
          description: c.description,
          birthYear: yearFromWikidataTime(birthTime),
          deathYear: yearFromWikidataTime(deathTime),
          dead: Boolean(deathTime),
          image: imageFile
            ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageFile)}?width=96`
            : null,
          wikipediaUrl: enTitle
            ? `https://en.wikipedia.org/wiki/${encodeURIComponent(enTitle.replace(/ /g, "_"))}`
            : null,
          notability: sitelinks,
          onPlatform: platformSlugFor(c.label),
        };
      })
      .filter(Boolean)
      // On-shelf guides first, then by notability (language-edition count)
      .sort((a, b) => {
        if (!!a!.onPlatform !== !!b!.onPlatform) return a!.onPlatform ? -1 : 1;
        return b!.notability - a!.notability;
      })
      // Several Wikidata items can share a label (three people are just
      // "Seneca") and alias-match to the same guide — keep only the most
      // notable one per platform slug.
      .filter((r, i, arr) => {
        if (!r!.onPlatform) return true;
        return arr.findIndex((x) => x!.onPlatform === r!.onPlatform) === i;
      })
      .slice(0, 6);

    return Response.json(
      { results },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (e) {
    console.error("[humans/search]", e instanceof Error ? e.message : e);
    return Response.json({ results: [] });
  }
}
