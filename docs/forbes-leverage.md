# Forbes Leverage Roster — the richest people on earth, flagged for coverage

The third axis, outcome-first. [`greatest-humans.md`](greatest-humans.md) ranks by fame,
[`most-productive-humans.md`](most-productive-humans.md) ranks by output and method, and
this one ranks by the raw outcome of leverage: **net worth**. Machine-readable source:
[`data/forbes-leverage.json`](../data/forbes-leverage.json). Curated 2026-07-25.

The leverage *mechanism* is Naval's framework (capital, labor, code, media), and Naval is
already guide `naval-ravikant`. This roster is the scoreboard that framework produces.

**Snapshot:** the table is the **Forbes World's Billionaires 2026** annual list (March 10
2026). Note the annual and real-time trackers disagree because they are different moments:
as of the Forbes real-time tracker on July 1 2026, Musk had crossed ~$1.05T and Michael
Dell surged to ~$235B (real-time #5), reshuffling ranks 2 to 13. The annual snapshot below
is the stable, internally consistent, citable ranking.

## Top 25 by net worth

Coverage legend: ✅ already a guide · 🟡 founder or partner is a guide · gap = not covered.

| # | Person | Net worth | Country | Company | Origin | Guide coverage |
|---|--------|-----------|---------|---------|--------|----------------|
| 1 | **Elon Musk** | $839B | United States | Tesla, SpaceX, xAI | self-made | ✅ elon |
| 2 | **Larry Page** | $257B | United States | Alphabet (Google) | self-made | gap |
| 3 | **Sergey Brin** | $237B | United States | Alphabet (Google) | self-made | gap |
| 4 | **Jeff Bezos** | $224B | United States | Amazon | self-made | ✅ jeff-bezos |
| 5 | **Mark Zuckerberg** | $222B | United States | Meta Platforms | self-made | gap |
| 6 | **Larry Ellison** | $190B | United States | Oracle | self-made | gap |
| 7 | **Bernard Arnault & family** | $171B | France | LVMH | self-made | gap |
| 8 | **Jensen Huang** | $154B | United States | Nvidia | self-made | ✅ jensen-huang |
| 9 | **Warren Buffett** | $149B | United States | Berkshire Hathaway | self-made | 🟡 partner (munger) |
| 10 | **Amancio Ortega** | $148B | Spain | Inditex (Zara) | self-made | gap |
| 11 | **Rob Walton & family** | $146B | United States | Walmart | heir | 🟡 via sam-walton |
| 12 | **Jim Walton & family** | $143B | United States | Walmart | heir | 🟡 via sam-walton |
| 13 | **Michael Dell** | $141B | United States | Dell Technologies | self-made | gap |
| 14 | **Alice Walton** | $134B | United States | Walmart | heir | 🟡 via sam-walton |
| 15 | **Steve Ballmer** | $126B | United States | Microsoft | self-made | gap |
| 16 | **Carlos Slim Helu & family** | $125B | Mexico | America Movil | self-made | gap |
| 17 | **Changpeng Zhao (CZ)** | $110B | Canada | Binance | self-made | gap |
| 18 | **Michael Bloomberg** | $109B | United States | Bloomberg LP | self-made | gap |
| 19 | **Bill Gates** | $108B | United States | Microsoft | self-made | gap |
| 20 | **Francoise Bettencourt Meyers & family** | $100B | France | L'Oreal | heir | gap |
| 21 | **Mukesh Ambani** | $99.7B | India | Reliance Industries | heir-built | gap |
| 22 | **Giancarlo Devasini** | $89.3B | Italy | Tether | self-made | gap |
| 23 | **Thomas Peterffy** | $82.9B | United States | Interactive Brokers | self-made | gap |
| 24 | **Julia Koch & family** | $81.2B | United States | Koch Industries | heir | gap |
| 25 | **Charles Koch & family** | $73.8B | United States | Koch Industries | heir-built | gap |

## Coverage

Of the top 25, you already have **3 as guides** (Musk #1, Bezos #4, Huang #8), **3 more
covered through the founder** (the Walton family via `sam-walton`), and **Buffett's partner
Munger** but not Buffett himself. That leaves **15 self-made gaps**, which is the real
onboarding pool. The heirs (Waltons, Bettencourt Meyers, Kochs) teach little about *building*
leverage and are low priority regardless of rank.

## Onboarding shortlist

Self-made gaps ranked by how much they would actually teach, not by net worth. Page, Brin,
Ortega, and Devasini are enormous but famously private with thin corpus, so they rank down.

1. **Warren Buffett** (#9) — the glaring one. You have the sidekick, not the principal. Free
   shareholder letters, the Rockefeller-letters pattern you already use. Track: historical.
2. **Bill Gates** (#19) — the code-leverage archetype, then the largest philanthropy lever.
   Deep corpus, youchop-able. Track: modern.
3. **Mark Zuckerberg** (#5) — network-effect and founder-control playbook. Landmines noted.
4. **Bernard Arnault** (#7) — the only non-tech lever near the top. Brand and luxury roll-up,
   diversifies a roster that is otherwise all tech and finance.
5. **Michael Dell** (#13) — the direct-model build-from-a-dorm story, two books of his own.
6. **Michael Bloomberg** (#18) — data terminal plus media leverage, has a memoir.

## The three rosters together

| Axis | Doc | Ranks by | Top name |
|------|-----|----------|----------|
| Fame | [greatest-humans.md](greatest-humans.md) | Pantheon HPI | Muhammad |
| Productivity | [most-productive-humans.md](most-productive-humans.md) | output + daily method | Asimov |
| Leverage | this doc | net worth | Musk |

Each `people` entry in the JSON carries `leverageForm`, `wealthOrigin`, `guideStatus`,
`corpusTrack`, and a `skillIdea` for the gaps worth onboarding, so it feeds the existing
guide-onboarding pipeline directly.

## Sources

- [Forbes: The Top Ten Richest People In The World (July 2026)](https://www.forbes.com/sites/forbeswealthteam/article/the-top-ten-richest-people-in-the-world/)
- [Forbes World's Billionaires List 2026: The Top 200](https://www.forbes.com/sites/chasewithorn/2026/03/10/forbes-worlds-billionaires-list-2026-the-top-200/)
