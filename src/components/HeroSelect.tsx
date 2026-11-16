"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

export type Hero = { slug: string; name: string; href: string; portrait?: string; line: string };

// The whole landing page: say what is stuck, or pick a face. Pointing at a
// face puts that guide on the stage; clicking it goes to them. `intro` is the
// headline and the ask box, passed in so it stays server-rendered.
export default function HeroSelect({ heroes, intro }: { heroes: Hero[]; intro: ReactNode }) {
  const [shown, setShown] = useState(() => Math.max(0, heroes.findIndex((h) => h.slug === "franklin")));
  const hero = heroes[shown];

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-8">
      <div className="grid flex-1 items-center gap-x-12 gap-y-10 py-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:py-8">
        <div>{intro}</div>

        <Link href={hero.href} aria-live="polite" className="group relative mx-auto block w-full max-w-[320px]">
          <span className="relative block">
            <span aria-hidden className="absolute -right-3 -top-3 h-full w-full bg-gilt" />
            <span className="relative block aspect-[4/5] overflow-hidden bg-raised">
            {hero.portrait ? (
              <Image
                key={hero.slug}
                src={hero.portrait}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 400px"
                className="hero-enter object-cover grayscale"
              />
            ) : null}
            </span>
          </span>
          <span className="hero-name relative mt-4 block font-display text-moon group-hover:text-lapis">{hero.name}</span>
          <span className="mt-1.5 block font-serif text-lg leading-snug text-mist">{hero.line}</span>
        </Link>
      </div>

      <ul aria-label="The guides" className="flex gap-2 overflow-x-auto pb-6 pt-2 sm:gap-3">
        {heroes.map((h, i) => (
          <li key={h.slug} className="w-[76px] shrink-0 sm:w-auto sm:min-w-0 sm:flex-1">
            <Link
              href={h.href}
              aria-label={`Talk to ${h.name}`}
              onMouseEnter={() => setShown(i)}
              onFocus={() => setShown(i)}
              className="block"
            >
              <span className={`relative block aspect-[4/5] overflow-hidden bg-raised ${i === shown ? "outline outline-[3px] outline-gilt" : ""}`}>
                {h.portrait ? (
                  <Image
                    src={h.portrait}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 76px, 110px"
                    className={`object-cover grayscale transition-opacity duration-200 ${i === shown ? "" : "opacity-70 hover:opacity-100"}`}
                  />
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
