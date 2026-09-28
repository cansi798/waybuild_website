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
  /** Links zu Google-Unternehmensprofil, LinkedIn, Instagram … – stärkt die Marke bei Google (JSON-LD sameAs). */
  sameAs: [] as string[],
};

/** Referenzprojekte – leer lassen, bis echte Kundenprojekte (mit Freigabe) vorliegen. */
// Beispiel: { name: 'Tischlerei Muster', branche: 'Handwerk', url: 'https://…', text: 'Neue Website, 3× mehr Anfragen', bild: 'referenzen/projekt-1' }
export const references: { name: string; branche: string; url?: string; text: string; bild?: string }[] = [];

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
// Die ersten 4 features sind sofort sichtbar, der Rest steckt unter "Alle Leistungen".
export const plans: Plan[] = [
  {
    id: 'start',
    name: 'Start',
    tagline: 'Für Selbstständige',
    setup: 290,
    monthly: 49,
    features: [
      'Bis 5 Seiten',
      'Individuelles Design',
      'Unbegrenzte Postfächer',
      '30 Min. Änderungen / Monat',
      'Hosting in Deutschland',
      '.de-Domain & SSL',
      'Technisches SEO',
      'Antwort in 48 Std.',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Für lokale Unternehmen',
    setup: 590,
    monthly: 89,
    highlight: true,
    features: [
      'Bis 12 Seiten',
      'Lokales SEO & Google-Profil',
      'Unbegrenzte Postfächer',
      '90 Min. Änderungen / Monat',
      'Alles aus Start',
      'Blog / News',
      'Anfrage- & Terminformulare',
      'Antwort in 24 Std.',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Für Wachstum',
    setup: 1190,
    monthly: 169,
    features: [
      'Unbegrenzte Seiten',
      'Monatliche SEO-Betreuung',
      'Unbegrenzte Postfächer',
      '4 Std. Änderungen / Monat',
      'Alles aus Business',
      'Optimierung für KI-Suchen',
      'Zweite Sprache inklusive',
      'Antwort in 4 Std. (werktags)',
    ],
  },
];

export const allPlansInclude = [
  'Unbegrenzte E-Mail-Postfächer',
  'Hosting in Deutschland',
  '.de-Domain',
  'SSL',
  'Tägliche Backups',
  'Updates & Sicherheit',
  'Kein Cookie-Banner nötig',
];

export const addons = [
  { name: 'Zusätzliche Domain', price: '2 € / Monat' },
  { name: 'Weitere Sprache', price: 'ab 190 € einmalig' },
  { name: 'Texterstellung', price: 'ab 90 € / Seite' },
  { name: 'Online-Terminbuchung', price: '15 € / Monat' },
  { name: 'Foto-Shooting', price: 'auf Anfrage' },
  { name: 'WordPress (auf Wunsch)', price: 'auf Anfrage' },
];

export type IconName = 'mail' | 'calendar' | 'rocket' | 'gauge' | 'key' | 'search' | 'chat' | 'pen' | 'server' | 'shield';

export const usps: { icon: IconName; title: string; short: string; text: string }[] = [
  {
    icon: 'mail',
    title: 'Unbegrenzt E-Mail',
    short: 'Postfächer ohne Limit.',
    text: 'Für jeden Mitarbeiter eine eigene Adresse – ohne Aufpreis. Bei anderen Anbietern ist oft nach 2 bis 5 Postfächern Schluss.',
  },
  {
    icon: 'calendar',
    title: '12 statt 24 Monate',
    short: 'Danach monatlich kündbar.',
    text: 'Branchenüblich sind 24 Monate Mindestlaufzeit. Bei uns sind es 12 – danach monatlich kündbar. Wir überzeugen mit Leistung, nicht mit Verträgen.',
  },
  {
    icon: 'rocket',
    title: 'Live in 14 Tagen',
    short: 'Garantiert.',
    text: 'Sobald Ihre Inhalte (Texte, Bilder, Logo) da sind, ist Ihre Website in spätestens 14 Tagen online.',
  },
  {
    icon: 'gauge',
    title: 'PageSpeed 90+',
    short: 'Schnell auf jedem Handy.',
    text: 'Ihre Seite lädt auf dem Smartphone blitzschnell – messbar mit Googles eigenem Test. Schnelle Seiten ranken besser und verlieren weniger Besucher.',
  },
  {
    icon: 'key',
    title: 'Ihr Code gehört Ihnen',
    short: 'Übernahme jederzeit möglich.',
    text: 'Nach der Mindestlaufzeit können Sie Ihre Website auf Wunsch komplett übernehmen – inklusive Quellcode. Ihre Domain gehört Ihnen ohnehin von Anfang an.',
  },
  {
    icon: 'search',
    title: 'Google & KI',
    short: 'Gefunden werden.',
    text: 'Sauberes SEO ab Tag 1 – und Optimierung für KI-Suchen wie ChatGPT und Gemini, wo Ihre Kunden immer öfter nach Empfehlungen fragen.',
  },
];

// "Warum kein WordPress?" – Vergleich (kurz halten!)
export const comparison = [
  { topic: 'Ladezeit', waybuild: 'Unter 1 Sekunde', wordpress: '3–6 Sekunden' },
  { topic: 'Design', waybuild: 'Unikat', wordpress: 'Gekauftes Theme' },
  { topic: 'Sicherheit', waybuild: 'Keine Angriffsfläche', wordpress: 'Plugin-Lücken' },
  { topic: 'Wartung', waybuild: 'Wartungsfrei', wordpress: 'Ständige Updates' },
  { topic: 'Datenschutz', waybuild: 'Kein Cookie-Banner', wordpress: 'Drittanbieter-Plugins' },
];

export const steps: { icon: IconName; title: string; short: string; text: string }[] = [
  { icon: 'chat', title: 'Gespräch', short: '20 Min., kostenlos', text: 'Per Telefon oder Video. Wir lernen Ihr Unternehmen kennen und empfehlen den passenden Tarif – ehrlich, auch wenn der kleinere reicht.' },
  { icon: 'pen', title: 'Entwurf', short: 'Ihr individuelles Design', text: 'Wir entwickeln Ihr Design nach Ihren Wünschen. Sie geben Feedback, bis alles passt.' },
  { icon: 'server', title: 'Livegang', short: 'Domain, E-Mail, Server', text: 'Wir richten alles ein: Domain, Postfächer, Server, SSL. In 14 Tagen sind Sie online.' },
  { icon: 'shield', title: 'Betreuung', short: 'Wir kümmern uns', text: 'Änderungen, Updates, Backups und Sicherheit übernehmen wir. Sie konzentrieren sich auf Ihr Geschäft.' },
];

export const faqs = [
  {
    q: 'Was bedeutet „Website mieten“?',
    a: 'Statt einmalig mehrere tausend Euro zu zahlen, zahlen Sie eine kleine Einrichtungsgebühr und danach einen festen Monatsbeitrag. Darin ist alles enthalten: individuelles Design, Hosting, Domain, E-Mail-Postfächer, Wartung und Änderungen. Die Kosten sind planbar und als Betriebsausgabe voll absetzbar.',
  },
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
