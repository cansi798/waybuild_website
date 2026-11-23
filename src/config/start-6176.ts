import { ABO_PAKETE, KOMPLETTPAKET, aboPreisAb } from './pakete-abo';
// STARTSEITE, neues Konzept von Jamil (Talk qh87y3sj #6176, 16.11.2026; Sicherung davor: Tag vor-jamil-6176-20261116).
// Hier stehen die Punkte 1–3 WÖRTLICH von Jamil (Jamil #6176): 1 Hero, 2 Problem, 3 Lösung. Punkte 4–8 + Abschluss-CTA wörtlich aus
// Jamil #6179 (16.11.2026), weiter unten. FAQ (9) bleibt unverändert (#6177). Komponenten: src/components/start6176/, Stil: src/styles/start-6176.css.
// „Sofort verständlich. Keine Erklärung nötig.“ ist Jamils Gestaltungsziel für das Hero-Visual, steht bewusst NICHT auf der Seite.

/** Schalter für die bisherigen Abschnitte, die durch die Punkte 1–3 doppelt wären (Jamil #6176). Nicht gelöscht, nur ausgeblendet,
 *  damit Punkte 4–8 sie später ersetzen oder zurückholen können. true = wieder sichtbar (an der alten Stelle, nach den neuen Abschnitten).
 *  - heroAlt:    alter Hero „Ihre Website im Abo …“ (V_HERO in variante.ts) samt Stapel-Effekt; doppelt zu 1 (zwei H1 wären falsch)
 *  - wegeAlt:    „Ganz gleich, wo Sie gerade stehen.“ (SnWege); doppelt zu 1/3 (Website, Änderung, WebApp)
 *  - problemAlt: „Kommt Ihnen das bekannt vor?“ (SnProblem); doppelt zu 2 */
export const ALT_ZEIGEN = {
  heroAlt: false, wegeAlt: false, problemAlt: false,
  // ab Jamil #6179 (Punkte 4–8 + Abschluss) ebenfalls ausgeblendet, weil ersetzt oder nicht mehr in Jamils Seitenaufbau:
  phasenAlt: false, // „Lösungen für jede Unternehmensphase“ (SnPhasen) → ersetzt durch 5 „Website heute. Mehr morgen.“
  systemAlt: false, // „Website und Web-App zusammen“ (SnSystem) → ersetzt durch 4/5
  vergleichAlt: false, // Vergleich (SnVergleich) → ersetzt durch 4 „Was webgold anders macht“
  teamAlt: false, // Can + Jamil (SnTeam, nur Vorschau) → nicht in Jamils Aufbau
  beweisAlt: false, // „Beispiele aus unserer Arbeit“ (SnBeweis) → ersetzt durch 7 Referenzen
  bewertungenAlt: false, // Bewertungs-Platzhalter (SnBewertungen, nur Vorschau) → nicht in Jamils Aufbau
  ablaufAlt: false, // „So geht es los“ (SnAblauf) → ersetzt durch 6 Prozessberatung
  abschlussAlt: false, // alter Abschluss (SnAbschluss) → ersetzt durch Abschluss-CTA #6179
  // ab Jamil #6207/#6208 (18.11.2026): in Abschnitt 4 ersetzt „Zwei Wege“ + 4 Vorteilskarten die Vergleichstabelle (J_ANDERS.zeilen)
  andersTabelleAlt: false, // Tabelle „Klassische Agentur | webgold“ (#6179) → true = wieder unter den Vorteilen sichtbar
  // ab Jamil #6369/#6370 (19.11.2026, Sicherung davor: Tag vor-jamil-6366-20261119): Hero-Visual = Animation „Anfrage → Dashboard“
  heroBeispieleAlt: false, // drei Beispiel-Karten im Hero (#6192, J_HERO.beispiele) → true = statt der Animation wieder sichtbar
  // ab Jamil #6372–#6379 (19.11.2026): Abschnitt 2 + 3 neu (J_PROBLEM_NEU, J_MASS); die bisherigen Inhalte bleiben abrufbar:
  problem6198Alt: false, // Problem-Abschnitt #6198 (J_PROBLEM: Überschrift, Subheadline, 4 Karten, Abschlusszeile) → true = statt der neuen Fassung
  loesungAlt: false, // Lösung #6176/#6199 (J_LOESUNG: „Eine Nachricht genügt.“, erledigt-Karten, Vorteilsleiste) → true = statt „Websites und Software nach Maß“
  // ab Jamil #6384/#6385 (19.11.2026, Sicherung davor: Tag vor-jamil-6384-20261119): im Wechsler echte Bauwelt-Handwerk-Bildschirmfotos
  musterfirmaMockupsAlt: false, // HTML/CSS-Mockups „Musterfirma GmbH“ (#6379) → true = statt der Bauwelt-Bilder wieder sichtbar
  // ab Jamil #6388 (19.11.2026): neuer Abschnitt 4 „Kein Lastenheft. Kein Risiko. …“ (J_ERST, J6Erstsehen) direkt nach dem Wechsler.
  // Der bisherige Abschnitt „Wir entwickeln uns mit Ihrem Unternehmen weiter.“ (J6Anders) bleibt vorerst sichtbar – Jamil wird gefragt:
  // #6390: „erstmal weiter nach unten“ → steht jetzt hinter Abschnitt 5 „Keine Angst vor dem Umstieg“ (#6391, J_UMSTIEG)
  // ab Jamil #6402 (19.11.2026): Abschluss = Abschnitt 7 „Bereit zu sehen …“ mit zwei Mini-Formularen (J_START, J6Start)
  abschlussCtaAlt: false,
  heroAnimation: false, // Hero-Animation Browser → Dashboard (#6369) – seit Jamil #6478 aus, Hero einspaltig mittig; true = wieder da
  individuellTab: false, // 4. Tab „Individuell“ im Wechsler (#6427) – seit Jamil #6460 aus; true = wieder da
  browserBox: false, // separate Box „Läuft einfach im Browser“ unter dem Wechsler (#6397) – seit Jamil #6424 kleiner Hinweis im Wechsler; true = Box wieder
  heroSchnell: true, // Jamil #6927: schlanke Schnellstart-Zeile im Hero; false = wieder weg
  heroZeile: false, // „Keine Tickets. Kein CMS. Keine Technikkenntnisse.“ im Hero – seit Jamil #6417 aus; true = wieder sichtbar
  // Jamil #6408–#6412 (19.11.2026, „diese abschnitte entfernen“): ausgeblendet, nicht gelöscht – true = wieder sichtbar
  wachsenAbschnitt: false, // „Starten Sie dort, wo Sie heute stehen.“ (J6Wachsen, Treppe Website → WebApp)
  prozessAbschnitt: false, // „Bevor wir Software entwickeln, verstehen wir Ihren Arbeitsalltag.“ (J6Prozess)
  referenzenAbschnitt: false, // „So unterschiedlich unsere Kunden sind, …“ (J6Referenzen)
  vertrauenAbschnitt: false, // „Verlässlichkeit statt Überraschungen.“ (J6Vertrauen) // bisheriger Abschluss-CTA #6179 (J6Abschluss, „Kostenlose Erstberatung vereinbaren“) → true = wieder statt Abschnitt 7
  weiterentwickelnAbschnitt: false, // seit Jamil #6412 aus; false = „Wir entwickeln uns mit Ihrem Unternehmen weiter.“ (J_ANDERS) ausblenden
};
/** Pakete kompakt (SnAngebot) bleiben sichtbar, zwischen 8 Vertrauen und Abschluss-CTA (Vertrauen endet mit „Fester Monatspreis“). */
export const PAKETE_ZEIGEN = false; // seit Jamil #6400 ersetzt durch Abschnitt 6 „Klare Monatspreise“ (J_PREISE, J6Preise); true = alte Paketkarten wieder

