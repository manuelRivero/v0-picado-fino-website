import { REVIEWS_UNAVAILABLE_MESSAGE } from "@/lib/places/messages"
import { normalizePlaceReviews } from "@/lib/places/normalize"
import type { GooglePlaceDetailsRaw, PlaceReviewsData } from "@/lib/places/types"
import { ExpiredPlaceIdError, isValidGooglePlaceId } from "@/lib/places/validate"

type GooglePlacesErrorResponse = {
  error?: {
    message?: string
    status?: string
  }
}

type GoogleTextSearchResponse = {
  places?: Array<{ id?: string }>
}

const ROSARIO_LOCATION_BIAS = {
  circle: {
    center: { latitude: -32.9468, longitude: -60.6393 },
    radius: 8000,
  },
} as const

function getApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_PLACES_KEY?.trim()
  if (!apiKey) {
    throw new Error(REVIEWS_UNAVAILABLE_MESSAGE)
  }
  return apiKey
}

function isExpiredPlaceIdResponse(
  status: number,
  message: string | null | undefined
): boolean {
  if (status === 404) return true
  if (!message) return false

  const normalized = message.toLowerCase()
  return (
    normalized.includes("place id") &&
    (normalized.includes("not valid") ||
      normalized.includes("no longer valid") ||
      normalized.includes("not found"))
  )
}

export async function searchPlaceIdByText(textQuery: string): Promise<string> {
  const apiKey = getApiKey()

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName",
    },
    body: JSON.stringify({
      textQuery,
      languageCode: "es",
      regionCode: "AR",
      locationBias: ROSARIO_LOCATION_BIAS,
      maxResultCount: 1,
    }),
  })

  const payload = (await res.json()) as GoogleTextSearchResponse | GooglePlacesErrorResponse

  if (!res.ok) {
    throw new Error(REVIEWS_UNAVAILABLE_MESSAGE)
  }

  const placeId = (payload as GoogleTextSearchResponse).places?.[0]?.id?.trim()
  if (!placeId) {
    throw new Error(REVIEWS_UNAVAILABLE_MESSAGE)
  }

  return placeId
}

export async function fetchPlaceReviewsById(placeId: string): Promise<PlaceReviewsData> {
  const apiKey = getApiKey()
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,reviews",
    },
  })

  const payload = (await res.json()) as GooglePlaceDetailsRaw | GooglePlacesErrorResponse

  if (!res.ok) {
    const apiMessage =
      "error" in payload && payload.error?.message?.trim()
        ? payload.error.message.trim()
        : null

    if (isExpiredPlaceIdResponse(res.status, apiMessage)) {
      throw new ExpiredPlaceIdError()
    }

    throw new Error(REVIEWS_UNAVAILABLE_MESSAGE)
  }

  return normalizePlaceReviews(payload as GooglePlaceDetailsRaw)
}

export async function loadPlaceReviews(options: {
  textQuery: string
  placeId?: string
}): Promise<PlaceReviewsData> {
  const { textQuery } = options
  const configuredPlaceId = options.placeId?.trim()

  if (configuredPlaceId && isValidGooglePlaceId(configuredPlaceId)) {
    try {
      return await fetchPlaceReviewsById(configuredPlaceId)
    } catch (error) {
      if (!(error instanceof ExpiredPlaceIdError)) {
        throw error
      }
    }
  }

  const resolvedPlaceId = await searchPlaceIdByText(textQuery)
  return fetchPlaceReviewsById(resolvedPlaceId)
}
