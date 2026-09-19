"use client";

import { guideDisclosure } from "@/components/AiPersonaNotice";
import { useState, useRef, useEffect, use, useCallback } from "react";
import { figures } from "@/lib/figures";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import posthog from "posthog-js";
import WisdomCard from "@/components/WisdomCard";
import FeedbackModal from "@/components/FeedbackModal";

import ModelRouteBadge from "@/components/ModelRouteBadge";
import PromptBubbles from "@/components/PromptBubbles";
import ChatComposer from "@/components/ChatComposer";
import GuideCall from "@/components/GuideCall";
import { startCallRecorder, recordingFileName, type CallRecorder } from "@/lib/callRecorder";
import ListenButton from "@/components/ListenButton";
import chatStyles from "@/components/SageConversation.module.css";

import { Button } from "@/components/ui/button";
import GuidePortraitLines from "@/components/GuidePortraitLines";
import type { ModelRouteMeta } from "@/lib/aiTypes";
import { readChatStream } from "@/lib/readChatStream";

interface Message {
  role: "user" | "assistant";
  content: string;
  contextBrief?: boolean;
}

interface PendingChat {
  text: string;
  contextBrief: boolean;
}

function parseCitations(text: string): { body: string; citations: string[] } {
  const citationRegex = /\[Source:\s*"([^"]+)"(?:\s*by\s*([^\]]+))?\]/g;
  const citations: string[] = [];
  let match;
  while ((match = citationRegex.exec(text)) !== null) {
    citations.push(match[2] ? `${match[1]} by ${match[2]}` : match[1]);
  }
  const body = text.replace(citationRegex, "").trim();
  return { body, citations };
}

function parseFollowups(text: string): { body: string; followups: string[] } {
  const followupRegex = /\[FOLLOWUP:\s*([^\]]+)\]/;
  const match = text.match(followupRegex);
  const followups: string[] = [];
  if (match) {
    const parts = match[1].split("|").map((s) => s.trim()).filter(Boolean);
    followups.push(...parts);
  }
  const body = text.replace(followupRegex, "").trim();
  return { body, followups };
}

