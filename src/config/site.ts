// Zentrale Inhalte der Website. Alles mit "TODO" sind Platzhalter, bis die echten Firmendaten vorliegen.
import { ABO_PAKETE, KOMPLETTPAKET, EINMALIG_DAZU, LAUFZEIT_MONATE, MWST_SATZ, SEITEN_MAX, WARUM_24, paketById, einmalSumme, komplettZeile, kombiPreise, kombiZeile, type AboPaket } from './pakete-abo';

/**
 * Gelbe "Fehlt: …"-Hinweise auf der Website anzeigen.
 * Vor dem offiziellen Start auf false setzen – dann verschwinden alle Hinweise und Platzhalter-Bereiche.
 */
export const SHOW_HINTS = true;

/** Ein Wert gilt als fehlend, wenn er leer ist oder mit "TODO" beginnt. */
export const isMissing = (v?: string | null) => !v || v.trim().startsWith('TODO');

export const company = {
  name: 'webgold',
  legalName: 'Waybuild UG (haftungsbeschränkt)',
  slogan: 'Menschliche Beratung. KI-gestützte Umsetzung. Kontinuierliche Verbesserung.',
  email: 'service@webgold.io', // Jamil #6055 Fr. 12 (vorher kontakt@waybuild.de); auch im Impressum
  /** Telefon und WhatsApp (Jamil #6055 Fr. 1 + 2: 015156156578, auch WhatsApp). Anzeige gegliedert, tel:/wa.me über phoneTel(). */
  phone: '0151 56156578',
  street: 'Kuno-Liesenberg-Kehre 32a', // laut Handelsregister (Can, Talk qh87y3sj #5978/#5980, 15.11.2026); vorher Rathausallee 76, 22846
  zip: '22844',
  city: 'Norderstedt',
  country: 'DE',
  managingDirector: 'Can Siebert',
  registerCourt: 'Amtsgericht Kiel', // Handelsregister-Auszug vom 15.11.2026 (Can, Talk qh87y3sj #5978)
  registerNumber: 'HRB 29883 KI', // Handelsregister-Auszug vom 15.11.2026 (Can, Talk qh87y3sj #5978)
  vatId: '', // keine USt-IdNr. vorhanden → Zeile im Impressum ausgeblendet (Can #5980); sobald vorhanden hier eintragen
  /** Server-Hoster für die Datenschutzerklärung, z. B. 'IONOS SE, Elgendorfer Str. 57, 56410 Montabaur' */
  hoster: 'ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich, Hauptstraße 68, 02742 Friedersdorf', // Webspace ALL-INKL (Can #5980)
  /** Links zu Google-Unternehmensprofil, LinkedIn, Instagram … – stärkt die Marke bei Google (JSON-LD sameAs). */
  sameAs: [] as string[],
  /** Gründungsjahr (Jamil #6055 Fr. 11), auch JSON-LD foundingDate */
  foundingYear: '2026',
};

/** Belegbare Vertrauens-Fakten (Jamil #6055 Fr. 11: Gründungsjahr 2026, 5 betreute Websites, keine Tracking-Cookies). Keine IHK-Angabe (nicht bestätigt).
 *  Websites-Zahl bei neuen Kunden hier anpassen. „Keine Tracking-Cookies“ stimmt: die Seite setzt keine Cookies und lädt keine Analyse-Dienste. */
export const BETREUTE_WEBSITES = 5;
export const FAKTEN = [
  { wert: company.foundingYear, text: 'gegründet' },
  { wert: String(BETREUTE_WEBSITES), text: 'betreute Websites' },
  { wert: '0', text: 'Tracking-Cookies' },
];

