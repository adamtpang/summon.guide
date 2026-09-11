# Feature parity: Founders Notes / Sage

## Current assessment — 2026-09-10

This assessment supersedes the historical completion claims and counts below.
Adam explicitly selected `/sage` as Summon's URL/name; older naming exclusions
below do not override that decision. Summon remains independent of Founders Notes.

- **Parity is not established.** Interface affordances, a small retrieval suite,
  and a working chat are insufficient evidence of comparable answer quality.
- Verified live code retrieves up to 16 original syntheses using weighted lexical
  matching and concept expansion. This is basic retrieval-augmented generation,
  not hosted semantic retrieval over full transcripts.
- Latest saved inventory (2026-09-08): 170 Founders YouTube episodes plus 38 David
  Senra interviews, 208 private transcripts / 2,881,689 words. Public runtime has
  109 syntheses; 99 synced episodes lack synthesis. These counts do not establish
  completeness against the entire Founders podcast catalog. Private semantic
  indexes are marked not ready for this snapshot.
- Founders Notes' public page, checked 2026-09-10, claims every episode transcript
  plus David's book notes and highlights, with continuing additions. We have not
  inspected its signed-in experience or internal retrieval architecture.
  Source: https://foundersnotes.com/
- Next engineering target: hybrid full-transcript retrieval with parent context,
  reranking, timestamp citations, a synthesis overview layer, and source access
  controls. Design and acceptance plan: `docs/sage-transcript-rag.md`.
- Current project policy keeps raw transcripts out of the hosted runtime. RAG does
  not inherently publish transcripts, but deploying this corpus requires resolving
  the existing hosted-corpus access/rights gate. Proprietary notes/highlights are
  a separate data-access gap; no permission or access is inferred from parity goals.


Public target rechecked: 2026-09-08. Historical local checks below retain their original dates.

## Controllable parity status

**Core local interaction loop implemented. Full feature and answer-quality parity: not yet verified. Corpus equivalence: not claimed.**

## Current execution, 2026-09-08

- Adam accepted the reviewed relevance labels and selected continued comparison
  from public evidence. Signed-in Founders Notes features are therefore unverified,
  not assumed absent. No further access question is pending.
- Completed local-caption sync of both public feeds: 170 Founders episodes and
  38 David Senra interviews, 2,881,689 words total, zero caption failures. One new
  interview, Zach Dell / Base Power (2026-09-06), was downloaded into private storage.
  Public runtime remains 109 original syntheses; 99 pending, 52.4% coverage.
  Both private semantic indexes now fail freshness checks and require rebuilding;
  they are not the public runtime's lexical retrieval index. The required local
  embedding dependency is absent; no installation/rebuild was performed this pass.
- `/sage` now hosts streaming conversation, contextual follow-ups, expandable
  cited synthesis notes, public episode links, and explicit local conversation
  save/reopen/delete (newest 20). Discovery/search/saved-question handoffs stay on
  `/sage`. This completes the local ask-to-inspect-to-return interaction in one URL.
- Unknown citation titles are visibly unverified rather than turned into fake links.
  Stream errors retain the question and prior completed conversation; Stop aborts
  the request. Storage failures are reported instead of claiming a successful save.
- Saved conversations are on-device, not account-synced. This is a deliberate
  current implementation limit, not a claim about the target's storage model.
- Deterministic Helium checks pass for split streaming, follow-up context, source
  inspection, unknown citations, save failures, reload/reopen, request failures,
  cancellation, deletion, and a 390px no-overflow layout. API calls and storage were
  isolated/mocked. Real answer quality and generation latency are not verified by
  these UI checks. TypeScript, focused ESLint and production build pass after
  removing corrupt generated development-route types; existing trace warnings remain.
- Remaining parity work: original synthesis coverage, evaluated generated answers
  (source fidelity, analogies, counterexamples, useful decision rules), and any
  additional capabilities established through future target evidence. Runtime
  packaging by itself does not close these gaps. No deployment in this pass.

