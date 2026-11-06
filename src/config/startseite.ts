// Startseite der waybuild Website (Stand 06.11.2026 mittags): Hero + Abschnitte 1–5, 7–9 WÖRTLICH von Jamil
// (Talk qh87y3sj 4771, 4773–4781). Abschnitt 6 offen; dort steht als Vorschlag der Unternehmensauftritt-Check aus Jamils
// Konzept vom Morgen (4768). Davor: Konzept „Unternehmensauftritt“ (4768) nach Website Rethinking
// (NC Projekte/waybuild/Website/Rethinking_Unternehmensauftritt_2026-11-06), davor „Besucherreise“ (05.11.).
// Reihenfolge: Hero · 1 Keine einzelnen Systeme · 2 Werkzeuge/offene Fragen · 3 Verständnis · 4 Bessere Entscheidungen
//   · 5 Aus einer Hand (+ Pakete) · 6 Check (Vorschlag) · 7 Ergebnis/Vertrauen · 8 Komplexität · 9 Abschluss
// Preise/Pakete NICHT hier, sondern immer aus PAKETE in site.ts (Verknüpfung in index.astro).
// Die alte Startseite (vor dem 05.11.) steht unverändert unter /hauptseite-alt/.

/** Name oben in der Kopfzeile der Startseite. An einer Stelle änderbar. */
export const MARKE = 'rethink.website';

/** Kontaktseite mit vorbelegtem Anliegen (Feld „paket“ geht in den Betreff der Anfrage, Interesse = Website, max. 60 Zeichen). */
export const ANLIEGEN = {
  erstberatung: { label: 'Kostenfreie Erstberatung', paket: 'Kostenfreie Erstberatung' },
  analyse: { label: 'Kostenlose Analyse anfordern', paket: 'Kostenlose Analyse' },
  bewerten: { label: 'Unternehmensauftritt bewerten lassen', paket: 'Unternehmensauftritt bewerten lassen' },
};

/** Die Berührungspunkte (Hero und Abschnitt 12). dx/dy = Startposition in % der Bühne, vom Mittelpunkt aus. */
export const BERUEHRUNGSPUNKTE = [
  { text: 'Website', dx: -32, dy: -27 },
  { text: 'Google', dx: -11, dy: -40 },
  { text: 'Bewertungen', dx: 14, dy: -32 },
  { text: 'LinkedIn', dx: 34, dy: -21 },
  { text: 'E-Mails', dx: -34, dy: 23 },
  { text: 'Angebote', dx: -12, dy: 37 },
  { text: 'Signatur', dx: 12, dy: 28 },
  { text: 'Dokumente', dx: 33, dy: 21 },
];

export const HERO = {
  /** Rethinking: Zielgruppe in drei Sekunden („Bin ich hier richtig?“), hilft auch Suchmaschinen. */
  zeile: 'Für kleine und mittlere Unternehmen',
  /** Hero-Texte wörtlich von Jamil: Headline Talk qh87y3sj 4771, Subheadline Korrektur 4773 (06.11.2026), in zwei Absätzen */
  titel: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden.',
  unter: [
    'Kunden erleben Ihr Unternehmen nicht in einzelnen Systemen. Sie erleben jeden Kontakt mit Ihrem Unternehmen als Ganzes.',
    'Deshalb verbinden wir Ihre Website, Kommunikation, Prozesse und Systeme zu einem durchgängigen Erlebnis.',
  ],
  cta: 'Unternehmensauftritt bewerten',
  cta2: 'Unsere Denkweise kennenlernen',
  kern: 'Unternehmensauftritt',
};

// Abschnitte 1–4 nach dem Hero: Texte WÖRTLICH von Jamil (Talk qh87y3sj 4774–4777, 06.11.2026, 12:06–12:07).

