// ZENTRALE PAKET-DATENQUELLE (Jamil, Talk qh87y3sj #5056, 08.11.2026 „ok go“): die festen Monatspakete Basis · Plus
// sind die RICHTIGE Website (/preise/, Preisteil der Startseite und alle anderen Seiten).
// Seit 10.11.2026 (Jamil #5450–#5459): Kunden wählen Basis ODER Plus und buchen optional das Komplettpaket dazu
// (KOMPLETTPAKET unten, nur Auftragsverwaltung). Das frühere dritte Paket „Komplett“ (299,99 €) und die Premium-Karte
// „Komplett + Auftragsverwaltung“ (599 €) sind entfallen (Sicherung: Branch vor-komplettpaket-20261110).
// Herkunft: Variante /variante/pakete/ (Jamil #5028–#5042), Preise von Jamil gesetzt. Gründungspaket entfällt (#5056 Punkt 7).
//
// Diese Datei importiert BEWUSST nichts (auch nicht site.ts), damit site.ts, schema.ts, llms.txt usw. sie ohne
// Zirkelbezug einbinden können. Preise NIE fest in Texte schreiben, immer von hier holen.
// Alle Preise NETTO zzgl. 19 % USt (B2B). Mindestlaufzeit 24 Monate (AGB § 5), danach monatlich kündbar.

export const MWST_SATZ = 0.19;
export const LAUFZEIT_MONATE = 24;

/** Bruttopreis zu einem Nettopreis (kaufmännisch auf Cent gerundet). */
export const bruttoVon = (netto: number) => Math.round(netto * (1 + MWST_SATZ) * 100) / 100;
/** Kosten pro Jahr netto (12 Monatspreise). */
export const jahresPreis = (monatNetto: number) => Math.round(monatNetto * 12 * 100) / 100;
/** Kosten pro Jahr brutto = 12 × Monatspreis brutto (so wie monatlich abgerechnet wird). */
export const jahresBrutto = (monatNetto: number) => Math.round(bruttoVon(monatNetto) * 12 * 100) / 100;
/** Euro-Format: ganze Beträge ohne Cent (590 €), sonst mit Cent (79,99 €). */
export const euro = (n: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);
/** Euro-Format mit „ab“ davor, wenn der Preis ein Ab-Preis ist (z. B. Komplettpaket: „ab 369,99 €“). */
export const euroAb = (n: number, ab = false) => `${ab ? 'ab ' : ''}${euro(n)}`;

/** Ein Paketinhalt. `text` = Kurztext für Karten (ohne „inklusive“), `detail` = ein Satz Erklärung.
 *  Vergleichstabelle: `zeile` (Zeilenname, sonst `text`) und `wert` (Text statt Haken). Gleiche `zeile`
 *  in einem größeren Paket ersetzt den Wert (z. B. Suchmaschinen-Optimierung Grund → Erweitert). */
export type Leistung = { id: string; text: string; detail: string; zeile?: string; wert?: string };

export type AboPaket = {
  id: 'basis' | 'plus';
  name: string;
  /** Unterzeile unter dem Namen */
  kurz: string;
  /** Monatspreis NETTO, von Jamil gesetzt */
  preis: number;
  /** Für wen, ein Satz aus Kundensicht */
  fuer: string;
  empfohlen?: boolean;
  /** „Alles aus …“ */
  baut?: AboPaket['id'];
  /** Leistungen, die über dem vorherigen Paket hinzukommen (bei Basis: alle) */
  leistungen: Leistung[];
};

