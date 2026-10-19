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
    long: 'Kein Callcenter, kein Ticket-Labyrinth: Sie haben einen festen Ansprechpartner, der Ihr Unternehmen kennt.',
  },
  {
    id: 'sprache',
    icon: 'mic',
    title: 'Eine Sprachnachricht genügt',
    zeilen: ['Sprachnachricht', 'genügt'],
    short: 'Kein Formular, keine Screenshots.',
    long: 'Sagen Sie uns einfach, was sich ändern soll – per Sprachnachricht, E-Mail oder Telefon. Screenshots und Fachbegriffe brauchen Sie nicht.',
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
    long: 'Auf jede Nachricht bekommen Sie spätestens am nächsten Werktag eine persönliche Antwort – meist deutlich schneller.',
  },
  {
    id: 'technik',
    icon: 'shield',
    title: 'Ihre Website läuft – wir kümmern uns',
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
    long: 'Sie zahlen Ihren festen Monatspreis. Extras gibt es nur, wenn Sie sie ausdrücklich beauftragen – vorher schriftlich.',
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
    long: 'Sie zahlen keine Einrichtung und keine hohe Einmalinvestition – nur den festen Monatspreis.',
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
    long: `Eine klare Laufzeit von ${WAAS.laufzeitMonate} Monaten – planbar für Sie und genug Zeit, Ihre Website kontinuierlich zu verbessern.`,
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
    long: 'Was der Monatspreis abdeckt, steht im Vertrag. Extras gibt es nur, wenn Sie sie ausdrücklich beauftragen – vorher schriftlich.',
  },
  {
    id: 'lockin',
    icon: 'unlock',
    title: 'Kein künstlicher Lock-in',
    zeilen: ['Kein', 'Lock-in'],
    short: 'Vertrauen statt Abhängigkeit.',
    long: 'Wir möchten langfristiges Vertrauen aufbauen – keine künstliche Abhängigkeit. Sie behalten die Kontrolle über Ihre Website und Ihre Daten.',
  },
];

export const versprechenById = (id: string) => [...VERSPRECHEN, ...GESCHAEFTSMODELL].find((v) => v.id === id);
