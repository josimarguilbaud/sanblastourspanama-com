/**
 * Contrasta las claves de reserva de esta web contra el catálogo VIVO.
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

/* Lo que de verdad se puede vender hoy. */
let vivas;
try {
  const r = await fetch(API);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  vivas = new Set(Object.keys((await r.json()).catalog ?? {}));
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

if (fallos) {
  console.error(`${fallos} clave(s) rotas. Quítalas de CLAVES_RESERVABLES en src/lib/reservas.ts.`);
  process.exit(1);
}
console.log('OK — todas las claves que esta web ofrece se pueden reservar de verdad.');
