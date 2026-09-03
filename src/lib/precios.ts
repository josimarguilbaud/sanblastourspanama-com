/**
 * Los precios de San Blas, escritos UNA sola vez.
 *
 * ── De dónde salen ────────────────────────────────────────────────────────
 * Del catálogo VIVO del motor de reservas, no de la memoria de nadie:
 *
 *     curl -s "https://reservas.sanblastravel.com/api/tours?site=sanblastourspanama"
 *
 * Cada cifra de este fichero se copió de esa respuesta el **03/09/2026**. Lo
 * que la API llama `catalog[<tour_key>].prices.adult` es aquí `adulto`; lo que
 * llama `deposit_amount` es `abono`; los tipos de cabaña salen de
 * `catalog.overnight_stay.options.accommodation.items`; y el impuesto de la
 * comarca sale de `config.comarcaTax`, que la propia API publica.
 *
 * ── Por qué existe, si `content.config.ts` dice que no hay precios ────────
 * Dice esto, y sigue siendo verdad para las FICHAS: «No hardcoded prices:
 * PriceCalculationService/Tour.prices is the live source of truth». Las 16
 * fichas de tour y los 11 paquetes no llevan precio, y no deben llevarlo: su
 * precio lo pinta el widget en vivo.
 *
 * La página `/prices` es la excepción razonada. «Cuánto cuesta un tour a San
 * Blas» es una de las consultas con más intención de compra que hay, y una
 * página de precios sin precios no la contesta: ni sale en un fragmento
 * destacado ni convence a nadie. La forma de tener las dos cosas es que el
 * número esté en UN solo sitio del repo —este— y que haya algo que avise
 * cuando se desincronice.
 *
 * ⚠️ Ese algo es `scripts/verificar-reservas.mjs`. Contrasta TODAS las cifras
 * de este fichero contra la API y avisa de la que no cuadre. **No corre en el
 * `prebuild`** a propósito: un corte de la API de reservas no debe bloquear
 * publicar la web. Se corre a mano:
 *
 *     node scripts/verificar-reservas.mjs
 *
 * ⚠️ Y la regla que ya costó un fallo real en este proyecto: **ningún precio
 * en prosa**. Una entrada de blog anunciaba $135 para dos tours que costaban
 * $114 y $149, y nadie se enteró porque el número estaba dentro de una frase.
 * Si un texto necesita una cifra, la lee de aquí.
 */

/** El día en que estas cifras se comprobaron contra la API. */
export const VERIFICADO = '2026-09-03';

/** La consulta que hay que repetir para volver a comprobarlas. */
export const API_CATALOGO =
  'https://reservas.sanblastravel.com/api/tours?site=sanblastourspanama';

export interface PrecioTourDia {
  /** La clave del motor de reservas. NO es el slug de esta web. */
  tourKey: string;
  /** La ficha de esta web, bajo `/tours/`. */
  slug: string;
  /** USD por adulto. Los niños pagan lo mismo; los bebés (0-4), nada. */
  adulto: number;
  /** El abono por persona que cobra el widget al reservar, en USD. */
  abono: number;
  /** Mínimo de viajeros para que el tour salga, si lo hay. */
  minViajeros: number | null;
}

/**
 * Los cuatro tours de un día que se pueden reservar y pagar en esta web.
 *
 * ⚠️ El formato de cada línea lo lee `scripts/verificar-reservas.mjs` con una
 * expresión regular. Si se reordenan los campos o se parte una línea en dos,
 * hay que actualizar el script — o dejará de comprobar lo que dice comprobar,
 * que es peor que no tenerlo.
 */
