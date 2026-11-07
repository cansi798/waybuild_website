// Startseite der waybuild Website (Stand 06.11.2026 abends). Alle Texte WÖRTLICH von Jamil:
//   Hero: Headline 4771, Subheadline 4783, Animation 4784 (Kundengeschichte in fünf Stationen)
//   (Abschnitt 1 „Kunden erleben keine einzelnen Systeme.“ entfernt, Jamil 4806) · 2 Bausteine (4786/4787) · 3 Verstehen. Empfehlen. Umsetzen. (4788)
//   · 4 Alles zwischen erstem Kontakt und zufriedenem Kunden (4789, + Pakete) · 5 Darauf können Sie sich verlassen (4790/4791)
//   · „Woran wir glauben“ (4795/4796) seit 4809 in Abschnitt 3, seit 4868–4870 verdichtet
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
  /** Rethinking/Jamil 4879 (kundeneinfache Sprache): „CRM.“ → „Kundenverwaltung.“ */
  werkzeuge: ['Website.', 'Kundenverwaltung.', 'Social Media.', 'Prozesse.'],
  text: ['Doch Kunden erleben das Gesamtbild.', 'Wenn einzelne Bausteine nicht zusammenarbeiten, entstehen Reibungsverluste.'],
  verluste: ['Verlorene Anfragen.', 'Unnötiger Aufwand.', 'Unklare Abläufe.'],
};

/** Abschnitt 3 (4788): drei große Karten mit reinem Text */
export const VERSTEHEN = {
  titel: 'Verstehen. Empfehlen. Umsetzen.',
  einleitung: 'Bevor wir Lösungen entwickeln, möchten wir verstehen:',
  liste: ['Ihr Unternehmen', 'Ihre Kunden', 'Ihre Ziele'],
  schluss: ['Denn gute Entscheidungen entstehen durch Verständnis.', 'Nicht durch Vermutungen.'],
  /** Karten, verdichtet aus Jamils Texten 4788/4795/4796 (Feedback 4868–4870: „zusammenfassen, sodass es Sinn macht“) */
  karten: [
    { wort: 'Verstehen', leit: 'Erst zuhören, dann handeln.', text: 'Wir denken mit und fragen nach, bevor wir etwas vorschlagen.' },
    { wort: 'Empfehlen', leit: 'Den sinnvollsten Weg, nicht den größten.', text: 'Wir sagen offen, was sich lohnt, und sprechen Risiken an.' },
    { wort: 'Umsetzen', leit: 'Wir kümmern uns. Sie bleiben informiert.', text: 'Eine Anfrage genügt, nichts geht verloren. Verzögert sich etwas, hören Sie es zuerst von uns.' },
  ],
  nichtKopf: 'Was Sie von uns nicht erwarten müssen',
  nicht: ['Kein Fachchinesisch', 'Keine unnötige Komplexität', 'Keine Empfehlungen, die nur uns helfen', 'Keine fünf Ansprechpartner'],
};

/** Abschnitt 4 (4789): vier Bereiche. paket=false = nicht in den Monatspaketen (Ausbaustufe, individuelles Angebot). */
/** Abschnitt „Ein Kunde interessiert sich nicht für Ihre Systeme“ (Jamil 4811, Neuordnung 4871–4876) + Abo-Baukasten
 *  (Jamil 4879, 07.11.2026: „statt der Preisschilder eine Art Warenkorb“, ab 39,99 €). TESTANGEBOT nur auf der Startseite:
 *  /preise/, AGB und PAKETE in site.ts zeigen weiterhin Fundament/Wegweiser/Wahrzeichen (Entscheidung Can + Jamil offen).
 *  EINE Quelle: Basis-Leistungen und Bausteine tragen ihre Station; die Stationsliste wird daraus erzeugt (jede Leistung
 *  steht genau einmal). preis = Aufschlag netto/Monat, null = Preis auf Anfrage. Kundeneinfache Sprache, keine Fachbegriffe. */
export type StationId = 'aufmerksamkeit' | 'anfrage' | 'bearbeitung' | 'betreuung';
export const BEREICHE = {
  /** Headline + Unterzeile (Jamil 4811) */
  titel: 'Ein Kunde interessiert sich nicht für Ihre Systeme.',
  unter: 'Ein Kunde interessiert sich für das Erlebnis.',
  einleitung: 'Darum ordnen wir alles nach dem, was Ihr Kunde erlebt:',
  stationen: [
    { id: 'aufmerksamkeit', titel: 'Aufmerksamkeit', ziel: 'Gefunden werden und überzeugen' },
    { id: 'anfrage', titel: 'Anfrage', ziel: 'Anfragen sicher empfangen' },
    { id: 'bearbeitung', titel: 'Bearbeitung', ziel: 'Zügig und einheitlich antworten' },
    { id: 'betreuung', titel: 'Betreuung', ziel: 'Dranbleiben, ohne Aufwand' },
  ] as { id: StationId; titel: string; ziel: string }[],
  kennzeichen: { basis: 'Im Basispaket', zubuch: 'Zubuchbar', anfrage: 'Auf Anfrage' },
};

