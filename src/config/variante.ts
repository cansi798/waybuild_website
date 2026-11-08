// VARIANTE „an firma.de orientiert“ (Jamil, Talk qh87y3sj #5016/#5017, 08.11.2026). NUR VORSCHLAG zum Vergleich.
// Seiten: src/pages/variante/ (noindex, nicht in der Sitemap). Die normale Startseite, /preise/, der Baukasten,
// PAKETE (site.ts) und AGB bleiben unverändert. Entfernen: Ordner src/pages/variante, src/components/variante und
// diese Datei löschen, dazu den Sitemap-Ausschluss in astro.config.mjs.
//
// Idee: drei feste Monatspakete OHNE Einmalkosten. Einmalige Leistungen (Logo, Google-Profil einrichten, Ortsseiten,
// KI-Aufbereitung) werden über die Mindestlaufzeit (24 Monate) in den Monatspreis eingerechnet:
//   Paketpreis = Summe der Monatsbausteine + Summe(Einmalpreis ÷ 24), auf den nächsten Betrag mit ,99 gerundet.
// Alle Einzelpreise kommen aus BAUKASTEN (startseite.ts, Stand Jamil #4924/#4925), damit es nur EINE Zahlenquelle gibt.
// Rechnung und Quellen zur Logo-Frage: docs/variante-firma/preise.md. Preise legen Can und Jamil fest.
import { BAUKASTEN } from './startseite';
import { WAAS } from './site';

export const LAUFZEIT = WAAS.laufzeitMonate; // 24

/** Nächster Betrag mit ,99 (87,90 → 87,99 · 152,42 → 151,99 · 300,32 → 299,99). */
export const auf99 = (x: number) => Math.round(x - 0.99) + 0.99;
const cent = (x: number) => Math.round(x * 100) / 100;

type Quelle = { name: string; monatlich?: number; einmalig?: number };
const baustein = (id: string): Quelle => {
  const b = BAUKASTEN.bausteine.find((x) => x.id === id);
  if (!b) throw new Error(`variante.ts: Baustein ${id} fehlt in BAUKASTEN`);
  return { name: b.name, monatlich: b.preis, einmalig: b.einmalig };
};
const QUELLEN: Record<string, Quelle> = {
  website: { name: BAUKASTEN.basis.name, monatlich: BAUKASTEN.basis.preis },
  email: baustein('email'),
  ki: baustein('ki'),
  'google-profil': baustein('google-profil'),
  'google-pflege': baustein('google-pflege'),
  gefunden: baustein('gefunden'),
  bericht: baustein('bericht'),
  logo: baustein('logo'),
  optimierung: baustein('optimierung'),
  'ki-check': baustein('ki-check'),
  termin: baustein('termin'),
};

/** Ein Paketinhalt: Text für Kunden („… inklusive“) + Herkunft für die Preisrechnung. */
export type Inhalt = { quelle: keyof typeof QUELLEN; text: string; detail?: string };

export type VPaket = {
  id: 'basis' | 'plus' | 'komplett' | 'gruendung';
  name: string;
  kurz: string;
  fuer: string;
  empfohlen?: boolean;
  /** Paketinhalte, die über dem vorherigen Paket hinzukommen (bei Basis: alle) */
  inhalte: Inhalt[];
  /** „Alles aus …“ */
  baut?: VPaket['id'];
};

const WEBSITE: Inhalt[] = [
  { quelle: 'website', text: 'Website inklusive', detail: 'Ohne Seitenbegrenzung, für Handy, Tablet und PC, Texte mit Ihnen erarbeitet. Hosting in Deutschland, Updates, Sicherungen, Änderungen per Nachricht im fairen Rahmen.' },
  { quelle: 'email', text: 'E-Mail-Postfächer mit Signatur inklusive', detail: 'Bis zu 20 Postfächer mit Ihrer Adresse, einheitliche Signatur nach DIN 5008.' },
  { quelle: 'ki', text: 'Aufbereitung für KI-Assistenten inklusive', detail: 'So aufbereitet, dass ChatGPT und andere KI-Assistenten Ihr Angebot richtig verstehen.' },
];

