/**
 * Comprueba el reparto de inglés entre sanblastourspanama.com y sanblasfull.com.
 *
 * Decisión del dueño (28/09/2026): pana lidera en inglés como guía/autoridad
 * (investigación, comparación, tipos de tour, islas) y sanblasfull se queda con
 * su territorio comercial ya establecido, "pasadía"/day-trip. Es el mismo
 * reparto que ya separa a las tres webs en los otros idiomas, aplicado ahora al
 * inglés — y el mismo mecanismo que, sin repartir, hundió a sanblasfull en
 * agosto de 2026 (16 páginas del MISMO sitio repitiendo "pasadía").
 *
 * Este script NO decide el reparto — solo mide si hoy, en inglés, ya hay
 * títulos de los dos sitios compitiendo por la misma consulta. Es deliberado
 * que compare dos REPOSITORIOS: no puede vivir en el `prebuild` de ninguno de
 * los dos porque necesita el otro repo presente en disco, así que se corre a
 * mano — mismo patrón que `verificar-reservas.mjs`.
 *
 * Uso (desde la raíz de sanblastourspanama-com):
 *   node scripts/verificar-territorio-ingles.mjs [ruta-a-chatbot-sanblas]
 *
 * Por defecto asume que chatbot-sanblas es hermano de este repo
 * (../chatbot-sanblas), que es como está en esta máquina.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const AQUI_REPO = join(import.meta.dirname, '..');
const OTRO_REPO = process.argv[2] || join(AQUI_REPO, '..', 'chatbot-sanblas');
const FULL = join(OTRO_REPO, 'sites', 'sanblasfull');

if (!existsSync(FULL)) {
  console.error(`\n✗ No encuentro sanblasfull en ${FULL}.`);
  console.error('  Pásale la ruta a chatbot-sanblas como argumento si no es hermano de este repo.\n');
  process.exit(2);
}

/* Mismo umbral que el guardián intra-pana y que el de la casa hermana: por
 * encima de esto, dos títulos compiten por la misma consulta. */
const LIMITE = 0.6;

const VACIAS = new Set([
  'a', 'al', 'de', 'del', 'la', 'las', 'el', 'los', 'un', 'una', 'y', 'o', 'en', 'con', 'por',
  'para', 'que', 'su', 'tu', 'lo', 'es', 'the', 'of', 'to', 'and', 'in', 'on', 'for', 'your',
  'is', 'are', 'how', 'what', 'you', 'best', 'guide', 'from', 'all',
  'san', 'blas', 'guna', 'yala', 'panama', 'panamá',
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

// ── Títulos en inglés de sanblasfull ────────────────────────────────────────
const titulosFull = [];

const enFull = JSON.parse(readFileSync(join(FULL, 'src', 'i18n', 'en.json'), 'utf8'));
for (const [clave, valor] of Object.entries(enFull.meta ?? {})) {
  if (clave.endsWith('_title') && typeof valor === 'string' && valor.trim()) {
    titulosFull.push({ que: `pagina/${clave.replace(/_title$/, '')}`, titulo: valor });
  }
}

const islandsFull = join(FULL, 'src', 'data', 'islands.en.json');
if (existsSync(islandsFull)) {
  for (const i of JSON.parse(readFileSync(islandsFull, 'utf8'))) {
    if (i.name) titulosFull.push({ que: `isla/${i.slug ?? i.name}`, titulo: i.name });
  }
}

const toursFull = join(FULL, 'src', 'data', 'tours.en.json');
if (existsSync(toursFull)) {
  for (const t of JSON.parse(readFileSync(toursFull, 'utf8'))) {
    if (t.name) titulosFull.push({ que: `tour/${t.slug ?? t.name}`, titulo: t.name });
  }
}

const blogFull = join(FULL, 'src', 'content', 'blog', 'en');
if (existsSync(blogFull)) {
  for (const f of readdirSync(blogFull).filter((x) => x.endsWith('.md'))) {
    const bloque = readFileSync(join(blogFull, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const m = bloque && bloque[1].match(/^title:\s*"((?:[^"\\]|\\.)*)"/m);
    if (m) titulosFull.push({ que: `blog/${f.replace(/\.md$/, '')}`, titulo: m[1] });
  }
}

// ── Títulos en inglés de pana ────────────────────────────────────────────────
const titulosPana = [];
const CAMPO_TITULO = { islands: 'name', tours: 'name', packages: 'name', guides: 'title', posts: 'title' };

for (const [col, campo] of Object.entries(CAMPO_TITULO)) {
  const dir = join(AQUI_REPO, 'src', 'content', col, 'en');
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const bloque = readFileSync(join(dir, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!bloque) continue;
    const seo = bloque[1].match(/^seoTitle:\s*"([\s\S]*?)"\s*$/m);
    const propio = bloque[1].match(new RegExp(`^${campo}:\\s*"([\\s\\S]*?)"\\s*$`, 'm'));
    const titulo = (seo && seo[1]) || (propio && propio[1]);
    if (titulo) titulosPana.push({ que: `${col}/${f.replace(/\.md$/, '')}`, titulo });
  }
}

console.log(`Comparando ${titulosPana.length} títulos en inglés de pana contra ${titulosFull.length} de sanblasfull...\n`);

const choques = [];
for (const p of titulosPana) {
  const pp = normalizar(p.titulo);
  for (const f of titulosFull) {
    const s = jaccard(pp, normalizar(f.titulo));
    if (s > LIMITE) {
      choques.push({ s, p, f });
    }
  }
}

choques.sort((a, b) => b.s - a.s);

if (choques.length) {
  console.error(`✗ ${choques.length} par(es) de títulos en inglés compiten entre pana y sanblasfull:\n`);
  for (const c of choques) {
    console.error(`    ${Math.round(c.s * 100)}%  pana:${c.p.que}  vs  full:${c.f.que}`);
    console.error(`        pana: ${c.p.titulo}`);
    console.error(`        full: ${c.f.titulo}\n`);
  }
  console.error('  Con el reparto decidido (pana = guía/autoridad, full = pasadía comercial),');
  console.error('  cada par de arriba es candidato a: retitular el de pana hacia intención de');
  console.error('  investigación/comparación, o si de verdad es la misma intención, enlazar en');
  console.error('  vez de competir.\n');
  process.exitCode = 1;
} else {
  console.log('✓ Ningún título en inglés de pana compite con uno de sanblasfull hoy.');
}
