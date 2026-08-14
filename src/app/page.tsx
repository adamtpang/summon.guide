"use client";

import { figures } from "@/lib/figures";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import AmbientMusic from "@/components/AmbientMusic";
import HumanSearch from "@/components/HumanSearch";

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [playingSlug, setPlayingSlug] = useState<string | null>(null);
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const searchParams = useSearchParams();

  // Play intro audio for a legend
  const playIntro = useCallback(
    async (slug: string, introLine: string) => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
        audioRef.current = null;
      }
      if (playingSlug === slug) {
        setPlayingSlug(null);
        return;
      }
      setLoadingSlug(slug);
      setPlayingSlug(null);
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: introLine, figureSlug: slug }),
        });
        if (!res.ok) {
          setLoadingSlug(null);
          return;
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => setPlayingSlug(null);
        audio.onerror = () => setPlayingSlug(null);
        setLoadingSlug(null);
        setPlayingSlug(slug);
        await audio.play();
      } catch {
        setLoadingSlug(null);
        setPlayingSlug(null);
      }
    },
    [playingSlug]
  );

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  useEffect(() => {
    if (searchParams?.get("payment") === "success") {
      setShowPurchaseSuccess(true);
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-clip">
      {/* Atmosphere: soft daylight glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(37,99,235,0.06), rgba(16,185,129,0.03) 45%, transparent 70%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6 pt-8 md:pt-14 pb-8">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-8 md:mb-12 rise">
            <p className="text-blue-600 text-xs tracking-[0.35em] uppercase font-medium">
              summon.guide
            </p>
            <AuthButton />
          </div>
          <h1
            className="text-[32px] md:text-[54px] font-serif font-medium leading-[1.08] tracking-tight mb-5 rise text-slate-900"
            style={{ animationDelay: "80ms" }}
          >
            Every legend who ever lived,{" "}
            <em className="text-blue-600 not-italic md:italic">
              on call.
            </em>
          </h1>
          <p
            className="text-slate-500 text-sm md:text-base leading-relaxed max-w-md rise"
            style={{ animationDelay: "160ms" }}
          >
            Search any great human in history, or describe what you&apos;re
            facing, and summon the mind best suited to walk you through it.
          </p>
        </header>

        {/* The summoning circle */}
        <div className="mb-12 md:mb-16 rise" style={{ animationDelay: "240ms" }}>
          <HumanSearch />
        </div>

        {/* The Hall — compressed list view */}
        <section>
          <div
            className="flex items-baseline justify-between mb-3 rise"
            style={{ animationDelay: "320ms" }}
          >
            <h2 className="text-slate-400 text-xs tracking-[0.25em] uppercase">
              The Hall <span className="text-blue-600 font-medium">· {figures.length} summoned</span>
            </h2>
          </div>
          <div className="divide-y divide-slate-100 border-y border-slate-100">
            {figures.map((figure, idx) => (
              <div
                key={figure.slug}
                className="group rise"
                style={{ animationDelay: `${Math.min(360 + idx * 12, 900)}ms` }}
              >
                <div className="flex items-center gap-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors duration-200 -mx-2 px-2">
                  <Link href={`/chat/${figure.slug}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
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
                        <h3 className="text-slate-900 text-sm font-medium leading-tight group-hover:text-blue-600 transition-colors truncate">
                          {figure.name}
                        </h3>
                        <span className="text-slate-400 text-[10px] flex-shrink-0 hidden sm:inline">
                          {figure.era}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed truncate">
                        {figure.knownFor}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      playIntro(figure.slug, figure.introLine);
                    }}
                    className="shrink-0 w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-all"
                    title={`Hear ${figure.name} introduce themselves`}
                  >
                    {loadingSlug === figure.slug ? (
                      <svg className="w-3.5 h-3.5 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ) : playingSlug === figure.slug ? (
                      <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works, one quiet strip */}
        <section className="mt-12 md:mt-16">
          <div className="border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                t: "Ask for anyone, or anything",
                d: "Name a legend, or describe the problem you're carrying.",
                color: "text-blue-600",
              },
              {
                n: "02",
                t: "We summon the right mind",
                d: "Deeply researched, grounded in their real biographies and words.",
                color: "text-emerald-600",
              },
              {
                n: "03",
                t: "Talk it through",
                d: "Real conversation, with citations back to the source.",
                color: "text-rose-600",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-3">
                <span className={`${s.color} text-xs tracking-widest font-mono mt-0.5`}>
                  {s.n}
                </span>
                <div>
                  <p className="text-slate-900 text-sm font-medium mb-1">{s.t}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Voiceover + skills */}
        <section className="mt-12 md:mt-16 space-y-3">
          <Link
            href="/speak"
            className="block bg-slate-50 border border-slate-200 hover:border-blue-300 text-slate-900 rounded-2xl p-6 md:p-7 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-blue-600 text-[11px] tracking-[0.2em] uppercase mb-2 font-medium">
                  Claude Code skills
                </p>
                <h3 className="text-slate-900 text-lg md:text-xl font-serif font-medium leading-snug mb-2">
                  Take your guides into your terminal.
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Frameworks from these lives, packaged as installable Claude
                  Code skills. Rockefeller&rsquo;s Ledger A. Musk&rsquo;s
                  Five-Step Algorithm. Seneca on anger. Install once, summon
                  them in any project.
                </p>
              </div>
              <svg
                className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </section>

        <footer className="mt-12 flex items-center justify-between text-slate-400 text-xs">
          <span>Grounded in real biographies and primary sources.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <AmbientMusic trackKey="home" className="text-slate-400 hover:text-slate-600" />
          </div>
        </footer>
      </div>

      {/* Purchase success modal */}
      {showPurchaseSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl shadow-slate-900/10">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-medium text-slate-900 mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500 text-sm mb-2">
              100 credits have been added to your account.
            </p>
            <p className="text-slate-400 text-xs mb-6">
              Continue your conversations with any legend.
            </p>
            <button
              onClick={() => setShowPurchaseSuccess(false)}
              className="w-full bg-blue-600 text-white rounded-full py-3 px-6 text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Start chatting
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
