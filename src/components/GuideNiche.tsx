import Image from "next/image";
import Link from "next/link";

// One guide in the hall: an arched portrait with the name and a short line
// under it. Portraits are grey until you point at them, so photographs and
// paintings from three centuries sit together as one set.
export default function GuideNiche({
  href,
  name,
  line,
  portrait,
  priority = false,
}: {
  href: string;
  name: string;
  line: string;
  portrait?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className="group block text-center">
      <span className="niche block">
        {portrait ? (
          <Image
            src={portrait}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 180px"
            className="object-cover object-top group-hover:scale-[1.03]"
          />
        ) : (
          <span className="guide-portrait-fallback">{name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}</span>
        )}
      </span>
      <span className="mt-3 block font-serif text-[21px] font-medium leading-tight text-moon group-hover:text-lapis">{name}</span>
      <span className="mt-1 block text-[14px] leading-snug text-mist">{line}</span>
    </Link>
  );
}
