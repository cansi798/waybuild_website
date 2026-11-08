// Branchen-Landingpages: /website-fuer/<slug>/
// Jede Seite rankt auf "Website für <Branche>" und führt zu Website as a Service (drei feste Monatspakete Basis/Plus/Komplett,
// Daten in pakete-abo.ts). `merkmale` = Leistungs-ids aus pakete-abo.ts, die der PreisBlock mit „ab Paket …“ zeigt.
import type { IconName } from './site';

export type Branche = {
  slug: string;
  /** "Handwerker" → "Website für Handwerker" */
  name: string;
  /** Kurzname für Navigation/Marquee */
  label: string;
  title: string;
  description: string;
  claim: string;
  /** 3 typische Probleme – kurz */
  pains: string[];
  /** Was die Website für diese Branche konkret kann */
  features: { icon: IconName; title: string; text: string }[];
  /** Worauf es bei dieser Branche ankommt (ein Satz) */
  fokus: string;
  faqs: { q: string; a: string }[];
  /** Für diese Branche wichtige Paket-Leistungen (ids aus pakete-abo.ts) */
  merkmale: string[];
};

export const branchen: Branche[] = [
  {
    slug: 'handwerker',
    merkmale: ['website', 'google-profil', 'seo'],
    name: 'Handwerker',
    label: 'Handwerk',
    title: 'Website für Handwerker mit Betreuung',
    description: 'Website für Handwerksbetriebe als Service: individuell, mobil, lokal bei Google gefunden. Mit Anfrageformular, Hosting & Betreuung. Meist in 14 Tagen online.',
    claim: 'Mehr Aufträge aus der Region, und um die Technik kümmern wir uns.',
    pains: ['Keine Zeit für die Website', 'Kunden finden Sie nicht bei Google', 'Veraltete Seite schreckt ab'],
    features: [
      { icon: 'search', title: 'Lokal gefunden', text: 'Wer „Elektriker in [Ihre Stadt]“ sucht, soll Sie finden. Wir optimieren für Suchen in Ihrem Einzugsgebiet, inklusive Google-Unternehmensprofil.' },
      { icon: 'chat', title: 'Anfragen mit Fotos', text: 'Kunden beschreiben ihr Projekt direkt im Formular, und Sie haben alle Infos für ein schnelles Angebot.' },
      { icon: 'pen', title: 'Referenzen zeigen', text: 'Eine Galerie Ihrer Projekte zeigt, wie Sie arbeiten. Im Handwerk schafft nichts schneller Vertrauen.' },
    ],
    fokus: 'Lokales SEO und Anfrageformulare sind für Handwerksbetriebe entscheidend.',
    faqs: [
      { q: 'Kann ich neue Projektfotos selbst hochladen?', a: 'Schicken Sie uns die Fotos einfach per E-Mail oder WhatsApp. Wir stellen sie im Rahmen der laufenden Betreuung online.' },
      { q: 'Werde ich in meiner Stadt bei Google gefunden?', a: 'Wir optimieren gezielt für Ihre Region und richten Ihr Google-Unternehmensprofil ein. Garantierte Platzierungen kann seriös niemand versprechen. Die Grundlagen setzen wir aber vollständig um.' },
      { q: 'Brauche ich einen Online-Shop?', a: 'Meist nicht. Für Handwerker zählt die Anfrage, deshalb setzen wir auf klare Kontaktwege und verzichten auf einen Warenkorb.' },
    ],
  },
  {
    slug: 'arztpraxen',
    merkmale: ['website', 'termin'],
    name: 'Arztpraxen',
    label: 'Arztpraxen',
    title: 'Website für Arztpraxen mit Betreuung',
    description: 'Praxis-Website als Service: Öffnungszeiten, Leistungen, Online-Terminbuchung, barrierearm und DSGVO-freundlich. Hosting & Betreuung inklusive.',
    claim: 'Weniger Anrufe am Empfang, mehr Zeit für Patienten.',
    pains: ['Telefon steht nicht still', 'Öffnungszeiten sind veraltet', 'Datenschutz verunsichert'],
    features: [
      { icon: 'calendar', title: 'Termine online', text: 'Anbindung an gängige Terminbuchungssysteme. Patienten buchen rund um die Uhr, und das Telefon klingelt seltener.' },
      { icon: 'shield', title: 'Datenschutz im Blick', text: 'Kein Tracking, keine Cookies, Server in Deutschland. Für Kontaktformulare mit Gesundheitsdaten beraten wir Sie zur sicheren Lösung.' },
      { icon: 'gauge', title: 'Barrierearm', text: 'Gut lesbar, groß genug und mit der Tastatur bedienbar, damit Patienten jeden Alters zurechtkommen.' },
    ],
    fokus: 'Eine Praxis-Website braucht Leistungsseiten, Terminformulare und lokales SEO.',
    faqs: [
      { q: 'Können Patienten online Termine buchen?', a: 'Ja. Wir binden ein Terminbuchungssystem an oder verlinken Ihr bestehendes System. Ob der Anbieter dafür Kosten berechnet, klären wir vorher mit Ihnen.' },
      { q: 'Ist die Website datenschutzkonform?', a: 'Die Website selbst kommt ohne Tracking und Cookies aus, die Server stehen in Deutschland. Die Datenschutzerklärung erstellen Sie bzw. Ihr Datenschutzbeauftragter. Wir liefern alle technischen Angaben dafür.' },
      { q: 'Muss ich Praxisfotos selbst machen?', a: 'Nein. Auf Wunsch organisieren wir ein Foto-Shooting vor Ort (auf Anfrage).' },
    ],
  },
  {
    slug: 'gastronomie',
    merkmale: ['website', 'google-profil', 'sprache'],
    name: 'Restaurants & Cafés',
    label: 'Gastronomie',
    title: 'Website für Restaurants & Cafés',
    description: 'Restaurant-Website als Service: Speisekarte, Öffnungszeiten und Reservierung, schnell auf dem Handy. Hosting, Domain & Betreuung inklusive.',
    claim: 'Hungrige Gäste entscheiden in Sekunden, meistens auf dem Handy.',
    pains: ['Speisekarte nur als PDF', 'Seite lädt ewig auf dem Handy', 'Reservierungen nur per Telefon'],
    features: [
      { icon: 'gauge', title: 'Schnell auf dem Handy', text: 'Die meisten Gäste suchen unterwegs. Ihre Seite lädt in unter einer Sekunde, auch bei schwachem Netz.' },
      { icon: 'pen', title: 'Speisekarte als Seite', text: 'Ihre Karte steht als lesbare Seite im Netz statt als PDF, so versteht sie auch Google. Für Änderungen genügt eine kurze Nachricht an uns.' },
      { icon: 'calendar', title: 'Tisch reservieren', text: 'Reservierungsformular oder Anbindung an Ihr bestehendes System.' },
    ],
    fokus: 'Startseite, Speisekarte, Reservierung und Anfahrt: kurz, klar und fürs Handy gebaut.',
    faqs: [
      { q: 'Wie oft kann ich die Speisekarte ändern?', a: 'So oft Sie möchten. Änderungen gehören zur laufenden Betreuung. Tageskarten lassen sich auch als einfache Liste pflegen.' },
      { q: 'Kann ich meine Seite mit Google Maps verknüpfen?', a: 'Ja. Wir richten das Google-Unternehmensprofil so ein, dass Öffnungszeiten, Website und Reservierung zusammenpassen.' },
      { q: 'Gibt es Online-Bestellungen?', a: 'Eine Verlinkung zu Lieferdiensten ist inklusive. Eigene Bestellsysteme bieten wir auf Anfrage an.' },
    ],
  },
  {
    slug: 'kanzleien',
    merkmale: ['website', 'seo'],
    name: 'Kanzleien & Steuerberater',
    label: 'Kanzleien',
    title: 'Website für Kanzleien & Steuerberater',
    description: 'Seriöse Kanzlei-Website als Service: Rechtsgebiete, Team, Mandantenanfrage. Individuell, schnell, ohne Cookie-Banner. Fester Monatspreis.',
    claim: 'Ein seriöser, klarer Auftritt, dem Mandanten vom ersten Klick an vertrauen.',
    pains: ['Website wirkt austauschbar', 'Mandanten finden nicht das Rechtsgebiet', 'Pflichtangaben sind unübersichtlich'],
    features: [
      { icon: 'pen', title: 'Individuelles Design', text: 'Kein Standard-Template, das zehn andere Kanzleien in Ihrer Stadt auch nutzen.' },
      { icon: 'search', title: 'Rechtsgebiete, die ranken', text: 'Eigene Seiten je Rechtsgebiet oder Leistung. So werden Sie für konkrete Suchanfragen gefunden.' },
      { icon: 'chat', title: 'Strukturierte Anfrage', text: 'Mandanten schildern ihr Anliegen vorab, und Sie können das Erstgespräch gezielt vorbereiten.' },
    ],
    fokus: 'Seiten für jedes Rechtsgebiet, das Team und lokales SEO schaffen Vertrauen ab dem ersten Klick.',
    faqs: [
      { q: 'Kümmern Sie sich um die berufsrechtlichen Pflichtangaben?', a: 'Wir setzen alle Angaben technisch sauber um. Den Inhalt (z. B. Kammer, Berufsbezeichnung) liefern Sie, die rechtliche Verantwortung bleibt bei der Kanzlei.' },
      { q: 'Können wir Fachartikel veröffentlichen?', a: 'Ja, ein News- bzw. Blogbereich lässt sich einrichten. Das klären wir in der Beratung.' },
      { q: 'Gibt es eine englische Version?', a: 'Auf Wunsch. Was eine zweite Sprache umfasst, besprechen wir vorher mit Ihnen.' },
    ],
  },
  {
    slug: 'immobilienmakler',
    merkmale: ['website', 'google-profil', 'bericht'],
    name: 'Immobilienmakler',
    label: 'Immobilien',
    title: 'Website für Immobilienmakler mit Betreuung',
    description: 'Makler-Website als Service: Objekte präsentieren, Eigentümer gewinnen, lokal gefunden werden. Individuell, schnell, inkl. Hosting & Betreuung.',
    claim: 'Eigentümer gewinnen, nicht nur Objekte zeigen.',
    pains: ['Portale kosten viel Geld', 'Eigentümer finden Sie nicht', 'Seite sieht aus wie jede andere'],
    features: [
      { icon: 'search', title: 'Lokal sichtbar', text: 'Für „Immobilienmakler [Stadt]“ gefunden werden, also dort, wo Eigentümer suchen.' },
      { icon: 'chat', title: 'Bewertungsanfrage', text: 'Das Formular „Was ist meine Immobilie wert?“ ist für Makler der wichtigste Weg zu neuen Anfragen.' },
      { icon: 'rocket', title: 'Objekte im Fokus', text: 'Große Bilder, schnelle Ladezeit, klare Exposé-Anfrage.' },
    ],
    fokus: 'Eigentümer-Akquise und lokale Sichtbarkeit entscheiden im umkämpften Makler-Markt.',
    faqs: [
      { q: 'Können Objekte aus meiner Maklersoftware angezeigt werden?', a: 'Viele Maklerprogramme bieten Schnittstellen oder Einbettungen. Wir prüfen im Erstgespräch, was mit Ihrer Software möglich ist.' },
      { q: 'Wie schnell sind neue Objekte online?', a: 'In der Regel am nächsten Werktag, im Rahmen der laufenden Betreuung.' },
      { q: 'Lohnt sich eine eigene Website neben den Portalen?', a: 'Ja, vor allem, um Eigentümer zu gewinnen. Portale zeigen Objekte, Ihre Website verkauft Ihre Maklerleistung.' },
    ],
  },
  {
    slug: 'friseure-kosmetik',
    merkmale: ['website', 'termin', 'google-profil'],
    name: 'Friseure & Kosmetikstudios',
    label: 'Beauty & Friseur',
    title: 'Website für Friseure & Kosmetikstudios',
    description: 'Salon-Website als Service: Leistungen, Preise und Online-Termine, modern und fürs Handy. Hosting, Domain & Betreuung inklusive, fester Monatspreis.',
    claim: 'Ihr Salon, so schön online wie vor Ort.',
    pains: ['Termine nur per Telefon', 'Preise sind nirgends zu finden', 'Instagram allein reicht nicht'],
    features: [
      { icon: 'calendar', title: 'Online-Termine', text: 'Anbindung an Ihr Buchungssystem. Kundinnen und Kunden buchen auch nach Feierabend.' },
      { icon: 'pen', title: 'Preisliste & Leistungen', text: 'Übersichtlich, immer aktuell, ohne PDF.' },
      { icon: 'search', title: 'Bei Google & Maps', text: 'Gefunden werden, wenn jemand „Friseur in der Nähe“ sucht.' },
    ],
    fokus: 'Leistungen, Preise, Team, Termin und Anfahrt, übersichtlich auf dem Handy.',
    faqs: [
      { q: 'Kann ich Instagram-Bilder einbinden?', a: 'Wir verlinken Ihr Profil prominent. Eingebettete Feeds laden Inhalte von Drittanbietern. Das bremst die Seite und erfordert Einwilligungen, deshalb raten wir meist davon ab.' },
      { q: 'Funktioniert die Seite mit meinem Buchungssystem?', a: 'Die gängigen Systeme lassen sich verlinken oder einbinden. Wir prüfen das im Erstgespräch.' },
      { q: 'Wie ändere ich Preise?', a: 'Eine kurze Nachricht an uns genügt. Wir aktualisieren die Preisliste im Rahmen der laufenden Betreuung.' },
    ],
  },
];
