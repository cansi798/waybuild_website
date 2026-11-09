// Unsere Service-Versprechen (SLAs) – bewusst in Alltagssprache statt Stunden-Kennzahlen
// (Wunsch Jamil 19.10.2026: „so formuliert, dass jeder User das versteht, egal aus welcher Branche“).
// ERSTER VORSCHLAG – Jamil passt die Formulierungen ggf. an.
// WICHTIG (UWG): Das sind EIGENE Zusagen, keine fremden Prüfzeichen – kein „Testsieger“, „zertifiziert von“ o. ä.
// UWG (Jamil, Talk qh87y3sj #5204/#5215, 09.11.2026): keine absoluten Zeitzusagen, Zeiten immer mit „in der Regel“;
// „kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr)“ wie in der Zeitleiste (variante.ts).
import { WAAS, type IconName } from './site';
export type Versprechen = {
  id: string;
  icon: IconName;
  title: string;
  /** Zweizeilig für die animierte Szene */
  zeilen: [string, string];
  short: string;
  long: string;
};

export const VERSPRECHEN: Versprechen[] = [
  {
    id: 'ansprechpartner',
    icon: 'user',
    title: 'Sie erreichen immer einen Menschen',
    zeilen: ['Immer ein', 'Mensch'],
    short: 'Ein fester Ansprechpartner.',
    long: 'Sie haben einen festen Ansprechpartner, der Ihr Unternehmen kennt. Sie landen weder in einem Callcenter noch in einem Ticketsystem.',
  },
  {
    id: 'sprache',
    icon: 'mic',
    title: 'Eine Sprachnachricht genügt',
    zeilen: ['Sprachnachricht', 'genügt'],
    short: 'Ohne Formular und Screenshots.',
    long: 'Sagen Sie uns per Sprachnachricht, E-Mail oder Telefon, was sich ändern soll. Screenshots und Fachbegriffe brauchen Sie dafür nicht.',
  },
  {
    id: 'minuten',
    icon: 'zap',
    title: 'Kleine Änderungen in der Regel in 1 Stunde',
    zeilen: ['Änderungen', 'meist in 1 Std.'],
    short: 'Werktags 9 bis 17 Uhr.',
    long: 'Kleine Änderungen wie ein neuer Text, ein Bild oder geänderte Öffnungszeiten sind in der Regel innerhalb von 1 Stunde online (werktags 9 bis 17 Uhr). Bei größeren Wünschen sagen wir Ihnen vorher, wann sie fertig sind.',
  },
  {
    id: 'antwort',
    icon: 'clock',
    title: 'Antwort in der Regel am nächsten Werktag',
    zeilen: ['Schnelle', 'Antwort'],
    short: 'In der Regel am nächsten Werktag.',
    long: 'Auf jede Nachricht bekommen Sie in der Regel am nächsten Werktag eine persönliche Antwort, oft schon früher.',
  },
  {
    id: 'technik',
    icon: 'shield',
    title: 'Wir sorgen dafür, dass Ihre Website läuft',
    zeilen: ['Technik', 'läuft'],
    short: 'Wartung, Updates, Backups.',
    long: 'Hosting, Sicherheitsupdates, SSL und Backups erledigen wir im Hintergrund. Sie müssen sich um nichts Technisches kümmern.',
  },
  {
    id: 'transparenz',
    icon: 'eye',
    title: 'Keine Überraschungen auf der Rechnung',
    zeilen: ['Keine', 'Überraschungen'],
    short: 'Fester Monatspreis.',
    long: 'Sie zahlen Ihren festen Monatspreis. Extras berechnen wir nur, wenn Sie sie ausdrücklich und vorher schriftlich beauftragt haben.',
  },
];

/** Geschäftsmodell-Zusagen (Vision 17.10.2026) – für Leistungsseiten und Preisseite. */
export const GESCHAEFTSMODELL: Versprechen[] = [
  {
    id: 'einrichtung',
    icon: 'euro',
    title: 'Keine Einrichtungskosten',
    zeilen: ['Keine Einrich-', 'tungskosten'],
    short: 'Keine Einmalinvestition, kein Projektbudget.',
    long: 'Für die Einrichtung zahlen Sie nichts, und eine hohe Einmalinvestition gibt es auch nicht. Sie zahlen nur den festen Monatspreis.',
  },
  {
    id: 'festpreis',
    icon: 'euro',
    title: 'Fester Monatspreis',
    zeilen: ['Fester', 'Monatspreis'],
    short: 'Ein Preis für alles.',
    long: 'Website, Hosting, Domain, SSL, Wartung, Backups und Betreuung stecken in einem Preis. Der Preis im Vertrag ist der Preis auf der Rechnung.',
  },
  {
    id: 'laufzeit',
    icon: 'calendar',
    title: `${WAAS.laufzeitMonate} Monate Mindestlaufzeit`,
    zeilen: [`${WAAS.laufzeitMonate} Monate`, 'Laufzeit'],
    short: 'Klar und planbar.',
    long: `Die Mindestlaufzeit beträgt ${WAAS.laufzeitMonate} Monate, danach ist das Abo monatlich kündbar. Das ist für Sie planbar, und wir haben genug Zeit, Ihre Website Schritt für Schritt zu verbessern.`,
  },
  {
    id: 'seiten',
    icon: 'layers',
    title: 'Keine Seitenbegrenzung',
    zeilen: ['Keine Seiten-', 'begrenzung'],
    short: 'So viele Seiten, wie Sie brauchen.',
    long: 'Ihre Website wächst mit Ihrem Unternehmen. In keinem Paket zählen wir Seiten, und eine neue Seite kostet keinen Aufpreis.',
  },
  {
    id: 'transparenz',
    icon: 'eye',
    title: 'Keine versteckten Kosten',
    zeilen: ['Keine versteckten', 'Kosten'],
    short: 'Maximale Transparenz.',
    long: 'Was der Monatspreis abdeckt, steht im Vertrag. Extras berechnen wir nur, wenn Sie sie ausdrücklich und vorher schriftlich beauftragt haben.',
  },
];

export const versprechenById = (id: string) => [...VERSPRECHEN, ...GESCHAEFTSMODELL].find((v) => v.id === id);
