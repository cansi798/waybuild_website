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
 * DAS EINE ANGEBOT (Unternehmensvision Jamil, 17.10.2026): „Website as a Service“.
 * Bewusst keine Pakete/Tarife mehr – ein Preis, ein Ansprechpartner, ein System.
 * (Die früheren Tarife Start/Business/Premium + 490 € Einrichtung stehen in der Git-Historie.)
 * ───────────────────────────────────────────────────────────────────────────── */
export const WAAS = {
  name: 'Website as a Service',
  claim: 'Ein Preis. Ein Ansprechpartner. Ein System.',
  /**
   * Fester Monatspreis (netto). null = noch nicht festgelegt → die Website zeigt
   * „Fester Monatspreis – nennen wir im Erstgespräch“ (und in der Vorschau einen „Fehlt“-Hinweis).
   */
  preisMonat: null as number | null,
  einrichtung: 0,
  laufzeitMonate: 24,
};

export const formatEuro = (n: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

/** Preis-Zeile für alle Seiten – nie einen Preis fest in Texte schreiben. */
export const preisKurz = () => (WAAS.preisMonat ? `${formatEuro(WAAS.preisMonat)} / Monat` : 'Fester Monatspreis');
export const preisLang = () =>
  WAAS.preisMonat ? `${formatEuro(WAAS.preisMonat)} im Monat, netto` : 'Fester Monatspreis – nennen wir Ihnen im Erstgespräch';

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
  'Fester Monatspreis',
  `${WAAS.laufzeitMonate} Monate Laufzeit`,
  'Website, Code und Domain gehören Ihnen',
  'Keine versteckten Kosten',
  'Kein künstlicher Lock-in',
];

/** Arbeitsweise in drei Schritten (auch Grundlage der animierten Ablauf-Szene). */
export const steps: { icon: IconName; title: string; short: string; text: string }[] = [
  { icon: 'chat', title: 'Beratung', short: 'Persönlich, mit Ihnen', text: 'Zielgruppen, Positionierung, Customer Journey, Vertrauensaufbau, Lead-Generierung und digitale Prozesse – gemeinsam entwickelt.' },
  { icon: 'spark', title: 'KI-Umsetzung', short: 'In Rekordzeit online', text: 'Unsere KI setzt die Ergebnisse um. Sie prüfen, wir feilen – bis alles passt.' },
  { icon: 'chart', title: 'Verbesserung', short: 'Kontinuierlich', text: 'Ihre Website bleibt nicht stehen: Wir betreuen, pflegen und entwickeln sie laufend weiter.' },
];

/** Gemeinsam in der Beratung erarbeitet. */
export const BERATUNG_THEMEN = ['Zielgruppen', 'Positionierung', 'Customer Journey', 'Vertrauensaufbau', 'Lead-Generierung', 'Digitale Prozesse'];

export const faqs = [
  {
    q: 'Was bedeutet „Website as a Service“?',
    a: 'Sie bekommen Ihre Website als Komplettleistung: persönliche Beratung, KI-gestützte Erstellung, Hosting, Domainverwaltung, SSL, Wartung, Backups und laufende Betreuung – zu einem festen Monatspreis und ohne Einrichtungskosten. Es gibt bewusst keine Pakete oder Tarife.',
  },
  {
    q: 'Was kostet das?',
    a: WAAS.preisMonat
      ? `${formatEuro(WAAS.preisMonat)} im Monat (netto), ohne Einrichtungskosten und ohne versteckte Kosten.`
      : 'Einen festen Monatspreis – ohne Einrichtungskosten und ohne versteckte Kosten. Den Preis nennen wir Ihnen im kostenlosen Erstgespräch.',
  },
  {
    q: 'Wie lange läuft der Vertrag?',
    a: `Die Laufzeit beträgt ${WAAS.laufzeitMonate} Monate. Wir möchten langfristiges Vertrauen aufbauen – keine künstliche Abhängigkeit.`,
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
    q: 'Wie schnell ist meine Website online?',
    a: 'Spätestens 14 Tage, nachdem Ihre Inhalte (Texte, Bilder, Logo) vorliegen. Auf Wunsch erarbeiten wir die Inhalte gemeinsam mit Ihnen.',
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
    a: 'Ja. Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer von 19 %. Unser Angebot richtet sich an Unternehmen und Selbstständige (B2B).',
  },
];
