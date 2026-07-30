import { figures, getFigure } from "@/lib/figures";
import { skills, skillGithubUrl, skillsByTheme, THEMES } from "@/lib/skills";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code Skills | summon.guide",
  description:
    "13 Claude Code skills derived from the lives and books of history's greatest guides. Install once, invoke any framework (Rockefeller's Ledger A, Musk's Five-Step Algorithm, Franklin's 13 Virtues) when you're working through a decision they would have something to say about.",
  alternates: {
    canonical: "https://summon.guide/skills",
  },
  openGraph: {
    title: "Claude Code Skills: summon.guide",
    description:
      "13 frameworks from history's greatest guides, packaged as Claude Code skills.",
    url: "https://summon.guide/skills",
    type: "website",
  },
};

export default function SkillsIndex() {
  // Group skills by figure for the page layout
  const byFigure = figures
    .map((figure) => ({
      figure,
      skills: skills.filter((s) => s.figureSlug === figure.slug),
    }))
    .filter((g) => g.skills.length > 0);

  // People arrive with a problem, not with the name of a framework, so the
  // library is also browsable by what is wrong. Themes with no skills are
  // omitted; within a theme, skills whose PRIMARY theme it is come first.
  const byTheme = skillsByTheme();

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="max-w-4xl mx-auto px-6 pt-8 md:pt-12 pb-20">
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

        {/* Hero */}
        <section className="mb-12 md:mb-16">
          <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-4">
            Claude Code skills
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium leading-[1.05] tracking-tight mb-5">
            {skills.length} frameworks from history&rsquo;s greatest guides.
          </h1>
          <p className="text-warm-500 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Each skill captures one specific framework, principle, or method
            from the source biography or primary text: Rockefeller&rsquo;s
            Ledger A, Musk&rsquo;s Five-Step Algorithm, Franklin&rsquo;s 13
            Virtues, Alexander&rsquo;s decisive point doctrine, and more.
            Install once, then invoke any slash command when you&rsquo;re
            working through a decision they would have something to say about.
          </p>

          {/* Install block */}
          <div className="bg-ink-950 text-white rounded-2xl p-6">
            <p className="text-white/70 text-sm mb-3">
              One marketplace, one plugin per guide. Install only who you want.
            </p>
            <pre className="text-sm font-mono bg-black/30 rounded-lg p-4 overflow-x-auto leading-relaxed">
              <code>{`/plugin marketplace add adamtpang/summon.guide
/plugin install elon              # or franklin, rockefeller, alexander,
                                  #    deutsch, lee-kuan-yew, marcus-aurelius`}</code>
            </pre>
            <p className="text-white/60 text-xs mt-4 leading-relaxed">
              After install, invoke <code className="bg-black/40 px-1.5 py-0.5 rounded">/elon:elon</code>{" "}
              to channel the full mindset, or a specific framework like{" "}
              <code className="bg-black/40 px-1.5 py-0.5 rounded">/elon:first-principles</code>.{" "}
              Source on{" "}
              <a
                href="https://github.com/adamtpang/summon.guide/tree/main/plugins"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                GitHub
              </a>
              . Built in homage to{" "}
              <a
                href="https://github.com/slavingia/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                slavingia/skills
              </a>{" "}
, Sahil did this for one book; we do it for one guide at a time.
            </p>
          </div>
        </section>

        {/* Browse by problem, the entry point for someone who knows what is
            wrong but not who to ask. */}
        <section className="mb-16" id="by-problem">
          <div className="mb-6 pb-4 border-b border-warm-200">
            <h2 className="text-xl md:text-2xl font-serif font-medium text-ink-950 leading-tight">
              Start with the problem
            </h2>
            <p className="text-warm-500 text-sm mt-1.5">
              You arrive with a problem, not with the name of a framework. Pick
              what is wrong and the library narrows to the playbooks that
              answer it.
            </p>
          </div>

          <div className="space-y-8">
            {byTheme.map(({ theme, skills: themeSkills }) => (
              <div key={theme}>
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="font-serif text-lg text-ink-950 capitalize">
                    {theme}
                  </h3>
                  <span className="text-warm-400 text-xs">
                    {THEMES[theme]}
                  </span>
                  <span className="text-warm-300 text-xs ml-auto tabular-nums">
                    {themeSkills.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {themeSkills.map((skill) => {
                    const owner = getFigure(skill.figureSlug);
                    return (
                      <a
                        key={`${skill.figureSlug}:${skill.slug}`}
                        href={skillGithubUrl(skill.figureSlug, skill.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={skill.problemHint || skill.whenToUse}
                        className="group inline-flex items-baseline gap-2 border border-warm-200 hover:border-ink-950 rounded-lg px-3 py-2 bg-white transition-colors"
                      >
                        <span className="font-mono text-[11px] text-warm-500 group-hover:text-ink-950 transition-colors">
                          {skill.command}
                        </span>
                        {owner && (
                          <span className="text-[11px] text-warm-400">
                            {owner.name}
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills grouped by figure */}
        {byFigure.map(({ figure, skills: figureSkills }) => (
          <section key={figure.slug} className="mb-14">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-warm-200">
              <Link
                href={`/${figure.slug}`}
                className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-warm-200 hover:opacity-90 transition-opacity"
              >
                <Image
                  src={figure.portrait}
                  alt={figure.name}
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </Link>
              <div className="min-w-0">
                <Link
                  href={`/${figure.slug}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <h2 className="text-xl md:text-2xl font-serif font-medium text-ink-950 leading-tight">
                    {figure.name}
                  </h2>
                  <p className="text-warm-400 text-xs tracking-wider mt-0.5">
                    {figure.era}
                  </p>
                </Link>
              </div>
            </div>
            <div className="space-y-3">
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
                  <p className="text-warm-500 text-sm leading-relaxed mb-3">
                    {skill.tagline}
                  </p>
                  <div className="flex flex-col gap-1 text-xs">
                    <p className="text-warm-500">
                      <span className="text-warm-400">When to use:</span>{" "}
                      {skill.whenToUse}
                    </p>
                    <p className="text-warm-400 italic">
                      Source: {skill.source}
                      {skill.sourceAnchor ? `, ${skill.sourceAnchor}` : ""}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}

        <footer className="mt-20 text-warm-400 text-xs text-center">
          Each skill grounded in real biographies and primary sources.
        </footer>
      </div>
    </main>
  );
}
