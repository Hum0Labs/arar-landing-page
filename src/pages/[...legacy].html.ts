/**
 * Redirecciones de las URL `.html` del sitio de 2015–2016.
 *
 * `redirects` en astro.config.mjs crea carpetas (`/inicio.html/index.html`),
 * así que estas se emiten como archivos con el nombre exacto. GitHub Pages no
 * permite 301: se usa la misma página de meta refresh + canonical que genera
 * Astro para las demás redirecciones.
 */
import type { APIRoute, GetStaticPaths } from 'astro';

const legacy: Record<string, string> = {
  'inicio': '/',
  'inicio/renta-equipos-de-computo': '/#equipos',
  'inicio/alquiler-impresoras': '/#equipos',
  'inicio/centro-de-servicio': '/#cotizacion',
  'inicio/contactenos': '/#cotizacion',
  'inicio/web-services-sap': '/#portafolio',
  'inicio/nativo-on': '/#portafolio',
};

export const getStaticPaths: GetStaticPaths = () =>
  Object.entries(legacy).map(([path, to]) => ({ params: { legacy: path }, props: { to } }));

export const GET: APIRoute = ({ props, site }) => {
  const to = props.to as string;
  const canonical = new URL(to, site).href;
  const html = `<!doctype html><title>Redirecting to: ${to}</title><meta http-equiv="refresh" content="0;url=${to}"><meta name="robots" content="noindex"><link rel="canonical" href="${canonical}"><body><a href="${to}">Redirecting to <code>${to}</code></a></body>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
