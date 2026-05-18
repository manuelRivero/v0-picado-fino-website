"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import type { StaticImageData } from "next/image"
import image1 from "@/public/images/1.jpg"
import image2 from "@/public/images/2.jpg"
import image3 from "@/public/images/3.jpg"
import equipoCocina from "@/public/images/FOTO-04.jpg"
import equipoFuego  from "@/public/images/FOTO-05.jpg"
import equipoExperiencia from "@/public/images/FOTO-06.jpg"
import ctaFinalBg from "@/public/images/FOTO-7.jpg"

type EquipoCategory = {
  image: StaticImageData
  imageAlt: string
  categoryTitle: string
  categoryBody: string
}

const equipoCategories: EquipoCategory[] = [
  {
    image: equipoFuego,
    imageAlt: "Maestros del fuego en la parrilla",
    categoryTitle: "Maestros del Fuego",
    categoryBody:
      "Son los guardianes de nuestra\ntradición, dominan el arte de las\nbrasas para que cada corte llegue a la\nmesa en su punto exacto. Es el oficio\nllevado a su máxima expresión.",
  },
  {
    image: equipoCocina,
    imageAlt: "Equipo de cocina preparando platos",
    categoryTitle: "El Corazón de la Cocina",
    categoryBody:
      "Donde la técnica se encuentra con la\ncreatividad. Nuestro equipo de cocina\ntransforma la materia prima en platos con\nidentidad. Hoy, celebramos la llegada de\nnuestras pastas caseras, elaboradas cada\ndía con manos artesanas y el compromiso de\nofrecer un sabor que se siente como en casa.",
  },
  {
    image: equipoExperiencia,
    imageAlt: "Personal de sala atendiendo a los comensales",
    categoryTitle: "Embajadores de la Experiencia",
    categoryBody:
      "Nuestros mozos y personal de atención al\ncliente son el puente entre nuestra cocina\ny tu mesa. Con la calidez rosarina que\nnos define, se encargan de que cada\nencuentro sea fluido, cercano y\nprofesional. Son los anfitriones que hacen\nque siempre quieras volver.",
  },
]

const marqueeItems = [
  "Hay equipo",
  "Que vuelvas nos gusta",
  "Compartiendo buenos momentos",
  "Seguimos buscando gente extraordinaria",
  "Parrilla restaurant",
  "Rotiseria, delivery y comida al paso",
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
            backgroundImage: `url(${image1.src})`,
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
          <h1 className="pf-hero-title pf-serif" style={{ fontSize: "clamp(64px, 9vw, 130px)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            <span style={{ color: "var(--brand-yellow)" }}>Picado</span><br /><em style={{ fontStyle: "italic", color: "#ffffff" }}>Fino</em>
          </h1>
          <p className="pf-hero-subtitle pf-cormorant" style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: "var(--pf-body-text)", maxWidth: "480px", lineHeight: 1.5, marginBottom: "48px" }}>
            Seguimos Construyendo mucho más que
            <br />
            un restaurante...
          </p>
          <div className="pf-hero-ctas" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a href="#restaurantes" className="pf-btn-primary pf-sans">Descubrir</a>
          </div>
        </div>
        <div className="pf-hero-scroll" style={{ position: "absolute", bottom: "40px", right: "52px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div className="pf-scroll-pulse" style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, var(--brand-yellow), transparent)" }} />
          <span className="pf-sans" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--pf-body-text)", writingMode: "vertical-rl", opacity: 0.5 }}>Scroll</span>
        </div>
      </section>

      {/* ===== MANIFIESTO ===== */}
      <section className="pf-manifiesto" id="manifiesto">
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
            style={{ backgroundImage: `url(${image2.src})` }}
          />
          <div className="pf-rest-panel-overlay" />
          <div className="pf-rest-panel-content">
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
            style={{ backgroundImage: `url(${image3.src})` }}
          />
          <div className="pf-rest-panel-overlay" />
          <div className="pf-rest-panel-content">
            <h2 className="pf-rest-name pf-serif">La Esquina<br />de Picado</h2>
            <p className="pf-rest-desc pf-cormorant">
