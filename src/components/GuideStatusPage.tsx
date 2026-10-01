import Link from "next/link";
import type { GuideAgent } from "@/lib/guideAgents";

/**
 * The page for a registered guide that has no conversation runtime yet:
 * either still being onboarded (no corpus, no persona) or shipped as an
 * installable framework pack rather than a chat persona. It states that
 * plainly instead of returning a 404 or improvising an ungrounded voice.
 */
export function GuideStatusPage({ agent }: { agent: GuideAgent }) {
  const isPack = agent.runtime.kind === "pack";
  const packSlug = agent.runtime.kind === "pack" ? agent.runtime.packSlug : agent.slug;
  const kicker = isPack ? "Framework pack" : "Guide in onboarding";
  const sources = agent.sourceSlugs.length ? agent.sourceSlugs : [];

  return (
    <main className="min-h-screen bg-night text-moon">
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <Link href="/summon" className="text-sm text-dim transition-colors hover:text-moon">
          ← All guides
        </Link>

        <header className="mt-12 border-b border-edge pb-9">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-500">{kicker}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.02] sm:text-6xl">{agent.name}</h1>
          {agent.byline ? <p className="mt-4 text-lg leading-8 text-mist">{agent.byline}</p> : null}
        </header>

        <section className="mt-9 space-y-5 text-base leading-7">
          <p>{agent.description}</p>

          {isPack ? (
            <>
              <p>
                {agent.name} ships as an installable framework for Claude Code and Codex, not as a chat persona. Nothing
                here speaks as the real person; the pack carries a public, source-anchored operating system you can run in
                your own projects.
              </p>
              <pre className="overflow-x-auto rounded-md border border-edge bg-white/[0.04] px-4 py-3 text-sm">
                <code>{`npx --yes github:adamtpang/summon.guide summon install ${packSlug}`}</code>
              </pre>
              <p className="text-mist">
                A grounded conversation opens here once a rights-cleared corpus for this guide has been synthesized.
              </p>
            </>
          ) : (
            <>
              <p>
                {agent.name} is registered but not live. There is no rights-cleared corpus and no grounded persona yet, so
                there is no conversation to open. Summon does not improvise a guide from general knowledge; it waits for
                the eight onboarding gates to pass.
              </p>
              <p>
                <Link href="/onboarding" className="underline underline-offset-4 hover:text-gold-500">
                  See the onboarding gates and current status
                </Link>
              </p>
            </>
          )}

          <div className="rounded-md border border-edge bg-white/[0.04] px-4 py-4 text-sm">
            <p className="font-medium">Registered sources</p>
            {sources.length ? (
              <ul className="mt-2 list-disc pl-5 text-mist">
                {sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-mist">None registered yet.</p>
            )}
          </div>

          <p className="text-sm text-mist">
            Summon guides are AI guides grounded in documented public work. They are not the real people, carry no private
            memories, and imply no endorsement.
          </p>

          <p className="text-sm">
            <Link href="/summon#request-guide" className="underline underline-offset-4 hover:text-gold-500">
              Request or follow this guide
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
