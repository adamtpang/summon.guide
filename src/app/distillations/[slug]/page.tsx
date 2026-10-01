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
    <main className="min-h-screen bg-night text-moon">
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <Link href="/distillations" className="text-sm text-dim transition-colors hover:text-moon">← All distillations</Link>

        <header className="mt-12 border-b border-edge pb-9">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-gold-500">
            <span>{item.kind}</span>
            <span className="text-dim">·</span>
            <span className="text-dim">one-page markdown</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">{item.title}</h1>
          <p className="mt-3 text-mist">{item.author}</p>
          <p className="mt-6 text-lg leading-8 text-mist">{item.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {guide && (
              <Link href={`/${guide.slug}`} className="rounded-full bg-moon px-5 py-3 text-sm font-medium text-night hover:bg-white">
                Chat with the guide
              </Link>
            )}
            {corpus && (
              <Link href={`/${corpusSlug}`} className="rounded-full border border-edge px-5 py-3 text-sm font-medium text-moon hover:border-moon">
                Chat with this corpus
              </Link>
            )}
          </div>
        </header>

        {item.status === "awaiting-source" ? (
          <div className="mt-10 rounded-2xl border border-gold-500/40 bg-raised p-6 text-moon">
            The rendering slot is ready. Import the course files you own or are licensed to use, then generate its public synthesis before chat is enabled.
          </div>
        ) : (
          <article className="mt-10"><DistillationMarkdown markdown={item.markdown} /></article>
        )}

        <footer className="mt-14 border-t border-edge pt-6 text-xs text-dim">
          Source file: {item.filePath}
        </footer>
      </div>
    </main>
  );
}
