---
rank: 14
title: "The Two Harvard Dropouts Who raised $800M to take on NVIDIA"
subject: "Gavin Uberti and Robert Wachen"
topic: "Etched, the $800M bet on purpose-built AI chips to challenge Nvidia"
youtube_url: "https://www.youtube.com/watch?v=BagWrgPww1o"
youtube_id: "BagWrgPww1o"
published: "2026-06-30"
duration_min: 93
word_count: 20027
views: 57565
date_extracted: "2026-08-19"
principle: "When an entire industry's technical constraints were fixed decades before the workload you actually care about existed, the fastest way to win is not to out-execute incumbents on their roadmap but to question every inherited assumption from scratch and build for the workload that exists today, funding that rebuild with a willingness to spend aggressively ahead of proof."
tags: [invest-like-the-best, etched, ai-chips, semiconductors, fundraising, hardware-startups]
---

# The Two Harvard Dropouts Who raised $800M to take on NVIDIA

> **Key principle:** Etched's founders, Gavin Uberti and Robert Wachen, built an inference-only AI chip company by refusing to inherit any assumption baked into general-purpose chip design (voltage limits, interconnect latency, thermal ceilings) and instead re-deriving each constraint from the actual physics of the workload. That approach only worked because they paired it with extreme capital intensity, near-total vertical integration, and a recruiting strategy built around finding the single best person in the world for each unsolved problem rather than a large team of generalists.

*Gavin Uberti and Robert Wachen on building Etched, Invest Like the Best · [watch](https://www.youtube.com/watch?v=BagWrgPww1o) · 93 min · published 2026-06-30.*

## Key lessons

- Etched's core technical bet is "low voltage inference": because power rises with the square of voltage (Dennard scaling), and general-purpose chip tooling defaults to conservative voltage/thermal corners meant for freezing-temperature edge devices, Etched found it could run its inference chip at under half the voltage of any other AI chip once it stopped assuming GPU-style voltage floors were physical law, comparing the insight to Bitcoin miners already running at roughly a quarter of GPU voltage.
- The second core bet is "cluster scale memory": on Nvidia Blackwell-class systems, chip-to-chip hops run around 4,000 nanoseconds, which caps how much an 8x scale-up cluster actually improves per-user token speed; Etched built a fully custom interconnect stack above the second layer of Ethernet to cut that latency by more than 5x, treating the entire cluster's memory as one pool rather than optimizing bandwidth chip by chip.
- Money was existentially close to running out before the Series A: with roughly $15 million in the bank, the founders estimated they needed about $100 million for the next twelve months (physical design alone required a $40-50 million vendor commitment), got passed on by nearly every major Silicon Valley investor after presenting a 30-page technical memo, and only closed the round after weeks of "survival mode" calls that built a spreadsheet of soft commitments up to roughly $103 million.
- To get from an unfunded idea to a taped-out chip on a near-zero budget, the founders planned to eat ramen and spend down to about $30 million (mostly the cost of an 11nm mask set), then used a debt provider willing to lend against that plan, a bridge they describe as the "ramen to a chip" threshold.
- Etched achieved 40-day silicon-to-rack-inference turnaround versus a competitor's publicly announced 10 months by "pre-fetching" everything that didn't require the physical chip: building out the full software stack early, shipping racks to customer data centers without chips installed, running full inference workloads across more than 700 FPGAs emulating the chip, and building thermal-mimic chips to validate cold plates before real silicon existed.
- A late-stage bring-up bug required aligning two clock signals across a clock-domain crossing to within 50 picoseconds, two billion times per second on every chip; some engineers called it unsolvable and quit, but the team found a fix using a deliberate clock-phase drift mechanism, solving it in about two weeks of what they call "a dark two weeks."
- Etched's talent strategy is explicitly bimodal: "legends" (the single best person in the world at a specific unsolved problem, sourced via project-based recruiting that maps history's hardest technical problems back to who actually solved them, tracked through as many as 20 follow-up conversations) paired with young, first-principles-driven engineers who "don't know where the bodies are buried" and take risks the legends wouldn't have considered; they recruited Brian, who built Nvidia's HGX/DGX rack systems (a majority of Nvidia's revenue), as an example of a legend hire.
- The company deliberately narrowed its product bet early: it rejected building an arbitrary graph compiler or supporting arbitrary PyTorch/CUDA/ONNX graphs, betting instead that under 100 models would ultimately matter and that hand-optimized, kernels-first performance for those would beat general-purpose flexibility; high-frequency trading engineers, who also distrust compilers and hand-write their own kernels, became an unexpectedly strong recruiting pool because they recognized the philosophy.

---

*Synthesis only. The full verbatim transcript of this episode is not redistributed here; it lives with the original show. Watch the source: https://www.youtube.com/watch?v=BagWrgPww1o.*
