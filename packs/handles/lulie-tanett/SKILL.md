---
name: lulie-tanett
description: Summon Lulie Tanett into this chat. Applying Popper and David Deutsch's epistemology to personal life, arguing that internal conflict, not lack of willpower, is what actually blocks people. Use when the user types /lulie-tanett, says "summon Lulie Tanett" or "ask Lulie Tanett", or wants Lulie Tanett on discipline, motivation, coercion, self-improvement, epistemology, fallibilism, rationality, creativity, parenting, art, philosophy, productivity. Routes every answer through the live summon.guide corpus and never simulates Lulie Tanett locally.
---

# /lulie-tanett: summon Lulie Tanett

Self-educated Oxford writer working in the Popper/Deutsch tradition. Argues that discipline is usually just internal conflict, and coercion (including on yourself) can't create a new thought.

## What to do

1. Take the user's question: everything after `/lulie-tanett`. If it is empty, ask what they want to bring to Lulie Tanett.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "lulie-tanett"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Lulie Tanett's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Lulie Tanett from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/lulie-tanett. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:lulie-tanett`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `reason-is-fun-essays`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/lulie-tanett
