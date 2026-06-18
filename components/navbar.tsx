"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useRestaurantWhatsapp } from "@/components/restaurant-whatsapp-context"
import { isRestaurantSlug, type RestaurantSlug } from "@/lib/restaurants"
import { getRestaurantWhatsappLinks } from "@/lib/whatsapp"

const RESTAURANT_NAV = [
  {
    href: "/picado-fino",
    slug: "picado-fino" as const,
    logo: "/images/logo-picadofino.png",
    logoAlt: "Picado Fino",
    cta: "Reservar",
    ctaPedido: "Hacer pedido",
  },
  {
    href: "/la-esquina",
    slug: "la-esquina" as const,
    logo: "/images/logo-la-esquina.png",
    logoAlt: "La Esquina de Picado",
    cta: "Reservar",
    ctaPedido: "Hacer pedido",
  },
]

function linksForSlug(slug: RestaurantSlug) {
  return getRestaurantWhatsappLinks(slug, null)
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const whatsappContext = useRestaurantWhatsapp()

  const isHomepage = pathname === "/"
  const currentRestaurant = RESTAURANT_NAV.find((r) => pathname.startsWith(r.href))

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isHomepage) {
    return (
      <nav className={`nav-home${isScrolled ? " scrolled" : ""}`}>
        <div className="nav-row nav-row-actions">
          <div className="nav-home-ctas">
            <Link href="/picado-fino" className="pf-btn-amber pf-sans">Picado fino</Link>
            <Link href="/la-esquina" className="pf-btn-amber pf-sans">La esquina de picado</Link>
          </div>
        </div>
      </nav>
    )
  }

  if (currentRestaurant) {
    const slugFromPath = pathname.split("/")[1] ?? ""
    const slug = isRestaurantSlug(slugFromPath) ? slugFromPath : currentRestaurant.slug
    const links =
      whatsappContext?.slug === slug
        ? whatsappContext.links
        : linksForSlug(slug)
    const waReserva = links.reserva
    const waPedido = links.pedido

    const ctas = waPedido ? (
      <div className="nav-restaurant-ctas">
        {waReserva ? (
          <a
            href={waReserva}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-reserve"
          >
            {currentRestaurant.cta}
          </a>
        ) : null}
        <a
          href={waPedido}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-reserve"
        >
          {currentRestaurant.ctaPedido}
        </a>
      </div>
    ) : waReserva ? (
      <div className="nav-restaurant-ctas">
        <a
          href={waReserva}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-reserve"
        >
          {currentRestaurant.cta}
        </a>
      </div>
    ) : null

    return (
      <nav className={`nav-restaurant${isScrolled ? " scrolled" : ""}`}>
        <div className="nav-row nav-row-logo">
          <Image
            src={currentRestaurant.logo}
            alt={currentRestaurant.logoAlt}
            width={220}
            height={44}
            className="nav-restaurant-logo"
            priority
          />
        </div>
        <div className="nav-row nav-row-actions">
          <Link href="/" className="pf-btn-primary pf-sans nav-back">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
              <path d="M18 6H2M2 6L7 1M2 6L7 11" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <span>Inicio</span>
          </Link>
          {ctas}
        </div>
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
