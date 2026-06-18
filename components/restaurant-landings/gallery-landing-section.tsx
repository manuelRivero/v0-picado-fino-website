"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { RestaurantGallery } from "@/components/restaurant-gallery"
import { getGalleryConfig } from "@/lib/gallery-data"
import type { RestaurantSlug } from "@/lib/restaurants"

type Props = {
  slug: RestaurantSlug
  className?: string
}

export function GalleryLandingSection({ slug, className }: Props) {
  const { images, landing } = getGalleryConfig(slug)
  const { eyebrow, titleBefore, prompts, titleAfter, ariaLabel } = landing
  const [promptIndex, setPromptIndex] = useState(0)
  const pausedRef = useRef(false)

  const nextPrompt = useCallback(() => {
    setPromptIndex((i) => (i + 1) % prompts.length)
  }, [prompts.length])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) nextPrompt()
    }, 4500)
    return () => clearInterval(interval)
  }, [nextPrompt])

  const sectionClass = ["pf-galeria-section", className].filter(Boolean).join(" ")

  return (
    <section className={sectionClass} aria-label={ariaLabel}>
      <header
        className="restaurant-gallery-intro"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
        onFocusCapture={() => { pausedRef.current = true }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            pausedRef.current = false
          }
        }}
      >
        <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>
          {eyebrow}
        </div>
        <button
          type="button"
          className="restaurant-gallery-intro__title pf-serif pf-reveal pf-delay-1"
          onClick={nextPrompt}
          aria-label={`${titleBefore}${prompts[promptIndex]}${titleAfter}`}
        >
          {titleBefore}
          <em key={promptIndex} className="restaurant-gallery-intro__prompt">
            {prompts[promptIndex]}
          </em>
          {titleAfter}
        </button>
      </header>
      <RestaurantGallery images={images} />
    </section>
  )
}
