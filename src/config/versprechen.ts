// Unser Geschäftsmodell als digitale „Siegel“ (Bauwelt-Muster, Inhalte laut Unternehmensvision 17.10.2026).
// WICHTIG (UWG): Das sind EIGENE Zusagen, keine fremden Prüfzeichen –
// kein „Testsieger“, „zertifiziert von“ o. ä.
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

export const versprechenById = (id: string) => VERSPRECHEN.find((v) => v.id === id);
