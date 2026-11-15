import Image from "next/image";
import Link from "next/link";
import HeroSelect, { type Hero } from "@/components/HeroSelect";
import PurchaseSuccessModal from "@/components/PurchaseSuccessModal";
import SiteHeader from "@/components/SiteHeader";
import StuckBox from "@/components/StuckBox";
import { guidePath } from "@/lib/guideUrls";
import { curatedFigures, GUIDE_LINES, GUIDE_TITLES } from "@/lib/curated";

// Server Component on purpose: the raw first response carries the real
// headline and every guide's name for crawlers. The only interactive piece,
// the ask box, is a client island. The frieze is a public-domain drawing
// (Stuart and Revett's Parthenon); its source is on /credits.
export default function Home() {
  const heroes: Hero[] = [...curatedFigures]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((f) => ({
      slug: f.slug,
      name: f.name,
      href: guidePath(f.slug),
      aboutHref: `${guidePath(f.slug)}/about`,
      portrait: f.portrait,
      era: f.era.replace("-", " to "),
      location: f.location,
      title: GUIDE_TITLES[f.slug] ?? "",
      line: GUIDE_LINES[f.slug] ?? f.knownFor,
      askAbout: f.domains.slice(0, 4),
    }));
  return (
    <main className="flex min-h-screen flex-col bg-night text-moon">
      <SiteHeader />

      <HeroSelect
        heroes={heroes}
        intro={
          <>
            <h1 className="max-w-[13ch] font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl">
              The greatest humans who ever lived will see you now.
            </h1>
            <p className="mt-5 max-w-md font-serif text-xl leading-snug text-mist">
              Say what is stuck. You will be sent to the one who lived it, and they answer from their own words.
            </p>
            <div className="mt-7 max-w-xl">
              <StuckBox />
            </div>
          </>
        }
      />

      <section aria-label="Other ways in" className="relative overflow-hidden border-t border-edge">
        <Image
          src="/scenes/parthenon.webp"
          alt=""
          aria-hidden
          width={1410}
          height={959}
          sizes="100vw"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[50%_38%] opacity-45 mix-blend-multiply"
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 sm:py-24">
          <Link href="/council" className="group block max-w-md">
            <h2 className="font-serif text-4xl font-medium group-hover:text-lapis">The council</h2>
            <p className="mt-3 text-[17px] leading-relaxed text-mist">
              Seat three guides around one decision and hear where they disagree before you choose.
            </p>
            <span className="mt-4 inline-block text-[15px] font-medium text-lapis underline decoration-1 underline-offset-[5px]">Seat a council</span>
          </Link>
          <Link href="/sage" className="group block max-w-md">
            <h2 className="font-serif text-4xl font-medium group-hover:text-lapis">Sage</h2>
            <p className="mt-3 text-[17px] leading-relaxed text-mist">
              Ask one question across every episode of the Founders podcast at once, with the episodes cited.
            </p>
            <span className="mt-4 inline-block text-[15px] font-medium text-lapis underline decoration-1 underline-offset-[5px]">Ask Sage</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="how-it-works" className="border-t border-edge bg-raised px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-x-16 gap-y-8 md:grid-cols-[1fr_2fr]">
          <h2 id="how-it-works" className="font-serif text-4xl font-medium leading-tight sm:text-5xl">How summon.guide works</h2>
          <div className="max-w-[62ch] space-y-5 text-[17px] leading-[1.7] text-mist">
            <p>
              summon.guide is a mentorship site built on AI guides. Each guide is modeled on a real person and grounded
              in that person&apos;s own public work: letters, essays, speeches, interviews, and the source notes listed
              on each guide&apos;s page. Type what is stuck in the box above, and summon.guide matches the problem to
              the guide best suited to it.
            </p>
            <p>
              Every guide on summon.guide is an AI perspective, not the real person and not an endorsement. A
              conversation with Benjamin Franklin or Lee Kuan Yew is a way to think a decision through with ideas drawn
              from a recorded life. The guides do not give personalized legal, medical, or financial advice.
            </p>
            <p>
              There are three ways in. The guides hall lists all {curatedFigures.length} guides. Sage answers one
              question across every Founders podcast episode at once. The council seats three guides with different
              perspectives around a single decision, so the trade-offs show up before you choose.
            </p>
            <p>
              The summon-guide skill also brings the guides into Claude Code or Codex with one terminal command, and
              compatible AI clients can connect to the remote MCP server at summon.guide/api/mcp to ask any guide from
              their own chat.{" "}
              <Link href="/connect" className="text-lapis underline underline-offset-4">See the install steps</Link>.
            </p>
            <h3 className="pt-3 font-serif text-2xl font-medium text-moon">Pricing</h3>
            <p>
              summon.guide is free to use while it is in testing. Sign in with Google to talk to any guide; there is no
              paid plan to buy today.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
      <PurchaseSuccessModal />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-4 text-[14px] text-mist sm:px-8">
        <span>AI guides built from public work. Free while in testing, no card.</span>
        <nav aria-label="Footer" className="flex gap-5">
          <Link href="/about" className="inline-flex min-h-11 items-center hover:text-moon">About</Link>
          <a href="mailto:adamtpang@gmail.com" className="inline-flex min-h-11 items-center hover:text-moon">Contact</a>
          <Link href="/credits" className="inline-flex min-h-11 items-center hover:text-moon">Credits</Link>
          <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-moon">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
