# Books → Skills — Master Roadmap

Every guide on summon.guide draws from one or more books. Every Claude Code skill we ship is grounded in a specific passage of a specific book.

**The mission:** ingest the canonical books *by* and *about* the most influential humans alive and dead, distill each into 2–5 actionable Claude Code skills, and surface both on summon.guide.

---

## How a book becomes a skill

```
PDF in /sources/<figure>/<book>.pdf  ← gitignored, copyrighted
       │
       ▼
Claude reads the PDF (Read tool supports PDF)
       │
       ▼
Identify 2–5 frameworks the figure ACTUALLY USED
       │
       ▼
For each framework:
  ├─ /skills/<figure>-<framework>/SKILL.md   ← the skill, frontmatter + body
  ├─ Add entry to src/lib/skills.ts          ← website indexes it
  └─ Add skill slug to the book's `skillSlugs` in src/lib/books.ts

Update the book's status:  pending → partial → complete
```

The full ingestion procedure with the question template, naming conventions, and quality bar lives in `sources/README.md`.

---

## Source-of-truth lists for which figures to add

Discovery rule: a figure earns a slot on summon.guide only if there is a credible primary or secondary source we can ground them in. No source → no skill → no figure.

### Builders (founders & operators)

- **Forbes Real-Time Billionaires**: https://www.forbes.com/real-time-billionaires/
- **Companies by market cap**: https://companiesmarketcap.com/
- **Crypto founders by market cap**: https://coinmarketcap.com/

For each name, find the canonical book — usually one of:
- An authoritative biography (Isaacson, Chernow, Stone, Vance, Lowenstein, Ferguson)
- The figure's own book or letter collection (Bezos shareholder letters, Buffett's letters, Lee's memoirs)
- A serious anthology by a respected compiler (Jorgenson's *Almanack of Naval Ravikant*, *Book of Elon*; *Poor Charlie's Almanack*)

### Statesmen (founders of nations)

- **GDP rankings (highest first)** as the discovery list — but pick figures by *founding* impact, not just GDP rank
- The bar: someone whose ideas measurably shaped a country's trajectory

### Historical figures (greats of all time)

- **Wikipedia: List of most-cited historical figures** (a useful starting point, not gospel)
- Ancient: Plutarch's *Parallel Lives*, Marcus Aurelius' *Meditations*, Sun Tzu's *Art of War*
- Modern: Lincoln (Goodwin's *Team of Rivals*), Churchill (Manchester's *The Last Lion*), Mandela (*Long Walk to Freedom*)

---

## Current status

### Active guides (live on summon.guide)

| Figure | Book | Author | Role | Status |
|---|---|---|---|---|
| `rockefeller` | *Titan* | Ron Chernow | about | partial |
| `franklin` | *Autobiography of Benjamin Franklin* | Franklin | by | partial |
| `franklin` | *Benjamin Franklin: An American Life* | Walter Isaacson | about | partial |
| `elon` | *Elon Musk* | Walter Isaacson | about | **complete** |
| `elon` | *Elon Musk* | Ashlee Vance | about | partial |
| `elon` | *The Book of Elon* | Eric Jorgenson | compiled | **pending** |
| `alexander` | *Life of Alexander* | Plutarch | about | partial |
| `alexander` | *The Campaigns of Alexander* | Arrian | about | partial |
| `alexander` | *Alexander the Great* | Robin Lane Fox | about | partial |
| `deutsch` | *The Beginning of Infinity* | David Deutsch | by | **complete** |
| `deutsch` | *The Fabric of Reality* | David Deutsch | by | partial |
| `lee-kuan-yew` | *The Singapore Story* | Lee Kuan Yew | by | partial |
| `lee-kuan-yew` | *From Third World to First* | Lee Kuan Yew | by | partial |
| `lee-kuan-yew` | *One Man's View of the World* | Lee Kuan Yew | by | partial |

### Next up — high-priority figures to activate

These have a clear canonical book and a likely audience overlap with current guides. Pick from this list when the user drops a PDF.

