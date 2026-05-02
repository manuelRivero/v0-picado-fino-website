import Link from "next/link"
import { Instagram, Facebook, MapPin, Clock, Phone, Mail } from "lucide-react"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/galeria", label: "Galería" },
  { href: "/opiniones", label: "Opiniones" },
]

const restaurants = [
  { href: "/picado-fino", label: "Picado Fino", description: "Experiencia Premium" },
  { href: "/la-esquina", label: "La Esquina de Picado", description: "Experiencia Casual" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                PICADO<span className="text-primary">FINO</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Dos experiencias gastronómicas únicas unidas por la misma pasión: el fuego, la tradición y los mejores cortes de carne argentina.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Restaurants */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Restaurantes
            </h3>
            <ul className="space-y-4">
              {restaurants.map((restaurant) => (
                <li key={restaurant.href}>
                  <Link
                    href={restaurant.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="font-medium text-foreground">{restaurant.label}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{restaurant.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Av. Honduras 5200, Palermo Soho, Buenos Aires</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p>Lun-Jue: 12:00 - 00:00</p>
                  <p>Vie-Dom: 12:00 - 01:00</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+54 11 4000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>reservas@picadofino.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Picado Fino. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Diseñado con pasión en Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  )
}
