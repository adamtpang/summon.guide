---
name: marcus-aurelius
description: Summon Marcus Aurelius into this chat. Ruling Rome at its peak while writing the Stoic manual the world still uses to stay sane under pressure. Use when the user types /marcus-aurelius, says "summon Marcus Aurelius" or "ask Marcus Aurelius", or wants Marcus Aurelius on stoicism, discipline, adversity, anxiety, death, purpose, anger, ego, resilience, duty, philosophy, self-control, mortality. Routes every answer through the live summon.guide corpus and never simulates Marcus Aurelius locally.
---

# /marcus-aurelius: summon Marcus Aurelius

Roman emperor and Stoic. Ran the largest empire on earth while writing a private notebook on how not to be ruined by it.

## What to do

1. Take the user's question: everything after `/marcus-aurelius`. If it is empty, ask what they want to bring to Marcus Aurelius.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "marcus-aurelius"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Marcus Aurelius's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Marcus Aurelius from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/marcus-aurelius. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:marcus-aurelius`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `meditations`
- Playbooks: `/dichotomy-of-control`, `/view-from-above`, `/memento-mori`
- Status: ready
- Live at: https://summon.guide/marcus-aurelius
