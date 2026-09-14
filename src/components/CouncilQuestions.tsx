"use client";

import { useState } from "react";
import { Check, Copy, LoaderCircle, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";

// Step one of the council: turn a sentence about the problem into a prompt
// of tailored questions for the user's own Claude or Codex session, then take
// the pasted answers back as the "# Personal context" brief.

type State =
  | { kind: "problem" }
  | { kind: "loading" }
  | { kind: "prompt"; prompt: string; questions: string[]; generatedBy: "model" | "fallback" }
  | { kind: "error"; message: string };

export default function CouncilQuestions({ onUseContext }: { onUseContext: (brief: string) => void }) {
  const [problem, setProblem] = useState("");
  const [state, setState] = useState<State>({ kind: "problem" });
  const [answers, setAnswers] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/council/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ kind: "error", message: data.error || `Could not write questions (${res.status}).` });
        return;
      }
      setState({ kind: "prompt", prompt: data.prompt, questions: data.questions, generatedBy: data.generatedBy });
    } catch (error) {
      setState({ kind: "error", message: error instanceof Error ? error.message : "Network error" });
    }
  };

  const copy = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const brief = answers.trim().startsWith("# Personal context") ? answers.trim() : `# Personal context\n\n## The problem\n${problem.trim()}\n\n${answers.trim()}`;

  return (
    <section className="space-y-4 rounded-2xl border border-warm-200 bg-white/70 p-6 sm:p-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-warm-500">Step 1 · Gather context</p>
      <h2 className="font-serif text-2xl">What is the problem?</h2>

      {(state.kind === "problem" || state.kind === "loading" || state.kind === "error") && (
        <>
          <p className="text-sm leading-relaxed text-warm-500">
            A sentence or two is enough. Summon writes questions for your own Claude or Codex session, which already knows your project, to answer.
          </p>
          <label htmlFor="council-problem" className="sr-only">Your problem</label>
          <textarea
            id="council-problem"
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
            rows={4}
            placeholder="I'm building a newsletter for indie game devs. 400 subscribers, no revenue, and I keep redesigning the site instead of writing."
            className="w-full rounded-xl border border-warm-300 bg-white p-4 text-sm leading-relaxed text-ink-950"
          />
          {state.kind === "error" && <p role="alert" className="text-sm text-red-700">{state.message}</p>}
          <Button onClick={generate} disabled={problem.trim().length < 15 || state.kind === "loading"} className="min-h-12 rounded-full px-6">
            {state.kind === "loading" ? <LoaderCircle className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
            {state.kind === "loading" ? "Writing questions" : "Write my context prompt"}
          </Button>
        </>
      )}

      {state.kind === "prompt" && (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-warm-500">
            Copy this into the Claude or Codex session that knows your project. Paste its answer below.
            {state.generatedBy === "fallback" && " (The question writer was unavailable, so these are general questions.)"}
          </p>
          <div className="relative">
            <pre aria-label="Context prompt" className="max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-warm-200 bg-warm-50 p-4 pr-28 font-mono text-[12px] leading-relaxed text-ink-950/85">
              {state.prompt}
            </pre>
            <Button type="button" variant="outline" onClick={() => copy(state.prompt)} className="absolute right-3 top-3 h-9 rounded-full bg-white px-3 text-xs">
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <label htmlFor="council-answers" className="block text-sm font-medium">Paste the answers</label>
          <textarea
            id="council-answers"
            value={answers}
            onChange={(event) => setAnswers(event.target.value)}
            rows={10}
            placeholder={"# Personal context\n## The problem\n..."}
            className="w-full rounded-xl border border-warm-300 bg-white p-4 text-sm leading-relaxed text-ink-950"
          />
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onUseContext(brief)} disabled={answers.trim().length < 40} className="min-h-12 rounded-full px-6">
              Use these answers
            </Button>
            <Button type="button" variant="outline" onClick={() => setState({ kind: "problem" })} className="min-h-12 rounded-full px-6">
              Change the problem
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
