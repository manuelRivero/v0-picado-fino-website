import type { PublicBusiness } from "@/lib/api"
import { formatBusinessHoursLines, mapsUrl } from "@/lib/api"

const sectionLabelStyle = {
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  color: "var(--brand-yellow)",
  marginBottom: "16px",
}

const sectionBodyStyle = {
  fontSize: "18px",
  lineHeight: 1.85,
  color: "var(--pf-body-text)",
}

export function BusinessHoursLocation({ business }: { business: PublicBusiness }) {
  const hoursLines =
    business.businessHours?.length ? formatBusinessHoursLines(business.businessHours) : []
  const streetAddress = business.streetAddress?.trim() ?? ""
  const mapHref = mapsUrl(business.location)

  if (!hoursLines.length && !streetAddress && !mapHref) return null

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
          gap:
            [hoursLines.length, streetAddress, mapHref].filter(Boolean).length > 1
              ? "36px"
              : "0",
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
        {streetAddress ? (
          <div>
            <div className="pf-sans" style={sectionLabelStyle}>
              Dirección
            </div>
            <p className="pf-cormorant" style={{ margin: 0, ...sectionBodyStyle }}>
              {streetAddress}
            </p>
          </div>
        ) : null}
        {mapHref ? (
          <div>
            <div className="pf-sans" style={sectionLabelStyle}>
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
