import { notFound } from "next/navigation"
import { OpinionesView } from "@/components/restaurant-pages/opiniones-view"
import { fetchBusiness } from "@/lib/api"
import {
  businessIdForSlug,
  isRestaurantSlug,
  type RestaurantSlug,
} from "@/lib/restaurants"
import { opinionesWhatsappUrl } from "@/lib/whatsapp"

export default async function RestauranteOpinionesPage({
  params,
}: {
  params: Promise<{ restaurante: string }>
}) {
  const { restaurante } = await params
  if (!isRestaurantSlug(restaurante)) {
    notFound()
  }

  const slug = restaurante as RestaurantSlug
  const business = await fetchBusiness(businessIdForSlug(slug))
  const whatsappUrl = opinionesWhatsappUrl(slug, business?.whatsappPhoneNumber)

  return <OpinionesView slug={slug} whatsappUrl={whatsappUrl} />
}