/** Hero-Preiszeile (Jamil #6396, 19.11.2026): Preise hier ändern, Text baut sich in J_HERO.preiszeile daraus. */
// Seit #6399/#6400: Preise kommen aus pakete-abo.ts (eine Quelle für alle Seiten); „netto“ wie überall auf der Seite (#6399 Punkt 3).
export const HERO_PREISE = {
  website: aboPreisAb(), // „Websites ab … / Monat“ = günstigstes Website-Paket
  software: KOMPLETTPAKET.preis, // „Individuelle Software ab … / Monat“
  /** Zusatz hinter den Preisen (Jamil #6399: „netto“). Alternative: ' zzgl. MwSt.' */
  mwst: ' netto',
};
const preis = (n: number) => `${n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\u00a0€`;

/** 1. Hero (Jamil #6176) */
export const J_HERO = {
  /** Headline + Subheadline seit Jamil #6366/#6368/#6370 (19.11.2026) WÖRTLICH (Variante 1 mit „nahtlos“, freigegeben mit „ok“).
   *  Vorher (#6176): titel 'Sagen Sie einfach, was Sie brauchen.', unter 'Ob Website, Änderung oder individuelle WebApp: Beschreiben Sie
   *  Ihre Idee per Chat, Sprachnachricht oder Screenshot. Wir kümmern uns um die Umsetzung.' */
  /** Seit Jamil #6982 (22.11.2026) „Gefunden werden. Einfacher arbeiten.“ (zweizeilig, Umbruch nach dem ersten Satz in J6Hero.astro);
   *  vorher „Stark nach außen. Effizient nach innen.“ (#6366–#6370). */
  titel: '==Gefunden== werden. ==Einfacher== arbeiten.', // ==…== = goldener Marker (Jamil #7016, lib/hl.ts)
  // Subheadline seit Jamil #6376 (19.11.2026) WÖRTLICH; davor kurz (#6366/#6368, Variante 1): 'Viele Unternehmen haben eine Website, aber
  // kein System dahinter. Wir entwickeln Webauftritte und Software, die nahtlos ineinandergreifen – für begeisterte Kunden und produktive Teams.'
  // Satz 1 seit Jamil #6429 („2a“); vorher 'Standard-Tools passen selten zum echten Arbeitsalltag.'
  // seit Jamil #6485 nur noch Satz 2 (Satz 1 „Fertige Standard-Programme passen selten zu Ihrem echten Arbeitsalltag.“ entfernt)
  unter: 'Wir entwickeln Ihren individuellen Webauftritt und maßgeschneiderte Software – und verbinden beides zu einem System, das exakt so funktioniert, wie Ihr Betrieb arbeitet.',
  zeile: 'Keine Tickets. Kein CMS. Keine Technikkenntnisse.',
  /** Jamil #6959 (22.11.2026): dezente Zeile direkt über der H1 – ohne Superlativ */
  hinweis: 'Für Gründer und etablierte Betriebe', // Jamil #7015 (vorher „Ideal für Gründer und Betriebe, die sich neu aufstellen“)
  knopf: 'Kostenlose Beratung', // Ziel: Kontakt, Anliegen Erstberatung (ANLIEGEN.erstberatung)
  /** Ruhige Zeile direkt unter den Knöpfen (Jamil #6396, wörtlich; Preise aus HERO_PREISE) */
  preiszeile: [
    `Websites ab ${preis(HERO_PREISE.website)}${HERO_PREISE.mwst}\u00a0/ Monat`,
    `Individuelle Software ab ${preis(HERO_PREISE.software)}${HERO_PREISE.mwst}\u00a0/ Monat – ohne hohe Einmalkosten. Kostenlose Vorschau vorab.`,
  ],
  /** Hero-Visual (Jamil #6192, 18.11.2026; Sicherung davor: Tag vor-jamil-6192-20261118): statt nur eines Handys drei echte
   *  Beispiele, je Nachricht (links) → sichtbares Ergebnis (rechts, eigenes CSS-Mockup) → Häkchen mit Jamils Ergebnis-Text.
   *  Nachricht + Ergebnis WÖRTLICH von Jamil (#6192); Headline/Subheadline bleiben wie oben (#6194). Emojis 🎙️ 📸 💬 ✅ als eigene
   *  SVG-Icons (J6Icon). `bild` = Beschriftungen im Ergebnis-Mockup (nur Deko, aria-hidden). Gestaltungsziel (nicht auf der Seite):
   *  „Plötzlich versteht jeder sofort: Ahhh. Ich muss kein System bedienen.“ */
  beispiele: [
    { art: 'sprache', zusatz: 'Sprachnachricht', nachricht: '„Füge bitte einen neuen Mitarbeiter hinzu.“', ergebnis: 'Erledigt',
      bild: { titel: 'Unser Team', neu: 'Neu im Team' } },
    { art: 'screenshot', zusatz: 'Screenshot', nachricht: '„So soll die Startseite aussehen.“', ergebnis: 'Änderungen umgesetzt',
      bild: { titel: 'Startseite', neu: 'Neu' } },
    { art: 'chat', zusatz: 'Nachricht', nachricht: '„Wir brauchen eine digitale Urlaubsverwaltung.“', ergebnis: 'Neue Funktion verfügbar',
      bild: { titel: 'Urlaubsverwaltung', antrag: 'Urlaubsantrag', vorher: 'offen', nachher: 'genehmigt' } },
  ],
  beispieleLabel: 'Drei Beispiele: Nachricht und Ergebnis',
  /** Hero-Animation nach Jamil #6369 (19.11.2026): Browserfenster mit Business-Website und blauem Knopf „Anfrage senden“, Cursor klickt,
   *  leuchtende Linie zum Projekt-Dashboard, Karte „Neue Kundenanfrage“ erscheint in „Neu“ mit grünem Häkchen. Ruhige Endlosschleife,
   *  eigenes SVG/CSS (J6Fluss.astro, styles/hero-6369.css), kein Video. Beschriftungen in der Grafik (nur Deko, aria-hidden): */
  fluss: {
    adresse: 'www.ihre-firma.de',
    knopf: 'Anfrage senden',
    dashboard: 'Projekte',
    spalten: ['Neu', 'In Arbeit', 'Erledigt'],
    karte: ['Neue', 'Kundenanfrage'], // Titel „Neue Kundenanfrage“, in der Karte zweizeilig
    /** kurzer Text für Screenreader (die Grafik selbst ist aria-hidden) */
    sr: 'Animation: Auf einer Website klickt jemand auf „Anfrage senden“. Die Anfrage erscheint sofort als neue Karte „Neue Kundenanfrage“ in der Spalte „Neu“ des Projekt-Dashboards.',
  },
} as const;

