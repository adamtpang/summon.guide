"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Plays an episode script aloud in the guide's voice.
 *
 * The audio is generated on demand rather than stored, because a mp3 per
 * episode would bloat the repo and the script is the thing that changes. The
 * route is the same one /speak uses, in script mode so the longer character
 * limit applies.
 */
export default function EpisodeListen({
  script,
  figureSlug,
  guideName,
  hasMappedVoice,
}: {
  script: string;
  figureSlug: string;
  guideName: string;
  hasMappedVoice: boolean;
}) {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const toggle = useCallback(async () => {
    if (state === "playing") {
      cleanup();
      setState("idle");
      return;
    }
    // reuse the generated audio if we already have it
    if (audioRef.current) {
      await audioRef.current.play();
      setState("playing");
      return;
    }

    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: script, figureSlug, mode: "script" }),
      });
      if (!res.ok) {
        // surface the real reason instead of a generic failure
        let detail = "Audio is unavailable right now.";
        try {
          const j = await res.json();
          if (j?.error) detail = String(j.error);
        } catch {
          if (res.status === 500) {
            detail =
              "The voice service is not configured. Set ELEVENLABS_API_KEY to enable audio.";
          }
        }
        setMessage(detail);
        setState("error");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setState("idle");
      audio.onerror = () => {
        setMessage("The audio could not be played.");
        setState("error");
      };
      await audio.play();
      setState("playing");
    } catch {
      setMessage("Could not reach the voice service.");
      setState("error");
    }
  }, [state, script, figureSlug, cleanup]);

  const label =
    state === "loading"
      ? `Generating ${guideName.split(" ")[0]}'s voice`
      : state === "playing"
        ? "Pause"
        : `Listen in ${guideName.split(" ")[0]}'s voice`;

  return (
    <div>
      <button
        onClick={toggle}
        disabled={state === "loading"}
        className="inline-flex items-center gap-2.5 bg-gold-500 text-ink-950 rounded-full px-5 py-3 text-sm font-medium hover:bg-gold-400 disabled:opacity-60 disabled:cursor-wait active:scale-[0.98] transition-all"
      >
        {state === "loading" ? (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : state === "playing" ? (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        )}
        {label}
      </button>

      {!hasMappedVoice && state === "idle" && (
        <p className="text-warm-500 text-xs mt-2.5">
          No voice is mapped for {guideName.split(" ")[0]} yet, so this uses the
          default reader.
        </p>
      )}
      {message && (
        <p className="text-warm-400 text-xs mt-2.5 max-w-md leading-relaxed">
          {message}
        </p>
      )}
    </div>
  );
}
