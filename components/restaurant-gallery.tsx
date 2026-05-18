"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import type { GalleryImageEntry } from "@/lib/gallery-data"

type Props = {
  images: GalleryImageEntry[]
  variant?: "landing" | "page"
  enableLightbox?: boolean
  className?: string
}

export function RestaurantGallery({
  images,
  variant = "landing",
  enableLightbox,
  className,
}: Props) {
  const lightbox = enableLightbox ?? variant === "page"
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div
        className={["restaurant-gallery", `restaurant-gallery--${variant}`, className]
          .filter(Boolean)
          .join(" ")}
      >
        {images.map((image, index) => {
          const frame = (
            <div className="restaurant-gallery__frame">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  variant === "landing"
                    ? "(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                className="restaurant-gallery__img"
              />
              {variant === "page" ? (
                <div className="restaurant-gallery__overlay">
                  <span className="restaurant-gallery__category">{image.category}</span>
                  <p className="restaurant-gallery__caption">{image.alt}</p>
                </div>
              ) : null}
            </div>
          )

          return (
            <div key={`${image.src}-${index}`} className="restaurant-gallery__item">
              {lightbox ? (
                <button
                  type="button"
                  className="restaurant-gallery__trigger"
                  onClick={() => setSelectedImage(image.src)}
                >
                  {frame}
                </button>
              ) : (
                frame
              )}
            </div>
          )
        })}
      </div>

      {lightbox ? (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-md border-border p-2">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
              <span className="sr-only">Cerrar</span>
            </button>
            {selectedImage ? (
              <div className="relative aspect-square w-full">
                <Image src={selectedImage} alt="Imagen ampliada" fill className="object-contain" />
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}
