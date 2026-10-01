import Link from "next/link";

export default function ConnectPage() {
  return <main className="min-h-screen bg-slate-950 text-white"><div className="max-w-2xl mx-auto px-6 py-10 md:py-20">
    <header className="flex justify-between items-center mb-20"><Link href="/" className="text-white/60 text-xs tracking-[.25em] uppercase">summon.guide</Link><Link href="/summon" className="text-sm text-white/60">Guides</Link></header>
    <p className="text-blue-300 mb-5 text-3xl" aria-hidden="true">🧙</p>
    <h1 className="font-serif text-4xl md:text-6xl mb-5">Your guides. Any chat.</h1>
    <p className="text-white/60 text-lg leading-relaxed mb-10">Install once in Codex or Claude Code. Summon the right perspective without leaving your conversation.</p>
    <section className="rounded-2xl border border-white/10 bg-white/[.03] p-6 space-y-5">
      <h2 className="text-sm text-white/60">1. Install in your terminal</h2>
      <code className="block rounded-lg bg-black/30 p-4 text-sm text-blue-200 break-words">npx --yes github:adamtpang/summon.guide summon install summon-guide --global</code>
      <h2 className="text-sm text-white/60">2. Start a new chat and ask</h2>
      <p className="font-mono text-lg">Use summon-guide to help me with this.</p>
      <p className="text-xs text-white/45">No Summon account, API key, or MCP setup. Your existing AI supplies the reasoning.</p>
    </section>
    <p className="text-white/50 text-sm leading-relaxed mt-6">Your AI matches the situation to live guides, reads their source notes, and brings cited advice here. Personal context stays in your chat; only general topic queries go to Summon.</p>
    <details className="mt-12 border-t border-white/10 pt-5 text-sm"><summary className="cursor-pointer text-white/50">Advanced · Connect through MCP</summary><div className="mt-5 space-y-4 text-white/60"><p>For compatible clients that use remote tools, connect this endpoint and sign in. Server-generated advice follows your Summon access and allowance.</p><code className="block rounded-lg bg-white/5 p-4 text-blue-200 break-all">https://summon.guide/api/mcp</code><p>The skill above works independently of this connection.</p></div></details>
    <p className="mt-12 text-xs text-white/30">AI perspectives inspired by public work. Source coverage varies; newly researched guides are provisional.</p>
  </div></main>;
}
