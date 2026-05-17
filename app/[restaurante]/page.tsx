import type { Metadata } from "next"
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
import { fetchBusiness, fetchFeaturedItems, fetchMenuItems } from "@/lib/api"

export const revalidate = 60

const PAGE_META_FALLBACK: Record<
  RestaurantSlug,
  { title: string; description: string }
> = {
  "picado-fino": {
    
    title: "Picado Fino",
    description:
      "Una experiencia gastronómica sofisticada donde el asado argentino se eleva a su máxima expresión. Cortes premium, ambiente elegante y atención personalizada.",
  },
  "la-esquina": {
    title: "La Esquina de Picado",
    description:
      "La misma calidad y pasión de Picado Fino en un formato más relajado. Ideal para un almuerzo, una salida con amigos o cuando querés el mejor asado sin ceremonias.",
  },
}

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
  const fallback = PAGE_META_FALLBACK[slug]

  const businessId =
    slug === "picado-fino"
      ? process.env.NEXT_PUBLIC_PICADO_ID?.trim()
      : process.env.NEXT_PUBLIC_LA_ESQUINA_ID?.trim()

  const business = await fetchBusiness(businessId ?? "")

  const description =
    business?.description?.trim() || fallback.description
  const title = business?.name?.trim() || fallback.title

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      description,
    },
  }
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

  const businessId =
    slug === "picado-fino"
      ? process.env.NEXT_PUBLIC_PICADO_ID?.trim()
      : process.env.NEXT_PUBLIC_LA_ESQUINA_ID?.trim()

  const [featuredItems, menuItems, business] = await Promise.all([
    fetchFeaturedItems(businessId ?? ""),
    fetchMenuItems(businessId ?? ""),
    fetchBusiness(businessId ?? ""),
  ])

  if (slug === "picado-fino") {
    return (
      <PicadoFinoHome
        basePath={basePath}
        otherRestaurantPath={otherPath}
        featuredItems={featuredItems}
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
