// Kostenlose Vorschau (Jamil #6061, 15.11.2026; beschlossen #6055 Fr. 16: „kostenlose Vorschau für jede Anfrage; Feinschliff/Rückmeldung am nächsten Werktag“).
// EINE Stelle für alle Texte: Hero, Pakete (Startseite + /preise/), Kontaktseite, Abschluss.
// WICHTIG: bewusst KEINE Zahlungsaussage („zahlen erst, wenn …“) – das klärt Jamil noch. Kommt sie, wird sie NUR hier in
// ZAHLUNGS_ZUSATZ eingetragen (Leerstring = nichts sichtbar) und erscheint überall.
export const ZAHLUNGS_ZUSATZ = 'Sie zahlen erst, wenn Sie sich für uns entscheiden.'; // Jamil #6064 (Variante a)

export const VORSCHAU = {
  /** Kurzform (Hero-Plakette, Paketband) */
  kurz: 'Kostenlose, unverbindliche Vorschau Ihrer Website',
  /** Überschrift in Paketband und Kontaktkasten */
  titel: 'Kostenlose, unverbindliche Vorschau für jede Anfrage',
  /** Erklärsatz: nur beschlossene Fakten (#6055 Fr. 16), kein Zahlungsversprechen */
  text: 'Zu jeder Anfrage erstellen wir Ihnen eine Vorschau Ihrer Website, kostenlos und unverbindlich. Feinschliff und Rückmeldung folgen am nächsten Werktag.',
  /** Kurzer Satz für den Abschluss der Startseite */
  abschluss: 'Zu jeder Anfrage erhalten Sie eine kostenlose, unverbindliche Vorschau Ihrer Website.',
};

/** Erklärsatz inkl. optionalem Zahlungs-Zusatz */
export const vorschauText = () => [VORSCHAU.text, ZAHLUNGS_ZUSATZ].filter(Boolean).join(' ');
