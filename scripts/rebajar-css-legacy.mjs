/**
 * Reescribe el CSS ya construido para que sus media queries usen la sintaxis
 * clasica (`min-width`) en vez de la sintaxis de rango moderna de Tailwind v4
 * (`@media (width>=48rem)`).
 *
 * Por que hace falta: un navegador que no entiende la sintaxis de rango no
 * falla en silencio DENTRO de la regla — descarta el bloque `@media` entero,
 * como si nunca hubiera existido. El 28/09/2026 eso dejo el menu de
 * escritorio con `display: none` PERMANENTE (no solo en movil): `md:flex`
 * nunca llegaba a aplicarse, en cualquier ancho de pantalla, en cualquier
 * navegador que no soportara la sintaxis. Comprobado en vivo:
 * `CSS.supports('(width >= 48rem)')` daba `false` y el nav SI estaba en el
 * HTML, solo oculto por esto.
 *
 * Por que no se arregla con `vite.css.lightningcss.targets` en
 * astro.config.mjs (se probo primero, ver historial): el plugin
 * `@tailwindcss/vite` corre su PROPIO paso interno de Lightning CSS para
 * generar y minificar el CSS de Tailwind, separado del pipeline generico de
 * Vite — la configuracion de Astro nunca llega a tocarlo. La unica via que
 * de verdad funciona es reprocesar el CSS YA CONSTRUIDO, aqui, en un paso
 * aparte despues de `astro build`.
 *
 * Los targets salen de `browserslist` en `package.json` — el mismo criterio
 * que se usaria si esto lo hiciera Lightning CSS por su cuenta.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { transform, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

const DIST_ASTRO = join(import.meta.dirname, '..', 'dist', '_astro');
const targets = browserslistToTargets(browserslist());

const ficheros = readdirSync(DIST_ASTRO).filter((f) => f.endsWith('.css'));
if (ficheros.length === 0) {
  console.error('rebajar-css-legacy: no hay CSS en dist/_astro — ¿corrió esto antes que `astro build`?');
  process.exit(1);
}

let totalRebajadas = 0;
for (const fichero of ficheros) {
  const ruta = join(DIST_ASTRO, fichero);
  const original = readFileSync(ruta);
  const antes = (original.toString().match(/\(width\s*>=/g) ?? []).length;
  if (antes === 0) continue;

  const { code } = transform({
    filename: fichero,
    code: original,
    minify: true,
    targets,
  });
  writeFileSync(ruta, code);
  totalRebajadas += antes;
  console.log(`rebajar-css-legacy: ${fichero} — ${antes} media queries reescritas a min-width`);
}

if (totalRebajadas === 0) {
  console.log('rebajar-css-legacy: ningún CSS usaba la sintaxis de rango moderna — nada que rebajar.');
} else {
  console.log(`rebajar-css-legacy: ${totalRebajadas} media queries en total, ya compatibles con navegadores viejos.`);
}
