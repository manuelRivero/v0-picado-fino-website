import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, MessageCircle } from "lucide-react"

const WHATSAPP_URL = "https://wa.me/XXXXXXXXXXX?text=Hola%20quiero%20reservar%20una%20mesa"

const testimonials = [
  {
    name: "María González",
    date: "Marzo 2024",
    comment: "La mejor experiencia de parrilla que he tenido en Buenos Aires. El bife de chorizo estaba en su punto perfecto, jugoso por dentro con esa costra ahumada increíble. El servicio fue impecable y el ambiente es exactamente lo que buscaba: elegante pero cálido. Ya reservé para volver el próximo mes.",
    rating: 5,
    highlight: "Bife de Chorizo",
  },
  {
    name: "Carlos Rodríguez",
    date: "Febrero 2024",
    comment: "Ambiente increíble y atención de primera. Las empanadas son las más auténticas que probé fuera de Salta, el repulgue perfecto y el relleno jugoso como debe ser. El Malbec que nos recomendaron fue el maridaje ideal. Muy recomendado para una cena especial.",
    rating: 5,
    highlight: "Empanadas Salteñas",
  },
  {
    name: "Ana Martínez",
    date: "Febrero 2024",
    comment: "El pollo a la brasa es espectacular. Vinimos por recomendación y no nos decepcionó. La piel súper crujiente y la carne increíblemente jugosa. Se nota que lo marinan bien y lo cocinan con paciencia. El mejor lugar para una cena familiar.",
    rating: 5,
    highlight: "Pollo a la Brasa",
  },
  {
    name: "Martín Suárez",
    date: "Enero 2024",
    comment: "Llevé a mis colegas del extranjero para mostrarles lo que es un verdadero asado argentino y quedaron fascinados. La parrillada para compartir es abundante y de una calidad excepcional. El entraña estaba perfecta. Gran elección para impresionar.",
    rating: 5,
    highlight: "Parrillada Picado Fino",
  },
  {
    name: "Lucía Fernández",
    date: "Enero 2024",
    comment: "El vacío más tierno que probé en mi vida. Se nota la maduración de la carne y el cuidado en la cocción. Me encantó también la provoleta de entrada, con ese toque de orégano y el punto justo de gratinado. Un 10 en todo.",
    rating: 5,
    highlight: "Vacío",
  },
  {
    name: "Diego López",
    date: "Diciembre 2023",
    comment: "Celebramos nuestro aniversario acá y fue una noche perfecta. La atención personalizada, el sommelier nos guió increíble con los vinos, y los cortes estaban todos en su punto. El postre de dulce de leche fue el broche de oro. Volveremos cada año.",
    rating: 5,
    highlight: "Experiencia Completa",
  },
  {
    name: "Valentina Castro",
    date: "Diciembre 2023",
    comment: "Por fin un lugar donde el asado de tira queda como en casa de la abuela, pero con una presentación premium. Las achuras también estaban increíbles, especialmente la molleja. El ambiente es perfecto para una salida con amigos.",
    rating: 5,
    highlight: "Asado de Tira",
  },
  {
    name: "Roberto Méndez",
    date: "Noviembre 2023",
    comment: "Soy bastante exigente con la parrilla y debo decir que Picado Fino superó mis expectativas. El ojo de bife tenía un veteado perfecto y el punto de cocción exacto que pedí. Se ve que trabajan con proveedores de calidad. Felicitaciones.",
    rating: 5,
    highlight: "Ojo de Bife",
  },
  {
    name: "Camila Ortiz",
    date: "Noviembre 2023",
    comment: "Pedimos la docena de empanadas surtidas para picar mientras esperábamos el plato principal. Cada sabor más rico que el anterior. Las de carne cortada a cuchillo son un must. El lugar tiene muy buena onda y el personal es súper atento.",
    rating: 5,
    highlight: "Docena Surtida",
  },
]

const stats = [
  { value: "4.9", label: "Calificación Promedio" },
  { value: "2,500+", label: "Clientes Satisfechos" },
  { value: "98%", label: "Recomendaría" },
]

export default function OpinionesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Testimonios
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-4">
            Opiniones
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lo que nuestros clientes dicen sobre su experiencia en Picado Fino. Sus palabras son nuestra mayor motivación.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-20 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Featured Quote */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 mb-16 relative overflow-hidden">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed italic">
              {`"Picado Fino no es solo un restaurante, es una experiencia que te transporta a las raíces del asado argentino pero con un toque de sofisticación que lo hace único. Cada visita es especial."`}
            </p>
            <div className="mt-8">
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-semibold text-foreground">Revista Gastronómica BA</p>
              <p className="text-sm text-muted-foreground">Crítica destacada 2024</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {`"${testimonial.comment}"`}
                </p>
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-primary">{testimonial.highlight}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-primary rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Vive tu propia experiencia
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Únete a los miles de clientes que ya descubrieron el sabor auténtico del asado argentino en Picado Fino. Reserva tu mesa y crea tu propio momento inolvidable.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Reservar Ahora
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
