// Zentrale Inhalte der Website. Alles mit "TODO" sind Platzhalter, bis die echten Firmendaten vorliegen.

/**
 * Gelbe "Fehlt: …"-Hinweise auf der Website anzeigen.
 * Vor dem offiziellen Start auf false setzen – dann verschwinden alle Hinweise und Platzhalter-Bereiche.
 */
export const SHOW_HINTS = true;

/** Ein Wert gilt als fehlend, wenn er leer ist oder mit "TODO" beginnt. */
export const isMissing = (v?: string | null) => !v || v.trim().startsWith('TODO');

export const company = {
  name: 'Waybuild',
  legalName: 'Waybuild UG (haftungsbeschränkt)',
  slogan: 'Websites im Abo – individuell entwickelt, sorgenfrei betrieben.',
  email: 'kontakt@waybuild.de', // Postfach muss noch eingerichtet werden (siehe Checkliste)
  phone: 'TODO', // z. B. '+49 30 1234567'
  street: 'TODO',
  zip: 'TODO',
  city: 'TODO',
  country: 'DE',
  managingDirector: 'TODO',
  registerCourt: 'TODO', // z. B. 'Amtsgericht Berlin-Charlottenburg'
  registerNumber: 'TODO', // z. B. 'HRB 123456 B'
  vatId: 'TODO', // z. B. 'DE123456789'
};

/** Referenzprojekte – leer lassen, bis echte Kundenprojekte (mit Freigabe) vorliegen. */
export const references: { name: string; branche: string; url?: string; text: string }[] = [];

export const VAT_RATE = 0.19;

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  setup: number;
  monthly: number;
  highlight?: boolean;
  features: string[];
};

