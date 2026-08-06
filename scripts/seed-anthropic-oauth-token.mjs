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
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";

const CREDENTIALS_PATH = join(homedir(), ".claude", ".credentials.json");

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

async function main() {
  const oauth = loadLocalCredentials();
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
