"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recordVoiceTurn } from "@/lib/recordVoiceTurn";

/** One spoken draft, reviewed in the composer before sending. */
export default function VoiceInput({ disabled, onText }: { disabled: boolean; onText: (text: string) => void }) {
  const [phase, setPhase] = useState<"idle" | "starting" | "listening" | "transcribing">("idle");
  const [error, setError] = useState("");
  const receive = useRef(onText);
  useEffect(() => { receive.current = onText; }, [onText]);
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => { active.current?.abort(); }, []);
  useEffect(() => { if (disabled) active.current?.abort(); }, [disabled]);

  async function record() {
    if (active.current) { active.current.abort(); return; }
    const controller = new AbortController(); active.current = controller;
    setError(""); setPhase("starting");
    window.dispatchEvent(new Event("summon:stop-audio"));
    try {
      const ready = await fetch("/api/transcribe", { signal: controller.signal });
      if (!ready.ok) throw new Error(ready.status === 401 ? "Sign in to use the microphone." : "Microphone unavailable. Try typing.");
      const audio = await recordVoiceTurn(controller.signal, () => setPhase("listening"));
      setPhase("transcribing");
      const form = new FormData(); form.append("audio", audio, "voice.webm");
      const response = await fetch("/api/transcribe", { method: "POST", body: form, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || typeof result.text !== "string" || !result.text.trim()) throw new Error(result.error || "No words heard. Try again.");
      if (!controller.signal.aborted) receive.current(result.text.trim());
    } catch (failure) {
      if (!controller.signal.aborted) setError(failure instanceof DOMException && failure.name === "NotAllowedError" ? "Allow microphone access, then try again." : failure instanceof Error ? failure.message : "Microphone unavailable.");
    } finally {
      if (active.current === controller) { active.current = null; setPhase("idle"); }
    }
  }

  const label = phase === "idle" ? "Dictate message" : "Cancel recording";
  return <div className="relative shrink-0">
    <Button type="button" variant="ghost" size="icon" className="size-12 rounded-full text-current opacity-70 hover:opacity-100" aria-label={label} title={label} disabled={disabled} onClick={() => void record()}>
      {phase === "idle" ? <Mic className="size-5" /> : phase === "listening" ? <X className="size-5 animate-pulse" /> : <Loader2 className="size-5 animate-spin" />}
    </Button>
    {(phase !== "idle" || error) && <p role={error ? "alert" : "status"} className="absolute bottom-14 right-0 w-56 rounded-xl border border-white/15 bg-neutral-900 p-3 text-xs leading-relaxed text-white shadow-xl">{error || (phase === "listening" ? "Listening… Pause when finished." : phase === "transcribing" ? "Transcribing…" : "Connecting…")}</p>}
  </div>;
}
