@AGENTS.md

# Project Status

## What's Built
legends.guide v2 — streaming chat with 10 founders, compare feature, source citations. Builds cleanly.

### Architecture
- **Next.js 16 + Tailwind CSS v4 + TypeScript** (App Router)
- **OpenRouter waterfall** for chat: two live-ranked free quality models, then one capped-cost fallback, with SSE streaming
- **No database** — knowledge chunks embedded directly in system prompts (sufficient for 10 founders)
- **Modular AI config** — model/provider swappable via `AI_CONFIG` in figures.ts

### File Map
- `src/lib/figures.ts` — 10 founder definitions with deeply researched system prompts, knowledge chunks with source citations, and `AI_CONFIG` for model swapping
- `src/app/page.tsx` — Landing page: dark grid of 10 FigureCards + Compare CTA
- `src/app/chat/[figure]/page.tsx` — Streaming chat UI: header, message thread, real-time token streaming, typing indicator
- `src/app/compare/page.tsx` — Compare page: pick 2 founders, ask same question, parallel streaming responses side-by-side
- `src/app/api/chat/route.ts` — POST route: entitlement-aware SSE streaming through the OpenRouter waterfall
- `src/components/FigureCard.tsx` — Card with gradient avatar, name, era, hook
- `src/components/ChatMessage.tsx` — Message rendering with citation parsing and display

