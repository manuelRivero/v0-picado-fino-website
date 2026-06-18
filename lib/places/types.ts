export type GooglePlaceReviewAuthor = {
  displayName: string
  uri?: string
  photoUri?: string
}

export type GooglePlaceReviewRaw = {
  name?: string
  relativePublishTimeDescription?: string
  rating?: number
  text?: { text?: string; languageCode?: string }
  originalText?: { text?: string; languageCode?: string }
  authorAttribution?: GooglePlaceReviewAuthor
  publishTime?: string
}

export type GooglePlaceDetailsRaw = {
  rating?: number
  reviews?: GooglePlaceReviewRaw[]
}

export type PlaceReview = {
  id: string
  authorName: string
  rating: number
  text: string
  publishTime: string
}

export type PlaceReviewsData = {
  rating: number | null
  reviews: PlaceReview[]
}

export type PlaceReviewsApiResponse = PlaceReviewsData | { error: string }
