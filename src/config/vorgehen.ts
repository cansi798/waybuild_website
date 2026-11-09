// Startseite, zwei Abschnitte nach der Kundenreise (09.11.2026). Alle Texte WÖRTLICH von Jamil (Talk qh87y3sj), nicht umformulieren.
// Komponente: src/components/start/SoGehenWirVor.astro, Stil src/styles/vorgehen.css, Einblenden src/scripts/vorgehen.ts. Nie „aus einer Hand“.

/** „So gehen wir vor“ (Jamil #5188, freigegeben „ok 2b 3 ja“ #5190). 2b: Jamils sechs Fragen werden NICHT gezeigt.
 *  Ersetzt den Abschnitt „Verstehen. Empfehlen. Umsetzen. Verbessern.“; Anker #denkweise (Abschnitt) und #erstberatung
 *  (Schritt 1 mit dem Erstgespräch) bleiben, damit alte Links weiter treffen. */
export const VORGEHEN = {
  titel: 'So gehen wir vor',
  unter: 'Wir betrachten Ihr Unternehmen aus Sicht Ihrer Kunden.',
  intro: 'Bevor wir Empfehlungen aussprechen, schauen wir uns an, wie Ihr Unternehmen tatsächlich erlebt wird.',
  ueberleitung: 'Denn jeder dieser Schritte beeinflusst die Erfahrung Ihrer Kunden.',
  schritte: [
    {
      wort: 'Verstehen',
      text: 'Wir analysieren, wie Ihr Unternehmen heute wahrgenommen wird und wie Interessenten zu Kunden werden.',
      hinweis: 'Start: kostenloses Erstgespräch, rund 20 Minuten.',
      anker: 'erstberatung',
    },
    {
      wort: 'Verbinden',
      text: 'Wir sorgen dafür, dass Website, Kommunikation, Prozesse und Systeme zusammenarbeiten.',
      betont: 'Nicht nebeneinander. Sondern miteinander.',
    },
    {
      wort: 'Verbessern',
      text: 'Wir entwickeln die Bereiche weiter, die den größten Einfluss auf Kunden, Abläufe und Wachstum haben.',
    },
  ] as { wort: string; text: string; hinweis?: string; betont?: string; anker?: string }[],
};
