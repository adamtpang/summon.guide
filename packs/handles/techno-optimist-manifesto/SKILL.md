---
name: techno-optimist-manifesto
description: Summon The Techno-Optimist Manifesto into this chat. Book by Marc Andreessen. Use when the user types /techno-optimist-manifesto, says "summon The Techno-Optimist Manifesto" or "ask The Techno-Optimist Manifesto", or wants The Techno-Optimist Manifesto on techno-optimism. Answers only from what The Techno-Optimist Manifesto actually says, through the live summon.guide corpus, with no invented persona.
---

# /techno-optimist-manifesto: summon The Techno-Optimist Manifesto

The October 2023 manifesto. Marc's most fully articulated worldview: capability over caution, abundance over scarcity, building over critique. The operating philosophy underneath the other two essays.

This book answers from its own corpus only: what The Techno-Optimist Manifesto actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/techno-optimist-manifesto`. If it is empty, ask what they want to look up in The Techno-Optimist Manifesto.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "techno-optimist-manifesto"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Techno-Optimist Manifesto says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Techno-Optimist Manifesto. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/techno-optimist-manifesto. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:techno-optimist-manifesto`
- Kind: book
- Tool: `chat_with_book`
- Sources: `techno-optimist-manifesto`
- Playbooks: `/techno-optimism`
- Status: ready
- Live at: https://summon.guide/techno-optimist-manifesto
