---
title: "Chapter 2: Bitcoin and Cryptohistory"
principle: "Blockchains can record history in a way that is hard to falsify, producing a cryptographically verifiable ledger of record."
tags: [the-network-state, bitcoin, cryptohistory, blockchain, proof-of-existence]
---

# Chapter 2: Bitcoin and Cryptohistory

> **Key principle:** Silos, bots, censors and fakes corrupt digital history; Bitcoin and its generalizations offer a history that is technically and economically resistant to revision.

*Synthesized from Chapter 2 of The Network State by Balaji Srinivasan.*

## Key lessons

- Four problems of digital macrohistory: logs are siloed on corporate servers, unsigned posts may come from bots, inconvenient history can be deleted under pressure, and AI makes realistic fakes cheap.
- Bitcoin records the who, what and when of every transaction since 2009. To falsify the who you need to forge a signature, the what a hash, the when a timestamp, all while keeping linked block headers consistent. He calls it a timechain because proof-of-work and difficulty adjustment give regular block times.
- He says rewriting it would require something like a quantum breakthrough, a code bug or a very expensive 51 percent attack, and even then it could be backed up to a new protocol. He does not claim Bitcoin is infallible, only that it is the best tool yet for recording history, and speculates that future people might date years After Satoshi.
- Proof-of-existence: hash an arbitrarily large dataset into a Merkle root and write it to Bitcoin via OP_RETURN. A future observer can confirm a signature put a given hash on chain at a given time, using the Stalin photo example of anticipated airbrushing.
- Other chains can be backed up periodically to Bitcoin (a subchain model), which he suggests could give them irreversibility and help with weak subjectivity, though he notes some Bitcoin maximalists dislike this use.
- Bitcoin is a tweener on privacy: public data is partly deanonymized by firms like Chainalysis. Zero-knowledge tools, smart contract chains, on-chain social networks, name services, incorporation systems, new proofs (solvency, location) and non-transferable credentials extend what can be recorded privately yet verifiably.
- Cryptohistory is cryptographically verifiable macrohistory: everything billions choose to make public, signed, timestamped and hashed. He calls the combined microhistory and macrohistory the ledger of record and says it is foundational to the network state.
- It can be used for good or ill: decentralized, it resists Stalinist rewriting; centralized and stripped of cryptographic checks, it becomes NSA or China-style lifelong surveillance, like a CBDC compared to Bitcoin.

---

*Synthesis only. The full text of this chapter is not redistributed here. Read the book: The Network State by Balaji Srinivasan, https://thenetworkstate.com.*
