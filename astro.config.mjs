// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sanblastourspanama.com',

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
