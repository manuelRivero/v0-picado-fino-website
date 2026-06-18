import { whatsappMeUrl } from "@/lib/api"
import {
  fallbackWhatsappPhoneForSlug,
  type RestaurantSlug,
} from "@/lib/restaurants"

export const WHATSAPP_MESSAGES = {
  "picado-fino": {
    reserva: "Hola quiero reservar una mesa en Picado Fino",
    pedido: "Hola quiero hacer un pedido a domicilio en Picado Fino",
    carta: "Hola quiero consultar la carta completa de Picado Fino",
  },
  "la-esquina": {
    reserva: "Hola quiero reservar una mesa en La Esquina de Picado",
    pedido: "Hola quiero hacer un pedido a domicilio en La Esquina",
    general: "Hola quiero hacer un pedido en La Esquina de Picado",
    pedidoLlevar:
      "Hola quiero un pedido para llevar o a domicilio en La Esquina de Picado",
    carta: "Hola quiero consultar la carta completa de La Esquina de Picado",
  },
} as const satisfies Record<
  RestaurantSlug,
  {
    reserva: string
    pedido: string
    carta: string
    general?: string
    pedidoLlevar?: string
  }
>

export type RestaurantWhatsappLinks = {
  reserva?: string
  pedido?: string
  carta?: string
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

export function menuItemWhatsappUrl(
  slug: RestaurantSlug,
  apiPhone: string | null | undefined,
  itemName: string
): string | null {
  return restaurantWhatsappMeUrl(
    slug,
    apiPhone,
    `Hola vengo de la pagina web, quiero pedir ${itemName}`
  )
}

export function getRestaurantWhatsappLinks(
  slug: RestaurantSlug,
  apiPhone?: string | null
): RestaurantWhatsappLinks {
  const messages = WHATSAPP_MESSAGES[slug]
  const links: RestaurantWhatsappLinks = {
    reserva: linkOrUndefined(restaurantWhatsappMeUrl(slug, apiPhone, messages.reserva)),
    pedido: linkOrUndefined(restaurantWhatsappMeUrl(slug, apiPhone, messages.pedido)),
    carta: linkOrUndefined(restaurantWhatsappMeUrl(slug, apiPhone, messages.carta)),
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
