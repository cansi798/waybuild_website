// STARTSEITE OBEN = Startseite der Variante „an firma.de orientiert“ (Jamil, Talk qh87y3sj #5061/#5062, 08.11.2026 19:23
// „Go“/„Ok“). Herkunft: archiv/variante-firma-20261108/config/variante.ts (Sicherung davor: Branch vor-variante-start-20261108).
// Zurückgeholt sind NUR die Texte der Variante-Startseite. Pakete, Preise, Einmal-Leistungen, Fragen und Rechtshinweis kommen
// aus src/config/pakete-abo.ts (Preise nie hier eintragen). Kein Gründungspaket, keine Gründer-Verweise, kein „aus einer Hand“.
// Angepasst an das Paketmodell vom 08.11. (#5056): „keine Einmalkosten“ → „keine Einrichtungskosten“, weil Logo,
// Signatur, Geschäftspapiere und Visitenkarten heute einmalig dazubuchbar sind.

/** Einstieg im ersten Bildschirm (firma.de-Vergleich Punkt 1 + 2). */
export const V_HERO = {
  /** H1 im Hero, Variante E von Jamil (Talk qh87y3sj #5129). Title und Meta-Description bleiben eigenständig (index.astro). */
  titel: 'Digitale Lösungen für Unternehmen, die mehr erreichen wollen.', // Jamil Talk qh87y3sj #5845, 14.11.2026 (vorher #5129 „Von der ersten Aufmerksamkeit …“)
  /** Unterzeile im Hero: Wortlaut von Jamil (Talk qh87y3sj #5359, 09.11.2026: „beide Sätze beginnen mit von“ – H1 bleibt, Unterzeile ohne „Von …“).
   *  Vorher #5174. Meta-Description/JSON-LD bleiben eigenständig (index.astro). */
  unter: 'Ob professionelle Website, individuelle WebApp oder beides gemeinsam: Wir entwickeln digitale Lösungen, die Kunden gewinnen, Arbeitsabläufe vereinfachen und mit Ihrem Unternehmen mitwachsen.', // Jamil #5845, 14.11.2026 (ersetzt #5654 und den Entwurf #5843)
  /** Vertrauenshinweis unter dem Knopf (Jamil #5847, 14.11.2026) */
  fuer: 'Für klein- und mittelständische Unternehmen.', // Jamil #5878, 14.11.2026 (vorher die Aufzählung aus #5847)
};

/** Einziger Knopf im Hero (#5121–#5124, Beschriftung von uns gewählt, Jamil kann sie ändern). Ziel: Kontakt, Erstberatung. */
export const HERO_KNOPF = 'Kostenlose Beratung'; // Jamil #5846, 14.11.2026 (vorher „Kostenlose Erstberatung“)
/** Knopf im Abschluss der Startseite (Jamil #5855, 14.11.2026) */
export const ABSCHLUSS_KNOPF = 'Kostenlose Beratung vereinbaren';

/** Abschnitt direkt nach dem Hero „Kundenreise“ als Journey-Map (Jamil, Talk qh87y3sj #5181/#5182: „wirkt wie ein Arbeitsprozess,
 *  muss eine Customer Journey sein“, Variante B #5184, Text #5185, Plan „ok“ #5187, 09.11.2026). Ersetzt das „Zusammenspiel“ mit
 *  sieben Kacheln (#5176–#5179; Sicherung davor: Branch vor-kundenreise-20261109). Überschrift bleibt, Fragen wörtlich von Jamil.
 *  Seit #5275 (09.11.2026, „ohne ok“; Sicherung vor-kundenreise-antworten-20261109): keine Leistungen mehr unter den Fragen, die
 *  Fragen stellt sich der Besucher; je Station ein kleines Symbol, das die „perfekte Antwort“ (antwort = Optimalzustand, Sie-Form)
 *  aufklappt; am Ende schluss + knopf. ziel = kleine Beschriftung am Ende der Kurve. Nie „aus einer Hand“. */
