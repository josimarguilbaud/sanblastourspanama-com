// Ventanas de temporada alta 2026-2027 para la franja de arriba
// (components/Temporada.astro).
//
// Es copia de `sites/temporada.json` del repo chatbot-sanblas, que alimenta la
// misma franja en sanblasfull, sanblastourspty y sanblastravel; la lista exacta
// de feriados del calendario de reservas vive en el widget
// (`config/sanblas.php`, `fechas_pico`). Al renovar la temporada, cambiar las
// tres. La franja se apaga sola cuando pasa la última ventana.
export interface VentanaTemporada {
  desde: string;
  hasta: string;
  nombre: Record<'en' | 'es' | 'de' | 'fr' | 'pt-br', string>;
}

export const VENTANAS: VentanaTemporada[] = [
  { desde: '2026-11-03', hasta: '2026-11-10', nombre: { en: "Panama's national holidays", es: 'Fiestas patrias', de: 'Panamas Nationalfeiertage', fr: 'Fêtes nationales du Panama', 'pt-br': 'Feriados nacionais do Panamá' } },
  { desde: '2026-11-28', hasta: '2026-11-28', nombre: { en: 'Independence from Spain', es: 'Independencia de España', de: 'Unabhängigkeit von Spanien', fr: 'Indépendance de l’Espagne', 'pt-br': 'Independência da Espanha' } },
  { desde: '2026-12-24', hasta: '2027-01-01', nombre: { en: 'Christmas and New Year', es: 'Navidad y Año Nuevo', de: 'Weihnachten und Neujahr', fr: 'Noël et Nouvel An', 'pt-br': 'Natal e Ano-Novo' } },
  { desde: '2027-02-06', hasta: '2027-02-09', nombre: { en: 'Carnival', es: 'Carnaval', de: 'Karneval', fr: 'Carnaval', 'pt-br': 'Carnaval' } },
  { desde: '2027-03-25', hasta: '2027-03-28', nombre: { en: 'Easter week', es: 'Semana Santa', de: 'Karwoche', fr: 'Semaine sainte', 'pt-br': 'Semana Santa' } },
];
