/**
 * El puente hacia las dos webs hermanas.
 *
 * ── Por qué existe ────────────────────────────────────────────────────────
 * Las tres webs del negocio estaban aisladas entre sí: sanblasfull y
 * sanblastourspty se declaran mutuamente en cientos de páginas, pero **nadie
 * mencionaba a sanblastourspanama y sanblastourspanama no mencionaba a nadie**
 * — siendo la que más tráfico orgánico tiene de las tres (14.900 impresiones
 * en tres meses, medido el 02/09/2026).
 *
 * Aquí la guía es informativa y la venta vive en la hermana. Quien lee «cómo
 * llegar a San Blas» o «vuelos a San Blas» acaba el artículo sin sitio al que
 * ir. Enlazarlo es útil para quien lee, y de paso pasa autoridad a páginas que
 * hoy no la reciben.
 *
 * ── Por qué NO es un enlace en el pie ─────────────────────────────────────
 * ⚠️ Un bloque de enlaces igual en las 381 páginas, entre tres dominios del
 * mismo dueño que además comparten teléfono, es exactamente el patrón que un
 * buscador lee como red de enlaces. Lo que sí es normal es el enlace editorial:
 * pocos, contextuales, cada uno en la página cuyo tema le corresponde.
 *
 * Por eso el mapa es corto y a mano: 14 páginas, un destino cada una, y solo
 * donde la hermana de verdad contesta lo que el artículo deja abierto.
 *
 * ── El reparto se respeta ─────────────────────────────────────────────────
 * Cada intención va a la web que la tiene asignada desde agosto:
 *   sanblasfull  → el día: qué llevar, las islas del pasadía.
 *   sanblastourspty → el archipiélago: cómo llegar, vuelos, dormir, velero,
 *                     cuándo ir, cultura Guna.
 * Un destino mal elegido no ayuda: enfrenta a las dos hermanas otra vez.
 */

/** Los idiomas de esta web y su equivalente en las hermanas, que usan `pt`. */
const PREFIJO_HERMANA: Record<string, string> = {
  en: '/en',
  de: '/de',
  fr: '/fr',
  'pt-br': '/pt',
  es: '', // en las hermanas el español es la raíz
};

type Destino = { sitio: 'full' | 'pty'; ruta: string };

const DOMINIO = {
  full: 'https://sanblasfull.com',
  pty: 'https://sanblastourspty.com',
} as const;

/** Guía de esta web → la página hermana que contesta lo que la guía deja abierto. */
const GUIAS: Record<string, Destino> = {
  'how-to-get-to-san-blas': { sitio: 'pty', ruta: '/como-llegar' },
  'flights-to-san-blas': { sitio: 'pty', ruta: '/vuelos-a-san-blas' },
  'overnight-stays': { sitio: 'pty', ruta: '/donde-dormir-san-blas' },
  'sailing-cartagena-to-san-blas': { sitio: 'pty', ruta: '/velero-catamaran-san-blas' },
  'best-time-to-visit': { sitio: 'pty', ruta: '/cuando-ir-a-san-blas' },
  'guna-culture': { sitio: 'pty', ruta: '/guna-yala' },
  'snorkeling-diving': { sitio: 'pty', ruta: '/tours' },
  'what-to-pack': { sitio: 'full', ruta: '/que-llevar-a-san-blas' },
  'top-beaches': { sitio: 'full', ruta: '/islas' },
};

/** Isla de esta web → su página comercial en sanblasfull.
 *  ⚠️ Los slugs NO coinciden siempre: aquí es `chichime` y allí `isla-chichime`.
 *  Solo están las islas que tienen página allí; las demás no se enlazan. */
const ISLAS: Record<string, Destino> = {
  'perro-chico': { sitio: 'full', ruta: '/pasadia/isla-perro-chico' },
  chichime: { sitio: 'full', ruta: '/pasadia/isla-chichime' },
  'isla-diablo': { sitio: 'full', ruta: '/pasadia/isla-diablo' },
  'isla-aguja': { sitio: 'full', ruta: '/pasadia/isla-aguja' },
  'isla-pelicano': { sitio: 'full', ruta: '/pasadia/isla-pelicano' },
};

/** El texto del enlace, escrito a mano en los 5 idiomas.
 *  Nada de traducción automática: es texto visible (regla 8 del proyecto). */
const TEXTOS: Record<string, { guia: string; isla: string; pie: string }> = {
  en: {
    guia: 'Check dates and prices on our booking site',
    isla: 'See which day tours stop at this island',
    pie: 'Opens on our sister site',
  },
  es: {
    guia: 'Consulta fechas y precios en nuestra web de reservas',
    isla: 'Mira qué tours de un día paran en esta isla',
    pie: 'Se abre en nuestra web hermana',
  },
  de: {
    guia: 'Termine und Preise auf unserer Buchungsseite',
    isla: 'Sieh, welche Tagestouren diese Insel anlaufen',
    pie: 'Öffnet auf unserer Partnerseite',
  },
  fr: {
    guia: 'Dates et tarifs sur notre site de réservation',
    isla: 'Voyez quelles excursions font escale sur cette île',
    pie: 'Ouvre sur notre site partenaire',
  },
  'pt-br': {
    guia: 'Veja datas e preços no nosso site de reservas',
    isla: 'Veja quais passeios de um dia param nesta ilha',
    pie: 'Abre no nosso site parceiro',
  },
};

export interface EnlaceHermana {
  href: string;
  texto: string;
  pie: string;
  dominio: string;
}

/**
 * Devuelve el enlace a la hermana para esta página, o `null` si no hay ninguno
 * que de verdad encaje. Devolver `null` es lo normal: solo 14 de las 381
 * páginas tienen destino.
 */
export function enlaceHermana(
  tipo: 'guide' | 'island',
  slug: string,
  lang: string,
): EnlaceHermana | null {
  const destino = tipo === 'guide' ? GUIAS[slug] : ISLAS[slug];
  if (!destino) return null;

  const prefijo = PREFIJO_HERMANA[lang];
  if (prefijo === undefined) return null;

  const t = TEXTOS[lang] ?? TEXTOS.en;
  const dominio = DOMINIO[destino.sitio];

  return {
    href: `${dominio}${prefijo}${destino.ruta}`,
    texto: tipo === 'guide' ? t.guia : t.isla,
    pie: t.pie,
    dominio: dominio.replace('https://', ''),
  };
}
