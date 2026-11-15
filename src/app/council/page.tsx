import type { Metadata } from "next";
import CouncilRoom from "@/components/CouncilRoom";
import SiteHeader from "@/components/SiteHeader";

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
    <main className="min-h-screen bg-night text-moon">
      <SiteHeader current="/council" />
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 md:pt-12">

        <section className="mb-10 max-w-2xl">
          <h1 className="font-serif text-5xl font-medium leading-none md:text-7xl">
            Your heroes. Your real life.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
            Bring what you are struggling with from themain.quest. Review your
            situation, meet three guides with different perspectives, and start
            with the one best suited to your next decision. These are AI guides
            grounded in their public work and lives.
          </p>
        </section>

        <CouncilRoom />
      </div>
    </main>
  );
}
