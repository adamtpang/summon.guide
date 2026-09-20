import { auth } from "@/auth";
import { authenticateMcpToken } from "@/lib/membership";
import { guideAgents } from "@/lib/guideAgents";
import { getGuideEpisodes } from "@/lib/guideRetrieval";
import { sourceCorpus } from "@/lib/sourceCorpus";
import { applySourceRuntimePolicy } from "@/lib/sourcePolicy";
import { completeOpenRouter } from "@/lib/openrouter";
import { extractJsonObject } from "@/lib/jsonExtract";
import { matchPrompt, summonMatchInput, validateMatches } from "@/lib/summonMatch";

export const maxDuration = 120;
const headers = { "Cache-Control": "private, no-store" };
export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id || await authenticateMcpToken(req.headers.get("authorization"));
  if (!userId) return Response.json({ error: "Connect Summon first", connectUrl: "https://summon.guide/connect" }, { status: 401, headers });
  const parsed = summonMatchInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Supply context (20–12000 characters) and maxGuides (1–3)" }, { status: 400, headers });
  const catalog = guideAgents.filter(guide => guide.availability === "ready" && guide.capabilities.includes("chat")).map(guide => ({ id: guide.id, name: guide.name, domains: guide.domains, description: guide.description, sourceCount: guide.kind === "person" ? getGuideEpisodes(guide.slug).length : applySourceRuntimePolicy(guide.slug, sourceCorpus[guide.slug]?.episodes || []).length }));
  try {
    const response = await completeOpenRouter({ system: matchPrompt(catalog), messages: [{ role: "user", content: parsed.data.context }], maxTokens: 1800, temperature: 0.1 });
    return Response.json(validateMatches(JSON.parse(extractJsonObject(response.text)), catalog, parsed.data.maxGuides), { headers });
  } catch {
    // Outages are not evidence that a guide is missing; do not trigger research.
    return Response.json({ error: "Matchmaking unavailable; retry later", code: "match_unavailable" }, { status: 503, headers });
  }
}
