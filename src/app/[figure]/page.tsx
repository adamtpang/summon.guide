import { figures, getFigure } from "@/lib/figures";
import { getProfile } from "@/lib/profiles";
import { getSkillsForFigure, skillGithubUrl } from "@/lib/skills";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  const description = `${figure.knownFor}. Read the life of ${figure.name} (${figure.era}) and summon them as your personal mentor.`;

  return {
    title: `${figure.name} | summon.guide`,
    description,
    openGraph: {
      title: `${figure.name} — summon.guide`,
      description,
      url: `https://summon.guide/${figure.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${figure.name} — summon.guide`,
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
            href="/"
            className="text-warm-500 text-xs hover:text-ink-950 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All guides
          </Link>
        </header>

        {/* Hero: portrait + identity */}
        <section className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-warm-200 max-w-[280px] mx-auto md:mx-0 w-full">
            <Image
              src={figure.portrait}
              alt={figure.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 280px, 280px"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-3">
              {figure.era}
              {figure.location ? ` · ${figure.location}` : ""}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.05] tracking-tight mb-5">
              {figure.name}
            </h1>
            <p className="text-warm-500 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
              {profile.occupation}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/chat/${figure.slug}`}
                className="inline-flex items-center gap-2 bg-ink-950 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-ink-800 active:scale-[0.98] transition-all"
              >
                Summon {figure.name.split(" ")[0]}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={profile.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-warm-200 text-ink-950 rounded-full px-5 py-3 text-sm font-medium hover:border-ink-950 transition-all"
              >
                Wikipedia
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Body: main column + infobox */}
        <div className="grid md:grid-cols-[1fr_280px] gap-10 md:gap-14">
          {/* Main column */}
          <div className="space-y-12 order-2 md:order-1">
            {/* Bio */}
            <section>
              <SectionTitle>Life</SectionTitle>
              <div className="space-y-5 text-ink-950/85 text-base leading-[1.75]">
                {profile.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Accomplishments */}
            <section>
              <SectionTitle>Notable accomplishments</SectionTitle>
              <ul className="space-y-3">
                {figure.accomplishments.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-ink-950/85 text-base leading-relaxed"
                  >
                    <span
                      className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: figure.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Quotes */}
            <section>
              <SectionTitle>Notable quotes</SectionTitle>
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
            </section>

            {/* Claude Code skills */}
            {figureSkills.length > 0 && (
              <section>
                <SectionTitle>Claude Code skills</SectionTitle>
                <p className="text-warm-500 text-sm mb-5 leading-relaxed">
                  Frameworks from {figure.name.split(" ")[0]}&rsquo;s life,
                  packaged as Claude Code skills. Install once, then invoke any
                  of these slash commands when you&rsquo;re working through a
                  decision they would have something to say about.
                </p>
                <div className="space-y-3 mb-5">
                  {figureSkills.map((skill) => (
                    <a
                      key={skill.slug}
                      href={skillGithubUrl(skill.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white border border-warm-200 rounded-xl p-5 hover:border-ink-950 transition-colors group"
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
                        From {skill.source}
                        {skill.sourceAnchor ? `, ${skill.sourceAnchor}` : ""}
                      </p>
                    </a>
                  ))}
                </div>
                <details className="bg-ink-950 text-white rounded-xl p-5">
                  <summary className="cursor-pointer text-sm font-medium flex items-center gap-2 list-none">
                    <svg
                      className="w-3 h-3 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    Install all of {figure.name.split(" ")[0]}&rsquo;s skills in
                    Claude Code
                  </summary>
                  <pre className="mt-4 text-xs font-mono bg-black/30 rounded-lg p-4 overflow-x-auto leading-relaxed">
                    <code>{`/plugin marketplace add adamtpang/summon.guide
/plugin install summon-guide`}</code>
                  </pre>
                  <p className="text-white/60 text-xs mt-3 leading-relaxed">
                    Installs all 13 skills across every guide. Then run any
                    slash command above. Source on{" "}
                    <a
                      href="https://github.com/adamtpang/summon.guide/tree/main/skills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </details>
              </section>
            )}

            {/* Primary sources */}
            <section>
              <SectionTitle>Sources</SectionTitle>
              <p className="text-warm-500 text-sm mb-3">
                Their voice on summon.guide is grounded in:
              </p>
              <ul className="space-y-2">
                {profile.primarySources.map((src, i) => (
                  <li
                    key={i}
                    className="text-ink-950/85 text-base font-serif italic"
                  >
                    {src}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Infobox sidebar */}
          <aside className="order-1 md:order-2">
            <div className="bg-white border border-warm-200 rounded-2xl p-6 md:sticky md:top-8">
              <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase mb-4">
                Quick facts
              </p>
              <dl className="space-y-4 text-sm">
                <InfoRow label="Era" value={figure.era} />
                {figure.location && (
                  <InfoRow label="Based in" value={figure.location} />
                )}
                {profile.birthplace && (
                  <InfoRow label="Born in" value={profile.birthplace} />
                )}
                <InfoRow label="Known for" value={figure.knownFor} />
                {figure.stats.map((stat) => (
                  <InfoRow key={stat.label} label={stat.label} value={stat.value} />
                ))}
              </dl>
            </div>
          </aside>
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
                  <Image
                    src={other.portrait}
                    alt={other.name}
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
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

        {/* Final CTA */}
        <section className="mt-16 text-center">
          <Link
            href={`/chat/${figure.slug}`}
            className="inline-flex items-center gap-2 bg-ink-950 text-white rounded-full px-7 py-4 text-base font-medium hover:bg-ink-800 active:scale-[0.98] transition-all"
          >
            Summon {figure.name.split(" ")[0]} now
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        <footer className="mt-20 text-warm-400 text-xs text-center">
          Grounded in real biographies and primary sources.
        </footer>
      </div>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-warm-500 text-xs tracking-[0.25em] uppercase mb-5 font-medium">
      {children}
    </h2>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-warm-500 text-[11px] tracking-wider uppercase mb-1">
        {label}
      </dt>
      <dd className="text-ink-950 leading-snug">{value}</dd>
    </div>
  );
}
