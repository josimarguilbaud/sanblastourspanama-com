/**
 * Contrasta las claves Y LOS PRECIOS de esta web contra el catálogo VIVO.
 *
 * ── Por qué existe ────────────────────────────────────────────────────────
 * `src/lib/reservas.ts` lleva a mano la lista de `tour_key` que se pueden
 * reservar. Una lista a mano envejece: si mañana se desactiva un tour en el
 * panel, esta web seguiría enseñando un formulario de reserva que falla al
 * pulsar, y nadie se enteraría hasta que un cliente lo cuente.
 *
 * Ya pasó una vez: el frontmatter de `super-vip-private-day-tour` declara
 * `day_tour_super_vip_privado`, y esa clave lleva tiempo desactivada.
 *
 * ── Y por qué también mira los precios ────────────────────────────────────
 * Desde el 03/09/2026 existe `/prices`, y con ella `src/lib/precios.ts`: el
 * ÚNICO sitio del repo donde hay cifras escritas a mano. Una cifra a mano
 * envejece igual que una lista a mano, y peor: un precio viejo en una página de
 * precios no falla, solo miente. En este proyecto ya pasó — una entrada de blog
 * anunciaba $135 para dos tours de $114 y $149, y nadie lo vio.
 *
 * Así que la segunda mitad de este script compara, una a una, todas las cifras
 * de `precios.ts` contra lo que responde la API: precio de los cuatro tours de
 * un día, abono de cada uno, mínimo de viajeros, precio y noche extra de las
 * cinco cabañas, impuesto de la comarca, suplemento de Playa Bonita y noches
 * máximas.
 *
 * ⚠️ Lo único que NO se puede contrastar es `RECARGO_TARJETA_PCT`: el 7 % no
 * viaja en `/api/tours`, vive en el motor de cobros. Está anotado como límite
 * conocido, aquí y en `precios.ts`.
 *
 * ── Por qué NO corre en el `prebuild` ─────────────────────────────────────
 * ⚠️ A propósito. Meterlo en el build significa que un corte de la API de
 * reservas bloquea publicar la web — una avería en un servicio tumbando el
 * despliegue de otro. Esto se corre a mano, o desde un cron aparte que avise.
 *
 *     node scripts/verificar-reservas.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const API = 'https://reservas.sanblastravel.com/api/tours?site=sanblastourspanama';
const LIB = new URL('../src/lib/reservas.ts', import.meta.url);
const TOURS = new URL('../src/content/tours/en/', import.meta.url);

/* La lista tal y como está escrita en el código. */
const fuente = readFileSync(LIB, 'utf8');
const bloque = fuente.match(/CLAVES_RESERVABLES = new Set\(\[([\s\S]*?)\]\)/);
if (!bloque) {
  console.error('No encuentro CLAVES_RESERVABLES en src/lib/reservas.ts');
  process.exit(1);
}
const declaradas = new Set([...bloque[1].matchAll(/'([^']+)'/g)].map((m) => m[1]));

/* Lo que de verdad se puede vender hoy. Se guarda la respuesta ENTERA, no solo
 * las claves: la segunda mitad del script necesita precios, abonos y la
 * configuración del impuesto, que viajan en el mismo JSON. */
let vivas;
let respuesta;
try {
  const r = await fetch(API);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  respuesta = await r.json();
  vivas = new Set(Object.keys(respuesta.catalog ?? {}));
} catch (e) {
  console.error(`No pude consultar el catálogo: ${e.message}`);
  console.error('Si la API está caída esto no dice nada. Reintenta más tarde.');
  process.exit(2);
}

console.log(`declaradas en el código: ${[...declaradas].sort().join(', ')}`);
console.log(`vivas en el catálogo:    ${[...vivas].sort().join(', ')}\n`);

let fallos = 0;

const fantasmas = [...declaradas].filter((k) => !vivas.has(k));
if (fantasmas.length) {
  fallos += fantasmas.length;
  console.error('GRAVE — el código ofrece reservar claves que YA NO EXISTEN:');
  for (const k of fantasmas) console.error(`  ${k}  — el formulario fallaría al pulsar`);
  console.error('');
}

const nuevas = [...vivas].filter((k) => !declaradas.has(k));
if (nuevas.length) {
  console.log('Hay tours vendibles que esta web todavía no ofrece en línea:');
  for (const k of nuevas) console.log(`  ${k}`);
  console.log('(no es un fallo: puede ser deliberado)\n');
}

/* Y el otro lado: claves que el contenido declara y no se pueden vender. */
if (existsSync(TOURS)) {
  const huerfanas = [];
  for (const f of readdirSync(TOURS)) {
    const fm = readFileSync(new URL(f, TOURS), 'utf8').match(/^---([\s\S]*?)---/)?.[1] ?? '';
    const clave = fm.match(/^tourKey:\s*["']?([^"'\n]+)/m)?.[1]?.trim();
    if (clave && !vivas.has(clave)) huerfanas.push(`${f.replace('.md', '')} -> ${clave}`);
  }
  if (huerfanas.length) {
    console.log('Fichas cuyo tourKey no está en el catálogo (siguen con WhatsApp, correcto):');
    for (const h of huerfanas) console.log(`  ${h}`);
    console.log('');
  }
}

/* ────────────────────────────────────────────────────────────────────────────
 * SEGUNDA MITAD: los precios de `src/lib/precios.ts` contra el catálogo vivo.
 *
 * Se lee el fichero como TEXTO y se saca cada cifra con una expresión regular,
 * igual que arriba con `CLAVES_RESERVABLES`. Es feo, y es a propósito: importar
 * un `.ts` desde un `.mjs` obligaría a meter un compilador en un script que
 * tiene que poder correrse a pelo, sin instalar nada.
 *
 * ⚠️ Por eso el formato de esas listas importa: un objeto por línea. Si alguien
 * parte una entrada en varias líneas, esto deja de encontrarla — y para que no
 * pase en silencio, un bloque vacío cuenta como fallo.
 * ────────────────────────────────────────────────────────────────────────── */

const LIB_PRECIOS = new URL('../src/lib/precios.ts', import.meta.url);
const fuentePrecios = readFileSync(LIB_PRECIOS, 'utf8');

/** Las entradas `{ ... }` de un array exportado, cada una como objeto plano. */
function filasDe(nombre) {
  const m = fuentePrecios.match(new RegExp(`${nombre}[^=]*=\\s*\\[([\\s\\S]*?)\\n\\];`));
  if (!m) return null;
  return [...m[1].matchAll(/\{([^}]*)\}/g)].map((f) => {
    const obj = {};
    for (const campo of f[1].split(',')) {
      const par = campo.match(/^\s*(\w+)\s*:\s*(.+?)\s*$/);
      if (!par) continue;
      const bruto = par[2];
      obj[par[1]] = /^['"]/.test(bruto) ? bruto.slice(1, -1) : bruto === 'null' ? null : Number(bruto);
    }
    return obj;
  });
}

/** Una constante numérica suelta, `export const X = 7;`. */
function numeroDe(nombre) {
  const m = fuentePrecios.match(new RegExp(`${nombre}\\s*=\\s*(\\d+(?:\\.\\d+)?)\\s*;`));
  return m ? Number(m[1]) : null;
}

/** Un campo de un objeto literal en una línea, `X = { a: 1, b: 2 };`. */
function campoDe(nombre, campo) {
  const m = fuentePrecios.match(new RegExp(`${nombre}\\s*=\\s*\\{([^}]*)\\}`));
  if (!m) return null;
  const c = m[1].match(new RegExp(`${campo}\\s*:\\s*(\\d+(?:\\.\\d+)?)`));
  return c ? Number(c[1]) : null;
}

const avisos = [];

/** Compara y anota. `null`/`undefined` se tratan como el mismo «no hay dato». */
function cotejar(que, escrito, vivo) {
  const iguales = escrito === vivo || (escrito == null && vivo == null);
  if (!iguales) {
    fallos += 1;
    console.error(`  ✗ ${que}: precios.ts dice ${escrito}, el catálogo dice ${vivo}`);
  }
  return iguales;
}

console.log('Precios de src/lib/precios.ts contra el catálogo:');

const toursEscritos = filasDe('TOURS_DIA');
const cabanasEscritas = filasDe('CABANAS');

if (!toursEscritos?.length || !cabanasEscritas?.length) {
  fallos += 1;
  console.error('  ✗ No pude leer TOURS_DIA o CABANAS de src/lib/precios.ts.');
  console.error('    ¿Se partió alguna entrada en varias líneas? Este script espera una por línea.');
} else {
  /* 1. Los cuatro tours de un día: precio, abono y mínimo de viajeros. */
  for (const t of toursEscritos) {
    const vivo = respuesta.catalog?.[t.tourKey];
    if (!vivo) {
      fallos += 1;
      console.error(`  ✗ ${t.tourKey}: no está en el catálogo. /prices lo anuncia igual.`);
      continue;
    }
    cotejar(`${t.tourKey} · precio adulto`, t.adulto, Number(vivo.prices?.adult));
    cotejar(`${t.tourKey} · abono`, t.abono, Number(vivo.deposit_amount));
    cotejar(`${t.tourKey} · mínimo de viajeros`, t.minViajeros, vivo.min_travelers ?? null);
  }

  /* 2. Las cinco cabañas, que son sub-opciones de `overnight_stay`. */
  const estadia = respuesta.catalog?.overnight_stay;
  const itemsVivos = estadia?.options?.accommodation?.items ?? [];
  if (!itemsVivos.length) {
    fallos += 1;
    console.error('  ✗ overnight_stay no trae opciones de alojamiento. /prices publica cinco.');
  } else {
    for (const c of cabanasEscritas) {
      const vivo = itemsVivos.find((i) => i.tour_key === c.clave);
      if (!vivo) {
        fallos += 1;
        console.error(`  ✗ cabaña ${c.clave}: ya no existe como opción de overnight_stay.`);
        continue;
      }
      cotejar(`${c.clave} · primera noche`, c.porNoche, Number(vivo.price));
      cotejar(`${c.clave} · noche extra`, c.nocheExtra, Number(vivo.additional_night_prices?.adult));
    }

    /* La estadía se reserva con la mitad, y la página lo dice con esas
     * palabras. Si el panel lo cambia, la frase deja de ser verdad. */
    cotejar('overnight_stay · abono en %', 50, Number(estadia.deposit_percentage));
    cotejar('overnight_stay · noches máximas', numeroDe('NOCHES_MAX'), Number(estadia.max_nights));

    /* ⚠️ Aviso, no fallo: el producto padre anuncia un «desde» que NO es el de
     * su opción más barata. La página publica el mínimo real, que es el que se
     * cobra; esto queda anotado para que se corrija en el panel. */
    const masBarata = Math.min(...cabanasEscritas.map((c) => c.porNoche));
    const cabeceraPadre = Number(estadia.prices?.adult);
    if (cabeceraPadre && cabeceraPadre !== masBarata) {
      avisos.push(
        `overnight_stay anuncia $${cabeceraPadre} como precio de cabecera, pero su opción más ` +
          `barata cuesta $${masBarata}. /prices publica $${masBarata}, que es lo que se cobra de ` +
          `verdad. Conviene alinear el panel.`,
      );
    }
  }
}

/* 3. El impuesto de la comarca, que la propia API publica en `config`. */
const imp = respuesta.config?.comarcaTax ?? {};
cotejar('impuesto de comarca · extranjero', campoDe('IMPUESTO_COMARCA', 'extranjero'), Number(imp.perAdult));
cotejar('impuesto de comarca · residente', campoDe('IMPUESTO_COMARCA', 'residente'), Number(imp.residentPerAdult));

/* 4. El suplemento de Playa Bonita, que vive como `extra` de los tours. */
const extraPlaya = Object.values(respuesta.catalog ?? {})
  .flatMap((t) => t.extras ?? [])
  .find((e) => e?.id === 'playa_bonita');
if (extraPlaya) {
  cotejar('suplemento Playa Bonita', numeroDe('RECOGIDA_PLAYA_BONITA'), Number(extraPlaya.price));
} else {
  avisos.push('Ya no hay ningún extra `playa_bonita` en el catálogo; /prices sigue anunciándolo.');
}

if (avisos.length) {
  console.log('\nAvisos (no rompen nada, pero conviene mirarlos):');
  for (const a of avisos) console.log(`  · ${a}`);
}

console.log(
  '\nNo comprobado: RECARGO_TARJETA_PCT. El 7 % no viaja en /api/tours — vive en\n' +
    'config(\'sanblas.card_surcharge_percent\') del motor de cobros.',
);

if (fallos) {
  console.error(`\n✗ ${fallos} desajuste(s). Arregla src/lib/reservas.ts o src/lib/precios.ts,`);
  console.error('  según cuál de los dos esté mintiendo, y vuelve a correr esto.');
  process.exit(1);
}
console.log('\n✓ OK — las claves se pueden reservar y todas las cifras de /prices cuadran.');
