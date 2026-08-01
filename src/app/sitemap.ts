import { figures } from "@/lib/figures";
import { books } from "@/lib/books";
import { series } from "@/lib/episodes";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://summon.guide";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/speak`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/watch`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    // Episode pages are the point of the shelf, so they belong in the sitemap.
    ...series.flatMap((s) =>
      s.episodes.map((ep) => ({
        url: `${baseUrl}/watch/${s.guideSlug}/${ep.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    ),
    // Book pages are meant to be linked and shared, so they belong in the
    // sitemap alongside the guide profiles.
    ...books.map((book) => ({
      url: `${baseUrl}/books/${book.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...figures.flatMap((figure) => [
      {
        url: `${baseUrl}/${figure.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/chat/${figure.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
    ]),
  ];
}
