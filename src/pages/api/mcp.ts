// summon.guide MCP server. Exposes the site's guide roster and chat as MCP
// tools, so any MCP client (Claude Code, Claude Desktop, Claude.ai, or a
// third-party host) can match a situation to a guide and get their real,
// corpus-grounded answer natively, without curl or a bash-based skill.
//
// Pages Router (not App Router) on purpose: the MCP SDK's
// StreamableHTTPServerTransport wants Node's raw IncomingMessage/
// ServerResponse, which Pages API routes give directly. App Router Route
// Handlers use the Web-standard Request/Response instead and don't fit this
// transport without an adapter. See node_modules/next/dist/docs/02-pages/...
//
// Tools call the site's OWN public API (https://summon.guide/api/*), the
// same endpoints a browser hits, so behavior always matches the live site
// exactly and nothing is duplicated or reimplemented here.
import type { NextApiRequest, NextApiResponse } from "next";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { researchedGuideInput, summonMatchInput } from "@/lib/summonMatch";
import { figures } from "@/lib/figures";
import { books } from "@/lib/books";
import { authenticateMcpToken } from "@/lib/membership";

const SITE_URL = "https://summon.guide";

async function consumeSSE(res: Response): Promise<string> {
  if (!res.body) throw new Error("Missing guide response stream");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "", text = "", complete = false;
  function line(value: string) {
    if (!value.startsWith("data:")) return;
    const data = value.slice(5).trim();
    if (!data) return;
    if (data === "[DONE]") { complete = true; return; }
    const event = JSON.parse(data);
    if (event.error) throw new Error("Guide response failed");
    if (typeof event.text === "string") text += event.text;
  }
  try {
    for (;;) {
      const { done, value } = await reader.read();
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      const lines = buffer.split("\n"); buffer = lines.pop() || "";
      lines.forEach(line);
      if (done) { if (buffer.trim()) line(buffer); break; }
    }
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
  if (!complete || !text.trim()) throw new Error("Empty or incomplete guide response");
  return text;
}

function buildServer(authorization?: string): McpServer {
  const server = new McpServer(
    { name: "summon-guide", version: "0.2.0" },
    {
      instructions:
        "Use match_guides with a concise relevant context brief to rank the live roster and explain compatibility out of 100. Scores estimate fit, not certainty. Use chat_with_guide for person ids and chat_with_book for book/channel ids, preserving citations. Coverage varies; do not claim every guide has full transcripts. If match_guides returns research_required, use the host web-search tools to research a better candidate with public sources, then consult_researched_guide for provisional advice and a tracked onboarding request. This does not make them a verified public-roster guide. Never send private identifiers in search queries.",
    }
  );

  for (const tool of [
    { name: "match_guides", path: "match", description: "Match a context brief against the live person, book and channel roster. Returns 0–100 compatibility with breakdowns, reasons, limitations, complementary roles and a research_required signal when no guide reaches 70. Does not invent a match during outages.", schema: summonMatchInput.shape, readOnly: true },
    { name: "consult_researched_guide", path: "research", description: "After the host researches a missing guide on the web, send 2–5 original summaries from at least two independent HTTPS source hosts. Returns provisional AI advice with citations and saves a per-user onboarding request. Does not publish a guide or certify a deep corpus. Uses a guide session.", schema: researchedGuideInput.shape, readOnly: false },
  ]) {
    server.registerTool(tool.name, { description: tool.description, inputSchema: tool.schema, annotations: { readOnlyHint: tool.readOnly, destructiveHint: false, openWorldHint: true } }, async (input: Record<string, unknown>) => {
      const response = await fetch(`${SITE_URL}/api/summon/${tool.path}`, { method: "POST", headers: { "Content-Type": "application/json", ...(authorization ? { Authorization: authorization } : {}) }, body: JSON.stringify(input) });
      const data = await response.json();
      return { isError: !response.ok, content: [{ type: "text" as const, text: JSON.stringify(data) }] };
    });
  }

  server.registerTool(
    "list_guides",
    {
      description:
        "List every guide currently on summon.guide: slug, name, era, and what they're known for. Use this to browse the roster or confirm a specific person is available before naming them to match_guide.",
      inputSchema: {},
      annotations: { title: "List guides", readOnlyHint: true },
    },
    async () => {
      const list = figures.map((f) => ({
        slug: f.slug,
        name: f.name,
        era: f.era,
        knownFor: f.knownFor,
        domains: f.domains,
      }));
      return { content: [{ type: "text", text: JSON.stringify(list, null, 2) }] };
    }
  );

  server.registerTool(
    "list_books",
    {
      description:
        "List every book on summon.guide that has its own real chat corpus (chat_with_book-eligible). Each has real chapter-digest grounding, not a generic persona.",
      inputSchema: {},
      annotations: { title: "List books", readOnlyHint: true },
    },
    async () => {
      const list = books
        .filter((b) => b.corpusPaths && b.corpusPaths.length > 0)
        .map((b) => ({
          slug: b.slug,
          title: b.title,
          author: b.author,
          figureSlug: b.figureSlug,
          description: b.description,
        }));
      return { content: [{ type: "text", text: JSON.stringify(list, null, 2) }] };
    }
  );

  server.registerTool(
    "match_guide",
    {
      description:
        "Given a situation, problem, or decision (or a specific person's name), returns the single best-fit guide from the real current roster, with a one-line reason and, when relevant, a specific installable playbook. This is real routing against the live roster, not a guess, always call this before chat_with_guide unless the exact slug is already known from list_guides.",
      inputSchema: {
        situation: z
          .string()
          .describe("The situation, problem, or named person, as the user actually described it"),
      },
      annotations: { title: "Match a guide", readOnlyHint: true },
    },
    async ({ situation }) => {
      const res = await fetch(`${SITE_URL}/api/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: situation }),
      });
      if (!res.ok) throw new Error(`match_guide: ${res.status} ${await res.text()}`);
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "chat_with_guide",
    {
      description:
        "Send a message to a specific guide by slug (from match_guide or list_guides) and get their real reply, grounded in their documented record where corpus coverage exists. Citations in the reply, if present, point to real digested sources.",
      inputSchema: {
        slug: z.string().describe("The guide's slug, e.g. \"rockefeller\""),
        message: z.string().describe("The message to send"),
      },
      annotations: { title: "Chat with a guide", readOnlyHint: true },
    },
    async ({ slug, message }) => {
      const res = await fetch(`${SITE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
        },
        body: JSON.stringify({ figure: slug, messages: [{ role: "user", content: message }] }),
      });
      if (!res.ok) throw new Error(`chat_with_guide: ${res.status} ${await res.text()}`);
      const text = await consumeSSE(res);
      return { content: [{ type: "text", text }] };
    }
  );

  server.registerTool(
    "chat_with_book",
    {
      description:
        "Send a message to a book's own corpus directly, no persona, only what the book actually says. Use this when the user names a specific book rather than its author. Get the book slug from list_books.",
      inputSchema: {
        slug: z.string().describe("The book's slug, e.g. \"poor-charlies-almanack\""),
        message: z.string().describe("The message to send"),
      },
      annotations: { title: "Chat with a book", readOnlyHint: true },
    },
    async ({ slug, message }) => {
      const res = await fetch(`${SITE_URL}/api/chat/source`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: slug, messages: [{ role: "user", content: message }] }),
      });
      if (!res.ok) throw new Error(`chat_with_book: ${res.status} ${await res.text()}`);
      const text = await consumeSSE(res);
      return { content: [{ type: "text", text }] };
    }
  );

  return server;
}

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed, POST only" });
    return;
  }
  const authorization = typeof req.headers.authorization === "string" ? req.headers.authorization : undefined;
  const userId = await authenticateMcpToken(authorization ?? null);
  if (!userId) {
    res.setHeader("WWW-Authenticate", 'Bearer resource_metadata="https://summon.guide/.well-known/oauth-protected-resource/api/mcp"');
    res.status(401).json({ error: "Summon Member authorization required" });
    return;
  }
  const server = buildServer(authorization);
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless, matches the SDK's simplest mode
  });
  res.on("close", () => {
    transport.close();
    server.close();
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}
