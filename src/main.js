import './style.css'

document.querySelector('#app').innerHTML = `
<header class="page-header">
  <div class="container">
    <p class="kicker">Monografía · Seguridad informática</p>
    <h1>Firewalls en redes informáticas y en el Internet de las Cosas</h1>
    <p class="lead">
      Una revisión conceptual de qué son los cortafuegos, cómo funcionan, qué
      variantes existen y por qué su rol es crítico (y distinto) en redes
      tradicionales y en el ecosistema IoT.
    </p>
    <p class="meta">Material de estudio · 2026</p>
  </div>
</header>

<nav class="toc" aria-label="Índice de contenidos">
  <div class="container">
    <span class="toc-title">Contenido</span>
    <ol>
      <li><a href="#resumen">Resumen</a></li>
      <li><a href="#definicion">¿Qué es un firewall?</a></li>
      <li><a href="#clasificacion">Clasificación de firewalls</a></li>
      <li><a href="#mecanismos">Mecanismos de filtrado</a></li>
      <li><a href="#redes">Firewalls en redes tradicionales</a></li>
      <li><a href="#iot">Firewalls en el ecosistema IoT</a></li>
      <li><a href="#comparativa">Comparativa red tradicional vs. IoT</a></li>
      <li><a href="#recomendaciones">Recomendaciones prácticas</a></li>
      <li><a href="#conclusiones">Conclusiones</a></li>
      <li><a href="#referencias">Referencias</a></li>
    </ol>
  </div>
</nav>

<main class="container">
  <article>
    <section id="resumen">
      <h2><span class="hnum">1.</span> Resumen</h2>
      <p>
        Un <em>firewall</em> (o cortafuegos) es un sistema de seguridad cuyo
        propósito es vigilar y regular el tráfico de red, entrante y saliente,
        a partir de un conjunto de reglas predefinidas. En el ámbito de las
        redes informáticas clásicas constituye el elemento de control perimetral
        por excelencia. No obstante, la expansión del Internet de las Cosas
        (IoT) —una red de dispositivos físicos conectados, con recursos
        limitados y a menudo escasa capacidad de actualización— plantea nuevos
        desafíos: el firewall tradicional resulta insuficiente, y se requieren
        estrategias de segmentación, monitoreo continuo y reglas adaptadas a
        cada dispositivo. Este documento presenta una explicación conceptual,
        formalizada desde un enfoque académico, de estas herramientas y su
        aplicación en ambos contextos.
      </p>
    </section>

    <section id="definicion">
      <h2><span class="hnum">2.</span> ¿Qué es un firewall?</h2>
      <p>
        Formalmente, un firewall es un dispositivo o software que actúa como
        <strong>punto único de control</strong> entre dos o más redes de
        confianza diferente —habitualmente una red interna confiable y una red
        externa (por ejemplo, Internet) que no lo es. Su funcionamiento se
        describe por tres componentes fundamentales:
      </p>
      <ul>
        <li>
          <strong>Política de seguridad:</strong> el conjunto de reglas que
          define qué tráfico está permitido y qué tráfico debe bloquearse.
        </li>
        <li>
          <strong>Mecanismo de aplicación:</strong> el motor que inspecciona los
          paquetes y los evalúa contra la política.
        </li>
        <li>
          <strong>Registro y auditoría:</strong> el sistema de registros
          (<em>logs</em>) que documenta los eventos para su análisis posterior.
        </li>
      </ul>
      <p>
        Existen dos principios de diseño que rigen la configuración de estas
        reglas. El principio de <strong>denegación por defecto</strong>
        (<em>default-deny</em>) establece que todo tráfico que no esté
        explícitamente permitido debe ser bloqueado, mientras que el principio
        de <strong>mínimo privilegio</strong> indica que a cada dispositivo se
        le debe conceder únicamente el acceso estrictamente necesario para
        cumplir su función.
      </p>
    </section>

    <section id="clasificacion">
      <h2><span class="hnum">3.</span> Clasificación de firewalls</h2>
      <p>
        Los firewalls pueden clasificarse según su arquitectura de
        funcionamiento, su ubicación en la topología de red o la generación
        tecnológica a la que pertenecen. La siguiente tabla resume la
        clasificación principal por generación:
      </p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Generación</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Limitaciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.ª</td>
              <td>Filtrado de paquetes</td>
              <td>Evalúa cada paquete de forma independiente según direcciones IP y puertos.</td>
              <td>No tiene estado ni contexto; puede ser evadido mediante fragmentación.</td>
            </tr>
            <tr>
              <td>2.ª</td>
              <td>Inspección con estado</td>
              <td>Mantiene un registro (<em>tabla de estados</em>) de las conexiones activas y solo permite tráfico asociado a conexiones legítimas.</td>
              <td>Requiere más memoria; no inspecciona el contenido de la aplicación.</td>
            </tr>
            <tr>
              <td>3.ª</td>
              <td>Firewall de aplicación</td>
              <td>Filtra a nivel de protocolo de aplicación (<em>proxy</em>), analizando el contenido de la comunicación.</td>
              <td>Mayor latencia; exige comprender cada protocolo soportado.</td>
            </tr>
            <tr>
              <td>4.ª</td>
              <td>NGFW (Next-Generation)</td>
              <td>Integra inspección profunda de paquetes, detección de intrusiones (IDS/IPS) y control de aplicaciones en una sola plataforma.</td>
              <td>Mayor costo computacional y económico; requiere gestión especializada.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Desde el punto de vista de su ubicación física o lógica, se distingue
        entre <strong>firewalls de red</strong> (equipos dedicados que protegen
        segmentos completos) y <strong>firewalls de host</strong> (software que
        protege un único dispositivo).
      </p>
    </section>

    <section id="mecanismos">
      <h2><span class="hnum">4.</span> Mecanismos de filtrado</h2>
      <p>
        Independientemente de su implementación, todo firewall aplica un
        conjunto de técnicas de filtrado. Las más relevantes en el contexto de
        esta explicación son:
      </p>
      <ul>
        <li>
          <strong>Filtrado por paquetes (estática y con estado):</strong>
          decisión basada en la cabecera del paquete (IP origen/destino, puertos
          y protocolo). La inspección con estado añade el contexto de la
          conexión.
        </li>
        <li>
          <strong>Traducción de direcciones de red (NAT):</strong> oculta la
          topología interna modificando las direcciones de origen y destino, lo
          que dificulta el contacto directo desde el exterior.
        </li>
        <li>
          <strong>Zonas desmilitarizadas (DMZ):</strong> un segmento intermedio
          donde se colocan los servicios de acceso público, aislándolos de la
          red interna.
        </li>
        <li>
          <strong>Inspección profunda de paquetes (DPI):</strong> examen del
          contenido de la comunicación, más allá de las cabeceras, lo cual
          permite detectar tráfico malicioso embebido en protocolos legítimos.
        </li>
      </ul>
    </section>

    <section id="redes">
      <h2><span class="hnum">5.</span> Firewalls en redes tradicionales</h2>
      <p>
        En las redes corporativas y domésticas clásicas, el firewall suele
        desplegarse en el <strong>perímetro de la red</strong>, es decir, en el
        punto de unión entre la red interna y el proveedor de servicios de
        Internet. Su responsabilidad principal consiste en:
      </p>
      <ul>
        <li>Bloquear accesos no autorizados desde el exterior.</li>
        <li>Restringir las salidas a Internet según la política corporativa.</li>
        <li>Proteger servicios publicados mediante DMZ y reglas de traducción.</li>
        <li>Registrar eventos de seguridad para su posterior auditoría forense.</li>
      </ul>
      <p>
        Debido a que los equipos tradicionales (estaciones de trabajo y
        servidores) tienen capacidad de cómputo y memoria suficientes, es viable
        aplicar técnicas de inspección profundas directamente sobre ellos. Esto
        contrasta con la realidad del ecosistema IoT, como se describe a
        continuación.
      </p>
    </section>

    <section id="iot">
      <h2><span class="hnum">6.</span> Firewalls en el ecosistema IoT</h2>
      <p>
        El Internet de las Cosas conecta sensores, actuadores y dispositivos
        embebidos que operan con microcontroladores de baja capacidad, sistemas
        operativos mínimos y, con frecuencia, sin mecanismos simples de
        actualización. Estas características hacen que la seguridad tradicional
        no se pueda trasladar de manera directa. Un firewall para IoT debe
        adaptarse a un entorno donde:
      </p>
      <ul>
        <li>
          <strong>Faltan recursos:</strong> no es viable ejecutar software de
          inspección profunda dentro del propio dispositivo; el control debe
          centralizarse en la red.
        </li>
        <li>
          <strong>La superficie de ataque es extensa:</strong> decenas o cientos
          de dispositivos con credenciales por defecto y puertos abiertos
          ofrecen múltiples puntos de entrada.
        </li>
        <li>
          <strong>El tráfico es predecible:</strong> un sensor suele comunicarse
          con un número reducido de servidores (por ejemplo, la plataforma en la
          nube del fabricante), lo que permite definir reglas estrictas del tipo
          <em>allowlist</em>.
        </li>
        <li>
          <strong>Los protocolos son heterogéneos:</strong> MQTT, CoAP, Zigbee o
          BLE exigen que el filtrado comprenda el formato de cada uno de ellos.
        </li>
      </ul>
      <p>
        En la práctica, la protección de dispositivos IoT se logra mediante la
        combinación de un firewall perimetral (para controlar el flujo hacia
        Internet), la <strong>segmentación de red</strong> en VLAN dedicadas
        (para contener un posible compromiso) y políticas de control de acceso
        por dispositivo en el punto de conexión — por ejemplo, en la puerta de
        enlace (<em>gateway</em>) del hogar o la planta industrial.
      </p>
    </section>

    <section id="comparativa">
      <h2><span class="hnum">7.</span> Comparativa red tradicional vs. IoT</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Criterio</th>
              <th>Red tradicional</th>
              <th>Ecosistema IoT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Capacidad de cómputo de los terminales</td>
              <td>Alta; permite agentes de seguridad locales.</td>
              <td>Baja; la seguridad debe centralizarse o delegarse.</td>
            </tr>
            <tr>
              <td>Actualizaciones de software</td>
              <td>Gestionables de forma centralizada.</td>
              <td>Frecuentemente escasas o inexistentes.</td>
            </tr>
            <tr>
              <td>Ubicación típica del firewall</td>
              <td>Perímetro de la red.</td>
              <td>Perímetro + gateway + segmentación por VLAN.</td>
            </tr>
            <tr>
              <td>Patrón de tráfico</td>
              <td>Amplio y heterogéneo.</td>
              <td>Estable y predecible (muy apto para allowlists).</td>
            </tr>
            <tr>
              <td>Superficie de ataque</td>
              <td>Delimitada y administrada.</td>
              <td>Extensa, heterogénea y a menudo sin inventario.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="recomendaciones">
      <h2><span class="hnum">8.</span> Recomendaciones prácticas</h2>
      <ol>
        <li>Aplicar el principio de denegación por defecto en toda regla nueva.</li>
        <li>Segmentar los dispositivos IoT en VLAN o subredes aisladas de los equipos administrativos.</li>
        <li>Construir una <em>allowlist</em> de destinos para el tráfico saliente de cada tipo de dispositivo.</li>
        <li>Bloquear puertos y servicios no utilizados en cada equipo.</li>
        <li>Registrar y revisar periódicamente los <em>logs</em> del firewall.</li>
        <li>Cambiar credenciales por defecto y deshabilitar administración remota innecesaria.</li>
      </ol>
    </section>

    <section id="conclusiones">
      <h2><span class="hnum">9.</span> Conclusiones</h2>
      <p>
        El firewall sigue siendo un pilar de la seguridad perimetral en las
        redes informáticas tradicionales, pero su función debe reinterpretarse
        cuando se trata del Internet de las Cosas. La limitación de recursos de
        los dispositivos IoT y su vasta superficie de ataque obligan a desplazar
        la inteligencia de seguridad hacia la infraestructura de red: firewalls
        que comprendan protocolos específicos, VLAN de aislamiento y políticas
        basadas en el comportamiento esperado de cada dispositivo. La conclusión
        central es que la seguridad en IoT no se logra protegiendo cada
        dispositivo de forma aislada, sino gobernando la red que los conecta.
      </p>
    </section>

    <section id="referencias">
      <h2><span class="hnum">10.</span> Referencias</h2>
      <ol class="refs">
        <li>Stallings, W. (2020). <em>Fundamentals of Network Security</em>. Pearson.</li>
        <li>Check Point Software. (2024). <em>What is a Next Generation Firewall (NGFW)?</em></li>
        <li>OWASP. (2025). <em>OWASP IoT Security Guidance</em>.</li>
        <li>RFC 2979. <em>Behavior of and Requirements for Internet Firewalls</em>. IETF.</li>
        <li>ENISA. (2020). <em>Guidelines for Securing the Internet of Things</em>.</li>
      </ol>
    </section>
  </article>
</main>

<footer>
  <div class="container">
    <p>Material académico con fines didácticos · Firewalls en redes y IoT · 2026</p>
  </div>
</footer>
`