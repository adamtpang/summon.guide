# Design System: skills, inspiration, and peers

Curated 2026-07-25 to perfect summon.guide's design system. The aesthetic target:
premium editorial meets terminal. Warm off-white / ink / gold, Playfair Display + Inter +
mono, source-cited wisdom. Skills-directory entries were verified live on skills.sh; the
canonical site URLs are well-established.

## Skills to install (ranked by leverage for this project)

The directory is real: **skills.sh**, "The Agent Skills Directory," ranks agent skills by
install count, filterable by Design & UI. Install form: `npx skills add <owner/repo>`.

**The three highest-leverage additions** given the Tailwind v4 + shadcn stack:

```bash
npx skills add shadcn/ui
```
Project-aware shadcn/ui + Tailwind + Radix component generation, reads your `components.json`. The backbone for a real component library.

```bash
npx skills add vercel-labs/agent-skills
```
Bundles `web-design-guidelines` (audits UI against 100+ best practices, an automated critique gate) and `composition-patterns` (compound-component APIs, kills boolean-prop sprawl). This is what turns a folder of components into a scalable library.

```bash
npx skills add emilkowalski/skills
```
Motion craft from the Linear/Vercel design engineer behind Sonner and Vaul. The highest-signal animation skill available.

**Also strong, by job:**
- Raising taste: `anthropics/skills` (frontend-design, forces an aesthetic commitment so output escapes generic AI slop) and `leonxlnx/taste-skill` (tunable taste dials + image-to-code from a reference screenshot).
- Design vocabulary/options: `nextlevelbuilder/ui-ux-pro-max-skill` (50+ styles, ~97 palettes, ~57 font pairings).
- Accessibility gate: `accesslint/claude-marketplace` (contrast/color analysis). Matters because gold-on-dark is exactly where a11y breaks.
- Performance gate: `addyosmani/web-quality-skills` (Core Web Vitals + WCAG + SEO, Next.js-aware).

**Already installed locally** (no action needed): `frontend-design-guidelines`, `design-taste`,
`ui-ux-pro-max`, `brand-design`, `page-load-animations`, `product-review`, and the `design:`
plugin family (design-critique, design-system, accessibility-review).

**Curated lists to bookmark:** `github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit`
(most design-specific), `github.com/rohitg00/awesome-claude-design` (28+ aesthetic families +
an anti-slop kit), `github.com/travisvn/awesome-claude-skills`.

## North-star sites (matched to our thesis)

The ones whose DNA is closest to premium-editorial-meets-terminal:

- **Linear** (linear.app) — the closest spiritual match. Dark, precise, motion only where it earns its keep. Study restraint.
- **Stripe Press** (press.stripe.com) — book-quality reverence for ideas: 3D book renders, meticulous covers. This is what a source-cited wisdom product should feel like.
- **Vercel** (vercel.com) — black/white geometric confidence, typographic scale.
- **Apple** (apple.com) — scroll-driven narrative, ruthless restraint, huge type hierarchy. The study for pacing a page.
- **Basement Studio** (basement.studio) — dark, high-craft, editorial-meets-terminal energy.

**Awwwards top-tier** for immersive moments: Igloo Inc (igloo.inc, Site of the Year 2024),
Lando Norris (landonorris.com, Site of the Year 2025), Active Theory (activetheory.net).

**Designers to follow** (their personal sites are the reference): Rauno Freiberg (rauno.me,
Vercel), Emil Kowalski (emilkowal.ski, Linear), Paco Coursey (paco.me, Linear, made cmdk).
Plus Refactoring UI (refactoringui.com) by Wathan + Schoger, the practical taste bible that
pairs with Tailwind.

**Galleries to mine continuously:** Awwwards (awwwards.com), Godly (godly.website),
Mobbin (mobbin.com, real app UI patterns), Land-book (land-book.com).

## Peer projects

**Direct (AI persona / historical-figure chat):**
- **Hello History** (hellohistory.ai) — the closest competitor. Fact-checked chat with figures. Their aesthetic is friendlier and softer than our target, which is precisely our opening: differentiate on taste.
- **Text With History** (textwithhistory.com) — 100+ figures, SMS metaphor, low friction.
- **Delphi** (delphi.ai) — premium "digital clone of a mind" positioning. Study how it sells trust in a persona.
- **Character.AI** (character.ai) — the giant. Use as a "what not to look like": consumer-maximalist, the opposite of our thesis. Borrow only its discovery-grid and switching UX.

**Editorial wisdom (the taste, without the chat mechanic):**
- **Nav.al** (nav.al) — quote-forward minimalism with rigorous source attribution. Maps onto our citation feature. Naval is already a guide.
- **Farnam Street** (fs.blog) — mental-models authority, serif editorial trust, browse-by-idea. Fits our problem-to-skill routing.
- **The Marginalian** (themarginalian.org) — warm, book-like reading, cross-linked ideas across thinkers.
- **Readwise** (readwise.io) — best-in-class inline highlight-and-citation UX. Study how to make a cited quote a first-class object, not a footnote.

## The un-crowded position

None of the direct chat peers commit to a genuinely premium dark-editorial aesthetic. None
of the editorial-wisdom peers have the summon-and-converse mechanic. summon.guide's opening
is to fuse the two: the conversational persona mechanic of the chat peers, rendered with the
typographic and citation craft of the editorial peers. That is defensible and un-crowded.

## Fastest path to act

1. Install the backbone: the three `npx skills add` commands above.
2. Formalize the off-white / ink / gold palette into Tailwind v4 `@theme` tokens, so Playfair, Inter, mono, and the gold accent become named tokens instead of scattered hex values.
3. Run `web-design-guidelines` + accessibility review as a standing critique gate (gold-on-dark contrast is the known risk).
4. Keep Linear, Stripe Press, and Rauno / Emil / Paco open as north-star references while polishing components.
