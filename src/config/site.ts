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
  street: 'Rathausallee 76',
  zip: '22846',
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
export const HOURS = 'Montag bis Freitag, 9 bis 18 Uhr';

/** Referenzprojekte – leer lassen, bis echte Kundenprojekte (mit Freigabe) vorliegen. */
// Beispiel: { name: 'Tischlerei Muster', branche: 'Handwerk', url: 'https://…', text: 'Neue Website, 3× mehr Anfragen', bild: 'referenzen/projekt-1' }
export const references: { name: string; branche: string; url?: string; text: string; bild?: string }[] = [];

export const VAT_RATE = 0.19;

/* ─────────────────────────────────────────────────────────────────────────────
 * DAS ANGEBOT „Website as a Service“ in drei Paketen (Can, Talk qh87y3sj 4499–4510, 04.11.2026):
 * Fundament 79,99 € · Wegweiser 149,99 € · Wahrzeichen 299,99 € im Monat.
 * Preise sind NETTO zzgl. 19 % USt (B2B, Can Talk 4526), der Bruttopreis steht klein darunter.
 * Preise NIE fest in Texte schreiben – immer aus PAKETE.
 * Laufzeit: 24 Monate Mindestlaufzeit, danach monatlich kündbar (Can, Talk 4511, 04.11.2026; AGB § 5).
 * Keine Eigentumsaussagen zu Website/Code/Domain (Can, Talk 4513 – Mietmodell offen).
 * (Frühere Varianten 79 € / 139 € netto und Start/Business/Premium: siehe Git-Historie.)
 * ───────────────────────────────────────────────────────────────────────────── */
export const WAAS = {
  name: 'Website as a Service',
  claim: 'Ein Ansprechpartner, ein System, ein fester Monatspreis.',
  einrichtung: 0,
  laufzeitMonate: 24,
  /** Laufzeit in einem Satz (AGB § 5). */
  laufzeit: '24 Monate Mindestlaufzeit, danach monatlich kündbar',
};

export type Paket = {
  id: 'fundament' | 'wegweiser' | 'wahrzeichen';
  name: string;
  /** Kurz-Nutzen unter dem Namen */
  kurz: string;
  /** Monatspreis NETTO zzgl. 19 % USt */
  preis: number;
  /** Für wen – ein Satz aus Kundensicht */
  fuer: string;
  /** Herausgehobene Extras als Chips (Signatur, Briefe, Logo) */
  extras: string[];
  features: string[];
  empfohlen?: boolean;
};

