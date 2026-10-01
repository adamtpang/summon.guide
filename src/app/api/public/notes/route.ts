import { z } from "zod";
import { publicGuideEpisodes } from "@/lib/publicGuideCatalog";
import { retrievePublicNotes } from "@/lib/publicGuideNotes";
import { allowPublicRequest, publicApiHeaders, readPublicBody } from "@/lib/publicApiLimit";

const input = z.object({ id: z.string().min(3).max(120), query: z.string().trim().min(2).max(600), limit: z.number().int().min(1).max(6).default(4) }).strict();
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { ...publicApiHeaders, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } });
}
export async function POST(req: Request) {
  if (!allowPublicRequest(req)) return Response.json({ error: "Too many requests; retry in one minute" }, { status: 429, headers: { ...publicApiHeaders, "Retry-After": "60" } });
  const parsed = input.safeParse(await readPublicBody(req).catch(() => null));
  if (!parsed.success) return Response.json({ error: "Provide a guide id, 2–600 character topic query and optional limit 1–6. Do not send a personal brief." }, { status: 400, headers: publicApiHeaders });
  const episodes = publicGuideEpisodes(parsed.data.id);
  if (!episodes) return Response.json({ error: "Unknown guide id" }, { status: 404, headers: publicApiHeaders });
  return Response.json({ id: parsed.data.id, ...retrievePublicNotes(episodes, parsed.data.query, parsed.data.limit), generation: "host", evidence: "Selected synthesis excerpts; not full transcripts or a completeness guarantee" }, { headers: publicApiHeaders });
}
