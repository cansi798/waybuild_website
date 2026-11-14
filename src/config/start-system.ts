// STARTSEITE, Abschnitt „Warum Website und WebApp zusammen besonders stark sind“ (Jamil Talk qh87y3sj #5853, 14.11.2026;
// überarbeitet nach #5905/#5906, 14.11.2026: Prozessweg hochwertiger, eigene Linien-Illustrationen statt Standard-Icons,
// letzte Station „zufriedener Kunde“, Nutzenpunkte sichtbar als Ergebnis des Weges).
// Texte wörtlich aus Jamils Nachricht. Komponente: src/components/startneu/SnSystem.astro, Stil: src/styles/start-system.css.

/** Welche Linien-Illustration (inline-SVG in der Komponente) eine Station zeigt */
export type SystemBild = 'website' | 'anfrage' | 'bearbeitung' | 'kunde';

export const SYSTEM = {
  titel: 'Warum Website und WebApp zusammen besonders stark sind',
  unterzeile: 'Ein System statt vieler Einzellösungen.',
  problem: [
    'Viele Unternehmen nutzen verschiedene Werkzeuge für Website, Kommunikation, Verwaltung und interne Organisation.',
    'Das führt oft zu doppelter Arbeit, Medienbrüchen und unnötigem Aufwand.',
  ],
  ganzheitlich: 'Wir denken digitale Lösungen ganzheitlich:',
  /** Weg in Jamils Reihenfolge (#5853), letzte Station umbenannt in „zufriedener Kunde“ (#5905) */
  fluss: [
    { bild: 'website', nr: '01', name: 'Website' },
    { bild: 'anfrage', nr: '02', name: 'Anfrage' },
    { bild: 'bearbeitung', nr: '03', name: 'Bearbeitung' },
    { bild: 'kunde', nr: '04', name: 'zufriedener Kunde' },
  ] as { bild: SystemBild; nr: string; name: string }[],
  flussLabel: 'Ablauf: Website, Anfrage, Bearbeitung, zufriedener Kunde',
  verbund: 'Alle Bausteine greifen ineinander und unterstützen Ihre täglichen Abläufe.',
  /** Überschrift des Ergebnis-Blocks: von uns ergänzt (Jamil #5906 „zeige auf, dass wenn man es so macht,
   *  diese Vorteile mit sich bringt“), nicht Jamils Wortlaut */
  ergebnisTitel: 'Was Ihnen das bringt',
  /** Weiches Trennzeichen (­) in „Informations­verluste“, damit das Wort auf schmalen Kacheln sauber umbricht (#5906) */
  nutzen: [
    'Weniger manuelle Arbeit',
    'Weniger Informations­verluste',
    'Schnellere Prozesse',
    'Höhere Transparenz',
    'Mehr Zeit für Ihr Kerngeschäft',
  ],
};
