// Startseite der waybuild Website (Stand 06.11.2026 abends). Alle Texte WÖRTLICH von Jamil:
//   Hero: Headline 4771, Subheadline 4783, Animation 4784 (Kundengeschichte in fünf Stationen)
//   (Abschnitt 1 „Kunden erleben keine einzelnen Systeme.“ entfernt, Jamil 4806) · 2 Bausteine (4786/4787) · 3 Verstehen. Empfehlen. Umsetzen. (4788)
//   · 4 Alles zwischen erstem Kontakt und zufriedenem Kunden (4789, + Pakete) · 5 Darauf können Sie sich verlassen (4790/4791)
//   · „Woran wir glauben“ (4795/4796) ist seit 4809 mit Abschnitt 3 zusammengelegt
//   · Check (Konzept 4768, als Vorschlag) · Abschluss (4792) · Claim (4793)
// Frühere Stände: „Unternehmensauftritt“ (4768, nach Website Rethinking, NC Rethinking_Unternehmensauftritt_2026-11-06),
// „Besucherreise“ (05.11.). Preise/Pakete NICHT hier, sondern immer aus PAKETE in site.ts (Verknüpfung in index.astro).
// Die alte Startseite (vor dem 05.11.) steht unverändert unter /hauptseite-alt/.

/** Name oben in der Kopfzeile der Startseite. An einer Stelle änderbar. */
export const MARKE = 'rethink.website';

/** Kontaktseite mit vorbelegtem Anliegen (Feld „paket“ geht in den Betreff der Anfrage, Interesse = Website, max. 60 Zeichen). */
export const ANLIEGEN = {
  erstberatung: { label: 'Kostenfreie Erstberatung', paket: 'Kostenfreie Erstberatung' },
  analyse: { label: 'Kostenlose Analyse anfordern', paket: 'Kostenlose Analyse' },
  bewerten: { label: 'Unternehmensauftritt bewerten lassen', paket: 'Unternehmensauftritt bewerten lassen' },
};

export const HERO = {
  /** Rethinking: Zielgruppe in drei Sekunden („Bin ich hier richtig?“), hilft auch Suchmaschinen. */
  zeile: 'Für kleine und mittlere Unternehmen',
  /** Hero-Texte wörtlich von Jamil: Headline Talk qh87y3sj 4771, Subheadline 4783 (06.11.2026, 19:56; ersetzt 4773), in zwei Absätzen */
  titel: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden.',
  unter: [
    'Kunden erleben Ihr Unternehmen nicht in einzelnen Systemen. Sie erleben einen zusammenhängenden Prozess.',
    'Deshalb entwickeln wir keine einzelnen Lösungen. Wir entwickeln digitale Unternehmensabläufe, die funktionieren.',
  ],
  cta: 'Unternehmensauftritt bewerten',
  cta2: 'Unsere Denkweise kennenlernen',
  /** Hero-Animation (Jamil 4784): kleine Geschichte eines Kunden in fünf Stationen, keine Linie, kein Prozessbild */
  stationen: ['Aufmerksamkeit', 'Vertrauen', 'Anfrage', 'Bearbeitung', 'Zufriedener Kunde'],
};

/** Abschnitt 2 (4786/4787): Visual = vier Bausteine mit unterschiedlichen Kanten, die nicht ineinanderpassen */
export const BAUSTEINE = {
  /** Headline + Unterzeile neu (Jamil 4812) */
  titel: 'Einzelne Lösungen funktionieren.',
  unter: 'Das Gesamterlebnis oft nicht.',
  werkzeuge: ['Website.', 'CRM.', 'Social Media.', 'Prozesse.'],
  text: ['Doch Kunden erleben das Gesamtbild.', 'Wenn einzelne Bausteine nicht zusammenarbeiten, entstehen Reibungsverluste.'],
  verluste: ['Verlorene Anfragen.', 'Unnötiger Aufwand.', 'Unklare Abläufe.'],
};

/** Abschnitt 3 (4788): drei große Karten mit reinem Text */
export const VERSTEHEN = {
  titel: 'Verstehen. Empfehlen. Umsetzen.',
  einleitung: 'Bevor wir Lösungen entwickeln, möchten wir verstehen:',
  liste: ['Ihr Unternehmen', 'Ihre Kunden', 'Ihre Ziele'],
  schluss: ['Denn gute Entscheidungen entstehen durch Verständnis.', 'Nicht durch Vermutungen.'],
  /** Zusammengelegt mit „Woran wir glauben“ (Jamil 4809): jede Karte trägt den inhaltlich passenden Wert aus GLAUBEN.werte
   *  Verstehen ↔ Verantwortung (mitdenken, hinterfragen, Risiken ansprechen) · Empfehlen ↔ Einfachheit (Aufwand gering,
   *  Lösungen einfach umsetzbar) · Umsetzen ↔ Verlässlichkeit (Anfrage genügt, nichts geht verloren, Stand nachvollziehbar) */
  karten: [{ wort: 'Verstehen', wert: 0 }, { wort: 'Empfehlen', wert: 1 }, { wort: 'Umsetzen', wert: 2 }],
};

