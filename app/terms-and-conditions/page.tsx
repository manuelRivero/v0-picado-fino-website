import type { Metadata } from "next"
import { TermsAndConditions } from "@/components/legal/TermsAndConditions"
import { buildPageMetadata } from "@/lib/metadata"

const title = "Términos y Condiciones | Picado Fino"
const description =
  "Términos y condiciones de uso de los servicios y canales digitales de Picado Fino."

export const metadata: Metadata = {
  ...buildPageMetadata({ title, description }),
  alternates: {
    canonical: "/terms-and-conditions",
  },
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />
}
