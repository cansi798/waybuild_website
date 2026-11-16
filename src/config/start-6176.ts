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
};
/** Pakete kompakt (SnAngebot) bleiben sichtbar, zwischen 8 Vertrauen und Abschluss-CTA (Vertrauen endet mit „Fester Monatspreis“). */
export const PAKETE_ZEIGEN = true;

/** 1. Hero (Jamil #6176) */
export const J_HERO = {
  titel: 'Sagen Sie einfach, was Sie brauchen.',
  unter: 'Ob Website, Änderung oder individuelle WebApp: Beschreiben Sie Ihre Idee per Chat, Sprachnachricht oder Screenshot. Wir kümmern uns um die Umsetzung.',
  zeile: 'Keine Tickets. Kein CMS. Keine Technikkenntnisse.',
  knopf: 'Kostenlose Beratung', // Ziel: Kontakt, Anliegen Erstberatung (ANLIEGEN.erstberatung)
  knopf2: 'Beispiele ansehen', // Ziel: /beispiele/
  /** Hero-Visual: großes Smartphone mit drei echten Beispielen als Chat-Verlauf (Emojis als eigene SVG-Icons) */
  chat: [
    { art: 'sprache', nachricht: '„Füge unsere neuen Öffnungszeiten hinzu.“', ergebnis: 'Website aktualisiert' },
    { art: 'screenshot', zusatz: 'Screenshot + Markierung', nachricht: '„So soll die Seite aussehen.“', ergebnis: 'Design umgesetzt' },
    { art: 'chat', nachricht: '„Wir brauchen eine digitale Urlaubsverwaltung.“', ergebnis: 'WebApp erstellt' },
  ],
} as const;

/** 2. Problem-Section (Jamil #6176) */
export const J_PROBLEM = {
  titel: 'Digitale Lösungen sollten Arbeit sparen. Nicht verursachen.',
  einleitung: ['Viele Unternehmen möchten ihre Website aktualisieren oder Prozesse digitalisieren.', 'Stattdessen entstehen:'],
  karten: [
    { titel: 'Änderungen dauern ewig', text: 'Tickets schreiben. Abstimmen. Warten.' },
    { titel: 'Niemand möchte neue Software lernen', text: 'Noch ein Login. Noch eine Schulung. Noch ein System.' },
    { titel: 'Gute Ideen bleiben liegen', text: 'Weil die Umsetzung zu aufwendig erscheint.' },
    { titel: 'Jeder Anbieter macht etwas anderes', text: 'Website hier. Software dort. Support woanders.' },
  ],
  abschluss: 'Digitale Lösungen sollten sich Ihrem Unternehmen anpassen. Nicht umgekehrt.',
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

/** 4. Was webgold anders macht (Jamil #6179) */
export const J_ANDERS = {
  titel: 'Die meisten Anbieter liefern Projekte. Wir begleiten die Entwicklung Ihres Unternehmens.',
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
