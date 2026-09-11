import "server-only";

import fs from "node:fs";
import path from "node:path";
import { books } from "@/lib/books";

export type DistillationKind = "guide" | "channel" | "book" | "course";

export interface DistillationSummary {
  slug: string;
  title: string;
  author: string;
  description: string;
  guideSlug?: string;
  corpusSlug?: string;
  kind: DistillationKind;
  status: "ready" | "awaiting-source";
}

export interface Distillation extends DistillationSummary {
  markdown: string;
  filePath: string;
}

const DISTILLED_DIR = path.join(process.cwd(), "content", "distilled");

function unquote(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseDocument(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  const values: Record<string, string> = {};

  if (match) {
    for (const line of match[1].split("\n")) {
      const separator = line.indexOf(":");
      if (separator === -1) continue;
      values[line.slice(0, separator).trim()] = unquote(line.slice(separator + 1));
    }
  }

  return {
    values,
    markdown: match ? raw.slice(match[0].length).trim() : raw.trim(),
  };
}

function inferKind(slug: string, requested?: string): DistillationKind {
  if (requested === "guide" || requested === "channel" || requested === "book" || requested === "course") {
    return requested;
  }
  const book = books.find((candidate) => candidate.slug === slug);
  return book?.role === "channel" ? "channel" : "book";
}

export function getAllDistillations(): DistillationSummary[] {
  if (!fs.existsSync(DISTILLED_DIR)) return [];

  return fs
    .readdirSync(DISTILLED_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const filePath = path.join(DISTILLED_DIR, name);
      const { values } = parseDocument(filePath);
      const slug = values.slug || name.replace(/\.md$/, "");
      const book = books.find((candidate) => candidate.slug === slug);

      return {
        slug,
        title: values.title || book?.title || slug,
        author: values.author || book?.author || "summon.guide",
        description: values.description || book?.description || "A one-page operating distillation.",
        guideSlug: values.guideSlug || book?.figureSlug || undefined,
        corpusSlug: values.corpusSlug || undefined,
        kind: inferKind(slug, values.type),
        status: values.status === "awaiting-source" ? "awaiting-source" : "ready",
      } satisfies DistillationSummary;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getDistillation(slug: string): Distillation | null {
  const safeSlug = slug.replace(/[^a-z0-9-]/g, "");
  if (safeSlug !== slug) return null;

  const filePath = path.join(DISTILLED_DIR, `${safeSlug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { values, markdown } = parseDocument(filePath);
  const book = books.find((candidate) => candidate.slug === safeSlug);

  return {
    slug: safeSlug,
    title: values.title || book?.title || safeSlug,
    author: values.author || book?.author || "summon.guide",
    description: values.description || book?.description || "A one-page operating distillation.",
    guideSlug: values.guideSlug || book?.figureSlug || undefined,
    corpusSlug: values.corpusSlug || undefined,
    kind: inferKind(safeSlug, values.type),
    status: values.status === "awaiting-source" ? "awaiting-source" : "ready",
    markdown,
    filePath: path.relative(process.cwd(), filePath).replace(/\\/g, "/"),
  };
}
