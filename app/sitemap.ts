
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://youthgksbsgpj.web.id/",
      lastModified: "2026-10-30",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://youthgksbsgpj.web.id/about",
      lastModified: "2026-10-30",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
