# Billing and models

## The short version

summon.guide uses one OpenRouter model waterfall for guide chat, source chat,
guide matching, and quote extraction. Each request tries up to three models in
this order:

1. The two highest-quality compatible free models in OpenRouter's live catalog.
2. The highest-quality compatible paid model under Summon's price caps.

OpenRouter automatically advances through that queue when a model is rate
limited, unavailable, moderated, or otherwise cannot serve the request. An HTTP
200 response with no text is also treated as a failure and retried after the
model that produced it. The chat UI shows the model that actually answered and
whether it was a fallback.

## Why the queue is dynamic

Free preview models appear, disappear, and change limits. Hard-coding today's
winner would quietly degrade the product. `src/lib/openrouter.ts` refreshes the
public model catalog every six hours and selects models with:

- text input and output;
- at least a 128K context window;
- at least 1,024 output tokens;
- non-negative pricing;
- a published Artificial Analysis intelligence score;
- no mandatory reasoning mode for the discounted fallback.

The paid fallback defaults to at most $0.25 per million input tokens and $1.50
per million output tokens. Each request also excludes providers OpenRouter marks
as collecting model inputs.

## Required production setting

Set `OPENROUTER_API_KEY` in the Vercel project for Production, Preview, and
Development. Keep it server-side and never expose it through a `NEXT_PUBLIC_`
variable.

## Controls

| Environment variable | Effect | Default |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Server credential used for all model calls | required |
| `OPENROUTER_MODEL_QUEUE` | Exact comma-separated queue override, first three unique IDs are used | live ranking |
| `OPENROUTER_MAX_INPUT_PER_MILLION` | Maximum paid input price in USD per million tokens | `0.25` |
| `OPENROUTER_MAX_OUTPUT_PER_MILLION` | Maximum paid output price in USD per million tokens | `1.50` |
| `AI_MAX_TOKENS` | Maximum generated tokens per guide or source reply | `1600` |

An override is useful for a controlled model evaluation, but the live ranking
should remain the default for production. A lower price cap can remove every
paid candidate; in that case the static emergency queue is used.

## Operational behavior

- Missing or invalid key: the stream returns a calm configuration error.
- Free queue exhausted: OpenRouter tries the capped-cost fallback.
- Spending limit reached: users see a spending-limit message.
- All models busy: users are asked to retry shortly and no browser message
  credit is consumed.
- Model response is successful: server logs and the chat badge identify the
  actual model and fallback depth.

OpenRouter's own prompt/response logging is off by default unless explicitly
enabled in its account settings. Model providers have separate policies, so the
runtime sets `provider.data_collection` to `deny` on every completion.
