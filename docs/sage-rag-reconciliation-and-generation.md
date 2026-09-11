# Sage corpus reconciliation and generation evaluation

September 10, 2026. Private research work; no production deployment.

## Catalog reconciliation

Compared the [official Founders catalog](https://www.founderspodcast.com/) with
the saved YouTube inventory. Cached public metadata for all 457 catalog entries,
including episode numbers, descriptions, dates, durations and public audio URLs.
No audio or new transcripts were downloaded.

- All **170 saved Founders videos** now map to catalog entries: 156 rule-based
  metadata matches and 14 explicitly documented agent-reviewed matches.
- **283 catalog entries remain outside the combined mapping:** 195 without a local
  metadata match, 81 fuzzy-review candidates and 7 repeated-book candidates.
- Four bonus catalog entries are already covered in the **38 David Senra interviews**:
  Todd Graves, Brad Jacobs, Michael Dell and Daniel Ek. These are cross-feed
  mappings, not four additional transcripts. Combined catalog coverage is 174/457
  entries (38.1%), including 166/432 numbered episodes.
- This establishes metadata identity, not transcript completeness or 457-episode
  coverage. The 88 review candidates are not automatically declared missing.

Repeated books are kept separate. Ogilvy #306/#89 and Dyson #300/#200 have
different runtimes; one upload must not count for both. The two Make Something
Wonderful uploads map separately to #398 and #299. Paul Graham parts I and II
were checked against distinctive public catalog passages in the private captions.

Found a real source-metadata error: Red Bull video `798LBCW-u2M` has a copied
Napoleon #337 description/link. Its title, 68-minute runtime and private transcript
identify Red Bull #333. The reconciliation records this correction without
overwriting the original source manifest.

The private acquisition queue retains public source URLs and evidence for every
unmapped entry. Availability of a public audio URL is not a claim of authorization
for hosted transcript use. David's private notes and highlights are not included.

## Stronger answer generation

Ran 36 local generations: three configurations on the same 12 preselected cases
from the frozen retrieval set, with identical top-four passages and neighbors.
Eight cases ask grounded questions; four request unsupported material. Temperature
was zero. These are provisional agent-reviewed results, not independent human
judgments or a statistically representative benchmark.

| Configuration | Strictly supported answers / 8 | Partial or wrong / 8 | Refused or rejected / 8 | Correct unsupported abstentions / 4 |
| --- | ---: | ---: | ---: | ---: |
| SmolLM2 1.7B Q4 baseline | 0 | 0 | 8 | 1 |
| Qwen3 4B Instruct Q4, same prompt | 2 | 0 | 6 | 4 |
| Qwen3 4B, evidence-first prompt | 2 | 5 | 1 | 4 |

SmolLM2's other three unsupported responses failed evidence-selection validation.
Qwen's evidence-first run produced seven answers, but review found only two
strict passes, four partial answers and one failed comparison. A valid reference
ID does not establish that a claim is supported.

Concrete failures:

- Sony: conflated preserving the Sony name with refusing low-quality goods.
- Dyson: supported the inventing motive, but overstated lack of financial support.
- Walton: turned one lease incident into a claim that landlords often refuse renewals.
- Zach Dell: answered company strategy rather than establishing the fifty-year
  motivation, and presented a speaker's forecast without attribution.
- Sony/Nike comparison: misread living on a teaching salary as covering company payroll.
- Walkman: refused despite supplied evidence that it removed recording capability.

Median generation latency was approximately 2.0 seconds for SmolLM2, 2.1 seconds
for Qwen baseline, and 3.6 seconds for Qwen evidence-first. Retrieval is additional.
The evidence-first configuration changes the prompt, JSON property order and
output budget (550 versus 300 tokens), so their individual effects are not isolated.

**Decision: do not promote this model or prompt to production.** The larger model
improves schema compliance and unsupported-question abstention, but does not yet
improve strict answer accuracy enough. The next generation experiment should test
claim-level supporting excerpts, split comparison retrieval by subject, and score
qualified partial answers without permitting unsupported additions.

## Reproducibility and boundaries

- [Qwen's model card](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) and
  [downloaded LM Studio quantization](https://huggingface.co/lmstudio-community/Qwen3-4B-Instruct-2507-GGUF).
- GGUF: `Qwen3-4B-Instruct-2507-Q4_K_M.gguf`, 2,497,280,448 bytes.
- SHA-256: `8cdb57cbb880d313736a9bc4e3d3d2485f145b5e19cf33783746e753e82641fc`,
  verified against the repository's LFS metadata before loading.
- Both models ran in installed llama.cpp on authenticated loopback, context 8192,
  one slot, four requested CPU threads. No transcript upload to a hosted model.
- Private artifacts: `catalog-reconciliation.json`, `catalog-acquisition-queue.json`,
  `catalog-details/`, `generation-*.json`, `generation-comparison-summary.json` under
  `../summon.company/knowledge/_sage-rag-pilot/`.
- Eight mechanical tests pass (five retrieval/privacy tests and three catalog
  identity regressions). These are not evidence of answer quality.

Public Sage remains on its existing synthesis-based retrieval and hosted generation.
