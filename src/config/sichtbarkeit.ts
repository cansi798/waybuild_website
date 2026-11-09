// „Was wir für Ihre Sichtbarkeit tun.“ (Jamil, Talk qh87y3sj #5363, 10.11.2026: „wir müssen mehr zeigen, wie wir arbeiten,
// dass wir analysieren, Google-Optimierung, KI-Optimierung machen“). Drei Felder mit gezeichneten Beispiel-Ansichten (nur HTML/CSS/SVG,
// keine echten Kundendaten, keine Zahlen, keine Logos oder Markennamen von Suchmaschinen oder KI-Anbietern in den Ansichten).
// Komponenten: src/components/sichtbarkeit/ (Sichtbarkeit.astro = Abschnitt, SichtPanel.astro = ein Feld), Stil src/styles/sichtbarkeit.css,
// Einblenden src/scripts/sichtbarkeit.ts. Startseite: alle drei nach „So gehen wir vor“; Leistungsseiten: passende Felder (LEISTUNG_PANELS).
// Texte vorsichtig formuliert: keine Platzierungsversprechen, kein „garantiert“, kein „immer“, kein „Platz 1“. Nie „aus einer Hand“.

export type PanelArt = 'analyse' | 'google' | 'ki';

export interface Panel {
  art: PanelArt;
  titel: string;
  text: string;
  /** kleines Etikett: in welchem Paket (wie in src/content/leistungen/*.md) */
  paket: string;
  /** Beschreibung der Beispiel-Ansicht für Screenreader */
  bild: string;
  link: { href: string; text: string };
}

export const SICHTBARKEIT = {
  eyebrow: 'Sichtbarkeit',
  titel: 'Was wir für Ihre Sichtbarkeit tun.',
  intro: 'Eine Website allein reicht selten. Wir schauen genau hin, was funktioniert, und arbeiten laufend daran, dass Google und KI-Assistenten Ihr Angebot gut verstehen.',
  etikett: 'Beispielhafte Darstellung',
  /** Leistungsseiten */
  leistungTitel: 'Ein Blick in unsere Arbeit',
  leistungIntro: 'So sieht das in der Praxis aus. Die Ansichten sind Beispiele, keine echten Kundendaten.',
};

export const PANELS: Record<PanelArt, Panel> = {
  analyse: {
    art: 'analyse',
    titel: 'Wir analysieren.',
    text: 'Wir werten jeden Monat aus, wie Ihre Website genutzt wird und welche Seiten zu Anfragen führen. So sehen wir, was funktioniert und wo wir nachbessern sollten.',
    paket: 'Monatsbericht ab Paket Plus',
    bild: 'Beispielhafte Darstellung eines Monatsberichts mit Verläufen für Besucher und Anfragen und einer Anzeige der Ladezeit, ohne echte Zahlen.',
    link: { href: '/leistungen/auswertung/', text: 'Mehr zur Auswertung' },
  },
  google: {
    art: 'google',
    titel: 'Wir optimieren für Google.',
    text: 'Wir pflegen Ihr Google-Profil, achten auf saubere Technik und klare Inhalte, damit Sie bei Suchen in Ihrer Region besser gefunden werden können.',
    paket: 'Grundlagen in Basis, erweitert ab Plus',
    bild: 'Beispielhafte Darstellung einer lokalen Suche: Kartenausschnitt mit Markierung und Eintrag des erfundenen Beispielbetriebs „Muster Malerbetrieb“.',
    link: { href: '/leistungen/google-profil/', text: 'Mehr zum Google-Profil' },
  },
  ki: {
    art: 'ki',
    titel: 'Wir optimieren für KI-Suche.',
    text: 'Wir bereiten Ihre Inhalte klar und strukturiert auf, damit KI-Assistenten Ihr Angebot verstehen und Sie bei passenden Fragen eher genannt werden können.',
    paket: 'Aufbereitung in allen Paketen',
    bild: 'Beispielhafte Darstellung eines Chats mit einem KI-Assistenten, der auf eine Frage den erfundenen Beispielbetrieb „Muster Malerbetrieb“ nennt.',
    link: { href: '/leistungen/suchmaschinen-optimierung/', text: 'Mehr zur Suchmaschinen-Optimierung' },
  },
};

/** Inhalte der gezeichneten Ansichten (erfundenes Beispiel, keine echten Werte) */
export const MOCK = {
  analyse: { kopf: 'Monatsbericht', besucher: 'Besucher', anfragen: 'Anfragen', ladezeit: 'Ladezeit', schnell: 'schnell' },
  google: {
    suche: 'Malerbetrieb in der Nähe',
    name: 'Muster Malerbetrieb',
    art: 'Malerbetrieb · Musterstadt',
    offen: 'Heute geöffnet',
    knoepfe: ['Website', 'Route', 'Anrufen'],
  },
  ki: {
    kopf: 'KI-Assistent',
    frage: 'Welcher Malerbetrieb in meiner Nähe kann kurzfristig eine Wohnung streichen?',
    antwort: 'Infrage kommt zum Beispiel der Muster Malerbetrieb in Musterstadt. Laut seiner Website übernimmt er Innen- und Außenanstriche und nimmt Anfragen direkt online an.',
    quelle: 'Quelle: Website des Betriebs',
  },
};

/** Welche Felder auf welcher Leistungsseite stehen (/leistungen/<slug>/) */
export const LEISTUNG_PANELS: Record<string, PanelArt[]> = {
  'suchmaschinen-optimierung': ['google', 'ki'],
  'google-profil': ['google'],
  auswertung: ['analyse'],
};
