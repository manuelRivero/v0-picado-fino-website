import { notFound } from "next/navigation"
import { OpinionesView } from "@/components/restaurant-pages/opiniones-view"
import { isRestaurantSlug, type RestaurantSlug } from "@/lib/restaurants"

export default async function RestauranteOpinionesPage({
  params,
}: {
  params: Promise<{ restaurante: string }>
}) {
  const { restaurante } = await params
  if (!isRestaurantSlug(restaurante)) {
    notFound()
  }

  return <OpinionesView slug={restaurante as RestaurantSlug} />
}
