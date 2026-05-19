import Image from "next/image"
import type { ReactNode } from "react"

type ExperienceItem = readonly [string, string, string]

type Props = {
  logoSrc: string
  logoAlt: string
  title: ReactNode
  intro: string
  items: readonly ExperienceItem[]
}

export function ExperienceSection({ logoSrc, logoAlt, title, intro, items }: Props) {
  return (
    <section className="le-experiencia" id="experiencia">
      <div className="le-experiencia-grid">
        <div className="le-experiencia-content">
          <div className="le-menu-intro le-menu-intro--experiencia">
            <div className="pf-section-label pf-sans pf-reveal">La experiencia</div>
            <h2 className="pf-reveal pf-delay-1 pf-serif">{title}</h2>
            <p className="pf-reveal pf-delay-2 pf-cormorant">{intro}</p>
            <div className="pf-identidad-features pf-reveal pf-delay-3">
              {items.map(([num, name, desc]) => (
                <div key={num} className="pf-feature-row">
                  <span className="pf-feature-num pf-serif">{num}</span>
                  <div className="pf-feature-content">
                    <span className="pf-feature-name pf-sans">{name}</span>
                    {desc ? <p className="pf-feature-desc pf-cormorant">{desc}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="le-experiencia-logo pf-reveal pf-delay-2">
        
        </div>
      </div>
    </section>
  )
}
