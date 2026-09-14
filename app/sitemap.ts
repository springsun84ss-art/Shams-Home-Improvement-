import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shamshomeimprovement.com",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}