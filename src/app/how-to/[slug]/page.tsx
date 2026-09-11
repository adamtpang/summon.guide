import { howToArticles, getHowTo } from "@/lib/howTo";
import { getFigure } from "@/lib/figures";
import { getBook } from "@/lib/books";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return howToArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getHowTo(slug);
  if (!article) return { title: "Not found | summon.guide" };

  return {
    title: `${article.title} | summon.guide`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://summon.guide/how-to/${article.slug}`,
      type: "article",
    },
    alternates: { canonical: `https://summon.guide/how-to/${article.slug}` },
  };
}

export default async function HowToPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getHowTo(slug);
  if (!article) notFound();

  const figure = getFigure(article.guideSlug);
  const sources = article.sourceSlugs.map((s) => getBook(s)).filter(Boolean);

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="max-w-2xl mx-auto px-6 pt-8 md:pt-12 pb-20">
        <header className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="text-warm-400 text-xs tracking-[0.3em] uppercase hover:text-ink-950 transition-colors"
          >
            summon.guide
          </Link>
          <Link
            href="/how-to"
            className="text-warm-500 text-xs hover:text-ink-950 transition-colors"
          >
            All guides
          </Link>
        </header>

        <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-4">
          {article.maslowLevel.replace(/-/g, " ")}
        </p>
        <h1 className="text-3xl md:text-5xl font-serif font-medium leading-[1.1] tracking-tight mb-5">
          {article.title}
        </h1>
        {article.problem && (
          <p className="text-warm-500 text-lg leading-relaxed mb-10">
            {article.problem}
          </p>
        )}

        <article
          className="how-to-body text-[17px] leading-[1.75]"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {figure && (
          <aside className="mt-12 pt-8 border-t border-warm-200">
            <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-3">
              Summon the guide
            </p>
            <h2 className="font-serif text-2xl mb-2">{figure.name}</h2>
            <p className="text-warm-500 text-sm leading-relaxed mb-5">
              {article.guideReason || figure.knownFor}
            </p>
            <Link
              href={`/${figure.slug}`}
              className="inline-flex items-center justify-center bg-ink-950 text-warm-50 rounded-full px-6 py-3 text-sm font-medium hover:bg-ink-800 transition-colors min-h-[48px]"
            >
              Chat with {figure.name}
            </Link>
          </aside>
        )}

        {sources.length > 0 && (
          <section className="mt-10 pt-6 border-t border-warm-200">
            <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-3">
              Grounded in
            </p>
            <ul className="space-y-1.5">
              {sources.map((b) => (
                <li key={b!.slug}>
                  <Link
                    href={`/${b!.slug}`}
                    className="text-[15px] text-ink-950 hover:text-gold-600 transition-colors"
                  >
                    {b!.title}
                  </Link>
                  <span className="text-warm-400 text-sm"> by {b!.author}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
