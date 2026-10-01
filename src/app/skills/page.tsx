import { getFigure } from "@/lib/figures";
import { skills, skillGithubUrl, ALL_THEMES, THEMES } from "@/lib/skills";
import SkillsBrowser, { type SkillRow } from "@/components/SkillsBrowser";
import CopyableInstall from "@/components/CopyableInstall";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code Skills | summon.guide",
  description: `${skills.length} Claude Code skills drawn from the lives and books of history's greatest guides. Search by the problem you have.`,
  alternates: {
    canonical: "https://summon.guide/skills",
  },
  openGraph: {
    title: "Claude Code Skills: summon.guide",
    description: `${skills.length} frameworks from history's greatest guides, packaged as Claude Code skills.`,
    url: "https://summon.guide/skills",
    type: "website",
  },
};

// The list leads: search, then every skill. Install sits below.
export default function SkillsIndex() {
  const rows: SkillRow[] = skills.map((skill) => {
    const guide = getFigure(skill.figureSlug)?.name ?? skill.figureSlug;
    return {
      key: `${skill.figureSlug}:${skill.slug}`,
      title: skill.title,
      tagline: skill.tagline,
      guide,
      command: skill.command,
      href: skillGithubUrl(skill.figureSlug, skill.slug),
      themes: skill.themes ?? [],
      haystack: [skill.title, skill.tagline, skill.whenToUse, guide, skill.command, ...(skill.themes ?? []).map((theme) => `${theme} ${THEMES[theme]}`)]
        .join(" ")
        .toLowerCase(),
    };
  });
  const themes = ALL_THEMES.filter((theme) => rows.some((row) => row.themes.includes(theme)));

  return (
    <main className="min-h-screen bg-night text-moon">
      <div className="mx-auto max-w-5xl px-5 pb-24 sm:px-6">
        <header className="flex items-center justify-between py-4">
          <Link href="/" className="inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.32em] text-mist hover:text-moon">summon.guide</Link>
          <Link href="/summon" className="inline-flex min-h-11 items-center text-sm text-mist hover:text-moon">Guides</Link>
        </header>

        <h1 className="mb-6 mt-8 font-serif text-4xl font-medium tracking-tight sm:mt-14 sm:text-5xl">Skills</h1>
        <SkillsBrowser rows={rows} themes={themes} />

        <section className="mt-16 max-w-2xl">
          <h2 className="mb-5 font-serif text-2xl">Install in Claude Code</h2>
          <CopyableInstall
            label="One plugin per guide"
            commands={["/plugin marketplace add adamtpang/summon.guide", "/plugin install elon"]}
            footnote="Swap elon for any guide. Then run a skill by its command, such as /elon:first-principles."
          />
        </section>
      </div>
    </main>
  );
}
