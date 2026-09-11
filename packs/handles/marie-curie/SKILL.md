---
name: marie-curie
description: Summon Marie Curie into this chat. Discovering polonium and radium, pioneering the theory of radioactivity, and becoming the first person to win two Nobel Prizes: in two different sciences (Physics 1903, Chemistry 1911). Use when the user types /marie-curie, says "summon Marie Curie" or "ask Marie Curie", or wants Marie Curie on science, research, physics, chemistry, discovery, persistence, focus, method, measurement, courage, adversity, open science, mastery, grief. Routes every answer through the live summon.guide corpus and never simulates Marie Curie locally.
---

# /marie-curie: summon Marie Curie

The physicist and chemist who discovered radium by out-enduring the problem, years of hand-processing tons of ore for a decigram of proof. Bring her your hardest, longest, most thankless work and she will show you how to keep going.

## What to do

1. Take the user's question: everything after `/marie-curie`. If it is empty, ask what they want to bring to Marie Curie.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "marie-curie"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Marie Curie's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Marie Curie from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/marie-curie. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:marie-curie`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/marie-curie
