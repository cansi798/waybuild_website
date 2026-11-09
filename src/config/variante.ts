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
    { frage: 'Wie planbar sind die Kosten?', werte: ['Niedrig, aber viel Eigenarbeit', 'Monatlich, Inhalte selbst', 'Projektpreis, Pflege extra', 'Fester Monatspreis, keine Einrichtungskosten'] },
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