export const ABO_PAKETE: AboPaket[] = [
  {
    id: 'basis', name: 'Basis', kurz: 'Professionell online', preis: 79.99,
    fuer: 'Für Selbstständige und kleine Betriebe, die gut gefunden werden und seriös auftreten wollen.',
    leistungen: [
      { id: 'website', text: 'Website', zeile: 'Website ohne Seitenbegrenzung',
        detail: 'Ohne Seitenbegrenzung, für Handy, Tablet und PC, Texte mit Ihnen erarbeitet. Hosting in Deutschland, Updates, Sicherungen, Änderungen per Nachricht im fairen Rahmen.' },
      { id: 'seo', text: 'Suchmaschinen-Optimierung beim Erstellen', zeile: 'Suchmaschinen-Optimierung', wert: 'Grundoptimierung beim Erstellen',
        detail: 'Wir richten Ihre Website von Anfang an so ein, dass Google sie gut versteht: klare Seitentitel und Beschreibungen, saubere Überschriften, schnelle Ladezeit, gut auf dem Handy.' },
      { id: 'email', text: 'E-Mail-Postfächer mit Signatur', zeile: 'E-Mail-Postfächer mit Signatur',
        detail: 'Bis zu 20 Postfächer mit Ihrer Adresse, einheitliche Signatur nach DIN 5008.' },
      { id: 'ki', text: 'Aufbereitung für KI-Assistenten',
        detail: 'So aufbereitet, dass ChatGPT und andere KI-Assistenten Ihr Angebot richtig verstehen.' },
    ],
  },
  {
    id: 'plus', name: 'Plus', kurz: 'Gefunden werden und Anfragen gewinnen', preis: 149.99, empfohlen: true, baut: 'basis',
    fuer: 'Für Betriebe vor Ort, die über Google regelmäßig neue Kunden gewinnen wollen.',
    leistungen: [
      { id: 'google-profil', text: 'Google-Profil einrichten',
        detail: 'Ihr Eintrag bei Google und Google Maps, mit Fotos, Leistungen und Öffnungszeiten.' },
      { id: 'google-pflege', text: 'Google-Profil pflegen',
        detail: 'Fotos, Leistungen und Öffnungszeiten bleiben aktuell.' },
      { id: 'seo', text: 'Erweiterte Suchmaschinen-Optimierung', zeile: 'Suchmaschinen-Optimierung', wert: 'Erweiterte Optimierung',
        detail: 'Wir finden heraus, wonach Ihre Kunden suchen, und richten Ihre Seiten gezielt darauf aus. Ihr Google-Profil wird mit der Website verknüpft, damit Sie vor Ort besser gefunden werden.' },
      { id: 'mail-ordner', text: 'E-Mail-Organisation mit Unterordnern', zeile: 'E-Mail-Organisation mit Ordnern',
        detail: 'Ihre Postfächer werden mit Ordnern und Regeln eingerichtet, damit Anfragen nicht im Posteingang untergehen.' },
      { id: 'bericht', text: 'Monatsbericht',
        detail: 'Besucher, Anfragen, Suchbegriffe, kurz und verständlich.' },
      { id: 'ki-check', text: 'Monatlicher KI-Check',
        detail: 'Jeden Monat prüfen wir, ob KI-Assistenten wie ChatGPT Ihr Unternehmen richtig nennen und beschreiben.' },
    ],
  },
];

export const paketById = (id: AboPaket['id']) => ABO_PAKETE.find((p) => p.id === id)!;

/** Alle Leistungen eines Pakets (inkl. „Alles aus …“); spätere gleiche `zeile` ersetzt frühere. */
export const alleLeistungen = (p: AboPaket): Leistung[] => {
  const vor = p.baut ? alleLeistungen(paketById(p.baut)) : [];
  const neu = new Set(p.leistungen.map((l) => l.zeile ?? l.text));
  return [...vor.filter((l) => !neu.has(l.zeile ?? l.text)), ...p.leistungen];
};

/** Günstigster Monatspreis netto (für „ab …“-Zeilen). */
export const aboPreisAb = () => Math.min(...ABO_PAKETE.map((p) => p.preis));

/** Vergleichstabelle: eine Zeile je `zeile` (bzw. `text`), Wert je Paket = Text, true (Haken) oder false (nicht enthalten). */
export const vergleichsZeilen = () => {
  const name = (l: Leistung) => l.zeile ?? l.text;
  const zeilen: string[] = [];
  for (const p of ABO_PAKETE) for (const l of p.leistungen) if (!zeilen.includes(name(l))) zeilen.push(name(l));
  return zeilen.map((z) => ({
    text: z,
    werte: ABO_PAKETE.map((p) => {
      const kette: AboPaket[] = [];
      for (let x: AboPaket | undefined = p; x; x = x.baut ? paketById(x.baut) : undefined) kette.unshift(x);
      const treffer = kette.flatMap((x) => x.leistungen).filter((l) => name(l) === z).at(-1);
      return treffer ? (treffer.wert ?? true) : false;
    }),
  }));
};

