// Animiertes Beispiel „So kann es laufen“ (Jamil, Talk qh87y3sj #5678/#5680, 13.11.2026). Drehbuch von Jamil freigegeben:
// erfundener Betrieb „Malerbetrieb Muster“ (Musterstadt), Kundin Frau Weber, 13 Szenen + Schluss. Titel und Texte WÖRTLICH aus
// dem Drehbuch – nur nach Rücksprache ändern. Seite: src/pages/so-kann-es-laufen.astro, Bühne: components/beispiel/,
// Bewegung: src/scripts/beispiel.ts, Stil: src/styles/beispiel.css. Bau-Anleitung für die Szenen: docs/beispiel-szenen-anleitung.md.
// Rechtliches (Drehbuch): alles erfunden/beispielhaft, keine echten Firmennamen/Logos (kein Google-Logo, „Suche“ neutral),
// Preise als Beispiel, KI-Angebot ausdrücklich „Vorschlag, wird geprüft“, überall klein „Beispielhafte Darstellung“.

export interface BeispielSzene {
  /** 1 … 13, gleich der Komponente src/components/beispiel/szenen/SzeneNN.astro */
  nr: number;
  /** Überschrift der Szene (h2) */
  titel: string;
  /** kurzer Text unter dem Mockup – der eigentliche, lesbare Inhalt (Mockups sind aria-hidden) */
  text: string;
  /** was man sieht (Drehbuch), nur als Notiz für den Bau der Szene, wird nicht angezeigt */
  bild: string;
  /** Vorlage für den personalisierten Film ({schlüssel} aus components/beispiel/branchen.ts → werte()); fehlt sie, bleibt text */
  vorlage?: string;
  /** kleine Einblendung „Baustein: …“ (weitere Möglichkeiten, Jamil #5709–#5715) */
  baustein?: string;
}

export const BEISPIEL_ETIKETT = 'Beispielhafte Darstellung';

export const BEISPIEL_SEITE = {
  titel: 'So kann es laufen: ein Beispiel',
  description: 'Ein Beispiel in 13 Szenen: Wie ein Malerbetrieb mit Website, Kundenportal und eigener Software vom ersten Suchtreffer bis zur Weiterempfehlung arbeitet.',
  kennzeile: 'Beispiel',
  h1: 'So kann es laufen.',
  intro: 'Vom ersten Google-Treffer bis zur Weiterempfehlung: Erleben Sie in einer kurzen Geschichte, wie ein Malerbetrieb mit waybuild arbeitet.',
  /** Name der Geschichte für Screenreader (Liste der Szenen) */
  geschichte: 'Die Geschichte von Frau Weber und dem Malerbetrieb Muster in 13 Szenen',
};

export const BEISPIEL_SZENEN: BeispielSzene[] = [
  { nr: 1, titel: 'Gefunden',
    text: 'Frau Weber sucht einen Maler. Der Malerbetrieb Muster steht ganz oben.',
    vorlage: 'Frau Weber sucht {sucht}. {firmaSatz} steht ganz oben.', baustein: 'Gefunden werden',
    bild: 'Handy: Suche „Maler in der Nähe“, Treffer „Malerbetrieb Muster“ oben mit ★ 4,9 und „Heute geöffnet“' },
  { nr: 2, titel: 'Überzeugt',
    text: 'Sie sieht echte Arbeiten, ehrliche Bewertungen und klare Preise.', baustein: 'Bewertungen',
    bild: 'Handy: Website mit Fotos echter Arbeiten, Bewertungen, klaren Preisen, Scroll-Bewegung' },
  { nr: 3, titel: 'Preis gerechnet',
    text: 'Im Preisrechner weiß sie in Sekunden, womit sie rechnen kann.', baustein: 'Preisrechner',
    bild: 'Handy: Preisrechner „Wohnzimmer · 25 m² · Wände und Decke“ → „ca. 1.200–1.500 €“' },
  { nr: 4, titel: 'Termin gebucht',
    text: 'Ein Klick, und der Besichtigungstermin steht.',
    vorlage: 'Ein Klick, und {terminImSatz} steht.', baustein: 'Terminbuchung',
    bild: 'Handy: „Besichtigung buchen“, Kalender, Donnerstag 10:00 ✓' },
  { nr: 5, titel: 'Der Betrieb weiß Bescheid',
    text: 'Der Betrieb wird sofort benachrichtigt, und Frau Weber steht schon in der eigenen Software.', baustein: 'WhatsApp-Anbindung',
    bild: 'Handy des Malermeisters vibriert „Neuer Besichtigungstermin“ + parallel Laptop/Software: neue Interessentin „Frau Weber“ erscheint in der Liste' },
  { nr: 6, titel: 'Vor Ort',
    text: 'Beim Termin wird alles direkt auf dem Tablet erfasst und abgeschickt.', baustein: 'Eigene Formulare',
    bild: 'Tablet: individuelles Formular (Flächen, Farbe, Fotos), Unterschrift von Frau Weber, „Abschicken“' },
  { nr: 7, titel: 'Die KI rechnet',
    text: 'Im Hintergrund erstellt eine KI einen Angebotsvorschlag.', baustein: 'KI-Angebote',
    bild: 'Laptop/Bildschirm: Formular → Angebotsvorschlag mit Positionen und Preis entsteht (Positionen erscheinen nacheinander, kleines KI-Symbol); ausdrücklich „Vorschlag, wird geprüft“' },
  { nr: 8, titel: 'Geprüft und verschickt',
    text: 'Der Meister prüft den Vorschlag und verschickt das Angebot, noch auf dem Rückweg.',
    vorlage: '{chef} prüft den Vorschlag und verschickt das Angebot, noch auf dem Rückweg.', baustein: 'Angebote per App',
    bild: 'Handy im Auto (Lenkrad angedeutet), „10 Minuten später“: Vorschlag prüfen, eine Zeile anpassen, Knopf „Angebot versenden“' },
  { nr: 9, titel: 'Begeistert',
    text: 'Frau Weber hat das Angebot schon im Postfach, mit Zugang zu ihrem Kundenportal.', baustein: 'Automatische Mails',
    bild: 'Handy von Frau Weber: neue Mail „Ihr Angebot vom Malerbetrieb Muster“ mit Knopf „Zum Kundenportal“, Sprechblase „So schnell?“' },
  { nr: 10, titel: 'Alles im Blick',
    text: 'Im Portal sieht sie jeden Schritt und nimmt das Angebot mit einem Klick an.', baustein: 'Kundenportal',
    bild: 'Kundenportal (Handy oder Laptop): nächste Schritte als Liste, Termin, Status; Knopf „Angebot annehmen“ → ✓ angenommen' },
  { nr: 11, titel: 'Die Arbeit läuft',
    text: 'Am Ausführungstag zeigt das Portal den Stand, mit Fotos vom Fortschritt.', baustein: 'Fotos vom Fortschritt',
    bild: 'Portal-Status „In Arbeit“, abends Fotos vom Fortschritt' },
  { nr: 12, titel: 'Fertig',
    text: 'Abnahme per Klick, die Rechnung kommt automatisch und ist direkt bezahlt.', baustein: 'Rechnungen und Online-Zahlung',
    bild: 'Portal: „Abnahme bestätigen“ ✓, Rechnung kommt automatisch, „Online bezahlen“ ✓' },
  { nr: 13, titel: 'Begeistert erzählt',
    text: 'Aus einer zufriedenen Kundin wird die nächste Empfehlung. Der Kreis beginnt von vorn.', baustein: 'Bewertungen sammeln',
    bild: 'Mail „Wie zufrieden waren Sie?“ → ★★★★★; dann Nachbarin sucht „Maler in der Nähe“ → Szene 1 schimmert wieder auf (Kreis)' },
];

