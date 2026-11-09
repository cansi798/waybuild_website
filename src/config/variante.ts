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
export const HERO_KNOPF = 'Jetzt kostenlos beraten lassen';

/** Abschnitt direkt nach dem Hero „Kundenreise“ als Journey-Map (Jamil, Talk qh87y3sj #5181/#5182: „wirkt wie ein Arbeitsprozess,
 *  muss eine Customer Journey sein“, Variante B #5184, Text #5185, Plan „ok“ #5187, 09.11.2026). Ersetzt das „Zusammenspiel“ mit
 *  sieben Kacheln (#5176–#5179; Sicherung davor: Branch vor-kundenreise-20261109). Überschrift bleibt, Fragen und Leistungen
 *  wörtlich von Jamil. ziel = kleine Beschriftung am Ende der Kurve. Nie „aus einer Hand“. */
export const KUNDENREISE = {
  titel: 'Ein guter erster Eindruck allein reicht nicht aus.',
  intro: 'Das Problem ist nicht das einzelne Werkzeug, sondern das Zusammenspiel. Deshalb betrachten wir nicht nur Ihre Website, sondern den gesamten Weg Ihrer Kunden.',
  stationen: [
    { name: 'Aufmerksamkeit', frage: 'Wie werden potenzielle Kunden auf Ihr Unternehmen aufmerksam?', leistungen: ['Website', 'Google', 'Social Media'] },
    { name: 'Vertrauen', frage: 'Warum sollten Interessenten sich für Sie entscheiden?', leistungen: ['Klare Inhalte', 'Bewertungen', 'Referenzen', 'Kundenstimmen'] },
    { name: 'Anfrage', frage: 'Wie einfach wird aus Interesse ein Kontakt?', leistungen: ['Formulare', 'Terminbuchung', 'CRM'] },
    { name: 'Bearbeitung', frage: 'Wie schnell und zuverlässig werden Anfragen bearbeitet?', leistungen: ['Prozesse', 'Automatisierung', 'Systeme'] },
    { name: 'Betreuung', frage: 'Wie wird aus einem Kunden ein zufriedener Kunde?', leistungen: ['Nachfassen', 'Bewertungsanfragen', 'Auswertung'] },
  ],
  ziel: 'zufriedener Kunde',
  /* Schlusssatz mit Link auf den Kundenreise-Check (#5204) am 09.11.2026 entfernt, ohne Ersatztext; dort steht jetzt der Knopf
   * HERO_KNOPF zur Erstberatung (Jamil, Talk qh87y3sj #5211–#5213, Check gelöscht). */
};

/** Kurzer Vergleich nach Anbieter-Arten (UWG § 6: keine Namen, sachlich). Aus angebot.ts ANBIETER_VERGLEICH abgeleitet. */
export const VERGLEICH = {
  spalten: ['Selbst machen', 'Baukasten', 'Agentur', 'waybuild'],
  zeilen: [
    { frage: 'Wer schreibt die Texte?', werte: ['Sie selbst', 'Sie selbst, mit Vorlagen', 'Meist gegen Aufpreis', 'Wir, gemeinsam mit Ihnen'] },
    { frage: 'Wer kümmert sich um Google?', werte: ['Sie selbst', 'Sie selbst', 'Meist eigenes Angebot', 'Im Paket Plus und Komplett inklusive'] },
    { frage: 'Wer macht Updates und Sicherungen?', werte: ['Sie selbst', 'Der Anbieter, für die Technik', 'Mit Wartungsvertrag', 'Wir, im Monatspreis'] },
    { frage: 'Wen rufe ich an?', werte: ['Niemanden', 'Den allgemeinen Support', 'Je nach Vertrag', 'Ihren festen Ansprechpartner'] },
    { frage: 'Wie planbar sind die Kosten?', werte: ['Niedrig, aber viel Eigenarbeit', 'Monatlich, Inhalte selbst', 'Projektpreis, Pflege extra', 'Fester Monatspreis, keine Einrichtungskosten'] },
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
