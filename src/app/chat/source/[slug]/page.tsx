"use client";

import { useState, useRef, useEffect, use, useCallback } from "react";
import { getBook } from "@/lib/books";
import { getSourceCorpus } from "@/lib/sourceCorpus";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";

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
function defaultSuggestedQuestions(title: string): string[] {
  return [
    `What's a recurring idea across ${title}?`,
    "What's a specific story or example worth knowing?",
    "What would this corpus say I'm missing?",
  ];
}

export default function SourceChatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const book = getBook(slug);
  const corpus = getSourceCorpus(slug);

  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [credits, setCredits] = useState<number | null>(null);
  const [anonCredits, setAnonCredits] = useState<number>(25);
  const [showPaywall, setShowPaywall] = useState(false);
  const [followups, setFollowups] = useState<string[]>([]);
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

    try {
      const res = await fetch("/api/chat/source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: slug, messages: newMessages }),
      });
      if (!res.ok) throw new Error("Failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split("\n")) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                accumulated = parsed.error;
                setStreamingContent(accumulated);
                break;
              }
              if (parsed.text) {
                accumulated += parsed.text;
                setStreamingContent(accumulated);
              }
            } catch {
              /* skip */
            }
          }
        }
      }

      const { displayText, followups: newFollowups } = cleanResponse(accumulated);
      const assistantMessage = { role: "assistant" as const, content: displayText };
      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      setStreamingContent("");
      setFollowups(newFollowups);
      decrementCredits();
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Something went wrong. Try again." }]);
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
      <div className="relative z-10 flex items-center justify-between px-4 pt-[max(12px,env(safe-area-inset-top))] pb-2 shrink-0">
        <Link
          href={`/books/${slug}`}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      {/* Middle content area */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        {!hasMessages ? (
          <div className="flex-1 flex flex-col justify-end px-4 pb-4 overflow-y-auto">
            <p className="text-warm-400 text-xs tracking-[0.25em] uppercase mb-2">
              A corpus, not a person
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-white mb-1">
              {corpus.title}
            </h1>
            <p className="text-white/50 text-sm mb-4">
              By {corpus.host} &middot; {corpus.episodes.length} episodes synthesized
            </p>
            <p className="text-white/60 text-sm mb-4">
              This answers only from the corpus below. It is not {corpus.host}, it does not
              pretend to be, and it will say so if you ask.
            </p>

            <div className="flex flex-wrap gap-2">
              {defaultSuggestedQuestions(corpus.title).map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendQuickMessage(q)}
                  className="text-sm text-white/80 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2.5 hover:bg-white/20 transition-all min-h-[44px]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-3 chat-scroll">
            <div className="max-w-2xl mx-auto space-y-3">
              {messages.map((msg, i) => {
                if (msg.role === "user") {
                  return (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[85%] bg-white/15 backdrop-blur-sm rounded-2xl rounded-br-sm px-4 py-3">
                        <p className="text-sm text-white leading-relaxed whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  );
                }
                const { body, citations: msgCitations } = parseCitations(msg.content);
                const { body: cleanBody } = parseFollowups(body);
                const isLatest = i === messages.length - 1;
                return (
                  <div key={i} className="flex flex-col justify-start gap-1">
                    <div className={`max-w-[90%] ${isLatest ? "" : "opacity-60"}`}>
                      <p className="text-[15px] text-white leading-[1.8] whitespace-pre-wrap break-words">
                        {cleanBody}
                      </p>
                    </div>
                    {msgCitations.length > 0 && (
                      <div className="max-w-[90%] mt-1">
                        {msgCitations.map((c, ci) => (
                          <p key={ci} className="text-[11px] text-white/30 italic flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {c}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {streamingContent && (
                <div className="flex justify-start">
                  <div className="max-w-[90%]">
                    <p className="text-[15px] text-white leading-[1.8] whitespace-pre-wrap break-words">
                      {streamingContent}
                      <span className="inline-block w-[2px] h-[16px] bg-white/60 ml-0.5 animate-pulse align-text-bottom" />
                    </p>
                  </div>
                </div>
              )}

              {loading && !streamingContent && (
                <div className="flex gap-1.5 py-2">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {followups.length > 0 && !loading && hasMessages && (
        <div className="relative z-10 px-4 py-2 shrink-0">
          <div className="max-w-2xl mx-auto flex flex-wrap gap-1.5">
            {followups.map((q, i) => (
              <button
                key={i}
                onClick={() => sendQuickMessage(q)}
                className="text-xs text-white/70 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 hover:bg-white/20 transition-all min-h-[36px] text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {effectiveCredits !== null && (
        <div className="relative z-10 px-4 py-1 flex justify-center shrink-0">
          <span className="text-[10px] text-white/30">
            {effectiveCredits} messages remaining{!session?.user ? " (free trial)" : ""}
          </span>
        </div>
      )}

      <div className="relative z-10 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-1 shrink-0">
        <div className="flex gap-2 max-w-2xl mx-auto items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${corpus.title}...`}
            className="flex-1 min-w-0 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 text-[16px] text-white placeholder-white/30 resize-none focus:outline-none focus:border-white/25 transition-colors leading-normal"
            rows={1}
            disabled={loading}
            style={{ fontSize: "16px" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-white text-ink-950 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
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
