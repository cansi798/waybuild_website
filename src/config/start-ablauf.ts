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

// Jamil #6055 (15.11.2026): Fr. 14 „ok“ = EIN Ablauf in fünf Schritten überall gleich (START_ABLAUF_KURZ: Startseite, Preise),
// die acht Schritte ausführlich als „So arbeiten wir“ auf /ueber-uns/ (#so-arbeiten-wir). Fr. 15: ein Gespräch, rund 30 Minuten
// (vorher 20 bzw. 60). Fr. 16: kostenlose Vorschau für jede Anfrage, Feinschliff am nächsten Werktag (vorher „5 Stunden“).
// Fr. 26: Fachbegriffe übersetzt, „Unternehmens-DNA“ bleibt und wird kurz erklärt. Fr. 27: „Website und Web-App vom selben Team“.
// Fr. 28: „messbar“ = Monatsbericht mit Besuchern und Anfragen (ab Online wachsen, pakete-abo.ts).
export const DNA_ERKLAERT = 'Ihre Unternehmens-DNA ist das, was Ihr Unternehmen ausmacht: Ihre Werte, Ihre Art zu arbeiten und das, wofür Kunden Sie schätzen.';
export const MESSBAR = 'Ab Online wachsen zeigen wir Ihnen jeden Monat Besucher und Anfragen im Monatsbericht.';

export const START_ABLAUF = {
  kenn: 'So arbeiten wir',
  titel: 'So geht es los',
  lead: 'Erst verstehen, dann bauen: Sie sehen bereits vor einer Beauftragung, was für Ihr Unternehmen möglich ist.',
  schritte: [
    {
      // Jamil #6011, Audit #5953 H3 (15.11.2026): ehrlich, es gibt keinen Kalender – Anfrage senden, wir melden uns mit Terminvorschlägen
      titel: 'Produkt auswählen & Anfrage senden',
      text: 'Ob neue Website, Relaunch oder individuelle Software: Sie wählen die passende Lösung und senden uns eine kurze Anfrage. Wir melden uns persönlich mit Terminvorschlägen.',
      zeit: 'Dauer: 2 Minuten',
      anker: 'erstberatung',
    },
    {
      titel: 'Kostenlose Analyse Ihres Unternehmens',
      text: 'Wir analysieren Ihr Unternehmen, Ihre Website und Ihre digitale Sichtbarkeit. Sie müssen dafür nichts vorbereiten.',
      zeit: 'Kostenlos, vor dem Gespräch', // Jamil #6055 Fr. 16 (für jede Anfrage)
      stichwortTitel: 'Wir prüfen unter anderem',
      stichworte: ['Aktuelle Website', 'Benutzerfreundlichkeit', 'Ladegeschwindigkeit', 'Wie gut man Sie bei Google findet', 'Wettbewerber', 'Digitalisierungsmöglichkeiten'], // Fr. 26
    },
    {
      titel: 'Individuelle Vorschau erhalten',
      text: 'Auf Basis der Analyse erstellen wir für jede Anfrage eine kostenlose erste Vorschau. So sehen Sie schon vor einer Beauftragung, was möglich ist.', // Fr. 16
      zeit: 'Vor unserem Termin',
      gruppen: [
        { name: 'Website-Projekt', punkte: ['Erste Designvorschläge', 'Struktur der Website', 'Verbesserungen zum Ist-Zustand'] },
        { name: 'Web-App-Projekt', punkte: ['Prozessanalyse', 'Lösungsansatz', 'Konzept der Web-App', 'Entwürfe und Ansichten'] }, // Fr. 26 (vorher „Mockups und Ansichten“)
      ],
    },
    {
      titel: 'Kostenloses Erstgespräch', // Fr. 15: ein Gespräch, rund 30 Minuten (vorher „Gemeinsames Strategiegespräch, ca. 60 Minuten“)
      text: 'Wir zeigen Ihnen Analyse, Potenziale und Ihre Vorschau und lernen dabei Ihr Unternehmen, Ihre Ziele und Ihre Kunden kennen.',
      zeit: 'Rund 30 Minuten',
      stichworte: ['Analyseergebnisse', 'Verbesserungspotenziale', 'Ihre Vorschau', 'Nächste Schritte'],
    },
    {
      titel: 'Feinschliff auf Basis Ihrer Unternehmens-DNA',
      text: `${DNA_ERKLAERT} Darauf passen wir die Lösung an, und Sie erhalten eine verfeinerte Version Ihrer zukünftigen Website oder Web-App.`, // Fr. 26
      zeit: 'In der Regel am nächsten Werktag', // Fr. 16 (vorher „innerhalb von 5 Stunden“)
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
      stichworte: ['Website', 'Bei Google gefunden werden', 'Automatische Abläufe', 'Web-App', 'Verbindung zu Ihren Programmen', 'KI-Lösungen'], // Fr. 26
    },
    {
      titel: 'Start & Wachstum', // Fr. 26 (vorher „Go-Live & Wachstum“)
      text: `Wir begleiten den Start Ihrer Lösung. Unser Ziel ist nicht nur eine schöne Website oder Web-App, sondern messbare Ergebnisse. ${MESSBAR}`, // Fr. 28
      zeit: 'Nach Fertigstellung',
      stichwortTitel: 'Unser Ziel',
      stichworte: ['Mehr Anfragen', 'Mehr Kunden', 'Mehr Effizienz', 'Höhere Sichtbarkeit', 'Bessere Kundenerlebnisse'],
    },
  ] as AblaufSchritt[],
  dnaMarke: 'Ihre Unternehmens-DNA',
  /** Link von der Kurzfassung zur langen Fassung (Fr. 14) */
  langLink: { text: 'Alle acht Schritte ausführlich: So arbeiten wir', pfad: '/ueber-uns/#so-arbeiten-wir' },
  vorteilTitel: 'Ihr Vorteil',
  vorteile: [
    'Keine Standardberatung',
    'Schon vor dem ersten Gespräch eine erste Vorschau',
    'Individuelle Analyse Ihres Unternehmens',
    'Transparenter Ablauf',
    'Website und Web-App vom selben Team', // Jamil #6055 Fr. 27 (vorher „Umsetzung aus einer Hand“)
    'Unser Ziel: messbarer Geschäftserfolg, sichtbar im Monatsbericht', // Fr. 28
  ],
};

