import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import PurchaseSuccessModal from "@/components/PurchaseSuccessModal";
import StuckBox from "@/components/StuckBox";
import { figures } from "@/lib/figures";
import { guidePath } from "@/lib/guideUrls";

// Server Component on purpose: the raw first response carries the real
// headline for crawlers. The only interactive piece, the box, is a client
// island. The scenes are public-domain drawings (Piranesi's Paestum, Stuart
// and Revett's Parthenon), faded to graphite; sources are on /credits.
const HALLS = [
  { href: "/summon", label: "The guides", note: `${figures.length} lives, each grounded in their own words.` },
  { href: "/sage", label: "Sage", note: "Ask across every Founders episode at once." },
  { href: "/council", label: "The council", note: "Seat three guides around one decision." },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-night text-moon">
      <section className="relative flex min-h-[100svh] flex-col">
        <Image
          src="/scenes/temple.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-[50%_70%] opacity-80"
        />
        {/* Open sky above the colonnade so the inscription reads clearly. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-night via-night/85 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-night to-transparent" />

        <header className="relative grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-5 sm:px-8">
          <span />
          <Link href="/" className="flex flex-col items-center gap-1 text-moon" aria-label="summon.guide home">
            <Laurel />
            <span className="font-display text-[11px] tracking-[0.42em] sm:text-xs">SUMMON GUIDE</span>
          </Link>
          <div className="justify-self-end"><AuthButton dark /></div>
        </header>

        <div className="relative flex flex-1 flex-col items-center px-5 pt-[9vh] text-center sm:pt-[11vh]">
          <h1 className="font-display text-[34px] font-normal leading-[1.1] tracking-[0.14em] text-moon/80 sm:text-6xl">
            WHAT&apos;S STUCK?
          </h1>
          <p className="mt-4 max-w-md font-serif text-lg italic leading-snug text-mist sm:text-xl">
            Ask the ones who walked the road before you.
          </p>
        </div>

        <div className="relative flex justify-center px-4 pb-10 sm:pb-14">
          <StuckBox guides={figures.map((f) => ({ slug: f.slug, name: f.name, path: guidePath(f.slug) }))} />
        </div>
      </section>

      <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:pt-28">
        <Image
          src="/scenes/parthenon.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-top opacity-60"
        />
        <div className="relative mx-auto max-w-5xl">
          <Meander />
          <h2 className="mt-8 text-center font-serif text-4xl font-medium tracking-tight sm:text-5xl">The halls</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {HALLS.map((hall) => (
              <Link
                key={hall.href}
                href={hall.href}
                className="group flex min-h-40 flex-col justify-between border border-edge bg-raised/90 p-6 backdrop-blur-[2px] transition-colors hover:border-moon/40"
              >
                <span className="font-display text-sm tracking-[0.28em]">{hall.label.toUpperCase()}</span>
                <span className="mt-6 font-serif text-lg italic leading-snug text-mist group-hover:text-moon">{hall.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-edge px-5 py-3 font-display text-[10px] tracking-[0.2em] text-mist sm:px-8">
        <span>AI GUIDES BUILT FROM PUBLIC WORK</span>
        <nav className="flex gap-5">
          <Link href="/credits" className="inline-flex min-h-11 items-center hover:text-moon">CREDITS</Link>
          <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-moon">PRIVACY</Link>
        </nav>
      </footer>

      <PurchaseSuccessModal />
    </main>
  );
}

function Laurel() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M17 20c-4-1-9-5-11-12M17 20c4-1 9-5 11-12" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <ellipse cx={8 + i * 1.6} cy={15 - i * 3} rx="2.6" ry="1.1" transform={`rotate(-40 ${8 + i * 1.6} ${15 - i * 3})`} />
          <ellipse cx={26 - i * 1.6} cy={15 - i * 3} rx="2.6" ry="1.1" transform={`rotate(40 ${26 - i * 1.6} ${15 - i * 3})`} />
        </g>
      ))}
    </svg>
  );
}

// A Greek key band, drawn as one repeating stroke.
function Meander() {
  return (
    <svg className="mx-auto block h-3 w-48 text-dim" viewBox="0 0 96 6" preserveAspectRatio="none" aria-hidden>
      <path
        d={Array.from({ length: 8 }, (_, i) => `M${i * 12} 6V0h9v4.5H4V2`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}
