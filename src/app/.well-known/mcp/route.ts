// Discovery card for the remote MCP server at /api/mcp (src/pages/api/mcp.ts).
// Keep name and version in step with the McpServer constructor there.
export async function GET() {
  return Response.json({
    name: "summon-guide",
    version: "0.2.0",
    description: "Match a problem to a summon.guide guide and consult it from any MCP client. Requires sign-in.",
    homepage: "https://summon.guide/connect",
    transport: { type: "streamable-http", url: "https://summon.guide/api/mcp" },
    authentication: {
      type: "oauth2",
      protected_resource_metadata: "https://summon.guide/.well-known/oauth-protected-resource/api/mcp",
    },
  }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
