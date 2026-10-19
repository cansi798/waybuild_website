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
  slogan: 'Menschliche Beratung. KI-gestützte Umsetzung. Kontinuierliche Verbesserung.',
  email: 'kontakt@waybuild.de', // Postfach muss noch eingerichtet werden (siehe Checkliste)
  /** PLATZHALTER (Wunsch 11.10.2026: „erfundene Nummer“) – vor dem Livegang ersetzen, dann PHONE_IS_PLACEHOLDER auf false. */
  phone: '0151 00000000',
  street: 'Kuno-Liesenberg-Kehre 32a',
  zip: '22844',
  city: 'Norderstedt',
  country: 'DE',
  managingDirector: 'Can Siebert',
  registerCourt: 'TODO', // z. B. 'Amtsgericht Berlin-Charlottenburg'
  registerNumber: 'TODO', // z. B. 'HRB 123456 B'
  vatId: 'TODO', // z. B. 'DE123456789'
  /** Server-Hoster für die Datenschutzerklärung, z. B. 'IONOS SE, Elgendorfer Str. 57, 56410 Montabaur' */
  hoster: 'TODO',
  /** Links zu Google-Unternehmensprofil, LinkedIn, Instagram … – stärkt die Marke bei Google (JSON-LD sameAs). */
  sameAs: [] as string[],
};

/** Solange true, gilt company.phone als erfundene Platzhalter-Nummer (Checkliste offen, nicht an Google melden). */
export const PHONE_IS_PLACEHOLDER = true;
/** Telefon-Helfer: tel:-Link und WhatsApp-Link (wa.me) aus company.phone. */
export const phoneTel = () => '+49' + company.phone.replace(/\s/g, '').replace(/^0/, '');
export const whatsappLink = (text = 'Hallo waybuild, ich interessiere mich für Website as a Service.') =>
  `https://wa.me/${phoneTel().replace('+', '')}?text=${encodeURIComponent(text)}`;
/** Erreichbarkeit (Footer-Kopf, Kontakt). */
export const HOURS = 'Montag – Freitag, 9:00 – 18:00 Uhr';

/** Referenzprojekte – leer lassen, bis echte Kundenprojekte (mit Freigabe) vorliegen. */
// Beispiel: { name: 'Tischlerei Muster', branche: 'Handwerk', url: 'https://…', text: 'Neue Website, 3× mehr Anfragen', bild: 'referenzen/projekt-1' }
export const references: { name: string; branche: string; url?: string; text: string; bild?: string }[] = [];

export const VAT_RATE = 0.19;

/* ─────────────────────────────────────────────────────────────────────────────
 * DAS ANGEBOT „Website as a Service“ in zwei Varianten (Jamil, 19.10.2026):
 * 79 € / Monat und 139 € / Monat für die selbstoptimierende, sich anpassende Website.
 * Alle Preise netto zzgl. MwSt. (B2B). Preise NIE fest in Texte schreiben – immer aus PAKETE.
 * (Frühere Tarife Start/Business/Premium + 490 € Einrichtung: siehe Git-Historie.)
 * ───────────────────────────────────────────────────────────────────────────── */
export const WAAS = {
  name: 'Website as a Service',
  claim: 'Ein Ansprechpartner. Ein System. Ein fester Monatspreis.',
  einrichtung: 0,
  laufzeitMonate: 24,
};

export type Paket = {
  id: 'website' | 'intelligent';
  name: string;
  /** Kurz-Nutzen unter dem Namen */
  kurz: string;
  /** Monatspreis netto */
  preis: number;
  /** Für wen – ein Satz aus Kundensicht */
  fuer: string;
  features: string[];
  empfohlen?: boolean;
};

