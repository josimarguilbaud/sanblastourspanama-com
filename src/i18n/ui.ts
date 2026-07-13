// Small hand-maintained UI string dictionary — not machine translated, since
// these are short, high-visibility strings (nav, buttons) that are worth
// getting right by hand rather than running through DeepL. Page BODY content
// (islands/guides/posts) is translated per-locale as separate Markdown files
// in src/content/*, following the human-review-gate approach from the plan:
// a locale simply has no page until a real translation exists for it.
//
// Booking model: this site sends 100% of conversion traffic to WhatsApp
// (see components/BookingCta.astro) — there is no online widget/payment
// here, so all "book"/"reserve" copy is phrased as "message us" rather than
// "book online".
export const locales = ['en', 'es', 'de', 'fr', 'pt-br'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  'pt-br': 'Português',
};

export const ui: Record<Locale, Record<string, string>> = {
  en: {
    'nav.islands': 'Islands',
    'nav.tours': 'Tours',
    'nav.guides': 'Travel Guides',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.menu': 'Menu',
    'cta.book': 'Book Now',
    'cta.checkAvailability': 'Ask About Availability',
    'topbar.slogan': 'Your next adventure awaits — message us on WhatsApp to plan San Blas.',
    'footer.tagline': 'Your complete guide to the 30+ islands of Guna Yala, Panama — message us on WhatsApp to plan your trip.',
    'footer.explore': 'Explore',
    'footer.languages': 'Languages',
    'footer.allIslands': 'All Islands',
    'footer.toursAndPrices': 'Tours & Packages',
  },
  es: {
    'nav.islands': 'Islas',
    'nav.tours': 'Tours',
    'nav.guides': 'Guías de Viaje',
    'nav.blog': 'Blog',
    'nav.faq': 'Preguntas Frecuentes',
    'nav.menu': 'Menú',
    'cta.book': 'Reservar',
    'cta.checkAvailability': 'Consultar Disponibilidad',
    'topbar.slogan': 'Tu próxima aventura te espera — escríbenos por WhatsApp para coordinar San Blas.',
    'footer.tagline': 'Tu guía completa de las más de 30 islas de Guna Yala, Panamá — escríbenos por WhatsApp para coordinar tu viaje.',
    'footer.explore': 'Explorar',
    'footer.languages': 'Idiomas',
    'footer.allIslands': 'Todas las Islas',
    'footer.toursAndPrices': 'Tours y Paquetes',
  },
  de: {
    'nav.islands': 'Inseln',
    'nav.tours': 'Touren',
    'nav.guides': 'Reiseführer',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.menu': 'Menü',
    'cta.book': 'Buchen',
    'cta.checkAvailability': 'Verfügbarkeit Erfragen',
    'topbar.slogan': 'Ihr nächstes Abenteuer wartet — schreiben Sie uns auf WhatsApp, um San Blas zu planen.',
    'footer.tagline': 'Ihr vollständiger Guide zu den mehr als 30 Inseln von Guna Yala, Panama — schreiben Sie uns auf WhatsApp, um Ihre Reise zu planen.',
    'footer.explore': 'Entdecken',
    'footer.languages': 'Sprachen',
    'footer.allIslands': 'Alle Inseln',
    'footer.toursAndPrices': 'Touren & Pakete',
  },
  fr: {
    'nav.islands': 'Îles',
    'nav.tours': 'Excursions',
    'nav.guides': 'Guides de Voyage',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.menu': 'Menu',
    'cta.book': 'Réserver',
    'cta.checkAvailability': 'Demander la Disponibilité',
    'topbar.slogan': 'Votre prochaine aventure vous attend — écrivez-nous sur WhatsApp pour organiser San Blas.',
    'footer.tagline': "Votre guide complet des plus de 30 îles de Guna Yala, au Panama — écrivez-nous sur WhatsApp pour organiser votre voyage.",
    'footer.explore': 'Explorer',
    'footer.languages': 'Langues',
    'footer.allIslands': 'Toutes les Îles',
    'footer.toursAndPrices': 'Excursions et Forfaits',
  },
  'pt-br': {
    'nav.islands': 'Ilhas',
    'nav.tours': 'Passeios',
    'nav.guides': 'Guias de Viagem',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.menu': 'Menu',
    'cta.book': 'Reservar',
    'cta.checkAvailability': 'Perguntar Disponibilidade',
    'topbar.slogan': 'Sua próxima aventura está esperando — fale conosco no WhatsApp para planejar San Blas.',
    'footer.tagline': 'Seu guia completo para as mais de 30 ilhas de Guna Yala, no Panamá — fale conosco no WhatsApp para planejar sua viagem.',
    'footer.explore': 'Explorar',
    'footer.languages': 'Idiomas',
    'footer.allIslands': 'Todas as Ilhas',
    'footer.toursAndPrices': 'Passeios e Pacotes',
  },
};

export function useTranslations(locale: string | undefined) {
  const lang = (locales as readonly string[]).includes(locale ?? '') ? (locale as Locale) : defaultLocale;
  return (key: string) => ui[lang][key] ?? ui[defaultLocale][key] ?? key;
}

/** Build a same-page URL for a different locale, given the current path minus its locale prefix. */
export function localizedPath(locale: Locale, pathWithoutLocale: string) {
  const clean = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
  return locale === defaultLocale ? clean || '/' : `/${locale}${clean}`;
}
