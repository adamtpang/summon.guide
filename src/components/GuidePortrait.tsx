"use client";

import Image from "next/image";
import { COMPOSITE_PORTRAITS } from "@/lib/guidePortraitAssets";
import { useState } from "react";

type Props = { name: string; src?: string; sizes?: string; priority?: boolean; decorative?: boolean };

/** Stable portrait for headers, conversations and call mode. Retry the original
 * asset if optimization fails, then keep a readable identity instead of a broken image. */
export default function GuidePortrait(props: Props) {
  const members = props.src ? COMPOSITE_PORTRAITS[props.src] : undefined;
  if (members) return <span className="absolute inset-0 flex" role={props.decorative ? undefined : "img"} aria-label={props.decorative ? undefined : members.map(m => m.name).join(" and ")} aria-hidden={props.decorative || undefined}>
    {members.map(member => <span key={member.src} className="relative h-full flex-1"><PortraitImage {...member} sizes={props.sizes} priority={props.priority} decorative /></span>)}
  </span>;
  return <PortraitImage key={props.src || props.name} {...props} />;
}
function PortraitImage({ name, src, sizes = "176px", priority = false, decorative = false }: Props) {
  const [attempt, setAttempt] = useState(0);
  if (!src || attempt > 1) return <span className="guide-portrait-fallback" role={decorative ? undefined : "img"} aria-label={decorative ? undefined : name} aria-hidden={decorative || undefined}>{name.split(/\s+/).filter(Boolean).map(part => part[0]).slice(0, 2).join("")}</span>;
  return <Image src={src} alt={decorative ? "" : name} fill sizes={sizes} priority={priority} unoptimized={attempt === 1} onError={() => setAttempt(value => value + 1)} className="object-cover object-top" />;
}
