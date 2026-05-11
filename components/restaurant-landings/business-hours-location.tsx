import type { PublicBusiness } from "@/lib/api"
import { formatBusinessHoursLines, mapsUrl } from "@/lib/api"

export function BusinessHoursLocation({ business }: { business: PublicBusiness }) {
  const hoursLines =
    business.businessHours?.length ? formatBusinessHoursLines(business.businessHours) : []
  const mapHref = mapsUrl(business.location)

  if (!hoursLines.length && !mapHref) return null

  return (
    <section
      className="pf-reveal"
      style={{
        borderTop: "1px solid rgba(245,240,232,0.08)",
        borderBottom: "1px solid rgba(245,240,232,0.08)",
        padding: "72px 52px",
        maxWidth: "920px",
        margin: "0 auto",
      }}
    >
      <div className="pf-section-label pf-sans" style={{ marginBottom: "28px" }}>
        Horarios y ubicación
      </div>
      {business.name ? (
        <p
          className="pf-serif"
          style={{
            fontSize: "clamp(26px, 3vw, 36px)",
            marginBottom: "16px",
            color: "var(--pf-cream)",
          }}
        >
          {business.name}
        </p>
      ) : null}
      <div
        style={{
          display: "grid",
          gap: mapHref ? "36px" : "0",
          gridTemplateColumns: "minmax(0, 1fr)",
          alignItems: "start",
        }}
      >
        {hoursLines.length > 0 ? (
          <div>
            <div
              className="pf-sans"
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--brand-yellow)",
                marginBottom: "16px",
              }}
            >
              Horarios
            </div>
            <ul
              className="pf-cormorant"
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "18px",
                lineHeight: 1.85,
                color: "var(--pf-body-text)",
              }}
            >
              {hoursLines.map((line, i) => (
                <li key={`${line}-${i}`}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {mapHref ? (
          <div>
            <div
              className="pf-sans"
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--brand-yellow)",
                marginBottom: "16px",
              }}
            >
              Ubicación
            </div>
            <a href={mapHref} target="_blank" rel="noopener noreferrer" className="pf-btn-ghost pf-sans">
              Ver en Google Maps
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
