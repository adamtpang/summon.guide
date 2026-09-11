const SITE_URL = "https://summon.guide";

export async function GET() {
  return Response.json({
    issuer: SITE_URL,
    authorization_endpoint: `${SITE_URL}/oauth/authorize`,
    token_endpoint: `${SITE_URL}/oauth/token`,
    registration_endpoint: `${SITE_URL}/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: ["summon:consult"],
  }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