/** EIN Ablauf in fünf Schritten, überall gleich (Jamil #6055 Fr. 14: Anfrage → Analyse + Vorschau → Gespräch → Feinschliff → Start).
 *  Kurzfassung der acht Schritte oben, gleiche Aussagen (Fr. 15 30 Minuten, Fr. 16 jede Anfrage / nächster Werktag, Fr. 26 DNA erklärt, Fr. 28). */
export const START_ABLAUF_KURZ = {
  kenn: 'So geht es los',
  titel: 'In fünf Schritten zu Ihrer Lösung',
  lead: 'Erst verstehen, dann bauen: Sie sehen bereits vor einer Beauftragung, was für Ihr Unternehmen möglich ist.',
  schritte: [
    { titel: 'Anfrage senden', text: 'Sie wählen die passende Lösung und senden uns eine kurze Anfrage. Wir melden uns persönlich mit Terminvorschlägen.', zeit: 'Dauer: 2 Minuten', anker: 'erstberatung' },
    { titel: 'Kostenlose Analyse und Vorschau', text: 'Wir analysieren Ihr Unternehmen, Ihre Website und wie gut man Sie bei Google findet, und erstellen für jede Anfrage eine kostenlose erste Vorschau.', zeit: 'Vor unserem Gespräch' },
    { titel: 'Kostenloses Erstgespräch', text: 'Wir zeigen Ihnen Analyse und Vorschau und lernen Ihr Unternehmen, Ihre Ziele und Ihre Kunden kennen.', zeit: 'Rund 30 Minuten' },
    { titel: 'Feinschliff auf Basis Ihrer Unternehmens-DNA', text: `${DNA_ERKLAERT} Darauf passen wir Ihre Vorschau an.`, zeit: 'In der Regel am nächsten Werktag', stichworte: ['Ihre Wünsche', 'Ihre Ziele', 'Ihre Unternehmenswerte'], dna: true },
    { titel: 'Start', text: `Sie entscheiden in Ruhe. Nach Ihrer Freigabe setzen wir um, Ihre Lösung geht online, und wir betreuen sie weiter. ${MESSBAR}`, zeit: 'Nach Ihrer Freigabe' },
  ] as AblaufSchritt[],
};
