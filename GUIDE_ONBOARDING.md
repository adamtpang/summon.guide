# Guide Onboarding Algorithm

When someone asks summon.guide for advice from a specific person, the platform must:

1. **Recognize** the person (tolerating typos, nicknames, descriptions)
2. **Check** if they're already a guide
3. If not, **run this checklist** to decide whether and how to add them

This is the repeatable procedure. The runtime half (recognition + graceful "not summoned yet") is already wired in `src/app/api/match/route.ts` and the homepage. The curation half (actually creating a high-quality guide) is this document.

---

## Runtime behavior (already shipped)

`POST /api/match` classifies every request:

- **problem** ("I keep procrastinating") → routes to the best existing guide.
- **named** ("carnivore aurelius advice for bad smelling armpits") → normalizes the name (`carnivore aurelius` → `Marcus Aurelius`), then:
  - on the platform → `{ type: "matched", slug, reason }` → routes to chat
  - not on the platform → `{ type: "not_found", person, suggestedSlug, reason }` → homepage shows an honest "not summoned yet" card with a request button, instead of mis-routing to a random guide

So the worked example — *"carnivore aurelius advice for bad smelling arm pits"* — now resolves: name normalizes to Marcus Aurelius, who is a guide, and routes to `/chat/marcus-aurelius`. Marcus's system prompt explicitly handles the body/vanity case (Meditations 2.2, 8.37): the body's smells are nature; shame about them is the error; reserve attention for the ruling faculty.

---

## The onboarding checklist (curation)

Run this for any `not_found` person worth adding.

### 1. Identify

Resolve to the **canonical full name** and a **kebab-case slug**. Short slug where unambiguous (`elon`, `alexander`); full name where the short form is ambiguous (`marcus-aurelius`, `lee-kuan-yew`).

### 2. Dedupe

Check `src/lib/figures.ts` (active array AND `_ARCHIVE_FOUNDERS`). Many high-value figures (Bezos, Jobs, Munger, Buffett, Jensen Huang, Sam Walton, Naval) already have **complete system prompts in the archive** — onboarding them is promotion, not authorship.

### 3. Eligibility gate

A person earns a slot only if **all** are true:

- **Notable enough** that a serious person would want their counsel.
- **Source exists** — a credible book *by* or *about* them, or a serious compiled anthology. No source → no guide. (This is the single hardest gate and it is non-negotiable. It is what makes summon.guide grounded instead of a vibes machine.)
- **Distinct** — they add a domain or perspective not already covered. Another generic tech founder is worth less than the first philosopher, the first scientist, the first general.

### 4. Source check

Identify the canonical text(s) and add them to `src/lib/books.ts` with `status: "pending"`. Public-domain primary sources (Meditations, Franklin's Autobiography, Plutarch, The Art of War) are the highest-leverage: zero rights friction, deeply documented, and you can write an accurate system prompt without a PDF.

### 5. Generate the guide

In order (mirror an existing active guide as the template — Lee Kuan Yew and Marcus Aurelius are good models):

1. Portrait — local `public/portraits/<slug>.jpg`, or a Wikimedia Commons URL (now allowed via `next.config.ts` `images.remotePatterns`).
2. `src/lib/figures.ts` — active entry: slug, name, era, hook, portrait, gradient, color, signatureQuote, location, introLine, domains, knownFor, accomplishments, stats, and a `systemPrompt` with a `KNOWLEDGE BASE` of `SOURCE:` / `TOPIC:` blocks anchored to real chapters.
3. `src/lib/profiles.ts` — full Wikipedia-style infobox + early-life / career / legacy prose.
4. `src/lib/books.ts` — the canonical book(s).
5. `src/lib/skills.ts` + `/skills/<slug>-<framework>/SKILL.md` — 2–5 frameworks the person actually used.
6. Voice (`src/app/api/tts/route.ts`), music (`src/components/AmbientMusic.tsx`), suggested questions (`src/app/chat/[figure]/page.tsx`).

### 6. Quality gate

No fabrication. Every `SOURCE:` block and every skill must be attributable to a real chapter, letter, talk, or interview. If you cannot cite it, do not write it. Mark books `partial` until their frameworks are extracted, `complete` when the primary ones are captured.

### 7. Publish

Commit, PR, merge, deploy. The website auto-discovers the new figure, profile, books, and skills. The plugin registers the new slash commands.

---

## Policy: dead vs. alive — recommendation

You asked whether to feature only the dead or living people too. Recommendation: **both, but with a different bar and framing.**

### Default to the dead

The dead are the safe, strong core of the product:

- **Closed corpus.** A finished life has a settled record and a canonical biography. You can ground them honestly.
- **No reputational risk.** A living person can object, change, or do something tomorrow that makes an AI persona of them awkward. Marcus Aurelius will not.
- **Public domain.** Meditations, Franklin, Plutarch, Aurelius, Sun Tzu — zero rights friction, the richest sources, and the timeless problems (death, ambition, anger, discipline) don't expire.

### Allow the living — when the bar is met

Some living figures are too valuable to exclude (Elon, Naval, Jensen Huang, Bezos). Permit them when:

- They have **published their own thinking** in a durable form (shareholder letters, a book, an extensive on-record body of talks/interviews). Ground the guide in *that*, not in speculation about them.
- The persona is framed as **"their documented frameworks,"** not "a live channel of a real person's current opinions." summon.guide teaches what they wrote and did; it does not impersonate their stance on today's news.
- You would be comfortable if they read the page. (For Marcus, irrelevant. For a living founder, a real test.)

### The line

Not "dead vs. alive." The line is **grounded vs. ungrounded**. A dead figure with no good source is a worse guide than a living one with a great book. The eligibility gate in step 3 is the real policy; dead-vs-alive just adjusts how cautiously you frame it.

### Practical split

- **Tier 1 (lead with these):** dead, public-domain, timeless — Marcus Aurelius, Franklin, Rockefeller, Alexander, Lincoln, Sun Tzu, Marcus's Stoic neighbors. Lowest risk, highest staying power.
- **Tier 2 (high value, careful framing):** living, self-documented — Elon (*Book of Elon*), Naval (*Almanack*), Bezos (*Invent and Wander*), Jensen Huang (*The Nvidia Way*). Frame as documented frameworks.
- **Tier 3 (decline for now):** notable but no credible source, or living and largely unwritten. These return `not_found` and go on the request list.