/** 2. Problem-Section: Texte seit Jamil #6198 (18.11.2026) WÖRTLICH (Überschrift wie #6176, neue Subheadline, 4 neue Problemkarten,
 *  Abschlusszeile). Vorher (#6176): Einleitung „Viele Unternehmen möchten … Stattdessen entstehen:“ + kürzere Kartentexte. */
export const J_PROBLEM = {
  titel: 'Digitale Lösungen sollten Arbeit sparen. Nicht verursachen.',
  unter: 'Websites, Software und Prozesse sollen Unternehmen entlasten. In der Praxis bedeuten sie oft mehr Aufwand, mehr Abstimmung und mehr Technik.',
  karten: [
    { titel: 'Änderungen dauern zu lange', text: 'Neue Inhalte, Texte oder Seiten benötigen oft Anfragen, Abstimmungen und Wartezeiten.' },
    { titel: 'Niemand möchte ein CMS lernen', text: 'Eine Website sollte kein weiteres System sein, das Zeit kostet und Schulungen benötigt.' },
    { titel: 'Gute Ideen bleiben liegen', text: 'Weil die Umsetzung zu kompliziert erscheint oder erst später geplant wird.' },
    { titel: 'Zu viele Werkzeuge', text: 'Website, Formulare, Excel, E-Mails und verschiedene Anbieter sorgen für unnötige Komplexität.' },
  ],
  abschluss: 'Digitale Lösungen sollten sich Ihrem Unternehmen anpassen. Nicht umgekehrt.',
} as const;

/** 2. Problem-Section NEU (Jamil #6372–#6374 + #6377, 19.11.2026), Texte WÖRTLICH. Ohne Subheadline und Abschlusszeile (Jamil nennt
 *  keine). Gestaltung #6374: keine Mockups, je Karte ein schlichtes einfarbiges Linien-Icon, viel Weißraum. Karte 2 aus #6377 eingefügt,
 *  die bisherigen Karten 2/3 rücken auf 3/4 (Auslegung, im Talk gefragt). Icons: J6Problem.astro. */
export const J_PROBLEM_NEU = {
  titel: 'Wo Betriebe heute ==Kunden und Zeit== verlieren', // Jamil #6483 „A“ (vorher „Wo im Arbeitsalltag oft unnötig Zeit liegen bleibt“)
  karten: [
    { icon: 'brief', titel: 'Die Website ist nur eine digitale Visitenkarte', text: 'Kunden finden zwar Ihre Telefonnummer, aber Anfragen landen als unvollständige E-Mails im Postfach oder gehen im Trubel unter.' },
    { icon: 'puzzle', titel: 'Sie verbiegen Ihren Alltag für fertige Programme', text: 'Standard-Software zwingt Sie in starre Abläufe. Was das Programm nicht kann, wird am Ende doch wieder mit Excel-Listen und Notizzetteln irgendwie drumherum gebastelt.' },
    { icon: 'pfeile', titel: 'Alles wird doppelt und dreifach abgetippt', text: 'Kundendaten wandern von der E-Mail in eine Excel-Liste, von dort in den Kalender und irgendwann ins Rechnungsprogramm – das kostet Nerven und führt zu Fehlern.' },
    { icon: 'lupe', titel: 'Jeder sucht nach der aktuellen Info', text: 'Absprachen liegen mal im Chat, mal in Ordnern auf dem Server und mal auf einem Notizzettel. Neue Mitarbeiter brauchen Wochen, um durchzublicken.' },
  ],
} as const;

/** Jamil #6954–#6958 (22.11.2026): Abschnitt „Wo Betriebe heute …“ als Weg Karte für Karte. Am PC bleibt der Abschnitt stehen, pro
 *  Scroll-Schritt wird EINE Karte (1 → 2 → 3 → 4) vom Problem zur webgold-Lösung; erst nach Karte 4 geht es weiter. Die Lösungstexte
 *  waren anfangs NUR Texte aus J_MASS.schritte (`schritt` = Index dort, `text` = Feld, nur noch als Herkunft vermerkt); seit Jamil
 *  #6984–#6993 hat jede Karte eigenen `titel` + `inhalt` (angezeigt), J_MASS bleibt unverändert. `marke` = kleine Marke. */
export const J_PROBLEM_WEG = {
  // marke „So machen wir es“ seit Jamil #7030 entfernt
  /** Jamil #7086 (23.11.2026): Weg-Leiste über den Karten + Marken je Seite, damit klar ist: das ist der Weg mit webgold (Problem → Lösung) */
  weg: { titel: 'Ihr Weg mit webgold', start: 'In 4 Schritten vom Problem zur Lösung', problem: 'Das Problem', mit: 'Lösung mit webgold' }, // Jamil #7110
  loesungen: [
    // Karte 1: eigener Text seit Jamil #6984/#6989 (22.11.2026), WÖRTLICH; J_MASS bleibt unverändert (vorher J_MASS.schritte[0] „Ein individueller
    // Online-Kalkulator auf der Website“ / zeigt).
    { schritt: 0, text: 'zeigt', titel: 'Mehr als eine Visitenkarte: der Eingang zu Ihrem System', // Jamil #6989 (ohne Kalkulator; ersetzt #6984)
      inhalt: 'Ihre Website ist der erste Eindruck, der zählt – deshalb ist sie bei uns mehr als eine Visitenkarte. Sie ist funktional gebaut und der Eingang in Ihr eigenes System: Was Kunden dort anfragen, kommt direkt in Ihrer Software an.' }, // „Software“ statt „Web-App“: Jamil #6991
    // Karte 2: eigener Text seit Jamil #6985 (22.11.2026), WÖRTLICH (vorher J_MASS.schritte[3] / warum)
    { schritt: 3, text: 'warum', titel: 'Software, die sich nach Ihrem Betrieb richtet – nicht umgekehrt',
      inhalt: 'Egal wie speziell Ihre Abläufe sind: Wir bauen Ihnen die Software, die genau dazu passt. Von der Kundenverwaltung über die Terminbuchung bis zu Funktionen, die es nur bei Ihnen gibt.' },
    // Karte 3 (doppelt abtippen): eigener Text seit Jamil #6988 (22.11.2026), WÖRTLICH (vorher J_MASS.schritte[1] / zeigt)
    { schritt: 1, text: 'zeigt', titel: 'Ein abgestimmtes System, in dem alles zusammenpasst',
      inhalt: 'Anfragen landen direkt in Ihrer Software. Dort weisen Sie sie einem Mitarbeiter zu, machen daraus weitere Aufgaben – oder lassen genau die Abläufe einbauen, die Sie sich für Ihren Betrieb vorstellen.' },
    // Karte 4 (aktuelle Info suchen): eigener Text seit Jamil #6992/#6993 (22.11.2026), WÖRTLICH (vorher J_MASS.schritte[2] / zeigt)
    { schritt: 2, text: 'zeigt', titel: 'Alle Infos an einem Ort – für das ganze Team',
      inhalt: 'Absprachen, Dokumente und der aktuelle Stand jedes Auftrags liegen gesammelt in Ihrer Software. Jeder im Team sieht sofort, was zu tun ist – und neue Mitarbeiter finden sich schnell zurecht.' },
  ],
} as const;

