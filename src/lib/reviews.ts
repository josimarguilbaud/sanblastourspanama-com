import type { Locale } from '../i18n/ui';

/**
 * Las 20 opiniones reales de viajeros que ya fueron.
 *
 * ── De dónde salen ────────────────────────────────────────────────────────
 * El dueño entregó 60 opiniones de clientes de verdad. Hasta el 03/09/2026 se
 * repartían 30 y 30 entre las dos webs hermanas y **esta se quedó con cero**,
 * siendo la que más tráfico orgánico tiene de las tres: ni una reseña, ni
 * `aggregateRating`, ni una cita con nombre. Cero prueba social en la web que
 * más gente visita.
 *
 * No se copiaron: se **mudaron**. El mismo texto en dos dominios del mismo
 * dueño es duplicación, que es justo lo que se acababa de eliminar entre las
 * hermanas. Ahora son 18 en sanblasfull, 22 en sanblastourspty y 20 aquí.
 *
 * ── Por qué estas veinte ──────────────────────────────────────────────────
 * Por lo que dicen, no por reparto aritmético. Esta web es la guía del
 * destino, así que se lleva las que hablan **del sitio, de la cultura Guna y
 * de la naturaleza**. Las hermanas conservan las suyas: sanblasfull la
 * mecánica del día (el madrugón, la piscina natural, los traslados, el
 * snorkel) y sanblastourspty la vida de dormir en la isla y navegar. Por eso
 * salieron 12 de una y 8 de la otra: el reparto sigue al texto.
 *
 * ── ⚠️ Sin estrellas, y es deliberado ─────────────────────────────────────
 * No consta qué puntuación puso cada viajero ni por qué vía llegó su texto.
 * Poner «5★ en Google» sobre un testimonio del que no sabemos eso es
 * inventarse el dato, así que ningún `Review` declara `reviewRating`. Si algún
 * día se confirman las puntuaciones, se añaden aquí y en el JSON-LD.
 *
 * El `aggregateRating` de 4,9 sobre 2.000 SÍ es real —sale de Google y
 * TripAdvisor, confirmado por el dueño— y por eso convive con estas veinte sin
 * contradecirlas: el agregado y los `Review` sueltos son cosas distintas.
 *
 * ⚠️ El italiano se perdió en la mudanza: esta web sirve 5 idiomas y las
 * hermanas 6. Si algún día se añade `it`, los textos están en el histórico de
 * git de las hermanas.
 */
