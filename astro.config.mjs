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

  // Las 15 páginas legales llevan `noindex` (ver Seo.astro), así que no pintan
  // nada en el sitemap: anunciar una URL y a la vez pedir que no se indexe son
  // dos señales que se contradicen, y Search Console lo reporta como «excluida
  // por la etiqueta noindex» sobre algo que tú mismo enviaste. El filtro y la
  // etiqueta van juntos: si algún día se quita uno, hay que quitar el otro.
  integrations: [sitemap({ filter: (page) => !/\/legal\//.test(page) })],

  i18n: {
    locales: ['en', 'es', 'de', 'fr', 'pt-br'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
