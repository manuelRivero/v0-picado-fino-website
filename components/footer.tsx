"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Facebook, MapPin, Clock, Phone, MessageCircle } from "lucide-react"

const restaurants = [
  { 
    href: "/picado-fino", 
    label: "Picado Fino", 
    description: "Experiencia Premium",
    address: "Av. Honduras 5200, Palermo Soho, Buenos Aires",
    hours: {
      weekdays: "Mar-Jue: 12:00 - 00:00",
      weekends: "Vie-Dom: 12:00 - 01:00",
      closed: "Lunes cerrado"
    },
    phone: "+54 11 4000-0001",
    whatsapp: "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa%20en%20Picado%20Fino"
  },
  { 
    href: "/la-esquina", 
    label: "La Esquina de Picado", 
    description: "Experiencia Casual",
    address: "Av. Córdoba 4500, Palermo, Buenos Aires",
    hours: {
      weekdays: "Lun-Vie: 11:00 - 23:00",
      weekends: "Sáb-Dom: 11:00 - 00:00",
      closed: null
    },
    phone: "+54 11 4000-0002",
    whatsapp: "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20en%20La%20Esquina"
  },
]

export function Footer() {
  const pathname = usePathname()
  
  // Determine if we're on homepage or a restaurant page
  const isHomepage = pathname === "/"
  const currentRestaurant = restaurants.find(r => pathname.startsWith(r.href))
  const restaurantNavLinks = currentRestaurant
    ? [
        { href: `${currentRestaurant.href}/menu`, label: "Menú" },
        { href: `${currentRestaurant.href}/galeria`, label: "Galería" },
        { href: `${currentRestaurant.href}/opiniones`, label: "Opiniones" },
      ]
    : []

  // Homepage: neutral footer
  if (isHomepage) {
    return (
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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

            {/* Restaurants */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Nuestros Restaurantes
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

  // Restaurant pages: contextual footer with full details
  const otherRestaurant = currentRestaurant 
    ? restaurants.find(r => r.href !== currentRestaurant.href)
    : null

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                PICADO<span className="text-primary">FINO</span>
              </span>
            </Link>
            {currentRestaurant && (
              <p className="text-primary text-sm font-medium">
                {currentRestaurant.label}
              </p>
            )}
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
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Inicio
                </Link>
              </li>
              {restaurantNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {otherRestaurant && (
                <li>
                  <Link
                    href={otherRestaurant.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {otherRestaurant.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Location & Hours */}
          {currentRestaurant && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Ubicación y Horarios
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>{currentRestaurant.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p>{currentRestaurant.hours.weekdays}</p>
                    <p>{currentRestaurant.hours.weekends}</p>
                    {currentRestaurant.hours.closed && (
                      <p className="text-primary/80">{currentRestaurant.hours.closed}</p>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Contact */}
          {currentRestaurant && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Contacto
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{currentRestaurant.phone}</span>
                </li>
                <li>
                  <a 
                    href={currentRestaurant.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reservar por WhatsApp</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
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
