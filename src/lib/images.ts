/**
 * Resuelve una ruta de imagen tipo "/img/foto.webp" (la misma que ya usa el
 * frontmatter de las 5 colecciones) al objeto optimizado que astro:assets
 * necesita para <Image>. Las fotos viven en src/assets/img/ — Vite solo
 * puede optimizar lo que importa, así que un glob eager las importa TODAS
 * una vez al arrancar el build, y esto solo hace de diccionario ruta -> asset.
 */
const IMAGENES = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/*.{webp,jpg,jpeg,png}',
  { eager: true },
);

export function resolverImagen(ruta: string): ImageMetadata {
  const clave = `/src/assets${ruta}`;
  const modulo = IMAGENES[clave];
  if (!modulo) {
    throw new Error(`resolverImagen: no existe src/assets${ruta} — ¿se movió o se borró la foto?`);
  }
  return modulo.default;
}
