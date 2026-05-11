export type BusinessLocation = {
  latitude: number
  longitude: number
}

export type BusinessHoursEntry = {
  id: string
  dayOfWeek: number
  opensAt: string
  closesAt: string
  isClosed: boolean
}

/** Respuesta de GET /public/businesses/:businessId */
export type PublicBusiness = {
  id: string
  name: string
  description: string
  slug: string
  timezone: string
  currencyCode: string
  whatsappPhoneNumber: string
  location: BusinessLocation
  businessHours: BusinessHoursEntry[]
}

const DAY_NAMES_ES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const

/** Orden Lunes → Domingo para listados */
const DISPLAY_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const

export function formatBusinessHoursLines(hours: BusinessHoursEntry[]): string[] {
  const byDay = new Map(hours.map((h) => [h.dayOfWeek, h]))
  return DISPLAY_DAY_ORDER.map((d) => {
    const row = byDay.get(d)
    if (!row) return `${DAY_NAMES_ES[d]} — Horario no disponible`
    if (row.isClosed) return `${DAY_NAMES_ES[d]} — Cerrado`
    return `${DAY_NAMES_ES[d]} — ${row.opensAt} a ${row.closesAt}`
  })
}

/** Solo dígitos para wa.me */
export function whatsappMeUrl(phone: string | undefined | null, message: string): string | null {
  const digits = phone?.replace(/\D/g, "") ?? ""
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function mapsUrl(loc: BusinessLocation | undefined | null): string | null {
  if (!loc || typeof loc.latitude !== "number" || typeof loc.longitude !== "number") return null
  return `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
}

export type MenuItemPrice = {
  id: string
  currencyCode: string
  amount: string
}

export type MenuItemCategory = {
  id: string
  name: string
  tag: string
}

export type MenuItem = {
  id: string
  name: string
  description: string
  image: string
  servesPeople: number
  category: MenuItemCategory
  prices: MenuItemPrice[]
}

export function formatItemPrice(prices: MenuItemPrice[]): string {
  if (!prices.length) return ""
  const p = prices[0]
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: p.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(p.amount))
}

export async function fetchFeaturedItems(businessId: string): Promise<MenuItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API?.trim()

  console.log("[api] fetchFeaturedItems →", { baseUrl, businessId })

  if (!baseUrl || !businessId) {
    console.warn("[api] fetchFeaturedItems: baseUrl o businessId vacío — abortando")
    return []
  }

  const url = `${baseUrl}/public/businesses/${businessId}/featured-items?limit=10`
  console.log("[api] GET", url)

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    console.log("[api] response status:", res.status, res.statusText)

    if (!res.ok) {
      console.error("[api] respuesta no OK — devolviendo []")
      return []
    }

    const data = await res.json()
    console.log("[api] body completo:", JSON.stringify(data))
    console.log("[api] items recibidos:", data.items?.length ?? 0)
    return Array.isArray(data.items) ? data.items : []
  } catch (err) {
    console.error("[api] fetch falló con error:", err)
    return []
  }
}

export async function fetchBusiness(businessId: string): Promise<PublicBusiness | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API?.trim()
  if (!baseUrl || !businessId) return null

  const url = `${baseUrl}/public/businesses/${businessId}`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return (await res.json()) as PublicBusiness
  } catch {
    return null
  }
}
