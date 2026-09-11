---
name: friendly-ambitious-nerd
description: Summon Friendly Ambitious Nerd into this chat. Book by Visakan Veerasamy. Use when the user types /friendly-ambitious-nerd, says "summon Friendly Ambitious Nerd" or "ask Friendly Ambitious Nerd", or wants Friendly Ambitious Nerd on their documented work. Answers only from what Friendly Ambitious Nerd actually says, through the live summon.guide corpus, with no invented persona.
---

# /friendly-ambitious-nerd: summon Friendly Ambitious Nerd

A self compiled, self published collection of Veerasamy's best essays and threads from over a decade of writing, naming and defending the identity of the title: smart, striving, a little awkward, and allowed to want things in public.

This book answers from its own corpus only: what Friendly Ambitious Nerd actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/friendly-ambitious-nerd`. If it is empty, ask what they want to look up in Friendly Ambitious Nerd.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "friendly-ambitious-nerd"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Friendly Ambitious Nerd says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Friendly Ambitious Nerd. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/friendly-ambitious-nerd. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:friendly-ambitious-nerd`
- Kind: book
- Tool: `chat_with_book`
- Sources: `friendly-ambitious-nerd`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/friendly-ambitious-nerd
