import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import PurchaseSuccessModal from "@/components/PurchaseSuccessModal";
import StuckBox from "@/components/StuckBox";
import { figures } from "@/lib/figures";

// Server Component on purpose: the raw first response carries the real
// headline for crawlers. The only interactive piece, the box, is a client
// island. One question, one box, nothing to read first. The guide roster
// lives at /summon.
export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-[#07090d] text-[#eef1f5]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,96,0.10), transparent 70%)" }}
      />

      <header className="relative flex items-center justify-between px-5 py-4 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#8a94a4]">summon.guide</p>
        <AuthButton dark />
      </header>

      <section className="relative flex flex-1 flex-col items-center justify-center gap-6 px-5 pb-20 pt-10 text-center sm:pt-16">
        <h1 className="font-serif text-[40px] font-medium leading-[1.04] tracking-tight sm:text-6xl">
          What&apos;s <em className="italic text-[#c9a860]">stuck?</em>
        </h1>
        <StuckBox />
      </section>

      <footer className="relative flex flex-wrap justify-center gap-x-6 px-5 pb-4 text-xs text-[#5f6878]">
        <Link href="/summon" className="inline-flex min-h-11 items-center hover:text-[#eef1f5]">{figures.length} guides</Link>
        <Link href="/council" className="inline-flex min-h-11 items-center hover:text-[#eef1f5]">Council</Link>
        <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-[#eef1f5]">Privacy</Link>
      </footer>

      <PurchaseSuccessModal />
    </main>
  );
}
