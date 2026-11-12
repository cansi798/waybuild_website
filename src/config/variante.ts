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
  /** Unterzeile im Hero: Wortlaut von Jamil (Talk qh87y3sj #5359, 09.11.2026: „beide Sätze beginnen mit von“ – H1 bleibt, Unterzeile ohne „Von …“).
   *  Vorher #5174. Meta-Description/JSON-LD bleiben eigenständig (index.astro). */
  unter: 'Digitale Sichtbarkeit, Anfrage, Bearbeitung und Betreuung: Wir sorgen dafür, dass alle Bausteine nahtlos zusammenspielen.',
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
  /** Fragen und Antworten neu (Jamil, Talk qh87y3sj #5632 „ok“, 12.11.2026; Sicherung Tag vor-bestenfalls-20261112) */
  stationen: [
    { name: 'Aufmerksamkeit', frage: 'Finden Kunden Sie – oder zuerst die Konkurrenz?', antwort: 'Wer nach Ihrer Leistung sucht, stößt bei Google und auf der Karte zuerst auf Sie und landet auf einer Website, die sofort überzeugt.' },
    { name: 'Vertrauen', frage: 'Warum sollte jemand ausgerechnet Sie anrufen?', antwort: 'Echte Bewertungen, Beispiele Ihrer Arbeit und klare Worte zeigen in Sekunden: Hier bin ich richtig.' },
    { name: 'Anfrage', frage: 'Wie viele Interessenten springen ab, weil der Kontakt zu umständlich ist?', antwort: 'Ein Klick, und die Anfrage ist da: per Formular, Terminbuchung oder Anruf. Rund um die Uhr, auch wenn Sie gerade beim Kunden sind.' },
    { name: 'Bearbeitung', frage: 'Wie viele Anfragen gehen bei Ihnen im Alltag unter?', antwort: 'Keine Anfrage geht mehr verloren. Alle Anfragen werden zügig und verlässlich beantwortet, auch unangenehme Anfragen und auch an vollen Tagen. Vieles davon läuft automatisch im Hintergrund.' },
    { name: 'Betreuung', frage: 'Kommen Ihre Kunden wieder und empfehlen Sie weiter?', antwort: 'Nach dem Auftrag bleiben Sie automatisch in Kontakt, bitten zur richtigen Zeit um eine Bewertung, und aus Kunden werden Fans, die Sie gern weiterempfehlen.' },
  ],
  /** Beschriftung des Symbols (Screenreader) und kleine Überschrift über jeder Antwort */
  antwortTitel: 'Bestenfalls', // vorher „So sieht es im besten Fall aus“ (Jamil, Talk qh87y3sj #5626, 12.11.2026)
  ziel: 'zufriedener Kunde',
  /** Unterzeile unter „zufriedener Kunde“ (Jamil, Talk qh87y3sj #5632, 12.11.2026) */
  zielUnter: 'Mehr Anfragen, weniger Aufwand und Kunden, die gern wiederkommen.',
  /** Abschluss (#5275): Satz + Knopf zur Erstberatung (gleiches Ziel wie der Hero-Knopf). Ersetzt den Hero-Knopf an dieser Stelle
   *  (#5211–#5213; davor Schlusssatz mit Link auf den gelöschten Kundenreise-Check #5204). */
  schluss: 'Wir sind dafür der richtige Ansprechpartner.',
  knopf: 'Jetzt starten',
};

/** Kurzer Vergleich nach Anbieter-Arten (UWG § 6: keine Namen, sachlich). Ursprünglich aus angebot.ts ANBIETER_VERGLEICH abgeleitet.
 *  Seit Jamil, Talk qh87y3sj #5349 (10.11.2026) auf alle Produkte abgestimmt, auch individuelle Software: Spalte „Agentur oder
 *  Softwarehaus“, sechs Fragen, Zeile „Wer kümmert sich um Google?“ entfernt (Sicherung: Branch vor-vergleich-produkte-20261109).
 *  Letzte Spalte = waybuild (VVergleich.astro und llms.txt lesen werte[3]). Seit #5447 ohne Zeilen-Icons und ohne Häkchen.
 *  Einzige Quelle für beide Vergleiche: Startseite (VVergleich.astro) und /warum-waybuild/ (Tabelle/Karten) (Jamil, Talk qh87y3sj #5369). */
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

/* Ablauf „Von der Anfrage bis online“ (ZEITLEISTE) am 09.11.2026 in „So gehen wir vor“ aufgegangen (Jamil, Talk qh87y3sj #5337; config/vorgehen.ts). */
/* „Was Sie beitragen“ (BEITRAG, firma.de Punkt 12) am 09.11.2026 entfernt (Jamil, Talk qh87y3sj #5211–#5213). */
