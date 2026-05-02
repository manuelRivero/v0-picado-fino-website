"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import type { RestaurantSlug } from "@/lib/restaurants"
import { getGalleryConfig } from "@/lib/gallery-data"

export function GalleryPageClient({ slug }: { slug: RestaurantSlug }) {
  const { eyebrow, title, description, images } = getGalleryConfig(slug)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">{eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative break-inside-avoid group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image.src)}
            >
              <div
                className={`relative ${index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                      {image.category}
                    </span>
                    <p className="text-foreground text-sm mt-1">{image.alt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl bg-background/95 backdrop-blur-md border-border p-2">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
              <span className="sr-only">Cerrar</span>
            </button>
            {selectedImage && (
              <div className="relative aspect-[4/3] w-full">
                <Image src={selectedImage} alt="Imagen ampliada" fill className="object-contain" />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
