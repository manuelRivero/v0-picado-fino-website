"use client"

import { useEffect, useRef } from "react"
import { type MenuItem, type PublicBusiness, formatItemPrice } from "@/lib/api"
import { getRestaurantWhatsappLinks } from "@/lib/whatsapp"
import { BusinessHoursLocation } from "@/components/restaurant-landings/business-hours-location"
import { PicadoFinoOffersCarousel } from "@/components/restaurant-landings/picado-fino-offers-carousel"
import { GalleryLandingSection } from "@/components/restaurant-landings/gallery-landing-section"
import image1 from "@/public/images/FOTO-01.jpg"
import image3 from "@/public/images/FOTO-03.jpg"
import image4 from "@/public/images/FOTO-04.jpg"
import image5 from "@/public/images/FOTO-05.jpg"

type Props = {
  basePath: string
  otherRestaurantPath: string
  featuredItems: MenuItem[]
  business: PublicBusiness | null
}

export function PicadoFinoHome({ featuredItems, business }: Props) {
  const { reserva: waReserva, pedido: waPedido } = getRestaurantWhatsappLinks(
    "picado-fino",
    business?.whatsappPhoneNumber
  )
  const heroRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    heroRef.current?.classList.add("pf-hero-loaded")

    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("pf-visible") }),
      { threshold: 0.08 }
    )
    document.querySelectorAll(".pf-reveal").forEach(el => {
      const rect = (el as HTMLElement).getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add("pf-visible")
      } else {
        observer.observe(el)
      }
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="pf-page">

      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        id="hero"
        style={{ height: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}
      >
        <div
          ref={parallaxRef}
          style={{
            position: "absolute", inset: "-10%",
            backgroundImage: `url(${image1.src})`,
            backgroundSize: "cover", backgroundPosition: "center", willChange: "transform",
          }}
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(10,8,7,0.95) 0%, rgba(10,8,7,0.25) 50%, rgba(10,8,7,0.6) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 52px 80px", maxWidth: "780px" }}>
          <span className="pf-hero-label pf-sans" style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--brand-yellow)", marginBottom: "24px", display: "block" }}>
          Estacionamiento gratuito - Espacio para
          chicos - Atención familiar
          </span>
          <h1 className="pf-hero-title pf-serif" style={{ fontSize: "clamp(56px, 8vw, 110px)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--pf-cream)", marginBottom: "12px" }}>
            Picado<br /><em style={{ fontStyle: "italic", color: "var(--brand-yellow)" }}>Fino</em>
          </h1>
          <p className="pf-hero-subtitle pf-cormorant" style={{ fontSize: "21px", fontWeight: 300, fontStyle: "italic", color: "var(--pf-body-text)", lineHeight: 1.65, marginBottom: "44px", maxWidth: "560px" }}>
            El lugar donde nos encanta ser tus anfitriones y hacerte sentir como en casa. Vení a disfrutar del verdadero asado argentino, en un ambiente ideal para compartir y con la calidez de nuestro servicio de siempre.
          </p>
          <div className="pf-hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <a href={waReserva} target="_blank" rel="noopener noreferrer" className="pf-btn-primary pf-sans">
              Reservar mesa
            </a>
            <a href={waPedido} target="_blank" rel="noopener noreferrer" className="pf-btn-primary pf-sans">
              Hacer pedido
            </a>
            <a href="#menu" className="pf-btn-primary pf-sans">Ver menú</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "40px", right: "52px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div className="pf-scroll-pulse" style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, var(--brand-yellow), transparent)" }} />
          <span className="pf-sans" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pf-body-text)", writingMode: "vertical-rl", opacity: 0.4 }}>Scroll</span>
        </div>
      </section>

      {/* ===== IDENTIDAD ===== */}
      <section className="le-experiencia" id="experiencia">
        <div className="le-menu-intro">
          <div className="pf-section-label pf-sans pf-reveal">La experiencia</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            El ritual del<br /><em>compartir</em>
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            En cada plato servimos una historia. Desde el fuego que no descansa hasta la harina que amasamos cada mañana, seleccionamos ingredientes reales para crear momentos extraordinarios. Te invitamos a conocer un camino de sabores diseñado para gratificar todos tus sentidos.
          </p>
          <div className="pf-identidad-features pf-reveal pf-delay-3">
            {[
              ["01", "Bebidas & Entradas", "El brindis ideal con etiquetas emblemáticas y nuestras entradas más clásicas."],
              ["02", "Parrilla", "Cortes seleccionados y fuego lento para honrar la tradición del asado."],
              ["03", "Pastas Caseras", "Orgullo artesanal: amasadas a mano cada mañana con dedicación diaria."],
              ["04", "Pizzanesas", "Sabor y abundancia para compartir, con el toque único de nuestra cocina."],
              ["05", "Postres, el final", "El broche de oro dulce para que tu visita sea inolvidable."],
            ].map(([num, name, desc]) => (
              <div key={num} className="pf-feature-row">
                <span className="pf-feature-num pf-serif">{num}</span>
                <div className="pf-feature-content">
                  <span className="pf-feature-name pf-sans">{name}</span>
                  {desc ? <p className="pf-feature-desc pf-cormorant">{desc}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MENU ===== */}
      <section className="pf-menu-section" id="menu">
        <div className="pf-menu-header">
          <div>
            <div className="pf-section-label pf-sans pf-reveal">Menú</div>
            <h2 className="pf-reveal pf-delay-1 pf-serif">
              Los mejores<br />cortes de la<br /><em>Argentina</em>
            </h2>
          </div>
          <p className="pf-menu-header-text pf-cormorant pf-reveal pf-delay-2">
            Trabajamos directamente con ganaderos que comparten nuestra visión de calidad. Cada corte ha sido seleccionado y madurado con el cuidado que merece.
          </p>
        </div>
        <div className="pf-menu-grid pf-reveal">
          {featuredItems.map((item) => (
            <div key={item.id} className="pf-menu-item">
              <div>
                <div className="pf-menu-item-name pf-serif">{item.name}</div>
                <div className="pf-menu-item-desc pf-cormorant">{item.description}</div>
              </div>
              <div className="pf-menu-item-price pf-serif">{formatItemPrice(item)}</div>
            </div>
          ))}
        </div>
      </section>

      {business ? <BusinessHoursLocation business={business} /> : null}

      {/* ===== EXPERIENCIA ===== */}
      <section className="pf-experiencia">
        <div className="pf-section-label pf-sans pf-reveal">Lo que ofrecemos</div>
        <h2 className="pf-reveal pf-delay-1 pf-serif">
          Pensado para tu<br /><em>Comodidad</em>
        </h2>
        <p className="pf-experiencia-intro pf-cormorant pf-reveal pf-delay-2">
          En Picado Fino, los detalles hacen la diferencia. Queremos que tu única preocupación sea disfrutar del momento.
        </p>
        <div className="pf-reveal pf-delay-3">
          <PicadoFinoOffersCarousel />
        </div>
      </section>

      {/* ===== GALERÍA ===== */}
      <GalleryLandingSection slug="picado-fino" />

      {/* ===== RESERVA CTA ===== */}
      <section className="pf-reserva-cta" id="reserva">
        <div className="pf-reserva-cta-bg" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image3.src} alt="" className="pf-reserva-cta-bg-img" style={{ width: "100%" }} />
        </div>
        <div className="pf-reserva-cta-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>Reservas</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">Tu lugar en nuestra<br /><em>mesa</em></h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Nos encanta recibirte. Asegurá tu espacio y dejanos preparar todo para que tu única tarea sea disfrutar.
          </p>
          <a href={waReserva} target="_blank" rel="noopener noreferrer" className="pf-btn-amber pf-sans pf-reveal pf-delay-3">
            Hacer una reserva
          </a>
        </div>
      </section>

      {/* ===== PEDIDO A DOMICILIO CTA (misma estructura que reservas) ===== */}
      <section className="pf-delivery-cta" id="pedido">
        <div className="pf-delivery-cta-bg" />
        <div className="pf-delivery-cta-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>A domicilio</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">Picadofino en tu<br /><em>casa</em></h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Si preferís la intimidad de tu propio espacio, llevamos la parrilla con el mismo estándar de sala: cortes seleccionados, preparación impecable y el ritual Picado Fino hasta donde vos elijas recibirlo.
          </p>
          <a href={waPedido} target="_blank" rel="noopener noreferrer" className="pf-btn-amber pf-sans pf-reveal pf-delay-3">
            Hacer pedido por WhatsApp
          </a>
        </div>
      </section>

    </div>
  )
}