/** Komplettpaket (Jamil, Talk qh87y3sj #5450–#5459, 10.11.2026): OPTIONAL ZUSÄTZLICH zu Basis oder Plus buchbar, kein
 *  eigenes drittes Paket. Inhalt NUR die Auftragsverwaltung (#5459 B, Texte aus der früheren Premium-Karte #5346/#5352),
 *  keine Website-Leistungen. Preis NETTO pro Monat, mit „ab“ (#5450). Kein Jahrespreis-Kasten (wie bei den Extras).
 *  - `preisArt`: 'zusaetzlich' = kommt zum Monatspreis von Basis oder Plus dazu (#5459 A); 'gesamt' = Gesamtpreis ab …
 *  - `kombiPreis`: Kombipreis NETTO pro Monat für Grundpaket + Komplettpaket zusammen; null = kein Kombipreis, dann gilt
 *    die Summe der Einzelpreise. Basis + Komplettpaket 419,99 € statt 449,98 € (Jamil #5461), Plus + Komplettpaket 489,99 € statt 519,98 € (#5462).
 *    Gilt nur für die Monatspreise. KEIN Kombipreis, wenn das Gründerpaket (Gesamtpaket „Alle vier Extras“) mitgebucht
 *    wird (Jamil #5464 „kein rabatt mit gründerpaket“): dann gelten die Einzelpreise (`kombiMitGruenderpaket`).
 *  - `kombiAb`: „ab“ vor den Kombipreisen (der Komplettpaket-Anteil ist ein Ab-Preis).
 *    Gezeigt als Paketpreis gegenüber der Summe der Einzelpreise („zusammen … statt einzeln …“), nicht als Streichpreis. */
export type PreisArt = 'zusaetzlich' | 'gesamt';
export const KOMPLETTPAKET = {
  id: 'komplett' as const,
  label: 'Optional dazu',
  name: 'Komplettpaket',
  kurz: 'Auftragsverwaltung, individuell an Ihre Abläufe angepasst',
  text: 'Eine Software für Ihre Aufträge, die Anfrage, Angebot, Auftrag und Rechnung miteinander verbindet. Zusätzlich zu Basis oder Plus buchbar.',
  preis: 369.99,
  ab: true,
  kombiAb: true,
  preisArt: 'zusaetzlich' as PreisArt,
  kombiPreis: { basis: 419.99, plus: 489.99 } as Record<AboPaket['id'], number | null>,
  kombiMitGruenderpaket: false,
  /** Ablauf-Grafik */
  ablauf: [
    { icon: 'mail', text: 'Anfrage' },
    { icon: 'doc', text: 'Angebot' },
    { icon: 'tools', text: 'Auftrag' },
    { icon: 'euro', text: 'Rechnung' },
    { icon: 'book', text: 'Buchhaltung' },
  ] as const,
  /** Vorteile (#5346, bewusst vorsichtig formuliert) */
  vorteile: [
    { icon: 'check', text: 'Keine doppelte Eingabe, alles wird einmal erfasst' },
    { icon: 'eye', text: 'Überblick, welche Aufträge offen sind' },
    { icon: 'book', text: 'Rechnungen können direkt an die Buchhaltung übergeben werden' },
  ] as const,
  /** Auftragsverwaltung (#5352 wörtlich, dazu Schnittstelle und Automatik aus #5346) */
  software: [
    'Individuell für Ihren Betrieb entwickelt, statt Software von der Stange',
    'Auf Ihre Abläufe abgestimmt, von der Anfrage bis zur Rechnung',
    'Wächst mit, wenn neue Schritte oder Mitarbeitende dazukommen',
    'Sie arbeiten in Ihren gewohnten Begriffen, nicht in denen eines fremden Programms',
    'Schnittstelle zu Lexware Office und sevDesk möglich',
    'Wiederkehrende Schritte laufen automatisch',
  ],
};
const K = KOMPLETTPAKET;
/** „zusätzlich ab 369,99 €“ bzw. „ab 369,99 €“ (Gesamtpreis) */
export const komplettPreis = (n: number = K.preis) => `${K.preisArt === 'zusaetzlich' ? 'zusätzlich ' : ''}${euroAb(n, K.ab)}`;
/** Erklärung zum Preis, z. B. unter dem Betrag */
export const komplettPreisArt = () => (K.preisArt === 'zusaetzlich' ? 'zusätzlich zum Monatspreis von Basis oder Plus' : 'Gesamtpreis, Basis oder Plus inklusive');
/** Eine Zeile für Texte: „Komplettpaket zusätzlich ab 369,99 € im Monat netto (ab 440,29 € inkl. MwSt.)“ */
export const komplettZeile = () => `${K.name} ${komplettPreis()} im Monat netto (${euroAb(bruttoVon(K.preis), K.ab)} inkl. MwSt.)`;
/** Summe der Einzelpreise NETTO pro Monat: Grundpaket + Komplettpaket (Ab-Preis). */
export const einzelnMitKomplett = (paketId: AboPaket['id']) =>
  Math.round(((K.preisArt === 'zusaetzlich' ? paketById(paketId).preis : 0) + K.preis) * 100) / 100;
