"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const restaurants = [
  {
    href: "/picado-fino",
    navLabel: "Picado Fino",
    whatsapp: "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa%20en%20Picado%20Fino",
    cta: "Reservar",
    whatsappPedido:
      "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20a%20domicilio%20en%20Picado%20Fino",
    ctaPedido: "Hacer pedido",
  },
  {
    href: "/la-esquina",
    navLabel: "La Esquina de Picado",
    whatsapp: "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20en%20La%20Esquina",
    cta: "Ir a WhatsApp",
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isHomepage = pathname === "/"
  const currentRestaurant = restaurants.find(r => pathname.startsWith(r.href))

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isHomepage) {
    return (
      <nav className={isScrolled ? "scrolled" : ""}>
        <Link href="/" className="nav-logo">Picadofino</Link>
        <ul className="nav-links">
          <li><a href="#restaurantes">Restaurantes</a></li>
          <li><a href="#historia">Nosotros</a></li>
          <li><a href="#equipo">Equipo</a></li>
        </ul>
      </nav>
    )
  }

  if (currentRestaurant) {
    return (
      <nav className={`nav-restaurant${isScrolled ? " scrolled" : ""}`}>
        <Link href="/" className="nav-back">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <path d="M18 6H2M2 6L7 1M2 6L7 11" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Picadofino
        </Link>
        <span className="nav-logo">{currentRestaurant.navLabel}</span>
        {"whatsappPedido" in currentRestaurant && currentRestaurant.whatsappPedido ? (
          <div className="nav-restaurant-ctas">
            <a
              href={currentRestaurant.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-reserve"
            >
              {currentRestaurant.cta}
            </a>
            <a
              href={currentRestaurant.whatsappPedido}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-reserve"
            >
              {currentRestaurant.ctaPedido}
            </a>
          </div>
        ) : (
          <a
            href={currentRestaurant.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-reserve"
          >
            {currentRestaurant.cta}
          </a>
        )}
      </nav>
    )
  }

  return (
    <nav className={isScrolled ? "scrolled" : ""}>
      <Link href="/" className="nav-logo">Picadofino</Link>
      <div />
      <div />
    </nav>
  )
}
