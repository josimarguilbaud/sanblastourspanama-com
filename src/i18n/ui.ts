// Small hand-maintained UI string dictionary — not machine translated, since
// these are short, high-visibility strings (nav, buttons) that are worth
// getting right by hand rather than running through DeepL. Page BODY content
// (islands/guides/posts) is translated per-locale as separate Markdown files
// in src/content/*, following the human-review-gate approach from the plan:
// a locale simply has no page until a real translation exists for it.
//
// Booking model: since 03/09/2026 this site also books and pays online for
// the 4 day tours and 5 overnight stays via `<WidgetReserva>` (see
// src/lib/reservas.ts) — WhatsApp (components/BookingCta.astro) is kept as
// the second path, and remains the ONLY path for the 11 packages and the
// Super VIP private tour, which are quoted to measure on purpose.
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
    'nav.reviews': 'Reviews',
    'nav.menu': 'Menu',
    'cta.book': 'Book Now',
    'cta.checkAvailability': 'Ask About Availability',
    'widget.bookOnline': 'Book This Tour Online',
    'widget.bookOnlineNota': 'Live pricing and instant booking for the tour below.',
    'topbar.slogan': 'Your next adventure awaits — message us on WhatsApp to plan San Blas.',
    'temporada.base': "Visiting between November and April? It's high season: holiday dates fill first.",
    'temporada.proxima': 'Planning a trip for {nombre} ({fechas})? Those dates fill first, so book ahead.',
    'temporada.cta': 'See tours',
    'footer.tagline': 'Your guide to the islands of Guna Yala, Panama — message us on WhatsApp to plan your trip.',
    'footer.explore': 'Explore',
    'footer.languages': 'Languages',
    'footer.allIslands': 'All Islands',
    'footer.toursAndPrices': 'Tours & Packages',
    'footer.prices': 'Prices',
    'footer.gift': 'Gift a San Blas trip',
    'footer.dev': 'Powered by Elemento Web technology',
  },
  es: {
    'nav.islands': 'Islas',
    'nav.tours': 'Tours',
    'nav.guides': 'Guías de Viaje',
    'nav.blog': 'Blog',
    'nav.faq': 'Preguntas Frecuentes',
    'nav.reviews': 'Opiniones',
    'nav.menu': 'Menú',
    'cta.book': 'Reservar',
    'cta.checkAvailability': 'Consultar Disponibilidad',
    'widget.bookOnline': 'Reserva Este Tour en Línea',
    'widget.bookOnlineNota': 'Precio real y reserva al instante para el tour de abajo.',
    'topbar.slogan': 'Tu próxima aventura te espera — escríbenos por WhatsApp para coordinar San Blas.',
    'temporada.base': '¿Viajas entre noviembre y abril? Es temporada alta: los feriados se llenan primero.',
    'temporada.proxima': '¿Viajas en {nombre} ({fechas})? Esas fechas se llenan primero: reserva con tiempo.',
    'temporada.cta': 'Ver tours',
    'footer.tagline': 'Tu guía de las islas de Guna Yala, Panamá — escríbenos por WhatsApp para coordinar tu viaje.',
    'footer.explore': 'Explorar',
    'footer.languages': 'Idiomas',
    'footer.allIslands': 'Todas las Islas',
    'footer.toursAndPrices': 'Tours y Paquetes',
    'footer.prices': 'Precios',
    'footer.gift': 'Regala un viaje a San Blas',
    'footer.dev': 'Desarrollada con tecnología de Elemento Web',
  },
  de: {
    'nav.islands': 'Inseln',
    'nav.tours': 'Touren',
    'nav.guides': 'Reiseführer',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.reviews': 'Bewertungen',
    'nav.menu': 'Menü',
    'cta.book': 'Buchen',
    'cta.checkAvailability': 'Verfügbarkeit Erfragen',
    'widget.bookOnline': 'Diese Tour Online Buchen',
    'widget.bookOnlineNota': 'Echte Preise und sofortige Buchung für die Tour unten.',
    'topbar.slogan': 'Ihr nächstes Abenteuer wartet — schreiben Sie uns auf WhatsApp, um San Blas zu planen.',
    'temporada.base': 'Reisen Sie zwischen November und April? Hochsaison: Feiertage sind zuerst ausgebucht.',
    'temporada.proxima': '{nombre} ({fechas}): Diese Tage sind zuerst ausgebucht, buchen Sie früh.',
    'temporada.cta': 'Touren ansehen',
    'footer.tagline': 'Ihr Guide zu den Inseln von Guna Yala, Panama — schreiben Sie uns auf WhatsApp, um Ihre Reise zu planen.',
    'footer.explore': 'Entdecken',
    'footer.languages': 'Sprachen',
    'footer.allIslands': 'Alle Inseln',
    'footer.toursAndPrices': 'Touren & Pakete',
    'footer.prices': 'Preise',
    'footer.gift': 'Eine Reise nach San Blas schenken',
    'footer.dev': 'Entwickelt mit Technologie von Elemento Web',
  },
  fr: {
    'nav.islands': 'Îles',
    'nav.tours': 'Excursions',
    'nav.guides': 'Guides de Voyage',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.reviews': 'Avis',
    'nav.menu': 'Menu',
    'cta.book': 'Réserver',
    'cta.checkAvailability': 'Demander la Disponibilité',
    'widget.bookOnline': 'Réserver Cette Excursion en Ligne',
    'widget.bookOnlineNota': "Prix réel et réservation instantanée pour l'excursion ci-dessous.",
    'topbar.slogan': 'Votre prochaine aventure vous attend — écrivez-nous sur WhatsApp pour organiser San Blas.',
    'temporada.base': 'Vous venez entre novembre et avril ? Haute saison : les jours fériés partent en premier.',
    'temporada.proxima': '{nombre} ({fechas}) : ces dates partent en premier, réservez tôt.',
    'temporada.cta': 'Voir les tours',
    'footer.tagline': "Votre guide des îles de Guna Yala, au Panama — écrivez-nous sur WhatsApp pour organiser votre voyage.",
    'footer.explore': 'Explorer',
    'footer.languages': 'Langues',
    'footer.allIslands': 'Toutes les Îles',
    'footer.toursAndPrices': 'Excursions et Forfaits',
    'footer.prices': 'Tarifs',
    'footer.gift': 'Offrir un voyage à San Blas',
    'footer.dev': 'Développé avec la technologie Elemento Web',
  },
  'pt-br': {
    'nav.islands': 'Ilhas',
    'nav.tours': 'Passeios',
    'nav.guides': 'Guias de Viagem',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.reviews': 'Avaliações',
    'nav.menu': 'Menu',
    'cta.book': 'Reservar',
    'cta.checkAvailability': 'Perguntar Disponibilidade',
    'widget.bookOnline': 'Reserve Este Passeio Online',
    'widget.bookOnlineNota': 'Preço real e reserva instantânea para o passeio abaixo.',
    'topbar.slogan': 'Sua próxima aventura está esperando — fale conosco no WhatsApp para planejar San Blas.',
    'temporada.base': 'Vai entre novembro e abril? É alta temporada: os feriados lotam primeiro.',
    'temporada.proxima': '{nombre} ({fechas}): essas datas lotam primeiro, reserve com antecedência.',
    'temporada.cta': 'Ver passeios',
    'footer.tagline': 'Seu guia para as ilhas de Guna Yala, no Panamá — fale conosco no WhatsApp para planejar sua viagem.',
    'footer.explore': 'Explorar',
    'footer.languages': 'Idiomas',
    'footer.allIslands': 'Todas as Ilhas',
    'footer.toursAndPrices': 'Passeios e Pacotes',
    'footer.prices': 'Preços',
    'footer.gift': 'Presenteie uma viagem a San Blas',
    'footer.dev': 'Desenvolvido com tecnologia Elemento Web',
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
