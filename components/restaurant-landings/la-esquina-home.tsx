"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const WHATSAPP_URL =
  "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20en%20La%20Esquina"

const WHATSAPP_PEDIDO_URL =
  "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20un%20pedido%20para%20llevar%20o%20a%20domicilio%20en%20La%20Esquina"

type Props = { basePath: string; otherRestaurantPath: string }

export function LaEsquinaHome({ otherRestaurantPath }: Props) {
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
            backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85')",
            backgroundSize: "cover", backgroundPosition: "center", willChange: "transform",
          }}
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(12,10,8,0.95) 0%, rgba(12,10,8,0.2) 85%, rgba(12,10,8,0.55) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 52px 80px", maxWidth: "780px" }}>
          <span className="pf-hero-label pf-sans" style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--pf-amber)", marginBottom: "24px", display: "block" }}>
            Casual · Rápido · Accesible · Rosario
          </span>
          <h1 className="pf-hero-title pf-serif" style={{ fontSize: "clamp(52px, 7.5vw, 106px)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.02em", color: "var(--pf-cream)", marginBottom: "12px" }}>
            La Esquina<br />de <em style={{ fontStyle: "italic", color: "var(--pf-amber-light)" }}>Picado</em>
          </h1>
          <p className="pf-hero-subtitle-dim pf-serif" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400, fontStyle: "italic", color: "var(--pf-cream)", lineHeight: 1, marginBottom: "36px" }}>
            Sin formalismos.
          </p>
          <p className="pf-hero-subtitle pf-cormorant" style={{ fontSize: "20px", fontWeight: 300, fontStyle: "italic", color: "var(--pf-body-text)", lineHeight: 1.65, marginBottom: "44px", maxWidth: "500px" }}>
            La misma calidad y pasión de Picado Fino en un formato más relajado. Ideal para un almuerzo, una salida con amigos o cuando querés el mejor asado sin ceremonias.
          </p>
          <div className="pf-hero-ctas" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pf-btn-amber pf-sans" style={{ color: "var(--pf-cream)" }}>
              Ir a WhatsApp
            </a>
            <a href="#menu" className="pf-btn-ghost pf-sans">Ver carta</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "40px", right: "52px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div className="pf-scroll-pulse" style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, var(--pf-amber), transparent)" }} />
          <span className="pf-sans" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pf-body-text)", writingMode: "vertical-rl", opacity: 0.4 }}>Scroll</span>
        </div>
      </section>

      {/* ===== PROPUESTA ===== */}
      <section className="le-propuesta">
        <div className="le-propuesta-text">
          <div className="pf-section-label pf-sans pf-reveal">Quiénes somos</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            La misma pasión,<br />sin los<br /><em>formalismos</em>
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            La Esquina de Picado nació para que la experiencia de una buena parrilla no sea solo para ocasiones especiales. Aquí el fuego y la calidad son protagonistas todos los días.
          </p>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Compartimos el mismo ADN que Picado Fino: cortes seleccionados, brasas de quebracho y cero atajos. Solo que en un formato más tuyo, más de todos los días.
          </p>
          <div className="le-prop-tags pf-reveal pf-delay-3">
            {["Rápido", "Accesible", "Sin Reserva", "Carry Out", "Mediodía", "Para Llevar"].map(tag => (
              <span key={tag} className="le-prop-tag pf-sans">{tag}</span>
            ))}
          </div>
        </div>
        <div className="le-propuesta-right pf-reveal pf-delay-1">
          {[
            { num: "1", suffix: "+", label: "Locación en Rosario" },
            { num: "0", suffix: "", label: "Atajos en la cocina" },
            { num: "∞", suffix: "", label: "Motivos para volver" },
          ].map(({ num, suffix, label }) => (
            <div key={label} className="le-propuesta-stat">
              <div className="le-stat-big pf-serif">{num}<span>{suffix}</span></div>
              <div className="le-stat-desc pf-sans">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MENU CASUAL ===== */}
      <section className="le-menu-casual" id="menu">
        <div className="le-menu-header">
          <div>
            <div className="pf-section-label pf-sans pf-reveal">La carta</div>
            <h2 className="pf-reveal pf-delay-1 pf-serif">
              Directo al<br />punto,<br /><em>sin vueltas</em>
            </h2>
          </div>
          <p className="pf-cormorant pf-reveal pf-delay-2" style={{ fontSize: "19px", fontStyle: "italic", color: "var(--pf-body-text)", lineHeight: 1.7, alignSelf: "end" }}>
            Todo lo que necesitás de una buena parrilla sin complicaciones. Menú del día, combos y clásicos que siempre están.
          </p>
        </div>
        <div className="le-menu-list pf-reveal">
          {[
            { num: "01", name: "Choripán de la Casa", desc: "Chorizo artesanal, chimichurri, pan brioche a la parrilla", price: "$-/-" },
            { num: "02", name: "Combo Almuerzo", desc: "Corte del día + ensalada + bebida + postre", price: "$-/-" },
            { num: "03", name: "Entraña al Pan", desc: "Entraña tierna, provenzal, ciabatta tostada", price: "$-/-" },
            { num: "04", name: "Media Tabla Parrillera", desc: "Morcilla, chorizo, vacío, mollejas — para compartir", price: "$-/-" },
            { num: "05", name: "Bife a la Cruz", desc: "Cocción lenta, jugoso, papas rústicas", price: "$-/-" },
            { num: "06", name: "Para Llevar: Asado Familiar", desc: "Tira de asado + vacío + chorizos + ensalada — hasta 4 personas", price: "$-/-" },
          ].map(({ num, name, desc, price }) => (
            <div key={num} className="le-menu-row">
              <span className="le-menu-row-num pf-serif">{num}</span>
              <div>
                <div className="le-menu-row-name pf-serif">{name}</div>
                <div className="le-menu-row-desc pf-cormorant">{desc}</div>
              </div>
              <div className="le-menu-row-price pf-serif">{price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AMBIENTE ===== */}
      <section className="le-ambiente">
        <div className="le-ambiente-intro">
          <div>
            <div className="pf-section-label pf-sans pf-reveal">El ambiente</div>
            <h2 className="pf-reveal pf-delay-1 pf-serif">
              Tu lugar de<br />todos los<br /><em>días</em>
            </h2>
          </div>
          <p className="pf-cormorant pf-reveal pf-delay-2" style={{ fontSize: "20px", fontStyle: "italic", color: "var(--pf-body-text)", lineHeight: 1.7, alignSelf: "end" }}>
            Espacios diseñados para que te sientas como en casa. Cómodos, vivos, con el olor a parrilla que te lleva directo a la mesa.
          </p>
        </div>
        <div className="le-ambiente-mosaic">
          <div className="le-mosaic-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="le-mosaic-img" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" alt="La Esquina interior" />
          </div>
          <div className="le-mosaic-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="le-mosaic-img" src="https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=75" alt="Plato casual" />
          </div>
          <div className="le-mosaic-item">
            <div className="le-mosaic-placeholder"><span>{"foto\nexterior\nlocal"}</span></div>
          </div>
          <div className="le-mosaic-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="le-mosaic-img" src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=900&q=80" alt="Parrilla La Esquina" />
          </div>
          <div className="le-mosaic-item">
            <div className="le-mosaic-placeholder"><span>{"foto\nmostrador\ntake out"}</span></div>
          </div>
        </div>
      </section>

      {/* ===== PEDIDO A DOMICILIO / PARA LLEVAR (misma estructura que Picado Fino) ===== */}
      <section className="pf-delivery-cta" id="pedido">
        <div className="pf-delivery-cta-bg" />
        <div className="pf-delivery-cta-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>A domicilio</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">Pedí y listo,<br /><em>nosotros te lo acercamos</em></h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Cuando no podés pasar por el mostrador, igual comés bien: mandanos un WhatsApp, armamos tu pedido al toque — para llevar o a domicilio — con el mismo fuego de siempre, sin protocolos ni vueltas.
          </p>
          <a href={WHATSAPP_PEDIDO_URL} target="_blank" rel="noopener noreferrer" className="pf-btn-amber pf-sans pf-reveal pf-delay-3">
            Hacer pedido por WhatsApp
          </a>
        </div>
      </section>

      {/* ===== CTA CRUCE → Picado Fino ===== */}
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

    </div>
  )
}