/** Abschnitt 4 (4789): vier Bereiche. paket=false = nicht in den Monatspaketen (Ausbaustufe, individuelles Angebot). */
export const BEREICHE = {
  /** Headline + Unterzeile neu (Jamil 4811) */
  titel: 'Ein Kunde interessiert sich nicht für Ihre Systeme.',
  unter: 'Ein Kunde interessiert sich für das Erlebnis.',
  bereiche: [
    { titel: 'Aufmerksamkeit', teile: [['Website', true], ['Google', true], ['Social Media', false], ['Video', false]] },
    { titel: 'Anfrage', teile: [['Formulare', true], ['Terminbuchung', false], ['CRM', false]] },
    { titel: 'Bearbeitung', teile: [['Prozesse', false], ['Automatisierung', false], ['Systeme', false]] },
    { titel: 'Betreuung', teile: [['Service', true], ['Kommunikation', true], ['Weiterentwicklung', true]] },
  ] as { titel: string; teile: [string, boolean][] }[],
  hinweis: 'Gestrichelt: Ausbaustufe mit individuellem Angebot. Alles andere steckt in unseren Monatspaketen.',
};

/** Abschnitt 5 (4790/4791): große Schlagworte, viel Weißraum, keine Icons */
export const VERLASSEN = {
  titel: 'Darauf können Sie sich verlassen',
  saetze: ['Wir übernehmen Verantwortung.', 'Wir denken mit.', 'Wir halten Dinge einfach.', 'Wir empfehlen nicht das Meiste.', 'Wir empfehlen das Richtige.'],
};

/** Werte (4795, Texte 4796), seit 4809 in den Karten von Abschnitt 3; darunter dezent, was man nicht erwarten muss (Minus statt Haken) */
export const GLAUBEN = {
  titel: 'Woran wir glauben',
  /** Texte 4796 (ersetzen die kurzen aus 4795); leit = erster Satz, groß gesetzt */
  werte: [
    { titel: 'Verantwortung', leit: 'Wir setzen nicht einfach um.', text: 'Wir denken mit, hinterfragen und empfehlen den Weg, den wir selbst gehen würden. Wenn wir ein Risiko erkennen, sprechen wir es an. Wenn wir einen besseren Weg sehen, zeigen wir ihn auf.' },
    { titel: 'Einfachheit', leit: 'Technologie sollte Unternehmen entlasten.', text: 'Nicht zusätzliche Arbeit erzeugen. Deshalb übernehmen wir die Komplexität und halten den Aufwand für unsere Kunden so gering wie möglich. Denn gute Lösungen sollten nicht nur funktionieren. Sie sollten auch einfach umzusetzen sein.' },
    { titel: 'Verlässlichkeit', leit: 'Niemand sollte einem Dienstleister hinterherlaufen müssen.', text: 'Eine Anfrage genügt. Offene Punkte gehen nicht verloren. Verantwortlichkeiten sind klar. Der aktuelle Stand ist jederzeit nachvollziehbar. Und wenn sich etwas verzögert, erfahren Sie es von uns, bevor Sie nachfragen müssen. Für uns ist das keine Besonderheit. Sondern professionelle Zusammenarbeit.' },
  ],
  nichtKopf: 'Was Sie von uns nicht erwarten müssen',
  nicht: ['Kein Fachchinesisch', 'Keine unnötige Komplexität', 'Keine Empfehlungen, die nur uns helfen', 'Kein Projekt, das nach der Umsetzung endet', 'Keine fünf verschiedenen Ansprechpartner'],
};

/** Kundenreise-Check (Jamil 4835; Grundlage Vorschlag „Website-Selbstcheck“, NC f/22627): 7 Fragen, eine pro Karte,
 *  die man spontan beantworten kann: Betrieb (F01), Ziel (F24) und je eine Frage pro Station der Kundengeschichte.
 *  Ampel je Antwort: 'g' läuft gut · 'y' ausbaufähig · 'r' hier geht etwas verloren · null = ohne Wertung.
 *  Auswertung nur im Browser; mitgeschickt wird nur, wenn der Besucher „Ergebnis mitschicken“ wählt (sessionStorage → Kontaktseite). */
