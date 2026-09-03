export type NavItem = { href: string; label: string };
export type Locale = 'en' | 'es' | 'de' | 'fr' | 'pt-br';

// Compartido entre el Header (menú desplegable) y el Footer (enlaces rápidos),
// para que la lista curada viva en un solo sitio.
//
// ⚠️ Hasta el 02/09/2026 esto era un `Record<'en' | 'es'>` y el Header apagaba
// el menú entero para de/fr/pt-br «para no enlazar a páginas que dan 404».
// Ya no era cierto: las cinco colecciones existen en los cinco idiomas y con
// el mismo slug (0 ficheros ausentes, comprobado uno a uno). Lo que había en
// realidad eran 24 páginas por idioma —10 tours y 14 guías, 72 en total—
// colgando solo del sitemap, sin un enlace interno que las sostuviera. Medido
// en producción: las portadas de esos tres idiomas enlazaban a 0 tours y 0
// guías, contra 5 y 4 de en/es, y pesaban 30 KB contra 65.
//
// Las etiquetas van a mano y NO salen del `name` del contenido: ese campo
// sigue en inglés en varias entradas de esos tres idiomas («Classic Day
// Tour», «Perro Chico Island»), así que generarlas de ahí metería inglés en
// el menú alemán.
export const navShortcuts: Record<Locale, { islands: NavItem[]; tours: NavItem[]; guides: NavItem[] }> = {
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
  de: {
    islands: [
      { href: '/islands/chichime', label: 'Chichime-Insel' },
      { href: '/islands/isla-diablo', label: 'Isla Diablo (Teufelsinsel)' },
      { href: '/islands/perro-chico', label: 'Perro Chico (Schiffswrack)' },
      { href: '/islands/cayos-holandeses', label: 'Cayos Holandeses' },
      { href: '/islands/piscina-natural', label: 'Der Natürliche Pool' },
      { href: '/islands', label: 'Alle Inseln ansehen →' },
    ],
    tours: [
      { href: '/tours/classic-day-tour', label: 'Klassische Tagestour' },
      { href: '/tours/vip-day-tour', label: 'VIP-Tagestour' },
      { href: '/tours/isla-diablo-day-tour', label: 'Tour zur Isla Diablo' },
      { href: '/tours/dutch-cays-day-tour', label: 'Tour zu den Cayos Holandeses' },
      { href: '/tours/overwater-cabin-overnight', label: 'Übernachtungen' },
      { href: '/yachts', label: '★ Private Yachtcharter' },
      { href: '/tours', label: 'Alle Touren ansehen →' },
    ],
    guides: [
      { href: '/guna-yala', label: 'Guna Yala: Volk und Geschichte' },
      { href: '/guides/how-to-get-to-san-blas', label: 'Anreise' },
      { href: '/guides/what-to-pack', label: 'Packliste' },
      { href: '/guides/best-time-to-visit', label: 'Beste Reisezeit' },
      { href: '/guides/top-beaches', label: 'Die besten Strände' },
      { href: '/faq', label: 'Häufige Fragen →' },
    ],
  },
  fr: {
    islands: [
      { href: '/islands/chichime', label: 'Île de Chichime' },
      { href: '/islands/isla-diablo', label: 'Isla Diablo (île du Diable)' },
      { href: '/islands/perro-chico', label: 'Perro Chico (épave)' },
      { href: '/islands/cayos-holandeses', label: 'Cayos Holandeses' },
      { href: '/islands/piscina-natural', label: 'La Piscine Naturelle' },
      { href: '/islands', label: 'Voir toutes les îles →' },
    ],
    tours: [
      { href: '/tours/classic-day-tour', label: 'Excursion Classique' },
      { href: '/tours/vip-day-tour', label: 'Excursion VIP' },
      { href: '/tours/isla-diablo-day-tour', label: 'Excursion à Isla Diablo' },
      { href: '/tours/dutch-cays-day-tour', label: 'Excursion aux Cayos Holandeses' },
      { href: '/tours/overwater-cabin-overnight', label: 'Nuits sur l’île' },
      { href: '/yachts', label: '★ Voiliers privés' },
      { href: '/tours', label: 'Voir tous les circuits →' },
    ],
    guides: [
      { href: '/guna-yala', label: 'Guna Yala : peuple et histoire' },
      { href: '/guides/how-to-get-to-san-blas', label: 'Comment y aller' },
      { href: '/guides/what-to-pack', label: 'Que emporter' },
      { href: '/guides/best-time-to-visit', label: 'Meilleure période' },
      { href: '/guides/top-beaches', label: 'Les plus belles plages' },
      { href: '/faq', label: 'Questions fréquentes →' },
    ],
  },
  'pt-br': {
    islands: [
      { href: '/islands/chichime', label: 'Ilha Chichime' },
      { href: '/islands/isla-diablo', label: 'Isla Diablo (Ilha do Diabo)' },
      { href: '/islands/perro-chico', label: 'Perro Chico (naufrágio)' },
      { href: '/islands/cayos-holandeses', label: 'Cayos Holandeses' },
      { href: '/islands/piscina-natural', label: 'A Piscina Natural' },
      { href: '/islands', label: 'Ver todas as ilhas →' },
    ],
    tours: [
      { href: '/tours/classic-day-tour', label: 'Passeio Clássico' },
      { href: '/tours/vip-day-tour', label: 'Passeio VIP' },
      { href: '/tours/isla-diablo-day-tour', label: 'Passeio à Isla Diablo' },
      { href: '/tours/dutch-cays-day-tour', label: 'Passeio aos Cayos Holandeses' },
      { href: '/tours/overwater-cabin-overnight', label: 'Estadias com pernoite' },
      { href: '/yachts', label: '★ Veleiros privativos' },
      { href: '/tours', label: 'Ver todos os passeios →' },
    ],
    guides: [
      { href: '/guna-yala', label: 'Guna Yala: povo e história' },
      { href: '/guides/how-to-get-to-san-blas', label: 'Como chegar' },
      { href: '/guides/what-to-pack', label: 'O que levar' },
      { href: '/guides/best-time-to-visit', label: 'Melhor época' },
      { href: '/guides/top-beaches', label: 'As melhores praias' },
      { href: '/faq', label: 'Perguntas frequentes →' },
    ],
  },
};
