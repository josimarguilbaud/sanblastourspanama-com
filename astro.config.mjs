// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sanblastourspanama.com',

  // Sin esto el sitemap emitia `/blog/` mientras cada pagina declara `/blog`
  // en su canonical: dos direcciones distintas para la misma pagina, y la
  // del canonical redirigia. Los 85 enlaces internos de la portada ya usaban
  // la forma sin barra, asi que el sitemap era el unico que discrepaba.
  // No cambia ninguna URL publicada: solo lo que el sitemap anuncia.
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],

  i18n: {
    locales: ['en', 'es', 'de', 'fr', 'pt-br'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
