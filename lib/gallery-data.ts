import type { RestaurantSlug } from "./restaurants"

export type GalleryImageEntry = {
  src: string
  alt: string
  category: string
}

export type GalleryConfig = {
  eyebrow: string
  title: string
  description: string
  images: GalleryImageEntry[]
}

const picadoFinoGallery: GalleryConfig = {
  eyebrow: "Momentos Capturados",
  title: "Galería",
  description:
    "Picado Fino en imágenes: cocina, platos y la atmósfera que nos define. El fuego, los sabores y las experiencias que compartimos.",
  images: [
    {
      src: "/images/hero-grill.jpg",
      alt: "Parrilla argentina con brasas encendidas",
      category: "Cocina",
    },
    {
      src: "/images/asado.jpg",
      alt: "Bife de chorizo perfectamente cocido",
      category: "Platos",
    },
    {
      src: "/images/gallery-1.jpg",
      alt: "Parrillero preparando asado",
      category: "Cocina",
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Corte de carne jugoso",
      category: "Platos",
    },
    {
      src: "/images/pollo.jpg",
      alt: "Pollo a la brasa dorado",
      category: "Platos",
    },
    {
      src: "/images/empanadas.jpg",
      alt: "Empanadas artesanales",
      category: "Platos",
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Chimichurri casero",
      category: "Detalles",
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Mesa elegante con cena",
      category: "Ambiente",
    },
    {
      src: "/images/gallery-5.jpg",
      alt: "Llamas en la parrilla",
      category: "Cocina",
    },
    {
      src: "/images/gallery-6.jpg",
      alt: "Provoleta derretida",
      category: "Platos",
    },
    {
      src: "/images/experience.jpg",
      alt: "Interior del restaurante",
      category: "Ambiente",
    },
    {
      src: "/images/bebidas.jpg",
      alt: "Copa de Malbec",
      category: "Bebidas",
    },
    {
      src: "/images/gallery-7.jpg",
      alt: "Salón principal",
      category: "Ambiente",
    },
    {
      src: "/images/gallery-8.jpg",
      alt: "Chorizos a la parrilla",
      category: "Platos",
    },
    {
      src: "/images/gallery-9.jpg",
      alt: "Postre de la casa",
      category: "Postres",
    },
    {
      src: "/images/philosophy.jpg",
      alt: "Cortes de carne premium",
      category: "Ingredientes",
    },
  ],
}

const laEsquinaGallery: GalleryConfig = {
  eyebrow: "La Esquina",
  title: "Galería",
  description:
    "El lado más ágil de nuestra parrilla: pedidos al paso, fuego visible y el mismo sabor en cada foto.",
  images: [
    {
      src: "/images/gallery-1.jpg",
      alt: "Mostrador y pedidos listos",
      category: "Local",
    },
    {
      src: "/images/gallery-8.jpg",
      alt: "Choripanes calientes",
      category: "Platos",
    },
    {
      src: "/images/gallery-5.jpg",
      alt: "Brasas y plancha",
      category: "Cocina",
    },
    {
      src: "/images/pollo.jpg",
      alt: "Pollo express para llevar",
      category: "Platos",
    },
    {
      src: "/images/empanadas.jpg",
      alt: "Empanadas recién horneadas",
      category: "Platos",
    },
    {
      src: "/images/gallery-6.jpg",
      alt: "Provoleta para compartir",
      category: "Platos",
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Salsas de la casa",
      category: "Detalles",
    },
    {
      src: "/images/asado.jpg",
      alt: "Cortes saliendo del fuego",
      category: "Cocina",
    },
    {
      src: "/images/bebidas.jpg",
      alt: "Bebidas frías",
      category: "Bebidas",
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Comida rápida sin apuro",
      category: "Ambiente",
    },
  ],
}

const galleries: Record<RestaurantSlug, GalleryConfig> = {
  "picado-fino": picadoFinoGallery,
  "la-esquina": laEsquinaGallery,
}

export function getGalleryConfig(slug: RestaurantSlug): GalleryConfig {
  return galleries[slug]
}