### The Founding 10
1. John D. Rockefeller — wealth, discipline, monopoly (Titan by Chernow)
2. Steve Jobs — product, taste, focus (Isaacson biography)
3. Jeff Bezos — Day 1, customer obsession (Everything Store, Invent and Wander)
4. Elon Musk — first principles, speed (Isaacson, Vance biographies)
5. Jensen Huang — NVIDIA, suffering, conviction (The Nvidia Way)
6. Peter Thiel — monopoly, contrarian thinking (Zero to One)
7. Charlie Munger — mental models, inversion (Poor Charlie's Almanack)
8. Benjamin Franklin — self-improvement, reinvention (Autobiography, Isaacson)
9. Sam Walton — retail, hustle, culture (Made in America)
10. Naval Ravikant — leverage, specific knowledge, happiness (Almanack)

## Deploy Checklist
- [x] Set OPENROUTER_API_KEY in Vercel Production and Preview
- [ ] `npx vercel --prod`
- [ ] Point legends.guide domain to Vercel

## Future (v2+)
- [ ] Add real portrait images (update `portrait` field in figures.ts)
- [ ] ElevenLabs TTS voice clones per founder
- [ ] Supabase + pgvector RAG when scaling to 50+ founders
- [ ] Web search integration for real-time knowledge
- [ ] Conversation persistence (database)
- [ ] Auth for premium features

## Summon packs (2026-08-17)

- Added a project-level one-command installer: `npx --yes github:adamtpang/summon.guide summon install <dave-ramsey|elon>`.
- The installer creates portable source assets in `.summon/`, project-local skills for Claude Code and Codex, and the `summon-guide` remote MCP configuration.
- Added `/summon`, the site dashboard for the first two packs: Dave Ramsey (personal finance) and Elon (engineering and business). Both are clearly labeled as educational systems inspired by public material, not impersonations or personalized professional advice.

## Summon Member (2026-08-17)

- Added `/connect`, the member dashboard for connecting Claude, ChatGPT, and Codex/Claude Code.
- Added an OAuth authorization server for remote MCP clients: dynamic client registration, S256 PKCE, rotating refresh tokens, protected-resource metadata, and entitlement-aware MCP access.
- Added server-side membership enforcement. All guide calls require an active `Summon Member` entitlement and consume from the five-session monthly allowance. Do not rely on the browser credit counter for paid access.
- Stripe activation is launch configuration, documented in `docs/summon-membership-launch.md`. Apply the Prisma schema to the production database before enabling checkout.

## Corpus rendering and Paul Graham (2026-08-24)

- Added `/distillations` plus `/distillations/[slug]`, backed directly by the one-page Markdown files in `content/distilled/`. There are 47 rendered previews at this checkpoint.
- Added a source-backed Paul Graham guide, installable skills, six original public essay syntheses, and a `paul-graham-essays` source-chat corpus.
- Added `scripts/sync-web-corpus.mjs`; official-source syncs archived 232 Paul Graham pages, 570 Derek Sivers pages, 190 Visakan pages, and 2,211 Tim Ferriss pages (3,203 total) under private `sources/web/*/_raw/` directories with zero remaining failures. Raw source text is not public content.
- Added `scripts/sync-youtube-corpus.mjs` as the YouChop handoff. It uses YouChop's local transcript path and moves raw output into a private `_raw/` layer; original public syntheses are still required before chat grounding is rebuilt.
- Added the App Mafia rendering slot and private course intake instructions. Chat remains disabled until authorized source files have been synthesized.
- Diagnosed the production Starter Story failure as expired shared Anthropic OAuth credentials, not missing corpus data. Reseeded the credential and verified a live streaming response; a metered `ANTHROPIC_API_KEY` remains the durable production fix.
- Verification: `npx tsc --noEmit` and `npm run build` pass. Next reports one pre-existing broad filesystem-trace warning through `src/lib/ranking.ts`.

## Ben Cera / Polsia corpus (2026-08-27)

- Staged a private YouChop corpus at
  `content/knowledge/ben-cera-polsia`: 6 episodes, 16,103 words, and 6 timestamped
  Markdown pages under `brain/pages/`.
- Two videos had no YouTube captions and were transcribed locally with
  `faster-whisper`; no hosted transcript credits or provider key were used.
- `GUIDES.md` is generated by `scripts/gen-guide-inventory.mjs` and now lists Ben
  Cera / Polsia as an additional `corpus-staged` source with 6 corpus documents.
- Ben Cera is not yet registered as a public guide in `src/lib/figures.ts`, and the
  private transcripts must not be republished. Original synthesis is still required
  before public guide or chat grounding work.

## Book PDF finder agent (2026-08-27)

- Added a project-local Claude agent at `.claude/agents/book-pdf-finder.md`.
- It reuses `scripts/find-book.mjs` and `.claude/skills/find-book/SKILL.md`, then escalates only to author, publisher, institutional, library, or retailer sources.
- It is read-only and explicitly refuses shadow libraries, access-control bypass, DRM removal, purchases, borrowing, logins, and gated downloads.
- Added `docs/agents-quickstart.md` explaining when Codex subagents are sufficient and when to promote a repeated role into a named agent, skill, or MCP-backed worker.
- A live agent inspection found that local files named `antifragile` and `the bed of procrustes` are Bookey summaries, not Taleb's primary texts. They remain unverified secondary sources and are not corpus-ingestible as Incerto. Tightened local-file classification and DOAB title matching so filenames cannot be mistaken for verified corpus rights.

## Agent-first guide model (2026-08-27)

- Added `src/lib/guideAgents.ts` as the canonical product registry: every person, book, and channel is a durable `GuideAgent` with sources, skills, capabilities, runtime, and cross-project memory scopes.
- Projects are assignment containers, not owners of agents. Agent memory follows the specialist; assignment memory remains isolated to one project.
- Updated `/summon` from a two-pack page into the agent roster while retaining one-command installs for Dave Ramsey and Elon.
- Added `docs/guide-agent-model.md` as the architecture and product-language reference.

## OpenRouter free-to-saver waterfall (2026-08-29)

- Replaced Anthropic as the active runtime for guide chat, source chat, guide matching, and quote extraction. Legacy Anthropic helpers remain unused as rollback code.
- Added `src/lib/openrouter.ts`, adapted from the proven `waterfall.sh` routing shape: refresh the live catalog every six hours, choose two compatible free quality leaders, then one compatible model under the default $0.25/M input and $1.50/M output caps.
- OpenRouter performs provider/model fallback, and Summon additionally retries successful responses that contain no text. Requests deny providers marked as collecting model inputs.
- Both chat surfaces render a compact shadcn model badge showing Free/Saver, the actual model, and fallback depth. The browser SSE parser now handles network-split frames correctly and surfaces upstream errors without decrementing browser credits.
- Stored `OPENROUTER_API_KEY` as a sensitive Vercel setting for Production and Preview. Local development reads Adam's existing OpenRouter key file only at process start; no secret is committed.
- Live verification: Paul Graham source chat streamed through `minimax/minimax-m3:free` at fallback depth 1 while the data-collection-deny policy was active; `/api/match` and `/api/extract-quote` also returned valid results. `npx tsc --noEmit` and `npm run build` pass. Full-repo lint remains blocked by four unrelated pre-existing errors in Remotion, `gen-grounding.cjs`, and `AmbientMusic.tsx`.
- Deployed the tested preview to production as Vercel deployment `dpl_DEUgpbQys2z7pSf4et6GGy9VMHHV`. A post-deploy request to `https://summon.guide/api/chat/source` returned HTTP 200, 46 SSE events, `minimax/minimax-m3:free`, fallback depth 1, and `[DONE]` with no error. Vercel's large-function beta is enabled because the pre-existing dynamic filesystem trace makes `/library` exceed the normal function bundle limit.

## Problem-first intake and chat redesign (2026-08-30)

- The homepage now starts with a dark, problem-first chatbox. Users can describe
  a life problem or search for a named person without navigating elsewhere first.
- Added a ChatGPT and Claude context-import dialog that generates a
  privacy-conscious extraction prompt, accepts a reviewed Markdown brief, and
  attaches the brief through one-time session storage instead of a URL query.
- `/api/match` now reasons across situation, problems, goals, priorities,
  constraints, and patterns to select the guide and skill best suited to the
  user's highest-leverage current bottleneck.
- Guide and source chats share a shadcn composer, clearer empty states, durable
  citations, editorial response cards, accessible loading states, and 44px+
  controls. Imported context is collapsed into a reviewable attachment card.
- Visual direction references shadcn `login-03` for focused hierarchy while
  preserving Summon's warm-paper and ink system. See `DESIGN.md` for the rules.
- Local verification: structured founder context routed to Paul Graham plus
  `/paul-graham:do-things-that-dont-scale`; homepage, guide chat, and source chat
  returned HTTP 200; Helium passed desktop and 390px mobile overflow and target
  checks; focused ESLint, TypeScript, and production build pass.
- Deployed to production as `dpl_CMENMypVuMYGiE1KomiX3aLzhpt5`. Public checks
  confirmed the new intake and import controls, HTTP 200 for both chat shells,
  and structured context routing to Paul Graham with the correct playbook.

## Free Google sign-in testing mode (2026-08-30)

- Guide chat still requires a Summon identity, but testing access is free and
  does not consume membership sessions or browser credits. Set
  `SUMMON_ACCESS_MODE=paid` to restore the paid entitlement path.
- A question, suggested prompt, or imported personal brief is saved in
  per-guide session storage before Google sign-in. Auth.js returns to the exact
  guide URL, automatically resumes the pending request, and clears the stored
  context only after the guide answers successfully.
- The homepage and `/connect` explicitly say that no payment is required during
  testing. Google remains the only identity provider and Prisma remains the
  durable user/session store.
- Production deployment `dpl_9MnwFyug4uPatR18LUoftuMCnsX6` is live on
  `summon.guide`. Public verification confirmed testing mode, the Google
  provider/callback, and an Auth.js sign-in POST that returns a real
  `accounts.google.com` authorization URL.
- Fixed the remaining Google-side `redirect_uri_mismatch` in Cloud project
  `legends-guide` for OAuth client `legends-guide-web`. The client now retains
  localhost and `legends.guide` while also allowing the
  `https://summon.guide` origin and
  `https://summon.guide/api/auth/callback/google` redirect. A fresh production
  authorization request is accepted by Google without the mismatch error.

## Distillation ownership audit and Bookbox handoff (2026-08-30)

- The canonical agent registry currently contains 106 agents: 48 people, 54
  books or written collections, and 4 channels.
- `content/distilled/` contains 47 one-page Markdown files: 46 ready and the App
  Mafia course placeholder awaiting an authorized source. Semantic coverage is
  2/48 person guides (Paul Graham and David Senra), 40/54 books, and 4/4
  channels. David Senra's file is named `david-senra.md` while his agent slug is
  `senra`, so slug-only audits undercount it.
- Platonic ownership boundary: summon.guide owns people, channels, routing, and
  assignments; bookbox.ink owns book discovery, rights-aware ingestion, private
  corpora, canonical book distillations, book chat, frameworks, exercises,
  skills, and book agents. Summon consumes Bookbox through a stable contract.
- Added the evidence-backed `bookbox.ink` kin edge and `handoff-book-system`
  exchange recipe in `repos.yaml`. Proposal
  `20260830T075018488Z-d5ca2cec` was approved and completed.
- Bookbox now owns the first complete book-agent vertical for `meditations`:
  verified Project Gutenberg rights, a corrected Meric Casaubon edition record,
  12-book chapter map, canonical `distillation.md`, three derived skills, cited
  retrieval chat, profile/API routes, and `bookbox.book.v1` plus
  `bookbox.chat.v1` contracts. Its 54-book audit records 13 complete, 39 partial,
  2 pending, 40 chat-ready, and 14 without a corpus path.
- Compatibility contract `bookbox.ink/docs/compatibility/summon-v1.md` preserves
  Summon's existing profile, source-chat, distillation, and skill URLs. Summon
  has not switched its Meditations backing implementation yet; that adoption is
  the next bounded integration step.
- Bookbox verification: 4/4 tests, TypeScript, ESLint, and Next.js production
  build passed. No deployment, commit, push, or copyrighted source publication
  was performed.

## In-app guide request queue (2026-08-31)

- Added a signed-in request flow to `/summon#request-guide`, seeded with Don
  Valentine, Michael Moritz, and Doug Leone as quick examples. Requests can be
  people, channels, or books and include the user's problem plus an optional
  canonical source URL.
- Requests persist in PostgreSQL with normalized per-user deduplication, a
  ten-per-day abuse limit, and visible onboarding statuses. Drafts survive the
  Google OAuth redirect. Existing live guides route to their agent page instead
  of creating duplicates.
- The app now shows the eight-gate guide onboarding checklist: demand, identity
  boundary, rights/source map, cited corpus, one-page distillation, skills and
  tools, evaluation, and runtime/launch. Book requests explicitly hand source
  and rights work to Bookbox while remaining visible in Summon's request queue.
- Added Prisma migration `20260831000000_add_guide_requests`; it must be applied
  to the target database before deployment. TypeScript, focused ESLint,
  `git diff --check`, and the production build pass. Local HTTP checks returned
  200 for `/summon`, 401 for the unauthenticated request API, and confirmed all
  request-panel copy. Helium visual verification remains pending its one-time
  remote-debugging permission; this work has not been deployed.

## Founders Notes / Sage parity slice (2026-08-31)

- Confirmed Sage as the explicit parity target and recorded the dated capability
  map in `FEATURE-PARITY.md`. Public evidence shows the core loop is concise
  cross-corpus advice over every transcript, private note, and highlight, plus
  keyword search, source browsing, suggested questions, a Discover/Library
  direction, continuous corpus growth, and model upgrades.
- Added `/founders-lens`, an original independent surface over Summon's 49
  selected public-episode syntheses. It includes episode search, solo/interview
  filters, six decision-oriented discovery prompts, source links, and prompt
  handoff into cited Founders corpus chat.
- The page prominently links the official Founders Notes product and states that
  Summon is unaffiliated, does not contain David Senra's private notes or
  highlights, and does not imply endorsement. `docs/david-senra-community-release.md`
  defines the rights, owner-control, pilot, evaluation, and approval gates before
  any community launch.
- TypeScript, focused ESLint, `git diff --check`, and the production build pass.
  Local HTTP checks returned 200 for the landing and chat routes and verified
  query-prefill handoff. Local generation cannot answer without an
  `OPENROUTER_API_KEY`, but a production smoke test returned a 914-character
  answer with route metadata, citations, follow-ups, and no error. No deployment
  or community outreach was performed.

## Full Founders refresh, retrieval, and last-company handoff (2026-09-02)

- YouChop refreshed both public YouTube feeds into ignored private storage under
  `summon.company/knowledge`: 169/169 Founders episodes (2,107,210 words) and
  37/37 David Senra interviews (746,421 words), with zero caption failures.
- Added deterministic, inspectable query-aware retrieval over title, guest,
  principle, and lesson text. Large source chats now ground on the 16 most
  relevant original syntheses instead of sending the whole corpus each turn.
- Added public-safe original syntheses for Henry Singleton and Doug Leone, then
  regenerated `src/lib/sourceCorpus.ts`; the Founders surface now has 51 cited
  syntheses. Raw transcripts remain private and are never shipped in the app.
- Founders Lens now searches lesson text and includes a "Choose your last
  company" job linking into optimism.fun's private-on-device Last Company Lab.
- TypeScript, focused ESLint, and the production build pass locally. Deployment,
  owner authorization, and community release were not performed.

## Controllable Sage parity workspace (2026-09-02)

- `FEATURE-PARITY.md` now distinguishes local product-capability parity from
  proprietary corpus equivalence. The controlled loop is complete: frame a live
  decision, search or discover ranked precedents, inspect original synthesis
  notes and public sources, ask cited corpus chat, and save questions privately
  on-device.
- `/founders-lens` is now a unified Discover, Search, and Saved workspace over
  51 public-safe syntheses. It shows the 206-source private research inventory,
  24.8% editorial coverage, corpus freshness, local index health, publication
  boundary, and runtime policy without exposing transcript text.
- Added repeatable corpus operations: `npm run corpus:founders:status` generates
  the public-safe status and 155-item synthesis queue; `npm run
  corpus:founders:refresh` refreshes both YouTube feeds into ignored private
  storage and can optionally rebuild the local semantic indexes.
- Added an eight-case retrieval acceptance suite. `npm run eval:founders` passes
  8/8 with MRR 0.792 across capital allocation, control, company selection,
  hiring, market education, independence, failure, and focus decisions.
- Source-chat runtime controls are explicit: up to 16 eligible syntheses,
  mandatory citations, no raw transcript runtime access, and provider input
  retention denied. Helium verified the saved-question and ranked-search flows,
  plus a 390px mobile layout with no horizontal overflow and 44px tabs.
- The remaining controlled work is editorial, not product scaffolding: produce
  the 155 queued original syntheses and gather real answer-quality evidence.
  Hosted transcript retrieval, David's private notes/highlights, owner UI, and a
  community release remain gated by written rights and owner authorization. No
  deployment or community outreach was performed.

## The council: life context from themain.quest (2026-09-05)

- themain.quest now mails Adam's life-context brief (`# Personal context`:
  situation, problems, goals, priorities, constraints, patterns, guidance,
  open questions) to this repository as a repos.chat `notice` with subject
  `life-context`. `src/lib/lifeContext.ts` reads the newest one from
  `<workspace>/.repo-connect/mail/summon.guide/` (override the workspace with
  `REPOS_CHAT_ROOT`); on Vercel no mailbox exists and it returns null, so
  production keeps the paste-a-brief path.
