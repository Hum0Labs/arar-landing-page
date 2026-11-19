// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.arar.com.co',
  base: '/',
  output: 'static',
  integrations: [sitemap()],
  // GitHub Pages no emite 301: Astro genera una página con meta refresh,
  // noindex y canonical al destino. Cuando exista la página de categoría
  // (plan SEO, R5), se borra la entrada y la página real ocupa la URL.
  redirects: {
    '/alquiler': '/',
    // Páginas retiradas: su contenido vive en la sección Portafolio del inicio.
    '/sap': '/#portafolio',
    '/1nativoone': '/#portafolio',
    // Sitio anterior (aún en los índices de búsqueda)
    '/escritorio': '/#equipos',
    '/servidores': '/#equipos',
    '/impresoras': '/#equipos',
    '/audiovisuales': '/#equipos',
    '/proyectores': '/#equipos',
    '/servicios': '/#equipos',
    '/faq': '/#preguntas',
    // Las URL .html de 2015–2016 se generan en src/pages/[...legacy].html.ts
  },
  build: {
    assets: 'assets',
  },
  vite: {
    optimizeDeps: {
      include: ['p5'],
    },
  },
});
