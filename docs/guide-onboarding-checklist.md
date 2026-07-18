# Summon a guide — the onboarding checklist

The repeatable pipeline every new guide goes through, so each one arrives at the
same bar: **deeply researched, honestly sourced, visually and sonically present,
and immersive** — a wise past life you consult for the exact problem in front of
you (the Aang-and-a-past-Avatar feeling), not a chatbot with a costume.

Work top to bottom. Each guide add touches the same ~13 files (see §7). A guide
is not "done" until every box in §9 is checked.

---

## 0. Selection — is this guide worth summoning?

- [ ] **Notability**: real historical weight. Cross-check MIT Pantheon HPI
      (`/api/humans/pantheon`), and 2+ of: Skiena "Who's Bigger", Britannica,
      Wikipedia sitelink count. See `docs/notability-index.md`.
- [ ] **Mentor-fit**: has a teachable doctrine, method, or body of work someone
      can be *guided by* — not just fame. "What life problem does summoning them
      solve?" must have a crisp answer.
- [ ] **Groundability**: enough primary/first-degree sources (their own words,
      their work, a reputable biography) to author honestly.
- [ ] **Landmines flagged**: note controversy, rights issues, or sensitivities up
      front and decide how to handle (or skip). Religious founders and living
      litigious estates get extra care.
- [ ] **Domain gap**: prefer guides that widen the hall (fill a missing domain,
      era, region, or perspective).

## 1. Research (fan out, cite everything)

Run parallel research (Agent subagents or a workflow). Every non-obvious claim
gets a source URL. Produce, per guide:

- [ ] **Biography & timeline** — dates, places, the turning points.
- [ ] **Body of work / career** — what they actually did.
- [ ] **Philosophy & method** — the transferable ideas and how they worked.
- [ ] **Wisdom themes for a real problem today** — 4–6 themes, each tied to a
      REAL event or line, not generic inspiration.
- [ ] **Voice & speech patterns** — cadence, vocabulary, signatures, so the
      systemPrompt can sound like *them* (understandable, never caricature).

## 2. Fact-check — adversarial, quotes especially ⚠️

