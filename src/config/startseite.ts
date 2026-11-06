// Startseite „Unternehmensauftritt“ (Jamil, Talk qh87y3sj 4768, 06.11.2026), nach Website Rethinking
// (NC Projekte/waybuild/Website/Rethinking_Unternehmensauftritt_2026-11-06). Ersetzt die „Besucherreise“ vom 05.11.
// Texte im Kern WÖRTLICH aus Jamils Konzept. Abweichungen sind unten mit „Rethinking:“ markiert und begründet.
// 14 Abschnitte: 1 Hero · 2 Erster Eindruck · 3 Preis eines schwachen Auftritts · 4 Besser als ihr Auftritt
//   · 5 Nicht mit Design beginnen · 6 Arbeitsweise · 7 Lösungen · 8 Zusammenarbeit · 9 Kundenstimmen (nur echte)
//   · 10 Vorher/Nachher · 11 Überzeugung · 12 Ergebnis · 13 Check · 14 Abschluss
// Preise/Pakete NICHT hier, sondern immer aus PAKETE in site.ts (Verknüpfung in index.astro).
// Die alte Startseite (vor dem 05.11.) steht unverändert unter /hauptseite-alt/.

/** Name oben in der Kopfzeile der Startseite. An einer Stelle änderbar. */
export const MARKE = 'rethink.website';

/** Kontaktseite mit vorbelegtem Anliegen (Feld „paket“ geht in den Betreff der Anfrage, Interesse = Website, max. 60 Zeichen). */
export const ANLIEGEN = {
  erstberatung: { label: 'Kostenfreie Erstberatung', paket: 'Kostenfreie Erstberatung' },
  analyse: { label: 'Kostenlose Analyse anfordern', paket: 'Kostenlose Analyse' },
  bewerten: { label: 'Unternehmensauftritt bewerten lassen', paket: 'Unternehmensauftritt bewerten lassen' },
  dna: { label: 'Über Unternehmens-DNA sprechen', paket: 'Unternehmens-DNA' },
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
  titel: 'Gute Arbeit überzeugt erst dann, wenn man sie erkennt.',
  unter: 'Wir entwickeln Unternehmensauftritte, die Vertrauen schaffen, Orientierung geben und Kaufentscheidungen erleichtern.',
  cta: 'Unternehmensauftritt bewerten',
  cta2: 'Unsere Denkweise kennenlernen',
  kern: 'Unternehmensauftritt',
  botschaft: ['Ein guter Eindruck entsteht nicht durch eine Website.', 'Er entsteht durch das Zusammenspiel aller Berührungspunkte.'],
};

export const EINDRUCK = {
  titel: 'Der erste Eindruck entsteht lange vor dem ersten Gespräch',
  einleitung: 'Bevor Menschen Kontakt aufnehmen, haben sie oft bereits eine Entscheidung getroffen.',
  schritte: [
    'Sie besuchen Ihre Website.',
    'Sie sehen Ihr Google-Profil.',
    'Sie lesen Bewertungen.',
    'Sie vergleichen Alternativen.',
    'Sie prüfen, ob Ihr Unternehmen vertrauenswürdig wirkt.',
  ],
  minuten: 'Innerhalb weniger Minuten entsteht ein Eindruck.',
  frageKopf: 'Die entscheidende Frage:',
  frage: 'Entspricht dieser Eindruck der Qualität Ihrer Arbeit?',
  /** Rethinking: statt ✅/❌-Emojis gezeichnete Zeichen (einheitlich, für Screenreader benannt) */
  ende: ['Vertrauen', 'Unsicherheit'],
  kurzKopf: 'Kurz zusammengefasst',
  kurz: ['Menschen entscheiden nicht erst im Gespräch.', 'Sie bilden sich ihren Eindruck schon vorher.'],
};

export const PREIS = {
  titel: 'Der Preis eines schwachen Auftritts',
  text: [
    'Viele Unternehmen verlieren Chancen, ohne es zu bemerken.',
    'Nicht weil ihre Leistung schlecht ist.',
    'Sondern weil ihr Auftritt keine ausreichenden Gründe liefert, Vertrauen aufzubauen.',
  ],
  folgeKopf: 'Die Folge:',
  folgen: ['weniger Anfragen', 'mehr Preisvergleiche', 'längere Entscheidungsprozesse', 'verlorene Chancen'],
  /** Animation: Besucher kommen auf die Website und gehen wieder */
  buehne: 'Ihre Website',
  keine: ['Keine Anfrage.', 'Keine Bewertung.', 'Kein Kontakt.', 'Keine Sichtbarkeit.'],
  leitgedanke: 'Was nicht verstanden wird, wird selten gekauft.',
};

