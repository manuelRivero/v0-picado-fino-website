"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { RestaurantWhatsappLinks } from "@/lib/whatsapp"
import type { RestaurantSlug } from "@/lib/restaurants"

type RestaurantWhatsappContextValue = {
  slug: RestaurantSlug
  links: RestaurantWhatsappLinks
}

const RestaurantWhatsappContext =
  createContext<RestaurantWhatsappContextValue | null>(null)

export function RestaurantWhatsappProvider({
  slug,
  links,
  children,
}: {
  slug: RestaurantSlug
  links: RestaurantWhatsappLinks
  children: ReactNode
}) {
  return (
    <RestaurantWhatsappContext.Provider value={{ slug, links }}>
      {children}
    </RestaurantWhatsappContext.Provider>
  )
}

export function useRestaurantWhatsapp(): RestaurantWhatsappContextValue | null {
  return useContext(RestaurantWhatsappContext)
}
