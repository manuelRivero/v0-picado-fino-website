import { notFound } from "next/navigation"
import { GalleryPageClient } from "@/components/restaurant-pages/gallery-page-client"
import { isRestaurantSlug, type RestaurantSlug } from "@/lib/restaurants"

export default async function RestauranteGaleriaPage({
  params,
}: {
  params: Promise<{ restaurante: string }>
}) {
  const { restaurante } = await params
  if (!isRestaurantSlug(restaurante)) {
    notFound()
  }

  return <GalleryPageClient slug={restaurante as RestaurantSlug} />
}
