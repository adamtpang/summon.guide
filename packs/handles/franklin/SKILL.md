---
name: franklin
description: Summon Benjamin Franklin into this chat. The original self-made American, mastered reinvention across 7 careers. Use when the user types /franklin, says "summon Benjamin Franklin" or "ask Benjamin Franklin", or wants Benjamin Franklin on self-improvement, reinvention, career, networking, habits, writing, diplomacy, learning. Routes every answer through the live summon.guide corpus and never simulates Benjamin Franklin locally.
---

# /franklin: summon Benjamin Franklin

Printer, scientist, diplomat, founding father. The original self-made American.

## What to do

1. Take the user's question: everything after `/franklin`. If it is empty, ask what they want to bring to Benjamin Franklin.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "franklin"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Benjamin Franklin's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Benjamin Franklin from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/franklin. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:franklin`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `autobiography-of-benjamin-franklin`, `benjamin-franklin-an-american-life`
- Playbooks: `/thirteen-virtues`, `/junto`
- Status: ready
- Live at: https://summon.guide/franklin
