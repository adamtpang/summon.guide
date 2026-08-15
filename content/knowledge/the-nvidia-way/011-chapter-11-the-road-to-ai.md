---
title: "Chapter 11: The Road to AI"
principle: "The 2012 AlexNet breakthrough, built on GPUs Bill Dally and Bryan Catanzaro had already been adapting for deep learning, convinced Jensen to redirect the entire company toward AI years before the broader industry noticed, reshaping Volta's chip design late in development to add Tensor Cores."
tags: [the-nvidia-way, jensen-huang, nvidia, deep-learning, alexnet, bill-dally, tensor-cores]
---

# Chapter 11: The Road to AI

> **Key principle:** A six-year courtship brought Stanford's Bill Dally to Nvidia as chief scientist; his work with Andrew Ng and Bryan Catanzaro proved GPUs could replace thousands of CPUs for deep learning, and the 2012 AlexNet win at the ImageNet competition, trained on ordinary consumer GPUs, convinced Jensen to declare AI the company's top priority and re-architect the in-progress Volta chip to include dedicated Tensor Cores.

*Synthesized from Chapter 11 of The Nvidia Way by Tae Kim.*

## Key lessons

- Chief scientist David Kirk spent roughly six years recruiting Stanford professor Bill Dally, a parallel-computing pioneer whose PhD committee included Richard Feynman, to become his successor; Dally joined Nvidia full-time in 2009 after a sabbatical.
- At the Nvision 08 conference, Mythbusters hosts Jamie Hyneman and Adam Savage staged a live demo contrasting a CPU (a paintball-gun robot painting a slow, sequential smiley face) with a GPU (11,000 paintball tubes firing simultaneously to splatter a full Mona Lisa in under a tenth of a second), illustrating parallel versus sequential computation for a public audience.
- Dally reconnected with former Stanford colleague Andrew Ng, who had used a 2,000-CPU cluster at Google Brain to train a deep-learning network that learned to recognize cats from 10 million YouTube stills without supervision. Dally's insight, "I bet GPUs would be much better at doing that," led him to assign Bryan Catanzaro to the problem.
- Catanzaro's CUDA-based routines let Ng's team replace roughly 2,000 CPUs with about 12 Nvidia GPUs for equivalent deep-learning throughput, work Dally later called part of "the spark that ignited the AI revolution"; this also marked Catanzaro's first direct contact with Jensen, who began emailing him detailed questions about deep learning.
- At the 2012 ImageNet Large Scale Visual Recognition Challenge, University of Toronto researchers Geoffrey Hinton, Ilya Sutskever, and Alex Krizhevsky entered "AlexNet," trained on ordinary consumer GPUs; where prior entrants had never broken 75% accuracy, AlexNet hit nearly 85%, a result Catanzaro described as fundamentally "a systems paper" about accelerated computing rather than a new algorithm.
- Despite internal skepticism from some executives who saw deep learning as a fad, Jensen declared at a 2013 executive meeting, "Deep learning is going to be really big. We should go all in on it," and used the company's "one team" philosophy to rapidly reallocate engineers toward AI.
- Catanzaro's optimization work became cuDNN (CUDA Deep Neural Network library), Nvidia's first AI-specific software library; separately, Dally added FP16 (16-bit) math support across GPUs in 2016 since deep-learning models didn't need the 32-bit or 64-bit precision built for scientific computing.
- With Jensen's push, Dally's team added an entirely new processor type, the Tensor Core, to the already-in-development Volta architecture just months before its tape-out deadline, an unusually late and costly design change; a Volta GPU with Tensor Cores could train models roughly three times faster than the same chip using standard CUDA cores.
- The chapter closes by tracing how the AlexNet-era researchers, Hinton and Fei-Fei Li to Google, Ng to Baidu, Sutskever to cofound OpenAI, all carried forward their reliance on Nvidia GPUs, cementing Nvidia's position as AI moved from academic labs into commercial and start-up use.

---

*Synthesis only. The full text of this chapter is not redistributed here. Read the book: The Nvidia Way by Tae Kim (W. W. Norton, 2024).*
