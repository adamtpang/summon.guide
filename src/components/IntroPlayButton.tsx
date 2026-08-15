"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Small client island: plays a figure's TTS intro line on click.
// Split out of the homepage so the page itself can stay a Server
// Component and ship real HTML on first response (see page.tsx).
export default function IntroPlayButton({
  slug,
  introLine,
  name,
}: {
  slug: string;
  introLine: string;
  name: string;
}) {
  const [playingSlug, setPlayingSlug] = useState<string | null>(null);
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playIntro = useCallback(async () => {
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
  }, [introLine, playingSlug, slug]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        playIntro();
      }}
      className="shrink-0 w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-all"
      title={`Hear ${name} introduce themselves`}
    >
      {loadingSlug === slug ? (
        <svg className="w-3.5 h-3.5 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : playingSlug === slug ? (
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
  );
}