/** Schluss nach Szene 13 (Drehbuch): Satz + Knopf „Jetzt starten“ (gleiches Ziel wie die anderen Erstberatungs-Knöpfe).
 *  Film (Jamil #5709–#5715): zusätzlich „Nochmal ansehen“ und „Andere Branche wählen“; mit eigenem Firmennamen titelFirma. */
export const BEISPIEL_SCHLUSS = {
  titel: 'So kann es bei Ihnen laufen.',
  titelFirma: 'So kann es bei {firma} laufen.',
  unter: 'Wir bauen es für Sie.',
  knopf: 'Jetzt starten',
  nochmal: 'Nochmal ansehen',
  andere: 'Andere Branche wählen',
};

/** Film-Start (Personalisierung, Jamil #5709–#5715 + Änderung 08:57): Branche wählen, optional Firmenname. Nichts wird gesendet. */
export const BEISPIEL_START = {
  kennzeile: 'Ihr Film',
  titel: 'Wie sähe das bei Ihnen aus?',
  text: 'Wählen Sie Ihre Branche und tippen Sie auf Wunsch Ihren Firmennamen ein. Der Film läuft dann mit Ihrem Betrieb.',
  legende: 'Ihre Branche',
  feld: 'Ihr Firmenname (freiwillig)',
  platzhalter: 'z. B. Muster GmbH',
  knopf: 'Film starten',
  auto: 'Startet gleich mit dem Beispiel Malerbetrieb',
  hinweis: 'Ihre Eingabe bleibt in Ihrem Browser und wird nicht gesendet.',
};

/** Branchen-Wechsel nach Szene 13 (nur ohne eigene Auswahl): „man kann wirklich alles machen“ */
export const BEISPIEL_BRANCHEN = {
  titel: 'Und in Ihrer Branche?',
  text: 'Ob Maler, Elektriker, Fotograf, Fahrschule oder Coach: Wir bauen genau die Bausteine, die Ihr Betrieb braucht.',
  oder: '… oder bei Ihnen?',
  wechsel: ['Malerbetrieb Muster', 'Elektro Muster', 'Fotostudio Muster', 'Fahrschule Muster', 'Coaching Muster'],
  bausteine: ['Terminbuchung', 'Preisrechner', 'Kundenportal', 'Bewertungen', 'WhatsApp-Anbindung', 'Rechnungen', 'KI-Angebote', 'Online-Zahlung'],
  knopf: 'Mit meiner Branche ansehen',
};

/** Steuerleiste des Films (WCAG 2.2.2: Pause beschriftet) */
export const BEISPIEL_STEUERUNG = {
  pause: 'Pause', weiter: 'Abspielen', zurueck: 'Vorherige Szene', vor: 'Nächste Szene', szenen: 'Szenen', zuSzene: 'Zu Szene',
  branche: 'Branche ändern', hilfe: 'Leertaste: Pause oder Abspielen. Pfeiltasten: Szene wechseln.',
};

/** Teaser auf der Startseite direkt nach #entspannt (Drehbuch) */
export const BEISPIEL_TEASER = {
  id: 'beispiel',
  kennzeile: 'Beispiel',
  titel: 'So kann es bei Ihnen laufen.',
  text: 'Vom ersten Google-Treffer bis zur Weiterempfehlung: Erleben Sie in einer kurzen Geschichte, wie ein Malerbetrieb mit waybuild arbeitet.',
  knopf: 'Beispiel ansehen',
  /** Szenen, die im Teaser als kleines, ruhendes Mini-Mockup (Endzustand) erscheinen */
  vorschau: [1, 10],
};

/** Name im Footer-Link */
export const BEISPIEL_LINK = 'So kann es laufen';
