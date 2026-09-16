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

export default function StuckBox() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
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
    </div>
  );
}
