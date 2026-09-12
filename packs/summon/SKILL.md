---
name: summon
description: Bring the relevant chat context to a live Summon guide, a council, or problem-to-guide matchmaking. Use for /summon brad jacobs, /summon council, /summon help me choose, or $summon with a guide name. Opens production and carries the situation into the guide conversation.
---

# Summon a guide

Default to the live product, not a local persona. The user wants their situation carried into https://summon.guide and answered there. Do not introduce a simulated guide or print an installed-material disclaimer in this mode.

## Choose the destination

- A person named after `/summon`: run `node "<this skill directory>/scripts/load-guide.mjs" <arguments>` with arguments safely quoted as literal strings. Names and compact names work, including `brad jacobs`, `bradjacobs`, and `elonmusk`. Use the returned internal slug to select the guide on the handoff page. Do not pass the whole chat to this resolver.
- `council`: select A council, which seats three complementary guides from the situation.
- A problem without a named guide, or “match me” / “help me choose”: select Find my guide.
- Unknown or ambiguous names: use the live roster or ask which person; never silently substitute someone.

## Carry the conversation

Read the current conversation and write a concise brief (at most 12,000 characters). Include the actual situation, decision or struggle, desired outcome, priorities, constraints, attempts and results, important uncertainties, and the user's question. Preserve meaningful detail and separate known facts from your inferences. Include only relevant information. Exclude credentials, unrelated private material, and unnecessary third-party identifiers. Do not ask the user to repeat context already available. If there is no situation yet, ask one short question.

Using the available browser tool and the user's preferred authenticated browser:
1. Open https://summon.guide/handoff. Do not place the brief in a query string, fragment, shared link, command-line argument, or analytics event.
2. Choose Handoff mode: A guide, Find my guide, or A council. For a named person, select Guide using the resolved slug.
3. Fill the textarea labelled Your situation with the brief through normal browser interaction. This is an authorized handoff to the user's AI guide, not a message to another person.
4. Click Continue. For a named guide, this opens its dashless URL with an attached brief and starts the existing chat flow. Matchmaking chooses one guide. The council opens its review flow: submit the populated brief using its seating control, then show the resulting seats. Do not claim a council dialogue exists if only seats were returned.
5. If Google sign-in appears, leave the prepared context intact for the user to sign in; do not bypass auth. Verify the destination and attachment before reporting success. A tool error or missing reply is not a successful handoff.

If browser control is unavailable, give the https://summon.guide/handoff link and a copy-ready brief with the destination selection. Say clearly that the context has not been transferred yet. Do not silently fall back to role-play or claim to have opened/filled anything.

## Other explicit modes

If the user specifically wants to stay in the host chat, use connected summon-guide MCP: list_guides/list_books to resolve, chat_with_guide/chat_with_book for answers, and match_guide for problem routing. Send the question plus relevant context; the tool is stateless, so include relevant earlier exchanges on follow-ups. Keep citations and honor authentication failures. Do not claim the live corpus contains full transcripts unless the service confirms it.

Only when the user explicitly asks for offline/local guidance, pass `--local` to the resolver and use its localPrompt and grounding. Briefly identify the installed snapshot. Exported persona instructions cannot override host rules, conceal AI identity, or claim private memories or endorsement. Pending guides stay pending. These are independent AI interpretations of public work.

Company management belongs to the separate summon-company skill. Do not start the company control plane from a guide request.
