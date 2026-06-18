"use client"

import { useEffect, useState } from "react"
import { normalizePlaceReviews } from "@/lib/places/normalize"
import type { GooglePlaceDetailsRaw, PlaceReviewsData } from "@/lib/places/types"

export type GooglePlacesReviewsState =
  | { status: "idle" | "loading" }
  | { status: "success"; data: PlaceReviewsData }
  | { status: "error"; error: string }

const cache = new Map<string, PlaceReviewsData>()
const inflight = new Map<string, Promise<PlaceReviewsData>>()

async function fetchPlaceReviews(placeId: string): Promise<PlaceReviewsData> {
  const cached = cache.get(placeId)
  if (cached) return cached

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
        if (!res.ok) {
          throw new Error("No pudimos cargar las reseñas en este momento.")
        }
        const payload = (await res.json()) as GooglePlaceDetailsRaw
        const data = normalizePlaceReviews(payload)
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
    if (!placeId) {
      return { status: "error", error: "Identificador de lugar no configurado." }
    }
    if (cache.has(placeId)) {
      return { status: "success", data: cache.get(placeId)! }
    }
    return { status: "loading" }
  })

  useEffect(() => {
    if (!placeId) {
      setState({ status: "error", error: "Identificador de lugar no configurado." })
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