export const LUECKE = {
  titel: 'Viele Unternehmen sind besser als ihr Auftritt',
  text: ['Wir erleben regelmäßig Unternehmen mit hervorragender Arbeit.', 'Doch ihr Auftritt beantwortet die wichtigsten Fragen nicht.'],
  fragenKopf: 'Besucher verstehen nicht sofort:',
  fragen: ['Was wird angeboten?', 'Warum gerade dieses Unternehmen?', 'Warum kann man vertrauen?', 'Was sollte ich jetzt tun?'],
  links: 'Unternehmen',
  rechts: 'Interessent',
  schluss: ['Dadurch entsteht Unsicherheit.', 'Und Unsicherheit verhindert Entscheidungen.'],
  /** Rethinking: Zwischenruf zum Check, damit niemand bis zum Ende scrollen muss */
  zwischenruf: 'Wie ist das bei Ihnen?',
  zwischenrufLink: 'Zum Unternehmensauftritt-Check',
};

export const DESIGN = {
  titel: 'Deshalb beginnen wir nicht mit Design',
  unter: 'Wir beginnen mit Verständnis.',
  einleitung: 'Bevor wir Empfehlungen aussprechen, möchten wir verstehen:',
  fragen: [
    'Wer sind Ihre Kunden?',
    'Warum entscheiden sie sich für Ihr Unternehmen?',
    'Welche Fragen stellen sie?',
    'Welche Einwände haben sie?',
    'Was macht Sie besonders?',
  ],
  danach: 'Erst danach sprechen wir über Inhalte, Design oder Funktionen.',
  sichtbar: 'Website',
  unsichtbar: ['Zielgruppe', 'Vertrauen', 'Positionierung', 'Kaufmotive', 'Erwartungen', 'Kommunikation'],
  botschaft: ['Gute Websites entstehen nicht durch Design.', 'Sie entstehen durch Verständnis.'],
};

export const ARBEITSWEISE = {
  titel: 'Unsere Arbeitsweise',
  karten: [
    { titel: 'Verstehen', text: ['Wir lernen Ihr Unternehmen und Ihre Kunden kennen.'] },
    { titel: 'Empfehlen', text: ['Wir zeigen den Weg, den wir für sinnvoll halten.'], betont: ['Nicht den einfachsten.', 'Nicht den teuersten.', 'Den richtigen.'] },
    { titel: 'Umsetzen', text: ['Erst dann entsteht Ihr Unternehmensauftritt.'], betont: ['Klar.', 'Professionell.', 'Durchdacht.'] },
  ] as { titel: string; text: string[]; betont?: string[] }[],
};

export const LOESUNGEN = {
  titel: 'Unsere Lösungen',
  kern: 'Eine Denkweise',
  botschaft: 'Alles basiert auf derselben Denkweise.',
  auftritt: { titel: 'Unternehmensauftritt', text: 'Alles wirkt wie aus einem Guss.' },
  analyse: {
    titel: 'Website-Analyse',
    text: 'Verstehen, wie Ihr Unternehmen aktuell wahrgenommen wird.',
    /** Rethinking: „kostenlos“ nach Jamils Knopf „Kostenlose Analyse anfordern“ (Abschnitt 13) */
    info: 'Kostenlos. Einen ersten Eindruck gibt Ihnen der Check weiter unten.',
  },
  dna: {
    titel: 'Unternehmens-DNA',
    text: 'Die Grundlage für klare Entscheidungen.',
    /** Rethinking [Annahme, offen bei Jamil]: Inhalt aus Abschnitt 5 abgeleitet, Preis noch nicht festgelegt */
    info: 'Wir halten fest, wer Ihre Kunden sind, warum sie sich für Sie entscheiden und was Sie besonders macht. Individuell, auf Anfrage.',
  },
  weiter: { titel: 'Laufende Weiterentwicklung', text: 'Ihr Unternehmen entwickelt sich. Ihr Auftritt sollte das ebenfalls tun.' },
};

export const ZUSAMMENARBEIT = {
  /** Rethinking: statt „Was Kunden besonders schätzen“ (ohne freigegebene Kundenstimmen wäre das eine Behauptung) */
  titel: 'Was gute Zusammenarbeit ausmacht',
  einleitung: ['Gute Zusammenarbeit spart Zeit.', 'Deshalb legen wir Wert auf:'],
  szenenKopf: 'So sieht das im Alltag aus',
  /** Rethinking: „echte Szenen statt Icons“ als kurze Alltagssituationen, passend zu unseren Leistungen
   *  (fester Ansprechpartner, Antwort spätestens am nächsten Werktag, Änderungen per Sprachnachricht). Fotos folgen. */
  punkte: [
    { titel: 'Klare Kommunikation', szene: 'Sie bekommen eine Antwort in ganzen Sätzen. Ohne Fachbegriffe, mit einem klaren nächsten Schritt.' },
    { titel: 'Verständliche Empfehlungen', szene: 'Statt zehn Möglichkeiten hören Sie: Das empfehlen wir, und das ist der Grund.' },
    { titel: 'Feste Ansprechpartner', szene: 'Sie rufen an und sprechen mit derselben Person wie beim letzten Mal. Sie müssen nichts neu erklären.' },
    { titel: 'Wenig Abstimmungsaufwand', szene: 'Eine Sprachnachricht mit Ihrer Änderung genügt. Den Rest erledigen wir.' },
    { titel: 'Schnelle Rückmeldungen', szene: 'Sie schreiben am Vormittag. Spätestens am nächsten Werktag haben Sie eine Antwort.' },
    { titel: 'Sichtbarer Fortschritt', szene: 'Nach jedem Schritt wissen Sie, was erledigt ist und was als Nächstes kommt.' },
  ],
};