/** Jamil #6927: schlanke Schnellstart-Zeile im Hero (nur Website-Adresse + kleiner Knopf, der Rest klappt danach auf). Alle anderen Texte
 *  (E-Mail, Rückweg, Telefon, Datenschutz) kommen aus J_START.schnell. Absende-Logik: Skript in J6Start.astro (einmal). */
export const J_HERO_SCHNELL = {
  label: 'Ihre Website-Adresse für die kostenlose Vorschau',
  platzhalter: 'Ihre Website, z. B. www.webgold.io', // Jamil #7094
  knopf: 'Kostenlose Website-Vorschau erhalten', // Jamil #7012 (vorher „Vorschau für morgen“)
  /** Name des Formulars für Screenreader (aria-label). Die sichtbare Zeile darüber (#6948) und die Kleinschrift darunter sind seit
   *  Jamil #7010/#7011 (22.11.2026) entfernt; das Feld behält aria-label + Platzhalter. */
  formular: 'Kostenlose Vorschau Ihrer neuen Startseite',
} as const;

/** Jamil #7088 / #7099 Variante a (23.11.2026): „Was Ihre Web-App alles kann“ – Baukasten-Raster VOR dem echten Beispiel (Bauwelt).
 *  Sortiert nach Zweck, nicht nach Branche; nur Funktionen, die wir als Web-App/individuelle Software bauen; keine Superlative/Garantien.
 *  `icon` = Name aus components/Icon.astro. Danach Satz + Link zum echten Projekt (Wechsler darunter, #jm-beispiel). */
export const J_BAUKASTEN = {
  titel: 'Was Ihre Web-App alles kann',
  kacheln: [
    { icon: 'euro', titel: 'Rechnen und Prüfen', text: 'Preise, Mengen und Kalkulationen nach Ihren eigenen Regeln berechnen.' },
    { icon: 'calendar', titel: 'Planen und Termine', text: 'Einsätze, Termine und Kapazitäten für das ganze Team planen.' },
    { icon: 'folder', titel: 'Dokumente und Fotos', text: 'Angebote, Pläne und Fotos direkt am Auftrag ablegen.' },
    { icon: 'portal', titel: 'Kundenportal und Freigaben', text: 'Kunden sehen ihren Stand und geben Angebote online frei.' },
    { icon: 'phone', titel: 'Mobil unterwegs erfassen', text: 'Zeiten, Material und Notizen vor Ort am Handy eintragen.' },
    { icon: 'chart', titel: 'Auswertungen auf einen Blick', text: 'Offene Aufträge, Umsätze und Auslastung übersichtlich sehen.' },
    { icon: 'doc', titel: 'Formulare und Checklisten', text: 'Abnahmen, Prüflisten und Protokolle digital ausfüllen.' },
    { icon: 'zap', titel: 'Benachrichtigungen', text: 'Automatische Hinweise, sobald sich bei einem Auftrag etwas ändert.' },
    { icon: 'lock', titel: 'Rechte für das Team', text: 'Jeder sieht genau das, was er für seine Arbeit braucht.' },
    { icon: 'layers', titel: 'Anbindung an vorhandene Programme', text: 'Daten mit Buchhaltung, Kalender und Co. austauschen, wo es eine Schnittstelle gibt.' },
  ],
  satz: 'Eine Funktion, die es nur in Ihrer Branche gibt? Genau dafür bauen wir.',
  link: 'So sieht das in echt aus',
  beispielTitel: 'Ein echtes Projekt ansehen',
} as const;

/** 3. Lösung NEU als „Maßarbeit“ (Jamil #6378/#6379, 19.11.2026), Texte WÖRTLICH. Headline + Subheadline aus #6379 (Struktur); der Text aus
 *  #6378 („Ob Kundenportal, Kalkulator …“) steht bewusst NICHT auf der Seite, weil er die Subheadline fast doppelt (im Talk gefragt):
 *  'Ob Kundenportal, Kalkulator auf der Website oder ein internes System für Ihre Aufträge: Wir programmieren genau die Werkzeuge, die Ihrem
 *  Team wirklich Arbeit abnehmen. Ohne überflüssigen Ballast, dafür zu 100 % auf Ihre Abläufe zugeschnitten.'
 *  Darunter der 3-Schritte-Wechsler (J6Wechsler.astro): Tab = Kundenproblem (Zitat), Panel = Mockup (nur HTML/CSS) + Begründungszeile. */
