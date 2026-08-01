import { series, totalRuntime, formatRuntime } from "@/lib/episodes";
import { getBook } from "@/lib/books";
import { getFigure } from "@/lib/figures";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Shelf | summon.guide",
  description:
    "Pick a book off the shelf and watch the series. Each episode is a short lesson drawn from the book, written in the author's voice and read aloud.",
  alternates: { canonical: "https://summon.guide/watch" },
};

export default function WatchShelf() {
  const runtime = totalRuntime();
  const episodeCount = series.reduce((n, s) => n + s.episodes.length, 0);

  return (
    <main className="min-h-screen bg-ink-950 text-warm-50">
      <div className="max-w-4xl mx-auto px-6 pt-8 md:pt-12 pb-20">
        <header className="flex items-center justify-between mb-10 md:mb-14">
          <Link
            href="/"
            className="text-gold-500 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors"
          >
            summon.guide
          </Link>
          <Link
            href="/books"
            className="text-warm-500 text-xs hover:text-warm-50 transition-colors"
          >
            The library
          </Link>
        </header>

        <section className="mb-12 md:mb-16">
          <p className="text-gold-500 text-xs tracking-[0.25em] uppercase mb-4">
            The shelf
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium leading-[1.05] tracking-tight mb-5">
            Take a book down and watch it.
          </h1>
          <p className="text-warm-400 text-base md:text-lg leading-relaxed max-w-2xl">
            Every series is built from one book. Each episode runs about two
            minutes, opens on the problem rather than the summary, and is written
            in the author&rsquo;s own voice so it can be read aloud.
          </p>
          <p className="text-warm-500 text-sm mt-4">
            {series.length} {series.length === 1 ? "series" : "series"} &middot;{" "}
            {episodeCount} episodes &middot; {formatRuntime(runtime)} of material
          </p>
        </section>

        {series.length === 0 ? (
          <p className="text-warm-500">Nothing on the shelf yet.</p>
        ) : (
          <div className="space-y-12">
            {series.map((s) => {
              const book = getBook(s.bookSlug);
              const figure = getFigure(s.guideSlug);
              return (
                <section key={s.bookSlug}>
                  <div className="flex items-baseline gap-3 flex-wrap mb-5 pb-3 border-b border-white/10">
                    <h2 className="font-serif text-2xl md:text-3xl">
                      {book ? (
                        <Link
                          href={`/books/${s.bookSlug}`}
                          className="hover:text-gold-500 transition-colors"
                        >
                          {s.bookTitle}
                        </Link>
                      ) : (
                        s.bookTitle
                      )}
                    </h2>
                    {figure && (
                      <Link
                        href={`/${figure.slug}`}
                        className="text-warm-500 text-sm hover:text-warm-50 transition-colors"
                      >
                        {s.guideName}
                      </Link>
                    )}
                    <span className="text-warm-500 text-xs ml-auto tabular-nums">
                      {s.episodes.length} episodes &middot;{" "}
                      {formatRuntime(s.totalSeconds)}
                    </span>
                  </div>

                  <ol className="space-y-2">
                    {s.episodes.map((ep, i) => (
                      <li key={ep.slug}>
                        <Link
                          href={`/watch/${s.guideSlug}/${ep.slug}`}
                          className="group grid grid-cols-[28px_1fr_auto] gap-4 items-baseline border border-white/10 hover:border-gold-500/50 rounded-xl px-4 py-3.5 transition-colors"
                        >
                          <span className="font-mono text-xs text-warm-500 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-serif text-lg leading-snug group-hover:text-gold-500 transition-colors">
                              {ep.title}
                            </span>
                            {ep.hook && (
                              <span className="block text-warm-500 text-sm leading-relaxed mt-1 line-clamp-2">
                                {ep.hook}
                              </span>
                            )}
                          </span>
                          <span className="text-warm-500 text-xs tabular-nums whitespace-nowrap">
                            {formatRuntime(ep.seconds)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </div>
        )}

        <p className="text-warm-500 text-xs mt-14 pt-6 border-t border-white/10 leading-relaxed">
          Episode scripts are written from the source book and read in a
          synthesised voice. They are a study aid, not a substitute for the book.
        </p>
      </div>
    </main>
  );
}
