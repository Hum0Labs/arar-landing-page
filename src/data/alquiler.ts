/**
 * Contenido de la página de Alquiler y Arrendamiento.
 *
 * Todo lo que la página promete sale de este archivo. Las entradas marcadas
 * con `CONFIRMAR` son redacción provisional: se escribieron sin cifras ni
 * compromisos que el sitio anterior no hiciera ya, y deben validarse con el
 * área comercial antes de publicar.
 */

export const contact = {
  email: 'arar@arar.com.co',
  whatsapp: '573102961407',
  /**
   * Servicio que recibe la cotización por POST (JSON) y la reenvía por correo:
   * Web3Forms. La clave de acceso es pública por diseño; el destinatario se
   * configura en el panel de Web3Forms. Si el servicio falla, el formulario
   * abre un correo y ofrece WhatsApp con el resumen.
   */
  quoteEndpoint: 'https://api.web3forms.com/submit',
  quoteAccessKey: '012abd57-825a-4919-bde7-12578fe87e8d',
};

/* ------------------------------------------------------------------ */
/* Confianza                                                           */
/* ------------------------------------------------------------------ */

/** Datos que ya estaban publicados en el sitio. */
export const facts = [
  { value: '2003', label: 'Año desde el que alquilamos tecnología a empresas' },
  { value: '+20', label: 'Años de experiencia como grupo tecnológico' },
  { value: '+1.000', label: 'Equipos gestionados' },
  { value: 'Bogotá', label: 'Sede y entrega local' },
];

export const brands = ['Lenovo', 'Apple', 'Samsung', 'Ricoh', 'Epson', 'Kyocera'];

export const capabilities = [
  {
    title: 'Entrega local',
    text: 'Llevamos los equipos a su operación y coordinamos la instalación con su equipo.',
  },
  {
    title: 'Soporte técnico incluido',
    text: 'El soporte hace parte del servicio: usted no contrata un tercero para atender los equipos.',
  },
  {
    title: 'Períodos flexibles',
    text: 'Desde una necesidad puntual hasta la operación continua de su empresa.',
  },
  {
    title: 'Sin inversión de capital',
    text: 'Acceda a tecnología reciente sin comprometer su flujo de caja.',
  },
];

/**
 * CONFIRMAR: logos de clientes aprobados. Mientras la lista esté vacía, la
 * franja de logos no se muestra. Formato: { name, src } con src en /public.
 */
export const customerLogos: { name: string; src: string }[] = [];

/**
 * CONFIRMAR: historia de cliente real y aprobada. Mientras sea `null`, el
 * bloque no se muestra.
 */
export const customerStory: null | {
  company: string;
  sector: string;
  challenge: string;
  solution: string;
  result: string;
  quote?: string;
  author?: string;
  metrics?: { value: string; label: string }[];
} = null;

/* ------------------------------------------------------------------ */
/* Equipos                                                             */
/* ------------------------------------------------------------------ */

/**
 * CONFIRMAR: cuando haya datos de inventario, reemplazar `define` por
 * especificaciones reales (modelos, procesador, memoria, almacenamiento).
 */
