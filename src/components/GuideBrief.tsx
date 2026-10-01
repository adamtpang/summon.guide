import Link from "next/link";
import AiPersonaNotice from "@/components/AiPersonaNotice";
import GuidePortrait from "@/components/GuidePortrait";
import type { Figure } from "@/lib/figures";
import { guidePath } from "@/lib/guideUrls";
import { getGuideEpisodes } from "@/lib/guideRetrieval";

/**
 * The about page for a guide that has no full biography on file. It shows only
 * what the guide registry and the connected source notes already establish, so
 * nothing biographical is invented to fill the page.
 */
export default function GuideBrief({ figure }: { figure: Figure }) {
  const notes = getGuideEpisodes(figure.slug);
  const facts = [figure.era, figure.location].filter(Boolean).join(" · ");

  return (
    <main className="min-h-screen bg-night text-moon">
      <div className="mx-auto max-w-2xl px-5 pb-24 sm:px-6">
        <header className="flex items-center justify-between py-4">
          <Link href="/" className="inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.32em] text-mist hover:text-moon">summon.guide</Link>
          <Link href="/summon" className="inline-flex min-h-11 items-center text-sm text-mist hover:text-moon">Guides</Link>
        </header>

        <div className="mt-8 flex items-center gap-5 sm:mt-14">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full">
            <GuidePortrait name={figure.name} src={figure.portrait} />
          </div>
          <div className="min-w-0">
            <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">{figure.name}</h1>
            {figure.members ? <p className="mt-2 text-sm text-mist">{figure.members.join(" and ")}</p> : null}
            {facts ? <p className="mt-2 text-xs uppercase tracking-[0.2em] text-dim">{facts}</p> : null}
          </div>
        </div>

        <p className="mt-8 text-lg leading-relaxed">{figure.hook}</p>
        {figure.knownFor ? <p className="mt-3 leading-relaxed text-mist">{figure.knownFor}</p> : null}

        <Link
          href={guidePath(figure.slug)}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-moon px-6 text-sm font-medium text-night transition-colors hover:bg-white"
        >
          Ask {figure.name}
        </Link>

        <div className="mt-10">
          <AiPersonaNotice slug={figure.slug} name={figure.name} />
        </div>

        {figure.accomplishments?.length ? (
          <section className="mt-12">
            <h2 className="font-serif text-2xl">Known for</h2>
            <ul className="mt-4 space-y-2 text-mist">
              {figure.accomplishments.map((item) => (
                <li key={item} className="border-l border-edge pl-4 leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12">
          <h2 className="font-serif text-2xl">What this guide draws on</h2>
          {notes.length ? (
            <>
              <p className="mt-2 text-sm text-mist">
                {notes.length} original {notes.length === 1 ? "summary" : "summaries"} of public sources. Partial coverage, not full books or transcripts.
              </p>
              <ul className="mt-5 divide-y divide-edge border-y border-edge">
                {notes.slice(0, 12).map((note) => (
                  <li key={note.file} className="py-4">
                    {note.youtube ? (
                      <a href={note.youtube} target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-edge underline-offset-4 hover:decoration-moon">
                        {note.title}
                      </a>
                    ) : (
                      <span className="font-medium">{note.title}</span>
                    )}
                    {note.principle ? <p className="mt-1 text-sm leading-relaxed text-mist">{note.principle}</p> : null}
                  </li>
                ))}
              </ul>
              {notes.length > 12 ? <p className="mt-4 text-sm text-dim">And {notes.length - 12} more.</p> : null}
            </>
          ) : (
            <p className="mt-2 text-sm text-mist">No source notes are connected yet, so this guide says so instead of answering from memory.</p>
          )}
        </section>
      </div>
    </main>
  );
}