export const J_MASS = {
  titel: 'Websites und Software ==nach Maß== – statt Kompromisse von der Stange',
  // seit Jamil #6488 (passt auch auf Websites); vorher: 'Wir bauen genau die Werkzeuge, die in Ihrem Betrieb bisher gefehlt haben. Ohne 100 unnötige Funktionen, dafür exakt auf Ihre echten Abläufe zugeschnitten.'
  unter: 'Ob Website oder Software: Wir bauen genau das, was Ihr Betrieb wirklich braucht – ohne unnötige Funktionen, dafür exakt auf Ihre Kunden und Ihre Abläufe zugeschnitten.',
  label: 'Individuell programmiert für Bauwelt Handwerk – 100\u00a0% eigene Abläufe', // seit Jamil #6384 (vorher „… für Musterfirma GmbH …“)
  labelIndividuell: 'Individuell programmiert für Ihren Betrieb – 100\u00a0% eigene Abläufe', // 4. Tab (#6427), Beispiel-Mockup
  labelMuster: 'Individuell programmiert für Musterfirma GmbH – 100\u00a0% eigene Abläufe', // nur mit ALT_ZEIGEN.musterfirmaMockupsAlt
  /** Echte Referenz Bauwelt Handwerk (Jamil #6384/#6385): Bildschirmfotos in src/assets/bilder/referenzen/ (Herkunft: QUELLEN.md).
   *  `bild` = Name für <Bild>, `alt` = Alt-Text. Link nur beim Kalkulator. */
  bauwelt: {
    link: { text: 'bauwelt-handwerk.de ansehen', href: 'https://www.bauwelt-handwerk.de/rechner/' },
    bilder: [
      { bild: 'referenzen/bauwelt-kalkulator', alt: 'Projekt-Rechner auf bauwelt-handwerk.de, Schritt 3 von 3: Ergebnis „Ihre erste Preisspanne“ für eine Badsanierung mit 8 m², 14.340 bis 19.500 Euro, darunter ein Hinweis zur Berechnung, der Knopf „Angaben ändern“ und der Knopf „Rückruf anfordern“.' },
      { bild: 'referenzen/bauwelt-auftrag', alt: 'Auftragsübersicht im CRM mit Testdaten: Auftrag „Badsanierung“ mit Status-Leiste von Anfrage bis Abgerechnet, Zeiterfassung mit Start und Abfahrt, Aufgabenliste mit Zuständigen sowie Kunde und Einsatzort.' },
      { bild: 'referenzen/bauwelt-kundenportal', alt: 'Kundenportal von Bauwelt Handwerk mit Testdaten: Auftrag „Badsanierung“ mit Projekt-Verlauf von Anfrage bis Fertigstellung, nächster Termin, Arbeitsschritte, persönlicher Projektbegleiter und Team.' },
    ],
  },
  tabsLabel: 'Vier Beispiele aus dem Alltag', // seit #6427 vier Tabs
  /** Bausteine im Mockup des 4. Tabs (#6427), nur Deko (aria-hidden; Text für Screenreader = `zeigt`) */
  module: ['Termine', 'Material', 'Team-App', 'Schnittstellen', 'Auswertungen', 'Dokumente'],
  /** Kleiner Hinweis im Wechsler (Jamil #6424, Wortlaut vom Koordinator vorgeschlagen) */
  browserKurz: 'Läuft im Browser – ohne Installation, auf PC, Tablet und Handy',
  /** Hinweis unter dem Wechsler (Jamil #6397, wörtlich; seit #6424 nur mit ALT_ZEIGEN.browserBox) */
  browser: { titel: 'Läuft einfach im Browser – ganz ohne Installation',
    text: 'Egal ob am Büro-PC, auf dem Tablet in der Werkstatt oder unterwegs am Handy: Ihr Team loggt sich einfach ein und arbeitet sofort. Keine komplizierte Installation, keine nervigen Updates auf einzelnen Rechnern.' },
  // `kurz` = Beschriftung der Segmentleiste auf dem Handy (dort steht das Zitat über dem Mockup). Beschriftungen in den Mockups sind
  // erfundene Beispielwerte für die „Musterfirma GmbH“ (nur Deko, aria-hidden; `zeigt` ist der Text für Screenreader).
  schritte: [
    { kurz: 'Kalkulator', problem: '„Kunden fragen immer das Gleiche – und wir rechnen alles per Hand aus.“',
      titel: 'Ein individueller Online-Kalkulator auf der Website',
      zeigt: 'Der Kunde wählt auf der Website Maße, Material oder Leistung aus, sieht sofort eine grobe Preisspanne und schickt die Anfrage ab.',
      warum: 'Kein Standard-Kontaktformular! Ein interaktives Werkzeug, das genau nach den Regeln und Preisen des Betriebs rechnet. Aus jeder Anfrage auf der Website wird direkt ein Auftrag in der Software angelegt.' },
    { kurz: 'Auftrag', problem: '„Standard-Programme passen nicht zu unseren Aufträgen.“',
      titel: 'Eine maßgeschneiderte Auftrags-Maske',
      zeigt: 'Genau 5 relevante Felder statt 50 überladene Reiter. Aus der Website-Anfrage entsteht automatisch ein Auftrag mit passender Materialliste und Status-Ampel.',
      warum: 'Man sieht sofort: Hier gibt es keinen überflüssigen Ballast wie in großen Standard-CRMs – nur exakt das, was dieses Team braucht.' },
    { kurz: 'Portal', problem: '„Kunden rufen ständig an, um nach dem Stand zu fragen.“',
      titel: 'Ein eigenes Kundenportal mit Login',
      zeigt: 'Eine aufgeräumte Ansicht für den Endkunden: „Ihr Auftrag ist in Fertigung“, dazu alle Angebote, Pläne und Rechnungen an einem Ort zum Download.',
      warum: 'Ein eigenes Portal im Design der Firma – das gibt es nicht von der Stange und lässt das Unternehmen extrem professionell wirken.' },
    // 4. Tab (Jamil #6427): nahezu jeder Wunsch umsetzbar – Wortlaut von uns, sachlich formuliert
    { kurz: 'Individuell', problem: '„Unser Ablauf ist besonders – dafür gibt es keine fertige Lösung.“',
      titel: 'Software, die sich nach Ihrem Betrieb richtet',
      zeigt: 'Einzelne Bausteine wie Termine, Material, Team-App, Schnittstellen, Auswertungen und Dokumente, die zu einem gemeinsamen System verbunden sind.',
      warum: 'Ob Terminbuchung, Materialverwaltung, Mitarbeiter-App oder Schnittstelle zu bestehenden Programmen: Nahezu jede Anforderung lässt sich umsetzen – genau zugeschnitten auf Ihren Betrieb.' },
  ],
} as const;

/** 4. „Erst sehen, dann entscheiden“ (Jamil #6388, 19.11.2026). Texte WÖRTLICH. Badges in den Karten (`pills`, `zeiten`, `sprache`)
 *  sind nur Deko (aria-hidden) und wiederholen, was im Kartentext steht. Der Blitz (⚡) ist ein eigenes SVG-Icon. */
