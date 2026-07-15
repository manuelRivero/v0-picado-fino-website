const sections = [
  { id: "aceptacion", label: "Aceptación de los términos" },
  { id: "descripcion-servicio", label: "Descripción del servicio" },
  { id: "uso-permitido", label: "Uso permitido del servicio" },
  { id: "pedidos-reservas", label: "Pedidos y reservas" },
  { id: "precios-disponibilidad", label: "Precios y disponibilidad" },
  { id: "whatsapp-business", label: "Uso de WhatsApp Business" },
  { id: "automatizacion-ia", label: "Automatización e inteligencia artificial" },
  { id: "propiedad-intelectual", label: "Propiedad intelectual" },
  { id: "limitacion-responsabilidad", label: "Limitación de responsabilidad" },
  { id: "enlaces-terceros", label: "Enlaces a terceros" },
  { id: "modificaciones", label: "Modificaciones" },
  { id: "legislacion-aplicable", label: "Legislación aplicable" },
  { id: "contacto", label: "Contacto" },
] as const

export function TermsAndConditions() {
  return (
    <article className="legal-page" id="inicio">
      <header className="legal-hero">
        <div className="legal-container">
          <p className="legal-eyebrow">Información legal</p>
          <h1>Términos y Condiciones</h1>
          <p className="legal-updated">
            Última actualización: <time dateTime="2026-07-15">15 de julio de 2026</time>
          </p>
          <p className="legal-intro">
            Estos términos regulan el acceso y uso del sitio web, WhatsApp y los
            demás canales digitales mediante los cuales Picado Fino ofrece sus
            servicios y se comunica con sus clientes.
          </p>
        </div>
      </header>

      <div className="legal-layout legal-container">
        <nav className="legal-toc" aria-labelledby="legal-toc-title">
          <p id="legal-toc-title">Contenido</p>
          <ol>
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal-content">
          <section id="aceptacion">
            <h2><span>01</span> Aceptación de los términos</h2>
            <p>
              El acceso o utilización del sitio web de Picado Fino, su canal de
              WhatsApp y los demás canales digitales del establecimiento implica
              la aceptación de estos Términos y Condiciones. Si una persona no
              está de acuerdo con ellos, deberá abstenerse de utilizar dichos
              canales y servicios.
            </p>
          </section>

          <section id="descripcion-servicio">
            <h2><span>02</span> Descripción del servicio</h2>
            <p>
              Picado Fino presta servicios gastronómicos y de atención al cliente
              a través de distintos canales digitales, entre ellos:
            </p>
            <ul>
              <li>el sitio web;</li>
              <li>WhatsApp;</li>
              <li>redes sociales;</li>
              <li>atención telefónica; y</li>
              <li>canales automatizados.</li>
            </ul>
            <p>Según el canal y la disponibilidad operativa, los servicios pueden incluir:</p>
            <ul>
              <li>recepción y respuesta de consultas;</li>
              <li>gestión de pedidos;</li>
              <li>gestión de reservas;</li>
              <li>seguimiento de pedidos; y</li>
              <li>atención postventa.</li>
            </ul>
          </section>

          <section id="uso-permitido">
            <h2><span>03</span> Uso permitido del servicio</h2>
            <p>Al utilizar nuestros canales, los usuarios se comprometen a:</p>
            <ul>
              <li>proporcionar información veraz, completa y actualizada;</li>
              <li>utilizar los servicios de forma lícita y respetuosa;</li>
              <li>no realizar actividades fraudulentas o engañosas;</li>
              <li>no interferir ni intentar afectar el funcionamiento del servicio; y</li>
              <li>no enviar spam, contenido ilícito, ofensivo o que vulnere derechos de terceros.</li>
            </ul>
            <p>
              Picado Fino podrá limitar o interrumpir la atención cuando detecte
              un uso abusivo, fraudulento o contrario a estos términos.
            </p>
          </section>

          <section id="pedidos-reservas">
            <h2><span>04</span> Pedidos y reservas</h2>
            <p>
              Todos los pedidos y reservas están sujetos a confirmación y
              disponibilidad de productos, capacidad, horarios y recursos del
              establecimiento. El envío de una solicitud no garantiza por sí solo
              su aceptación.
            </p>
            <p>
              Los tiempos de preparación, atención y entrega son estimativos y
              pueden variar por demanda, tránsito, condiciones climáticas u otras
              circunstancias operativas. Picado Fino podrá rechazar o cancelar
              pedidos cuando no pueda cumplirlos razonablemente, informándolo por
              el canal disponible. Las entregas también pueden estar sujetas a
              horarios, zonas geográficas y montos mínimos.
            </p>
          </section>

          <section id="precios-disponibilidad">
            <h2><span>05</span> Precios y disponibilidad</h2>
            <p>
              Los precios, promociones y condiciones comerciales pueden
              modificarse sin previo aviso, salvo que la normativa aplicable
              disponga lo contrario. La disponibilidad de productos puede variar
              durante el día y entre canales de venta.
            </p>
            <p>
              Los errores evidentes de publicación, transcripción o configuración
              podrán ser corregidos por Picado Fino. Si un error afecta un pedido
              ya iniciado, el establecimiento comunicará la situación antes de
              confirmarlo o continuará de acuerdo con lo que corresponda legalmente.
            </p>
          </section>

          <section id="whatsapp-business">
            <h2><span>06</span> Uso de WhatsApp Business</h2>
            <p>
              WhatsApp Business es uno de los canales oficiales de comunicación de
              Picado Fino. Al iniciar una conversación o facilitar su número para
              gestionar un servicio, el usuario acepta recibir mensajes
              relacionados con:
            </p>
            <ul>
              <li>pedidos;</li>
              <li>reservas;</li>
              <li>actualizaciones de estado; y</li>
              <li>consultas o gestiones solicitadas por el propio usuario.</li>
            </ul>
            <p>
              El funcionamiento de WhatsApp y el tratamiento de información
              realizado dentro de esa plataforma también están sujetos a los
              términos y políticas de privacidad de Meta Platforms y sus empresas
              vinculadas.
            </p>
          </section>

          <section id="automatizacion-ia">
            <h2><span>07</span> Automatización e inteligencia artificial</h2>
            <p>
              Algunas respuestas pueden ser generadas o asistidas automáticamente
              mediante sistemas de inteligencia artificial. Estas herramientas se
              utilizan para comprender consultas frecuentes, mejorar los tiempos
              de respuesta y ampliar la disponibilidad del servicio.
            </p>
            <p>
              Cuando una solicitud requiera análisis adicional, atención especial
              o una decisión operativa, la conversación podrá ser derivada a
              personal humano del establecimiento.
            </p>
          </section>

          <section id="propiedad-intelectual">
            <h2><span>08</span> Propiedad intelectual</h2>
            <p>
              Las marcas, logotipos, nombres comerciales, diseños, fotografías,
              textos, piezas audiovisuales y demás contenidos disponibles en los
              canales de Picado Fino pertenecen al establecimiento o a sus
              respectivos titulares.
            </p>
            <p>
              No está permitido copiar, reproducir, modificar, distribuir,
              publicar o utilizar esos elementos con fines comerciales sin la
              autorización previa del titular correspondiente.
            </p>
          </section>

          <section id="limitacion-responsabilidad">
            <h2><span>09</span> Limitación de responsabilidad</h2>
            <p>Picado Fino no garantiza:</p>
            <ul>
              <li>la disponibilidad ininterrumpida de sus sistemas o canales;</li>
              <li>la ausencia total de errores técnicos; ni</li>
              <li>la disponibilidad permanente de plataformas operadas por terceros.</li>
            </ul>
            <p>
              En la medida permitida por la legislación aplicable, Picado Fino no
              será responsable por demoras, fallas o interrupciones originadas en
              servicios ajenos a su control razonable, incluidos Meta, WhatsApp,
              proveedores de internet y servicios de infraestructura tecnológica.
              Esta limitación no excluye responsabilidades que legalmente no
              puedan ser limitadas.
            </p>
          </section>

          <section id="enlaces-terceros">
            <h2><span>10</span> Enlaces a terceros</h2>
            <p>
              El sitio y los canales digitales pueden incluir enlaces a páginas,
              aplicaciones o servicios externos. Picado Fino no controla su
              disponibilidad, seguridad, contenidos, términos ni políticas de
              privacidad. El uso de esos servicios se rige por las condiciones de
              sus respectivos titulares.
            </p>
          </section>

          <section id="modificaciones">
            <h2><span>11</span> Modificaciones</h2>
            <p>
              Picado Fino podrá modificar estos Términos y Condiciones para
              reflejar cambios en sus servicios, canales, proveedores o requisitos
              legales. La fecha de actualización de la versión vigente se
              mantendrá visible en la parte superior de este documento.
            </p>
          </section>

          <section id="legislacion-aplicable">
            <h2><span>12</span> Legislación aplicable</h2>
            <p>
              Estos Términos y Condiciones se regirán e interpretarán conforme a
              las leyes de la República Argentina, sin perjuicio de los derechos
              y normas de orden público que resulten aplicables a consumidores y
              usuarios.
            </p>
          </section>

          <section id="contacto">
            <h2><span>13</span> Contacto</h2>
            <p>
              Las consultas relacionadas con estos Términos y Condiciones pueden
              realizarse mediante los canales oficiales de contacto publicados
              por Picado Fino, incluido su canal oficial de WhatsApp.
            </p>
          </section>

          <a className="legal-back-top" href="#inicio" aria-label="Volver al inicio de los términos">
            Volver arriba <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </article>
  )
}
