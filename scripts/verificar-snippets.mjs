/**
 * Rompe el build si un título o una descripción no caben en Google.
 *
 * Nace de una medición, no de una manía. Search Console, 02/09/2026, últimos
 * tres meses: 14.900 impresiones y 211 clics, CTR del 1,4 %. Y lo grave no era
 * el volumen sino dónde se perdía:
 *
 *   /es/guides/best-time-to-visit   posición 6,0   901 impresiones   0,7 % CTR
 *   «private touren in guna yala region»  posición 8,4  185 impr.  0 clics
 *   /islands/chichime               posición 10,1  565 impresiones  0,9 % CTR
 *
 * Una página en posición 6 con 901 impresiones debería traer decenas de clics.
 * Traía seis. Su título medía 75 caracteres; la única página del sitio que
 * convertía al 20 % (`fun-facts-about-san-blas`) medía 50. En total había 241
 * títulos por encima de 60 y 188 descripciones por encima de 155: Google los
 * cortaba a mitad de frase y el resultado dejaba de ser clicable.
 *
 * Los límites son de caracteres y Google mide en píxeles, así que esto es una
 * aproximación deliberadamente conservadora: lo que pasa aquí, cabe.
 *
 * Mira las dos fuentes, porque el sitio tiene dos: el frontmatter de las
 * colecciones (`seoTitle` / `seoDescription`) y los atributos `title=` /
 * `description=` escritos a mano en las páginas índice. Cuando se arregló solo
 * la primera quedaban 36 páginas largas, todas portadas y secciones.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const SRC = join(AQUI, '..', 'src');
const LIM_TITULO = 60;
const LIM_DESC = 155;

/** Todos los ficheros bajo `dir` con alguna de esas extensiones. */
function ficheros(dir, exts) {
  const salida = [];
  const pila = [dir];
  while (pila.length) {
    const d = pila.pop();
    let entradas;
    try {
      entradas = readdirSync(d);
    } catch {
      continue;
    }
    for (const e of entradas) {
      const p = join(d, e);
      if (statSync(p).isDirectory()) pila.push(p);
      else if (exts.some((x) => e.endsWith(x))) salida.push(p);
    }
  }
  return salida;
}

const fallos = [];

function revisa(ruta, clase, valor, limite) {
  if (typeof valor === 'string' && valor.length > limite) {
    fallos.push(
      `${relative(SRC, ruta)} → ${clase}: ${valor.length} caracteres (máximo ${limite})\n` +
      `      se ve:     «${valor.slice(0, limite)}»\n` +
      `      se pierde: «${valor.slice(limite)}»`,
    );
  }
}

// 1. El frontmatter de las colecciones.
for (const f of ficheros(join(SRC, 'content'), ['.md', '.mdx'])) {
  const bloque = readFileSync(f, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!bloque) continue;
  const t = bloque[1].match(/^seoTitle:\s*"([\s\S]*?)"\s*$/m);
  const d = bloque[1].match(/^seoDescription:\s*"([\s\S]*?)"\s*$/m);
  if (t) revisa(f, 'seoTitle', t[1], LIM_TITULO);
  if (d) revisa(f, 'seoDescription', d[1], LIM_DESC);
}

// 2. Los atributos escritos a mano en las páginas índice.
for (const f of ficheros(join(SRC, 'pages'), ['.astro'])) {
  const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\btitle="([^"]{20,})"/g)) revisa(f, 'title=', m[1], LIM_TITULO);
  for (const m of s.matchAll(/\bdescription="([^"]{20,})"/g)) revisa(f, 'description=', m[1], LIM_DESC);
}

if (fallos.length) {
  console.error(`\n✗ ${fallos.length} texto(s) se cortarían en los resultados de Google:\n`);
  for (const l of fallos.slice(0, 25)) console.error(`    ${l}\n`);
  if (fallos.length > 25) console.error(`    ... y ${fallos.length - 25} más.\n`);
  console.error('  No los trunques: suelta la coletilla que va tras la raya, o la última');
  console.error('  frase entera de la descripción. La cabeza del título es la que Google');
  console.error('  empareja con la consulta y es lo único que no se puede perder.\n');
  process.exit(1);
}

console.log(`✓ Títulos y descripciones caben en Google (máx. ${LIM_TITULO}/${LIM_DESC}).`);
