// Eigene Versprechen (Bauwelt-Muster „Siegel“, Wunsch 11.10.2026).
// WICHTIG (UWG): Das sind EIGENE Zusagen, keine fremden Prüfzeichen –
// kein „Testsieger“, „zertifiziert von“ o. ä.
import type { IconName } from './site';

export type Versprechen = {
  id: string;
  icon: IconName;
  title: string;
  /** Zweizeilig für die gezeichnete Szene */
  zeilen: [string, string];
  short: string;
  long: string;
};

export const VERSPRECHEN: Versprechen[] = [
  {
    id: 'live14',
    icon: 'rocket',
    title: 'Live in 14 Tagen',
    zeilen: ['Live in', '14 Tagen'],
    short: 'Spätestens 14 Tage nach Ihren Inhalten ist Ihre Website online.',
    long: 'Sobald Ihre Texte, Bilder und Ihr Logo bei uns sind, ist Ihre Website in spätestens 14 Tagen online. Verzögert sich etwas aus Gründen, die wir zu vertreten haben, erfahren Sie es sofort – nicht erst, wenn der Termin verstrichen ist.',
  },
  {
    id: 'festpreis',
    icon: 'euro',
    title: 'Fester Monatspreis',
    zeilen: ['Fester', 'Monatspreis'],
    short: 'Der Preis im Tarif ist der Preis auf der Rechnung.',
    long: 'Design, Hosting, Domain, E-Mail, Updates und Änderungen sind im Monatspreis enthalten. Es gibt keine versteckten Zusatzkosten – nur wenn Sie ausdrücklich Extras beauftragen, ändert sich der Preis, vorher schriftlich.',
  },
  {
    id: 'ansprechpartner',
    icon: 'user',
    title: 'Ein Ansprechpartner',
    zeilen: ['Ein An-', 'sprechpartner'],
    short: 'Eine Adresse für alles – vom Erstgespräch bis zur Pflege.',
    long: 'Sie haben einen persönlichen Ansprechpartner, der Ihr Projekt vom ersten Gespräch bis in die laufende Betreuung begleitet. Auf neue Anfragen antworten wir innerhalb eines Werktags; im laufenden Abo gelten feste Antwortzeiten je Tarif – 48, 24 oder 4 Stunden.',
  },
  {
    id: 'speed',
    icon: 'gauge',
    title: 'PageSpeed 90+',
    zeilen: ['PageSpeed', '90+'],
    short: 'Schnell auf jedem Smartphone – messbar mit Googles Test.',
    long: 'Jede Website, die wir ausliefern, erreicht bei Google PageSpeed Insights mindestens 90 Punkte auf dem Smartphone. Schnelle Seiten ranken besser und verlieren weniger Besucher.',
  },
  {
    id: 'hosting',
    icon: 'server',
    title: 'Hosting in Deutschland',
    zeilen: ['Hosting in', 'Deutschland'],
    short: 'Server in Deutschland, SSL, tägliche Backups.',
    long: 'Ihre Website und Ihre E-Mails liegen auf Servern in Deutschland – DSGVO-konform, mit SSL-Verschlüsselung, täglichen Backups und Überwachung rund um die Uhr.',
  },
  {
    id: 'code',
    icon: 'key',
    title: 'Ihr Code gehört Ihnen',
    zeilen: ['Ihr Code', 'gehört Ihnen'],
    short: 'Keine Abhängigkeit: Übernahme nach der Laufzeit möglich.',
    long: 'Ihre Domain gehört Ihnen von Anfang an. Nach der Mindestlaufzeit können Sie Ihre Website auf Wunsch komplett übernehmen – inklusive Quellcode. Wir überzeugen mit Leistung, nicht mit Verträgen.',
  },
];

export const versprechenById = (id: string) => VERSPRECHEN.find((v) => v.id === id);
