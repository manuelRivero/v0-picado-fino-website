"use client"

import { useEffect, useState } from "react"
import { loadPlaceReviews } from "@/lib/places/client"
import { REVIEWS_UNAVAILABLE_MESSAGE } from "@/lib/places/messages"
import type { PlaceReviewsData } from "@/lib/places/types"

export type GooglePlacesReviewsState =
  | { status: "idle" | "loading" }
  | { status: "success"; data: PlaceReviewsData }
  | { status: "error"; error: string }

type UseGooglePlacesReviewsOptions = {
  textQuery: string
  placeId?: string
}

const cache = new Map<string, PlaceReviewsData>()
const inflight = new Map<string, Promise<PlaceReviewsData>>()

function cacheKey({ textQuery, placeId }: UseGooglePlacesReviewsOptions): string {
  return `${textQuery}::${placeId?.trim() ?? ""}`
}

async function fetchReviews(options: UseGooglePlacesReviewsOptions): Promise<PlaceReviewsData> {
  const key = cacheKey(options)
  const cached = cache.get(key)
  if (cached) return cached

  let request = inflight.get(key)
  if (!request) {
    request = loadPlaceReviews(options)
      .then((data) => {
        cache.set(key, data)
        return data
      })
      .finally(() => {
        inflight.delete(key)
      })

    inflight.set(key, request)
  }

  return request
}

export function useGooglePlacesReviews(options: UseGooglePlacesReviewsOptions) {
  const { textQuery, placeId } = options
  const key = cacheKey(options)

  const [state, setState] = useState<GooglePlacesReviewsState>(() => {
    if (!textQuery.trim()) {
      return { status: "error", error: REVIEWS_UNAVAILABLE_MESSAGE }
    }
    if (cache.has(key)) {
      return { status: "success", data: cache.get(key)! }
    }
    return { status: "loading" }
  })

  useEffect(() => {
    if (!textQuery.trim()) {
      setState({ status: "error", error: REVIEWS_UNAVAILABLE_MESSAGE })
      return
    }

    const cached = cache.get(key)
    if (cached) {
      setState({ status: "success", data: cached })
      return
    }

    let cancelled = false
    setState({ status: "loading" })

    fetchReviews({ textQuery, placeId })
      .then((data) => {
        if (!cancelled) setState({ status: "success", data })
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            status: "error",
            error: REVIEWS_UNAVAILABLE_MESSAGE,
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [key, placeId, textQuery])

  return state
}
