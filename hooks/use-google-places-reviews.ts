"use client"

import { useEffect, useState } from "react"
import { normalizePlaceReviews } from "@/lib/places/normalize"
import type { GooglePlaceDetailsRaw, PlaceReviewsData } from "@/lib/places/types"
import { getInvalidPlaceIdMessage, isValidGooglePlaceId } from "@/lib/places/validate"

export type GooglePlacesReviewsState =
  | { status: "idle" | "loading" }
  | { status: "success"; data: PlaceReviewsData }
  | { status: "error"; error: string }

const cache = new Map<string, PlaceReviewsData>()
const inflight = new Map<string, Promise<PlaceReviewsData>>()

type GooglePlacesErrorResponse = {
  error?: {
    message?: string
    status?: string
  }
}

async function fetchPlaceReviews(placeId: string): Promise<PlaceReviewsData> {
  const cached = cache.get(placeId)
  if (cached) return cached

  if (!isValidGooglePlaceId(placeId)) {
    throw new Error(getInvalidPlaceIdMessage(placeId))
  }

  const apiKey = process.env.NEXT_PUBLIC_PLACES_KEY?.trim()
  if (!apiKey) {
    throw new Error("Configuración de Google Places incompleta.")
  }

  let request = inflight.get(placeId)
  if (!request) {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`

    request = fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,reviews",
      },
    })
      .then(async (res) => {
        const payload = (await res.json()) as GooglePlaceDetailsRaw | GooglePlacesErrorResponse

        if (!res.ok) {
          const apiMessage =
            "error" in payload && payload.error?.message?.trim()
              ? payload.error.message.trim()
              : null

          if (apiMessage?.toLowerCase().includes("place id") && apiMessage.toLowerCase().includes("not valid")) {
            throw new Error(
              "El Place ID configurado no es válido. Verificá que sea el identificador ChIJ de Google Maps, no el CID numérico del perfil."
            )
          }

          throw new Error(apiMessage ?? "No pudimos cargar las reseñas en este momento.")
        }

        const data = normalizePlaceReviews(payload as GooglePlaceDetailsRaw)
        cache.set(placeId, data)
        return data
      })
      .finally(() => {
        inflight.delete(placeId)
      })

    inflight.set(placeId, request)
  }

  return request
}

export function useGooglePlacesReviews(placeId: string | undefined) {
  const [state, setState] = useState<GooglePlacesReviewsState>(() => {
    if (!isValidGooglePlaceId(placeId)) {
      return { status: "error", error: getInvalidPlaceIdMessage(placeId) }
    }
    if (cache.has(placeId)) {
      return { status: "success", data: cache.get(placeId)! }
    }
    return { status: "loading" }
  })

  useEffect(() => {
    if (!isValidGooglePlaceId(placeId)) {
      setState({ status: "error", error: getInvalidPlaceIdMessage(placeId) })
      return
    }

    const cached = cache.get(placeId)
    if (cached) {
      setState({ status: "success", data: cached })
      return
    }

    let cancelled = false
    setState({ status: "loading" })

    fetchPlaceReviews(placeId)
      .then((data) => {
        if (!cancelled) setState({ status: "success", data })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            error:
              error instanceof Error
                ? error.message
                : "No pudimos cargar las reseñas.",
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [placeId])

  return state
}