export const BAUKASTEN = {
  titel: 'Stellen Sie Ihr Abo zusammen',
  einleitung: 'Sie starten mit Ihrer Website und buchen nur dazu, was Sie wirklich brauchen. Der Monatspreis passt sich sofort an.',
  test: 'Testangebot. Die genauen Konditionen besprechen wir gern mit Ihnen.',
  basis: {
    name: 'Ihre Website', preis: 39.99,
    teile: [
      { text: 'Neue Website, passt auf Handy und PC', station: 'aufmerksamkeit' },
      { text: 'Vorab: Analyse und unsere Empfehlung für Sie', station: 'aufmerksamkeit' },
      { text: 'Kontaktformular und direkte Kontaktwege', station: 'anfrage' },
      { text: 'Änderungen per Text, Screenshot oder Sprachnachricht', station: 'betreuung', hinweis: 'Kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr).' },
      { text: 'Sichere Technik: Hosting in Deutschland, Updates und Sicherungen', station: 'betreuung' },
    ] as { text: string; station: StationId; hinweis?: string }[],
  },
  bausteine: [
    { id: 'google-profil', name: 'Google-Profil', text: 'Ihr Eintrag bei Google und Google Maps, eingerichtet und gepflegt: Fotos, Leistungen, Öffnungszeiten.', preis: 14.99, station: 'aufmerksamkeit' },
    { id: 'gefunden', name: 'Bei Google besser gefunden werden', text: 'Eigene Seiten für Ihre Orte und Leistungen, mit den Wörtern, nach denen Ihre Kunden suchen.', preis: 29.99, station: 'aufmerksamkeit' },
    { id: 'ki', name: 'In KI-Antworten auftauchen', text: 'Ihre Seite so aufbereitet, dass ChatGPT und andere KI-Assistenten Ihr Angebot richtig verstehen.', preis: 14.99, station: 'aufmerksamkeit' },
    { id: 'social', name: 'Social Media', text: 'Profile und Beiträge, passend zu Ihrem Auftritt.', preis: null, station: 'aufmerksamkeit' },
    { id: 'video', name: 'Video', text: 'Kurze Filme über Ihr Unternehmen und Ihre Arbeit.', preis: null, station: 'aufmerksamkeit' },
    { id: 'email', name: 'E-Mail-Postfächer mit Signatur', text: 'Bis zu 20 Postfächer mit Ihrer Adresse, eingerichtet, mit einheitlicher Signatur.', preis: 9.99, station: 'anfrage' },
    { id: 'termin', name: 'Online-Terminbuchung', text: 'Kunden buchen freie Termine direkt auf Ihrer Website.', preis: 19.99, station: 'anfrage' },
    { id: 'kunden', name: 'Kundenverwaltung', text: 'Alle Anfragen und Kunden an einem Ort, nichts geht verloren.', preis: null, station: 'anfrage' },
    { id: 'logo', name: 'Logo und Geschäftspapiere', text: 'Logo, Briefbogen, Angebot und Rechnung im gleichen Stil.', preis: 39.99, station: 'bearbeitung' },
    { id: 'ablaeufe', name: 'Abläufe automatisieren', text: 'Wiederkehrende Aufgaben laufen von allein, zum Beispiel Bestätigungen und Erinnerungen.', preis: null, station: 'bearbeitung' },
    { id: 'bericht', name: 'Monatsbericht', text: 'Jeden Monat kurz und verständlich: Besucher, Anfragen, Suchbegriffe.', preis: 9.99, station: 'betreuung' },
    { id: 'optimierung', name: 'Laufende Verbesserung', text: 'Wir verbessern jeden Monat, was Besucher zu Anfragen macht. Dazu alle drei Monate ein Gespräch.', preis: 49.99, station: 'betreuung' },
  ] as { id: string; name: string; text: string; preis: number | null; station: StationId }[],
  summeKopf: 'Ihr Abo',
  cta: 'Paket anfragen',
  ctaHinweis: 'Ihre Auswahl übernehmen wir in das Anfrageformular. Dort sehen Sie sie und können sie ändern.',
  laufzeit: '24 Monate Mindestlaufzeit, danach monatlich kündbar.',
};

/** Referenzen (Jamil 4876, Projekte WS-0002 bis WS-0006). WICHTIG: Name, Link und Bild NUR eintragen und freigegeben: true
 *  setzen, wenn der Kunde zugestimmt hat (öffentliches Repo!). Bis dahin anonym: Branche, Ausgangslage, Umsetzung, Ergebnis.
 *  Nur Belegtes, keine erfundenen Zahlen oder Zitate. motiv = Symbol in der stilisierten Vorschau. */
