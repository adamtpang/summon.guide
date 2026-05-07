# summon.guide — Design System

The aim is **immersive, premium, performant, minimalist, aesthetic.** Every choice on the site should be defensible against those five words. When in doubt, take something out.

The reference posture is *editorial print* — a New Yorker article, a Wikipedia infobox, a Penguin paperback. Not a SaaS dashboard. Not a tech demo. Restraint signals seriousness.

## Brand essence

**Summoning is a ritual.** The user isn't "browsing" or "chatting" — they're calling on a specific human guide for a specific problem. The product earns trust by feeling deliberate, not playful. Slow type beats kinetic type. White space beats clever motion. Restraint beats novelty.

## Tokens

The tokens are already in `src/app/globals.css`. Don't add new ones without removing one.

### Color (parchment + ink + gold)

| Token | Hex | Use |
| --- | --- | --- |
| `warm-50` | `#fafaf8` | Page background. Default canvas. |
| `warm-100` | `#f5f4f0` | Code blocks on cards, recessed surfaces. |
| `warm-200` | `#e8e6e0` | Card borders, infobox dividers. |
| `warm-300` | `#d4d0c8` | Subtle separators. |
| `warm-400` | `#a8a296` | Tracked-out small caps labels. |
| `warm-500` | `#7c766a` | Body sub-text, "when to use" descriptions. |
| `ink-800` | `#2a2722` | Hover state for primary buttons. |
| `ink-900` | `#1a1816` | (Reserved — currently unused; deprecate if it stays unused.) |
| `ink-950` | `#0f0e0c` | Primary headlines and primary buttons. Almost-black. |
| `gold-500` | `#b89d4f` | Reserved for icon-only accent. Do **not** use as text color in body. |
| `gold-600` | `#a08839` | Reserved for the favicon and one-off touches. |

**One color per page must dominate.** If a page has the gold dot accent in the favicon, no other gold on screen. If a page has portrait-driven figure colors, no gold at all.

**Per-figure accents** (from `figure.color` in `figures.ts`) are used on profile pages only — the quote left-border, the accomplishment bullet, the skill command pill. These are **not** part of the brand palette; they're per-guide identifiers, applied at the figure-card layer only. Never paint a UI chrome element (button, link, header) with a figure color.

### Type

```
serif:  Playfair Display    — display headings, blockquotes, italicized prose
sans:   Inter               — UI, body copy, buttons, infobox
mono:   ui-monospace        — code blocks, slash commands, step numbers
```

| Role | Class | Notes |
| --- | --- | --- |
| Hero H1 | `text-4xl md:text-6xl font-serif font-medium tracking-tight leading-[1.05]` | One per page. Names, titles. |
| Section H2 | `text-2xl md:text-3xl font-serif font-medium pb-2 border-b border-warm-200` | Wikipedia-style sectioning. |
| Body | `text-base md:text-[17px] leading-[1.75] text-ink-950/85` | The 85% opacity is intentional — pure black is too heavy on warm cream. |
| Body sub | `text-sm leading-relaxed text-warm-500` | Captions, "when to use", footnotes. |
| Eyebrow / kicker | `text-xs tracking-[0.25em] uppercase text-warm-400` or `text-warm-500` | Small caps tracked out. The signature texture of the site. |
| Quote | `font-serif italic text-base md:text-lg leading-relaxed border-l-2 pl-5` | Color the border with the figure color. |
| Code | `text-[11px]–[13px] font-mono` | Slash commands, install blocks. |

**No font sizes between 18px and 24px.** It's the dead zone — too big to be body, too small to be a heading. Use one or the other.

### Spacing rhythm

Stick to Tailwind's default 4px base. The page has a single vertical rhythm:

| Boundary | Spacing |
| --- | --- |
| Inside a card | `p-5` to `p-7` |
| Between cards in a stack | `space-y-3` |
| Between sections (h2 to h2) | `space-y-12` to `space-y-14` |
| Between major regions (hero → body, body → "other guides") | `mt-20 md:mt-28` |

Be generous. Premium = breathing room. If two elements are competing for attention, they need more space, not less.

### Surfaces

| Surface | Looks like |
| --- | --- |
| **Card** | `bg-white border border-warm-200 rounded-xl` — quick facts, skills, install blocks (soft variant). |
| **Hero card** | `bg-ink-950 text-white rounded-2xl` — the install block. Used sparingly — once or twice per page max. |
| **Recessed code** | `bg-warm-100 rounded-md` (in soft variant) or `bg-black/40 rounded-lg` (in dark variant). |
| **Page** | `bg-warm-50` — never pure white. |

**Do not** use heavy `box-shadow`. Surfaces are defined by 1px borders against the warm background. If you need depth, increase the contrast between the surface and the page (white card on warm-50 is enough). Big drop-shadows are SaaS-dashboard tells.

