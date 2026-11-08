"use client";

import posthog from "posthog-js";
import { useRef, useState } from "react";
import { LoaderCircle, Send, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CouncilSeat } from "@/lib/council";
import { cleanCouncilText, type ThreadEntry } from "@/lib/councilThread";

// The shared council thread. Each question goes to every seated guide in
// turn; each guide reads what the guides before it said. A short synthesis
// closes the round. The thread lives only in this page's memory.

/** Per-seat run details, sent only when the server runs seats on their own models. */
export type SeatStats = {
  requested: string;
  model: string;
  fellBack: boolean;
  firstTokenMs: number | null;
  latencyMs: number;
  tokensIn: number | null;
  tokensOut: number | null;
  costUsd: number | null;
  retrieved?: string[];
};

async function streamTurn(
  payload: object,
  signal: AbortSignal,
  onText: (text: string) => void,
  onStats?: (stats: SeatStats) => void,
): Promise<string> {
  const res = await fetch("/api/council/turn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `The council could not answer (${res.status}).`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";
    for (const frame of frames) {
      for (const line of frame.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.stats) onStats?.(parsed.stats as SeatStats);
          if (parsed.text) {
            text += parsed.text;
            onText(text);
          }
        } catch (error) {
          if (error instanceof SyntaxError) continue;
          throw error;
        }
      }
    }
  }
  if (!text.trim()) throw new Error("A guide returned an empty answer.");
  return text;
}

export default function CouncilThread({ brief, seats, firstQuestion }: { brief: string; seats: CouncilSeat[]; firstQuestion?: string }) {
  const [thread, setThread] = useState<ThreadEntry[]>([]);
  const [input, setInput] = useState(firstQuestion ?? "");
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  // Thread index to that voice's model, latency, tokens and cost.
  const [stats, setStats] = useState<Record<number, SeatStats>>({});
  const [showStats, setShowStats] = useState(true);
  const members = seats.map((s) => ({ slug: s.slug, name: s.name, role: s.role }));

  const ask = async () => {
    const question = input.trim();
    if (!question || speaking) return;
    setError("");
    setInput("");
    const controller = new AbortController();
    abortRef.current = controller;
    let working: ThreadEntry[] = [...thread, { kind: "user", content: question }];
    setThread(working);

    try {
      for (const speaker of [...members.map((m) => m.slug), "synthesis"]) {
        setSpeaking(speaker);
        const seat = seats.find((s) => s.slug === speaker);
        const placeholder: ThreadEntry = seat
          ? { kind: "guide", slug: seat.slug, name: seat.name, content: "" }
          : { kind: "synthesis", content: "" };
        const index = working.length;
        working = [...working, placeholder];
        setThread(working);
        const text = await streamTurn(
          { brief, members, thread: working.slice(0, index), speaker },
          controller.signal,
          (partial) => setThread((current) => current.map((entry, i) => (i === index ? { ...entry, content: partial } : entry))),
          (seatStats) => setStats((current) => ({ ...current, [index]: seatStats })),
        );
        working = working.map((entry, i) => (i === index ? { ...entry, content: text } : entry));
        setThread(working);
      }
      if (!thread.some((entry) => entry.kind === "user")) {
        posthog.capture("guide_conversation_started", { guide: members.map((m) => m.slug).join(","), surface: "council" });
      }
    } catch (err) {
      // Drop the unfinished turn so the next round starts from a clean thread.
      setThread(working.filter((entry) => entry.kind === "user" || entry.content.trim()));
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setError(err instanceof Error ? err.message : "The council stopped.");
      }
    } finally {
      setSpeaking(null);
      abortRef.current = null;
    }
  };

  return (
    <section className="space-y-5 rounded-2xl border border-edge bg-moon/[0.04] p-5 sm:p-7">
      <div>
        <p className="font-display text-[10px] uppercase tracking-[0.22em] text-mist">Convene the council</p>
        <h2 className="mt-1 font-serif text-2xl">Ask all {seats.length} at once</h2>
        <p className="mt-1 text-sm leading-relaxed text-mist">
          Each AI guide answers in turn and reads the others first, then a short synthesis names where they agree and split.
        </p>
      </div>

      {thread.length > 0 && (
        <ol className="space-y-4" aria-live="polite">
          {thread.map((entry, i) => (
            <li key={i}>
              {entry.kind === "user" ? (
                <div className="ml-auto max-w-[85%] rounded-2xl bg-raised px-4 py-3 text-sm leading-relaxed text-moon">{entry.content}</div>
              ) : (
                <ThreadVoice
                  entry={entry}
                  seat={entry.kind === "guide" ? seats.find((s) => s.slug === entry.slug) : undefined}
                  stats={showStats ? stats[i] : undefined}
                />
              )}
            </li>
          ))}
        </ol>
      )}

      {speaking && (
        <p role="status" className="flex items-center gap-2 text-xs text-mist">
          <LoaderCircle className="size-3.5 animate-spin" />
          {speaking === "synthesis" ? "Writing the synthesis" : `${seats.find((s) => s.slug === speaking)?.name ?? "A guide"} is answering`}
        </p>
      )}
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {Object.keys(stats).length > 0 && (
        <SeatTotals stats={Object.values(stats)} visible={showStats} onToggle={() => setShowStats((v) => !v)} />
      )}

      <form
        onSubmit={(event) => { event.preventDefault(); void ask(); }}
        className="flex items-end gap-2 rounded-2xl border border-edge bg-moon/[0.04] p-2"
      >
        <label htmlFor="council-question" className="sr-only">Question for the council</label>
        <textarea
          id="council-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void ask(); }
          }}
          rows={2}
          placeholder={thread.length ? "Ask a follow-up for the whole council" : "What should the council weigh in on?"}
          className="min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-relaxed text-moon outline-none"
        />
        {speaking ? (
          <Button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop" className="size-11 shrink-0 rounded-full p-0">
            <Square className="size-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={!input.trim()} aria-label="Ask the council" className="size-11 shrink-0 rounded-full p-0">
            <Send className="size-4" />
          </Button>
        )}
      </form>
    </section>
  );
}

