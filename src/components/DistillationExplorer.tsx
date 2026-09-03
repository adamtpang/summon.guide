"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DistillationKind, DistillationSummary } from "@/lib/distillations";

const filters: { value: "all" | DistillationKind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "guide", label: "Guides" },
  { value: "channel", label: "Channels" },
  { value: "book", label: "Books" },
  { value: "course", label: "Courses" },
];

export function DistillationExplorer({ items }: { items: DistillationSummary[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter !== "all" && item.kind !== filter) return false;
      return !needle || `${item.title} ${item.author} ${item.description}`.toLowerCase().includes(needle);
    });
  }, [filter, items, query]);

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === item.value
                  ? "border-ink-950 bg-ink-950 text-white"
                  : "border-warm-200 bg-white text-warm-500 hover:border-warm-400 hover:text-ink-950"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a distillation"
          className="h-11 w-full rounded-full border border-warm-200 bg-white px-4 text-sm outline-none placeholder:text-warm-300 focus:border-gold-500 sm:w-72"
        />
      </div>

      <p className="mt-5 text-sm text-warm-400">{visible.length} one-page files</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <Link
            key={item.slug}
            href={`/distillations/${item.slug}`}
            className="group rounded-2xl border border-warm-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-[0_16px_40px_rgba(35,30,20,0.08)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-600">{item.kind}</span>
              {item.status === "awaiting-source" && (
                <span className="rounded-full bg-warm-100 px-2 py-1 text-[10px] uppercase tracking-wider text-warm-500">awaiting source</span>
              )}
            </div>
            <h2 className="mt-4 font-serif text-2xl leading-tight text-ink-950 group-hover:text-gold-700">{item.title}</h2>
            <p className="mt-2 text-sm text-warm-400">{item.author}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-warm-500">{item.description}</p>
            <span className="mt-6 inline-block text-sm font-medium text-ink-950">Read the one-pager →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
