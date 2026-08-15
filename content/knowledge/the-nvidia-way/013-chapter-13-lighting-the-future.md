---
title: "Chapter 13: Lighting the Future"
principle: "Nvidia Research, founded in 2006 around a small team including David Luebke, pursued the decade-long, initially uncommercial problem of GPU-based ray tracing, eventually producing real-time ray tracing and DLSS, and institutionalizing long-horizon 'moonshot' research alongside Nvidia's fast product cycles."
tags: [the-nvidia-way, jensen-huang, nvidia, nvidia-research, ray-tracing, dlss, innovation]
---

# Chapter 13: Lighting the Future

> **Key principle:** Realistic lighting was computer graphics' hardest unsolved problem; Nvidia Research, formed in 2006 under David Kirk and David Luebke, spent roughly a decade proving GPUs (not CPUs) could handle ray tracing, and that research arm's willingness to fund open-ended, multi-year bets became a deliberate second track alongside Nvidia's fast release cadence.

*Synthesized from Chapter 13 of The Nvidia Way by Tae Kim.*

## Key lessons

- David Luebke, an academic frustrated that his graphics research kept being outpaced by Nvidia's own product releases, was recruited by chief scientist David Kirk in 2006 to become the first hire of the new Nvidia Research division, with loose guidance to pursue work "important to the company" that the rest of Nvidia wasn't set up to do.
- Conventional wisdom (pushed hard by Intel's research group) held that only CPUs could handle ray tracing's complexity; within six months, Nvidia Research's experiments suggested GPUs could do it faster, and Jensen sat through a full hour-long pitch, pointing the team toward the high-margin professional Quadro market as well as gaming.
- GPU architect Jonah Alben told the research team their ideas were low-cost enough to try, but insisted on evidence, not just "it's obvious," before committing engineering resources: the team spent a year building proof-of-concept demos to earn that buy-in.
- Nvidia acquired ray-tracing start-ups Mental Images and RayScale, and at SIGGRAPH 2008 (two decades after Curtis Priem's original Aviator demo at the same conference) unveiled a GPU-rendered ray-traced car demo that reportedly silenced Intel's ray-tracing research efforts on the spot.
- In 2013, Kirk asked Luebke to make real-time ray tracing "the center of graphics," prompting Luebke's company-wide "moonshot" email asking what a hundredfold efficiency gain in ray tracing would take; a Helsinki-based team nicknamed "the Finns," led by Timo Aila, developed the dedicated ray-tracing cores that shipped in 2018's Turing architecture.
- At SIGGRAPH 2018, dissatisfied with a proposed "deep-learning anti-aliasing" demo, Jensen improvised the idea for what became DLSS on the spot, asking the team to use Tensor Cores to upscale lower-resolution images to save costs, telling them "put them on the slides" just days before the keynote.
- The initial GeForce RTX/Turing launch landed poorly ("we launched ray tracing and DLSS to a thud," said Jeff Fisher) with real frame-rate costs, but Nvidia iterated through DLSS 2.0 (2020, no per-game tuning needed) and a six-year effort toward DLSS 3.0's AI-generated frames under Bryan Catanzaro.
- The chapter frames this as Nvidia consciously avoiding Clayton Christensen's "innovator's dilemma" by running long-horizon research (ray tracing took a decade, DLSS iterations took six years) in parallel with its fast commercial cadence, contrasting it with Google, whose Transformer-paper authors ("Attention Is All You Need") all left the company afterward.

---

*Synthesis only. The full text of this chapter is not redistributed here. Read the book: The Nvidia Way by Tae Kim (W. W. Norton, 2024).*
