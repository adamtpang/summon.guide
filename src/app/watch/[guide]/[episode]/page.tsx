import { series, formatRuntime } from "@/lib/episodes";
import { getBook } from "@/lib/books";
import { getFigure } from "@/lib/figures";
import EpisodeListen from "@/components/EpisodeListen";
import AiPersonaNotice, { isLivingGuide } from "@/components/AiPersonaNotice";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return series.flatMap((s) =>
    s.episodes.map((ep) => ({ guide: s.guideSlug, episode: ep.slug }))
  );
}

function find(guide: string, episode: string) {
  const s = series.find((x) => x.guideSlug === guide);
  if (!s) return null;
  const ep = s.episodes.find((e) => e.slug === episode);
  if (!ep) return null;
  return { s, ep };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guide: string; episode: string }>;
}): Promise<Metadata> {
  const { guide, episode } = await params;
  const hit = find(guide, episode);
  if (!hit) return { title: "Episode Not Found | summon.guide" };
  const { s, ep } = hit;
  const description = ep.hook.slice(0, 180);
  return {
    title: `${ep.title} | ${s.bookTitle} | summon.guide`,
    description,
    openGraph: {
      title: `${ep.title} — ${s.bookTitle}`,
      description,
      url: `https://summon.guide/watch/${guide}/${episode}`,
      type: "article",
    },
    alternates: {
      canonical: `https://summon.guide/watch/${guide}/${episode}`,
    },
  };
}

const BEAT_LABEL: Record<string, string> = {
  hook: "Hook",
  point1: "One",
  point2: "Two",
  point3: "Three",
  close: "Close",
};

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ guide: string; episode: string }>;
}) {
  const { guide, episode } = await params;
  const hit = find(guide, episode);
  if (!hit) notFound();
  const { s, ep } = hit;

  const figure = getFigure(s.guideSlug);
  const book = getBook(s.bookSlug);
  const idx = s.episodes.findIndex((e) => e.slug === ep.slug);
  const prev = idx > 0 ? s.episodes[idx - 1] : null;
  const next = idx < s.episodes.length - 1 ? s.episodes[idx + 1] : null;

  // the whole script, for the listen control and for anyone who wants to read it
  const fullScript = ep.beats.map((b) => b.text).join("\n\n");

  return (
    <main className="min-h-screen bg-ink-950 text-warm-50">
      <div className="max-w-2xl mx-auto px-6 pt-8 md:pt-12 pb-20">
        <header className="flex items-center justify-between mb-10">
          <Link
            href="/watch"
            className="text-warm-500 text-xs hover:text-warm-50 transition-colors flex items-center gap-1.5"
          >
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            The shelf
          </Link>
          <span className="text-warm-500 text-xs tabular-nums">
            {idx + 1} of {s.episodes.length}
          </span>
        </header>

        <p className="text-gold-500 text-xs tracking-[0.25em] uppercase mb-4">
          {book ? (
            <Link href={`/books/${s.bookSlug}`} className="hover:text-warm-50">
              {s.bookTitle}
            </Link>
          ) : (
            s.bookTitle
          )}
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-medium leading-[1.1] tracking-tight mb-4">
          {ep.title}
        </h1>
        <p className="text-warm-500 text-sm mb-7">
          {figure && (
            <>
              <Link href={`/${figure.slug}`} className="hover:text-warm-50">
                {s.guideName}
              </Link>
              {" · "}
            </>
          )}
          {formatRuntime(ep.seconds)} &middot; {ep.words} words
        </p>

        <EpisodeListen
          script={fullScript}
          figureSlug={s.guideSlug}
          guideName={s.guideName}
          hasMappedVoice={s.hasMappedVoice}
        />

        {/* The notice renders null for historical guides, so the wrapper is
            gated on isLivingGuide too. Otherwise every dead guide's page
            carries an empty div and its margin. */}
        {figure && isLivingGuide(figure.slug) && (
          <div className="mt-6">
            <AiPersonaNotice
              slug={figure.slug}
              name={figure.name}
              variant="inline"
            />
          </div>
        )}

        {/* The script, as beats, with the timings the visual edit cuts on */}
        <div className="mt-10 space-y-7">
          {ep.beats.map((b, i) => (
            <div key={i} className="grid grid-cols-[64px_1fr] gap-4">
              <div className="text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold-500">
                  {BEAT_LABEL[b.role] ?? b.role}
                </p>
                <p className="text-warm-500 text-[11px] tabular-nums mt-0.5">
                  {b.seconds}s
                </p>
              </div>
              <p className="text-warm-100 text-[17px] leading-[1.7]">{b.text}</p>
            </div>
          ))}
        </div>

        <nav className="mt-14 pt-6 border-t border-white/10 flex justify-between gap-4">
          {prev ? (
            <Link
              href={`/watch/${s.guideSlug}/${prev.slug}`}
              className="text-warm-500 text-sm hover:text-warm-50 transition-colors max-w-[45%]"
            >
              <span className="block text-[10px] uppercase tracking-[0.14em] mb-1">
                Previous
              </span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/watch/${s.guideSlug}/${next.slug}`}
              className="text-warm-500 text-sm hover:text-warm-50 transition-colors text-right max-w-[45%]"
            >
              <span className="block text-[10px] uppercase tracking-[0.14em] mb-1">
                Next
              </span>
              {next.title}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  );
}