export const J_ERST = {
  titel: 'Kein ==Aufwand== vorab. Kein ==Risiko==. Erst sehen, dann entscheiden.', // Jamil #6494 „C“ (davor #6491 „Keine Vorarbeit …“, ursprünglich „Kein Lastenheft …“)
  // seit Jamil #6429 („2a“); vorher: 'Sie müssen weder seitenlange Konzepte schreiben noch die Katze im Sack kaufen. Wir denken uns in Ihren Betrieb hinein und liefern Ihnen kostenlos einen echten ersten Entwurf.'
  unter: 'Sie benötigen weder ein umfangreiches Konzept noch gehen Sie ein Risiko ein. Wir arbeiten uns in Ihre Abläufe ein und erstellen Ihnen kostenlos einen ersten konkreten Entwurf.',
  karten: [
    { nr: '01', titel: 'Wir verstehen Ihren Betrieb', // Zusatz „(oder starten direkt)“ seit Jamil #6495 entfernt
      varianten: [
        // Labels „Für Website & Software:“ (#6496) und „Nur für Ihre Website (Schnellstart):“ (#6498) entfernt, Absatz 2 neu (#6498)
        { name: '', text: 'In einem lockeren Gespräch nehmen wir Ihre Unternehmens-DNA auf. Als Prozess-Experten hören wir nicht nur zu, sondern bringen direkt eigene Ideen und Verbesserungsvorschläge für Ihren Alltag ein.' },
        { name: '', text: 'Sie wollen erst mal unverbindlich schauen, wie Ihre Website aussehen könnte? Schicken Sie uns einfach Ihre aktuelle Website-Adresse und Kontaktdaten – das reicht für den Start.' },
      ],
      pills: ['Gespräch: Unternehmens-DNA', 'Schnellstart: Nur URL senden'], oder: 'oder', // Pills seit #6500 ersetzt durch:
      knoepfe: ['Kostenloses Erstgespräch vereinbaren', 'Website-Vorschau anfordern'] }, // Jamil #6500
    { nr: '02', titel: 'Kostenlose Vorschau in schon am nächsten Werktag',
      einleitung: 'Statt trockener Theorie liefern wir Ihnen greifbare Ergebnisse zum Durchklicken:',
      punkte: [
        { name: 'Neue Website-Startseite:', text: 'bereits am nächsten Werktag' },
        { name: 'Erster Software-Prototyp:', text: 'bereits 3 Werktage später' },
      ],
      schluss: 'Komplett kostenlos und unverbindlich – Sie sehen sofort, wie Ihr Betrieb digital aussehen und laufen kann.',
      zeiten: ['Website: Nächster Werktag', 'Software: In 3 Werktagen'],
      /** Kennzahl-Leiste statt Zeit-Badges und Aufzählung (Jamil #6502); Inhalt wie vorher „bereits am nächsten Werktag / 3 Werktage später“ */
      kennzahlen: [{ wert: '1 Werktag', text: 'bis zur neuen Website-Startseite' }, { wert: '3 Werktage', text: 'bis zum ersten Software-Prototyp' }] },
    { nr: '03', titel: 'Feinschliff in Ihrem Tempo',
      text: 'Gefällt Ihnen unsere Vorschau? Erst dann starten wir gemeinsam durch. Sie bestimmen das Tempo: ob zügig am Stück bis zur Veröffentlichung oder entspannt zwischendurch im Alltag. Anpassungen schicken Sie uns einfach per Sprachnachricht, Screenshot oder Textnachricht.',
      sprache: '0:12',
      /** Chat-Grafik statt Sprachnachrichten-Blase (Jamil #6503), nur Deko (aria-hidden) */
      chat: { text: 'Bitte Telefonnummer oben ergänzen', status: 'Umgesetzt' } },
    // 4. Karte (Jamil #6518), Text wörtlich; Verlauf-Grafik nur Deko (aria-hidden)
    { nr: '04', titel: 'Ihre Lösung wächst mit Ihnen',
      text: 'Nach der Veröffentlichung geht es weiter: Wir optimieren, passen an und entwickeln Ihre Website oder Software laufend weiter – genau dann, wenn Sie etwas brauchen. Auch hier genügt eine Sprachnachricht, eine Textnachricht oder ein Screenshot.',
      // Jamil #6913: Kreislauf-Grafik statt Verlaufs-Karte „Weiterentwicklung“ (eigene SVG, Textalternative in `beschreibung`)
      kreis: { stationen: ['Wunsch schicken', 'Wir setzen um', 'Online', 'Wirkung prüfen'],
        mitte: ['ganz einfach –', 'per Sprachnachricht,', 'Text oder Screenshot'],
        beschreibung: 'Kreislauf der Weiterentwicklung in vier Schritten: Sie schicken Ihren Wunsch, wir setzen ihn um, die Änderung geht online, wir prüfen die Wirkung – und dann beginnt der Kreislauf von vorn. Der Wunsch geht ganz einfach per Sprachnachricht, Text oder Screenshot.' } },
  ],
} as const;

/** 7. Abschluss „Bereit zu sehen …“ (Jamil #6402, 19.11.2026). Texte WÖRTLICH. Versand wie das Kontaktformular (Web3Forms-Key
 *  PUBLIC_WEB3FORMS_KEY, sonst E-Mail-Programm), Honeypot, Datenschutz-Häkchen. `betreff` unterscheidet die Karten im Postfach. */
export const J_START = {
  titel: 'Bereit zu sehen, was in Ihrem Betrieb ==möglich== ist?',
  unter: 'Wählen Sie Ihren Weg zur kostenlosen Vorschau – komplett unverbindlich und ohne Vorbereitung.',
  gespraech: {
    art: 'Der persönliche Weg (Website & Software)',
    badge: 'Empfohlen für individuelle Abläufe',
    titel: 'Unternehmens-DNA aufnehmen (20 Min.)',
    text: 'Wir lernen Ihren Betrieb in einem lockeren Gespräch kennen, bringen eigene Optimierungsvorschläge ein und bauen Ihnen eine kostenlose Vorschau (Website morgen / Software in 3 Werktagen).',
    name: 'Ihr Name',
    kontakt: 'Telefonnummer oder E-Mail',
    grob: 'Worum geht es?',
    optional: '(optional)',
    themen: ['Website', 'Software', 'Beides'],
    knopf: 'Kostenloses Gespräch anfragen',
    betreff: 'Gespräch anfragen',
  },
  schnell: {
    art: 'Der Schnellstart (Nur Website)',
    badge: 'Ohne Gespräch vorab',
    titel: 'Direkte Website-Vorschau für morgen',
    text: 'Sie möchten erst mal ohne Termin sehen, wie Ihre neue Startseite aussehen könnte? Senden Sie uns einfach Ihre aktuelle Website-Adresse – schon am nächsten Werktag liegt Ihr Entwurf bereit.',
    url: 'Ihre aktuelle Website-URL',
    urlBeispiel: 'z. B. www.webgold.io', // Jamil #7094
    email: 'Ihre E-Mail-Adresse',
    emailZusatz: '(für den Vorschau-Link)',
    telefon: 'Telefonnummer für Rückfragen',
    optional: '(optional)',
    // Jamil #6907: Wahl des Rückwegs; bei WhatsApp/Beides wird die Telefonnummer Pflicht (Prüfung im Skript von J6Start)
    rueckweg: { legende: 'Wie möchten Sie informiert werden?', optionen: ['E-Mail', 'WhatsApp', 'Beides'] },
    telefonFehler: 'Bitte geben Sie Ihre Telefonnummer an, damit wir Sie per WhatsApp erreichen können.',
    telefonPruefen: 'Bitte prüfen Sie die Telefonnummer (zum Beispiel 0171 1234567).',
    knopf: 'Kostenlose Vorschau für morgen anfordern',
    betreff: 'Website-Vorschau morgen',
  },
  vertrauen: 'Kein Callcenter, keine Verkäufer-Floskeln – Sie sprechen direkt mit den Machern. Wir freuen uns auf Ihr Projekt!',
} as const;

/** 6. „Klare Monatspreise“ (Jamil #6400, 19.11.2026). Texte WÖRTLICH; Preise, Namen, „Ideal für“ und ✓-Listen aus pakete-abo.ts
 *  (dieselbe Quelle wie /preise/), hier nur Badges, Knöpfe und Hinweis. */
/** Jamil #7019 (22.11.2026): dezente Wertaussage ohne Vergleich mit Mitbewerbern und ohne Zahlen (UWG). „für die Website selbst“, weil es
 *  einmalig dazubuchbare Extras gibt (Logo, Geschäftspapiere …); die Einrichtung kostet 0 € (site.ts). Startseite + Kopf /preise/. */