export interface Review {
  id: string;
  /** Código de país de dos letras. No se traduce. */
  cc: string;
  /** Nombre de pila. No se traduce. */
  name: string;
  text: Record<Locale, string>;
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    cc: 'FR',
    name: 'Sophie',
    text: {
      "en": "I wanted a destination without big hotel chains and San Blas exceeded my expectations. Guna culture is fascinating; they explained their molas and traditions to us without it feeling like a staged tourist attraction. Do bring repellent and small bills, because there are no ATMs and cards are not accepted.",
      "es": "Buscaba un destino sin grandes cadenas hoteleras y San Blas superó mis expectativas. La cultura Guna es fascinante; nos explicaron sobre sus molas y tradiciones sin sentirse como una atracción turística armada. Eso sí: lleven repelente y dinero en efectivo chico porque no hay cajeros ni aceptan tarjetas.",
      "de": "Ich suchte ein Ziel ohne große Hotelketten, und San Blas hat meine Erwartungen übertroffen. Die Guna-Kultur ist faszinierend; man hat uns ihre Molas und Traditionen erklärt, ohne dass es wie eine inszenierte Touristenattraktion wirkte. Aber: Nehmt Mückenschutz und kleine Scheine mit, denn es gibt keine Geldautomaten und Karten werden nicht akzeptiert.",
      "fr": "Je cherchais une destination sans grandes chaînes hôtelières et San Blas a dépassé mes attentes. La culture guna est fascinante ; on nous a expliqué leurs molas et leurs traditions sans que cela ressemble à une attraction touristique montée de toutes pièces. Prévoyez du répulsif et des petites coupures : il n’y a pas de distributeurs et les cartes ne passent pas.",
      "pt-br": "Procurava um destino sem grandes redes hoteleiras e San Blas superou minhas expectativas. A cultura guna é fascinante; explicaram sobre suas molas e tradições sem parecer uma atração turística montada. Mas atenção: levem repelente e dinheiro trocado, porque não há caixas eletrônicos nem aceitam cartão.",
    },
  },
  {
    id: 'r2',
    cc: 'JP',
    name: 'Yuki',
    text: {
      "en": "A postcard landscape at every turn. The sand is so white and fine that it does not burn your feet. I was amazed watching the local children paddle their traditional canoes so skilfully. Very peaceful and memorable.",
      "es": "Paisaje de postal en cada rincón. La arena es tan blanca y fina que no quema los pies. Me sorprendió ver cómo los niños locales reman en sus canoas tradicionales con tanta destreza. Muy pacífico y memorable.",
      "de": "An jeder Ecke eine Postkartenlandschaft. Der Sand ist so weiß und fein, dass er die Füße nicht verbrennt. Es hat mich beeindruckt, wie geschickt die Kinder aus dem Dorf ihre traditionellen Kanus paddeln. Sehr friedlich und unvergesslich.",
      "fr": "Un paysage de carte postale à chaque recoin. Le sable est si blanc et si fin qu’il ne brûle pas les pieds. J’ai été surprise de voir les enfants du village pagayer dans leurs pirogues traditionnelles avec autant d’adresse. Très paisible et mémorable.",
      "pt-br": "Paisagem de cartão-postal em cada canto. A areia é tão branca e fina que não queima os pés. Me surpreendeu ver como as crianças locais remam em suas canoas tradicionais com tanta destreza. Muito pacífico e memorável.",
    },
  },
  {
    id: 'r3',
    cc: 'EC',
    name: 'Andrés',
    text: {
      "en": "For me it was essential to understand beforehand that you are entering autonomous Indigenous territory and that they set the rules. Respect their customs and their space and the experience is warm and enriching.",
      "es": "Para mí fue vital entender de antemano que vas a territorio indígena autónomo y que las reglas las ponen ellos. Respetando sus costumbres y su espacio, la convivencia es súper grata y enriquecedora.",
      "de": "Für mich war es entscheidend, vorher zu verstehen, dass man autonomes indigenes Gebiet betritt und dass sie die Regeln festlegen. Wer ihre Bräuche und ihren Raum respektiert, erlebt ein sehr herzliches und bereicherndes Miteinander.",
      "fr": "Pour moi, il était essentiel de comprendre d’avance qu’on entre sur un territoire indigène autonome et que ce sont eux qui fixent les règles. En respectant leurs coutumes et leur espace, la cohabitation est très agréable et enrichissante.",
      "pt-br": "Para mim foi essencial entender de antemão que você entra em território indígena autônomo e que as regras são deles. Respeitando seus costumes e seu espaço, a convivência é muito agradável e enriquecedora.",
    },
  },
  {
    id: 'r4',
    cc: 'PL',
    name: 'Marta',
    text: {
      "en": "Incredible marine life. I saw three eagle rays swimming together two metres from the shore. The best move is to bring almost no luggage: a swimsuit, two T-shirts, a microfibre towel and you are set.",
      "es": "Increíble biodiversidad marina. Vi tres rayas águila nadando juntas a dos metros de la orilla. Lo mejor es no llevar casi equipaje: un bañador, dos camisetas, una toalla de microfibra y estás listo.",
      "de": "Unglaubliche Artenvielfalt im Meer. Ich habe drei Adlerrochen zusammen zwei Meter vom Ufer entfernt schwimmen sehen. Am besten nimmt man fast kein Gepäck mit: Badehose, zwei T-Shirts, ein Mikrofasertuch, fertig.",
      "fr": "Biodiversité marine incroyable. J’ai vu trois raies aigles nager ensemble à deux mètres du rivage. Le mieux est de n’emporter presque rien : un maillot, deux tee-shirts, une serviette en microfibre et c’est réglé.",
      "pt-br": "Biodiversidade marinha incrível. Vi três raias-águia nadando juntas a dois metros da margem. O melhor é levar quase nada: uma sunga, duas camisetas, uma toalha de microfibra e está pronto.",
    },
  },
  {
    id: 'r5',
    cc: 'GT',
    name: 'Esteban',
    text: {
      "en": "I loved the autonomy and the dignity with which the Guna people run their comarca. You can tell they look after their land and do not let the big hotel companies wreck their ecosystem. Very inspiring.",
      "es": "Me encantó la autonomía y la dignidad con la que el pueblo Guna maneja su comarca. Se nota que cuidan su tierra y no permiten que las grandes empresas hoteleras arruinen su ecosistema. Muy inspirador.",
      "de": "Mich hat beeindruckt, mit welcher Eigenständigkeit und Würde das Guna-Volk seine Comarca verwaltet. Man merkt, dass sie ihr Land schützen und den großen Hotelkonzernen nicht erlauben, ihr Ökosystem zu zerstören. Sehr inspirierend.",
      "fr": "J’ai adoré l’autonomie et la dignité avec lesquelles le peuple guna gère sa comarca. On voit qu’ils prennent soin de leur terre et n’autorisent pas les grands groupes hôteliers à ruiner leur écosystème. Très inspirant.",
      "pt-br": "Adorei a autonomia e a dignidade com que o povo guna administra sua comarca. Dá para ver que cuidam da sua terra e não deixam as grandes empresas hoteleiras arruinarem seu ecossistema. Muito inspirador.",
    },
  },
  {
    id: 'r6',
    cc: 'PT',
    name: 'Clara',
    text: {
      "en": "I bought two handmade molas straight from a local artisan; watching the patience with which they sew layer after layer of fabric makes you value their culture. It is a purchase that genuinely supports their families.",
      "es": "Compré dos molas hechas a mano directamente a una artesana local; ver la paciencia con la que cosen capa por capa de tela te hace valorar mucho su cultura. Es una compra que realmente apoya a sus familias.",
      "de": "Ich habe zwei handgefertigte Molas direkt bei einer einheimischen Kunsthandwerkerin gekauft; die Geduld zu sehen, mit der sie Stofflage für Stofflage nähen, lässt einen ihre Kultur sehr schätzen. Ein Kauf, der ihre Familien wirklich unterstützt.",
      "fr": "J’ai acheté deux molas faites main directement à une artisane locale ; voir la patience avec laquelle elles cousent couche après couche de tissu fait vraiment apprécier leur culture. C’est un achat qui soutient réellement leurs familles.",
      "pt-br": "Comprei duas molas feitas à mão diretamente de uma artesã local; ver a paciência com que costuram camada por camada de tecido faz você valorizar muito a cultura delas. É uma compra que realmente apoia suas famílias.",
    },
  },
  {
    id: 'r7',
    cc: 'DO',
    name: 'Alejandro',
    text: {
      "en": "Coming from the Caribbean I thought I would not be that impressed, but the density of tiny palm trees on scraps of sand in the middle of nowhere is unique. San Blas has a wild charm you find nowhere else.",
      "es": "Viniendo del Caribe pensé que no me iba a impresionar tanto, pero la densidad de palmeras diminutas sobre pedacitos de arena en medio de la nada es única. San Blas tiene un encanto salvaje irrepetible.",
      "de": "Da ich aus der Karibik komme, dachte ich, es würde mich nicht so beeindrucken, aber die Dichte winziger Palmen auf Sandflecken mitten im Nirgendwo ist einzigartig. San Blas hat einen wilden Reiz, den es sonst nirgends gibt.",
      "fr": "Venant des Caraïbes, je pensais ne pas être si impressionné, mais la densité de minuscules palmiers sur des bouts de sable au milieu de nulle part est unique. San Blas a un charme sauvage qu’on ne retrouve nulle part ailleurs.",
      "pt-br": "Vindo do Caribe, achei que não fosse me impressionar tanto, mas a densidade de palmeiras minúsculas sobre pedacinhos de areia no meio do nada é única. San Blas tem um encanto selvagem irrepetível.",
    },
  },
  {
    id: 'r8',
    cc: 'MX',
    name: 'Renata',
    text: {
      "en": "I loved that there was no loud, blaring music like on other Caribbean beaches. It is an atmosphere of complete rest, where people go to read, swim and look at the horizon.",
      "es": "Me encantó que no hubiera música estridente a todo volumen como pasa en otras playas del Caribe. Es un ambiente de descanso absoluto donde la gente va a leer, nadar y contemplar el horizonte.",
      "de": "Mir hat gefallen, dass es keine dröhnende Musik gibt wie an anderen Karibikstränden. Es ist eine Atmosphäre völliger Ruhe, in der die Leute lesen, schwimmen und den Horizont betrachten.",
      "fr": "J’ai adoré qu’il n’y ait pas de musique assourdissante à plein volume comme sur d’autres plages des Caraïbes. C’est une ambiance de repos absolu, où les gens viennent lire, nager et contempler l’horizon.",
      "pt-br": "Adorei que não houvesse música estridente a todo volume como acontece em outras praias do Caribe. É um ambiente de descanso absoluto, onde as pessoas vão para ler, nadar e contemplar o horizonte.",
    },
  },
  {
    id: 'r9',
    cc: 'IE',
    name: 'Liam',
    text: {
      "en": "The contrast between the Caribbean heat and the cool shade of the coconut palms is the best refuge there is. Drinking coconut water straight from a nut a local had just brought down was pure bliss.",
      "es": "El contraste del calor caribeño con la sombra fresca de los cocoteros es el mejor refugio. Tomarse un agua de pipa (coco fresco) recién bajado de la palmera por un lugareño fue la gloria.",
      "de": "Der Kontrast zwischen der karibischen Hitze und dem kühlen Schatten der Kokospalmen ist die beste Zuflucht. Kokoswasser aus einer Nuss zu trinken, die ein Einheimischer gerade heruntergeholt hatte, war ein Traum.",
      "fr": "Le contraste entre la chaleur des Caraïbes et l’ombre fraîche des cocotiers est le meilleur des refuges. Boire l’eau d’une noix de coco fraîche tout juste descendue du palmier par un habitant, c’était le bonheur.",
      "pt-br": "O contraste do calor caribenho com a sombra fresca dos coqueiros é o melhor refúgio. Tomar uma água de coco recém-tirada da palmeira por um morador local foi uma glória.",
    },
  },
  {
    id: 'r10',
    cc: 'HN',
    name: 'Silvia',
    text: {
      "en": "The kindness of the Guna women showing us how they weave their traditional dress was a beautiful cultural moment. They receive you shyly at first, but with great respect if you are respectful with them.",
      "es": "La amabilidad de las mujeres Guna al mostrarnos cómo tejen sus atuendos tradicionales fue un momento cultural bellísimo. Te reciben con timidez al inicio, pero con mucho respeto si tú eres respetuosa con ellas.",
      "de": "Die Freundlichkeit der Guna-Frauen, die uns zeigten, wie sie ihre traditionelle Kleidung weben, war ein wunderschöner kultureller Moment. Sie empfangen einen anfangs schüchtern, aber mit großem Respekt, wenn man ihnen respektvoll begegnet.",
      "fr": "La gentillesse des femmes gunas nous montrant comment elles tissent leurs tenues traditionnelles a été un très beau moment culturel. Elles vous accueillent timidement au début, mais avec beaucoup de respect si vous êtes respectueux avec elles.",
      "pt-br": "A gentileza das mulheres guna ao nos mostrar como tecem suas vestimentas tradicionais foi um momento cultural lindíssimo. Elas recebem com timidez no começo, mas com muito respeito se você for respeitoso com elas.",
    },
  },
  {
    id: 'r11',
    cc: 'PA',
    name: 'Alicia',
    text: {
      "en": "I am Panamanian and I was embarrassed not to have gone before. It is the most beautiful treasure we have in the country. Supporting the Guna community’s economy directly and seeing how they protect their surroundings filled me with pride.",
      "es": "Soy panameña y me daba vergüenza no haber ido antes. Es el tesoro más bonito que tenemos en el país. Apoyar la economía de la comunidad Guna directamente y ver cómo protegen su entorno me llenó de orgullo.",
      "de": "Ich bin Panamaerin und es war mir peinlich, nicht früher hingefahren zu sein. Es ist der schönste Schatz, den wir im Land haben. Die Wirtschaft der Guna-Gemeinschaft direkt zu unterstützen und zu sehen, wie sie ihre Umgebung schützen, hat mich mit Stolz erfüllt.",
      "fr": "Je suis panaméenne et j’avais honte de ne pas y être allée plus tôt. C’est le plus beau trésor que nous ayons dans le pays. Soutenir directement l’économie de la communauté guna et voir comment ils protègent leur environnement m’a remplie de fierté.",
      "pt-br": "Sou panamenha e tinha vergonha de não ter ido antes. É o tesouro mais bonito que temos no país. Apoiar a economia da comunidade guna diretamente e ver como protegem seu ambiente me encheu de orgulho.",
    },
  },
  {
    id: 'r12',
    cc: 'ES',
    name: 'Teresa',
    text: {
      "en": "I came back fascinated. It is one of the few places in the world that still keeps its soul without having been devoured by mass tourism. I hope they carry on looking after it exactly as it is for many years to come.",
      "es": "Volví fascinada. Es de los pocos lugares del mundo que todavía conservan su alma sin haber sido devorados por el turismo masivo. Ojalá lo sigan cuidando exactamente como está por muchos años más.",
      "de": "Ich kam fasziniert zurück. Es ist einer der wenigen Orte der Welt, die ihre Seele bewahrt haben, ohne vom Massentourismus verschlungen worden zu sein. Hoffentlich pflegen sie ihn noch viele Jahre genau so weiter.",
      "fr": "Je suis revenue fascinée. C’est l’un des rares endroits au monde à avoir gardé son âme sans avoir été dévoré par le tourisme de masse. J’espère qu’ils continueront à le préserver exactement tel quel pendant de longues années.",
      "pt-br": "Voltei fascinada. É um dos poucos lugares do mundo que ainda conservam sua alma sem terem sido devorados pelo turismo de massa. Tomara que continuem cuidando dele exatamente assim por muitos anos.",
    },
  },
  {
    id: 'r13',
    cc: 'SE',
    name: 'Lars',
    text: {
      "en": "After the Nordic winter, this place was the absolute cure. The simplicity of the lifestyle makes you rethink how many material things you actually need to be happy. A thatched cabin, a clean bed and the Caribbean in front of you.",
      "es": "Después del invierno nórdico, este lugar fue la cura absoluta. La simplicidad del estilo de vida te hace replantearte cuántas cosas materiales realmente necesitas para ser feliz. Una cabaña de paja, una cama limpia y el Caribe enfrente.",
      "de": "Nach dem nordischen Winter war dieser Ort die absolute Kur. Die Einfachheit des Lebensstils lässt einen überdenken, wie viele materielle Dinge man wirklich braucht, um glücklich zu sein. Eine Strohhütte, ein sauberes Bett und die Karibik davor.",
      "fr": "Après l’hiver nordique, cet endroit a été le remède absolu. La simplicité du mode de vie vous fait reconsidérer le nombre de choses matérielles dont vous avez réellement besoin pour être heureux. Une cabane de paille, un lit propre et les Caraïbes en face.",
      "pt-br": "Depois do inverno nórdico, este lugar foi a cura absoluta. A simplicidade do estilo de vida faz você repensar quantas coisas materiais realmente precisa para ser feliz. Uma cabana de palha, uma cama limpa e o Caribe na frente.",
    },
  },
  {
    id: 'r14',
    cc: 'BR',
    name: 'Felipe',
    text: {
      "en": "Incredible energy in this place. The water is warm and clear, like an infinity pool. We spent the evening talking with other travellers around the fire. It is a very human experience, far from traditional mass tourism.",
      "es": "Energía increíble en este lugar. El agua es tibia y transparente, parece una piscina infinita. Nos quedamos conversando con otros viajeros junto a la fogata por la noche. Es una experiencia muy humana y lejos del turismo de masas tradicional.",
      "de": "Unglaubliche Energie an diesem Ort. Das Wasser ist warm und klar, wie ein Infinity-Pool. Wir haben den Abend am Feuer mit anderen Reisenden verbracht. Eine sehr menschliche Erfahrung, fern vom klassischen Massentourismus.",
      "fr": "Une énergie incroyable dans cet endroit. L’eau est tiède et transparente, on dirait une piscine à débordement. Nous avons passé la soirée à discuter avec d’autres voyageurs autour du feu. C’est une expérience très humaine, loin du tourisme de masse traditionnel.",
      "pt-br": "Energia incrível nesse lugar. A água é morna e transparente, parece uma piscina infinita. Ficamos conversando com outros viajantes na fogueira à noite. É uma experiência muito humana e longe do turismo de massa tradicional.",
    },
  },
  {
    id: 'r15',
    cc: 'UY',
    name: 'Laura',
    text: {
      "en": "What I take away most is the forced digital detox. At first you check your phone out of habit, but within a few hours you forget about social media and start really talking to the other travellers.",
      "es": "Lo que más rescato es la desintoxicación digital obligatoria. Al principio revisas el celular por inercia, pero a las pocas horas te olvidas de las redes sociales y empiezas a conversar de verdad con los demás viajeros.",
      "de": "Was mir am meisten geblieben ist, ist der erzwungene digitale Entzug. Anfangs schaut man aus Gewohnheit aufs Handy, aber nach wenigen Stunden vergisst man die sozialen Netzwerke und fängt an, sich wirklich mit den anderen Reisenden zu unterhalten.",
      "fr": "Ce que je retiens le plus, c’est la détox numérique forcée. Au début, on regarde son téléphone par réflexe, mais au bout de quelques heures on oublie les réseaux sociaux et on commence à vraiment discuter avec les autres voyageurs.",
      "pt-br": "O que mais destaco é a desintoxicação digital obrigatória. No começo você olha o celular por inércia, mas em poucas horas esquece as redes sociais e começa a conversar de verdade com os outros viajantes.",
    },
  },
  {
    id: 'r16',
    cc: 'PY',
    name: 'Matías',
    text: {
      "en": "An experience that slows you down instantly. Life on the island runs on daylight: you wake at dawn and go to bed early. I came back to my routine completely renewed.",
      "es": "Una experiencia que te baja las revoluciones al instante. La vida en la isla se rige por la luz del sol: te despiertas al amanecer y te vas a dormir temprano. Regresé a la rutina completamente renovado.",
      "de": "Eine Erfahrung, die einen sofort herunterfahren lässt. Das Leben auf der Insel richtet sich nach dem Tageslicht: Man wacht bei Sonnenaufgang auf und geht früh schlafen. Ich kam vollkommen erneuert in den Alltag zurück.",
      "fr": "Une expérience qui vous fait baisser le rythme instantanément. La vie sur l’île suit la lumière du jour : on se réveille à l’aube et on se couche tôt. Je suis rentré à ma routine complètement ressourcé.",
      "pt-br": "Uma experiência que baixa suas rotações na hora. A vida na ilha se guia pela luz do sol: você acorda ao amanhecer e vai dormir cedo. Voltei à rotina completamente renovado.",
    },
  },
  {
    id: 'r17',
    cc: 'BO',
    name: 'Noemí',
    text: {
      "en": "For someone like me who lives far from the sea, that expanse of clear water was overwhelming. Walking barefoot on the soft sand all day without a care gave me my energy back.",
      "es": "Para mí que vivo lejos del mar, ver esa inmensidad de agua transparente fue impactante. Caminar descalza por la arena suave todo el día sin preocuparme por nada me devolvió la energía vital.",
      "de": "Für mich, die weit vom Meer entfernt lebt, war diese Weite aus klarem Wasser überwältigend. Den ganzen Tag barfuß über den weichen Sand zu laufen, ohne mich um etwas zu sorgen, hat mir meine Energie zurückgegeben.",
      "fr": "Pour moi qui vis loin de la mer, voir cette immensité d’eau transparente a été bouleversant. Marcher pieds nus sur le sable doux toute la journée sans me soucier de rien m’a redonné toute mon énergie.",
      "pt-br": "Para mim, que moro longe do mar, ver aquela imensidão de água transparente foi impactante. Caminhar descalça pela areia macia o dia todo sem me preocupar com nada me devolveu a energia.",
    },
  },
  {
    id: 'r18',
    cc: 'FI',
    name: 'Helena',
    text: {
      "en": "Swimming in that 28-degree sea while it was snowing back home was the greatest pleasure imaginable. The food, simple but fresh, hit the spot every single day. An untouched earthly paradise.",
      "es": "Bañarse en ese mar a 28 grados mientras en mi país nevaba fue el mayor placer posible. La comida sencilla pero fresca cayó perfecto todos los días. Un paraíso terrenal intacto.",
      "de": "In diesem 28 Grad warmen Meer zu baden, während es zu Hause schneite, war der größte denkbare Genuss. Das Essen, einfach aber frisch, passte jeden Tag perfekt. Ein unberührtes Paradies auf Erden.",
      "fr": "Me baigner dans cette mer à 28 degrés pendant qu’il neigeait chez moi a été le plus grand plaisir possible. La nourriture, simple mais fraîche, tombait à point tous les jours. Un paradis terrestre intact.",
      "pt-br": "Tomar banho naquele mar a 28 graus enquanto no meu país nevava foi o maior prazer possível. A comida, simples mas fresca, caiu perfeita todos os dias. Um paraíso terrestre intacto.",
    },
  },
  {
    id: 'r19',
    cc: 'CL',
    name: 'Manuel',
    text: {
      "en": "The trip out to the farthest islands lets you feel like a lone castaway for a few hours. Walking along a spit of white sand that disappears at high tide is completely mad.",
      "es": "La excursión a las islas más lejanas te permite sentirte como un náufrago solitario por unas horas. Caminar por una lengua de arena blanca que desaparece con la marea alta es una locura total.",
      "de": "Der Ausflug zu den entferntesten Inseln lässt einen sich für ein paar Stunden wie ein einsamer Schiffbrüchiger fühlen. Über eine weiße Sandzunge zu laufen, die bei Flut verschwindet, ist völlig verrückt.",
      "fr": "L’excursion vers les îles les plus lointaines vous permet de vous sentir naufragé solitaire pendant quelques heures. Marcher sur une langue de sable blanc qui disparaît à marée haute, c’est complètement fou.",
      "pt-br": "A excursão às ilhas mais distantes permite que você se sinta um náufrago solitário por algumas horas. Caminhar por uma faixa de areia branca que desaparece com a maré alta é uma loucura total.",
    },
  },
  {
    id: 'r20',
    cc: 'PE',
    name: 'Fernando',
    text: {
      "en": "We were treated to an incredible pink sunset over a calm sea. Our hosts’ hospitality was humble but genuine; they make you feel you are sharing their living space, not consuming a commercial package.",
      "es": "Nos tocó un atardecer rosado increíble sobre el mar calmo. La hospitalidad de los anfitriones fue humilde pero genuina; te hacen sentir que estás compartiendo su espacio vital y no consumiendo un paquete comercial.",
      "de": "Uns erwartete ein unglaublicher rosafarbener Sonnenuntergang über ruhiger See. Die Gastfreundschaft unserer Gastgeber war bescheiden, aber echt; man hat das Gefühl, ihren Lebensraum zu teilen, statt ein kommerzielles Paket zu konsumieren.",
      "fr": "Nous avons eu droit à un incroyable coucher de soleil rose sur une mer calme. L’hospitalité de nos hôtes était humble mais sincère ; ils vous donnent le sentiment de partager leur espace de vie, pas de consommer un forfait commercial.",
      "pt-br": "Tivemos um pôr do sol rosado incrível sobre o mar calmo. A hospitalidade dos anfitriões foi humilde, mas genuína; fazem você sentir que está compartilhando o espaço de vida deles e não consumindo um pacote comercial.",
    },
  },
];

/**
 * El agregado que el dueño confirmó como real el 02/09/2026: sale de las
 * valoraciones de Google y TripAdvisor, no de estas veinte.
 *
 * ⚠️ Solo se declara en páginas que MUESTRAN reseñas. Un `aggregateRating` sin
 * reseñas visibles en la misma página es lo que Google marca como incumplimiento
 * — y es exactamente el fallo que tenía la portada de sanblastourspty.
 */
export const AGGREGATE = { ratingValue: '4.9', reviewCount: '2000', bestRating: '5' };

/** El texto de una reseña en un idioma, con el inglés de respaldo. */
export function reviewText(r: Review, lang: string): string {
  return r.text[lang as Locale] ?? r.text.en;
}

/**
 * Las reseñas como `Review` de Schema.org, atadas al negocio.
 *
 * ⚠️ `itemReviewed` apunta al `@id` de la organización y NO repite el objeto:
 * Search Console avisó el 02/09/2026 de que las reseñas anidadas sin decir qué
 * reseñan no servían de nada.
 */
export function reviewsJsonLd(lang: string, siteUrl: string) {
  return REVIEWS.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewBody: reviewText(r, lang),
    itemReviewed: { '@id': `${siteUrl}/#organizacion` },
  }));
}
