import { howToArticles } from "@/lib/howTo";
import { getFigure } from "@/lib/figures";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to | summon.guide",
  description:
    "Step-by-step guides to common life problems, grounded in real books and transcripts, each routing to the guide best suited to walk you through it.",
  alternates: { canonical: "https://summon.guide/how-to" },
};

// Maslow's extended eight-stage model, in order. Articles group under the
// level they actually address; levels with no article yet simply do not render.
const LEVELS: { key: string; label: string }[] = [
  { key: "physiological", label: "Physiological" },
  { key: "safety", label: "Safety" },
  { key: "love-belonging", label: "Love and belonging" },
  { key: "esteem", label: "Esteem" },
  { key: "cognitive", label: "Cognitive" },
  { key: "aesthetic", label: "Aesthetic" },
  { key: "self-actualization", label: "Self-actualization" },
  { key: "transcendence", label: "Transcendence" },
];

export default function HowToIndexPage() {
  const byLevel = LEVELS.map((l) => ({
    ...l,
    articles: howToArticles.filter((a) => a.maslowLevel === l.key),
  })).filter((l) => l.articles.length > 0);

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="max-w-3xl mx-auto px-6 pt-8 md:pt-12 pb-20">
        <header className="flex items-center justify-between mb-10 md:mb-14">
          <Link
            href="/"
            className="text-warm-400 text-xs tracking-[0.3em] uppercase hover:text-ink-950 transition-colors"
          >
            summon.guide
          </Link>
        </header>

        <section className="mb-12">
          <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-4">
            How to
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium leading-[1.05] tracking-tight mb-5">
            Start with the problem, not the person.
          </h1>
          <p className="text-warm-500 text-base leading-relaxed max-w-2xl">
            Each guide answers one real problem using what the books and
            transcripts actually say, with citations, then hands you to the
            guide best placed to argue it through with you.
          </p>
        </section>

        {byLevel.map((level) => (
          <section key={level.key} className="mb-10">
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-warm-200">
              <h2 className="font-serif text-xl">{level.label}</h2>
            </div>
            <ul className="space-y-5">
              {level.articles.map((a) => {
                const figure = getFigure(a.guideSlug);
                return (
                  <li key={a.slug}>
                    <Link
                      href={`/how-to/${a.slug}`}
                      className="text-[17px] leading-snug hover:text-gold-600 transition-colors"
                    >
                      {a.title}
                    </Link>
                    {a.problem && (
                      <p className="text-warm-500 text-sm leading-relaxed mt-1">
                        {a.problem}
                      </p>
                    )}
                    {figure && (
                      <p className="text-warm-400 text-xs mt-1">
                        Routes to {figure.name}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {byLevel.length === 0 && (
          <p className="text-warm-500">No guides published yet.</p>
        )}
      </div>
    </main>
  );
}
