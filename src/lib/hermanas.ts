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

/** sanblastravel.com solo existe en inglés (raíz) y español (`/es`). El resto
 *  de idiomas de esta web enlaza a la versión inglesa. */
const PREFIJO_TRAVEL: Record<string, string> = {
  en: '',
  de: '',
  fr: '',
  'pt-br': '',
  es: '/es',
};

/** `texto` elige una frase propia en vez de la genérica del tipo de página. */
type Destino = { sitio: 'full' | 'pty' | 'travel'; ruta: string; texto?: 'privado' | 'pareja' };

const DOMINIO = {
  full: 'https://sanblasfull.com',
  pty: 'https://sanblastourspty.com',
  travel: 'https://sanblastravel.com',
} as const;

/** Tour o paquete de esta web → su equivalente en sanblastravel.com, la marca
 *  de experiencias privadas (21/10/2026). Solo dos, y por la misma razón que
 *  el resto del mapa: aquí esos productos se cotizan por WhatsApp, y allí se
 *  reservan en línea. El Super VIP privado lleva tiempo `active=false` en el
 *  catálogo, así que su ficha no tiene widget; la pedida de mano es un paquete
 *  a medida. ⚠️ Nada de enlazar desde tours compartidos: sanblastravel NO
 *  trabaja «pasadía» ni «tour a San Blas», y un enlace desde esas fichas
 *  enfrentaría a las webs por la consulta barata. */
const TOURS: Record<string, Destino> = {
  'super-vip-private-day-tour': { sitio: 'travel', ruta: '/experiences/private-boat-day', texto: 'privado' },
};
const PAQUETES: Record<string, Destino> = {
  'proposal-island': { sitio: 'travel', ruta: '/experiences/private-romantic-day', texto: 'pareja' },
};

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
const TEXTOS: Record<string, { guia: string; isla: string; pie: string; privado: string; pareja: string; pieTravel: string }> = {
  en: {
    guia: 'Check dates and prices on our booking site',
    isla: 'See which day tours stop at this island',
    pie: 'Opens on our sister site',
    privado: "Book a private boat for your group online with San Blas Travel",
    pareja: "A private boat day for two, bookable online at San Blas Travel",
    pieTravel: "Our private-experiences brand",
  },
  es: {
    guia: 'Consulta fechas y precios en nuestra web de reservas',
    isla: 'Mira qué tours de un día paran en esta isla',
    pie: 'Se abre en nuestra web hermana',
    privado: "Reserva en línea una lancha privada para tu grupo en San Blas Travel",
    pareja: "Un día en lancha privada para dos, con reserva en línea en San Blas Travel",
    pieTravel: "Nuestra marca de experiencias privadas",
  },
  de: {
    guia: 'Termine und Preise auf unserer Buchungsseite',
    isla: 'Sieh, welche Tagestouren diese Insel anlaufen',
    pie: 'Öffnet auf unserer Partnerseite',
    privado: "Ein Privatboot für eure Gruppe online buchen bei San Blas Travel",
    pareja: "Ein privater Bootstag zu zweit, online buchbar bei San Blas Travel",
    pieTravel: "Unsere Marke für private Erlebnisse · Seite auf Englisch",
  },
  fr: {
    guia: 'Dates et tarifs sur notre site de réservation',
    isla: 'Voyez quelles excursions font escale sur cette île',
    pie: 'Ouvre sur notre site partenaire',
    privado: "Réservez en ligne un bateau privé pour votre groupe chez San Blas Travel",
    pareja: "Une journée en bateau privé à deux, réservable en ligne chez San Blas Travel",
    pieTravel: "Notre marque d'expériences privées · site en anglais",
  },
  'pt-br': {
    guia: 'Veja datas e preços no nosso site de reservas',
    isla: 'Veja quais passeios de um dia param nesta ilha',
    pie: 'Abre no nosso site parceiro',
    privado: "Reserve on-line uma lancha privativa para o seu grupo na San Blas Travel",
    pareja: "Um dia de lancha privativa a dois, com reserva on-line na San Blas Travel",
    pieTravel: "Nossa marca de experiências privativas · site em inglês",
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
  tipo: 'guide' | 'island' | 'tour' | 'package',
  slug: string,
  lang: string,
): EnlaceHermana | null {
  const mapa = { guide: GUIAS, island: ISLAS, tour: TOURS, package: PAQUETES }[tipo];
  const destino = mapa[slug];
  if (!destino) return null;

  const prefijo = (destino.sitio === 'travel' ? PREFIJO_TRAVEL : PREFIJO_HERMANA)[lang];
  if (prefijo === undefined) return null;

  const t = TEXTOS[lang] ?? TEXTOS.en;
  const dominio = DOMINIO[destino.sitio];

  return {
    href: `${dominio}${prefijo}${destino.ruta}`,
    texto: destino.texto ? t[destino.texto] : tipo === 'guide' ? t.guia : t.isla,
    pie: destino.sitio === 'travel' ? t.pieTravel : t.pie,
    dominio: dominio.replace('https://', ''),
  };
}
