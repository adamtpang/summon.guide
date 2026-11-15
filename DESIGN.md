# summon.guide design system

Set 2026-11-15. This replaces every earlier direction (warm paper, monochrome,
blue magic, the grey temple fog). If a page disagrees with this file, the page
is wrong.

## The idea

A hall of people worth asking. The faces are the design. Everything else is
quiet marble and plain type so the faces and their words carry the page.

## Color

Six tokens, defined in `src/app/globals.css`. Use the token, never a hex value.

| Token | Value | Use |
| --- | --- | --- |
| `night` | `#f3f0e8` | The page (marble) |
| `raised` | `#fbfaf6` | Surfaces that sit on the page: inputs, alternate bands |
| `edge` | `#d6d0c2` | Rules and quiet borders |
| `moon` | `#14171f` | Ink: headings and body text |
| `mist`, `dim` | `#454953`, `#666a73` | Secondary and tertiary text |
| `lapis` | `#1f3d7a` | Anything you can act on: primary buttons, links, focus, your own messages |
| `gilt` | `#c29a45` | Ornament only: the light in the mark, the current-page underline, a lit portrait ring |

Rules:
- Lapis means "you can act on this". Do not use it for decoration.
- Gilt is never text and never a button.
- No gradients, no glows, no blur, no drop shadows on cards.
- One theme. There is no dark mode.

## Type

| Role | Face | Notes |
| --- | --- | --- |
| Headings, names, quotations | Cormorant Garamond (`font-serif`) | Weight 500. Page titles 48 to 84px with line-height 1. Sentence case. |
| Everything you read or press | Geist (`font-sans`) | Body 17px at 1.7 line-height. Small text never below 14px. |
| The wordmark only | Cinzel (`font-display`) | "SUMMON" in the header. Nowhere else. |

Rules:
- No tracked-out capital labels above headings. If a heading needs a label, the heading is wrong.
- No monospace except real code.
- Line length at most 62 characters for body text.

## Shape

- Portraits sit in a **niche**: an arch, round on top, square at the foot (`.niche`). This is the one distinctive shape. Do not use circles for guides except the 32px avatar beside a chat message.
- Everything else is carved, not soft: 2 to 3px corner radius on buttons, inputs, cards and menus. No pills.
- Portraits are grey at rest and take their color when pointed at or when the guide is the subject of the page (`.niche.is-lit`). This lets photographs and paintings from three centuries sit together.

## The mark

An arched doorway with a small light in it: lapis ground, marble arch, gilt
light. Source of truth is `src/lib/brandMark.ts`; `SummonMark` draws it inline,
and `icon.tsx`, `apple-icon.tsx` and `public/favicon.svg` use the same shape.
Checked legible at 16px.

## Layout

- One header on every page: `SiteHeader` (mark, Guides, Council, Sage, sign in). Chat screens keep their own slim bar.
- Content width `max-w-6xl`, 20px side gutters on phones, 32px above.
- Sections alternate `night` and `raised` with a single `edge` rule between them. No cards floating on cards.
- Minimum 44px for anything you can tap.

## Components

- **Ask box** (`StuckBox`): a ruled rectangle with a labelled lapis button ("Find my guide"). Example problems under it are plain underlined links, not chips.
- **Guide niche** (`GuideNiche`): arch portrait, name in serif, one line of what you would go to them for (`src/lib/guideLines.ts`).
- **Buttons**: primary is solid lapis with marble text; secondary is a 1px ink outline. Labels say what happens ("Talk to Benjamin", "Find my guide").
- **Chat**: your messages are lapis blocks on the right; the guide's replies are open text at 17px with the name in serif above.
- **Life story** (`LifeStory`): chapters with a year line, floated public-domain plates with credit links, one exact quotation per chapter at most, a timeline.

## Writing

Sentence case. Plain verbs. Say what the thing does. No "unlock", "journey",
"wisdom". Every guide is described as an AI guide built from public work, once
per page, in normal text, not in a badge.

## Not done yet

- Chat screens still use an older stylesheet under the new colors; their header is not the shared one.
- Books and channels, onboarding, connect, skills and distillation pages have the new palette and focus ring but not the new layout.
- Leonardo da Vinci has no portrait yet.
