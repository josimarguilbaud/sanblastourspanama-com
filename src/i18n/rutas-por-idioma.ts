/**
 * Mapa explícito ruta ↔ idioma para las páginas FIJAS del sitio.
 *
 * POR QUÉ EXISTE
 * --------------
 * El resto del sitio empareja las versiones de idioma asumiendo que la ruta es
 * la misma con otro prefijo (`/x` ↔ `/es/x`). Para casi todo es cierto, pero
 * las páginas legales tienen el SLUG TRADUCIDO:
 *
 *     /legal/terms   /es/legal/terminos   /de/legal/agb
 *     /fr/legal/conditions                /pt-br/legal/termos
 *
 * Sin este mapa, `Seo.astro` construía la URL de cada idioma pegando el prefijo
 * a la ruta inglesa, así que `/es/legal/terminos` se anunciaba a sí misma como
 * `/es/legal/terms` — una URL que NO EXISTE. Consecuencias medidas el
 * 02/09/2026 sobre `dist`: 26 etiquetas `hreflang` y 12 `canonical` apuntando a
 * un 404. Un `canonical` roto le dice a Google que la página buena es otra que
 * no puede rastrear; un `hreflang` roto no empareja, así que las cinco
 * versiones dejan de ser traducciones entre sí y cada una queda huérfana,
 * compitiendo sola.
 *
 * CÓMO SE USA
 * -----------
 * Es la ÚNICA fuente de verdad de las rutas de las páginas fijas: la consumen
 * `components/Seo.astro` (canonical + hreflang) y `components/Footer.astro`
 * (enlaces legales). Si aparece otra copia de estos slugs en algún sitio, se
 * volverán a desincronizar — que es justo como nació el fallo.
 *
 * La CLAVE del mapa es la ruta inglesa. Es solo un identificador estable: el
 * inglés no está privilegiado, cada idioma lee SU propia entrada. Es la ruta
 * que las páginas ya pasan en `path=`, por eso se eligió — así ninguna URL
 * publicada cambia.
 *
 * ⚠️ Las páginas de colección (`/tours/[slug]`, `/islands/[slug]`,
 * `/guides/[slug]`, `/blog/[slug]`, `/tours/packages/[slug]`) NO van aquí: su
 * slug es idéntico en los 5 idiomas y su disponibilidad real se deduce de los
 * ficheros de `src/content/` con `i18n/content.ts`. Esa es su fuente de verdad,
 * y duplicarla aquí sería el mismo error otra vez.
 *
 * ⚠️ Al añadir una página fija nueva hay que añadirla aquí, en los idiomas en
 * los que exista de verdad. Anunciar un idioma que no existe manda a Google a
 * un 404, que es peor que no anunciarlo. `scripts/verificar-hreflang.mjs`
 * comprueba en cada build que toda URL anunciada corresponde a un fichero
 * construido, y rompe el build si no.
 */
import { locales, type Locale } from './ui';

type RutasPorIdioma = Partial<Record<Locale, string>>;

/** Atajo para las rutas cuyo slug NO cambia de idioma (la mayoría). */
function iguales(ruta: string): RutasPorIdioma {
  return Object.fromEntries(locales.map((l) => [l, ruta])) as RutasPorIdioma;
}

export const RUTAS_FIJAS: Record<string, RutasPorIdioma> = {
  // Slug idéntico en los 5 idiomas. Están aquí igualmente porque el mapa es
  // también la respuesta a «¿en qué idiomas existe esta página?»: antes cada
  // página lo declaraba a mano y las listas se quedaron viejas (`/tours` decía
  // ['en','es'] cuando ya existía en los cinco).
  '/': iguales('/'),
  '/faq': iguales('/faq'),
  '/guna-yala': iguales('/guna-yala'),
  '/yachts': iguales('/yachts'),
  '/tours': iguales('/tours'),
  // ⚠️ `/prices` NO lleva el slug traducido, aunque el mapa lo permitiría.
  // Sigue la convención de las otras páginas fijas; las legales son la
  // excepción, no la regla. Ver la cabecera de `src/pages/prices.astro`.
  '/prices': iguales('/prices'),
  '/islands': iguales('/islands'),
  '/guides': iguales('/guides'),
  '/blog': iguales('/blog'),
  '/reviews': iguales('/reviews'),

  // Las tres que motivaron el mapa: aquí el slug SÍ cambia.
  '/legal/terms': {
    en: '/legal/terms',
    es: '/legal/terminos',
    de: '/legal/agb',
    fr: '/legal/conditions',
    'pt-br': '/legal/termos',
  },
  '/legal/privacy': {
    en: '/legal/privacy',
    es: '/legal/privacidad',
    de: '/legal/datenschutz',
    fr: '/legal/confidentialite',
    'pt-br': '/legal/privacidade',
  },
  '/legal/cancellation-policy': {
    en: '/legal/cancellation-policy',
    es: '/legal/politica-cancelacion',
    de: '/legal/stornierung',
    fr: '/legal/annulation',
    'pt-br': '/legal/cancelamento',
  },
};

/** Las rutas por idioma de una página fija, o `null` si no es una página fija. */
export function rutasFijasDe(path: string | undefined): RutasPorIdioma | null {
  if (!path) return null;
  return RUTAS_FIJAS[path] ?? null;
}

/**
 * La ruta (sin prefijo de idioma) que le toca a `locale`. Para una página que
 * no está en el mapa devuelve `path` tal cual, que es el comportamiento
 * correcto de las colecciones: mismo slug en todos los idiomas.
 */
export function rutaSinPrefijo(path: string, locale: string): string {
  const rutas = rutasFijasDe(path);
  return rutas?.[locale as Locale] ?? path;
}

/** Los idiomas en los que existe una página fija; `null` si no lo es. */
export function idiomasDeRutaFija(path: string | undefined): string[] | null {
  const rutas = rutasFijasDe(path);
  return rutas ? Object.keys(rutas) : null;
}
