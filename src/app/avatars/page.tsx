import Image from "next/image";
import Link from "next/link";
import { figures } from "@/lib/figures";
import sources from "../../../public/avatars/sources.json";

export const metadata = { title: "Guide avatars | summon.guide", robots: { index: false } };
export default function AvatarsPage() {
  const guides = [{ slug: "sage", name: "Sage", portrait: "/avatars/sage-silhouette-v2.png" }, ...figures];
  return <main className="min-h-screen bg-[#080808] px-6 py-10 text-white">
    <div className="mx-auto max-w-5xl">
      <Link href="/sage" className="inline-flex min-h-11 items-center text-sm text-white/60">← Sage</Link>
      <h1 className="my-8 font-serif text-3xl">Your guides</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {guides.map(guide => <div key={guide.slug} className="text-center">
          <Link href={`/${guide.slug}`} className="group block">
            <div className="relative mx-auto aspect-square w-full max-w-40 overflow-hidden rounded-full bg-white/5">
              {guide.portrait && <Image src={guide.portrait} alt={guide.name} fill sizes="160px" className="object-cover object-top grayscale transition-opacity group-hover:opacity-80" />}
            </div>
            <p className="mt-4 text-sm">{guide.name}</p>
          </Link>
          {sources.find(s => s.slug === guide.slug)?.source && <a href={sources.find(s => s.slug === guide.slug)!.source} className="inline-flex min-h-11 items-center text-xs text-white/50 underline">Portrait source</a>}
        </div>)}
      </div>
    </div>
  </main>;
}
