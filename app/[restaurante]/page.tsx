import { notFound } from "next/navigation"
import { PicadoFinoHome } from "@/components/restaurant-landings/picado-fino-home"
import { LaEsquinaHome } from "@/components/restaurant-landings/la-esquina-home"
import {
  isRestaurantSlug,
  OTHER_RESTAURANT,
  restaurantPath,
  RESTAURANT_SLUGS,
  type RestaurantSlug,
} from "@/lib/restaurants"

export function generateStaticParams() {
  return RESTAURANT_SLUGS.map((restaurante) => ({ restaurante }))
}

export default async function RestaurantePage({
  params,
}: {
  params: Promise<{ restaurante: string }>
}) {
  const { restaurante } = await params
  if (!isRestaurantSlug(restaurante)) {
    notFound()
  }

  const slug = restaurante as RestaurantSlug
  const basePath = restaurantPath(slug)
  const otherPath = restaurantPath(OTHER_RESTAURANT[slug])

  if (slug === "picado-fino") {
    return <PicadoFinoHome basePath={basePath} otherRestaurantPath={otherPath} />
  }

  return <LaEsquinaHome basePath={basePath} otherRestaurantPath={otherPath} />
}
