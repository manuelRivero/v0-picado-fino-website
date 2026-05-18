export const RESTAURANT_SLUGS = ["picado-fino", "la-esquina"] as const

export type RestaurantSlug = (typeof RESTAURANT_SLUGS)[number]

export function isRestaurantSlug(value: string): value is RestaurantSlug {
  return (RESTAURANT_SLUGS as readonly string[]).includes(value)
}

/** Ruta base del otro restaurante para enlaces cruzados */
export const OTHER_RESTAURANT: Record<RestaurantSlug, RestaurantSlug> = {
  "picado-fino": "la-esquina",
  "la-esquina": "picado-fino",
}

export function restaurantPath(slug: RestaurantSlug): string {
  return `/${slug}`
}

export function businessIdForSlug(slug: RestaurantSlug): string {
  return slug === "picado-fino"
    ? process.env.NEXT_PUBLIC_PICADO_ID?.trim() ?? ""
    : process.env.NEXT_PUBLIC_LA_ESQUINA_ID?.trim() ?? ""
}

export function fallbackWhatsappPhoneForSlug(slug: RestaurantSlug): string {
  return slug === "picado-fino"
    ? process.env.NEXT_PUBLIC_PICADO_FINO_PHONE?.trim() ?? ""
    : process.env.NEXT_PUBLIC_LA_ESQUINA_PHONE?.trim() ?? ""
}

type FooterSocialLink = { label: string; href: string }

export const RESTAURANT_FOOTER_SOCIAL: Record<RestaurantSlug, FooterSocialLink[]> =
  {
    "picado-fino": [
      { label: "Instagram", href: "https://www.instagram.com/picadofinoparrilla/" },
      { label: "TikTok", href: "https://www.tiktok.com/@picado.fino" },
    ],
    "la-esquina": [
      { label: "Instagram", href: "https://www.instagram.com/laesquinadepicado/" },
      {
        label: "TikTok",
        href: "https://www.facebook.com/profile.php?id=100063098003357",
      },
    ],
  }
