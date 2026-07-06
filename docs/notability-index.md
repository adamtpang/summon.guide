# Human Notability Index — Decision Report for summon.guide

**Date:** 2026-07-03. All API/dataset claims below were live-verified during research.
**Question:** How should summon.guide decide which legendary humans to onboard next, and how do we wire that into search / not_found?

---

## 1. Landscape: the six ways to rank "most notable humans"

| Source | What it measures | Size | Freshness | License | Access method |
|---|---|---|---|---|---|
| **MIT Pantheon HPI** (pantheon.world) | Historical Popularity Index: cross-lingual Wikipedia fame — # language editions (L), pageview concentration across languages, pageview stability (penalizes flash trends), non-English views, age of figure. Explicitly anti-English-bias, anti-recency. | ~89k bios (2020 file), ~139k in live DB | Annual releases (2019/2020/2025) + live API | CC BY-SA 4.0, cite Scientific Data 2:150075 | Free PostgREST API, no auth: `https://api.pantheon.world` (`person`, `person_ranks`, `person_hpi` tables); bulk CSV: `https://storage.googleapis.com/pantheon-public-data/person_2025_update.csv.bz2` |
| **danker Wikipedia PageRank** (Thalhammer) | PageRank over >4B links across ALL Wikipedia language editions, keyed by Wikidata Q-ID. Structural importance in the knowledge graph, not raw attention. | All Wikidata entities (~226 MB bz2 TSV); NOT filtered to humans | ~Monthly (latest 2026-06-04) | CC BY-SA 3.0 | Download from `https://danker.s3.amazonaws.com/index.html` → `{date}.allwiki.links.rank.bz2` (Q-ID→score TSV). Must join against Wikidata P31=Q5 to filter to humans. |
| **Wikidata QRank** (Brawer) | Pageview-based rank per Q-ID, CSV | All entities (~105 MB gz) | **STALE — last modified 2024-03** | CC0 | `https://qrank.toolforge.org/download/qrank.csv.gz` — avoid; superseded by danker + live pageviews |
| **Wikimedia Pageviews REST API** | Raw current reader attention per article (daily/monthly since 2015). Recency-biased "who do people care about right now." | Any article | Real-time (daily granularity) | Counts effectively free; API under WMF usage guidelines | `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/...` and `/top/...`. **Must send descriptive User-Agent**; 200 req/min unauthenticated, 10 req/min anonymous. |
| **Skiena & Ward "Who's Bigger?"** (2013) | Algorithmic "historical significance": PageRank variants + pageviews + edits + article length, factor-analyzed, time-decay adjusted. English-Wikipedia-only (US-president skew). | All EN-Wikipedia bios; published top-100 | Frozen (2013); companion site defunct | Book (Cambridge UP); no API | Static list only (TIME "100 Most Significant Figures in History"). Use as cross-check. |
| **Curated lists** (TIME 100 of the Century; Hart's *The 100*; Murray's *Human Accomplishment*) | Editorial/historiometric judgment. Murray: 4,002 significant figures in arts & sciences 800 BC–1950 via encyclopedia-mention counts. Hart: one historian's ranked 100 by influence. TIME: 100 of the 20th century, 5 categories incl. Builders & Titans. | 100 / 100 / 4,002 | Frozen (1978–2003) | Books; no datasets | Mine manually via Wikipedia list pages. Best as validation + domain coverage (Murray excludes business entirely; Hart is religion/inventor heavy). |

