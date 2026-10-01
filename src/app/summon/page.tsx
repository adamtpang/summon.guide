import Link from "next/link";
import CopyableInstall from "@/components/CopyableInstall";
import GuideAgentRoster from "@/components/GuideAgentRoster";
import GuideRequestPanel from "@/components/GuideRequestPanel";
import { guideAgentSummaries } from "@/lib/guideAgents";
import type { Metadata } from "next";

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
    <main className="min-h-screen bg-[#07090d] text-[#eef1f5]">
      <div className="mx-auto max-w-5xl px-5 pb-24 sm:px-6">
        <header className="flex items-center justify-between py-4">
          <Link href="/" className="inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.32em] text-[#8a94a4] hover:text-[#eef1f5]">summon.guide</Link>
          <a href="#request-guide" className="inline-flex min-h-11 items-center text-sm text-[#8a94a4] hover:text-[#eef1f5]">Request a guide</a>
        </header>

        <h1 className="mb-6 mt-8 font-serif text-4xl font-medium tracking-tight sm:mt-14 sm:text-5xl">Guides</h1>
        <GuideAgentRoster agents={guideAgentSummaries} />

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
          <p className="mt-6 text-sm text-[#8a94a4]">
            <Link href="/connect" className="underline underline-offset-4 hover:text-[#eef1f5]">Use any guide in your own AI chat</Link>
            {" · "}
            <Link href="/onboarding" className="underline underline-offset-4 hover:text-[#eef1f5]">How guides are made</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
