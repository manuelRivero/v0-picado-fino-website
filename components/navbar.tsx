"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const restaurants = [
  { 
    href: "/picado-fino", 
    label: "Picado Fino",
    description: "Experiencia Premium",
    whatsapp: "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa%20en%20Picado%20Fino"
  },
  { 
    href: "/la-esquina", 
    label: "La Esquina de Picado",
    description: "Experiencia Casual",
    whatsapp: "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20en%20La%20Esquina"
  },
]

// Restaurant-specific nav links (only shown on restaurant pages)
const restaurantNavLinks = [
  { href: "/menu", label: "Menú" },
  { href: "/galeria", label: "Galería" },
  { href: "/opiniones", label: "Opiniones" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Determine if we're on homepage or a restaurant page
  const isHomepage = pathname === "/"
  const currentRestaurant = restaurants.find(r => pathname.startsWith(r.href))
  const otherRestaurant = currentRestaurant 
    ? restaurants.find(r => r.href !== currentRestaurant.href)
    : null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            PICADO<span className="text-primary">FINO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {isHomepage ? (
            // Homepage: simplified navigation
            <>
              <a
                href="#restaurantes"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Restaurantes
              </a>
              <Link
                href="/nosotros"
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === "/nosotros" 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Nosotros
              </Link>
            </>
          ) : (
            // Restaurant pages: full contextual navigation
            <>
              {restaurantNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === link.href 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Restaurant Switcher - link to other restaurant */}
              {otherRestaurant && (
                <Link
                  href={otherRestaurant.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {otherRestaurant.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </>
          )}
        </div>

        {/* Desktop CTA - only on restaurant pages */}
        {!isHomepage && currentRestaurant && (
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={currentRestaurant.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Reservar
              </a>
            </Button>
          </div>
        )}

        {/* Spacer for homepage desktop to balance layout */}
        {isHomepage && <div className="hidden md:block w-[100px]" />}

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-border w-[300px]">
            <div className="flex flex-col gap-6 mt-8">
              <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsOpen(false)}>
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  PICADO<span className="text-primary">FINO</span>
                </span>
              </Link>
              
              {isHomepage ? (
                // Homepage mobile: simplified navigation
                <>
                  <a
                    href="#restaurantes"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Restaurantes
                  </a>
                  <Link
                    href="/nosotros"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Nosotros
                  </Link>
                  
                  {/* Restaurant quick links */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                      Elegí tu experiencia
                    </p>
                    {restaurants.map((restaurant) => (
                      <Link
                        key={restaurant.href}
                        href={restaurant.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="font-medium">{restaurant.label}</span>
                        <span className="block text-xs text-muted-foreground">{restaurant.description}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                // Restaurant pages mobile: full contextual navigation
                <>
                  {currentRestaurant && (
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {currentRestaurant.label}
                    </p>
                  )}
                  
                  {restaurantNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        pathname === link.href 
                          ? "text-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Restaurant Switcher */}
                  {otherRestaurant && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        También visitá
                      </p>
                      <Link
                        href={otherRestaurant.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="font-medium">{otherRestaurant.label}</span>
                        <span className="block text-xs text-muted-foreground">{otherRestaurant.description}</span>
                      </Link>
                    </div>
                  )}

                  {currentRestaurant && (
                    <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                      <a href={currentRestaurant.whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Reservar Mesa
                      </a>
                    </Button>
                  )}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