export const VPAKETE: VPaket[] = [
  {
    id: 'basis', name: 'Basis', kurz: 'Professionell online',
    fuer: 'Für Selbstständige und kleine Betriebe, die gut gefunden werden und seriös auftreten wollen.',
    inhalte: WEBSITE,
  },
  {
    id: 'plus', name: 'Plus', kurz: 'Gefunden werden und Anfragen gewinnen', empfohlen: true, baut: 'basis',
    fuer: 'Für Betriebe vor Ort, die über Google regelmäßig neue Kunden gewinnen wollen.',
    inhalte: [
      { quelle: 'google-profil', text: 'Google-Profil einrichten inklusive', detail: 'Ihr Eintrag bei Google und Google Maps, mit Fotos, Leistungen und Öffnungszeiten.' },
      { quelle: 'google-pflege', text: 'Google-Profil pflegen inklusive', detail: 'Fotos, Leistungen und Öffnungszeiten bleiben aktuell.' },
      { quelle: 'gefunden', text: '5 Seiten für Ihre Orte und Leistungen inklusive', detail: 'Mit den Wörtern, nach denen Ihre Kunden suchen.' },
      { quelle: 'bericht', text: 'Monatsbericht inklusive', detail: 'Besucher, Anfragen, Suchbegriffe, kurz und verständlich.' },
    ],
  },
  {
    id: 'komplett', name: 'Komplett', kurz: 'Ein einheitlicher Auftritt, laufend verbessert', baut: 'plus',
    fuer: 'Für Unternehmen, die einen einheitlichen Auftritt wollen, von der Website bis zum Brief, und laufend dranbleiben möchten.',
    inhalte: [
      { quelle: 'logo', text: 'Logo und Geschäftspapiere inklusive', detail: 'Logo mit 3 Entwürfen und 2 Korrekturrunden, Briefbogen, Angebot und Rechnung im gleichen Stil.' },
      { quelle: 'optimierung', text: 'Laufende Verbesserung inklusive', detail: 'Jeden Monat 2 bis 3 Verbesserungen nach Absprache, alle drei Monate ein Gespräch.' },
      { quelle: 'ki-check', text: 'Monatlicher KI-Check inklusive', detail: 'Wir prüfen, ob KI-Assistenten Ihr Unternehmen richtig nennen.' },
    ],
  },
];

/** Gründungspaket (Jamil #5017): nur echte Leistungen, keine Rechts- oder Steuerberatung, keine Gründungsformalitäten. */
export const GRUENDUNG: VPaket = {
  id: 'gruendung', name: 'Gründung', kurz: 'Alles für Ihren digitalen Start',
  fuer: 'Für Gründerinnen und Gründer, die vom ersten Tag an professionell auftreten wollen.',
  inhalte: [
    ...WEBSITE,
    { quelle: 'logo', text: 'Logo und Geschäftspapiere inklusive', detail: 'Logo mit 3 Entwürfen und 2 Korrekturrunden, Briefbogen, Angebot und Rechnung im gleichen Stil.' },
    { quelle: 'google-profil', text: 'Google-Profil einrichten inklusive', detail: 'Damit man Sie bei Google und Google Maps von Anfang an findet.' },
    { quelle: 'termin', text: 'Online-Terminbuchung inklusive', detail: 'Kunden buchen freie Termine direkt auf Ihrer Website.' },
  ],
};

/** Alle Inhalte eines Pakets (inkl. „Alles aus …“). */
export const alleInhalte = (p: VPaket): Inhalt[] => {
  const vor = p.baut ? VPAKETE.find((x) => x.id === p.baut)! : undefined;
  return [...(vor ? alleInhalte(vor) : []), ...p.inhalte];
};

