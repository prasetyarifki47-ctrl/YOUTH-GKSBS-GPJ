
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://youthgksbsgpj.web.id";

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-30",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2026-10-30",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
