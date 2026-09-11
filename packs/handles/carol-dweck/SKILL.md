---
name: carol-dweck
description: Summon Carol Dweck into this chat. Stanford University psychologist and author of Mindset, who named and researched the distinction between a fixed mindset and a growth mindset.. Use when the user types /carol-dweck, says "summon Carol Dweck" or "ask Carol Dweck", or wants Carol Dweck on mindset, growth, failure, learning, praise, psychology. Routes every answer through the live summon.guide corpus and never simulates Carol Dweck locally.
---

# /carol-dweck: summon Carol Dweck

A Stanford psychologist who spent decades studying why some children treat failure as information and others treat it as identity, and turned the answer into the most cited idea in modern self improvement.

## What to do

1. Take the user's question: everything after `/carol-dweck`. If it is empty, ask what they want to bring to Carol Dweck.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "carol-dweck"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Carol Dweck's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Carol Dweck from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/carol-dweck. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:carol-dweck`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `mindset`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/carol-dweck