/** Rechenweg je Inhalt: Monatsanteil netto. */
export const rechenweg = (p: VPaket) =>
  alleInhalte(p).map((i) => {
    const q = QUELLEN[i.quelle];
    const anteil = q.monatlich ?? (q.einmalig ?? 0) / LAUFZEIT;
    return { name: q.name, monatlich: q.monatlich, einmalig: q.einmalig, anteil: cent(anteil) };
  });

/** Exakte Summe (ungerundet) und Paketpreis (auf ,99). */
export const summeExakt = (p: VPaket) => cent(alleInhalte(p).reduce((s, i) => { const q = QUELLEN[i.quelle]; return s + (q.monatlich ?? (q.einmalig ?? 0) / LAUFZEIT); }, 0));
export const preis = (p: VPaket) => auf99(summeExakt(p));
/** Nur die laufenden Monatsbausteine (für den Vorschlag „ab Monat 25“). */
export const nurMonatlich = (p: VPaket) => auf99(cent(alleInhalte(p).reduce((s, i) => s + (QUELLEN[i.quelle].monatlich ?? 0), 0)));

/** Auf Wunsch dazu (monatlich, keine Einmalkosten). */
const termin = QUELLEN.termin.monatlich!;
const weitereSeite = auf99(69 / LAUFZEIT); // BAUKASTEN-Hinweis „Jede weitere Seite 69 €“ ÷ 24
export const DAZU = [
  { name: 'Online-Terminbuchung', text: 'Kunden buchen freie Termine direkt auf Ihrer Website.', preis: termin },
  { name: 'Weitere Seite für einen Ort oder eine Leistung', text: 'Je Seite, zusätzlich zu den 5 Seiten im Paket Plus.', preis: weitereSeite },
];
export const AUF_ANFRAGE = ['Kundenverwaltung', 'Abläufe automatisieren', 'Social Media', 'Video', 'Software, Cloud und IT'];

/** Einstieg im ersten Bildschirm (firma.de-Vergleich Punkt 1 + 2). */
export const V_HERO = {
  eyebrow: 'Website-Abo für kleine und mittlere Unternehmen',
  titel: 'Ihre Website, fertig betreut, zum festen Monatspreis.',
  unter: 'Wir erstellen Ihre Website, richten E-Mail-Postfächer und Google-Profil ein und kümmern uns danach um alles. Drei feste Pakete, keine Einmalkosten.',
};

/** Vertrauensleiste: NUR, was die Website heute schon belegt (site.ts, kontakt.astro, startseite.ts). */
export const VERTRAUEN = [
  { icon: 'server', text: 'Hosting in Deutschland' },
  { icon: 'clock', text: 'Antwort innerhalb eines Werktags' },
  { icon: 'user', text: 'Ein persönlicher Ansprechpartner' },
  { icon: 'pin', text: 'Sitz in Norderstedt' },
] as const;

/** Kontrastsatz (firma.de-Vergleich Punkt 9). */
export const KONTRAST = {
  satz: 'Eine Website ist schnell gebaut. Dass sie auch in zwei Jahren noch Anfragen bringt, ist die eigentliche Arbeit.',
  text: 'Darum zahlen Sie bei uns keinen großen Betrag am Anfang, sondern einen festen Monatspreis. Darin steckt alles: Aufbau, Technik, Pflege und Ihr Ansprechpartner.',
};