Within material Summon can publish safely, the customer can now complete the
same public value loop: bring a live company problem, retrieve several relevant
historical precedents, inspect the underlying notes and public sources, save
useful questions privately, and return to a curated discovery library. The
remaining work includes corpus breadth, real answer-quality evaluation, and an
authorized inspection of the target's signed-in interactions. The public landing
page alone cannot establish exhaustive feature parity.

## Selected target

Primary target: **Sage inside David Senra's Founders Notes**.

Success means matching the useful customer outcome: a founder can bring a live
business problem, retrieve relevant historical precedents across a trusted
corpus, inspect the evidence, and leave with a concise decision aid. It does not
mean copying the Founders Notes interface, private corpus, wording,
brand assets, or David Senra's identity. At Adam's request, Summon's independent
workspace uses `/sage`; its source-ownership and non-affiliation disclosure remains.

## URL and agent decision, 2026-09-08

- Fresh local verification: `/sage` returns 200; `/founders-lens?topic=focus`
  returns 308 to `/sage?topic=focus`. TypeScript and focused ESLint pass.
- The current source module contains 109 Founders syntheses, superseding the
  historical 51-note figures below. Retrieval acceptance currently passes 5/8,
  MRR 0.604: last-company and focus rank their expected sources fourth; the hiring
  source is outside the top ten. Added sources now occupy leading positions.
  Do not tune rankings solely to recover an old expected title: review relevance
  across the expanded corpus and add graded judgments before claiming parity.
- Bounded relevance review completed later on 2026-09-08: original benchmark
  remains 5/8, MRR 0.604, with unchanged rankings and fixtures. Separate reviewed
  acceptance is 8/8, MRR 0.833, at the same rank limits. Alternative direct sources
  explain the single-title misses; Tobi recall and Helsing focus noise remain.
  See `docs/sage-retrieval-review-2026-09-08.md` for judgments and before/after ranks.
- Refreshed corpus-status JSON from existing local inventory: 109 syntheses,
  207 inventory episodes, 98 pending, 52.7% coverage. No ingestion occurred.
  These replace earlier snapshots, not the historical receipts below.
- `/sage` is the canonical Founders research workspace. `/founders-lens` redirects
  permanently; internal navigation and the sitemap use `/sage`.
- Stable public agent homes should use `/<slug>`, independent of runtime or vendor.
  Existing profile/chat URLs remain compatible; this change does not migrate all
  individual chat routes into their profile pages.
- Each guide is a specialist identity with sources, skills, and bounded capabilities.
  Sage is the cross-corpus experience; it can retrieve across sources directly and
  involve a specialist when useful. It need not call all guide agents per question.
- Eve package generation is complete; runtime activation is still unfinished.
- The target's public homepage rechecked on 2026-09-08 confirms coverage of every
  episode transcript and every book note/highlight, with continuing additions.
  No authenticated target feature inspection or corpus-equivalence test was performed.
- Acceptance still needed: representative cited answers reviewed for correctness,
  coverage, useful comparisons, and limitations; authenticated workflow comparison;
  durable saved work where required by that comparison; latency/cost measurements;
  and production verification. Earlier table entries describe local capabilities,
  not proof of superiority to the target.

## Current first-party evidence

