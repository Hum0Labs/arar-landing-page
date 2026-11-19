/**
 * Datos estructurados (JSON-LD, schema.org).
 *
 * Regla: cada valor sale de `company.ts` o `alquiler.ts` y corresponde a un
 * texto visible en la página. No se declaran teléfono, precios, reseñas,
 * coordenadas ni razón social porque el sitio no los publica.
 */
import { company } from './company';
import { equipment, faqs } from './alquiler';

const ORG_ID = `${company.url}#organizacion`;
const SITE_ID = `${company.url}#sitio`;
const OFFICE_ID = `${company.url}#sede-bogota`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: company.address.street,
  addressLocality: company.address.city,
  addressRegion: company.address.region,
  addressCountry: company.address.countryCode,
};

const areaServed = { '@type': 'Country', name: company.serviceArea };

/** Nombre del servicio por categoría de equipo (ids de `equipment`). */
const serviceNames: Record<(typeof equipment)[number]['id'], string> = {
  portatiles: 'Alquiler de portátiles para empresas',
  escritorio: 'Alquiler de equipos de escritorio para empresas',
  monitores: 'Alquiler de monitores para empresas',
  servidores: 'Alquiler de servidores para empresas',
  impresion: 'Alquiler de impresoras y fotocopiadoras para empresas',
  accesorios: 'Alquiler de proyectores, audiovisuales y accesorios para empresas',
};

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: company.name,
  alternateName: company.longName,
  url: company.url,
  logo: `${company.url}apple-touch-icon.png`,
  description: company.description,
  foundingDate: company.foundingYear,
  email: company.email,
  address: postalAddress,
  areaServed,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: company.email,
    url: company.whatsappUrl,
    availableLanguage: 'es',
    areaServed: company.address.countryCode,
  },
  sameAs: company.social.map((s) => s.url),
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: company.url,
  name: company.name,
  inLanguage: 'es-CO',
  publisher: { '@id': ORG_ID },
};

const office = {
  '@type': 'LocalBusiness',
  '@id': OFFICE_ID,
  name: company.name,
  url: company.url,
  image: `${company.url}apple-touch-icon.png`,
  description: company.description,
  email: company.email,
  address: postalAddress,
  areaServed,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: company.hours.days,
    opens: company.hours.opens,
    closes: company.hours.closes,
  },
  parentOrganization: { '@id': ORG_ID },
};

const services = equipment.map((e) => ({
  '@type': 'Service',
  '@id': `${company.url}#servicio-${e.id}`,
  name: serviceNames[e.id],
  serviceType: 'Alquiler y arrendamiento de equipos de cómputo',
  description: e.desc,
  url: `${company.url}#equipos`,
  provider: { '@id': ORG_ID },
  areaServed,
  audience: { '@type': 'BusinessAudience', name: 'Empresas' },
}));

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${company.url}#preguntas`,
  inLanguage: 'es-CO',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

/** Todas las páginas: quién es la empresa. */
export const siteSchema = graph([organization, website]);

/** Inicio: empresa, sede, los seis servicios y las preguntas frecuentes. */
export const homeSchema = graph([organization, website, office, ...services, faqPage]);
