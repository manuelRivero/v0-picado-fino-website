export type BusinessLocation = {
  latitude: number
  longitude: number
  mapsUrl?: string
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
  whatsappPhoneNumber?: string | null
  streetAddress?: string
  addressNotes?: string
  mapsUrl?: string
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

function compareTime(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true })
}

/** Convierte "HH:mm" (24 h) a "h:mm AM/PM". */
function formatTimeAmPm(time: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim())
  if (!match) return time

  const hours = Number.parseInt(match[1], 10)
  const minutes = match[2]
  if (Number.isNaN(hours) || hours < 0 || hours > 23) return time

  const period = hours < 12 ? "AM" : "PM"
  const hour12 = hours % 12 === 0 ? 12 : hours % 12
  return `${hour12}:${minutes} ${period}`
}

/** Agrupa entradas por día y ordena cada día de más temprano a más tarde. */
export function groupBusinessHoursByDay(
  hours: BusinessHoursEntry[]
): Map<number, BusinessHoursEntry[]> {
  const byDay = new Map<number, BusinessHoursEntry[]>()
  for (const entry of hours) {
    const daySlots = byDay.get(entry.dayOfWeek) ?? []
    daySlots.push(entry)
    byDay.set(entry.dayOfWeek, daySlots)
  }
  for (const [day, slots] of byDay) {
    byDay.set(
      day,
      [...slots].sort((a, b) => compareTime(a.opensAt, b.opensAt))
    )
  }
  return byDay
}

function formatDaySchedule(slots: BusinessHoursEntry[]): string {
  const openSlots = slots.filter((s) => !s.isClosed)
  if (openSlots.length === 0) return "Cerrado"
  return openSlots
    .map((s) => `${formatTimeAmPm(s.opensAt)} a ${formatTimeAmPm(s.closesAt)}`)
    .join(" · ")
}

export function formatBusinessHoursLines(hours: BusinessHoursEntry[]): string[] {
  const byDay = groupBusinessHoursByDay(hours)
  return DISPLAY_DAY_ORDER.map((d) => {
    const slots = byDay.get(d)
    if (!slots?.length) return `${DAY_NAMES_ES[d]} — Horario no disponible`
    return `${DAY_NAMES_ES[d]} — ${formatDaySchedule(slots)}`
  })
}

/** Solo dígitos para wa.me */
export function whatsappMeUrl(phone: string | undefined | null, message: string): string | null {
  const digits = phone?.replace(/\D/g, "") ?? ""
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function mapsUrl(
  business: Pick<PublicBusiness, "mapsUrl" | "location"> | undefined | null
): string | null {
  if (!business) return null

  const fromApi = business.mapsUrl?.trim() || business.location?.mapsUrl?.trim()
  if (fromApi) return fromApi

  const loc = business.location
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
  ingredients?: string
  preparation?: string
  image: string
  servesPeople: number
  isFeatured?: boolean
  category: MenuItemCategory
  price: MenuItemPrice
  prices: MenuItemPrice[]
}

export function formatItemPrice(item: Pick<MenuItem, "price" | "prices">): string {
  const p = item.price ?? item.prices?.[0]
  if (!p?.amount) return ""

  const amount = Number.parseFloat(p.amount)
  if (Number.isNaN(amount)) return ""

  const formattedAmount = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  return `${p.currencyCode} ${formattedAmount}`
}

function extractItemsArray(data: unknown): unknown[] | null {
  // Respuesta es un array directo
  if (Array.isArray(data)) return data

  if (!data || typeof data !== "object") return null

  const record = data as Record<string, unknown>

  // { items: [...] }
  if (Array.isArray(record.items)) return record.items as unknown[]

  // { menuItems: [...] }
  if (Array.isArray(record.menuItems)) return record.menuItems as unknown[]

  // { data: [...] }
  if (Array.isArray(record.data)) return record.data as unknown[]

  // { data: { items: [...] } }
  if (record.data && typeof record.data === "object") {
    const inner = (record.data as Record<string, unknown>)
    if (Array.isArray(inner.items)) return inner.items as unknown[]
    if (Array.isArray(inner.menuItems)) return inner.menuItems as unknown[]
  }

  return null
}

function parseMenuItemsPayload(data: unknown): MenuItem[] {
  const raw = extractItemsArray(data)

  if (!raw) {
    console.warn("[menu] formato de respuesta no reconocido:", JSON.stringify(data)?.slice(0, 300))
    return []
  }

  return raw.filter(
    (item): item is MenuItem =>
      Boolean(item) &&
      typeof item === "object" &&
      typeof (item as MenuItem).id === "string" &&
      typeof (item as MenuItem).name === "string" &&
      (item as MenuItem).name.trim().length > 0
  )
}

async function fetchMenuItemsFromPath(
  baseUrl: string,
  path: string
): Promise<MenuItem[]> {
  const url = `${baseUrl}${path}`
  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) {
      console.warn("[menu] respuesta no OK:", res.status, url)
      return []
    }

    const data: unknown = await res.json()
    const items = parseMenuItemsPayload(data)
    if (items.length === 0) {
      console.warn("[menu] 0 items desde:", url, "— payload:", JSON.stringify(data)?.slice(0, 300))
    }
    return items
  } catch (err) {
    console.error("[menu] fetch error:", url, err)
    return []
  }
}

/** Carta completa publicada en el backend (categorías + ítems con precio). */
export async function fetchMenuItems(
  businessId: string,
  limit = 10
): Promise<MenuItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API?.trim()
  if (!baseUrl || !businessId) return []

  return fetchMenuItemsFromPath(
    baseUrl,
    `/public/businesses/${businessId}/featured-items?limit=${limit}`
  )
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
