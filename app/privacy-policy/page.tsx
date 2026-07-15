import type { Metadata } from "next"
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy"
import { buildPageMetadata } from "@/lib/metadata"

const title = "Política de Privacidad | Picado Fino"
const description =
  "Política de privacidad y tratamiento de datos personales de Picado Fino y sus canales digitales."

export const metadata: Metadata = {
  ...buildPageMetadata({ title, description }),
  alternates: {
    canonical: "/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}
