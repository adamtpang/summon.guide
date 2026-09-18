"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import guideLines from "@/../data/guide-lines.json";

// Click the portrait, get three lines the person is known for, each spoken
// in the guide's voice, like a leader greeting in Civilization. Only lines
// verified to a primary source are listed in data/guide-lines.json, and the
// audio is pre-rendered to public/lines/<slug>-<n>.mp3 so a click costs
// nothing and plays instantly.

type Line = { text: string; source: string };
const LINES = guideLines as Record<string, Line[]>;

export default function GuidePortraitLines({ slug, name, portrait }: { slug: string; name: string; portrait?: string }) {
  const lines = LINES[slug] ?? [];
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => audioRef.current?.pause(), []);

  const play = (i: number) => {
    audioRef.current?.pause();
    const audio = new Audio(`/lines/${slug}-${i + 1}.mp3`);
    audioRef.current = audio;
    setPlaying(i);
    audio.onended = () => setPlaying((p) => (p === i ? null : p));
    audio.play().catch(() => setPlaying(null));
  };

  const face = (
    <span className="relative block size-36 overflow-hidden rounded-full border border-white/10 shadow-[0_0_70px_-20px_#4a78bb] sm:size-44">
      {portrait ? <Image src={portrait} alt={name} fill sizes="176px" priority className="object-cover object-top" /> : <span className="flex h-full items-center justify-center text-5xl" aria-hidden="true">🧙</span>}
    </span>
  );

  if (!lines.length) return <div className="mb-6 shrink-0">{face}</div>;

  return (
    <div className="mb-6 flex shrink-0 flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); if (!open) play(0); }}
        aria-expanded={open}
        aria-label={`Hear ${name}`}
        className="rounded-full transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
      >
        {face}
      </button>
      {open && (
        <ul className="flex w-full max-w-md flex-col gap-2">
          {lines.map((line, i) => (
            <li key={line.text}>
              <button
                type="button"
                onClick={() => play(i)}
                title={line.source}
                className={`flex min-h-11 w-full items-start gap-2 rounded-2xl border px-4 py-2.5 text-left text-sm leading-snug transition-colors ${playing === i ? "border-white/30 bg-white/10 text-white" : "border-white/10 text-white/75 hover:bg-white/5"}`}
              >
                <Volume2 className={`mt-0.5 size-4 shrink-0 ${playing === i ? "animate-pulse" : "opacity-50"}`} aria-hidden="true" />
                <span>&ldquo;{line.text}&rdquo;</span>
              </button>
            </li>
          ))}
          <li className="text-center text-[11px] text-white/40">Their words, read by an AI voice.</li>
        </ul>
      )}
    </div>
  );
}
