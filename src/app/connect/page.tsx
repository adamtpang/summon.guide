import Link from "next/link";
import { auth } from "@/auth";
import { getMembership, SUMMON_ACCESS_MODE, SUMMON_MEMBERSHIP_PRICE, SUMMON_MONTHLY_SESSION_LIMIT } from "@/lib/membership";

const mcpUrl = "https://summon.guide/api/mcp";

export default async function ConnectPage() {
  const session = await auth();
  const membership = session?.user?.id ? await getMembership(session.user.id) : null;
  const testing = SUMMON_ACCESS_MODE === "testing";
  const active = testing || (membership?.membershipStatus === "ACTIVE" && (!membership.membershipRenewsAt || membership.membershipRenewsAt > new Date()));
  const remaining = membership ? Math.max(0, membership.membershipSessionLimit - membership.membershipSessionsUsed) : 0;
  const checkoutUrl = process.env.STRIPE_SUMMON_MEMBERSHIP_LINK;
  return <main className="min-h-screen bg-slate-950 text-white"><div className="max-w-3xl mx-auto px-6 py-10 md:py-16">
    <header className="flex justify-between items-center mb-14"><Link href="/" className="text-white/60 text-xs tracking-[.28em] uppercase hover:text-white">summon.guide</Link><Link href="/summon" className="text-sm text-white/70 hover:text-white">Guide packs</Link></header>
    <p className="text-emerald-400 text-xs tracking-[.22em] uppercase mb-4">Your AI, upgraded</p>
    <h1 className="font-serif text-4xl md:text-6xl leading-none mb-5">Connect your council.</h1>
    <p className="text-white/65 text-lg leading-relaxed max-w-2xl mb-10">Summon gives your existing AI access to source-backed specialist guidance. Ask Claude, ChatGPT, or Codex to summon the right perspective when a normal answer is not enough.</p>
    <section className="rounded-2xl border border-white/10 bg-white/[.05] p-6 mb-8"><div className="flex flex-wrap justify-between gap-4"><div><p className="text-white font-medium">{testing ? "Summon testing access" : "Summon Member"}</p><p className="text-white/60 text-sm mt-1">{testing ? "Free while we test the guide experience." : `${SUMMON_MEMBERSHIP_PRICE}. ${SUMMON_MONTHLY_SESSION_LIMIT} guided decision sessions every month.`}</p></div><span className={`rounded-full px-3 py-1 text-xs h-fit ${active ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/60"}`}>{testing ? "Free testing access" : active ? `${remaining} sessions remaining` : "Membership required"}</span></div>
    {testing ? <p className="text-emerald-300 text-sm mt-5">Sign in with Google to test every guide. No payment is required right now.</p> : active ? <p className="text-emerald-300 text-sm mt-5">Your connection authorizes automatically when a supported client opens Summon.</p> : checkoutUrl ? <a href={checkoutUrl} className="inline-block mt-5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-medium px-4 py-2.5">Become a member</a> : <p className="text-amber-200 text-sm mt-5">Checkout is being prepared. Sign in now and this page will unlock as soon as membership opens.</p>}</section>
    <section className="grid gap-4"><ConnectCard title="Claude" detail="In Claude Settings → Connectors, add Summon. Claude opens a secure Summon sign-in and returns connected." url={mcpUrl} /><ConnectCard title="ChatGPT" detail="On supported ChatGPT plans, add a custom MCP app in Settings → Apps using this secure remote endpoint." url={mcpUrl} /><ConnectCard title="Codex / Claude Code" detail="Install the project adapter. It writes the project-local skill and MCP configuration, then opens the same Summon authorization flow." command="npx --yes github:adamtpang/summon.guide summon install elon" /></section>
    <p className="text-white/40 text-xs leading-relaxed mt-10">Guides are educational AI systems inspired by documented public material, not the people themselves. Summon never provides individualized financial, legal, medical, or investment advice.</p>
  </div></main>;
}

function ConnectCard({ title, detail, url, command }: { title: string; detail: string; url?: string; command?: string }) { return <article className="border border-white/10 rounded-xl p-5 bg-black/20"><h2 className="font-serif text-xl mb-1">{title}</h2><p className="text-white/60 text-sm leading-relaxed mb-4">{detail}</p>{url ? <code className="block text-emerald-300 bg-black/30 rounded-md p-3 text-xs overflow-x-auto">{url}</code> : <code className="block text-emerald-300 bg-black/30 rounded-md p-3 text-xs overflow-x-auto">{command}</code>}</article>; }
