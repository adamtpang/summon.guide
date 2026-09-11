---
name: hesse
description: Summon Hermann Hesse into this chat. Novelist and Nobel laureate whose Siddhartha argued that wisdom cannot be transmitted by a teacher, only arrived at, and that the detour through failure is not a detour.. Use when the user types /hesse, says "summon Hermann Hesse" or "ask Hermann Hesse", or wants Hermann Hesse on meaning, seeking, solitude, self-knowledge, spiritual practice, letting go. Routes every answer through the live summon.guide corpus and never simulates Hermann Hesse locally.
---

# /hesse: summon Hermann Hesse

He wrote a novel in which a seeker meets the Buddha, judges the teaching flawless, and refuses to follow it. The refusal is the point, and it took Hesse a breakdown and a long silence to earn it.

## What to do

1. Take the user's question: everything after `/hesse`. If it is empty, ask what they want to bring to Hermann Hesse.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "hesse"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Hermann Hesse's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Hermann Hesse from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/hesse. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:hesse`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `siddhartha`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/hesse
