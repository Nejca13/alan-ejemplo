export function setupCounter(element) {
  const firewallExplanation = `
    <strong>Firewalls en IoT</strong><br><br>
    Un firewall en IoT es un sistema de seguridad que monitorea y controla el tráfico de red entrante y saliente basado en reglas predefinidas. 
    En dispositivos IoT, que suelen tener recursos limitados y vulnerabilidades críticas, los firewalls ayudan a:
    <ul>
      <li><strong>Aislar el dispositivo:</strong> Evita que un dispositivo comprometido infecte el resto de la red local.</li>
      <li><strong>Filtrar puertos:</strong> Bloquea puertos no utilizados para reducir la superficie de ataque.</li>
      <li><strong>Controlar el flujo:</strong> Asegura que el dispositivo solo se comunique con servidores autorizados (ej. el cloud del fabricante).</li>
    </ul>
  `;
  element.innerHTML = firewallExplanation;
}
