import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ArrowRight, Star, Flame, ChefHat, Clock, Zap } from "lucide-react"

const WHATSAPP_URL = "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20hacer%20un%20pedido%20en%20La%20Esquina%20de%20Picado"

const highlights = [
  {
    title: "Choripanes",
    description: "El clásico argentino con chorizo criollo y chimichurri casero.",
    image: "/images/gallery-8.jpg",
    icon: Flame,
  },
  {
    title: "Pollo Rápido",
    description: "Cuartos de pollo a la brasa, listos en minutos sin perder el sabor.",
    image: "/images/pollo.jpg",
    icon: Zap,
  },
  {
    title: "Empanadas",
    description: "Las mismas empanadas artesanales, ahora para llevar.",
    image: "/images/empanadas.jpg",
    icon: ChefHat,
  },
  {
    title: "Combos Express",
    description: "Opciones completas para tu almuerzo o merienda rápida.",
    image: "/images/asado.jpg",
    icon: Clock,
  },
]

const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-6.jpg",
]

const testimonials = [
  {
    name: "Lucas Pérez",
    comment: "Increíble que puedas comer tan bien y tan rápido. El choripán es de los mejores que probé. Perfecto para el almuerzo.",
    rating: 5,
  },
  {
    name: "Sofía Herrera",
    comment: "Vengo siempre que quiero algo rico sin esperar una hora. La calidad es la misma que Picado Fino pero más accesible.",
    rating: 5,
  },
  {
    name: "Martín Gutiérrez",
    comment: "El combo de empanadas para llevar es genial. Perfecto para una reunión en casa. Siempre calentitas y bien rellenas.",
    rating: 5,
  },
]

const features = [
  {
    icon: Zap,
    title: "Servicio Rápido",
    description: "Tu pedido listo en minutos, sin perder la calidad.",
  },
  {
    icon: Clock,
    title: "Horario Extendido",
    description: "Abierto al mediodía y noche, todos los días.",
  },
  {
    icon: Flame,
    title: "Misma Calidad",
    description: "Ingredientes premium y el fuego de siempre.",
  },
]

export default function LaEsquinaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery-1.jpg"
            alt="La Esquina de Picado"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Experiencia Casual
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">LA ESQUINA</span>
            <span className="text-primary"> DE PICADO</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light">
            La misma pasión por el asado, en un formato rápido y accesible. Calidad sin esperas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Hacer Pedido
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6">
              <Link href="/menu">
                Ver Menú
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/gallery-5.jpg"
                alt="Cocina de La Esquina"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Nuestra Propuesta
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Calidad express, sabor auténtico
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                La Esquina de Picado nace para quienes aman el asado pero no siempre tienen tiempo para una cena larga. Traemos la esencia de nuestra parrilla a un formato ágil, perfecto para el almuerzo de trabajo o una salida casual.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Usamos los mismos ingredientes y técnicas que en Picado Fino, pero con un menú diseñado para servir rápido sin sacrificar lo que nos hace únicos: el sabor del fuego y la calidad de cada bocado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Nuestros Favoritos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">
              Rápido y delicioso
            </h2>
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

      {/* Gallery Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Galería
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">
                El sabor en imágenes
              </h2>
            </div>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Link href="/galeria">
                Ver Galería Completa
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
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

      {/* Testimonials Preview */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Opiniones
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">
              Lo que dicen de nosotros
            </h2>
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
                  <p className="text-muted-foreground leading-relaxed">
                    {`"${testimonial.comment}"`}
                  </p>
                  <p className="text-foreground font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link to Picado Fino */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-muted-foreground mb-2">Buscás una experiencia más completa?</p>
              <p className="text-xl font-semibold text-foreground">
                Visitá Picado Fino
              </p>
            </div>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Link href="/picado-fino">
                Ver Picado Fino
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Hacé tu pedido
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Rápido, rico y con la calidad de siempre. Pedí por WhatsApp y retirá tu pedido en minutos.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Pedir por WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
