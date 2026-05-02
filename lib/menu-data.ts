import type { LucideIcon } from "lucide-react"
import {
  Flame,
  Drumstick,
  ChefHat,
  Wine,
  Zap,
} from "lucide-react"
import type { RestaurantSlug } from "./restaurants"

export type MenuCategoryConfig = {
  id: string
  label: string
  icon: LucideIcon
}

export type MenuItemEntry = {
  id: number
  name: string
  description: string
  price: number
  image: string
  featured?: boolean
}

export type MenuConfig = {
  header: {
    eyebrow: string
    title: string
    description: string
  }
  categories: MenuCategoryConfig[]
  itemsByCategory: Record<string, MenuItemEntry[]>
  defaultCategory: string
}

const picadoFinoMenu: MenuConfig = {
  header: {
    eyebrow: "Nuestra Carta",
    title: "Menú",
    description:
      "En Picado Fino cada plato es preparado con ingredientes seleccionados y la pasión que define nuestra cocina premium.",
  },
  defaultCategory: "parrilla",
  categories: [
    { id: "parrilla", label: "Parrilla", icon: Flame },
    { id: "pollo", label: "Pollo", icon: Drumstick },
    { id: "empanadas", label: "Empanadas", icon: ChefHat },
    { id: "bebidas", label: "Bebidas", icon: Wine },
  ],
  itemsByCategory: {
    parrilla: [
      {
        id: 1,
        name: "Bife de Chorizo",
        description:
          "Corte clásico argentino de 400g, madurado 21 días, cocido a las brasas con chimichurri casero.",
        price: 8500,
        image: "/images/asado.jpg",
        featured: true,
      },
      {
        id: 2,
        name: "Ojo de Bife",
        description:
          "Corte premium de 350g con veteado perfecto. Jugoso y tierno, servido con papas rústicas.",
        price: 9200,
        image: "/images/gallery-2.jpg",
      },
      {
        id: 3,
        name: "Entraña",
        description:
          "Corte fino y sabroso de 300g. Textura única y sabor intenso, acompañado de ensalada criolla.",
        price: 7800,
        image: "/images/gallery-2.jpg",
      },
      {
        id: 4,
        name: "Vacío",
        description:
          "Corte tradicional de 450g, cocción lenta sobre brasas de quebracho. Incluye guarnición.",
        price: 8200,
        image: "/images/gallery-2.jpg",
      },
      {
        id: 5,
        name: "Asado de Tira",
        description:
          "Costillas de res 500g, el clásico del asado argentino. Crocante por fuera, jugoso por dentro.",
        price: 7500,
        image: "/images/gallery-2.jpg",
      },
      {
        id: 6,
        name: "Parrillada Picado Fino",
        description:
          "Selección de cortes premium para 2 personas: bife, entraña, chorizo, morcilla y achuras.",
        price: 18500,
        image: "/images/gallery-1.jpg",
        featured: true,
      },
    ],
    pollo: [
      {
        id: 7,
        name: "Pollo Entero a la Brasa",
        description:
          "Pollo de campo marinado 24 horas con hierbas frescas, cocido lentamente sobre fuego de leña.",
        price: 6500,
        image: "/images/pollo.jpg",
        featured: true,
      },
      {
        id: 8,
        name: "Medio Pollo a la Brasa",
        description:
          "Media porción de nuestro pollo signature, piel dorada y carne jugosa. Incluye papas.",
        price: 4200,
        image: "/images/pollo.jpg",
      },
      {
        id: 9,
        name: "Suprema a la Parrilla",
        description:
          "Pechuga de pollo grillada con limón y hierbas, acompañada de vegetales de estación.",
        price: 4800,
        image: "/images/pollo.jpg",
      },
      {
        id: 10,
        name: "Pata Muslo x2",
        description: "Dos piezas de pata muslo crujientes, marinadas con especias ahumadas.",
        price: 3800,
        image: "/images/pollo.jpg",
      },
    ],
    empanadas: [
      {
        id: 11,
        name: "Empanada de Carne",
        description:
          "Relleno jugoso de carne cortada a cuchillo, cebolla, huevo y aceitunas. Receta salteña.",
        price: 850,
        image: "/images/empanadas.jpg",
        featured: true,
      },
      {
        id: 12,
        name: "Empanada de Pollo",
        description: "Pollo desmenuzado con cebolla de verdeo, morrón y especias suaves.",
        price: 850,
        image: "/images/empanadas.jpg",
      },
      {
        id: 13,
        name: "Empanada de Jamón y Queso",
        description: "Jamón natural y queso tybo derretido. Clásica y reconfortante.",
        price: 800,
        image: "/images/empanadas.jpg",
      },
      {
        id: 14,
        name: "Empanada de Humita",
        description: "Choclo cremoso con bechamel y un toque de comino. Opción vegetariana.",
        price: 800,
        image: "/images/empanadas.jpg",
      },
      {
        id: 15,
        name: "Docena Surtida",
        description: "12 empanadas variadas a elección. Ideal para compartir en grupo.",
        price: 9000,
        image: "/images/empanadas.jpg",
        featured: true,
      },
    ],
    bebidas: [
      {
        id: 16,
        name: "Malbec Reserva",
        description: "Vino tinto de Mendoza, notas de frutas negras y roble. Botella 750ml.",
        price: 7500,
        image: "/images/bebidas.jpg",
        featured: true,
      },
      {
        id: 17,
        name: "Torrontés",
        description: "Vino blanco aromático de Cafayate. Floral y refrescante. Botella 750ml.",
        price: 5800,
        image: "/images/bebidas.jpg",
      },
      {
        id: 18,
        name: "Copa de Vino",
        description: "Malbec, Cabernet o Torrontés. Servicio por copa 180ml.",
        price: 1800,
        image: "/images/bebidas.jpg",
      },
      {
        id: 19,
        name: "Cerveza Artesanal",
        description: "IPA, Amber Ale o Stout. Pinta de 500ml de cervecería local.",
        price: 2200,
        image: "/images/bebidas.jpg",
      },
      {
        id: 20,
        name: "Agua Mineral",
        description: "Con o sin gas. Botella 500ml.",
        price: 800,
        image: "/images/bebidas.jpg",
      },
      {
        id: 21,
        name: "Gaseosas",
        description: "Coca-Cola, Sprite o Fanta. Lata 354ml.",
        price: 900,
        image: "/images/bebidas.jpg",
      },
    ],
  },
}