/** Monatspreis NETTO für Grundpaket + Komplettpaket: Kombipreis, sonst Summe der Einzelpreise.
 *  `gruenderpaket` = Gesamtpaket „Alle vier Extras“ mitgebucht: dann kein Kombipreis (#5464). */
export const monatMitKomplett = (paketId: AboPaket['id'], gruenderpaket = false) =>
  (gruenderpaket && !K.kombiMitGruenderpaket ? null : K.kombiPreis[paketId]) ?? einzelnMitKomplett(paketId);
/** Alle gesetzten Kombipreise, z. B. für die Karte: [{ paket, preis, einzeln }] */
export const kombiPreise = () =>
  ABO_PAKETE.flatMap((p) => {
    const preis = K.kombiPreis[p.id];
    return preis == null ? [] : [{ paket: p, preis, einzeln: einzelnMitKomplett(p.id) }];
  });
/** „Basis + Komplettpaket zusammen ab 419,99 € statt einzeln ab 449,98 € im Monat netto“ */
export const kombiZeile = (k: ReturnType<typeof kombiPreise>[number]) =>
  `${k.paket.name} + ${K.name} zusammen ${euroAb(k.preis, K.kombiAb)} statt einzeln ${euroAb(k.einzeln, K.kombiAb)} im Monat netto`;

/** Einmalige Leistungen (Extras), Festpreis NETTO. Preise neu von Jamil (Talk qh87y3sj #5085–#5089, 08.11.2026):
 *  Logo 349 · Geschäftspapiere 129 · Visitenkarten 59 · E-Mail-Signatur 39 € (einzeln zusammen 576 €),
 *  dazu das Gesamtpaket „Alle vier Extras“ für 499 €. Vorher (#5056): 590 / 190 / 89 / 49 €. */
export type EinmalLeistung = { id: string; name: string; text: string; preis: number };
export const EINMALIG_DAZU = {
  titel: 'Einmalig dazubuchen',
  hinweis: 'Einmaliger Festpreis, keine monatlichen Kosten. Alle Preise netto zzgl. MwSt.',
  liste: [
    { id: 'logo', name: 'Logo', text: '3 Entwürfe, 2 Korrekturrunden, Dateien für Web und Druck.', preis: 349 },
    { id: 'papiere', name: 'Geschäftspapiere nach DIN 5008', text: 'Briefbogen, Angebot und Rechnung im gleichen Stil.', preis: 129 },
    { id: 'visitenkarten', name: 'Visitenkarten', text: 'Gestaltung passend zu Ihrem Logo, als druckfertige Datei. Der Druck ist nicht enthalten.', preis: 59 },
    { id: 'signatur', name: 'E-Mail-Signatur nach DIN 5008', text: 'Eine einheitliche Signatur für alle Ihre Postfächer.', preis: 39 },
  ] as EinmalLeistung[],
  /** Gesamtpaket: alle vier Extras zusammen (Parameter ?dazu=alle bzw. gesamtpaket) */
  gesamt: { id: 'alle', name: 'Alle vier Extras', text: 'Logo, Geschäftspapiere, Visitenkarten und E-Mail-Signatur zusammen.', preis: 499 } as EinmalLeistung,
};
/** Summe der vier Extras einzeln (576 €). */
export const einmalSumme = () => EINMALIG_DAZU.liste.reduce((s, e) => s + e.preis, 0);
/** Zeile „Alle vier als Gesamtpaket: 499 € statt 576 €“. */
export const gesamtZeile = () => `Alle vier als Gesamtpaket: ${euro(EINMALIG_DAZU.gesamt.preis)} statt ${euro(einmalSumme())}`;

/** „Direkt buchen“ (Jamil #5085–#5089): Fenster auf den Paketkarten, Hinweis im Fenster und im Kontaktformular. */
export const BUCHEN = {
  knopf: 'Direkt buchen',
  titel: 'Für Gründer oder Unternehmen, die sich neu erfinden wollen',
  weiter: 'Weiter zur Buchung',
  ohne: 'Ohne Extras weiter',
  kaufHinweis: 'Kein Online-Kauf: Wir schicken Ihnen Vertrag und Auftragsbestätigung per E-Mail. Erst damit ist die Buchung verbindlich.',
};

/** Größere Vorhaben: eigenes Angebot. */
export const AUF_ANFRAGE = ['Kundenverwaltung', 'Abläufe automatisieren', 'Social Media', 'Video', 'Software, Cloud und IT'];

