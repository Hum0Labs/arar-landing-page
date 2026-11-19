/**
 * Datos de identidad de la empresa: una sola fuente para el pie de página,
 * la sección de contacto, las etiquetas <meta> y los datos estructurados.
 *
 * Si un dato cambia (nombre, dirección, horario), se cambia aquí y queda
 * igual en todo el sitio. No agregue aquí datos que el sitio no muestre:
 * los datos estructurados deben coincidir con el texto visible.
 *
 * CONFIRMAR con mercadeo (plan SEO, R6): el nombre público único. Hoy el
 * sitio usa «ARAR» en títulos y «ARAR Representaciones» en el pie.
 */
import { contact } from './alquiler';

export const company = {
  /** Nombre público, tal como va en los títulos de página. */
  name: 'ARAR',
  /** Nombre largo, tal como va en el aviso de derechos del pie. */
  longName: 'ARAR Representaciones',
  url: 'https://www.arar.com.co/',
  /** Descripción única: meta descripción del inicio y datos estructurados. */
  description:
    'Alquiler de computadores, portátiles, monitores, servidores e impresoras para empresas en Colombia, con entrega local y soporte técnico incluido.',
  tagline: 'Alquiler y arrendamiento de equipos IT para empresas en Colombia, desde 2003.',
  foundingYear: '2003',
  address: {
    street: 'Calle 169 # 67 - 55',
    city: 'Bogotá',
    region: 'Bogotá D.C.',
    country: 'Colombia',
    countryCode: 'CO',
  },
  /** Zona de servicio que declara el sitio (título, H1 y descripción). */
  serviceArea: 'Colombia',
  email: contact.email,
  whatsappUrl: `https://wa.me/${contact.whatsapp}`,
  hours: {
    text: 'Lunes a viernes, 9:00 a. m. a 6:00 p. m.',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  social: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/arar-representaciones' },
    { label: 'Instagram', url: 'https://www.instagram.com/arar_representaciones' },
    { label: 'Facebook', url: 'https://www.facebook.com/ARARRepresentaciones' },
  ],
} as const;

/** Dirección en una línea, como se muestra en el sitio. */
export const addressLine = `${company.address.street}, ${company.address.city}`;
