# Privacy Policy — DRAFT, not yet published

**Status: draft for your review.** This is grounded in what the site's code
actually does (verified against `prisma/schema.prisma`, `src/auth.ts`,
`src/app/api/webhook/route.ts`, `src/app/providers.tsx`, and the TTS/chat
routes), not a generic template. It is not legal advice, and a document like
this carries real weight (GDPR/CCPA-adjacent obligations depending on where
your users are) — have it reviewed before it goes live, especially the
sections marked `[NEEDS YOUR INPUT]`.

Nothing here is wired into the live site yet. This is a standalone file for
you to edit and approve.

---

**Effective date:** `[NEEDS YOUR INPUT — date you publish this]`

summon.guide ("we," "us," "the site") is operated by
`[NEEDS YOUR INPUT — your legal name or company name]`. This policy explains
what data summon.guide collects, why, and what happens to it.

## What we collect

**If you sign in with Google:** your name, email address, and profile image,
via Google's standard OAuth sign-in. We don't request any Google scopes
beyond basic profile info — we never see your Google password, and we don't
access your email, calendar, or files.

**If you don't sign in:** your free-trial message count is tracked only in
your browser's local storage. It never reaches our servers, and we have no
way to identify you.

**Chat messages:** when you chat with a guide, your message is sent to
Anthropic's Claude API to generate a response. **We do not store your chat
messages or conversation history in our own database** — there is no
message-history table in our database at all; each conversation exists only
in your browser for the duration of your session. Anthropic processes the
message to generate the reply, subject to Anthropic's own API terms and data
retention policy (see anthropic.com/legal/privacy).

**Voice/audio:** if you use a guide's spoken-voice feature, the text of the
response is sent to ElevenLabs to generate the audio. ElevenLabs processes
that text under its own privacy policy (see elevenlabs.io/privacy).

**Feedback:** if you submit feedback on a guide (a 1-5 rating and an
optional comment), we store it tied to your account and the guide you rated.

**Payment:** if you purchase credits, Stripe handles the entire checkout —
we never see or store your card number, expiration date, or CVV. Stripe
sends us a webhook confirming a completed payment and the email address you
paid with, which we use only to add credits to your account.

**Usage analytics:** we use PostHog and Vercel Analytics to understand
aggregate usage (page views, which guides get chatted with, general site
performance). These tools may set cookies or use similar identifiers in your
browser. We do not use this data to identify you personally beyond what's
already tied to your account if you're signed in.

## Why we collect it

- To let you sign in and keep your credit balance across sessions
- To generate the guide's response to your message (the core product)
- To generate spoken audio when you ask for it
- To process payments and grant purchased credits
- To understand what's working and fix what isn't

## Who we share it with

We share data only with the services above, each solely to perform the
function you're using:

| Service | What they receive | Why |
|---|---|---|
| Google | (nothing from us — you sign in directly with them) | Sign-in |
| Anthropic | Your chat message, the guide's grounding data | Generating the guide's reply |
| ElevenLabs | Text of a response you asked to hear spoken | Voice generation |
| Stripe | (nothing from us — you pay directly on their checkout) | Payment processing |
| PostHog, Vercel | Anonymous/aggregate usage events | Analytics |

We do not sell your data to anyone, ever.

## How long we keep it

- **Account data** (name, email, image, credit balance): kept as long as
  your account exists.
- **Feedback**: kept indefinitely as product feedback, unless you ask us to
  delete it.
- **Chat messages**: not retained by us at all (see above) — governed by
  Anthropic's own retention policy on their end.
- **Anonymous free-trial usage**: lives only in your browser's local
  storage; clearing your browser data clears it.

## Your rights

You can ask us to delete your account and associated data at any time by
contacting `[NEEDS YOUR INPUT — support email]`. Since chat messages aren't
stored by us, there's nothing to delete there beyond what Anthropic may
retain per their own policy.

## Children's privacy

summon.guide is not directed at children under 13, and we don't knowingly
collect data from anyone under 13.

## Changes to this policy

If this policy changes in a material way, we'll update the effective date
above. Continued use of the site after a change means you accept the
updated policy.

## Contact

`[NEEDS YOUR INPUT — support email or contact page]`

---

## Checklist before publishing

- [ ] Fill in the legal name/entity, effective date, and contact email above
- [ ] Have someone (ideally with legal background, even informally) read it
      against what the product actually does
- [ ] Turn this into a real page (e.g. `src/app/privacy/page.tsx`) and link
      it from the site footer / signup flow
- [ ] Confirm the `privacy_policies` manifest field (if pursuing the MCP
      directory submission) points at the live URL, not this draft file
