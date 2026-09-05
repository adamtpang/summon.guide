"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ChevronDown, ChevronUp, LoaderCircle, RefreshCw, Sparkles } from "lucide-react";

import ContextImportDialog from "@/components/ContextImportDialog";
import { Button } from "@/components/ui/button";
import type { CouncilSeat } from "@/lib/council";
import type { CouncilResponse } from "@/app/api/council/route";

// The council room. Loads the life-context brief themain.quest mailed over,
// seats the guides whose lives answer it, and hands the chosen seat its
// question through the same session-storage intake the homepage uses, so
// the guide receives the brief as an attached "Personal context" message
// and nothing personal ever touches a URL.

type Phase =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ready"; data: CouncilResponse }
  | { kind: "empty"; hint: string }
  | { kind: "error"; message: string };

export default function CouncilRoom() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [showBrief, setShowBrief] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  const seat = useCallback(async (brief?: string) => {
    setPhase({ kind: "loading" });
    try {
      const res = await fetch("/api/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief ? { brief } : {}),
      });
      const data = (await res.json()) as CouncilResponse & { error?: string; hint?: string };
      if (res.status === 404) {
        setPhase({ kind: "empty", hint: data.hint || "No life context is available yet." });
        return;
      }
      if (!res.ok || data.error) {
        setPhase({ kind: "error", message: data.error || `The council could not be seated (${res.status}).` });
        return;
      }
      setPhase({ kind: "ready", data });
    } catch (error) {
      setPhase({ kind: "error", message: error instanceof Error ? error.message : "Network error" });
    }
  }, []);

  // Seat once the identity is known. Deferred a tick, like the chat page's
  // intake auto-send, so the fetch and its state updates run outside the
  // effect body itself.
  const autoSeated = useRef(false);
  useEffect(() => {
    if (sessionStatus !== "authenticated" || autoSeated.current) return;
    const timer = window.setTimeout(() => {
      autoSeated.current = true;
      void seat();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [sessionStatus, seat]);

  const continueWithGoogle = async () => {
    setSigningIn(true);
    await signIn("google", { redirectTo: "/council" });
    setSigningIn(false);
  };

  const askSeat = (data: CouncilResponse, chosen: CouncilSeat) => {
    const intake = `${data.brief.trimEnd()}\n\n## My question for ${chosen.name}\n${chosen.ask}`;
    try {
      window.sessionStorage.setItem("summon_intake", intake);
    } catch {
      // Session storage can be unavailable in private modes; the chat page
      // then shows an empty composer and the user can paste the brief.
    }
    const reason = encodeURIComponent(chosen.reason.slice(0, 160));
    router.push(`/chat/${chosen.slug}?reason=${reason}&intake=1`);
  };

  if (sessionStatus === "loading") {
    return <Waiting label="Checking your Summon identity" />;
  }

  if (!session?.user) {
    return (
      <section className="rounded-2xl border border-warm-200 bg-white/70 p-6 sm:p-8">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-warm-500">
          Free testing access
        </p>
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink-950">
          The council sits for a signed-in person.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-warm-500">
          Your life context is read only after you sign in, and it is attached
          to the guide chat for this browser session only. Summon does not
          save it to your account.
        </p>
        <Button
          onClick={continueWithGoogle}
          disabled={signingIn}
          className="mt-6 h-12 rounded-full bg-ink-950 px-6 text-white hover:bg-ink-800"
        >
          <span aria-hidden className="mr-2 flex size-6 items-center justify-center rounded-full bg-white font-sans text-sm font-semibold text-ink-950">
            G
          </span>
          {signingIn ? "Opening Google..." : "Continue with Google"}
        </Button>
      </section>
    );
  }

  if (phase.kind === "idle" || phase.kind === "loading") {
    return <Waiting label="Reading your life context and seating the council" />;
  }

  if (phase.kind === "empty" || phase.kind === "error") {
    return (
      <section className="space-y-5 rounded-2xl border border-warm-200 bg-white/70 p-6 sm:p-8">
        <div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-warm-500">
            {phase.kind === "empty" ? "No brief yet" : "Something went wrong"}
          </p>
          <h2 className="font-serif text-2xl font-medium tracking-tight text-ink-950">
            {phase.kind === "empty" ? "themain.quest has not sent a brief." : "The council could not be seated."}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-warm-500">
            {phase.kind === "empty" ? phase.hint : phase.message}
          </p>
        </div>
        {phase.kind === "empty" && (
          <pre className="overflow-x-auto rounded-xl bg-ink-950 px-4 py-3 font-mono text-[12px] leading-relaxed text-warm-100">
            cd themain.quest{"\n"}npm run life:context -- --send
          </pre>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => seat()}
            className="h-11 rounded-full border-warm-300 bg-white px-5 text-ink-950 hover:bg-warm-100"
          >
            <RefreshCw className="size-4" />
            Check the mailbox again
          </Button>
          <div className="rounded-full bg-ink-950 text-white [&_button]:text-white/80 [&_button:hover]:bg-ink-800 [&_button:hover]:text-white">
            <ContextImportDialog onUseContext={(context) => seat(context)} />
          </div>
        </div>
      </section>
    );
  }

  const { data } = phase;
  const [primary, ...others] = data.council;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-warm-200 bg-white/70">
        <button
          type="button"
          onClick={() => setShowBrief((open) => !open)}
          aria-expanded={showBrief}
          className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-warm-500">
              {data.source.kind === "themain.quest" ? "Life context from themain.quest" : "Pasted life context"}
            </p>
            <p className="mt-1 text-sm text-ink-950">
              {data.source.kind === "themain.quest"
                ? `Sent ${new Date(data.source.createdAt).toLocaleString()}`
                : "Attached for this session only"}
              {" · "}
              <span className="text-warm-500">
                {data.seatedBy === "model" ? "seated by the router" : "seated by domain overlap, the router was unavailable"}
              </span>
            </p>
          </div>
          {showBrief ? <ChevronUp className="size-5 shrink-0 text-warm-500" /> : <ChevronDown className="size-5 shrink-0 text-warm-500" />}
        </button>
        {showBrief && (
          <pre className="max-h-[50vh] overflow-auto whitespace-pre-wrap border-t border-warm-200 px-5 py-4 font-mono text-[12px] leading-relaxed text-ink-950/80 sm:px-6">
            {data.brief}
          </pre>
        )}
      </section>

      {primary && (
        <SeatCard seat={primary} primary onAsk={() => askSeat(data, primary)} />
      )}

      {others.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {others.map((member) => (
            <SeatCard key={member.slug} seat={member} onAsk={() => askSeat(data, member)} />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-warm-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-relaxed text-warm-500">
          Each seat opens a normal guide chat with your brief attached as the first message.
          Re-run <code className="font-mono">npm run life:context -- --send</code> in themain.quest whenever the questbook changes.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => seat()}
          className="h-11 shrink-0 rounded-full border-warm-300 bg-white px-5 text-ink-950 hover:bg-warm-100"
        >
          <RefreshCw className="size-4" />
          Reseat the council
        </Button>
      </div>
    </div>
  );
}

function Waiting({ label }: { label: string }) {
  return (
    <div role="status" className="flex min-h-40 items-center justify-center gap-3 rounded-2xl border border-warm-200 bg-white/70 p-8 text-sm text-warm-500">
      <LoaderCircle className="size-5 animate-spin" />
      {label}
    </div>
  );
}

function SeatCard({ seat, primary = false, onAsk }: { seat: CouncilSeat; primary?: boolean; onAsk: () => void }) {
  return (
    <article
      className={
        primary
          ? "relative overflow-hidden rounded-2xl border border-ink-950/15 bg-ink-950 text-warm-50 shadow-xl"
          : "relative overflow-hidden rounded-2xl border border-warm-200 bg-white/80 text-ink-950"
      }
    >
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-7">
        <div className={`relative size-20 shrink-0 overflow-hidden rounded-full ${primary ? "ring-2 ring-warm-50/30" : "ring-1 ring-warm-200"}`}>
          {seat.portrait ? (
            <Image src={seat.portrait} alt={seat.name} fill className="object-cover object-top" sizes="80px" />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-warm-200 to-warm-400 font-serif text-2xl text-ink-950">
              {seat.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] ${primary ? "text-warm-300" : "text-warm-500"}`}>
            {primary && <Sparkles className="size-3.5" />}
            {primary ? "Speak to this one first" : "Also on the council"}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
            {seat.name}
            <span className={`ml-2 font-sans text-sm font-normal ${primary ? "text-warm-300" : "text-warm-500"}`}>{seat.era}</span>
          </h2>
          <p className={`mt-1 text-sm font-medium ${primary ? "text-warm-100" : "text-ink-950"}`}>{seat.role}</p>
          <p className={`mt-3 text-sm leading-relaxed ${primary ? "text-warm-200" : "text-warm-500"}`}>{seat.reason}</p>
          <blockquote className={`mt-4 border-l-2 pl-4 text-sm italic leading-relaxed ${primary ? "border-warm-50/30 text-warm-50" : "border-warm-300 text-ink-950/85"}`}>
            {seat.ask}
          </blockquote>
          {seat.skill && (
            <p className={`mt-4 text-[12px] leading-relaxed ${primary ? "text-warm-300" : "text-warm-500"}`}>
              Playbook: <Link href={`/skills`} className="underline underline-offset-2">{seat.skill.title}</Link>
              {" · "}{seat.skill.why}
            </p>
          )}
          <Button
            type="button"
            onClick={onAsk}
            className={
              primary
                ? "mt-6 h-12 rounded-full bg-warm-50 px-6 text-ink-950 hover:bg-white"
                : "mt-6 h-11 rounded-full bg-ink-950 px-5 text-white hover:bg-ink-800"
            }
          >
            Ask {seat.name.split(" ")[0]}
          </Button>
        </div>
      </div>
    </article>
  );
}
