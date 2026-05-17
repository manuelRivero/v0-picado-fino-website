"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { isRestaurantSlug } from "@/lib/restaurants"

export function Footer() {
  const pathname = usePathname()
  const restaurantSlug = pathname.split("/")[1] ?? ""
  const isRestaurantPage = isRestaurantSlug(restaurantSlug)
  const isPicadoFino = restaurantSlug === "picado-fino"

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="logo">Picadofino | La Esquina de Picado</Link>
          <p>
            Fuego, tradición y equipo. Dos propuestas con una sola misión: llevar
            <br />
            la esencia de una buena comida a un momento memorable. La
            <br />
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

        {!isRestaurantPage ? (
          <div className="footer-col">
            <h4>Nosotros</h4>
            <ul>
              <li><Link href="/#historia">Historia</Link></li>
              <li><Link href="/#equipo">Equipo</Link></li>
            </ul>
          </div>
        ) : null}

        {isRestaurantPage ? (
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              {isPicadoFino ? (
                <li><a href="#reserva">Reservas</a></li>
              ) : null}
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        ) : null}
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Picado Fino. Todos los derechos reservados. Rosario.</span>
      </div>
    </footer>
  )
}