/** Kurzer Vergleich nach Anbieter-Arten (UWG § 6: keine Namen, sachlich). Aus angebot.ts ANBIETER_VERGLEICH abgeleitet. */
export const VERGLEICH = {
  spalten: ['Selbst machen', 'Baukasten', 'Agentur', 'waybuild'],
  zeilen: [
    { frage: 'Wer schreibt die Texte?', werte: ['Sie selbst', 'Sie selbst, mit Vorlagen', 'Meist gegen Aufpreis', 'Wir, gemeinsam mit Ihnen'] },
    { frage: 'Wer kümmert sich um Google?', werte: ['Sie selbst', 'Sie selbst', 'Meist eigenes Angebot', 'Im Paket Plus und Komplett inklusive'] },
    { frage: 'Wer macht Updates und Sicherungen?', werte: ['Sie selbst', 'Der Anbieter, für die Technik', 'Mit Wartungsvertrag', 'Wir, im Monatspreis'] },
    { frage: 'Wen rufe ich an?', werte: ['Niemanden', 'Den allgemeinen Support', 'Je nach Vertrag', 'Ihren festen Ansprechpartner'] },
    { frage: 'Wie planbar sind die Kosten?', werte: ['Niedrig, aber viel Eigenarbeit', 'Monatlich, Inhalte selbst', 'Projektpreis, Pflege extra', 'Fester Monatspreis, keine Einmalkosten'] },
  ],
  hinweis: 'Allgemeine Einordnung nach Anbieter-Art aus unserer Erfahrung. Einzelne Anbieter können anders arbeiten.',
};

/** Ablauf als Zeitleiste (firma.de Punkt 8). Nur Werte, die die Website schon nennt; alles „in der Regel“. */
export const ZEITLEISTE = [
  { wann: 'Tag 1', titel: 'Anfrage', text: 'Sie schreiben uns über das Formular, per E-Mail oder WhatsApp.' },
  { wann: 'In der Regel nach 1 Werktag', titel: 'Rückmeldung', text: 'Wir melden uns persönlich und vereinbaren einen Termin.' },
  { wann: 'Rund 20 Minuten', titel: 'Erstgespräch', text: 'Kostenlos und unverbindlich. Wir lernen Ihr Unternehmen kennen und empfehlen das passende Paket.' },
  { wann: 'Danach', titel: 'Entwurf und Freigabe', text: 'Wir schreiben die Texte mit Ihnen und setzen die Website um. Sie prüfen und geben frei.' },
  { wann: 'In der Regel 14 Tage nach Ihren Inhalten', titel: 'Online', text: 'Ihre Website geht unter Ihrer Adresse online, E-Mail-Postfächer sind eingerichtet.' },
  { wann: 'Laufend', titel: 'Betreuung', text: 'Kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr). Sie schicken einfach eine Nachricht.' },
];

/** Was Sie beitragen (firma.de Punkt 12). Abgeleitet aus Ablauf und Paketinhalten; von Can/Jamil zu bestätigen. */
export const BEITRAG = [
  { titel: 'Ein Gespräch', text: 'Rund 20 Minuten, in denen Sie uns von Ihrem Unternehmen erzählen.' },
  { titel: 'Ihre Inhalte', text: 'Fotos, Leistungen, Öffnungszeiten. Texte erarbeiten wir mit Ihnen.' },
  { titel: 'Ihre Freigabe', text: 'Sie prüfen den Entwurf und sagen uns, was noch fehlt.' },
  { titel: 'Kurze Bestätigungen', text: 'Zum Beispiel, wenn Google beim Einrichten Ihres Profils eine Bestätigung von Ihnen verlangt.' },
];

/** Hinweis zu Rechtstexten (firma.de Punkt 12; Formulierung wie bei den Paketen auf /preise/). */
export const RECHT = 'Impressum und Datenschutzerklärung binden wir nach aktuellem Stand ein. Das ersetzt keine Rechtsberatung. Steuer- und Rechtsberatung sowie Gründungsformalitäten wie Gewerbeanmeldung, Notartermin oder Handelsregister übernehmen wir nicht; dafür sind Steuerberatung, Notariat und Behörden zuständig.';

