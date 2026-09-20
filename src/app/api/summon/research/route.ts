import { auth } from "@/auth";
import { authenticateMcpToken, consumeGuideSession, licenseError } from "@/lib/membership";
import { researchedGuideInput, researchedGuidePrompt } from "@/lib/summonMatch";
import { normalizeGuideRequestName } from "@/lib/guideOnboarding";
import { guideAgents } from "@/lib/guideAgents";
import { completeOpenRouter } from "@/lib/openrouter";
import { prisma } from "@/lib/prisma";

export const maxDuration = 120;
const headers = { "Cache-Control": "private, no-store" };
export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id || await authenticateMcpToken(req.headers.get("authorization"));
  if (!userId) return Response.json({ error: "Connect Summon first" }, { status: 401, headers });
  const parsed = researchedGuideInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Provide a name, context, fit and 2–5 original source summaries from at least two HTTPS source hosts" }, { status: 400, headers });
  const input = parsed.data;
  const normalizedName = normalizeGuideRequestName(input.name);
  const existing = guideAgents.find(guide => normalizeGuideRequestName(guide.name) === normalizedName);
  if (existing) return Response.json({ error: "Guide already registered; use their existing chat or onboarding status", id: existing.id, availability: existing.availability }, { status: 409, headers });
  const previous = await prisma.guideRequest.findUnique({ where: { userId_normalizedName: { userId, normalizedName } } });
  if (previous?.status === "DECLINED") return Response.json({ error: "This guide request was declined; review the existing request", requestId: previous.id }, { status: 409, headers });
  if (!previous && await prisma.guideRequest.count({ where: { userId, createdAt: { gte: new Date(Date.now() - 86400000) } } }) >= 10) return Response.json({ error: "Daily guide onboarding limit reached" }, { status: 429, headers });
  const license = await consumeGuideSession(userId);
  if (!license.ok) return licenseError(license);
  // Store only the identity and public reference, never the user's chat context.
  const request = await prisma.guideRequest.upsert({ where: { userId_normalizedName: { userId, normalizedName } }, create: { userId, normalizedName, requestedName: input.name, kind: "PERSON", sourceUrl: input.sources[0].url, status: "SOURCING" }, update: {} });
  try {
    const result = await completeOpenRouter({ system: researchedGuidePrompt(input), messages: [{ role: "user", content: input.context }], maxTokens: 1600, temperature: 0.3 });
    if (!result.text.trim()) throw new Error("Empty advice");
    return Response.json({ status: "provisional", name: input.name, advice: result.text, sources: input.sources.map((source, index) => ({ citation: index + 1, title: source.title, url: source.url })), evidence: "Caller-researched source notes; not independently verified by Summon", onboarding: { requestId: request.id, status: request.status, publicRosterReady: false } }, { headers });
  } catch {
    return Response.json({ error: "Advice unavailable; onboarding request saved", requestId: request.id }, { status: 503, headers });
  }
}
