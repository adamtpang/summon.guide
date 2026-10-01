"use client";

import { useMemo, useState } from "react";

export type SkillRow = {
  key: string;
  title: string;
  tagline: string;
  guide: string;
  command: string;
  href: string;
  themes: string[];
  haystack: string;
};

export default function SkillsBrowser({ rows, themes }: { rows: SkillRow[]; themes: string[] }) {
  const [theme, setTheme] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return rows.filter(
      (row) => (theme === "all" || row.themes.includes(theme)) && (!needle || row.haystack.includes(needle)),
    );
  }, [rows, theme, query]);

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by problem, skill or guide"
        aria-label="Search skills"
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-base text-moon outline-none placeholder:text-dim focus:border-gold-500/70"
      />
      <div className="mt-3 flex gap-1 overflow-x-auto pb-1" role="group" aria-label="Filter by problem">
        {["all", ...themes].map((value) => {
          const selected = theme === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => setTheme(value)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm capitalize transition-colors ${
                selected ? "bg-white/10 text-moon" : "text-mist hover:text-moon"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {visible.map((row) => (
          <li key={row.key} className="min-w-0">
            <a
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full min-h-[88px] flex-col justify-center rounded-2xl border border-white/[0.07] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="truncate font-serif text-lg leading-tight text-moon">{row.title}</span>
                <span className="shrink-0 text-xs text-dim">{row.guide}</span>
              </span>
              <span className="mt-1 line-clamp-2 text-sm leading-snug text-mist">{row.tagline}</span>
            </a>
          </li>
        ))}
      </ul>

      {!visible.length && <p className="py-12 text-center text-sm text-mist">No skill matches that yet.</p>}
    </div>
  );
}