// Alle Preise netto (B2B) zzgl. gesetzl. USt.
export const plans: Plan[] = [
  {
    id: 'start',
    name: 'Start',
    tagline: 'Der professionelle Auftritt für Selbstständige und kleine Betriebe.',
    setup: 290,
    monthly: 49,
    features: [
      'Individuelles Design – kein Baukasten',
      'Bis zu 5 Seiten',
      'Unbegrenzte E-Mail-Postfächer',
      'Hosting in Deutschland, .de-Domain & SSL',
      'Technisches SEO',
      '30 Min. Änderungen pro Monat',
      'Support-Antwort in 48 Std.',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Für Unternehmen, die lokal gefunden werden wollen.',
    setup: 590,
    monthly: 89,
    highlight: true,
    features: [
      'Alles aus Start, plus:',
      'Bis zu 12 Seiten',
      'Lokales SEO & Google-Unternehmensprofil',
      'Blog / News-Bereich',
      'Formulare für Anfragen & Termine',
      '90 Min. Änderungen pro Monat',
      'Support-Antwort in 24 Std.',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Wachstum mit laufender Betreuung und maximaler Sichtbarkeit.',
    setup: 1190,
    monthly: 169,
    features: [
      'Alles aus Business, plus:',
      'Unbegrenzte Seiten',
      'Monatliche SEO-Betreuung mit Report',
      'Optimierung für KI-Suchen (ChatGPT, Gemini & Co.)',
      'Mehrsprachigkeit (1 Zusatzsprache)',
      '4 Std. Änderungen pro Monat',
      'Priorität: Antwort in 4 Std. (werktags)',
    ],
  },
];

export const allPlansInclude = [
  'Unbegrenzte E-Mail-Postfächer',
  'Hosting & Server in Deutschland',
  '.de-Domain inklusive',
  'SSL-Verschlüsselung',
  'Tägliche Backups',
  'Updates & Sicherheitsüberwachung',
  'Mobil optimiert',
  'Impressum & Datenschutz-Struktur',
  'Kein Tracking, kein Cookie-Banner nötig',
];

export const addons = [
  { name: 'Zusätzliche Domain', price: '2 € / Monat' },
  { name: 'Weitere Sprache', price: 'ab 190 € einmalig' },
  { name: 'Texterstellung durch Profis', price: 'ab 90 € pro Seite' },
  { name: 'Online-Terminbuchung', price: '15 € / Monat' },
  { name: 'Foto-Shooting vor Ort', price: 'auf Anfrage' },
  { name: 'WordPress-Website auf ausdrücklichen Wunsch', price: 'auf Anfrage' },
];

export const usps = [
  {
    title: 'Unbegrenzte E-Mail-Postfächer',
    text: 'Für jeden Mitarbeiter eine eigene Adresse – ohne Aufpreis. Bei anderen Anbietern ist oft nach 2 bis 5 Postfächern Schluss.',
  },
  {
    title: 'Nur 12 Monate Laufzeit',
    text: 'Branchenüblich sind 24 Monate. Bei uns sind es 12 – danach monatlich kündbar. Wir überzeugen mit Leistung, nicht mit Verträgen.',
  },
  {
    title: 'Live in 14 Tagen',
    text: 'Sobald Ihre Inhalte da sind, ist Ihre Website in spätestens 14 Tagen online. Garantiert.',
  },
  {
    title: 'PageSpeed-Garantie 90+',
    text: 'Ihre Seite lädt auf dem Smartphone blitzschnell – messbar mit Googles eigenem Test. Schnelle Seiten ranken besser.',
  },
  {
    title: 'Ihr Code gehört Ihnen',
    text: 'Nach der Mindestlaufzeit können Sie Ihre Website auf Wunsch komplett übernehmen. Keine Geiselhaft.',
  },
  {
    title: 'Sichtbar bei Google & KI',
    text: 'Sauberes SEO ab Tag 1 – und Optimierung für KI-Suchen wie ChatGPT und Gemini, wo Ihre Kunden immer öfter fragen.',
  },
];

// "Warum kein WordPress?" – Vergleich
export const comparison = [
  { topic: 'Ladezeit', waybuild: 'Unter 1 Sekunde', wordpress: 'Oft 3–6 Sekunden' },
  { topic: 'Design', waybuild: 'Ein Unikat, nach Ihren Wünschen entwickelt', wordpress: 'Gekauftes Theme, das tausende andere auch nutzen' },
  { topic: 'Sicherheit', waybuild: 'Keine Datenbank, keine Plugins, keine Angriffsfläche', wordpress: 'Häufigstes Angriffsziel im Web, ständige Plugin-Lücken' },
  { topic: 'Wartung', waybuild: 'Praktisch wartungsfrei', wordpress: 'Wöchentliche Updates von Kern, Theme und Plugins' },
  { topic: 'Google-Ranking', waybuild: 'Top-Werte bei Core Web Vitals', wordpress: 'Ballast durch Plugins bremst das Ranking' },
  { topic: 'Datenschutz', waybuild: 'Keine externen Dienste, kein Cookie-Banner nötig', wordpress: 'Plugins laden oft ungefragt Drittanbieter' },
];

export const steps = [
  { title: 'Kostenloses Erstgespräch', text: '20 Minuten per Telefon oder Video. Wir lernen Ihr Unternehmen kennen und empfehlen den passenden Tarif.' },
  { title: 'Entwurf & Feinschliff', text: 'Wir entwickeln Ihr individuelles Design. Sie geben Feedback, bis alles passt.' },
  { title: 'Livegang', text: 'Domain, E-Mails, Server – wir richten alles ein. In 14 Tagen sind Sie online.' },
  { title: 'Sorgenfrei betreut', text: 'Änderungen, Updates, Backups und Sicherheit übernehmen wir. Sie konzentrieren sich auf Ihr Geschäft.' },
];

export const faqs = [
  {
    q: 'Warum setzt Waybuild nicht auf WordPress?',
    a: 'WordPress ist ein Baukasten für alles – und damit für nichts optimal. Wir entwickeln Ihre Website mit unserer eigenen Technologie: individuell nach Ihren Wünschen, ohne Plugins und Datenbank. Das Ergebnis ist ein Unikat, das schneller lädt, sicherer ist und besser bei Google rankt. Wenn Sie ausdrücklich WordPress wünschen, setzen wir das auf Anfrage aber gerne um.',
  },
  {
    q: 'Sind die Preise netto oder brutto?',
    a: 'Alle Preise sind Nettopreise zzgl. der gesetzlichen Umsatzsteuer von 19 %. Unser Angebot richtet sich an Unternehmen und Selbstständige.',
  },
  {
    q: 'Wie lange ist die Vertragslaufzeit?',
    a: 'Die Mindestlaufzeit beträgt 12 Monate. Danach ist das Abo monatlich kündbar. Bei jährlicher Zahlung schenken wir Ihnen 2 Monatsbeiträge.',
  },
  {
    q: 'Wie viele E-Mail-Adressen sind enthalten?',
    a: 'Unbegrenzt viele – in jedem Tarif. Wir richten die Postfächer ein und helfen bei der Verbindung mit Outlook, Apple Mail oder dem Smartphone.',
  },
  {
    q: 'Was passiert mit meiner Website nach Vertragsende?',
    a: 'Nach der Mindestlaufzeit können Sie Ihre Website gegen eine faire Übernahmegebühr komplett übernehmen – inklusive Quellcode. Ihre Domain gehört ohnehin Ihnen.',
  },
  {
    q: 'Kann ich meine bestehende Domain und E-Mails mitnehmen?',
    a: 'Ja. Wir ziehen Ihre Domain und bestehende Postfächer kostenlos und ohne Ausfall zu uns um.',
  },
  {
    q: 'Wie schnell ist meine Website online?',
    a: 'Innerhalb von 14 Tagen, nachdem wir Ihre Inhalte (Texte, Bilder, Logo) erhalten haben. Auf Wunsch übernehmen wir auch Texte und Fotos.',
  },
  {
    q: 'Was, wenn ich Änderungen brauche?',
    a: 'Schicken Sie uns einfach eine E-Mail. Je nach Tarif sind 30 Minuten bis 4 Stunden Änderungen pro Monat inklusive – ohne Aufpreis.',
  },
];

export const formatEuro = (n: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const gross = (n: number) => Math.round(n * (1 + VAT_RATE) * 100) / 100;
