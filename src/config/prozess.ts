// „So arbeiten wir“ auf der Startseite (Jamil, Talk 4487/4488, 03.11.2026): die Linien-Story der waybuild Hauptseite
// (Impuls → Verstehen → Hinterfragen → Entscheiden → Umsetzen → Verbessern) – verdichtet auf ZWEI Abschnitte statt sechs.
// Kernsätze je Schritt wörtlich aus der Hauptseite (src/config/denkweise.ts dort), lange Absätze gekürzt.
// Ersetzt den früheren Abschnitt „In vier Schritten zur neuen Website“ (Ablauf.astro); dessen Schritte
// (Erstgespräch, Beratung, KI-Umsetzung, Live & betreut) stecken jetzt in den Einleitungen der beiden Abschnitte.
// Szenen-Daten (Lagen in viewBox-Einheiten) unverändert aus der Hauptseite, damit Bild und Bewegung gleich bleiben.
import type { IconName } from './site';

/** Die zwei Abschnitte */
export const PROZESS_TEILE = [
  {
    id: 'ablauf', // alter Anker bleibt gültig
    eyebrow: 'So arbeiten wir',
    titelVor: 'Verstehen & ',
    titelAkzent: 'Hinterfragen',
    lead: 'Im kostenlosen Erstgespräch und in der Beratung lernen wir Ihr Unternehmen kennen. Erst wenn klar ist, was Ihre Website leisten soll, geht es ans Bauen.',
  },
  {
    id: 'umsetzung',
    eyebrow: 'So arbeiten wir',
    titelVor: 'Entscheiden, Umsetzen & ',
    titelAkzent: 'Verbessern',
    lead: 'Aus den Erkenntnissen wird ein klarer Plan und dann Ihre Website. Nach dem Start betreuen wir sie und entwickeln sie laufend weiter.',
  },
];

export const DW_IDEE = {
  zeilen: ['Eine Idee.', 'Ein Wunsch.', 'Ein Problem.'],
  gefuehl: 'Oder einfach das Gefühl:',
  zitat: 'Das müsste doch einfacher gehen.',
  schluss: 'Genau dort beginnen die meisten Veränderungen.',
  /** Szene (wie Hauptseite): drei Gruppen à zwei Karten über dem Knoten; Bildfläche 440 × 420, Knoten bei 220/336 */
  gruppen: [
    { label: 'Ideen', icon: 'idee', y: 26, karten: [{ text: 'Neue Website', x: 112, y: 68 }, { text: 'Kundenportal', x: 328, y: 68 }] },
    { label: 'Wünsche', icon: 'stern', y: 122, karten: [{ text: 'Mehr Anfragen', x: 112, y: 166 }, { text: 'Digitale Zusammenarbeit', x: 328, y: 166 }] },
    { label: 'Probleme', icon: 'warnung', y: 220, karten: [{ text: 'Zu viel Aufwand', x: 112, y: 262 }, { text: 'Veraltete Software', x: 328, y: 262 }] },
  ] as { label: string; icon: 'idee' | 'stern' | 'warnung'; y: number; karten: { text: string; x: number; y: number }[] }[],
};

export const DW_VERSTEHEN = {
  titel: 'Gute Lösungen beginnen mit Verständnis.',
  unterzeile: 'Wir verstehen, bevor wir umsetzen.',
  text: 'Wir sehen uns Menschen, Arbeitsweisen, Ziele, Kommunikation und digitale Werkzeuge an. Daraus entsteht ein klares Bild Ihres Unternehmens: Ihre Unternehmens-DNA. Auf ihr bauen unsere Empfehlungen auf.',
  /** Szene: Begriffe fließen in die Lupe, daraus entsteht die DNA; Bildfläche 440 × 440, Lupe bei 220/112 */
  begriffe: [
    { text: 'Menschen', icon: 'users', x: 92, y: 40 },
    { text: 'Arbeitsweisen', icon: 'ablauf', x: 348, y: 40 },
    { text: 'Ziele', icon: 'target', x: 352, y: 126 },
    { text: 'Kommunikation', icon: 'chat', x: 88, y: 126 },
    { text: 'Digitale\nWerkzeuge', icon: 'tools', x: 92, y: 210 },
  ] as { text: string; icon: IconName; x: number; y: number }[],
  dnaLabel: 'Ihre Unternehmens-DNA',
  mitte: 'Verständnis',
};

export const DW_HINTERFRAGEN = {
  titel: 'Erst das Warum, dann das Wie.',
  zeilen: ['Nicht jede Website muss neu gebaut werden.', 'Manchmal liegt die eigentliche Verbesserung ganz woanders.'],
  botschaft: ['Der erste Impuls ist oft erst der Anfang.'],
  dialog: [
    { wer: 'kunde', text: 'Wir wollen mehr Anfragen.' },
    { wer: 'waybuild', text: 'Was hält Interessenten heute davon ab, sich zu melden?' },
    { wer: 'kunde', text: 'Viele verstehen nicht genau, was wir anbieten. Und die Anfrage ist umständlich.' },
    { wer: 'waybuild', text: 'Dann setzen wir genau dort an.' },
  ] as { wer: 'kunde' | 'waybuild'; text: string }[],
  nachsatz: ['Manchmal reicht eine Anpassung.', 'Manchmal entsteht etwas komplett Neues.'],
};

export const DW_ENTSCHEIDEN = {
  titel: 'Wir empfehlen, bevor wir umsetzen.',
  text: 'Meist gibt es mehrere sinnvolle Wege. Wir legen sie nebeneinander, wägen Nutzen und Aufwand ab und schlagen eine klare Reihenfolge vor.',
  ziel: 'Sie entscheiden, und alle wissen, warum.',
  nutzen: 'Nutzen',
  aufwand: 'Aufwand',
  optionen: [
    { text: 'Positionierung', nutzen: 0.8, aufwand: 0.8, rang: 3 },
    { text: 'Anfrageprozess', nutzen: 0.9, aufwand: 0.35, rang: 1 },
    { text: 'Inhalte', nutzen: 0.7, aufwand: 0.45, rang: 2 },
  ],
  ergebnis: 'Zuerst',
};

export const DW_UMSETZEN = {
  titel: 'Aus Erkenntnissen entstehen Lösungen.',
  text: 'Positionierung, Inhalte und Anfrageprozess landen bei den meisten Unternehmen auf der Website. Deshalb fangen wir dort an. Unsere KI beschleunigt die Umsetzung, Sie prüfen den Entwurf und geben frei.',
  /** Beschriftung des Ergebnisses in der Szene (Hauptseite: „Lösung“) */
  ergebnis: 'Ihre Website',
};

export const DW_VERBESSERN = {
  titel: 'Gute Veränderungen entwickeln sich weiter.',
  unterzeile: 'Feedback sammeln, auswerten, planen, verbessern. Und dann wieder von vorn.',
  text: 'Auch nach dem Start bleibt Ihre Website nicht stehen. Wir prüfen, was sie bewirkt, und verbessern sie Schritt für Schritt.',
  kreis: ['Feedback', 'Analysieren', 'Planen', 'Verbessern'],
};

export const PROZESS_CTA = 'Mit Schritt 1 starten: Erstgespräch';
