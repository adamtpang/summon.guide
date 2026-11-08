import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import AuthButton from "@/components/AuthButton";
import CouncilThread from "@/components/CouncilThread";
import { seatFromFigure } from "@/lib/council";
import { DEMO_BRIEF, DEMO_COUNCIL_SLUGS, devDemoUserId, seatModelsEnabled } from "@/lib/councilModels";
import { getFigure } from "@/lib/figures";

export const metadata: Metadata = {
  title: "Council demo | summon.guide",
  robots: { index: false },
};

// A fixed four-guide council on a synthetic brief, each guide on its own
// OpenRouter model. Exists only when COUNCIL_SEAT_MODELS=on, so production
// without the flag serves a 404 here. Sign-in is still required, except on a
// local development server with COUNCIL_DEMO_USER set.
export default async function CouncilDemoPage() {
  if (!seatModelsEnabled()) notFound();
  const session = await auth();
  const signedIn = Boolean(session?.user?.id || devDemoUserId());

  const seats = DEMO_COUNCIL_SLUGS.map((slug) => getFigure(slug))
    .filter((figure) => figure !== undefined)
    .map((figure) => seatFromFigure(figure, {}));

  return (
    <main className="min-h-screen bg-night text-moon">
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 md:pt-12">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="text-xs uppercase tracking-[0.3em] text-mist transition-colors hover:text-moon">
            summon.guide
          </Link>
          <AuthButton />
        </header>
        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">The council, one model per guide</h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          {seats.map((s) => s.name).join(", ")} answer in turn, then a synthesis. Each runs on a different OpenRouter
          model; the model, latency, tokens and cost appear under each voice. The brief below is synthetic.
        </p>
        <details className="mt-4 rounded-2xl border border-edge p-4 text-sm text-mist">
          <summary className="cursor-pointer">Demo brief</summary>
          <pre className="mt-3 whitespace-pre-wrap font-sans">{DEMO_BRIEF}</pre>
        </details>
        <div className="mt-8">
          {signedIn ? (
            <CouncilThread brief={DEMO_BRIEF} seats={seats} />
          ) : (
            <p className="text-sm text-mist">Sign in to convene the council.</p>
          )}
        </div>
      </div>
    </main>
  );
}