### Borders + radii

- Borders: 1px, almost always `border-warm-200`. Borders on dark cards: `border-white/10`.
- Radii: `rounded-md` (small UI), `rounded-xl` (cards), `rounded-2xl` (hero cards), `rounded-full` (buttons, avatars). Never `rounded-3xl` or larger — looks like a kid's app.

### Motion

- **Default:** none. Static is premium.
- **Allowed:** `transition-colors`, `transition-all duration-300/500`, `active:scale-[0.98]` on buttons, `group-hover:scale-105` on portrait images.
- **Reserved for special moments:** `framer-motion` fade-up for a streamed message, a wisdom card sliding in. Don't use it for layout chrome.
- **Banned:** spring bounces, scroll-triggered animations on body content, parallax, hover wiggles, anything kinetic on type.

### Iconography

- Outline icons only. 12–16px in body, 20px in hero CTAs.
- Use sparingly. The brand voice is "humans matter more than icons."
- No emoji in UI chrome. (Inside chat content, that's the guide's voice — leave it alone.)

## Page architectures

### Homepage (`/`)

- Eyebrow `summon.guide` · Auth button.
- H1: *"Summon humanity's greatest guides."*
- Subhead: ~24 words explaining the matching loop.
- Search input (the **only** primary input on the page — the rest is browse).
- "How it works" — 3-step ordered list, white cards on warm bg, mono step numbers.
- Guide grid — 2 columns mobile / 3 desktop. Portraits in 3:4 aspect ratio, name overlaid bottom-left, knownFor caption below.
- Skills CTA — black hero card linking to `/skills`.
- Footer — single sentence about sourcing.

### Profile pages (`/<slug>`)

Wikipedia-by-way-of-print-magazine. Anchor: https://en.wikipedia.org/wiki/Evan_Spiegel

- Eyebrow brand link · "All guides" back link.
- H1 + occupation tagline + era·location eyebrow.
- Two CTAs: black `Summon X` (chat) and outline `Wikipedia` (external).
- **Per-guide install block** in dark variant — owns the top-of-page real estate after the CTAs.
- Right rail: portrait + classic infobox table.
- Mini TOC.
- Sections: Early life and education → Career → Legacy and death → Claude Code skills → Notable quotes → References.
- "Other guides" cross-links.
- Final summon CTA, then footer.

### Skills index (`/skills`)

- Eyebrow + back link.
- Hero: count + one-paragraph framing.
- Dark install block.
- Per-guide group: 14×14 portrait avatar + name + era as the section header, then skill cards (white, with the figure color as a code-pill background).

### Chat (`/chat/<slug>`)

- Top bar with portrait, summon-reason banner, audio controls.
- Streaming message column over a faded portrait background.
- Suggested follow-up questions as outline pills.
- This is the **one** page where the figure color does most of the work — let it.

## Voice

The product writes in three voices:

1. **Marketing copy** (homepage, OG cards): declarative, weighty, no exclamation points. *"Summon humanity's greatest guides."* not *"Chat with history's coolest people!"*
2. **Profile bios** (`profiles.ts`): encyclopedic, present tense for the living, past tense for the dead. Cite primary sources. No hagiography.
3. **The guide's voice in chat**: governed by `figure.systemPrompt`. Don't touch from the design layer.

## Performance budget

- LCP image: per-figure portrait, must be `priority` on first paint, `<200KB` JPEG. Don't ship raw 1500px portraits.
- Fonts: `next/font` already gives us self-hosted Inter + Playfair. Don't add a third family.
- No client-side libraries we don't already use. Framer Motion is in. Don't add another animation lib.
- The `[figure]` profile page should be `generateStaticParams`-prerendered at build (already is). Skills/SKILL.md content is not loaded by the website — it lives on disk for the Claude Code plugin.

## Accessibility

- Color contrast: `ink-950` on `warm-50` is 19:1. `warm-500` on `warm-50` is 5.5:1 — the floor for UI chrome. `warm-400` is decorative only (3:1) — never use it for body content.
- Tap targets: 44×44 minimum. The mobile send button on the homepage and the audio-intro buttons on guide cards already meet this.
- Focus states: rely on browser defaults plus `focus:border-ink-950 focus:ring-1 focus:ring-ink-950` on inputs. Visible at all times.
- Image `alt`: every portrait uses `alt={figure.name}`. Decorative SVG icons should have no alt.

## What we explicitly are not

- A chat product. Chat is the climax, not the surface.
- A directory. We have 6 guides. We will have ~15. Not 600.
- A SaaS dashboard. No metrics, no streaks, no badges. The user comes for one conversation.

## When breaking rules

The rules above produce a calm, restrained surface. If something needs to shout — a launch announcement, a single hero promo — break the rules deliberately and only for that one element on that one page. Then go back to restraint everywhere else.
