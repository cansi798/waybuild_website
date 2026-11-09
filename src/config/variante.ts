// STARTSEITE OBEN = Startseite der Variante „an firma.de orientiert“ (Jamil, Talk qh87y3sj #5061/#5062, 08.11.2026 19:23
// „Go“/„Ok“). Herkunft: archiv/variante-firma-20261108/config/variante.ts (Sicherung davor: Branch vor-variante-start-20261108).
// Zurückgeholt sind NUR die Texte der Variante-Startseite. Pakete, Preise, Einmal-Leistungen, Fragen und Rechtshinweis kommen
// aus src/config/pakete-abo.ts (Preise nie hier eintragen). Kein Gründungspaket, keine Gründer-Verweise, kein „aus einer Hand“.
// Angepasst an das Paketmodell vom 08.11. (#5056): „keine Einmalkosten“ → „keine Einrichtungskosten“, weil Logo,
// Signatur, Geschäftspapiere und Visitenkarten heute einmalig dazubuchbar sind.

/** Einstieg im ersten Bildschirm (firma.de-Vergleich Punkt 1 + 2). */
export const V_HERO = {
  /** H1 im Hero, Variante E von Jamil (Talk qh87y3sj #5129). Title und Meta-Description bleiben eigenständig (index.astro). */
  titel: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden.',
  /** Unterzeile im Hero: Wortlaut von Jamil (Talk qh87y3sj #5174, 09.11.2026, „direkt umsetzen“). Ersetzt den Satz „Website, Online-Anfrage und
   *  Auftragsverwaltungssoftware: …“ (#5163). Meta-Description/JSON-LD bleiben eigenständig (index.astro). */
  unter: 'Von der digitalen Sichtbarkeit über die Anfrage bis zur Bearbeitung und Betreuung sorgen wir dafür, dass alle Bausteine nahtlos zusammenspielen.',
};

/** Einziger Knopf im Hero (#5121–#5124, Beschriftung von uns gewählt, Jamil kann sie ändern). Ziel: Kontakt, Erstberatung. */
export const HERO_KNOPF = 'Kostenlose Erstberatung'; // überall gleicher Haupt-CTA (Jamil, Talk qh87y3sj #5322 Q2)

/** Abschnitt direkt nach dem Hero „Kundenreise“ als Journey-Map (Jamil, Talk qh87y3sj #5181/#5182: „wirkt wie ein Arbeitsprozess,
 *  muss eine Customer Journey sein“, Variante B #5184, Text #5185, Plan „ok“ #5187, 09.11.2026). Ersetzt das „Zusammenspiel“ mit
 *  sieben Kacheln (#5176–#5179; Sicherung davor: Branch vor-kundenreise-20261109). Überschrift bleibt, Fragen wörtlich von Jamil.
 *  Seit #5275 (09.11.2026, „ohne ok“; Sicherung vor-kundenreise-antworten-20261109): keine Leistungen mehr unter den Fragen, die
 *  Fragen stellt sich der Besucher; je Station ein kleines Symbol, das die „perfekte Antwort“ (antwort = Optimalzustand, Sie-Form)
 *  aufklappt; am Ende schluss + knopf. ziel = kleine Beschriftung am Ende der Kurve. Nie „aus einer Hand“. */
export const KUNDENREISE = {
  titel: 'Ein guter erster Eindruck allein reicht nicht aus.',
  intro: 'Das Problem ist nicht das einzelne Werkzeug, sondern das Zusammenspiel. Deshalb betrachten wir nicht nur Ihre Website, sondern den gesamten Weg Ihrer Kunden.',
  stationen: [
    { name: 'Aufmerksamkeit', frage: 'Wie werden potenzielle Kunden auf Ihr Unternehmen aufmerksam?', antwort: 'Wer nach Ihrer Leistung sucht, findet Sie bei Google, auf Karten und in sozialen Medien – und landet auf einer Website, die überzeugt.' },
    { name: 'Vertrauen', frage: 'Warum sollten Interessenten sich für Sie entscheiden?', antwort: 'Klare Inhalte, echte Bewertungen und Beispiele Ihrer Arbeit zeigen auf einen Blick, warum man bei Ihnen richtig ist.' },
    { name: 'Anfrage', frage: 'Wie einfach wird aus Interesse ein Kontakt?', antwort: 'Kontakt aufnehmen dauert nur einen Moment: per Formular, Terminbuchung oder Anruf – und jede Anfrage kommt bei der richtigen Person an.' },
    { name: 'Bearbeitung', frage: 'Wie schnell und zuverlässig werden Anfragen bearbeitet?', antwort: 'Anfragen werden zügig und verlässlich beantwortet, wiederkehrende Schritte laufen automatisch.' },
    { name: 'Betreuung', frage: 'Wie wird aus einem Kunden ein zufriedener Kunde?', antwort: 'Nach dem Auftrag bleiben Sie in Kontakt, bitten zur passenden Zeit um eine Bewertung und sehen, was funktioniert.' },
  ],
  /** Beschriftung des Symbols (Screenreader) und kleine Überschrift über jeder Antwort */
  antwortTitel: 'So sieht es im besten Fall aus',
  ziel: 'zufriedener Kunde',
  /** Abschluss (#5275): Satz + Knopf zur Erstberatung (gleiches Ziel wie der Hero-Knopf). Ersetzt den Hero-Knopf an dieser Stelle
   *  (#5211–#5213; davor Schlusssatz mit Link auf den gelöschten Kundenreise-Check #5204). */
  schluss: 'Wir sind dafür der richtige Ansprechpartner.',
  knopf: 'Jetzt starten',
};

