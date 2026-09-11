import { figures } from "@/lib/figures";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import AmbientMusic from "@/components/AmbientMusic";
import HumanSearch from "@/components/HumanSearch";
import IntroPlayButton from "@/components/IntroPlayButton";
import PurchaseSuccessModal from "@/components/PurchaseSuccessModal";
import { SUMMON_ACCESS_MODE } from "@/lib/membership";

// Server Component on purpose: this is the homepage AI crawlers (GPTBot,
// ClaudeBot, etc.) fetch. It must ship real HTML on the raw first response,
// not an empty shell that only fills in after client-side hydration.
// The only genuinely interactive bits (audio playback, the ?payment=success
// modal) are split into small client components below so a useSearchParams()
// Suspense boundary can't blank out the whole page. See git history for the
// prior all-client-component version that caused the 0/100 AI-visibility
// audit score (empty <div hidden><!--$--><!--/$--></div> in place of content).
export default function Home() {
  const testing = SUMMON_ACCESS_MODE === "testing";

  return (
    <main className="min-h-screen bg-warm-50 text-ink-950 relative overflow-x-clip">
      {/* Atmosphere: restrained paper glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(15,14,12,0.055), rgba(184,157,79,0.025) 45%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-5 pt-7 md:px-6 md:pt-12 pb-10">
        {/* Header */}
        <header className="mb-7 md:mb-10">
          <div className="flex items-center justify-between mb-10 md:mb-14 rise">
            <p className="text-warm-500 text-xs tracking-[0.35em] uppercase font-medium">
              summon.guide
            </p>
            <AuthButton />
          </div>
          <p className="mb-3 text-[11px] tracking-[0.24em] text-warm-500 uppercase rise">
            A personal council for the problem in front of you
          </p>
          <h1
            className="max-w-2xl text-[36px] md:text-[60px] font-serif font-medium leading-[1.04] tracking-tight mb-5 rise text-ink-950"
            style={{ animationDelay: "80ms" }}
          >
            Bring the problem. We&apos;ll bring the right mind.
          </h1>
          <p
            className="text-warm-500 text-sm md:text-base leading-relaxed max-w-xl rise"
            style={{ animationDelay: "160ms" }}
          >
            Describe what is happening, import the context your current AI
            already knows, or name a person. Summon routes you to the guide
            whose documented life best fits the work.
          </p>
        </header>

        {/* The summoning circle */}
        <div className="mb-16 md:mb-20 rise" style={{ animationDelay: "240ms" }}>
          <HumanSearch />
          <Link href="/council" className="mt-4 inline-flex min-h-11 items-center text-sm text-warm-500 underline underline-offset-4 hover:text-ink-950">
            Bring my life context from themain.quest
          </Link>
        </div>

        {/* The Hall — compressed list view */}
        <section>
          <div
            className="flex items-baseline justify-between mb-3 rise"
            style={{ animationDelay: "320ms" }}
          >
            <h2 className="text-warm-500 text-xs tracking-[0.25em] uppercase">
              The Hall <span className="text-ink-950 font-medium">· {figures.length} summoned</span>
            </h2>
          </div>
          <div className="divide-y divide-warm-200 border-y border-warm-200">
            {figures.map((figure, idx) => (
              <div
                key={figure.slug}
                className="group rise"
                style={{ animationDelay: `${Math.min(360 + idx * 12, 900)}ms` }}
              >
                <div className="flex items-center gap-3 py-3 hover:bg-white rounded-lg transition-colors duration-200 -mx-2 px-2">
                  <Link href={`/${figure.slug}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-warm-100 flex-shrink-0 border border-warm-200">
                      {figure.portrait ? (
                        <Image
                          src={figure.portrait}
                          alt={figure.name}
                          fill
                          className="object-cover object-top"
                          sizes="40px"
                          priority={idx < 6}
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gradient-to-b ${figure.gradient} flex items-center justify-center text-white/70 text-[11px] font-serif`}
                        >
                          {figure.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-ink-950 text-sm font-medium leading-tight group-hover:text-ink-800 transition-colors truncate">
                          {figure.name}
                        </h3>
                        <span className="text-warm-400 text-[10px] flex-shrink-0 hidden sm:inline">
                          {figure.era}
                        </span>
                      </div>
                      <p className="text-warm-500 text-xs leading-relaxed truncate">
                        {figure.knownFor}
                      </p>
                    </div>
                  </Link>
                  <IntroPlayButton
                    slug={figure.slug}
                    introLine={figure.introLine}
                    name={figure.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works, one quiet strip */}
        <section className="mt-12 md:mt-16">
          <div className="border-t border-warm-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                t: "Ask for anyone, or anything",
                d: "Name a legend, or describe the problem you're carrying.",
              },
              {
                n: "02",
                t: "We summon the right mind",
                d: "Deeply researched, grounded in their real biographies and words.",
              },
              {
                n: "03",
                t: "Talk it through",
                d: "Real conversation, with citations back to the source.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-3">
                <span className="text-warm-400 text-xs tracking-widest font-mono mt-0.5">
                  {s.n}
                </span>
                <div>
                  <p className="text-ink-950 text-sm font-medium mb-1">{s.t}</p>
                  <p className="text-warm-500 text-xs leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Voiceover + skills */}
        <section className="mt-12 md:mt-16 space-y-3">
          <Link
            href="/summon"
            className="block bg-white border border-warm-200 hover:border-warm-300 text-ink-950 rounded-xl p-6 md:p-7 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-warm-500 text-[11px] tracking-[0.2em] uppercase mb-2 font-medium">
                  AI guide packs
                </p>
                <h3 className="text-ink-950 text-lg md:text-xl font-serif font-medium leading-snug mb-2">
                  Take a guide into any project.
                </h3>
                <p className="text-warm-500 text-sm leading-relaxed">
                  One command installs a persona, project-local skills, and
                  the summon.guide MCP. Start with Dave Ramsey for personal
                  finance or Elon for engineering and business.
                </p>
              </div>
              <svg
                className="w-5 h-5 text-warm-400 group-hover:text-ink-950 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          <Link
            href="/connect"
            className="block bg-ink-950 hover:bg-ink-800 text-white rounded-2xl p-6 md:p-7 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-white/45 text-[11px] tracking-[0.2em] uppercase mb-2 font-medium">{testing ? "Free testing access" : "Summon Member"}</p>
                <h3 className="text-lg md:text-xl font-serif font-medium leading-snug mb-2">Upgrade Claude, ChatGPT, or Codex.</h3>
                <p className="text-white/65 text-sm leading-relaxed">{testing ? "Connect your existing AI to a source-backed personal council. Sign in with Google and test it free." : "Connect your existing AI to a source-backed personal council. Five guided decision sessions each month for $5."}</p>
              </div>
              <span className="text-white/60 group-hover:text-white transition-colors mt-1">→</span>
            </div>
          </Link>
        </section>

        <footer className="mt-12 flex items-center justify-between text-warm-500 text-xs">
          <span>Grounded in real biographies and primary sources.</span>
          <div className="flex items-center gap-4">
            <Link href="/distillations" className="hover:text-ink-950 transition-colors">
              Distillations
            </Link>
            <Link href="/privacy" className="hover:text-ink-950 transition-colors">
              Privacy
            </Link>
            <AmbientMusic trackKey="home" className="text-warm-500 hover:text-ink-950" />
          </div>
        </footer>
      </div>

      {/* Purchase success modal (client island, self-contained Suspense) */}
      <PurchaseSuccessModal />
    </main>
  );
}
