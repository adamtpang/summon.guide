"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import GuideNiche from "@/components/GuideNiche";
import type { GuideAgentSummary } from "@/lib/guideAgents";

// The roster: people in the hall of niches, then books and channels as a
// plain reading list. One search box filters both.
export default function GuideAgentRoster({ agents, lines = {} }: { agents: GuideAgentSummary[]; lines?: Record<string, string> }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.toLowerCase().trim();
    if (!needle) return agents;
    return agents.filter((agent) =>
      [agent.name, agent.byline, agent.description, agent.category, ...agent.domains].join(" ").toLowerCase().includes(needle),
    );
  }, [agents, query]);

  const people = visible.filter((agent) => agent.kind === "person").sort((a, b) => a.name.localeCompare(b.name));
  const sources = visible.filter((agent) => agent.kind !== "person").sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <label htmlFor="guide-search" className="sr-only">Search guides</label>
      <input
        id="guide-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name or problem"
        className="min-h-12 w-full max-w-xl rounded-[3px] border border-moon/60 bg-raised px-4 text-[17px] text-moon outline-none placeholder:text-dim focus:border-lapis"
      />

      {people.length > 0 && (
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {people.map((agent, i) => {
            const slug = agent.id.replace(/^person:/, "");
            const href = agent.chatHref ?? agent.profileHref ?? "#";
            const building = agent.availability !== "ready";
            return (
              <li key={agent.id}>
                <GuideNiche
                  href={href}
                  name={agent.name}
                  line={building ? "Being prepared" : lines[slug] ?? agent.description}
                  portrait={agent.image}
                  priority={i < 6}
                />
              </li>
            );
          })}
        </ul>
      )}

      {sources.length > 0 && (
        <section aria-labelledby="sources" className="mt-20">
          <h2 id="sources" className="font-serif text-3xl font-medium sm:text-4xl">Books and channels</h2>
          <p className="mt-2 max-w-[62ch] text-[15px] text-mist">Ask a single source directly. Answers stay inside what that book or channel says.</p>
          <ul className="mt-6 grid gap-x-12 border-t border-edge sm:grid-cols-2">
            {sources.map((agent) => {
              const href = agent.chatHref ?? (agent.installSlug ? `#${agent.installSlug}` : agent.profileHref);
              const row = (
                <>
                  <span className="block font-serif text-xl leading-tight text-moon group-hover:text-lapis">{agent.name}</span>
                  <span className="mt-1 line-clamp-1 block text-[14px] text-mist">{agent.byline || agent.description}</span>
                </>
              );
              return (
                <li key={agent.id} className="border-b border-edge">
                  {href ? (
                    <Link href={href} className="group block py-4">{row}</Link>
                  ) : (
                    <div className="py-4 opacity-60">{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {!visible.length && (
        <p className="py-12 text-[15px] text-mist">
          No guide matches that yet.{" "}
          <a href="#request-guide" className="text-lapis underline underline-offset-4">Request one</a>
        </p>
      )}
    </div>
  );
}
