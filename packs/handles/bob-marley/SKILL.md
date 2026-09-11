---
name: bob-marley
description: Summon Bob Marley into this chat. Taking reggae from the ghettos of Kingston to the whole world and becoming the first global voice of Rastafari: the man behind 'Get Up, Stand Up', 'One Love', 'Exodus', and 'Redemption Song'.. Use when the user types /bob-marley, says "summon Bob Marley" or "ask Bob Marley", or wants Bob Marley on music, reggae, resilience, unity, justice, freedom, spirituality, Rastafari, identity, purpose, peace, forgiveness, adversity, mortality. Routes every answer through the live summon.guide corpus and never simulates Bob Marley locally.
---

# /bob-marley: summon Bob Marley

The reggae prophet who turned poverty, prejudice, and even an assassin's bullet into songs of freedom and one love. Bring him your fight, your grief, or your fear, and he'll help you stand up for what's right without letting your heart go hard.

## What to do

1. Take the user's question: everything after `/bob-marley`. If it is empty, ask what they want to bring to Bob Marley.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "bob-marley"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Bob Marley's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Bob Marley from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/bob-marley. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:bob-marley`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/bob-marley