- [Founders Notes](https://www.foundersnotes.com/) says Sage searches David's
  notes, highlights, and episode transcripts, synthesizes concise advice, and is
  continuously expanded. Public pricing observed on 2026-08-31 was $100/month,
  $500/year, or $1,500 lifetime.
- In [Smart Friends #6](https://www.ejorgenson.com/podcast/david-and-mitchell-6),
  David describes Sage as reading every transcript, note, and highlight and says
  he uses it in his own daily research workflow.
- In [Smart Friends #5](https://www.ejorgenson.com/podcast/david-senra-mitchell-baldridge-5),
  David describes a Discover/Library direction built from his own and community
  searches, so users can receive useful questions before facing an empty box.

## Core value loop

1. Start with a live company problem or a high-signal discovered question.
2. Search the entire trusted founder corpus.
3. Compare several precedents instead of returning one generic answer.
4. Show the source trail so the user can inspect the cases.
5. Apply the pattern to a decision, then preserve useful queries for discovery.
6. Improve the corpus and suggested questions every week.

## Capability map

| Capability | Sage evidence | Summon status | Acceptance criterion |
| --- | --- | --- | --- |
| Cross-corpus AI answers | Reads transcripts, notes, and highlights | Match in controlled scope | Query-aware retrieval covers all 51 publishable syntheses, compares multiple precedents, and requires citations |
| Concise decision support | Public product promise | Match | Answer with comparison, boundary conditions, and a usable decision rule |
| Keyword/semantic search | Searchable notes database | Match in controlled scope | Ranked title, guest, principle, and lesson search is live over every publishable note; both full private corpora also have local semantic research indexes |
| Browse by source/book | Notes and highlights can be read | Match in controlled scope | All 51 synthesis records expand inline to their key lessons and link to the public episode |
| Suggested questions | David publishes questions he actually asks | Match | Seven decision-oriented editorial prompts can be run or saved privately |
| Discover/library feed | David described this product direction | Match in controlled scope | Curated discovery plus a device-private saved-question library; no private user question is published by default |
| Corpus freshness | New notes and episodes added continuously | Operational match, editorial coverage partial | One command refreshes both private feeds and regenerates a visible status plus a 155-item synthesis queue; 51/206 episodes currently have publishable synthesis |
| Model upgrades | David says models are upgraded over time | Match | Provider-neutral routing with observable fallback and quality checks |
| Source transparency | Not established publicly | Match+ | Named citations on every corpus-grounded answer |
| Personal context | Not established publicly | Match+ | User can attach reviewed context and keep assignment memory scoped |
| Retrieval evaluation | Not established publicly | Match+ | Eight deterministic founder-decision cases must pass before retrieval changes are accepted |
| Full private corpus | David's proprietary notes/highlights | Blocked by evidence | Written authorization and a private ingestion contract |
| Community release | Founders audience and brand | Blocked by authority | David/community owner approves positioning and distribution |

## Highest-value gaps

1. **Editorial breadth.** The generated queue records 155 synced episodes still
   awaiting original synthesis. This is controlled work, but not a software
   feature and not safe to replace with unreviewed transcript publication.
2. **Hosted full-transcript retrieval.** Both 206-episode private research indexes
   are ready locally. Product access remains intentionally blocked pending a
   rights-approved hosted corpus contract.
3. **Partnership control UI.** Runtime policy now enforces source exclusions,
   retrieval depth, citations, no raw transcript use, and provider-retention
   denial. A corpus-owner login and durable control UI still require a partner.
4. **External proof.** The local retrieval suite is 8/8; real founder usage and
   answer-quality review remain necessary before a community claim.

## Implemented parity slice

- `/founders-lens`: original, independent public-corpus experience.
- Search and filters across the 51 current episode syntheses.
- Six job-based discovery prompts and deep links into cited corpus chat.
- Explicit link to the official Founders Notes product and a non-affiliation,
  source-ownership disclosure.
- Query handoff from a discovery card into `/chat/source/founders-podcast`.

## Implemented parity slice 2, 2026-09-02

- Refreshed the private YouChop layer to 169 Founders episodes (2,107,210 words)
  and 37 David Senra interviews (746,421 words), with timestamp-linked pages and
  zero caption failures.
- Added deterministic query-aware retrieval over title, guest, principle, and all
  lesson text. Source chat now sends the 16 best-matching syntheses instead of
  packing the entire growing corpus into every request.
- Expanded Founders Lens search to lesson text and added a last-company discovery
  job shared with optimism.fun.
- Kept the privacy and rights boundary explicit: full transcripts stay in ignored
  private corpus storage; only original syntheses enter the public runtime.
- Added source-grounded original syntheses for the latest Doug Leone interview
  and Henry Singleton episode, bringing the public-safe Founders corpus to 51.
- Local implementation only. No deployment or community release is claimed.

## Implemented controllable parity slice 3, 2026-09-02

- Rebuilt `/founders-lens` as one workspace with a live-decision composer,
  editorial Discover feed, ranked synthesis search, expandable source notes,
  public-source links, and a device-private saved-question library.
- Added explicit source runtime policy for retrieval depth, episode exclusions,
  mandatory citations, raw-transcript blocking, and provider-retention denial.
- Added `npm run corpus:founders:refresh` for a repeatable two-feed private sync,
  `npm run corpus:founders:status` for coverage and index evidence, and a
  generated 155-episode editorial synthesis queue.
- Added `npm run eval:founders`; all eight decision-retrieval acceptance cases
  pass locally, including capital allocation, boards/control, last-company fit,
  hiring, market education, independence, failure, and focus.
- This closes the controllable customer-facing feature gaps. It does not make
  Summon equivalent to David's proprietary corpus or authorize his community.

## Explicit exclusions

- Do not call the Summon surface Sage or present it as an official Founders tool.
- Do not ingest, reproduce, or derive from David's private notes/highlights
  without written authorization.
- Do not imply endorsement or release into his community without approval.
- Do not publish raw transcripts when original synthesis is sufficient.

## Current priority

Work the 155-episode synthesis queue in evidence-ranked batches and collect real
answer-quality feedback. A written source and distribution agreement remains the
dependency for hosted full-transcript retrieval, David's private notes, an owner
control login, or release to the Founders community.

## Private RAG pilot — 2026-09-10

Built local hybrid transcript retrieval over 208 episodes / 22,578 passages, with
17,807 caption-aligned passages. Frozen provisional retrieval comparison: expected
episode top-8 26/26 vs 22/26; MRR .902 vs .714. These are agent-authored hypotheses,
not independently judged passage or answer quality. Local SmolLM2 generation smoke
tests failed; do not promote that model. Official catalog audit found 457 entries
(432 numbered), so complete catalog reconciliation remains a major gap. No public
runtime change. Full evidence: docs/sage-rag-pilot-results.md.


## Sage catalog reconciliation and stronger generation — 2026-09-10

- Reconciled all 170 saved Founders videos against 457 official catalog entries;
  156 rule-based metadata mappings plus 14 documented agent-reviewed mappings.
  Four catalog bonuses already exist in the 38 David Senra interview transcripts.
  Combined mapping: 174 catalog entries, including 166 numbered episodes.
- Private acquisition queue: 283 entries (195 no local metadata match, 81 fuzzy
  review, 7 repeated-book review). Not a claim that every queued entry is unique
  missing content. Cached public metadata/audio URLs for all 457; no audio fetched.
- Corrected reconciliation of the Red Bull #333 video whose source description
  incorrectly names Napoleon #337. Original private manifest preserved.
- Compared SmolLM2 1.7B and SHA-verified Qwen3 4B locally on twelve frozen cases.
  36 generations across three configurations; no hosted transcript upload.
  Qwen baseline: 2/8 strict supported answers, 6 over-abstentions, 4/4 correct
  unsupported abstentions. Evidence-first: 2 strict, 4 partial, 1 failed comparison,
  1 over-abstention; 4/4 unsupported abstentions. Agent review, not human gold labels.
- Decision: no production promotion. Schema compliance improved, strict grounded
  answer quality remains insufficient. Public Sage stays synthesis-based.
- Added reproducible catalog/generation scripts and documented results in
  docs/sage-rag-reconciliation-and-generation.md. Eight mechanical tests passed.
  No commit, push, deployment or personal outreach.
