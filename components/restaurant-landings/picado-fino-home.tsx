"use client"

import { useEffect, useRef } from "react"

const WHATSAPP_URL =
  "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa%20en%20Picado%20Fino"

const WHATSAPP_PEDIDO_URL =
  "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20a%20domicilio%20en%20Picado%20Fino"

type Props = { basePath: string; otherRestaurantPath: string }

export function PicadoFinoHome({ otherRestaurantPath }: Props) {
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
            backgroundImage: "url('https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1800&q=85')",
            backgroundSize: "cover", backgroundPosition: "center", willChange: "transform",
          }}
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(10,8,7,0.95) 0%, rgba(10,8,7,0.25) 50%, rgba(10,8,7,0.6) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 52px 80px", maxWidth: "780px" }}>
          <span className="pf-hero-label pf-sans" style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--pf-amber)", marginBottom: "24px", display: "block" }}>
            Fine Dining · Parrilla Premium · Rosario
          </span>
          <h1 className="pf-hero-title pf-serif" style={{ fontSize: "clamp(56px, 8vw, 110px)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--pf-cream)", marginBottom: "12px" }}>
            Picado<br /><em style={{ fontStyle: "italic", color: "var(--pf-amber-light)" }}>Fino</em>
          </h1>
          <p className="pf-hero-subtitle pf-cormorant" style={{ fontSize: "21px", fontWeight: 300, fontStyle: "italic", color: "var(--pf-body-text)", lineHeight: 1.65, marginBottom: "44px", maxWidth: "500px" }}>
            Una experiencia gastronómica sofisticada donde el asado argentino se eleva a su máxima expresión. Cortes premium, ambiente elegante y atención personalizada.
          </p>
          <div className="pf-hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pf-btn-primary pf-sans">
              Reservar mesa
            </a>
            <a href={WHATSAPP_PEDIDO_URL} target="_blank" rel="noopener noreferrer" className="pf-btn-primary pf-sans">
              Hacer pedido
            </a>
            <a href="#menu" className="pf-btn-ghost pf-sans">Ver menú</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "40px", right: "52px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div className="pf-scroll-pulse" style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, var(--pf-amber), transparent)" }} />
          <span className="pf-sans" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pf-body-text)", writingMode: "vertical-rl", opacity: 0.4 }}>Scroll</span>
        </div>
      </section>

      {/* ===== IDENTIDAD ===== */}
      <section className="pf-identidad">
        <div className="pf-identidad-text">
          <div className="pf-section-label pf-sans pf-reveal">La experiencia</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            El asado argentino<br />en su máxima<br /><em>expresión</em>
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Cada visita a Picado Fino es un ritual. Desde la selección de los cortes hasta el último ember del quebracho, cada detalle está pensado para crear un momento que perdura.
          </p>
          <div className="pf-identidad-features pf-reveal pf-delay-3">
            {[
              ["01", "Cortes Premium Seleccionados"],
              ["02", "Brasas de Quebracho Colorado"],
              ["03", "Carta de Vinos Curada"],
              ["04", "Atención Personalizada"],
              ["05", "Ambiente de Diseño"],
            ].map(([num, name]) => (
              <div key={num} className="pf-feature-row">
                <span className="pf-feature-num pf-serif">{num}</span>
                <span className="pf-feature-name pf-sans">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pf-identidad-image pf-reveal pf-delay-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=85" alt="Cortes premium Picado Fino" />
          <div className="pf-identidad-caption">
            <span className="pf-sans">Especialidad</span>
            <strong className="pf-serif">Bife de Chorizo</strong>
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
          {[
            { name: "Bife de Chorizo", desc: "Madurado 21 días, brasas de quebracho, chimichurri de la casa", price: "$-/-" },
            { name: "Entraña Fina", desc: "Corte seleccionado, marinada 12 horas, salsa criolla fresca", price: "$-/-" },
            { name: "Ojo de Bife", desc: "Premium angus, punto justo de brasa, sal patagónica", price: "$-/-" },
            { name: "Tira de Asado", desc: "Cocción lenta sobre brasas, jugosa por dentro, costras perfectas", price: "$-/-" },
            { name: "Mollejas al Disco", desc: "Tiernas y crocantes, limón, perejil, ajo", price: "$-/-" },
            { name: "Provoleta Artesanal", desc: "Queso provolone importado, orégano fresco, brasa suave", price: "$-/-" },
          ].map(({ name, desc, price }) => (
            <div key={name} className="pf-menu-item">
              <div>
                <div className="pf-menu-item-name pf-serif">{name}</div>
                <div className="pf-menu-item-desc pf-cormorant">{desc}</div>
              </div>
              <div className="pf-menu-item-price pf-serif">{price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXPERIENCIA ===== */}
      <section className="pf-experiencia">
        <div className="pf-section-label pf-sans pf-reveal">Lo que ofrecemos</div>
        <h2 className="pf-reveal pf-delay-1 pf-serif">Una noche que<br />no olvidarás</h2>
        <div className="pf-exp-grid">
          {[
            { title: "Sommelier en Sala", text: "Nuestra carta de vinos es cuidadosamente curada. Te acompañamos en cada elección para encontrar el maridaje perfecto." },
            { title: "Parrilla a la Vista", text: "El fuego es parte del espectáculo. Desde tu mesa podés ver cómo trabajan nuestros maestros parrilleros sobre las brasas." },
            { title: "Eventos Privados", text: "Salones privados para reuniones de negocios, celebraciones especiales y experiencias a medida para grupos." },
          ].map(({ title, text }, i) => (
            <div key={title} className={`pf-reveal${i > 0 ? ` pf-delay-${i}` : ""}`}>
              <div className="pf-exp-divider" />
              <div className="pf-exp-title pf-serif">{title}</div>
              <p className="pf-exp-text pf-cormorant">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GALERÍA ===== */}
      <section style={{ borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div className="pf-galeria-grid">
          <div className="pf-galeria-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pf-galeria-img" src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80" alt="Picado Fino interior" />
          </div>
          <div className="pf-galeria-item">
            <div className="pf-galeria-placeholder"><span>{"foto\nsalón\nprincipal"}</span></div>
          </div>
          <div className="pf-galeria-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pf-galeria-img" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=75" alt="Plato Picado Fino" />
          </div>
          <div className="pf-galeria-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pf-galeria-img" src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=75" alt="Parrilla" />
          </div>
          <div className="pf-galeria-item">
            <div className="pf-galeria-placeholder"><span>{"foto\nvinos\ncarta"}</span></div>
          </div>
        </div>
      </section>

      {/* ===== RESERVA CTA ===== */}
      <section className="pf-reserva-cta" id="reserva">
        <div className="pf-reserva-cta-bg" />
        <div className="pf-reserva-cta-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>Reservas</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">Reservá tu<br /><em>mesa</em></h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">Para ocasiones especiales o simplemente porque la vida merece celebrarse.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pf-btn-amber pf-sans pf-reveal pf-delay-3">
            Hacer una reserva
          </a>
        </div>
      </section>

      {/* ===== PEDIDO A DOMICILIO CTA (misma estructura que reservas) ===== */}
      <section className="pf-delivery-cta" id="pedido">
        <div className="pf-delivery-cta-bg" />
        <div className="pf-delivery-cta-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>A domicilio</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">El mismo ritual,<br /><em>en tu hogar</em></h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Si preferís la intimidad de tu propio espacio, llevamos la parrilla con el mismo estándar de sala: cortes seleccionados, preparación impecable y el ritual Picado Fino hasta donde vos elijas recibirlo.
          </p>
          <a href={WHATSAPP_PEDIDO_URL} target="_blank" rel="noopener noreferrer" className="pf-btn-amber pf-sans pf-reveal pf-delay-3">
            Hacer pedido por WhatsApp
          </a>
        </div>
      </section>

    </div>
  )
}