export const REFERENZEN = {
  titel: 'Beispiele aus unserer Arbeit',
  einleitung: 'Namen, Links und Bilder zeigen wir, sobald unsere Kunden zugestimmt haben. Bis dahin beschreiben wir die Projekte ohne Namen.',
  liste: [
    { freigegeben: false, branche: 'Handwerksbetrieb für Badsanierung', region: 'Schleswig-Holstein', status: 'online', motiv: 'bad',
      ausgang: 'Gesucht war ein Auftritt, der Leistungen, Preise und Ablauf einer Badsanierung verständlich zeigt.',
      gemacht: 'Website mit Kostenrechner, Anfrage für den Vor-Ort-Termin und Leistungsseiten, online unter eigener Domain.',
      ergebnis: 'Google Lighthouse am Handy: 98 von 100.' },
    { freigegeben: false, branche: 'Autolackiererei, Meisterbetrieb', region: 'Schleswig-Holstein', status: 'vorschau', motiv: 'lack',
      ausgang: 'Die bisherige Website sollte modernisiert werden, mit den vorhandenen Inhalten.',
      gemacht: 'Neue Website mit „Schaden melden“ in drei Schritten, per WhatsApp oder E-Mail.' },
    { freigegeben: false, branche: 'Dolmetscher und Übersetzer', region: 'Norddeutschland', status: 'vorschau', motiv: 'sprache',
      ausgang: 'Die bisherige Baukasten-Website sollte durch einen eigenen Auftritt ersetzt werden.',
      gemacht: 'Zweisprachige Website (Deutsch und Türkisch) mit Einsatzgebiet, Ablauf und Antworten auf häufige Fragen.',
      ergebnis: 'Google Lighthouse am Handy: 97 von 100 (Vorschau).' },
    { freigegeben: false, branche: 'Videograf', region: 'Hamburg', status: 'vorschau', motiv: 'film',
      ausgang: 'Die alte Website war schwer und langsam: Google Lighthouse 36 von 100.',
      gemacht: 'Neue Website mit Film im ersten Bildschirm, Projekten, Ablauf und Einsatzgebiet.' },
    { freigegeben: false, branche: 'Bildungsprojekt mit Erklärvideos', region: 'Deutschland', status: 'vorschau', motiv: 'wissen',
      ausgang: 'Ein neues Projekt brauchte einen ersten Auftritt.',
      gemacht: 'Website mit Team, Videos und häufigen Fragen, so aufbereitet, dass Google und KI-Assistenten sie gut verstehen.' },
  ] as { freigegeben: boolean; name?: string; url?: string; bild?: string; branche: string; region: string; status: 'online' | 'vorschau'; motiv: string; ausgang: string; gemacht: string; ergebnis?: string }[],
};

/** Abschnitt 5 (4790/4791): große Schlagworte, viel Weißraum, keine Icons */
export const VERLASSEN = {
  titel: 'Darauf können Sie sich verlassen',
  saetze: ['Wir übernehmen Verantwortung.', 'Wir denken mit.', 'Wir halten Dinge einfach.', 'Wir empfehlen nicht das Meiste.', 'Wir empfehlen das Richtige.'],
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
    /** Vorschlag bei „mittel“, passend zum Abo-Baukasten (Testangebot) */
    vorschlag: {
      fundament: 'Unser Vorschlag: das Basispaket „Ihre Website“.',
      wegweiser: 'Unser Vorschlag: Ihre Website mit „Google-Profil“ und „Bei Google besser gefunden werden“.',
      wahrzeichen: 'Unser Vorschlag: Ihre Website mit „Logo und Geschäftspapiere“.',
    } as Record<string, string>,
    wenig: 'Ehrlich gesagt: Sie sind gut aufgestellt. Unser Tipp:',
    individuell: 'Unser Vorschlag: ein Erstgespräch zu Ihren Abläufen, etwa Terminbuchung, Kundenverwaltung oder automatische Abläufe. Das ist ein individuelles Angebot.',
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
  service: 'Digitale Unternehmensabläufe für kleine und mittlere Unternehmen, von der ersten Aufmerksamkeit bis zum zufriedenen Kunden, aus einer Hand: neue Website mit Analyse und Empfehlung, Änderungen per Text, Screenshot oder Sprachnachricht; zubuchbar Google-Profil, bei Google besser gefunden werden, in KI-Antworten auftauchen, E-Mail-Postfächer, Online-Terminbuchung, Logo und Geschäftspapiere, Monatsbericht und laufende Verbesserung; Kundenverwaltung, automatische Abläufe, Social Media und Video auf Anfrage.',
};