const laEsquinaMenu: MenuConfig = {
  header: {
    eyebrow: "Pedidos y mostrador",
    title: "Menú",
    description:
      "En La Esquina vas a encontrar lo mismo que amás de nuestra parrilla, en formato rápido y para llevar.",
  },
  defaultCategory: "choripanes",
  categories: [
    { id: "choripanes", label: "Choripanes", icon: Flame },
    { id: "combos", label: "Combos", icon: Zap },
    { id: "pollo", label: "Pollo Express", icon: Drumstick },
    { id: "empanadas", label: "Empanadas", icon: ChefHat },
    { id: "bebidas", label: "Bebidas", icon: Wine },
  ],
  itemsByCategory: {
    choripanes: [
      {
        id: 101,
        name: "Choripán clásico",
        description: "Chorizo criollo a la parrilla, pan francés y chimichurri de la casa.",
        price: 3200,
        image: "/images/gallery-8.jpg",
        featured: true,
      },
      {
        id: 102,
        name: "Choripán completo",
        description: "Con morrones asados, chimichurri y mayonesa de ajo.",
        price: 3800,
        image: "/images/gallery-8.jpg",
      },
      {
        id: 103,
        name: "Bondiola sandwich",
        description: "Bondiola braseada, pickles y salsa BBQ ahumada.",
        price: 4100,
        image: "/images/asado.jpg",
      },
    ],
    combos: [
      {
        id: 201,
        name: "Combo Mediodía",
        description: "Medio pollo a la brasa + papas fritas + bebida sin alcohol.",
        price: 8900,
        image: "/images/pollo.jpg",
        featured: true,
      },
      {
        id: 202,
        name: "Combo Chorizo",
        description: "2 choripanes + papas + gaseosa 500ml.",
        price: 9500,
        image: "/images/gallery-8.jpg",
      },
      {
        id: 203,
        name: "Combo Empanadas x6",
        description: "Media docena a elección + bebida.",
        price: 7200,
        image: "/images/empanadas.jpg",
      },
      {
        id: 204,
        name: "Combo Familiar",
        description: "Docena de empanadas surtidas + papas grandes para compartir.",
        price: 14500,
        image: "/images/empanadas.jpg",
        featured: true,
      },
    ],
    pollo: [
      {
        id: 301,
        name: "Cuarto de pollo",
        description: "Listo en minutos, marinado como siempre en Picado Fino.",
        price: 3400,
        image: "/images/pollo.jpg",
        featured: true,
      },
      {
        id: 302,
        name: "Medio pollo",
        description: "Ideal para compartir en el trabajo o en casa.",
        price: 5600,
        image: "/images/pollo.jpg",
      },
      {
        id: 303,
        name: "Suprema grill",
        description: "Pechuga a la plancha con limón y guarnición liviana.",
        price: 4200,
        image: "/images/pollo.jpg",
      },
    ],
    empanadas: [
      {
        id: 401,
        name: "Empanada de carne",
        description: "Misma masa y relleno que en nuestra casa madre.",
        price: 750,
        image: "/images/empanadas.jpg",
      },
      {
        id: 402,
        name: "Empanada de pollo",
        description: "Pollo desmenuzado suave con especias.",
        price: 750,
        image: "/images/empanadas.jpg",
      },
      {
        id: 403,
        name: "Docena para llevar",
        description: "12 unidades surtidas; pedila con anticipación en horas pico.",
        price: 8200,
        image: "/images/empanadas.jpg",
        featured: true,
      },
    ],
    bebidas: [
      {
        id: 501,
        name: "Gaseosas y agua",
        description: "Línea clásica en frío.",
        price: 900,
        image: "/images/bebidas.jpg",
      },
      {
        id: 502,
        name: "Cerveza tirada",
        description: "Rubia o negra. Pinta 500ml.",
        price: 2100,
        image: "/images/bebidas.jpg",
      },
      {
        id: 503,
        name: "Vino de la casa",
        description: "Copa o botella — consultá disponibilidad.",
        price: 1600,
        image: "/images/bebidas.jpg",
      },
    ],
  },
}

const menus: Record<RestaurantSlug, MenuConfig> = {
  "picado-fino": picadoFinoMenu,
  "la-esquina": laEsquinaMenu,
}

export function getMenuConfig(slug: RestaurantSlug): MenuConfig {
  return menus[slug]
}