/** Abschnitt 1 (4774): Visual = Wanderung über die Wege, auf denen Kunden das Unternehmen entdecken */
export const EINDRUCK = {
  titel: 'Kunden erleben keine einzelnen Systeme.',
  unter: 'Sie erleben Ihr Unternehmen.',
  einleitung: 'Ein potenzieller Kunde entdeckt Ihr Unternehmen über Google, Social Media, Empfehlungen oder andere Wege.',
  /** Stationen der Wanderung (aus Jamils Satz oben) */
  wege: ['Google', 'Social Media', 'Empfehlungen', 'andere Wege'],
  minuten: 'Innerhalb weniger Minuten entsteht ein Eindruck.',
  schluss: ['Nicht durch eine einzelne Website.', 'Sondern durch das Zusammenspiel aller Berührungspunkte.'],
};

/** Abschnitt 2 (4775): Visual = Werkzeug-Chaos + Lücken zwischen Unternehmen und Kunde */
export const WERKZEUGE = {
  titel: 'Genau hier entstehen die meisten Probleme.',
  einleitung: 'Viele Unternehmen investieren in einzelne Werkzeuge.',
  liste: 'Eine neue Website. Ein neues CRM. Eine neue Software. Ein neues Marketing-Tool.',
  /** Beschriftung der Werkzeug-Kärtchen in der Grafik (nur Bild, Text steht oben in „liste“) */
  kaertchen: ['Website', 'CRM', 'Software', 'Marketing-Tool'],
  trotzdem: 'Trotzdem wirkt das Gesamterlebnis oft uneinheitlich.',
  fragenKopf: 'Kunden wissen nicht sofort:',
  fragen: ['Was macht dieses Unternehmen?', 'Warum sollte ich ihm vertrauen?', 'Warum sollte ich mich melden?'],
  links: 'Unternehmen',
  rechts: 'Kunde',
  schluss: 'Jede offene Frage kostet Vertrauen.',
  /** Rethinking: Zwischenruf zum Check, damit niemand bis zum Ende scrollen muss */
  zwischenruf: 'Wie ist das bei Ihnen?',
  zwischenrufLink: 'Zum Unternehmensauftritt-Check',
};

/** Abschnitt 3 (4776): Visual = Verständnis-Liste als Linie, die bei der Lösung ankommt */
export const VERSTAENDNIS = {
  titel: 'Deshalb beginnen wir nicht mit Lösungen.',
  unter: 'Wir beginnen mit Verständnis.',
  einleitung: 'Bevor wir Empfehlungen aussprechen, möchten wir verstehen:',
  liste: ['Ihr Unternehmen', 'Ihre Kunden', 'Ihre Leistungen', 'Ihre Ziele', 'Ihre Herausforderungen'],
  ziel: 'Die richtige Lösung',
  botschaft: ['Denn die richtige Lösung entsteht nicht durch Vermutungen.', 'Sondern durch Verständnis.'],
};

/** Abschnitt 4 (4777) mit den drei Karten der Arbeitsweise (4768), verbunden durch eine Linie */
export const ARBEITSWEISE = {
  eyebrow: 'Unsere Arbeitsweise',
  titel: 'Aus Verständnis entstehen bessere Entscheidungen.',
  einleitung: ['Viele Anbieter starten mit der Umsetzung.', 'Wir gehen einen Schritt zurück.'],
  karten: [
    { titel: 'Verstehen', text: ['Zuerst verstehen wir die Situation.'] },
    { titel: 'Empfehlen', text: ['Dann empfehlen wir den sinnvollsten Weg.'], betont: ['Nicht den einfachsten.', 'Nicht den teuersten.', 'Den richtigen.'] },
    { titel: 'Umsetzen', text: ['Erst danach wird umgesetzt.'], betont: ['Klar.', 'Professionell.', 'Durchdacht.'] },
  ] as { titel: string; text: string[]; betont?: string[] }[],
};

// Abschnitte 5, 7, 8, 9 WÖRTLICH von Jamil (Talk qh87y3sj 4778–4781, 06.11.2026, 12:08–12:09). Abschnitt 6 offen.