export const TOURS_DIA: PrecioTourDia[] = [
  { tourKey: 'day_tour_basico', slug: 'classic-day-tour', adulto: 114, abono: 41, minViajeros: null },
  { tourKey: 'day_tour_vip', slug: 'vip-day-tour', adulto: 135, abono: 62, minViajeros: null },
  { tourKey: 'day_tour_isla_diablo', slug: 'isla-diablo-day-tour', adulto: 135, abono: 62, minViajeros: null },
  { tourKey: 'day_tour_cayos_holandeses', slug: 'dutch-cays-day-tour', adulto: 225, abono: 100, minViajeros: 4 },
];

export interface PrecioCabana {
  /** La clave de la sub-opción dentro de `overnight_stay`. */
  clave: string;
  /** La ficha de esta web, bajo `/tours/`. */
  slug: string;
  /** USD por persona y noche, primera noche. */
  porNoche: number;
  /** USD por persona para cada noche añadida. */
  nocheExtra: number;
}

/**
 * Los cinco tipos de cabaña de la estadía.
 *
 * Las cinco son sub-opciones de UN producto del widget, `overnight_stay`: por
 * eso las cinco páginas de alojamiento montan el mismo formulario y la cabaña
 * se elige dentro (ver `src/lib/reservas.ts`).
 */
export const CABANAS: PrecioCabana[] = [
  { clave: 'camping-bajo-las-estrellas', slug: 'camping-under-stars-overnight', porNoche: 170, nocheExtra: 85 },
  { clave: 'hostal-isleno-dormitorio-compartido', slug: 'hostal-isleno-overnight', porNoche: 170, nocheExtra: 85 },
  { clave: 'cabana-privada-clasica', slug: 'cabana-privada-clasica-overnight', porNoche: 185, nocheExtra: 85 },
  { clave: 'cabana-privada-deluxe', slug: 'cabana-privada-deluxe-overnight', porNoche: 198, nocheExtra: 85 },
  { clave: 'cabana-overwater-sobre-el-mar', slug: 'overwater-cabin-overnight', porNoche: 260, nocheExtra: 100 },
];

/**
 * El impuesto de entrada a la comarca de Guna Yala, por persona.
 *
 * ⚠️ **No va incluido en ningún precio** y se paga en la frontera de Guna Yala,
 * en efectivo o con tarjeta al conductor. Es la queja número uno de quien no lo
 * sabía, así que la página lo dice donde no se pueda pasar por alto.
 *
 * La tarifa de residente exige pasaporte panameño o carné de residencia.
 * Sale de `config.comarcaTax` de la propia API.
 */
export const IMPUESTO_COMARCA = { extranjero: 22, residente: 7 };

/**
 * El recargo de pagar con tarjeta, en porcentaje sobre lo que se cobra.
 *
 * ⚠️ Este NO viaja en `/api/tours`, así que el script no puede contrastarlo.
 * Sale del código del motor de cobros: `config('sanblas.card_surcharge_percent')`,
 * por defecto 7, aplicado en `app/Actions/CreateBookingAction.php`. Si algún día
 * cambia allí, aquí no se entera nadie — está anotado como límite conocido.
 */
export const RECARGO_TARJETA_PCT = 7;

/** Suplemento por recogida en la zona de Playa Bonita, por persona (extra `playa_bonita`). */
export const RECOGIDA_PLAYA_BONITA = 15;

/** Noches máximas que acepta el widget para una estadía. */
export const NOCHES_MAX = 3;

const preciosDia = TOURS_DIA.map((t) => t.adulto);
const preciosNoche = CABANAS.map((c) => c.porNoche);

/** El rango real de un tour de un día, en USD por persona. */
export const RANGO_DIA = { desde: Math.min(...preciosDia), hasta: Math.max(...preciosDia) };

/** El rango real de una noche en las islas, en USD por persona y noche. */
export const RANGO_NOCHE = { desde: Math.min(...preciosNoche), hasta: Math.max(...preciosNoche) };

/** El precio de un `tour_key`, o `null` si no está en la lista. */
export function precioDe(tourKey: string): number | null {
  return TOURS_DIA.find((t) => t.tourKey === tourKey)?.adulto ?? null;
}