/** Leistungstausch und Verhandlung (Jamil #5016, Frage zum Logo). Vorschlag, siehe docs/variante-firma/preise.md. */
export const TAUSCH = {
  titel: 'Sie brauchen etwas aus dem Paket nicht?',
  regeln: [
    { titel: 'Fester Paketinhalt', text: 'Jedes Paket hat einen festen Inhalt und einen festen Preis. So wissen Sie vorher genau, was Sie bekommen.' },
    { titel: 'Gleichwertig tauschen', text: 'Haben Sie schon ein Logo, tauschen wir es gegen eine gleichwertige Leistung, zum Beispiel weitere Seiten für Ihre Orte oder die Online-Terminbuchung.' },
    { titel: 'Oder das kleinere Paket', text: 'Passt ein Paket nur zur Hälfte, empfehlen wir Ihnen ehrlich das kleinere.' },
    { titel: 'Größerer Umfang: eigenes Angebot', text: 'Brauchen Sie deutlich mehr, zum Beispiel Kundenverwaltung oder Abläufe, bekommen Sie ein individuelles Angebot.' },
  ],
  fair: 'Rabatte auf Verhandlung gibt es bei den Paketen nicht. Feste Preise sind fair, weil jeder Kunde für dieselbe Leistung dasselbe zahlt.',
};

export type Frage = { q: string; a: string; platzhalter?: boolean };

const p = (id: VPaket['id']) => (id === 'gruendung' ? GRUENDUNG : VPAKETE.find((x) => x.id === id)!);
const eur = (n: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n);

export const FAQ_PAKETE: Frage[] = [
  { q: 'Ich brauche kein Logo. Muss ich das mitbezahlen?',
    a: 'Nein, Sie müssen nichts bezahlen, was Sie nicht nutzen. Haben Sie schon ein Logo, tauschen wir es gegen eine gleichwertige Leistung, zum Beispiel weitere Seiten für Ihre Orte oder die Online-Terminbuchung. Alternativ passt vielleicht das kleinere Paket: Plus enthält kein Logo. Den Preis einzelner Pakete senken wir dafür nicht, damit die Preise für alle gleich und nachvollziehbar bleiben.' },
  { q: 'Kann ich über den Preis verhandeln?',
    a: 'Bei den drei Paketen nicht. Jeder Kunde zahlt für dieselbe Leistung denselben Preis, das ist fair und für alle planbar. Bei größeren Vorhaben, etwa mit Kundenverwaltung oder automatisierten Abläufen, erstellen wir ein individuelles Angebot nach Ihrem Bedarf.' },
  { q: 'Gibt es Einrichtungs- oder Einmalkosten?',
    a: `Nein. Auch einmalige Arbeiten wie Logo, Google-Profil oder die Seiten für Ihre Orte sind im Monatspreis enthalten. Wir verteilen sie auf die ${LAUFZEIT} Monate Mindestlaufzeit, darum gibt es keine Rechnung am Anfang.` },
  { q: 'Wie lange läuft der Vertrag?',
    a: `Die Mindestlaufzeit beträgt ${LAUFZEIT} Monate. Danach läuft das Abo monatlich weiter und ist mit einem Monat Frist zum Monatsende kündbar.` },
  { q: 'Was passiert nach 24 Monaten?', platzhalter: true,
    a: `Vorschlag zur Entscheidung: Ab Monat 25 sinkt der Preis um den Anteil der einmaligen Leistungen, weil diese dann bezahlt sind. Zum Beispiel Plus von ${eur(preis(p('plus')))} auf ${eur(nurMonatlich(p('plus')))} im Monat. Ob wir das so anbieten, entscheiden Can und Jamil.` },
  { q: 'Kann ich das Paket später wechseln?',
    a: 'Ja, ein Wechsel in ein größeres Paket ist möglich. Sagen Sie uns einfach Bescheid, die Einzelheiten besprechen wir mit Ihnen.' },
  { q: 'Wem gehört das Logo, wenn ich es monatlich bezahle?', platzhalter: true,
    a: 'Offen: Die Regelung zu Nutzungsrechten am Logo nach Vertragsende legen Can und Jamil fest (mit anwaltlicher Prüfung). Bis dahin machen wir hier keine Aussage.' },
  { q: 'Sind die Preise netto?',
    a: 'Ja. Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer von 19 %. Unser Angebot richtet sich an Unternehmen und Selbstständige.' },
  { q: 'Kann ich meine bestehende Domain mitnehmen?',
    a: 'Ja. Wir übernehmen die Verwaltung Ihrer bestehenden Domain ohne Ausfall.' },
];