The single most important honesty gate. Famous figures accrete **misattributed
quotes** (Curie's "nothing to be feared", most "Bob Marley quotes" online).

- [ ] Every quote used anywhere (systemPrompt "YOUR OWN WORDS", profile
      `notableQuotes`, skill signature lines) is **verified to a primary or
      first-degree source**. Unverifiable → cut, or clearly mark as paraphrase.
- [ ] Award counts, dates, "firsts" verified (these are error-prone).
- [ ] A `warnings[]` list records everything excluded and why.
- [ ] Rule: **when in doubt, leave it out.** A guide that misquotes its own
      subject is worse than one with fewer quotes.

## 3. Author the content (mirror an existing guide's shape)

Read the `seneca` entries as the template. Produce:

- [ ] **`systemPrompt`** (~4–5k tokens): `BIOGRAPHICAL CONTEXT`, `VOICE & SPEECH
      PATTERNS`, `YOUR OWN WORDS` (verified quotes only), `CONVERSATIONAL STYLE`,
      `KNOWLEDGE BASE` (repeated `SOURCE:` / `TOPIC:` blocks). Ends with
      `${RESPONSE_RULES}` (added in code — do not inline it).
- [ ] **Profile** (wiki-style): infobox fields + `earlyLife` / `career` /
      `legacy` prose + `notableQuotes` (verified) + `primarySources`.
- [ ] **Skills**: one **umbrella** skill (slug === figure slug, channels the
      whole mind) + 2–3 **framework** skills (specific, actionable methods).
      Each is a `SKILL.md` (YAML frontmatter + Core Principle / Framework /
      Anti-patterns / Output shape) AND a `skills.ts` entry.
- [ ] **Card meta**: `hook`, `signatureQuote` (verified), `introLine` (first
      person, for TTS), `domains[]`, `knownFor`, `accomplishments[]`, `stats[]`,
      suggested chat questions, marketplace + plugin descriptions.

## 4. Visuals

- [ ] **Portrait**: a freely-licensed image (public domain / CC), ideally a
      direct `upload.wikimedia.org/...` URL. **Verify it returns HTTP 200 and is
      an image** before committing (dead portraits are the #1 render bug). If no
      free portrait exists, note it and use the best-licensed candidate — never a
      random hotlinked or rights-encumbered image.
- [ ] **`gradient` + `color`**: a palette that evokes the person/era (Seneca
      amber-stone, Curie radium-teal, Marley Rasta green-gold-red). Cosmetic but
      part of the immersion.

## 5. Audio & voice (ElevenLabs)

The voice is half the immersion — hearing the past life speak. Handle rights
honestly:

- [ ] **Consenting / living person** → a real voice clone is fine *with their
      permission* (ElevenLabs Professional Voice Cloning requires it).
- [ ] **Historical / deceased figure** → **do NOT** clone a real celebrity's
      voice from recordings. That breaks ElevenLabs' policy and publicity/likeness
      rights (estates like Marley's actively enforce this). Instead pick a
      **character-appropriate ElevenLabs premade/library voice** — matched for
      accent, age, and warmth (e.g. a warm Caribbean-inflected male for Marley, a
      grave measured voice for a Stoic). Set it in `VOICE_MAP` (`api/tts`).
- [ ] **`introLine`** is written to be *spoken* — first person, in their cadence,
      landing on an invitation to bring your problem.
- [ ] **Ambient track** in `MUSIC_MAP` fits the era/mood (`public/music/*`).
- [ ] If a licensed/estate-approved voice becomes available later, swap the
      `VOICE_MAP` id — no code change.

## 6. The immersive standard (the whole point)

The experience bar every guide must clear — you are Aang, and a wise past life
has been summoned **for the specific problem you carry right now**:

- [ ] The `systemPrompt` makes the guide **address the user's actual situation**
      as a warm elder speaking to a descendant — not lecture in the abstract.
- [ ] They speak **in their real voice** (patois, gravitas, plainness — whatever
      is true to them), grounded in their lived experience and cited sources.
- [ ] The first turn should feel like being *seen*: acknowledge the person, then
      the problem, then offer the one thing from their life that maps to it.
- [ ] Voice intro + portrait + ambient track + palette all reinforce "a real
      presence from another time," not a UI with a name on it.
- [ ] Roadmap (deeper immersion, not required per-guide): visual/animated
      summoning ritual, streamed voice on every reply, per-guide soundscape.

## 7. Integrate — the files each guide touches

- [ ] `src/lib/figures.ts` — the `Figure` entry (with `systemPrompt`).
- [ ] `src/lib/profiles.ts` — the wiki `Profile`.
- [ ] `src/lib/skills.ts` — the umbrella + framework `Skill` entries.
- [ ] `plugins/<slug>/.claude-plugin/plugin.json` — plugin descriptor.
- [ ] `plugins/<slug>/skills/<skill>/SKILL.md` — one per skill.
- [ ] `.claude-plugin/marketplace.json` — add the plugin entry.
- [ ] `src/app/api/tts/route.ts` — `VOICE_MAP` entry.
- [ ] `src/components/AmbientMusic.tsx` — `MUSIC_MAP` entry.
- [ ] `src/app/chat/[figure]/page.tsx` — suggested questions.
- [ ] (books optional) `src/lib/books.ts` — only if real books ground the skills.

> Tip: a small integration script (read authored JSON/txt → insert into each
> file at the array/object close) makes this deterministic and avoids
> hand-transcription errors on the large `systemPrompt`.

## 8. Verify

- [ ] `next build` passes (types + all profile pages prerender).
- [ ] Portrait URL returns **HTTP 200** (image).
- [ ] `/api/humans/search` badges the new guide "In the hall".
- [ ] Marketplace + plugin JSON parse; `SKILL.md` frontmatter `name` matches its
      folder (or the plugin won't install).
- [ ] Profile renders at `/<slug>` (browser or `curl | grep`).

## 9. Ship

- [ ] Branch → commit → push → PR (never push straight to `main`).
- [ ] Merge needs the owner's explicit OK.
- [ ] After merge: **auto-deploy is currently unreliable** — run
      `npx vercel --prod` if the merge doesn't reach production, then re-verify
      `/<slug>` live. (See `docs/billing-and-models.md` for the chat-runtime
      auth/credits reality — separate from shipping a guide.)

---

### Done bar

A guide ships only when: researched, every quote verified, portrait live,
voice + palette + ambient set, the systemPrompt speaks *to the user's problem*
in the guide's real voice, `next build` green, and the profile renders on prod.
That's the difference between "added a figure" and "summoned a past life."
