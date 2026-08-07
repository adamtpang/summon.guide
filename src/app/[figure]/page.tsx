import { figures, getFigure } from "@/lib/figures";
import { getProfile, type Profile } from "@/lib/profiles";
import { getSkillsForFigure, skillGithubUrl, pluginInstallCommands } from "@/lib/skills";
import { getBooksForFigure, type Book } from "@/lib/books";
import CopyableInstall from "@/components/CopyableInstall";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AiPersonaNotice from "@/components/AiPersonaNotice";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return figures.map((f) => ({ figure: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ figure: string }>;
}): Promise<Metadata> {
  const { figure: figureSlug } = await params;
  const figure = getFigure(figureSlug);
  const profile = getProfile(figureSlug);

  if (!figure || !profile) {
    return { title: "Guide Not Found | summon.guide" };
  }

  const ogImageUrl = `https://summon.guide/api/og/${figure.slug}`;
  const description = `${figure.knownFor}. Read the life of ${figure.name} (${figure.era}) and summon them as your personal mentor, with deeply researched Claude Code skills derived from their primary biographies.`;

  return {
    title: `${figure.name} | summon.guide`,
    description,
    openGraph: {
      title: `${figure.name}: summon.guide`,
      description,
      url: `https://summon.guide/${figure.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${figure.name}: summon.guide`,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `https://summon.guide/${figure.slug}`,
    },
  };
}

