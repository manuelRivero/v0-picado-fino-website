import { fetchBusiness } from "@/lib/api"
import { RestaurantWhatsappProvider } from "@/components/restaurant-whatsapp-context"
import {
  businessIdForSlug,
  isRestaurantSlug,
  type RestaurantSlug,
} from "@/lib/restaurants"
import { getRestaurantWhatsappLinks } from "@/lib/whatsapp"

export default async function RestauranteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ restaurante: string }>
}) {
  const { restaurante } = await params

  if (!isRestaurantSlug(restaurante)) {
    return children
  }

  const slug = restaurante as RestaurantSlug
  const business = await fetchBusiness(businessIdForSlug(slug))
  const links = getRestaurantWhatsappLinks(slug, business?.whatsappPhoneNumber)

  return (
    <RestaurantWhatsappProvider slug={slug} links={links}>
      {children}
    </RestaurantWhatsappProvider>
  )
}
