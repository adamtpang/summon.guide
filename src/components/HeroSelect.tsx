"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

export type Hero = {
  slug: string;
  name: string;
  href: string;
  aboutHref: string;
  portrait?: string;
  era: string;
  location: string;
  title: string;
  line: string;
  askAbout: string[];
  quote?: string;
};

// The landing page's signature: a character-select screen for real people.
// The roster runs along the bottom; whoever you pick takes the stage, large
// and in color, with an encyclopedia-style fact box. `intro` is the left
// column (headline and the ask box), passed in so it stays server-rendered.
export default function HeroSelect({ heroes, intro }: { heroes: Hero[]; intro: ReactNode }) {
  const [selected, setSelected] = useState(() => Math.max(0, heroes.findIndex((h) => h.slug === "franklin")));
  const hero = heroes[selected];
  const first = hero.name.split(" ")[0];

  return (
    <section className="relative overflow-hidden border-b border-edge">
      <Image
        src="/scenes/temple.webp"
        alt=""
        aria-hidden
        width={2400}
        height={1636}
        priority
        sizes="100vw"
        className="pointer-events-none absolute -right-[10%] top-0 h-full w-[85%] select-none object-cover object-[60%_60%] opacity-40 mix-blend-multiply"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-x-10 gap-y-12 px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pt-14">
        <div className="lg:pt-6">{intro}</div>

        <div aria-live="polite" className="relative flex min-h-[420px] items-end gap-5 sm:min-h-[500px] sm:gap-8">
          <div className="relative z-10 min-w-0 flex-1 pb-2">
            <p className="text-base text-gilt-ink">{hero.title}</p>
            <h2 className="hero-name mt-1 font-display text-moon">{hero.name}</h2>
            <p className="mt-3 max-w-sm font-serif text-lg leading-snug text-mist">{hero.line}.</p>

            <dl className="mt-5 max-w-sm border border-edge bg-night/90 text-sm">
              <Fact label="Lived" value={hero.era} />
              <Fact label="From" value={hero.location} />
              <Fact label="Ask about" value={hero.askAbout.join(", ")} />
            </dl>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href={hero.href}
                className="inline-flex min-h-11 items-center bg-lapis px-5 text-base font-semibold text-white transition-colors hover:bg-lapis-deep active:translate-y-px"
              >
                Talk to {first}
              </Link>
              <Link href={hero.aboutHref} className="inline-flex min-h-11 items-center text-base text-lapis underline underline-offset-4 hover:text-lapis-deep">
                Read the life story
              </Link>
            </div>
          </div>

          <div className="relative w-[42%] max-w-[330px] shrink-0 self-end">
            <span aria-hidden className="absolute -right-3 -top-3 h-full w-full bg-gilt" />
            <span className="relative block aspect-[3/4] overflow-hidden bg-raised">
              {hero.portrait ? (
                <Image
                  key={hero.slug}
                  src={hero.portrait}
                  alt={`Portrait of ${hero.name}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 42vw, 330px"
                  className="hero-enter object-cover object-top"
                />
              ) : null}
            </span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-edge bg-night">
        <div className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-8">
          <p id="roster-label" className="mb-3 text-sm text-dim">
            Choose your guide. {heroes.length} of the greatest humans who ever lived, each an AI guide built from their own public work.
          </p>
          <ul aria-labelledby="roster-label" className="flex gap-2 overflow-x-auto pb-2 pt-2 sm:gap-3">
            {heroes.map((h, i) => {
              const active = i === selected;
              return (
                <li key={h.slug} className="w-[84px] shrink-0 sm:w-auto sm:min-w-0 sm:flex-1">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(i)}
                    onDoubleClick={() => { window.location.href = h.href; }}
                    className={`group block w-full text-left transition-transform duration-200 ${active ? "-translate-y-1.5" : "hover:-translate-y-0.5"}`}
                  >
                    <span className={`relative block aspect-[4/5] overflow-hidden bg-raised ${active ? "outline outline-[3px] outline-offset-0 outline-gilt" : "outline outline-1 outline-edge"}`}>
                      {h.portrait ? (
                        <Image
                          src={h.portrait}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 84px, 110px"
                          className={`object-cover object-top transition-[filter] duration-200 ${active ? "" : "saturate-[0.35] group-hover:saturate-100"}`}
                        />
                      ) : null}
                    </span>
                    <span className={`mt-1.5 block truncate text-sm ${active ? "font-semibold text-moon" : "text-mist"}`}>{h.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 border-b border-edge px-3 py-2 last:border-b-0">
      <dt className="w-20 shrink-0 font-semibold text-moon">{label}</dt>
      <dd className="min-w-0 text-mist">{value}</dd>
    </div>
  );
}
