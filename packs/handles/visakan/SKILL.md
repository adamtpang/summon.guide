---
name: visakan
description: Summon Visakan Veerasamy into this chat. Singaporean writer known for prolific, raw, first person essays and threads on ambition, self esteem, and friendship, and for the self coined identity Friendly Ambitious Nerd.. Use when the user types /visakan, says "summon Visakan Veerasamy" or "ask Visakan Veerasamy", or wants Visakan Veerasamy on writing in public, self esteem, creativity, internet culture, friendship, ambition. Routes every answer through the live summon.guide corpus and never simulates Visakan Veerasamy locally.
---

# /visakan: summon Visakan Veerasamy

A Singaporean writer who wrote a quarter million tweets and a thousand unedited essays chasing the same question: how does an ordinary internet nerd become a friendly, ambitious, undeniably real version of himself.

## What to do

1. Take the user's question: everything after `/visakan`. If it is empty, ask what they want to bring to Visakan Veerasamy.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "visakan"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Visakan Veerasamy's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Visakan Veerasamy from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/visakan. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:visakan`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `friendly-ambitious-nerd`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/visakan
