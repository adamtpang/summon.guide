"use client";
import { completePrompts } from "@/lib/guidePrompts";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ModelRouteBadge from "@/components/ModelRouteBadge";
import { readChatStream } from "@/lib/readChatStream";
import type { ModelRouteMeta } from "@/lib/aiTypes";
import type { SourceEpisode } from "@/lib/sourceCorpus";
import Link from "next/link";
// Call mode paused at Adam's request. Implementation retained in GuideCall.tsx.
// import GuideCall from "@/components/GuideCall";
import ListenButton from "@/components/ListenButton";
import PromptBubbles from "@/components/PromptBubbles";
import ChatComposer from "@/components/ChatComposer";
import "../../public/design/sage-magic.css";
import { ArrowLeft, Plus, MoreHorizontal, Trash2 } from "lucide-react";
import styles from "./SageConversation.module.css";

type Message = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; messages: Message[] };
const STORAGE_KEY = "summon_sage_conversations_v1";


function readConversations(): Conversation[] {
  const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is Conversation => item && typeof item.id === "string"
    && typeof item.title === "string" && Array.isArray(item.messages)
    && item.messages.length <= 100 && item.messages.every((m: Message) => m
      && ["user", "assistant"].includes(m.role) && typeof m.content === "string"))
    .slice(0, 20);
}

function Prose({ text }: { text: string }) {
  return <div className={styles.prose}>{text.split(/\n\n+/).filter(Boolean).map((paragraph, i) => <p key={i}>{paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, j) => part.startsWith("**") ? <strong key={j}>{part.slice(2, -2)}</strong> : part)}</p>)}</div>;
}

// Models sometimes cite an interview by its title without the " | Guest" tail,
// or copy the corpus heading's "(with Guest)" note. Resolve those to the real
// episode so a genuine source is not shown as unverified.
function findSourceEpisode(episodes: SourceEpisode[], cited: string): SourceEpisode | undefined {
  const clean = cited.replace(/\s*\(with [^)]*\)\s*$/i, "").trim();
  return episodes.find((episode) => episode.title === cited || episode.title === clean)
    || episodes.find((episode) => episode.title.split(" | ")[0].trim() === clean);
}

