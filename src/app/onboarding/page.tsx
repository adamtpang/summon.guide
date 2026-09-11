import Link from "next/link";
import intake from "@/../data/guide-intake.json";
import { figures } from "@/lib/figures";
import { guideOnboardingChecklist } from "@/lib/guideOnboarding";

export const metadata = {
  title: "How a guide becomes ready | Summon",
  description: "Follow each guide from a useful question to sources, original synthesis, skills, evaluation, and a tested conversation.",
};

const receipts = [
  "A specific decision, intended audience, and request to build the guide.",
  "Canonical name and slug, scope, identity disclosure, and explicit limits.",
  "A source manifest with provenance, edition, access rights, and allowed uses. A source link alone does not pass this gate.",
  "Private source files where permitted, original synthesis notes, and a claim-to-source map. No raw transcripts or copyrighted chapters in the public app.",
  "One page of principles, decision questions, contradictions, limits, and citations. Every principle must trace to the source map.",
  "At least one runnable workflow with inputs, steps, an example, expected output, and a stopping rule. No invented methods attributed to the person.",
  "Recorded checks for useful advice, correct citations, out-of-scope questions, false premises, impersonation, and unsupported claims. A build passing is not an answer-quality evaluation.",
  "An enabled profile and chat with auth, tested fallback/error handling, and a launch receipt. Voice additionally needs microphone, interruption, latency, and real audio checks.",
];

export default function GuideOnboardingPage() {
  const existing = new Set(figures.map(figure => figure.slug));
  return <main className="min-h-screen bg-warm-50 text-ink-950">
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
      <nav className="flex items-center justify-between gap-4 text-sm"><Link href="/" className="min-h-11 py-3">summon.guide</Link><Link href="/summon" className="min-h-11 py-3 text-warm-500">Back to the roster</Link></nav>
      <header className="my-14 max-w-3xl">
        <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">A name is the beginning.<br />Evidence makes the guide.</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-warm-500">Every person, book, and channel goes through the same eight gates. You can see what exists, what is missing, and what happens next.</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm"><a href="#new-guides" className="rounded-full bg-ink-950 px-5 py-3 text-white">Follow the new guides</a><a href="#process" className="rounded-full border border-warm-300 px-5 py-3">See the full process</a></div>
      </header>

      <section id="new-guides" className="scroll-mt-6">
        <h2 className="font-serif text-3xl">Alysa Liu & the Isaacson biographies</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-warm-500">{intake.filter(guide => !existing.has(guide.slug)).length} new guides in onboarding; {intake.filter(guide => existing.has(guide.slug)).length} already have chat. Existing chat access does not certify that every gate below has passed. This batch covers the seven individual biography subjects; the central figures in group books need a separate scope audit.</p>
        <div className="mt-8 divide-y divide-warm-200 border-y border-warm-200">
          {intake.map(guide => <article id={guide.slug} key={guide.slug} className="scroll-mt-6 py-7 sm:grid sm:grid-cols-[220px_1fr] sm:gap-10">
            <div><h3 className="font-serif text-2xl">{guide.name}</h3><p className="mt-2 text-xs text-warm-500">{guide.domain}</p><p className="mt-4 text-xs font-medium">{existing.has(guide.slug) ? "Existing chat · audit pending" : "Sourcing · chat not enabled"}</p><p className="mt-2 text-xs text-warm-500">{guide.completedGates.length} of 8 onboarding gates documented</p>{existing.has(guide.slug) && <Link href={`/${guide.slug}`} className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Open existing guide</Link>}</div>
            <div className="mt-5 sm:mt-0"><p className="max-w-2xl text-base leading-relaxed">{guide.outcome}</p>
              <p className="mt-3 text-sm leading-relaxed text-warm-500"><span className="font-medium text-ink-950">Next:</span> {guide.nextAction}</p>
              <details className="mt-5"><summary className="min-h-11 cursor-pointer py-3 text-sm underline underline-offset-4">Inspect the onboarding brief</summary><div className="mt-3 space-y-4 rounded-xl border border-warm-200 bg-white p-5 text-sm leading-relaxed">
                <p><strong>Source lead:</strong> <a className="underline underline-offset-4" href={guide.source.url} target="_blank" rel="noreferrer">{guide.source.title}</a>. Identified {guide.source.checkedOn}; reference only. Full-text access and allowed uses remain unverified.</p>
                <p><strong>Boundary:</strong> {guide.boundary}</p>
                <p><strong>Proposed skill:</strong> {guide.proposedSkill}. Awaiting source-backed implementation.</p>
                <p><strong>Evaluation question:</strong> “{guide.evaluationPrompt}”</p>
                <ol className="space-y-2">{guideOnboardingChecklist.map((gate, i) => <li key={gate.title}><span className="inline-block w-5">{i + 1}.</span>{gate.title} — {guide.completedGates.includes(i + 1) ? "Documented in this brief" : "Pending evidence"}</li>)}</ol>
              </div></details>
            </div>
          </article>)}
        </div>
      </section>

      <section id="process" className="mt-20 scroll-mt-8">
        <h2 className="font-serif text-3xl">The process for every guide</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-500">Each gate produces a reviewable artifact. Missing evidence keeps that gate open; an impressive persona prompt cannot substitute for it.</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">{guideOnboardingChecklist.map((gate, index) => <li key={gate.title} className="rounded-xl border border-warm-200 bg-white p-6"><p className="text-xs text-warm-500">Step {index + 1}</p><h3 className="mt-2 font-serif text-2xl">{gate.title}</h3><p className="mt-3 text-sm leading-relaxed">{gate.description}</p><p className="mt-4 border-t border-warm-200 pt-4 text-sm leading-relaxed text-warm-500"><strong>Evidence to proceed:</strong> {receipts[index]}</p></li>)}</ol>
        <aside className="mt-8 rounded-xl bg-ink-950 p-6 text-warm-50"><h3 className="font-serif text-2xl">One person, several sources</h3><p className="mt-3 max-w-3xl text-sm leading-relaxed text-warm-300">Summon owns person guides and their assignments. Bookbox owns book ingestion, canonical book distillations, and book agents. A biography can ground a person guide, but its author’s interpretation stays distinct from the subject’s own words. The guide uses a disclosed synthetic voice unless a different voice is explicitly licensed.</p></aside>
      </section>
    </div>
  </main>;
}
