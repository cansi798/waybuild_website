// Startseite, zwei Abschnitte nach der Kundenreise (09.11.2026). Alle Texte WÖRTLICH von Jamil (Talk qh87y3sj), nicht umformulieren.
// Komponenten: src/components/start/SoGehenWirVor.astro und src/components/start/Prinzipien.astro, Stil src/styles/vorgehen.css,
// Einblenden (nur „So gehen wir vor“) src/scripts/vorgehen.ts. Nie „aus einer Hand“.

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

/** „So arbeiten wir.“ (Jamil #5192, „ok“ #5194): drei Prinzipien, keine Animation. leit = Jamils Zusammenfassung je Prinzip,
 *  zeilen = sein Text mit seinen Zeilenumbrüchen (je Zeile ein kurzer Absatz), schluss = hervorgehobener Schlusssatz.
 *  Ersetzt den kurzen Abschnitt „So arbeiten wir.“ vom Vormittag (ARBEITSWEISE in variante.ts, #5187). */
export const PRINZIPIEN = {
  titel: 'So arbeiten wir.',
  liste: [
    {
      wort: 'Verantwortung',
      leit: 'Wir denken mit und übernehmen Verantwortung für das Ergebnis.',
      zeilen: [
        'Wir setzen nicht einfach um.',
        'Wenn wir einen besseren Weg sehen, sprechen wir ihn an.',
        'Wenn wir Risiken erkennen, weisen wir darauf hin.',
        'Und wenn wir glauben, dass eine andere Lösung besser zu Ihrem Unternehmen passt, empfehlen wir diese.',
        'Auch dann, wenn sie für uns nicht die einfachste oder lukrativste Wahl ist.',
      ],
      schluss: ['Wir übernehmen Verantwortung für das Ergebnis, nicht nur für die Umsetzung.'],
    },
    {
      wort: 'Einfachheit',
      leit: 'Wir übernehmen die Komplexität und halten den Aufwand gering.',
      zeilen: [
        'Unsere Kunden sollen sich nicht mit Werkzeugen, Prozessen oder Zuständigkeiten beschäftigen müssen.',
        'Sie beschreiben, was sie erreichen möchten.',
        'Wir kümmern uns um den Weg dorthin.',
        'Wir übernehmen Abstimmungen, koordinieren Beteiligte und halten den Aufwand für Sie so gering wie möglich.',
      ],
      schluss: ['Denn gute Lösungen erkennt man nicht daran, wie komplex sie sind.', 'Sondern daran, wie einfach sie sich anfühlen.'],
    },
    {
      wort: 'Verlässlichkeit',
      leit: 'Wir sorgen dafür, dass Anfragen nicht untergehen und Sie wissen, woran Sie sind.',
      zeilen: [
        'Wir glauben, dass gute Zusammenarbeit planbar sein sollte.',
        'Anfragen dürfen nicht verloren gehen.',
        'Offene Punkte dürfen nicht liegen bleiben.',
        'Und Kunden sollten nie rätseln müssen, was gerade passiert.',
        'Deshalb schaffen wir klare Zuständigkeiten, transparente Abläufe und nachvollziehbare Kommunikation.',
        'Wenn etwas erledigt wird, wird es erledigt.',
        'Wenn etwas Zeit benötigt, kommunizieren wir das frühzeitig.',
        'Und wenn es ein Problem gibt, suchen wir nach einer Lösung.',
      ],
      schluss: ['Denn Verlässlichkeit entsteht nicht durch Versprechen.', 'Sondern dadurch, dass man sich aufeinander verlassen kann.'],
    },
  ],
};