export default async function FigureProfile({
  params,
}: {
  params: Promise<{ figure: string }>;
}) {
  const { figure: figureSlug } = await params;
  const figure = getFigure(figureSlug);
  const profile = getProfile(figureSlug);

  if (!figure || !profile) {
    notFound();
  }

  const otherFigures = figures.filter((f) => f.slug !== figure.slug).slice(0, 6);
  const allQuotes = [figure.signatureQuote, ...profile.notableQuotes].filter(
    (q, i, arr) => arr.indexOf(q) === i
  );
  const figureSkills = getSkillsForFigure(figure.slug);
  const figureBooks = getBooksForFigure(figure.slug);

  // Pre-build the Wikipedia infobox rows from profile fields
  const infobox = buildInfoboxRows(profile, figure);

  // Per-guide install commands, each guide is its own plugin on the
  // adamtpang/summon.guide marketplace, so users can pick exactly who
  // to summon into their Claude chats.
  const installCommands = pluginInstallCommands(figure.slug);

  // Sections that show up in the Table of Contents
  const tocSections = [
    { id: "early-life", label: "Early life and education" },
    { id: "career", label: "Career" },
    profile.legacy ? { id: "legacy", label: "Legacy and death" } : null,
    figureSkills.length > 0
      ? { id: "skills", label: "Claude Code skills" }
      : null,
    figureBooks.length > 0 ? { id: "books", label: "Books" } : null,
    { id: "quotes", label: "Notable quotes" },
    { id: "references", label: "References" },
  ].filter((s): s is { id: string; label: string } => s !== null);

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="max-w-5xl mx-auto px-6 pt-8 md:pt-12 pb-20">
        {/* Brand bar */}
        <header className="flex items-center justify-between mb-8 md:mb-10">
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

        {/* Title block + Wikipedia-style infobox */}
        <article className="grid md:grid-cols-[1fr_320px] gap-8 md:gap-10 mb-10 md:mb-14">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.05] tracking-tight mb-4">
              {figure.name}
            </h1>
            <p className="text-warm-500 text-base md:text-lg leading-relaxed mb-5 max-w-2xl">
              {profile.occupation}.
            </p>
            <p className="text-warm-400 text-xs tracking-[0.2em] uppercase mb-6">
              {figure.era}
              {figure.location ? ` · ${figure.location}` : ""}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href={`/chat/${figure.slug}`}
                className="inline-flex items-center gap-2 bg-ink-950 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-ink-800 active:scale-[0.98] transition-all"
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
              {/* Only when an article exists. TypeScript accepts href={undefined}
                  on an anchor, so this needed a guard rather than a type fix. */}
              {profile.wikipediaUrl && (
                <a
                  href={profile.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-warm-200 text-ink-950 rounded-full px-5 py-3 text-sm font-medium hover:border-ink-950 transition-all"
                >
                  Wikipedia
                  <ExternalIcon />
                </a>
              )}
            </div>
            <div className="mb-8">
              <AiPersonaNotice slug={figure.slug} name={figure.name} />
            </div>

            {/* Per-guide install, the headline copy-paste block */}
            <CopyableInstall
              commands={installCommands}
              label={`Install ${figure.name.split(" ")[0]}'s frameworks in Claude Code`}
              footnote={
                <>
                  Installs {figureSkills.length} skill
                  {figureSkills.length === 1 ? "" : "s"} from{" "}
                  {figure.name.split(" ")[0]}, plus the rest of summon.guide.
                  Source on{" "}
                  <a
                    href="https://github.com/adamtpang/summon.guide/tree/main/skills"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    GitHub
                  </a>
                  .
                </>
              }
            />
          </div>

          {/* Wikipedia-style infobox */}
          <aside>
            <div className="bg-white border border-warm-200 rounded-2xl overflow-hidden md:sticky md:top-6">
              <div className="relative aspect-[3/4] bg-warm-200">
                {!figure.portrait && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${figure.gradient}`}
                  />
                )}
                {figure.portrait && (
                  <Image
                    src={figure.portrait}
                    alt={figure.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                )}
              </div>
              <div className="p-4 border-b border-warm-200">
                <p className="text-ink-950 font-serif font-medium text-base text-center leading-snug">
                  {profile.fullName ?? figure.name}
                </p>
                {figure.knownFor ? (
                  <p className="text-warm-500 text-xs text-center mt-1.5 leading-snug italic">
                    {figure.knownFor}
                  </p>
                ) : null}
              </div>
              <table className="w-full text-[13px]">
                <tbody>
                  {infobox.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-warm-100 last:border-b-0"
                    >
                      <th className="text-left align-top text-warm-500 text-[11px] tracking-wider uppercase font-medium px-4 py-3 w-[42%]">
                        {row.label}
                      </th>
                      <td className="align-top text-ink-950 px-4 py-3 leading-snug">
                        {row.values.length === 1 ? (
                          row.values[0]
                        ) : (
                          <ul className="space-y-0.5">
                            {row.values.map((v, j) => (
                              <li key={j}>{v}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </article>

        {/* Table of contents, Wikipedia mini-TOC */}
        <nav
          aria-label="Contents"
          className="bg-white border border-warm-200 rounded-xl p-5 mb-10 md:mb-14 max-w-md"
        >
          <p className="text-warm-500 text-[11px] tracking-[0.2em] uppercase mb-3">
            Contents
          </p>
          <ol className="space-y-1.5 text-sm">
            {tocSections.map((s, i) => (
              <li key={s.id} className="flex gap-2">
                <span className="text-warm-400 font-mono text-[11px] mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`#${s.id}`}
                  className="text-ink-950 hover:underline underline-offset-2"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Body */}
        <div className="max-w-3xl space-y-12 md:space-y-14">
          <Section id="early-life" title="Early life and education">
            <BodyParagraph>{profile.earlyLife}</BodyParagraph>
          </Section>

          <Section id="career" title="Career">
            <BodyParagraph>{profile.career}</BodyParagraph>
          </Section>

          {profile.legacy ? (
            <Section id="legacy" title="Legacy and death">
              <BodyParagraph>{profile.legacy}</BodyParagraph>
            </Section>
          ) : null}

          {figureSkills.length > 0 ? (
            <Section id="skills" title="Claude Code skills">
              <p className="text-ink-950/85 text-base leading-[1.75] mb-6">
                Frameworks distilled from {figure.name.split(" ")[0]}&rsquo;s
                life, packaged as Claude Code skills. Each skill is invoked
                with a slash command and grounded in the primary biographies
                listed under References.
              </p>
              <div className="space-y-3 mb-6">
                {figureSkills.map((skill) => (
                  <a
                    key={skill.slug}
                    href={skillGithubUrl(skill.figureSlug, skill.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white border border-warm-200 rounded-xl p-5 hover:border-ink-950 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-ink-950 font-medium text-base md:text-lg">
                        {skill.title}
                      </h3>
                      <code
                        className="text-[11px] font-mono px-2 py-1 rounded-md flex-shrink-0"
                        style={{
                          backgroundColor: `${figure.color}1A`,
                          color: figure.color,
                        }}
                      >
                        {skill.command}
                      </code>
                    </div>
                    <p className="text-warm-500 text-sm leading-relaxed mb-2">
                      {skill.tagline}
                    </p>
                    <p className="text-warm-400 text-xs italic">
                      Source: {skill.source}
                      {skill.sourceAnchor ? `, ${skill.sourceAnchor}` : ""}
                    </p>
                  </a>
                ))}
              </div>
              <CopyableInstall
                commands={installCommands}
                variant="soft"
                label="Install in Claude Code"
                footnote={
                  <>
                    Bring {figure.name.split(" ")[0]}&rsquo;s frameworks into
                    your terminal. One install registers every guide&rsquo;s
                    skills.
                  </>
                }
              />
            </Section>
          ) : null}

          {figureBooks.length > 0 ? (
            <Section id="books" title="Books">
              <p className="text-ink-950/85 text-base leading-[1.75] mb-6">
                Each Claude Code skill above is grounded in a specific passage
                of a specific book. These are the primary sources we drew from
                for {figure.name.split(" ")[0]}.
              </p>
              <div className="space-y-3">
                {figureBooks.map((book) => (
                  <BookCard
                    key={book.slug}
                    book={book}
                    accentColor={figure.color}
                  />
                ))}
              </div>
            </Section>
          ) : null}

          <Section id="quotes" title="Notable quotes">
            <div className="space-y-5">
              {allQuotes.map((quote, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 pl-5 py-1 text-ink-950/85 text-base md:text-lg font-serif italic leading-relaxed"
                  style={{ borderColor: figure.color }}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ))}
            </div>
          </Section>

          <Section id="references" title="References">
            <p className="text-warm-500 text-sm mb-3">
              Their voice on summon.guide is grounded in:
            </p>
            <ul className="space-y-2 mb-6">
              {profile.primarySources.map((src, i) => (
                <li
                  key={i}
                  className="text-ink-950/85 text-base font-serif italic"
                >
                  {src}
                </li>
              ))}
            </ul>
            {profile.wikipediaUrl && (
              <p className="text-warm-500 text-sm">
                Further reading:{" "}
                <a
                  href={profile.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-950 underline hover:no-underline"
                >
                  {profile.wikipediaUrl.replace("https://", "")}
                </a>
              </p>
            )}
          </Section>
        </div>

        {/* Other guides */}
        <section className="mt-20 md:mt-28 pt-12 border-t border-warm-200">
          <p className="text-warm-400 text-xs tracking-[0.2em] uppercase mb-6">
            Other guides
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {otherFigures.map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="group flex items-center gap-3 bg-white border border-warm-200 rounded-xl p-3 hover:border-ink-950 transition-colors"
              >
                <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-warm-200">
                  {other.portrait ? (
                    <Image
                      src={other.portrait}
                      alt={other.name}
                      fill
                      className="object-cover object-top"
                      sizes="48px"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${other.gradient}`}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-ink-950 text-sm font-medium truncate">
                    {other.name}
                  </p>
                  <p className="text-warm-500 text-xs truncate">{other.era}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-20 text-warm-400 text-xs text-center">
          Grounded in real biographies and primary sources.
        </footer>
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

function ExternalIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function BookCard({ book, accentColor }: { book: Book; accentColor: string }) {
  // Translate the book's relationship into a tiny human-readable badge.
  const roleLabel =
    book.role === "by"
      ? "By them"
      : book.role === "compiled"
      ? "Compiled from their words"
      : "About them";

  const skillsCount = book.skillSlugs?.length ?? 0;
  const isPending = book.status === "pending";

  const cardInner = (
    <>
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h3 className="text-ink-950 font-medium text-base md:text-lg leading-snug">
          {book.title}
        </h3>
        <span
          className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded flex-shrink-0 mt-1"
          style={{
            backgroundColor: `${accentColor}1A`,
            color: accentColor,
          }}
        >
          {roleLabel}
        </span>
      </div>
      <p className="text-warm-500 text-sm mb-2">
        {book.author} &middot; {book.year}
      </p>
      {book.description ? (
        <p className="text-ink-950/85 text-sm leading-relaxed mb-3">
          {book.description}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-warm-500">
          {isPending
            ? "Skills pending, drop the PDF in /sources to ingest"
            : `${skillsCount} skill${skillsCount === 1 ? "" : "s"} derived`}
        </span>
        {book.amazonUrl ? (
          <span className="text-ink-950 inline-flex items-center gap-1 group-hover:underline">
            {book.role === "channel" ? "Listen" : "View on Amazon"}
            <ExternalIcon />
          </span>
        ) : null}
      </div>
    </>
  );

  if (book.amazonUrl) {
    return (
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white border border-warm-200 rounded-xl p-5 hover:border-ink-950 transition-colors group"
      >
        {cardInner}
      </a>
    );
  }
  return (
    <div className="block bg-white border border-warm-200 rounded-xl p-5">
      {cardInner}
    </div>
  );
}

interface FigureLite {
  era: string;
  knownFor: string;
  location: string;
  stats: { label: string; value: string }[];
}

function buildInfoboxRows(
  profile: Profile,
  figure: FigureLite
): Array<{ label: string; values: string[] }> {
  const rows: Array<{ label: string; values: string[] }> = [];

  if (profile.birthDate || profile.birthPlace) {
    const value =
      [profile.birthDate, profile.birthPlace].filter(Boolean).join(" · ") ||
      "Unknown";
    rows.push({ label: "Born", values: [value] });
  }
  if (profile.deathDate || profile.deathPlace) {
    const value =
      [profile.deathDate, profile.deathPlace].filter(Boolean).join(" · ") ||
      ": ";
    rows.push({ label: "Died", values: [value] });
  }
  if (profile.nationality) {
    rows.push({ label: "Nationality", values: [profile.nationality] });
  }
  if (profile.education && profile.education.length > 0) {
    rows.push({ label: "Education", values: profile.education });
  }
  if (profile.occupations && profile.occupations.length > 0) {
    rows.push({ label: "Occupation", values: profile.occupations });
  }
  if (profile.yearsActive) {
    rows.push({ label: "Years active", values: [profile.yearsActive] });
  }
  if (profile.notableWorks && profile.notableWorks.length > 0) {
    rows.push({ label: "Notable works", values: profile.notableWorks });
  }
  if (profile.spouses && profile.spouses.length > 0) {
    rows.push({
      label: profile.spouses.length === 1 ? "Spouse" : "Spouses",
      values: profile.spouses,
    });
  }
  if (profile.children) {
    rows.push({ label: "Children", values: [profile.children] });
  }
  if (profile.parents && profile.parents.length > 0) {
    rows.push({ label: "Parents", values: profile.parents });
  }
  if (profile.netWorth) {
    rows.push({ label: "Peak net worth", values: [profile.netWorth] });
  }
  if (profile.awards && profile.awards.length > 0) {
    rows.push({ label: "Awards", values: profile.awards });
  }

  // Figure stats fall in last for any guide-specific scoreboard items
  // not already covered (skip the obvious ones).
  for (const s of figure.stats) {
    const lower = s.label.toLowerCase();
    if (lower.includes("net worth") || lower.includes("born") || lower.includes("died")) {
      continue;
    }
    rows.push({ label: s.label, values: [s.value] });
  }

  if (rows.length === 0) {
    rows.push({ label: "Era", values: [figure.era] });
    rows.push({ label: "Known for", values: [figure.knownFor] });
  }

  return rows;
}
