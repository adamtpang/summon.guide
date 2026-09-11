import Link from "next/link";
import type { Metadata } from "next";
import CouncilRoom from "@/components/CouncilRoom";

export const metadata: Metadata = {
  title: "The Council | summon.guide",
  description:
    "Bring your life context from themain.quest and let the guides whose lives answer it speak first.",
  robots: { index: false },
};

// The council room reads a personal brief and seats guides around it. It is
// deliberately not indexed: the page is for a signed-in person's own life,
// not a landing page.
export default function CouncilPage() {
  return (
    <main className="min-h-screen bg-warm-50 text-ink-950">
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 md:pt-12">
        <header className="mb-10 flex items-center justify-between gap-4">
          <Link href="/" className="text-xs uppercase tracking-[0.3em] text-warm-500 transition-colors hover:text-ink-950">
            summon.guide
          </Link>
          <nav className="flex items-center gap-4 text-sm text-warm-500">
            <Link href="/summon" className="transition-colors hover:text-ink-950">Roster</Link>
            <Link href="/skills" className="hidden transition-colors hover:text-ink-950 sm:inline">Skills</Link>
          </nav>
        </header>

        <section className="mb-10 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-warm-500">The council</p>
          <h1 className="font-serif text-4xl leading-[1.02] tracking-tight md:text-5xl">
            Your past lives are listening.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-warm-500 md:text-lg">
            themain.quest sends the real quest: the boss, the fork, the one move,
            the conditions that keep blocking action. The guides whose own lives
            answer it are seated here, each with the first question worth asking.
            Speak to the primary seat first.
          </p>
        </section>

        <CouncilRoom />
      </div>
    </main>
  );
}
