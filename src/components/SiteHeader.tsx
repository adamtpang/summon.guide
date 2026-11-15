import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import SummonMark from "@/components/SummonMark";

const NAV = [
  { href: "/summon", label: "Guides" },
  { href: "/council", label: "Council" },
  { href: "/sage", label: "Sage" },
];

/** The one header for every page: mark and name on the left, the three places
 * you can go, and sign in. `current` marks the page you are on. */
export default function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
      <Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label="summon.guide home">
        <SummonMark />
        <span className="hidden font-display text-[15px] tracking-[0.18em] text-moon min-[440px]:inline">SUMMON</span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current === item.href ? "page" : undefined}
            className="inline-flex min-h-11 items-center px-2.5 text-[15px] text-mist underline-offset-8 decoration-gilt decoration-2 hover:text-moon aria-[current=page]:text-moon aria-[current=page]:underline sm:px-3"
          >
            {item.label}
          </Link>
        ))}
        <span className="ml-1 sm:ml-3"><AuthButton /></span>
      </nav>
    </header>
  );
}
