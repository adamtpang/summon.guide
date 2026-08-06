import Anthropic from "@anthropic-ai/sdk";
import { getValidAccessToken } from "./anthropicOAuth";

// One place that decides HOW summon.guide authenticates to Claude, so we can
// bill usage to EITHER a metered API key OR a Claude subscription without
// touching every route.
//
// Two modes:
//
//   1. SUBSCRIPTION (Claude Pro/Max). The credential lives in Postgres
//      (AnthropicOAuthToken, seeded once via scripts/seed-anthropic-oauth-token.mjs
//      from a local `claude` login), not in an env var, because a bare access
//      token in ANTHROPIC_AUTH_TOKEN expires in HOURS and a Vercel function has
//      nowhere to write a refreshed one back to. getValidAccessToken() (see
//      anthropicOAuth.ts) reads the stored token, refreshes it via Anthropic's
//      OAuth endpoint when it is close to expiring, and persists the result, so
//      the subscription keeps working indefinitely without anyone re-minting
//      anything by hand. We send it as a Bearer token plus the required
//      `anthropic-beta: oauth-2025-04-20` header, and explicitly DISABLE the
//      api-key path (apiKey: null): if both an x-api-key and a Bearer token are
//      sent, the API returns 401.
//
//      ANTHROPIC_AUTH_TOKEN as a plain env var is still read as a fallback, for
//      local dev where seeding the shared DB row is unnecessary friction.
//
//   2. API CREDITS (default), no subscription token found anywhere, so the SDK
//      uses ANTHROPIC_API_KEY and bills metered pay-as-you-go credits.
//
// This is now built to run on the public deployment, not just locally, but the
// underlying rate-limit and terms-of-use caveats in docs/subscription-auth.md
// still apply: a Pro/Max subscription's caps are sized for one interactive
// human, not a public multi-user site.
export async function anthropicClient(): Promise<Anthropic> {
  let oauthToken: string | null = null;
  try {
    oauthToken = await getValidAccessToken();
  } catch (err) {
    // Refresh genuinely failed (network down, refresh token itself expired, …).
    // Fall through to the env-var token if one exists, then to API-key billing,
    // rather than hard-failing every request over a subscription-auth outage.
    console.error("[anthropic] subscription token unavailable, falling back:", err);
  }
  oauthToken = oauthToken || process.env.ANTHROPIC_AUTH_TOKEN?.trim() || null;

  if (oauthToken) {
    return new Anthropic({
      authToken: oauthToken,
      apiKey: null, // never send x-api-key alongside a Bearer token (→ 401)
      defaultHeaders: { "anthropic-beta": "oauth-2025-04-20" },
    });
  }
  // Default: metered API key (ANTHROPIC_API_KEY, read by the SDK).
  return new Anthropic();
}
