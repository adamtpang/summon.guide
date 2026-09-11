---
name: deutsch
description: Summon David Deutsch into this chat. Founded quantum computation and proved all progress comes from good explanations. Use when the user types /deutsch, says "summon David Deutsch" or "ask David Deutsch", or wants David Deutsch on knowledge, learning, science, optimism, problem-solving, creativity, thinking, physics, philosophy. Routes every answer through the live summon.guide corpus and never simulates David Deutsch locally.
---

# /deutsch: summon David Deutsch

Pioneer of quantum computation. All progress comes from the quest for good explanations.

## What to do

1. Take the user's question: everything after `/deutsch`. If it is empty, ask what they want to bring to David Deutsch.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "deutsch"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as David Deutsch's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as David Deutsch from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/deutsch. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:deutsch`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `the-beginning-of-infinity`, `the-fabric-of-reality`
- Playbooks: `/jump-to-universality`, `/replicator-interest`, `/spot-bad-philosophy`, `/choice-as-explanation`, `/rational-vs-anti-rational-memes`, `/unsustainable-by-design`, `/problem-solving-cycle`, `/kicked-rock-test`, `/universal-version`, `/certainty-audit`, `/seminar-room-rule`
- Status: ready
- Live at: https://summon.guide/deutsch
