import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ArrowRight, Star, Flame, ChefHat, Wine } from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa%20en%20Picado%20Fino"

const highlights = [
  {
    title: "Asado",
    description: "Cortes premium de carne argentina, cocinados a la perfección sobre las brasas.",
    image: "/images/asado.jpg",
    icon: Flame,
  },
  {
    title: "Pollo a la Brasa",
    description: "Pollo de campo marinado con hierbas, dorado lentamente sobre fuego de leña.",
    image: "/images/pollo.jpg",
    icon: ChefHat,
  },
  {
    title: "Empanadas",
    description: "Empanadas artesanales con recetas tradicionales y rellenos únicos.",
    image: "/images/empanadas.jpg",
    icon: ChefHat,
  },
  {
    title: "Vinos & Bebidas",
    description: "Selección curada de Malbecs y vinos premium de bodegas argentinas.",
    image: "/images/bebidas.jpg",
    icon: Wine,
  },
]

const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
]

const testimonials = [
  {
    name: "María González",
    comment:
      "La mejor experiencia de parrilla que he tenido. El bife de chorizo estaba perfecto, jugoso y con ese sabor ahumado único. Volveré sin duda.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    comment:
      "Ambiente increíble y atención impecable. Las empanadas son las más auténticas que probé fuera de Salta. Muy recomendado.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    comment:
      "El pollo a la brasa es espectacular. La piel crujiente y la carne jugosa. El mejor lugar para una cena especial.",
    rating: 5,
  },
]

type PicadoFinoHomeProps = {
  basePath: string
  otherRestaurantPath: string
}

export function PicadoFinoHome({ basePath, otherRestaurantPath }: PicadoFinoHomeProps) {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-grill.jpg"
            alt="Parrilla argentina con fuego"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Experiencia Premium
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">PICADO</span>
            <span className="text-primary">FINO</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light">
            La experiencia premium de parrilla argentina. Tradición, fuego y pasión en cada corte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Reservar por WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6">
              <Link href={`${basePath}/menu`}>
                Ver Menú
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/images/experience.jpg" alt="Experiencia gastronómica premium" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Nuestra Experiencia</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Donde el fuego se encuentra con la tradición
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En Picado Fino, cada corte cuenta una historia. Nuestra parrilla es el corazón de una experiencia gastronómica que fusiona las técnicas ancestrales del asado argentino con una presentación contemporánea y elegante.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Seleccionamos los mejores cortes de carne de productores locales, madurados a la perfección y cocinados sobre brasas de quebracho. El resultado: sabores profundos, texturas perfectas y momentos inolvidables.
              </p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4">
                <Link href="/nosotros">
                  Conocer Más
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Nuestras Especialidades</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">Sabores que conquistan</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <Card key={item.title} className="bg-secondary border-border overflow-hidden group cursor-pointer">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Galería</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">El arte del fuego</h2>
            </div>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Link href={`${basePath}/galeria`}>
                Ver Galería Completa
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={image} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Galería ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Opiniones</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">Lo que dicen nuestros clientes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-secondary border-border p-6">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{`"${testimonial.comment}"`}</p>
                  <p className="text-foreground font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Link href={`${basePath}/opiniones`}>
                Ver Todas las Opiniones
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-muted-foreground mb-2">Buscás algo más casual?</p>
              <p className="text-xl font-semibold text-foreground">Conocé La Esquina de Picado</p>
            </div>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Link href={otherRestaurantPath}>
                Ver La Esquina
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Reserva tu experiencia</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Déjate conquistar por los sabores del asado argentino. Reserva tu mesa y vive una experiencia gastronómica inolvidable.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Reservar por WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
