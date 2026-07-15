import type { Metadata } from "next"
import { DataDeletionRequest } from "@/components/legal/DataDeletionRequest"
import { buildPageMetadata } from "@/lib/metadata"

const title = "Solicitud de Eliminación de Datos | Picado Fino"
const description =
  "Procedimiento para solicitar la eliminación de datos personales almacenados por Picado Fino y sus canales digitales."

export const metadata: Metadata = {
  ...buildPageMetadata({ title, description }),
  alternates: {
    canonical: "/data-deletion-request",
  },
}

export default function DataDeletionRequestPage() {
  return <DataDeletionRequest />
}
