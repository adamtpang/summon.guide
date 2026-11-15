import Image from "next/image";
import Link from "next/link";
import type { Biography, BioImage } from "@/lib/biographies";

// The long-form life of a curated guide: chapters with period images, exact
// quotations with their source, a timeline, and a plain note on what the guide
// can and cannot draw on when you talk to it.
export default function LifeStory({
  biography,
  name,
  slug,
  accent,
}: {
  biography: Biography;
  name: string;
  slug: string;
  accent: string;
}) {
  const first = name.split(" ")[0];
  return (
    <>
      <p className="text-moon text-lg md:text-xl font-serif leading-[1.65]">{biography.lede}</p>

      {biography.chapters.map((chapter, index) => (
        <section key={chapter.id} id={chapter.id} className="scroll-mt-8">
          <p className="mb-1 text-[15px] text-dim">{chapter.years}</p>
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-moon mb-5 pb-3 border-b border-edge">
            {chapter.title}
          </h2>
          {chapter.image ? <Plate image={chapter.image} side={index % 2 === 0 ? "right" : "left"} /> : null}
          <div className="space-y-5">
            {chapter.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-moon/85 text-base md:text-[17px] leading-[1.75]">
                {paragraph}
              </p>
            ))}
          </div>
          {chapter.quote ? (
            <blockquote className="clear-both mt-7 border-l-2 pl-5 py-1" style={{ borderColor: accent }}>
              <p className="text-moon text-lg md:text-xl font-serif italic leading-relaxed">
                &ldquo;{chapter.quote.text}&rdquo;
              </p>
              <footer className="text-dim text-xs mt-2 not-italic">{chapter.quote.source}</footer>
            </blockquote>
          ) : null}
          <div className="clear-both" />
        </section>
      ))}

      <section id="timeline" className="scroll-mt-8">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-moon mb-5 pb-3 border-b border-edge">
          Timeline
        </h2>
        <ol className="border-l border-edge ml-2">
          {biography.timeline.map((entry, i) => (
            <li key={i} className="relative pl-6 pb-4 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[5px] top-[9px] h-[9px] w-[9px] rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span className="text-moon font-serif font-medium mr-3 tabular-nums">{entry.year}</span>
              <span className="text-moon/85 text-base leading-relaxed">{entry.event}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="library" className="scroll-mt-8">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-moon mb-5 pb-3 border-b border-edge">
          What this guide draws on
        </h2>
        <p className="text-moon/85 text-base md:text-[17px] leading-[1.75] mb-6">{biography.library}</p>
        <Link
          href={`/${slug}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-[2px] bg-lapis px-6 text-[15px] font-medium text-night transition-colors hover:bg-lapis-deep"
        >
          Talk to {first}
        </Link>
        <h3 className="mb-3 mt-10 font-serif text-2xl font-medium text-moon">Further reading</h3>
        <ul className="space-y-3">
          {biography.furtherReading.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-moon underline underline-offset-4 decoration-edge hover:decoration-moon"
              >
                {item.label}
              </a>
              <span className="text-mist text-sm block">{item.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Plate({ image, side }: { image: BioImage; side: "left" | "right" }) {
  const portrait = image.height > image.width;
  const float =
    side === "right" ? "md:float-right md:ml-8" : "md:float-left md:mr-8";
  return (
    <figure className={`mb-6 ${float} ${portrait ? "md:w-[42%]" : "md:w-[55%]"} w-full`}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="(max-width: 768px) 100vw, 420px"
        className="h-auto w-full rounded-[3px] border border-edge"
      />
      <figcaption className="mt-2.5 text-mist text-[13px] leading-snug">
        {image.caption}{" "}
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim underline underline-offset-2 hover:text-moon"
        >
          {image.credit}
        </a>
      </figcaption>
    </figure>
  );
}
