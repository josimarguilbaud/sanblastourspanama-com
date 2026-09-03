/**
 * Guardián del contenido de las colecciones.
 *
 * Nace de lo que se midió el 02/09/2026, antes de reescribir nada:
 *
 *   - **219 de 381 páginas por debajo de 300 palabras**, concentradas en el
 *     catálogo: islas 52/60, paquetes 49/55, guías 46/70, tours 36/50.
 *   - **El catálogo se tradujo resumido.** Medido como porcentaje que conserva
 *     cada idioma respecto a la media de en+es: las guías salían al 44-48 % y
 *     los paquetes al 29-33 %. O sea que el alemán no «comprime»: eran
 *     traducciones a las que se les habían quitado frases enteras dentro de
 *     cada párrafo.
 *   - **`FAQPage` en 9 de 381 páginas.** Ninguna plantilla de colección lo
 *     emitía.
 *
 * Las tres cosas se arreglaron a mano. Este fichero existe para que no vuelvan,
 * porque las tres se reintroducen igual: añadiendo una entrada nueva y
 * traduciéndola «rápido».
 *
 * Corre en el `prebuild` y mira el ORIGEN (los .md), no `dist`: aquí no hacen
 * falta URLs construidas, y fallar antes de compilar da el error donde está el
 * problema. El guardián de hreflang sí necesita `dist` y por eso va en
 * `postbuild`.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const CONTENIDO = join(AQUI, '..', 'src', 'content');
const IDIOMAS = ['en', 'es', 'de', 'fr', 'pt-br'];

/** Las colecciones vigiladas.
 *
 *  ⚠️ `posts` estuvo FUERA de esta lista, y la razón escrita aquí era falsa.
 *  Decía que «el blog nunca tuvo el problema, está al 103 % en alemán». El
 *  103 % era real y aun así no significaba nada: es la MEDIA de los 18 posts,
 *  y una media esconde justo lo que este guardián busca. Un post traducido al
 *  55 % y otro al 150 % promedian 103.
 *
 *  Medido post a post el 03/09/2026, dentro del blog había **seis ficheros por
 *  debajo del 70 %**, el mismo umbral que rompe el build en cualquier otra
 *  colección:
 *
 *      55 %  pt-br/is-san-blas-safe          61 %  de/is-san-blas-safe
 *      60 %  fr/is-san-blas-safe             62 %  pt-br/day-tour-vs-overnight
 *      63 %  pt-br/5-things-nobody-tells     68 %  fr/day-tour-vs-overnight
 *
 *  Y era el mismo defecto exacto que el del catálogo: no párrafos ausentes,
 *  sino la segunda mitad de cada frase cortada — el aviso de que la evacuación
 *  médica está cubierta, el «no un plato sustituto», el «trata los nombres de
 *  islas como indicación, no garantía». Lo accionable es siempre lo que va
 *  detrás de la coma, así que un resumen se lleva justo el valor del texto.
 *
 *  La lección no es sobre el blog: es que **excluir una colección basándose en
 *  su media es como no mirarla**. Si mañana se añade otra colección, entra
 *  aquí; para dejarla fuera hace falta medirla fichero a fichero. */
const COLECCIONES = ['islands', 'tours', 'guides', 'packages', 'posts'];

/** Cuáles de esas colecciones tienen que traer preguntas frecuentes.
 *
 *  No es una excepción de conveniencia: el requisito de 4 preguntas existe
 *  porque de ellas sale el `FAQPage`, y quien lo emite es la plantilla de cada
 *  colección leyendo el Markdown con `src/lib/faq.ts`. `src/pages/blog/[slug]`
 *  no importa ese módulo y no emite `FAQPage` —comprobado en `dist`, cero
 *  posts con el dato—, así que exigírselas al blog obligaría a inventar 72
 *  preguntas para un dato estructurado que ninguna página produce.
 *
 *  Si algún día la plantilla del blog emite `FAQPage`, `posts` entra aquí. */
const CON_FAQ = new Set(['islands', 'tours', 'guides', 'packages']);

/** Mínimo de caracteres del cuerpo. El encargo era «que superen los 1600»; el
 *  tope se queda ahí y no en la media real (~3000) para que una entrada nueva
 *  legítimamente más corta no rompa el build sin motivo. */
const MIN_CUERPO = 1600;

/** Qué parte del cuerpo más largo tiene que conservar cada idioma. Esto es lo
 *  que caza el fallo original: una traducción resumida pasa cualquier control de
 *  «existe el fichero» y ninguno de longitud. Al 70 % cabe la diferencia real
 *  entre idiomas (el alemán compone y sale algo más corto en palabras, no en
 *  caracteres) sin dejar pasar un resumen al 30 %. */
const MIN_PARIDAD = 0.7;

/** Tope de parecido entre dos entradas de la misma colección y el mismo idioma.
 *  Es la canibalización interna, que ya hundió a una web hermana. */
const TOPE_PARECIDO = 0.6;

/** El h2 que abre la sección de preguntas, en los cinco idiomas. Tiene que
 *  seguir casando con `ABRE_FAQ` de `src/lib/faq.ts`: si aquí y allí divergen,
 *  este guardián da verde y la página no emite `FAQPage`. */
const ABRE_FAQ = /\b(faq|preguntas|fragen|questions|perguntas|domande)\b/i;

