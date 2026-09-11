"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import {
  GUIDE_REQUEST_STATUS_LABELS,
  guideOnboardingChecklist,
  type GuideRequestKind,
} from "@/lib/guideOnboarding";

const DRAFT_KEY = "summon_guide_request_draft";

const suggestions = [
  { name: "Don Valentine", note: "venture judgment" },
  { name: "Michael Moritz", note: "company building" },
  { name: "Doug Leone", note: "founder selection" },
] as const;

type SavedRequest = {
  id: string;
  name: string;
  kind: GuideRequestKind;
  status: keyof typeof GUIDE_REQUEST_STATUS_LABELS;
  createdAt: string;
  updatedAt: string;
};

type Draft = {
  name: string;
  kind: GuideRequestKind;
  problem: string;
  sourceUrl: string;
};

const emptyDraft: Draft = {
  name: "",
  kind: "person",
  problem: "",
  sourceUrl: "",
};

function readDraft(): Draft | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as Partial<Draft>;
    if (typeof draft.name !== "string") return null;
    return {
      name: draft.name,
      kind:
        draft.kind === "channel" || draft.kind === "book" ? draft.kind : "person",
      problem: typeof draft.problem === "string" ? draft.problem : "",
      sourceUrl: typeof draft.sourceUrl === "string" ? draft.sourceUrl : "",
    };
  } catch {
    return null;
  }
}

export default function GuideRequestPanel() {
  const { data: session, status: sessionStatus } = useSession();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [requests, setRequests] = useState<SavedRequest[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageHref, setMessageHref] = useState("");

  useEffect(() => {
    const saved = readDraft();
    if (saved) setDraft(saved);
  }, []);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;
    let active = true;
    fetch("/api/guide-requests")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { requests?: SavedRequest[] } | null) => {
        if (active && payload?.requests) setRequests(payload.requests);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [sessionStatus]);

  const canSubmit = useMemo(
    () => draft.name.trim().length >= 2 && !submitting,
    [draft.name, submitting],
  );

  const updateDraft = <Key extends keyof Draft>(key: Key, value: Draft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setMessage("");
    setMessageHref("");
  };

  const continueWithGoogle = async () => {
    window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    await signIn("google", { redirectTo: "/summon#request-guide" });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    if (!session?.user) {
      await continueWithGoogle();
      return;
    }

    setSubmitting(true);
    setMessage("");
    setMessageHref("");
    try {
      const response = await fetch("/api/guide-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const payload = (await response.json()) as {
        error?: string;
        href?: string;
        request?: SavedRequest;
      };

      if (!response.ok || !payload.request) {
        setMessage(payload.error || "The request could not be saved. Try again.");
        setMessageHref(payload.href || "");
        return;
      }

      setRequests((current) => [
        payload.request!,
        ...current.filter((request) => request.id !== payload.request!.id),
      ]);
      setDraft(emptyDraft);
      window.sessionStorage.removeItem(DRAFT_KEY);
      setMessage(
        payload.request.kind === "book"
          ? "Requested. Bookbox will handle the rights and source gate."
          : "Requested. It is now in the guide research queue.",
      );
    } catch {
      setMessage("The request could not be saved. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="request-guide"
      className="scroll-mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
    >
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="p-6 md:p-9 lg:border-r lg:border-white/10">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-400">
            Request the next guide
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">Who should join the roster?</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
            Tell us who you need and what judgment you want from them. Requests are
            prioritized by repeated demand, source quality, and whether the guide can
            become meaningfully better than a generic prompt.
          </p>

          <div className="mt-5 flex flex-wrap gap-2" aria-label="Suggested guide requests">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.name}
                type="button"
                onClick={() => updateDraft("name", suggestion.name)}
                className="min-h-11 rounded-full border border-white/15 px-3.5 text-left text-xs text-white/70 transition-colors hover:border-emerald-400/60 hover:text-white"
              >
                <span className="text-white">{suggestion.name}</span>
                <span className="ml-1.5 text-white/35">{suggestion.note}</span>
              </button>
            ))}
          </div>

          <form className="mt-7 space-y-5" onSubmit={submit}>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-white/45">
                Guide name
              </span>
              <input
                required
                minLength={2}
                maxLength={100}
                value={draft.name}
                onChange={(event) => updateDraft("name", event.target.value)}
                placeholder="Don Valentine"
                className="min-h-12 w-full rounded-xl border border-white/15 bg-black/25 px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-emerald-400/70"
              />
            </label>

            <fieldset>
              <legend className="mb-2 text-xs uppercase tracking-[0.14em] text-white/45">
                Agent type
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {(["person", "channel", "book"] as const).map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => updateDraft("kind", kind)}
                    aria-pressed={draft.kind === kind}
                    className={`min-h-11 rounded-xl border px-3 text-xs capitalize transition-colors ${
                      draft.kind === kind
                        ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-200"
                        : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {kind}
                  </button>
                ))}
              </div>
              {draft.kind === "book" && (
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  Book requests enter here, then move to Bookbox for rights-aware ingestion.
                </p>
              )}
            </fieldset>

            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-white/45">
                What should they help you decide?
              </span>
              <textarea
                maxLength={600}
                rows={4}
                value={draft.problem}
                onChange={(event) => updateDraft("problem", event.target.value)}
                placeholder="I want a venture guide who can pressure-test markets, founders, and whether a company can become generational."
                className="w-full resize-none rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-white/25 focus:border-emerald-400/70"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-white/45">
                Best public source <span className="normal-case tracking-normal">(optional)</span>
              </span>
              <input
                type="url"
                maxLength={500}
                value={draft.sourceUrl}
                onChange={(event) => updateDraft("sourceUrl", event.target.value)}
                placeholder="https://..."
                className="min-h-12 w-full rounded-xl border border-white/15 bg-black/25 px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-emerald-400/70"
              />
            </label>

            <button
              type="submit"
              disabled={!canSubmit || sessionStatus === "loading"}
              className="min-h-12 w-full rounded-xl bg-emerald-400 px-5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting
                ? "Saving request..."
                : session?.user
                  ? "Request this guide"
                  : "Sign in with Google and request"}
            </button>

            {message && (
              <p
                role="status"
                className={`rounded-xl border px-4 py-3 text-sm ${
                  messageHref
                    ? "border-amber-300/25 bg-amber-300/10 text-amber-100"
                    : "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                }`}
              >
                {message}{" "}
                {messageHref && (
                  <a href={messageHref} className="underline underline-offset-2">
                    Open it
                  </a>
                )}
              </p>
            )}
          </form>

          {requests.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-white/40">Your requests</p>
              <div className="mt-3 space-y-2">
                {requests.slice(0, 5).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm text-white">{request.name}</p>
                      <p className="text-[11px] capitalize text-white/35">{request.kind} agent</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-emerald-300/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-emerald-200/80">
                      {GUIDE_REQUEST_STATUS_LABELS[request.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-black/20 p-6 md:p-9">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">
            Guide onboarding checklist
          </p>
          <h2 className="font-serif text-3xl">A name is only the beginning.</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
            A guide ships only when its evidence, methods, and runtime pass every gate.
          </p>
          <ol className="mt-7 space-y-1">
            {guideOnboardingChecklist.map((item, index) => (
              <li
                key={item.title}
                className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-white/[0.08] py-4 last:border-b-0"
              >
                <span className="flex size-8 items-center justify-center rounded-full border border-emerald-300/25 font-mono text-xs text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
