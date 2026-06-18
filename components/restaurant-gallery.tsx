"use client"

import Image from "next/image"
import type { GalleryImageEntry } from "@/lib/gallery-data"

type Props = {
  images: GalleryImageEntry[]
  className?: string
}

export function RestaurantGallery({ images, className }: Props) {
  return (
    <div
      className={["restaurant-gallery", "restaurant-gallery--landing", className]
        .filter(Boolean)
        .join(" ")}
    >
      {images.map((image, index) => (
        <div key={`${image.src}-${index}`} className="restaurant-gallery__item">
          <div className="restaurant-gallery__frame">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
              className="restaurant-gallery__img"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
