# summon.guide — Design System

## Current direction: blue magic (2026-09-10)

The wizard emoji 🧙 is the basis of Sage's identity. Adam's latest direction
supersedes strict monochrome: speaking with Sage should feel like blue magic.
Keep the interface radically simple, with a near-black midnight canvas, moonlit
text, and one blue accent. The core surface is text chat; call mode remains disabled.

Shared tokens and the wizard emblem live in `public/design/sage-magic.css`, used
by both the main Sage chat and the local transcript preview:

| Token | Value | Role |
| --- | --- | --- |
| Night | #060b16 | Canvas |
| Surface | #0d1729 | Composer and menus |
| Edge | #233756 | Quiet borders |
| Blue | #79b8ff | Send action, citations, focus, thinking |
| Light | #e4efff | Primary text |
| Muted | #9baec9 | Secondary text |

Use the wizard as a single central presence, with a faint halo and one small
star. Keep the body of each answer still and easy to read. Light belongs around
Sage and active controls, not every surface. No particle fields, flashing,
extra labels or fantasy jargon. Preserve keyboard focus, 44px controls and
reduced-motion support. The native emoji appearance varies by operating system.

Earlier parchment and monochrome guidance below is historical; this direction
wins for Sage. Other guide portraits remain individual identities.

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
- H1: *"Bring the problem. We'll bring the right mind."*
- Subhead: explain the problem, context-import, and guide-matching loop.
- One dark, problem-first intake card is the **only** primary input on the page.
- The intake has two modes: `Find my guide` and `Name a person`. Life-problem mode is the default.
- A secondary dialog generates a privacy-conscious extraction prompt for ChatGPT or Claude, then accepts the reviewed context brief.
- "How it works" — 3-step ordered list, white cards on warm bg, mono step numbers.
- Guide hall — a compact single-column index with portrait, name, era, known-for line, and audio introduction.
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

- Compact top bar with back, ambient-audio, and replay controls.
- A centered `max-w-2xl` conversation over a faded portrait background.
- User messages use the guide accent. Assistant responses use white editorial cards with a 2px accent rule, clear guide identity, and a citation footer.
- Imported personal context appears as a collapsed attachment card, not a wall of text.
- Suggested follow-ups are horizontally scrollable outline pills.
- Guide color is limited to the user message, response rule, and speaking waveform. Navigation and composer stay warm/ink.
- Unsigned questions open one focused Google sign-in sheet only after the user
  chooses a guide or submits a prompt. The sheet promises a return to the same
  guide, states the current free-testing terms, and keeps the pending brief in
  browser session storage until a successful answer.

### Source chat (`/chat/source/<slug>`)

- Dark ink canvas to distinguish a source corpus from a person guide.
- Book or corpus identity is always visible above a restrained response card.
- Citations remain attached to the stored answer after streaming finishes.
- Uses the same composer geometry and interaction rules as guide chat.

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

- A blank generic chat product. Conversation is the climax, but routing and source grounding make it useful.
- An unbounded directory. The council is curated and source-backed, even as the roster grows.
- A SaaS dashboard. No metrics, no streaks, no badges. The user comes for one conversation.

## When breaking rules

The rules above produce a calm, restrained surface. If something needs to shout — a launch announcement, a single hero promo — break the rules deliberately and only for that one element on that one page. Then go back to restraint everywhere else.

## Model route status (2026-08-29)

The guide and source chat footers may show one compact shadcn `Badge` after a
response: `Free · Model` or `Saver · Model`, followed by fallback depth only
when a fallback occurred. This borrows the restrained status treatment from
shadcn's `dashboard-01` block without turning chat into a dashboard.

- Light chat uses a translucent white surface, slate text, and a quiet outline.
- Dark source chat uses a translucent white-on-ink treatment.
- The badge is `rounded-full`, 20px high, and secondary to the message count.
- Existing warm/ink tokens, typography, spacing, and page architecture remain
  unchanged.

Production compilation and the live SSE-to-badge data path are verified.
Helium remains the required browser for visual checks on this project; do not
substitute Chrome.

## Problem-first intake and chat polish (2026-08-30)

The landing intake borrows one structural idea from shadcn `login-03`: one
centered primary task, a quiet surrounding canvas, and compact hierarchy inside
the card. It is not a visual clone. Summon keeps its warm-paper, ink, serif, and
editorial identity.

- The homepage opens with the life problem, not the guide directory.
- ChatGPT and Claude context import is a two-step dialog: copy a constrained
  extraction prompt, review the resulting Markdown, then attach it.
- Personal briefs use one-time session storage and never enter the URL.
- Guide matching weighs current problems, goals, priorities, constraints, and
  patterns, with priority given to the highest-leverage present bottleneck.
- Shared shadcn primitives now govern card, dialog, tabs, textarea, button, and
  composer behavior.
- Helium verification passed at 2134px desktop and 390px mobile: no horizontal
  overflow, 16px mobile text entry, 48px composer controls, and no visible
  interactive target below 44px on the landing, context dialog, or chat shells.

## Guide avatars (2026-09-10)

- Every active person guide needs a recognizable, source-identified face.
  Preserve likeness; never substitute a different person or arbitrary initials.
- Call avatars use a circular monochrome portrait on the black canvas. Sage
  uses an original faceless wise elder silhouette,
  `public/avatars/sage-silhouette-v2.png`. A bowed head, long beard and robe
  suggest wisdom through posture; no visible facial features. Keep it monochrome.
- New source portraits and their source links are listed in
  `public/avatars/sources.json`; `/avatars` is the local visual review gallery.
- Original photographs are unchanged on disk; grayscale and circular cropping
  are presentation styles. Books/channels retain their existing cover branding.

## Current interaction (2026-09-10)

Adam replaced call mode with simple text chat. Black and white, compact avatar/name,
message thread and composer. Optional ElevenLabs Listen control on each answer.
Call controls are commented out, not exposed in navigation.

## Sage refinement (2026-09-10)

Empty state: centered silhouette and Sage, with one bottom composer. Active state:
small header identity, right-aligned question bubbles, open answer prose. Keep the
composer visible; expand it for multiline input. Send becomes Stop during streaming.
Sources collapse into one disclosure per reply. Save, history, provenance and model
details live in the options menu. No persistent keyboard tutorial, follow-up chips,
large branding, call controls or always-visible model badge. All controls retain
44px targets, keyboard names and focus rings. Respect reduced motion.
