"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { figures } from "@/lib/figures";
import {
  FRANKLIN_DEMO,
  FRANKLIN_DEMO_SCRIPT,
  DEMO_GUIDE_SLUG,
  DEMO_EPISODE_META,
  TARGET,
  WPM,
  assembleEpisode,
  countWords,
  estimateSeconds,
  formatDuration,
  type EpisodeParts,
} from "@/lib/episode";
import { hasMappedVoice, TTS_LIMITS } from "@/lib/voices";

type Mode = "template" | "paste";

const PREFERRED_SLUGS = [
  "franklin",
  "seneca",
  "marcus-aurelius",
  "rockefeller",
  "naval-ravikant",
  "warren-buffett",
  "charlie-munger",
  "elon",
  "marie-curie",
];

function preferredGuides() {
  const bySlug = new Map(figures.map((f) => [f.slug, f]));
  const ordered: typeof figures = [];
  for (const slug of PREFERRED_SLUGS) {
    const f = bySlug.get(slug);
    if (f) ordered.push(f);
  }
  for (const f of figures) {
    if (!ordered.find((x) => x.slug === f.slug) && hasMappedVoice(f.slug)) {
      ordered.push(f);
    }
  }
  // Still list unmapped guides last so the picker is complete
  for (const f of figures) {
    if (!ordered.find((x) => x.slug === f.slug)) ordered.push(f);
  }
  return ordered;
}

