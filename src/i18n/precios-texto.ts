/**
 * El texto de `/prices`, escrito A MANO en los cinco idiomas.
 *
 * ⚠️ **Nada de esto ha pasado por DeepL, y no debe pasar.** Es la regla 8 de
 * las trampas de i18n del proyecto, y viene de tres fallos vivos en producción:
 * DeepL tradujo «San Blas» como «São Blas» en un H1 portugués, y el «desde» de
 * precio como «seit» en alemán y «depuis» en francés, cuando para un precio son
 * «ab» y «à partir de». Aquí todo es titular, tabla o cifra: justo el texto más
 * visible, que es el que nunca se traduce a máquina.
 *
 * ── Los números NO están en el texto ──────────────────────────────────────
 * Las frases llevan marcadores `{clave}` y las cifras se inyectan desde
 * `src/lib/precios.ts` al pintar la página. Es deliberado: en este proyecto ya
 * costó un fallo real tener un precio escrito dentro de una frase —una entrada
 * de blog anunciaba $135 para dos tours de $114 y $149— y ese fallo no lo caza
 * nadie leyendo el código, porque el número parece parte de la prosa.
 *
 * Con esto, cambiar un precio es tocar un solo fichero y las cinco versiones se
 * actualizan solas. Los marcadores disponibles están en `NUMEROS` de
 * `components/PaginaPrecios.astro`.
 *
 * ── Territorio ────────────────────────────────────────────────────────────
 * Esta web es la GUÍA del archipiélago, no la página de venta del pasadía
 * (sanblasfull) ni el catálogo de aventura (sanblastourspty). Por eso el ángulo
 * de esta página es «qué cuesta de verdad un viaje a San Blas, con lo que nadie
 * te cuenta»: el impuesto de la comarca, el recargo de tarjeta, el efectivo que
 * hay que llevar. Es una respuesta honesta, no un anuncio — y de paso es texto
 * que no se parece al de ninguna hermana.
 */
import type { Locale } from './ui';

export interface FilaTour {
  nombre: string;
  incluye: string;
  /** Una advertencia corta bajo el nombre, si la hay. */
  nota?: string;
}

export interface FilaCabana {
  nombre: string;
  detalle: string;
}

export interface BloqueTitulado {
  titulo: string;
  texto: string;
}

export interface TextoPrecios {
  migaInicio: string;
  migaPrecios: string;

  eyebrow: string;
  h1: string;
  respuesta: string;
  actualizado: string;

  diaH2: string;
  diaIntro: string;
  colTour: string;
  colPrecio: string;
  colIncluye: string;
  colAbono: string;
  verFicha: string;
  /** Por slug de la ficha en `/tours/`. */
  tours: Record<string, FilaTour>;

  nocheH2: string;
  nocheIntro: string;
  colCabana: string;
  colPrimeraNoche: string;
  colNocheExtra: string;
  cabanas: Record<string, FilaCabana>;

  fueraH2: string;
  impuestoTitulo: string;
  impuestoTexto: string;
  fueraIntro: string;
  fuera: string[];

  pagoH2: string;
  pago: string[];

  subeH2: string;
  sube: BloqueTitulado[];

  reservaTitulo: string;
  reservaNota: string;

  faqH2: string;
  faq: { q: string; a: string }[];

  enlacesH2: string;
  enlaces: { href: string; label: string }[];

  ctaTitulo: string;
  ctaTexto: string;
  ctaBoton: string;
  ctaMensaje: string;
}

