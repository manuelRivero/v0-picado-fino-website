"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, MessageCircle, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/galeria", label: "Galería" },
  { href: "/opiniones", label: "Opiniones" },
]

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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Determine current restaurant context
  const currentRestaurant = restaurants.find(r => pathname.startsWith(r.href))
  const whatsappUrl = currentRestaurant?.whatsapp || restaurants[0].whatsapp

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
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
          {navLinks.map((link) => (
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
          
          {/* Restaurant Switcher Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground gap-1"
              >
                Restaurantes
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
              {restaurants.map((restaurant) => (
                <DropdownMenuItem key={restaurant.href} asChild>
                  <Link 
                    href={restaurant.href}
                    className={cn(
                      "flex flex-col items-start gap-1 cursor-pointer",
                      pathname.startsWith(restaurant.href) && "bg-secondary"
                    )}
                  >
                    <span className="font-medium text-foreground">{restaurant.label}</span>
                    <span className="text-xs text-muted-foreground">{restaurant.description}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Reservar
            </a>
          </Button>
        </div>

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
              
              {/* Main Navigation */}
              {navLinks.map((link) => (
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

              {/* Restaurant Links */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                  Nuestros Restaurantes
                </p>
                {restaurants.map((restaurant) => (
                  <Link
                    key={restaurant.href}
                    href={restaurant.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-2 transition-colors",
                      pathname.startsWith(restaurant.href) 
                        ? "text-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="font-medium">{restaurant.label}</span>
                    <span className="block text-xs text-muted-foreground">{restaurant.description}</span>
                  </Link>
                ))}
              </div>

              <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Reservar Mesa
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
