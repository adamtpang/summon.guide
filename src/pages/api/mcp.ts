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
import { figures } from "@/lib/figures";
import { books } from "@/lib/books";

const SITE_URL = "https://summon.guide";

async function consumeSSE(res: Response): Promise<string> {
  if (!res.body) throw new Error("No response body from " + res.url);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice("data: ".length);
      if (payload === "[DONE]") continue;
      const parsed = JSON.parse(payload);
      if (parsed.error) throw new Error(parsed.error);
      if (parsed.text) text += parsed.text;
    }
  }
  return text;
}

function buildServer(): McpServer {
  const server = new McpServer(
    { name: "summon-guide", version: "0.1.0" },
    {
      instructions:
        "summon.guide is a roster of 44+ historical and contemporary figures, each grounded in real books and transcripts. Call match_guide first with a situation to find the single best-fit guide, then chat_with_guide with the returned slug to get their real answer. Use chat_with_book directly when the user names a specific book rather than a person. Never simulate a guide's answer yourself, always call chat_with_guide or chat_with_book to get the real, corpus-grounded response.",
    }
  );

  server.registerTool(
    "list_guides",
    {
      description:
        "List every guide currently on summon.guide: slug, name, era, and what they're known for. Use this to browse the roster or confirm a specific person is available before naming them to match_guide.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
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
      annotations: { readOnlyHint: true },
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
    },
    async ({ slug, message }) => {
      const res = await fetch(`${SITE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
  const server = buildServer();
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
