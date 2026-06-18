"use client"

import { useEffect, useMemo, useState } from "react"
import { type MenuItem, formatItemPrice } from "@/lib/api"
import { cn } from "@/lib/utils"

type CategoryGroup = {
  id: string
  name: string
  items: MenuItem[]
}

type Props = {
  items: MenuItem[]
  whatsappHref?: string
  variant?: "grid" | "list"
}

function groupByCategory(items: MenuItem[]): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>()
  for (const item of items) {
    const cat = item.category
    const key = cat?.id ?? "otros"
    const name = cat?.name?.trim() || "Carta"
    if (!map.has(key)) {
      map.set(key, { id: key, name, items: [] })
    }
    map.get(key)!.items.push(item)
  }
  return Array.from(map.values())
}

function CartaWhatsappButton({ href }: { href?: string }) {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="pf-btn-outline pf-sans"
    >
      Ver carta completa
    </a>
  )
}

export function LandingMenuSection({
  items,
  whatsappHref,
  variant = "list",
}: Props) {
  const categories = useMemo(() => groupByCategory(items), [items])
  const [activeCategoryId, setActiveCategoryId] = useState(
    () => categories[0]?.id ?? ""
  )

  useEffect(() => {
    if (categories.length === 0) {
      if (activeCategoryId !== "") setActiveCategoryId("")
      return
    }
    if (!categories.some((c) => c.id === activeCategoryId)) {
      setActiveCategoryId(categories[0].id)
    }
  }, [categories, activeCategoryId])

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) ?? categories[0]
  const activeItems = activeCategory?.items ?? []

  if (items.length === 0) {
    return (
      <div className="le-landing-menu-empty pf-reveal">
        <p className="pf-cormorant">
          El menú se actualiza desde nuestro sistema. Mientras tanto, podés ver la carta completa.
        </p>
        <CartaWhatsappButton href={whatsappHref} />
      </div>
    )
  }

  return (
    <div className="le-landing-menu pf-reveal">
      {categories.length > 1 ? (
        <nav className="le-landing-menu-tabs pf-sans" aria-label="Categorías del menú">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={cn(
                "le-landing-menu-tab",
                activeCategoryId === category.id && "le-landing-menu-tab-active"
              )}
              onClick={() => setActiveCategoryId(category.id)}
            >
              {category.name}
            </button>
          ))}
        </nav>
      ) : null}

      {variant === "grid" ? (
        <div className="pf-menu-grid">
          {activeItems.map((item) => (
            <div key={item.id} className="pf-menu-item">
              <div>
                <div className="pf-menu-item-name pf-serif">{item.name}</div>
                <div className="pf-menu-item-desc pf-cormorant">{item.description}</div>
              </div>
              <div className="pf-menu-item-price pf-serif">{formatItemPrice(item)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="le-menu-list">
          {activeItems.map((item, i) => (
            <div key={item.id} className="le-menu-row">
              <span className="le-menu-row-num pf-serif">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="le-menu-row-name pf-serif">{item.name}</div>
                <div className="le-menu-row-desc pf-cormorant">{item.description}</div>
              </div>
              <div className="le-menu-row-price pf-serif">{formatItemPrice(item)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="le-landing-menu-footer">
        <CartaWhatsappButton href={whatsappHref} />
      </div>
    </div>
  )
}
