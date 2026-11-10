// Zentrale Inhalte der Website. Alles mit "TODO" sind Platzhalter, bis die echten Firmendaten vorliegen.
import { ABO_PAKETE, KOMPLETTPAKET, EINMALIG_DAZU, LAUFZEIT_MONATE, MWST_SATZ, paketById, einmalSumme, komplettZeile, kombiPreise, kombiZeile, type AboPaket } from './pakete-abo';

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
/** Erreichbarkeit (Footer-Kopf, Kontakt, Menü, llms.txt). 9 bis 17 Uhr: Jamil, Talk qh87y3sj #5322 (Q4). */
export const HOURS = 'Montag bis Freitag, 9 bis 17 Uhr';

/** Referenzprojekte – leer lassen, bis echte Kundenprojekte (mit Freigabe) vorliegen. */
// Beispiel: { name: 'Tischlerei Muster', branche: 'Handwerk', url: 'https://…', text: 'Neue Website, 3× mehr Anfragen', bild: 'referenzen/projekt-1' }
export const references: { name: string; branche: string; url?: string; text: string; bild?: string }[] = [];

export const VAT_RATE = MWST_SATZ;

/* ─────────────────────────────────────────────────────────────────────────────
 * DAS ANGEBOT „Website as a Service“ in festen Monatspaketen ohne Einrichtungskosten (Extras einmalig dazubuchbar)
 * (Jamil, Talk qh87y3sj #5056, 08.11.2026): Basis · Plus, optional dazu das Komplettpaket (Auftragsverwaltung, #5450–#5464).
 * EINZIGE Datenquelle für Namen, Preise und Inhalte: config/pakete-abo.ts (ABO_PAKETE, KOMPLETTPAKET, EINMALIG_DAZU).
 * PAKETE hier ist nur die daraus abgeleitete Kurzform für ältere Komponenten, FAQ, JSON-LD und llms.txt.
 * Preise sind NETTO zzgl. 19 % USt (B2B), der Bruttopreis steht klein darunter.
 * Preise NIE fest in Texte schreiben – immer aus pakete-abo.ts bzw. PAKETE.
 * Laufzeit: 24 Monate Mindestlaufzeit, danach monatlich kündbar (AGB § 5).
 * Keine Eigentumsaussagen zu Website/Code/Domain (Can, Talk 4513 – Mietmodell offen).
 * (Frühere Pakete Fundament/Wegweiser/Wahrzeichen und der Abo-Baukasten: siehe Git-Historie.)
 * ───────────────────────────────────────────────────────────────────────────── */
export const WAAS = {
  name: 'Website as a Service',
  claim: 'Ein Ansprechpartner, ein System, ein fester Monatspreis.',
  einrichtung: 0,
  laufzeitMonate: LAUFZEIT_MONATE,
  /** Laufzeit in einem Satz (AGB § 5). */
  laufzeit: `${LAUFZEIT_MONATE} Monate Mindestlaufzeit, danach monatlich kündbar`,
};

export type Paket = {
  id: AboPaket['id'];
  name: string;
  /** Kurz-Nutzen unter dem Namen */
  kurz: string;
  /** Monatspreis NETTO zzgl. 19 % USt */
  preis: number;
  /** Für wen – ein Satz aus Kundensicht */
  fuer: string;
  /** Herausgehobene Extras als Chips (bei den neuen Paketen leer) */
  extras: string[];
  /** Inhalte als Kurztexte; ab Plus beginnt die Liste mit „Alles aus …“ */
  features: string[];
  empfohlen?: boolean;
};

/** Kurztext einer Paket-Leistung (der längere von text/zeile); Mengenangaben (z. B. „1 Verbesserung im Monat“) in Klammern. */
const leistungText = (l: AboPaket['leistungen'][number]) =>
  l.wert && /\d/.test(l.wert) ? `${l.text} (${l.wert})` : [l.text, l.zeile ?? ''].sort((x, y) => y.length - x.length)[0];

export const PAKETE: Paket[] = ABO_PAKETE.map((p) => ({
  id: p.id,
  name: p.name,
  kurz: p.kurz,
  preis: p.preis,
  fuer: p.fuer,
  empfohlen: p.empfohlen,
  extras: [],
  features: [...(p.baut ? [`Alles aus „${paketById(p.baut).name}“`] : []), ...p.leistungen.map(leistungText)],
}));

/** Paket per id (für „ab Paket …“-Hinweise auf Leistungs-, Branchen- und Ratgeberseiten). */
export const paketVon = (id: Paket['id']) => PAKETE.find((p) => p.id === id)!;

/** Einmalig dazubuchbare Leistungen als eine Zeile, z. B. „Logo 590 €, …“. */
export const einmaligZeile = () => EINMALIG_DAZU.liste.map((e) => `${e.name} ${formatEuro(e.preis)}`).join(', ');

