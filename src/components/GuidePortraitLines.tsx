"use client";

import { useEffect, useRef, useState } from "react";
import GuidePortrait from "@/components/GuidePortrait";
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
    <span className="niche is-lit block w-40 sm:w-48">
      <GuidePortrait src={portrait} name={name} priority />
    </span>
  );

  const credit = ["rick-rubin", "pendleton-ward", "rose-blumkin", "gottmans"].includes(slug) ? <a href={`/credits#${slug}`} className="mt-2 text-[10px] text-dim underline-offset-4 hover:underline">{slug === "rose-blumkin" ? "AI illustration" : "Photo credit"}</a> : null;
  if (!lines.length) return <div className="mb-6 flex shrink-0 flex-col items-center">{face}{credit}</div>;

  return (
    <div className="mb-6 flex shrink-0 flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); if (!open) play(0); }}
        aria-expanded={open}
        aria-label={`Hear ${name}`}
        className="rounded-t-full transition-transform hover:scale-[1.02]"
      >
        {face}
      </button>
      {credit}
      {open && (
        <ul className="flex w-full max-w-md flex-col gap-2">
          {lines.map((line, i) => (
            <li key={line.text}>
              <button
                type="button"
                onClick={() => play(i)}
                title={line.source}
                className={`flex min-h-11 w-full items-start gap-2 rounded-[3px] border px-4 py-2.5 text-left font-serif text-lg leading-snug transition-colors ${playing === i ? "border-lapis bg-raised text-moon" : "border-edge text-mist hover:border-moon/40 hover:text-moon"}`}
              >
                <Volume2 className={`mt-0.5 size-4 shrink-0 ${playing === i ? "animate-pulse" : "opacity-50"}`} aria-hidden="true" />
                <span>&ldquo;{line.text}&rdquo;</span>
              </button>
            </li>
          ))}
          <li className="text-center text-[11px] text-dim">Their words, read by an AI voice.</li>
        </ul>
      )}
    </div>
  );
}
