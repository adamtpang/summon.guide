# Sage retrieval relevance review — 2026-09-08

## Bounded result

Reproduced the 109-record evaluation: **5/8, MRR 0.604**. The smallest justified
repair is to distinguish a historical single-title benchmark from reviewed
relevance across an expanded corpus. Production ranking and corpus text are
unchanged. The original queries, expected titles, rank limits, default command,
and failing exit status are preserved.

Added `data/founders-retrieval-judgments.json` and opt-in `--reviewed` evaluation.
Only grade 3 (directly useful guidance) counts; it must appear within the exact
original rank limit. Unreviewed cases keep their original expected title. The
reviewed evaluation is **8/8, MRR 0.833**. This is a different measurement, not a
claim that retrieval improved from 5/8 to 8/8.

## Before / after production ranks

| Query | Original expected source | Before | After | Original limit | Reviewed direct source / rank |
| --- | --- | ---: | ---: | ---: | --- |
| capital-allocation | Henry Singleton | 1 | 1 | 1 | Unchanged / 1 |
| board-control | Doug Leone | 1 | 1 | 1 | Unchanged / 1 |
| last-company | Doug Leone | 4 | 4 | 3 | Micky Malka / 3 |
| hiring | Tobi Lütke | 32 | 32 | 3 | Torsten Reil / 1; Brad Jacobs / 2 |
| market-education | Peter Thiel | 3 | 3 | 3 | Unchanged / 3 |
| independence | Jason Fried | 1 | 1 | 1 | Unchanged / 1 |
| failure-iteration | SpaceX | 1 | 1 | 3 | Unchanged / 1 |
| focus | Steve Jobs | 4 | 4 | 2 | Rockefeller / 1 |

The original evaluator retrieves ten results, so Tobi's rank 32 is reported as
not found and contributes zero to its MRR. Full-rank inspection establishes 32;
the original metric has not been silently changed to use it.

## Relevance findings

- **Last-company: stale exclusive judgment, with imperfect leading results.**
  Ferrero at 1 illustrates absorbing work and patient ownership, but the word
  `care` also matches medical care. DHH at 2 provides sustainability and
  independence, not a clear selection method. Both receive grade 2. Malka at 3
  describes sustained mission, authenticity and founder traits worth staying
  in business with for decades (lessons 5 and 8): grade 3 with an explicit
  investor/partner-to-founder application boundary. The expected Leone source
  mainly concerns capital allocation and governance: grade 2 for this query.
- **Hiring: stale exclusive judgment plus a recall limitation.** Helsing at 1
  gives recruitment pipelines and calibrated performance standards; Jacobs at 2
  gives candidate judgment, incentives and willingness to leave a vacancy. Both
  directly answer the question. Tobi's unusual-strength/high-agency criterion
  remains highly relevant at 32, so this does not prove comprehensive recall.
  Griffin at 3 is adjacent capability-building evidence; early SpaceX at 4
  supplies another direct recruiting mechanism through responsibility and mission.
- **Focus: stale exclusive judgment plus a noisy rank-2 result.** Rockefeller's
  explicit narrowing to one industry and resourcing one priority is directly
  useful. Helsing at 2 combines words from unrelated lessons (hardware simplicity,
  performance-review focus, regulatory distraction); grade 1. Elon at 3 and Jobs
  at 4 both offer coherent focus methods. A successful best-result check does
  not establish that every top result is strong.

No source-specific boost, query special case, threshold relaxation, corpus edit,
or removal of a failing fixture was justified. The graded judgments record both
good and weak competitors so later ranking work can target real weaknesses.

## Corpus refresh

Regenerated status and synthesis queue from existing local files only: **207**
private inventory episodes (170 Founders + 37 interviews), **109** original
syntheses (72 + 37), **98** pending, **52.7%** coverage. The earlier 206-source
snapshot was stale; this pass did not ingest an episode. Founders manifest sync
date is unknown and remains reported as unknown. Index readiness means files
exist, not that this pass rebuilt or verified their semantic quality.

## Reproduction and limitations

Checks passed: TypeScript (`tsc --noEmit`), focused ESLint on the evaluator, and
the Next production build (including `/sage`). The build retains the existing
`ranking.ts` broad filesystem-tracing warnings. All 109 synthesis YouTube IDs
are unique within their source and match the existing private inventory; the
coverage denominator and pending count were checked without publishing raw text.

```powershell
npm run eval:founders
# Expected exit 1: original 5/8, MRR 0.604.
npm run eval:founders -- --reviewed
# Expected exit 0: reviewed 8/8, MRR 0.833.
npm run corpus:founders:status
```

SHA-256 receipts for unchanged benchmark inputs:

- Original fixtures: `861DB37B471FA48C419512F66C6A895266F5FA59B567D3DA4CE9F3EF385EE3DD`
- Production ranker: `3A2EC952B94ADC9D636A89D1DAB3A7110EF2FFE6B67518DB005897C66B5FE8B1`
- Generated corpus: `D0E8E71A84B1B51F2B64E027BB895038253E88F484C69F5C33B2CB0BF7B8918E`

Judgments are this assistant's review of existing public-safe syntheses. They
are not independent human labels, transcript fact-checking, a full 109-record
relevance assessment, or generated-answer evaluations. No provider calls,
source ingestion, runtime activation, or deployment occurred.

**Next owner decision:** accept these provisional relevance judgments, or revise
them after reviewing the named lessons, before using the reviewed score as a
release gate. Keep the historical benchmark visible either way.