function ThreadVoice({ entry, seat, stats }: { entry: Exclude<ThreadEntry, { kind: "user" }>; seat?: CouncilSeat; stats?: SeatStats }) {
  const text = cleanCouncilText(entry.content);
  const body = text.replace(/\[Source:[^\]]*\]/g, "").trim();
  const sources = text.match(/\[Source:[^\]]*\]/g) ?? [];
  const synthesis = entry.kind === "synthesis";
  return (
    <article className={synthesis ? "rounded-2xl border border-moon/15 bg-night p-4" : "rounded-2xl border border-edge bg-moon/[0.04] p-4"}>
      <p className="font-display text-[11px] uppercase tracking-[0.18em] text-mist">
        {synthesis ? "Synthesis" : `${seat?.name ?? (entry.kind === "guide" ? entry.name : "")} guide`}
        {!synthesis && seat?.role && <span className="ml-2 normal-case tracking-normal">· {seat.role}</span>}
      </p>
      <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-moon">
        {body ? body.replace(/\*\*(.+?)\*\*/g, "$1") : <span className="text-mist">…</span>}
      </div>
      {sources.length > 0 && (
        <p className="mt-3 text-[12px] leading-relaxed text-mist">{sources.map((s) => s.slice(8, -1).trim()).join(" · ")}</p>
      )}
      {stats && <SeatStatsLine stats={stats} />}
    </article>
  );
}

function formatCost(usd: number | null) {
  if (usd === null) return "cost n/a";
  return usd < 0.01 ? `$${usd.toFixed(5)}` : `$${usd.toFixed(3)}`;
}

function SeatStatsLine({ stats }: { stats: SeatStats }) {
  return (
    <div className="mt-3 border-t border-edge pt-2 font-mono text-[11px] leading-relaxed text-mist">
      <p>
        <span className="text-moon">{stats.model}</span>
        {stats.fellBack && <span> (fallback; {stats.requested} was unavailable)</span>}
      </p>
      <p>
        {(stats.latencyMs / 1000).toFixed(1)}s total
        {stats.firstTokenMs !== null && `, first token ${(stats.firstTokenMs / 1000).toFixed(1)}s`}
        {" · "}
        {stats.tokensIn ?? "?"} in / {stats.tokensOut ?? "?"} out · {formatCost(stats.costUsd)}
      </p>
      {stats.retrieved && stats.retrieved.length > 0 && <p>retrieved: {stats.retrieved.join(" · ")}</p>}
    </div>
  );
}

function SeatTotals({ stats, visible, onToggle }: { stats: SeatStats[]; visible: boolean; onToggle: () => void }) {
  const cost = stats.reduce((sum, s) => sum + (s.costUsd ?? 0), 0);
  const tokens = stats.reduce((sum, s) => sum + (s.tokensIn ?? 0) + (s.tokensOut ?? 0), 0);
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-mist">
      <span>
        {new Set(stats.map((s) => s.model)).size} models · {tokens} tokens · {formatCost(cost)} so far
      </span>
      <button type="button" onClick={onToggle} className="min-h-11 underline underline-offset-4 hover:text-moon">
        {visible ? "Hide models" : "Show models"}
      </button>
    </div>
  );
}
