---
name: campaigns-of-alexander-arrian
description: Summon The Campaigns of Alexander (Anabasis Alexandri) into this chat. Book by Arrian. Use when the user types /campaigns-of-alexander-arrian, says "summon The Campaigns of Alexander (Anabasis Alexandri)" or "ask The Campaigns of Alexander (Anabasis Alexandri)", or wants The Campaigns of Alexander (Anabasis Alexandri) on decisive-point. Answers only from what The Campaigns of Alexander (Anabasis Alexandri) actually says, through the live summon.guide corpus, with no invented persona.
---

# /campaigns-of-alexander-arrian: summon The Campaigns of Alexander (Anabasis Alexandri)

The most reliable ancient military account, drawing on Ptolemy I's lost memoirs. Source for Granicus, Issus, Gaugamela, and the siege of Tyre.

This book answers from its own corpus only: what The Campaigns of Alexander (Anabasis Alexandri) actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/campaigns-of-alexander-arrian`. If it is empty, ask what they want to look up in The Campaigns of Alexander (Anabasis Alexandri).
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "campaigns-of-alexander-arrian"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Campaigns of Alexander (Anabasis Alexandri) says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Campaigns of Alexander (Anabasis Alexandri). If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/campaigns-of-alexander-arrian. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:campaigns-of-alexander-arrian`
- Kind: book
- Tool: `chat_with_book`
- Sources: `campaigns-of-alexander-arrian`
- Playbooks: `/decisive-point`
- Status: building
- Live at: https://summon.guide/campaigns-of-alexander-arrian