/** Abschnitt 5 (4778): vier Säulen aus einem Kern. info = ehrliche Zuordnung zu Paketen bzw. Ausbaustufen (Rethinking). */
export const EINE_HAND = {
  titel: 'Alles aus einer Hand.',
  text: [
    'Ein Unternehmen sollte nicht fünf Ansprechpartner benötigen, um einen professionellen Auftritt aufzubauen.',
    'Deshalb begleiten wir Unternehmen vom ersten digitalen Kontakt bis zum laufenden Betrieb.',
  ],
  kern: 'Aus einer Hand',
  saeulen: [
    { titel: 'Digitale Präsenz', text: 'Website, Google-Unternehmensprofil, Bewertungen und Sichtbarkeit.' },
    { titel: 'Kommunikation', text: 'E-Mail, Signaturen, Kontaktwege und digitale Geschäftskommunikation.' },
    { titel: 'Systeme', text: 'CRM, Workflows, Automatisierung und digitale Prozesse.' },
    { titel: 'Betreuung', text: 'Beratung, Weiterentwicklung und langfristige Unterstützung.' },
  ],
};

/** Abschnitt 7 (4779): Visual = Berührungspunkte verschmelzen zu „Vertrauen“ */
export const ERGEBNIS = {
  titel: 'Am Ende zählt nicht die Technologie.',
  unter: 'Am Ende zählt das Ergebnis.',
  saetze: [
    'Menschen kaufen nicht wegen einer Website.',
    'Menschen kaufen nicht wegen eines CRM-Systems.',
    'Menschen kaufen nicht wegen einer Automatisierung.',
  ],
  vertrauen: 'Sie entscheiden sich für Unternehmen, denen sie vertrauen.',
  schluss: 'Genau deshalb betrachten wir immer das Gesamtbild.',
  kern: 'Vertrauen',
};

/** Abschnitt 8 (4780): dunkel, Visual = Einzelteile ordnen sich zu einem klaren Bild */
export const KOMPLEXITAET = {
  titel: 'Wir übernehmen die Komplexität.',
  unter: 'Sie behalten den Fokus.',
  text: [
    'Digitale Lösungen sollten Unternehmen unterstützen. Nicht zusätzlich beschäftigen.',
    'Deshalb übernehmen wir Verantwortung für die Dinge, die im Hintergrund funktionieren müssen, damit Sie sich auf Ihr Unternehmen konzentrieren können.',
  ],
};

