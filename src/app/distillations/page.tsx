import type { Metadata } from "next";
import Link from "next/link";
import { DistillationExplorer } from "@/components/DistillationExplorer";
import { getAllDistillations } from "@/lib/distillations";

export const metadata: Metadata = {
  title: "One-page distillations | summon.guide",
  description: "Preview the operating ideas behind every source-backed guide, channel, book, and course corpus.",
};

export default function DistillationsPage() {
  const items = getAllDistillations();

  return (
    <main className="min-h-screen bg-night text-moon">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <Link href="/" className="text-sm text-dim transition-colors hover:text-moon">← summon.guide</Link>
        <div className="mt-12 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-500">The distilled library</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.02] sm:text-7xl">The one page worth reading first.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
            Every file compresses a guide, channel, book, or course into the decisions it changes: what to do, what to avoid, and what to hold in your head.
          </p>
        </div>
        <DistillationExplorer items={items} />
      </div>
    </main>
  );
}
