import { whatsappMeUrl } from "@/lib/api"
import {
  fallbackWhatsappPhoneForSlug,
  type RestaurantSlug,
} from "@/lib/restaurants"

export const WHATSAPP_MESSAGES = {
  "picado-fino": {
    reserva: "Hola quiero reservar una mesa en Picado Fino",
    pedido: "Hola quiero hacer un pedido a domicilio en Picado Fino",
  },
  "la-esquina": {
    reserva: "Hola quiero reservar una mesa en La Esquina de Picado",
    pedido: "Hola quiero hacer un pedido a domicilio en La Esquina",
    general: "Hola quiero hacer un pedido en La Esquina de Picado",
    pedidoLlevar:
      "Hola quiero un pedido para llevar o a domicilio en La Esquina de Picado",
  },
} as const satisfies Record<
  RestaurantSlug,
  {
    reserva: string
    pedido: string
    general?: string
    pedidoLlevar?: string
  }
>

export type RestaurantWhatsappLinks = {
  reserva?: string
  pedido?: string
  general?: string
  pedidoLlevar?: string
}

function linkOrUndefined(url: string | null): string | undefined {
  return url ?? undefined
}

/** Teléfono de API o, si falta, variable de entorno por sede. */
export function resolveWhatsappPhone(
  apiPhone: string | null | undefined,
  slug: RestaurantSlug
): string {
  const fromApi = apiPhone?.replace(/\D/g, "") ?? ""
  if (fromApi) return fromApi
  return fallbackWhatsappPhoneForSlug(slug).replace(/\D/g, "")
}

export function restaurantWhatsappMeUrl(
  slug: RestaurantSlug,
  apiPhone: string | null | undefined,
  message: string
): string | null {
  const phone = resolveWhatsappPhone(apiPhone, slug)
  return whatsappMeUrl(phone || null, message)
}

export function getRestaurantWhatsappLinks(
  slug: RestaurantSlug,
  apiPhone?: string | null
): RestaurantWhatsappLinks {
  const messages = WHATSAPP_MESSAGES[slug]
  const links: RestaurantWhatsappLinks = {
    reserva: linkOrUndefined(restaurantWhatsappMeUrl(slug, apiPhone, messages.reserva)),
    pedido: linkOrUndefined(restaurantWhatsappMeUrl(slug, apiPhone, messages.pedido)),
  }

  if (slug === "la-esquina") {
    const le = WHATSAPP_MESSAGES["la-esquina"]
    links.general = linkOrUndefined(restaurantWhatsappMeUrl(slug, apiPhone, le.general))
    links.pedidoLlevar = linkOrUndefined(
      restaurantWhatsappMeUrl(slug, apiPhone, le.pedidoLlevar)
    )
  }

  return links
}

/** CTA de la página de opiniones por sede. */
export function opinionesWhatsappUrl(
  slug: RestaurantSlug,
  apiPhone?: string | null
): string | undefined {
  const links = getRestaurantWhatsappLinks(slug, apiPhone)
  if (slug === "la-esquina") {
    return links.general ?? links.pedido
  }
  return links.reserva
}
