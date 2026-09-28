/**
 * Guardián anti-canibalización ENTRE colecciones de este mismo sitio.
 *
 * `verificar-contenido.mjs` ya compara entradas DENTRO de una misma colección
 * (dos tours entre sí, dos guías entre sí). Deja un punto ciego: un tour y una
 * guía persiguiendo la misma consulta no lo detecta nadie, porque nunca se
 * comparan entre sí.
 *
 * Es el mismo punto ciego, y la misma causa, que hundió a sanblasfull.com en
 * agosto de 2026 (ver `chatbot-sanblas/sites/verificar-canibalizacion.mjs`):
 * el guardián de esa casa comparaba sanblasfull contra sanblastourspty, y el
 * daño real vino de DIECISÉIS páginas del MISMO sitio repitiendo «pasadía».
 * Aquí se aplica el mismo método (Jaccard sobre el título normalizado) al
 * hueco que a esa otra web le costó 750 clics/28 días y el primer puesto.
 *
 * Qué mira: el `seoTitle` (o el título visible si no hay `seoTitle`) de CADA
 * entrada de las 5 colecciones, comparado contra el de TODAS las demás
 * colecciones, mismo idioma. NO mide parecido de redacción, mide solapamiento
 * de intención: dos páginas pueden hablar las dos de San Blas siempre que
 * aspiren a consultas distintas.
 *
 * Primera corrida en limpio, 28/09/2026: 8.350 pares comparados, cero
 * conflictos reales. Con eso ya está atado al `prebuild`, junto a
 * `verificar-contenido.mjs` — antes corría solo a mano justamente para no
 * romper el build a ciegas con hallazgos todavía sin revisar.
 *
 * Uso manual: node scripts/verificar-canibalizacion.mjs
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const CONTENIDO = join(AQUI, '..', 'src', 'content');
const IDIOMAS = ['en', 'es', 'de', 'fr', 'pt-br'];
const COLECCIONES = ['islands', 'tours', 'guides', 'packages', 'posts'];

/* Por encima de esto, dos títulos compiten por lo mismo. Mismo umbral que el
 * guardián de la casa hermana (calibrado allí contra títulos reales: el par
 * más parecido que NO era canibalización quedaba en 0.40, los que sí lo eran
 * pasaban de 0.70). Se mantiene aquí como punto de partida — la primera
 * corrida de este script es la que dice si hace falta ajustarlo para el estilo
 * de título propio de este sitio. */
const LIMITE = 0.6;

/* Gramática de los 5 idiomas + el tema del sitio, que sale en casi todos los
 * títulos por definición y compararlo sería declarar que todo compite con
 * todo. */
const VACIAS = new Set([
  'a', 'al', 'de', 'del', 'la', 'las', 'el', 'los', 'un', 'una', 'y', 'o', 'en', 'con', 'por',
  'para', 'que', 'su', 'tu', 'lo', 'es', 'the', 'of', 'to', 'and', 'in', 'on', 'for', 'your',
  'is', 'are', 'how', 'what', 'you', 'best', 'guide', 'le', 'les', 'des', 'du', 'et', 'der',
  'die', 'das', 'und', 'im', 'wie', 'was', 'ist', 'il', 'di', 'e', 'da', 'do', 'sua', 'seu',
  'como', 'que', 'para', 'san', 'blas', 'guna', 'yala', 'panama', 'panamá',
]);

const normalizar = (s) =>
  s.toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !VACIAS.has(w));

const jaccard = (a, b) => {
  const A = new Set(a);
  const B = new Set(b);
  if (!A.size || !B.size) return 0;
  let comunes = 0;
  for (const x of A) if (B.has(x)) comunes++;
  return comunes / (A.size + B.size - comunes);
};

/** El nombre visible de cada colección, para cuando falta `seoTitle`. */
const CAMPO_TITULO = { islands: 'name', tours: 'name', packages: 'name', guides: 'title', posts: 'title' };

function fronmatter(ruta) {
  const bloque = readFileSync(ruta, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!bloque) return {};
  const out = {};
  const mSeo = bloque[1].match(/^seoTitle:\s*"([\s\S]*?)"\s*$/m);
  if (mSeo) out.seoTitle = mSeo[1];
  for (const campo of new Set(Object.values(CAMPO_TITULO))) {
    const m = bloque[1].match(new RegExp(`^${campo}:\\s*"([\\s\\S]*?)"\\s*$`, 'm'));
    if (m) out[campo] = m[1];
  }
  return out;
}

// título -> por colección/idioma/slug
const porIdioma = {}; // idioma -> [{col, slug, titulo, palabras}]
for (const idi of IDIOMAS) porIdioma[idi] = [];

for (const col of COLECCIONES) {
  const dir = join(CONTENIDO, col, 'en');
  if (!existsSync(dir)) continue;
  const slugs = readdirSync(dir).filter((f) => f.endsWith('.md'));

  for (const slug of slugs) {
    for (const idi of IDIOMAS) {
      const ruta = join(CONTENIDO, col, idi, slug);
      if (!existsSync(ruta)) continue;
      const fm = fronmatter(ruta);
      const titulo = fm.seoTitle || fm[CAMPO_TITULO[col]];
      if (!titulo) continue;
      porIdioma[idi].push({ col, slug, titulo, palabras: normalizar(titulo) });
    }
  }
}

const fallos = [];
let comparaciones = 0;

for (const idi of IDIOMAS) {
  const lista = porIdioma[idi];
  for (let i = 0; i < lista.length; i++) {
    for (let j = i + 1; j < lista.length; j++) {
      // Solo entre colecciones DISTINTAS: dentro de una misma colección ya
      // vigila `verificar-contenido.mjs`, y con otro criterio (cuerpo, no
      // título) — comparar aquí también duplicaría el hallazgo con otro número.
      if (lista[i].col === lista[j].col) continue;
      comparaciones++;
      const s = jaccard(lista[i].palabras, lista[j].palabras);
      if (s > LIMITE) {
        fallos.push(
          `[${idi}] ${lista[i].col}/${lista[i].slug} y ${lista[j].col}/${lista[j].slug} ` +
          `compiten (${Math.round(s * 100)}% de solapamiento)\n` +
          `        ${lista[i].titulo}\n` +
          `        ${lista[j].titulo}`
        );
      }
    }
  }
}

if (fallos.length) {
  console.error(`\n✗ ${fallos.length} par(es) de páginas de colecciones DISTINTAS compiten por la misma consulta:\n`);
  for (const f of fallos) console.error(`    ${f}\n`);
  console.error('  Dos páginas de este sitio apuntando a la misma consulta no suman: Google elige');
  console.error('  una y hunde a la otra, o no elige ninguna. Es lo que le pasó a sanblasfull en');
  console.error('  agosto de 2026, con dieciséis páginas del mismo dominio peleando por «pasadía».\n');
  console.error('  Arréglalo de una de estas dos formas:');
  console.error('   · Si son intenciones distintas, que el título lo diga.');
  console.error('   · Si son la MISMA intención, sobra una: quédate con la mejor y enlaza la otra');
  console.error('     hacia ella en vez de dejarlas competir.\n');
  process.exit(1);
}

console.log(`✓ Ninguna página compite con otra de distinta colección (${comparaciones} pares comparados).`);
