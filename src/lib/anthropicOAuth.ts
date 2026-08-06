import { prisma } from "./prisma";

// Keeps the Claude subscription (Pro/Max) OAuth credential alive on a serverless
// deployment, where the previous approach (a bare access token in ANTHROPIC_AUTH_TOKEN)
// silently went stale every few hours because nothing could write a refreshed token
// back to it. The fix: persist BOTH the access token and the refresh token in Postgres
// (see prisma/schema.prisma, model AnthropicOAuthToken), and refresh here, in-request,
// whenever the cached access token is close to expiring.
//
// Endpoint and client_id match what the Claude Code CLI itself uses for this OAuth
// flow. Two candidate hosts are tried in order because Anthropic has been migrating
// this endpoint from console.anthropic.com to platform.claude.com; trying both keeps
// this working through that migration instead of hardcoding the host that happens to
// be current today.
const TOKEN_URL_CANDIDATES = [
  "https://platform.claude.com/v1/oauth/token",
  "https://console.anthropic.com/v1/oauth/token",
];
const CLIENT_ID = "9d1c250a-e61b-44d9-88ed-5944d1962f5e";
const TOKEN_ROW_ID = "default";

// Refresh a little before actual expiry so a request that lands right at the boundary
// still gets a token with enough life left to complete the call.
const REFRESH_BUFFER_MS = 2 * 60 * 1000;

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number; // seconds
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Thrown specifically for HTTP 429 so callers can tell "try again shortly, this
 *  account is rate-limited" apart from "this refresh token is dead, needs a fresh
 *  interactive login". Confirmed as a real, not just theoretical, failure mode:
 *  both candidate endpoints returned 429 during manual testing of this exact code,
 *  from normal single-request usage, not a burst. */
export class OAuthRateLimitError extends Error {
  constructor(detail: string) {
    super(`Anthropic OAuth token endpoint rate-limited the refresh: ${detail}`);
    this.name = "OAuthRateLimitError";
  }
}

async function refreshViaEndpoint(refreshToken: string): Promise<RefreshResponse> {
  const attempt = async (): Promise<RefreshResponse> => {
    let lastError: unknown = new Error("no token endpoint reachable");
    let sawRateLimit = false;
    for (const url of TOKEN_URL_CANDIDATES) {
      try {
        const r = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", "User-Agent": "anthropic" },
          body: JSON.stringify({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: CLIENT_ID,
          }),
        });
        if (!r.ok) {
          const detail = (await r.text().catch(() => "")).slice(0, 300);
          if (r.status === 429) sawRateLimit = true;
          lastError = new Error(`OAuth refresh HTTP ${r.status} from ${url}: ${detail}`);
          continue;
        }
        const data = (await r.json()) as Partial<RefreshResponse>;
        if (!data.access_token || !data.refresh_token || !data.expires_in) {
          lastError = new Error(`OAuth refresh from ${url} returned an unexpected shape`);
          continue;
        }
        return data as RefreshResponse;
      } catch (err) {
        lastError = err;
      }
    }
    if (sawRateLimit) {
      throw new OAuthRateLimitError(lastError instanceof Error ? lastError.message : String(lastError));
    }
    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  };

  try {
    return await attempt();
  } catch (err) {
    // One bounded retry, only for a 429, since that's the one failure mode where
    // waiting briefly is the actual fix rather than a no-op. A dead/revoked refresh
    // token or a network error won't be helped by retrying and shouldn't eat the
    // extra latency.
    if (err instanceof OAuthRateLimitError) {
      await sleep(1500);
      return attempt();
    }
    throw err;
  }
}

/**
 * Returns a currently-valid access token for the subscription, refreshing it first
 * if it is close to expiring. Returns null when no token has been seeded at all,
 * meaning the caller should fall back to metered API-key billing.
 */
export async function getValidAccessToken(): Promise<string | null> {
  const row = await prisma.anthropicOAuthToken.findUnique({ where: { id: TOKEN_ROW_ID } });
  if (!row) return null;

  const msUntilExpiry = row.accessTokenExpiresAt.getTime() - Date.now();
  if (msUntilExpiry > REFRESH_BUFFER_MS) return row.accessToken;

  try {
    const refreshed = await refreshViaEndpoint(row.refreshToken);
    const accessTokenExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000);

    // Refresh tokens ROTATE on every use: this refresh has already invalidated
    // row.refreshToken on Anthropic's side. If a concurrent request refreshed first,
    // its write already moved the row's refreshToken value off what we read, so this
    // compare-and-swap affects 0 rows here rather than clobbering the newer token.
    const cas = await prisma.anthropicOAuthToken.updateMany({
      where: { id: TOKEN_ROW_ID, refreshToken: row.refreshToken },
      data: {
        accessToken: refreshed.access_token,
        refreshToken: refreshed.refresh_token,
        accessTokenExpiresAt,
      },
    });

    if (cas.count === 0) {
      // Lost the race. Our own refresh call still succeeded and minted a real,
      // usable access token (Anthropic doesn't know or care that we're about to
      // discard it), so serving this request with it is correct; just don't
      // persist it, since the winner's refresh token is now the current one.
      return refreshed.access_token;
    }
    return refreshed.access_token;
  } catch (err) {
    // Refresh failed. If we still had a few seconds of buffer left when we tried,
    // the old access token is still genuinely valid, better to serve one more
    // request on it than to fail a real user over a slightly-early refresh attempt.
    if (row.accessTokenExpiresAt.getTime() > Date.now()) return row.accessToken;
    console.error("[anthropicOAuth] refresh failed and cached token is expired:", err);
    throw err;
  }
}

/** Seeds or replaces the stored subscription credential. Called once, locally, from
 *  scripts/seed-anthropic-oauth-token.mjs, never from a request path. */
export async function seedAnthropicOAuthToken(input: {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt?: Date | null;
  scopes?: string | null;
}) {
  await prisma.anthropicOAuthToken.upsert({
    where: { id: TOKEN_ROW_ID },
    create: { id: TOKEN_ROW_ID, ...input },
    update: input,
  });
}
