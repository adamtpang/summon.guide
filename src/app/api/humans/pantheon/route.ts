import { NextRequest } from "next/server";

// Historical-significance lookup for a single human, from MIT Pantheon's
// Historical Popularity Index (HPI) — the cross-lingual fame score that
// rewards legends whose renown survives across languages and centuries
// (and penalizes flash-in-the-pan trends). Free, no-auth PostgREST API.
//
// This is what turns a "Not summoned yet" card from a generic apology into
// a data-driven on-ramp: "Marie Curie · HPI 94 · #27 of all time · Physicist"
// → the seed of the demand-ranked onboarding queue.
//
// GET /api/humans/pantheon?qid=Q7186   (preferred — Wikidata Q-ID)
//     /api/humans/pantheon?name=Marie%20Curie   (fallback)
// → { found, name, hpi, rank, occupation, birthYear, deathYear, alive }
//   HPI/rank are null when Pantheon has the person but no rank row.
//
// Pantheon quirk verified live: the `person` table carries wd_id + bio, but
// HPI/rank live only on `person_ranks` (keyed by name). So we hop
// person(wd_id) -> canonical name -> person_ranks(name).
// Data: MIT Pantheon (pantheon.world), CC BY-SA 4.0.

const PANTHEON = "https://api.pantheon.world";
const USER_AGENT =
  "summon.guide/1.0 (https://summon.guide; adamtpang@gmail.com)";

const fetchJson = async (url: string) => {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    next: { revalidate: 86400 }, // HPI barely moves; cache a day
  });
  if (!res.ok) throw new Error(`pantheon ${res.status}`);
  return res.json();
};

// Title-case occupation enum (PHYSICIST -> Physicist, MILITARY PERSONNEL -> Military Personnel)
const prettyOccupation = (occ?: string | null) =>
  occ
    ? occ
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace(/\bAnd\b/g, "and")
    : null;

export async function GET(req: NextRequest) {
  const qid = req.nextUrl.searchParams.get("qid")?.trim();
  const nameParam = req.nextUrl.searchParams.get("name")?.trim();

  if (!qid && !nameParam) {
    return Response.json({ found: false }, { status: 400 });
  }

  try {
    let name = nameParam || "";
    let occupation: string | null = null;
    let birthYear: number | null = null;
    let deathYear: number | null = null;
    let alive: boolean | null = null;

    // Prefer the robust Wikidata Q-ID join (Marie Curie vs "Maria Skłodowska-Curie")
    if (qid) {
      const rows = await fetchJson(
        `${PANTHEON}/person?wd_id=eq.${encodeURIComponent(qid)}&select=name,occupation,birthyear,deathyear,alive&limit=1`
      );
      if (Array.isArray(rows) && rows[0]) {
        name = rows[0].name || name;
        occupation = rows[0].occupation ?? null;
        birthYear = rows[0].birthyear ?? null;
        deathYear = rows[0].deathyear ?? null;
        alive = rows[0].alive ?? null;
      } else if (!nameParam) {
        // Pantheon simply doesn't cover this person — common; not an error.
        return Response.json(
          { found: false },
          { headers: { "Cache-Control": "public, s-maxage=86400" } }
        );
      }
    }

    if (!name) return Response.json({ found: false });

    // HPI + rank live on person_ranks, keyed by name
    const ranks = await fetchJson(
      `${PANTHEON}/person_ranks?name=eq.${encodeURIComponent(name)}&select=name,hpi,rank,occupation&limit=1`
    );
    const r = Array.isArray(ranks) && ranks[0] ? ranks[0] : null;

    if (!r && occupation === null && qid) {
      // person table had it but no rank row and we already returned bio above
      return Response.json({
        found: true,
        name,
        hpi: null,
        rank: null,
        occupation: prettyOccupation(occupation),
        birthYear,
        deathYear,
        alive,
      });
    }

    if (!r && !occupation) {
      return Response.json(
        { found: false },
        { headers: { "Cache-Control": "public, s-maxage=86400" } }
      );
    }

    return Response.json(
      {
        found: true,
        name,
        hpi: r?.hpi != null ? Math.round(r.hpi) : null,
        rank: r?.rank ?? null,
        occupation: prettyOccupation(occupation || r?.occupation),
        birthYear,
        deathYear,
        alive,
      },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } }
    );
  } catch (e) {
    console.error("[humans/pantheon]", e instanceof Error ? e.message : e);
    return Response.json({ found: false });
  }
}
