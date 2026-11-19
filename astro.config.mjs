// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.arar.com.co',
  base: '/',
  output: 'static',
  redirects: {
    '/alquiler': '/',
    // Páginas retiradas: su contenido vive en la sección Portafolio del inicio.
    '/sap': '/#portafolio',
    '/1nativoone': '/#portafolio',
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
