// Startseiten-Inhalte nach dem Bauwelt-Muster (Wunsch 11.10.2026), übertragen auf
// „Websites im Abo“ – Ausrichtung B2B: Unternehmen, Selbstständige, Institutionen.
import type { IconName } from './site';

export const HERO = {
  eyebrow: 'Website-Abo für Unternehmen',
  /** Headline: „Bereit für Ihre neue [rotierender Begriff]“ */
  vor: 'Bereit für Ihre neue',
  /** Rotierende Begriffe (erster = Fallback ohne Animation). */
  begriffe: ['Website?', 'Unternehmensseite?', 'Landingpage?', 'Online-Präsenz?'],
  statement: 'Ihre Website. Ein Unikat. Komplett betreut.',
  unterzeile:
    'Individuell entwickelt für Ihr Unternehmen. Hosting, Domain, E-Mail und Pflege inklusive – zum festen Monatspreis.',
  checks: ['Live in 14 Tagen', 'Fester Monatspreis', 'Ein Ansprechpartner'],
};

/** Zahlen-Band unter dem Hero – nur belegbare Zusagen, keine erfundenen Kundenzahlen. */
export const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 14, suffix: ' Tage', label: 'bis Ihre Website live ist' },
  { value: 90, suffix: '+', label: 'PageSpeed auf dem Smartphone' },
  { value: 12, suffix: ' Monate', label: 'Laufzeit statt 24' },
  { value: 1, suffix: ' Werktag', label: 'bis Sie Antwort haben' },
];

/** „Ein Ansprechpartner. Alles im Blick.“ – Betreuung statt Kundenportal-Demo. */
export const BETREUUNG = {
  sub:
    'Schluss mit Ticketsystemen, Agentur-Warteschleifen und der Frage, wer sich eigentlich kümmert. ' +
    'Bei uns haben Sie einen Ansprechpartner – und jederzeit den Überblick.',
  kacheln: [
    { icon: 'chat' as IconName, title: 'Änderungen per E-Mail', text: 'Kurze Nachricht genügt – wir setzen um, im Tarif inklusive.' },
    { icon: 'doc' as IconName, title: 'Rechnungen & Verträge', text: 'Eine Monatsrechnung, voll absetzbar. Keine Überraschungen.' },
    { icon: 'chart' as IconName, title: 'Zahlen im Blick', text: 'Besucher, Anfragen, Ladezeit – verständlich aufbereitet.' },
    { icon: 'refresh' as IconName, title: 'Immer aktuell', text: 'Updates, Backups und Sicherheit laufen im Hintergrund.' },
  ],
};

/** Tarif-Sektion („Transparente Preise statt Agentur-Angebote“). */
export const ANGEBOT = {
  sub:
    'Wir glauben, dass Website-Kosten planbar sein sollten. Deshalb gibt es bei uns drei klare Tarife ' +
    'mit festem Monatspreis – statt fünfstelliger Agentur-Angebote und versteckter Zusatzkosten.',
  punkte: ['Fester Monatspreis, netto', 'Alles inklusive: Hosting, Domain, E-Mail, Pflege', '12 Monate Laufzeit, danach monatlich kündbar', 'Als Betriebsausgabe voll absetzbar'],
};

/** Dunkler Footer-Kopf auf jeder Seite (Bauwelt-Muster). */
export const FOOTER_KONTAKT = {
  pre: 'So sollte eine Website ',
  accent: 'laufen.',
  sub: 'Planbar. Schnell. Betreut.',
  text:
    'Wir verbinden individuelle Entwicklung mit klaren Prozessen, persönlicher Betreuung und ' +
    'einem festen Monatspreis – damit Ihre Website arbeitet, während Sie Ihr Unternehmen führen.',
  kontaktHead: 'Sprechen Sie mit uns',
  kontaktText: 'Kurze Frage, konkretes Projekt oder erst einmal unverbindlich beraten lassen?',
};

/** Muster-Referenzen (Wunsch 11.10.2026: „Muster“) – klar als Beispiele gekennzeichnet,
 *  keine erfundenen Kundennamen oder Zitate. Werden ersetzt, sobald echte Projekte freigegeben sind. */
export const MUSTER: { branche: string; typ: string; farbe: string; hinweis: string }[] = [
  { branche: 'Handwerksbetrieb', typ: 'Business-Website', farbe: '#00a6a1', hinweis: 'Leistungen, Referenzen, Anfrage mit Foto-Upload' },
  { branche: 'Steuerkanzlei', typ: 'Business-Website', farbe: '#006b68', hinweis: 'Team, Leistungen, Mandanten-Login-Verlinkung' },
  { branche: 'Arztpraxis', typ: 'Business-Website', farbe: '#4fd1cb', hinweis: 'Sprechzeiten, Online-Termine, barrierearm' },
  { branche: 'B2B-Dienstleister', typ: 'Landingpage', farbe: '#545454', hinweis: 'Ein Angebot, ein Ziel: Anfragen' },
  { branche: 'Fachhandel', typ: 'Online-Shop', farbe: '#00a6a1', hinweis: 'Katalog, Warenkorb, Bezahlung' },
  { branche: 'Immobilienbüro', typ: 'Website-Relaunch', farbe: '#006b68', hinweis: 'Alte WordPress-Seite abgelöst, 3× schneller' },
];

/** Vorteile, die auf Unternehmen zielen (B2B-Ausrichtung). */
export const B2B_NUTZEN = [
  'Kundengewinnung: gefunden werden bei Google und KI-Suchen',
  'Verlässlichkeit: Antwort in einem Werktag, fester Ansprechpartner',
  'Planbarkeit: fester Monatspreis, als Betriebsausgabe absetzbar',
  'Entlastung: Technik, Hosting, E-Mail und Pflege übernehmen wir',
];