export const PAKETE: Paket[] = [
  {
    id: 'fundament',
    name: 'Fundament',
    kurz: 'Professionell online, ohne Startkosten',
    preis: 79.99,
    fuer: 'Für Selbstständige und kleine Betriebe, die gut gefunden werden und seriös auftreten wollen.',
    extras: ['E-Mail-Signatur nach DIN 5008'],
    features: [
      'Website ohne Seitenbegrenzung nach persönlichem Erstgespräch',
      'Mobilfreundlich: optimiert für Handy, Tablet und PC',
      'Texte schreiben wir mit Ihnen, KI-gestützt und von uns geprüft',
      'SEO und für KI-Suche optimiert, in leichter Sprache erklärt',
      '20 E-Mail-Postfächer',
      'Impressum und Datenschutzerklärung nach aktuellem Stand',
      'Hosting in Deutschland, DSGVO-orientiert eingerichtet',
      'Änderungen per Sprachnachricht oder Text, im fairen Rahmen',
    ],
  },
  {
    id: 'wegweiser',
    name: 'Wegweiser',
    kurz: 'Zeigt neuen Kunden den Weg zu Ihnen',
    preis: 149.99,
    fuer: 'Für Unternehmen, die über ihre Website regelmäßig neue Kunden gewinnen wollen.',
    extras: ['E-Mail-Signatur nach DIN 5008', 'Briefvorlage nach DIN 5008'],
    features: [
      'Alles aus „Fundament“',
      'Mobilfreundlich: optimiert für Handy, Tablet und PC',
      'Google-Unternehmensprofil erstellt und eingerichtet (einmalig)',
      'E-Mail-Postfächer strukturiert eingerichtet, mit Unterordnern und Regeln für den Alltag',
      'Lokale Seiten für Ihre Orte und Leistungen',
      'Monatsbericht: Besucher, Anfragen, Suchbegriffe',
      'Wir verbessern laufend den Weg vom Besucher zur Anfrage',
    ],
    empfohlen: true,
  },
  {
    id: 'wahrzeichen',
    name: 'Wahrzeichen',
    kurz: 'Website, Logo und Geschäftspapiere aus einer Hand',
    preis: 299.99,
    fuer: 'Für Gründer und Betriebe, die einen einheitlichen Auftritt wollen, von der Website bis zum Brief.',
    extras: ['Logo-Design', 'CI-Geschäftsbriefe nach DIN 5008', 'E-Mail-Signatur nach DIN 5008'],
    features: [
      'Alles aus „Wegweiser“',
      'Mobilfreundlich: optimiert für Handy, Tablet und PC',
      'Ständige Optimierung in Absprache mit Ihnen',
      'Logo-Design: 3 Entwürfe, 2 Korrekturrunden, Dateien für Web und Druck',
      'CI-Geschäftsbriefe nach DIN 5008: Briefbogen, Angebot, Rechnung',
      'Kurzer CI-Leitfaden: Farben, Schriften, Logo-Einsatz',
      'Quartalsgespräch zur Weiterentwicklung',
    ],
  },
];

/** In allen drei Paketen enthalten. */
export const IN_ALLEN = [
  'Keine Seitenbegrenzung',
  'Mobilfreundlich für Handy, Tablet und PC',
  '0 € Einrichtung',
  '20 E-Mail-Postfächer',
  'E-Mail-Signatur nach DIN 5008',
  'SEO und KI-Suche optimiert, leicht erklärt',
  'Impressum und Datenschutzerklärung nach aktuellem Stand',
  'Hosting in Deutschland, DSGVO-orientiert',
  'SSL, Domain, Updates und Backups',
  'Änderungen per Nachricht, im fairen Rahmen',
  '24 Monate Mindestlaufzeit',
];

export const VAT_FAKTOR = 1 + VAT_RATE;
/** Bruttopreis zu einem Nettopreis (kaufmännisch auf Cent gerundet). */
export const brutto = (netto: number) => Math.round(netto * VAT_FAKTOR * 100) / 100;

/** Gesamtkosten über die Mindestlaufzeit (0 € Einrichtung). */
export const gesamtLaufzeit = (p: Paket) => Math.round(p.preis * WAAS.laufzeitMonate * 100) / 100;

export const preisAb = () => Math.min(...PAKETE.map((p) => p.preis));

/** Euro-Format: ganze Beträge ohne Cent (490 €), sonst mit Cent (79,99 €). */
export const formatEuro = (n: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);

/** Preis-Zeilen für alle Seiten (aus PAKETE). */
export const preisKurz = () => `ab ${formatEuro(preisAb())} / Monat`;
export const preisLang = () => `ab ${formatEuro(preisAb())} im Monat, zzgl. MwSt.`;
export const preiseAlle = () => PAKETE.map((p) => `${p.name}: ${formatEuro(p.preis)} / Monat`).join(' · ') + ' (netto, zzgl. MwSt.)';
/** Hinweis unter den Paketpreisen. */
export const PREIS_HINWEIS = 'Alle Preise netto zzgl. gesetzlicher MwSt.; das Angebot richtet sich an Unternehmen und Selbstständige.';

/** Das Angebot in einem Satz. */
export const OFFER = 'Website, Hosting, Domain, SSL, Wartung, Backups und Betreuung sind im festen Monatspreis enthalten.';

