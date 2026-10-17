// Branchen-Landingpages: /website-fuer/<slug>/
// Jede Seite rankt auf "Website für <Branche>" und führt zu Website as a Service (ein Angebot, keine Tarife).
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
};

export const branchen: Branche[] = [
  {
    slug: 'handwerker',
    name: 'Handwerker',
    label: 'Handwerk',
    title: 'Website für Handwerker – als Service',
    description: 'Website für Handwerksbetriebe als Service: individuell, mobil, lokal bei Google gefunden. Mit Anfrageformular, Hosting & Betreuung. Live in 14 Tagen.',
    claim: 'Mehr Aufträge aus der Region – ohne Technik-Stress.',
    pains: ['Keine Zeit für die Website', 'Kunden finden Sie nicht bei Google', 'Veraltete Seite schreckt ab'],
    features: [
      { icon: 'search', title: 'Lokal gefunden', text: '„Elektriker in [Ihre Stadt]“ – wir optimieren für die Suchen in Ihrem Einzugsgebiet, inkl. Google-Unternehmensprofil.' },
      { icon: 'chat', title: 'Anfragen mit Fotos', text: 'Kunden beschreiben ihr Projekt direkt im Formular – Sie bekommen alle Infos für ein schnelles Angebot.' },
      { icon: 'pen', title: 'Referenzen zeigen', text: 'Galerie Ihrer Projekte – der stärkste Vertrauensbeweis im Handwerk.' },
    ],
    fokus: 'Lokales SEO und Anfrageformulare sind für Handwerksbetriebe entscheidend.',
    faqs: [
      { q: 'Kann ich neue Projektfotos selbst hochladen?', a: 'Schicken Sie uns die Fotos einfach per E-Mail oder WhatsApp – wir stellen sie im Rahmen der laufenden Betreuung online.' },
      { q: 'Werde ich in meiner Stadt bei Google gefunden?', a: 'Wir optimieren gezielt für Ihre Region und richten Ihr Google-Unternehmensprofil ein. Garantierte Platzierungen kann seriös niemand versprechen – die Grundlagen setzen wir aber vollständig um.' },
      { q: 'Brauche ich einen Online-Shop?', a: 'Meist nicht. Für Handwerker zählt die Anfrage – deshalb setzen wir auf klare Kontaktwege statt Warenkorb.' },
    ],
  },
  {
    slug: 'arztpraxen',
    name: 'Arztpraxen',
    label: 'Arztpraxen',
    title: 'Website für Arztpraxen – als Service',
    description: 'Praxis-Website als Service: Öffnungszeiten, Leistungen, Online-Terminbuchung, barrierearm und DSGVO-freundlich. Hosting & Betreuung inklusive.',
    claim: 'Weniger Anrufe am Empfang. Mehr Zeit für Patienten.',
    pains: ['Telefon steht nicht still', 'Öffnungszeiten sind veraltet', 'Datenschutz verunsichert'],
    features: [
      { icon: 'calendar', title: 'Termine online', text: 'Anbindung an gängige Terminbuchungssysteme – Patienten buchen rund um die Uhr, das Telefon wird entlastet.' },
      { icon: 'shield', title: 'Datenschutz im Blick', text: 'Kein Tracking, keine Cookies, Server in Deutschland. Für Kontaktformulare mit Gesundheitsdaten beraten wir Sie zur sicheren Lösung.' },
      { icon: 'gauge', title: 'Barrierearm', text: 'Gut lesbar, groß genug, bedienbar mit Tastatur – wichtig für alle Altersgruppen.' },
    ],
    fokus: 'Leistungsseiten, Terminformulare und lokales SEO – das braucht eine Praxis-Website.',
    faqs: [
      { q: 'Können Patienten online Termine buchen?', a: 'Ja. Wir binden ein Terminbuchungssystem an oder verlinken Ihr bestehendes System. Ob dafür Kosten des Anbieters anfallen, klären wir vorab transparent.' },
      { q: 'Ist die Website datenschutzkonform?', a: 'Die Website selbst kommt ohne Tracking und Cookies aus, die Server stehen in Deutschland. Die Datenschutzerklärung erstellen Sie bzw. Ihr Datenschutzbeauftragter – wir liefern alle technischen Angaben dafür.' },
      { q: 'Muss ich Praxisfotos selbst machen?', a: 'Nein. Auf Wunsch organisieren wir ein Foto-Shooting vor Ort (auf Anfrage).' },
    ],
  },
  {
    slug: 'gastronomie',
    name: 'Restaurants & Cafés',
    label: 'Gastronomie',
    title: 'Website für Restaurants & Cafés – als Service',
    description: 'Restaurant-Website als Service: Speisekarte, Öffnungszeiten, Reservierung – blitzschnell auf dem Handy. Hosting, Domain & Betreuung inklusive.',
    claim: 'Hungrige Gäste entscheiden in Sekunden. Auf dem Handy.',
    pains: ['Speisekarte nur als PDF', 'Seite lädt ewig auf dem Handy', 'Reservierungen nur per Telefon'],
    features: [
      { icon: 'gauge', title: 'Blitzschnell mobil', text: 'Die meisten Gäste suchen unterwegs. Ihre Seite lädt in unter einer Sekunde – auch im schwachen Netz.' },
      { icon: 'pen', title: 'Speisekarte als Seite', text: 'Keine PDF-Datei, sondern eine echte, lesbare Karte – die auch Google versteht. Änderungen per kurzer Nachricht an uns.' },
      { icon: 'calendar', title: 'Tisch reservieren', text: 'Reservierungsformular oder Anbindung an Ihr bestehendes System.' },
    ],
    fokus: 'Startseite, Speisekarte, Reservierung, Anfahrt – kurz, klar und mobil.',
    faqs: [
      { q: 'Wie oft kann ich die Speisekarte ändern?', a: 'So oft Sie möchten – Änderungen gehören zur laufenden Betreuung. Tageskarten lassen sich auch als einfache Liste pflegen.' },
      { q: 'Kann ich meine Seite mit Google Maps verknüpfen?', a: 'Ja. Wir richten das Google-Unternehmensprofil so ein, dass Öffnungszeiten, Website und Reservierung zusammenpassen.' },
      { q: 'Gibt es Online-Bestellungen?', a: 'Eine Verlinkung zu Lieferdiensten ist inklusive. Eigene Bestellsysteme bieten wir auf Anfrage an.' },
    ],
  },
  {
    slug: 'kanzleien',
    name: 'Kanzleien & Steuerberater',
    label: 'Kanzleien',
    title: 'Website für Kanzleien & Steuerberater',
    description: 'Seriöse Kanzlei-Website als Service: Rechtsgebiete, Team, Mandantenanfrage. Individuell, schnell, ohne Cookie-Banner. Fester Monatspreis.',
    claim: 'Seriös. Klar. Vertrauen ab dem ersten Klick.',
    pains: ['Website wirkt austauschbar', 'Mandanten finden nicht das Rechtsgebiet', 'Pflichtangaben sind unübersichtlich'],
    features: [
      { icon: 'pen', title: 'Individuelles Design', text: 'Kein Standard-Template, das zehn andere Kanzleien in Ihrer Stadt auch nutzen.' },
      { icon: 'search', title: 'Rechtsgebiete, die ranken', text: 'Eigene Seiten je Rechtsgebiet oder Leistung – so werden Sie für konkrete Suchanfragen gefunden.' },
      { icon: 'chat', title: 'Strukturierte Anfrage', text: 'Mandanten schildern ihr Anliegen vorab – Sie können das Erstgespräch gezielt vorbereiten.' },
    ],
    fokus: 'Rechtsgebiets-Seiten, Team und lokales SEO – für Vertrauen ab dem ersten Klick.',
    faqs: [
      { q: 'Kümmern Sie sich um die berufsrechtlichen Pflichtangaben?', a: 'Wir setzen alle Angaben technisch sauber um. Den Inhalt (z. B. Kammer, Berufsbezeichnung) liefern Sie – die rechtliche Verantwortung bleibt bei der Kanzlei.' },
      { q: 'Können wir Fachartikel veröffentlichen?', a: 'Ja, ein News- bzw. Blogbereich lässt sich einrichten – das klären wir in der Beratung.' },
      { q: 'Gibt es eine englische Version?', a: 'Auf Wunsch. Eine zweite Sprache besprechen wir vorab transparent.' },
    ],
  },
  {
    slug: 'immobilienmakler',
    name: 'Immobilienmakler',
    label: 'Immobilien',
    title: 'Website für Immobilienmakler – als Service',
    description: 'Makler-Website als Service: Objekte präsentieren, Eigentümer gewinnen, lokal gefunden werden. Individuell, schnell, inkl. Hosting & Betreuung.',
    claim: 'Eigentümer gewinnen – nicht nur Objekte zeigen.',
    pains: ['Portale kosten viel Geld', 'Eigentümer finden Sie nicht', 'Seite sieht aus wie jede andere'],
    features: [
      { icon: 'search', title: 'Lokal sichtbar', text: 'Für „Immobilienmakler [Stadt]“ gefunden werden – dort, wo Eigentümer suchen.' },
      { icon: 'chat', title: 'Bewertungsanfrage', text: 'Formular „Was ist meine Immobilie wert?“ – der wichtigste Lead-Kanal für Makler.' },
      { icon: 'rocket', title: 'Objekte im Fokus', text: 'Große Bilder, schnelle Ladezeit, klare Exposé-Anfrage.' },
    ],
    fokus: 'Eigentümer-Akquise und lokale Sichtbarkeit entscheiden im umkämpften Makler-Markt.',
    faqs: [
      { q: 'Können Objekte aus meiner Maklersoftware angezeigt werden?', a: 'Viele Maklerprogramme bieten Schnittstellen oder Einbettungen. Wir prüfen im Erstgespräch, was mit Ihrer Software möglich ist.' },
      { q: 'Wie schnell sind neue Objekte online?', a: 'In der Regel am nächsten Werktag – im Rahmen der laufenden Betreuung.' },
      { q: 'Lohnt sich eine eigene Website neben den Portalen?', a: 'Ja – vor allem für die Eigentümer-Akquise. Portale zeigen Objekte, Ihre Website verkauft Ihre Maklerleistung.' },
    ],
  },
  {
    slug: 'friseure-kosmetik',
    name: 'Friseure & Kosmetikstudios',
    label: 'Beauty & Friseur',
    title: 'Website für Friseure & Kosmetik – als Service',
    description: 'Salon-Website als Service: Leistungen, Preise, Online-Termine – modern und mobil. Hosting, Domain & Betreuung inklusive. Fester Monatspreis.',
    claim: 'Ihr Salon, so schön online wie vor Ort.',
    pains: ['Termine nur per Telefon', 'Preise sind nirgends zu finden', 'Instagram allein reicht nicht'],
    features: [
      { icon: 'calendar', title: 'Online-Termine', text: 'Anbindung an Ihr Buchungssystem – Kundinnen und Kunden buchen auch nach Feierabend.' },
      { icon: 'pen', title: 'Preisliste & Leistungen', text: 'Übersichtlich, immer aktuell, ohne PDF.' },
      { icon: 'search', title: 'Bei Google & Maps', text: 'Gefunden werden, wenn jemand „Friseur in der Nähe“ sucht.' },
    ],
    fokus: 'Leistungen, Preise, Team, Termin und Anfahrt – übersichtlich auf dem Handy.',
    faqs: [
      { q: 'Kann ich Instagram-Bilder einbinden?', a: 'Wir verlinken Ihr Profil prominent. Eingebettete Feeds laden Drittanbieter-Inhalte – das bremst und erfordert Einwilligungen, deshalb raten wir meist davon ab.' },
      { q: 'Funktioniert die Seite mit meinem Buchungssystem?', a: 'Die gängigen Systeme lassen sich verlinken oder einbinden. Wir prüfen das im Erstgespräch.' },
      { q: 'Wie ändere ich Preise?', a: 'Kurze Nachricht an uns genügt – wir aktualisieren die Preisliste im Rahmen der laufenden Betreuung.' },
    ],
  },
];