/** Solange true, gilt company.phone als erfundene Platzhalter-Nummer (Checkliste offen, nicht an Google melden). */
export const PHONE_IS_PLACEHOLDER = false; // echte Nummer seit Jamil #6055 Fr. 1
/** Telefon-Helfer: tel:-Link und WhatsApp-Link (wa.me) aus company.phone. */
export const phoneTel = () => '+49' + company.phone.replace(/\s/g, '').replace(/^0/, '');
// Vorlagetext wie auf der Startseite (Jamil #6038, Audit K1; vorher „… für Website as a Service.“)
export const whatsappLink = (text = 'Hallo webgold, ich interessiere mich für eine kostenlose Erstberatung.') =>
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
  name: 'Website-Abo', // Jamil #6055 Fr. 21 (vorher „Website as a Service“)
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
  `Bis zu ${SEITEN_MAX} Seiten`, // Jamil #6055 Fr. 30 (vorher „Keine Seitenbegrenzung“)
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
  `Bis zu ${SEITEN_MAX} Seiten`, // Jamil #6055 Fr. 30
  'Fester Monatspreis, netto zzgl. MwSt.',
  `${WAAS.laufzeitMonate} Monate Mindestlaufzeit`,
  'Alle Kosten auf einen Blick', // Jamil #6011, Audit #5953 W3
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
    q: 'Was kostet eine Website bei webgold?', // „drei Pakete“: Jamil #6011, Audit #5953 P1 (vorher „zwei feste Monatspakete“)
    a: `Es gibt drei Pakete, davon zwei Website-Pakete mit festem Monatspreis: ${PAKETE.map((p) => `${p.name} für ${formatEuro(p.preis)} netto im Monat (${formatEuro(brutto(p.preis))} inkl. MwSt.)`).join(', ')}. Nur zusammen mit Online sichtbar oder Online wachsen buchbar: ${komplettZeile()}, eine Web-App für Ihre Aufträge. ${kombiPreise().map((k) => `${kombiZeile(k)}.`).join(' ')}${kombiPreise().length && !KOMPLETTPAKET.kombiMitGruenderpaket ? ` Die Kombipreise gelten nicht zusammen mit dem Gesamtpaket „${EINMALIG_DAZU.gesamt.name}“.` : ''} Einrichtungskosten gibt es nicht, und bis zu ${SEITEN_MAX} Seiten sind im Monatspreis enthalten. Wer möchte, bucht einmalig dazu: ${einmaligZeile()}. Alle Preise netto zzgl. gesetzlicher MwSt.`,
  },
  {
    q: 'Was ist der Unterschied zwischen den Paketen?',
    a: `${PAKETE[0].name} bringt Sie professionell online: Website mit bis zu ${SEITEN_MAX} Seiten, Suchmaschinen-Optimierung beim Erstellen, bis zu 20 E-Mail-Postfächer mit Signatur nach DIN 5008, eine Aufbereitung für KI-Assistenten und die Einrichtung Ihres Google-Profils. ${PAKETE[1].name} pflegt zusätzlich Ihr Google-Profil, optimiert Ihre Seiten gezielt für die Suchen Ihrer Kunden, ordnet Ihre Postfächer mit Ordnern und Regeln, schickt einen Monatsbericht und prüft monatlich, wie KI-Assistenten Sie beschreiben. Das ${KOMPLETTPAKET.name} buchen Sie nur zusammen mit Online sichtbar oder Online wachsen, einzeln ist es nicht buchbar: ${KOMPLETTPAKET.text.replace(/ Nur zusammen mit Online sichtbar oder Online wachsen buchbar\.$/, '')}`,
  },
  {
    q: 'Was ist im Website-Abo enthalten?', // Jamil #6055 Fr. 21 (vorher „… bei Website as a Service …“)
    a: `Schon im Paket Online sichtbar: persönliche Beratung, KI-gestützte Erstellung von bis zu ${SEITEN_MAX} Seiten, Hosting in Deutschland, Domainverwaltung, SSL, Wartung, Backups, bis zu 20 E-Mail-Postfächer mit Signatur nach DIN 5008 und laufende Betreuung. Ihre Website wird beim Erstellen für Google optimiert und für KI-Assistenten aufbereitet, und wir erklären in leichter Sprache, was wir dafür tun. Sie zahlen einen festen Monatspreis und keine Einrichtungskosten.`,
  },
  {
    q: 'Wie lange läuft der Vertrag?',
    a: `Die Mindestlaufzeit beträgt ${WAAS.laufzeitMonate} Monate. Danach läuft das Abo monatlich weiter und ist mit einem Monat Frist zum Monatsende kündbar. Die Kündigung genügt in Textform, zum Beispiel per E-Mail.`,
  },
  {
    q: 'Was passiert nach 24 Monaten?',
    a: 'Der Preis bleibt gleich. Ihre Website läuft weiter, mit derselben Betreuung. Ab dann können Sie jeden Monat kündigen, mit einem Monat Frist zum Monatsende.', // Jamil #6055 Fr. 8
  },
  {
    q: 'Warum 24 Monate?', // Jamil #6055 Fr. 31
    a: WARUM_24,
  },
  {
    q: 'Gibt es Einrichtungskosten?',
    a: 'Nein. Auch einmalige Arbeiten wie die Einrichtung Ihrer Website oder Ihres Google-Profils sind im Monatspreis enthalten. Einen einmaligen Festpreis zahlen Sie nur, wenn Sie etwas zusätzlich dazubuchen, zum Beispiel ein Logo.',
  },
  {
    q: 'Was kann ich einmalig dazubuchen?',
    a: `${EINMALIG_DAZU.liste.map((e) => `${e.name} für ${formatEuro(e.preis)}`).join(', ')}, oder alle vier zusammen als Gesamtpaket für ${formatEuro(EINMALIG_DAZU.gesamt.preis)} statt ${formatEuro(einmalSumme())}. Das sind einmalige Festpreise netto zzgl. MwSt., ohne monatliche Kosten.`,
  },
  {
    q: 'Wie viele Seiten bekommt meine Website?', // Jamil #6055 Fr. 30: 15-Seiten-Grenze
    a: `Bis zu ${SEITEN_MAX} Seiten sind in jedem Paket im Monatspreis enthalten. Welche Seiten Ihre Kunden wirklich brauchen, legen wir gemeinsam mit Ihnen fest. Brauchen Sie mehr, sprechen Sie uns an.`,
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
    a: 'Strategie, Positionierung und Inhalte erarbeiten wir persönlich mit Ihnen. Danach setzt unsere KI die Ergebnisse um, und das geht schneller als von Hand. Die Ideen kommen weiter von Menschen.',
  },
  {
    q: 'Kann ich meine bestehende Domain mitnehmen?',
    a: 'Ja. Wir übernehmen die Verwaltung Ihrer bestehenden Domain, in der Regel ohne Ausfall.', // „in der Regel“ (Jamil #6038, Audit W4)
  },
  {
    q: 'Bietet webgold auch Software, Cloud und IT an?',
    a: 'Unser Angebot startet mit dem Website-Abo. Daraus entwickeln wir Schritt für Schritt eine digitale Unternehmensplattform. Individuelle Software, Nextcloud und IT-Betreuung setzen wir schon heute auf Anfrage als eigenes Projekt um.',
  },
  // Fehlende Einwände (Jamil #6038, Audit F3): nur mit Aussagen, die schon in pakete-abo.ts bzw. den FAQ oben stehen
  {
    q: 'Kann ich die Web-App ohne Website buchen?',
    a: `Im Paket „${KOMPLETTPAKET.name}“ gibt es die Web-App nur zusammen mit ${PAKETE.map((p) => p.name).join(' oder ')}. Individuelle Software ohne Website setzen wir auf Anfrage als eigenes Projekt um.`,
  },
  {
    q: 'Ich habe schon eine Website. Was passiert damit?',
    a: 'Wir bauen Ihre neue Website im Hintergrund auf. Online geht sie erst nach Ihrer Freigabe, bis dahin kann Ihre bisherige Website online bleiben. Ihre bestehende Domain können Sie mitnehmen.',
  },
  {
    q: 'Sind die Preise netto?',
    a: `Ja. Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer von 19 %. Zum Beispiel kostet ${PAKETE[0].name} ${formatEuro(PAKETE[0].preis)} netto im Monat, das sind ${formatEuro(brutto(PAKETE[0].preis))} inkl. MwSt. Unser Angebot richtet sich ausschließlich an Unternehmen und Selbstständige (B2B).`,
  },
  // Jamil #5933 (14.11.2026): Fragen, die Ängste nehmen. Nur Aussagen aus den Configs (14 Tage nach Inhalten, Domain ohne
  // Ausfall, Freigabe vor Veröffentlichung, fester Ansprechpartner, Hosting in Deutschland), keine Garantien (UWG).
  // Eigentum/Rechte bewusst weggelassen: in pakete-abo.ts noch offen (Platzhalter beim Logo).
  {
    q: 'Was passiert mit meinen alten E-Mails?', // Jamil #5933
    a: 'Das besprechen wir vorab mit Ihnen. In der Regel lassen sich Ihre bestehenden E-Mails in die neuen Postfächer übertragen. Wann und wie wir umstellen, stimmen wir mit Ihnen ab.',
  },
  {
    q: 'Wie lange dauert die Umstellung?', // Jamil #5933
    a: 'Ihre neue Website ist in der Regel innerhalb von 14 Tagen online, nachdem Ihre Inhalte (Texte, Bilder, Logo) vorliegen. Den Zeitpunkt der Umstellung von Domain und E-Mail-Postfächern legen wir gemeinsam mit Ihnen fest.',
  },
  {
    q: 'Kann ich während der Umstellung normal weiterarbeiten?', // Jamil #5933 („Werde ich arbeitsunfähig sein für eine Zeit?“)
    a: 'Das ist unser Ziel. Wir bauen Ihre neue Website im Hintergrund auf, und online geht sie erst nach Ihrer Freigabe. Die Verwaltung Ihrer bestehenden Domain übernehmen wir in der Regel ohne Ausfall. Den Zeitpunkt für die E-Mail-Umstellung stimmen wir vorab mit Ihnen ab.',
  },
  {
    q: 'Muss ich mich mit Technik auskennen?', // Jamil #5933
    a: 'Nein. Hosting, Sicherheitsupdates, SSL und Backups erledigen wir im Hintergrund. Änderungswünsche schicken Sie uns einfach per Nachricht, auch als Sprachnachricht. Was wir für Google und KI-Assistenten tun, erklären wir Ihnen in leichter Sprache.',
  },
  {
    q: 'Was ist, wenn mir die Website nicht gefällt?', // Jamil #5933
    a: 'Sie sehen die Website, bevor sie online geht. Wir erarbeiten die Inhalte mit Ihnen, setzen sie um, und Sie geben frei. Was Ihnen nicht gefällt, sagen Sie uns, und wir besprechen die Änderungen mit Ihnen.',
  },
  {
    q: 'Was passiert bei Problemen oder Ausfällen?', // Jamil #5933
    a: `Sie melden sich bei Ihrem festen Ansprechpartner, mit Vertretung bei Urlaub oder Krankheit, ${HOURS}. Sie landen weder in einem Callcenter noch in einem Ticketsystem. Wartung, Sicherheitsupdates und Backups sind im Monatspreis enthalten.`, // Jamil #6055 Fr. 29 (Vertretung)
  },
  {
    q: 'Ich habe wenig Zeit. Schaffe ich das neben dem Tagesgeschäft?', // Jamil #5933
    a: 'Ja, der Aufwand für Sie bleibt überschaubar. Das Erstgespräch dauert rund 30 Minuten. Auf Wunsch erarbeiten wir die Inhalte gemeinsam mit Ihnen, und Änderungen schicken Sie einfach per Nachricht.', // Jamil #6055 Fr. 15 (30 Minuten)
  },
];
