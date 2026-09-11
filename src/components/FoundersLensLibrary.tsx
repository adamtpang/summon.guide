"use client";

import { rankSourceEpisodes } from "@/lib/sourceRetrieval";
import type { SourceEpisode } from "@/lib/sourceCorpus";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const SAVED_QUESTIONS_KEY = "summon_founders_saved_questions_v1";

type EpisodeKind = "all" | "solo" | "conversation";
type WorkspaceTab = "discover" | "search" | "saved";

export type FoundersLensPrompt = {
  title: string;
  description: string;
  prompt: string;
};

type SavedQuestion = {
  id: string;
  text: string;
  label: string;
  savedAt: string;
};

function questionHref(question: string) {
  return `/sage?q=${encodeURIComponent(question)}#conversation`;
}

function makeSavedQuestion(text: string, label: string): SavedQuestion {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    label,
    savedAt: new Date().toISOString(),
  };
}

function readSavedQuestions(): SavedQuestion[] {
  try {
    const raw = window.localStorage.getItem(SAVED_QUESTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is SavedQuestion => {
        if (!item || typeof item !== "object") return false;
        const candidate = item as Partial<SavedQuestion>;
        return typeof candidate.id === "string"
          && typeof candidate.text === "string"
          && typeof candidate.label === "string"
          && typeof candidate.savedAt === "string";
      })
      .slice(0, 50);
  } catch {
    return [];
  }
}

