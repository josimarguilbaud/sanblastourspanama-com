/** Given a full (unfiltered) collection and a slug, return which locales actually have that entry — used to build correct hreflang tags (no false claims about untranslated pages). */
export function localesForSlug(entries: { id: string }[], slug: string): string[] {
  return entries.filter((e) => e.id.endsWith(`/${slug}`)).map((e) => e.id.split('/')[0]);
}
