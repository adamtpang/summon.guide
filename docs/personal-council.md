# Personal counsel from your heroes

The product loop is: current life context, reviewed brief, three complementary
guides, one conversation, one action, then feedback about what happened.
The first four steps have a local implementation at `/council`. Returning the
chosen action and outcome to themain.quest is still future work.

1. themain.quest assembles situation, problems, goals, priorities, constraints,
   patterns, guidance preferences, and open questions. Its existing
   `npm run life:context -- --send` exports to the local repos.chat mailbox.
2. In Summon, sign in and open `/council`, also linked below the homepage intake.
   The local mailbox requires `SUMMON_LIFE_CONTEXT_OWNER_ID` to equal the
   owner's Summon database user ID. It defaults to denying access. Never set
   this from a caller's request or expose the mailbox to every member.
3. Read and edit the brief before choosing **Find my guides**. A brief can also
   be pasted or written directly. Previewing the mailbox does not call a model.
4. Matching sends the reviewed text through Summon's existing OpenRouter
   runtime. It recommends a primary guide plus two different perspectives,
   with reasons and opening questions. Domain overlap is the labeled fallback
   when the model is unavailable. These are suggestions, not a proven perfect match.
5. Opening a guide carries the brief and opening question through session
   storage. Personal context and matching reasons stay out of URLs. A storage
   failure leaves the user on the council with an actionable error.

The shared specialist supplies sources, methods, and tools. Personal memory
belongs to the user and must remain separate from that shared specialist.
Eve deployment is not required for this matching and chat flow.

## Connection boundary

The repo mailbox is a local development integration, not a hosted connection
between the two websites. On a hosted site, use a reviewed pasted brief today.
Production automatic sync requires authenticated per-user linking, consent,
freshness and revocation, and isolated storage. No production account link or
automatic background sync has been configured by this change.

Briefs are not saved to the Summon account by this flow, but matching sends
them to the existing model provider and local notices remain on disk. Never
publish mailbox files or raw vault material. The API marks personal responses
private and non-cacheable. Review the brief again when priorities change.

## Verification

`node scripts/test-council-boundary.mjs` exercises real route handlers with
synthetic identities, a mocked mailbox, and a mocked provider. It checks
anonymous and non-owner denial, MCP isolation, owner preview without model
use, private response headers, pasted matching, and rejection of oversized
briefs. It never reads the real vault or calls a provider.

`scripts/test-council.py` stages the Helium browser checks using synthetic
session, brief, provider responses, and storage. The September 9 run was
blocked before page execution by Helium's remote-debugging permission prompt;
these browser checks have not passed yet.
