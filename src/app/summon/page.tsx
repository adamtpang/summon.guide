import Link from "next/link";
import CopyableInstall from "@/components/CopyableInstall";
import GuideAgentRoster from "@/components/GuideAgentRoster";
import GuideRequestPanel from "@/components/GuideRequestPanel";
import { guideAgentCounts, guideAgentSummaries } from "@/lib/guideAgents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Roster | summon.guide",
  description: "Summon source-backed person, book, and channel agents into any AI project.",
};

const installPrefix = "npx --yes github:adamtpang/summon.guide summon install";

const packs = [
  {
    slug: "dave-ramsey",
    name: "Dave Ramsey",
    category: "Personal finance",
    color: "bg-emerald-600",
    headline: "Give every dollar a job.",
    description: "A direct, educational money coach for zero-based budgeting, emergency funds, debt payoff, and the hard household conversations that make a plan stick.",
    skills: ["Zero-based budget", "Debt snowball", "Emergency fund triage"],
    note: "Inspired by public Dave Ramsey teachings. Not Dave Ramsey or personalized financial advice.",
  },
  {
    slug: "elon",
    name: "Elon",
    category: "Engineering + business",
    color: "bg-blue-600",
    headline: "Question. Delete. Simplify. Accelerate. Automate.",
    description: "A first-principles operating system for impossible estimates, bloated requirements, vendors, process design, and ambitious product execution.",
    skills: ["First principles", "Five-step algorithm", "Binding-constraint test"],
    note: "Based on public material about Elon Musk. Not Elon Musk or professional engineering advice.",
  },
];

export default function SummonPacks() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-8 md:py-14">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-16">
          <Link href="/" className="text-white/60 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors">summon.guide</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/onboarding" className="text-white/70 hover:text-white">How guides are made</Link>
            <a href="#request-guide" className="text-emerald-300 hover:text-emerald-200 transition-colors">Request a guide</a>
            <Link href="/skills" className="hidden text-white/70 hover:text-white transition-colors sm:inline">Browse all skills</Link>
          </nav>
        </header>

        <section className="max-w-3xl mb-14">
          <p className="text-emerald-400 text-xs tracking-[0.24em] uppercase mb-4">Your agent roster</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight mb-5">Guides live above projects.</h1>
          <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">Every person, book, and channel is a durable AI agent with its own sources, skills, and boundaries. Summon the same specialist into money, work, or any other project without rebuilding it.</p>
          <p className="text-white/40 text-sm mt-4">
            {guideAgentCounts.person} person agents · {guideAgentCounts.book} book agents · {guideAgentCounts.channel} channel agents
          </p>
        </section>

        <div className="flex items-baseline justify-between gap-4 mb-5">
          <div>
            <p className="text-emerald-400 text-xs tracking-[0.2em] uppercase mb-2">Featured cross-project agents</p>
            <h2 className="font-serif text-2xl md:text-3xl">Install with one command</h2>
          </div>
        </div>
        <section className="grid md:grid-cols-2 gap-5">
          {packs.map((pack) => (
            <article id={pack.slug} key={pack.slug} className="scroll-mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className={`h-2.5 w-2.5 rounded-full ${pack.color}`} />
                <p className="text-white/50 text-xs tracking-[0.18em] uppercase">{pack.category}</p>
              </div>
              <h2 className="font-serif text-3xl mb-2">{pack.name}</h2>
              <p className="text-white font-medium leading-relaxed mb-3">{pack.headline}</p>
              <p className="text-white/65 text-sm leading-relaxed mb-6">{pack.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {pack.skills.map((skill) => <span key={skill} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{skill}</span>)}
              </div>
              <div className="mt-auto">
                <CopyableInstall label="Install in the current project" commands={[`${installPrefix} ${pack.slug}`]} footnote={pack.note} />
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 p-6 bg-black/20">
          <h2 className="font-serif text-2xl mb-3">One agent, many assignments</h2>
          <div className="grid md:grid-cols-3 gap-5 text-sm leading-relaxed text-white/65">
            <p><span className="text-white">Agent memory.</span> The specialist keeps its stable methods, sources, and your preferences across projects.</p>
            <p><span className="text-white">Assignment memory.</span> Each project gets isolated context, permissions, goals, and budget.</p>
            <p><span className="text-white">Runtime.</span> Chat directly, install locally, or connect through the paid <code className="text-emerald-300">summon-guide</code> MCP.</p>
          </div>
        </section>

        <div className="mt-20">
          <Link href="/onboarding#new-guides" className="mb-6 block rounded-xl border border-white/15 p-5 text-sm leading-relaxed text-white/75 hover:bg-white/5">New guide intake: Alysa Liu and the Walter Isaacson biographies. View sources, progress, and the next step for each guide.</Link>
          <GuideRequestPanel />
        </div>

        <section className="mt-20">
          <div className="max-w-3xl mb-8">
            <p className="text-emerald-400 text-xs tracking-[0.2em] uppercase mb-3">The full roster</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">The source determines the agent, not its rank.</h2>
            <p className="text-white/60 leading-relaxed">A person agent synthesizes a documented body of work without claiming to be that person. A book agent answers from one text. A channel agent reasons across its episodes. They share the same agent contract and can all be assigned across projects.</p>
          </div>
          <GuideAgentRoster agents={guideAgentSummaries} />
        </section>
      </div>
    </main>
  );
}
