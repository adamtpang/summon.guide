import { books } from "@/lib/books";
import { getBookProfile } from "@/lib/bookProfiles";
import { figures } from "@/lib/figures";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Library | summon.guide",
  description:
    "Every primary source behind the guides: the biographies, memoirs, and anthologies that ground each figure and every skill derived from them.",
  alternates: { canonical: "https://summon.guide/books" },
};

export default function BooksIndex() {
  // Group by guide, in roster order, so the library reads as "who, then what
  // grounds them" rather than an undifferentiated pile of titles.
  const byFigure = figures
    .map((figure) => ({
      figure,
      books: books.filter((b) => b.figureSlug === figure.slug),
    }))
    .filter((g) => g.books.length > 0);

  const written = books.filter((b) => getBookProfile(b.slug)).length;

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="max-w-4xl mx-auto px-6 pt-8 md:pt-12 pb-20">
        <header className="flex items-center justify-between mb-10 md:mb-14">
          <Link
            href="/"
            className="text-warm-400 text-xs tracking-[0.3em] uppercase hover:text-ink-950 transition-colors"
          >
            summon.guide
          </Link>
          <Link
            href="/"
            className="text-warm-500 text-xs hover:text-ink-950 transition-colors flex items-center gap-1.5"
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
            All guides
          </Link>
        </header>

        <section className="mb-12 md:mb-16">
          <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-4">
            The library
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium leading-[1.05] tracking-tight mb-5">
            {books.length} primary sources.
          </h1>
          <p className="text-warm-500 text-base md:text-lg leading-relaxed max-w-2xl">
            A guide is a person we summon. A book is where their thinking
            actually comes from. Every skill in the library traces back to one of
            these, so a claim we make on a guide&rsquo;s behalf can be checked
            against the page it came from.
          </p>
          <p className="text-warm-400 text-sm mt-4">
            {written} {written === 1 ? "has" : "have"} a full write-up so far.
          </p>
        </section>

        <div className="space-y-10">
          {byFigure.map(({ figure, books: figureBooks }) => (
            <section key={figure.slug}>
              <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-warm-200">
                <Link
                  href={`/${figure.slug}`}
                  className="font-serif text-xl md:text-2xl hover:underline decoration-warm-300"
                >
                  {figure.name}
                </Link>
                <span className="text-warm-400 text-xs ml-auto tabular-nums">
                  {figureBooks.length}
                </span>
              </div>
              <div className="space-y-2.5">
                {figureBooks.map((book) => {
                  const hasProfile = Boolean(getBookProfile(book.slug));
                  return (
                    <Link
                      key={book.slug}
                      href={`/books/${book.slug}`}
                      className="group block border border-warm-200 hover:border-ink-950 rounded-xl px-4 py-3 bg-white transition-colors"
                    >
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="font-serif text-base md:text-lg italic">
                          {book.title}
                        </span>
                        {hasProfile && (
                          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-warm-500 border border-warm-300 rounded px-1.5 py-0.5">
                            full entry
                          </span>
                        )}
                        <span className="text-warm-400 text-xs ml-auto tabular-nums">
                          {book.year}
                        </span>
                      </div>
                      <p className="text-warm-500 text-sm mt-1">
                        {book.role === "by"
                          ? "Written by"
                          : book.role === "about"
                            ? "Biography by"
                            : "Compiled by"}{" "}
                        {book.author}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
