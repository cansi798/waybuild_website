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
  /** Jamil #4988/#4989 (08.11.2026): Erstberatung hier integriert, vierter Schritt „Verbessern“ */
  titel: 'Verstehen. Empfehlen. Umsetzen. Verbessern.',
  einleitung: 'Bevor wir Lösungen entwickeln, möchten wir verstehen:',
  liste: ['Ihr Unternehmen', 'Ihre Kunden', 'Ihre Ziele'],
  schluss: ['Denn gute Entscheidungen entstehen durch Verständnis.', 'Nicht durch Vermutungen.'],
  /** Karten, verdichtet aus Jamils Texten 4788/4795/4796 (Feedback 4868–4870: „zusammenfassen, sodass es Sinn macht“) */
  karten: <{ wort: string; leit: string; text: string; hinweis?: string }[]>[
    /* Verstehen = das kurze Gespräch der Erstberatung (Jamil #4989). Nur, was die Website schon zusagt (kontakt.astro:
     * „Antwort in 1 Werktag“, „20 Min. Erstgespräch“, „Kostenlos & unverbindlich“); Unternehmens-DNA wie im Auftrag beschrieben. */
    { wort: 'Verstehen', leit: 'Erst zuhören, dann handeln.',
      text: 'Sie senden eine Anfrage, wir melden uns innerhalb eines Werktags. Im kurzen Gespräch, kostenlos, unverbindlich und rund 20 Minuten, nehmen wir Ihre Unternehmens-DNA auf: was Sie ausmacht, wofür Sie stehen, wie Sie mit Kunden sprechen.' },
    { wort: 'Empfehlen', leit: 'Den sinnvollsten Weg, nicht den größten.', text: 'Wir sagen offen, was sich lohnt, und sprechen Risiken an.' },
    { wort: 'Umsetzen', leit: 'Wir kümmern uns. Sie bleiben informiert.', text: 'Eine Anfrage genügt, nichts geht verloren. Verzögert sich etwas, hören Sie es zuerst von uns.' },
    /* NEU (Jamil #4989 „Empfehlen und umsetzen, verbessern“): Text aus dem Baustein „Laufende Verbesserung“ (BAUKASTEN) */
    { wort: 'Verbessern', leit: 'Messen statt vermuten.', text: 'Jeden Monat werten wir aus, was Besucher tun, ändern gezielt 2 bis 3 Dinge und prüfen, ob es wirkt.',
      hinweis: 'Im Paket Komplett, im Paket Plus mit 1 Verbesserung im Monat' },
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
/** Abschnitt 4 (#loesungen): in welchem Paket eine Leistung steckt (Jamil #5056, Inhalte aus pakete-abo.ts).
 *  Schlüssel = Baustein-id aus BAUKASTEN; die Teile von BAUKASTEN.basis sind immer 'basis'. 'anfrage' = eigenes Angebot. */
export const PAKET_JE_LEISTUNG: Record<string, 'basis' | 'plus' | 'komplett' | 'anfrage'> = {
  'google-profil': 'plus', 'google-pflege': 'plus', gefunden: 'plus', ki: 'basis', 'ki-check': 'plus', social: 'komplett', video: 'anfrage',
  email: 'basis', termin: 'komplett', kunden: 'anfrage', logo: 'komplett', ablaeufe: 'anfrage', bericht: 'plus', optimierung: 'komplett',
};
export const BEREICHE = {
  /** Headline + Unterzeile (Jamil 4811) */
  titel: 'Ein Kunde interessiert sich nicht für Ihre Systeme.',
  unter: 'Ein Kunde interessiert sich für das Erlebnis.',
  einleitung: 'Darum ordnen wir alles nach dem, was Ihr Kunde erlebt:',
  /** Rethinking 08.11. („einladender“): Details je Leistung zum Aufklappen, statt alles auf einmal */
  hinweis: 'Bei jeder Leistung steht, in welchem Paket sie enthalten ist. Wählen Sie eine Leistung, um zu sehen, was dazugehört.',
  stationen: [
    { id: 'aufmerksamkeit', titel: 'Aufmerksamkeit', ziel: 'Gefunden werden und überzeugen' },
    { id: 'anfrage', titel: 'Anfrage', ziel: 'Anfragen sicher empfangen' },
    { id: 'bearbeitung', titel: 'Bearbeitung', ziel: 'Zügig und einheitlich antworten' },
    { id: 'betreuung', titel: 'Betreuung', ziel: 'Dranbleiben, ohne Aufwand' },
  ] as { id: StationId; titel: string; ziel: string }[],
};

/** dazu = „Was dazugehört“ in den vier Karten von Abschnitt 4 (Jamil 4909, 07.11.2026: Preise und „Im Basispaket“ dort
 *  entfernen, stattdessen auflisten, was dazugehört). NUR aus vorhandenen Texten: PAKETE/IN_ALLEN (site.ts), Leistungsseiten
 *  (leistungen.ts: business-website, website-relaunch, betreuung-pflege), FAQ (site.ts, branchen.ts), angebot.ts (Automatisierung),
 *  CHECK und VERSTEHEN (hier). Preise stehen nur im Baukasten darunter. */
/** ARCHIV-HINWEIS (Jamil #5056, 08.11.2026): Der Abo-Baukasten wird NICHT mehr angezeigt (ersetzt durch die drei Pakete,
 *  src/config/pakete-abo.ts). Die Daten bleiben hier, weil Abschnitt 4 (#loesungen) seine Leistungsliste samt „dazu“ daraus
 *  erzeugt (ohne Preise) und damit der Baukasten zurückgeholt werden kann (Komponente: archiv/baukasten-20261108/).
 *  Die Preise unten sind damit NICHT mehr gültig. */
/** Abo-Baukasten (Jamil 4879, TESTANGEBOT nur auf der Startseite). Preise NETTO zzgl. MwSt., Stand 08.11.2026
 *  (Jamil 4924/4925, Quelle Preisvergleich NC f/22843). Ein Baustein hat einen Monatspreis (`preis`), einen einmaligen
 *  Festpreis (`einmalig`) oder keinen von beiden (= auf Anfrage). `zu` = optionale Ergänzung, nur wählbar, wenn der
 *  Hauptbaustein mit dieser id gewählt ist (erscheint im Baukasten unter ihm; in Abschnitt 4 wird ihr `dazu` an den Hauptbaustein angehängt).
 *  /preise/, PAKETE/IN_ALLEN (site.ts), angebot.ts und AGB sind davon NICHT berührt. */
export type Baustein = { id: string; name: string; text: string; preis?: number; einmalig?: number; hinweis?: string; zu?: string; station: StationId; dazu: string[] };
export const BAUKASTEN = {
  titel: 'Stellen Sie Ihr Abo zusammen',
  einleitung: 'Sie starten mit Ihrer Website und buchen nur dazu, was Sie wirklich brauchen. Monatspreis und einmalige Kosten passen sich sofort an.',
  test: 'Testangebot. Die genauen Konditionen besprechen wir gern mit Ihnen.',
  basis: {
    name: 'Ihre Website', preis: 69.99,
    teile: [
      { text: 'Neue Website, passt auf Handy und PC', station: 'aufmerksamkeit',
        dazu: ['Keine Seitenbegrenzung', 'Optimiert für Handy, Tablet und PC', 'Texte schreiben wir mit Ihnen, KI-gestützt und von uns geprüft', 'Impressum und Datenschutzerklärung nach aktuellem Stand'] },
      { text: 'Vorab: Analyse und unsere Empfehlung für Sie', station: 'aufmerksamkeit',
        dazu: ['Erstgespräch: Wir lernen Ihr Unternehmen kennen', 'Analyse Ihrer bestehenden Website und Ihrer Google-Platzierungen', 'Gemeinsam klären wir Zielgruppen und Positionierung', 'Wir sagen offen, was sich lohnt'] },
      { text: 'Kontaktformular und direkte Kontaktwege', station: 'anfrage',
        dazu: ['Anfrage- und Kontaktformulare', 'Direkte Kontaktwege, zum Beispiel Anruf, E-Mail oder WhatsApp'] },
      { text: 'Änderungen per Text, Screenshot oder Sprachnachricht', station: 'betreuung', hinweis: 'Kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr).',
        dazu: ['Texte, Bilder, Öffnungszeiten, Team, Aktionen', 'Kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr)', 'Ein persönlicher Ansprechpartner', 'Im fairen Rahmen'] },
      { text: 'Sichere Technik: Hosting in Deutschland, Updates und Sicherungen', station: 'betreuung',
        dazu: ['Hosting in Deutschland, DSGVO-orientiert', 'SSL-Verschlüsselung und Domainverwaltung', 'Sicherheitsupdates, Überwachung und Backups', 'Läuft im Hintergrund, ohne Aufwand für Sie'] },
    ] as { text: string; station: StationId; hinweis?: string; dazu: string[] }[],
  },
  bausteine: [
    { id: 'google-profil', name: 'Google-Profil', text: 'Ihr Eintrag bei Google und Google Maps, eingerichtet mit Fotos, Leistungen und Öffnungszeiten.', einmalig: 199, station: 'aufmerksamkeit',
      dazu: ['Eintrag bei Google und Google Maps eingerichtet', 'Fotos, Leistungen und Öffnungszeiten eingetragen', 'Passend zu Ihrer Website'] },
    { id: 'google-pflege', name: 'Google-Profil pflegen', text: 'Wir halten Fotos, Leistungen und Öffnungszeiten in Ihrem Profil aktuell.', preis: 19.99, zu: 'google-profil', station: 'aufmerksamkeit',
      dazu: ['Laufend gepflegt: Fotos, Leistungen und Öffnungszeiten bleiben aktuell'] },
    { id: 'gefunden', name: 'Bei Google besser gefunden werden', text: 'Bis zu 5 eigene Seiten für Ihre Orte und Leistungen, mit den Wörtern, nach denen Ihre Kunden suchen.', einmalig: 390, hinweis: 'Jede weitere Seite 69 €.', station: 'aufmerksamkeit',
      dazu: ['Wir finden heraus, wonach Ihre Kunden suchen, und richten Ihre Seiten gezielt darauf aus', 'Ihr Google-Profil wird mit der Website verknüpft, damit Sie vor Ort besser gefunden werden'] },
    { id: 'ki', name: 'In KI-Antworten auftauchen', text: 'Ihre Seite so aufbereitet, dass ChatGPT und andere KI-Assistenten Ihr Angebot richtig verstehen.', einmalig: 190, station: 'aufmerksamkeit',
      dazu: ['Ihre Seite so aufbereitet, dass ChatGPT und andere KI-Assistenten Ihr Angebot richtig verstehen', 'In leichter Sprache erklärt, was wir dafür tun'] },
    { id: 'ki-check', name: 'Monatlicher KI-Check', text: 'Wir prüfen jeden Monat, ob KI-Assistenten Ihr Unternehmen richtig nennen.', preis: 14.99, zu: 'ki', station: 'aufmerksamkeit',
      dazu: ['Jeden Monat geprüft, ob KI-Assistenten Ihr Unternehmen richtig nennen'] },
    { id: 'social', name: 'Social Media', text: 'Profile und Beiträge, passend zu Ihrem Auftritt.', station: 'aufmerksamkeit',
      dazu: ['Profile eingerichtet, zum Beispiel bei Instagram, Facebook oder LinkedIn', 'Passend zu Ihrem Auftritt gestaltet', 'Regelmäßige Beiträge auf Anfrage'] },
    { id: 'video', name: 'Video', text: 'Kurze Filme über Ihr Unternehmen und Ihre Arbeit.', station: 'aufmerksamkeit',
      dazu: ['Kurze Filme über Ihr Unternehmen und Ihre Arbeit'] },
    { id: 'email', name: 'E-Mail-Postfächer mit Signatur', text: 'Bis zu 20 Postfächer mit Ihrer Adresse, eingerichtet, mit einheitlicher Signatur.', preis: 9.99, station: 'anfrage',
      dazu: ['Bis zu 20 Postfächer mit Ihrer Adresse', 'Fertig eingerichtet', 'Einheitliche E-Mail-Signatur nach DIN 5008'] },
    { id: 'termin', name: 'Online-Terminbuchung', text: 'Kunden buchen freie Termine direkt auf Ihrer Website.', preis: 24.99, station: 'anfrage',
      dazu: ['Kunden buchen freie Termine direkt auf Ihrer Website', 'Rund um die Uhr', 'Ein bestehendes Buchungssystem lässt sich einbinden'] },
    { id: 'kunden', name: 'Kundenverwaltung', text: 'Alle Anfragen und Kunden an einem Ort, nichts geht verloren.', station: 'anfrage',
      dazu: ['Alle Anfragen und Kunden an einem Ort', 'Statt verteilt auf E-Mail, Handy und Zettel'] },
    { id: 'logo', name: 'Logo und Geschäftspapiere', text: 'Logo, Briefbogen, Angebot und Rechnung im gleichen Stil.', einmalig: 790, station: 'bearbeitung',
      dazu: ['Logo: 3 Entwürfe, 2 Korrekturrunden, Dateien für Web und Druck', 'Briefbogen, Angebot und Rechnung nach DIN 5008, im gleichen Stil', 'Kurzer Leitfaden: Farben, Schriften, Logo-Einsatz'] },
    { id: 'ablaeufe', name: 'Abläufe automatisieren', text: 'Wiederkehrende Aufgaben laufen von allein, zum Beispiel Bestätigungen und Erinnerungen.', station: 'bearbeitung',
      dazu: ['Wiederkehrende Aufgaben laufen von allein', 'Zum Beispiel Bestätigungen und Erinnerungen', 'Daten fließen zwischen Ihren Programmen, statt abgetippt zu werden'] },
    { id: 'bericht', name: 'Monatsbericht', text: 'Jeden Monat kurz und verständlich: Besucher, Anfragen, Suchbegriffe.', preis: 19.99, station: 'betreuung',
      dazu: ['Besucher, Anfragen, Suchbegriffe', 'Jeden Monat, kurz und verständlich'] },
    { id: 'optimierung', name: 'Laufende Verbesserung', text: 'Jeden Monat werten wir aus, was Besucher tun, ändern 2 bis 3 Dinge und prüfen, ob es wirkt. Alle drei Monate ein Gespräch.', preis: 99.99, station: 'betreuung',
      dazu: [
        'Jeden Monat werten wir aus, woher Ihre Besucher kommen, wo sie abspringen und welche Seiten Anfragen bringen.',
        'Daraus ändern wir jeden Monat 2 bis 3 Dinge nach Absprache, zum Beispiel einen klareren Knopf, einen kürzeren Weg zum Kontakt oder eine neue Antwort in den häufigen Fragen.',
        'Nach einem Monat prüfen wir, ob es etwas gebracht hat. Wenn nicht, ändern wir es zurück oder versuchen etwas anderes.',
        'Alle drei Monate ein Gespräch: Was hat sich getan, was ist als Nächstes dran?',
        'Im Paket Plus: 1 Verbesserung im Monat am Weg bis zur Anfrage',
      ] },
  ] as Baustein[],
  summeKopf: 'Ihr Abo',
  cta: 'Paket anfragen',
  ctaHinweis: 'Ihre Auswahl übernehmen wir in das Anfrageformular. Dort sehen Sie sie und können sie ändern.',
  laufzeit: '24 Monate Mindestlaufzeit, danach monatlich kündbar.',
  /** Präzisierung (08.11.): die Website selbst ohne Einrichtungskosten, Zusatzleistungen teils einmalig */
  einrichtung: 'Die Website selbst ohne Einrichtungskosten. Einmalige Zusatzleistungen mit Festpreis.',
  einmaligLabel: 'einmalig, Festpreis',
};

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

/* „So läuft die Erstberatung“ (Jamil #4934 Punkt 5) ist seit 08.11.2026 (Jamil #4988/#4989) Teil von VERSTEHEN
 * (Schritt „Verstehen“ = das kurze Gespräch); eigener Abschnitt entfernt, Anker #erstberatung sitzt jetzt auf dieser Karte. */

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
