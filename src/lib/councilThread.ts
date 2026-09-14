import type { ChatMessageInput } from "@/lib/aiTypes";
import { extractJsonObject } from "./jsonExtract";

// Two pieces that sit on either side of the council:
//
// 1. Context questions. The user names the problem in a sentence; Summon
//    writes a prompt of questions tailored to that problem, the user runs it
//    in their own Claude or Codex session (which knows their project), and
//    pastes the answers back as a "# Personal context" brief.
//
// 2. The shared thread. Every seated guide answers the same question in turn,
//    reading what the guides before it said, and a closing synthesis names
//    where they agree and disagree.
//
// Everything here is pure so it can be tested without a model.

export const MIN_QUESTIONS = 5;
export const MAX_QUESTIONS = 8;
export const MAX_PROBLEM_CHARS = 2_000;

export const FALLBACK_QUESTIONS = [
  "What exactly are you building or trying to change, and for whom?",
  "Where is it stuck right now, in concrete terms (numbers, dates, what has and has not happened)?",
  "What have you already tried, and what happened each time?",
  "What decision or fork is in front of you in the next few weeks?",
  "What constraints are real: money, time, energy, people, commitments?",
  "What does success look like 90 days from now?",
  "What pattern keeps showing up when this goes wrong?",
];

export function buildQuestionsSystemPrompt(): string {
  return `You help someone prepare for a council of AI guides on summon.guide. They describe a problem in a few sentences. Their own AI assistant (Claude or Codex) already knows their project, files, and history, and will answer your questions for them.

Write ${MIN_QUESTIONS} to ${MAX_QUESTIONS} questions that pull out the context a sharp advisor would need before giving advice on THIS problem. Good questions:
- are specific to the problem described, not generic life coaching
- ask for concrete facts: numbers, dates, what was tried, what happened, what is decided and what is not
- surface the real constraint and the real decision
- can be answered from project files, notes, and past conversations
- are one sentence each

Respond with ONLY valid JSON: {"questions":["...","..."]}
Never use em dashes or en dashes.`;
}

export function parseQuestions(text: string): string[] {
  const parsed = JSON.parse(extractJsonObject(text)) as { questions?: unknown };
  const list = Array.isArray(parsed.questions) ? parsed.questions : [];
  const seen = new Set<string>();
  const questions: string[] = [];
  for (const item of list) {
    const q = String(item ?? "").replace(/[–—]/g, ",").replace(/\s+/g, " ").trim();
    if (q.length < 8 || q.length > 300 || seen.has(q.toLowerCase())) continue;
    seen.add(q.toLowerCase());
    questions.push(q);
    if (questions.length === MAX_QUESTIONS) break;
  }
  if (questions.length < MIN_QUESTIONS) throw new Error(`Only ${questions.length} usable questions`);
  return questions;
}

/** The prompt the user copies into their own Claude or Codex session. */
export function buildContextPrompt(problem: string, questions: string[]): string {
  const numbered = questions.map((q, i) => `${i + 1}. ${q}`).join("\n");
  return `I am about to ask a council of AI guides on summon.guide for advice. Help me give them the right context.

My problem, in my words:
${problem.trim()}

Answer each question below using what you know from this project, its files, and our past conversations. Be concrete: numbers, dates, what was tried and what happened. If you do not know an answer, write "Unknown" rather than guessing.

${numbered}

Return ONLY this Markdown, ready to paste back:

# Personal context
## The problem
(one paragraph restating the problem precisely)

## Answers
(each question as a "### " heading, followed by its answer)

## What is still unknown
(anything important you could not answer)

Keep it under 900 words. Leave out passwords, API keys, account numbers, private addresses, and identifying details about other people.`;
}

// ---------------------------------------------------------------------------
// The shared thread

export type ThreadEntry =
  | { kind: "user"; content: string }
  | { kind: "guide"; slug: string; name: string; content: string }
  | { kind: "synthesis"; content: string };

export type CouncilMember = { slug: string; name: string; role?: string };

