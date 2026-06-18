import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PicadoFinoHome } from "@/components/restaurant-landings/picado-fino-home"
import { LaEsquinaHome } from "@/components/restaurant-landings/la-esquina-home"
import {
  businessIdForSlug,
  isRestaurantSlug,
  OTHER_RESTAURANT,
  restaurantPath,
  RESTAURANT_SLUGS,
  type RestaurantSlug,
} from "@/lib/restaurants"
import { fetchBusiness, fetchMenuItems } from "@/lib/api"
import { buildPageMetadata, RESTAURANT_HERO_META } from "@/lib/metadata"

export const revalidate = 60

export function generateStaticParams() {
  return RESTAURANT_SLUGS.map((restaurante) => ({ restaurante }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ restaurante: string }>
}): Promise<Metadata> {
  const { restaurante } = await params
  if (!isRestaurantSlug(restaurante)) {
    return {}
  }

  const slug = restaurante as RestaurantSlug
  const fallback = RESTAURANT_HERO_META[slug]

  const business = await fetchBusiness(businessIdForSlug(slug))

  const description =
    business?.description?.trim() || fallback.description
  const title = business?.name?.trim() || fallback.title

  return buildPageMetadata({ title, description })
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

  const businessId = businessIdForSlug(slug)

  const [menuItems, business] = await Promise.all([
    fetchMenuItems(businessId),
    fetchBusiness(businessId),
  ])

  if (slug === "picado-fino") {
    return (
      <PicadoFinoHome
        basePath={basePath}
        otherRestaurantPath={otherPath}
        menuItems={menuItems}
        business={business}
      />
    )
  }

  return (
    <LaEsquinaHome
      basePath={basePath}
      otherRestaurantPath={otherPath}
      menuItems={menuItems}
      business={business}
    />
  )
}
