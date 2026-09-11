import { auth } from "@/auth";
import type { ModelRouteMeta } from "@/lib/aiTypes";
import {
  buildCouncilPrompt,
  councilByDomains,
  parseCouncilResponse,
  type CouncilSeat,
  type CouncilSource,
} from "@/lib/council";
import { figures } from "@/lib/figures";
import { isLifeContextBrief, readLifeContextNotice } from "@/lib/lifeContext";
import { authenticateMcpToken } from "@/lib/membership";
import { completeOpenRouter } from "@/lib/openrouter";
import { skills, skillCatalogForRouting } from "@/lib/skills";
import { NextRequest } from "next/server";

// POST /api/council
//
// Body: { brief?: string }
//
// With no brief, reads the newest life-context notice themain.quest mailed
// through the repos.chat mailbox (local workspaces only). With a brief, uses
// it as pasted. Either way the response carries the brief back so the client
// can attach it to the chosen guide's chat exactly like the import dialog
// does. Seating the council is routing, not a guide session, so it does not
// consume a membership session; the chat that follows does.

export type CouncilResponse = {
  brief: string;
  source: { kind: "themain.quest"; createdAt: string; id: string } | { kind: "pasted" };
  council: CouncilSeat[];
  seatedBy: CouncilSource;
  route?: ModelRouteMeta;
};

const MAX_BRIEF_CHARS = 12_000;

export async function POST(req: NextRequest) {
  const session = await auth();
  const mcpUserId = session?.user?.id
    ? null
    : await authenticateMcpToken(req.headers.get("authorization"));
  if (!session?.user?.id && !mcpUserId) {
    return Response.json({ error: "Sign in to seat the council" }, { status: 401 });
  }

  let body: { brief?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  let brief = typeof body.brief === "string" ? body.brief.trim() : "";
  let source: CouncilResponse["source"] = { kind: "pasted" };

  if (!brief) {
    const notice = await readLifeContextNotice();
    if (!notice) {
      return Response.json(
        {
          error: "No life context is available",
          hint: "Run `npm run life:context -- --send` inside themain.quest, or paste a brief.",
        },
        { status: 404 },
      );
    }
    brief = notice.markdown;
    source = { kind: "themain.quest", createdAt: notice.createdAt, id: notice.id };
  }

  if (!isLifeContextBrief(brief)) {
    return Response.json(
      { error: "The brief must start with a '# Personal context' heading" },
      { status: 400 },
    );
  }
  brief = brief.slice(0, MAX_BRIEF_CHARS);

  try {
    const response = await completeOpenRouter({
      system: buildCouncilPrompt(figures, skillCatalogForRouting()),
      messages: [{ role: "user", content: brief }],
      maxTokens: 1200,
      temperature: 0.2,
    });
    const council = parseCouncilResponse(response.text, brief, figures, skills);
    const payload: CouncilResponse = {
      brief,
      source,
      council,
      seatedBy: "model",
      route: response.meta,
    };
    return Response.json(payload);
  } catch (error) {
    console.error("[council] fell back to domain ranking:", error instanceof Error ? error.message : error);
    const payload: CouncilResponse = {
      brief,
      source,
      council: councilByDomains(brief, figures),
      seatedBy: "domains",
    };
    return Response.json(payload);
  }
}