export type Ampel = 'g' | 'y' | 'r';
export const CHECK = {
  eyebrow: 'Kundenreise-Check',
  titel: 'Wie erleben Ihre Kunden Ihr Unternehmen?',
  einleitung: '7 kurze Fragen, rund eine Minute. Einfach antippen, die nächste Frage kommt von allein.',
  datenschutz: 'Ihre Antworten bleiben in Ihrem Browser. Nur wenn Sie Ihr Ergebnis mitschicken, erhalten wir es mit Ihrer Anfrage.',
  fragen: [
    { id: 'groesse', schritt: 'Ihr Betrieb', frage: 'Wie viele Personen arbeiten in Ihrem Betrieb, Sie eingeschlossen?', hinweis: 'Ohne Wertung. So passen die Tipps besser zu Ihnen.',
      antworten: [['1', null], ['2 bis 5', null], ['6 bis 10', null], ['11 bis 25', null], ['mehr als 25', null]] },
    { id: 'ziel', schritt: 'Ihr Ziel', frage: 'Was ist Ihnen in den nächsten 12 Monaten am wichtigsten?',
      antworten: [['Mehr Anfragen', null], ['Passendere Anfragen', null], ['Weniger Büroarbeit', null], ['Mitarbeitende finden', null], ['Ein einheitlicher Auftritt', null]] },
    { id: 'aufmerksamkeit', schritt: 'Aufmerksamkeit', frage: 'Suchen Sie bei Google nach Ihrer Leistung und Ihrem Ort. Wo erscheinen Sie?', hinweis: 'Zum Beispiel „Elektriker Norderstedt“. Der Test, den Ihre Kunden jeden Tag machen.',
      antworten: [['Unter den ersten 3 in der Karte', 'g'], ['Auf der ersten Seite', 'g'], ['Weiter hinten', 'y'], ['Gar nicht', 'r'], ['Noch nicht ausprobiert', 'y']] },
    { id: 'vertrauen', schritt: 'Vertrauen', frage: 'Wann haben Sie Ihre letzte Google-Bewertung bekommen?',
      antworten: [['In den letzten 4 Wochen', 'g'], ['In den letzten 6 Monaten', 'g'], ['Länger her', 'y'], ['Noch keine', 'r'], ['Ich habe kein Google-Profil', 'r'], ['Weiß nicht', 'y']] },
    { id: 'anfrage', schritt: 'Anfrage', frage: 'Wann melden Sie sich meistens auf eine neue Anfrage zurück?',
      antworten: [['Am selben Tag', 'g'], ['Am nächsten Werktag', 'g'], ['Innerhalb einer Woche', 'y'], ['Später oder ganz unterschiedlich', 'r']] },
    { id: 'bearbeitung', schritt: 'Bearbeitung', frage: 'Wo stehen Ihre Anfragen und Kundendaten?',
      antworten: [['An einem Ort, zum Beispiel in einem Programm', 'g'], ['Verteilt auf E-Mail, Handy und Zettel', 'y'], ['Vor allem im Kopf', 'r']] },
    { id: 'zufrieden', schritt: 'Zufriedener Kunde', frage: 'Bitten Sie zufriedene Kunden nach dem Auftrag um eine Bewertung oder Empfehlung?',
      antworten: [['Ja, immer, mit festem Ablauf', 'g'], ['Manchmal', 'y'], ['Nie', 'r']] },
  ] as { id: string; schritt: string; frage: string; hinweis?: string; antworten: [string, Ampel | null][] }[],
  ampel: { g: 'Läuft gut', y: 'Ausbaufähig', r: 'Hier geht etwas verloren' } as Record<Ampel, string>,
  /** je Station und Ampel: [Das bedeutet für Sie, Tipp] */
  texte: {
    aufmerksamkeit: { g: ['Wer Sie sucht, findet Sie.', 'Hier müssen Sie gerade nichts tun.'], y: ['Man findet Sie, aber nicht immer zuerst.', 'Google-Profil mit Fotos und Leistungen vervollständigen.'], r: ['Neue Kunden finden Sie kaum über Google.', 'Hier liegt Ihr größter Hebel: Google-Profil und Seiten für Ihren Ort.'] },
    vertrauen: { g: ['Interessenten sehen aktuelle Bewertungen.', 'Bewertungen weiter pflegen.'], y: ['Ihre Bewertungen sind nicht mehr ganz frisch.', 'Nach jedem Auftrag freundlich um eine Bewertung bitten.'], r: ['Interessenten finden wenig Gründe, Ihnen zu vertrauen, bevor sie anrufen.', 'Google-Profil einrichten und erste Bewertungen sammeln.'] },
    anfrage: { g: ['Wer anfragt, bekommt schnell Antwort. Das ist ein echter Vorteil.', 'So beibehalten.'], y: ['Manche Anfragen warten zu lange. Viele fragen bei mehreren Betrieben an.', 'Eine feste Rückrufzeit am Tag einplanen.'], r: ['Hier gehen wahrscheinlich Anfragen verloren, bevor ein Gespräch entsteht.', 'Jede Anfrage sofort bestätigen und eine feste Antwortzeit zusagen.'] },
    bearbeitung: { g: ['Nach der Anfrage läuft es geordnet.', 'Gut so.'], y: ['Es läuft, kostet aber Zeit und Suchen.', 'Anfragen und Kundendaten an einem Ort sammeln.'], r: ['Wichtige Infos hängen an einzelnen Personen. Das bremst, etwa bei Urlaub oder Krankheit.', 'Ein einfaches System für Anfragen und Kunden einführen.'] },
    zufrieden: { g: ['Zufriedene Kunden werden bei Ihnen zu Empfehlern.', 'Weiter so.'], y: ['Da geht mehr.', 'Nach jedem Auftrag den Bewertungslink schicken.'], r: ['Ihre zufriedenen Kunden bleiben unsichtbar.', 'Nach jedem Auftrag kurz um eine Bewertung bitten, mit Link.'] },
  } as Record<string, Record<Ampel, [string, string]>>,
  /** Ziel (Frage 2) → Station, die im Ergebnis als „Ihr Ziel“ markiert wird */
  zielStation: { 'Mehr Anfragen': 'aufmerksamkeit', 'Passendere Anfragen': 'vertrauen', 'Weniger Büroarbeit': 'bearbeitung', 'Mitarbeitende finden': 'vertrauen', 'Ein einheitlicher Auftritt': 'vertrauen' } as Record<string, string>,
  ergebnis: {
    viel: 'An mehreren Stellen gehen Ihnen wahrscheinlich Kunden verloren. Wir sehen uns das kostenlos mit Ihnen an.',
    mittel: 'Ihr Auftritt hat eine gute Basis. An einer Stelle lohnt sich gezielte Hilfe.',
    wenig: 'Ehrlich gesagt: Sie sind gut aufgestellt. Unser Tipp:',
    individuell: 'Unser Vorschlag: ein Erstgespräch zu Ihren Abläufen, etwa Terminbuchung, CRM oder Automatisierung. Das ist ein individuelles Angebot.',
  },
  hinweis: 'Das ist eine Selbsteinschätzung, keine Messung. Die Einordnung beruht auf unserer Erfahrung, nicht auf einer Studie.',
  mitschicken: 'Mein Ergebnis mit der Anfrage mitschicken',
};

