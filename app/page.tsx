import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Flame, Heart, Users } from "lucide-react"

const values = [
  {
    icon: Flame,
    title: "Fuego Auténtico",
    description: "Cocinamos sobre brasas de quebracho, respetando la tradición del asado argentino.",
  },
  {
    icon: Heart,
    title: "Pasión por la Calidad",
    description: "Seleccionamos cada ingrediente con dedicación, trabajando con productores locales.",
  },
  {
    icon: Users,
    title: "Experiencia Compartida",
    description: "Creemos que la mejor comida se disfruta en compañía. Cada mesa es una celebración.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">PICADO</span>
            <span className="text-primary">FINO</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light">
            Tradición, fuego y pasión. Dos experiencias gastronómicas únicas para cada momento.
          </p>
          <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6">
            <a href="#restaurantes">
              Descubrir Nuestros Restaurantes
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/story.jpg"
                alt="Origen de Picado Fino"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Nuestro Origen
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Donde nace la tradición
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Picado Fino nació de un sueño compartido: traer la esencia del asado argentino a espacios donde la tradición se encuentra con la experiencia contemporánea. Nuestra historia comenzó alrededor del fuego, donde cada corte de carne cuenta una historia.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hoy, ese sueño se expande con dos propuestas únicas: la elegancia de Picado Fino y la accesibilidad de La Esquina de Picado. Dos experiencias, una misma pasión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Nuestra Filosofía
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Creemos en lo auténtico
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rechazamos los atajos. No usamos aditivos ni técnicas que comprometan la integridad del producto. El tiempo, el fuego y el conocimiento son nuestros únicos aliados.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Trabajamos directamente con ganaderos y productores que comparten nuestra visión de calidad. Cada corte que llega a nuestras parrillas ha sido seleccionado y madurado con el cuidado que merece.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
              <Image
                src="/images/philosophy.jpg"
                alt="Nuestra filosofía"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Nuestros Valores
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">
              Lo que nos define
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section id="restaurantes" className="py-24 bg-card scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Dos Experiencias
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">
              Nuestros Restaurantes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              Cada espacio está diseñado para un momento diferente. Elegí la experiencia que mejor se adapte a tu ocasión.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Picado Fino Card */}
            <Link href="/picado-fino" className="group">
              <Card className="bg-secondary border-border overflow-hidden h-full transition-all duration-300 hover:border-primary/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/experience.jpg"
                    alt="Picado Fino - Experiencia Premium"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                      Experiencia Premium
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                      PICADO<span className="text-primary">FINO</span>
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Una experiencia gastronómica sofisticada donde el asado argentino se eleva a su máxima expresión. Cortes premium, ambiente elegante y atención personalizada para ocasiones especiales.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">Fine Dining / Parrilla Premium</span>
                    <span className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Ver restaurante
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* La Esquina Card */}
            <Link href="/la-esquina" className="group">
              <Card className="bg-secondary border-border overflow-hidden h-full transition-all duration-300 hover:border-primary/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/gallery-1.jpg"
                    alt="La Esquina de Picado - Experiencia Casual"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                      Experiencia Casual
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                      LA ESQUINA<span className="text-primary"> DE PICADO</span>
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    La misma calidad y pasión en un formato más relajado y accesible. Ideal para un almuerzo rápido, una salida con amigos o cuando querés disfrutar del mejor asado sin formalismos.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">Casual / Rápido / Accesible</span>
                    <span className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Ver restaurante
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Encontrá tu experiencia
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Ya sea una cena elegante o un encuentro casual, tenemos el lugar perfecto para vos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6">
              <Link href="/picado-fino">
                Picado Fino
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6">
              <Link href="/la-esquina">
                La Esquina de Picado
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