export const FAQ_GRUENDUNG: Frage[] = [
  { q: 'Ich habe noch keinen Firmennamen und kein Logo. Ist das ein Problem?',
    a: 'Nein. Das Logo entwickeln wir mit Ihnen: 3 Entwürfe, 2 Korrekturrunden, Dateien für Web und Druck. Den Namen Ihres Unternehmens legen Sie selbst fest.' },
  { q: 'Helfen Sie auch bei der Gewerbeanmeldung oder beim Notar?',
    a: 'Nein. Gründungsformalitäten, Steuer- und Rechtsberatung übernehmen wir nicht. Wir kümmern uns um Ihren digitalen Auftritt: Website, E-Mail, Google-Profil, Logo und Geschäftspapiere.' },
  { q: 'Was brauchen Sie für das Impressum?',
    a: 'Ihre Unternehmensangaben, zum Beispiel Name, Anschrift und Rechtsform. Läuft Ihre Gründung noch, bereiten wir alles vor und tragen die Angaben ein, sobald sie feststehen.' },
  { q: 'Ich brauche keine Terminbuchung. Muss ich das mitbezahlen?',
    a: 'Nein. Wir tauschen sie gegen eine gleichwertige Leistung, zum Beispiel weitere Seiten für Ihre Orte und Leistungen. Den Paketpreis senken wir dafür nicht, damit die Preise für alle gleich bleiben.' },
  { q: 'Gibt es Startkosten?',
    a: `Nein. Gerade am Anfang zählt jeder Euro. Darum sind auch Logo und Einrichtung im Monatspreis enthalten, verteilt auf ${LAUFZEIT} Monate Mindestlaufzeit.` },
];

/** Nicht im Preis enthalten (firma.de Punkt 5). PLATZHALTER: Liste legen Can und Jamil fest. */
export const NICHT_ENTHALTEN = ['Fotograf oder Videodreh vor Ort', 'Gekaufte Bildlizenzen', 'Druck von Visitenkarten oder Briefpapier', 'Lizenzen für fremde Programme'];

/** Navigation der Variante (Agent A). Alle Ziele unter /variante/. Seiten, die es im Build noch nicht gibt,
 *  zeigt VarianteLayout als „folgt“ ohne Link an, damit das SEO-Audit (tote Links) grün bleibt. */
export const V_NAV = [
  { id: 'start', name: 'Start', path: '/variante/' },
  { id: 'pakete', name: 'Pakete', path: '/variante/pakete/' },
  { id: 'gruender', name: 'Gründer', path: '/variante/gruender/' },
  { id: 'leistungen', name: 'Leistungen', path: '/variante/leistungen/' },
  { id: 'ablauf', name: 'So arbeiten wir', path: '/variante/ablauf/' },
  { id: 'referenzen', name: 'Referenzen', path: '/variante/referenzen/' },
  { id: 'ueber-uns', name: 'Über uns', path: '/variante/ueber-uns/' },
  { id: 'kontakt', name: 'Kontakt', path: '/variante/kontakt/' },
] as const;
export type VSeite = (typeof V_NAV)[number]['id'];

export const BANNER = {
  text: 'Variante zum Vergleich (an firma.de orientiert) – die aktuelle Website bleibt unverändert',
  link: 'Zur normalen Startseite',
};
