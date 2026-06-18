const PLACE_ID_PATTERN = /^[A-Za-z0-9_-]+$/

export function isGoogleCid(value: string): boolean {
  return /^\d{10,}$/.test(value.trim())
}

export function isValidGooglePlaceId(value: string | undefined): value is string {
  const trimmed = value?.trim()
  if (!trimmed) return false
  if (isGoogleCid(trimmed)) return false
  return PLACE_ID_PATTERN.test(trimmed) && trimmed.length >= 10
}

export function getInvalidPlaceIdMessage(value: string | undefined): string {
  const trimmed = value?.trim()

  if (!trimmed) {
    return "Identificador de lugar no configurado."
  }

  if (isGoogleCid(trimmed)) {
    return "El valor configurado es un CID numérico de Google Maps, no un Place ID. Buscá el negocio en el Place ID Finder de Google y copiá el ID que empieza con ChIJ."
  }

  return "El Place ID configurado no tiene un formato válido para Google Places API."
}
