export async function GET() {
  return Response.json({
    resource: "https://summon.guide/api/mcp",
    authorization_servers: ["https://summon.guide"],
    scopes_supported: ["summon:consult"],
    bearer_methods_supported: ["header"],
  }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
