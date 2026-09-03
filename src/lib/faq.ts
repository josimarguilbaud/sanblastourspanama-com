/**
 * El `FAQPage` de una página, sacado del propio Markdown.
 *
 * Antes de esto había `FAQPage` en **9 de 381 páginas**, y estaba escrito a mano
 * dentro de cada `.astro`: las cinco `/faq`, la portada solo en EN y ES, y
 * `guna-yala` solo en EN y ES. Ninguna plantilla de colección —isla, tour, guía,
 * paquete— lo emitía, que son 341 páginas.
 *
 * La decisión de diseño importante es de DÓNDE sale el contenido. Se podría
 * haber añadido un campo `faq` al esquema de cada colección, pero entonces las
 * preguntas vivirían en el frontmatter y no se verían en la página. Google pide
 * explícitamente que el contenido marcado como `FAQPage` esté VISIBLE para el
 * usuario; marcar preguntas que la página no enseña es justo lo que penaliza.
 *
 * Así que las preguntas se escriben en el cuerpo del Markdown, bajo un
 * encabezado de nivel 2, y esta función las lee de ahí. Con eso salen las dos
 * cosas de una: el dato estructurado y contenido real en la página, que es lo
 * que además necesitan las 219 páginas que estaban por debajo de 300 palabras.
 *
 * Formato esperado, en cualquiera de los cinco idiomas:
 *
 *     ## Preguntas frecuentes        <- el encabezado de sección (h2)
 *
 *     ### ¿Se puede dormir aquí?     <- la pregunta (h3)
 *     La respuesta, uno o más        <- todo lo que va hasta el siguiente h3
 *     párrafos.
 */

/** Los encabezados que abren la sección, uno por idioma del sitio.
 *
 *  Se casa por palabra suelta y sin acentos para que valga «FAQ», «Preguntas
 *  frecuentes», «Häufige Fragen», «Questions fréquentes» y «Perguntas
 *  frequentes» sin tener que mantener la frase exacta de cada idioma. */
const ABRE_FAQ = /\b(faq|preguntas|fragen|questions|perguntas|domande)\b/i;

export interface ParPregunta {
  q: string;
  a: string;
}

/** Quita el énfasis, los enlaces y el código de una línea de Markdown.
 *
 *  El JSON-LD viaja como texto plano: dejar `**negrita**` o `[texto](url)` ahí
 *  significa enseñarle los asteriscos y los corchetes a quien lea el fragmento
 *  en un buscador. */
function aTextoPlano(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')          // imágenes, fuera
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')       // enlaces: se queda el texto
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')                  // viñetas
    .replace(/\s+/g, ' ')
    .trim();
}

/** Las preguntas y respuestas del cuerpo, o lista vacía si no hay sección. */
export function faqDelMarkdown(body: string): ParPregunta[] {
  const lineas = (body ?? '').split('\n');

  // Dónde empieza la sección: el primer h2 que suene a preguntas frecuentes.
  let i = lineas.findIndex((l) => /^##\s+/.test(l) && ABRE_FAQ.test(l));
  if (i === -1) return [];

  const pares: ParPregunta[] = [];
  let q: string | null = null;
  let a: string[] = [];

  const cerrar = () => {
    const texto = aTextoPlano(a.join('\n'));
    if (q && texto) pares.push({ q, a: texto });
    q = null;
    a = [];
  };

  for (i += 1; i < lineas.length; i += 1) {
    const l = lineas[i];
    // Un h1 o h2 cierra la sección: lo que venga después ya no es el FAQ.
    if (/^#{1,2}\s+/.test(l)) break;
    if (/^###\s+/.test(l)) {
      cerrar();
      q = aTextoPlano(l.replace(/^###\s+/, ''));
      continue;
    }
    if (q) a.push(l);
  }
  cerrar();
  return pares;
}

/** El JSON-LD listo para incrustar, o `null` si la página no tiene preguntas.
 *
 *  Devuelve `null` y no un `FAQPage` vacío a propósito: un `FAQPage` sin
 *  `mainEntity` es un dato estructurado inválido, y vale menos que no ponerlo. */
export function faqJsonLd(body: string): object | null {
  const pares = faqDelMarkdown(body);
  if (!pares.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pares.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  };
}
