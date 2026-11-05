// Neue Startseite „Besucherreise“ (Jamil, Talk qh87y3sj 4753, 05.11.2026). Texte WÖRTLICH aus Jamils Konzept,
// nur Markdown-Zeichen entfernt. Die Seite folgt den Gedanken des Besuchers in 7 Schritten:
//   1 Bin ich hier richtig? (Hero) · 2 Versteht ihr mein Problem? · 3 Warum scheitern Websites oft?
//   4 Was macht ihr anders? · 5 Kann ich euch vertrauen? · 6 Was bekomme ich konkret? · 7 Wie geht es weiter?
// Wiederkehrendes Element: Komplexität → Verständnis → Klarheit → Fortschritt (STUFEN).
// Preise/Pakete NICHT hier, sondern immer aus PAKETE in site.ts (Verknüpfung in index.astro).
// Die bisherige Startseite steht unverändert unter /hauptseite-alt/.

/** Name aus Jamils Konzept („Deshalb gibt es rethink.website“). An einer Stelle änderbar. */
export const MARKE = 'rethink.website';

/** Das wiederkehrende Element. Index = Stufe. */
export const STUFEN = ['Komplexität', 'Verständnis', 'Klarheit', 'Fortschritt'] as const;
export type Stufe = 0 | 1 | 2 | 3;

/** Kontaktseite mit vorbelegtem Anliegen (Feld „paket“ geht in den Betreff der Anfrage, Interesse = Website). */
export const ANLIEGEN = {
  erstberatung: { label: 'Kostenfreie Erstberatung', paket: 'Kostenfreie Erstberatung' },
  analyse: { label: 'Website analysieren lassen', paket: 'Website-Analyse' },
};

export const START_HERO = {
  titel: 'Ihre Website funktioniert.',
  unter: 'Trotzdem erklärt sie Ihr Unternehmen vielleicht nicht so gut, wie sie könnte.',
  einleitung: 'Viele Unternehmen investieren in ihre Website und haben trotzdem das Gefühl:',
  gefuehle: [
    'Besucher verstehen Leistungen nicht sofort',
    'wichtige Anfragen bleiben aus',
    'Änderungen werden unnötig kompliziert',
    'niemand übernimmt wirklich Verantwortung',
  ],
  aussage: 'Wir entwickeln Websites, die verständlich machen, Vertrauen aufbauen und Unternehmen entlasten.',
};

export const PROBLEM = {
  eyebrow: 'Das Problem liegt selten an der Website',
  titel: 'Die eigentliche Herausforderung ist oft eine andere.',
  text: ['Viele Websites funktionieren technisch einwandfrei.', 'Trotzdem entstehen täglich kleine Probleme:'],
  punkte: [
    'Besucher finden nicht sofort die richtigen Informationen',
    'Leistungen wirken komplizierter als sie sind',
    'Vertrauen entsteht zu spät',
    'Ansprechpartner sind nicht klar erkennbar',
    'Anpassungen werden zur organisatorischen Belastung',
  ],
  folgeKopf: 'Die Folge:',
  folge: 'Unternehmen investieren Zeit in ihre Website, obwohl die Website eigentlich Zeit sparen sollte.',
};

export const ANSTRENGEND = {
  eyebrow: 'Warum viele Website-Projekte anstrengend werden',
  titel: 'Nicht wegen der Technik.',
  unter: 'Sondern weil niemand Verantwortung übernimmt.',
  einleitung: 'Vielleicht kennen Sie das:',
  punkte: [
    'Sie müssen Entscheidungen ohne ausreichende Beratung treffen.',
    'Empfehlungen bleiben vage.',
    'Technische Themen werden unnötig kompliziert erklärt.',
    'Abstimmungen ziehen sich über Wochen.',
    'Sie koordinieren Dinge, die eigentlich andere übernehmen sollten.',
  ],
  schluss: ['Dann wird aus einer Website schnell ein weiteres Projekt, das Zeit kostet.', 'Dabei sollte sie genau das Gegenteil tun.'],
};

