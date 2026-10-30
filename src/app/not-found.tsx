import Link from "next/link";

export const metadata = { title: "Not found | summon.guide" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-night px-5 text-center text-moon">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">No guide here.</h1>
      <p className="text-sm text-mist">That page does not exist.</p>
      <div className="flex gap-6 text-sm">
        <Link href="/" className="inline-flex min-h-11 items-center text-gold-500 underline underline-offset-4">Ask a question</Link>
        <Link href="/summon" className="inline-flex min-h-11 items-center text-mist underline underline-offset-4 hover:text-moon">See all guides</Link>
      </div>
    </main>
  );
}
