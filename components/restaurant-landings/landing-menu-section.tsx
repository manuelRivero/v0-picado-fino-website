"use client"

import { type MenuItem, formatItemPrice } from "@/lib/api"

type Props = {
  items: MenuItem[]
  whatsappHref?: string
}

export function LandingMenuSection({ items, whatsappHref }: Props) {
  if (items.length === 0) {
    return (
      <div className="le-landing-menu-empty pf-reveal">
        <p className="pf-cormorant">
          La carta completa está disponible por WhatsApp. Escribinos y te la enviamos al instante.
        </p>
        {whatsappHref && (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="pf-btn-outline pf-sans">
            Ver carta completa
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="pf-reveal">
      <div className="pf-menu-grid">
        {items.map((item) => (
          <div key={item.id} className="pf-menu-item">
            <div>
              <div className="pf-menu-item-name pf-serif">{item.name}</div>
              <div className="pf-menu-item-desc pf-cormorant">{item.description}</div>
            </div>
            <div className="pf-menu-item-price pf-serif">{formatItemPrice(item)}</div>
          </div>
        ))}
      </div>
      {whatsappHref && (
        <div className="le-landing-menu-footer">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="pf-btn-outline pf-sans">
            Ver carta completa
          </a>
        </div>
      )}
    </div>
  )
}
