"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUp, LoaderCircle, Search, Sparkles } from "lucide-react";

import ContextImportDialog from "@/components/ContextImportDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// The summoning circle: one input over the index of ALL humans.
// - Type a name → live results from /api/humans/search (Wikidata-backed).
//   Guides already in the hall link straight in; anyone else gets an
//   honest "not summoned yet" card with a request CTA.
// - Type a problem and press Enter → /api/match routes you to the guide
//   whose life best addresses it (existing behavior, unchanged).

interface HumanResult {
  id: string;
  name: string;
  description: string;
  birthYear: string | null;
  deathYear: string | null;
  dead: boolean;
  image: string | null;
  wikipediaUrl: string | null;
  notability: number;
  onPlatform: string | null;
}

interface RequestCard {
  person: string;
  reason: string;
  wikipediaUrl?: string | null;
  years?: string;
  qid?: string;
}

interface Pantheon {
  hpi: number | null;
  rank: number | null;
  occupation: string | null;
}

export default function HumanSearch() {
  const [mode, setMode] = useState<"life" | "person">("life");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HumanResult[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [searching, setSearching] = useState(false);
  const [matching, setMatching] = useState(false);
  const [requestCard, setRequestCard] = useState<RequestCard | null>(null);
  const [pantheon, setPantheon] = useState<Pantheon | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeQueryRef = useRef("");
  const router = useRouter();

  // Debounced people search while typing
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    activeQueryRef.current = q;
    if (mode !== "person" || q.length < 2) {
      setResults([]);
      setOpen(false);
      setSearching(false);
      return;
    }
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/humans/search?q=${encodeURIComponent(q)}`
        );
        const data = await res.json();
        // Ignore stale responses
        if (activeQueryRef.current !== q) return;
        setResults(data.results || []);
        setOpen((data.results || []).length > 0);
        setHighlighted(-1);
      } catch {
        /* people search is best-effort; Enter still problem-routes */
      } finally {
        if (activeQueryRef.current === q) setSearching(false);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [mode, query]);

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const years = (h: HumanResult) =>
    h.birthYear
      ? `${h.birthYear}–${h.deathYear || "present"}`
      : "";

  const selectHuman = useCallback(
    (h: HumanResult) => {
      setOpen(false);
      if (h.onPlatform) {
        router.push(`/chat/${h.onPlatform}`);
        return;
      }
      setRequestCard({
        person: h.name,
        reason: h.description
          ? `${h.name} (${h.description}) isn't in the hall yet. Every guide is deeply researched and grounded in real primary sources before we summon them.`
          : `${h.name} isn't in the hall yet. Every guide is deeply researched and grounded in real primary sources before we summon them.`,
        wikipediaUrl: h.wikipediaUrl,
        years: years(h),
        qid: h.id,
      });
    },
    [router]
  );

  // Enrich the request card with Pantheon historical-significance data
  // (HPI / all-time rank / occupation), the seed of the demand-ranked
  // onboarding queue. Best-effort: the card still works if Pantheon is
  // silent or doesn't cover the person.
  useEffect(() => {
    if (!requestCard) {
      setPantheon(null);
      return;
    }
    let cancelled = false;
    setPantheon(null);
    const param = requestCard.qid
      ? `qid=${encodeURIComponent(requestCard.qid)}`
      : `name=${encodeURIComponent(requestCard.person)}`;
    fetch(`/api/humans/pantheon?${param}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d?.found) return;
        if (d.hpi == null && d.rank == null && !d.occupation) return;
        setPantheon({ hpi: d.hpi, rank: d.rank, occupation: d.occupation });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [requestCard]);

  // Enter with no selection → problem-route via /api/match
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "person" && highlighted >= 0 && results[highlighted]) {
      selectHuman(results[highlighted]);
      return;
    }
    const q = query.trim();
    if (!q || matching) return;
    setOpen(false);
    setMatching(true);
    setRequestCard(null);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      if (data.type === "not_found" && data.person) {
        setRequestCard({ person: data.person, reason: data.reason || "" });
        setMatching(false);
        return;
      }
      // A problem or imported context brief can be deeply personal. Keep it
      // out of browser history, analytics URLs, and server logs. The matched
      // chat reads this once, removes it, and sends it as the first message.
      window.sessionStorage.setItem("summon_intake", q);
      router.push(
        `/chat/${data.slug}?reason=${encodeURIComponent(data.reason)}&intake=1`
      );
    } catch {
      setMatching(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => (h <= 0 ? results.length - 1 : h - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlighted(-1);
    }
  };

  const switchMode = (nextMode: "life" | "person") => {
    setMode(nextMode);
    setQuery("");
    setResults([]);
    setOpen(false);
    setRequestCard(null);
  };

  return (
    <div ref={boxRef} className="relative">
      <form onSubmit={handleSubmit}>
        <Card className="overflow-visible rounded-2xl bg-ink-950 py-0 text-white ring-1 ring-ink-950/15 [--card-spacing:--spacing(5)]">
          <CardHeader className="border-b border-white/10 px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-full bg-white/[0.07] p-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => switchMode("life")}
                  className={`h-11 rounded-full px-3 text-xs font-normal ${
                    mode === "life"
                      ? "bg-white text-ink-950 hover:bg-white"
                      : "text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Sparkles className="size-3.5" />
                  Find my guide
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => switchMode("person")}
                  className={`h-11 rounded-full px-3 text-xs font-normal ${
                    mode === "person"
                      ? "bg-white text-ink-950 hover:bg-white"
                      : "text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Search className="size-3.5" />
                  Name a person
                </Button>
              </div>
              <p className="text-[10px] tracking-[0.16em] text-white/35 uppercase">
                Private until you send
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-5 pt-5 sm:px-6">
            <label
              htmlFor="summon-intake"
              className="mb-2 block font-serif text-xl font-medium text-white sm:text-2xl"
            >
              {mode === "life"
                ? "What is happening in your life?"
                : "Who do you want to learn from?"}
            </label>
            <p className="mb-4 max-w-xl text-xs leading-relaxed text-white/50 sm:text-sm">
              {mode === "life"
                ? "Share the problem, goal, decision, or pattern that matters most right now. Summon will choose the guide whose real work fits it best."
                : "Search the hall or any notable human. People without a source-backed guide can be requested."}
            </p>
            <Textarea
              id="summon-intake"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                onKeyDown(event);
                if (event.key === "Enter" && !event.shiftKey && !open) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              onFocus={() => mode === "person" && results.length > 0 && setOpen(true)}
              placeholder={
                mode === "life"
                  ? "I am trying to decide whether to leave a stable path and build something of my own. I keep circling the decision..."
                  : "Paul Graham, Toni Morrison, David Deutsch..."
              }
              rows={mode === "life" ? 4 : 2}
              disabled={matching}
              className="min-h-28 resize-none rounded-xl border-white/10 bg-white/[0.06] px-4 py-3 text-base leading-relaxed text-white placeholder:text-white/30 focus-visible:border-white/25 focus-visible:ring-white/10 disabled:bg-white/[0.04] sm:min-h-32"
            />

            {mode === "life" && !query && (
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "I know what to do, but I keep avoiding it.",
                  "I need to decide what to build next.",
                  "My money feels out of control.",
                ].map((example) => (
                  <Button
                    key={example}
                    type="button"
                    variant="ghost"
                    onClick={() => setQuery(example)}
                    className="h-auto min-h-11 rounded-full border border-white/10 px-3 py-2 text-left text-[11px] font-normal leading-snug text-white/55 hover:bg-white/10 hover:text-white"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-5 flex flex-col gap-3 rounded-b-2xl border-t border-white/10 bg-white/[0.035] p-3 sm:flex-row sm:justify-between sm:px-4">
            {mode === "life" ? (
              <div className="flex flex-wrap items-center gap-1">
                <ContextImportDialog
                  onUseContext={(context) => {
                    setMode("life");
                    setQuery(context);
                  }}
                />
                <Link
                  href="/council"
                  className="inline-flex h-11 items-center rounded-full px-3 text-xs text-white/65 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Seat the council
                </Link>
              </div>
            ) : (
              <p className="px-2 text-[11px] leading-relaxed text-white/40">
                Searching Wikidata and {" "}
                <span className="text-white/60">{results.length || "the hall"}</span>
              </p>
            )}
            <Button
              type="submit"
              disabled={!query.trim() || matching}
              className="h-11 w-full rounded-full bg-white px-5 text-ink-950 hover:bg-warm-100 sm:w-auto"
            >
              {matching || searching ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <ArrowUp />
              )}
              {mode === "life" ? "Find my guide" : "Search humanity"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Typeahead: the index of humans */}
      {open && results.length > 0 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-warm-200 bg-white shadow-lg shadow-ink-950/10">
          {results.map((h, i) => (
            <button
              key={h.id}
              onClick={() => selectHuman(h)}
              onMouseEnter={() => setHighlighted(i)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                highlighted === i ? "bg-warm-100" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-warm-100 flex-shrink-0 border border-warm-200">
                {h.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={h.image}
                    alt=""
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-warm-500 text-xs font-serif">
                    {h.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-ink-950 text-sm font-medium truncate">
                    {h.name}
                  </span>
                  {years(h) && (
                    <span className="text-warm-400 text-[11px] flex-shrink-0">
                      {years(h)}
                    </span>
                  )}
                </div>
                <p className="text-warm-500 text-xs truncate">{h.description}</p>
              </div>
              {h.onPlatform ? (
                <span className="flex-shrink-0 text-[10px] tracking-[0.15em] uppercase text-ink-950 border border-warm-300 rounded-full px-2.5 py-1">
                  In the hall
                </span>
              ) : (
                <span className="flex-shrink-0 text-[10px] tracking-[0.15em] uppercase text-warm-500 border border-warm-200 rounded-full px-2.5 py-1">
                  Not summoned
                </span>
              )}
            </button>
          ))}
          <div className="px-4 py-2.5 border-t border-warm-200 text-warm-500 text-[11px]">
            Searching all of humanity via Wikidata. Press Enter to select.
          </div>
        </div>
      )}

      {/* Not-summoned-yet request card */}
      {requestCard && (
        <div className="mt-4 bg-white border border-warm-200 rounded-xl p-5 md:p-6">
          <p className="text-warm-500 text-[11px] tracking-[0.2em] uppercase mb-2 font-medium">
            Not summoned yet
          </p>
          <p className="text-ink-950 text-base md:text-lg font-serif font-medium leading-snug mb-2">
            {requestCard.person}
            {requestCard.years ? (
              <span className="text-warm-400 text-sm font-sans font-normal">
                {" "}
                · {requestCard.years}
              </span>
            ) : null}
          </p>
          <p className="text-warm-500 text-sm leading-relaxed mb-4">
            {requestCard.reason ||
              `We only summon guides we can ground in real primary sources. ${requestCard.person} is on the onboarding list.`}
          </p>

          {/* Historical-significance strip, MIT Pantheon HPI */}
          {pantheon && (pantheon.hpi != null || pantheon.occupation) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 py-2.5 px-3.5 rounded-xl bg-warm-50 border border-warm-200">
              {pantheon.rank != null && (
                <span className="text-warm-500 text-xs">
                  <span className="text-ink-950 font-medium">
                    #{pantheon.rank.toLocaleString()}
                  </span>{" "}
                  most notable human, all time
                </span>
              )}
              {pantheon.hpi != null && (
                <span className="text-warm-400 text-xs">
                  HPI{" "}
                  <span className="text-warm-500 font-medium">{pantheon.hpi}</span>
                </span>
              )}
              {pantheon.occupation && (
                <span className="text-warm-400 text-xs">
                  {pantheon.occupation}
                </span>
              )}
              <span className="text-warm-400 text-[10px] tracking-wide ml-auto">
                via MIT Pantheon
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:adamtpang@gmail.com?subject=${encodeURIComponent(
                `Summon request: ${requestCard.person}`
              )}&body=${encodeURIComponent(
                `Please add ${requestCard.person} to summon.guide.`
              )}`}
              className="inline-flex min-h-11 items-center gap-2 bg-ink-950 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-ink-800 transition-colors"
            >
              Request {requestCard.person.split(" ")[0]}
            </a>
            {requestCard.wikipediaUrl && (
              <a
                href={requestCard.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border border-warm-300 text-warm-500 rounded-full px-5 py-2.5 text-sm font-medium hover:border-ink-950 hover:text-ink-950 transition-colors"
              >
                Wikipedia
              </a>
            )}
            <button
              onClick={() => {
                setRequestCard(null);
                setQuery("");
              }}
              className="inline-flex min-h-11 items-center gap-2 border border-warm-300 text-warm-500 rounded-full px-5 py-2.5 text-sm font-medium hover:border-ink-950 hover:text-ink-950 transition-colors"
            >
              Browse the hall
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
