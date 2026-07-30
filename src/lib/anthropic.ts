import Anthropic from "@anthropic-ai/sdk";

// One place that decides HOW summon.guide authenticates to Claude, so we can
// bill usage to EITHER a metered API key OR a Claude subscription without
// touching every route.
//
// Two modes, chosen by env at cold-start:
//
//   1. SUBSCRIPTION (Claude Pro/Max), set ANTHROPIC_AUTH_TOKEN to an OAuth
//      token minted from a subscription login (`claude setup-token`, or
//      `ant auth print-credentials --access-token`). We send it as a Bearer
//      token plus the required `anthropic-beta: oauth-2025-04-20` header, and
//      explicitly DISABLE the api-key path (apiKey: null), if both an
//      x-api-key and a Bearer token are sent, the API returns 401. Usage then
//      draws on the subscription instead of API credits.
//
//   2. API CREDITS (default), no ANTHROPIC_AUTH_TOKEN, so the SDK uses
//      ANTHROPIC_API_KEY and bills metered pay-as-you-go credits.
//
// ⚠️ IMPORTANT, subscription mode is fragile on a deployed server. OAuth
// access tokens are SHORT-LIVED and are NOT auto-refreshed here (the refresh
// machinery lives in the local CLI profile, which a Vercel serverless
// function doesn't have). When the token expires, every guide 401s until you
// re-mint ANTHROPIC_AUTH_TOKEN and redeploy. It also runs on consumer rate
// limits and using a personal subscription to serve a public app is outside
// its intended use. Great for LOCAL / personal-scale use (where the CLI
// auto-refreshes for you); for the public site, prefer API credits +
// AI_MODEL=claude-haiku-4-5 + auto-reload. See docs/billing-and-models.md.
export function anthropicClient(): Anthropic {
  const oauthToken = process.env.ANTHROPIC_AUTH_TOKEN?.trim();
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

/** True when the app is authenticating via a subscription OAuth token. */
export const usingSubscriptionAuth = Boolean(
  process.env.ANTHROPIC_AUTH_TOKEN?.trim()
);
