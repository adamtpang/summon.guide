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
  // An honest answer when no guide fits, or when the message signals danger.
  const [notice, setNotice] = useState<null | { kind: "no_fit" | "crisis"; text: string; links: { label: string; href: string }[] }>(null);

  const send = async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setBusy(true);
    setError("");
    setNotice(null);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      if (data.type === "crisis") {
        setNotice({ kind: "crisis", text: data.message, links: data.links || [] });
        setBusy(false);
        return;
      }
      if (data.type === "no_fit") {
        setNotice({
          kind: "no_fit",
          text: `${data.reason} Tell us who has lived it, and we will research them.`,
          links: [{ label: "Request a guide", href: "/summon#request-guide" }],
        });
        setBusy(false);
        return;
      }
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
        className="flex w-full items-center gap-2 rounded-full border border-edge bg-raised/95 py-1.5 pl-3 pr-1.5 shadow-[0_10px_40px_rgba(35,33,29,0.10)] backdrop-blur-md focus-within:border-moon/30"
      >
        <label htmlFor="stuck" className="sr-only">What is stuck</label>
        <textarea
          id="stuck"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(text); } }}
          rows={1}
          autoFocus
          disabled={busy}
          placeholder="Say what is in your way."
          className="min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 font-serif text-lg leading-snug text-moon outline-none placeholder:italic placeholder:text-dim"
        />
        <button
          type="submit"
          disabled={busy || !text.trim()}
          aria-label="Find my guide"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-moon text-night transition-opacity disabled:opacity-30"
        >
          {busy ? <LoaderCircle className="size-5 animate-spin" /> : <ArrowUp className="size-5" />}
        </button>
      </form>
      {error && <p role="alert" className="text-sm text-mist">{error}</p>}
      {notice && (
        <div role={notice.kind === "crisis" ? "alert" : "status"} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm leading-relaxed ${notice.kind === "crisis" ? "border-gold-500/50 bg-raised text-moon" : "border-edge bg-raised/90 text-mist"}`}>
          <p>{notice.text}</p>
          <div className="mt-2 flex flex-wrap gap-x-4">
            {notice.links.map((link) => (
              <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-moon">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            disabled={busy}
            onClick={() => { setText(example); void send(example); }}
            className="min-h-10 rounded-full border border-edge bg-raised/80 px-3.5 font-serif text-[15px] italic text-mist backdrop-blur-sm transition-colors hover:border-moon/30 hover:text-moon"
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
            className="min-h-11 w-full rounded-full border border-edge bg-raised/90 px-4 text-center text-sm text-moon outline-none placeholder:text-moon/30 focus:border-moon/25"
          />
          {guideMatches.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-edge bg-raised text-left shadow-xl">
              {guideMatches.map((g) => (
                <li key={g.slug}>
                  <button type="button" onClick={() => openGuide(g)} className="block min-h-11 w-full px-4 text-left text-sm text-moon/85 hover:bg-moon/10">{g.name}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <button type="button" onClick={() => setNaming(true)} className="min-h-11 text-sm text-mist underline underline-offset-4 hover:text-moon">
          or name a guide
        </button>
      )}
    </div>
  );
}
