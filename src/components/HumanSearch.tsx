"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
    if (q.length < 2) {
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
  }, [query]);

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
        router.push(`/${h.onPlatform}`);
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
  // (HPI / all-time rank / occupation) — the seed of the demand-ranked
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
    if (highlighted >= 0 && results[highlighted]) {
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
      router.push(
        `/chat/${data.slug}?reason=${encodeURIComponent(data.reason)}&q=${encodeURIComponent(q)}`
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

  return (
    <div ref={boxRef} className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          {/* Gold glow behind the summoning circle */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-gold-500/40 via-gold-500/10 to-gold-500/40 opacity-40 group-focus-within:opacity-100 blur-[2px] transition-opacity duration-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Summon anyone — a name, or a problem…"
            disabled={matching}
            className="relative w-full bg-ink-900 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-warm-50 text-base placeholder:text-warm-500 focus:outline-none focus:border-gold-500/60 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!query.trim() || matching}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center disabled:opacity-20 hover:bg-gold-600 active:scale-95 transition-all"
            title="Summon"
          >
            {matching || searching ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Typeahead: the index of humans */}
      {open && results.length > 0 && (
        <div className="absolute z-30 mt-2 w-full bg-ink-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          {results.map((h, i) => (
            <button
              key={h.id}
              onClick={() => selectHuman(h)}
              onMouseEnter={() => setHighlighted(i)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                highlighted === i ? "bg-white/5" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-white/5 flex-shrink-0 border border-white/10">
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
                  <span className="text-warm-50 text-sm font-medium truncate">
                    {h.name}
                  </span>
                  {years(h) && (
                    <span className="text-warm-500 text-[11px] flex-shrink-0">
                      {years(h)}
                    </span>
                  )}
                </div>
                <p className="text-warm-500 text-xs truncate">{h.description}</p>
              </div>
              {h.onPlatform ? (
                <span className="flex-shrink-0 text-[10px] tracking-[0.15em] uppercase text-gold-500 border border-gold-500/40 rounded-full px-2.5 py-1">
                  In the hall
                </span>
              ) : (
                <span className="flex-shrink-0 text-[10px] tracking-[0.15em] uppercase text-warm-500 border border-white/10 rounded-full px-2.5 py-1">
                  Not summoned
                </span>
              )}
            </button>
          ))}
          <div className="px-4 py-2.5 border-t border-white/5 text-warm-500 text-[11px]">
            Searching all of humanity via Wikidata · press Enter to describe a
            problem instead
          </div>
        </div>
      )}

      {/* Not-summoned-yet request card */}
      {requestCard && (
        <div className="mt-4 bg-ink-900 border border-white/10 rounded-2xl p-5 md:p-6">
          <p className="text-gold-500 text-[11px] tracking-[0.2em] uppercase mb-2">
            Not summoned yet
          </p>
          <p className="text-warm-50 text-base md:text-lg font-serif font-medium leading-snug mb-2">
            {requestCard.person}
            {requestCard.years ? (
              <span className="text-warm-500 text-sm font-sans font-normal">
                {" "}
                · {requestCard.years}
              </span>
            ) : null}
          </p>
          <p className="text-warm-400 text-sm leading-relaxed mb-4">
            {requestCard.reason ||
              `We only summon guides we can ground in real primary sources. ${requestCard.person} is on the onboarding list.`}
          </p>

          {/* Historical-significance strip — MIT Pantheon HPI */}
          {pantheon && (pantheon.hpi != null || pantheon.occupation) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 py-2.5 px-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              {pantheon.rank != null && (
                <span className="text-warm-300 text-xs">
                  <span className="text-gold-500 font-medium">
                    #{pantheon.rank.toLocaleString()}
                  </span>{" "}
                  most notable human, all time
                </span>
              )}
              {pantheon.hpi != null && (
                <span className="text-warm-500 text-xs">
                  HPI{" "}
                  <span className="text-warm-300 font-medium">{pantheon.hpi}</span>
                </span>
              )}
              {pantheon.occupation && (
                <span className="text-warm-500 text-xs">
                  {pantheon.occupation}
                </span>
              )}
              <span className="text-warm-500 text-[10px] tracking-wide ml-auto">
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
              className="inline-flex items-center gap-2 bg-gold-500 text-ink-950 rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gold-600 transition-colors"
            >
              Request {requestCard.person.split(" ")[0]}
            </a>
            {requestCard.wikipediaUrl && (
              <a
                href={requestCard.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 text-warm-300 rounded-full px-5 py-2.5 text-sm font-medium hover:border-gold-500/60 hover:text-warm-50 transition-colors"
              >
                Wikipedia
              </a>
            )}
            <button
              onClick={() => {
                setRequestCard(null);
                setQuery("");
              }}
              className="inline-flex items-center gap-2 border border-white/15 text-warm-300 rounded-full px-5 py-2.5 text-sm font-medium hover:border-gold-500/60 hover:text-warm-50 transition-colors"
            >
              Browse the hall
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
