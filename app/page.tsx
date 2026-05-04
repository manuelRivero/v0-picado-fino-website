"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const marqueeItems = [
  "Fuego Auténtico",
  "Pasión Sin Atajos",
  "Tradición Viva",
  "Quebracho & Brasas",
  "Rosario, Argentina",
]

export default function HomePage() {
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

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("pf-visible")
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll(".pf-reveal").forEach(el => {
      const rect = (el as HTMLElement).getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add("pf-visible")
      } else {
        revealObserver.observe(el)
      }
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      revealObserver.disconnect()
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
          className="pf-hero-image"
          style={{
            position: "absolute",
            inset: "-10%",
            backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to top, rgba(10,8,7,0.92) 0%, rgba(10,8,7,0.3) 50%, rgba(10,8,7,0.5) 100%), linear-gradient(to right, rgba(10,8,7,0.4) 0%, transparent 60%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, padding: "0 52px 80px", maxWidth: "900px" }}>
          <p className="pf-hero-label pf-sans" style={{ fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--pf-amber)", marginBottom: "24px" }}>
            Rosario · Parrilla Argentina
          </p>
          <h1 className="pf-hero-title pf-serif" style={{ fontSize: "clamp(64px, 9vw, 130px)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--pf-cream)", marginBottom: "32px" }}>
            Picado<br /><em style={{ fontStyle: "italic", color: "var(--pf-amber-light)" }}>Fino</em>
          </h1>
          <p className="pf-hero-subtitle pf-cormorant" style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: "var(--pf-body-text)", maxWidth: "480px", lineHeight: 1.5, marginBottom: "48px" }}>
            Tradición, fuego y pasión. Dos experiencias gastronómicas únicas para cada momento.
          </p>
          <div className="pf-hero-ctas" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a href="#restaurantes" className="pf-btn-primary pf-sans">Descubrir</a>
            <a href="#historia" className="pf-btn-ghost pf-sans">
              <span className="pf-arrow" />
              Nuestra historia
            </a>
          </div>
        </div>
        <div className="pf-hero-scroll" style={{ position: "absolute", bottom: "40px", right: "52px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div className="pf-scroll-pulse" style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, var(--pf-amber), transparent)" }} />
          <span className="pf-sans" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pf-body-text)", writingMode: "vertical-rl", opacity: 0.5 }}>Scroll</span>
        </div>
      </section>

      {/* ===== MANIFIESTO ===== */}
      <section className="pf-manifiesto">
        <div>
          <div className="pf-section-label pf-sans pf-reveal">Manifiesto</div>
          <div className="pf-manifiesto-stats">
            <div className="pf-reveal pf-delay-1">
              <div className="pf-stat-number pf-serif">2<span>+</span></div>
              <div className="pf-stat-label pf-sans">Experiencias</div>
            </div>
            <div className="pf-reveal pf-delay-2">
              <div className="pf-stat-number pf-serif">100<span>%</span></div>
              <div className="pf-stat-label pf-sans">Fuego Real</div>
            </div>
            <div className="pf-reveal pf-delay-1">
              <div className="pf-stat-number pf-serif">0</div>
              <div className="pf-stat-label pf-sans">Atajos</div>
            </div>
            <div className="pf-reveal pf-delay-2">
              <div className="pf-stat-number pf-serif">∞</div>
              <div className="pf-stat-label pf-sans">Pasión</div>
            </div>
          </div>
        </div>
        <div className="pf-manifiesto-right">
          <h2 className="pf-reveal pf-serif">
            Donde la <em>tradición</em><br />se encuentra con<br />la experiencia.
          </h2>
          <p className="pf-manifiesto-text pf-cormorant pf-reveal pf-delay-1">
            Picado Fino nació de un sueño compartido: traer la esencia del asado argentino a espacios donde la tradición se encuentra con la experiencia contemporánea. Nuestra historia comenzó alrededor del fuego.
          </p>
          <p className="pf-manifiesto-text pf-cormorant pf-reveal pf-delay-2">
            Rechazamos los atajos. El tiempo, el fuego y el conocimiento son nuestros únicos aliados.
          </p>
        </div>
      </section>

      {/* ===== RESTAURANTES SPLIT ===== */}
      <section className="pf-restaurantes" id="restaurantes">
        <div className="pf-rest-divider" />

        <div className="pf-rest-panel">
          <div
            className="pf-rest-panel-bg"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80')" }}
          />
          <div className="pf-rest-panel-overlay" />
          <div className="pf-rest-panel-content">
            <span className="pf-rest-tag pf-sans">Fine Dining · Parrilla Premium</span>
            <h2 className="pf-rest-name pf-serif">Picado<br />Fino</h2>
            <p className="pf-rest-desc pf-cormorant">
              Una experiencia gastronómica sofisticada donde el asado argentino se eleva a su máxima expresión. Para ocasiones que merecen lo mejor.
            </p>
            <Link href="/picado-fino" className="pf-rest-cta pf-sans">
              Ver restaurante
              <svg className="pf-rest-arrow" width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M0 6H16M16 6L11 1M16 6L11 11" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="pf-rest-panel">
          <div
            className="pf-rest-panel-bg"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80')" }}
          />
          <div className="pf-rest-panel-overlay" />
          <div className="pf-rest-panel-content">
            <span className="pf-rest-tag pf-sans">Casual · Rápido · Accesible</span>
            <h2 className="pf-rest-name pf-serif">La Esquina<br />de Picado</h2>
            <p className="pf-rest-desc pf-cormorant">
              La misma calidad y pasión en un formato más relajado. Ideal para un almuerzo rápido o una salida con amigos sin formalismos.
            </p>
            <Link href="/la-esquina" className="pf-rest-cta pf-sans">
              Ver restaurante
              <svg className="pf-rest-arrow" width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M0 6H16M16 6L11 1M16 6L11 11" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="pf-filosofia-marquee">
        <div className="pf-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((text, i) => (
            <div key={i} className="pf-marquee-item">
              <span className="pf-marquee-text pf-serif">{text}</span>
              <div className="pf-marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== HISTORIA ===== */}
      <section className="pf-historia" id="historia">
        <div className="pf-historia-image-wrap pf-reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=900&q=80"
            alt="Parrilla argentina"
          />
          <div className="pf-historia-image-accent" />
        </div>
        <div className="pf-historia-text">
          <div className="pf-section-label pf-sans pf-reveal">Nuestro origen</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            Donde nace<br />la <em>tradición</em>
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Picado Fino nació de un sueño compartido: traer la esencia del asado argentino a espacios donde la tradición se encuentra con la experiencia contemporánea.
          </p>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Nuestra historia comenzó alrededor del fuego, donde cada corte de carne cuenta una historia.
          </p>
          <blockquote className="pf-historia-quote pf-reveal pf-delay-3">
            <p className="pf-serif">"El fuego no miente. La carne tampoco."</p>
          </blockquote>
        </div>
      </section>

      {/* ===== VALORES ===== */}
      <section className="pf-valores">
        <div className="pf-section-label pf-sans pf-reveal">Lo que nos define</div>
        <h2 className="pf-reveal pf-delay-1 pf-serif">Creemos en<br />lo <em>auténtico</em></h2>
        <div className="pf-valores-grid">
          <div className="pf-valor-item pf-reveal">
            <div className="pf-valor-num pf-serif">01</div>
            <h3 className="pf-valor-title pf-serif">Fuego Auténtico</h3>
            <p className="pf-valor-text pf-cormorant">Cocinamos sobre brasas de quebracho, respetando la tradición del asado argentino en cada servicio.</p>
          </div>
          <div className="pf-valor-item pf-reveal pf-delay-1">
            <div className="pf-valor-num pf-serif">02</div>
            <h3 className="pf-valor-title pf-serif">Pasión por la Calidad</h3>
            <p className="pf-valor-text pf-cormorant">Seleccionamos cada ingrediente con dedicación, trabajando directamente con productores locales.</p>
          </div>
          <div className="pf-valor-item pf-reveal pf-delay-2">
            <div className="pf-valor-num pf-serif">03</div>
            <h3 className="pf-valor-title pf-serif">Experiencia Compartida</h3>
            <p className="pf-valor-text pf-cormorant">Creemos que la mejor comida se disfruta en compañía. Cada mesa es una celebración.</p>
          </div>
        </div>
      </section>

      {/* ===== EQUIPO ===== */}
      <section className="pf-equipo" id="equipo">
        <div className="pf-equipo-header">
          <div>
            <div className="pf-section-label pf-sans pf-reveal">El equipo</div>
            <h2 className="pf-reveal pf-delay-1 pf-serif">
              Las personas<br />detrás del <em>fuego</em>
            </h2>
          </div>
          <p className="pf-equipo-header-text pf-cormorant pf-reveal pf-delay-2">
            Trabajamos con los mejores porque creemos que la excelencia se contagia. Nuestro equipo comparte una misma obsesión: la calidad sin concesiones.
          </p>
        </div>
        <div className="pf-equipo-grid">
          {[
            { role: "Maestro Parrillero", label: "foto chef\nprincipal" },
            { role: "Sous Chef", label: "foto sous\nchef" },
            { role: "Sommelier", label: "foto sommelier\n/ bartender" },
          ].map(({ role, label }, i) => (
            <div key={i} className={`pf-chef-card pf-reveal${i > 0 ? ` pf-delay-${i}` : ""}`}>
              <div className="pf-chef-placeholder">
                <span className="pf-chef-placeholder-text pf-sans">{label}</span>
              </div>
              <div className="pf-chef-info">
                <div className="pf-chef-role pf-sans">{role}</div>
                <div className="pf-chef-name pf-serif">Nombre<br />del Chef</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="pf-cta-final" id="reservas">
        <div className="pf-cta-final-bg" />
        <div className="pf-cta-final-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>Reservas</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            Encontrá tu<br /><em>experiencia</em>
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Ya sea una cena elegante o un encuentro casual,<br />
            tenemos el lugar perfecto para vos.
          </p>
          <div className="pf-cta-buttons pf-reveal pf-delay-3">
            <Link href="/picado-fino" className="pf-btn-amber pf-sans">Picado Fino</Link>
            <Link href="/la-esquina" className="pf-btn-outline pf-sans">La Esquina de Picado</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