- `src/lib/council.ts` is pure: a domain-overlap ranking that never needs a
  model, the council prompt, and a validator that drops invented slugs and
  commands and fills any gap from the ranking. `POST /api/council` (signed-in
  or MCP token) loads the mailed brief or accepts a pasted one, seats three
  guides through the OpenRouter waterfall, and falls back to the ranking when
  the router is unavailable. Seating does not consume a membership session.
- `/council` shows the brief for review (collapsed), the primary seat, and two
  more seats, each with a role, the specific thing that guide did, and the
  first question to ask. "Ask" stores the brief plus that question in the
  same `summon_intake` session storage the homepage uses and opens
  `/chat/<slug>?intake=1`, so nothing personal touches a URL and the guide
  receives the brief as an attached message. The homepage intake now links to
  it ("Seat the council").
- `POST /api/chat` appends a LIFE CONTEXT rule block whenever a user message
  is a `# Personal context` brief: answer the named quest, do not recite the
  brief, take one position on the fork, ask about stated open questions, do
  not speculate about other people's names.
- `extractJsonObject` moved to `src/lib/jsonExtract.ts` and is shared by the
  match and council routes. `npm run smoke:council` seats a real council from
  the mailbox without a browser (uses `scripts/node-server-shim.mjs` so plain
  Node can import server modules; `--env-file-if-exists=.env.local` supplies
  the OpenRouter key locally).
- Verification: `npx tsc --noEmit` (after `prisma generate`), focused ESLint,
  and `npm run build` pass; `/council` and `/api/council` compile. `repos
  verify` confirms both manifests (138 claims, 0 broken). Live smoke against
  notice `20260905T061115475Z-8b047d60` (639 words) seated Senra, Pressfield,
  and Taleb on one run and Pressfield, Seneca, and Rockefeller on the next
  through `minimax/minimax-m3:free`; Pressfield recurs because the brief names
  the Toolsmith's Trance condition. The no-model fallback returns Dalio, Curie,
  Pressfield. Not deployed; the mailbox path is local by design.
