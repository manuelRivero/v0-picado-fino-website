import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Flame, Heart, Users } from "lucide-react"

const WHATSAPP_URL = "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa"

const values = [
  {
    icon: Flame,
    title: "Fuego Auténtico",
    description: "Cocinamos exclusivamente sobre brasas de quebracho, respetando la tradición del asado argentino.",
  },
  {
    icon: Heart,
    title: "Pasión por la Calidad",
    description: "Seleccionamos cada ingrediente con dedicación, trabajando con productores locales de confianza.",
  },
  {
    icon: Users,
    title: "Experiencia Compartida",
    description: "Creemos que la mejor comida se disfruta en compañía. Cada mesa es una celebración.",
  },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery-5.jpg"
            alt="Fuego de parrilla"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Nuestra Esencia
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-4">
            Nosotros
          </h1>
        </div>
      </section>

      {/* Historia Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Nuestra Historia
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
                Del fuego nace una tradición
              </h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Picado Fino nació de un sueño compartido: traer la esencia del asado argentino a un espacio donde la tradición se encuentra con la sofisticación contemporánea. Nuestra historia comenzó en las reuniones familiares, alrededor del fuego, donde cada corte de carne contaba una historia.
              </p>
              <p>
                Fundado en el corazón de Palermo, nuestro restaurante es el resultado de años de perfeccionamiento en el arte de la parrilla. Cada decisión, desde la selección de la leña hasta el diseño del espacio, está pensada para crear una experiencia que honre nuestras raíces mientras abraza la innovación.
              </p>
              <p>
                Hoy, Picado Fino es más que un restaurante: es un punto de encuentro para quienes aprecian la calidad, el sabor auténtico y los momentos compartidos alrededor de una buena mesa.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/images/story.jpg"
              alt="Nuestra historia"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Filosofía Section */}
      <section className="bg-card py-24 mb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/philosophy.jpg"
                alt="Nuestra filosofía"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                  Nuestra Filosofía
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
                  Respeto por el producto
                </h2>
              </div>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  En Picado Fino, creemos que la excelencia comienza en el origen. Trabajamos directamente con ganaderos y productores que comparten nuestra visión de calidad y sustentabilidad. Cada corte que llega a nuestra parrilla ha sido seleccionado y madurado con el cuidado que merece.
                </p>
                <p>
                  Nuestro compromiso va más allá de la carne. Las verduras provienen de huertas locales, los vinos de bodegas boutique que respetan el terroir, y cada elemento del plato está pensado para complementar y elevar la experiencia.
                </p>
                <p>
                  Rechazamos los atajos. No usamos aditivos, aceleradores ni técnicas que comprometan la integridad del producto. El tiempo, el fuego y el conocimiento son nuestros únicos aliados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="container mx-auto px-6 mb-32">
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
      </section>

      {/* Experiencia Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                La Experiencia
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
                Más que una cena
              </h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Entrar a Picado Fino es sumergirse en una atmósfera diseñada para despertar los sentidos. La luz cálida de las velas, el aroma del quebracho ardiendo, el murmullo de conversaciones animadas: cada detalle contribuye a una experiencia envolvente.
              </p>
              <p>
                Nuestro equipo está formado por apasionados de la gastronomía que entienden que el servicio es parte integral de la experiencia. Desde recomendaciones de maridaje hasta historias sobre el origen de cada corte, estamos aquí para enriquecer tu visita.
              </p>
              <p>
                Ya sea una cena íntima, una celebración familiar o una reunión de negocios, adaptamos cada detalle para que tu momento sea único e inolvidable.
              </p>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Reservar Experiencia
              </a>
            </Button>
          </div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/images/experience.jpg"
              alt="La experiencia Picado Fino"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-6 text-center">
          <blockquote className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-serif italic text-primary-foreground leading-relaxed">
              {`"El asado no es solo comida, es un ritual. Es el momento donde el tiempo se detiene y lo único que importa es disfrutar del fuego, los sabores y la compañía."`}
            </p>
            <footer className="mt-8">
              <cite className="text-primary-foreground/80 not-italic">
                — Filosofía Picado Fino
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  )
}
