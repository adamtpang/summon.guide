"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, LoaderCircle } from "lucide-react";

// The homepage's one action: say what is stuck, get routed to the guide whose
// documented life fits it. Same /api/match route and session-storage handoff
// as the old HumanSearch, so nothing personal touches a URL.

const EXAMPLES = [
  "I know what to do, but I keep avoiding it.",
  "I need to decide what to build next.",
  "My money feels out of control.",
];

export type GuideOption = { slug: string; name: string; path: string };

export default function StuckBox({ guides }: { guides: GuideOption[] }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState("");
  const guideMatches = name.trim().length
    ? guides.filter((g) => g.name.toLowerCase().includes(name.trim().toLowerCase())).slice(0, 5)
    : [];
  const openGuide = (g: GuideOption) => router.push(g.path);
  const [error, setError] = useState("");

  const send = async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      if (!res.ok || !data.slug) {
        setError(data.type === "not_found" && data.person
          ? `No guide for ${data.person} yet. Ask for one on the roster.`
          : "Could not find a guide right now. Try again.");
        setBusy(false);
        return;
      }
      window.sessionStorage.setItem("summon_intake", q);
      router.push(`/${data.slug}?reason=${encodeURIComponent(data.reason || "")}&intake=1`);
    } catch {
      setError("Could not find a guide right now. Try again.");
      setBusy(false);
    }
  };

  return (
    <div className="flex w-full max-w-[640px] flex-col items-center gap-4">
      <form
        onSubmit={(e) => { e.preventDefault(); void send(text); }}
        className="flex w-full items-end gap-2 rounded-[20px] border border-white/10 bg-white/[0.05] p-2.5 focus-within:border-white/25"
      >
        <label htmlFor="stuck" className="sr-only">What is stuck</label>
        <textarea
          id="stuck"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(text); } }}
          rows={2}
          autoFocus
          disabled={busy}
          placeholder="I keep adding features instead of finding users."
          className="min-h-16 flex-1 resize-none bg-transparent px-3 py-2.5 text-base leading-relaxed text-white outline-none placeholder:text-white/30"
        />
        <button
          type="submit"
          disabled={busy || !text.trim()}
          aria-label="Find my guide"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#c9a860] text-[#0b0e13] transition-opacity disabled:opacity-40"
        >
          {busy ? <LoaderCircle className="size-5 animate-spin" /> : <ArrowUp className="size-5" />}
        </button>
      </form>
      {error && <p role="alert" className="text-sm text-white/70">{error}</p>}
      <div className="flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            disabled={busy}
            onClick={() => { setText(example); void send(example); }}
            className="min-h-10 rounded-full border border-white/10 px-3.5 text-[13px] text-white/55 transition-colors hover:bg-white/10 hover:text-white"
          >
            {example}
          </button>
        ))}
      </div>
      {naming ? (
        <div className="relative w-full max-w-xs">
          <label htmlFor="guide-name" className="sr-only">Name a guide</label>
          <input
            id="guide-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && guideMatches[0]) { e.preventDefault(); openGuide(guideMatches[0]); } if (e.key === "Escape") setNaming(false); }}
            autoFocus
            placeholder="Franklin, Buffett, Seneca..."
            className="min-h-11 w-full rounded-full border border-white/10 bg-white/[0.05] px-4 text-center text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
          />
          {guideMatches.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#12161d] text-left shadow-xl">
              {guideMatches.map((g) => (
                <li key={g.slug}>
                  <button type="button" onClick={() => openGuide(g)} className="block min-h-11 w-full px-4 text-left text-sm text-white/85 hover:bg-white/10">{g.name}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <button type="button" onClick={() => setNaming(true)} className="min-h-11 text-sm text-white/45 underline underline-offset-4 hover:text-white">
          or name a guide
        </button>
      )}
    </div>
  );
}
