"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRestaurantWhatsapp } from "@/components/restaurant-whatsapp-context"
import {
  isRestaurantSlug,
  RESTAURANT_FOOTER_SOCIAL,
  type RestaurantSlug,
} from "@/lib/restaurants"
import { getRestaurantWhatsappLinks } from "@/lib/whatsapp"

export function Footer() {
  const pathname = usePathname()
  const restaurantSlug = pathname.split("/")[1] ?? ""
  const isRestaurantPage = isRestaurantSlug(restaurantSlug)
  const restaurantSlugTyped = isRestaurantPage ? (restaurantSlug as RestaurantSlug) : null
  const whatsappContext = useRestaurantWhatsapp()
  const isHomePage = pathname === "/"

  const links =
    restaurantSlugTyped && whatsappContext?.slug === restaurantSlugTyped
      ? whatsappContext.links
      : restaurantSlugTyped
        ? getRestaurantWhatsappLinks(restaurantSlugTyped, null)
        : null

  const social = restaurantSlugTyped
    ? RESTAURANT_FOOTER_SOCIAL[restaurantSlugTyped]
    : null

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="logo">Picadofino | La Esquina de Picado</Link>
          <p>
            Fuego, tradición y equipo. Dos propuestas con una sola misión: 
            <br />
            llevar la esencia de una buena comida a un momento memorable. La
            excelencia de nuestra gente puesta al servicio de tu experiencia.
          </p>
        </div>

        <div className="footer-col">
          <h4>Restaurantes</h4>
          <ul>
            <li><Link href="/picado-fino">Picado Fino</Link></li>
            <li><Link href="/la-esquina">La Esquina de Picado</Link></li>
          </ul>
        </div>

        {isHomePage ? (
          <div className="footer-col">
            <h4>Nosotros</h4>
            <ul>
              <li><a href="#lo-que-nos-define">Lo que nos define</a></li>
              <li><a href="#equipo">Equipo</a></li>
            </ul>
          </div>
        ) : null}

        {links && social ? (
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              {links.pedido ? (
                <li>
                  <a
                    href={links.pedido}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedidos
                  </a>
                </li>
              ) : null}
              {links.reserva ? (
                <li>
                  <a
                    href={links.reserva}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reservas
                  </a>
                </li>
              ) : null}
              {social.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Picado Fino. Todos los derechos reservados. Rosario.</span>
        <div className="footer-legal-links">
          <Link href="/privacy-policy" className="footer-legal-link">
            Política de Privacidad
          </Link>
          <Link href="/terms-and-conditions" className="footer-legal-link">
            Términos y Condiciones
          </Link>
          <Link href="/data-deletion-request" className="footer-legal-link">
            Eliminación de Datos
          </Link>
        </div>
      </div>
    </footer>
  )
}
