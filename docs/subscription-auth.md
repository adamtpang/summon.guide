# Using a Claude subscription instead of API credits

**Verdict: partly possible.** summon.guide can authenticate to Claude with a
Pro/Max **subscription** OAuth token instead of pay-as-you-go API credits — the
code supports it (`src/lib/anthropic.ts`). But it is **fragile on a public
deployed server** and is really meant for local/personal use. Read this before
turning it on for production.

## How to turn it on

1. Mint an OAuth token from your subscription login (either works):
   ```
   claude setup-token
   # or, with the Anthropic CLI:
   ant auth print-credentials --access-token
   ```
2. In Vercel → Project → Settings → Environment Variables (Production):
   - **Set** `ANTHROPIC_AUTH_TOKEN` = the token from step 1.
   - **Remove** `ANTHROPIC_API_KEY` — if both are present, every request 401s
     (the API rejects an `x-api-key` and a `Bearer` token together).
3. Redeploy.

The app (`anthropicClient()` in `src/lib/anthropic.ts`) then sends the token as
`Authorization: Bearer …` plus the required `anthropic-beta: oauth-2025-04-20`
header, and usage draws on your subscription. Remove `ANTHROPIC_AUTH_TOKEN` to
go back to metered credits — no code change.

## Why this is only "partly" viable — the three blockers

1. **Token expiry / refresh (the hard one).** OAuth access tokens are
   short-lived and are **not auto-refreshed** when supplied via env var — the
   refresh machinery lives in the local CLI profile, which a Vercel serverless
   function doesn't have. So the token silently expires (hours), and every
   guide returns *"Server is missing a valid Anthropic API key"* until you
   re-mint `ANTHROPIC_AUTH_TOKEN` and redeploy. The refresh token itself also
   hard-expires, so even a scripted refresh eventually needs a fresh
   interactive login.
2. **Rate limits.** A Max subscription's caps are sized for one human using
   claude.ai / Claude Code — not for a public "summon anyone in history"
   landing page. Public bursts trip the limit, and there's no tier to buy up
   to; the only lever is "use Claude less."
3. **Terms of service.** Consumer subscriptions (Pro/Max) are for personal,
   interactive use via claude.ai and Claude Code. The Developer Platform / API
   (metered credits) is the product Anthropic sells for powering applications
   and serving end users. Pointing a personal subscription at a public,
   unauthenticated app is outside the subscription's intended use — a
   gray-to-red area. (Confirm the exact current Consumer Terms / Usage Policy
   before relying on it.)

## What's actually deployed now: the Postgres-backed token, not the env var

The steps above (`ANTHROPIC_AUTH_TOKEN` env var) are the simple version and
still work, but the live site actually runs the sturdier mechanism described
in the header comment of `src/lib/anthropic.ts`: an `AnthropicOAuthToken` row
in Postgres (`prisma/schema.prisma`), seeded from a local machine's own
`claude` login and refreshed automatically in-request by `getValidAccessToken()`
(`src/lib/anthropicOAuth.ts`) as it nears expiry. This was built specifically
to remove blocker 1 above (env-var tokens expiring in hours with no way to
refresh themselves on serverless). It mostly works. It has one real failure
mode of its own, below.

## Troubleshooting: "Server is missing a valid Anthropic API key"

If every guide (and `/chat/source/<slug>`) starts returning this, check the
Vercel runtime logs (`get_deployment` / `get_runtime_errors` if you have the
Vercel MCP, or the dashboard) for `OAuthRateLimitError` on
`https://console.anthropic.com/v1/oauth/token`. If you see that specific
error, this is **not** a billing problem and not your account being
throttled generally — the account and normal Claude usage can be completely
fine while this happens.

**Root cause: the refresh token is single-use and rotating, and two things
are refreshing the same underlying credential.** The Postgres row was seeded
from a snapshot of whichever machine's `~/.claude/.credentials.json` ran the
seed script. If that same machine is later used for ordinary interactive
Claude Code work, its local CLI silently refreshes its own copy of the token
in the background, which rotates out the refresh token the deployed app's
copy depends on. The deployed app's next refresh attempt then gets rejected,
not with a clean "invalid token" but as a 429 on the refresh endpoint, which
does not clear on its own the way a normal rate limit would.

The clean fix is a **dedicated login**: run `claude login` once from a
device or session that is never opened interactively again afterward, so
nothing else ever rotates its refresh token. We have not set that up. The
accepted tradeoff for now is periodic reseeding instead:

```bash
node -r dotenv/config scripts/seed-anthropic-oauth-token.mjs dotenv_config_path=.env.local
```

Run this from a machine that is currently logged into `claude` and has
`DATABASE_URL` in `.env.local` (pull it with `vercel env pull .env.local` if
missing). No redeploy needed, the app reads the Postgres row live. Rerun it
whenever the symptom above reappears; there is no way to predict when the
local session will next rotate the shared credential, so this is genuinely
periodic, not a one-time fix.

### Setting up the dedicated login (does this permanently)

`scripts/seed-anthropic-oauth-token.mjs` reads credentials from
`CLAUDE_CONFIG_DIR` if set, or `~/.claude/.credentials.json` otherwise. Use
this to create an isolated login profile that nothing else ever touches, so
its refresh token can't get rotated out from under the deployed site:

1. **Log in to a fresh, isolated profile** (one-time, interactive — has to be
   run by a human, this step can't be scripted or done on the person's
   behalf):
   ```bash
   CLAUDE_CONFIG_DIR=~/.claude-summonguide claude login
   ```
   This opens the normal browser OAuth flow. Log in with whichever Anthropic
   account should back the deployed site (your own subscription works — the
   isolation is per-*session*, not per-account, since nothing else will ever
   open this specific profile again).
2. **Seed from that profile instead of the default one:**
   ```bash
   CLAUDE_CONFIG_DIR=~/.claude-summonguide node -r dotenv/config scripts/seed-anthropic-oauth-token.mjs dotenv_config_path=.env.local
   ```
3. **Never run `claude` with `CLAUDE_CONFIG_DIR=~/.claude-summonguide` again**
   for ordinary interactive work — that's the entire point. If a rare
   re-auth is ever needed (refresh token itself expired, ~90 days unused),
   repeat step 1 with the same `CLAUDE_CONFIG_DIR` and reseed.

Once this is done, the periodic-reseed problem above stops recurring,
because the only thing that can rotate `~/.claude-summonguide`'s refresh
token is this exact reseed script running against it — nothing else on the
machine will ever open that profile.

## Recommendation

- **Public live site → API credits.** Keep `ANTHROPIC_API_KEY`, set
  `AI_MODEL=claude-haiku-4-5` (≈3× cheaper), keep prompt caching on, and turn
  on **auto-reload** so the balance never hits zero. See
  [billing-and-models.md](./billing-and-models.md). This is the sustainable
  path and fixes the real pain (running out / paying too much).
- **Local or personal-scale use → the subscription token is great.** Run it on
  your own machine where the CLI auto-refreshes the token for you — no API
  spend, no rotation chores. That's the shape this mechanism was built for.

## What the "impossible" claim got wrong (and right)

It's **not** literally impossible — the OAuth mechanism exists and the Messages
API accepts it. But it **is** unsupported, operationally fragile on serverless,
and against the intended use for a public app. So the right conclusion for the
production site ("don't run it on a subscription") stands — just for the
accurate reason (unsupported + fragile), not "the mechanism doesn't exist."