export const equipment = [
  {
    id: 'portatiles',
    art: 'laptop',
    name: 'Portátiles',
    singular: 'Portátil',
    desc: 'Para oficina, trabajo híbrido y perfiles técnicos.',
    profiles: ['Oficina', 'Desarrollo', 'Diseño y video'],
    define: ['Windows o macOS', 'Memoria y almacenamiento', 'Tamaño de pantalla'],
  },
  {
    id: 'escritorio',
    art: 'desktop',
    name: 'Equipos de escritorio',
    singular: 'Equipo de escritorio',
    desc: 'Puestos fijos para oficinas, sedes y centros de atención.',
    profiles: ['Oficina', 'Alto rendimiento'],
    define: ['Procesador y memoria', 'Almacenamiento', 'Con o sin monitor'],
  },
  {
    id: 'monitores',
    art: 'monitor',
    name: 'Monitores',
    singular: 'Monitor',
    desc: 'Pantallas para puestos de trabajo y salas.',
    profiles: ['Estándar', 'Gran formato'],
    define: ['Tamaño', 'Resolución', 'Cantidad por puesto'],
  },
  {
    id: 'servidores',
    art: 'server',
    name: 'Servidores',
    singular: 'Servidor',
    desc: 'Capacidad de cómputo para su operación, sin comprarla.',
    profiles: ['Torre', 'Rack'],
    define: ['Procesamiento', 'Memoria', 'Almacenamiento y redundancia'],
  },
  {
    id: 'impresion',
    art: 'printer',
    name: 'Impresión',
    singular: 'Equipo de impresión',
    desc: 'Impresoras y fotocopiadoras, o outsourcing completo con consumibles y mantenimiento.',
    profiles: ['Impresora', 'Multifuncional', 'Fotocopiadora'],
    define: ['Color o monocromo', 'Volumen mensual', 'Outsourcing de impresión'],
  },
  {
    id: 'accesorios',
    art: 'accessories',
    name: 'Accesorios y audiovisuales',
    singular: 'Accesorio o audiovisual',
    desc: 'Proyectores, equipos audiovisuales y periféricos para completar cada puesto.',
    profiles: ['Proyector', 'Audiovisual', 'Periféricos'],
    define: ['Tipo de equipo', 'Uso: evento o permanente', 'Cantidad'],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Demostración de la plataforma (datos de ejemplo)                    */
/* ------------------------------------------------------------------ */

export const demoSteps = [
  { id: 'solicitud', title: 'Solicitud', text: 'Usted describe lo que necesita, con sus palabras.' },
  { id: 'inventario', title: 'Inventario', text: 'El agente consulta la disponibilidad real de equipos.' },
  { id: 'configuracion', title: 'Configuración', text: 'Traduce el uso previsto en una configuración recomendada.' },
  { id: 'cotizacion', title: 'Cotización', text: 'Prepara la cotización con modalidad, plazo y servicios.' },
  { id: 'aprobacion', title: 'Aprobación', text: 'Una persona revisa y aprueba antes de comprometer equipos.' },
  { id: 'entrega', title: 'Entrega', text: 'Cada equipo se alista, se despacha y queda registrado.' },
];

/** CONFIRMAR: flujos que la plataforma soporta hoy. Los datos son ilustrativos. */
export const demoScenarios = [
  {
    id: 'desarrollo',
    label: 'Equipo de desarrollo',
    request:
      'Necesitamos 12 portátiles para un equipo de desarrollo que inicia el próximo mes. Los usaremos durante un año, con monitor para cada puesto.',
    parsed: [
      ['Equipos', '12 portátiles + 12 monitores'],
      ['Perfil', 'Desarrollo'],
      ['Plazo', '12 meses'],
      ['Modalidad', 'Arrendamiento'],
    ],
    stock: [
      { item: 'Portátil · perfil Desarrollo', need: 12, available: 14 },
      { item: 'Monitor · Estándar', need: 12, available: 30 },
    ],
    stockNote: 'Disponibilidad completa. Se reservan los equipos mientras se aprueba la cotización.',
    match: [
      { need: 'Compilación y contenedores', rec: 'Procesador de 8 núcleos o más' },
      { need: 'Varias herramientas abiertas', rec: '32 GB de memoria' },
      { need: 'Repositorios e imágenes locales', rec: 'SSD de 1 TB' },
    ],
    quote: {
      modality: 'Arrendamiento',
      term: '12 meses',
      lines: [
        { qty: 12, item: 'Portátil · perfil Desarrollo' },
        { qty: 12, item: 'Monitor · Estándar' },
      ],
    },
    approver: 'Gerencia de TI',
    selection: {
      portatiles: { qty: 12, profile: 'Desarrollo' },
      monitores: { qty: 12, profile: 'Estándar' },
    },
    modality: 'arrendamiento',
  },
  {
    id: 'evento',
    label: 'Evento de tres días',
    request:
      'Tenemos una capacitación de tres días la próxima semana: 20 portátiles para los asistentes y 2 proyectores.',
    parsed: [
      ['Equipos', '20 portátiles + 2 proyectores'],
      ['Perfil', 'Oficina'],
      ['Plazo', '3 días'],
      ['Modalidad', 'Alquiler'],
    ],
    stock: [
      { item: 'Portátil · perfil Oficina', need: 20, available: 16, incoming: 4 },
      { item: 'Proyector', need: 2, available: 5 },
    ],
    stockNote:
      'Faltan 4 portátiles hoy. El agente encuentra 4 equipos que regresan de otro contrato antes de la fecha y los reserva para redespliegue.',
    match: [
      { need: 'Ofimática y videollamadas', rec: 'Perfil Oficina, 16 GB de memoria' },
      { need: 'Salón para 20 personas', rec: '2 proyectores con conexión HDMI' },
      { need: 'Uso de tres días', rec: 'Imagen estándar, sin datos del cliente' },
    ],
    quote: {
      modality: 'Alquiler',
      term: '3 días',
      lines: [
        { qty: 20, item: 'Portátil · perfil Oficina' },
        { qty: 2, item: 'Proyector' },
      ],
    },
    approver: 'Coordinación administrativa',
    selection: {
      portatiles: { qty: 20, profile: 'Oficina' },
      accesorios: { qty: 2, profile: 'Proyector' },
    },
    modality: 'alquiler',
  },
  {
    id: 'sede',
    label: 'Nueva sede',
    request:
      'Abrimos una sede con 8 puestos de trabajo. Necesitamos equipos de escritorio con monitor, un servidor y una multifuncional.',
    parsed: [
      ['Equipos', '8 puestos + 1 servidor + 1 multifuncional'],
      ['Perfil', 'Oficina'],
      ['Plazo', 'Por definir'],
      ['Modalidad', 'Arrendamiento'],
    ],
    stock: [
      { item: 'Equipo de escritorio · Oficina', need: 8, available: 22 },
      { item: 'Monitor · Estándar', need: 8, available: 30 },
      { item: 'Servidor · Torre', need: 1, available: 3 },
      { item: 'Multifuncional', need: 1, available: 6 },
    ],
    stockNote: 'Disponibilidad completa. El plazo queda como pregunta abierta para la cotización.',
    match: [
      { need: '8 puestos administrativos', rec: 'Escritorio perfil Oficina + monitor' },
      { need: 'Archivos compartidos de la sede', rec: 'Servidor torre con discos redundantes' },
      { need: 'Impresión y escaneo de la sede', rec: 'Multifuncional con outsourcing de impresión' },
    ],
    quote: {
      modality: 'Arrendamiento',
      term: 'Por definir con usted',
      lines: [
        { qty: 8, item: 'Equipo de escritorio · Oficina' },
        { qty: 8, item: 'Monitor · Estándar' },
        { qty: 1, item: 'Servidor · Torre' },
        { qty: 1, item: 'Multifuncional' },
      ],
    },
    approver: 'Gerencia general',
    selection: {
      escritorio: { qty: 8, profile: 'Oficina' },
      monitores: { qty: 8, profile: 'Estándar' },
      servidores: { qty: 1, profile: 'Torre' },
      impresion: { qty: 1, profile: 'Multifuncional' },
    },
    modality: 'arrendamiento',
  },
];

/* ------------------------------------------------------------------ */
/* Modalidades                                                         */
/* ------------------------------------------------------------------ */

/**
 * CONFIRMAR con el área comercial: plazos mínimos y máximos, forma de pago,
 * condiciones de devolución y opciones al finalizar (¿hay opción de compra?).
 * La redacción evita cifras a propósito.
 */
export const plans = [
  {
    id: 'alquiler',
    name: 'Alquiler',
    tagline: 'Para necesidades temporales',
    summary: 'Eventos, proyectos, picos de operación o reemplazos mientras llega su equipo definitivo.',
  },
  {
    id: 'arrendamiento',
    name: 'Arrendamiento',
    tagline: 'Para la operación continua',
    summary: 'Equipe a su empresa a mediano y largo plazo, con un contrato a término definido.',
  },
];

export const planRows = [
  {
    label: 'Duración',
    alquiler: 'Corto plazo: días, semanas o meses. Usted define el período.',
    arrendamiento: 'Mediano y largo plazo, con contrato a término definido.',
  },
  {
    label: 'Servicios incluidos',
    alquiler: 'Entrega local y soporte técnico durante el período.',
    arrendamiento: 'Entrega local, soporte técnico y mantenimiento durante el contrato.',
  },
  {
    label: 'Pago',
    alquiler: 'Tarifa por período de uso, sin inversión de capital.',
    arrendamiento: 'Canon periódico durante el contrato, sin inversión de capital.',
  },
  {
    label: 'Devolución',
    alquiler: 'Al terminar el período coordinamos la devolución de los equipos.',
    arrendamiento: 'Devolución coordinada al cierre del contrato.',
  },
  {
    label: 'Al finalizar',
    alquiler: 'Extienda el período o devuelva los equipos.',
    arrendamiento: 'Renueve con equipos actualizados, extienda el contrato o devuelva.',
  },
];

/** Ya publicado en el sitio anterior. */
export const requirements = [
  { title: 'Cámara de Comercio', text: 'Certificado vigente de existencia y representación legal.' },
  { title: 'RUT', text: 'Registro Único Tributario actualizado de la empresa.' },
  { title: 'Orden de compra', text: 'Orden de compra o solicitud formal del servicio.' },
];

/* ------------------------------------------------------------------ */
/* Ciclo de vida (datos de ejemplo en la tarjeta)                      */
/* ------------------------------------------------------------------ */

export const lifecycle = [
  {
    id: 'asignacion',
    title: 'Asignación',
    text: 'Cada equipo queda vinculado a un contrato, una sede y un responsable desde el momento de la entrega.',
    status: 'Asignado',
    tone: 'ok',
    fields: [
      ['Responsable', 'Equipo de Desarrollo'],
      ['Ubicación', 'Sede del cliente'],
      ['Contrato', 'Arrendamiento · vigente'],
    ],
    log: 'Entregado y registrado en inventario',
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento',
    text: 'Los mantenimientos preventivos y correctivos quedan registrados en la hoja de vida de cada equipo.',
    status: 'En mantenimiento',
    tone: 'warn',
    fields: [
      ['Responsable', 'Soporte técnico ARAR'],
      ['Ubicación', 'Taller'],
      ['Contrato', 'Arrendamiento · vigente'],
    ],
    log: 'Mantenimiento preventivo programado',
  },
  {
    id: 'recuperacion',
    title: 'Recuperación',
    text: 'Al terminar el período se programa la devolución y se verifica el estado de cada equipo que regresa.',
    status: 'En recuperación',
    tone: 'info',
    fields: [
      ['Responsable', 'Logística ARAR'],
      ['Ubicación', 'En tránsito'],
      ['Contrato', 'Finalizado'],
    ],
    log: 'Devolución programada y verificada',
  },
  {
    id: 'redespliegue',
    title: 'Redespliegue',
    text: 'El equipo se revisa, vuelve al inventario disponible y queda listo para una nueva asignación.',
    status: 'Disponible',
    tone: 'free',
    fields: [
      ['Responsable', 'Inventario ARAR'],
      ['Ubicación', 'Bodega'],
      ['Contrato', 'Sin asignar'],
    ],
    log: 'Revisado y disponible para asignar',
  },
];

/* ------------------------------------------------------------------ */
/* Objeciones frecuentes                                               */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: '¿Por qué alquilar en lugar de comprar?',
    a: 'Porque accede a tecnología reciente sin inversión de capital y sin comprometer su flujo de caja. El soporte técnico hace parte del servicio y usted ajusta la cantidad de equipos a lo que su operación necesita.',
  },
  {
    q: '¿Qué documentos necesito para empezar?',
    a: 'Tres: certificado vigente de Cámara de Comercio, RUT actualizado y una orden de compra o solicitud formal del servicio.',
  },
  {
    q: '¿El soporte técnico está incluido?',
    a: 'Sí. El soporte técnico está incluido en el servicio. El alcance y los tiempos de atención quedan escritos en su cotización.',
  },
  {
    q: '¿Por cuánto tiempo puedo alquilar?',
    a: 'Los períodos son flexibles: desde necesidades puntuales hasta contratos de largo plazo. Cuéntenos el plazo que tiene en mente y lo reflejamos en la cotización.',
  },
  {
    q: '¿Puedo pedir marcas o configuraciones específicas?',
    a: 'Sí. Manejamos marcas como Lenovo, Apple, Samsung, Ricoh, Epson y Kyocera. Indique la configuración que necesita y confirmamos disponibilidad en la cotización.',
  },
  {
    q: '¿Dónde entregan los equipos?',
    a: 'Hacemos entrega local desde nuestra sede en Bogotá. Si su operación está en otra ciudad, indíquelo en la solicitud y le confirmamos la cobertura.',
  },
];

/* ------------------------------------------------------------------ */
/* Portafolio del grupo (informativo: las páginas /sap y /1nativoone se retiraron) */
/* ------------------------------------------------------------------ */

export const portfolio = [
  {
    id: 'sap',
    kicker: 'Consultoría',
    name: 'Consultoría SAP',
    text: 'Implementamos, personalizamos y optimizamos su sistema SAP. No reemplazamos: maximizamos lo que ya tiene.',
    panelTitle: 'Capacidades',
    panel: ['Implementación de módulos SAP', 'Desarrollo ABAP a medida', 'Reportes y dashboards', 'Soporte y mantenimiento'],
  },
  {
    id: '1nativoone',
    kicker: 'ERP propio',
    name: '1nativoone ERP',
    text: 'El ERP empresarial que desarrolla nuestra subsidiaria, construido desde cero con tecnologías actuales para empresas latinoamericanas.',
    panelTitle: 'Ficha técnica',
    panel: ['Plataforma · ASP.NET', 'Arquitectura · Microservicios', 'Diseño · Orientado a aspectos', 'Áreas funcionales modulares'],
  },
];
