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

/** WhatsApp para CTAs (reserva / pedido) por sede */
export const RESTAURANT_WHATSAPP: Record<RestaurantSlug, string> = {
  "picado-fino":
    "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa%20en%20Picado%20Fino",
  "la-esquina":
    "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20en%20La%20Esquina%20de%20Picado",
}
