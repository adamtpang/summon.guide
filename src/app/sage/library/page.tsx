import FoundersLensLibrary from "@/components/FoundersLensLibrary";
import corpusStatus from "../../../../data/founders-corpus-status.json";
import {
  FOUNDERS_LENS_DISCLOSURE,
  FOUNDERS_LENS_PROMPTS,
} from "@/lib/foundersLens";
import { getSourceCorpus } from "@/lib/sourceCorpus";
import { getSourceRuntimePolicy } from "@/lib/sourcePolicy";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sage sources | summon.guide",
  description:
    "Search selected public Founders episode syntheses and ask citation-backed questions across the corpus.",
  alternates: { canonical: "https://summon.guide/sage/library" },
};

export default function FoundersLensPage() {
  const corpus = getSourceCorpus("founders-podcast");
  const episodes = corpus?.episodes || [];
  const runtimePolicy = getSourceRuntimePolicy("founders-podcast");

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-6 md:px-8 md:pt-10">
        <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.3em] text-warm-400 transition-colors hover:text-ink-950"
          >
            summon.guide
          </Link>
          <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-3 text-xs text-warm-500 sm:w-auto sm:justify-end">
            <a
              href="https://optimism.fun/last-company"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-950"
            >
              Find your last company ↗
            </a>
            <Link href="/senra" className="hover:text-ink-950">
              David Senra guide
            </Link>
            <a
              href="https://www.foundersnotes.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-950"
            >
              Official Founders Notes ↗
            </a>
          </div>
        </header>

        <section className="grid gap-10 pb-14 pt-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:pb-20 md:pt-24">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
              Summon Sage · Independent Founders research
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight md:text-7xl">
              Ask history for a precedent, not a platitude.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-warm-500 md:text-lg">
              Summon Sage searches Summon&apos;s original episode syntheses, compares
              patterns across builders, and returns concise answers with named sources.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sage"
                className="inline-flex min-h-12 items-center rounded-full bg-ink-950 px-6 text-sm font-medium text-white transition-colors hover:bg-ink-800"
              >
                Ask the corpus
              </Link>
              <a
                href="#workspace"
                className="inline-flex min-h-12 items-center rounded-full border border-ink-950 px-6 text-sm font-medium transition-colors hover:bg-ink-950 hover:text-white"
              >
                Open the workspace
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-3 divide-x divide-warm-200 border-y border-warm-200 py-5 text-center">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-warm-400">
                Notes
              </dt>
              <dd className="mt-2 font-serif text-3xl">{episodes.length}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-warm-400">
                Sources synced
              </dt>
              <dd className="mt-2 font-serif text-3xl">{corpusStatus.totals.privateEpisodes}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-warm-400">
                Syntheses ready
              </dt>
              <dd className="mt-2 font-serif text-3xl">
                {corpusStatus.totals.synthesisCoveragePercent}%
              </dd>
            </div>
          </dl>
        </section>

        <FoundersLensLibrary episodes={episodes} prompts={FOUNDERS_LENS_PROMPTS} />

        <section className="mt-12 grid gap-3 border-y border-warm-200 py-5 text-xs leading-relaxed text-warm-500 md:grid-cols-4">
          <p>
            <span className="block font-medium text-ink-950">Corpus progress</span>
            Inventory checked {corpusStatus.generatedAt}; {corpusStatus.totals.captionFailures} caption failures and {corpusStatus.totals.pendingSyntheses} episodes awaiting synthesis.
          </p>
          <p>
            <span className="block font-medium text-ink-950">Research index</span>
            {corpusStatus.totals.privateSemanticIndexesReady ? "Both local semantic indexes are ready." : "A local semantic index needs rebuilding."}
          </p>
          <p>
            <span className="block font-medium text-ink-950">Publication boundary</span>
            Public chat uses original synthesis only; raw transcripts stay private.
          </p>
          <p>
            <span className="block font-medium text-ink-950">Runtime policy</span>
            Top {runtimePolicy.maxRetrievedEpisodes} notes per question, citations required, provider retention denied.
          </p>
        </section>

        <aside className="mt-12 rounded-2xl border border-amber-800/15 bg-amber-100/45 p-5 text-sm leading-relaxed text-amber-950/70 md:p-6">
          <p className="font-medium text-amber-950">Scope and ownership</p>
          <p className="mt-2 max-w-4xl">{FOUNDERS_LENS_DISCLOSURE}</p>
        </aside>
      </div>
    </main>
  );
}