export type IconName =
  | 'mail' | 'calendar' | 'rocket' | 'gauge' | 'key' | 'search' | 'chat' | 'pen' | 'server' | 'shield'
  | 'phone' | 'whatsapp' | 'chevron' | 'menu' | 'close' | 'arrow' | 'arrow-left' | 'check' | 'doc' | 'eye'
  | 'euro' | 'clock' | 'user' | 'layout' | 'cart' | 'target' | 'refresh' | 'tools' | 'pin' | 'globe' | 'chart'
  | 'code' | 'cloud' | 'cpu' | 'compass' | 'layers' | 'lock' | 'mic' | 'spark' | 'database' | 'home' | 'unlock'
  | 'users' | 'ticket' | 'book' | 'bot' | 'zap' | 'portal' | 'folder'
  // Prozess-Story „So arbeiten wir“ (aus der Hauptseite übernommen, 03.11.2026)
  | 'idee' | 'frage' | 'stern' | 'warnung' | 'ablauf' | 'impuls';

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
  { icon: 'mail', title: '20 E-Mail-Postfächer' },
  { icon: 'search', title: 'SEO und KI-Suche' },
  { icon: 'layers', title: 'Keine Seitenbegrenzung' },
];

/** Geschäftsmodell in Stichpunkten (Langfassung als Siegel: config/versprechen.ts). */
export const MODELL = [
  'Keine Einrichtungskosten',
  'Keine Seitenbegrenzung',
  'Fester Monatspreis, netto zzgl. MwSt.',
  `${WAAS.laufzeitMonate} Monate Mindestlaufzeit`,
  'Keine versteckten Kosten',
];

/** Ablauf aus Kundensicht in vier Schritten (auch Grundlage der animierten Ablauf-Szene). */
export const steps: { icon: IconName; title: string; short: string; text: string }[] = [
  { icon: 'calendar', title: 'Erstgespräch', short: 'Kostenlos, unverbindlich', text: 'Wir lernen Ihr Unternehmen kennen und klären, was Ihre Website leisten soll.' },
  { icon: 'chat', title: 'Beratung', short: 'Persönlich, mit Ihnen', text: 'Gemeinsam klären wir Zielgruppen, Positionierung und Customer Journey und planen, wie die Website Vertrauen aufbaut und Anfragen bringt.' },
  { icon: 'spark', title: 'KI-Umsetzung', short: 'Sie prüfen und geben frei', text: 'Unsere KI setzt die Ergebnisse schnell um. Sie prüfen den Entwurf, wir arbeiten nach, bis alles passt.' },
  { icon: 'chart', title: 'Live & betreut', short: 'Laufend verbessert', text: 'Ihre Website geht online. Danach pflegen wir sie und entwickeln sie laufend weiter.' },
];

/** Gemeinsam in der Beratung erarbeitet. */
export const BERATUNG_THEMEN = ['Zielgruppen', 'Positionierung', 'Customer Journey', 'Vertrauensaufbau', 'Lead-Generierung', 'Digitale Prozesse'];

