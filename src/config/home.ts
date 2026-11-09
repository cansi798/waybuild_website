// Startseiten-Inhalte nach der Unternehmensvision (Jamil, 17.10.2026):
// Update 19.10.2026 (Jamil): kein durchgestrichener Hero, B2B-Struktur entlang der Customer Journey.
// Ausrichtung B2B: kleine und mittlere Unternehmen.
import type { IconName } from './site';

/** Zielgruppe (Vision: KMU), für llms.txt. Branchenseiten-Links entfernt (Branchenseiten gelöscht, Jamil, Talk qh87y3sj #5322). */
export const ZIELGRUPPEN: { icon: IconName; title: string }[] = [
  { icon: 'tools', title: 'Handwerksbetriebe' },
  { icon: 'user', title: 'Dienstleister' },
  { icon: 'compass', title: 'Beratungsunternehmen' },
  { icon: 'cpu', title: 'IT-Unternehmen' },
  { icon: 'home', title: 'Immobilienunternehmen' },
  { icon: 'pin', title: 'Lokale Betriebe' },
];

/** „Die Website ist nur der erste Schritt“ – Bausteine des digitalen Betriebssystems für KMU. */
export const PLATTFORM: { icon: IconName; title: string; heute?: boolean }[] = [
  { icon: 'layout', title: 'Website', heute: true },
  { icon: 'server', title: 'Hosting', heute: true },
  { icon: 'portal', title: 'Kundenportal' },
  { icon: 'users', title: 'CRM' },
  { icon: 'folder', title: 'Dokumenten\u00admanagement' },
  { icon: 'cloud', title: 'Nextcloud White Label' },
  { icon: 'ticket', title: 'Ticketing' },
  { icon: 'zap', title: 'Automati\u00adsierungen' },
  { icon: 'bot', title: 'KI-Agenten' },
  { icon: 'code', title: 'Individual\u00adsoftware' },
  { icon: 'book', title: 'Wissens\u00addatenbanken' },
];

/** Dunkler Footer-Kopf auf jeder Seite = Abschluss-CTA. */
export const FOOTER_KONTAKT = {
  pre: 'Bereit für den ',
  accent: 'ersten Schritt?',
  sub: 'Menschliche Beratung. KI-gestützte Umsetzung. Kontinuierliche Verbesserung.',
  text: 'Im kostenlosen Erstgespräch klären wir, wo Ihr Unternehmen digital steht und was Ihre Website leisten soll.',
  kontaktHead: 'Sprechen Sie mit uns',
  kontaktText: 'Kurze Frage, konkretes Vorhaben oder erst einmal unverbindlich beraten lassen?',
};

/** Muster-Referenzen (Wunsch 11.10.2026: „Muster“) – klar als Beispiele gekennzeichnet,
 *  keine erfundenen Kundennamen oder Zitate. Werden ersetzt, sobald echte Projekte freigegeben sind. */
export const MUSTER: { branche: string; typ: string; farbe: string; hinweis: string }[] = [
  { branche: 'Handwerksbetrieb', typ: 'Business-Website', farbe: '#00a6a1', hinweis: 'Leistungen, Referenzen, Anfrage mit Foto-Upload' },
  { branche: 'Steuerkanzlei', typ: 'Business-Website', farbe: '#006b68', hinweis: 'Team, Leistungen, Mandanten-Login-Verlinkung' },
  { branche: 'Arztpraxis', typ: 'Business-Website', farbe: '#4fd1cb', hinweis: 'Sprechzeiten, Online-Termine, barrierearm' },
  { branche: 'B2B-Dienstleister', typ: 'Landingpage', farbe: '#545454', hinweis: 'Ein Angebot, ein Ziel: Anfragen' },
  { branche: 'Fachhandel', typ: 'Online-Shop', farbe: '#00a6a1', hinweis: 'Katalog, Warenkorb, Bezahlung' },
  { branche: 'Immobilienbüro', typ: 'Website-Relaunch', farbe: '#006b68', hinweis: 'Alte WordPress-Seite abgelöst, schneller und sicherer' },
];
