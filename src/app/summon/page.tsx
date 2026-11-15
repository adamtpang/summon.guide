import Link from "next/link";
import CopyableInstall from "@/components/CopyableInstall";
import GuideAgentRoster from "@/components/GuideAgentRoster";
import GuideRequestPanel from "@/components/GuideRequestPanel";
import { guideAgentSummaries } from "@/lib/guideAgents";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { GUIDE_LINES } from "@/lib/curated";

export const metadata: Metadata = {
  title: "Guides | summon.guide",
  description: "Every guide on summon.guide: people, books, and channels you can ask about your own problem.",
};

const installPrefix = "npx --yes github:adamtpang/summon.guide summon install";

const packs = [
  { slug: "dave-ramsey", name: "Dave Ramsey", note: "Inspired by public Dave Ramsey teachings. Not Dave Ramsey or personalized financial advice." },
  { slug: "elon", name: "Elon", note: "Based on public material about Elon Musk. Not Elon Musk or professional engineering advice." },
];

// The roster leads: search, then every guide. Requests and installs sit below.
export default function SummonPacks() {
  return (
    <main className="min-h-screen bg-night text-moon">
      <SiteHeader current="/summon" />
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <h1 className="mt-8 font-serif text-5xl font-medium leading-none sm:mt-12 sm:text-7xl">The guides</h1>
        <p className="mb-8 mt-4 max-w-[62ch] text-[17px] leading-relaxed text-mist">
          Hand-picked people whose lives answer real problems. Each is an AI guide built from their public work, not the person.
        </p>
        <GuideAgentRoster agents={guideAgentSummaries.filter((agent) => agent.availability !== "archived")} lines={GUIDE_LINES} />

        <div className="mt-24">
          <GuideRequestPanel />
        </div>

        <section className="mt-16">
          <h2 className="font-serif text-2xl">Install in Claude Code or Codex</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {packs.map((pack) => (
              <div id={pack.slug} key={pack.slug} className="min-w-0 scroll-mt-6">
                <CopyableInstall label={pack.name} commands={[`${installPrefix} ${pack.slug}`]} footnote={pack.note} />
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-mist">
            <Link href="/connect" className="underline underline-offset-4 hover:text-moon">Use any guide in your own AI chat</Link>
            {" · "}
            <Link href="/onboarding" className="underline underline-offset-4 hover:text-moon">How guides are made</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
