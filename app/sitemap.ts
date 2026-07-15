import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/metadata"
import { RESTAURANT_SLUGS } from "@/lib/restaurants"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/data-deletion-request`,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const restaurantRoutes: MetadataRoute.Sitemap = RESTAURANT_SLUGS.map(
    (slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: slug === "picado-fino" ? 0.9 : 0.8,
    })
  )

  return [...staticRoutes, ...restaurantRoutes]
}
