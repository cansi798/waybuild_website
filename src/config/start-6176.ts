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
  weiterentwickelnAbschnitt: true, // false = „Wir entwickeln uns mit Ihrem Unternehmen weiter.“ (J_ANDERS) ausblenden
};
/** Pakete kompakt (SnAngebot) bleiben sichtbar, zwischen 8 Vertrauen und Abschluss-CTA (Vertrauen endet mit „Fester Monatspreis“). */
export const PAKETE_ZEIGEN = true;

/** Hero-Preiszeile (Jamil #6396, 19.11.2026): Preise hier ändern, Text baut sich in J_HERO.preiszeile daraus. */
export const HERO_PREISE = {
  website: 54.99, // „Handprogrammierte Websites ab … / Monat“
  software: 199.99, // „Individuelle Software ab … / Monat“
  /** Zusatz hinter den Preisen – Jamil wird gefragt; vorerst ohne. Option: ' zzgl. MwSt.' */
  mwst: '',
  // mwst: ' zzgl. MwSt.',
};
const preis = (n: number) => `${n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\u00a0€`;
/** Headline-Wort (Jamil wird gefragt, ob „Reibungslos“ statt „Effizient“): nur dieses eine Wort ändern. */
const HERO_WORT = 'Effizient'; // Alternative: 'Reibungslos'

