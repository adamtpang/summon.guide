# Guide portrait and retrieval audit, 2026-09-22

## Visual release

Commit 520a23c repairs Rick Rubin and Pendleton Ward portraits, includes the previously untracked Brad Jacobs image, and shares a resilient portrait component across person-chat headers, hero portraits, messages and call mode. The original image is retried when optimization fails; initials appear if both fail. The favicon, SVG icon, app icon and Apple icon share one blue wizard mark. Suggested questions retain separate bubbles.

All 50 local person portrait assets passed HTTP and image decoding checks. TypeScript, focused lint (no errors), and the isolated production build passed. Rick Rubin rendered correctly in the browser. Rose's generated illustration is labeled and credited; her guide registration remains part of unreleased local work. Books without cover assets retain the existing book symbol; this release does not invent cover art.

## Retrieval truth

Production has 115 agent records, 87 with retrieval notes. Local work has 116 records, 95 with notes. These include people, books and channels and should not be treated as equal-depth corpora.

Public Sage uses query-aware retrieval across 209 original synthesis notes. The private full-transcript pilot is not connected to the public source-chat endpoint.

Six live person chats lack connected retrieval notes: Adam Neumann, Bob Marley, Marie Curie, Pendleton Ward, Ricky Gervais and Sam Walton. Their local retrieval fixes are not in this visual release. Dave Ramsey is pack-only. Other guides generally retrieve from smaller synthesis collections; connected retrieval is not evidence of Sage-level depth or independently verified answer quality.