function cleanResponse(text: string): { displayText: string; ttsText: string; citations: string[]; followups: string[] } {
  // Extract citations
  const { body: noCitations, citations } = parseCitations(text);
  // Extract followups
  const { body: cleanBody, followups } = parseFollowups(noCitations);
  // Remove emdashes that slipped through
  const displayText = cleanBody.replace(/\u2014/g, ",").replace(/\u2013/g, ",");
  // TTS text: no citations, no followups, no emdashes
  const ttsText = displayText;
  return { displayText, ttsText, citations, followups };
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ figure: string }>;
}) {
  const { figure: figureSlug } = use(params);
  const figure = figures.find((f) => f.slug === figureSlug);
  const searchParams = useSearchParams();
  const matchReason = searchParams?.get("reason") ?? null;
  const preloadedQuery = searchParams?.get("q") ?? null;
  const hasStoredIntake = searchParams?.get("intake") === "1";
  const posthog = usePostHog();

  const { data: session, status: sessionStatus } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationCopied, setConversationCopied] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [preparingAudio, setPreparingAudio] = useState(false);
  const [callMode, setCallMode] = useState(false);
  const recorderRef = useRef<CallRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordError, setRecordError] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRequestRef = useRef<AbortController | null>(null);
  const voiceEnabledRef = useRef(false); // Replies play only when Listen is selected.
  const [lastAudioUrl, setLastAudioUrl] = useState<string | null>(null);
  const [canReplay, setCanReplay] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [pendingSignIn, setPendingSignIn] = useState<PendingChat | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [wisdomQuote, setWisdomQuote] = useState<string | null>(null);
  const [showWisdomCard, setShowWisdomCard] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [showReason, setShowReason] = useState(!!matchReason);
  const [followups, setFollowups] = useState<string[]>([]);
  const [modelRoute, setModelRoute] = useState<ModelRouteMeta | null>(null);
  const wisdomCardShownRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingChatKey = `summon_pending_chat:${figureSlug}`;

  const hasMessages = messages.length > 0 || !!streamingContent;

  // Get effective credit count
  const effectiveCredits = session?.user ? credits : null;

  // Decrement credits
  const decrementCredits = useCallback(async () => {
    if (!session?.user) return;
    const res = await fetch("/api/credits", { method: "POST" });
    const data = await res.json();
    if (data.credits !== undefined) {
      setCredits(data.credits);
      if (data.credits === 0 && !feedbackGiven) {
        setShowFeedback(true);
      }
    }
  }, [session, feedbackGiven]);

  // Extract a shareable quote after 5+ exchanges (10 messages)
  const maybeExtractQuote = useCallback(async (allMessages: Message[]) => {
    if (wisdomCardShownRef.current) return;
    if (allMessages.length < 10) return;

    const storageKey = `wisdom_shown_${figureSlug}`;
    if (typeof window !== "undefined" && localStorage.getItem(storageKey)) return;

    wisdomCardShownRef.current = true;

    try {
      const res = await fetch("/api/extract-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages,
          figureName: figure?.name,
          era: figure?.era,
        }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.quote) {
        setWisdomQuote(data.quote);
        setShowWisdomCard(true);
        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, "true");
        }
      }
    } catch { /* silently fail */ }
  }, [figureSlug, figure?.name, figure?.era]);

  // Fetch credits on mount
  useEffect(() => {
    if (session?.user) {
      fetch("/api/credits").then(r => r.json()).then(data => {
        setCredits(data.credits);
      });
    }
  }, [session]);

  // Only scroll when user sends a new message, not during streaming
  const prevUserMsgCount = useRef(0);
  useEffect(() => {
    const userCount = messages.filter((m) => m.role === "user").length;
    if (userCount > prevUserMsgCount.current) {
      prevUserMsgCount.current = userCount;
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const savePendingChat = (pending: PendingChat) => {
    window.sessionStorage.setItem(pendingChatKey, JSON.stringify(pending));
    if (pending.contextBrief) {
      window.sessionStorage.setItem("summon_intake", pending.text);
    }
    setPendingSignIn(pending);
  };

  const readPendingChat = (): PendingChat | null => {
    const serialized = window.sessionStorage.getItem(pendingChatKey);
    if (!serialized) return null;
    try {
      const parsed = JSON.parse(serialized) as Partial<PendingChat>;
      if (typeof parsed.text !== "string" || !parsed.text.trim()) return null;
      return {
        text: parsed.text,
        contextBrief: Boolean(parsed.contextBrief),
      };
    } catch {
      return null;
    }
  };

  const continueWithGoogle = async () => {
    if (!pendingSignIn || signingIn) return;
    savePendingChat(pendingSignIn);
    setSigningIn(true);
    await signIn("google", {
      redirectTo: `${window.location.pathname}${window.location.search}`,
    });
    setSigningIn(false);
  };

  // Auto-send the matcher intake. New landing-page submissions travel through
  // session storage so personal context never appears in the URL and survives
  // the Google OAuth round trip. It is cleared only after a successful answer.
  // The legacy q parameter remains supported for older shared links.
  const preloadSent = useRef(false);
  useEffect(() => {
    if (preloadSent.current || sessionStatus === "loading") return;
    const storedIntake = hasStoredIntake
      ? window.sessionStorage.getItem("summon_intake")
      : null;
    const pending = readPendingChat() || (storedIntake || preloadedQuery
      ? {
          text: storedIntake || preloadedQuery || "",
          contextBrief: Boolean(storedIntake),
        }
      : null);
    if (!pending) return;
    if (!session?.user) {
      savePendingChat(pending);
      return;
    }
    setPendingSignIn(null);
    const timer = window.setTimeout(() => {
      preloadSent.current = true;
      void sendQuickMessage(pending.text, pending.contextBrief);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [hasStoredIntake, preloadedQuery, session, sessionStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      audioRequestRef.current?.abort();
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const autoPlayTTS = useCallback(async (text: string) => {
    if (!voiceEnabledRef.current) return;
    audioRequestRef.current?.abort();
    const controller = new AbortController();
    audioRequestRef.current = controller;
    try {
      setAudioError(null);
      setPreparingAudio(true);
      setCanReplay(false);
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, figureSlug }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("Voice is unavailable right now. Your answer is in the transcript; use Back to chat to read it.");

      const blob = await res.blob();
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(blob);

      // Revoke old audio URL
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (lastAudioUrl) {
        URL.revokeObjectURL(lastAudioUrl);
      }

      setLastAudioUrl(url);
      const audio = new Audio(url);
      audioRef.current = audio;
      recorderRef.current?.attach(audio);
      setPreparingAudio(false);
      setIsSpeaking(true);
      audio.onended = () => { setIsSpeaking(false); setCanReplay(true); };
      audio.onerror = () => { setIsSpeaking(false); setAudioError("Audio could not play. Return to chat to read the answer."); setCanReplay(true); };
      await audio.play();
    } catch (error) {
      if (controller.signal.aborted) return;
      setPreparingAudio(false);
      setIsSpeaking(false);
      setAudioError(error instanceof Error && error.message.startsWith("Voice is") ? error.message : "Audio could not play. Return to chat and select Listen again.");
      setCanReplay(true);
    }
  }, [figureSlug, lastAudioUrl]);

  const replayAudio = useCallback(() => {
    if (lastAudioUrl) {
      const audio = new Audio(lastAudioUrl);
      audioRef.current = audio;
      recorderRef.current?.attach(audio);
      audio.onended = () => { setIsSpeaking(false); setCanReplay(true); };
      audio.onerror = () => { setIsSpeaking(false); setCanReplay(true); };
      setIsSpeaking(true);
      setCanReplay(false);
      audio.play().catch(() => {
        // An interrupted/replaced replay must not update the new audio session.
        if (audioRef.current !== audio) return;
        setIsSpeaking(false);
        setCanReplay(true);
        setAudioError("Audio could not play. Try Listen again, or read the transcript.");
      });
    }
  }, [lastAudioUrl]);

  const stopSpeaking = useCallback(() => {
    audioRequestRef.current?.abort();
    setPreparingAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
    setCanReplay(!!lastAudioUrl);
  }, [lastAudioUrl]);

  if (!figure) {
    return (
      <div className="min-h-screen bg-warm-50 text-ink-950 flex items-center justify-center">
        <p className="text-warm-500">Figure not found. <Link href="/" className="underline">Back</Link></p>
      </div>
    );
  }

  const handleStream = async (newMessages: Message[]) => {
    setLoading(true);
    setStreamingContent("");
    setFollowups([]);
    setModelRoute(null);
    stopSpeaking();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ figure: figureSlug, messages: newMessages, mode: callMode ? "voice" : "text" }),
      });

      if (res.status === 401) {
        const lastUserMessage = [...newMessages]
          .reverse()
          .find((message) => message.role === "user");
        if (lastUserMessage) {
          savePendingChat({
            text: lastUserMessage.content,
            contextBrief: Boolean(lastUserMessage.contextBrief),
          });
        }
        setMessages(newMessages);
        preloadSent.current = false;
        return;
      }

      if (res.status === 402 || res.status === 429) {
        setMessages(newMessages);
        setShowPaywall(true);
        return;
      }

      const accumulated = await readChatStream(res, {
        onText: setStreamingContent,
        onMeta: setModelRoute,
      });
      if (!accumulated.trim()) {
        throw new Error("The guide did not return an answer. Please try again.");
      }

      const {
        displayText,
        ttsText,
        citations: newCitations,
        followups: newFollowups,
      } = cleanResponse(accumulated);
      const citationText = newCitations
        .map((citation) => {
          const byIndex = citation.lastIndexOf(" by ");
          if (byIndex === -1) return "";
          return `[Source: "${citation.slice(0, byIndex)}" by ${citation.slice(byIndex + 4)}]`;
        })
        .filter(Boolean)
        .join("\n");
      const assistantMessage = {
        role: "assistant" as const,
        content: [displayText, citationText].filter(Boolean).join("\n\n"),
      };
      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      setStreamingContent("");
      setFollowups(newFollowups);
      window.sessionStorage.removeItem(pendingChatKey);
      window.sessionStorage.removeItem("summon_intake");
      setPendingSignIn(null);

      // Decrement credit
      decrementCredits();

      if (ttsText && !ttsText.startsWith("I cannot respond")) {
        autoPlayTTS(ttsText);
      }

      maybeExtractQuote(finalMessages);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Try again.";
      setMessages([...newMessages, { role: "assistant", content: message }]);
      setStreamingContent("");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    if (!session?.user) {
      savePendingChat({ text: trimmed, contextBrief: false });
      return;
    }

    // Check credits
    if (effectiveCredits !== null && effectiveCredits <= 0) {
      setShowPaywall(true);
      return;
    }

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    handleStream(newMessages);
  };

  const sendQuickMessage = (text: string, contextBrief = false) => {
    if (loading) return;
    if (!session?.user) {
      savePendingChat({ text, contextBrief });
      setShowReason(false);
      return;
    }

    // Check credits
    if (effectiveCredits !== null && effectiveCredits <= 0) {
      setShowPaywall(true);
      return;
    }

    const userMessage: Message = { role: "user", content: text, contextBrief };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    handleStream(newMessages);
  };

  const toggleRecording = async () => {
    setRecordError(null);
    if (recorderRef.current) {
      const recorder = recorderRef.current;
      recorderRef.current = null;
      setRecording(false);
      const blob = await recorder.stop();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = recordingFileName(figureSlug, blob);
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      return;
    }
    try {
      recorderRef.current = await startCallRecorder();
      setRecording(true);
    } catch (error) {
      setRecordError(error instanceof Error ? error.message : "Recording could not start.");
    }
  };

  const openCall = () => { voiceEnabledRef.current = true; setCallMode(true); };
  const closeCall = () => {
    voiceEnabledRef.current = false;
    stopSpeaking();
    if (recorderRef.current) void toggleRecording();
    setCallMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className={`${chatStyles.shell} ${chatStyles.person} h-[100dvh] flex flex-col overflow-hidden relative`}>
      {callMode && <GuideCall minimal
        name={figure.name}
        portrait={figure.portrait}
        loading={loading || preparingAudio}
        speaking={isSpeaking}
        blocked={Boolean(pendingSignIn || showPaywall) || sessionStatus === "loading"}
        audioError={audioError}
        caption={cleanResponse(streamingContent || [...messages].reverse().find(m => m.role === "assistant")?.content || "").displayText}
        onSend={sendQuickMessage}
        onInterrupt={stopSpeaking}
        onClose={closeCall}
        recording={recording}
        recordError={recordError}
        onToggleRecord={() => void toggleRecording()}
      />}
      <div className="contents" inert={callMode}>
      {/* Top bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between px-4 pt-[max(12px,env(safe-area-inset-top))] pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Back to guides" className="w-11 h-11 rounded-full bg-white/75 backdrop-blur-sm border border-warm-200 flex items-center justify-center text-warm-500 hover:text-ink-950 hover:bg-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <button type="button" onClick={openCall} aria-label={`Call ${figure.name}`} className="w-11 h-11 rounded-full bg-white/75 backdrop-blur-sm border border-warm-200 flex items-center justify-center text-warm-500 hover:text-ink-950 hover:bg-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
            </svg>
          </button>
        </div>

        <Link href={`/${figureSlug}/about`} className="flex items-center gap-2 text-sm">{figure.portrait && <Image src={figure.portrait} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />}{figure.name}</Link>
        <span className="rounded-full border border-warm-200 bg-white/75 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-warm-500" title={`An AI simulation built from ${figure.name}'s public work, not their words`}>AI simulation</span>
        {preparingAudio && <span role="status">Preparing audio…</span>}
        {audioError && <p role="alert" className="text-xs">{audioError}</p>}
        <AnimatePresence mode="wait">
          {isSpeaking ? (
            <motion.button
              key="speaking"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={stopSpeaking}
              className="flex items-center gap-2 bg-white/75 backdrop-blur-sm border border-warm-200 rounded-full px-4 py-2.5 hover:bg-white transition-colors min-h-[44px]"
            >
              <div className="flex items-end gap-[2px] h-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-[2px] rounded-full waveform-bar" style={{ height: "100%", animationDelay: `${i * 0.15}s`, backgroundColor: figure.color }} />
                ))}
              </div>
              <span className="text-xs text-ink-950">Speaking</span>
            </motion.button>
          ) : canReplay ? (
            <motion.button
              key="replay"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={replayAudio}
              className="flex items-center gap-2 bg-white/75 backdrop-blur-sm border border-warm-200 rounded-full px-4 py-2.5 hover:bg-white transition-colors min-h-[44px]"
            >
              <svg className="w-4 h-4 text-ink-950" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-xs text-ink-950">Listen again</span>
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Middle content area */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        {!hasMessages ? (
          /* Empty state */
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center overflow-y-auto px-4 pb-5 text-center">
            {showReason && matchReason && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 mb-5 border border-warm-200">
                <p className="text-sm text-ink-950/75 italic">{matchReason}</p>
              </div>
            )}

            <GuidePortraitLines slug={figure.slug} name={figure.name} portrait={figure.portrait} />
            <h1 className="text-2xl font-medium tracking-tight">{figure.name}</h1>
            <span className="mt-2 max-w-xs text-center text-xs leading-relaxed text-warm-500">{guideDisclosure(figure.slug, figure.name)}</span>

          </div>
        ) : (
          /* Conversation - scrollable */
          <div className="flex-1 overflow-y-auto px-4 py-4 chat-scroll">
            <div className="max-w-2xl mx-auto space-y-6">
              {messages.map((msg, i) => {
                if (msg.role === "user") {
                  if (msg.contextBrief) {
                    return (
                      <div key={i} className="flex justify-end">
                        <div className="max-w-[88%] rounded-xl border border-warm-200 bg-white/85 px-4 py-3.5 backdrop-blur-sm sm:max-w-[78%]">
                          <p className="text-[10px] tracking-[0.16em] text-warm-500 uppercase">
                            Personal context attached
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-950/75">
                            Use this brief to understand my goals, priorities, and constraints.
                          </p>
                          <details className="group mt-3 border-t border-warm-200 pt-3">
                            <summary className="cursor-pointer text-xs text-warm-500 marker:text-warm-400 hover:text-ink-950">
                              Review the brief
                            </summary>
                            <p className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-warm-100 p-3 text-xs leading-relaxed text-ink-950/70">
                              {msg.content}
                            </p>
                          </details>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="flex justify-end">
                      <div
                        className="max-w-[82%] rounded-2xl rounded-br-md px-4 py-3.5"
                        style={{ backgroundColor: "#222" }}
                      >
                        <p className="text-sm text-white leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>
                    </div>
                  );
                }
                const { body, citations: msgCitations } = parseCitations(msg.content);
                const { body: cleanBody } = parseFollowups(body);
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="relative mt-5 size-8 shrink-0 overflow-hidden rounded-full border border-warm-200 bg-warm-100">
                      {figure.portrait ? (
                        <Image
                          src={figure.portrait}
                          alt=""
                          fill
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center font-serif text-[10px] text-warm-500">
                          {figure.name.split(" ").map((name) => name[0]).join("").slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1.5 text-[10px] tracking-[0.16em] text-warm-500 uppercase">
                        {figure.name}
                      </p>
                      <div
                        className="py-2"

                      >
                        <p className="text-[15px] text-ink-950/85 leading-[1.8] whitespace-pre-wrap break-words">{cleanBody}</p>
                        <ListenButton text={cleanBody} guide={figureSlug} />
                        {msgCitations.length > 0 && (
                          <details className="mt-2 space-y-1.5 text-warm-500"><summary className="cursor-pointer py-3 text-xs">Sources</summary>
                            {msgCitations.map((c, ci) => (
                              <p key={ci} className="text-[11px] text-warm-500 italic flex items-start gap-1.5">
                                <svg className="mt-0.5 w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                {c}
                              </p>
                            ))}
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {streamingContent && (
                <div className="flex items-start gap-3">
                  <div className="mt-5 size-8 shrink-0 rounded-full border border-warm-200 bg-warm-100" />
                  <div className="min-w-0 flex-1">
                    <p className="mb-1.5 text-[10px] tracking-[0.16em] text-warm-500 uppercase">{figure.name}</p>
                    <div
                      className="py-2"

                    >
                      <p className="text-[15px] text-ink-950/85 leading-[1.8] whitespace-pre-wrap break-words">
                        {streamingContent}
                        <span className="inline-block w-[2px] h-[16px] bg-warm-400 ml-0.5 animate-pulse align-text-bottom" />
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {loading && !streamingContent && (
                <div className="flex items-start gap-3">
                  <div className="mt-5 size-8 shrink-0 animate-pulse rounded-full bg-warm-200" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 h-2.5 w-24 animate-pulse rounded-full bg-warm-200" />
                    <div className="space-y-2 rounded-xl border border-warm-200 bg-white/70 px-4 py-4">
                      <div className="h-3 w-full animate-pulse rounded-full bg-warm-200" />
                      <div className="h-3 w-4/5 animate-pulse rounded-full bg-warm-200" />
                      <div className="h-3 w-2/3 animate-pulse rounded-full bg-warm-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      <details className="absolute right-4 top-3 z-30 text-warm-500">
        <summary aria-label="Conversation options" className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full text-xl hover:bg-white/10 [&::-webkit-details-marker]:hidden">···</summary>
        <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-32px)] rounded-2xl border border-white/10 bg-neutral-950 p-3 shadow-xl">
          <button
            type="button"
            disabled={!messages.length}
            onClick={async () => {
              const body = messages
                .filter((m) => !m.contextBrief)
                .map((m) => `**${m.role === "user" ? "Me" : `AI version of ${figure.name}`}:** ${m.content}`)
                .join("\n\n");
              const text = `# Sparring with the AI version of ${figure.name}\n\nAI simulation from summon.guide/${figureSlug}, built from ${figure.name}'s public work. Not their words.\n\n${body}\n`;
              try {
                await navigator.clipboard.writeText(text);
                setConversationCopied(true);
                window.setTimeout(() => setConversationCopied(false), 2000);
              } catch {
                setConversationCopied(false);
              }
            }}
            className="flex min-h-[44px] w-full items-center rounded-xl px-3 text-left text-sm text-white/90 hover:bg-white/10 disabled:opacity-40"
          >
            {conversationCopied ? "Copied" : "Copy conversation"}
          </button>
          <div className="mt-2 border-t border-white/10 px-3 pt-3 text-xs">
            <p>{guideDisclosure(figure.slug, figure.name)} Synthetic voice.</p>
            {modelRoute && <ModelRouteBadge route={modelRoute} />}
            {effectiveCredits !== null && <p>{effectiveCredits} messages remaining</p>}
          </div>
        </div>
      </details>

      {/* Input area - mobile safe */}
      <div className="relative z-10 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-1 shrink-0">
        <div className="max-w-2xl mx-auto">
          <PromptBubbles prompts={hasMessages ? followups : getSuggestedQuestions(figure.slug)} disabled={loading} onSelect={q => { setShowReason(false); void sendQuickMessage(q); }} />
          <ChatComposer
            textareaRef={inputRef}
            value={input}
            onChange={setInput}
            onKeyDown={handleKeyDown}
            onSend={sendMessage}
            placeholder="What’s on your mind?"
            disabled={loading}
          />
        </div>
      </div>

      </div>
      {/* Google sign-in gate. The pending question stays in session storage so
          the OAuth round trip can return to this exact guide and resume. */}
      <AnimatePresence>
        {pendingSignIn && !session?.user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-ink-950/65 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="summon-sign-in-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="w-full max-w-sm rounded-2xl border border-warm-200 bg-warm-50 p-6 shadow-2xl sm:p-8"
            >
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-warm-500">
                Free testing access
              </p>
              <h2 id="summon-sign-in-title" className="font-serif text-2xl font-medium tracking-tight text-ink-950">
                Your guide is ready.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-warm-500">
                Continue with Google to return to {figure.name} and start with
                the context you already shared. No payment is required while
                we test Summon.
              </p>
              <Button
                onClick={continueWithGoogle}
                disabled={signingIn}
                className="mt-6 h-12 w-full rounded-full bg-ink-950 text-white hover:bg-ink-800"
              >
                <span aria-hidden className="mr-2 flex size-6 items-center justify-center rounded-full bg-white font-sans text-sm font-semibold text-ink-950">
                  G
                </span>
                {signingIn ? "Opening Google..." : "Continue with Google"}
              </Button>
              <button
                type="button"
                onClick={() => setPendingSignIn(null)}
                className="mt-2 min-h-11 w-full px-4 text-sm text-warm-500 transition-colors hover:text-ink-950"
              >
                Not now
              </button>
              <p className="mt-2 text-center text-[11px] leading-relaxed text-warm-400">
                Your pending brief stays in this browser until the guide answers.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wisdom Card share panel */}
      <AnimatePresence>
        {showWisdomCard && wisdomQuote && figure && (
          <WisdomCard
            quote={wisdomQuote}
            figureName={figure.name}
            era={figure.era}
            figureSlug={figure.slug}
            figureColor={figure.color}
            onDismiss={() => setShowWisdomCard(false)}
          />
        )}
      </AnimatePresence>

      {/* Feedback modal */}
      {showFeedback && figure && (
        <FeedbackModal
          figureSlug={figure.slug}
          figureName={figure.name}
          onClose={() => {
            setShowFeedback(false);
            setFeedbackGiven(true);
            setShowPaywall(true);
          }}
        />
      )}

      {/* Paywall modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-ink-950/65 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-warm-50 rounded-2xl border border-warm-200 p-6 sm:p-8 max-w-sm w-full text-center"
            >
              <h2 className="text-xl sm:text-2xl font-serif font-medium text-ink-950 mb-2">
                Keep the conversation going
              </h2>
              <p className="text-warm-500 text-sm mb-6">
                You&apos;ve used all your free messages. Get 100 more to continue learning from humanity&apos;s greatest.
              </p>
              <a
                href="https://buy.stripe.com/7sY4gz0wy7cFeUM1q9aMU0i"
                onClick={() => {
                  posthog?.capture("checkout_click", { plan: "100_messages", price: 10, source: "chat" });
                  posthog.capture("checkout_click", { plan: "100_messages", price: 10, source: "chat" });
                }}
                className="block w-full bg-ink-950 text-white rounded-full py-3 px-6 text-sm font-medium hover:bg-ink-800 transition-colors mb-3 min-h-[48px] flex items-center justify-center"
              >
                100 messages for $10
              </a>
              <button
                onClick={() => setShowPaywall(false)}
                className="min-h-11 px-4 text-sm text-warm-500 hover:text-ink-950 transition-colors"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getSuggestedQuestions(slug: string): string[] {
  const questions: Record<string, string[]> = {
    "pendleton-ward": [
      "How can I make creating feel fun again?",
      "Help me turn a weird idea into a small story.",
      "How do I stop judging everything I make?",
    ],
    hesse: [
      "Why does Siddhartha refuse the Buddha?",
      "I feel like I wasted years. Were they wasted?",
      "Everyone keeps giving me advice and none of it helps.",
    ],
    pressfield: [
      "I have wanted to start this for two years and I still have not.",
      "How do I tell real doubt from Resistance?",
      "What does turning pro actually change on Monday morning?",
    ],
    vervaeke: [
      "I have read everything about this and I still cannot do it. Why?",
      "Nothing feels meaningful and I cannot tell if that is depression or something else.",
      "How do I train what I notice, instead of just trying harder to focus?",
    ],
    "rockefeller": [
      "How do I make my first dollar?",
      "What did Ledger A teach you?",
      "Turn a crisis into opportunity?",
    ],
    "elon": [
      "How do you think from first principles?",
      "What was 2008 like for you?",
      "How do you compress timelines?",
    ],
    "franklin": [
      "How did you teach yourself to write?",
      "Tell me about the 13 virtues.",
      "How do you reinvent yourself?",
    ],
    "alexander": [
      "How do you lead from the front?",
      "What did Aristotle teach you?",
      "How did you conquer Persia?",
    ],
    "lee-kuan-yew": [
      "How did you build Singapore?",
      "What makes a nation succeed?",
      "How do you fight corruption?",
    ],
    "deutsch": [
      "What is the beginning of infinity?",
      "How does knowledge grow?",
      "Why are problems soluble?",
    ],
    "marcus-aurelius": [
      "How do I stop being controlled by what I can't control?",
      "How do you stay calm under impossible pressure?",
      "What would you tell yourself each morning?",
    ],
    "marc-andreessen": [
      "What should I build right now?",
      "Which wave am I really in?",
      "How do I stop reading about it and start shipping?",
    ],
    "adam-neumann": [
      "Is my mission a moat or marketing?",
      "How do I tell a story that compresses my next round?",
      "Would my company survive an S-1 reading today?",
    ],
    "brad-jacobs": [
      "I've found a fragmented, boring industry. How do I know if it's actually worth consolidating?",
      "I just closed an acquisition. What do I actually do in the first 100 days?",
      "How do I know if I should keep fighting for a deal or walk away like you did with GMS?",
    ],
    "seneca": [
      "Where am I wasting time without noticing?",
      "How do I stop reacting from anger?",
      "What practice would actually hold for a year?",
    ],
    "ricky-gervais": [
      "How do I find the funny in something true instead of just making it up?",
      "How do I write a cringe character the audience roots for anyway?",
      "How do I handle a joke that people are calling offensive?",
    ],
    "marie-curie": [
      "How do I keep going when the work is years long and thankless?",
      "My results don't match what I expected: do I trust them or myself?",
      "How do I stay focused on the work when everything around me is falling apart?",
    ],
    "bob-marley": [
      "I keep getting knocked down, how do I find the strength to keep showing up?",
      "Someone hurt me badly and I want to get even: how do I choose one love over revenge?",
      "How do I free my own mind from the fear and the labels other people put on me?",
    ],
    "senra": [
      "What's the one book I should actually be reading for the problem I'm dealing with right now?",
      "How do I know if I actually believe in what I'm building, or if I'm just performing confidence?",
      "Is my problem really about money, or is it about losing control?",
    ],
    "paul-graham": [
      "Is this a real startup idea, or does it only sound like one?",
      "What should I do manually before I try to scale this?",
      "How do I protect enough maker time to actually build the thing?",
    ],
    "sivers": [
      "I have an opportunity in front of me and I can't tell if it's a hell yeah or just a maybe I'm talking myself into.",
      "I have an idea I think is great but I don't trust my own judgment of it anymore.",
      "I believe something that helps me but I'm not sure it's actually true. Should I let it go?",
    ],
    "visakan": [
      "I feel like an impostor even when things are going well, what's actually going on?",
      "I have a big ambitious idea but I'm scared to say it out loud. What do I do?",
      "How do I write my way through something I don't understand yet instead of waiting until I do?",
    ],
    "james-clear": [
      "I keep starting habits and quitting after a week. What am I doing wrong?",
      "How do I actually change my identity, not just my behavior?",
      "My habit isn't sticking even though I want it to. Is it my willpower or my environment?",
    ],
    "cal-newport": [
      "My day is full but I don't feel like I made anything. What's actually happening?",
      "Should I quit social media, or just be more disciplined about how I use it?",
      "How do I find the rare, valuable skill I should actually be building?",
    ],
    "tim-ferriss": [
      "I've wanted to do this for years and keep talking myself out of it. Help me fear-set it.",
      "What's the smallest test I could run this week to get a real answer instead of guessing?",
      "What would this problem look like if it were easy?",
    ],
    "annie-duke": [
      "A decision I made worked out badly. Was it actually a bad decision, or just bad luck?",
      "How do I know if I'm staying in something out of stubbornness instead of good reasons?",
      "How do I get honest with myself about how uncertain I actually am?",
    ],
    "carol-dweck": [
      "I failed at something and now I don't want to try again. What's going on in my head?",
      "How do I actually build a growth mindset, not just say the words?",
      "Am I praising the people around me in a way that's helping or hurting them?",
    ],
    "paul-millerd": [
      "I have a stable job that looks great from the outside but I feel like I'm disappearing into it.",
      "How do I know if I actually chose this path or just inherited it?",
      "I want to leave but I'm terrified of having no plan. What was the void actually like?",
    ],
    "napoleon-hill": [
      "I want something big but I'm not sure I actually believe I can have it.",
      "How do I know if my desire is a burning desire or just a passing wish?",
      "What is a mastermind, and how do I build one around my own goal?",
    ],
  };
  return questions[slug] || ["What was your most important decision?", "What advice for a young person?"];
}
