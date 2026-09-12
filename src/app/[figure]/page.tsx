import { guidePath } from "@/lib/guideUrls";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getFigure } from "@/lib/figures";
import { getBook } from "@/lib/books";
import FigureChat from "@/app/chat/[figure]/page";
import SourceChat from "@/app/chat/source/[slug]/page";

type Props = { params: Promise<{ figure: string }>; searchParams: Promise<{ q?: string | string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { figure: slug } = await params;
  const guide = getFigure(slug);
  const book = getBook(slug);
  return {
    title: `${guide?.name || book?.title || "Guide not found"} | summon.guide`,
    alternates: { canonical: `https://summon.guide${guidePath(slug)}` },
  };
}
export default async function GuideConversation({ params, searchParams }: Props) {
  const { figure: slug } = await params;
  if (getFigure(slug)) return <Suspense fallback={<p>Loading conversation...</p>}><FigureChat params={Promise.resolve({ figure: slug })} /></Suspense>;
  if (getBook(slug)) return <Suspense fallback={<p>Loading conversation...</p>}><SourceChat params={Promise.resolve({ slug })} searchParams={searchParams} /></Suspense>;
  notFound();
}
