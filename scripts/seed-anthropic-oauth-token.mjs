#!/usr/bin/env node
// Seeds the AnthropicOAuthToken row (see prisma/schema.prisma) from the local
// machine's own Claude Code login, so the deployed site can bill guide chat to a
// Claude subscription and refresh its own token indefinitely instead of the
// previous approach (a bare ANTHROPIC_AUTH_TOKEN env var that silently expired
// every few hours with no way to renew itself on a serverless host).
//
// Run locally, while logged into Claude Code on this machine:
//   node scripts/seed-anthropic-oauth-token.mjs
//
// Reads ~/.claude/.credentials.json (Windows: %USERPROFILE%\.claude\.credentials.json)
// and writes straight to the database via DATABASE_URL (from .env.local, pulled with
// `vercel env pull .env.local`). Token VALUES are never printed, only expiry metadata.
//
// For a DEDICATED login (see docs/subscription-auth.md), point this at an isolated
// Claude Code profile instead of your daily-driver one, so nothing else ever rotates
// its refresh token:
//   CLAUDE_CONFIG_DIR=~/.claude-summonguide node scripts/seed-anthropic-oauth-token.mjs
// (matches whichever CLAUDE_CONFIG_DIR you used for `claude login` to create that profile)
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

// The CLI caches its access token and only refreshes it lazily, on the next real
// API call. So the credentials file routinely holds an ALREADY-EXPIRED access
// token while the CLI still reports "logged in". Seeding that verbatim used to
// look like it worked and then fail in production with "missing a valid
// Anthropic API key", because the site then had to refresh the token itself and
// that refresh is rate-limited. Refresh locally first, then copy the result.
const FRESHNESS_BUFFER_MS = 10 * 60 * 1000;

const CREDENTIALS_PATH = process.env.CLAUDE_CONFIG_DIR
  ? join(process.env.CLAUDE_CONFIG_DIR, ".credentials.json")
  : join(homedir(), ".claude", ".credentials.json");

function loadLocalCredentials() {
  let raw;
  try {
    raw = readFileSync(CREDENTIALS_PATH, "utf8");
  } catch (err) {
    console.error(`Could not read ${CREDENTIALS_PATH}: ${err.message}`);
    console.error("Run `claude` and log in on this machine first.");
    process.exit(1);
  }
  const parsed = JSON.parse(raw);
  const oauth = parsed.claudeAiOauth;
  if (!oauth?.accessToken || !oauth?.refreshToken || !oauth?.expiresAt) {
    console.error(`${CREDENTIALS_PATH} does not have the expected claudeAiOauth shape.`);
    process.exit(1);
  }
  return oauth;
}

/**
 * Returns credentials whose access token is actually still valid.
 *
 * `claude auth status` does NOT trigger a refresh (it reports logged-in against
 * an expired access token), so the only reliable way to make the CLI renew is a
 * real, minimal prompt call. The CLI owns its own credentials file, including
 * rotating the refresh token, so letting it do the refresh is what keeps the
 * local login intact. Refreshing here by hand would rotate the refresh token out
 * from under the CLI and break it.
 */
function loadFreshCredentials() {
  let oauth = loadLocalCredentials();
  const msLeft = new Date(oauth.expiresAt).getTime() - Date.now();
  if (msLeft > FRESHNESS_BUFFER_MS) return oauth;

  console.log(
    msLeft <= 0
      ? "Local access token is expired, asking the Claude CLI to refresh it..."
      : "Local access token expires shortly, asking the Claude CLI to refresh it..."
  );
  try {
    execSync('claude -p "ok"', { stdio: "ignore", timeout: 120_000 });
  } catch (err) {
    console.error(`Could not force a token refresh via the Claude CLI: ${err.message}`);
    console.error('Run `claude -p "ok"` yourself to confirm the login still works, then retry.');
    process.exit(1);
  }

  oauth = loadLocalCredentials();
  if (new Date(oauth.expiresAt).getTime() <= Date.now()) {
    console.error("Access token is STILL expired after a refresh attempt. Not seeding a dead token.");
    console.error("Log in again with `claude` on this machine, then retry.");
    process.exit(1);
  }
  console.log("Refreshed.");
  return oauth;
}

async function main() {
  const oauth = loadFreshCredentials();
  const accessTokenExpiresAt = new Date(oauth.expiresAt);
  const refreshTokenExpiresAt = oauth.refreshTokenExpiresAt
    ? new Date(oauth.refreshTokenExpiresAt)
    : null;

  if (Number.isNaN(accessTokenExpiresAt.getTime())) {
    console.error(`expiresAt in credentials file is not a valid timestamp: ${oauth.expiresAt}`);
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try {
    await prisma.anthropicOAuthToken.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        accessToken: oauth.accessToken,
        refreshToken: oauth.refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
        scopes: Array.isArray(oauth.scopes) ? oauth.scopes.join(",") : oauth.scopes || null,
      },
      update: {
        accessToken: oauth.accessToken,
        refreshToken: oauth.refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
        scopes: Array.isArray(oauth.scopes) ? oauth.scopes.join(",") : oauth.scopes || null,
      },
    });
    console.log("Seeded AnthropicOAuthToken.");
    console.log(`  access token expires:  ${accessTokenExpiresAt.toISOString()}`);
    console.log(
      `  refresh token expires: ${refreshTokenExpiresAt ? refreshTokenExpiresAt.toISOString() : "(not reported)"}`
    );
    console.log(`  subscription tier:     ${oauth.subscriptionType || "(unknown)"}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
