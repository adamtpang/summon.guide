"use client";

import { useEffect, useRef, useState } from "react";
import GuidePortrait from "@/components/GuidePortrait";
import { ArrowLeft, AudioLines, Captions, Keyboard, Mic, MicOff, PhoneOff } from "lucide-react";
import styles from "./GuideCall.module.css";
import { recordVoiceTurn } from "@/lib/recordVoiceTurn";
import { signIn } from "next-auth/react";

type Recognition = {
  lang: string; continuous: boolean; interimResults: boolean;
  start(): void; abort(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: { results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
};
type Props = {
  minimal?: boolean;
  name: string; portrait?: string; loading: boolean; speaking: boolean;
  blocked: boolean; audioError: string | null; caption: string;
  onSend(text: string): void; onInterrupt(): void; onClose(): void;
  recording?: boolean; recordError?: string | null; onToggleRecord?(): void;
};

export default function GuideCall({ name, portrait, loading, speaking, blocked, audioError, caption, onSend, onInterrupt, onClose, minimal = false, recording = false, recordError = null, onToggleRecord }: Props) {
  const [active, setActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [error, setError] = useState("");
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [captions, setCaptions] = useState(!minimal);
  const [seconds, setSeconds] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [directRecording, setDirectRecording] = useState(minimal);
  const [transcribing, setTranscribing] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const sendRef = useRef(onSend);
  useEffect(() => { sendRef.current = onSend; }, [onSend]);

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setSeconds(s => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    if (!active || muted || loading || speaking || blocked || typing || audioError) return;
    if (directRecording) {
      const controller = new AbortController();
      void (async () => {
        try {
          const access = await fetch("/api/transcribe", { signal: controller.signal, cache: "no-store" });
          if (controller.signal.aborted) return;
          if (access.status === 401) { setNeedsSignIn(true); throw new Error("Sign in to use voice."); }
          if (!access.ok) throw new Error("Voice is unavailable. Try again.");
          const blob = await recordVoiceTurn(controller.signal, () => { setListening(true); setTranscribing(false); });
          if (controller.signal.aborted) return;
          setListening(false); setTranscribing(true);
          const form = new FormData(); form.set("audio", blob, "question");
          const response = await fetch("/api/transcribe", { method: "POST", body: form, signal: controller.signal });
          const result = await response.json();
          if (response.status === 401) setNeedsSignIn(true);
          if (!response.ok) throw new Error(result.error || "Transcription failed. Try again.");
          if (controller.signal.aborted) return;
          setHeard(result.text); sendRef.current(result.text);
        } catch (failure) {
          if (controller.signal.aborted) return;
          setActive(false); setTyping(true);
          setError(failure instanceof DOMException && failure.name === "NotAllowedError" ? "Allow microphone access, then try again." : failure instanceof Error ? failure.message : "Recording failed. Try again.");
        } finally { if (!controller.signal.aborted) { setListening(false); setTranscribing(false); } }
      })();
      return () => { controller.abort(); };
    }
    const browser = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const Constructor = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Constructor) return;
    const recognition = new Constructor();
    recognition.lang = navigator.language || "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    let disposed = false;
    let submitted = false;
    let failed = false;
    let restart: number | undefined;
    recognition.onstart = () => { if (!disposed) setListening(true); };
    recognition.onresult = event => {
      if (disposed || submitted) return;
      const results = Array.from(event.results);
      const text = results.map(result => result[0].transcript).join(" ").trim();
      setHeard(text);
      if (results.every(result => result.isFinal) && text) {
        submitted = true;
        setListening(false);
        recognition.abort();
        sendRef.current(text);
      }
    };
    recognition.onerror = event => {
      if (disposed || event.error === "aborted" || event.error === "no-speech") return;
      failed = true;
      if (event.error === "network" || event.error === "service-not-allowed") {
        setDirectRecording(true); setListening(false); return;
      }
      setActive(false);
      setError(event.error === "not-allowed" || event.error === "service-not-allowed"
        ? "Microphone access is unavailable. Allow it in your browser, or type below."
        : "Voice input could not connect. Try again, or type your question.");
      setTyping(true);
    };
    recognition.onend = () => {
      if (disposed) return;
      setListening(false);
      if (!submitted && !failed) restart = window.setTimeout(() => setCycle(c => c + 1), 500);
    };
    try { recognition.start(); } catch {
      restart = window.setTimeout(() => { setError("Microphone could not start. Try again or type below."); setActive(false); setTyping(true); }, 0);
    }
    return () => {
      disposed = true;
      window.clearTimeout(restart);
      recognition.onend = null;
      recognition.abort();
    };
  }, [active, muted, loading, speaking, blocked, typing, cycle, audioError, directRecording]);

  const begin = () => {
    const browser = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
    setError("");
    setTranscribing(false); setNeedsSignIn(false);
    if (directRecording || (!browser.SpeechRecognition && !browser.webkitSpeechRecognition)) {
      setDirectRecording(true); setTyping(false); setMuted(false); setActive(true); return;
    }
    if (!browser.SpeechRecognition && !browser.webkitSpeechRecognition) {
      setError("This browser does not support voice input. You can type and listen to your guide.");
      setTyping(true);
      return;
    }
    setTyping(false); setMuted(false); setActive(true);
  };
  const status = blocked ? "Sign in to continue" : audioError ? "Audio paused" : speaking ? "Speaking" : loading ? "Thinking" : muted ? "Muted" : typing ? "" : active && transcribing ? "Transcribing" : active && listening ? "Listening" : active ? "Connecting" : minimal ? "" : "A little space to think out loud";
  const close = () => { setActive(false); onInterrupt(); onClose(); };

  return (
    <section className={`${styles.call} ${minimal ? styles.minimal : ""}`} aria-label={`Voice conversation with ${name}`}>
      <header className={styles.header}>
        <button onClick={close} className={styles.back} aria-label="Open text conversation">{minimal ? <Keyboard size={20} /> : <ArrowLeft size={18} />} <span>{minimal ? "" : "Back to chat"}</span></button>
        <span className={styles.brand}>summon.guide</span>
        <span className={styles.time}>{active ? `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}` : minimal ? "" : "Voice"}</span>
      </header>
      <div className={styles.stage}>
        <div className={styles.presence} data-state={speaking ? "speaking" : active && listening && !loading && !muted && !typing ? "listening" : "idle"}>
          <div className={styles.ring} /><div className={styles.ringInner} />
          <div className={styles.portrait}>
            <GuidePortrait src={portrait} name={name} sizes="(max-width: 640px) 180px, 240px" priority />
          </div>
          <div className={styles.wave} aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <i key={i} style={{ animationDelay: `${i * .13}s` }} />)}</div>
        </div>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.status} role="status">{status}</p>
        <div className={styles.caption}>
          {needsSignIn && <button className={styles.interrupt} onClick={() => { void signIn("google", { redirectTo: `${window.location.pathname}${window.location.search}` }); }}>Sign in</button>}
          {(error || audioError) ? <p role="alert" className={styles.error}>{error || audioError}</p> : captions && <p>{caption ? caption.slice(-380) : heard ? `“${heard}”` : minimal ? "" : "Bring the question you haven’t had someone to ask."}</p>}
        </div>
        {(speaking || (minimal && loading)) && <button className={styles.interrupt} onClick={() => { setHeard(""); onInterrupt(); }}>{minimal ? "Stop" : "Interrupt · I have a thought"}</button>}
      </div>
      <footer className={styles.footer}>
        {typing && <form className={styles.form} onSubmit={e => { e.preventDefault(); if (draft.trim() && !loading) { setHeard(draft.trim()); onSend(draft.trim()); setDraft(""); } }}><input aria-label="Your question" value={draft} onChange={e => setDraft(e.target.value)} placeholder={`Talk to ${name.split(" ")[0]}…`} autoFocus /><button disabled={loading || !draft.trim()}>Send</button></form>}
        {!minimal && !active && !typing && <button className={styles.start} onClick={begin} disabled={blocked || loading}><AudioLines size={20} /> Start talking</button>}
        {minimal ? <div className={styles.minimalControls}>
          <button aria-label={muted ? "Unmute microphone" : "Mute microphone"} disabled={!active} aria-pressed={muted} onClick={() => { setMuted(v => !v); setListening(false); }}>{muted ? <MicOff size={21} /> : <Mic size={21} />}</button>
          <button className={styles.primary} aria-label={active ? "End call" : "Start call"} disabled={blocked || (!active && loading)} onClick={() => { if (active) { setActive(false); setListening(false); onInterrupt(); } else begin(); }}>{active ? <PhoneOff size={23} /> : <AudioLines size={23} />}</button>
          <button aria-label={captions ? "Hide captions" : "Show captions"} aria-pressed={captions} onClick={() => setCaptions(v => !v)}><Captions size={21} /></button>
          {onToggleRecord && <button aria-label={recording ? "Stop recording and save the file" : "Record this call"} aria-pressed={recording} onClick={onToggleRecord}><span aria-hidden="true" style={{ display: "inline-block", width: 14, height: 14, borderRadius: recording ? 3 : 999, background: recording ? "#ef4444" : "currentColor" }} /></button>}
        </div> : <div className={styles.controls}>
          <button aria-label={captions ? "Hide captions" : "Show captions"} aria-pressed={captions} onClick={() => setCaptions(v => !v)}><Captions size={21} /><span>Captions</span></button>
          <button aria-label={muted ? "Unmute microphone" : active ? "Mute microphone" : "Start microphone"} aria-pressed={active && !muted} onClick={() => { if (!active) begin(); else { setMuted(v => !v); setListening(false); } }}>{muted || !active ? <MicOff size={22} /> : <Mic size={22} />}<span>{muted ? "Unmute" : "Mic"}</span></button>
          <button className={styles.end} aria-label="End voice conversation" onClick={close}><PhoneOff size={22} /><span>End</span></button>
          <button aria-label={typing ? "Return to voice" : "Type a question"} aria-pressed={typing} onClick={() => { setTyping(v => !v); setListening(false); }}><Keyboard size={22} /><span>Type</span></button>
        </div>}
        {recording && <p role="status" className={styles.disclosure}>Recording your voice and the guide. Stop to save the file to this device.</p>}
        {recordError && <p role="alert" className={styles.disclosure}>{recordError}</p>}
        <p className={styles.disclosure}>{minimal ? "AI voice" : "AI guide inspired by public works · Synthetic voice"}</p>
        {!minimal && !active && <p className={styles.privacy}>Voice input uses your browser’s speech service.</p>}
      </footer>
    </section>
  );
}
