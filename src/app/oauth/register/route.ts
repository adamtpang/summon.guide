import { prisma } from "@/lib/prisma";
import { makeSecret } from "@/lib/membership";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { redirect_uris?: unknown; client_name?: unknown } | null;
  const redirectUris = Array.isArray(body?.redirect_uris) ? body.redirect_uris.filter((uri): uri is string => typeof uri === "string" && /^https?:\/\//.test(uri)) : [];
  if (redirectUris.length === 0) return Response.json({ error: "invalid_client_metadata", error_description: "At least one HTTPS redirect URI is required." }, { status: 400 });
  const clientId = makeSecret("sm_client_");
  await prisma.mcpOAuthClient.create({ data: { clientId, clientName: typeof body?.client_name === "string" ? body.client_name.slice(0, 120) : null, redirectUris: JSON.stringify(redirectUris) } });
  return Response.json({ client_id: clientId, client_name: body?.client_name ?? "Summon client", redirect_uris: redirectUris, token_endpoint_auth_method: "none", grant_types: ["authorization_code", "refresh_token"], response_types: ["code"] }, { status: 201 });
}
