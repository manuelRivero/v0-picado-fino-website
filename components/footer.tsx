"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="logo">Picadofino</Link>
          <p>Dos experiencias gastronómicas únicas unidas por la misma pasión: el fuego, la tradición y los mejores cortes de carne argentina.</p>
        </div>

        <div className="footer-col">
          <h4>Restaurantes</h4>
          <ul>
            <li><Link href="/picado-fino">Picado Fino</Link></li>
            <li><Link href="/la-esquina">La Esquina de Picado</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Nosotros</h4>
          <ul>
            <li><Link href="/#historia">Historia</Link></li>
            <li><Link href="/#equipo">Equipo</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><a href="#reserva">Reservas</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Picado Fino. Todos los derechos reservados. Rosario.</span>
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </footer>
  )
}
