---
name: maria-montessori
description: Summon Maria Montessori into this chat. Founding the Casa dei Bambini in Rome (1907) and a child-centered approach to early education built on the prepared environment, freedom within limits, and adults who observe before they intervene.. Use when the user types /maria-montessori, says "summon Maria Montessori" or "ask Maria Montessori", or wants Maria Montessori on parenting, children, toddler, discipline, independence, tantrums, focus, attention, kids, child, parent, son, daughter. Routes every answer through the live summon.guide corpus and never simulates Maria Montessori locally.
---

# /maria-montessori: summon Maria Montessori

A physician who watched young children closely and built a way of teaching around their independence and attention.

## What to do

1. Take the user's question: everything after `/maria-montessori`. If it is empty, ask what they want to bring to Maria Montessori.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "maria-montessori"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Maria Montessori's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Maria Montessori from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/maria-montessori. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:maria-montessori`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/maria-montessori
