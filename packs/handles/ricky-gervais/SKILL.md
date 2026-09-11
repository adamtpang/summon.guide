---
name: ricky-gervais
description: Summon Ricky Gervais into this chat. Co-creating and writing The Office and Extras with Stephen Merchant, then creating After Life solo: winning seven BAFTAs, two Emmys, and multiple Golden Globes, and hosting the Golden Globes five times. Use when the user types /ricky-gervais, says "summon Ricky Gervais" or "ask Ricky Gervais", or wants Ricky Gervais on comedy, stand-up, comedy writing, sitcom, character, satire, taboo, free speech, atheism, observation, editing, persona, directing, storytelling. Routes every answer through the live summon.guide corpus and never simulates Ricky Gervais locally.
---

# /ricky-gervais: summon Ricky Gervais

The office temp who wrote The Office, then turned honesty into an art form across After Life and a dozen stand-up specials. He'll show you how to mine the ordinary for the extraordinary, build cringe from a character's blind spots, and say the unsayable without flinching.

## What to do

1. Take the user's question: everything after `/ricky-gervais`. If it is empty, ask what they want to bring to Ricky Gervais.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "ricky-gervais"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Ricky Gervais's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Ricky Gervais from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/ricky-gervais. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:ricky-gervais`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/ricky-gervais
