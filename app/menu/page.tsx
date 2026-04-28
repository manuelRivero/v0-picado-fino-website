"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Flame, Drumstick, ChefHat, Wine } from "lucide-react"

const categories = [
  { id: "parrilla", label: "Parrilla", icon: Flame },
  { id: "pollo", label: "Pollo", icon: Drumstick },
  { id: "empanadas", label: "Empanadas", icon: ChefHat },
  { id: "bebidas", label: "Bebidas", icon: Wine },
]

const menuItems = {
  parrilla: [
    {
      id: 1,
      name: "Bife de Chorizo",
      description: "Corte clásico argentino de 400g, madurado 21 días, cocido a las brasas con chimichurri casero.",
      price: 8500,
      image: "/images/asado.jpg",
      featured: true,
    },
    {
      id: 2,
      name: "Ojo de Bife",
      description: "Corte premium de 350g con veteado perfecto. Jugoso y tierno, servido con papas rústicas.",
      price: 9200,
      image: "/images/gallery-2.jpg",
    },
    {
      id: 3,
      name: "Entraña",
      description: "Corte fino y sabroso de 300g. Textura única y sabor intenso, acompañado de ensalada criolla.",
      price: 7800,
      image: "/images/gallery-2.jpg",
    },
    {
      id: 4,
      name: "Vacío",
      description: "Corte tradicional de 450g, cocción lenta sobre brasas de quebracho. Incluye guarnición.",
      price: 8200,
      image: "/images/gallery-2.jpg",
    },
    {
      id: 5,
      name: "Asado de Tira",
      description: "Costillas de res 500g, el clásico del asado argentino. Crocante por fuera, jugoso por dentro.",
      price: 7500,
      image: "/images/gallery-2.jpg",
    },
    {
      id: 6,
      name: "Parrillada Picado Fino",
      description: "Selección de cortes premium para 2 personas: bife, entraña, chorizo, morcilla y achuras.",
      price: 18500,
      image: "/images/gallery-1.jpg",
      featured: true,
    },
  ],
  pollo: [
    {
      id: 7,
      name: "Pollo Entero a la Brasa",
      description: "Pollo de campo marinado 24 horas con hierbas frescas, cocido lentamente sobre fuego de leña.",
      price: 6500,
      image: "/images/pollo.jpg",
      featured: true,
    },
    {
      id: 8,
      name: "Medio Pollo a la Brasa",
      description: "Media porción de nuestro pollo signature, piel dorada y carne jugosa. Incluye papas.",
      price: 4200,
      image: "/images/pollo.jpg",
    },
    {
      id: 9,
      name: "Suprema a la Parrilla",
      description: "Pechuga de pollo grillada con limón y hierbas, acompañada de vegetales de estación.",
      price: 4800,
      image: "/images/pollo.jpg",
    },
    {
      id: 10,
      name: "Pata Muslo x2",
      description: "Dos piezas de pata muslo crujientes, marinadas con especias ahumadas.",
      price: 3800,
      image: "/images/pollo.jpg",
    },
  ],
  empanadas: [
    {
      id: 11,
      name: "Empanada de Carne",
      description: "Relleno jugoso de carne cortada a cuchillo, cebolla, huevo y aceitunas. Receta salteña.",
      price: 850,
      image: "/images/empanadas.jpg",
      featured: true,
    },
    {
      id: 12,
      name: "Empanada de Pollo",
      description: "Pollo desmenuzado con cebolla de verdeo, morrón y especias suaves.",
      price: 850,
      image: "/images/empanadas.jpg",
    },
    {
      id: 13,
      name: "Empanada de Jamón y Queso",
      description: "Jamón natural y queso tybo derretido. Clásica y reconfortante.",
      price: 800,
      image: "/images/empanadas.jpg",
    },
    {
      id: 14,
      name: "Empanada de Humita",
      description: "Choclo cremoso con bechamel y un toque de comino. Opción vegetariana.",
      price: 800,
      image: "/images/empanadas.jpg",
    },
    {
      id: 15,
      name: "Docena Surtida",
      description: "12 empanadas variadas a elección. Ideal para compartir en grupo.",
      price: 9000,
      image: "/images/empanadas.jpg",
      featured: true,
    },
  ],
  bebidas: [
    {
      id: 16,
      name: "Malbec Reserva",
      description: "Vino tinto de Mendoza, notas de frutas negras y roble. Botella 750ml.",
      price: 7500,
      image: "/images/bebidas.jpg",
      featured: true,
    },
    {
      id: 17,
      name: "Torrontés",
      description: "Vino blanco aromático de Cafayate. Floral y refrescante. Botella 750ml.",
      price: 5800,
      image: "/images/bebidas.jpg",
    },
    {
      id: 18,
      name: "Copa de Vino",
      description: "Malbec, Cabernet o Torrontés. Servicio por copa 180ml.",
      price: 1800,
      image: "/images/bebidas.jpg",
    },
    {
      id: 19,
      name: "Cerveza Artesanal",
      description: "IPA, Amber Ale o Stout. Pinta de 500ml de cervecería local.",
      price: 2200,
      image: "/images/bebidas.jpg",
    },
    {
      id: 20,
      name: "Agua Mineral",
      description: "Con o sin gas. Botella 500ml.",
      price: 800,
      image: "/images/bebidas.jpg",
    },
    {
      id: 21,
      name: "Gaseosas",
      description: "Coca-Cola, Sprite o Fanta. Lata 354ml.",
      price: 900,
      image: "/images/bebidas.jpg",
    },
  ],
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("parrilla")
  const items = menuItems[activeCategory as keyof typeof menuItems]

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Nuestra Carta
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-4">
            Menú
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada plato es preparado con ingredientes seleccionados y la pasión que define nuestra cocina.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 hidden lg:block">
                Categorías
              </h2>
              <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    className={cn(
                      "justify-start gap-3 whitespace-nowrap",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <category.icon className="w-5 h-5" />
                    {category.label}
                  </Button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content - Menu Items */}
          <main className="flex-1">
            <div className="grid gap-4">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className={cn(
                    "bg-card border-border overflow-hidden transition-all duration-300 hover:border-primary/50",
                    item.featured && "ring-1 ring-primary/30"
                  )}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="relative w-full sm:w-40 h-40 sm:h-auto flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {item.featured && (
                          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                            Destacado
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>

        {/* Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Los precios incluyen IVA. Consulta por opciones sin TACC y vegetarianas.
          </p>
        </div>
      </div>
    </div>
  )
}
