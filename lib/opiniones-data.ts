import type { RestaurantSlug } from "./restaurants"

export type TestimonialEntry = {
  name: string
  date: string
  comment: string
  rating: number
  highlight: string
}

export type OpinionesConfig = {
  eyebrow: string
  title: string
  intro: string
  stats: { value: string; label: string }[]
  featuredQuote: {
    text: string
    author: string
    subtitle: string
  }
  testimonials: TestimonialEntry[]
  cta: {
    title: string
    description: string
  }
}

const picadoOpiniones: OpinionesConfig = {
  eyebrow: "Testimonios",
  title: "Opiniones",
  intro:
    "Lo que nuestros clientes dicen sobre su experiencia en Picado Fino. Sus palabras son nuestra mayor motivación.",
  stats: [
    { value: "4.9", label: "Calificación Promedio" },
    { value: "2,500+", label: "Clientes Satisfechos" },
    { value: "98%", label: "Recomendaría" },
  ],
  featuredQuote: {
    text: "Picado Fino no es solo un restaurante, es una experiencia que te transporta a las raíces del asado argentino pero con un toque de sofisticación que lo hace único. Cada visita es especial.",
    author: "Revista Gastronómica BA",
    subtitle: "Crítica destacada 2024",
  },
  testimonials: [
    {
      name: "María González",
      date: "Marzo 2024",
      comment:
        "La mejor experiencia de parrilla que he tenido en Buenos Aires. El bife de chorizo estaba en su punto perfecto, jugoso por dentro con esa costra ahumada increíble. El servicio fue impecable y el ambiente es exactamente lo que buscaba: elegante pero cálido. Ya reservé para volver el próximo mes.",
      rating: 5,
      highlight: "Bife de Chorizo",
    },
    {
      name: "Carlos Rodríguez",
      date: "Febrero 2024",
      comment:
        "Ambiente increíble y atención de primera. Las empanadas son las más auténticas que probé fuera de Salta, el repulgue perfecto y el relleno jugoso como debe ser. El Malbec que nos recomendaron fue el maridaje ideal. Muy recomendado para una cena especial.",
      rating: 5,
      highlight: "Empanadas Salteñas",
    },
    {
      name: "Ana Martínez",
      date: "Febrero 2024",
      comment:
        "El pollo a la brasa es espectacular. Vinimos por recomendación y no nos decepcionó. La piel súper crujiente y la carne increíblemente jugosa. Se nota que lo marinan bien y lo cocinan con paciencia. El mejor lugar para una cena familiar.",
      rating: 5,
      highlight: "Pollo a la Brasa",
    },
    {
      name: "Martín Suárez",
      date: "Enero 2024",
      comment:
        "Llevé a mis colegas del extranjero para mostrarles lo que es un verdadero asado argentino y quedaron fascinados. La parrillada para compartir es abundante y de una calidad excepcional. El entraña estaba perfecta. Gran elección para impresionar.",
      rating: 5,
      highlight: "Parrillada Picado Fino",
    },
    {
      name: "Lucía Fernández",
      date: "Enero 2024",
      comment:
        "El vacío más tierno que probé en mi vida. Se nota la maduración de la carne y el cuidado en la cocción. Me encantó también la provoleta de entrada, con ese toque de orégano y el punto justo de gratinado. Un 10 en todo.",
      rating: 5,
      highlight: "Vacío",
    },
    {
      name: "Diego López",
      date: "Diciembre 2023",
      comment:
        "Celebramos nuestro aniversario acá y fue una noche perfecta. La atención personalizada, el sommelier nos guió increíble con los vinos, y los cortes estaban todos en su punto. El postre de dulce de leche fue el broche de oro. Volveremos cada año.",
      rating: 5,
      highlight: "Experiencia Completa",
    },
    {
      name: "Valentina Castro",
      date: "Diciembre 2023",
      comment:
        "Por fin un lugar donde el asado de tira queda como en casa de la abuela, pero con una presentación premium. Las achuras también estaban increíbles, especialmente la molleja. El ambiente es perfecto para una salida con amigos.",
      rating: 5,
      highlight: "Asado de Tira",
    },
    {
      name: "Roberto Méndez",
      date: "Noviembre 2023",
      comment:
        "Soy bastante exigente con la parrilla y debo decir que Picado Fino superó mis expectativas. El ojo de bife tenía un veteado perfecto y el punto de cocción exacto que pedí. Se ve que trabajan con proveedores de calidad. Felicitaciones.",
      rating: 5,
      highlight: "Ojo de Bife",
    },
    {
      name: "Camila Ortiz",
      date: "Noviembre 2023",
      comment:
        "Pedimos la docena de empanadas surtidas para picar mientras esperábamos el plato principal. Cada sabor más rico que el anterior. Las de carne cortada a cuchillo son un must. El lugar tiene muy buena onda y el personal es súper atento.",
      rating: 5,
      highlight: "Docena Surtida",
    },
  ],
  cta: {
    title: "Vive tu propia experiencia",
    description:
      "Únete a los miles de clientes que ya descubrieron el sabor auténtico del asado argentino en Picado Fino. Reserva tu mesa y crea tu propio momento inolvidable.",
  },
}

