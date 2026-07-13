export type NavItem = { href: string; label: string };

// Shared between Header (dropdown megamenu) and Footer (quick links) so the
// curated shortcut list only lives in one place. Only en/es have full site
// content today (see i18n/ui.ts comment) — de/fr/pt-br fall back to a
// minimal nav in both components rather than linking to pages that 404.
export const navShortcuts: Record<'en' | 'es', { islands: NavItem[]; tours: NavItem[]; guides: NavItem[] }> = {
  en: {
    islands: [
      { href: '/islands/chichime', label: 'Chichime Island' },
      { href: '/islands/isla-diablo', label: 'Isla Diablo' },
      { href: '/islands/perro-chico', label: 'Perro Chico (Shipwreck)' },
      { href: '/islands/cayos-holandeses', label: 'Dutch Cays' },
      { href: '/islands/piscina-natural', label: 'The Natural Pool' },
      { href: '/islands', label: 'View all islands →' },
    ],
    tours: [
      { href: '/tours/classic-day-tour', label: 'Classic Day Tour' },
      { href: '/tours/vip-day-tour', label: 'VIP Day Tour' },
      { href: '/tours/isla-diablo-day-tour', label: 'Isla Diablo Tour' },
      { href: '/tours/dutch-cays-day-tour', label: 'Dutch Cays Tour' },
      { href: '/tours/overwater-cabin-overnight', label: 'Overnight Stays' },
      { href: '/yachts', label: '★ Private Yacht Charters' },
      { href: '/tours', label: 'View all tours →' },
    ],
    guides: [
      { href: '/guna-yala', label: 'Guna Yala: People & History' },
      { href: '/guides/how-to-get-to-san-blas', label: 'Getting There' },
      { href: '/guides/what-to-pack', label: 'What to Pack' },
      { href: '/guides/best-time-to-visit', label: 'Best Time to Visit' },
      { href: '/guides/top-beaches', label: 'Top Beaches' },
      { href: '/faq', label: 'FAQ →' },
    ],
  },
  es: {
    islands: [
      { href: '/islands/chichime', label: 'Isla Chichime' },
      { href: '/islands/isla-diablo', label: 'Isla Diablo' },
      { href: '/islands/perro-chico', label: 'Perro Chico (Barco Hundido)' },
      { href: '/islands/cayos-holandeses', label: 'Cayos Holandeses' },
      { href: '/islands/piscina-natural', label: 'La Piscina Natural' },
      { href: '/islands', label: 'Ver todas las islas →' },
    ],
    tours: [
      { href: '/tours/classic-day-tour', label: 'Tour Clásico' },
      { href: '/tours/vip-day-tour', label: 'Tour VIP' },
      { href: '/tours/isla-diablo-day-tour', label: 'Tour Isla Diablo' },
      { href: '/tours/dutch-cays-day-tour', label: 'Tour Cayos Holandeses' },
      { href: '/tours/overwater-cabin-overnight', label: 'Estadías Nocturnas' },
      { href: '/yachts', label: '★ Charters Privados de Yate' },
      { href: '/tours', label: 'Ver todos los tours →' },
    ],
    guides: [
      { href: '/guna-yala', label: 'Guna Yala: Pueblo e Historia' },
      { href: '/guides/how-to-get-to-san-blas', label: 'Cómo Llegar' },
      { href: '/guides/what-to-pack', label: 'Qué Llevar' },
      { href: '/guides/best-time-to-visit', label: 'Mejor Época' },
      { href: '/guides/top-beaches', label: 'Mejores Playas' },
      { href: '/faq', label: 'Preguntas Frecuentes →' },
    ],
  },
};
