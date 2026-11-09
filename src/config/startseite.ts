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
  /* Zielgruppenzeile „Für kleine und mittlere Unternehmen“ im Hero entfernt (Jamil #4984/#4985, 08.11.2026) */
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

/* Abschnitt 3 „Verstehen. Empfehlen. Umsetzen. Verbessern.“ (VERSTEHEN, Jamil 4788/4795/4796, #4988/#4989) am 09.11.2026 entfernt:
 * ersetzt durch „So gehen wir vor“ nach der Kundenreise (Jamil, Talk qh87y3sj #5188/#5190; Texte src/config/vorgehen.ts).
 * Sicherung: Branch vor-so-gehen-wir-vor-20261109. */

/* Abschnitt „Einzelne Lösungen funktionieren.“ (BAUSTEINE) und Abschnitt 4 „Ein Kunde interessiert sich nicht für Ihre Systeme.“
 * (#loesungen: BEREICHE, PAKET_JE_LEISTUNG) am 09.11.2026 entfernt (Jamil, Talk qh87y3sj #5181–#5187: doppelt zur neuen Kundenreise
 * nach dem Hero, Texte in src/config/variante.ts KUNDENREISE). Die Daten des früheren Abo-Baukastens (BAUKASTEN) liegen seitdem bei
 * der archivierten Komponente: archiv/baukasten-20261108/baukasten-daten.ts. Sicherung: Branch vor-kundenreise-20261109. */

/** Referenzen (Jamil 4876, Projekte WS-0002 bis WS-0006). Seit 08.11.2026 MIT NAMEN: Jamil Talk qh87y3sj #4932
 *  („Alle unsere Kundenprojekte dürfen wir als Referenzen nennen.“). Regeln: nur Belegtes (Impressum/Config der Kunden-Repos,
 *  eigene Messungen mit Datum), keine erfundenen Zahlen oder Zitate, Personennamen nur als Teil des Firmen-/Markennamens,
 *  keine Porträtfotos von Kunden. Link NUR bei status 'online'; Vorschau-Adressen sind nicht für Besucher gedacht.
 *  bild = Bildschirmfoto der Kunden-Startseite (1440 × 900, 08.11.2026) unter src/assets/bilder/referenzen/.
 *  Ohne name/bild wird die Karte anonym mit stilisierter Vorschau (motiv) gezeigt. */
export type Referenz = { name?: string; url?: string; urlText?: string; bild?: string; branche: string; ort?: string; status: 'online' | 'vorschau'; motiv: string; ausgang: string; gemacht: string; ergebnis?: string };
export const REFERENZEN = {
  titel: 'Beispiele aus unserer Arbeit',
  einleitung: 'Echte Projekte unserer Kunden. Was noch nicht online ist, kennzeichnen wir ehrlich als Vorschau.',
  etikett: { online: 'Online', vorschau: 'Vorschau' } as Record<Referenz['status'], string>,
  /** Erklärung der Messwerte unter den Karten */
  messung: 'Gemessen am 08.11.2026 mit Google Lighthouse, einem kostenlosen Prüfwerkzeug von Google, in der Handy-Einstellung. Jeweils der mittlere von drei Durchläufen. Leistung und Barrierefreiheit werden von 0 bis 100 bewertet.',
  liste: [
    { name: 'Bauwelt Handwerk', branche: 'Badsanierung und Sanierung', ort: 'Norderstedt', status: 'online', motiv: 'bad', bild: 'referenzen/bauwelt',
      url: 'https://www.bauwelt-handwerk.de/', urlText: 'bauwelt-handwerk.de',
      ausgang: 'Gesucht war ein Auftritt, der Leistungen, Preise und Ablauf einer Badsanierung verständlich zeigt.',
      gemacht: 'Website mit Kostenrechner, Anfrage für den Vor-Ort-Termin und Leistungsseiten, online unter eigener Domain.',
      ergebnis: 'Google Lighthouse am Handy: Leistung 93, Barrierefreiheit 100 von 100.' },
    { name: 'Destar Lackdoktor', branche: 'Autolackiererei, Meisterbetrieb', ort: 'Norderstedt', status: 'vorschau', motiv: 'lack', bild: 'referenzen/destar',
      ausgang: 'Die bisherige Website sollte modernisiert werden, mit den vorhandenen Inhalten.',
      gemacht: 'Neue Website mit „Schaden melden“ in drei Schritten, per WhatsApp oder E-Mail.',
      ergebnis: 'Datenmenge der Startseite von 1,7 MB auf 0,18 MB gesenkt. Hauptinhalt am Handy nach 1,8 statt 11,1 Sekunden sichtbar (alte Website gegen Vorschau).' },
    { name: 'Kerim Tanrikulu', branche: 'Dolmetscher und Übersetzer für Türkisch', ort: 'Hamburg', status: 'vorschau', motiv: 'sprache', bild: 'referenzen/kerim',
      ausgang: 'Die bisherige Baukasten-Website sollte durch einen eigenen Auftritt ersetzt werden.',
      gemacht: 'Zweisprachige Website (Deutsch und Türkisch) mit Einsatzgebiet, Ablauf und Antworten auf häufige Fragen.',
      ergebnis: 'Google Lighthouse am Handy: Leistung 95, Barrierefreiheit 100 von 100 (Vorschau).' },
    { name: 'Funkelfilm', branche: 'Unternehmensfilme, Videograf', ort: 'Hamburg', status: 'vorschau', motiv: 'film', bild: 'referenzen/funkelfilm',
      ausgang: 'Die alte Website war schwer und langsam: fast 48 MB Daten schon beim Öffnen der Startseite.',
      gemacht: 'Neue Website mit Film im ersten Bildschirm, Projekten, Ablauf und Einsatzgebiet.',
      ergebnis: 'Google Lighthouse am Handy: Leistung 40 (alte Website) und 84 (Vorschau). Datenmenge 47,8 MB statt jetzt 1,0 MB.' },
    { name: 'ilm me up', branche: 'Unabhängige Medienplattform für Wissen', status: 'vorschau', motiv: 'wissen', bild: 'referenzen/ilmmeup',
      ausgang: 'Ein neues Projekt brauchte einen ersten Auftritt.',
      gemacht: 'Website mit Team, Videos und häufigen Fragen, so aufbereitet, dass Google und KI-Assistenten sie gut verstehen.',
      ergebnis: 'Google Lighthouse am Handy: Leistung 89, Barrierefreiheit 100 von 100 (Vorschau).' },
  ] as Referenz[],
};