const laEsquinaOpiniones: OpinionesConfig = {
  eyebrow: "Testimonios",
  title: "Opiniones",
  intro:
    "La voz de quienes eligen La Esquina para el día a día: rapidez, sabor y la misma calidad de siempre.",
  stats: [
    { value: "4.8", label: "Calificación Promedio" },
    { value: "1,800+", label: "Pedidos felices" },
    { value: "96%", label: "Volverían" },
  ],
  featuredQuote: {
    text: "La Esquina demuestra que se puede comer de verdad bien sin dedicarle tres horas al almuerzo. Ideal para Palermo que no para.",
    author: "Guía Express BA",
    subtitle: "Reseña 2024",
  },
  testimonials: [
    {
      name: "Lucas Pérez",
      date: "Abril 2024",
      comment:
        "Increíble que puedas comer tan bien y tan rápido. El choripán es de los mejores que probé. Perfecto para el almuerzo entre reuniones.",
      rating: 5,
      highlight: "Choripán",
    },
    {
      name: "Sofía Herrera",
      date: "Marzo 2024",
      comment:
        "Vengo siempre que quiero algo rico sin esperar una hora. La calidad se nota que es la misma que en Picado Fino pero más accesible.",
      rating: 5,
      highlight: "Combo mediodía",
    },
    {
      name: "Martín Gutiérrez",
      date: "Marzo 2024",
      comment:
        "El combo de empanadas para llevar es genial. Perfecto para una reunión en casa. Siempre calentitas y bien rellenas.",
      rating: 5,
      highlight: "Empanadas x6",
    },
    {
      name: "Paula Rivas",
      date: "Febrero 2024",
      comment:
        "Pedimos familia el domingo y llegó todo en tiempo récord. Las papas crocantes y el pollo jugoso como debe ser.",
      rating: 5,
      highlight: "Combo familiar",
    },
    {
      name: "Nicolás Ferreyra",
      date: "Febrero 2024",
      comment:
        "La bondiola sandwich es un viaje de ida. Buen pan, buena carne, buena salsa. Volvería solo por eso.",
      rating: 5,
      highlight: "Bondiola sandwich",
    },
    {
      name: "Julieta Morán",
      date: "Enero 2024",
      comment:
        "Me salva todos los viernes al salir del gym. Pedido por WhatsApp y en 15 minutos retiro. Súper práctico.",
      rating: 5,
      highlight: "Servicio rápido",
    },
  ],
  cta: {
    title: "Probá La Esquina",
    description:
      "Hacé tu pedido por WhatsApp y comprobá por qué miles eligen el formato express de nuestra parrilla.",
  },
}

const opiniones: Record<RestaurantSlug, OpinionesConfig> = {
  "picado-fino": picadoOpiniones,
  "la-esquina": laEsquinaOpiniones,
}

export function getOpinionesConfig(slug: RestaurantSlug): OpinionesConfig {
  return opiniones[slug]
}
