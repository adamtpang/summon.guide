import { getGuideEpisodes } from "@/lib/guideRetrieval";
import { guidePath } from "@/lib/guideUrls";
import { books } from "@/lib/books";
import { figures } from "@/lib/figures";
import guideIntake from "../../data/guide-intake.json";

export const GUIDE_AGENT_KINDS = ["person", "book", "channel"] as const;

export type GuideAgentKind = (typeof GUIDE_AGENT_KINDS)[number];
export type GuideAgentCapability =
  | "chat"
  | "citations"
  | "compare"
  | "install"
  | "skills";

export type GuideAgentRuntime =
  | { kind: "pending" }
  | { kind: "figure"; figureSlug: string }
  | { kind: "source"; sourceSlug: string }
  | { kind: "pack"; packSlug: string };

/**
 * The durable product object in summon.guide.
 *
 * A GuideAgent owns its identity, sources, skills, and runtime. Projects do
 * not own agents. A project creates an assignment for an agent, allowing the
 * same specialist to work across many projects without copying its identity.
 */
export interface GuideAgent {
  /** Namespaced because a person and one of their books may share a slug. */
  id: `${GuideAgentKind}:${string}`;
  slug: string;
  kind: GuideAgentKind;
  name: string;
  members?: string[];
  category?: string;
  byline: string;
  description: string;
  image?: string;
  domains: string[];
  sourceSlugs: string[];
  skillSlugs: string[];
  capabilities: GuideAgentCapability[];
  availability: "ready" | "building";
  runtime: GuideAgentRuntime;
  chatHref?: string;
  profileHref?: string;
  installSlug?: string;
  assignmentScope: "cross-project";
  memoryScopes: readonly ["agent", "assignment"];
}

export type GuideAgentSummary = Omit<GuideAgent, "runtime" | "sourceSlugs"> & {
  sourceCount: number;
};

const sourceAgents: GuideAgent[] = books.map((book) => {
  const kind: GuideAgentKind = book.role === "channel" ? "channel" : "book";
  const chatReady = Boolean(book.corpusPaths?.length);
  const capabilities: GuideAgentCapability[] = [];

  if (chatReady) capabilities.push("chat", "citations");
  if (book.skillSlugs?.length) capabilities.push("skills");

  return {
    id: `${kind}:${book.slug}`,
    slug: book.slug,
    kind,
    name: book.title,
    byline: kind === "channel" ? `Channel by ${book.author}` : `Book by ${book.author}`,
    description:
      book.description ||
      `A source-grounded agent for asking questions of ${book.title}.`,
    image: book.image,
    domains: book.skillSlugs || [],
    sourceSlugs: [book.slug],
    skillSlugs: book.skillSlugs || [],
    capabilities,
    availability: chatReady ? "ready" : "building",
    runtime: { kind: "source", sourceSlug: book.slug },
    chatHref: chatReady ? (book.slug === "founders-podcast" ? "/sage" : `/${book.slug}`) : undefined,
    profileHref: `/books/${book.slug}`,
    assignmentScope: "cross-project",
    memoryScopes: ["agent", "assignment"],
  };
});

const personAgents: GuideAgent[] = figures.map((figure) => {
  const sources = books.filter((book) => book.figureSlug === figure.slug);
  const capabilities: GuideAgentCapability[] = ["chat", "compare"];
  const skillSlugs = [...new Set(sources.flatMap((book) => book.skillSlugs || []))];

  if (getGuideEpisodes(figure.slug).length) capabilities.push("citations");
  if (skillSlugs.length) capabilities.push("skills");
  if (figure.slug === "elon") capabilities.push("install");

  return {
    id: `person:${figure.slug}`,
    slug: figure.slug,
    kind: "person",
    name: figure.name,
    members: figure.members,
    category: figure.category,
    byline: figure.knownFor,
    description: figure.hook,
    image: figure.portrait,
    domains: figure.domains,
    sourceSlugs: sources.map((book) => book.slug),
    skillSlugs,
    capabilities,
    availability: "ready",
    runtime: { kind: "figure", figureSlug: figure.slug },
    chatHref: guidePath(figure.slug),
    profileHref: `${guidePath(figure.slug)}/about`,
    installSlug: figure.slug === "elon" ? "elon" : undefined,
    assignmentScope: "cross-project",
    memoryScopes: ["agent", "assignment"],
  };
});

