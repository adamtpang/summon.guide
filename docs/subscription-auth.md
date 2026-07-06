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