/** Preis früh (Jamil #4934 Punkt 4): Zeile im ersten Bildschirm. Betrag seit 08.11.2026 (Jamil #5056) aus
 *  aboPreisAb() in pakete-abo.ts (günstigstes Paket), Link zum Preisteil #pakete. */
export const PREIS_FRUEH = { vor: 'Ihre Website ab', nach: 'im Monat', zusatz: 'netto zzgl. MwSt.', link: 'Pakete ansehen' };

/** „Wer hinter waybuild steht“ (Jamil #4934 Punkt 2: „erstmal für die Testseite erfinden“). BEWUSST NUR PLATZHALTER:
 *  keine KI-Gesichter, keine erfundenen Selbstbeschreibungen. Echt sind nur Namen und Rollen (Can: Geschäftsführer laut
 *  Impressum/site.ts; Jamil: „Key Account & Process Manager“ laut seiner E-Mail-Signatur). Wird nur in der Vorschau
 *  gezeigt (SHOW_HINTS + PUBLIC_PREVIEW), rot gestrichelt; offen in der Checkliste (launch.ts). */
export const TEAM = {
  titel: 'Wer hinter waybuild steht',
  einleitung: 'Sie sprechen mit Menschen, nicht mit einer Hotline.',
  platzhalter: 'Platzhalter',
  fotoFolgt: 'Foto folgt',
  personen: [
    { name: 'Can Siebert', rolle: 'Geschäftsführer', kuerzel: 'CS', text: 'Beispieltext: Hier stellt sich Can bald in ein bis zwei Sätzen selbst vor.' },
    { name: 'Jamil Iqbal', rolle: 'Key Account & Process Manager', kuerzel: 'JI', text: 'Beispieltext: Hier stellt sich Jamil bald in ein bis zwei Sätzen selbst vor.' },
  ],
};

/** Kundenstimmen (Jamil #4934 Punkt 3). BEWUSST NUR PLATZHALTER: keine erfundenen Zitate, keine Kundennamen, keine Sterne
 *  (erfundene Bewertungen wären irreführend, UWG). Nur in der Vorschau sichtbar, rot gestrichelt; offen in der Checkliste. */
export const STIMMEN = {
  titel: 'Was unsere Kunden sagen',
  platzhalter: 'Platzhalter',
  zitat: 'Beispiel: Hier steht bald ein echtes Zitat unserer Kunden.',
  quellen: ['Kundenstimme folgt (z. B. Handwerk)', 'Kundenstimme folgt (z. B. Dienstleistung)', 'Kundenstimme folgt (z. B. Kreativbranche)'],
};

/* „So läuft die Erstberatung“ (Jamil #4934 Punkt 5): Anker #erstberatung sitzt seit 09.11.2026 auf Schritt 1 („Verstehen“)
 * von „So gehen wir vor“ (src/config/vorgehen.ts). */

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
    /** Vorschlag bei „mittel“ (Jamil #5056): ein Paket aus pakete-abo.ts statt Bausteinen. Check.astro hängt Name und
     *  Monatspreis bzw. die Einmalpreise an; hier stehen nur die Begründungen. „basis-auftritt“ = Basis + Logo und
     *  Geschäftspapiere einmalig (für „Ein einheitlicher Auftritt“, ohne gleich das größte Paket zu empfehlen). */
    vorschlag: {
      basis: 'Website, Suchmaschinen-Optimierung beim Erstellen und E-Mail-Postfächer reichen Ihnen für den Anfang.',
      plus: 'Damit richten wir Ihr Google-Profil ein, optimieren Ihre Seiten für die Suchen Ihrer Kunden und verbessern jeden Monat den Weg bis zur Anfrage.',
      'basis-auftritt': 'Für einen einheitlichen Auftritt buchen Sie einmalig dazu:',
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