export default function SpeakPage() {
  const guides = useMemo(() => preferredGuides(), []);
  const [slug, setSlug] = useState<string>(DEMO_GUIDE_SLUG);
  const [mode, setMode] = useState<Mode>("template");
  const [parts, setParts] = useState<EpisodeParts>({...FRANKLIN_DEMO });
  const [paste, setPaste] = useState(FRANKLIN_DEMO_SCRIPT);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [lastArtifact, setLastArtifact] = useState<{
    slug: string;
    words: number;
    seconds: number;
    bytes: number;
    at: string;
  } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const figure = guides.find((g) => g.slug === slug) ?? guides[0];

  const script = useMemo(() => {
    if (mode === "paste") return paste.trim();
    return assembleEpisode(parts);
  }, [mode, paste, parts]);

  const words = countWords(script);
  const seconds = estimateSeconds(script);
  const inTarget =
    words >= TARGET.minWords &&
    words <= TARGET.maxWords &&
    seconds >= TARGET.minSeconds &&
    seconds <= TARGET.maxSeconds + 15;
  const overLimit = script.length > TTS_LIMITS.script;

  const loadDemo = useCallback(() => {
    setSlug(DEMO_GUIDE_SLUG);
    setMode("template");
    setParts({...FRANKLIN_DEMO });
    setPaste(FRANKLIN_DEMO_SCRIPT);
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaying(false);
  }, []);

  const generate = useCallback(async (asDownload: boolean) => {
      setError(null);
      if (!script) {
        setError("Write or paste a script first.");
        return;
      }
      if (overLimit) {
        setError(`Script is too long (${script.length} chars). Cap is ${TTS_LIMITS.script} for a ~2-minute voiceover.`);
        return;
      }

      stopAudio();
      setLoading(true);
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: script,
            figureSlug: slug,
            mode: "script",
            download: asDownload,
            filename: `${slug}-voiceover.mp3`,
          }),
        });

        if (!res.ok) {
          let msg = "Voice generation failed.";
          try {
            const data = await res.json();
            if (data?.error) msg = data.error;
          } catch {
            /* ignore */
          }
          if (res.status === 500 &&
            /api key|not configured/i.test(msg)) {
            msg =
              "ELEVENLABS_API_KEY is not set. Add it to.env.local (or Vercel env), then retry.";
          }
          setError(msg);
          setLoading(false);
          return;
        }

        const blob = await res.blob();
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        const artifact = {
          slug,
          words: countWords(script),
          seconds: estimateSeconds(script),
          bytes: blob.size,
          at: new Date().toISOString(),
        };
        setLastArtifact(artifact);
        try {
          localStorage.setItem("summon_last_voiceover",
            JSON.stringify(artifact));
        } catch {
          /* ignore */
        }

        if (asDownload) {
          const a = document.createElement("a");
          a.href = url;
          a.download = `${slug}-voiceover.mp3`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          const audio = new Audio(url);
          audioRef.current = audio;
          audio.onended = () => setPlaying(false);
          audio.onerror = () => {
            setPlaying(false);
            setError("Playback failed.");
          };
          setPlaying(true);
          await audio.play();
        }
      } catch (e) {
        setError(e instanceof Error ? e.message: "Voice generation failed.");
      } finally {
        setLoading(false);
      }
    },
    [script, overLimit, slug, stopAudio, audioUrl]);

  const replay = useCallback(async () => {
    if (!audioUrl) return;
    stopAudio();
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.onended = () => setPlaying(false);
    setPlaying(true);
    await audio.play();
  }, [audioUrl, stopAudio]);

  const copyHandoff = useCallback(async () => {
    const block = [
      `# book.movie handoff: summon.guide voiceover`,
      ``,
      `Guide: ${figure?.name ?? slug}`,
      `Slug: ${slug}`,
      `Words: ${words} · Est. duration: ${formatDuration(seconds)} @ ${WPM} wpm`,
      `Target: ${TARGET.minSeconds}-${TARGET.maxSeconds}s spoken`,
      `Generated: ${lastArtifact?.at ?? "(not yet generated)"}`,
      `Audio: ${lastArtifact ? `${slug}-voiceover.mp3 (${lastArtifact.bytes} bytes)`: "generate + download from /speak"}`,
      ``,
      `## Script`,
      ``,
      script,
      ``,
      `## Next (book.movie / Remotion)`,
      `- Pair this mp3 with stills, type, or b-roll.`,
      `- Keep cuts on sentence boundaries.`,
      `- Brand: editorial print, parchment + ink, no SaaS chrome.`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(block);
    } catch {
      setError("Could not copy handoff. Select the script manually.");
    }
  }, [figure, slug, words, seconds, lastArtifact, script]);

  return (<main className="min-h-screen bg-night text-moon">
      <div className="max-w-3xl mx-auto px-6 pt-8 md:pt-12 pb-24">
        <header className="flex items-center justify-between mb-10 md:mb-14">
          <Link
            href="/"
            className="text-dim text-xs tracking-[0.3em] uppercase hover:text-moon transition-colors"
          >
            summon.guide
          </Link>
          <Link
            href={`/${DEMO_GUIDE_SLUG}`}
            className="text-mist text-xs hover:text-moon transition-colors"
          >
            Demo guide: Franklin
          </Link>
        </header>

        <section className="mb-12 md:mb-14">
          <p className="text-dim text-xs tracking-[0.25em] uppercase mb-4">
            Voiceover
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium leading-[1.05] tracking-tight mb-5">
            A guide speaks your essay.
          </h1>
          <p className="text-mist text-base md:text-[17px] leading-[1.75] max-w-2xl">
            Paste a short script, or fill the episode template. Choose a guide.
            Generate a 90-120 second voiceover for video. Designed for the
            essay, then TTS, then book.movie path.
          </p>
        </section>

        {/* Demo callout */}
        <section className="mb-10">
          <div className="bg-white/[0.04] border border-edge rounded-xl p-5 md:p-6">
            <p className="text-dim text-xs tracking-[0.2em] uppercase mb-2">
              One-session demo
            </p>
            <h2 className="font-serif text-xl font-medium mb-2">
              {DEMO_EPISODE_META.title}
            </h2>
            <p className="text-mist text-sm leading-relaxed mb-4">
              {DEMO_EPISODE_META.guideName} · {DEMO_EPISODE_META.words} words · ~
              {formatDuration(DEMO_EPISODE_META.targetSeconds)} ·{" "}
              {DEMO_EPISODE_META.style}
            </p>
            <button
              type="button"
              onClick={loadDemo}
              className="inline-flex items-center gap-2 bg-raised text-moon rounded-full px-5 py-2.5 text-sm font-medium hover:bg-raised transition-colors active:scale-[0.98]"
            >
              Load Franklin demo
            </button>
          </div>
        </section>

        {/* Guide picker */}
        <section className="mb-10 space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif font-medium pb-2 border-b border-edge">
            1. Guide
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {guides.slice(0, 12).map((g) => {
              const active = g.slug === slug;
              return (<button
                  key={g.slug}
                  type="button"
                  onClick={() => setSlug(g.slug)}
                  className={`shrink-0 w-[88px] text-left group ${
                    active ? "": "opacity-70 hover:opacity-100"
                  } transition-opacity`}
                >
                  <div
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden bg-raised mb-1.5 border transition-colors ${
                      active
                        ? "border-moon"
: "border-edge group-hover:border-edge"
                    }`}
                  >
                    <Image
                      src={g.portrait || ""}
                      alt={g.name}
                      fill
                      className="object-cover object-top"
                      sizes="88px"
                    />
                  </div>
                  <p className="text-[11px] font-medium leading-tight line-clamp-2">
                    {g.name}
                  </p>
                </button>);
            })}
          </div>
          <p className="text-mist text-sm">
            Speaking as{" "}
            <span className="text-moon font-medium">{figure?.name}</span>
            {hasMappedVoice(slug)
              ? " · mapped ElevenLabs voice"
: " · default voice (no custom map yet)"}
          </p>
        </section>

        {/* Script */}
        <section className="mb-10 space-y-4">
          <div className="flex items-end justify-between gap-4 border-b border-edge pb-2">
            <h2 className="text-2xl md:text-3xl font-serif font-medium">
              2. Script
            </h2>
            <div className="flex gap-1 text-xs">
              <button
                type="button"
                onClick={() => setMode("template")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  mode === "template"
                    ? "bg-raised text-moon"
: "text-mist hover:text-moon"
                }`}
              >
                Episode
              </button>
              <button
                type="button"
                onClick={() => {
                  if (mode === "template") setPaste(assembleEpisode(parts));
                  setMode("paste");
                }}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  mode === "paste"
                    ? "bg-raised text-moon"
: "text-mist hover:text-moon"
                }`}
              >
                Paste
              </button>
            </div>
          </div>

          {mode === "template" ? (<div className="space-y-4">
              <p className="text-mist text-sm leading-relaxed">
                Hook, then three points, then close. Aim for {TARGET.minWords}-
                {TARGET.maxWords} words (~{TARGET.minSeconds}-
                {TARGET.maxSeconds}s at {WPM} wpm).
              </p>
              <label className="block">
                <span className="text-xs tracking-[0.2em] uppercase text-dim">
                  Hook
                </span>
                <textarea
                  value={parts.hook}
                  onChange={(e) =>
                    setParts((p) => ({...p, hook: e.target.value }))
                  }
                  rows={3}
                  className="mt-1.5 w-full rounded-xl border border-edge bg-white/[0.04] px-4 py-3 text-base md:text-[17px] leading-relaxed text-moon/85 placeholder:text-dim focus:outline-none focus:border-moon/40 resize-y"
                  placeholder="Open with a claim or scene."
                />
              </label>
              {([0, 1, 2] as const).map((i) => (<label key={i} className="block">
                  <span className="text-xs tracking-[0.2em] uppercase text-dim">
                    Point {i + 1}
                  </span>
                  <textarea
                    value={parts.points[i]}
                    onChange={(e) => {
                      const next = [...parts.points] as [
                        string,
                        string,
                        string,
                      ];
                      next[i] = e.target.value;
                      setParts((p) => ({...p, points: next }));
                    }}
                    rows={3}
                    className="mt-1.5 w-full rounded-xl border border-edge bg-white/[0.04] px-4 py-3 text-base md:text-[17px] leading-relaxed text-moon/85 placeholder:text-dim focus:outline-none focus:border-moon/40 resize-y"
                    placeholder={`Point ${i + 1}`}
                  />
                </label>))}
              <label className="block">
                <span className="text-xs tracking-[0.2em] uppercase text-dim">
                  Close
                </span>
                <textarea
                  value={parts.close}
                  onChange={(e) =>
                    setParts((p) => ({...p, close: e.target.value }))
                  }
                  rows={3}
                  className="mt-1.5 w-full rounded-xl border border-edge bg-white/[0.04] px-4 py-3 text-base md:text-[17px] leading-relaxed text-moon/85 placeholder:text-dim focus:outline-none focus:border-moon/40 resize-y"
                  placeholder="Land the action."
                />
              </label>
            </div>): (<label className="block">
              <span className="text-xs tracking-[0.2em] uppercase text-dim">
                Full script
              </span>
              <textarea
                value={paste}
                onChange={(e) => setPaste(e.target.value)}
                rows={14}
                className="mt-1.5 w-full rounded-xl border border-edge bg-white/[0.04] px-4 py-3 text-base md:text-[17px] leading-relaxed text-moon/85 font-serif placeholder:text-dim focus:outline-none focus:border-moon/40 resize-y"
                placeholder="Paste an essay or spoken script…"
              />
            </label>)}

          <div className="flex flex-wrap items-center gap-3 text-sm text-mist">
            <span>
              {words} words · ~{formatDuration(seconds)}
            </span>
            <span
              className={
                inTarget
                  ? "text-moon"
: words === 0
                    ? "text-dim"
: "text-mist"
              }
            >
              {words === 0
                ? "empty"
: inTarget
                  ? "in target range"
: words < TARGET.minWords
                    ? "short of 90s target"
: "long for 120s, trim if needed"}
            </span>
            {overLimit && (<span className="text-red-800/80">over TTS char limit</span>)}
          </div>
        </section>

        {/* Generate */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif font-medium pb-2 border-b border-edge">
            3. Generate
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={loading || !script || overLimit}
              onClick={() => generate(false)}
              className="inline-flex items-center gap-2 bg-raised text-moon rounded-full px-6 py-3 text-sm font-medium hover:bg-raised transition-colors active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              {loading ? (<>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-warm-50 rounded-full animate-spin" />
                  Generating…
                </>): playing ? ("Speaking…"): ("Generate & play")}
            </button>
            <button
              type="button"
              disabled={loading || !script || overLimit}
              onClick={() => generate(true)}
              className="inline-flex items-center gap-2 border border-edge text-moon rounded-full px-6 py-3 text-sm font-medium hover:border-moon transition-colors active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              Download mp3
            </button>
            {audioUrl && (<button
                type="button"
                onClick={() => (playing ? stopAudio(): replay())}
                className="inline-flex items-center gap-2 border border-edge text-mist rounded-full px-5 py-3 text-sm hover:text-moon hover:border-edge transition-colors"
              >
                {playing ? "Stop": "Replay"}
              </button>)}
          </div>

          {error && (<p className="text-sm text-red-900/80 bg-white/[0.04] border border-edge rounded-xl px-4 py-3">
              {error}
            </p>)}

          {lastArtifact && (<div className="bg-raised rounded-xl px-4 py-3 text-sm text-mist">
              <p className="text-xs tracking-[0.2em] uppercase text-dim mb-1">
                Last voiceover artifact
              </p>
              <p className="text-moon/85">
                {lastArtifact.slug}-voiceover.mp3 · {lastArtifact.words} words · ~
                {formatDuration(lastArtifact.seconds)} ·{" "}
                {(lastArtifact.bytes / 1024).toFixed(0)} KB ·{" "}
                {new Date(lastArtifact.at).toLocaleString()}
              </p>
              {audioUrl && (<audio
                  controls
                  src={audioUrl}
                  className="mt-3 w-full max-w-md h-10"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                />)}
            </div>)}
        </section>

        {/* book.movie handoff */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif font-medium pb-2 border-b border-edge">
            4. book.movie handoff
          </h2>
          <div className="bg-raised text-moon rounded-2xl p-6 md:p-7">
            <p className="text-gold-500 text-[11px] tracking-[0.2em] uppercase mb-2">
              Audio first · visuals next
            </p>
            <p className="font-serif text-lg md:text-xl leading-snug mb-3">
              Here is the audio; visuals next.
            </p>
            <p className="text-dim text-sm leading-relaxed mb-5 max-w-xl">
              Download the mp3 from step 3. Copy the handoff block below into
              the book.movie / Remotion session. Pair voice with stills, type,
              or b-roll on sentence boundaries. Editorial print aesthetic, 
              parchment and ink, not dashboard chrome.
            </p>
            <button
              type="button"
              onClick={copyHandoff}
              className="inline-flex items-center gap-2 border border-white/15 text-moon rounded-full px-5 py-2.5 text-sm font-medium hover:border-gold-500/60 transition-colors"
            >
              Copy handoff for book.movie
            </button>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-edge text-mist text-xs leading-relaxed">
          <p>
            Requires <code className="font-mono text-[11px]">ELEVENLABS_API_KEY</code>{" "}
            in the environment. Chat TTS uses the same route with a shorter cap;
            this page sends <code className="font-mono text-[11px]">mode: &quot;script&quot;</code>{" "}
            for up to {TTS_LIMITS.script} characters.
          </p>
        </footer>
      </div>
    </main>);
}
