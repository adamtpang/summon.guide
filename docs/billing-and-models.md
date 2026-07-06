# Billing & models — how summon.guide pays for Claude

## The short version

summon.guide's guides talk by calling the **Anthropic API** (`@anthropic-ai/sdk`
with `ANTHROPIC_API_KEY`). The API is **metered pay-as-you-go usage**, billed
from a credit balance on [console.anthropic.com](https://console.anthropic.com).
When that balance hits zero, every guide returns a `400` — *"Your credit
balance is too low."* — and the site shows "The guides are resting…". Topping
up is the fix; there is no code change that avoids it.

## Can we use a Claude Pro / Max subscription instead of usage credits?

**No.** This comes up a lot, so to be unambiguous:

| | What it pays for | Powers our app? |
|---|---|---|
| **Claude Pro / Max** | claude.ai + Claude Code (interactive, personal use) | ❌ No |
| **Claude Code subscription** | the Claude Code CLI | ❌ No |
| **Anthropic API credits** | programmatic `messages.create()` calls | ✅ Yes — this is the only option |

A consumer subscription and the developer API are **separate products with
separate billing**. There is no supported way to bill a production web app's
API calls to a Pro/Max subscription. The one technical loophole — using a
personal subscription's OAuth token as the server credential — **violates
Anthropic's usage policy** (that auth is for your own tools like Claude Code,
not for serving a public site) and is unworkable in practice (short-lived
tokens, per-user rate limits, refresh churn). Don't do it; the app would get
rate-limited or the account flagged.

## So how do we keep the balance from blocking the site?

Two levers, both legitimate:

### 1. Never hit zero — turn on auto-reload (recommended)

In the Anthropic Console → **Plans & Billing → Auto-reload**, set it to add,
say, $10 whenever the balance drops below $2. The site then never goes dark on
an empty balance. A few dollars lasts a long time at chat volumes.

### 2. Spend less per message — pick a cheaper model

`AI_CONFIG` reads two environment variables (set them in Vercel → Project →
Settings → Environment Variables, Production):

| Env var | Effect | Default |
|---|---|---|
| `AI_MODEL` | Which Claude model the guides use | `claude-sonnet-5` |
| `AI_MAX_TOKENS` | Max reply length (fewer output tokens = lower cost) | `1024` |

Approximate list price per **million tokens** (input / output):

| `AI_MODEL` | Input | Output | Notes |
|---|---|---|---|
| `claude-haiku-4-5` | $1 | $5 | ~3× cheaper than Sonnet; fast; great for chat |
| `claude-sonnet-5` | $3 ($2 intro) | $15 ($10 intro) | Default; best quality |

Set `AI_MODEL=claude-haiku-4-5` to cut the per-message cost by roughly two
thirds with a small quality trade-off — no code change, just an env var and a
redeploy. Use only bare model ids from Anthropic's catalog; never append a
date suffix (that was the `claude-sonnet-4-5-20250514` 404 incident).

## Where the credits actually go

Every guide reply is one streamed `messages.create` call with the guide's
~4–5K-token system prompt (cached via `cache_control`, so repeated turns bill
the prefix at ~10%). `/api/match` (routing), `/api/tts` (ElevenLabs, separate
bill), and `/api/extract-quote` also spend. The system prompt cache is the
main reason a long conversation is far cheaper than 4–5K tokens per turn.
