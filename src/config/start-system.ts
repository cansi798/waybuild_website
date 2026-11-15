// STARTSEITE, Abschnitt „Warum Website und Web-App zusammen besonders stark sind“ (Jamil Talk qh87y3sj #5853, 14.11.2026;
// überarbeitet nach #5905/#5906; NEU gestaltet nach #5938, 14.11.2026: neue Headline + Texte, „Vorher“ (verstreute
// Einzellösungen) → „Nachher“ (ein Kreislauf mit sechs Stationen, Folgeauftrag schließt den Kreis), fünf Nutzenkarten).
// Texte wörtlich aus Jamils Nachricht #5938. Komponente: src/components/startneu/SnSystem.astro, Stil: src/styles/start-system.css.

/** Welche Linien-Illustration (inline-SVG in der Komponente) eine Station zeigt */
export type SystemBild = 'website' | 'anfrage' | 'bearbeitung' | 'kunde' | 'bewertung' | 'folgeauftrag';
/** Kleine Kärtchen im „Vorher“-Bild */
export type SystemWerkzeug = 'mail' | 'excel' | 'messenger' | 'manuell';

export const SYSTEM = {
  /** Kennzeile über der Headline: von uns (aus dem bisherigen Abschnittstitel abgeleitet), nicht Jamils Wortlaut */
  kenn: 'Website und Web-App zusammen',
  titel: 'Viele Betriebe arbeiten mit zu vielen Einzellösungen.', // Jamil #6055 Fr. 23 (vorher „Die meisten Unternehmen nutzen …“)
  /** Kleiner Link zum Film (Jamil #6055 Fr. 34: nur als Link, kein Film auf der Startseite) */
  film: { text: 'Im Film ansehen: So kann es bei Ihnen laufen', pfad: '/so-kann-es-laufen/' },
  problem: [
    'Ihre Website gewinnt Interessenten. Danach beginnen oft E-Mails, Excel-Listen, Messenger-Nachrichten und manuelle Abläufe.',
    'Das kostet Zeit, führt zu Fehlern und sorgt dafür, dass Anfragen oder Informationen verloren gehen.',
  ],
  /** Beschriftungen „Vorher“ / „Mit webgold“: von uns ergänzt (Gestaltungsidee #5938), nicht Jamils Wortlaut */
  vorherLabel: 'Vorher',
  nachherLabel: 'Mit webgold',
  /** Werkzeuge im „Vorher“-Bild: Jamils Begriffe aus dem ersten Satz (rein bildlich, der Satz steht als Text daneben) */
  werkzeuge: [
    { art: 'mail', name: 'E-Mails' },
    { art: 'excel', name: 'Excel-Listen' },
    { art: 'messenger', name: 'Messenger-Nachrichten' },
    { art: 'manuell', name: 'Manuelle Abläufe' },
  ] as { art: SystemWerkzeug; name: string }[],
  loesung: 'webgold verbindet Website und Arbeitsalltag in einem abgestimmten System.',
  /** Weg in Jamils Reihenfolge (#5938); der Folgeauftrag schließt den Kreis zurück zur Website */
  fluss: [
    { bild: 'website', nr: '01', name: 'Website' },
    { bild: 'anfrage', nr: '02', name: 'Anfrage' },
    { bild: 'bearbeitung', nr: '03', name: 'Bearbeitung' },
    { bild: 'kunde', nr: '04', name: 'Kunde' },
    { bild: 'bewertung', nr: '05', name: 'Bewertung' },
    { bild: 'folgeauftrag', nr: '06', name: 'Folgeauftrag' },
  ] as { bild: SystemBild; nr: string; name: string }[],
  flussLabel: 'Kreislauf: Website, Anfrage, Bearbeitung, Kunde, Bewertung, Folgeauftrag – und wieder zur Website',
  /** Überschrift über den Nutzenkarten: von uns (seit #5906), nicht Jamils Wortlaut */
  ergebnisTitel: 'Was Ihnen das bringt',
  nutzen: [
    'Weniger verlorene Anfragen', // Jamil #6011, Audit #5953 W2 (vorher „Keine verlorenen Anfragen“)
    'Weniger Rückfragen von Kunden',
    'Aufgaben gehen nicht unter',
    'Alle Informationen an einem Ort',
    'Mehr Zeit für Ihr Kerngeschäft',
  ],
};