export function buildCouncilTurnRules(speaker: CouncilMember, members: CouncilMember[]): string {
  const others = members.filter((m) => m.slug !== speaker.slug).map((m) => m.name);
  return `COUNCIL:
You are one voice on a council of AI guides answering the same person together${others.length ? `, alongside the AI guides built on ${others.join(", ")}` : ""}.${speaker.role ? ` Your seat on this council: ${speaker.role}.` : ""}
- Earlier guide replies in this round appear as quoted notes from the user side. Read them. Do not repeat a point already made. Build on it, sharpen it, or disagree plainly where the record you teach from points somewhere else, and name which guide you are responding to.
- Bring the angle only your source material gives. If you have nothing distinct to add, say so in one sentence and add the single most useful thing you can.
- Keep it to 1-3 short paragraphs.
- Do NOT add a [FOLLOWUP: ...] line in the council. Cite retrieved notes as your rules require.`;
}

const FOLLOWUP_RE = /\[FOLLOWUP:[^\]]*\]/g;

export function cleanCouncilText(text: string): string {
  return text.replace(FOLLOWUP_RE, "").trim();
}

/**
 * Builds the conversation one guide sees: the brief first, then each round.
 * The speaker's own earlier replies are assistant turns; everything else
 * (user questions, other guides, earlier syntheses) is folded into user
 * turns, so roles always alternate and start with the user.
 */
export function buildTurnMessages(brief: string, thread: ThreadEntry[], speakerSlug: string): ChatMessageInput[] {
  const out: ChatMessageInput[] = [];
  const push = (role: ChatMessageInput["role"], content: string) => {
    const last = out[out.length - 1];
    if (last && last.role === role) last.content += `\n\n${content}`;
    else out.push({ role, content });
  };
  push("user", brief.trim());
  for (const entry of thread) {
    if (entry.kind === "user") push("user", `## My question for the council\n${entry.content.trim()}`);
    else if (entry.kind === "guide" && entry.slug === speakerSlug) push("assistant", entry.content.trim());
    else if (entry.kind === "guide") push("user", `> The AI guide built on ${entry.name}'s work said:\n${quote(entry.content)}`);
    else push("user", `> Council synthesis so far:\n${quote(entry.content)}`);
  }
  if (out[out.length - 1].role !== "user") push("user", "Continue.");
  return out;
}

function quote(text: string): string {
  return cleanCouncilText(text).split("\n").map((line) => `> ${line}`).join("\n");
}

export function buildSynthesisSystemPrompt(members: CouncilMember[]): string {
  return `You close a round of a council on summon.guide. AI guides built on the public work of ${members.map((m) => m.name).join(", ")} have each answered the person's latest question, in light of their "# Personal context" brief.

Write a short synthesis for the person:
- **Where they agree:** one or two sentences.
- **Where they split:** the real disagreement, naming which guide holds which view. If there is none, say so.
- **The one move this week:** a single concrete next action that follows from the strongest argument, tied to the brief.

Under 170 words. Do not add new advice the guides did not give. Do not cite sources. Never use em dashes or en dashes. No [FOLLOWUP] line.`;
}

export function buildSynthesisMessages(brief: string, thread: ThreadEntry[]): ChatMessageInput[] {
  let lastUser = -1;
  thread.forEach((entry, i) => { if (entry.kind === "user") lastUser = i; });
  const round = thread.slice(lastUser);
  const body = round
    .map((entry) =>
      entry.kind === "user"
        ? `## Question\n${entry.content.trim()}`
        : entry.kind === "guide"
          ? `## ${entry.name} guide\n${cleanCouncilText(entry.content)}`
          : "")
    .filter(Boolean)
    .join("\n\n");
  return [{ role: "user", content: `${brief.trim()}\n\n# This round\n\n${body}` }];
}

/** Validates a client-sent thread. Returns null when it is malformed. */
export function parseThread(value: unknown, maxEntries = 60, maxChars = 60_000): ThreadEntry[] | null {
  if (!Array.isArray(value) || value.length > maxEntries) return null;
  const out: ThreadEntry[] = [];
  let total = 0;
  for (const raw of value) {
    if (!raw || typeof raw !== "object") return null;
    const r = raw as Record<string, unknown>;
    const content = typeof r.content === "string" ? r.content : "";
    total += content.length;
    if (total > maxChars) return null;
    if (r.kind === "user" && content.trim()) out.push({ kind: "user", content });
    else if (r.kind === "guide" && typeof r.slug === "string" && typeof r.name === "string") out.push({ kind: "guide", slug: r.slug, name: r.name, content });
    else if (r.kind === "synthesis") out.push({ kind: "synthesis", content });
    else return null;
  }
  return out;
}