/** Abschnitt 9: NUR echte, freigegebene Stimmen (Name + Unternehmen). Solange leer, wird der Abschnitt nicht gezeigt.
 *  Beispiel-Eintrag: { zitat: '…', name: 'Vorname Nachname', firma: 'Firma GmbH', rolle: 'Inhaber' } */
export const STIMMEN: { zitat: string; name: string; firma: string; rolle?: string }[] = [];

export const VORHER_NACHHER = {
  titel: 'Vorher / Nachher',
  unter: 'Der erste Fall: unser eigener Auftritt.',
  einleitung: 'Kundenprojekte und Kundenstimmen zeigen wir hier, sobald unsere Kunden sie freigegeben haben. Den ersten Fall können Sie schon heute selbst prüfen: unsere eigene Startseite.',
  alt: { kopf: 'Alter Auftritt', text: 'Pakete und Preise ganz oben, viele Fachbegriffe, die Vision vor dem Nutzen.', link: 'Alte Startseite ansehen' },
  neu: { kopf: 'Neuer Auftritt', text: 'Erst die Fragen des Besuchers, dann die Lösung, dazu ein Check zum Mitmachen.', link: 'Sie sind gerade hier' },
  fall: [
    { kopf: 'Ausgangssituation', text: 'Die alte Startseite zählte vor allem Leistungen und Preise auf. Wer uns nicht kannte, erfuhr spät, wie wir arbeiten und warum.' },
    { kopf: 'Erkenntnis', text: 'Besucher entscheiden über Vertrauen, nicht über Funktionen. Sie wollen zuerst wissen, ob wir ihre Lage verstehen.' },
    { kopf: 'Umsetzung', text: 'Wir haben die Seite mit unserer Methode Website Rethinking aus Sicht des Besuchers neu aufgebaut: Problem, Haltung, Lösung, Nachweis, Check.' },
    { kopf: 'Ergebnis', text: 'Die Seite lädt am Handy deutlich schneller: Google Lighthouse mobil vorher 58, jetzt über 90 von 100 Punkten (gemessen im November 2026). Wie sich die Anfragen entwickeln, messen wir in den nächsten Monaten.' },
  ],
};

export const UEBERZEUGUNG = {
  titel: 'Unsere Überzeugung',
  satz: 'Verantwortung ist wichtiger als Technik.',
  einleitung: 'Wir liefern nicht nur Ergebnisse.',
  verben: ['Wir denken mit.', 'Wir hinterfragen.', 'Wir empfehlen.', 'Wir begleiten.'],
  schluss: 'Denn gute Lösungen entstehen durch bessere Entscheidungen.',
  botschaft: 'Wir übernehmen die Komplexität.',
};

export const ERGEBNIS = {
  titel: 'Das Ergebnis',
  einleitung: 'Ein professioneller Unternehmensauftritt schafft:',
  wirkungen: ['Vertrauen', 'Orientierung', 'Wiedererkennung', 'Klarheit', 'bessere Entscheidungen'],
  kern: 'Vertrauen',
};

/** Abschnitt 13: 10 Fragen in 5 Bereichen (je 2). Jamils 5 Beispielfragen + 5 ergänzt (Rethinking). Ja 10 · Teilweise 5 · Nein 0. */
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

export const ABSCHLUSS = {
  titel: 'Wir übernehmen die Komplexität. Sie behalten den Fokus.',
  text: ['Ein professioneller Unternehmensauftritt entsteht nicht durch einzelne Maßnahmen.', 'Er entsteht dann, wenn alles zusammenpasst.', 'Genau dabei unterstützen wir.'],
  cta: 'Unternehmensauftritt bewerten lassen',
  unterCta: 'Kurzes Gespräch. Klare Einschätzung. Konkrete Empfehlungen.',
};

/** Für Meta-Description, JSON-LD und llms.txt */
export const BOTSCHAFT = {
  titel: 'Unternehmensauftritt, der Vertrauen schafft',
  description: 'Gute Arbeit überzeugt erst, wenn man sie erkennt: Website, Google-Profil, E-Mails und Geschäftspapiere als ein Auftritt, der Vertrauen schafft.',
  service: 'Unternehmensauftritte für kleine und mittlere Unternehmen: Website, Google-Profil, E-Mail-Postfächer, Signatur, Briefvorlage, Logo und Geschäftspapiere aus einer Hand. Erst verstehen, dann empfehlen, dann umsetzen; fester Ansprechpartner und laufende Weiterentwicklung im festen Monatspreis.',
};
