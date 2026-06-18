import type { Metadata } from "next"
import type { RestaurantSlug } from "./restaurants"

const OG_IMAGE_PATH = "/images/picadofino-og.jpeg"

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "")
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return "http://localhost:3000"
}

export function getOgImage() {
  return {
    url: `${getSiteUrl()}${OG_IMAGE_PATH}`,
    width: 1600,
    height: 1600,
    alt: "Picado Fino",
  } as const
}

export const RESTAURANT_PAGE_META: Record<
  RestaurantSlug,
  { title: string; description: string }
> = {
  "picado-fino": {
    title: "Picado Fino",
    description:
      "El lugar donde nos encanta ser tus anfitriones. Vení a disfrutar del verdadero asado argentino en un ambiente ideal para compartir, con la calidez de siempre.",
  },
  "la-esquina": {
    title: "La Esquina de Picado",
    description:
      "Rotisería, minutas y delivery con la calidad de Picado Fino. Sabores clásicos y cocina al paso en el corazón de Rosario.",
  },
}

export const SITE_META_DESCRIPTION =
  RESTAURANT_PAGE_META["picado-fino"].description

export function buildPageMetadata({
  title,
  description,
}: {
  title: string
  description: string
}): Metadata {
  const ogImage = getOgImage()

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  }
}
