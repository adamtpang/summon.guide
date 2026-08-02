import fs from "fs";
import path from "path";
import { books as registered } from "@/lib/books";
import { figures } from "@/lib/figures";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Shelf | summon.guide",
  description:
    "Every book on the shelf, what state it is in, and which ones have become guides, skills, or episodes.",
  alternates: { canonical: "https://summon.guide/library" },
};

interface CatalogBook {
  slug: string;
  title: string;
  shelf: string;
  sizeKb: number;
  pages: number;
  words: number;
  status: "extracted" | "scanned" | "failed" | "pending";
}

/**
 * The catalog is the index, never the text.
 *
 * Extracted markdown lives in sources/_md/ and is gitignored, because it is the
 * book in another format and is exactly as copyrighted as the PDF it came from.
 * What is safe and useful to publish is the shape of the collection: what is
 * here, what state it is in, and what has been built from it. That is also the
 * only thing needed in order to decide what to build next.
 */
function loadCatalog(): CatalogBook[] {
  const p = path.join(process.cwd(), "data", "library.json");
  if (!fs.existsSync(p)) return [];
  try {
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    return Array.isArray(j.books) ? j.books : [];
  } catch {
    return [];
  }
}

const norm = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export default function LibraryPage() {
  const catalog = loadCatalog();

  // which catalog entries already exist as a registered book in the repo
  const registeredKeys = registered.map((b) => norm(b.title));
  const isRegistered = (t: string) => {
    const k = norm(t);
    return registeredKeys.some((r) => r.includes(k) || k.includes(r));
  };

  // which have a guide whose surname appears in the title
  const surnames = figures
    .map((f) => f.name.split(" ").pop()!.toLowerCase())
    .filter((s) => s.length > 3);
  const hasGuide = (t: string) => surnames.some((s) => norm(t).includes(s));

  const extracted = catalog.filter((b) => b.status === "extracted");
  const scanned = catalog.filter((b) => b.status === "scanned");
  const totalWords = extracted.reduce((n, b) => n + b.words, 0);

  const shelves = [...new Set(catalog.map((b) => b.shelf))].sort(
    (a, b) =>
      catalog.filter((x) => x.shelf === b).length -
      catalog.filter((x) => x.shelf === a).length
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
            {catalog.length} books, and what has been made of them.
          </h1>
          <p className="text-warm-500 text-base leading-relaxed max-w-2xl">
            This is the index, not the contents. Extracted text stays local,
            because it is the book in another format. What is worth publishing
            is the shape of the collection: what is here, what is machine
            readable, and which ones have become a guide, a skill, or a series.
          </p>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-warm-200 border border-warm-200 rounded-xl overflow-hidden mb-10">
          {[
            { n: catalog.length, l: "books" },
            { n: extracted.length, l: "machine readable" },
            {
              n: (totalWords / 1_000_000).toFixed(1) + "M",
              l: "words extracted",
            },
            { n: registered.length, l: "registered as sources" },
          ].map((s) => (
            <div key={s.l} className="bg-white px-4 py-4">
              <div className="font-serif text-2xl tabular-nums">{s.n}</div>
              <div className="text-warm-500 text-[11px] mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {scanned.length > 0 && (
          <p className="text-warm-500 text-sm mb-10 border border-warm-200 rounded-xl px-4 py-3 bg-white">
            {scanned.length} are scanned images rather than text, so they carry
            no words to read. They need OCR before anything can be built from
            them.
          </p>
        )}

        {catalog.length === 0 ? (
          <p className="text-warm-500">
            No catalog yet. Run{" "}
            <code className="font-mono text-sm">
              node scripts/ingest-shelf.mjs
            </code>
            .
          </p>
        ) : (
          <div className="space-y-10">
            {shelves.map((shelf) => {
              const rows = catalog
                .filter((b) => b.shelf === shelf)
                .sort((a, b) => b.words - a.words);
              return (
                <section key={shelf}>
                  <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-warm-200">
                    <h2 className="font-serif text-xl md:text-2xl">{shelf}</h2>
                    <span className="text-warm-400 text-xs ml-auto tabular-nums">
                      {rows.length}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {rows.map((b) => {
                      const reg = isRegistered(b.title);
                      const guide = !reg && hasGuide(b.title);
                      return (
                        <div
                          key={b.slug}
                          className="grid grid-cols-[1fr_auto] gap-3 items-baseline py-1.5 border-b border-warm-100"
                        >
                          <span className="min-w-0">
                            <span className="text-[15px] leading-snug">
                              {b.title}
                            </span>
                            {reg && (
                              <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.12em] text-ink-950 border border-warm-300 rounded px-1.5 py-0.5">
                                a source
                              </span>
                            )}
                            {guide && (
                              <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.12em] text-warm-500 border border-warm-200 rounded px-1.5 py-0.5">
                                guide exists
                              </span>
                            )}
                          </span>
                          <span className="text-warm-400 text-xs tabular-nums whitespace-nowrap">
                            {b.status === "extracted"
                              ? Math.round(b.words / 1000) + "k words"
                              : b.status === "scanned"
                                ? "scanned"
                                : b.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
