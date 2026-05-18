"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { type MenuItem, type PublicBusiness, whatsappMeUrl } from "@/lib/api"
import { LA_ESQUINA_EXPERIENCE_ITEMS } from "@/lib/la-esquina-experience"
import { BusinessHoursLocation } from "@/components/restaurant-landings/business-hours-location"
import { LandingMenuSection } from "@/components/restaurant-landings/landing-menu-section"
import image1 from "@/public/images/01-esquina.jpg"
import image2 from "@/public/images/02-esquina.jpg"
import { GalleryLandingSection } from "@/components/restaurant-landings/gallery-landing-section"

const MSG_RESERVA = "Hola quiero reservar una mesa en La Esquina de Picado"
const MSG_WHATSAPP = "Hola quiero hacer un pedido en La Esquina de Picado"
const MSG_PEDIDO =
  "Hola quiero un pedido para llevar o a domicilio en La Esquina de Picado"

const FALLBACK_WHATSAPP_RESERVA =
  "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa%20en%20La%20Esquina%20de%20Picado"

const FALLBACK_WHATSAPP =
  "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20en%20La%20Esquina"

const FALLBACK_PEDIDO =
  "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20un%20pedido%20para%20llevar%20o%20a%20domicilio%20en%20La%20Esquina"

type Props = {
  basePath: string
  otherRestaurantPath: string
  menuItems: MenuItem[]
  business: PublicBusiness | null
}

export function LaEsquinaHome({ basePath, otherRestaurantPath, menuItems, business }: Props) {
  const waReserva = whatsappMeUrl(business?.whatsappPhoneNumber, MSG_RESERVA) ?? FALLBACK_WHATSAPP_RESERVA
  const waGeneral = whatsappMeUrl(business?.whatsappPhoneNumber, MSG_WHATSAPP) ?? FALLBACK_WHATSAPP
  const waPedido = whatsappMeUrl(business?.whatsappPhoneNumber, MSG_PEDIDO) ?? FALLBACK_PEDIDO
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
    <div className="pf-page le-page">

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
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(12,10,8,0.95) 0%, rgba(12,10,8,0.2) 85%, rgba(12,10,8,0.55) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 52px 80px", maxWidth: "780px" }}>
          <span className="pf-hero-label pf-sans" style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--brand-yellow)", marginBottom: "24px", display: "block" }}>
          Delivery – Take away – clasicos al
          paso - cafeteria
          </span>
          <h1 className="pf-hero-title pf-serif" style={{ fontSize: "clamp(52px, 7.5vw, 106px)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.02em", color: "var(--pf-cream)", marginBottom: "12px" }}>
            La Esquina<br />de <em style={{ fontStyle: "italic", color: "var(--brand-yellow)" }}>Picado</em>
          </h1>
          <p className="pf-hero-subtitle pf-cormorant" style={{ fontSize: "20px", fontWeight: 300, fontStyle: "italic", color: "var(--pf-body-text)", lineHeight: 1.65, marginBottom: "44px", maxWidth: "500px" }}>