| Figure (slug TBD) | Canonical book(s) | Why |
|---|---|---|
| **Bezos** (`bezos`) | *Invent and Wander* (Bezos's letters compiled by Isaacson) + *The Everything Store* (Brad Stone) | Day 1, regret minimization, Type 1 vs Type 2 decisions, narrative memos. Already has a strong stub in `figures.ts` archive. |
| **Buffett** (`buffett`) | *The Snowball* (Schroeder) + Berkshire annual letters | Margin of safety, circle of competence, Mr. Market. The most-studied investor in history. |
| **Munger** (`munger`) | *Poor Charlie's Almanack* (Kaufman, ed.) | Mental models, inversion. Already has a stub in `figures.ts` archive. |
| **Naval** (`naval`) | *The Almanack of Naval Ravikant* (Eric Jorgenson) | Specific knowledge, leverage, the philosophy of wealth. The ur-text for the Jorgenson-anthology format we're scaling. |
| **Jensen Huang** (`jensen`) | *The Nvidia Way* (Tae Kim) | Strategy direction, "speed of light", small teams, suffering as moat. Stub in `figures.ts` archive. |
| **Steve Jobs** (`jobs`) | *Steve Jobs* (Walter Isaacson) | Product taste, focus as the discipline of saying no, the intersection of liberal arts and technology. Stub in archive. |
| **Sam Walton** (`walton`) | *Made in America* (Walton + Huey) | Compete with yourself, listen to associates, save costs to lower prices. Stub in archive. |
| **Marcus Aurelius** (`marcus`) | *Meditations* | Stoic operating manual. Best PD/personal-life skill base outside of business. |
| **Lincoln** (`lincoln`) | *Team of Rivals* (Doris Kearns Goodwin) | Building cabinets of competing rivals; emotional discipline under pressure. |
| **Churchill** (`churchill`) | *The Last Lion* trilogy (William Manchester) | Resolve under existential pressure; the long view. |
| **Mandela** (`mandela`) | *Long Walk to Freedom* | Patience as strategy; reconciliation as governance. |
| **Sun Tzu** (`sun-tzu`) | *The Art of War* | Strategy in its purest form; underused for non-military problems. |
| **Deng Xiaoping** (`deng`) | *Deng Xiaoping and the Transformation of China* (Vogel) | Pragmatic governance at scale; "crossing the river by feeling the stones." |

---

## Ingestion order — what to do next

1. **Drop the PDFs you have** into `/sources/<figure>/<book-slug>.pdf` (gitignored). See `sources/README.md`.
2. **For each PDF, run a session** with the prompt below. Claude reads the PDF, distills 2–5 frameworks, and produces:
   - One `SKILL.md` per framework under `/skills/<figure>-<slug>/`
   - Updated entries in `src/lib/skills.ts`
   - Updated `skillSlugs` and `status` in `src/lib/books.ts`

   Session prompt template:
   ```
   I dropped /sources/elon/the-book-of-elon.pdf. Read it and extract 3–5 frameworks
   that Elon ACTUALLY used (not generic advice). For each, generate a SKILL.md
   following the pattern in /skills/musk-five-step-algorithm/SKILL.md. Add entries
   to src/lib/skills.ts and link the skill slugs in books.ts. Mark the book status
   as partial or complete.
   ```

3. **For new figures (Bezos, Buffett, Munger, etc.)**, the order is:
   - Add the portrait to `/public/portraits/<slug>.jpg` (or move from `figures.ts` archive's Wikipedia URL)
   - Promote the figure entry in `src/lib/figures.ts` from archive to active
   - Add a `Profile` entry in `src/lib/profiles.ts` (full Wikipedia infobox)
   - Add voice + music mappings in `api/tts/route.ts` and `AmbientMusic.tsx`
   - Then ingest books per step 2

---

## Quality bar for skills

Bad skill: *"Be customer-obsessed"* — this is advice anyone could give.

Good skill: *"Bezos's two-types-of-decisions framework: Type 1 doors are irreversible; analyze carefully. Type 2 doors are reversible; decide with 70% of the information you wish you had. Most companies treat every Type 2 like a Type 1, which is how they become slow."*

A skill is *good* when:
- It is **specific** to the figure's actual decisions and language.
- It has a **named procedure** the user can run on a real problem this week.
- It is **anti-pattern-aware** — calls out the failure mode of the framework itself.
- It is **attributable** to a chapter, letter, talk, or interview — not vibes.

Run the [skill-creator](https://docs.anthropic.com/en/docs/build-with-claude/skills) skill or modify an existing skill (e.g., `/skills/musk-five-step-algorithm/SKILL.md`) as a structural template.
