"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Explicit, per-answer playback. Never captures the microphone. */
export default function ListenButton({ text, guide }: { text: string; guide: string }) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const [error, setError] = useState("");
  const request = useRef<AbortController | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const url = useRef<string | null>(null);

  function stop() {
    request.current?.abort();
    request.current = null;
    if (audio.current) {
      audio.current.onended = null;
      audio.current.onerror = null;
      audio.current.pause();
      audio.current = null;
    }
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
    setState("idle");
  }

  useEffect(() => {
    window.addEventListener("summon:stop-audio", stop);
    return () => { window.removeEventListener("summon:stop-audio", stop); stop(); };
  }, []);

  async function play() {
    if (state !== "idle") { stop(); return; }
    window.dispatchEvent(new Event("summon:stop-audio"));
    const controller = new AbortController();
    request.current = controller;
    setState("loading"); setError("");
    try {
      const clean = text.replace(/\[Source:[^\]]*\]|\[FOLLOWUP:[^\]]*\]/g, "").replace(/[*#]/g, "").trim();
      const response = await fetch("/api/tts", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: clean, figureSlug: guide }), signal: controller.signal,
      });
      if (!response.ok) throw new Error("Voice is unavailable right now.");
      const blob = await response.blob();
      if (controller.signal.aborted) return;
      url.current = URL.createObjectURL(blob);
      const player = new Audio(url.current);
      audio.current = player;
      player.onended = stop;
      player.onerror = () => {
        if (audio.current === player) { stop(); setError("Audio stopped. Try again."); }
      };
      await player.play();
      if (!controller.signal.aborted) setState("playing");
    } catch {
      if (!controller.signal.aborted) { stop(); setError("Voice is unavailable right now."); }
    }
  }

  return <div className="mt-2 flex items-center gap-2">
    <Button type="button" variant="ghost" size="icon" onClick={() => void play()} className="size-11 rounded-full text-current opacity-60 hover:opacity-100" aria-label={state === "idle" ? "Listen to answer" : "Stop audio"} title={state === "idle" ? "Listen" : "Stop"}>
      {state === "loading" ? <LoaderCircle size={16} className="animate-spin" /> : state === "playing" ? <Square size={16} /> : <Volume2 size={16} />}
    </Button>
    {error && <span role="alert" className="text-xs opacity-70">{error}</span>}
  </div>;
}