export const DESHALB = {
  eyebrow: `Deshalb gibt es ${MARKE}`,
  titel: 'Wir entwickeln nicht einfach Websites.',
  unter: 'Wir helfen Unternehmen, verstanden zu werden.',
  einleitung: 'Bevor wir gestalten, möchten wir verstehen:',
  verstehen: ['Ihr Unternehmen', 'Ihre Kunden', 'Ihre Leistungen', 'Ihre Ziele', 'Ihre Herausforderungen'],
  schluss: ['Denn gute Websites entstehen nicht durch mehr Design.', 'Sondern durch bessere Entscheidungen.'],
};

export const ARBEITSWEISE = {
  eyebrow: 'Wie wir arbeiten',
  titel: 'Verstehen. Empfehlen. Umsetzen.',
  vieleKopf: 'Viele Anbieter arbeiten nach diesem Prinzip:',
  viele: ['Anforderung', 'Umsetzung'],
  wirKopf: 'Wir arbeiten anders:',
  wir: ['Verstehen', 'Empfehlen', 'Umsetzen'],
  glaubeKopf: 'Wir glauben:',
  glaube: 'Die Qualität einer Website hängt weniger von der Umsetzung ab als von den Entscheidungen davor.',
  deshalb: 'Deshalb beraten wir aktiv, stellen Fragen und übernehmen Verantwortung.',
};

export const FUER_WEN = {
  eyebrow: 'Für wen wir arbeiten',
  titel: 'Nicht für jeden.',
  text: `${MARKE} richtet sich an Unternehmen, die mehr erwarten als reine Umsetzung.`,
  einleitung: 'Zum Beispiel:',
  /** path nur, wo es schon eine passende Branchenseite gibt */
  gruppen: [
    { title: 'Handwerksbetriebe', path: '/website-fuer/handwerker/' },
    { title: 'Beratungen' },
    { title: 'Dienstleister' },
    { title: 'Agenturen' },
    { title: 'Familienunternehmen' },
    { title: 'wachsende mittelständische Unternehmen' },
  ] as { title: string; path?: string }[],
  schluss: ['Unsere Kunden möchten nicht jeden Schritt selbst koordinieren.', 'Sie suchen einen Partner, der mitdenkt.'],
};

export const ZUSAMMENARBEIT = {
  eyebrow: 'So fühlt sich die Zusammenarbeit an',
  titel: 'Weniger Abstimmung. Mehr Fortschritt.',
  einleitung: 'Darauf legen wir besonderen Wert:',
  punkte: [
    'klare Kommunikation',
    'feste Ansprechpartner',
    'schnelle Rückmeldungen',
    'nachvollziehbare Empfehlungen',
    'transparente Entscheidungen',
    'sichtbarer Fortschritt',
    'möglichst wenig organisatorischer Aufwand',
  ],
  zielKopf: 'Unser Ziel:',
  ziel: ['Sie sollen sich auf Ihr Unternehmen konzentrieren können.', 'Nicht auf Ihre Website.'],
};

export const VERTRAUEN = {
  eyebrow: 'Vertrauen entsteht nicht durch Design',
  titel: 'Sondern durch Klarheit.',
  einleitung: 'Eine gute Website hilft Besuchern dabei,',
  weg: [
    'schnell zu verstehen, worum es geht',
    'Vertrauen aufzubauen',
    'Leistungen einzuordnen',
    'die nächsten Schritte zu erkennen',
    'unkompliziert Kontakt aufzunehmen',
  ],
  schluss: ['Deshalb sprechen wir weniger über Funktionen.', 'Und mehr über Wirkung.'],
  /** Ehrlicher Platzhalter statt erfundener Stimmen (nichts erfinden, bis echte Projekte freigegeben sind) */
  belegeKopf: 'Referenzen',
  belege: 'Echte Kundenprojekte und Stimmen zeigen wir hier, sobald unsere Kunden sie freigegeben haben. Bis dahin finden Sie Muster-Beispiele unserer Arbeit auf der Referenzseite.',
};