export const faqs = [
  {
    q: 'Was kostet eine Website bei waybuild?',
    a: `Es gibt drei Pakete: ${PAKETE.map((p) => `${p.name} für ${formatEuro(p.preis)} netto im Monat (${formatEuro(brutto(p.preis))} inkl. MwSt.)`).join(', ')}. Alle Preise netto zzgl. gesetzlicher MwSt., ohne Einrichtungskosten und ohne Seitenbegrenzung.`,
  },
  {
    q: 'Was ist der Unterschied zwischen den drei Paketen?',
    a: `${PAKETE[0].name} bringt Sie professionell online, mit 20 E-Mail-Postfächern und einer E-Mail-Signatur nach DIN 5008. ${PAKETE[1].name} erstellt zusätzlich Ihr Google-Unternehmensprofil, richtet Ihre Postfächer mit Ordnern und Regeln ein und verbessert laufend den Weg zur Anfrage. ${PAKETE[2].name} enthält außerdem Logo-Design, Geschäftsbriefe nach DIN 5008 und eine ständige Optimierung in Absprache mit Ihnen.`,
  },
  {
    q: 'Was ist bei Website as a Service enthalten?',
    a: 'Persönliche Beratung, KI-gestützte Erstellung ohne Seitenbegrenzung, Hosting in Deutschland, Domainverwaltung, SSL, Wartung, Backups, 20 E-Mail-Postfächer, eine E-Mail-Signatur nach DIN 5008 und laufende Betreuung. Ihre Website ist für Google und KI-Suchen optimiert, und wir erklären in leichter Sprache, was wir dafür tun. Sie zahlen einen festen Monatspreis und keine Einrichtungskosten.',
  },
  {
    q: 'Wie lange läuft der Vertrag?',
    a: `Die Mindestlaufzeit beträgt ${WAAS.laufzeitMonate} Monate. Danach läuft das Abo monatlich weiter und ist mit einem Monat Frist zum Monatsende kündbar. Die Kündigung genügt in Textform, zum Beispiel per E-Mail.`,
  },
  {
    q: 'Was passiert nach 24 Monaten?',
    a: 'Nichts Überraschendes: Ihre Website läuft weiter wie bisher, zum gleichen Monatspreis und mit derselben Betreuung. Ab dann können Sie jeden Monat kündigen, mit einem Monat Frist zum Monatsende.',
  },
  {
    q: 'Gibt es Einrichtungskosten?',
    a: 'Nein. In allen drei Paketen zahlen Sie keine Einrichtungsgebühr, nur den festen Monatspreis. Viele Anbieter verlangen vorab mehrere hundert Euro, bei uns fällt das weg.',
  },
  {
    q: 'Wie viele Seiten bekommt meine Website?',
    a: 'So viele, wie Ihr Unternehmen braucht. Es gibt in keinem Paket eine Seitenbegrenzung.',
  },
  {
    q: 'Kann ich später in ein größeres Paket wechseln?',
    a: 'Ja, ein Wechsel in ein größeres Paket ist möglich. Sagen Sie uns einfach Bescheid, die Einzelheiten besprechen wir mit Ihnen.',
  },
  {
    q: 'Wie schnell ist meine Website online?',
    a: 'Spätestens 14 Tage, nachdem Ihre Inhalte (Texte, Bilder, Logo) vorliegen. Auf Wunsch erarbeiten wir die Inhalte gemeinsam mit Ihnen.',
  },
  {
    q: 'Welche Rolle spielt KI?',
    a: 'Strategie, Positionierung und Inhalte erarbeiten wir persönlich mit Ihnen. Danach setzt unsere KI die Ergebnisse um, und das geht deutlich schneller als von Hand. Die Ideen kommen weiter von Menschen.',
  },
  {
    q: 'Kann ich meine bestehende Domain mitnehmen?',
    a: 'Ja. Wir übernehmen die Verwaltung Ihrer bestehenden Domain ohne Ausfall.',
  },
  {
    q: 'Bietet waybuild auch Software, Cloud und IT an?',
    a: 'Unser Angebot startet mit Website as a Service. Daraus entwickeln wir Schritt für Schritt eine digitale Unternehmensplattform. Individuelle Software, Nextcloud und IT-Betreuung setzen wir schon heute auf Anfrage als eigenes Projekt um.',
  },
  {
    q: 'Sind die Preise netto?',
    a: 'Ja. Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer von 19 %. Zum Beispiel kostet Fundament 79,99 € netto im Monat, das sind 95,19 € inkl. MwSt. Unser Angebot richtet sich ausschließlich an Unternehmen und Selbstständige (B2B).',
  },
];
