"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GuideAgentKind, GuideAgentSummary } from "@/lib/guideAgents";

const filters: { value: "all" | GuideAgentKind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "person", label: "People" },
  { value: "book", label: "Books" },
  { value: "channel", label: "Channels" },
];

const kindLabel: Record<GuideAgentKind, string> = {
  person: "Person agent",
  book: "Book agent",
  channel: "Channel agent",
};

const capabilityLabel = {
  chat: "Chat",
  citations: "Cited",
  compare: "Compare",
  install: "Install",
  skills: "Skills",
} as const;

export default function GuideAgentRoster({ agents }: { agents: GuideAgentSummary[] }) {
  const [kind, setKind] = useState<"all" | GuideAgentKind>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return agents.filter((agent) => {
      if (kind !== "all" && agent.kind !== kind) return false;
      if (!needle) return true;
      return [agent.name, agent.byline, agent.description, ...agent.domains]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [agents, kind, query]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {filters.map((filter) => {
            const count =
              filter.value === "all"
                ? agents.length
                : agents.filter((agent) => agent.kind === filter.value).length;
            const selected = kind === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setKind(filter.value)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs transition-colors ${
                  selected
                    ? "bg-white text-slate-950"
                    : "border border-white/15 text-white/65 hover:text-white"
                }`}
              >
                {filter.label} {count}
              </button>
            );
          })}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search agents by problem or name"
          aria-label="Search guide agents"
          className="md:ml-auto w-full md:w-72 rounded-xl border border-white/15 bg-black/25 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-emerald-400/70"
        />
      </div>

      <p className="text-white/40 text-xs mb-4">
        Showing {visible.length} durable agents. Each can be assigned to multiple projects.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {visible.map((agent) => (
          <article
            key={agent.id}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 flex flex-col min-h-56"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-emerald-400/80 text-[10px] tracking-[0.18em] uppercase">
                {kindLabel[agent.kind]}
              </p>
              <span
                className={`text-[10px] uppercase tracking-[0.12em] ${
                  agent.availability === "ready" ? "text-white/45" : "text-amber-300/70"
                }`}
              >
                {agent.availability === "ready" ? "Ready" : "In onboarding"}
              </span>
            </div>
            <h3 className="font-serif text-xl leading-tight mb-1.5">{agent.name}</h3>
            <p className="text-white/45 text-xs mb-3">{agent.byline}</p>
            <p className="text-white/62 text-sm leading-relaxed mb-4 line-clamp-3">
              {agent.description}
            </p>
            <div className="mt-auto">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {agent.capabilities.slice(0, 4).map((capability) => (
                  <span
                    key={capability}
                    className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/50"
                  >
                    {capabilityLabel[capability]}
                  </span>
                ))}
                {agent.sourceCount > 0 && (
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/50">
                    {agent.sourceCount} {agent.sourceCount === 1 ? "source" : "sources"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs">
                {agent.chatHref ? (
                  <Link href={agent.chatHref} className="text-emerald-300 hover:text-emerald-200">
                    Open agent →
                  </Link>
                ) : agent.installSlug ? (
                  <a href={`#${agent.installSlug}`} className="text-emerald-300 hover:text-emerald-200">
                    Install agent ↑
                  </a>
                ) : (
                  <span className="text-white/30">Waiting for source corpus</span>
                )}
                {agent.profileHref && (
                  <Link href={agent.profileHref} className="text-white/45 hover:text-white/75">
                    Profile
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {!visible.length && (
        <div className="rounded-2xl border border-dashed border-white/15 px-5 py-12 text-center text-white/45 text-sm">
          <p>No agents match that search yet.</p>
          <a
            href="#request-guide"
            className="mt-3 inline-flex min-h-11 items-center text-emerald-300 hover:text-emerald-200"
          >
            Request this guide ↑
          </a>
        </div>
      )}
    </div>
  );
}