export const LOESUNGEN = {
  eyebrow: 'Unsere Lösungen',
  titel: 'Unterschiedliche Anforderungen. Die gleiche Philosophie.',
  website: {
    titel: 'Neue Unternehmenswebsite',
    text: 'Für Unternehmen, die professioneller auftreten und Anfragen vereinfachen möchten.',
  },
  analyse: {
    titel: 'Website-Analyse',
    text: 'Für Unternehmen, die wissen möchten, warum ihre bestehende Website nicht optimal funktioniert.',
    kopf: 'Analyse von:',
    punkte: ['Verständlichkeit', 'Nutzerführung', 'Vertrauen', 'Customer Journey', 'mobiler Nutzung'],
  },
  auftritt: {
    titel: 'Unternehmensauftritt',
    text: 'Website, E-Mail-Kommunikation und Geschäftsdokumente als einheitlicher Auftritt.',
  },
  weiter: {
    titel: 'Laufende Weiterentwicklung',
    text: 'Damit Ihre Website mit Ihrem Unternehmen wachsen kann.',
  },
};

export const WECHSEL = {
  eyebrow: 'Warum Unternehmen zu uns wechseln',
  titel: 'Nicht weil ihre Website kaputt ist.',
  unter: 'Sondern weil sie sich etwas anderes wünschen.',
  einleitung: 'Zum Beispiel:',
  wuensche: [
    'Einen Ansprechpartner, der mitdenkt.',
    'Verständliche Empfehlungen statt Fachbegriffe.',
    'Weniger Abstimmung.',
    'Mehr Klarheit.',
    'Mehr Verantwortung.',
    'Eine Website, die entlastet statt beschäftigt.',
  ],
};

export const GLAUBEN = {
  titel: 'Woran wir glauben',
  saetze: [
    ['Verständnis', 'Design'],
    ['Verantwortung', 'Umsetzung'],
    ['Klarheit', 'Komplexität'],
    ['Entscheidungen', 'Funktionen'],
    ['Langfristige Zusammenarbeit', 'kurzfristigen Projekten'],
  ] as [string, string][],
};

export const ABSCHLUSS = {
  titel: 'Gute Websites entstehen nicht durch mehr Funktionen.',
  unter: 'Sie entstehen durch bessere Entscheidungen.',
  text: 'Wenn Sie das Gefühl haben, dass Ihre Website mehr leisten könnte, sprechen wir darüber.',
  dreiklang: ['Unverbindlich.', 'Verständlich.', 'Ohne Fachjargon.'],
  cta: 'Kostenfreie Erstberatung vereinbaren',
  /** Nächste Schritte, wie auf der Kontaktseite (Antwort in einem Werktag, Erstgespräch rund 20 Minuten) */
  wegKopf: 'So geht es weiter',
  weg: ['Anfrage senden', 'Wir melden uns innerhalb eines Werktags', 'Erstgespräch, rund 20 Minuten'],
  signatur: {
    zeilen: ['Wir entwickeln nicht einfach Websites.', 'Wir helfen Unternehmen, verstanden zu werden.'],
    claim: 'Anspruchsvolle Lösungen. Überraschend einfach umgesetzt.',
  },
};

/** Für Meta-Description, JSON-LD und llms.txt */
export const BOTSCHAFT = {
  description: 'Ihre Website funktioniert, erklärt Ihr Unternehmen aber nicht gut genug? Wir verstehen, empfehlen und setzen um: Websites, die Vertrauen aufbauen und entlasten.',
  service: 'Websites, die Unternehmen verständlich machen: Wir verstehen zuerst Unternehmen, Kunden und Ziele, empfehlen klar und setzen um. Dazu ein fester Ansprechpartner, Hosting und laufende Weiterentwicklung im festen Monatspreis.',
};
