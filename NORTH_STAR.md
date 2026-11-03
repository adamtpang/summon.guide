# North star, the platonic ideal version of summon.guide

One sentence: chat with a researched, grounded version of any legendary founder for real counsel on your hardest decision, or have their voice read your essay as a shippable 90-120s video voiceover.

## The offer
- Who it's for: founders and operators facing lonely, high-stakes decisions who want mentor-grade counsel on demand, plus creators who want essay-to-voice for video
- What they get: streaming chat with 10 deeply-researched historical founders (Rockefeller, Jobs, Bezos, Musk, Huang, Thiel, Munger, Franklin, Walton, Naval), each grounded in real biography citations, plus a compare mode and a /speak path that turns a script into an MP3 voiceover ready for book.movie
- What it costs (checked 2026-11-03): free while in testing. Production runs `SUMMON_ACCESS_MODE=testing`: Google sign-in, unlimited guide chat, no card, nothing renews. The $10 for 100 messages Stripe link exists but its paywall never appears in testing mode, and the $5/month membership has no checkout on the site. No one can pay today. Turning payment on is an open owner decision.

## What this is NOT (scope guard)
- not a generic chatbot wrapper, every figure is grounded in cited biography knowledge chunks, not free-floating persona prompting
- not a therapy or crisis-counseling product, it is business/life counsel from a historical frame, not clinical support
- not a video generation tool itself, /speak produces voiceover audio; visuals are handed off to book.movie
- not scaling to unlimited figures yet, 10 founders by design until real usage justifies a RAG/vector-search rebuild

## Progress ladder (fact-based, not vibes)
- [x] 0. Core loop works, the actual product function runs end to end for a real user
- [x] 1. Discoverable, sitemap, robots, meta description, verified in Google Search Console
- [x] 2. Tracked, analytics wired in code AND confirmed live (PostHog key confirmed live)
- [x] 3. Instrumented, `checkout_click` (PostHog capture + Vercel track) added to the paywall CTA in `chat/[figure]/page.tsx` and `chat/source/[slug]/page.tsx`, commit `4a77506`, deployed
- [ ] 4. Payable, a stranger can reach a checkout. Not true while production is in testing mode (2026-11-03); the $10 link exists but is unreachable
- [ ] 5. Converted, at least one verified stranger sale

**Progress: 4/6 (67%)**

## Next milestone
Drive real traffic to a chat session and watch for the first `checkout_click` → Stripe conversion, since every mechanical piece (discovery, tracking, funnel event, payable checkout) is now in place and the only remaining gap is a verified stranger sale.
