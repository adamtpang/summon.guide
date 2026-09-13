"use client";

import { useState, useRef, useEffect, use, useCallback } from "react";
import { getBook } from "@/lib/books";
import { getSourceCorpus } from "@/lib/sourceCorpus";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { usePostHog } from "posthog-js/react";
import posthog from "posthog-js";
import ModelRouteBadge from "@/components/ModelRouteBadge";
import ListenButton from "@/components/ListenButton";
import PromptBubbles from "@/components/PromptBubbles";
import ChatComposer from "@/components/ChatComposer";
import type { ModelRouteMeta } from "@/lib/aiTypes";
import { readChatStream } from "@/lib/readChatStream";
import { FOUNDERS_LENS_PROMPTS } from "@/lib/foundersLens";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function parseCitations(text: string): { body: string; citations: string[] } {
  const citationRegex = /\[Source:\s*"([^"]+)"\]/g;
  const citations: string[] = [];
  let match;
  while ((match = citationRegex.exec(text)) !== null) {
    citations.push(match[1]);
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

function cleanResponse(text: string): { displayText: string; citations: string[]; followups: string[] } {
  const { body: noCitations, citations } = parseCitations(text);
  const { body: cleanBody, followups } = parseFollowups(noCitations);
  const displayText = cleanBody.replace(/—/g, ",").replace(/–/g, ",");
  return { displayText, citations, followups };
}

// Corpus-chat has no persona, so no per-figure question voice; these lean on
// "what does the material say" rather than "give me your advice."
function defaultSuggestedQuestions(title: string, slug: string): string[] {
  if (slug === "founders-podcast") {
    return FOUNDERS_LENS_PROMPTS.slice(0, 3).map((item) => item.prompt);
  }
  return [
    `What's a recurring idea across ${title}?`,
    "What's a specific story or example worth knowing?",
    "What would this corpus say I'm missing?",
  ];
}

export default function SourceChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { slug } = use(params);
  const query = use(searchParams);
  const requestedPrompt = Array.isArray(query.q) ? query.q[0] : query.q;
  const book = getBook(slug);
  const corpus = getSourceCorpus(slug);
  const posthog = usePostHog();

  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(() => requestedPrompt?.slice(0, 1200) || "");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [credits, setCredits] = useState<number | null>(null);
  const [anonCredits, setAnonCredits] = useState<number>(25);
  const [showPaywall, setShowPaywall] = useState(false);
  const [followups, setFollowups] = useState<string[]>([]);
  const [modelRoute, setModelRoute] = useState<ModelRouteMeta | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0 || !!streamingContent;

  useEffect(() => {
    if (typeof window !== "undefined" && !session?.user) {
      const stored = localStorage.getItem("legends_anon_credits");
      if (stored !== null) setAnonCredits(parseInt(stored, 10));
    }
  }, [session]);

  const effectiveCredits = session?.user ? credits : anonCredits;

  const decrementCredits = useCallback(async () => {
    if (session?.user) {
      const res = await fetch("/api/credits", { method: "POST" });
      const data = await res.json();
      if (data.credits !== undefined) setCredits(data.credits);
    } else {
      setAnonCredits((prev) => {
        const next = Math.max(0, prev - 1);
        if (typeof window !== "undefined") {
          localStorage.setItem("legends_anon_credits", String(next));
        }
        if (next === 0) setTimeout(() => signIn("google"), 500);
        return next;
      });
    }
  }, [session]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/credits").then((r) => r.json()).then((data) => setCredits(data.credits));
    }
  }, [session]);

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

  if (!book || !book.corpusPaths?.length || !corpus) {
    return (
      <div className="min-h-screen bg-ink-950 text-warm-100 flex items-center justify-center">
        <p className="text-warm-400">
          Source not found. <Link href="/" className="underline">Back</Link>
        </p>
      </div>
    );
  }

  const handleStream = async (newMessages: Message[]) => {
    setLoading(true);
    setStreamingContent("");
    setFollowups([]);
    setModelRoute(null);

    try {
      const res = await fetch("/api/chat/source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: slug, messages: newMessages }),
      });
      const accumulated = await readChatStream(res, {
        onText: setStreamingContent,
        onMeta: setModelRoute,
      });

      const {
        displayText,
        citations: newCitations,
        followups: newFollowups,
      } = cleanResponse(accumulated);
      const citationText = newCitations
        .map((citation) => `[Source: "${citation}"]`)
        .join("\n");
      const assistantMessage = {
        role: "assistant" as const,
        content: [displayText, citationText].filter(Boolean).join("\n\n"),
      };
      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      setStreamingContent("");
      setFollowups(newFollowups);
      decrementCredits();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Try again.";
      setMessages([...newMessages, { role: "assistant", content: message }]);
      setStreamingContent("");
    } finally {
      setLoading(false);
    }
  };

  const sendQuickMessage = (text: string) => {
    if (effectiveCredits !== null && effectiveCredits <= 0) {
      if (!session?.user) signIn("google");
      else setShowPaywall(true);
      return;
    }
    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    handleStream(newMessages);
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    sendQuickMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[100dvh] bg-ink-950 text-warm-100 flex flex-col overflow-hidden relative">
      {/* Top bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between px-4 pt-[max(12px,env(safe-area-inset-top))] pb-2 shrink-0">
        <Link
          href={`/books/${slug}`}
          aria-label="Back to source"
          className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-sm flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      {/* Middle content area */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        {!hasMessages ? (
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center overflow-y-auto px-4 pb-5 text-center">
            {book.image ? <Image src={book.image} alt={corpus.title} width={144} height={180} priority className="mb-6 h-44 w-auto max-w-40 rounded-xl object-cover shadow-[0_0_70px_-20px_#4a78bb]" /> : <span className="mb-6 text-7xl" aria-hidden="true">📖</span>}
            <h1 className="max-w-lg text-2xl font-medium tracking-tight text-white">{corpus.title}</h1>
            <span className="mt-2 text-xs text-white/45">AI source guide</span>
          </div>
        ) : (
          <div className="chat-scroll flex-1 overflow-y-auto px-4 py-4">
            <div className="mx-auto max-w-2xl space-y-6">
              {messages.map((msg, i) => {
                if (msg.role === "user") {
                  return (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-warm-50 px-4 py-3 text-ink-950 sm:max-w-[78%]">
                        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  );
                }
                const { body, citations: msgCitations } = parseCitations(msg.content);
                const { body: cleanBody } = parseFollowups(body);
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-5 shrink-0">
                      {book.image ? (
                        <Image
                          src={book.image}
                          alt=""
                          width={32}
                          height={40}
                          className="h-10 w-8 rounded object-cover ring-1 ring-white/15"
                        />
                      ) : (
                        <div className="flex size-8 items-center justify-center rounded-md bg-white/10 font-serif text-sm text-white/65">
                          {corpus.title[0]}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1.5 text-[10px] tracking-[0.18em] text-white/35 uppercase">
                        Source synthesis
                      </p>
                      <div className="py-2">
                        <p className="whitespace-pre-wrap break-words text-[15px] leading-[1.8] text-white/85">
                          {cleanBody}
                        </p>
                        <ListenButton text={cleanBody} guide={book.figureSlug} />
                        {msgCitations.length > 0 && (
                          <details className="mt-2 space-y-1.5 text-white/50"><summary className="cursor-pointer py-3 text-xs">Sources</summary>
                            {msgCitations.map((c, ci) => (
                              <p
                                key={ci}
                                className="flex items-start gap-1.5 text-[11px] italic leading-relaxed text-white/35"
                              >
                                <svg className="mt-0.5 size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                  <div className="mt-5 shrink-0">
                    {book.image ? (
                      <Image
                        src={book.image}
                        alt=""
                        width={32}
                        height={40}
                        className="h-10 w-8 rounded object-cover ring-1 ring-white/15"
                      />
                    ) : (
                      <div className="flex size-8 items-center justify-center rounded-md bg-white/10 font-serif text-sm text-white/65">
                        {corpus.title[0]}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1.5 text-[10px] tracking-[0.18em] text-white/35 uppercase">
                      Source synthesis
                    </p>
                    <div className="py-2">
                      <p className="whitespace-pre-wrap break-words text-[15px] leading-[1.8] text-white/85">
                        {streamingContent}
                        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-white/60 align-text-bottom" />
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {loading && !streamingContent && (
                <div className="flex items-start gap-3">
                  <div className="mt-5 size-8 shrink-0 rounded-md bg-white/10" />
                  <div className="flex-1">
                    <p className="mb-1.5 text-[10px] tracking-[0.18em] text-white/35 uppercase">
                      Searching the corpus
                    </p>
                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-4">
                      <span className="block h-2 w-11/12 animate-pulse rounded-full bg-white/10" />
                      <span className="block h-2 w-8/12 animate-pulse rounded-full bg-white/10" />
                      <span className="block h-2 w-9/12 animate-pulse rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      <details className="absolute right-4 top-3 z-30 text-white/60">
        <summary aria-label="Conversation options" className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full text-xl hover:bg-white/10 [&::-webkit-details-marker]:hidden">···</summary>
        <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-32px)] rounded-2xl border border-white/10 bg-neutral-950 p-3 shadow-xl">
          <div className="mt-2 border-t border-white/10 px-3 pt-3 text-xs">
            <p>{corpus.episodes.length} source syntheses · Synthetic voice</p>
            <Link href={`/books/${slug}`} className="block py-3 underline">About this source</Link>
            {modelRoute && <ModelRouteBadge route={modelRoute} tone="dark" />}
            {effectiveCredits !== null && <p>{effectiveCredits} messages remaining</p>}
          </div>
        </div>
      </details>

      <div className="relative z-10 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-1 shrink-0">
        <div className="mx-auto max-w-2xl">
          <PromptBubbles prompts={hasMessages ? followups : defaultSuggestedQuestions(corpus.title, slug)} disabled={loading} onSelect={q => { void sendQuickMessage(q); }} />
          <ChatComposer
            value={input}
            onChange={setInput}
            onKeyDown={handleKeyDown}
            onSend={sendMessage}
            placeholder="What’s on your mind?"
            disabled={loading}
            textareaRef={inputRef}
            tone="dark"
          />
        </div>
      </div>

      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center"
            >
              <h2 className="text-xl sm:text-2xl font-serif font-medium text-ink-950 mb-2">
                Keep the conversation going
              </h2>
              <p className="text-warm-400 text-sm mb-6">
                You&apos;ve used all your free messages. Get 100 more to continue learning from humanity&apos;s greatest.
              </p>
              <a
                href="https://buy.stripe.com/7sY4gz0wy7cFeUM1q9aMU0i"
                onClick={() => {
                  posthog?.capture("checkout_click", { plan: "100_messages", price: 10, source: "chat_source" });
                  posthog.capture("checkout_click", { plan: "100_messages", price: 10, source: "chat_source" });
                }}
                className="block w-full bg-ink-950 text-white rounded-full py-3 px-6 text-sm font-medium hover:bg-ink-800 transition-colors mb-3 min-h-[48px] flex items-center justify-center"
              >
                100 messages for $10
              </a>
              <button
                onClick={() => setShowPaywall(false)}
                className="text-sm text-warm-400 hover:text-ink-950 transition-colors"
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
