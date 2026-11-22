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
// Seit 19.11.2026 (Jamil #6400): Profi-Website 54,99 € · Website + Google & KI 119,99 € · Individuelle Software 199,99 € (einzeln oder
// kombinierbar, kein Kombipreis). Extras und Mindestlaufzeit unverändert – offene Frage an Jamil.

export const MWST_SATZ = 0.19;
export const LAUFZEIT_MONATE = 24;
/** Seitengrenze im fairen Rahmen (Jamil #6055 Fr. 30: „15-Seiten-Grenze“; vorher „keine Seitenbegrenzung“). AGB-Fair-Use-Regel bleibt offen (Anwalt). */
export const SEITEN_MAX = 15;

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

// SEIT 19.11.2026 (Jamil, Talk qh87y3sj #6399/#6400; Sicherung Tag vor-jamil-6384-20261119): neue Preise und Leistungen WÖRTLICH aus #6400.
// Vorher: „Online sichtbar“ 79,99 € / „Online wachsen“ 149,99 € mit E-Mail-Postfächern, Google-Profil, Monatsbericht, KI-Check (Git-Verlauf).
export const ABO_PAKETE: AboPaket[] = [
  {
    id: 'basis', name: 'Profi-Website', kurz: 'Basis', preis: 54.99,
    fuer: 'Ideal für einen modernen, seriösen Webauftritt ohne Baukasten-Optik.',
    leistungen: [
      { id: 'code', text: 'Handprogrammierter Code (kein Baukasten)', detail: 'Handprogrammierter Code (kein Baukasten).' },
      { id: 'tempo', text: 'Blitzschnelle Ladezeiten & top Design', detail: 'Blitzschnelle Ladezeiten & top Design.' },
      { id: 'geraete', text: 'Perfekt auf Handy, Tablet & PC', detail: 'Perfekt auf Handy, Tablet & PC.' },
      { id: 'betreuung', text: 'Inkl. Hosting, Sicherheit & Betreuung', detail: 'Inkl. Hosting, Sicherheit & Betreuung.' },
      { id: 'vorschau', text: 'Vorschau schon am nächsten Werktag', detail: 'Vorschau schon am nächsten Werktag.' },
    ],
  },
  {
    id: 'plus', name: 'Website + Google & KI', kurz: 'Beliebt / Empfehlung', preis: 119.99, empfohlen: true, baut: 'basis',
    fuer: 'Ideal, wenn Sie aktiv über Google und KI-Suchen neue Kunden gewinnen wollen.',
    leistungen: [
      { id: 'google', text: 'Gezielte Google-Suchoptimierung', detail: 'Gezielte Google-Suchoptimierung.' },
      { id: 'ki', text: 'Optimiert für KI-Antworten (ChatGPT & Co.)', detail: 'Optimiert für KI-Antworten (ChatGPT & Co.).' },
      { id: 'inhalte', text: 'Strukturierte Inhalte für mehr Anfragen', detail: 'Strukturierte Inhalte für mehr Anfragen.' },
      { id: 'pflege', text: 'Laufende Pflege Ihrer Sichtbarkeit', detail: 'Laufende Pflege Ihrer Sichtbarkeit.' },
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
  label: '+ Kombinierbar oder einzeln', // Jamil #6400 (Badge der Software-Karte)
  name: 'Individuelle Software', // Jamil #6400 (vorher „Rundum digital“, #5936)
  kurz: 'Ideal, wenn Sie interne Abläufe vereinfachen oder ein Kundenportal brauchen.',
  /** Seit #6400 einzeln ODER zusammen mit einer Website buchbar (vorher nur in Kombination, #5642). */
  text: 'Ideal, wenn Sie interne Abläufe vereinfachen oder ein Kundenportal brauchen. Kombinierbar oder einzeln buchbar.',
  preis: 199.99,
  ab: true, // seit Jamil #6964 (22.11.2026) überall „ab 199,99 €“ (Karte: „ab“ klein); vorher #6400 ohne „ab“
  kombiAb: false,
  /** true = nur zusammen mit einem Website-Paket buchbar (bis #6400). Seit #6400: false. */
  nurMitWebsite: false,
  preisArt: 'zusaetzlich' as PreisArt,
  /** Kombipreise Website + Software: seit #6400 keine (offene Frage an Jamil) → es gilt die Summe der Einzelpreise. Vorher 419,99 / 489,99 €. */
  kombiPreis: { basis: null, plus: null } as Record<AboPaket['id'], number | null>,
  kombiMitGruenderpaket: false,
  /** Ablauf-Grafik (seit #5606/#5610 nicht mehr auf der Karte; nur noch Daten) */
  ablauf: [
    { icon: 'mail', text: 'Anfrage' },
    { icon: 'doc', text: 'Angebot' },
    { icon: 'tools', text: 'Auftrag' },
    { icon: 'euro', text: 'Rechnung' },
    { icon: 'book', text: 'Buchhaltung' },
  ] as const,
  /** Vorteile (#5346; seit #5639 nicht mehr auf der Karte, nur für /neu/-Daten) */
  vorteile: [
    { icon: 'check', text: 'Keine doppelte Eingabe, alles wird einmal erfasst' },
    { icon: 'eye', text: 'Überblick, welche Aufträge offen sind' },
    { icon: 'book', text: 'Rechnungen können direkt an die Buchhaltung übergeben werden' },
  ] as const,
  /** Leistungen der Software-Karte (Jamil #6400, wörtlich) */
  software: [
    'Maßgeschneiderte Web-App nach Ihren Abläufen',
    'Läuft einfach im Browser (ohne Installation)',
    'z. B. Kundenportal, Kalkulator, Auftragsplanung',
    'Wir übernehmen den Daten-Umzug',
    'Erster Prototyp in 3 Werktagen',
  ],
};
const K = KOMPLETTPAKET;
/** Günstigster Kombipreis netto (Basis + Komplettpaket). Seit Jamil, Talk qh87y3sj #5659/#5660 (12.11.2026) wird das Komplettpaket
 *  NUR noch mit Kombipreisen gezeigt, nie mit seinem Einzelpreis (K.preis bleibt intern für „statt einzeln …“). */
export const kombiAbPreis = () => {
  const k = ABO_PAKETE.flatMap((p) => (K.kombiPreis[p.id] == null ? [] : [K.kombiPreis[p.id] as number]));
  return k.length ? Math.min(...k) : K.preis; // ohne Kombipreise (#6400): Einzelpreis der Software
};
/** Mit Kombipreisen „in Kombination ab …“, sonst (#6400) einfach der Monatspreis der Software */
export const komplettPreis = () => (kombiPreise().length ? `in Kombination ${euroAb(kombiAbPreis(), K.kombiAb)}` : euroAb(K.preis, K.ab));
/** Erklärung zum Preis, z. B. unter dem Betrag */
export const komplettPreisArt = () => (K.nurMitWebsite ? `zusätzlich zum Monatspreis von ${ABO_PAKETE.map((p) => p.name).join(' oder ')}` : 'einzeln oder zusätzlich zu einem Website-Paket');
/** Eine Zeile für Texte: „Komplettpaket nur in Kombination: mit Basis ab 419,99 € oder mit Plus ab 489,99 € im Monat netto zzgl. MwSt.“ */
export const komplettZeile = () =>
  kombiPreise().length
    ? `${K.name} nur in Kombination: ${ABO_PAKETE.flatMap((p) => (K.kombiPreis[p.id] == null ? [] : [`mit ${p.name} ${euroAb(K.kombiPreis[p.id] as number, K.kombiAb)}`])).join(' oder ')} im Monat netto zzgl. MwSt.`
    : `${K.name}: ${euroAb(K.preis, K.ab)} im Monat netto zzgl. MwSt., kombinierbar oder einzeln buchbar.`;
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
 *  dazu das Gesamtpaket „Alle vier Extras“ für 499 €. Vorher (#5056): 590 / 190 / 89 / 49 €.
 *  Seit 12.11.2026 (Jamil, Talk qh87y3sj #5613/#5615; Sicherung Tag vor-kundenreise-buehne-20261112): Gründerpaket 599 €, Einzelpreise
 *  entsprechend erhöht: Logo 419 · Geschäftspapiere 159 · Visitenkarten 69 · E-Mail-Signatur 49 € (einzeln zusammen 696 €, Ersparnis 97 €).
 *  Brutto (19 %) rechnet bruttoVon(): 712,81 / 498,61 / 189,21 / 82,11 / 58,31 €. Kein Kombipreis zusammen mit dem Gründerpaket. */
export type EinmalLeistung = { id: string; name: string; text: string; preis: number };
export const EINMALIG_DAZU = {
  titel: 'Einmalig dazubuchen',
  hinweis: 'Einmaliger Festpreis, keine monatlichen Kosten. Alle Preise netto zzgl. MwSt.',
  liste: [
    { id: 'logo', name: 'Logo', text: '3 Entwürfe, 2 Korrekturrunden, Dateien für Web und Druck.', preis: 419 },
    { id: 'papiere', name: 'Geschäftspapiere nach DIN 5008', text: 'Briefbogen, Angebot und Rechnung im gleichen Stil.', preis: 159 },
    { id: 'visitenkarten', name: 'Visitenkarten', text: 'Gestaltung passend zu Ihrem Logo, als druckfertige Datei. Der Druck ist nicht enthalten.', preis: 69 },
    { id: 'signatur', name: 'E-Mail-Signatur nach DIN 5008', text: 'Eine einheitliche Signatur für alle Ihre Postfächer.', preis: 49 },
  ] as EinmalLeistung[],
  /** Gesamtpaket: alle vier Extras zusammen (Parameter ?dazu=alle bzw. gesamtpaket) */
  gesamt: { id: 'alle', name: 'Alle vier Extras', text: 'Logo, Geschäftspapiere, Visitenkarten und E-Mail-Signatur zusammen.', preis: 599 } as EinmalLeistung,
};
/** Summe der vier Extras einzeln (696 €). */
export const einmalSumme = () => EINMALIG_DAZU.liste.reduce((s, e) => s + e.preis, 0);
/** Zeile „Alle vier als Gesamtpaket: 599 € statt 696 €“. */
export const gesamtZeile = () => `Alle vier als Gesamtpaket: ${euro(EINMALIG_DAZU.gesamt.preis)} statt ${euro(einmalSumme())}`;

/** „Direkt buchen“ (Jamil #5085–#5089): Fenster auf den Paketkarten, Hinweis im Fenster und im Kontaktformular. */
export const BUCHEN = {
  knopf: 'Paket anfragen', // Jamil #6055 Fr. 18 (vorher „Direkt buchen“)
  titel: 'Ihre Buchung: Paket und Extras', // Audit #5953 H4 (15.11.2026): vorher „Für Gründer …“ – passte nicht über jedes Paket
  weiter: 'Weiter zur Anfrage', // Jamil #6055 Fr. 18 (vorher „Weiter zur Buchung“)
  ohne: 'Ohne Extras weiter',
  // Jamil #6055 Fr. 18: Satz „Sie erhalten Vertrag und Auftragsbestätigung per E-Mail.“
  kaufHinweis: 'Kein Online-Kauf: Sie erhalten Vertrag und Auftragsbestätigung per E-Mail. Erst damit ist die Buchung verbindlich.',
  /** Absende-Knopf im Kontaktformular, wenn man aus dem Fenster kommt (Jamil #6055 Fr. 18, vorher „Buchung anfragen“) */
  absenden: 'Paket anfragen',
};

/** Größere Vorhaben: eigenes Angebot. */
/** Social Media entfernt (Jamil, Talk qh87y3sj #5630, 12.11.2026) */
export const AUF_ANFRAGE = ['Kundenverwaltung', 'Abläufe automatisieren', 'Video', 'Software, Cloud und IT'];

/** B2B-Hinweis unter den Preisen. */
export const B2B_HINWEIS = 'Alle Preise netto zzgl. gesetzlicher MwSt. Unser Angebot richtet sich an Unternehmen und Selbstständige.';
/** Laufzeit als kleiner Hinweis. */
export const LAUFZEIT_HINWEIS = `${LAUFZEIT_MONATE} Monate Mindestlaufzeit, danach monatlich kündbar.`;

/** Hinweis zu Rechtstexten. */
export const RECHT = 'Impressum und Datenschutzerklärung binden wir nach aktuellem Stand ein. Das ersetzt keine Rechtsberatung. Steuer- und Rechtsberatung übernehmen wir nicht.';

/** Nicht im Preis enthalten (Jamil #6055 Fr. 9: „Shop machen wir nicht, Fotos/Shooting nicht im Preis enthalten“).
 *  Nur bestätigte Punkte bzw. Aussagen, die schon in dieser Datei stehen (Extras einmalig, Web-App als eigenes Paket, Druck nicht enthalten). */
export const NICHT_ENTHALTEN = [
  'Fotos und Fotoshooting',
  'Logo, Geschäftspapiere, Visitenkarten und E-Mail-Signatur (einmalig dazubuchbar, Festpreise siehe oben)',
  'Druck von Visitenkarten',
  `Die Web-App (Paket „${KOMPLETTPAKET.name}“, eigener Monatspreis, einzeln oder zusammen mit einem Website-Paket)`,
];
/** Was wir nicht anbieten (Jamil #6055 Fr. 9) */
export const NICHT_ANGEBOTEN = 'Einen Online-Shop bieten wir nicht an.';

/** „Warum 24 Monate?“ (Jamil #6055 Fr. 31): Einrichtung ohne Einrichtungsgebühr, Aufwand verteilt sich auf die Laufzeit. */
export const WARUM_24 = `Weil wir keine Einrichtungsgebühr nehmen. Beratung, Vorschau, Texte und den Aufbau Ihrer Website leisten wir am Anfang, bezahlt wird das nicht auf einmal, sondern verteilt über die ersten ${LAUFZEIT_MONATE} Monatspreise. So bleibt Ihr Monatspreis fest und planbar, ohne hohe Einmalkosten zu Beginn.`;

/** Fragen zu den Paketen (/preise/). platzhalter = offene Entscheidung, nur in der Vorschau rot gezeigt. */
export type PaketFrage = { q: string; a: string; platzhalter?: boolean };
export const FAQ_PAKETE: PaketFrage[] = [
  { q: 'Ich brauche kein Logo. Muss ich das mitbezahlen?',
    a: 'Nein. Ein Logo ist in keinem Monatspaket enthalten. Wenn Sie eines brauchen, buchen Sie es einmalig zum Festpreis dazu.' },
  { q: 'Kann ich über den Preis verhandeln?',
    a: 'Bei den Paketen nicht. Jeder Kunde zahlt für dieselbe Leistung denselben Preis, das ist fair und für alle planbar. Bei größeren Vorhaben, etwa mit Kundenverwaltung oder automatisierten Abläufen, erstellen wir ein individuelles Angebot nach Ihrem Bedarf.' },
  { q: 'Gibt es Einrichtungskosten?',
    a: 'Nein. Keine versteckten Einrichtungsgebühren für den Start. Einen einmaligen Festpreis zahlen Sie nur, wenn Sie etwas zusätzlich dazubuchen, zum Beispiel ein Logo.' }, // #6400
  { q: 'Was kostet ein Paket im Jahr?',
    a: `${[...ABO_PAKETE.map((p) => `${p.name} ${euro(jahresPreis(p.preis))}`), `${K.name} ${euroAb(jahresPreis(K.preis), K.ab)}`].join(', ')} netto im Jahr, also 12 Monatspreise. Abgerechnet wird monatlich.` },
  { q: 'Wie lange läuft der Vertrag?',
    a: `Die Mindestlaufzeit beträgt ${LAUFZEIT_MONATE} Monate. Danach läuft das Abo monatlich weiter und ist mit einem Monat Frist zum Monatsende kündbar.` },
  { q: 'Was passiert nach 24 Monaten?', // Jamil #6055 Fr. 8: Preis bleibt gleich
    a: 'Der Preis bleibt gleich. Ihre Website läuft mit derselben Betreuung weiter, und Sie können monatlich kündigen, mit einem Monat Frist zum Monatsende.' },
  { q: 'Warum 24 Monate?', // Jamil #6055 Fr. 31 (transparente Antwort)
    a: WARUM_24 },
  { q: 'Kann ich das Paket später wechseln?',
    a: 'Ja, ein Wechsel in ein größeres Paket ist möglich. Sagen Sie uns einfach Bescheid, die Einzelheiten besprechen wir mit Ihnen.' },
  // Frage „Wem gehört das Logo …?“ entfernt (Jamil #5975, 15.11.2026)
  { q: 'Sind die Preise netto?',
    a: 'Ja. Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer von 19 %. Unser Angebot richtet sich an Unternehmen und Selbstständige.' },
  { q: 'Kann ich meine bestehende Domain mitnehmen?',
    a: 'Ja. Wir übernehmen die Verwaltung Ihrer bestehenden Domain, in der Regel ohne Ausfall.' }, // Jamil #6038, Audit W4
];

/** Kurzfassung für den Preisteil der Startseite: diese Leistungen je Paket (Rest auf /preise/). */
export const KOMPAKT: Record<AboPaket['id'], string[]> = {
  basis: ['code', 'tempo', 'geraete', 'betreuung', 'vorschau'], // #6400
  plus: ['google', 'ki', 'inhalte', 'pflege'],
};
