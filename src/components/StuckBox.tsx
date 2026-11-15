"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

// The homepage's one action: say what is stuck, get routed to the guide whose
// documented life fits it. Same /api/match route and session-storage handoff
// as the old HumanSearch, so nothing personal touches a URL.

const EXAMPLES = [
  "I know what to do, but I keep avoiding it.",
  "I need to decide what to build next.",
  "My money feels out of control.",
];

export type GuideOption = { slug: string; name: string; path: string };

export default function StuckBox({}: { guides?: GuideOption[] }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
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
    <div className="flex w-full max-w-[680px] flex-col items-center gap-4">
      <form
        onSubmit={(e) => { e.preventDefault(); void send(text); }}
        className="flex w-full items-end gap-2 rounded-[3px] border border-moon/70 bg-raised p-2 shadow-[0_1px_0_var(--color-moon)] focus-within:border-lapis focus-within:shadow-[0_1px_0_var(--color-lapis)]"
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
          placeholder="Say what is in your way, in your own words."
          className="min-h-[3.25rem] flex-1 resize-none bg-transparent px-2.5 py-2 text-[17px] leading-snug text-moon outline-0 placeholder:text-dim focus-visible:outline-0"
        />
        <button
          type="submit"
          disabled={busy || !text.trim()}
          aria-label="Find my guide"
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[2px] bg-lapis px-4 text-[15px] font-medium text-night transition-colors hover:bg-lapis-deep disabled:bg-moon/25"
        >
          {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}{busy ? "Finding" : "Find my guide"}
        </button>
      </form>
      {error && <p role="alert" className="text-sm text-mist">{error}</p>}
      {notice && (
        <div role={notice.kind === "crisis" ? "alert" : "status"} className={`w-full rounded-[3px] border px-4 py-3 text-left text-[15px] leading-relaxed ${notice.kind === "crisis" ? "border-lapis bg-raised text-moon" : "border-edge bg-raised text-mist"}`}>
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
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-0">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            disabled={busy}
            onClick={() => { setText(example); void send(example); }}
            className="min-h-11 text-[15px] text-mist underline decoration-edge decoration-1 underline-offset-[5px] transition-colors hover:text-lapis hover:decoration-lapis"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