// Dave Ramsey launched as an installable pack before he had a site figure.
// Registering him here keeps packs inside the same product model. Once a full
// source-backed figure is added, this entry should be removed automatically.
const packOnlyAgents: GuideAgent[] = figures.some((figure) => figure.slug === "dave-ramsey")
  ? []
  : [
      {
        id: "person:dave-ramsey",
        slug: "dave-ramsey",
        kind: "person",
        name: "Dave Ramsey",
        byline: "Personal finance operating system",
        description:
          "A direct educational money coach for budgeting, emergency funds, debt payoff, and household accountability.",
        domains: ["money", "budgeting", "debt", "emergency funds"],
        sourceSlugs: [],
        skillSlugs: ["zero-based-budget", "debt-snowball", "emergency-fund-triage"],
        capabilities: ["install", "skills"],
        availability: "ready",
        runtime: { kind: "pack", packSlug: "dave-ramsey" },
        installSlug: "dave-ramsey",
        assignmentScope: "cross-project",
        memoryScopes: ["agent", "assignment"],
      },
    ];

const kindOrder: Record<GuideAgentKind, number> = { person: 0, book: 1, channel: 2 };

// Intake records are discoverable without granting chat or claiming corpus coverage.
const pendingPersonAgents: GuideAgent[] = guideIntake
  .filter(candidate => ![...personAgents, ...packOnlyAgents].some(agent => agent.slug === candidate.slug))
  .map(candidate => ({
    id: `person:${candidate.slug}`,
    slug: candidate.slug,
    kind: "person",
    name: candidate.name,
    byline: candidate.domain,
    description: candidate.outcome,
    domains: [candidate.domain, ...candidate.aliases],
    sourceSlugs: [],
    skillSlugs: [],
    capabilities: [],
    availability: "building",
    runtime: { kind: "pending" },
    profileHref: `/onboarding#${candidate.slug}`,
    assignmentScope: "cross-project",
    memoryScopes: ["agent", "assignment"],
  }));

export const guideAgents: GuideAgent[] = [
  ...personAgents,
  ...pendingPersonAgents,
  ...packOnlyAgents,
  ...sourceAgents,
].sort((a, b) => kindOrder[a.kind] - kindOrder[b.kind] || a.name.localeCompare(b.name));

const duplicateIds = guideAgents
  .map((agent) => agent.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

if (duplicateIds.length) {
  throw new Error(`Duplicate guide agent ids: ${[...new Set(duplicateIds)].join(", ")}`);
}

export const guideAgentSummaries: GuideAgentSummary[] = guideAgents.map(
  ({ runtime: _runtime, sourceSlugs, ...agent }) => {
    void _runtime;
    return {
      ...agent,
      sourceCount: _runtime.kind === "figure" ? getGuideEpisodes(_runtime.figureSlug).length : sourceSlugs.length,
    };
  },
);

export const guideAgentCounts = GUIDE_AGENT_KINDS.reduce(
  (counts, kind) => {
    counts[kind] = guideAgents.filter((agent) => agent.kind === kind).length;
    return counts;
  },
  { person: 0, book: 0, channel: 0 } as Record<GuideAgentKind, number>,
);

export function getGuideAgent(id: string): GuideAgent | undefined {
  return guideAgents.find((agent) => agent.id === id);
}

export function getPersonGuideAgent(slug: string): GuideAgent | undefined {
  return getGuideAgent(`person:${slug}`);
}

export function getSourceGuideAgent(slug: string): GuideAgent | undefined {
  return guideAgents.find(
    (agent) => agent.slug === slug && (agent.kind === "book" || agent.kind === "channel"),
  );
}
