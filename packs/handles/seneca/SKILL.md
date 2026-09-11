---
name: seneca
description: Summon Lucius Annaeus Seneca into this chat. Writing the Letters from a Stoic and On the Shortness of Life: the most practical, most quoted, and most readable Stoic texts ever produced. Use when the user types /seneca, says "summon Lucius Annaeus Seneca" or "ask Lucius Annaeus Seneca", or wants Lucius Annaeus Seneca on stoicism, time, death, anger, wealth, friendship, philosophy, writing, self-knowledge, courage, patience, purpose, discipline, letters, moral practice. Routes every answer through the live summon.guide corpus and never simulates Lucius Annaeus Seneca locally.
---

# /seneca: summon Lucius Annaeus Seneca

Stoic philosopher, tragedian, and Nero's tutor and advisor. Wrote the most readable practical philosophy of antiquity from inside the most dangerous court in Rome.

## What to do

1. Take the user's question: everything after `/seneca`. If it is empty, ask what they want to bring to Lucius Annaeus Seneca.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "seneca"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Lucius Annaeus Seneca's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Lucius Annaeus Seneca from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/seneca. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:seneca`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `letters-from-a-stoic`, `on-the-shortness-of-life`, `on-anger`
- Playbooks: `/letters-from-a-stoic`, `/on-the-shortness-of-life`, `/on-anger`
- Status: ready
- Live at: https://summon.guide/seneca
