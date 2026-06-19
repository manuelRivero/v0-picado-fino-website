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
import { buildPageMetadata, RESTAURANT_PAGE_META } from "@/lib/metadata"

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
  const pageMeta = RESTAURANT_PAGE_META[slug]
  const business = await fetchBusiness(businessIdForSlug(slug))
  const title = business?.name?.trim() || pageMeta.title

  return buildPageMetadata({
    title,
    description: pageMeta.description,
  })
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

  console.log("[menu] RestaurantePage", { slug, businessId })

  const [menuItems, business] = await Promise.all([
    fetchMenuItems(businessId),
    fetchBusiness(businessId),
  ])

  console.log("[menu] RestaurantePage resultado", {
    slug,
    menuItemsCount: menuItems.length,
    businessName: business?.name ?? null,
  })

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
