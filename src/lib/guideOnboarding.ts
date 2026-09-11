export const GUIDE_REQUEST_KINDS = ["person", "channel", "book"] as const;

export type GuideRequestKind = (typeof GUIDE_REQUEST_KINDS)[number];

export const GUIDE_REQUEST_STATUS_LABELS = {
  REQUESTED: "Requested",
  TRIAGED: "Fit review",
  SOURCING: "Sourcing",
  CORPUS_BUILDING: "Corpus building",
  DISTILLING: "Distilling",
  VERIFYING: "Verifying",
  READY: "Ready",
  DECLINED: "Not planned",
} as const;

export const guideOnboardingChecklist = [
  {
    title: "Outcome and demand",
    description:
      "Name the decisions this guide should improve and confirm that real users want that help.",
  },
  {
    title: "Identity and boundary",
    description:
      "Choose person, channel, or book; set the canonical slug, scope, safety rules, and non-impersonation language.",
  },
  {
    title: "Rights and source map",
    description:
      "Verify official, licensed, public-domain, or user-owned sources. Book requests move to Bookbox for this gate.",
  },
  {
    title: "Corpus and citations",
    description:
      "Ingest raw material privately, write original syntheses, and make every durable claim traceable to a source.",
  },
  {
    title: "One-page distillation",
    description:
      "Create the canonical distillation.md: worldview, operating principles, questions, tensions, and limits.",
  },
  {
    title: "Skills and tools",
    description:
      "Turn the guide's methods into reusable workflows; attach MCP tools only when they improve the actual job.",
  },
  {
    title: "Evaluation",
    description:
      "Test citation accuracy, source boundaries, difficult advice, refusals, and useful voice without claiming to be the person.",
  },
  {
    title: "Runtime and launch",
    description:
      "Wire chat, install, or MCP access; add auth, entitlement, profile, analytics, freshness checks, and production verification.",
  },
] as const;

export function normalizeGuideRequestName(value: string) {
  return value
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase("en-US")
    .replace(/\s+/g, " ");
}