/** 1. Hero (Jamil #6176) */
export const J_HERO = {
  /** Headline + Subheadline seit Jamil #6366/#6368/#6370 (19.11.2026) WÖRTLICH (Variante 1 mit „nahtlos“, freigegeben mit „ok“).
   *  Vorher (#6176): titel 'Sagen Sie einfach, was Sie brauchen.', unter 'Ob Website, Änderung oder individuelle WebApp: Beschreiben Sie
   *  Ihre Idee per Chat, Sprachnachricht oder Screenshot. Wir kümmern uns um die Umsetzung.' */
  titel: `Stark nach außen. ${HERO_WORT} nach innen.`,
  // Subheadline seit Jamil #6376 (19.11.2026) WÖRTLICH; davor kurz (#6366/#6368, Variante 1): 'Viele Unternehmen haben eine Website, aber
  // kein System dahinter. Wir entwickeln Webauftritte und Software, die nahtlos ineinandergreifen – für begeisterte Kunden und produktive Teams.'
  unter: 'Standard-Tools passen selten zum echten Arbeitsalltag. Wir entwickeln Ihren Webauftritt und maßgeschneiderte Software, die exakt so funktioniert, wie Ihr Betrieb arbeitet.',
  zeile: 'Keine Tickets. Kein CMS. Keine Technikkenntnisse.',
  knopf: 'Kostenlose Beratung', // Ziel: Kontakt, Anliegen Erstberatung (ANLIEGEN.erstberatung)
  knopf2: 'Beispiele ansehen', // Ziel: /beispiele/
  /** Ruhige Zeile direkt unter den Knöpfen (Jamil #6396, wörtlich; Preise aus HERO_PREISE) */
  preiszeile: [
    `Handprogrammierte Websites ab ${preis(HERO_PREISE.website)}\u00a0/ Monat${HERO_PREISE.mwst}`,
    `Individuelle Software ab ${preis(HERO_PREISE.software)}\u00a0/ Monat${HERO_PREISE.mwst} – ohne hohe Einmalkosten. Kostenlose Vorschau vorab.`,
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
  titel: 'Wo im Arbeitsalltag oft unnötig Zeit liegen bleibt',
  karten: [
    { icon: 'brief', titel: 'Die Website ist nur eine digitale Visitenkarte', text: 'Kunden finden zwar Ihre Telefonnummer, aber Anfragen landen als unvollständige E-Mails im Postfach oder gehen im Trubel unter.' },
    { icon: 'puzzle', titel: 'Sie verbiegen Ihren Alltag für fertige Programme', text: 'Standard-Software zwingt Sie in starre Abläufe. Was das Programm nicht kann, wird am Ende doch wieder mit Excel-Listen und Notizzetteln irgendwie drumherum gebastelt.' },
    { icon: 'pfeile', titel: 'Alles wird doppelt und dreifach abgetippt', text: 'Kundendaten wandern von der E-Mail in eine Excel-Liste, von dort in den Kalender und irgendwann ins Rechnungsprogramm – das kostet Nerven und führt zu Fehlern.' },
    { icon: 'lupe', titel: 'Jeder sucht nach der aktuellen Info', text: 'Absprachen liegen mal im Chat, mal in Ordnern auf dem Server und mal auf einem Notizzettel. Neue Mitarbeitende brauchen Wochen, um durchzublicken.' },
  ],
} as const;

/** 3. Lösung NEU als „Maßarbeit“ (Jamil #6378/#6379, 19.11.2026), Texte WÖRTLICH. Headline + Subheadline aus #6379 (Struktur); der Text aus
 *  #6378 („Ob Kundenportal, Kalkulator …“) steht bewusst NICHT auf der Seite, weil er die Subheadline fast doppelt (im Talk gefragt):
 *  'Ob Kundenportal, Kalkulator auf der Website oder ein internes System für Ihre Aufträge: Wir programmieren genau die Werkzeuge, die Ihrem
 *  Team wirklich Arbeit abnehmen. Ohne überflüssigen Ballast, dafür zu 100 % auf Ihre Abläufe zugeschnitten.'
 *  Darunter der 3-Schritte-Wechsler (J6Wechsler.astro): Tab = Kundenproblem (Zitat), Panel = Mockup (nur HTML/CSS) + Begründungszeile. */
export const J_MASS = {
  titel: 'Websites und Software nach Maß – statt Kompromisse von der Stange',
  unter: 'Wir bauen genau die Werkzeuge, die in Ihrem Betrieb bisher gefehlt haben. Ohne 100 unnötige Funktionen, dafür exakt auf Ihre echten Abläufe zugeschnitten.',
  label: 'Individuell programmiert für Bauwelt Handwerk – 100\u00a0% eigene Abläufe', // seit Jamil #6384 (vorher „… für Musterfirma GmbH …“)
  labelMuster: 'Individuell programmiert für Musterfirma GmbH – 100\u00a0% eigene Abläufe', // nur mit ALT_ZEIGEN.musterfirmaMockupsAlt
  /** Echte Referenz Bauwelt Handwerk (Jamil #6384/#6385): Bildschirmfotos in src/assets/bilder/referenzen/ (Herkunft: QUELLEN.md).
   *  `bild` = Name für <Bild>, `alt` = Alt-Text. Link nur beim Kalkulator. */
  bauwelt: {
    link: { text: 'bauwelt-handwerk.de ansehen', href: 'https://www.bauwelt-handwerk.de/rechner/' },
    bilder: [
      { bild: 'referenzen/bauwelt-kalkulator', alt: 'Projekt-Rechner auf bauwelt-handwerk.de: Ergebnis „Ihre erste Preisspanne“ für eine Badsanierung mit 8 m², 14.340 bis 19.500 Euro inklusive Mehrwertsteuer, darunter der Knopf „Angaben ändern“.' },
      { bild: 'referenzen/bauwelt-auftrag', alt: 'Auftragsübersicht im Bauwelt-CRM mit Testdaten: Auftrag „Ladenumbau Trockenbau“ mit Status-Leiste von Anfrage bis Abgerechnet, Zeiterfassung mit Start und Abfahrt, Aufgabenliste mit Zuständigen sowie Kunde und Einsatzort.' },
      { bild: 'referenzen/bauwelt-kundenportal', alt: 'Kundenportal von Bauwelt Handwerk mit Testdaten: nächster Termin, ein wartendes Angebot zum Annehmen oder Ablehnen, Fortschritt des Auftrags „Ladenumbau Trockenbau“ und persönlicher Projektbegleiter.' },
    ],
  },
  tabsLabel: 'Drei Beispiele aus dem Alltag',
  /** Hinweis unter dem Wechsler (Jamil #6397, wörtlich) */
  browser: { titel: 'Läuft einfach im Browser – ganz ohne Installation',
    text: 'Egal ob am Büro-PC, auf dem Tablet in der Werkstatt oder unterwegs am Handy: Ihr Team loggt sich einfach ein und arbeitet sofort. Keine komplizierte Installation, keine nervigen Updates auf einzelnen Rechnern.' },
  // `kurz` = Beschriftung der Segmentleiste auf dem Handy (dort steht das Zitat über dem Mockup). Beschriftungen in den Mockups sind
  // erfundene Beispielwerte für die „Musterfirma GmbH“ (nur Deko, aria-hidden; `zeigt` ist der Text für Screenreader).
  schritte: [
    { kurz: 'Kalkulator', problem: '„Kunden fragen immer das Gleiche – und wir rechnen alles per Hand aus.“',
      titel: 'Ein individueller Online-Kalkulator auf der Website',
      zeigt: 'Der Kunde wählt auf der Website Maße, Material oder Leistung aus, sieht sofort eine grobe Preisspanne und schickt die Anfrage ab.',
      warum: 'Kein Standard-Kontaktformular! Ein interaktives Werkzeug, das genau nach den Regeln und Preisen des Betriebs rechnet.' },
    { kurz: 'Auftrag', problem: '„Standard-Programme passen nicht zu unseren Aufträgen.“',
      titel: 'Eine maßgeschneiderte Auftrags-Maske',
      zeigt: 'Genau 5 relevante Felder statt 50 überladene Reiter. Aus der Website-Anfrage entsteht automatisch ein Auftrag mit passender Materialliste und Status-Ampel.',
      warum: 'Man sieht sofort: Hier gibt es keinen überflüssigen Ballast wie in großen Standard-CRMs – nur exakt das, was dieses Team braucht.' },
    { kurz: 'Portal', problem: '„Kunden rufen ständig an, um nach dem Stand zu fragen.“',
      titel: 'Ein eigenes Kundenportal mit Login',
      zeigt: 'Eine aufgeräumte Ansicht für den Endkunden: „Ihr Auftrag ist in Fertigung“, dazu alle Angebote, Pläne und Rechnungen an einem Ort zum Download.',
      warum: 'Ein eigenes Portal im Design der Firma – das gibt es nicht von der Stange und lässt das Unternehmen extrem professionell wirken.' },
  ],
} as const;

/** 4. „Erst sehen, dann entscheiden“ (Jamil #6388, 19.11.2026). Texte WÖRTLICH. Badges in den Karten (`pills`, `zeiten`, `sprache`)
 *  sind nur Deko (aria-hidden) und wiederholen, was im Kartentext steht. Der Blitz (⚡) ist ein eigenes SVG-Icon. */
export const J_ERST = {
  titel: 'Kein Lastenheft. Kein Risiko. Erst sehen, dann entscheiden.',
  unter: 'Sie müssen weder seitenlange Konzepte schreiben noch die Katze im Sack kaufen. Wir denken uns in Ihren Betrieb hinein und liefern Ihnen kostenlos einen echten ersten Entwurf.',
  karten: [
    { nr: '01', titel: 'Wir verstehen Ihren Betrieb (oder starten direkt)',
      varianten: [
        { name: 'Für Website & Software:', text: 'In einem lockeren Gespräch nehmen wir Ihre Unternehmens-DNA auf. Als Prozess-Experten hören wir nicht nur zu, sondern bringen direkt eigene Ideen und Verbesserungsvorschläge für Ihren Alltag ein.' },
        { name: 'Nur für Ihre Website (Schnellstart):', text: 'Sie wollen erst mal unverbindlich schauen? Schicken Sie uns einfach Ihre aktuelle Website-Adresse und Kontaktdaten – das reicht für den Start.' },
      ],
      pills: ['Gespräch: Unternehmens-DNA', 'Schnellstart: Nur URL senden'], oder: 'oder' },
    { nr: '02', titel: 'Kostenlose Vorschau in Rekordzeit',
      einleitung: 'Statt trockener Theorie liefern wir Ihnen greifbare Ergebnisse zum Durchklicken:',
      punkte: [
        { name: 'Neue Website-Startseite:', text: 'bereits am nächsten Werktag' },
        { name: 'Erster Software-Prototyp:', text: 'bereits 3 Werktage später' },
      ],
      schluss: 'Komplett kostenlos und unverbindlich – Sie sehen sofort, wie Ihr Betrieb digital aussehen und laufen kann.',
      zeiten: ['Website: Nächster Werktag', 'Software: In 3 Werktagen'] },
    { nr: '03', titel: 'Wenn es passt: Feinschliff in Ihrem Tempo',
      text: 'Gefällt Ihnen unsere Vorschau? Erst dann starten wir gemeinsam durch. Sie bestimmen das Tempo: ob zügig am Stück bis zum Go-live oder entspannt zwischendurch im Alltag. Anpassungen schicken Sie uns einfach per Sprachnachricht, Screenshot oder Chat.',
      sprache: '0:12' },
  ],
} as const;

/** 5. „Keine Angst vor dem Umstieg“ (Jamil #6391, 19.11.2026) als ruhige „Sorglos-Matrix“ 2 × 2: Kundenfrage (Einwand) als
 *  Kartenüberschrift, darunter die Lösung mit grünem Häkchen. Texte WÖRTLICH. Kein Foto, keine Animation. */
export const J_UMSTIEG = {
  titel: 'Keine Angst vor dem Umstieg – wir nehmen Ihr Team mit',
  unter: 'Viele Unternehmen schieben Verbesserungen jahrelang auf, weil sie Chaos beim Wechsel befürchten. Als Prozess-Experten sorgen wir dafür, dass Ihre neuen Lösungen reibungslos in den Alltag einziehen – ohne Stillstand und ohne Frust.',
  karten: [
    { frage: '„Wir haben uns gerade erst an unsere jetzigen Programme gewöhnt.“',
      antwort: 'Sie müssen nicht alles über Bord werfen. Was bei Ihnen gut läuft, binden wir einfach an. Und alles, was wir neu bauen, richten wir exakt nach der Arbeitsweise Ihres Teams aus – damit sich die Oberfläche vom ersten Klick an vertraut anfühlt.' },
    { frage: '„Meine Mitarbeitenden haben keine Zeit für lange Schulungen.“',
      antwort: 'Brauchen sie auch nicht. Weil wir überflüssige Funktionen weglassen und Ihre echten Abläufe abbilden, ist das System selbsterklärend. Jeder sieht nur das, was er für seine Aufgabe braucht – und für den Start zeigen wir alles in wenigen Minuten.' },
    { frage: '„Was passiert mit unseren bestehenden Kundendaten und Listen?“',
      antwort: 'Nichts geht verloren und niemand muss etwas mühsam abtippen. Wir übernehmen den kompletten Umzug Ihrer bestehenden Daten, Kontakte und Inhalte, damit Ihr Team ab Tag 1 nahtlos weiterarbeiten kann.' },
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
