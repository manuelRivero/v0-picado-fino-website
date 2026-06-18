import type { RestaurantSlug } from "./restaurants"

export type GalleryImageEntry = {
  src: string
  alt: string
  category: string
}

export type GalleryLandingSection = {
  eyebrow: string
  titleBefore: string
  prompts: string[]
  titleAfter: string
  ariaLabel: string
}

export type GalleryConfig = {
  eyebrow: string
  title: string
  description: string
  landing: GalleryLandingSection
  images: GalleryImageEntry[]
}

const picadoFinoGallery: GalleryConfig = {
  eyebrow: "Momentos Capturados",
  title: "Galería",
  description:
    "Picado Fino en imágenes: cocina, platos y la atmósfera que nos define. El fuego, los sabores y las experiencias que compartimos.",
  landing: {
    eyebrow: "Un vistazo",
    titleBefore: "¿Se te antoja ",
    prompts: ["un buen corte", "compartir la mesa", "quedarte un rato más", "brindar esta noche"],
    titleAfter: "?",
    ariaLabel: "Fotos del restaurante",
  },
  images: [
    { src: "/images/G01.jpg", alt: "Salón principal Picado Fino", category: "Ambiente" },
    { src: "/images/G03.jpg", alt: "Cortes premium a la parrilla", category: "Platos" },
    { src: "/images/G06.jpg", alt: "Mesa servida en sala", category: "Ambiente" },
    { src: "/images/G04.jpg", alt: "Equipo de cocina en acción", category: "Cocina" },
    { src: "/images/G08.jpg", alt: "Brasas y parrilla", category: "Cocina" },
    { src: "/images/G14.jpg", alt: "Experiencia en el salón", category: "Ambiente" },
    { src: "/images/gallery-picado-12.jpeg", alt: "Supremas de pollo apanadas con papas fritas y limón", category: "Platos" },
    { src: "/images/gallery-picado-11.jpeg", alt: "Gift Card Picado Fino", category: "Gift Card" },
  ],
}

const laEsquinaGallery: GalleryConfig = {
  eyebrow: "La Esquina",
  title: "Galería",
  description:
    "El lado más ágil de nuestra parrilla: pedidos al paso, fuego visible y el mismo sabor en cada foto.",
  landing: {
    eyebrow: "Sabores",
    titleBefore: "¿Qué te pinta ",
    prompts: ["un lomito", "una pizza bien cargada", "algo al fuego", "compartir con amigos"],
    titleAfter: "?",
    ariaLabel: "Fotos de La Esquina",
  },
  images: [
    { src: "/images/galeria-equina-1.jpg", alt: "Interior de La Esquina", category: "Local" },
    { src: "/images/galeria-equina-3.jpg", alt: "Parrilla La Esquina", category: "Cocina" },
    { src: "/images/galeria-equina-4.jpg", alt: "Plato casual", category: "Platos" },
    { src: "/images/galeria-equina-5.jpg", alt: "Exterior del local", category: "Local" },
    { src: "/images/galeria-equina-6.jpg", alt: "Preparación al paso", category: "Cocina" },
    { src: "/images/galeria-equina-7.jpg", alt: "Mostrador y pedidos", category: "Local" },
    { src: "/images/galeria-equina-8.jpg", alt: "Clásicos de carta", category: "Platos" },
    { src: "/images/galeria-equina-9.jpg", alt: "Take away", category: "Ambiente" },
  ],
}

const galleries: Record<RestaurantSlug, GalleryConfig> = {
  "picado-fino": picadoFinoGallery,
  "la-esquina": laEsquinaGallery,
}

export function getGalleryConfig(slug: RestaurantSlug): GalleryConfig {
  return galleries[slug]
}

export function getGalleryImages(slug: RestaurantSlug): GalleryImageEntry[] {
  return getGalleryConfig(slug).images
}
