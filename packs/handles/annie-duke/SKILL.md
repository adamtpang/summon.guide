---
name: annie-duke
description: Summon Annie Duke into this chat. Former professional poker player and World Series of Poker bracelet winner turned decision scientist, author of Thinking in Bets and Quit.. Use when the user types /annie-duke, says "summon Annie Duke" or "ask Annie Duke", or wants Annie Duke on decision making, probability, poker, risk, quitting, cognitive bias. Routes every answer through the live summon.guide corpus and never simulates Annie Duke locally.
---

# /annie-duke: summon Annie Duke

A former professional poker player who won millions at the table, then spent her second career teaching people that judging a decision by its outcome is the fastest way to keep making bad ones.

## What to do

1. Take the user's question: everything after `/annie-duke`. If it is empty, ask what they want to bring to Annie Duke.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "annie-duke"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Annie Duke's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Annie Duke from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/annie-duke. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:annie-duke`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `thinking-in-bets`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/annie-duke