/** Kurzer Vergleich nach Anbieter-Arten (UWG § 6: keine Namen, sachlich). Ursprünglich aus angebot.ts ANBIETER_VERGLEICH abgeleitet.
 *  Seit Jamil, Talk qh87y3sj #5349 (10.11.2026) auf alle Produkte abgestimmt, auch individuelle Software: Spalte „Agentur oder
 *  Softwarehaus“, sechs Fragen, Zeile „Wer kümmert sich um Google?“ entfernt (Sicherung: Branch vor-vergleich-produkte-20261109).
 *  Letzte Spalte = waybuild (VVergleich.astro und llms.txt lesen werte[3]). Icons je Zeile: VVergleich.astro ICONS. */
export const VERGLEICH = {
  spalten: ['Selbst machen', 'Baukasten', 'Agentur oder Softwarehaus', 'waybuild'],
  zeilen: [
    { frage: 'Wer setzt um?', werte: ['Sie selbst', 'Sie selbst, mit Vorlagen', 'Das Projektteam', 'Wir, gemeinsam mit Ihnen'] },
    { frage: 'Wie gut passt die Lösung zu Ihrem Betrieb?', werte: ['So gut, wie Ihre Zeit es erlaubt', 'Im Rahmen der Vorlagen', 'Individuell, meist gegen Aufpreis', 'Abgestimmt auf Ihre Abläufe'] },
    { frage: 'Wächst die Lösung mit?', werte: ['Nur mit viel Eigenarbeit', 'Bis an die Grenzen des Baukastens', 'Meist als neues Projekt', 'Schritt für Schritt, von der Website bis zur Software'] },
    { frage: 'Wer macht Updates und Sicherungen?', werte: ['Sie selbst', 'Der Anbieter, für die Technik', 'Mit Wartungsvertrag', 'Wir, im Monatspreis'] },
    { frage: 'Wen rufe ich an?', werte: ['Niemanden', 'Den allgemeinen Support', 'Je nach Vertrag', 'Ihren festen Ansprechpartner'] },
    { frage: 'Wie planbar sind die Kosten?', werte: ['Geringe Kosten, aber viel Eigenarbeit', 'Monatlich, Inhalte selbst', 'Projektpreis, Pflege extra', 'Fester Monatspreis statt hoher Einmalkosten'] },
  ],
  hinweis: 'Allgemeine Einordnung nach Anbieter-Art aus unserer Erfahrung. Einzelne Anbieter können anders arbeiten.',
};

/** Ablauf als Kartenstapel (firma.de Punkt 8; gekürzt und übereinandergelegt: Jamil, Talk qh87y3sj #5214, 09.11.2026).
 *  Nur Werte, die die Website schon nennt; alles „in der Regel“. */
export const ZEITLEISTE_UNTERTITEL = 'So läuft es in der Regel ab.';
export const ZEITLEISTE = [
  { wann: 'Tag 1', titel: 'Anfrage', text: 'Per Formular, E-Mail oder WhatsApp.' },
  { wann: 'In der Regel nach 1 Werktag', titel: 'Rückmeldung', text: 'Wir melden uns persönlich und vereinbaren einen Termin.' },
  { wann: 'Rund 20 Minuten', titel: 'Erstgespräch', text: 'Kostenlos und unverbindlich. Wir empfehlen das passende Paket.' },
  { wann: 'Danach', titel: 'Entwurf und Freigabe', text: 'Wir schreiben die Texte mit Ihnen und setzen um. Sie geben frei.' },
  { wann: 'In der Regel 14 Tage nach Ihren Inhalten', titel: 'Online', text: 'Website und E-Mail-Postfächer sind eingerichtet.' },
  { wann: 'Laufend', titel: 'Betreuung', text: 'Kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr).' },
];

/* „Was Sie beitragen“ (BEITRAG, firma.de Punkt 12) am 09.11.2026 entfernt (Jamil, Talk qh87y3sj #5211–#5213). */