export const KUNDENREISE = {
  // Jamil #5820/#5824 (13.11.2026, „a-f“): Überschrift mit Nutzen (a), alter Satz als Kennzeile darüber; keine absoluten Versprechen
  // (b, UWG Irreführung), klar wer was tut (c), Antworten kürzer (f). Vorher: Tag vor-reise-af-20261113.
  kennzeile: 'Ein guter erster Eindruck ist erst der Anfang.', // Jamil, Talk qh87y3sj #5655/#5658, 12.11.2026 (bis 13.11. Überschrift)
  titel: 'Vom ersten Klick bis zur Weiter\u00ADempfehlung.', // \u00AD = weiche Trennung, sonst bei 320 px zu breit
  intro: 'Ihre Kunden erleben nicht nur Ihre Website, sondern auch alles danach: Anfrage, Angebot, Auftrag und Betreuung. Wir unterstützen Sie bei jedem dieser Schritte.',
  /** Fragen wie von Jamil (#5632 „ok“, 12.11.2026), Antworten seit #5824 gekürzt und ohne absolute Versprechen */
  stationen: [
    { name: 'Aufmerksamkeit', frage: 'Finden Kunden Sie – oder zuerst die Konkurrenz?', antwort: 'Wer nach Ihrer Leistung sucht, findet Sie leichter bei Google und auf der Karte. Dort sieht er eine Website, die Ihren Betrieb klar zeigt.' },
    { name: 'Vertrauen', frage: 'Warum sollte jemand ausgerechnet Sie anrufen?', antwort: 'Bewertungen, Beispiele Ihrer Arbeit und klare Worte zeigen schnell: Hier bin ich richtig.' },
    { name: 'Anfrage', frage: 'Wie viele Interessenten springen ab, weil der Kontakt zu umständlich ist?', antwort: 'Mit wenigen Klicks fragt der Kunde an, per Formular oder Anruf, mit der App auch per Terminbuchung. So erreicht er Sie, auch wenn Sie gerade beim Kunden sind.' },
    { name: 'Bearbeitung', frage: 'Wie viele Anfragen gehen bei Ihnen im Alltag unter?', antwort: 'In der Betriebs-App landen Ihre Anfragen an einem Ort, und Sie sehen, was noch offen ist. Sie antworten selbst, in Ihrem Ton. Angebot und Rechnung bereitet die App vor.' },
    { name: 'Betreuung', frage: 'Kommen Ihre Kunden wieder und empfehlen Sie weiter?', antwort: 'Mit der App melden Sie sich nach dem Auftrag bei Ihren Kunden und bitten um eine Bewertung. So bleiben Sie in Erinnerung und werden eher weiterempfohlen.' },
  ],
  /** Beschriftung des Symbols (Screenreader) und kleine Überschrift über jeder Antwort */
  antwortTitel: 'Mit waybuild', // Jamil #5824 (d), 13.11.2026; davor „Bestenfalls“ (#5626), „So sieht es im besten Fall aus“
  ziel: 'zufriedener Kunde',
  /** Unterzeile unter „zufriedener Kunde“ (Jamil, Talk qh87y3sj #5632, 12.11.2026) */
  zielUnter: 'Mehr Anfragen, weniger Aufwand und Kunden, die gern wiederkommen.',
  /** Abschluss (#5275): Satz + Knopf zur Erstberatung (gleiches Ziel wie der Hero-Knopf). Ersetzt den Hero-Knopf an dieser Stelle
   *  (#5211–#5213; davor Schlusssatz mit Link auf den gelöschten Kundenreise-Check #5204). */
  schluss: 'Bereit für mehr Anfragen und glückliche Kunden?', // Jamil, Talk qh87y3sj #5657/#5662, 12.11.2026 (vorher „Wir sind dafür der richtige Ansprechpartner.“)
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
