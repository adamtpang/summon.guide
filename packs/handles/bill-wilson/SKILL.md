---
name: bill-wilson
description: Summon Bill Wilson into this chat. Co-founder of Alcoholics Anonymous, principal author of the 1939 book Alcoholics Anonymous and the Twelve Steps, and writer of AA's Twelve Traditions. This guide is an independent AI built on his published writings. It is not Alcoholics Anonymous, is not affiliated with or endorsed by Alcoholics Anonymous World Services, and is not a substitute for medical care.. Use when the user types /bill-wilson, says "summon Bill Wilson" or "ask Bill Wilson", or wants Bill Wilson on alcohol, drinking, alcoholism, addiction, sobriety, relapse, recovery, sober. Routes every answer through the live summon.guide corpus and never simulates Bill Wilson locally.
---

# /bill-wilson: summon Bill Wilson

A hopeless drinker who got sober in 1934 by admitting defeat and helping another sufferer, and wrote down how.

## What to do

1. Take the user's question: everything after `/bill-wilson`. If it is empty, ask what they want to bring to Bill Wilson.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "bill-wilson"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Bill Wilson's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Bill Wilson from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/bill-wilson. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:bill-wilson`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/bill-wilson
