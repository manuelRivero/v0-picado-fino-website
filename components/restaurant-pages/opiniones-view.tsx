import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, MessageCircle } from "lucide-react"
import type { RestaurantSlug } from "@/lib/restaurants"
import { RESTAURANT_WHATSAPP } from "@/lib/restaurants"
import { getOpinionesConfig } from "@/lib/opiniones-data"

export function OpinionesView({ slug }: { slug: RestaurantSlug }) {
  const config = getOpinionesConfig(slug)
  const whatsappUrl = RESTAURANT_WHATSAPP[slug]

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">{config.eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-4">{config.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{config.intro}</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-20 max-w-3xl mx-auto">
          {config.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-8 md:p-12 mb-16 relative overflow-hidden">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed italic">
              {`"${config.featuredQuote.text}"`}
            </p>
            <div className="mt-8">
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-semibold text-foreground">{config.featuredQuote.author}</p>
              <p className="text-sm text-muted-foreground">{config.featuredQuote.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {config.testimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.name}-${index}`}
              className="bg-card border-border hover:border-primary/30 transition-colors duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{`"${testimonial.comment}"`}</p>
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

        <div className="bg-primary rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">{config.cta.title}</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">{config.cta.description}</p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              {slug === "la-esquina" ? "Pedir por WhatsApp" : "Reservar Ahora"}
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