/** B2B-Hinweis unter den Preisen. */
export const B2B_HINWEIS = 'Alle Preise netto zzgl. gesetzlicher MwSt. Unser Angebot richtet sich an Unternehmen und Selbstständige.';
/** Laufzeit als kleiner Hinweis. */
export const LAUFZEIT_HINWEIS = `${LAUFZEIT_MONATE} Monate Mindestlaufzeit, danach monatlich kündbar.`;

/** Hinweis zu Rechtstexten. */
export const RECHT = 'Impressum und Datenschutzerklärung binden wir nach aktuellem Stand ein. Das ersetzt keine Rechtsberatung. Steuer- und Rechtsberatung übernehmen wir nicht.';

/** Nicht im Preis enthalten. PLATZHALTER (nur Vorschau): Liste legen Can und Jamil fest. */
export const NICHT_ENTHALTEN = ['Fotograf oder Videodreh vor Ort', 'Gekaufte Bildlizenzen', 'Druck von Visitenkarten oder Briefpapier', 'Lizenzen für fremde Programme'];

/** Fragen zu den Paketen (/preise/). platzhalter = offene Entscheidung, nur in der Vorschau rot gezeigt. */
export type PaketFrage = { q: string; a: string; platzhalter?: boolean };
export const FAQ_PAKETE: PaketFrage[] = [
  { q: 'Ich brauche kein Logo. Muss ich das mitbezahlen?',
    a: 'Nein. Ein Logo ist in keinem Monatspaket enthalten. Wenn Sie eines brauchen, buchen Sie es einmalig zum Festpreis dazu.' },
  { q: 'Kann ich über den Preis verhandeln?',
    a: 'Bei den Paketen nicht. Jeder Kunde zahlt für dieselbe Leistung denselben Preis, das ist fair und für alle planbar. Bei größeren Vorhaben, etwa mit Kundenverwaltung oder automatisierten Abläufen, erstellen wir ein individuelles Angebot nach Ihrem Bedarf.' },
  { q: 'Gibt es Einrichtungskosten?',
    a: 'Nein. Auch einmalige Arbeiten wie die Einrichtung Ihrer Website oder das Google-Profil im Paket Plus sind im Monatspreis enthalten. Einen einmaligen Festpreis zahlen Sie nur, wenn Sie etwas zusätzlich dazubuchen, zum Beispiel ein Logo.' },
  { q: 'Was kostet ein Paket im Jahr?',
    a: `${ABO_PAKETE.map((p) => `${p.name} ${euro(jahresPreis(p.preis))}`).join(', ')} netto im Jahr, also 12 Monatspreise. Das ${K.name} kostet ${komplettPreis(jahresPreis(K.preis))} netto im Jahr. Abgerechnet wird monatlich.` },
  { q: 'Wie lange läuft der Vertrag?',
    a: `Die Mindestlaufzeit beträgt ${LAUFZEIT_MONATE} Monate. Danach läuft das Abo monatlich weiter und ist mit einem Monat Frist zum Monatsende kündbar.` },
  { q: 'Was passiert nach 24 Monaten?', platzhalter: true,
    a: 'Offen: Ob sich der Monatspreis nach der Mindestlaufzeit ändert, entscheiden Can und Jamil. Bis dahin machen wir hier keine Aussage.' },
  { q: 'Kann ich das Paket später wechseln?',
    a: 'Ja, ein Wechsel in ein größeres Paket ist möglich. Sagen Sie uns einfach Bescheid, die Einzelheiten besprechen wir mit Ihnen.' },
  { q: 'Wem gehört das Logo, wenn ich es monatlich bezahle?', platzhalter: true,
    a: 'Offen: Die Regelung zu Nutzungsrechten am Logo nach Vertragsende legen Can und Jamil fest (mit anwaltlicher Prüfung). Bis dahin machen wir hier keine Aussage.' },
  { q: 'Sind die Preise netto?',
    a: 'Ja. Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer von 19 %. Unser Angebot richtet sich an Unternehmen und Selbstständige.' },
  { q: 'Kann ich meine bestehende Domain mitnehmen?',
    a: 'Ja. Wir übernehmen die Verwaltung Ihrer bestehenden Domain ohne Ausfall.' },
];

/** Kurzfassung für den Preisteil der Startseite: diese Leistungen je Paket (Rest auf /preise/). */
export const KOMPAKT: Record<AboPaket['id'], string[]> = {
  basis: ['website', 'seo', 'email', 'ki'],
  plus: ['google-profil', 'seo', 'bericht', 'ki-check'],
};