/** Abschluss (4792) mit CTA, darunter der Claim (4793) */
export const ABSCHLUSS = {
  titel: 'Wir übernehmen die Komplexität. Sie behalten den Fokus.',
  text: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden entwickeln wir Lösungen, die zusammenarbeiten und Unternehmen nachhaltig unterstützen.',
  cta: 'Unternehmensauftritt bewerten lassen',
  unterCta: 'Kurzes Gespräch. Klare Einschätzung. Konkrete Empfehlungen.',
};

/** Claim (4793): unter dem Abschluss, als Slogan in JSON-LD und im Title */
export const CLAIM = 'Alles aus einer Hand. Von Anfang bis Wachstum.';

/** Für Meta-Description, JSON-LD und llms.txt */
export const BOTSCHAFT = {
  titel: CLAIM,
  description: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden: Website, Anfrage, Bearbeitung und Betreuung aus einer Hand. Für kleine und mittlere Unternehmen.',
  service: 'Digitale Unternehmensabläufe für kleine und mittlere Unternehmen, von der ersten Aufmerksamkeit bis zum zufriedenen Kunden: Aufmerksamkeit (Website, Google), Anfrage (Formulare), Bearbeitung und Betreuung (Service, Kommunikation, Weiterentwicklung) aus einer Hand. Website, Google-Profil, E-Mail-Postfächer, Signatur, Briefvorlage, Logo und Geschäftspapiere in festen Monatspaketen; Social Media, Video, Terminbuchung, CRM, Prozesse, Automatisierung und Systeme als individuelles Angebot.',
};
