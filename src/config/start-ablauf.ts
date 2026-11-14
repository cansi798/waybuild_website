// Startseite: Abschnitt „So geht es los“ (Anker #ablauf) in acht Schritten + „Ihr Vorteil“. Jamil Talk qh87y3sj #5939, 14.11.2026:
// „so soll es nun sein. fasse es kürzer zusammen und hebe die Unternehmens DNA hervor … stelle es schön im stil der website dar“.
// Komponente: src/components/startneu/SnAblauf.astro, Stil: src/styles/start-ablauf.css. (vorgehen.ts bleibt für /neu/ und Unterseiten.)
// Gekürzt aus Jamils Wortlaut: je Schritt Titel + ein Satz + Zeitangabe (Jamils ⏱-Angaben), Unterpunkte als Stichworte.
// Werberecht (UWG): keine Garantien. „Sie gehen kein Risiko ein“ → „Sie entscheiden erst, wenn …“; „messbare Ergebnisse“ als Ziel;
// Zeitangaben „in der Regel“. „Umsetzung aus einer Hand“ bleibt (Jamils ausdrücklicher Wortlaut #5939).

export interface AblaufGruppe { name: string; punkte: string[] }
export interface AblaufSchritt {
  titel: string;
  text: string;
  /** Zeitangabe (Jamils ⏱) bzw. Zeitpunkt */
  zeit: string;
  /** kurze Einleitung vor den Stichworten, z. B. „Wir prüfen“ */
  stichwortTitel?: string;
  stichworte?: string[];
  /** Schritt 3: Website- vs. Software-Vorschau */
  gruppen?: AblaufGruppe[];
  /** Schritt 6: die beiden Möglichkeiten */
  wahl?: [string, string];
  /** Schritt 5: Höhepunkt (Unternehmens-DNA) */
  dna?: boolean;
  anker?: string;
}

export const START_ABLAUF = {
  kenn: 'So arbeiten wir',
  titel: 'So geht es los',
  lead: 'Erst verstehen, dann bauen: Sie sehen bereits vor einer Beauftragung, was für Ihr Unternehmen möglich ist.',
  schritte: [
    {
      titel: 'Produkt auswählen & Termin buchen',
      text: 'Ob neue Website, Relaunch oder individuelle Software: Sie wählen die passende Lösung und buchen direkt einen Termin.',
      zeit: 'Dauer: 2 Minuten',
      anker: 'erstberatung',
    },
    {
      titel: 'Kostenlose Analyse Ihres Unternehmens',
      text: 'Wir analysieren Ihr Unternehmen, Ihre Website und Ihre digitale Sichtbarkeit. Sie müssen dafür nichts vorbereiten.',
      zeit: 'Automatisch vor dem Gespräch',
      stichwortTitel: 'Wir prüfen unter anderem',
      stichworte: ['Aktuelle Website', 'Benutzerfreundlichkeit', 'Ladegeschwindigkeit', 'SEO-Potenziale', 'Wettbewerber', 'Digitalisierungsmöglichkeiten'],
    },
    {
      titel: 'Individuelle Vorschau erhalten',
      text: 'Auf Basis der Analyse erstellen wir eine erste Vorschau. So sehen Sie schon vor einer Beauftragung, was möglich ist.',
      zeit: 'Vor unserem Termin',
      gruppen: [
        { name: 'Website-Projekt', punkte: ['Erste Designvorschläge', 'Struktur der Website', 'Verbesserungen zum Ist-Zustand'] },
        { name: 'Software-Projekt', punkte: ['Prozessanalyse', 'Lösungsansatz', 'Software-Konzept', 'Mockups und Ansichten'] },
      ],
    },
    {
      titel: 'Gemeinsames Strategiegespräch',
      text: 'Wir zeigen Ihnen Analyse, Potenziale und Ihre Vorschau und lernen dabei Ihr Unternehmen, Ihre Ziele und Ihre Kunden kennen.',
      zeit: 'ca. 60 Minuten',
      stichworte: ['Analyseergebnisse', 'Verbesserungspotenziale', 'Ihre Vorschau', 'Nächste Schritte'],
    },
    {
      titel: 'Feinschliff auf Basis Ihrer Unternehmens-DNA',
      text: 'Wir passen die Lösung an Ihre Wünsche, Ziele und Unternehmenswerte an. Sie erhalten eine deutlich verfeinerte Version Ihrer zukünftigen Website oder Software.',
      zeit: 'In der Regel innerhalb von 5 Stunden',
      stichworte: ['Ihre Wünsche', 'Ihre Ziele', 'Ihre Unternehmenswerte'],
      dna: true,
    },
    {
      titel: 'Entscheidung ohne Druck',
      text: 'Sie entscheiden in Ruhe und erst dann, wenn Sie einen konkreten Eindruck unserer Arbeit haben.',
      zeit: 'In Ruhe, ohne Druck',
      wahl: ['Zusammenarbeit starten', 'Keine Zusammenarbeit'],
    },
    {
      titel: 'Umsetzung',
      text: 'Nach Ihrer Freigabe starten wir mit der Umsetzung und halten Sie über jeden wichtigen Schritt auf dem Laufenden.',
      zeit: 'Nach Ihrer Freigabe',
      stichwortTitel: 'Je nach Projekt',
      stichworte: ['Website-Entwicklung', 'SEO-Optimierung', 'Automatisierungen', 'Softwareentwicklung', 'Schnittstellen', 'KI-Lösungen'],
    },
    {
      titel: 'Go-Live & Wachstum',
      text: 'Wir begleiten den Start Ihrer Lösung. Unser Ziel ist nicht nur eine schöne Website oder Software, sondern messbare Ergebnisse.',
      zeit: 'Nach Fertigstellung',
      stichwortTitel: 'Unser Ziel',
      stichworte: ['Mehr Anfragen', 'Mehr Kunden', 'Mehr Effizienz', 'Höhere Sichtbarkeit', 'Bessere Kundenerlebnisse'],
    },
  ] as AblaufSchritt[],
  dnaMarke: 'Ihre Unternehmens-DNA',
  vorteilTitel: 'Ihr Vorteil',
  vorteile: [
    'Keine Standardberatung',
    'Schon vor dem ersten Gespräch eine erste Vorschau',
    'Individuelle Analyse Ihres Unternehmens',
    'Transparenter Ablauf',
    'Umsetzung aus einer Hand', // Jamils Wortlaut #5939 (gilt vor der alten Notiz in vorgehen.ts)
    'Unser Ziel: messbarer Geschäftserfolg',
  ],
};