/** In beiden Paketen enthalten (aus den Basis-Leistungen in pakete-abo.ts). */
export const IN_ALLEN = [
  'Keine Seitenbegrenzung',
  'Mobilfreundlich für Handy, Tablet und PC',
  '0 € Einrichtung',
  'Bis zu 20 E-Mail-Postfächer',
  'E-Mail-Signatur nach DIN 5008',
  'Suchmaschinen-Optimierung beim Erstellen',
  'Aufbereitung für KI-Assistenten',
  'Impressum und Datenschutzerklärung nach aktuellem Stand',
  'Hosting in Deutschland, DSGVO-orientiert',
  'SSL, Domain, Updates und Backups',
  'Änderungen per Nachricht, im fairen Rahmen',
  `${LAUFZEIT_MONATE} Monate Mindestlaufzeit`,
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
    a: `Es gibt zwei feste Monatspakete: ${PAKETE.map((p) => `${p.name} für ${formatEuro(p.preis)} netto im Monat (${formatEuro(brutto(p.preis))} inkl. MwSt.)`).join(', ')}. Optional dazu: ${komplettZeile()}, eine Auftragsverwaltung. ${kombiPreise().map((k) => `${kombiZeile(k)}.`).join(' ')}${kombiPreise().length && !KOMPLETTPAKET.kombiMitGruenderpaket ? ` Die Kombipreise gelten nicht zusammen mit dem Gesamtpaket „${EINMALIG_DAZU.gesamt.name}“.` : ''} Einrichtungskosten gibt es nicht, und keine Seitenbegrenzung. Wer möchte, bucht einmalig dazu: ${einmaligZeile()}. Alle Preise netto zzgl. gesetzlicher MwSt.`,
  },
  {
    q: 'Was ist der Unterschied zwischen den Paketen?',
    a: `${PAKETE[0].name} bringt Sie professionell online: Website ohne Seitenbegrenzung, Suchmaschinen-Optimierung beim Erstellen, bis zu 20 E-Mail-Postfächer mit Signatur nach DIN 5008 und eine Aufbereitung für KI-Assistenten. ${PAKETE[1].name} richtet zusätzlich Ihr Google-Profil ein und pflegt es, optimiert Ihre Seiten gezielt für die Suchen Ihrer Kunden, ordnet Ihre Postfächer mit Ordnern und Regeln, schickt einen Monatsbericht und prüft monatlich, wie KI-Assistenten Sie beschreiben. Das ${KOMPLETTPAKET.name} buchen Sie optional zusätzlich zu Basis oder Plus: ${KOMPLETTPAKET.text.replace(/ Zusätzlich zu Basis oder Plus buchbar\.$/, '')}`,
  },
  {
    q: 'Was ist bei Website as a Service enthalten?',
    a: 'Schon im Paket Basis: persönliche Beratung, KI-gestützte Erstellung ohne Seitenbegrenzung, Hosting in Deutschland, Domainverwaltung, SSL, Wartung, Backups, bis zu 20 E-Mail-Postfächer mit Signatur nach DIN 5008 und laufende Betreuung. Ihre Website wird beim Erstellen für Google optimiert und für KI-Assistenten aufbereitet, und wir erklären in leichter Sprache, was wir dafür tun. Sie zahlen einen festen Monatspreis und keine Einrichtungskosten.',
  },
  {
    q: 'Wie lange läuft der Vertrag?',
    a: `Die Mindestlaufzeit beträgt ${WAAS.laufzeitMonate} Monate. Danach läuft das Abo monatlich weiter und ist mit einem Monat Frist zum Monatsende kündbar. Die Kündigung genügt in Textform, zum Beispiel per E-Mail.`,
  },
  {
    q: 'Was passiert nach 24 Monaten?',
    a: 'Ihre Website läuft weiter, mit derselben Betreuung. Ab dann können Sie jeden Monat kündigen, mit einem Monat Frist zum Monatsende.',
  },
  {
    q: 'Gibt es Einrichtungskosten?',
    a: 'Nein. Auch einmalige Arbeiten wie die Einrichtung Ihrer Website oder das Google-Profil im Paket Plus sind im Monatspreis enthalten. Einen einmaligen Festpreis zahlen Sie nur, wenn Sie etwas zusätzlich dazubuchen, zum Beispiel ein Logo.',
  },
  {
    q: 'Was kann ich einmalig dazubuchen?',
    a: `${EINMALIG_DAZU.liste.map((e) => `${e.name} für ${formatEuro(e.preis)}`).join(', ')}, oder alle vier zusammen als Gesamtpaket für ${formatEuro(EINMALIG_DAZU.gesamt.preis)} statt ${formatEuro(einmalSumme())}. Das sind einmalige Festpreise netto zzgl. MwSt., ohne monatliche Kosten.`,
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
    a: 'In der Regel innerhalb von 14 Tagen, nachdem Ihre Inhalte (Texte, Bilder, Logo) vorliegen. Auf Wunsch erarbeiten wir die Inhalte gemeinsam mit Ihnen.',
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
    a: `Ja. Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer von 19 %. Zum Beispiel kostet ${PAKETE[0].name} ${formatEuro(PAKETE[0].preis)} netto im Monat, das sind ${formatEuro(brutto(PAKETE[0].preis))} inkl. MwSt. Unser Angebot richtet sich ausschließlich an Unternehmen und Selbstständige (B2B).`,
  },
];