**Sanity data points:**
- Pantheon live top-10: Muhammad, Buddha, Newton, Trump, Genghis Khan, Cleopatra, Gandhi, Pope Francis, Mary, Beethoven (yearly pageview refresh injects some recency — Trump at #4).
- Skiena top-10: Jesus, Napoleon, Muhammad, Shakespeare, Lincoln, Washington, Hitler, Aristotle, Alexander, Jefferson.
- Pageviews all-time top people: Trump, Elizabeth II, Obama, Ronaldo, Michael Jackson, Musk — pure current-fame signal.
- Cross-index consensus (3+ lists): Newton, Einstein, Aristotle, Napoleon, Shakespeare, Da Vinci, Beethoven, Galileo, Darwin, Lincoln, Washington, Confucius, Buddha.

---

## 2. Recommendation: Pantheon HPI backbone + live pageviews trending signal

**Verdict: use Pantheon `person_ranks` as the canonical index. Do NOT build a danker/Wikidata pipeline for v1.**

Why Pantheon wins here:
1. **Free, no-auth, live JSON API** — the only ranking with one. Zero infrastructure.
2. **HPI is philosophically aligned with "legends"** — rewards fame that crosses time and language barriers, penalizes trending flashes. Exactly the mentorship-worthy signal (raw pageviews surface Ronaldo and Lady Gaga instead).
3. **Occupation enum built in** (PHILOSOPHER, PHYSICIST, WRITER, MILITARY PERSONNEL...) — filter directly to mentor-shaped domains.
4. **Wikidata Q-ID (`wd_id`) on every row** — clean join key for danker PageRank, portraits (Wikidata P18), or sitelink counts later.
5. CC BY-SA 4.0 — fine with a citation line in the footer/about page.

Use **Wikimedia pageviews** only as a light secondary signal ("is anyone asking for this person right now?") for tie-breaking the onboarding queue — not the backbone.

Skip for v1: danker (226 MB monthly dump + P31=Q5 join = real pipeline work; revisit at 100+ guides), QRank (stale since 2024-03), Skiena/Hart/Murray (static; use once as a manual cross-check when picking each batch).

### Exact integration steps

**Step A — snapshot the index (one-time, refresh quarterly):**
```
GET https://api.pantheon.world/person_ranks?order=rank.asc&limit=2000&select=rank,name,hpi,l,occupation,birthyear
```
PostgREST syntax: paginate with `offset=`; `Prefer: count=exact` on a HEAD gives totals. Filter to dead figures via the `person` table (`alive` column) or the 2025 CSV (`https://storage.googleapis.com/pantheon-public-data/person_2025_update.csv.bz2`, columns incl. `hpi`, `alive`, `occupation`, `wd_id`). Store as a static JSON in the repo — e.g. `src/lib/notability-index.json` — no DB needed, consistent with the current no-database architecture.

**Step B — lookup at request time (search / not_found):**
```
GET https://api.pantheon.world/person?name=eq.Marcus%20Aurelius
GET https://api.pantheon.world/person?name=ilike.*{query}*&limit=5
```
Verified gotcha: `person` has NO `hpi` column — HPI lives on `person_ranks` (denormalized: name, hpi, rank, occupation_rank) and `person_hpi` (per-year history). A naive `person?order=hpi.desc` returns a 42703 error. A `search` table also exists for fuzzy matching.

**Step C — trending overlay (optional, cheap):**
```
GET https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/{Article_Name}/monthly/{start}/{end}
```
Send `User-Agent: summon.guide/1.0 (https://summon.guide; adamtpang@gmail.com)`. One call per queue candidate; stays far under the 200 req/min unauthenticated limit.

**Scoring formula for the onboarding queue:**
`priority = 0.6*normalizedHPI + 0.3*userDemand (search-miss count on summon.guide) + 0.1*pageviewTrend (last 12 mo)`
User demand is your strongest signal — HPI keeps the queue honest.

---

## 3. Top 30 dead legends shortlist (mentorship-fit, by domain)

Criteria: dead; top-tier combined notability (Pantheon HPI + presence on 2+ cross-check lists); plausible as a *mentor* (teachable doctrine/method/body of work). Religious founders (Muhammad, Jesus, Buddha) **excluded** despite topping every index — polarizing to implement and hard to do respectfully. Controversial-but-includable figures flagged.

### Philosophy (7)
1. **Marcus Aurelius** — Stoic emperor, Meditations; the most-requested mentor archetype; pairs with Seneca (already onboarded).
2. **Aristotle** — HPI ~96; logic, ethics, systems of knowledge.
3. **Socrates** — the questioning method itself; ideal chat mechanic.
4. **Plato** — Republic; founder of the Academy.
5. **Confucius** — self-cultivation, leadership, relationships. *Note: religious to some; frame strictly as philosopher.*
6. **Friedrich Nietzsche** — self-overcoming. *Flag: edgy, frequently misread — careful system prompt.*
7. **Lao Tzu** — Tao Te Ching, effortless action. *Flag: semi-legendary historicity.*

### Science (7)
8. **Isaac Newton** — #2–3 on every index; obsession, method, discipline.
9. **Albert Einstein** — TIME Person of the Century; imagination + persistence.
10. **Leonardo da Vinci** — HPI ~96.8; the polymath/curiosity mentor (also Arts).
11. **Charles Darwin** — patient evidence-gathering, intellectual courage.
12. **Marie Curie** — Murray's top woman in science; two Nobels; fills the women gap (current roster is all male).
13. **Galileo Galilei** — HPI ~95; truth vs. authority.
14. **Richard Feynman** — teaching, first-principles joy; perfect voice for chat. *(Lower HPI; overweighted for mentor-fit.)*

### Statecraft (6)
15. **Abraham Lincoln** — Skiena #5; leadership through crisis, persuasion.
16. **George Washington** — Skiena #6; relinquishing power, institution-building.
17. **Winston Churchill** — rhetoric, resilience. *Flag: empire-era views controversial.*
18. **Cleopatra** — HPI ~98.3; statecraft, alliances; second woman on the roster.
19. **Theodore Roosevelt** — "man in the arena"; energy, reinvention.
20. **Nelson Mandela** — forgiveness as strategy; modern, near-universally admired.

### War / Strategy (5)
21. **Sun Tzu** — Art of War; maps directly onto business users. *Flag: historicity debated.*
22. **Alexander the Great** — Skiena #9; ambition, speed, logistics.
23. **Napoleon Bonaparte** — Skiena #2, HPI ~95; organization, audacity. *Flag: controversial (wars, slavery reinstatement).*
24. **Miyamoto Musashi** — Book of Five Rings; mastery/discipline; strong modern demand. *(Lower HPI; demand-driven pick.)*
25. **Genghis Khan** — HPI ~98; meritocracy, scale. *Flag: strongly controversial (mass slaughter) — onboard late or skip; listed because indexes rank him top-5.*

### Arts (3)
26. **William Shakespeare** — Skiena #4, Murray score 100 in literature; language, human nature.
27. **Ludwig van Beethoven** — HPI ~96.9; creating through adversity.
28. **Michelangelo** — Murray score 100 in Western art; craft, ambition, patronage.

### Business (2 — the modern greats are already onboarded)
29. **Andrew Carnegie** — Gospel of Wealth; pairs with Rockefeller.
30. **Henry Ford** — systems, manufacturing at scale. *Flag: antisemitism — handle honestly in prompt or skip.*

**Suggested first wave (6):** Marcus Aurelius, Sun Tzu, Leonardo da Vinci, Marie Curie, Lincoln, Feynman — highest mentor-fit x notability x demand, no implementation landmines, adds the platform's first woman.

---

## 4. v1 implementation sketch: search + not_found → auto-queue

Fits the current no-database architecture; the only new dependency is one external API call on the miss path.

### Flow
1. **User searches** for a person (existing `/api/match` route or a new search box).
2. **Local hit:** slug/name matches `src/lib/figures.ts` → route to `/chat/[figure]`. Done.
3. **Local miss → Pantheon lookup:**
   `GET https://api.pantheon.world/person?name=ilike.*{query}*&limit=5&select=name,slug,wd_id,birthyear,deathyear,occupation`
   No match → generic "not found — suggest a legend" page.
4. **Pantheon match → fetch HPI:** `GET https://api.pantheon.world/person_ranks?name=eq.{name}&select=name,hpi,rank,occupation`.
5. **"Summon them" teaser page:** "Marcus Aurelius isn't here yet — HPI 92, Philosopher, d. 180 AD. **Request this guide.**" One click = one vote.
6. **Queue the request** (no-DB options, by effort):
   - **v0:** Vercel KV / Upstash sorted set — `ZINCRBY requests 1 {slug}`; the sorted set IS the priority queue.
   - **v1:** `POST /api/request-guide` storing `{slug, wd_id, hpi, count, lastRequested}`; a nightly or manual job computes `priority = 0.6*hpiNorm+0.3*log(count)+0.1*trend` and emits a ranked `onboarding-queue.json`.
7. **Auto-queue for onboarding:** when a human crosses a threshold (e.g. count >= 5 AND hpi >= 80), auto-open a GitHub issue (Vercel cron + GitHub API, or `gh issue create`) titled "Onboard {name} (HPI {hpi}, {count} requests)" — matching the existing per-guide workflow visible in git history ("Onboard Seneca...", "Onboard Ricky Gervais..."). Onboarding itself stays human/agent-driven: the deep research per guide is the product's moat, so don't auto-generate system prompts from thin data.

### Guardrails
- **Denylist before queueing:** living people handled case-by-case; religious founders excluded; figures flagged above get `needs_review: true` instead of an auto-issue.
- **Cache** Pantheon lookups (edge cache, 24h) — the index barely moves.
- **Attribution:** add "Notability data: MIT Pantheon (pantheon.world), CC BY-SA 4.0" to the footer/about once shipped.
- **Rate limits:** Pantheon documents none, but cache anyway; Wikimedia calls require the descriptive User-Agent.

### Effort estimate
- Teaser page + Pantheon lookup on miss: ~0.5 day.
- Request counter (KV) + ranked queue JSON: ~0.5 day.
- Auto-issue cron: ~2 hours.
Total ~1–2 days for the full loop. Seed the queue immediately with the top-30 shortlist (synthetic priority) so onboarding never waits on user demand.