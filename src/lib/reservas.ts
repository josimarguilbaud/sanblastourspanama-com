/**
 * Reserva en línea en sanblastourspanama.com.
 *
 * ── Qué cambió ────────────────────────────────────────────────────────────
 * Hasta el 03/09/2026 esta web mandaba el 100 % de las reservas a WhatsApp, y
 * eso estaba escrito en el código como decisión deliberada del cliente, no
 * como una carencia. **El dueño la cambió el 03/09/2026**: quiere que aquí
 * también se pueda reservar y pagar en línea. WhatsApp se queda como segunda
 * vía, no se retira.
 *
 * ── Cómo se conecta ───────────────────────────────────────────────────────
 * No hay que sembrar nada en la base del widget. Comprobado contra producción:
 *
 *   /api/tours?site=sanblastourspanama  ->  5 tours
 *
 * Son los 5 con `catalog_visibility` nula, o sea los que se ven sin filtro de
 * sitio. Pasar `site=sanblastourspanama` no cambia el catálogo, pero **sí deja
 * la atribución** en `bookings.site`, que es como se sabe qué web trajo cada
 * reserva.
 *
 * El montaje es el componente web `<sanblas-reserva>` de `embed.js`, no un
 * iframe: comparte sesión y atribución con la página y no carga un documento
 * aparte. Es la misma vía que usa sanblasfull en escritorio.
 *
 * ⚠️ El atributo `tour` es el **`tour_key`**, no el slug de esta web. Para los
 * cinco tours base son claves con guion bajo (`day_tour_vip`); en las webs
 * hermanas coincide con el slug, y de ahí viene la confusión.
 *
 * ── Lo que NO se puede reservar aquí, y por qué ───────────────────────────
 * 1. **`super-vip-private-day-tour`.** Su frontmatter declara
 *    `day_tour_super_vip_privado`, y esa clave **no existe en ningún catálogo
 *    vivo** — está desactivada, igual que en la web hermana, porque se cotiza
 *    a medida. Montarle el widget daría un error al visitante. Sigue con
 *    WhatsApp, que es lo correcto para un producto que se cotiza.
 * 2. **Los 11 paquetes.** No tienen `tour_key` a propósito: son conceptos que
 *    se arman sobre el catálogo real, sin precio ni isla fija. WhatsApp.
 *
 * ── Limitación conocida de las estadías ───────────────────────────────────
 * ⚠️ Las 5 páginas de alojamiento apuntan todas a `overnight_stay`, que es UN
 * producto con las 5 cabañas dentro como sub-opción. `embed.js` solo acepta
 * `tour`, `lang` y `site`, así que **la cabaña concreta no se puede
 * preseleccionar**: el visitante la elige dentro del widget. Si algún día
 * `embed.js` acepta la sub-opción, aquí es donde se enchufa.
 */

/**
 * Las claves que de verdad se pueden reservar hoy.
 *
 * ⚠️ Es una lista a mano y puede quedarse vieja. `scripts/verificar-reservas.mjs`
 * la contrasta contra `/api/tours` de producción. **No corre en el `prebuild`**
 * a propósito: hacer que el despliegue dependa de que la API de reservas esté
 * en pie significa que un corte de esa API bloquea publicar la web.
 */
export const CLAVES_RESERVABLES = new Set([
  'day_tour_basico',
  'day_tour_vip',
  'day_tour_isla_diablo',
  'day_tour_cayos_holandeses',
  'overnight_stay',
]);

/** Los idiomas de esta web y el código que entiende el widget. */
const IDIOMA_WIDGET: Record<string, string> = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  'pt-br': 'pt',
};

/**
 * La clave con la que reservar esta entrada, o `null` si no se reserva en
 * línea. Devolver `null` es una respuesta legítima, no un fallo: seis de los
 * dieciséis productos se cotizan por WhatsApp a propósito.
 */
export function claveDeReserva(datos: { tourKey?: string; category?: string }): string | null {
  /* Las estadías comparten producto en el widget aunque aquí tengan una página
   * por tipo de cabaña. */
  const clave = datos.tourKey ?? (datos.category === 'overnight' ? 'overnight_stay' : undefined);
  if (!clave) return null;
  return CLAVES_RESERVABLES.has(clave) ? clave : null;
}

/** El código de idioma que espera el widget. */
export function idiomaWidget(lang: string): string {
  return IDIOMA_WIDGET[lang] ?? 'en';
}

/** Enlace directo al widget, para quien no pueda cargar el componente. */
export function urlWidget(clave: string, lang: string): string {
  return `https://reservas.sanblastravel.com/reservar?mode=express&site=sanblastourspanama&lang=${idiomaWidget(lang)}&tour=${clave}`;
}