Rotiseria, minutas y delivery con la calidad de Picado Fino. Sabores clásicos y  cocina al paso en el corazón de Rosario.           </p>
          <div className="pf-hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <a href={waReserva} target="_blank" rel="noopener noreferrer" className="pf-btn-primary pf-sans">
              Reservar mesa
            </a>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="pf-btn-primary pf-sans">
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

      {/* ===== PROPUESTA ===== */}
      <section className="le-propuesta">
        <div className="le-propuesta-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>Quiénes somos</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            Mismo equipo, misma pasión,<br />pero al ritmo de la ciudad.
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Llevamos los grandes clásicos de Picado al formato rotisería: sándwiches calientes que son un fuego, pizzas con mucha muzzarella y minutas al paso hechas con ingredientes reales. Diseñamos una propuesta potente de Delivery y Take Away para que el sabor extraordinario te acompañe donde vayas.
          </p>
          <div className="le-prop-tags pf-reveal pf-delay-3">
            {["Delivery Propio", "Delivery por Apps", "Take Away", "Espacio en el Local"].map(tag => (
              <span key={tag} className="le-prop-tag pf-sans">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LA EXPERIENCIA (contenido editorial fijo) ===== */}
      <section className="le-experiencia" id="experiencia">
        <div className="le-menu-intro">
          <div className="pf-section-label pf-sans pf-reveal">La experiencia</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            Sabor Urbano,<br />Placer a lo Grande
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Mismo equipo, misma pasión, pero al ritmo de la ciudad. En La Esquina cocinamos pensando en grande y para compartir. Te presentamos a los verdaderos pesos pesados de nuestra carta, diseñados para devorar solos o en compañía.
          </p>
          <div className="pf-identidad-features pf-reveal pf-delay-3">
            {LA_ESQUINA_EXPERIENCE_ITEMS.map(([num, name, desc]) => (
              <div key={num} className="pf-feature-row">
                <span className="pf-feature-num pf-serif">{num}</span>
                <div className="pf-feature-content">
                  <span className="pf-feature-name pf-sans">{name}</span>
                  <p className="pf-feature-desc pf-cormorant">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="le-menu-casual le-landing-menu-section" id="menu">
        <div className="le-menu-intro le-menu-intro--compact">
          <div className="pf-section-label pf-sans pf-reveal">Menú</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            Nuestra carta<br /><em>al día</em>
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Precios y platos actualizados desde nuestro sistema. Elegí una categoría y armá tu pedido.
          </p>
        </div>
        <LandingMenuSection
          items={menuItems}
          menuPageHref={`${basePath}/menu`}
          variant="list"
        />
      </section>

      {business ? <BusinessHoursLocation business={business} /> : null}

      <GalleryLandingSection slug="la-esquina" className="le-ambiente" />

      {/* ===== RESERVA CTA ===== */}
      <section className="pf-reserva-cta" id="reserva">
        <div className="pf-reserva-cta-bg" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image2.src} alt="" className="pf-reserva-cta-bg-img" style={{ width: "100%" }} />
        </div>
        <div className="pf-reserva-cta-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>Reservas</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">Tu lugar en nuestro<br /><em>local</em></h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Vení a disfrutar en el salón. Reservá tu mesa y dejanos preparar todo para que tu única tarea sea disfrutar del momento.
          </p>
          <a href={waReserva} target="_blank" rel="noopener noreferrer" className="pf-btn-amber pf-sans pf-reveal pf-delay-3">
            Hacer una reserva
          </a>
        </div>
      </section>

      {/* ===== PEDIDO A DOMICILIO / PARA LLEVAR (misma estructura que Picado Fino) ===== */}
      <section className="pf-delivery-cta" id="pedido">
        <div className="pf-delivery-cta-bg" />
        <div className="pf-delivery-cta-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>Take away</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">¿Con hambre?<br />Pedir es así de fácil</h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Elegí el canal que te quede más cómodo y nosotros nos encargamos del resto. Tu plato favorito está a solo un clic.
          </p>
          <a href={waPedido} target="_blank" rel="noopener noreferrer" className="pf-btn-amber pf-sans pf-reveal pf-delay-3">
            Hacer pedido por WhatsApp
          </a>
        </div>
      </section>

      {/* ===== CTA CRUCE → Picado Fino — desactivado temporalmente ===== */}
      {false && (
      <section className="le-cta-cruce">
        <div className="le-cta-cruce-left pf-reveal">
          <div className="pf-section-label pf-sans">¿Buscás algo más?</div>
          <h2 className="pf-serif">Conocé <em>Picado Fino</em></h2>
          <p className="pf-cormorant">
            Para las ocasiones especiales existe Picado Fino, nuestra experiencia fine dining donde el asado argentino alcanza su máxima expresión.
          </p>
          <Link href={otherRestaurantPath} className="pf-btn-cream pf-sans">
            Descubrir Picado Fino
          </Link>
        </div>
        <div className="le-cta-cruce-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&q=80" alt="Picado Fino fine dining" />
        </div>
      </section>
      )}

    </div>
  )
}
