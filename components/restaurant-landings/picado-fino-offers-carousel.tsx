"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const OFFERS = [
  {
    title: "Cochera Propia y Gratuita",
    text: "Contamos con estacionamiento exclusivo y vigilado para que tu visita comience con total tranquilidad.",
  },
  {
    title: "Espacio para chicos",
    text: "Diversión segura para los más chicos, tranquilidad absoluta para los grandes y todos pasen un momento extraordinario.",
  },
  {
    title: "Eventos Todo Incluido",
    text: "Celebraciones familiares o encuentros corporativos. Diseñamos menús con todo resuelto para que vos seas un invitado más en tu propio evento.",
  },
  {
    title: "Menú Ejecutivo",
    text: "Platos rápidos, nutritivos y con la calidad que nos caracteriza, ideales para tu pausa laboral.",
  },
  {
    title: "Delivery: Picado en tu Casa",
    text: "Consultá nuestras zonas de envío por WhatsApp y hacé tu pedido de forma fácil para disfrutar de tus platos favoritos sin salir de casa.",
  },
] as const

const AUTOPLAY_MS = 5500

export function PicadoFinoOffersCarousel() {
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
    if (!api) return

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
  }, [api])

  return (
    <div className="pf-exp-carousel">
      <Carousel
        opts={{ align: "start", loop: true, containScroll: "trimSnaps" }}
        setApi={setApi}
        className="pf-exp-carousel-inner"
      >
        <CarouselContent className="pf-exp-carousel-track">
          {OFFERS.map(({ title, text }) => (
            <CarouselItem key={title} className="pf-exp-carousel-slide !pl-0">
              <article className="pf-exp-card">
                <div className="pf-exp-divider" />
                <h3 className="pf-exp-title pf-serif">{title}</h3>
                <p className="pf-exp-text pf-cormorant">{text}</p>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="pf-exp-carousel-controls pf-sans">
        <button
          type="button"
          className="pf-exp-carousel-btn"
          aria-label="Anterior"
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <div className="pf-exp-carousel-dots" role="tablist" aria-label="Servicios">
          {OFFERS.map(({ title }, i) => (
            <button
              key={title}
              type="button"
              role="tab"
              aria-selected={selectedIndex === i}
              aria-label={title}
              className={`pf-exp-carousel-dot${selectedIndex === i ? " is-active" : ""}`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="pf-exp-carousel-btn"
          aria-label="Siguiente"
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
