/**
 * /llms.txt: resumen del sitio para asistentes de IA (formato llmstxt.org).
 *
 * Su efecto no está demostrado: Google lo ignora y la mayoría de estos
 * archivos no recibe visitas. Se genera a partir de los mismos datos que el
 * resto del sitio, así que no hay que mantenerlo a mano.
 */
import type { APIRoute } from 'astro';
import { company, addressLine } from '../data/company';
import { equipment, plans, requirements, brands } from '../data/alquiler';

const u = (path: string) => new URL(path, company.url).href;

const body = `# ${company.name}

> ${company.description}

${company.name} (${company.longName}) alquila y arrienda equipos de cómputo a empresas desde ${company.foundingYear}. Sede: ${addressLine}, ${company.address.country}. Zona de servicio: ${company.serviceArea}, con entrega local desde ${company.address.city}; la cobertura en otras ciudades se confirma en cada solicitud. El sitio no publica precios: el valor se entrega en una cotización.

## Equipos

${equipment.map((e) => `- ${e.name}: ${e.desc}`).join('\n')}

Marcas: ${brands.join(', ')}.

## Modalidades

${plans.map((p) => `- ${p.name}: ${p.summary}`).join('\n')}

## Requisitos para contratar

${requirements.map((r) => `- ${r.title}: ${r.text}`).join('\n')}

## Páginas

- [Inicio](${u('/')}): oferta completa de alquiler y arrendamiento de equipos
- [Equipos](${u('/#equipos')}): las seis categorías de equipos
- [Modalidades](${u('/#modalidades')}): comparación entre alquiler y arrendamiento
- [Preguntas frecuentes](${u('/#preguntas')}): documentos, soporte, plazos, marcas y entrega
- [Cotización](${u('/#cotizacion')}): formulario para solicitar una propuesta

## Contacto

- Correo: ${company.email}
- [WhatsApp](${company.whatsappUrl})
- Horario: ${company.hours.text}

## Opcional

- [Automatización con IA](${u('/ia/')}): otra línea de servicio del grupo
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
