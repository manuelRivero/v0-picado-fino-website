const PLACE_ID_PATTERN = /^[A-Za-z0-9_-]+$/

export function isValidGooglePlaceId(value: string | undefined): value is string {
  const trimmed = value?.trim()
  if (!trimmed) return false
  if (/^\d{10,}$/.test(trimmed)) return false
  return PLACE_ID_PATTERN.test(trimmed) && trimmed.length >= 10
}

export class ExpiredPlaceIdError extends Error {
  constructor() {
    super("ExpiredPlaceIdError")
    this.name = "ExpiredPlaceIdError"
  }
}
