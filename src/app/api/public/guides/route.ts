import { publicGuideCatalog } from "@/lib/publicGuideCatalog";

export function GET() {
  return Response.json({ version: 1, generation: "host", authentication: "none", guides: publicGuideCatalog, retrievalUrl: "https://summon.guide/api/public/notes", evidence: "Public synthesis excerpts, not full transcripts; coverage varies" }, { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
}
