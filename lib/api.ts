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

function parseMenuItemsPayload(data: unknown, logLabel?: string): MenuItem[] {
  const prefix = logLabel ? `[menu] ${logLabel}` : "[menu]"

  if (!data || typeof data !== "object") {
    console.warn(`${prefix} payload inválido o vacío`, { type: typeof data })
    return []
  }

  const record = data as Record<string, unknown>
  const raw =
    record.items ??
    record.menuItems ??
    (record.data && typeof record.data === "object"
      ? (record.data as Record<string, unknown>).items
      : undefined)

  console.log(`${prefix} claves del payload:`, Object.keys(record))

  if (!Array.isArray(raw)) {
    console.warn(`${prefix} no se encontró array de items`, {
      hasItems: "items" in record,
      hasMenuItems: "menuItems" in record,
      hasDataItems:
        record.data &&
        typeof record.data === "object" &&
        "items" in (record.data as Record<string, unknown>),
      rawType: raw === undefined ? "undefined" : typeof raw,
    })
    return []
  }

  console.log(`${prefix} items en respuesta cruda:`, raw.length)

  const parsed = raw.filter(
    (item): item is MenuItem =>
      Boolean(item) &&
      typeof item === "object" &&
      typeof (item as MenuItem).id === "string" &&
      typeof (item as MenuItem).name === "string" &&
      (item as MenuItem).name.trim().length > 0
  )

  if (parsed.length !== raw.length) {
    const rejected = raw.filter(
      (item) =>
        !item ||
        typeof item !== "object" ||
        typeof (item as MenuItem).id !== "string" ||
        typeof (item as MenuItem).name !== "string" ||
        !(item as MenuItem).name?.trim()
    )
    console.warn(`${prefix} items descartados al parsear:`, {
      crudos: raw.length,
      validos: parsed.length,
      descartados: rejected.length,
      muestraDescartados: rejected.slice(0, 3).map((item) =>
        item && typeof item === "object"
          ? {
              id: (item as MenuItem).id,
              idType: typeof (item as MenuItem).id,
              name: (item as MenuItem).name,
              nameType: typeof (item as MenuItem).name,
            }
          : item
      ),
    })
  } else {
    console.log(`${prefix} items parseados OK:`, parsed.length)
  }

  return parsed
}

async function fetchMenuItemsFromPath(
  baseUrl: string,
  path: string,
  logLabel?: string
): Promise<MenuItem[]> {
  const prefix = logLabel ? `[menu] ${logLabel}` : "[menu]"
  const url = `${baseUrl}${path}`

  console.log(`${prefix} GET ${url}`)

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    console.log(`${prefix} status ${res.status} ${res.statusText}`)

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "")
      console.error(`${prefix} respuesta no OK`, {
        status: res.status,
        bodyPreview: errorBody.slice(0, 500),
      })
      return []
    }

    const data: unknown = await res.json()
    return parseMenuItemsPayload(data, logLabel)
  } catch (error) {
    console.error(`${prefix} error en fetch`, error)
    return []
  }
}

export async function fetchFeaturedItems(businessId: string): Promise<MenuItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API?.trim()
  if (!baseUrl || !businessId) return []

  return fetchMenuItemsFromPath(
    baseUrl,
    `/public/businesses/${businessId}/featured-items?limit=10`
  )
}

/** Carta completa publicada en el backend (categorías + ítems con precio). */
export async function fetchMenuItems(
  businessId: string,
  limit = 100
): Promise<MenuItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API?.trim()

  console.log("[menu] fetchMenuItems", {
    businessId: businessId || "(vacío)",
    limit,
    baseUrl: baseUrl || "(no configurado)",
  })

  if (!baseUrl || !businessId) {
    console.warn("[menu] fetchMenuItems abortado: falta NEXT_PUBLIC_API o businessId")
    return []
  }

  const menuPath = `/public/businesses/${businessId}/menu-items?limit=${limit}`
  const menuItems = await fetchMenuItemsFromPath(
    baseUrl,
    menuPath,
    "menu-items"
  )

  if (menuItems.length > 0) {
    console.log("[menu] fetchMenuItems OK desde menu-items:", menuItems.length)
    return menuItems
  }

  console.warn("[menu] menu-items vacío, probando fallback featured-items")
  const featuredPath = `/public/businesses/${businessId}/featured-items?limit=${limit}`
  const featuredItems = await fetchMenuItemsFromPath(
    baseUrl,
    featuredPath,
    "featured-items (fallback)"
  )

  console.log("[menu] fetchMenuItems resultado final:", featuredItems.length)
  return featuredItems
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
