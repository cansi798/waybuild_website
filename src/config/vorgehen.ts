// Startseite, zwei Abschnitte nach der Kundenreise (09.11.2026). Alle Texte WÖRTLICH von Jamil (Talk qh87y3sj), nicht umformulieren.
// Komponenten: src/components/start/SoGehenWirVor.astro und src/components/start/Prinzipien.astro, Stil src/styles/vorgehen.css,
// Kartenstapel von „So gehen wir vor“: Höhen misst das Skript in SoGehenWirVor.astro. Nie „aus einer Hand“.
// 12.11.2026 (Jamil, Talk qh87y3sj #5606/#5610): auf der Startseite stehen weder die Phasen noch „So arbeiten wir.“ (Prinzipien.astro
// gelöscht). phasen und PRINZIPIEN bleiben hier nur für die Vorschau /neu/ (components/neu/reise/NeuVorgehen.astro).

/** „So gehen wir vor“ (Jamil #5188, freigegeben „ok 2b 3 ja“ #5190; Phasen-Texte allgemeiner für alle Pakete #5279). 2b: Jamils sechs Fragen werden NICHT gezeigt.
 *  Seit #5337 (09.11.2026, Sicherung vor-vorgehen-ablauf-20261109) mit „Von der Anfrage bis online“ zusammengeführt: links
 *  Überschrift, Unterzeile, Einleitung und die drei Phasen kurz; rechts die sechs Schritte als Kartenstapel, je Karte Phase + Zeit.
 *  Anker: #denkweise (Abschnitt), #ablauf (Beginn des Stapels), #erstberatung (Karte Erstgespräch). Alles „in der Regel“. */
export const VORGEHEN = {
  titel: 'So gehen wir vor',
  unter: 'Wir betrachten Ihr Unternehmen aus Sicht Ihrer Kunden.',
  intro: 'Bevor wir Empfehlungen aussprechen, schauen wir uns an, wie Ihr Unternehmen tatsächlich erlebt wird.',
  phasen: [
    { wort: 'Verstehen', text: 'Wir schauen uns an, wie Ihr Unternehmen heute wahrgenommen wird und was Ihre Kunden wirklich brauchen.' },
    {
      wort: 'Verbinden',
      text: 'Wir sorgen dafür, dass alles, was Sie mit uns umsetzen, zusammenpasst. Von der Website bis zu Ihren Abläufen.',
      betont: 'Nicht nebeneinander. Sondern miteinander.',
    },
    { wort: 'Verbessern', text: 'Wir entwickeln Schritt für Schritt weiter, was für Ihre Kunden den größten Unterschied macht.' },
  ] as { wort: string; text: string; betont?: string }[],
  /** phase = Index in phasen */
  schritte: [
    { phase: 0, wann: 'Tag 1', titel: 'Anfrage', text: 'Per Formular, E-Mail oder WhatsApp.' },
    { phase: 0, wann: 'In der Regel nach 1 Werktag', titel: 'Rückmeldung', text: 'Wir melden uns persönlich und vereinbaren einen Termin.' },
    { phase: 0, wann: 'Rund 20 Minuten', titel: 'Erstgespräch', text: 'Kostenlos und unverbindlich. Wir empfehlen das passende Paket.', anker: 'erstberatung' },
    { phase: 1, wann: 'Danach', titel: 'Entwurf und Freigabe', text: 'Wir erarbeiten die Inhalte mit Ihnen und setzen um. Sie geben frei.' },
    { phase: 1, wann: 'Bei Websites in der Regel 14 Tage nach Ihren Inhalten', titel: 'Online', text: 'Ihre Lösung ist eingerichtet und läuft, bei Websites inklusive E-Mail-Postfächern.' },
    { phase: 2, wann: 'Laufend', titel: 'Betreuung', text: 'Kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr).' },
  ] as { phase: number; wann: string; titel: string; text: string; anker?: string }[],
};

/** „So arbeiten wir.“ (Jamil #5192, „ok“ #5194): drei Prinzipien, keine Animation. leit = Jamils Zusammenfassung je Prinzip,
 *  zeilen = sein Text mit seinen Zeilenumbrüchen (je Zeile ein kurzer Absatz), schluss = hervorgehobener Schlusssatz.
 *  Ersetzt den kurzen Abschnitt „So arbeiten wir.“ vom Vormittag (ARBEITSWEISE in variante.ts, #5187).
 *  Wiederholungen gestrichen (Jamil, Talk qh87y3sj #5322 Q13): Leitsatz Verantwortung ohne „und übernehmen Verantwortung für das
 *  Ergebnis“ (steht im Schlusssatz), Einfachheit-Text ohne „und halten den Aufwand für Sie so gering wie möglich“ (steht im Leitsatz),
 *  Verlässlichkeit-Text ohne „Anfragen dürfen nicht verloren gehen.“ (steht im Leitsatz). */
export const PRINZIPIEN = {
  titel: 'So arbeiten wir.',
  /** Unterzeile aus Kundensicht (Jamil, Talk qh87y3sj #5381, 10.11.2026); Jamils Texte der drei Prinzipien bleiben unverändert */
  unter: 'Drei Grundsätze, auf die Sie sich bei uns verlassen können.',
  liste: [
    {
      wort: 'Verantwortung',
      leit: 'Wir denken mit.',
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
        'Wir übernehmen Abstimmungen und koordinieren Beteiligte.',
      ],
      schluss: ['Denn gute Lösungen erkennt man nicht daran, wie komplex sie sind.', 'Sondern daran, wie einfach sie sich anfühlen.'],
    },
    {
      wort: 'Verlässlichkeit',
      leit: 'Wir sorgen dafür, dass Anfragen nicht untergehen und Sie wissen, woran Sie sind.',
      zeilen: [
        'Wir glauben, dass gute Zusammenarbeit planbar sein sollte.',
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