export default function FoundersLensLibrary({
  episodes,
  prompts,
}: {
  episodes: SourceEpisode[];
  prompts: readonly FoundersLensPrompt[];
}) {
  const [tab, setTab] = useState<WorkspaceTab>("discover");
  const [question, setQuestion] = useState("");
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<EpisodeKind>("all");
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSavedQuestions(readSavedQuestions());
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        SAVED_QUESTIONS_KEY,
        JSON.stringify(savedQuestions.slice(0, 50)),
      );
    } catch {
      // The workspace still works if the browser blocks local storage.
    }
  }, [hydrated, savedQuestions]);

  const filtered = useMemo(() => {
    const candidates = episodes.filter((episode) => {
      const isConversation = Boolean(episode.guest?.trim());
      if (kind === "solo") return !isConversation;
      if (kind === "conversation") return isConversation;
      return true;
    });
    const trimmed = query.trim();
    if (!trimmed) return candidates;
    return rankSourceEpisodes(candidates, trimmed)
      .filter((result) => result.score > 0)
      .map((result) => result.episode);
  }, [episodes, kind, query]);

  function saveQuestion(text: string, label: string) {
    const clean = text.trim();
    if (!clean) return;
    setSavedQuestions((current) => {
      const duplicate = current.find(
        (item) => item.text.toLocaleLowerCase("en-US") === clean.toLocaleLowerCase("en-US"),
      );
      if (duplicate) return current;
      return [makeSavedQuestion(clean, label), ...current].slice(0, 50);
    });
    setNotice("Saved privately on this device.");
    window.setTimeout(() => setNotice(""), 1800);
  }

  return (
    <section id="workspace" className="scroll-mt-8 border-t border-warm-200 pt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-warm-400">
            Founders workspace
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink-950 md:text-4xl">
            Bring a decision. Leave with precedents.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-warm-500">
          Your saved questions stay in this browser. Summon never publishes them to a
          community feed or puts them in a URL until you explicitly choose Ask.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-ink-950 bg-ink-950 p-4 text-white md:p-6">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
            What are you deciding?
          </span>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            rows={3}
            placeholder="Describe the company decision, constraints, and what would change your mind."
            className="mt-3 w-full resize-y rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-white/30 focus:border-white/55"
          />
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {question.trim() ? (
            <Link
              href={questionHref(question.trim())}
              className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-xs font-medium text-ink-950"
            >
              Ask the corpus
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-5 text-xs text-white/35">
              Ask the corpus
            </span>
          )}
          <button
            type="button"
            onClick={() => saveQuestion(question, "My question")}
            disabled={!question.trim()}
            className="min-h-11 rounded-full border border-white/15 px-5 text-xs text-white/70 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Save privately
          </button>
          <span className="text-xs text-emerald-300" aria-live="polite">
            {notice}
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2 rounded-xl bg-warm-100 p-1" role="tablist">
        {([
          ["discover", "Discover"],
          ["search", `Search ${episodes.length} notes`],
          ["saved", `Saved ${hydrated ? savedQuestions.length : ""}`],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            onClick={() => setTab(value)}
            className={`min-h-11 rounded-lg px-3 text-xs transition-colors ${
              tab === value
                ? "bg-white font-medium text-ink-950 shadow-sm"
                : "text-warm-500 hover:text-ink-950"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "discover" && (
        <div className="mt-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-warm-400">
                Editorial starting points
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink-950">
                Questions worth asking before the crisis.
              </h3>
            </div>
            <p className="hidden text-xs text-warm-400 sm:block">Curated, not user-published</p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {prompts.map((item) => (
              <article key={item.title} className="flex flex-col rounded-2xl border border-warm-200 bg-white p-5">
                <h4 className="font-serif text-xl text-ink-950">{item.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-warm-500">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-warm-100 pt-4">
                  <Link
                    href={questionHref(item.prompt)}
                    className="inline-flex min-h-11 items-center rounded-full bg-ink-950 px-4 text-xs font-medium text-white"
                  >
                    Run question
                  </Link>
                  <button
                    type="button"
                    onClick={() => saveQuestion(item.prompt, item.title)}
                    className="min-h-11 rounded-full border border-warm-300 px-4 text-xs text-warm-500 hover:border-ink-950 hover:text-ink-950"
                  >
                    Save
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {tab === "search" && (
        <div id="library" className="mt-6 scroll-mt-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-warm-400">
                Search the evidence
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink-950">
                Read the notes behind the answer.
              </h3>
            </div>
            <p className="text-sm text-warm-500" aria-live="polite">
              {filtered.length} of {episodes.length} original syntheses
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
            <label className="block">
              <span className="sr-only">Search episode syntheses</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try capital allocation, founder control, or market education"
                className="min-h-12 w-full rounded-xl border border-warm-300 bg-white px-4 text-sm text-ink-950 outline-none placeholder:text-warm-400 focus:border-ink-950"
              />
            </label>
            <div className="grid grid-cols-3 gap-2" aria-label="Episode type">
              {(["all", "solo", "conversation"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={kind === option}
                  onClick={() => setKind(option)}
                  className={`min-h-12 rounded-xl border px-3 text-xs capitalize ${
                    kind === option
                      ? "border-ink-950 bg-ink-950 text-white"
                      : "border-warm-300 bg-white text-warm-500 hover:border-ink-950 hover:text-ink-950"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <ol className="mt-6 grid gap-3 md:grid-cols-2">
              {filtered.map((episode, index) => {
                const prompt = `What should I learn from the episode "${episode.title}"? Explain when its central principle is useful, where it may fail, and cite the source.`;
                return (
                  <li key={episode.file} className="flex flex-col rounded-2xl border border-warm-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-warm-400">
                        {episode.guest ? `Conversation · ${episode.guest}` : "Solo episode"}
                      </p>
                      <span className="font-mono text-[10px] text-warm-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="mt-3 font-serif text-xl leading-snug text-ink-950">
                      {episode.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-warm-500">
                      {episode.principle}
                    </p>
                    <details className="mt-4 border-t border-warm-100 pt-4">
                      <summary className="min-h-11 cursor-pointer text-xs font-medium text-ink-950">
                        Read synthesis notes ({episode.keyLessons.length})
                      </summary>
                      <ul className="space-y-3 pb-2 text-sm leading-relaxed text-warm-500">
                        {episode.keyLessons.map((lesson) => (
                          <li key={lesson} className="border-l border-warm-300 pl-3">
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </details>
                    <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-warm-100 pt-4">
                      <Link
                        href={questionHref(prompt)}
                        className="inline-flex min-h-11 items-center rounded-full bg-ink-950 px-4 text-xs font-medium text-white"
                      >
                        Ask about this
                      </Link>
                      {episode.youtube && (
                        <a
                          href={episode.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center text-xs text-warm-500 underline decoration-warm-300 underline-offset-4 hover:text-ink-950"
                        >
                          Public source ↗
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-warm-300 px-5 py-10 text-center">
              <p className="font-serif text-xl text-ink-950">No synthesis matches that search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setKind("all");
                }}
                className="mt-3 min-h-11 text-sm text-warm-500 underline underline-offset-4 hover:text-ink-950"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "saved" && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-warm-400">Private library</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-serif text-2xl text-ink-950">Questions you want to keep.</h3>
            <p className="text-xs text-warm-400">Stored only in this browser</p>
          </div>
          {savedQuestions.length ? (
            <ol className="mt-5 space-y-3">
              {savedQuestions.map((item) => (
                <li key={item.id} className="rounded-2xl border border-warm-200 bg-white p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-warm-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-950">{item.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={questionHref(item.text)}
                      className="inline-flex min-h-11 items-center rounded-full bg-ink-950 px-4 text-xs font-medium text-white"
                    >
                      Ask now
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSavedQuestions((current) => current.filter((saved) => saved.id !== item.id))}
                      className="min-h-11 rounded-full border border-warm-300 px-4 text-xs text-warm-500 hover:border-red-300 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-warm-300 px-5 py-10 text-center">
              <p className="font-serif text-xl text-ink-950">Your private library is empty.</p>
              <p className="mt-2 text-sm text-warm-500">
                Save an editorial prompt or write a live decision above.
              </p>
              <button
                type="button"
                onClick={() => setTab("discover")}
                className="mt-4 min-h-11 text-sm text-ink-950 underline underline-offset-4"
              >
                Browse questions
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
