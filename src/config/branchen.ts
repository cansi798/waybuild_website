// Branchen-Landingpages: /website-fuer/<slug>/
// Jede Seite rankt auf "Website für <Branche>" und führt direkt zum passenden Tarif.
import { plans, type IconName } from './site';

// Preise immer aus der Tarif-Konfiguration – nie fest in Texte schreiben
const ab = Math.min(...plans.map((p) => p.monthly));
const business = plans.find((p) => p.id === 'business')!.monthly;

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
  plan: 'start' | 'business' | 'premium';
  planReason: string;
  faqs: { q: string; a: string }[];
};

export const branchen: Branche[] = [
  {
    slug: 'handwerker',
    name: 'Handwerker',
    label: 'Handwerk',
    title: `Website für Handwerker – im Abo ab ${ab} €`,
    description: 'Website für Handwerksbetriebe im Abo: individuell, mobil, lokal bei Google gefunden. Mit Anfrageformular, E-Mails & Hosting. Live in 14 Tagen.',
    claim: 'Mehr Aufträge aus der Region – ohne Technik-Stress.',
    pains: ['Keine Zeit für die Website', 'Kunden finden Sie nicht bei Google', 'Veraltete Seite schreckt ab'],
    features: [
      { icon: 'search', title: 'Lokal gefunden', text: '„Elektriker in [Ihre Stadt]“ – wir optimieren für die Suchen in Ihrem Einzugsgebiet, inkl. Google-Unternehmensprofil.' },
      { icon: 'chat', title: 'Anfragen mit Fotos', text: 'Kunden beschreiben ihr Projekt direkt im Formular – Sie bekommen alle Infos für ein schnelles Angebot.' },
      { icon: 'pen', title: 'Referenzen zeigen', text: 'Galerie Ihrer Projekte – der stärkste Vertrauensbeweis im Handwerk.' },
    ],
    plan: 'business',
    planReason: 'Lokales SEO und Anfrageformulare sind für Handwerksbetriebe entscheidend.',
    faqs: [
      { q: 'Kann ich neue Projektfotos selbst hochladen?', a: 'Schicken Sie uns die Fotos einfach per E-Mail oder WhatsApp – wir stellen sie im Rahmen Ihres monatlichen Änderungskontingents online.' },
      { q: 'Werde ich in meiner Stadt bei Google gefunden?', a: 'Im Business-Tarif optimieren wir gezielt für Ihre Region und richten Ihr Google-Unternehmensprofil ein. Garantierte Platzierungen kann seriös niemand versprechen – die Grundlagen setzen wir aber vollständig um.' },
      { q: 'Brauche ich einen Online-Shop?', a: 'Meist nicht. Für Handwerker zählt die Anfrage – deshalb setzen wir auf klare Kontaktwege statt Warenkorb.' },
    ],
  },
  {
    slug: 'arztpraxen',
    name: 'Arztpraxen',
    label: 'Arztpraxen',
    title: `Website für Arztpraxen – im Abo ab ${ab} €`,
    description: 'Praxis-Website im Abo: Öffnungszeiten, Leistungen, Online-Terminbuchung, barrierearm und DSGVO-freundlich. Hosting & E-Mail inklusive.',
    claim: 'Weniger Anrufe am Empfang. Mehr Zeit für Patienten.',
    pains: ['Telefon steht nicht still', 'Öffnungszeiten sind veraltet', 'Datenschutz verunsichert'],
    features: [
      { icon: 'calendar', title: 'Termine online', text: 'Anbindung an gängige Terminbuchungssysteme – Patienten buchen rund um die Uhr, das Telefon wird entlastet.' },
      { icon: 'shield', title: 'Datenschutz im Blick', text: 'Kein Tracking, keine Cookies, Server in Deutschland. Für Kontaktformulare mit Gesundheitsdaten beraten wir Sie zur sicheren Lösung.' },
      { icon: 'gauge', title: 'Barrierearm', text: 'Gut lesbar, groß genug, bedienbar mit Tastatur – wichtig für alle Altersgruppen.' },
    ],
    plan: 'business',
    planReason: 'Mehrere Leistungsseiten, Terminformulare und lokales SEO – genau das deckt Business ab.',
    faqs: [
      { q: 'Können Patienten online Termine buchen?', a: 'Ja, als Zusatzleistung binden wir ein Terminbuchungssystem an (ab 15 € / Monat) oder verlinken Ihr bestehendes System.' },
      { q: 'Ist die Website datenschutzkonform?', a: 'Die Website selbst kommt ohne Tracking und Cookies aus, die Server stehen in Deutschland. Die Datenschutzerklärung erstellen Sie bzw. Ihr Datenschutzbeauftragter – wir liefern alle technischen Angaben dafür.' },
      { q: 'Muss ich Praxisfotos selbst machen?', a: 'Nein. Auf Wunsch organisieren wir ein Foto-Shooting vor Ort (auf Anfrage).' },
    ],
  },
  {
    slug: 'gastronomie',
    name: 'Restaurants & Cafés',
    label: 'Gastronomie',
    title: 'Website für Restaurants & Cafés – im Abo',
    description: 'Restaurant-Website im Abo: Speisekarte, Öffnungszeiten, Reservierung – blitzschnell auf dem Handy. Hosting, Domain & E-Mails inklusive.',
    claim: 'Hungrige Gäste entscheiden in Sekunden. Auf dem Handy.',
    pains: ['Speisekarte nur als PDF', 'Seite lädt ewig auf dem Handy', 'Reservierungen nur per Telefon'],
    features: [
      { icon: 'gauge', title: 'Blitzschnell mobil', text: 'Die meisten Gäste suchen unterwegs. Ihre Seite lädt in unter einer Sekunde – auch im schwachen Netz.' },
      { icon: 'pen', title: 'Speisekarte als Seite', text: 'Keine PDF-Datei, sondern eine echte, lesbare Karte – die auch Google versteht. Änderungen per kurzer Nachricht an uns.' },
      { icon: 'calendar', title: 'Tisch reservieren', text: 'Reservierungsformular oder Anbindung an Ihr bestehendes System.' },
    ],
    plan: 'start',
    planReason: 'Startseite, Speisekarte, Reservierung, Anfahrt – das passt meist in 5 Seiten.',
    faqs: [
      { q: 'Wie oft kann ich die Speisekarte ändern?', a: 'So oft Sie möchten – im Rahmen Ihres monatlichen Änderungskontingents (30 Min. im Start-Tarif). Tageskarten lassen sich auch als einfache Liste pflegen.' },
      { q: 'Kann ich meine Seite mit Google Maps verknüpfen?', a: 'Ja. Wir richten das Google-Unternehmensprofil so ein, dass Öffnungszeiten, Website und Reservierung zusammenpassen.' },
      { q: 'Gibt es Online-Bestellungen?', a: 'Eine Verlinkung zu Lieferdiensten ist inklusive. Eigene Bestellsysteme bieten wir auf Anfrage an.' },
    ],
  },
  {
    slug: 'kanzleien',
    name: 'Kanzleien & Steuerberater',
    label: 'Kanzleien',
    title: 'Website für Kanzleien & Steuerberater',
    description: `Seriöse Kanzlei-Website im Abo: Rechtsgebiete, Team, Mandantenanfrage. Individuell, schnell, ohne Cookie-Banner. Ab ${business} € netto im Monat.`,
    claim: 'Seriös. Klar. Vertrauen ab dem ersten Klick.',
    pains: ['Website wirkt austauschbar', 'Mandanten finden nicht das Rechtsgebiet', 'Pflichtangaben sind unübersichtlich'],
    features: [
      { icon: 'pen', title: 'Individuelles Design', text: 'Kein Standard-Template, das zehn andere Kanzleien in Ihrer Stadt auch nutzen.' },
      { icon: 'search', title: 'Rechtsgebiete, die ranken', text: 'Eigene Seiten je Rechtsgebiet oder Leistung – so werden Sie für konkrete Suchanfragen gefunden.' },
      { icon: 'chat', title: 'Strukturierte Anfrage', text: 'Mandanten schildern ihr Anliegen vorab – Sie können das Erstgespräch gezielt vorbereiten.' },
    ],
    plan: 'business',
    planReason: 'Mehrere Rechtsgebiets-Seiten, Team und lokales SEO – ideal im Business-Tarif.',
    faqs: [
      { q: 'Kümmern Sie sich um die berufsrechtlichen Pflichtangaben?', a: 'Wir setzen alle Angaben technisch sauber um. Den Inhalt (z. B. Kammer, Berufsbezeichnung) liefern Sie – die rechtliche Verantwortung bleibt bei der Kanzlei.' },
      { q: 'Können wir Fachartikel veröffentlichen?', a: 'Ja, ein News- bzw. Blogbereich ist im Business-Tarif enthalten.' },
      { q: 'Gibt es eine englische Version?', a: 'Im Premium-Tarif ist eine zweite Sprache inklusive, sonst als Zusatzleistung ab 190 € einmalig.' },
    ],
  },
  {
    slug: 'immobilienmakler',
    name: 'Immobilienmakler',
    label: 'Immobilien',
    title: 'Website für Immobilienmakler – im Abo',
    description: 'Makler-Website im Abo: Objekte präsentieren, Eigentümer gewinnen, lokal gefunden werden. Individuell, schnell, inkl. Hosting & E-Mail.',
    claim: 'Eigentümer gewinnen – nicht nur Objekte zeigen.',
    pains: ['Portale kosten viel Geld', 'Eigentümer finden Sie nicht', 'Seite sieht aus wie jede andere'],
    features: [
      { icon: 'search', title: 'Lokal sichtbar', text: 'Für „Immobilienmakler [Stadt]“ gefunden werden – dort, wo Eigentümer suchen.' },
      { icon: 'chat', title: 'Bewertungsanfrage', text: 'Formular „Was ist meine Immobilie wert?“ – der wichtigste Lead-Kanal für Makler.' },
      { icon: 'rocket', title: 'Objekte im Fokus', text: 'Große Bilder, schnelle Ladezeit, klare Exposé-Anfrage.' },
    ],
    plan: 'premium',
    planReason: 'Laufende SEO-Betreuung und viele Seiten lohnen sich im umkämpften Makler-Markt.',
    faqs: [
      { q: 'Können Objekte aus meiner Maklersoftware angezeigt werden?', a: 'Viele Maklerprogramme bieten Schnittstellen oder Einbettungen. Wir prüfen im Erstgespräch, was mit Ihrer Software möglich ist.' },
      { q: 'Wie schnell sind neue Objekte online?', a: 'Innerhalb Ihres Änderungskontingents in der Regel am nächsten Werktag.' },
      { q: 'Lohnt sich eine eigene Website neben den Portalen?', a: 'Ja – vor allem für die Eigentümer-Akquise. Portale zeigen Objekte, Ihre Website verkauft Ihre Maklerleistung.' },
    ],
  },
  {
    slug: 'friseure-kosmetik',
    name: 'Friseure & Kosmetikstudios',
    label: 'Beauty & Friseur',
    title: 'Website für Friseure & Kosmetik – im Abo',
    description: `Salon-Website im Abo: Leistungen, Preise, Online-Termine – modern und mobil. Hosting, Domain & E-Mails inklusive. Ab ${ab} € netto im Monat.`,
    claim: 'Ihr Salon, so schön online wie vor Ort.',
    pains: ['Termine nur per Telefon', 'Preise sind nirgends zu finden', 'Instagram allein reicht nicht'],
    features: [
      { icon: 'calendar', title: 'Online-Termine', text: 'Anbindung an Ihr Buchungssystem – Kundinnen und Kunden buchen auch nach Feierabend.' },
      { icon: 'pen', title: 'Preisliste & Leistungen', text: 'Übersichtlich, immer aktuell, ohne PDF.' },
      { icon: 'search', title: 'Bei Google & Maps', text: 'Gefunden werden, wenn jemand „Friseur in der Nähe“ sucht.' },
    ],
    plan: 'start',
    planReason: 'Leistungen, Preise, Team, Termin und Anfahrt – das passt in den Start-Tarif.',
    faqs: [
      { q: 'Kann ich Instagram-Bilder einbinden?', a: 'Wir verlinken Ihr Profil prominent. Eingebettete Feeds laden Drittanbieter-Inhalte – das bremst und erfordert Einwilligungen, deshalb raten wir meist davon ab.' },
      { q: 'Funktioniert die Seite mit meinem Buchungssystem?', a: 'Die gängigen Systeme lassen sich verlinken oder einbinden. Wir prüfen das im Erstgespräch.' },
      { q: 'Wie ändere ich Preise?', a: 'Kurze Nachricht an uns genügt – wir aktualisieren die Preisliste im Rahmen Ihres Änderungskontingents.' },
    ],
  },
];
