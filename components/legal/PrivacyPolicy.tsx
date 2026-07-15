const sections = [
  { id: "informacion-general", label: "Información general" },
  { id: "datos-recopilados", label: "Datos recopilados" },
  { id: "finalidad-tratamiento", label: "Finalidad del tratamiento" },
  { id: "whatsapp-business", label: "Uso de WhatsApp Business" },
  { id: "inteligencia-artificial", label: "Uso de inteligencia artificial" },
  { id: "comparticion-informacion", label: "Compartición de información" },
  { id: "conservacion-datos", label: "Conservación de datos" },
  { id: "derechos-usuario", label: "Derechos del usuario" },
  { id: "eliminacion-datos", label: "Solicitud de eliminación de datos" },
  { id: "modificaciones", label: "Modificaciones" },
] as const

export function PrivacyPolicy() {
  return (
    <article className="legal-page" id="inicio">
      <header className="legal-hero">
        <div className="legal-container">
          <p className="legal-eyebrow">Información legal</p>
          <h1>Política de Privacidad</h1>
          <p className="legal-updated">
            Última actualización: <time dateTime="2026-07-15">15 de julio de 2026</time>
          </p>
          <p className="legal-intro">
            En esta política explicamos qué datos personales tratamos en Picado Fino,
            para qué los utilizamos y qué opciones tienen las personas que se comunican
            con nosotros a través de nuestros canales digitales.
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
          <section id="informacion-general">
            <h2><span>01</span> Información general</h2>
            <p>
              Picado Fino recopila y procesa datos personales para prestar sus servicios
              gastronómicos, gestionar la relación con sus clientes y brindar atención
              por sus canales presenciales y digitales. El tratamiento se realiza de
              acuerdo con las finalidades informadas en esta política y con la normativa
              aplicable.
            </p>
          </section>

          <section id="datos-recopilados">
            <h2><span>02</span> Datos recopilados</h2>
            <p>
              Según el canal utilizado y el servicio solicitado, podemos recopilar las
              siguientes categorías de información:
            </p>
            <ul>
              <li>nombre y apellido;</li>
              <li>número telefónico;</li>
              <li>mensajes enviados mediante WhatsApp;</li>
              <li>información relacionada con pedidos y reservas;</li>
              <li>direcciones de entrega;</li>
              <li>preferencias de productos;</li>
            </ul>
            <p>
              Solicitamos únicamente la información razonablemente necesaria para
              atender cada interacción o prestar el servicio requerido.
            </p>
          </section>

          <section id="finalidad-tratamiento">
            <h2><span>03</span> Finalidad del tratamiento</h2>
            <p>Los datos personales pueden utilizarse para:</p>
            <ul>
              <li>gestionar pedidos y coordinar entregas;</li>
              <li>administrar reservas;</li>
              <li>brindar atención al cliente y responder consultas;</li>
              <li>mejorar la calidad y disponibilidad del servicio;</li>
              <li>realizar análisis operativos y estadísticos;</li>
              <li>prevenir usos indebidos de nuestros canales; y</li>
              <li>cumplir obligaciones legales y requerimientos de autoridades competentes.</li>
            </ul>
          </section>

          <section id="whatsapp-business">
            <h2><span>04</span> Uso de WhatsApp Business</h2>
            <p>
              Picado Fino utiliza WhatsApp Business como canal oficial para recibir y
              responder consultas, gestionar pedidos, coordinar entregas, administrar
              reservas y brindar atención al cliente.
            </p>
            <p>
              Al utilizar WhatsApp, la información también puede ser tratada por Meta
              Platforms y sus empresas vinculadas de acuerdo con sus propios términos y
              políticas de privacidad. Recomendamos revisar esas políticas para conocer
              cómo Meta trata la información dentro de su plataforma. Picado Fino no
              controla los tratamientos realizados directamente por Meta.
            </p>
          </section>

          <section id="inteligencia-artificial">
            <h2><span>05</span> Uso de inteligencia artificial</h2>
            <p>
              Algunas conversaciones mantenidas por WhatsApp pueden ser recibidas,
              analizadas o respondidas mediante sistemas automatizados y herramientas
              de inteligencia artificial. Estas tecnologías se utilizan para comprender
              las consultas, ofrecer información útil y mejorar los tiempos de respuesta
              y la disponibilidad del canal.
            </p>
            <p>
              Cuando una solicitud requiera revisión, asistencia especial o intervención
              adicional, la conversación podrá ser derivada a personal humano. Los
              sistemas automatizados no sustituyen la atención humana cuando esta
              resulte necesaria.
            </p>
          </section>

          <section id="comparticion-informacion">
            <h2><span>06</span> Compartición de información</h2>
            <p>
              No vendemos datos personales. La información podrá compartirse, en la
              medida necesaria para las finalidades informadas, únicamente con:
            </p>
            <ul>
              <li>proveedores tecnológicos;</li>
              <li>proveedores de infraestructura y alojamiento;</li>
              <li>plataformas de mensajería;</li>
              <li>proveedores de servicios necesarios para operar el negocio; y</li>
              <li>autoridades públicas cuando exista una obligación legal o requerimiento válido.</li>
            </ul>
            <p>
              Procuramos que los proveedores traten la información bajo instrucciones
              adecuadas y con medidas de seguridad acordes con el servicio prestado.
            </p>
          </section>

          <section id="conservacion-datos">
            <h2><span>07</span> Conservación de datos</h2>
            <p>
              Conservaremos los datos personales únicamente durante el tiempo necesario
              para cumplir las finalidades descritas en esta política, atender solicitudes,
              mantener registros operativos y cumplir las obligaciones legales aplicables.
              Una vez finalizados esos plazos, los datos serán eliminados, anonimizados o
              conservados de forma restringida cuando corresponda legalmente.
            </p>
          </section>

          <section id="derechos-usuario">
            <h2><span>08</span> Derechos del usuario</h2>
            <p>
              Las personas pueden solicitar, conforme a la normativa aplicable:
            </p>
            <ul>
              <li>acceso a sus datos personales;</li>
              <li>actualización de información incompleta o desactualizada;</li>
              <li>rectificación de datos inexactos; y</li>
              <li>eliminación de sus datos personales cuando corresponda.</li>
            </ul>
            <h3>Cómo ejercer estos derechos</h3>
            <p>
              La solicitud debe enviarse mediante los canales oficiales de contacto de
              Picado Fino, indicando el derecho que se desea ejercer y la información
              necesaria para identificar al solicitante. Podremos requerir una
              verificación razonable de identidad para proteger los datos frente a
              solicitudes no autorizadas.
            </p>
          </section>

          <section id="eliminacion-datos">
            <h2><span>09</span> Solicitud de eliminación de datos</h2>
            <p>
              Los usuarios pueden solicitar la eliminación de sus datos personales
              mediante los canales oficiales de contacto publicados por el establecimiento,
              incluido el canal oficial de WhatsApp de Picado Fino. La solicitud deberá
              indicar que se desea eliminar la información personal y aportar los datos
              mínimos que permitan localizarla y verificar la identidad del solicitante.
            </p>
            <p>
              Atenderemos la solicitud dentro de los plazos aplicables. Cierta información
              podrá conservarse cuando sea necesaria para cumplir obligaciones legales,
              resolver controversias, prevenir fraude o acreditar operaciones realizadas.
            </p>
          </section>

          <section id="modificaciones">
            <h2><span>10</span> Modificaciones</h2>
            <p>
              Esta Política de Privacidad puede actualizarse periódicamente para reflejar
              cambios en nuestros servicios, canales, proveedores o requisitos legales.
              La fecha de la versión vigente se mostrará siempre en la parte superior del
              documento. Recomendamos consultar esta página de forma periódica.
            </p>
          </section>

          <a className="legal-back-top" href="#inicio" aria-label="Volver al inicio de la política">
            Volver arriba <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </article>
  )
}
