import Link from "next/link";
import type { Metadata } from "next";
import { figures } from "@/lib/figures";

export const metadata: Metadata = {
  title: "About | summon.guide",
  description:
    "Who runs summon.guide, what the AI guides are and are not, and how to get in touch.",
  alternates: { canonical: "https://summon.guide/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-night text-moon">
      <div className="mx-auto max-w-2xl px-6 pb-20 pt-8 md:pt-14">
        <Link href="/" className="font-display text-xs uppercase tracking-[0.35em] text-blue-600">
          summon.guide
        </Link>
        <h1 className="mb-10 mt-5 font-serif text-[32px] font-medium leading-[1.08] tracking-tight md:text-[44px]">
          About summon.guide
        </h1>

        <div className="space-y-8 text-sm leading-relaxed text-mist [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-moon">
          <p>
            summon.guide is a mentorship site built on AI guides. Each of the {figures.length} guides is modeled on a
            real person, book, or channel and grounded in that source&apos;s public work, such as biographies, letters,
            essays, and interviews. A visitor describes what is stuck, and summon.guide matches the problem to the guide
            best suited to it.
          </p>

          <section>
            <h2>Who runs it</h2>
            <p>
              summon.guide is built and operated by Adam Pang. More about his work is at{" "}
              <a href="https://adampang.com" rel="noopener noreferrer">adampang.com</a>. The source code is public at{" "}
              <a href="https://github.com/adamtpang/summon.guide" rel="noopener noreferrer">
                github.com/adamtpang/summon.guide
              </a>
              .
            </p>
          </section>

          <section>
            <h2>What the guides are</h2>
            <p>
              Every guide on summon.guide is an AI perspective inspired by public material. A guide is not the real
              person, does not speak for them, and does not imply their endorsement. Source coverage varies from guide to
              guide, and newly researched guides are provisional. The guides do not give personalized legal, medical, or
              financial advice.
            </p>
            <p className="mt-4">
              Image sources and licenses are listed on the <Link href="/credits">credits page</Link>. What the site
              collects and which services process it is described in the <Link href="/privacy">privacy policy</Link>.
            </p>
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <p>
              Questions, corrections, guide requests, and data deletion requests go to{" "}
              <a href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-edge pt-6">
          <Link href="/" className="text-xs text-mist transition-colors hover:text-blue-600">
            &larr; Back to summon.guide
          </Link>
        </div>
      </div>
    </main>
  );
}