export const PAKETE: Paket[] = [
  {
    id: 'website',
    name: 'Website',
    kurz: 'Professionell und komplett betreut',
    preis: 79,
    fuer: 'Für Unternehmen, die einen professionellen Auftritt wollen – ohne sich um Technik zu kümmern.',
    features: [
      'Professionelle Website nach persönlicher Beratung',
      'Hosting, Domainverwaltung und SSL',
      'Wartung, Updates und Backups',
      'Laufende Betreuung und Änderungen per Sprache oder Text',
    ],
  },
  {
    id: 'intelligent',
    name: 'Intelligente Website',
    kurz: 'Optimiert sich selbst und passt sich an',
    preis: 139,
    fuer: 'Für Unternehmen, die ihre Website aktiv für Vertrieb und Anfragen nutzen wollen.',
    features: [
      'Alles aus „Website“',
      'Wertet Besucher, Suchbegriffe und Anfragen laufend aus',
      'Passt Inhalte und Aufbau selbstständig an',
      'Hebt erfolgreiche Leistungen und Referenzen hervor',
      'Optimiert den Weg vom Besucher zur Anfrage',
    ],
    empfohlen: true,
  },
];

export const preisAb = () => Math.min(...PAKETE.map((p) => p.preis));

export const formatEuro = (n: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

/** Preis-Zeilen für alle Seiten (aus PAKETE). */
export const preisKurz = () => `ab ${formatEuro(preisAb())} / Monat`;
export const preisLang = () => `ab ${formatEuro(preisAb())} im Monat, zzgl. MwSt.`;
export const preiseBeide = () => PAKETE.map((p) => `${p.name}: ${formatEuro(p.preis)} / Monat`).join(' · ') + ' (netto, zzgl. MwSt.)';

/** Das Angebot in einem Satz. */
export const OFFER = 'Website, Hosting, Domain, SSL, Wartung, Backups und Betreuung – alles in einem festen Monatspreis.';

export type IconName =
  | 'mail' | 'calendar' | 'rocket' | 'gauge' | 'key' | 'search' | 'chat' | 'pen' | 'server' | 'shield'
  | 'phone' | 'whatsapp' | 'chevron' | 'menu' | 'close' | 'arrow' | 'arrow-left' | 'check' | 'doc' | 'eye'
  | 'euro' | 'clock' | 'user' | 'layout' | 'cart' | 'target' | 'refresh' | 'tools' | 'pin' | 'globe' | 'chart'
  | 'code' | 'cloud' | 'cpu' | 'compass' | 'layers' | 'lock' | 'mic' | 'spark' | 'database' | 'home' | 'unlock'
  | 'users' | 'ticket' | 'book' | 'bot' | 'zap' | 'portal' | 'folder';

/** Was in „Website as a Service“ enthalten ist (Reihenfolge wie in der Vision). */
export const INKLUSIVE: { icon: IconName; title: string }[] = [
  { icon: 'layout', title: 'Professionelle Website' },
  { icon: 'server', title: 'Hosting' },
  { icon: 'globe', title: 'Domainverwaltung' },
  { icon: 'lock', title: 'SSL-Zertifikat' },
  { icon: 'tools', title: 'Wartung' },
  { icon: 'database', title: 'Backups' },
  { icon: 'user', title: 'Laufende Betreuung' },
  { icon: 'spark', title: 'KI-gestützte Erstellung' },
  { icon: 'mic', title: 'Sprachgesteuerte Änderungen' },
];

/** Geschäftsmodell in Stichpunkten (Langfassung als Siegel: config/versprechen.ts). */
export const MODELL = [
  'Keine Einrichtungskosten',
  'Fester Monatspreis, netto zzgl. MwSt.',
  `${WAAS.laufzeitMonate} Monate Laufzeit`,
  'Website, Code und Domain gehören Ihnen',
  'Keine versteckten Kosten',
  'Kein künstlicher Lock-in',
];

/** Ablauf aus Kundensicht in vier Schritten (auch Grundlage der animierten Ablauf-Szene). */
export const steps: { icon: IconName; title: string; short: string; text: string }[] = [
  { icon: 'calendar', title: 'Erstgespräch', short: 'Kostenlos, unverbindlich', text: 'Wir lernen Ihr Unternehmen kennen und klären, was Ihre Website leisten soll.' },
  { icon: 'chat', title: 'Beratung', short: 'Persönlich, mit Ihnen', text: 'Zielgruppen, Positionierung, Customer Journey, Vertrauensaufbau und Lead-Generierung – gemeinsam entwickelt.' },
  { icon: 'spark', title: 'KI-Umsetzung', short: 'Sie prüfen und geben frei', text: 'Unsere KI setzt die Ergebnisse in Rekordzeit um. Sie prüfen, wir feilen – bis alles passt.' },
  { icon: 'chart', title: 'Live & betreut', short: 'Laufend verbessert', text: 'Ihre Website geht online. Wir betreuen, pflegen und entwickeln sie laufend weiter.' },
];

/** Gemeinsam in der Beratung erarbeitet. */
export const BERATUNG_THEMEN = ['Zielgruppen', 'Positionierung', 'Customer Journey', 'Vertrauensaufbau', 'Lead-Generierung', 'Digitale Prozesse'];

export const faqs = [
  {
    q: 'Was kostet eine Website bei waybuild?',
    a: `${PAKETE.map((p) => `${p.name}: ${formatEuro(p.preis)} im Monat`).join('. ')}. Alle Preise netto zzgl. MwSt., ohne Einrichtungskosten und ohne versteckte Kosten.`,
  },
  {
    q: `Was ist der Unterschied zwischen ${formatEuro(PAKETE[0].preis)} und ${formatEuro(PAKETE[1].preis)}?`,
    a: 'Die Website für 79 € ist Ihr professioneller Auftritt – wir pflegen und betreuen ihn. Die intelligente Website für 139 € macht zusätzlich mit: Sie wertet aus, woher Anfragen kommen und was Besucher interessiert, und passt Inhalte und Aufbau laufend daran an.'
      .replace('79 €', formatEuro(PAKETE[0].preis)).replace('139 €', formatEuro(PAKETE[1].preis)),
  },
  {
    q: 'Was ist bei Website as a Service enthalten?',
    a: 'Persönliche Beratung, KI-gestützte Erstellung, Hosting, Domainverwaltung, SSL, Wartung, Backups und laufende Betreuung – zu einem festen Monatspreis und ohne Einrichtungskosten.',
  },
  {
    q: 'Wie lange läuft der Vertrag?',
    a: `Die Laufzeit beträgt ${WAAS.laufzeitMonate} Monate. Wir möchten langfristiges Vertrauen aufbauen – keine künstliche Abhängigkeit.`,
  },
  {
    q: 'Wie schnell ist meine Website online?',
    a: 'Spätestens 14 Tage, nachdem Ihre Inhalte (Texte, Bilder, Logo) vorliegen. Auf Wunsch erarbeiten wir die Inhalte gemeinsam mit Ihnen.',
  },
  {
    q: 'Wem gehören Website, Code und Domain?',
    a: 'Ihnen. Die Domain läuft auf Ihren Namen, Website und Code gehören Ihrem Unternehmen.',
  },
  {
    q: 'Welche Rolle spielt KI?',
    a: 'KI ersetzt keine guten Ideen – sie beschleunigt die Umsetzung. Strategie, Positionierung und Inhalte erarbeiten wir persönlich mit Ihnen. Danach setzt unsere KI die Ergebnisse in Rekordzeit um.',
  },
  {
    q: 'Kann ich meine bestehende Domain mitnehmen?',
    a: 'Ja. Wir übernehmen die Verwaltung Ihrer bestehenden Domain ohne Ausfall – sie bleibt auf Ihren Namen registriert.',
  },
  {
    q: 'Bietet waybuild auch Software, Cloud und IT an?',
    a: 'Unser Angebot startet mit Website as a Service. Daraus entwickeln wir Schritt für Schritt eine digitale Unternehmensplattform. Individuelle Software, Nextcloud und IT-Betreuung setzen wir schon heute als individuelles Projekt um – auf Anfrage.',
  },
  {
    q: 'Sind die Preise netto?',
    a: 'Ja. Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer von 19 %. Unser Angebot richtet sich ausschließlich an Unternehmen und Selbstständige (B2B).',
  },
];