Rotiseria, minutas y delivery con la calidad de Picado Fino. Sabores clásicos y  cocina al paso en el corazón de Rosario.
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

      {/* ===== HISTORIA (Nuestro origen) — desactivado temporalmente ===== */}
      {false && (
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
      )}

      {/* ===== VALORES ===== */}
      <section className="pf-valores" id="lo-que-nos-define">
        <div className="pf-section-label pf-sans pf-reveal">Lo que nos define</div>
        <h2 className="pf-reveal pf-delay-1 pf-serif">Creemos en<br />lo <em>auténtico</em></h2>
        <div className="pf-valores-grid">
          <div className="pf-valor-item pf-reveal">
            <div className="pf-valor-num pf-serif">01</div>
            <h3 className="pf-valor-title pf-serif">La Calidad como Origen</h3>
            <p className="pf-valor-text pf-cormorant">No hay secretos, hay selección. Elegimos cada corte y cada ingrediente con la obsesión de quien cocina para su familia. Desde nuestras brasas hasta el producto fresco de estación, el respeto por el insumo es nuestro primer compromiso.</p>
          </div>
          <div className="pf-valor-item pf-reveal pf-delay-1">
            <div className="pf-valor-num pf-serif">02</div>
            <h3 className="pf-valor-title pf-serif">El Arte de Reunirse</h3>
            <p className="pf-valor-text pf-cormorant">Creemos que la mesa es el escenario donde sucede lo mejor de la vida. Diseñamos nuestro servicio para ser ese refugio donde se celebran los reencuentros y se disfruta del sabor de lo compartido. Aquí, el tiempo se detiene.</p>
          </div>
          <div className="pf-valor-item pf-reveal pf-delay-2">
            <div className="pf-valor-num pf-serif">03</div>
            <h3 className="pf-valor-title pf-serif">Pasión en Sintonía</h3>
            <p className="pf-valor-text pf-cormorant">La excelencia no es el logro de uno solo, sino el ritmo de muchos. Somos un equipo que trabaja con orgullo detrás de escena para que cada detalle funcione con la precisión de un reloj y el calor de un hogar.</p>
          </div>
          <div className="pf-valor-item pf-reveal pf-delay-3">
            <div className="pf-valor-num pf-serif">04</div>
            <h3 className="pf-valor-title pf-serif">Tu Disfrute, Nuestra Meta</h3>
            <p className="pf-valor-text pf-cormorant">Nuestra mayor recompensa es verte volver. Trabajamos para superar tus expectativas en cada visita, cuidando desde la recepción hasta el último brindis, porque sabemos que cada vez que nos elegís, nos confiás un momento especial.</p>
          </div>
        </div>
      </section>

      {/* ===== EQUIPO ===== */}
      <section className="pf-equipo" id="equipo">
        <div className="pf-equipo-header">
          <div>
            <div className="pf-section-label pf-sans pf-reveal">El equipo</div>
            <h2 className="pf-reveal pf-delay-1 pf-serif">
              Personas extraordinaria.<br />Hay equipo.
            </h2>
            <p className="pf-equipo-header-text pf-cormorant pf-reveal pf-delay-2">
              En Picadofino y La Esquina no solo servimos comida; creamos momentos. Para lograrlo,
              reunimos personas extraordinarias que comparten una misma pasión: la excelencia sin
              excusas. Aquí, el talento individual se potencia en la fuerza del equipo.
            </p>
          </div>
        </div>
        <div className="pf-equipo-grid">
          {equipoCategories.map((item, i) => (
            <div key={item.categoryTitle} className={`pf-chef-card pf-reveal${i > 0 ? ` pf-delay-${i}` : ""}`}>
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 100%) 100vw, 33vw"
                className="pf-chef-photo"
              />
              <div className="pf-chef-info pf-chef-info--category">
                <div className="pf-chef-category-title pf-serif">{item.categoryTitle}</div>
                <p className="pf-chef-category-desc pf-cormorant">{item.categoryBody}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="pf-cta-final" id="reservas">
        <div
          className="pf-cta-final-bg"
          style={{ backgroundImage: `url(${ctaFinalBg.src})` }}
          aria-hidden
        />
        <div className="pf-cta-final-content">
          <div className="pf-section-label pf-sans pf-reveal" style={{ justifyContent: "center" }}>Reservas</div>
          <h2 className="pf-reveal pf-delay-1 pf-serif">
            Elegí tu propia<br /><em>experiencia</em>
          </h2>
          <p className="pf-reveal pf-delay-2 pf-cormorant">
            Dos locales, una misma pasión y equipo.<br />
            Te invitamos a ser parte de nuestra<br />
            historia. Elegí tu local preferido y dejanos<br />
            el resto a nosotros.
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
