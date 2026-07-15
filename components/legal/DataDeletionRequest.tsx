const sections = [
  { id: "introduccion", label: "Introducción" },
  { id: "datos-eliminables", label: "Datos que pueden eliminarse" },
  { id: "como-solicitar", label: "Cómo realizar una solicitud" },
  { id: "validacion", label: "Proceso de validación" },
  { id: "tiempo-procesamiento", label: "Tiempo de procesamiento" },
  { id: "excepciones", label: "Excepciones" },
  { id: "plataformas-terceros", label: "Uso de plataformas de terceros" },
  { id: "contacto", label: "Contacto" },
] as const

export function DataDeletionRequest() {
  return (
    <article className="legal-page" id="inicio">
      <header className="legal-hero">
        <div className="legal-container">
          <p className="legal-eyebrow">Privacidad y datos personales</p>
          <h1>Solicitud de Eliminación de Datos</h1>
          <p className="legal-updated">
            Última actualización: <time dateTime="2026-07-15">15 de julio de 2026</time>
          </p>
          <p className="legal-intro">
            En esta página explicamos qué información puede eliminarse, cómo
            presentar una solicitud y qué pasos sigue Picado Fino para proteger
            los datos y verificar la identidad del solicitante.
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
          <section id="introduccion">
            <h2><span>01</span> Introducción</h2>
            <p>
              Picado Fino respeta el derecho de las personas a solicitar la
              eliminación de sus datos personales almacenados en sus sistemas y
              canales digitales. Las solicitudes serán evaluadas y atendidas de
              acuerdo con la normativa aplicable, las medidas de seguridad
              necesarias y las excepciones detalladas en esta página.
            </p>
          </section>

          <section id="datos-eliminables">
            <h2><span>02</span> Datos que pueden eliminarse</h2>
            <p>El titular puede solicitar la eliminación de:</p>
            <ul>
              <li>nombre y apellido;</li>
              <li>número telefónico;</li>
              <li>historial de conversaciones;</li>
              <li>direcciones registradas;</li>
              <li>información de pedidos y reservas;</li>
              <li>preferencias registradas; y</li>
              <li>cualquier otra información personal almacenada por el establecimiento.</li>
            </ul>
            <p>
              La eliminación comprenderá los registros que puedan identificarse
              razonablemente y que no deban conservarse por alguno de los motivos
              indicados en la sección de excepciones.
            </p>
          </section>

          <section id="como-solicitar">
            <h2><span>03</span> Cómo realizar una solicitud</h2>
            <p>
              La solicitud puede presentarse mediante los canales oficiales de
              contacto de Picado Fino, incluido su canal oficial de WhatsApp. Para
              que podamos localizar los registros correspondientes, deberá incluir:
            </p>
            <ul>
              <li>nombre del titular;</li>
              <li>número telefónico asociado a los datos;</li>
              <li>una descripción clara de la solicitud; e</li>
              <li>información suficiente para identificar los registros que se desean eliminar.</li>
            </ul>
            <p>
              Recomendamos indicar expresamente que se trata de una “Solicitud de
              eliminación de datos personales”. No deben enviarse contraseñas,
              códigos de acceso ni información que no sea necesaria para tramitarla.
            </p>
          </section>

          <section id="validacion">
            <h2><span>04</span> Proceso de validación</h2>
            <p>
              Para proteger la información frente a solicitudes fraudulentas o no
              autorizadas, Picado Fino podrá solicitar información adicional que
              permita verificar razonablemente la identidad del solicitante y su
              relación con los datos.
            </p>
            <p>
              La eliminación se realizará una vez completada la validación. Si no
              fuera posible confirmar la identidad o localizar los registros,
              informaremos qué información adicional resulta necesaria.
            </p>
          </section>

          <section id="tiempo-procesamiento">
            <h2><span>05</span> Tiempo de procesamiento</h2>
            <p>
              Las solicitudes serán procesadas dentro de un plazo razonable,
              conforme a la normativa aplicable y a las necesidades operativas del
              establecimiento. Como plazo estimado, procuraremos completar el
              proceso entre 15 y 30 días corridos desde que la solicitud cuente con
              toda la información necesaria y la identidad haya sido validada.
            </p>
            <p>
              Si la complejidad o el alcance de la solicitud exigieran más tiempo,
              se comunicará esa circunstancia al titular por un canal disponible.
            </p>
          </section>

          <section id="excepciones">
            <h2><span>06</span> Excepciones</h2>
            <p>
              Ciertos datos podrán conservarse cuando exista una obligación legal,
              fiscal, contable o regulatoria que así lo requiera, o cuando sean
              necesarios para acreditar operaciones, resolver controversias,
              prevenir fraude o ejercer derechos.
            </p>
            <p>
              En esos casos, la información se mantendrá únicamente durante el
              plazo necesario, con acceso restringido y limitada a la finalidad
              que justifique su conservación.
            </p>
          </section>

          <section id="plataformas-terceros">
            <h2><span>07</span> Uso de plataformas de terceros</h2>
            <p>
              Algunos datos pueden permanecer almacenados temporalmente o ser
              procesados en servicios de terceros utilizados para operar los
              canales digitales, entre ellos:
            </p>
            <ul>
              <li>WhatsApp Business Platform;</li>
              <li>Meta Platforms;</li>
              <li>proveedores de infraestructura tecnológica; y</li>
              <li>servicios de automatización y procesamiento de mensajes.</li>
            </ul>
            <p>
              Picado Fino gestionará las acciones que se encuentren bajo su control.
              La eliminación de información tratada directamente por esos
              proveedores también podrá estar sujeta a sus políticas, plazos y
              procedimientos propios.
            </p>
          </section>

          <section id="contacto">
            <h2><span>08</span> Contacto</h2>
            <p>
              Las solicitudes de eliminación y las consultas sobre este
              procedimiento pueden realizarse mediante los canales oficiales de
              contacto publicados por Picado Fino, incluido el canal oficial de
              WhatsApp del establecimiento.
            </p>
          </section>

          <a
            className="legal-back-top"
            href="#inicio"
            aria-label="Volver al inicio de la solicitud de eliminación"
          >
            Volver arriba <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </article>
  )
}
