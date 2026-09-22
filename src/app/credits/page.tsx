import Link from "next/link";
export const metadata = { title: "Image credits | summon.guide" };
export default function Credits() {
  return <main className="mx-auto max-w-2xl space-y-8 px-6 py-12"><Link href="/">Back to guides</Link><h1 className="text-3xl">Image credits</h1>
    <section id="rick-rubin"><h2 className="text-xl">Rick Rubin</h2><p>Photo by jasontheexploder. <a href="https://commons.wikimedia.org/wiki/File:RickRubinSept09.jpg">Original and provenance</a>. <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Displayed with a circular crop; no endorsement implied.</p></section>
    <section id="pendleton-ward"><h2 className="text-xl">Pendleton Ward</h2><p>Photo by Al Pavangkanan; cropped version from Wikimedia Commons. <a href="https://commons.wikimedia.org/wiki/File:Pendleton_Ward_at_the_Tomorrow_Show.jpg">Original and provenance</a>. <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>. Displayed with a circular crop; no endorsement implied.</p></section>
    <section id="rose-blumkin"><h2 className="text-xl">Rose Blumkin</h2><p>AI-generated editorial illustration created for Summon. An artistic interpretation, not an archival photograph.</p></section>
  </main>;
}