export const PREIS_WERT = 'Hochwertige Websites, individuell gestaltet – im Monatsabo, ohne hohe Einmalkosten für die Website selbst.';

export const J_PREISE = {
  titel: '==Klare Monatspreise==. Keine bösen Überraschungen.',
  // Satz 1 seit Jamil #7019 = PREIS_WERT (vorher „Starten Sie ohne fünfstellige Vorab-Investition.“)
  unter: `${PREIS_WERT} Alle Pakete sind monatlich planbar, flexibel kombinierbar – und Sie entscheiden erst, nachdem Sie unsere kostenlose Vorschau gesehen haben.`,
  rolle: { basis: 'Basis', plus: 'Beliebt / Empfehlung', software: 'Erweiterung / Maßarbeit' },
  badge: { plus: 'Unsere Empfehlung', software: '+ Kombinierbar oder einzeln' },
  alles: 'Alles aus dem Profi-Website-Paket',
  monat: '/ Monat',
  kombinierbar: '', // seit Jamil #6415 weg: „kombinierbar“ steht schon im Badge (vorher '(kombinierbar)')
  knopf: { basis: 'Kostenlose Vorschau starten', plus: 'Kostenlose Vorschau starten', software: 'Software-Idee besprechen' },
  hinweis: 'Alle Preise zzgl. MwSt. Keine versteckten Einrichtungsgebühren für den Start. Die erste Vorschau ist zu 100 % kostenlos und unverbindlich.',
} as const;

/** 5. „Keine Angst vor dem Umstieg“ (Jamil #6391, 19.11.2026) als ruhige „Sorglos-Matrix“ 2 × 2: Kundenfrage (Einwand) als
 *  Kartenüberschrift, darunter die Lösung mit grünem Häkchen. Texte WÖRTLICH. Kein Foto, keine Animation. */
export const J_UMSTIEG = {
  titel: 'Keine Angst vor dem Umstieg – wir nehmen ==Ihr Team== mit',
  unter: 'Viele Unternehmen schieben Verbesserungen jahrelang auf, weil sie Chaos beim Wechsel befürchten. Als Prozess-Experten sorgen wir dafür, dass Ihre neuen Lösungen reibungslos in den Alltag einziehen – ohne Stillstand und ohne Frust.',
  karten: [
    { frage: '„Wir haben uns gerade erst an unsere jetzigen Programme gewöhnt.“',
      antwort: 'Sie müssen nicht alles über Bord werfen. Was bei Ihnen gut läuft, binden wir einfach an. Und alles, was wir neu bauen, richten wir exakt nach der Arbeitsweise Ihres Teams aus – damit sich die Oberfläche vom ersten Klick an vertraut anfühlt.' },
    { frage: '„Meine Mitarbeiter haben keine Zeit für lange Schulungen.“',
      antwort: 'Brauchen sie auch nicht. Weil wir überflüssige Funktionen weglassen und Ihre echten Abläufe abbilden, ist das System selbsterklärend. Jeder sieht nur das, was er für seine Aufgabe braucht – und für den Start zeigen wir alles in wenigen Minuten.' },
    { frage: '„Was passiert mit unseren bestehenden Kundendaten und Listen?“',
      antwort: 'Ihre Daten ziehen vollständig mit um und niemand muss etwas mühsam abtippen. Wir übernehmen den kompletten Umzug Ihrer bestehenden Daten, Kontakte und Inhalte, damit Ihr Team ab Tag 1 nahtlos weiterarbeiten kann.' },
    { frage: '„Was, wenn im laufenden Betrieb Fragen auftauchen?“',
      antwort: 'Wir lassen Sie nach dem Start nicht allein. Wir testen alles gemeinsam in Ruhe vorab, stellen im laufenden Betrieb um und sind bei Fragen oder kleinen Anpassungswünschen direkt per Chat oder Telefon für Sie da.' },
  ],
  /** Abschlusszeile + Link zu den häufigen Fragen (Jamil #6393, wörtlich); Ziel: /fragen/ (FAQ-Seite, auf der Startseite gibt es keine FAQ) */
  mehr: 'Haben Sie noch weitere Fragen zu unserer Arbeitsweise?',
  mehrLink: { text: 'Antworten im Überblick ansehen →', pfad: '/fragen/' },
} as const;

/** 3. Die Lösung (Jamil #6176). „Kurze Statistik“ rechts = kompakte Vorteilsleiste, bewusst ohne Zahlen (keine erfundenen Werte). */
export const J_LOESUNG = {
  titel: 'Eine Nachricht genügt.',
  text: 'Beschreiben Sie einfach, was Sie benötigen.',
  wege: ['Per Chat.', 'Per Sprachnachricht.', 'Per Screenshot.', 'Oder alles zusammen.'],
  schluss: 'Wir setzen die Änderung um.',
  /** Visual links: drei erledigte Beispiele */
  erledigt: [
    { art: 'chat', nachricht: '„Neue Teamseite hinzufügen“' },
    { art: 'sprache', nachricht: '„Bitte Öffnungszeiten anpassen“' },
    { art: 'screenshot', zusatz: 'Screenshot', nachricht: '„So soll das aussehen“' },
  ],
  erledigtText: 'erledigt',
  /** Visual rechts („Kurze Statistik“) */
  punkte: [
    { icon: 'zeit', text: 'Kleine Änderungen oft am selben Tag' },
    { icon: 'person', text: 'Persönlicher Ansprechpartner' },
    { icon: 'ticket', text: 'Keine Ticketsysteme für Kunden' },
    { icon: 'stapel', text: 'Website und WebApps aus einer Hand' },
  ],
} as const;

/** 4. Was webgold anders macht (Jamil #6179). Überschrift + Subheadline seit Jamil #6203 (18.11.2026, Tippfehler „ihrem/Bei und“
 *  korrigiert, sonst wörtlich); vorher: „Die meisten Anbieter liefern Projekte. Wir begleiten die Entwicklung Ihres Unternehmens.“ */
