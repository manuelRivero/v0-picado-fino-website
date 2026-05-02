"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { RestaurantSlug } from "@/lib/restaurants"
import { getMenuConfig } from "@/lib/menu-data"

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

export function MenuPageClient({ slug }: { slug: RestaurantSlug }) {
  const { header, categories, itemsByCategory, defaultCategory } = getMenuConfig(slug)
  const [activeCategory, setActiveCategory] = useState(defaultCategory)
  const items = itemsByCategory[activeCategory] ?? []

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {header.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-4">{header.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{header.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
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
                      <div className="relative w-full sm:w-40 h-40 sm:h-auto flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        {item.featured && (
                          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                            Destacado
                          </div>
                        )}
                      </div>

                      <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-2xl font-bold text-primary">{formatPrice(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Los precios incluyen IVA. Consulta por opciones sin TACC y vegetarianas.
          </p>
        </div>
      </div>
    </div>
  )
}
