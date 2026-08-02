import { loadRanked, bestForSkills, bestForVideo, type RankedBook } from "@/lib/ranking";
import { books as registered } from "@/lib/books";
import { figures } from "@/lib/figures";
import { series } from "@/lib/episodes";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Shelf | summon.guide",
  description:
    "Every book on the shelf, ranked by what it is good for: installable skills you run, or a series you watch.",
  alternates: { canonical: "https://summon.guide/library" },
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** A small bar, because a number alone does not compare at a glance. */
function Score({ n, tone }: { n: number; tone: "skill" | "video" }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-14 h-1.5 bg-warm-200 rounded-full overflow-hidden">
        <span
          className={`block h-full rounded-full ${
            tone === "skill" ? "bg-ink-950" : "bg-gold-600"
          }`}
          style={{ width: `${n * 10}%` }}
        />
      </span>
      <span className="text-warm-500 text-[11px] tabular-nums w-4">{n}</span>
    </span>
  );
}

export default function LibraryPage() {
  const { ranked, unscored, catalog } = loadRanked();

  const registeredKeys = registered.map((b) => norm(b.title));
  const isRegistered = (t: string) => {
    const k = norm(t);
    return registeredKeys.some((r) => r.includes(k) || k.includes(r));
  };
  const surnames = figures
    .map((f) => f.name.split(" ").pop()!.toLowerCase())
    .filter((s) => s.length > 3);
  const hasGuide = (t: string) => surnames.some((s) => norm(t).includes(s));
  const bookSlugsWithSeries = new Set(series.map((s) => norm(s.bookTitle)));
  const hasSeries = (t: string) => {
    const k = norm(t);
    return [...bookSlugsWithSeries].some((s) => s.includes(k) || k.includes(s));
  };

  const skills = bestForSkills(ranked).slice(0, 20);
  const videos = bestForVideo(ranked).slice(0, 20);
  const extracted = catalog.filter((b) => b.status === "extracted");
  const scanned = catalog.filter((b) => b.status === "scanned");

  const Row = ({ b, tone }: { b: RankedBook; tone: "skill" | "video" }) => (
    <li className="grid grid-cols-[1fr_auto] gap-3 items-start py-2.5 border-b border-warm-100">
      <span className="min-w-0">
        <span className="block text-[15px] leading-snug">
          {b.title}
          {isRegistered(b.title) && (
            <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.12em] text-ink-950 border border-warm-300 rounded px-1.5 py-0.5">
              source
            </span>
          )}
          {!isRegistered(b.title) && hasGuide(b.title) && (
            <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.12em] text-warm-500 border border-warm-200 rounded px-1.5 py-0.5">
              guide exists
            </span>
          )}
          {hasSeries(b.title) && (
            <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.12em] text-gold-600 border border-gold-600/40 rounded px-1.5 py-0.5">
              series built
            </span>
          )}
        </span>
        <span className="block text-warm-500 text-[13px] leading-relaxed mt-0.5">
          {b.why}
        </span>
      </span>
      <span className="pt-1">
        <Score n={tone === "skill" ? b.skill : b.video} tone={tone} />
      </span>
    </li>
  );

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="max-w-5xl mx-auto px-6 pt-8 md:pt-12 pb-20">
        <header className="flex items-center justify-between mb-10 md:mb-14">
          <Link
            href="/"
            className="text-warm-400 text-xs tracking-[0.3em] uppercase hover:text-ink-950 transition-colors"
          >
            summon.guide
          </Link>
          <Link
            href="/books"
            className="text-warm-500 text-xs hover:text-ink-950 transition-colors"
          >
            Registered sources
          </Link>
        </header>

        <section className="mb-10">
          <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-4">
            The shelf
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium leading-[1.05] tracking-tight mb-5">
            {catalog.length} books, ranked by what each is good for.
          </h1>
          <p className="text-warm-500 text-base leading-relaxed max-w-2xl">
            Two different questions. A book earns a <b className="text-ink-950">skill</b>{" "}
            by being runnable, a procedure you execute this week. It earns a{" "}
            <b className="text-ink-950">series</b> by being watchable, needing a
            turn, a concrete detail, a scene. The same book rarely answers both
            the same way, and building the wrong one produces something correct
            and lifeless.
          </p>
          <p className="text-warm-400 text-sm mt-4">
            {extracted.length} machine readable &middot; {ranked.length} scored
            &middot; {unscored.length} not yet judged &middot; {scanned.length}{" "}
            are scans and need OCR
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-10 md:gap-8 mb-14">
          <section>
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-warm-200">
              <h2 className="font-serif text-2xl">Best for skills</h2>
              <span className="text-warm-400 text-xs ml-auto">
                things you run
              </span>
            </div>
            <ol className="space-y-0">
              {skills.map((b) => (
                <Row key={"s" + b.slug} b={b} tone="skill" />
              ))}
            </ol>
          </section>

          <section>
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-warm-200">
              <h2 className="font-serif text-2xl">Best for a series</h2>
              <span className="text-warm-400 text-xs ml-auto">
                things you watch
              </span>
            </div>
            <ol className="space-y-0">
              {videos.map((b) => (
                <Row key={"v" + b.slug} b={b} tone="video" />
              ))}
            </ol>
          </section>
        </div>

        <section>
          <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-warm-200">
            <h2 className="font-serif text-xl">Not yet judged</h2>
            <span className="text-warm-400 text-xs ml-auto tabular-nums">
              {unscored.length}
            </span>
          </div>
          <p className="text-warm-500 text-sm mb-4 max-w-2xl">
            Extracted and readable, but not scored. Unscored is not a verdict.
            These are simply books nobody has judged yet.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {unscored
              .sort((a, b) => b.words - a.words)
              .slice(0, 120)
              .map((b) => (
                <span key={b.slug} className="text-warm-500 text-[13px]">
                  {b.title}
                  <span className="text-warm-300 tabular-nums">
                    {" "}
                    {Math.round(b.words / 1000)}k
                  </span>
                </span>
              ))}
          </div>
        </section>

        <p className="text-warm-400 text-xs mt-12 pt-6 border-t border-warm-200 leading-relaxed max-w-2xl">
          This is the index, not the contents. Extracted text stays local,
          because it is the book in another format. Scores are editorial
          judgements about the books, not measurements of the text.
        </p>
      </div>
    </main>
  );
}
