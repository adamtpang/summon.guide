---
title: "Chapter 8: The Era of the GPU"
principle: "Jensen bet Nvidia's margins and stock price on CUDA, forcing general-purpose GPU computing onto every chip the company shipped, then built academic, scientific, and enterprise ecosystems from scratch until CUDA became an unassailable network moat."
tags: [the-nvidia-way, jensen-huang, nvidia, cuda, gpgpu, moat]
---

# Chapter 8: The Era of the GPU

> **Key principle:** Rather than launch CUDA only on high-end workstation cards, Jensen insisted on making every GPU, including cheap consumer GeForce cards, CUDA-compatible, sacrificing gross margin and investor patience for years so that GPU computing would become synonymous with Nvidia. The resulting ecosystem of developers, academic programs, and software libraries became the company's real competitive moat.

*Synthesized from Chapter 8 of The Nvidia Way by Tae Kim.*

## Key lessons

- Researcher Mark Harris coined the term "GPGPU" (general-purpose computing on GPUs) around 2002 after seeing scientists hack Nvidia's GeForce 3 shader hardware to run matrix-multiplication workloads; Nvidia later hired him, and the term stuck internally.
- Engineers Ian Buck and John Nickolls built CUDA as a C-based programming model for a secret chip project code-named NV50, which became the G80. Nickolls, credited by Jensen as the person "without [whom] there'd be no CUDA," died of cancer in 2011 before seeing the technology's full success.
- Jensen chose to launch CUDA across Nvidia's entire GeForce gaming lineup instead of restricting it to professional Quadro cards, reasoning that market saturation would make CUDA a standard faster. The G80 chip cost roughly $475 million to develop (about a third of four years' R&D budget) and dragged gross margin from 45.6% (FY2008) down to 35.4% (FY2010), coinciding with an 80%+ stock decline during the 2007-2008 financial crisis.
- At an investor lunch, analyst Daniel Ernst asked Jensen an offhand question about Photoshop slowing down on high-resolution photos; Jensen's answer, previewing an unreleased CUDA-accelerated Adobe partnership, became the moment he articulated his "Era of the GPU" vision to a skeptical Wall Street.
- David Kirk built academic adoption by donating hardware instead of cash to universities (to dodge administrative overhead fees) and personally pitched over 100 CUDA talks with no takers until partnering with Professor Wen-mei Hwu at the University of Illinois in 2007; their textbook, Programming Massively Parallel Processors (2010), sold tens of thousands of copies and became a standard text.
- Professor Ross Walker adapted the molecular-simulation program AMBER to run on cheap consumer GeForce cards instead of costly supercomputers, delivering a 50x speedup in 2009 and "democratizing" computational chemistry; Nvidia later pushed back, citing error-correction concerns, and restricted bulk GeForce purchases to steer researchers toward pricier Tesla cards, a tension Walker publicly criticized.
- Jensen pushed an aggressive, non-discounting sales culture ("Green Berets," "CEO of your accounts") and personally intervened in enterprise deals, once telling salesman Derik Moore after a successful HP indemnification negotiation that his real failure was not warning Jensen about the ask in advance: "Nobody likes surprises."
- By the chapter's telling, CUDA's scale, more than 5 million developers, 600 AI models, 300 software libraries, roughly 500 million CUDA-capable GPUs in the market, made switching to rival chips prohibitively costly for AI developers, cementing Nvidia's position years before the AI boom.

---

*Synthesis only. The full text of this chapter is not redistributed here. Read the book: The Nvidia Way by Tae Kim (W. W. Norton, 2024).*
