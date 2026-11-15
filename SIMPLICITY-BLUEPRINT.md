# Simplicity blueprint: the radically simple version of summon.guide

One sentence: if summon.guide did exactly one thing perfectly, a person stuck on
a real decision could say what is stuck and walk away with an answer from one
of the greatest humans who ever lived, in that person's own words.

## The one user

Adam. A builder stuck on a real decision today, who admires these thirteen
people and wants their counsel, not a chatbot's.

(Unconfirmed until Adam says so. Every other visitor is served by serving him.)

## The core loop

1. Say what is stuck, or pick a face.
2. Arrive with the one guide who lived it.
3. Read their answer, in their own words, with the source named.

Done when: a stranger opens the site, types a problem, and within one minute is
reading a cited answer from a guide who fits, without reading any instructions.

## The minimum effective feature set

Every line here survived the deletion test: remove it and the core loop breaks.

- The ask box and router: without it, step 1 has no way to find the right guide.
- The thirteen faces: without them there is no "pick a face" and no sense of who is here.
- One conversation screen per guide, answering from their own text with citations: this is the outcome.
- Sign in: without it anyone can spend the model budget, and the site goes down.
- One life-story page per guide: without it a stranger cannot tell who is answering or why to trust them.
- A footer line saying these are AI guides, with privacy and credits: without it the site misleads and breaks its own rules.

## What this deliberately is NOT (the cut list)

Cut from the homepage now:

- Header navigation (Guides, Council, Sage): NOT YET (returns when a second destination earns a place in the loop)
- The stage fact box, epithet, and two buttons: NEVER on the homepage (a face and a name are enough; the facts live on the life-story page)
- Example problem links under the box: NOT YET (returns if strangers stall at the empty box in testing)
- "Other ways in" section: NOT YET (same trigger as the navigation)
- "How summon.guide works" text block and pricing paragraph: moved to the About page (it exists for search audits, not for the one user)

Cut from the product surface (pages stay reachable by link, nothing is deleted):

- The council: NOT YET (when all thirteen guides answer well alone)
- Sage: NOT YET (it is a second product; returns when the core loop is nailed)
- Book and channel chats: NOT YET (when a guide's own-words library is not enough)
- Voice, call mode, listen buttons, call recording: NOT YET (when podcasting with guides is the active project)
- Skills, plugin installs, the MCP connection, the connect page: NOT YET (when someone asks to use a guide inside their own AI chat)
- Guide requests and the onboarding page: NOT YET (when the thirteen are done and a fourteenth is wanted)
- Distillations, watch pages, how-to articles, library, avatars gallery, design gallery: NOT YET (each needs a visitor who asked for it)
- Personal-context import and the model badge in chat: NOT YET (when a returning user asks for memory)
- Feedback modal, wisdom cards, share buttons: NOT YET (when there are users to share)
- Membership, credits, Stripe: NOT YET (when there is demand to charge for)
- Eve agent packages: NEVER on the site (they are developer artifacts, not something the one user touches)

## The "if it worked" bar

Type a problem, get the right guide, read a cited answer in their voice. Nothing
else on the screen competes with that.

## Blueprint notes (2026-11-15)

Built from the real routes on `main` (33 top-level pages and 17 API groups) and
Adam's direction this week: thirteen hand-picked guides, faces as the star,
life stories on subpages, the ask box on the landing page, timeless and simple.
This pass cut five things from the homepage and eleven product areas from the
visible surface. Nothing was deleted from the codebase; cut pages are unlinked.
The one user is a proposal and needs Adam's yes.