function Answer({ text, episodes }: { text: string; episodes: SourceEpisode[] }) {
  const citations = [...new Set([...text.matchAll(/\[Source:\s*"([^"]+)"\]/g)].map((m) => m[1]))];
  const body = text.replace(/\[Source:[^\]]*\]|\[FOLLOWUP:[^\]]*\]/g, "").trim();
  return <>
    <Prose text={body} />
    {citations.length > 0 && <details className={styles.sources}>
      <summary>{citations.length === 1 ? "Source" : `${citations.length} sources`}</summary>
      {citations.map((title) => {
        const source = findSourceEpisode(episodes, title);
        return <div key={title} className={styles.source}>
          {source?.youtube ? <a href={source.youtube} target="_blank" rel="noopener noreferrer">{title} ↗</a> : <span>{title}{!source && " (unverified)"}</span>}
          {source && <><p>{source.principle}</p><details><summary>Read notes</summary><ul>{source.keyLessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul></details></>}
        </div>;
      })}
    </details>}
  </>;
}

export default function SageConversation({ episodes }: { episodes: SourceEpisode[] }) {
  const search = useSearchParams();
  const seed = search?.get("q") || "";
  const [input, setInput] = useState(seed.slice(0, 8000));
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState("");
  const [stream, setStream] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [route, setRoute] = useState<ModelRouteMeta | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const request = useRef<AbortController | null>(null);
  const feed = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { setSaved(readConversations()); } catch { setNotice("Saved conversations are unavailable in this browser."); }
    });
    return () => { cancelAnimationFrame(frame); request.current?.abort(); };
  }, []);
  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (menu.current && event.target instanceof Node && !menu.current.contains(event.target)) menu.current.open = false;
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  useEffect(() => {
    if (!seed) return;
    const frame = requestAnimationFrame(() => {
      setInput(seed.slice(0, 8000));
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [seed]);

  async function send(text = input) {
    if (request.current || !text.trim()) return;
    const question = text.trim();
    setPending(question); setInput(""); nearBottom.current = true;

    const next: Message[] = [...messages, { role: "user", content: question }];
    const controller = new AbortController();
    request.current = controller;
    setBusy(true); setError(""); setNotice(""); setStream(""); setRoute(null);
    try {
      const response = await fetch("/api/chat/source", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ source: "founders-podcast", messages: next }),
      });
      const answer = await readChatStream(response, { onText: setStream, onMeta: setRoute });
      if (controller.signal.aborted) return;
      if (!answer.trim()) throw new Error("No answer arrived. Your question is ready to retry.");
      setMessages([...next, { role: "assistant", content: answer }]);
      setInput("");

    } catch (failure) {
      setInput(question);
      if (!controller.signal.aborted) setError(failure instanceof Error ? failure.message : "Could not get an answer. Try again.");
    } finally {
      if (request.current === controller) {
        request.current = null; setBusy(false); setStream(""); setPending("");
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }
  }

  function persist(next: Conversation[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(next); return true;
    } catch { setNotice("Could not save on this device. Your conversation is still open."); return false; }
  }

  function save() {
    const id = conversationId || crypto.randomUUID();
    const item = { id, title: messages[0]?.content.slice(0, 100) || "Conversation", messages };
    if (persist([item, ...saved.filter((entry) => entry.id !== id)].slice(0, 20))) {
      setConversationId(id); setNotice("Saved on this device.");
      if (menu.current) menu.current.open = false;
    }
  }

  useEffect(() => {
    if (nearBottom.current && feed.current) feed.current.scrollTop = feed.current.scrollHeight;
  }, [stream, messages, busy]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 160)}px`;
  }, [input]);

  function openConversation(item?: Conversation) {
    window.dispatchEvent(new Event("summon:stop-audio"));
    setMessages(item?.messages || []); setConversationId(item?.id || null);
    setInput(""); setError(""); setNotice(""); setRoute(null);
    if (menu.current) menu.current.open = false;
    nearBottom.current = true;
    inputRef.current?.focus();
  }

  const hasConversation = messages.length > 0 || busy;
  const lastAnswer = messages.findLast(message => message.role === "assistant")?.content || "";
  const nextPrompts = lastAnswer.match(/\[FOLLOWUP:\s*([^\]]+)\]/)?.[1].split("|") || [];
  return <div className={`${styles.shell} ${styles.app} sage-magic`}>
    {/* Call interface intentionally disabled. GuideCall.tsx is retained. */}
    <header className={styles.header}>
      <Link href="/" className={styles.icon} aria-label="All guides" title="All guides"><ArrowLeft size={18} /></Link>
      {hasConversation && <span className={styles.identity}><span className="sage-wizard-small" aria-hidden="true">🧙</span>Sage</span>}
      <div className={styles.headerActions}>
        {hasConversation && <button className={styles.icon} onClick={() => openConversation()} disabled={busy} aria-label="New conversation" title="New conversation"><Plus size={19} /></button>}
        <details ref={menu} className={styles.menu} onKeyDown={(event) => { if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }}>
          <summary className={styles.icon} aria-label="Conversation options" title="Conversation options"><MoreHorizontal size={20} /></summary>
          <div className={styles.menuPanel}>
            {messages.length > 0 && <button disabled={busy} onClick={save}>Save conversation</button>}
            <Link href="/sage/library">Browse sources</Link>
            {saved.length > 0 && <details className={styles.history}><summary>Saved conversations <span>{saved.length}</span></summary>{saved.map((item) => <div key={item.id} className={styles.savedRow}>
              <button disabled={busy} onClick={() => openConversation(item)}>{item.title}</button>
              <button disabled={busy} aria-label={`Delete conversation: ${item.title}`} onClick={() => { if (persist(saved.filter((entry) => entry.id !== item.id)) && conversationId === item.id) setConversationId(null); }}><Trash2 size={14} /></button>
            </div>)}</details>}
            <details className={styles.about}><summary>About Sage</summary><p>Independent AI guide grounded in {episodes.length} public-source syntheses. Teaches in the style of the Founders podcast, but is not David Senra and is unaffiliated with him and with Founders Notes. Synthetic narration is not a real person&apos;s voice. Saved chats stay on this device.</p>{route && <ModelRouteBadge route={route} />}</details>
          </div>
        </details>
      </div>
    </header>
    {hasConversation && <div className="flex shrink-0 flex-col items-center gap-1 py-2" aria-label="Sage portrait"><span className="text-7xl" role="img" aria-label="Sage the wizard">🧙</span><span className="text-[11px] text-slate-400">AI guide · Synthetic voice</span></div>}
    <div ref={feed} className={styles.feed} onScroll={() => { const el = feed.current; if (el) nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 100; }}>
      {!hasConversation ? <div className={styles.empty}>
        <span className="sage-wizard" role="img" aria-label="Sage the wizard">🧙</span>
        <h1>Sage</h1>
      </div> : <div className={styles.messages} aria-label="Conversation">
        {messages.map((message, i) => <article key={i} className={message.role === "user" ? styles.question : styles.answer} aria-label={message.role === "user" ? "You" : "Sage"}>
          {message.role === "user" ? <p>{message.content}</p> : <><Answer text={message.content} episodes={episodes} /><ListenButton text={message.content} guide="sage" /></>}
        </article>)}
        {busy && <><article className={styles.question} aria-label="You"><p>{pending}</p></article><article className={styles.answer} aria-label="Sage is answering">{stream ? <Prose text={stream.replace(/\[Source:[^\]]*\]|\[FOLLOWUP:[^\]]*\]/g, "")} /> : <span role="status" aria-label="Thinking" className={styles.thinking}><i /><i /><i /></span>}</article></>}
      </div>}
    </div>
    <footer className={styles.footer}>
      {error && <p role="alert" className={styles.notice}>{error}</p>}
      {notice && <p role="status" className={styles.notice}>{notice}</p>}
      <PromptBubbles prompts={completePrompts(hasConversation ? nextPrompts : [], ["What can past founders teach me about my next decision?", "How did great founders hire their first team?", "When did founders go all in, and when did they wait?"])} disabled={busy} onSelect={question => void send(question)} />
      <ChatComposer textareaRef={inputRef} value={input} onChange={setInput} placeholder="What are you building, and what's stuck?" voice={false} disabled={busy} onSend={() => void send()} onStop={() => { request.current?.abort(); setInput(pending); setNotice("Stopped."); }} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send(); } }} />
      <span className={styles.footnote}>AI guide</span>
    </footer>
  </div>;
}