export const TEXTO_PRECIOS: Record<Locale, TextoPrecios> = {
  /* ─────────────────────────────── EN ─────────────────────────────── */
  en: {
    migaInicio: 'Home',
    migaPrecios: 'Prices',

    eyebrow: 'Prices for 2026',
    h1: 'How much does a San Blas tour cost?',
    respuesta:
      'A day tour to San Blas from Panama City costs between ${diaDesde} and ${diaHasta} per person, and sleeping on an island costs between ${nocheDesde} and ${nocheHasta} per person per night. Neither figure includes the Guna Yala comarca tax, which every visitor pays at the border: ${impExtranjero} for foreigners and ${impResidente} for Panamanian residents.',
    actualizado:
      'Every figure on this page is taken from our live booking system and was last checked on {verificado}.',

    diaH2: 'Day tour prices',
    diaIntro:
      'One rate per person, whatever the size of your group — there is no single-traveller surcharge and no discount hidden behind a minimum. Children pay the adult rate; babies aged four and under travel free. Every day tour leaves Panama City at around 5 AM and drops you back at your hotel after dark.',
    colTour: 'Tour',
    colPrecio: 'Per person',
    colIncluye: 'What you get',
    colAbono: 'Deposit',
    verFicha: 'Full details',
    tours: {
      'classic-day-tour': {
        nombre: 'Classic day trip',
        incluye:
          'Round-trip 4x4 from your Panama City hotel, boat transfers, a typical lunch, life jackets and a bilingual guide. Two islands and the Natural Pool sandbank, with no extra stops.',
      },
      'vip-day-tour': {
        nombre: 'VIP day trip',
        incluye:
          'Everything in the classic trip, plus guided snorkelling over a living reef, snorkel gear and a stop at a Guna community where the molas are made. Four stops instead of three.',
      },
      'isla-diablo-day-tour': {
        nombre: 'Isla Diablo day trip',
        incluye:
          'Isla Diablo, neighbouring Isla Hierva, the Piscina de Estrellas sandbank and a visit to a Guna community. Same transport, lunch and guide as the classic trip.',
      },
      'dutch-cays-day-tour': {
        nombre: 'Dutch Cays premium',
        incluye:
          'The reef furthest from the coast, and for that reason the best preserved one: a longer boat ride, basic snorkel gear and lunch on board or on an island.',
        nota: 'Runs with a minimum of {minCayos} travellers.',
      },
    },

    nocheH2: 'Overnight stay prices',
    nocheIntro:
      'A night on the islands is priced per person per night, and what moves the price is the cabin, not the island: your island is confirmed closer to the date, among several partner islands. All five options include the same thing — 4x4 transport, boat transfers, three meals a day, a two-island tour and the Natural Pool. You can book up to {nochesMax} nights, and every night after the first costs less than the first, because the transport out of Panama City is only paid once.',
    colCabana: 'Cabin type',
    colPrimeraNoche: 'First night',
    colNocheExtra: 'Each extra night',
    cabanas: {
      'camping-under-stars-overnight': {
        nombre: 'Camping under the stars',
        detalle: 'Your own tent on the sand, shared bathrooms. The cheapest way to wake up in San Blas.',
      },
      'hostal-isleno-overnight': {
        nombre: 'Island hostel, shared dorm',
        detalle: 'A bed in a beachfront dorm, with shared bathrooms and a sand floor.',
      },
      'cabana-privada-clasica-overnight': {
        nombre: 'Classic private cabin',
        detalle: 'A cabin to yourselves with a wooden floor; the bathrooms are shared.',
      },
      'cabana-privada-deluxe-overnight': {
        nombre: 'Deluxe private cabin',
        detalle: 'A private cabin with its own bathroom and a wooden floor.',
      },
      'overwater-cabin-overnight': {
        nombre: 'Overwater cabin',
        detalle: 'Built on stilts over the water, with a private bathroom. The one people book for a honeymoon.',
      },
    },

    fueraH2: 'What the price does not include',
    impuestoTitulo: 'The Guna Yala comarca tax',
    impuestoTexto:
      '${impExtranjero} per foreign visitor and ${impResidente} for Panamanian residents who show a passport or residency card. It is not part of any tour price, here or anywhere else: it is a territorial entry fee that goes to the Guna community and is collected at the Guna Yala border on the way in, in cash or by card to the driver. Budget for it before you leave the city — it is the single thing travellers most often did not know about.',
    fueraIntro: 'Beyond the tax, these are the things you will actually spend money on:',
    fuera: [
      'Alcoholic drinks and snacks, both on the boat and on the islands.',
      'Tips for the crew, the driver and the guide.',
      'Molas and souvenirs. They are handmade in the communities and sold for cash only.',
      'Professional photography.',
      'Snorkel gear on overnight stays. The day tours that include snorkelling provide it.',
      'Pickup from outside Panama City itself: the Playa Bonita area adds ${playaBonita} per person.',
    ],

    pagoH2: 'How paying actually works',
    pago: [
      'You book online with a deposit, not the full amount. The deposit for each day tour is in the table above; an overnight stay takes half the total.',
      'The balance is paid on the day of the tour, when the driver picks you up. Nothing else is charged to your card afterwards.',
      'Paying by card adds a {tarjeta}% web service fee on the amount charged at that moment. It is a payment-processing charge, not part of the tour price, and it does not apply to the balance you pay on the day.',
      'Bring cash. There is no ATM anywhere in the archipelago, and the island kiosks, the bars and the mola sellers do not take cards — whatever you did not bring with you, you do not have.',
    ],

    subeH2: 'What makes the price go up or down',
    sube: [
      {
        titulo: 'Which tour, not which month',
        texto:
          'Our day-tour rates are the same all year round: the gap on this page is between tours, not between January and September. What high season changes is availability, not the price — the good dates go first.',
      },
      {
        titulo: 'Your group size, in one case only',
        texto:
          'Every price is per person, so travelling as a couple costs the same per head as travelling as a group of eight. The one exception is the Dutch Cays tour, which needs {minCayos} travellers to sail.',
      },
      {
        titulo: 'Which cabin, not which island',
        texto:
          'On an overnight stay you choose a type of cabin, and the island is assigned among partner islands nearer the date. The distance between a tent on the sand and a cabin over the water is the widest price gap on this page.',
      },
      {
        titulo: 'How many nights',
        texto:
          'Extra nights are cheaper than the first one. The expensive part of a stay is getting you there and back, and that is paid once however long you stay.',
      },
      {
        titulo: 'Who is travelling',
        texto:
          'Babies aged four and under go free on day tours, and children pay slightly less than adults on overnight stays. Panamanian residents pay the lower comarca tax, with valid ID.',
      },
    ],

    reservaTitulo: 'Check live availability and book',
    reservaNota:
      'This form books the classic day trip, the ${diaDesde} option. Every other tour has the same form on its own page, and the price it shows is the live one — straight from the booking system, not from this page.',

    faqH2: 'Frequently asked questions about prices',
    faq: [
      {
        q: 'How much does a San Blas tour cost per person?',
        a: 'From ${diaDesde} per person for a full day trip out of Panama City, up to ${diaHasta} for the Dutch Cays premium tour. Sleeping on an island starts at ${nocheDesde} per person per night. The Guna Yala comarca tax is paid separately at the border: ${impExtranjero} for foreigners, ${impResidente} for residents.',
      },
      {
        q: 'Is the Guna Yala tax included in the tour price?',
        a: 'No, and no operator includes it. It is a comarca entry fee that goes to the Guna community, collected at the border checkpoint on the way in, in cash or by card to the driver: ${impExtranjero} per foreign visitor and ${impResidente} for Panamanian residents who show a passport or residency card.',
      },
      {
        q: 'Do I have to pay the whole tour up front?',
        a: 'No. You pay a deposit online to hold the date, and the rest on the day of the tour when the driver picks you up. The deposit for each day tour is shown in the price table; an overnight stay takes half the total.',
      },
      {
        q: 'Why is there a {tarjeta}% fee when I pay by card?',
        a: 'It is the web service fee for processing a card payment, added to the amount charged at that moment. It is not part of the tour price and it does not apply to the balance you pay on the day of the tour.',
      },
      {
        q: 'How much cash should I bring to San Blas?',
        a: 'Enough for the comarca tax, drinks, tips and any molas you want to buy. There are no ATMs in the archipelago and the islands do not take cards, so bring more than you think you need, in small bills.',
      },
      {
        q: 'Is a day tour or an overnight stay better value?',
        a: 'A day tour is about fourteen hours door to door, and roughly half of that is transport. If San Blas is a highlight of your trip rather than a box to tick, one night on an island buys you a sunset, a genuinely dark night sky and a sunrise for less than the day tour itself costs.',
      },
    ],

    enlacesH2: 'Worth reading before you book',
    enlaces: [
      { href: '/guides/how-to-get-to-san-blas', label: 'How to get to San Blas' },
      { href: '/guides/best-time-to-visit', label: 'The best time to visit' },
      { href: '/guides/what-to-pack', label: 'What to pack' },
      { href: '/tours', label: 'Every tour we run' },
      { href: '/guna-yala', label: 'Guna Yala: whose islands these are' },
      { href: '/faq', label: 'All the questions we get asked' },
    ],

    ctaTitulo: 'Not sure which one fits?',
    ctaTexto:
      'Tell us your dates and how many of you there are. A real person answers, the same day, and will say so if a cheaper tour suits you better.',
    ctaBoton: 'Ask on WhatsApp',
    ctaMensaje: 'Hi! I have a question about San Blas tour prices.',
  },

  /* ─────────────────────────────── ES ─────────────────────────────── */
  es: {
    migaInicio: 'Inicio',
    migaPrecios: 'Precios',

    eyebrow: 'Precios de 2026',
    h1: '¿Cuánto cuesta un tour a San Blas?',
    respuesta:
      'Un tour de un día a San Blas desde Ciudad de Panamá cuesta entre ${diaDesde} y ${diaHasta} por persona, y dormir en una isla cuesta entre ${nocheDesde} y ${nocheHasta} por persona y noche. Ninguna de las dos cifras incluye el impuesto de la comarca de Guna Yala, que paga todo visitante en la frontera: ${impExtranjero} los extranjeros y ${impResidente} los residentes panameños.',
    actualizado:
      'Cada cifra de esta página sale de nuestro sistema de reservas y se comprobó por última vez el {verificado}.',

    diaH2: 'Precio de los tours de un día',
    diaIntro:
      'Una tarifa por persona, vaya el grupo que vaya: ni recargo por viajar solo ni descuento escondido detrás de un mínimo. Los niños pagan la tarifa de adulto; los bebés de cuatro años o menos viajan gratis. Todos los tours de un día salen de Ciudad de Panamá sobre las 5 de la mañana y te dejan de vuelta en el hotel de noche.',
    colTour: 'Tour',
    colPrecio: 'Por persona',
    colIncluye: 'Qué te llevas',
    colAbono: 'Abono',
    verFicha: 'Ver la ficha',
    tours: {
      'classic-day-tour': {
        nombre: 'Tour clásico de un día',
        incluye:
          'Ida y vuelta en 4x4 desde tu hotel en Ciudad de Panamá, traslados en lancha, almuerzo típico, chalecos salvavidas y guía bilingüe. Dos islas y el banco de arena de la Piscina Natural, sin paradas adicionales.',
      },
      'vip-day-tour': {
        nombre: 'Tour VIP de un día',
        incluye:
          'Todo lo del tour clásico, más una sesión guiada de snorkel sobre arrecife vivo, el equipo de snorkel y una parada en una comunidad Guna, donde se hacen las molas. Cuatro paradas en lugar de tres.',
      },
      'isla-diablo-day-tour': {
        nombre: 'Tour a Isla Diablo',
        incluye:
          'Isla Diablo, la vecina Isla Hierva, el banco de arena de la Piscina de Estrellas y la visita a una comunidad Guna. Mismo transporte, almuerzo y guía que el tour clásico.',
      },
      'dutch-cays-day-tour': {
        nombre: 'Cayos Holandeses premium',
        incluye:
          'El arrecife más alejado de la costa y, justo por eso, el mejor conservado: travesía más larga en lancha, equipo básico de snorkel y almuerzo a bordo o en isla.',
        nota: 'Sale con un mínimo de {minCayos} viajeros.',
      },
    },

    nocheH2: 'Precio de las estadías',
    nocheIntro:
      'Una noche en las islas se cobra por persona y por noche, y lo que mueve el precio es la cabaña, no la isla: tu isla se confirma más cerca de la fecha, entre varias islas asociadas. Las cinco opciones incluyen lo mismo — transporte en 4x4, traslados en lancha, tres comidas al día, un recorrido por dos islas y la Piscina Natural. Se pueden reservar hasta {nochesMax} noches, y cada noche a partir de la primera cuesta menos que la primera, porque el traslado desde Ciudad de Panamá se paga una sola vez.',
    colCabana: 'Tipo de cabaña',
    colPrimeraNoche: 'Primera noche',
    colNocheExtra: 'Cada noche extra',
    cabanas: {
      'camping-under-stars-overnight': {
        nombre: 'Camping bajo las estrellas',
        detalle: 'Tu propia carpa sobre la arena y baños compartidos. La forma más barata de amanecer en San Blas.',
      },
      'hostal-isleno-overnight': {
        nombre: 'Hostal isleño, dormitorio compartido',
        detalle: 'Una cama en un dormitorio frente al mar, con baños compartidos y piso de arena.',
      },
      'cabana-privada-clasica-overnight': {
        nombre: 'Cabaña privada clásica',
        detalle: 'Una cabaña para ustedes solos, con piso de madera; los baños son compartidos.',
      },
      'cabana-privada-deluxe-overnight': {
        nombre: 'Cabaña privada deluxe',
        detalle: 'Cabaña privada con baño propio y piso de madera.',
      },
      'overwater-cabin-overnight': {
        nombre: 'Cabaña sobre el mar',
        detalle: 'Levantada sobre pilotes encima del agua, con baño privado. Es la que se reserva para una luna de miel.',
      },
    },

    fueraH2: 'Lo que el precio no incluye',
    impuestoTitulo: 'El impuesto de la comarca de Guna Yala',
    impuestoTexto:
      '${impExtranjero} por visitante extranjero y ${impResidente} para residentes panameños que muestren pasaporte o carné de residencia. No forma parte del precio de ningún tour, ni aquí ni en ninguna otra agencia: es una entrada al territorio que va a la comunidad Guna y se cobra en la frontera de Guna Yala al entrar, en efectivo o con tarjeta al conductor. Cuéntalo en el presupuesto antes de salir de la ciudad: es lo que más veces sorprende a quien no lo sabía.',
    fueraIntro: 'Además del impuesto, esto es en lo que de verdad vas a gastar:',
    fuera: [
      'Bebidas alcohólicas y snacks, tanto en la lancha como en las islas.',
      'Propinas para la tripulación, el conductor y el guía.',
      'Molas y artesanías. Se hacen a mano en las comunidades y se pagan solo en efectivo.',
      'Fotografía profesional.',
      'Equipo de snorkel en las estadías. Los tours de un día que incluyen snorkel sí lo dan.',
      'Recogida fuera de Ciudad de Panamá: la zona de Playa Bonita suma ${playaBonita} por persona.',
    ],

    pagoH2: 'Cómo se paga en realidad',
    pago: [
      'Se reserva en línea con un abono, no con el total. El abono de cada tour de un día está en la tabla de arriba; una estadía se reserva con la mitad del total.',
      'El saldo se paga el día del tour, cuando el conductor pasa a buscarte. Después no se le cobra nada más a tu tarjeta.',
      'Pagar con tarjeta añade un {tarjeta}% de costo por servicio web sobre lo que se cobra en ese momento. Es un cargo de procesamiento, no parte del precio del tour, y no se aplica al saldo que pagas el día del viaje.',
      'Lleva efectivo. En todo el archipiélago no hay un solo cajero automático, y ni los kioscos de la isla ni los bares ni quien vende molas aceptan tarjeta: lo que no llevaste, no lo tienes.',
    ],

    subeH2: 'Qué hace que el precio suba o baje',
    sube: [
      {
        titulo: 'Qué tour, no qué mes',
        texto:
          'Nuestras tarifas de un día son las mismas todo el año: la diferencia de esta página está entre tours, no entre enero y septiembre. Lo que cambia la temporada alta es la disponibilidad, no el precio; las fechas buenas se van primero.',
      },
      {
        titulo: 'El tamaño del grupo, en un solo caso',
        texto:
          'Todos los precios son por persona, así que ir en pareja cuesta lo mismo por cabeza que ir en un grupo de ocho. La única excepción es el tour a Cayos Holandeses, que necesita {minCayos} viajeros para salir.',
      },
      {
        titulo: 'Qué cabaña, no qué isla',
        texto:
          'En una estadía eliges el tipo de cabaña, y la isla se asigna entre las islas asociadas más cerca de la fecha. La distancia entre una carpa sobre la arena y una cabaña sobre el mar es la mayor diferencia de precio de esta página.',
      },
      {
        titulo: 'Cuántas noches',
        texto:
          'Las noches extra son más baratas que la primera. Lo caro de una estadía es llevarte y traerte, y eso se paga una vez te quedes lo que te quedes.',
      },
      {
        titulo: 'Quién viaja',
        texto:
          'Los bebés de cuatro años o menos no pagan en los tours de un día, y los niños pagan algo menos que los adultos en las estadías. Los residentes panameños pagan el impuesto de comarca reducido, presentando documento.',
      },
    ],

    reservaTitulo: 'Consulta disponibilidad y reserva',
    reservaNota:
      'Este formulario reserva el tour clásico de un día, la opción de ${diaDesde}. Cada uno de los demás tours tiene el mismo formulario en su propia ficha, y el precio que ve ahí es el vivo: sale del sistema de reservas, no de esta página.',

    faqH2: 'Preguntas frecuentes sobre precios',
    faq: [
      {
        q: '¿Cuánto cuesta un tour a San Blas por persona?',
        a: 'Desde ${diaDesde} por persona un día completo saliendo de Ciudad de Panamá, y hasta ${diaHasta} el tour premium a Cayos Holandeses. Dormir en una isla arranca en ${nocheDesde} por persona y noche. El impuesto de la comarca de Guna Yala se paga aparte en la frontera: ${impExtranjero} extranjeros, ${impResidente} residentes.',
      },
      {
        q: '¿El impuesto de Guna Yala va incluido en el precio del tour?',
        a: 'No, y ninguna agencia lo incluye. Es una entrada a la comarca que va a la comunidad Guna y se cobra en el puesto fronterizo al entrar, en efectivo o con tarjeta al conductor: ${impExtranjero} por visitante extranjero y ${impResidente} para residentes panameños que muestren pasaporte o carné de residencia.',
      },
      {
        q: '¿Hay que pagar el tour completo por adelantado?',
        a: 'No. Se paga un abono en línea para apartar la fecha y el resto el día del tour, cuando el conductor pasa a buscarte. El abono de cada tour de un día está en la tabla de precios; una estadía se reserva con la mitad del total.',
      },
      {
        q: '¿Por qué hay un {tarjeta}% al pagar con tarjeta?',
        a: 'Es el costo por servicio web de procesar un pago con tarjeta, que se suma a lo que se cobra en ese momento. No es parte del precio del tour y no se aplica al saldo que pagas el día del viaje.',
      },
      {
        q: '¿Cuánto efectivo hay que llevar a San Blas?',
        a: 'El del impuesto de comarca, más bebidas, propinas y las molas que quieras comprar. En el archipiélago no hay cajeros y las islas no aceptan tarjeta, así que lleva más de lo que crees que necesitas, y en billetes pequeños.',
      },
      {
        q: '¿Sale más a cuenta un tour de un día o una estadía?',
        a: 'Un tour de un día son unas catorce horas de puerta a puerta, y más o menos la mitad es transporte. Si San Blas es de lo principal de tu viaje y no una casilla que marcar, una noche en la isla te compra un atardecer, un cielo de verdad oscuro y un amanecer por menos de lo que cuesta el propio tour de un día.',
      },
    ],

    enlacesH2: 'Vale la pena leer esto antes de reservar',
    enlaces: [
      { href: '/guides/how-to-get-to-san-blas', label: 'Cómo llegar a San Blas' },
      { href: '/guides/best-time-to-visit', label: 'La mejor época para ir' },
      { href: '/guides/what-to-pack', label: 'Qué llevar en la maleta' },
      { href: '/tours', label: 'Todos nuestros tours' },
      { href: '/guna-yala', label: 'Guna Yala: de quién son estas islas' },
      { href: '/faq', label: 'Todas las preguntas que nos hacen' },
    ],

    ctaTitulo: '¿No sabes cuál te conviene?',
    ctaTexto:
      'Cuéntanos tus fechas y cuántos van. Contesta una persona de verdad, el mismo día, y te dirá si te sirve mejor un tour más barato.',
    ctaBoton: 'Preguntar por WhatsApp',
    ctaMensaje: '¡Hola! Tengo una consulta sobre los precios de los tours a San Blas.',
  },

  /* ─────────────────────────────── DE ─────────────────────────────── */
  de: {
    migaInicio: 'Startseite',
    migaPrecios: 'Preise',

    eyebrow: 'Preise für 2026',
    h1: 'Was kostet eine Tour nach San Blas?',
    respuesta:
      'Eine Tagestour nach San Blas ab Panama-Stadt kostet zwischen ${diaDesde} und ${diaHasta} pro Person, eine Übernachtung auf einer Insel zwischen ${nocheDesde} und ${nocheHasta} pro Person und Nacht. In keinem der beiden Preise ist die Gebühr des Comarca Guna Yala enthalten, die jeder Besucher an der Grenze zahlt: ${impExtranjero} für Ausländer und ${impResidente} für Personen mit Wohnsitz in Panama.',
    actualizado:
      'Alle Zahlen auf dieser Seite stammen aus unserem Buchungssystem und wurden zuletzt am {verificado} geprüft.',

    diaH2: 'Preise der Tagestouren',
    diaIntro:
      'Ein Preis pro Person, unabhängig von der Gruppengröße — kein Einzelreisendenzuschlag und kein Rabatt, der hinter einer Mindestteilnehmerzahl versteckt ist. Kinder zahlen den Erwachsenenpreis; Babys bis vier Jahre reisen kostenlos. Jede Tagestour startet gegen 5 Uhr morgens in Panama-Stadt und bringt Sie nach Einbruch der Dunkelheit zurück ins Hotel.',
    colTour: 'Tour',
    colPrecio: 'Pro Person',
    colIncluye: 'Was enthalten ist',
    colAbono: 'Anzahlung',
    verFicha: 'Alle Details',
    tours: {
      'classic-day-tour': {
        nombre: 'Klassische Tagestour',
        incluye:
          'Hin- und Rückfahrt im 4x4 ab Ihrem Hotel in Panama-Stadt, Bootstransfers, typisches Mittagessen, Schwimmwesten und zweisprachige Reiseleitung. Zwei Inseln und die Sandbank des Natürlichen Pools, ohne weitere Stopps.',
      },
      'vip-day-tour': {
        nombre: 'VIP-Tagestour',
        incluye:
          'Alles aus der klassischen Tour, dazu geführtes Schnorcheln an einem lebenden Riff, Schnorchelausrüstung und ein Halt in einer Guna-Gemeinde, wo die Molas entstehen. Vier Stopps statt drei.',
      },
      'isla-diablo-day-tour': {
        nombre: 'Tagestour zur Isla Diablo',
        incluye:
          'Isla Diablo, die benachbarte Isla Hierva, die Sandbank Piscina de Estrellas und der Besuch einer Guna-Gemeinde. Gleicher Transport, gleiches Mittagessen und gleiche Reiseleitung wie bei der klassischen Tour.',
      },
      'dutch-cays-day-tour': {
        nombre: 'Cayos Holandeses Premium',
        incluye:
          'Das Riff am weitesten von der Küste entfernt und genau deshalb das besterhaltene: längere Bootsfahrt, einfache Schnorchelausrüstung und Mittagessen an Bord oder auf einer Insel.',
        nota: 'Findet ab {minCayos} Reisenden statt.',
      },
    },

    nocheH2: 'Preise für Übernachtungen',
    nocheIntro:
      'Eine Nacht auf den Inseln wird pro Person und Nacht berechnet, und den Preis bestimmt die Unterkunft, nicht die Insel: Ihre Insel wird näher am Reisedatum unter mehreren Partnerinseln bestätigt. Alle fünf Varianten enthalten dasselbe — 4x4-Transport, Bootstransfers, drei Mahlzeiten am Tag, eine Fahrt zu zwei weiteren Inseln und den Natürlichen Pool. Buchbar sind bis zu {nochesMax} Nächte, und jede Nacht nach der ersten kostet weniger als die erste, weil der Transport ab Panama-Stadt nur einmal bezahlt wird.',
    colCabana: 'Unterkunft',
    colPrimeraNoche: 'Erste Nacht',
    colNocheExtra: 'Jede weitere Nacht',
    cabanas: {
      'camping-under-stars-overnight': {
        nombre: 'Camping unter den Sternen',
        detalle: 'Ein eigenes Zelt im Sand, Gemeinschaftsbäder. Die günstigste Art, in San Blas aufzuwachen.',
      },
      'hostal-isleno-overnight': {
        nombre: 'Inselhostel, Mehrbettzimmer',
        detalle: 'Ein Bett im Mehrbettzimmer direkt am Strand, mit Gemeinschaftsbädern und Sandboden.',
      },
      'cabana-privada-clasica-overnight': {
        nombre: 'Klassische Privathütte',
        detalle: 'Eine Hütte für Sie allein, mit Holzboden; die Bäder werden geteilt.',
      },
      'cabana-privada-deluxe-overnight': {
        nombre: 'Deluxe-Privathütte',
        detalle: 'Private Hütte mit eigenem Bad und Holzboden.',
      },
      'overwater-cabin-overnight': {
        nombre: 'Hütte über dem Wasser',
        detalle: 'Auf Pfählen über dem Meer gebaut, mit eigenem Bad. Die Variante für Flitterwochen.',
      },
    },

    fueraH2: 'Was im Preis nicht enthalten ist',
    impuestoTitulo: 'Die Gebühr des Comarca Guna Yala',
    impuestoTexto:
      '${impExtranjero} pro ausländischem Besucher und ${impResidente} für Personen mit Wohnsitz in Panama, die Reisepass oder Aufenthaltskarte vorzeigen. Sie ist in keinem Tourpreis enthalten, weder bei uns noch bei einem anderen Anbieter: Es ist eine Gebühr für das Betreten des Gebiets, die der Guna-Gemeinschaft zugutekommt und bei der Einreise an der Grenze von Guna Yala erhoben wird, bar oder per Karte beim Fahrer. Planen Sie sie ein, bevor Sie die Stadt verlassen — es ist der Punkt, der Reisende am häufigsten überrascht.',
    fueraIntro: 'Über die Gebühr hinaus geben Sie erfahrungsgemäß dafür Geld aus:',
    fuera: [
      'Alkoholische Getränke und Snacks, im Boot wie auf den Inseln.',
      'Trinkgeld für Crew, Fahrer und Reiseleitung.',
      'Molas und Kunsthandwerk. Sie werden in den Gemeinden von Hand gefertigt und nur gegen Bargeld verkauft.',
      'Professionelle Fotos.',
      'Schnorchelausrüstung bei Übernachtungen. Bei den Tagestouren mit Schnorcheln ist sie dabei.',
      'Abholung außerhalb von Panama-Stadt: Der Bereich Playa Bonita kostet ${playaBonita} pro Person extra.',
    ],

    pagoH2: 'Wie das Bezahlen wirklich abläuft',
    pago: [
      'Sie buchen online mit einer Anzahlung, nicht mit dem vollen Betrag. Die Anzahlung je Tagestour steht in der Tabelle oben; bei einer Übernachtung ist es die Hälfte der Gesamtsumme.',
      'Den Rest zahlen Sie am Tag der Tour, wenn der Fahrer Sie abholt. Danach wird Ihrer Karte nichts weiter belastet.',
      'Bei Kartenzahlung kommen {tarjeta}% Web-Servicegebühr auf den in diesem Moment belasteten Betrag hinzu. Das ist eine Bearbeitungsgebühr, kein Teil des Tourpreises, und sie gilt nicht für den Restbetrag am Reisetag.',
      'Nehmen Sie Bargeld mit. Im gesamten Archipel gibt es keinen einzigen Geldautomaten, und weder die Kioske auf den Inseln noch die Bars noch die Mola-Verkäuferinnen nehmen Karten — was Sie nicht dabeihaben, haben Sie nicht.',
    ],

    subeH2: 'Was den Preis steigen oder sinken lässt',
    sube: [
      {
        titulo: 'Welche Tour, nicht welcher Monat',
        texto:
          'Unsere Tagespreise gelten das ganze Jahr über: Der Unterschied auf dieser Seite liegt zwischen den Touren, nicht zwischen Januar und September. Die Hochsaison ändert die Verfügbarkeit, nicht den Preis — die guten Termine sind zuerst weg.',
      },
      {
        titulo: 'Die Gruppengröße, in einem einzigen Fall',
        texto:
          'Alle Preise gelten pro Person, zu zweit zahlt man also pro Kopf dasselbe wie zu acht. Die einzige Ausnahme ist die Tour zu den Cayos Holandeses, für die {minCayos} Reisende zusammenkommen müssen.',
      },
      {
        titulo: 'Welche Hütte, nicht welche Insel',
        texto:
          'Bei einer Übernachtung wählen Sie die Art der Unterkunft; die Insel wird näher am Datum unter den Partnerinseln zugeteilt. Zwischen einem Zelt im Sand und einer Hütte über dem Wasser liegt der größte Preisunterschied dieser Seite.',
      },
      {
        titulo: 'Wie viele Nächte',
        texto:
          'Weitere Nächte sind günstiger als die erste. Teuer an einer Übernachtung ist die An- und Abreise, und die zahlt man nur einmal, egal wie lange Sie bleiben.',
      },
      {
        titulo: 'Wer mitreist',
        texto:
          'Babys bis vier Jahre fahren bei Tagestouren kostenlos mit, und Kinder zahlen bei Übernachtungen etwas weniger als Erwachsene. Wer seinen Wohnsitz in Panama hat, zahlt mit gültigem Ausweis die niedrigere Comarca-Gebühr.',
      },
    ],

    reservaTitulo: 'Verfügbarkeit prüfen und buchen',
    reservaNota:
      'Dieses Formular bucht die klassische Tagestour, die Variante für ${diaDesde}. Jede andere Tour hat dasselbe Formular auf ihrer eigenen Seite, und der Preis dort ist der aktuelle — direkt aus dem Buchungssystem, nicht von dieser Seite.',

    faqH2: 'Häufige Fragen zu den Preisen',
    faq: [
      {
        q: 'Was kostet eine San-Blas-Tour pro Person?',
        a: 'Ab ${diaDesde} pro Person für einen ganzen Tag ab Panama-Stadt, bis ${diaHasta} für die Premium-Tour zu den Cayos Holandeses. Eine Übernachtung auf einer Insel beginnt bei ${nocheDesde} pro Person und Nacht. Die Gebühr des Comarca Guna Yala wird separat an der Grenze bezahlt: ${impExtranjero} für Ausländer, ${impResidente} für Personen mit Wohnsitz in Panama.',
      },
      {
        q: 'Ist die Guna-Yala-Gebühr im Tourpreis enthalten?',
        a: 'Nein, und kein Anbieter schließt sie ein. Es ist eine Eintrittsgebühr für das Comarca, die der Guna-Gemeinschaft zugutekommt und bei der Einreise am Grenzposten erhoben wird, bar oder per Karte beim Fahrer: ${impExtranjero} pro ausländischem Besucher und ${impResidente} für Personen mit Wohnsitz in Panama, die Reisepass oder Aufenthaltskarte vorzeigen.',
      },
      {
        q: 'Muss ich die Tour im Voraus komplett bezahlen?',
        a: 'Nein. Sie zahlen online eine Anzahlung, um das Datum zu sichern, und den Rest am Tag der Tour, wenn der Fahrer Sie abholt. Die Anzahlung je Tagestour steht in der Preistabelle; bei einer Übernachtung ist es die Hälfte der Gesamtsumme.',
      },
      {
        q: 'Warum kommen bei Kartenzahlung {tarjeta}% dazu?',
        a: 'Das ist die Web-Servicegebühr für die Abwicklung einer Kartenzahlung, die auf den in diesem Moment belasteten Betrag aufgeschlagen wird. Sie gehört nicht zum Tourpreis und fällt nicht auf den Restbetrag am Reisetag an.',
      },
      {
        q: 'Wie viel Bargeld sollte ich nach San Blas mitnehmen?',
        a: 'So viel, dass es für die Comarca-Gebühr, Getränke, Trinkgeld und die Molas reicht, die Sie kaufen möchten. Im Archipel gibt es keine Geldautomaten und auf den Inseln keine Kartenzahlung — nehmen Sie also mehr mit, als Sie glauben zu brauchen, und in kleinen Scheinen.',
      },
      {
        q: 'Lohnt sich eher eine Tagestour oder eine Übernachtung?',
        a: 'Eine Tagestour dauert rund vierzehn Stunden von Tür zu Tür, und etwa die Hälfte davon ist Fahrzeit. Wenn San Blas ein Höhepunkt Ihrer Reise sein soll und kein abgehakter Punkt, bringt Ihnen eine Nacht auf der Insel einen Sonnenuntergang, einen wirklich dunklen Nachthimmel und einen Sonnenaufgang — für weniger, als die Tagestour selbst kostet.',
      },
    ],

    enlacesH2: 'Lesenswert, bevor Sie buchen',
    enlaces: [
      { href: '/guides/how-to-get-to-san-blas', label: 'Anreise nach San Blas' },
      { href: '/guides/best-time-to-visit', label: 'Die beste Reisezeit' },
      { href: '/guides/what-to-pack', label: 'Was Sie einpacken sollten' },
      { href: '/tours', label: 'Alle unsere Touren' },
      { href: '/guna-yala', label: 'Guna Yala: wem diese Inseln gehören' },
      { href: '/faq', label: 'Alle häufigen Fragen' },
    ],

    ctaTitulo: 'Unsicher, was zu Ihnen passt?',
    ctaTexto:
      'Sagen Sie uns Ihre Reisedaten und wie viele Sie sind. Es antwortet ein Mensch, noch am selben Tag — und sagt Ihnen auch, wenn eine günstigere Tour besser zu Ihnen passt.',
    ctaBoton: 'Auf WhatsApp fragen',
    ctaMensaje: 'Hallo! Ich habe eine Frage zu den Preisen der San-Blas-Touren.',
  },

  /* ─────────────────────────────── FR ─────────────────────────────── */
  fr: {
    migaInicio: 'Accueil',
    migaPrecios: 'Tarifs',

    eyebrow: 'Tarifs 2026',
    h1: 'Combien coûte une excursion à San Blas ?',
    respuesta:
      'Une excursion d’une journée à San Blas au départ de Panama City coûte entre ${diaDesde} et ${diaHasta} par personne, et dormir sur une île coûte entre ${nocheDesde} et ${nocheHasta} par personne et par nuit. Aucun de ces deux montants ne comprend la taxe de la comarca Guna Yala, que chaque visiteur règle à la frontière : ${impExtranjero} pour les étrangers et ${impResidente} pour les résidents panaméens.',
    actualizado:
      'Tous les chiffres de cette page proviennent de notre système de réservation et ont été vérifiés le {verificado}.',

    diaH2: 'Tarifs des excursions à la journée',
    diaIntro:
      'Un tarif par personne, quelle que soit la taille du groupe : ni supplément pour voyageur seul, ni remise cachée derrière un nombre minimum. Les enfants paient le tarif adulte ; les bébés de quatre ans et moins voyagent gratuitement. Toutes les excursions partent de Panama City vers 5 h du matin et vous ramènent à votre hôtel à la nuit tombée.',
    colTour: 'Excursion',
    colPrecio: 'Par personne',
    colIncluye: 'Ce qui est compris',
    colAbono: 'Acompte',
    verFicha: 'Voir le détail',
    tours: {
      'classic-day-tour': {
        nombre: 'Excursion classique',
        incluye:
          'Aller-retour en 4x4 depuis votre hôtel à Panama City, transferts en bateau, déjeuner typique, gilets de sauvetage et guide bilingue. Deux îles et le banc de sable de la Piscine Naturelle, sans arrêt supplémentaire.',
      },
      'vip-day-tour': {
        nombre: 'Excursion VIP',
        incluye:
          'Tout le contenu de l’excursion classique, plus une séance de snorkeling guidée sur un récif vivant, le matériel de snorkeling et une halte dans une communauté Guna, là où naissent les molas. Quatre arrêts au lieu de trois.',
      },
      'isla-diablo-day-tour': {
        nombre: 'Excursion à Isla Diablo',
        incluye:
          'Isla Diablo, l’île voisine d’Isla Hierva, le banc de sable de la Piscina de Estrellas et la visite d’une communauté Guna. Même transport, même déjeuner et même guide que l’excursion classique.',
      },
      'dutch-cays-day-tour': {
        nombre: 'Cayos Holandeses premium',
        incluye:
          'Le récif le plus éloigné de la côte et, pour cette raison même, le mieux conservé : une navigation plus longue, le matériel de snorkeling de base et le déjeuner à bord ou sur une île.',
        nota: 'Départ garanti à partir de {minCayos} voyageurs.',
      },
    },

    nocheH2: 'Tarifs des nuits sur les îles',
    nocheIntro:
      'Une nuit sur les îles se facture par personne et par nuit, et ce qui fait varier le prix, c’est le logement, pas l’île : votre île est confirmée plus près de la date, parmi plusieurs îles partenaires. Les cinq formules comprennent la même chose — transport en 4x4, transferts en bateau, trois repas par jour, une sortie vers deux autres îles et la Piscine Naturelle. On peut réserver jusqu’à {nochesMax} nuits, et chaque nuit après la première coûte moins cher que la première, parce que le trajet depuis Panama City ne se paie qu’une fois.',
    colCabana: 'Type de logement',
    colPrimeraNoche: 'Première nuit',
    colNocheExtra: 'Chaque nuit en plus',
    cabanas: {
      'camping-under-stars-overnight': {
        nombre: 'Camping sous les étoiles',
        detalle: 'Votre propre tente sur le sable, sanitaires partagés. La façon la moins chère de se réveiller à San Blas.',
      },
      'hostal-isleno-overnight': {
        nombre: 'Auberge insulaire, dortoir',
        detalle: 'Un lit en dortoir face à la mer, avec sanitaires partagés et sol en sable.',
      },
      'cabana-privada-clasica-overnight': {
        nombre: 'Cabane privée classique',
        detalle: 'Une cabane rien que pour vous, avec plancher en bois ; les sanitaires sont partagés.',
      },
      'cabana-privada-deluxe-overnight': {
        nombre: 'Cabane privée deluxe',
        detalle: 'Cabane privée avec salle de bain individuelle et plancher en bois.',
      },
      'overwater-cabin-overnight': {
        nombre: 'Cabane sur pilotis',
        detalle: 'Construite au-dessus de l’eau, avec salle de bain privée. C’est celle que l’on réserve pour une lune de miel.',
      },
    },

    fueraH2: 'Ce que le prix ne comprend pas',
    impuestoTitulo: 'La taxe de la comarca Guna Yala',
    impuestoTexto:
      '${impExtranjero} par visiteur étranger et ${impResidente} pour les résidents panaméens présentant un passeport ou une carte de résidence. Elle ne fait partie du prix d’aucune excursion, ni chez nous ni ailleurs : c’est un droit d’entrée sur le territoire qui revient à la communauté Guna, perçu à la frontière de Guna Yala à l’aller, en espèces ou par carte auprès du chauffeur. Prévoyez-la avant de quitter la ville : c’est ce qui surprend le plus souvent les voyageurs qui l’ignoraient.',
    fueraIntro: 'Au-delà de la taxe, voici ce qui vous coûtera vraiment de l’argent :',
    fuera: [
      'Boissons alcoolisées et en-cas, aussi bien sur le bateau que sur les îles.',
      'Pourboires pour l’équipage, le chauffeur et le guide.',
      'Molas et artisanat. Ils sont faits à la main dans les communautés et se paient uniquement en espèces.',
      'Photographie professionnelle.',
      'Matériel de snorkeling lors des nuits sur les îles. Les excursions qui incluent le snorkeling le fournissent.',
      'Prise en charge hors de Panama City : le secteur de Playa Bonita ajoute ${playaBonita} par personne.',
    ],

    pagoH2: 'Comment le paiement fonctionne réellement',
    pago: [
      'Vous réservez en ligne avec un acompte, pas la totalité. L’acompte de chaque excursion figure dans le tableau ci-dessus ; pour une nuit sur les îles, c’est la moitié du total.',
      'Le solde se règle le jour de l’excursion, au moment où le chauffeur vient vous chercher. Rien d’autre n’est ensuite débité de votre carte.',
      'Le paiement par carte ajoute {tarjeta}% de frais de service web sur le montant débité à ce moment-là. C’est un frais de traitement, pas une partie du prix de l’excursion, et il ne s’applique pas au solde payé le jour même.',
      'Emportez des espèces. Il n’y a pas un seul distributeur dans tout l’archipel, et ni les kiosques des îles, ni les bars, ni les vendeuses de molas n’acceptent la carte : ce que vous n’avez pas emporté, vous ne l’avez pas.',
    ],

    subeH2: 'Ce qui fait monter ou baisser le prix',
    sube: [
      {
        titulo: 'Quelle excursion, pas quel mois',
        texto:
          'Nos tarifs à la journée sont les mêmes toute l’année : l’écart de cette page se situe entre les excursions, pas entre janvier et septembre. Ce que change la haute saison, c’est la disponibilité, pas le prix — les bonnes dates partent en premier.',
      },
      {
        titulo: 'La taille du groupe, dans un seul cas',
        texto:
          'Tous les prix sont par personne : voyager à deux coûte donc autant par tête qu’à huit. La seule exception est l’excursion aux Cayos Holandeses, qui a besoin de {minCayos} voyageurs pour partir.',
      },
      {
        titulo: 'Quel logement, pas quelle île',
        texto:
          'Pour une nuit sur les îles, vous choisissez le type de logement ; l’île est attribuée parmi les îles partenaires plus près de la date. Entre une tente sur le sable et une cabane sur pilotis se trouve le plus grand écart de prix de cette page.',
      },
      {
        titulo: 'Combien de nuits',
        texto:
          'Les nuits supplémentaires coûtent moins cher que la première. Ce qui coûte cher dans un séjour, c’est de vous emmener et de vous ramener, et cela se paie une seule fois quelle que soit la durée.',
      },
      {
        titulo: 'Qui voyage',
        texto:
          'Les bébés de quatre ans et moins ne paient pas pour les excursions à la journée, et les enfants paient un peu moins que les adultes pour les nuits sur les îles. Les résidents panaméens paient la taxe réduite, sur présentation d’un justificatif.',
      },
    ],

    reservaTitulo: 'Vérifier les disponibilités et réserver',
    reservaNota:
      'Ce formulaire réserve l’excursion classique, la formule à ${diaDesde}. Chaque autre excursion dispose du même formulaire sur sa propre page, et le prix affiché y est le prix en vigueur : il vient du système de réservation, pas de cette page.',

    faqH2: 'Questions fréquentes sur les tarifs',
    faq: [
      {
        q: 'Combien coûte une excursion à San Blas par personne ?',
        a: 'À partir de ${diaDesde} par personne pour une journée complète au départ de Panama City, et jusqu’à ${diaHasta} pour l’excursion premium aux Cayos Holandeses. Dormir sur une île commence à ${nocheDesde} par personne et par nuit. La taxe de la comarca Guna Yala se paie à part à la frontière : ${impExtranjero} pour les étrangers, ${impResidente} pour les résidents.',
      },
      {
        q: 'La taxe Guna Yala est-elle comprise dans le prix ?',
        a: 'Non, et aucun opérateur ne l’inclut. C’est un droit d’entrée dans la comarca qui revient à la communauté Guna, perçu au poste frontière à l’aller, en espèces ou par carte auprès du chauffeur : ${impExtranjero} par visiteur étranger et ${impResidente} pour les résidents panaméens présentant un passeport ou une carte de résidence.',
      },
      {
        q: 'Faut-il payer la totalité à l’avance ?',
        a: 'Non. Vous versez un acompte en ligne pour bloquer la date, et le reste le jour de l’excursion, quand le chauffeur vient vous chercher. L’acompte de chaque excursion figure dans le tableau des tarifs ; une nuit sur les îles se réserve avec la moitié du total.',
      },
      {
        q: 'Pourquoi {tarjeta}% de plus en payant par carte ?',
        a: 'Ce sont les frais de service web pour traiter un paiement par carte, ajoutés au montant débité à ce moment-là. Ils ne font pas partie du prix de l’excursion et ne s’appliquent pas au solde réglé le jour même.',
      },
      {
        q: 'Combien d’espèces faut-il emporter à San Blas ?',
        a: 'De quoi couvrir la taxe de la comarca, les boissons, les pourboires et les molas que vous voudrez acheter. Il n’y a pas de distributeur dans l’archipel et les îles n’acceptent pas la carte : emportez plus que ce que vous pensez nécessaire, en petites coupures.',
      },
      {
        q: 'Journée ou nuit sur place : qu’est-ce qui vaut le plus le coup ?',
        a: 'Une excursion à la journée représente environ quatorze heures de porte à porte, dont à peu près la moitié en transport. Si San Blas est un moment fort de votre voyage et pas une case à cocher, une nuit sur l’île vous offre un coucher de soleil, un ciel nocturne vraiment noir et un lever de soleil pour moins que le prix de l’excursion elle-même.',
      },
    ],

    enlacesH2: 'À lire avant de réserver',
    enlaces: [
      { href: '/guides/how-to-get-to-san-blas', label: 'Comment aller à San Blas' },
      { href: '/guides/best-time-to-visit', label: 'La meilleure période pour partir' },
      { href: '/guides/what-to-pack', label: 'Que mettre dans sa valise' },
      { href: '/tours', label: 'Toutes nos excursions' },
      { href: '/guna-yala', label: 'Guna Yala : à qui appartiennent ces îles' },
      { href: '/faq', label: 'Toutes les questions qu’on nous pose' },
    ],

    ctaTitulo: 'Vous hésitez sur la formule ?',
    ctaTexto:
      'Dites-nous vos dates et combien vous êtes. Une vraie personne répond, le jour même, et vous dira franchement si une excursion moins chère vous conviendrait mieux.',
    ctaBoton: 'Demander sur WhatsApp',
    ctaMensaje: 'Bonjour ! J’ai une question sur les tarifs des excursions à San Blas.',
  },

  /* ────────────────────────────── PT-BR ───────────────────────────── */
  'pt-br': {
    migaInicio: 'Início',
    migaPrecios: 'Preços',

    eyebrow: 'Preços de 2026',
    h1: 'Quanto custa um passeio a San Blas?',
    respuesta:
      'Um passeio de um dia a San Blas saindo da Cidade do Panamá custa entre ${diaDesde} e ${diaHasta} por pessoa, e dormir em uma ilha custa entre ${nocheDesde} e ${nocheHasta} por pessoa e por noite. Nenhum dos dois valores inclui a taxa da comarca de Guna Yala, que todo visitante paga na fronteira: ${impExtranjero} para estrangeiros e ${impResidente} para residentes panamenhos.',
    actualizado:
      'Todos os números desta página vêm do nosso sistema de reservas e foram conferidos pela última vez em {verificado}.',

    diaH2: 'Preço dos passeios de um dia',
    diaIntro:
      'Uma tarifa por pessoa, seja qual for o tamanho do grupo: não há taxa para quem viaja sozinho nem desconto escondido atrás de um mínimo. Crianças pagam a tarifa de adulto; bebês de até quatro anos viajam de graça. Todos os passeios de um dia saem da Cidade do Panamá por volta das 5 da manhã e deixam você de volta no hotel depois do anoitecer.',
    colTour: 'Passeio',
    colPrecio: 'Por pessoa',
    colIncluye: 'O que está incluso',
    colAbono: 'Sinal',
    verFicha: 'Ver detalhes',
    tours: {
      'classic-day-tour': {
        nombre: 'Passeio clássico de um dia',
        incluye:
          'Ida e volta de 4x4 desde o seu hotel na Cidade do Panamá, transfers de lancha, almoço típico, coletes salva-vidas e guia bilíngue. Duas ilhas e o banco de areia da Piscina Natural, sem paradas extras.',
      },
      'vip-day-tour': {
        nombre: 'Passeio VIP de um dia',
        incluye:
          'Tudo o que tem no passeio clássico, mais uma sessão guiada de snorkel sobre recife vivo, o equipamento de snorkel e uma parada em uma comunidade Guna, onde as molas são feitas. Quatro paradas em vez de três.',
      },
      'isla-diablo-day-tour': {
        nombre: 'Passeio à Isla Diablo',
        incluye:
          'Isla Diablo, a vizinha Isla Hierva, o banco de areia da Piscina de Estrellas e a visita a uma comunidade Guna. Mesmo transporte, almoço e guia do passeio clássico.',
      },
      'dutch-cays-day-tour': {
        nombre: 'Cayos Holandeses premium',
        incluye:
          'O recife mais distante da costa e, justamente por isso, o mais bem preservado: travessia mais longa de lancha, equipamento básico de snorkel e almoço a bordo ou em uma ilha.',
        nota: 'Sai com no mínimo {minCayos} viajantes.',
      },
    },

    nocheH2: 'Preço das estadias com pernoite',
    nocheIntro:
      'A noite nas ilhas é cobrada por pessoa e por noite, e o que muda o preço é a acomodação, não a ilha: a sua ilha é confirmada mais perto da data, entre várias ilhas parceiras. As cinco opções incluem a mesma coisa — transporte 4x4, transfers de lancha, três refeições por dia, um passeio por duas ilhas e a Piscina Natural. Dá para reservar até {nochesMax} noites, e cada noite depois da primeira custa menos que a primeira, porque o traslado desde a Cidade do Panamá se paga uma vez só.',
    colCabana: 'Tipo de acomodação',
    colPrimeraNoche: 'Primeira noite',
    colNocheExtra: 'Cada noite extra',
    cabanas: {
      'camping-under-stars-overnight': {
        nombre: 'Camping sob as estrelas',
        detalle: 'Sua própria barraca na areia, banheiros compartilhados. O jeito mais barato de acordar em San Blas.',
      },
      'hostal-isleno-overnight': {
        nombre: 'Hostel na ilha, quarto compartilhado',
        detalle: 'Uma cama em quarto compartilhado de frente para o mar, com banheiros compartilhados e chão de areia.',
      },
      'cabana-privada-clasica-overnight': {
        nombre: 'Cabana privativa clássica',
        detalle: 'Uma cabana só para vocês, com piso de madeira; os banheiros são compartilhados.',
      },
      'cabana-privada-deluxe-overnight': {
        nombre: 'Cabana privativa deluxe',
        detalle: 'Cabana privativa com banheiro próprio e piso de madeira.',
      },
      'overwater-cabin-overnight': {
        nombre: 'Cabana sobre o mar',
        detalle: 'Construída sobre palafitas em cima da água, com banheiro privativo. É a que se reserva para uma lua de mel.',
      },
    },

    fueraH2: 'O que o preço não inclui',
    impuestoTitulo: 'A taxa da comarca de Guna Yala',
    impuestoTexto:
      '${impExtranjero} por visitante estrangeiro e ${impResidente} para residentes panamenhos que apresentem passaporte ou carteira de residência. Não faz parte do preço de nenhum passeio, nem aqui nem em outra agência: é uma entrada no território que vai para a comunidade Guna e é cobrada na fronteira de Guna Yala na ida, em dinheiro ou no cartão com o motorista. Coloque no orçamento antes de sair da cidade — é o que mais pega de surpresa quem não sabia.',
    fueraIntro: 'Além da taxa, é nisto que você realmente vai gastar:',
    fuera: [
      'Bebidas alcoólicas e lanches, tanto na lancha quanto nas ilhas.',
      'Gorjetas para a tripulação, o motorista e o guia.',
      'Molas e artesanato. São feitos à mão nas comunidades e vendidos só em dinheiro.',
      'Fotografia profissional.',
      'Equipamento de snorkel nas estadias. Os passeios de um dia que incluem snorkel fornecem o equipamento.',
      'Embarque fora da Cidade do Panamá: a região de Playa Bonita acrescenta ${playaBonita} por pessoa.',
    ],

    pagoH2: 'Como o pagamento funciona de verdade',
    pago: [
      'A reserva online é feita com um sinal, não com o valor total. O sinal de cada passeio de um dia está na tabela acima; uma estadia se reserva com metade do total.',
      'O saldo é pago no dia do passeio, quando o motorista vem buscar você. Depois disso, nada mais é debitado do seu cartão.',
      'Pagar com cartão acrescenta {tarjeta}% de custo por serviço web sobre o valor cobrado naquele momento. É uma taxa de processamento, não parte do preço do passeio, e não se aplica ao saldo pago no dia.',
      'Leve dinheiro. Em todo o arquipélago não há um único caixa eletrônico, e nem os quiosques da ilha, nem os bares, nem quem vende molas aceitam cartão: o que você não levou, você não tem.',
    ],

    subeH2: 'O que faz o preço subir ou descer',
    sube: [
      {
        titulo: 'Qual passeio, não qual mês',
        texto:
          'Nossas tarifas de um dia são as mesmas o ano inteiro: a diferença desta página está entre os passeios, não entre janeiro e setembro. O que a alta temporada muda é a disponibilidade, não o preço — as datas boas somem primeiro.',
      },
      {
        titulo: 'O tamanho do grupo, em um caso só',
        texto:
          'Todos os preços são por pessoa, então viajar a dois custa por cabeça o mesmo que viajar em oito. A única exceção é o passeio aos Cayos Holandeses, que precisa de {minCayos} viajantes para sair.',
      },
      {
        titulo: 'Qual acomodação, não qual ilha',
        texto:
          'Numa estadia você escolhe o tipo de acomodação, e a ilha é atribuída entre as ilhas parceiras mais perto da data. Entre uma barraca na areia e uma cabana sobre o mar está a maior diferença de preço desta página.',
      },
      {
        titulo: 'Quantas noites',
        texto:
          'As noites extras são mais baratas que a primeira. O caro de uma estadia é levar e trazer você, e isso se paga uma vez só, fique quanto tempo ficar.',
      },
      {
        titulo: 'Quem viaja',
        texto:
          'Bebês de até quatro anos não pagam nos passeios de um dia, e crianças pagam um pouco menos que adultos nas estadias. Residentes panamenhos pagam a taxa reduzida da comarca, apresentando documento.',
      },
    ],

    reservaTitulo: 'Ver disponibilidade e reservar',
    reservaNota:
      'Este formulário reserva o passeio clássico de um dia, a opção de ${diaDesde}. Cada um dos outros passeios tem o mesmo formulário na sua própria página, e o preço que aparece lá é o preço vivo: vem do sistema de reservas, não desta página.',

    faqH2: 'Perguntas frequentes sobre preços',
    faq: [
      {
        q: 'Quanto custa um passeio a San Blas por pessoa?',
        a: 'A partir de ${diaDesde} por pessoa para um dia inteiro saindo da Cidade do Panamá, e até ${diaHasta} no passeio premium aos Cayos Holandeses. Dormir em uma ilha começa em ${nocheDesde} por pessoa e por noite. A taxa da comarca de Guna Yala se paga à parte na fronteira: ${impExtranjero} para estrangeiros, ${impResidente} para residentes.',
      },
      {
        q: 'A taxa de Guna Yala está incluída no preço do passeio?',
        a: 'Não, e nenhuma agência inclui. É uma entrada na comarca que vai para a comunidade Guna e é cobrada no posto de fronteira na ida, em dinheiro ou no cartão com o motorista: ${impExtranjero} por visitante estrangeiro e ${impResidente} para residentes panamenhos que apresentem passaporte ou carteira de residência.',
      },
      {
        q: 'É preciso pagar o passeio inteiro adiantado?',
        a: 'Não. Você paga um sinal online para garantir a data e o resto no dia do passeio, quando o motorista vem buscar você. O sinal de cada passeio de um dia está na tabela de preços; uma estadia se reserva com metade do total.',
      },
      {
        q: 'Por que tem {tarjeta}% a mais pagando com cartão?',
        a: 'É o custo por serviço web de processar um pagamento com cartão, somado ao valor cobrado naquele momento. Não faz parte do preço do passeio e não se aplica ao saldo pago no dia da viagem.',
      },
      {
        q: 'Quanto dinheiro em espécie levar para San Blas?',
        a: 'O suficiente para a taxa da comarca, bebidas, gorjetas e as molas que quiser comprar. No arquipélago não há caixas eletrônicos e as ilhas não aceitam cartão, então leve mais do que acha que precisa, em notas pequenas.',
      },
      {
        q: 'Vale mais a pena um passeio de um dia ou uma estadia?',
        a: 'Um passeio de um dia são cerca de catorze horas de porta a porta, e mais ou menos metade disso é transporte. Se San Blas é um dos pontos altos da sua viagem e não um item para riscar da lista, uma noite na ilha te compra um pôr do sol, um céu de verdade escuro e um amanhecer por menos do que custa o próprio passeio de um dia.',
      },
    ],

    enlacesH2: 'Vale ler antes de reservar',
    enlaces: [
      { href: '/guides/how-to-get-to-san-blas', label: 'Como chegar a San Blas' },
      { href: '/guides/best-time-to-visit', label: 'A melhor época para ir' },
      { href: '/guides/what-to-pack', label: 'O que levar na mala' },
      { href: '/tours', label: 'Todos os nossos passeios' },
      { href: '/guna-yala', label: 'Guna Yala: de quem são estas ilhas' },
      { href: '/faq', label: 'Todas as perguntas que nos fazem' },
    ],

    ctaTitulo: 'Na dúvida sobre qual escolher?',
    ctaTexto:
      'Conte suas datas e quantas pessoas são. Responde uma pessoa de verdade, no mesmo dia, e ela vai dizer se um passeio mais barato serve melhor para você.',
    ctaBoton: 'Perguntar no WhatsApp',
    ctaMensaje: 'Olá! Tenho uma dúvida sobre os preços dos passeios a San Blas.',
  },
};
