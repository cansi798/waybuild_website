// Startseiten-Inhalte nach der Unternehmensvision (Jamil, 17.10.2026):
// Update 19.10.2026 (Jamil): kein durchgestrichener Hero, B2B-Struktur entlang der Customer Journey.
// Ausrichtung B2B: kleine und mittlere Unternehmen.
import type { IconName } from './site';

export const HERO = {
  eyebrow: 'Website as a Service für Unternehmen',
  /** Überschrift: positiv, Nutzen zuerst (Wunsch Jamil 19.10.2026: kein durchgestrichener Text) */
  vor: 'Ihre Website – professionell und ',
  akzent: 'komplett betreut.',
  claim: ['Menschliche Beratung.', 'KI-gestützte Umsetzung.', 'Kontinuierliche Verbesserung.'],
  unterzeile: 'Für kleine und mittlere Unternehmen: Änderungen per Sprachnachricht, Technik inklusive, ein fester Ansprechpartner.',
};

/** Schmerzpunkte bei der Website-Erstellung (Jamil, 19.10.2026) → unsere Antwort. */
export const SCHMERZPUNKTE: { icon: IconName; title: string; text: string }[] = [
  { icon: 'layout', title: 'Wie soll das aussehen?', text: 'Design, Aufbau, Farben – ohne Erfahrung weiß man nicht, wo man anfangen soll.' },
  { icon: 'spark', title: 'Keine Inspiration', text: 'Die Ideen fehlen, und die Seiten der anderen sehen alle gleich aus.' },
  { icon: 'pen', title: 'Texte ständig anpassen', text: 'Jede Änderung kostet Zeit, und am Ende bleibt die Website doch veraltet.' },
  { icon: 'eye', title: 'Screenshots und lange Erklärungen', text: 'Wer Änderungen beauftragt, macht Screenshots, schreibt E-Mails und wartet.' },
];

export const LOESUNG = {
  title: 'Bei uns: eine Sprachnachricht genügt.',
  text: 'Sagen Sie uns einfach, was sich ändern soll. Wir kümmern uns um Design, Inhalte und Technik – kleine Anpassungen sind oft in wenigen Minuten online.',
  punkte: ['Design und Ideen kommen von uns', 'Änderungen per Sprachnachricht', 'Kein Screenshot, kein Fachchinesisch'],
};

/** Zielgruppe (Vision: KMU). Link nur, wo es eine passende Branchenseite gibt. */
export const ZIELGRUPPEN: { icon: IconName; title: string; path?: string }[] = [
  { icon: 'tools', title: 'Handwerksbetriebe', path: '/website-fuer/handwerker/' },
  { icon: 'user', title: 'Dienstleister' },
  { icon: 'compass', title: 'Beratungsunternehmen' },
  { icon: 'cpu', title: 'IT-Unternehmen' },
  { icon: 'home', title: 'Immobilienunternehmen', path: '/website-fuer/immobilienmakler/' },
  { icon: 'pin', title: 'Lokale Betriebe', path: '/website-fuer/' },
];

/** „Die intelligente Website“ (Variante 2, Preis in PAKETE) – Datenquellen + Solarteur-Beispiel. */
export const VISION = {
  datenquellen: [
    'Besucherstatistiken', 'Kontaktanfragen', 'Suchbegriffe', 'Google Search Console',
    'Bewertungen', 'Referenzen', 'Conversion-Daten',
  ],
  /** Beispiel-Szenario aus der Vision (Solarteur, 6 Monate) – als Beispiel gekennzeichnet */
  erkennt: [
    { wert: 70, text: 'der Anfragen kommen über Photovoltaik' },
    { text: 'Gewerbekunden konvertieren besser als Privatkunden' },
    { text: 'Bestimmte Referenzen schaffen mehr Vertrauen' },
    { text: 'Ein Kalkulator erhöht die Anfragequote deutlich' },
  ] as { wert?: number; text: string }[],
  reagiert: ['Erfolgreiche Leistungen sichtbarer', 'Neue Landingpages', 'Referenzen automatisch hervorheben', 'Customer Journey optimieren'],
};

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
  text: 'Im kostenlosen Erstgespräch klären wir, wo Ihr Unternehmen digital steht – und was Ihre Website leisten soll.',
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
