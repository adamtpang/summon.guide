import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DistillationMarkdown } from "@/components/DistillationMarkdown";
import { getAllDistillations, getDistillation } from "@/lib/distillations";
import { getFigure } from "@/lib/figures";
import { getSourceCorpus } from "@/lib/sourceCorpus";

interface DistillationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllDistillations().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DistillationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getDistillation(slug);
  if (!item) return {};
  return {
    title: `${item.title} distilled | summon.guide`,
    description: item.description,
  };
}

export default async function DistillationPage({ params }: DistillationPageProps) {
  const { slug } = await params;
  const item = getDistillation(slug);
  if (!item) notFound();
  const guide = item.guideSlug ? getFigure(item.guideSlug) : undefined;
  const corpusSlug = item.corpusSlug || item.slug;
  const corpus = getSourceCorpus(corpusSlug);

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <Link href="/distillations" className="text-sm text-warm-400 transition-colors hover:text-ink-950">← All distillations</Link>

        <header className="mt-12 border-b border-warm-200 pb-9">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-gold-600">
            <span>{item.kind}</span>
            <span className="text-warm-300">·</span>
            <span className="text-warm-400">one-page markdown</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">{item.title}</h1>
          <p className="mt-3 text-warm-500">{item.author}</p>
          <p className="mt-6 text-lg leading-8 text-warm-500">{item.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {guide && (
              <Link href={`/chat/${guide.slug}`} className="rounded-full bg-ink-950 px-5 py-3 text-sm font-medium text-white hover:bg-ink-800">
                Chat with the guide
              </Link>
            )}
            {corpus && (
              <Link href={`/chat/source/${corpusSlug}`} className="rounded-full border border-warm-300 px-5 py-3 text-sm font-medium text-ink-950 hover:border-ink-950">
                Chat with this corpus
              </Link>
            )}
          </div>
        </header>

        {item.status === "awaiting-source" ? (
          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
            The rendering slot is ready. Import the course files you own or are licensed to use, then generate its public synthesis before chat is enabled.
          </div>
        ) : (
          <article className="mt-10"><DistillationMarkdown markdown={item.markdown} /></article>
        )}

        <footer className="mt-14 border-t border-warm-200 pt-6 text-xs text-warm-400">
          Source file: {item.filePath}
        </footer>
      </div>
    </main>
  );
}