const cuerpoDe = (ruta) => {
    const t = readFileSync(ruta, 'utf8');
    const m = t.match(/^---[\s\S]*?\n---\n?([\s\S]*)$/);
    return (m ? m[1] : t).trim();
};

const preguntasDe = (cuerpo) => {
    const lineas = cuerpo.split('\n');
    const i = lineas.findIndex((l) => /^##\s+/.test(l) && ABRE_FAQ.test(l));
    if (i === -1) return 0;
    let n = 0;
    for (let j = i + 1; j < lineas.length; j += 1) {
        if (/^#{1,2}\s+/.test(lineas[j])) break;
        if (/^###\s+/.test(lineas[j])) n += 1;
    }
    return n;
};

const palabrasDe = (s) =>
    new Set(
        s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter((w) => w.length > 3),
    );

const jaccard = (A, B) => {
    let comunes = 0;
    for (const w of A) if (B.has(w)) comunes += 1;
    return comunes / (A.size + B.size - comunes);
};

const fallos = [];

for (const col of COLECCIONES) {
    const base = join(CONTENIDO, col);
    if (!existsSync(base)) continue;

    const slugs = readdirSync(join(base, 'en')).filter((f) => f.endsWith('.md'));
    const cuerpos = {}; // slug -> idioma -> cuerpo

    for (const slug of slugs) {
        cuerpos[slug] = {};
        for (const idi of IDIOMAS) {
            const f = join(base, idi, slug);
            if (!existsSync(f)) {
                fallos.push(`[${col}] falta ${idi}/${slug}`);
                continue;
            }
            cuerpos[slug][idi] = cuerpoDe(f);
        }
    }

    for (const slug of slugs) {
        const largos = Object.values(cuerpos[slug]).map((c) => c.length);
        const mayor = Math.max(...largos, 0);

        for (const [idi, cuerpo] of Object.entries(cuerpos[slug])) {
            if (cuerpo.length < MIN_CUERPO) {
                fallos.push(
                    `[${col} ${idi}] ${slug}: ${cuerpo.length} caracteres, ` +
                    `por debajo de ${MIN_CUERPO}`,
                );
            }
            // La traducción resumida: existe, se lee bien, y le faltan frases.
            if (mayor && cuerpo.length / mayor < MIN_PARIDAD) {
                fallos.push(
                    `[${col} ${idi}] ${slug}: conserva el ` +
                    `${Math.round((100 * cuerpo.length) / mayor)} % del idioma más largo ` +
                    `(${cuerpo.length} de ${mayor}) — parece un resumen, no una traducción`,
                );
            }
            if (CON_FAQ.has(col) && preguntasDe(cuerpo) < 4) {
                fallos.push(
                    `[${col} ${idi}] ${slug}: ${preguntasDe(cuerpo)} preguntas frecuentes; ` +
                    `hacen falta 4 o el FAQPage no sale`,
                );
            }
        }
    }

    // Canibalización dentro de la colección, idioma a idioma.
    for (const idi of IDIOMAS) {
        const lista = slugs
            .filter((s) => cuerpos[s][idi])
            .map((s) => ({ slug: s, palabras: palabrasDe(cuerpos[s][idi]) }));
        for (let a = 0; a < lista.length; a += 1) {
            for (let b = a + 1; b < lista.length; b += 1) {
                const j = jaccard(lista[a].palabras, lista[b].palabras);
                if (j > TOPE_PARECIDO) {
                    fallos.push(
                        `[${col} ${idi}] ${lista[a].slug} y ${lista[b].slug} comparten el ` +
                        `${Math.round(j * 100)} % de su texto`,
                    );
                }
            }
        }
    }
}

if (fallos.length) {
    console.error(`\n✗ ${fallos.length} problema(s) de contenido:\n`);
    for (const f of fallos.slice(0, 25)) console.error(`    ${f}`);
    if (fallos.length > 25) console.error(`    ... y ${fallos.length - 25} más.`);
    console.error('');
    console.error('  Cada entrada necesita, en los CINCO idiomas: más de');
    console.error(`  ${MIN_CUERPO} caracteres de cuerpo y al menos el ${Math.round(MIN_PARIDAD * 100)} % del idioma más largo.`);
    console.error(`  Las de catálogo (${[...CON_FAQ].join(', ')}) necesitan además 4 preguntas`);
    console.error('  frecuentes bajo un h2 que diga FAQ / Preguntas / Fragen / Questions /');
    console.error('  Perguntas — de ahí sale el `FAQPage`.');
    console.error('');
    console.error('  Lo del porcentaje es el fallo que costó caro DOS veces: traducir');
    console.error('  resumido pasa cualquier control de «existe el fichero». Las guías');
    console.error('  conservaban el 44 % y los paquetes el 29 %, y nadie lo vio. El blog');
    console.error('  se libró de este guardián por su MEDIA (103 %) mientras seis de sus');
    console.error('  ficheros estaban entre el 55 % y el 68 %.');
    console.error('');
    process.exit(1);
}

console.log(
    `✓ Contenido: ${COLECCIONES.length} colecciones completas en ${IDIOMAS.length} idiomas ` +
    `(mín. ${MIN_CUERPO} car., paridad ${Math.round(MIN_PARIDAD * 100)} %, sin duplicados; ` +
    `4+ preguntas en ${CON_FAQ.size} de ellas).`,
);
