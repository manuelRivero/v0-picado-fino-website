import { notFound } from "next/navigation"
import { MenuPageClient } from "@/components/restaurant-pages/menu-page-client"
import { isRestaurantSlug, type RestaurantSlug } from "@/lib/restaurants"

export default async function RestauranteMenuPage({
  params,
}: {
  params: Promise<{ restaurante: string }>
}) {
  const { restaurante } = await params
  if (!isRestaurantSlug(restaurante)) {
    notFound()
  }

  return <MenuPageClient slug={restaurante as RestaurantSlug} />
}
