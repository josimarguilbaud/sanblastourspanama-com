/**
 * Rompe el build si el hreflang miente.
 *
 * Nace de un fallo real, medido sobre `dist` el 02/09/2026, antes de arreglarlo:
 * 26 etiquetas `hreflang` y 12 `canonical` apuntaban a URLs que el sitio NUNCA
 * construyó, y 43 de las 381 páginas anunciaban menos idiomas de los que
 * existían. Todas las legales: su slug se traduce (`/legal/terms` ↔
 * `/es/legal/terminos` ↔ `/de/legal/agb`) y el `<head>` lo construía pegando el
 * prefijo de idioma a la ruta inglesa.
 *
 * Nada avisaba. El build salía verde, las páginas se veían perfectas y el fallo
 * solo era visible leyendo el HTML generado — que es justo lo que nadie lee.
 * Por eso esta comprobación corre en `postbuild`, sobre `dist`: es el único
 * momento en que existen las URLs de verdad.
 *
 * Comprueba tres cosas, y las tres rompen el build:
 *
 *   1. Toda URL anunciada en un `hreflang` corresponde a un fichero construido.
 *      Una etiqueta que apunta a una página inexistente es peor que no ponerla:
 *      manda a Google a un 404 y le dice que ahí vive la versión de ese idioma.
 *   2. El emparejamiento es RECÍPROCO. Google exige que si A dice «mi versión
 *      alemana es B», B diga «mi versión inglesa es A». Sin reciprocidad
 *      ignora el grupo entero, así que un hreflang unilateral es trabajo
 *      tirado.
 *   3. Ninguna página anuncia dos veces el mismo idioma.
 *
 * También comprueba que cada `canonical` corresponde a un fichero construido.
 *
 * ⚠️ ÚNICA EXCEPCIÓN: `404.html`. Su `canonical` apunta a `/404`, que no es una
 * URL publicada — nginx sirve ese fichero como cuerpo de un error, no como
 * página. Su hreflang sí se eliminó (ver `errorPage` en `components/Seo.astro`);
 * el canonical se dejó a propósito para no tocar más de lo pedido, y está
 * anotado como pendiente.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const DIST = join(AQUI, '..', 'dist');
const SITE = 'https://sanblastourspanama.com';
/** El canonical de la página de error no apunta a una URL publicada. Ver arriba. */
const SIN_CANONICAL = new Set(['/404.html']);

if (!existsSync(DIST)) {
  console.error('verificar-hreflang: no existe dist/. Corre `npm run build`.');
  process.exit(1);
}

/** Todos los .html bajo `dir`. */
function htmls(dir) {
  const salida = [];
  const pila = [dir];
  while (pila.length) {
    const d = pila.pop();
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      if (statSync(p).isDirectory()) pila.push(p);
      else if (e.endsWith('.html')) salida.push(p);
    }
  }
  return salida;
}

/** La URL pública de un fichero construido, normalizada sin barra final. */
function urlDe(fichero) {
  const rel = relative(DIST, fichero).split('\\').join('/');
  const ruta = '/' + rel.replace(/index\.html$/, '').replace(/\/$/, '');
  return SITE + (ruta === '/' ? '' : ruta);
}

/** ¿Esa URL corresponde a algo que el build escribió? */
function urlConstruida(url, construidas) {
  return construidas.has(url.replace(/\/$/, ''));
}

const paginas = htmls(DIST);
const construidas = new Set(paginas.map(urlDe));

// Primera pasada: qué anuncia cada página.
const anuncios = new Map(); // url -> Map(idioma -> url anunciada)
const fallos = [];

for (const fichero of paginas) {
  const html = readFileSync(fichero, 'utf8');
  const propia = urlDe(fichero);
  const rel = '/' + relative(DIST, fichero).split('\\').join('/');
  const tags = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];

  const porIdioma = new Map();
  for (const [, idioma, href] of tags) {
    if (idioma === 'x-default') continue;
    if (porIdioma.has(idioma)) {
      fallos.push(`${rel}: anuncia el idioma "${idioma}" dos veces`);
    }
    porIdioma.set(idioma, href.replace(/\/$/, ''));
    if (!urlConstruida(href, construidas)) {
      fallos.push(`${rel}: hreflang="${idioma}" apunta a ${href}, que NO se construyó`);
    }
  }
  anuncios.set(propia, porIdioma);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical && !SIN_CANONICAL.has(rel) && !urlConstruida(canonical, construidas)) {
    fallos.push(`${rel}: canonical apunta a ${canonical}, que NO se construyó`);
  }
}

// Segunda pasada: reciprocidad. Si A dice que su versión "de" es B, B tiene que
// nombrar a A en algún idioma. Google descarta los grupos que no se devuelven
// el saludo, así que un hreflang unilateral no sirve de nada.
for (const [propia, porIdioma] of anuncios) {
  for (const [idioma, destino] of porIdioma) {
    if (destino === propia) continue;
    const suyos = anuncios.get(destino);
    if (!suyos) continue; // ya reportado como no construida
    const devuelve = [...suyos.values()].includes(propia);
    if (!devuelve) {
      fallos.push(
        `${propia} anuncia hreflang="${idioma}" → ${destino}, pero esa página no devuelve el enlace`
      );
    }
  }
}

if (fallos.length) {
  console.error(`\nverificar-hreflang: ${fallos.length} problema(s) de hreflang en dist/\n`);
  for (const f of fallos.slice(0, 60)) console.error('  ' + f);
  if (fallos.length > 60) console.error(`  ... y ${fallos.length - 60} más`);
  console.error('\nEl mapa de rutas por idioma vive en src/i18n/rutas-por-idioma.ts.\n');
  process.exit(1);
}

const conAlternates = [...anuncios.values()].filter((m) => m.size > 0).length;
console.log(
  `verificar-hreflang: ${paginas.length} páginas, ${conAlternates} con alternates, ` +
    'todas las URLs anunciadas existen y se emparejan.'
);
