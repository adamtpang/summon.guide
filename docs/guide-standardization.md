# Guide standardization receipt

Local implementation, 2026-09-20. Not deployed. This receipt separates a standardized package from a complete, deeply researched guide.

## Implemented

- All 115 registered guides have versioned source manifests, content hashes, an evidence-aware decision workflow, five answer-evaluation fixtures, and explicit remaining gates.
- The shared identity and source contract applies to person chat, source chat, generated Eve instructions, and slash-command workflows. Advice is an AI interpretation; sources cannot override instructions or imply access to private thoughts.
- All 49 chat-enabled people now have retrieval notes. Added nine short, cited public-source syntheses across Adam Neumann, Bob Marley, Marie Curie, Pendleton Ward, Ricky Gervais and Sam Walton. These are starter additions, not full corpora.
- Pendleton Ward's three interview notes also power the selected-interviews source chat. There are 94 chat-enabled entries total.
- Source chat availability is derived from actual eligible notes, not configured corpus folder paths. Empty notes, raw directories and parent traversal are excluded consistently.
- Source-backed people have an existing manual distillation or a generated source digest. Generated digests are explicitly labeled adaptations, not reviewed comprehensive worldviews. Missing Bookbox distillations are not fabricated.
- All 115 individual handles use the same public-retrieval workflow. Normal individual handle installation does not create MCP configuration. The existing rich Dave Ramsey and Elon pack installation paths remain separate and retain their prior MCP behavior.
- The roster, public API and onboarding page expose evidence counts and partial/missing coverage. Jev's previously benchmarked topic labels remain available for discovery.

## Verification

- Structural/source/identity conformance plus public API and classifier tests: 13 passed.
- Existing summon skill and routing tests: 11 passed. Public handle installation test: 1 passed.
- All 230 generated workflow/handle skills pass the skill validator.
- Standard, Eve-package and handle regeneration parity pass for all 115.
- TypeScript and focused ESLint pass. Production webpack build passes after moving aside its stale cache. The usual filesystem-tracing warnings remain.
- Generated-answer citation smoke: baseline 90/94 passed. Three failures were missing, shortened or combined citation markers; one was a provider timeout. The shared prompt now explicitly requires one exact full title per marker. Retested those four plus Rose and Sage: 6/6 passed. Latest per-guide observations are 94/94, across two prompt revisions, not a fresh full run of the final prompt.
- Local HTTP 200 checks passed `/onboarding`, `/summon`, `/roseblumkin`, `/pendletonwardselectedinterviews` and `/api/public/guides`. Browser visual verification was not performed.
- The smoke uses public source notes and synthetic decisions, not personal user context. It checks citation membership and nonempty output only. It does not certify factual entailment, useful advice, adversarial behavior, voice quality, or parity with Founders Notes. The five-case fixtures remain defined, not fully executed.

- Eight identity, invented-memory, private-opinion and source-instruction probes were reviewed across Rose and Sage. A stale Rose prompt counted an unconnected episode; corrected it and reran all four Rose probes. All eight latest responses respect those boundaries. This is assistant review of two surfaces, not independent all-guide evaluation. Some answers remain overly verbose or tangential.

## Open gates

No guide is certified end-to-end complete. All need independent provenance/depth review and broader answer-quality evaluation. Eve packages remain authored but runtime activation, authentication and session isolation are not integrated. Voice casting is configured for active people but matching quality and real playback have not been verified. Shared IDs are not distinct personal voices. Rose still needs a portrait.

Source chat and person chat retain different pre-existing entitlement paths; this pass does not claim auth parity. There is no production deployment or migration receipt.

The following entries still have no connected eligible synthesis. Books remain owned by Bookbox; they need authorized editions or suitable public-domain editions, original synthesis, and canonical distillations. Person intake entries need fuller public-source research and evaluation before activation. Dave Ramsey retains a pack but has no web-chat corpus.

| Guide | Kind | Source owner |
| --- | --- | --- |
| Albert Einstein | person | summon.guide |
| Alysa Liu | person | summon.guide |
| Dave Ramsey | person | summon.guide |
| Henry Kissinger | person | summon.guide |
| Jennifer Doudna | person | summon.guide |
| Leonardo da Vinci | person | summon.guide |
| Adventure Time: The Art of Ooo | book | bookbox.ink |
| Alexander the Great | book | bookbox.ink |
| Benjamin Franklin: An American Life | book | bookbox.ink |
| Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork | book | bookbox.ink |
| Elon Musk | book | bookbox.ink |
| From Third World to First: The Singapore Story 1965-2000 | book | bookbox.ink |
| On Anger (De Ira) | book | bookbox.ink |
| On the Shortness of Life (De Brevitate Vitae) | book | bookbox.ink |
| One Man's View of the World | book | bookbox.ink |
| The Book of Elon | book | bookbox.ink |
| The Campaigns of Alexander (Anabasis Alexandri) | book | bookbox.ink |
| The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion | book | bookbox.ink |
| The Singapore Story: Memoirs of Lee Kuan Yew | book | bookbox.ink |
| Your Music and People | book | bookbox.ink |
| Zombies in Western Culture: A Twenty-First Century Crisis | book | bookbox.ink |

## Reproduce

- `npm run guides:generate` then `npm run handles:generate` and `npm run agents:generate`.
- `npm run guides:check`, `npm run handles:check`, `npm run agents:check`.
- `npm run guides:test` and `node --test scripts/guide-handle.test.mjs`.
- `npm run guides:eval` uses the configured OpenRouter credentials and can incur provider charges. Cached results are keyed by prompt and evidence; failures are retained. `--only=person:rose-blumkin,channel:founders-podcast` limits the run.

The detailed roster is in `docs/guide-roster-audit.md`; manifests and open gates are in `data/guide-standard.json`. Raw source text is never included in these packages.