/** Check (Konzept 4768, als Vorschlag für den offenen Abschnitt 6 behalten): 10 Fragen in 5 Bereichen (je 2). Jamils 5 Beispielfragen + 5 ergänzt (Rethinking). Ja 10 · Teilweise 5 · Nein 0. */
export const CHECK = {
  eyebrow: 'Unternehmensauftritt-Check',
  titel: 'Wie professionell wirkt Ihr Unternehmen aktuell?',
  einleitung: '10 Fragen, rund zwei Minuten. Am Ende sehen Sie Ihre Punktzahl und wo Ihr Auftritt Vertrauen gewinnt oder verliert.',
  datenschutz: 'Ihre Antworten bleiben in Ihrem Browser. Wir speichern nichts und senden nichts.',
  antworten: [['Ja', 10], ['Teilweise', 5], ['Nein', 0]] as [string, number][],
  bereiche: [
    {
      id: 'verstaendlich', name: 'Verständlichkeit',
      fragen: ['Versteht man Ihr Angebot innerhalb von 10 Sekunden?', 'Erkennen Kunden Ihren Unterschied zu anderen Anbietern?'],
      urteil: ['Besucher verstehen zu spät, was Sie anbieten. Hier beginnt die Unsicherheit.', 'Ihr Angebot ist erkennbar, Ihr Unterschied noch nicht klar genug.', 'Besucher verstehen schnell, was Sie anbieten und warum Sie.'],
    },
    {
      id: 'vertrauen', name: 'Vertrauen',
      fragen: ['Sind Bewertungen gut sichtbar?', 'Zeigen Sie echte Beispiele Ihrer Arbeit und die Menschen dahinter?'],
      urteil: ['Besucher finden kaum Gründe, Ihnen zu vertrauen.', 'Vertrauen ist da, aber schwer zu finden. Zeigen Sie Bewertungen und Beispiele sichtbarer.', 'Bewertungen und echte Beispiele stärken Ihren Eindruck.'],
    },
    {
      id: 'sichtbar', name: 'Sichtbarkeit',
      fragen: ['Ist Ihr Google-Profil aktuell?', 'Findet man Sie, wenn man Ihre Leistung in Ihrer Region sucht?'],
      urteil: ['Viele Interessenten finden Sie gar nicht erst.', 'Man findet Sie, aber nicht immer aktuell oder vollständig.', 'Wer Sie sucht, findet aktuelle Informationen.'],
    },
    {
      id: 'einheitlich', name: 'Einheitlicher Auftritt',
      fragen: ['Ist Ihr Auftritt überall konsistent?', 'Wirken E-Mails, Signatur, Angebote und Dokumente wie aus einem Guss?'],
      urteil: ['Website, E-Mails und Dokumente erzählen verschiedene Geschichten.', 'Einzelne Berührungspunkte wirken anders als der Rest.', 'Ihr Auftritt wirkt überall wie aus einem Guss.'],
    },
    {
      id: 'fuehrung', name: 'Nutzerführung',
      fragen: ['Wissen Besucher sofort, was sie als Nächstes tun sollen?', 'Funktioniert Ihre Website auf dem Handy genauso gut wie am PC?'],
      urteil: ['Besucher wissen nicht, was sie als Nächstes tun sollen.', 'Der nächste Schritt ist da, aber nicht überall leicht zu finden.', 'Besucher wissen, was sie als Nächstes tun sollen, auch am Handy.'],
    },
  ],
  /** Gesamturteil: [ab Punkte, Satz] absteigend */
  gesamt: [
    [80, 'Ihr Auftritt überzeugt. Feinschliff lohnt sich an einzelnen Stellen.'],
    [50, 'Eine solide Basis. Trotzdem gehen an einigen Stellen Chancen verloren.'],
    [0, 'Ihr Auftritt bleibt hinter der Qualität Ihrer Arbeit zurück. Hier liegt viel Potenzial.'],
  ] as [number, string][],
  hinweis: 'Der Check ist eine Selbsteinschätzung. Eine Analyse durch uns geht tiefer und ist kostenlos.',
  ctaHinweis: 'Nur wenn Sie auf den Knopf klicken, nehmen wir Ihre Punktzahl in das Anfrageformular mit. Absenden entscheiden Sie selbst.',
  cta: 'Kostenlose Analyse anfordern',
};

/** Abschnitt 9 (4781): Abschluss, viel Weißraum, keine Animation, CTA wie bisher */
export const ABSCHLUSS = {
  titel: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden.',
  zeile: 'Digitale Präsenz. Kommunikation. Systeme. Betreuung.',
  stark: 'Aus einer Hand.',
  cta: 'Unternehmensauftritt bewerten lassen',
  unterCta: 'Kurzes Gespräch. Klare Einschätzung. Konkrete Empfehlungen.',
};

/** Für Meta-Description, JSON-LD und llms.txt */
export const BOTSCHAFT = {
  titel: 'Ein durchgängiges Erlebnis für Ihre Kunden',
  description: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden: Wir verbinden Website, Kommunikation, Prozesse und Systeme zu einem durchgängigen Erlebnis.',
  service: 'Durchgängige Kundenerlebnisse für kleine und mittlere Unternehmen, von der ersten Aufmerksamkeit bis zum zufriedenen Kunden: Digitale Präsenz, Kommunikation, Systeme und Betreuung aus einer Hand. Website, Google-Profil, E-Mail-Postfächer, Signatur, Briefvorlage, Logo und Geschäftspapiere in festen Monatspaketen; CRM, Workflows und Automatisierung als individuelles Angebot. Erst verstehen, dann empfehlen, dann umsetzen; fester Ansprechpartner und laufende Weiterentwicklung im festen Monatspreis.',
};
