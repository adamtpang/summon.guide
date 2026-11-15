import Link from "next/link";
import HeroSelect, { type Hero } from "@/components/HeroSelect";
import PurchaseSuccessModal from "@/components/PurchaseSuccessModal";
import AuthButton from "@/components/AuthButton";
import SummonMark from "@/components/SummonMark";
import StuckBox from "@/components/StuckBox";
import { guidePath } from "@/lib/guideUrls";
import { curatedFigures } from "@/lib/curated";

// Server Component on purpose: the raw first response carries the real
// headline and every guide's name for crawlers. The only interactive piece,
// the ask box, is a client island. The frieze is a public-domain drawing
// (Stuart and Revett's Parthenon); its source is on /credits.
export default function Home() {
  const heroes: Hero[] = [...curatedFigures]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((f) => ({ slug: f.slug, name: f.name, href: guidePath(f.slug), portrait: f.portrait }));
  return (
    <main className="flex min-h-[100dvh] flex-col bg-night text-moon">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label="summon.guide home">
          <SummonMark />
          <span className="font-display text-base tracking-[0.18em]">SUMMON</span>
        </Link>
        <AuthButton />
      </header>

      <HeroSelect
        heroes={heroes}
        intro={
          <>
            <h1 className="max-w-[12ch] font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl">
              The greatest humans who ever lived will see you now.
            </h1>
            <div className="mt-8 max-w-xl">
              <StuckBox />
            </div>
          </>
        }
      />

      <footer className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 px-5 pb-3 text-sm text-dim sm:px-8">
        <span>AI guides built from each person&apos;s public work. Not the real people.</span>
        <nav aria-label="Footer" className="flex gap-5">
          <Link href="/about" className="inline-flex min-h-11 items-center hover:text-moon">About</Link>
          <Link href="/credits" className="inline-flex min-h-11 items-center hover:text-moon">Credits</Link>
          <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-moon">Privacy</Link>
        </nav>
      </footer>
      <PurchaseSuccessModal />
    </main>
  );
}
