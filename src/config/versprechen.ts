// Unsere Service-Versprechen (SLAs) – bewusst in Alltagssprache statt Stunden-Kennzahlen
// (Wunsch Jamil 19.10.2026: „so formuliert, dass jeder User das versteht, egal aus welcher Branche“).
// ERSTER VORSCHLAG – Jamil passt die Formulierungen ggf. an.
// WICHTIG (UWG): Das sind EIGENE Zusagen, keine fremden Prüfzeichen – kein „Testsieger“, „zertifiziert von“ o. ä.
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
    title: 'Kleine Änderungen sind oft in Minuten online',
    zeilen: ['Änderungen', 'in Minuten'],
    short: 'Neuer Text, neues Bild, neue Öffnungszeiten.',
    long: 'Kleine Anpassungen wie ein neuer Text, ein Bild oder geänderte Öffnungszeiten sind oft schon nach wenigen Minuten online. Bei größeren Wünschen sagen wir Ihnen vorher, wann sie fertig sind.',
  },
  {
    id: 'antwort',
    icon: 'clock',
    title: 'Antwort spätestens am nächsten Werktag',
    zeilen: ['Schnelle', 'Antwort'],
    short: 'Spätestens am nächsten Werktag.',
    long: 'Auf jede Nachricht bekommen Sie spätestens am nächsten Werktag eine persönliche Antwort, meistens deutlich früher.',
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
    title: `${WAAS.laufzeitMonate} Monate Laufzeit`,
    zeilen: [`${WAAS.laufzeitMonate} Monate`, 'Laufzeit'],
    short: 'Klar und planbar.',
    long: `Der Vertrag läuft ${WAAS.laufzeitMonate} Monate. Das ist für Sie planbar, und wir haben genug Zeit, Ihre Website Schritt für Schritt zu verbessern.`,
  },
  {
    id: 'eigentum',
    icon: 'key',
    title: 'Website, Code & Domain gehören Ihnen',
    zeilen: ['Code & Domain', 'gehören Ihnen'],
    short: 'Ihr Eigentum, von Anfang an.',
    long: 'Die Domain läuft auf Ihren Namen. Website und Code gehören Ihrem Unternehmen.',
  },
  {
    id: 'transparenz',
    icon: 'eye',
    title: 'Keine versteckten Kosten',
    zeilen: ['Keine versteckten', 'Kosten'],
    short: 'Maximale Transparenz.',
    long: 'Was der Monatspreis abdeckt, steht im Vertrag. Extras berechnen wir nur, wenn Sie sie ausdrücklich und vorher schriftlich beauftragt haben.',
  },
  {
    id: 'lockin',
    icon: 'unlock',
    title: 'Kein künstlicher Lock-in',
    zeilen: ['Kein', 'Lock-in'],
    short: 'Sie behalten die Kontrolle.',
    long: 'Sie behalten die Kontrolle über Ihre Website und Ihre Daten. Wir wollen, dass Sie aus Zufriedenheit bleiben und nicht, weil Sie nicht wechseln können.',
  },
];

export const versprechenById = (id: string) => [...VERSPRECHEN, ...GESCHAEFTSMODELL].find((v) => v.id === id);
