import { books, getBook } from "@/lib/books";
import { getBookProfile } from "@/lib/bookProfiles";
import { getSeriesForBook, formatRuntime } from "@/lib/episodes";
import { getFigure } from "@/lib/figures";
import { getSkill, skillGithubUrl } from "@/lib/skills";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Book Not Found | summon.guide" };

  const profile = getBookProfile(slug);
  const title = profile?.fullTitle || book.title;
  const description =
    book.description ||
    `${title} by ${book.author} (${book.year}), a primary source in the summon.guide library.`;

  return {
    title: `${book.title} | summon.guide`,
    description,
    openGraph: {
      title: `${title}: summon.guide`,
      description,
      url: `https://summon.guide/books/${book.slug}`,
      type: "book",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}: summon.guide`,
      description,
    },
    alternates: { canonical: `https://summon.guide/books/${book.slug}` },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  // A book without a written profile still gets a real page, rendered from its
  // catalog record. That keeps every book linkable while the prose lands one at
  // a time.
  const profile = getBookProfile(slug);
  const figure = getFigure(book.figureSlug);

  // the watchable series for this book, when one has been produced
  const bookSeries = getSeriesForBook(book.slug);

  const derivedSkills = (book.skillSlugs || [])
    .map((s) => getSkill(book.figureSlug, s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const roleLabel =
    book.role === "by"
      ? `Written by ${book.author}`
      : book.role === "about"
        ? `Biography by ${book.author}`
        : `Compiled by ${book.author}`;

  const statusLabel = {
    complete: "Fully ingested",
    partial: "Partially ingested",
    pending: "Not yet ingested",
  }[book.status];

  const otherBooks = books
    .filter((b) => b.slug !== book.slug && b.figureSlug === book.figureSlug)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="max-w-5xl mx-auto px-6 pt-8 md:pt-12 pb-20">
        {/* Brand bar */}
        <header className="flex items-center justify-between mb-10 md:mb-14">
          <Link
            href="/"
            className="text-warm-400 text-xs tracking-[0.3em] uppercase hover:text-ink-950 transition-colors"
          >
            summon.guide
          </Link>
          <Link
            href="/books"
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
            All books
          </Link>
        </header>

        <article className="grid md:grid-cols-[1fr_300px] gap-8 md:gap-12">
          {/* ───── Main column ───── */}
          <div className="min-w-0">
            <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-4">
              Primary source
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-medium leading-[1.06] tracking-tight mb-4">
              {book.title}
            </h1>
            {profile?.fullTitle && profile.fullTitle !== book.title && (
              <p className="text-warm-500 font-serif italic text-lg md:text-xl leading-snug mb-5">
                {profile.fullTitle}
              </p>
            )}
            <p className="text-warm-500 text-sm md:text-base mb-7">
              {roleLabel} · {book.year}
              {figure && (
                <>
                  {" · grounds "}
                  <Link
                    href={`/${figure.slug}`}
                    className="text-ink-950 underline decoration-warm-300 hover:decoration-ink-950"
                  >
                    {figure.name}
                  </Link>
                </>
              )}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {figure && (
                <Link
                  href={`/chat/${figure.slug}`}
                  className="inline-flex items-center gap-2 bg-ink-950 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-ink-800 active:scale-[0.98] transition-all"
                >
                  Summon {figure.name.split(" ")[0]}
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
              {book.amazonUrl && (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-warm-300 rounded-full px-5 py-2.5 text-sm hover:border-ink-950 transition-colors"
                >
                  {book.role === "channel" ? "Listen" : "Read the book"}
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              )}
            </div>

            <div className="space-y-12">
              {/* Overview: rich prose if we have it, catalog description if not */}
              <Section id="overview" title="Overview">
                {profile ? (
                  <div className="space-y-5">
                    {profile.overview.split("\n\n").map((p, i) => (
                      <BodyParagraph key={i}>{p}</BodyParagraph>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <BodyParagraph>
                      {book.description ||
                        `${book.title} by ${book.author}, published ${book.year}.`}
                    </BodyParagraph>
                    <p className="text-warm-400 text-sm italic">
                      A full write-up of this book has not been published yet.
                    </p>
                  </div>
                )}
              </Section>

              {profile && profile.keyIdeas.length > 0 && (
                <Section id="key-ideas" title="Key ideas">
                  <div className="space-y-8">
                    {profile.keyIdeas.map((idea, i) => (
                      <div key={idea.title}>
                        <h3 className="font-serif text-lg md:text-xl text-ink-950 mb-2 flex items-baseline gap-3">
                          {/* decorative counter: the visual order already conveys
                              this, and unhidden it reads as "01Good explanations" */}
                          <span
                            aria-hidden="true"
                            className="text-warm-300 text-sm font-sans tabular-nums"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {idea.title}
                        </h3>
                        <BodyParagraph>{idea.body}</BodyParagraph>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {bookSeries && bookSeries.episodes.length > 0 && (
                <Section id="watch" title="Watch the series">
                  <p className="text-warm-500 text-sm mb-5">
                    {bookSeries.episodes.length} episodes drawn from this book,
                    about {formatRuntime(bookSeries.totalSeconds)} in total. Each
                    one opens on the problem rather than on the summary.
                  </p>
                  <ol className="space-y-2">
                    {bookSeries.episodes.map((ep, i) => (
                      <li key={ep.slug}>
                        <Link
                          href={`/watch/${bookSeries.guideSlug}/${ep.slug}`}
                          className="group grid grid-cols-[26px_1fr_auto] gap-3 items-baseline border border-warm-200 hover:border-ink-950 rounded-xl px-4 py-3 bg-white transition-colors"
                        >
                          <span className="font-mono text-[11px] text-warm-400 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-serif text-base leading-snug">
                              {ep.title}
                            </span>
                            {ep.hook && (
                              <span className="block text-warm-500 text-sm mt-0.5 line-clamp-1">
                                {ep.hook}
                              </span>
                            )}
                          </span>
                          <span className="text-warm-400 text-xs tabular-nums">
                            {formatRuntime(ep.seconds)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {derivedSkills.length > 0 && (
                <Section id="skills" title="Skills drawn from this book">
                  <p className="text-warm-500 text-sm mb-5">
                    Installable Claude Code skills grounded in this text. Each one
                    teaches a framework the book actually argues for.
                  </p>
                  <div className="space-y-3">
                    {derivedSkills.map((skill) => (
                      <a
                        key={skill.slug}
                        href={skillGithubUrl(skill.figureSlug, skill.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block border border-warm-200 hover:border-ink-950 rounded-xl p-4 bg-white transition-colors"
                      >
                        <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
                          <code className="font-mono text-[13px] text-ink-950">
                            {skill.command}
                          </code>
                          <span className="font-serif text-base">
                            {skill.title}
                          </span>
                        </div>
                        <p className="text-warm-500 text-sm leading-relaxed">
                          {skill.tagline}
                        </p>
                      </a>
                    ))}
                  </div>
                </Section>
              )}

              {profile?.notableQuotes && profile.notableQuotes.length > 0 && (
                <Section id="quotes" title="Notable passages">
                  <div className="space-y-4">
                    {profile.notableQuotes.map((q) => (
                      <blockquote
                        key={q}
                        className="border-l-2 border-warm-300 pl-5 font-serif text-lg md:text-xl italic leading-snug text-ink-950/90"
                      >
                        &ldquo;{q}&rdquo;
                      </blockquote>
                    ))}
                    <p className="text-warm-400 text-xs">
                      {book.author}, <em>{book.title}</em>
                    </p>
                  </div>
                </Section>
              )}

              {profile?.reception && (
                <Section id="reception" title="Reception">
                  <BodyParagraph>{profile.reception}</BodyParagraph>
                </Section>
              )}

              {profile?.legacy && (
                <Section id="legacy" title="Legacy">
                  <BodyParagraph>{profile.legacy}</BodyParagraph>
                </Section>
              )}

              {profile?.whyItMatters && (
                <Section id="why" title="Why it is in this library">
                  <BodyParagraph>{profile.whyItMatters}</BodyParagraph>
                </Section>
              )}

              {otherBooks.length > 0 && figure && (
                <Section id="more" title={`More from ${figure.name}`}>
                  <div className="space-y-2">
                    {otherBooks.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/books/${b.slug}`}
                        className="group flex items-baseline gap-3 py-2 border-b border-warm-200 hover:border-ink-950 transition-colors"
                      >
                        <span className="font-serif text-base italic group-hover:text-ink-950">
                          {b.title}
                        </span>
                        <span className="text-warm-400 text-xs ml-auto tabular-nums">
                          {b.year}
                        </span>
                      </Link>
                    ))}
                  </div>
                </Section>
              )}
            </div>
          </div>

          {/* ───── Wikipedia-style infobox ───── */}
          <aside className="md:sticky md:top-8 self-start w-full">
            <div className="border border-warm-200 rounded-xl bg-white overflow-hidden">
              <div className="bg-warm-100 px-4 py-3 border-b border-warm-200">
                <p className="font-serif text-base leading-tight">
                  {book.title}
                </p>
              </div>
              <dl className="divide-y divide-warm-200 text-sm">
                <Row label="Author" value={book.author} />
                {profile?.language && (
                  <Row label="Language" value={profile.language} />
                )}
                {profile?.country && (
                  <Row label="Country" value={profile.country} />
                )}
                {profile?.subjects && (
                  <Row label="Subject" value={profile.subjects.join(", ")} />
                )}
                {profile?.genre && <Row label="Genre" value={profile.genre} />}
                {profile?.publisher && (
                  <Row label="Publisher" value={profile.publisher} />
                )}
                <Row
                  label="Published"
                  value={profile?.publicationDate || String(book.year)}
                />
                {profile?.pages && <Row label="Pages" value={profile.pages} />}
                {profile?.isbn && <Row label="ISBN" value={profile.isbn} />}
                {profile?.precededBy && (
                  <Row label="Preceded by" value={profile.precededBy} />
                )}
                {profile?.followedBy && (
                  <Row label="Followed by" value={profile.followedBy} />
                )}
                {figure && (
                  <div className="px-4 py-2.5 grid grid-cols-[92px_1fr] gap-3">
                    <dt className="text-warm-500 text-xs pt-0.5">Guide</dt>
                    <dd>
                      <Link
                        href={`/${figure.slug}`}
                        className="underline decoration-warm-300 hover:decoration-ink-950"
                      >
                        {figure.name}
                      </Link>
                    </dd>
                  </div>
                )}
                <Row label="In library" value={statusLabel} />
              </dl>
              {profile?.wikipediaUrl && (
                <div className="px-4 py-3 border-t border-warm-200 bg-warm-50">
                  <a
                    href={profile.wikipediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-500 text-xs hover:text-ink-950 inline-flex items-center gap-1.5 transition-colors"
                  >
                    Wikipedia article
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-ink-950 mb-5 pb-2 border-b border-warm-200">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BodyParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink-950/85 text-base md:text-[17px] leading-[1.75]">
      {children}
    </p>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-2.5 grid grid-cols-[92px_1fr] gap-3">
      <dt className="text-warm-500 text-xs pt-0.5">{label}</dt>
      <dd className="text-ink-950">{value}</dd>
    </div>
  );
}
