import type {
  GooglePlaceDetailsRaw,
  GooglePlaceReviewRaw,
  PlaceReview,
  PlaceReviewsData,
} from "@/lib/places/types"

function reviewText(review: GooglePlaceReviewRaw): string {
  return (
    review.text?.text?.trim() ||
    review.originalText?.text?.trim() ||
    ""
  )
}

function reviewId(review: GooglePlaceReviewRaw, index: number): string {
  return review.name?.trim() || `review-${index}`
}

export function normalizePlaceReviews(data: GooglePlaceDetailsRaw): PlaceReviewsData {
  const reviews: PlaceReview[] = (data.reviews ?? [])
    .map((review, index): PlaceReview | null => {
      const text = reviewText(review)
      const authorName = review.authorAttribution?.displayName?.trim()
      const rating = review.rating
      const publishTime = review.publishTime?.trim()

      if (!text || !authorName || !rating || !publishTime) return null

      return {
        id: reviewId(review, index),
        authorName,
        rating,
        text,
        publishTime,
      }
    })
    .filter((review): review is PlaceReview => review !== null)

  return {
    rating: typeof data.rating === "number" ? data.rating : null,
    reviews,
  }
}
