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

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

const cardClass =
  "flex h-full min-h-[88px] min-w-0 items-center gap-4 rounded-2xl border border-white/[0.07] p-4 transition-colors";
const liveClass = `${cardClass} hover:border-white/20 hover:bg-white/[0.04]`;

export default function GuideAgentRoster({ agents }: { agents: GuideAgentSummary[] }) {
  const [kind, setKind] = useState<"all" | GuideAgentKind>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.toLowerCase().trim();
    const matches = agents.filter((agent) => {
      if (kind !== "all" && agent.kind !== kind) return false;
      if (!needle) return true;
      return [agent.name, agent.byline, agent.description, ...agent.domains]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
    // Guides you can talk to come first; ones still in onboarding go last.
    const ready = (agent: GuideAgentSummary) => (agent.availability === "ready" && agent.chatHref ? 0 : 1);
    return [...matches].sort((x, y) => ready(x) - ready(y));
  }, [agents, kind, query]);

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name or problem"
        aria-label="Search guides"
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-base text-[#eef1f5] outline-none placeholder:text-[#5f6878] focus:border-[#c9a860]/70"
      />
      <div className="mt-3 flex gap-1 overflow-x-auto" role="group" aria-label="Filter guides">
        {filters.map((filter) => {
          const selected = kind === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setKind(filter.value)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm transition-colors ${
                selected ? "bg-white/10 text-[#eef1f5]" : "text-[#8a94a4] hover:text-[#eef1f5]"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((agent) => {
          const href = agent.chatHref ?? (agent.installSlug ? `#${agent.installSlug}` : agent.profileHref);
          const building = agent.availability !== "ready";
          const body = (
            <>
              {agent.image && agent.kind === "person" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={agent.image}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-full object-cover object-top grayscale"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-serif text-sm text-[#8a94a4]"
                >
                  {initials(agent.name)}
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate font-serif text-lg leading-tight text-[#eef1f5]">{agent.name}</span>
                <span className="mt-1 line-clamp-2 text-sm leading-snug text-[#8a94a4]">
                  {building ? "In onboarding. " : ""}
                  {agent.description}
                </span>
              </span>
            </>
          );
          return (
            <li key={agent.id} className="min-w-0">
              {!href ? (
                <div className={`${cardClass} opacity-60`}>{body}</div>
              ) : href.startsWith("#") ? (
                <a href={href} className={liveClass}>{body}</a>
              ) : (
                <Link href={href} className={liveClass}>{body}</Link>
              )}
            </li>
          );
        })}
      </ul>

      {!visible.length && (
        <p className="py-12 text-center text-sm text-[#8a94a4]">
          No guide matches that yet.{" "}
          <a href="#request-guide" className="text-[#c9a860] underline underline-offset-4">
            Request one
          </a>
        </p>
      )}
    </div>
  );
}
