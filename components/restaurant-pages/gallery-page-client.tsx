"use client"

import type { RestaurantSlug } from "@/lib/restaurants"
import { getGalleryConfig } from "@/lib/gallery-data"
import { RestaurantGallery } from "@/components/restaurant-gallery"

export function GalleryPageClient({ slug }: { slug: RestaurantSlug }) {
  const { eyebrow, title, description, images } = getGalleryConfig(slug)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">{eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <RestaurantGallery images={images} variant="page" />
      </div>
    </div>
  )
}
