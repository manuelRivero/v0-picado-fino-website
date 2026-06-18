"use client"

import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useGooglePlacesReviews } from "@/hooks/use-google-places-reviews"
import { REVIEWS_EMPTY_MESSAGE } from "@/lib/places/messages"
import type { PlaceReview } from "@/lib/places/types"

const AUTOPLAY_MS = 4500
const REVIEW_TRUNCATE_LENGTH = 200

type RestaurantReviewsProps = {
  textQuery: string
  placeId?: string
  title: string
  subtitle: string
}

function formatReviewDate(publishTime: string): string {
  try {
    return format(parseISO(publishTime), "d 'de' MMMM yyyy", { locale: es })
  } catch {
    return publishTime
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="pf-reviews-stars" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          strokeWidth={1.5}
          className={index < rating ? "is-filled" : undefined}
        />
      ))}
    </div>
  )
}

const ReviewCard = memo(function ReviewCard({ review }: { review: PlaceReview }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > REVIEW_TRUNCATE_LENGTH
  const displayText =
    expanded || !isLong
      ? review.text
      : `${review.text.slice(0, REVIEW_TRUNCATE_LENGTH).trimEnd()}…`

  return (
    <article className="pf-reviews-card">
      <div className="pf-reviews-card-header">
        <div>
          <p className="pf-reviews-author pf-sans">{review.authorName}</p>
          <StarRating rating={review.rating} />
        </div>
        <time className="pf-reviews-date pf-sans" dateTime={review.publishTime}>
          {formatReviewDate(review.publishTime)}
        </time>
      </div>
      <p className="pf-reviews-text pf-cormorant">{displayText}</p>
      {isLong ? (
        <button
          type="button"
          className="pf-reviews-expand pf-sans"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      ) : null}
    </article>
  )
})

function ReviewsSkeleton() {
  return (
    <div className="pf-reviews-carousel pf-reviews-carousel--loading">
      <div className="pf-reviews-track">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="pf-reviews-slide">
            <div className="pf-reviews-card pf-reviews-card--skeleton" aria-hidden>
              <div className="pf-reviews-skeleton-line pf-reviews-skeleton-line--short" />
              <div className="pf-reviews-skeleton-stars" />
              <div className="pf-reviews-skeleton-line" />
              <div className="pf-reviews-skeleton-line" />
              <div className="pf-reviews-skeleton-line pf-reviews-skeleton-line--medium" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewsEmptyFallback() {
  return (
    <div className="pf-reviews-fallback pf-reveal pf-visible" role="status">
      <div className="pf-reviews-fallback-inner">
        <Star size={22} strokeWidth={1.5} className="pf-reviews-fallback-icon" />
        <p className="pf-reviews-fallback-title pf-serif">Sin reseñas por ahora</p>
        <p className="pf-reviews-fallback-text pf-cormorant">{REVIEWS_EMPTY_MESSAGE}</p>
      </div>
    </div>
  )
}

function ReviewsErrorFallback() {
  return (
    <div className="pf-reviews-fallback pf-reveal pf-visible" role="status">
      <div className="pf-reviews-fallback-inner">
        <Star size={22} strokeWidth={1.5} className="pf-reviews-fallback-icon" />
        <p className="pf-reviews-fallback-title pf-serif">Reseñas temporalmente no disponibles</p>
        <p className="pf-reviews-fallback-text pf-cormorant">
          En este momento no podemos mostrar las reseñas. Volvé a intentar más tarde.
        </p>
      </div>
    </div>
  )
}

function ReviewsCarousel({ reviews }: { reviews: PlaceReview[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setSelectedIndex(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  useEffect(() => {
    if (!api || reviews.length <= 1) return

    let timer: ReturnType<typeof setInterval> | undefined
    const root = api.rootNode()

    const play = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        if (api.canScrollNext()) api.scrollNext()
        else api.scrollTo(0)
      }, AUTOPLAY_MS)
    }

    const pause = () => clearInterval(timer)

    play()
    root.addEventListener("mouseenter", pause)
    root.addEventListener("mouseleave", play)
    root.addEventListener("pointerdown", pause)
    root.addEventListener("pointerup", play)

    return () => {
      pause()
      root.removeEventListener("mouseenter", pause)
      root.removeEventListener("mouseleave", play)
      root.removeEventListener("pointerdown", pause)
      root.removeEventListener("pointerup", play)
    }
  }, [api, reviews.length])

  if (reviews.length === 0) {
    return (
      <ReviewsEmptyFallback />
    )
  }

  return (
    <div className="pf-reviews-carousel">
      <Carousel
        opts={{ align: "start", loop: true, dragFree: false }}
        setApi={setApi}
        className="pf-reviews-carousel-inner"
      >
        <CarouselContent className="pf-reviews-track">
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="pf-reviews-slide !pl-0">
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {reviews.length > 1 ? (
        <div className="pf-reviews-controls pf-sans">
          <button
            type="button"
            className="pf-reviews-control-btn"
            aria-label="Reseña anterior"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <div className="pf-reviews-dots" role="tablist" aria-label="Reseñas">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                role="tab"
                aria-selected={selectedIndex === index}
                aria-label={`Reseña de ${review.authorName}`}
                className={`pf-reviews-dot${selectedIndex === index ? " is-active" : ""}`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="pf-reviews-control-btn"
            aria-label="Reseña siguiente"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function RestaurantReviews({
  textQuery,
  placeId,
  title,
  subtitle,
}: RestaurantReviewsProps) {
  const state = useGooglePlacesReviews({ textQuery, placeId })

  const overallRating = useMemo(() => {
    if (state.status !== "success") return null
    return state.data.rating
  }, [state])

  return (
    <section className="pf-reviews-section" aria-labelledby="restaurant-reviews-title">
      <div className="pf-reviews-header">
        <div>
          <div className="pf-section-label pf-sans pf-reveal">Opiniones</div>
          <h2 id="restaurant-reviews-title" className="pf-reveal pf-delay-1 pf-serif">
            {title}
          </h2>
        </div>
        <div className="pf-reviews-header-aside">
          {overallRating !== null ? (
            <div className="pf-reviews-overall pf-reveal pf-delay-2">
              <span className="pf-reviews-overall-value pf-serif">
                {overallRating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(overallRating)} />
              <span className="pf-reviews-overall-label pf-sans">en Google</span>
            </div>
          ) : null}
          <p className="pf-reviews-subtitle pf-cormorant pf-reveal pf-delay-2">{subtitle}</p>
        </div>
      </div>

      <div className="pf-reveal pf-delay-3">
        {state.status === "loading" ? <ReviewsSkeleton /> : null}
        {state.status === "error" ? <ReviewsErrorFallback /> : null}
        {state.status === "success" ? <ReviewsCarousel reviews={state.data.reviews} /> : null}
      </div>
    </section>
  )
}