export const J_ANDERS = {
  titel: 'Wir entwickeln uns mit Ihrem Unternehmen weiter.',
  unter: 'Die meisten Anbieter liefern eine Website oder Software und das Projekt ist abgeschlossen. Bei uns beginnt die Zusammenarbeit dort erst.',
  /** Visualisierung „zwei Wege“ (Jamil #6207, Texte wörtlich; Emojis als eigene Icons, ❌ gedämpft, ✅/📈 positiv) */
  wege: [
    { titel: 'Klassischer Weg', art: 'alt', schritte: [
      { icon: 'briefing', text: 'Briefing' },
      { icon: 'pinsel', text: 'Umsetzung' },
      { icon: 'rakete', text: 'Livegang' },
      { icon: 'kreuz', text: 'Neue Idee → Neues Projekt', nein: true },
      { icon: 'kreuz', text: 'Neues Angebot', nein: true },
      { icon: 'kreuz', text: 'Neue Kosten', nein: true },
    ] },
    { titel: 'webgold', art: 'wir', schritte: [
      { icon: 'briefing', text: 'Start mit Website oder WebApp' },
      { icon: 'rakete', text: 'Livegang' },
      { icon: 'chat', text: 'Neue Idee' },
      { icon: 'sprache', text: 'Kurze Nachricht' },
      { icon: 'haken', text: 'Umsetzung', ja: true },
      { icon: 'wachsen', text: 'Lösung wächst mit', ja: true },
    ] },
  ],
  /** Konkrete Vorteile (Jamil #6208, genau 4 Karten, Texte wörtlich) */
  vorteile: [
    { icon: 'chat', titel: 'Keine Technik bedienen', text: 'Sagen, schreiben oder zeigen statt CMS lernen.' },
    { icon: 'preis', titel: 'Planbare Kosten', text: 'Fester Monatspreis statt ständig neuer Projektangebote.' },
    { icon: 'person', titel: 'Ein Ansprechpartner', text: 'Website, WebApp und Weiterentwicklung aus einer Hand.' },
    { icon: 'wachsen', titel: 'Mitwachsendes System', text: 'Starten Sie heute klein und erweitern Sie später genau das, was Sie benötigen.' },
  ],
  /** bisherige Vergleichstabelle (#6179), seit #6207/#6208 ausgeblendet über ALT_ZEIGEN.andersTabelleAlt */
  spalten: ['Klassische Agentur', 'webgold'],
  zeilen: [
    ['Projekt abgeschlossen', 'Weiterentwicklung inklusive'],
    ['Neue Idee = neues Angebot', 'Neue Idee = kurze Nachricht'],
    ['Stundenabrechnung', 'Fester Monatspreis'],
    ['Mehrere Dienstleister', 'Ein Ansprechpartner'],
    ['Website separat', 'Website + WebApps gemeinsam'],
    ['Änderungen oft kompliziert', 'Änderungen so einfach wie eine Nachricht'],
  ],
} as const;

/** 5. Website heute. Mehr morgen. (Jamil #6179) – „Website heute. Mehr morgen.“ als Kennzeile über der Überschrift */
export const J_WACHSEN = {
  kennzeile: 'Website heute. Mehr morgen.',
  titel: 'Starten Sie dort, wo Sie heute stehen.',
  text: [
    'Nicht jedes Unternehmen braucht sofort eine individuelle Software.',
    'Deshalb beginnen viele Kunden mit einer professionellen Website.',
    'Wenn später neue Anforderungen entstehen, erweitern wir die Lösung Schritt für Schritt.',
  ],
  stufen: [
    { icon: 'website', text: 'Website' },
    { icon: 'anfragen', text: 'Anfragen' },
    { icon: 'automatik', text: 'Automatisierungen' },
    { icon: 'team', text: 'Mitarbeiterbereich' },
    { icon: 'portal', text: 'Kundenportal' },
    { icon: 'app', text: 'Individuelle WebApp' },
  ],
  darunter: ['Ohne Neustart.', 'Ohne Anbieterwechsel.', 'Ohne Insellösungen.'],
} as const;

/** 6. Prozessberatung (Jamil #6179) */
export const J_PROZESS = {
  kennzeile: 'Prozessberatung',
  titel: 'Bevor wir Software entwickeln, verstehen wir Ihren Arbeitsalltag.',
  text: ['Viele Unternehmen benötigen keine kompliziertere Software.', 'Sie benötigen einfachere Abläufe.'],
  fragenEinleitung: 'Deshalb schauen wir zuerst auf Ihre Prozesse:',
  fragen: ['Wo geht Zeit verloren?', 'Wo entstehen Rückfragen?', 'Wo werden Informationen doppelt erfasst?', 'Wo entstehen Fehler?'],
  schluss: 'Erst danach entwickeln wir die passende Lösung.',
} as const;

/** 7. Referenzen (Jamil #6179). NUR echte Projekte aus REFERENZEN (startseite.ts, Daten wie auf /beispiele/), Ausgangssituation /
 *  Lösung / Ergebnis = dort ausgang / gemacht / ergebnis (nichts erfunden). Zuordnung zu Jamils Kategorien von uns:
 *  Lokale Unternehmen = Destar Lackdoktor (Norderstedt), Handwerksbetriebe = Bauwelt Handwerk, Dienstleister = Kerim Tanrikulu +
 *  Funkelfilm. Mittelständische Unternehmen: noch kein echtes Projekt → nur in der Vorschau mit „Beispiel folgt“, live ausgeblendet.
 *  ilm me up (Medienplattform) passt in keine der vier Kategorien und steht weiter auf /beispiele/. */
export const J_REFERENZEN = {
  titel: 'So unterschiedlich unsere Kunden sind, so ähnlich sind ihre Ziele.',
  kategorien: [
    { icon: 'lokal', name: 'Lokale Unternehmen', projekte: ['Destar Lackdoktor'] },
    { icon: 'handwerk', name: 'Handwerksbetriebe', projekte: ['Bauwelt Handwerk'] },
    { icon: 'dienst', name: 'Dienstleister', projekte: ['Kerim Tanrikulu', 'Funkelfilm'] },
    { icon: 'mittelstand', name: 'Mittelständische Unternehmen', projekte: [] as string[] },
  ],
  felder: { ausgang: 'Ausgangssituation', gemacht: 'Lösung', ergebnis: 'Ergebnis' },
  folgt: 'Beispiel folgt', // nur Vorschau
  alle: 'Alle Beispiele ansehen', // → /beispiele/
};

/** 8. Vertrauen (Jamil #6179). Keine konkreten Reaktionszeiten: in AGB/site.ts steht keine Zahl (AGB § 2a nur „werktags 9–18 Uhr“
 *  für angegebene Antwortzeiten), darum nur Jamils Nutzen-Satz statt ITSM/SLA-Fachbegriffen. */
export const J_VERTRAUEN = {
  titel: 'Verlässlichkeit statt Überraschungen.',
  punkte: ['Persönlicher Ansprechpartner', 'Fester Monatspreis', 'Definierte Reaktionszeiten', 'Laufende Betreuung', 'Umsetzung durch feste Prozesse', 'Website und WebApps aus einer Hand'],
  satz: 'Klare Abläufe und definierte Reaktionszeiten sorgen dafür, dass Anfragen nicht untergehen.',
} as const;

/** Abschluss-CTA (Jamil #6179); Knopf „Kostenlose Erstberatung vereinbaren“ = ABSCHLUSS_KNOPF (variante.ts) */
export const J_ABSCHLUSS = {
  titel: 'Erzählen Sie uns einfach, was Sie vorhaben.',
  ohne: ['Keine technische Spezifikation.', 'Keine langen Lastenhefte.', 'Keine komplizierten Briefings.'],
  text: ['Beschreiben Sie Ihre Idee so, wie Sie sie einem Kollegen erklären würden.', 'Wir kümmern uns um den Rest.'],
} as const;
