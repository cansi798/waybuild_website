// STARTSEITE unter dem Hero, Neudesign (Jamil, Sprachnachricht Talk qh87y3sj #5810, 13.11.2026: „komplett neu designen, passend
// zu unserem Design … Inhalte dazu, wenn nötig, Überflüssiges entfernen … den Hero nicht anfassen“; davor „tob dich aus“).
// Sicherung des alten Stands: Tag vor-startseite-neudesign-20261113. Sechs Teile wie abgestimmt (#5787–#5791):
//   1 Aufmerksamkeit (Hero unverändert + zwei Produkte) · 2 Problem · 3 Lösung (Kundenreise mit den Leistungen je Station, Beispiel)
//   · 4 Beweis (echte Projekte, „Ganz entspannt“, Team nur Vorschau) · 5 Angebot (Pakete, Sicherheit, Fragen) · 6 Handlung (Ablauf + Erstberatung)
// Hier stehen NUR die neuen, verbindenden Texte. Jamils Texte kommen unverändert aus ihren Dateien (KUNDENREISE in variante.ts,
// ENTSPANNT/REFERENZEN/TEAM/CLAIM in startseite.ts, VORGEHEN in vorgehen.ts). Preise und Leistungen NIE hier, immer aus pakete-abo.ts.
import type { IconName } from './site';

/** Abschnitt 1, zweiter Teil: zwei Produkte (Texte wie bisher in start/StartProdukte.astro, #5787–#5791) */
export const PRODUKTE = {
  titel: 'Eine Website, die Kunden bringt. Und eine App, die Ihnen Arbeit abnimmt.',
  lead: 'Sie starten mit der Website. Die Betriebs-App kommt dazu, wenn Sie so weit sind.',
  website: { titel: 'Ihre Website', text: 'Von uns gebaut und danach betreut.', chat: 'Änderungen jederzeit per Chat oder Sprachnachricht.', link: 'Pakete ansehen' },
  // Jamil #5816/#5817 (13.11.2026): Änderungen per Chat/Sprachnachricht gelten auch für die App; erkennbar machen, dass mit der App
  // „wirklich nahezu alles möglich ist“ – auch eigene Abläufe, Rechner und mehr. Beispiele = Bausteine, die wir schon zeigen (Beispiel-Film).
  app: {
    titel: 'Ihre Betriebs-App',
    text: 'Eine Software, die genau zu Ihrem Betrieb passt: Anfrage, Angebot, Auftrag und Rechnung greifen ineinander. Dazu bauen wir, was Sie sonst brauchen.',
    beispiele: ['Von Anfrage bis Abschluss', 'Preisrechner', 'Terminbuchung', 'Kundenportal', 'Checklisten vor Ort', 'Zeiten und Material', 'Ihre eigenen Abläufe'],
    beispieleTitel: 'Zum Beispiel',
    chat: 'Änderungen jederzeit per Chat oder Sprachnachricht.',
    link: 'So kann es bei Ihnen laufen',
  },
};

/** Abschnitt 2: Problem. Neun Schmerzpunkte mit den Strichgrafiken aus /geschichte/ (eine je Grafik) und eine Liste weiterer
 *  Alltagsprobleme. Jamil #5819 (13.11.2026): „noch mehr typische Probleme … es soll nach vielen Problemen aussehen, für die wir
 *  eine Lösung haben“ (Prozesse nicht eingehalten, Nachrichten unbeantwortet, Kunde fragt nach Zwischenstand, Infos verstreut).
 *  #5826: + „Website-Änderungen dauern ewig“, „Individuelle Wünsche kosten viel Geld“. #5828: „zu viele Karten … smarter per Animation,
 *  mit der Maus drüberfahren, mobil per Klick“ → Liste + Bildfläche (SnProblem.astro). Nur Probleme, die Website, Plus-Pflege oder Betriebs-App wirklich lösen. Reihenfolge = Weg des Kunden (finden → Auftrag → Geld). */
export const PROBLEM = {
  kennzeile: 'Kennen Sie das?',
  titel: 'Gute Arbeit allein reicht heute nicht.',
  lead: 'Im Alltag kostet vieles Zeit, Nerven und Aufträge. Das meiste davon lässt sich lösen.',
  punkte: [
    { grafik: 'suche', titel: 'Kunden suchen Sie. Und finden andere.', text: 'Wer bei Google nicht weit oben steht, bekommt die Anfrage nicht.' },
    { grafik: 'alt', titel: 'Die Website wirkt veraltet.', text: 'Besucher entscheiden in Sekunden. Eine alte Seite kostet Vertrauen, bevor jemand anruft.' },
    { grafik: 'aenderung', titel: 'Website-Änderungen dauern ewig.', text: 'Neue Öffnungszeiten, ein neues Foto: Bis es online ist, vergehen Wochen. Oder Sie machen es abends selbst.' },
    { grafik: 'telefon', titel: 'Nachrichten bleiben zu lange liegen.', text: 'Anrufe, E-Mails, WhatsApp. Wer nicht schnell antwortet, verliert den Auftrag an andere.' },
    { grafik: 'abend', titel: 'Angebote schreiben Sie abends.', text: 'Nach dem Arbeitstag noch Preise ausrechnen und Texte tippen. Bis das Angebot raus ist, vergehen Tage.' },
    { grafik: 'stand', titel: 'Kunden fragen ständig nach dem Stand.', text: 'Wann geht es los? Wie weit sind Sie? Jede Nachfrage unterbricht Ihre Arbeit.' },
    { grafik: 'zettel', titel: 'Informationen sind überall verteilt.', text: 'Zettel, Handy, E-Mail und Kopf. Wer etwas sucht, sucht lange. Und manches geht verloren.' },
    { grafik: 'plan', titel: 'Abläufe werden nicht eingehalten.', text: 'Jeder macht es ein bisschen anders. Schritte werden vergessen, Fehler wiederholen sich.' },
    { grafik: 'papier', titel: 'Zeiten und Material stehen auf Papier.', text: 'Am Ende der Woche wird abgetippt. Das kostet Zeit und Fehler schleichen sich ein.' },
    { grafik: 'rechnung', titel: 'Rechnungen gehen spät raus.', text: 'Bis alles beisammen ist, vergehen Tage. Ihr Geld kommt später als nötig.' },
    { grafik: 'kosten', titel: 'Individuelle Wünsche kosten viel Geld.', text: 'Ein eigener Rechner oder ein besonderer Ablauf? Oft heißt das: neues Projekt, neuer Preis.' },
  ],
  /** Bedienhinweis über der Liste (Jamil #5828: am PC per Maus drüberfahren, am Handy per Tippen) */
  hinweisMaus: 'Fahren Sie mit der Maus über ein Problem.',
  hinweisTippen: 'Tippen Sie auf ein Problem.',
  // #5833 (14.11.2026): „nimmt noch zu viel Platz ein“ → kompakte Stichwort-Kacheln + eine Bildfläche, „weitere“ als eine Zeile
  weitereTitel: 'Und oft auch das',
  weitere: [
    'Angebote werden nicht nachgefasst',
    'Termine werden doppelt vergeben',
    'Kein Überblick über offene Aufträge',
    'Mitarbeitende fragen immer wieder dasselbe',
    'Bei Krankheit oder Urlaub weiß niemand Bescheid',
    'Kaum Bewertungen bei Google',
    'Kunden finden Öffnungszeiten und Preise nicht',
  ],
  ueberleitung: 'Genau das lösen wir.',
};

/** Abschnitt 3: Grafik und „Löst“-Zeile je Station der Kundenreise. Reihenfolge = KUNDENREISE.stationen. Die Leistungs-Chips
 *  („Dafür sorgen wir mit“), Symbole und „1 / 5“ sind seit Jamil #5834/#5837 (14.11.2026) entfernt. */
export const REISE = {
  grafiken: ['aufmerksamkeit', 'vertrauen', 'anfrage', 'bearbeitung', 'betreuung'] as const,
  /** Jamil #5824 (e): je Station, welche Probleme aus Abschnitt 2 sie löst (Kurzform der Titel in PROBLEM) */
  loestTitel: 'Löst',
  loest: [
    ['Kunden finden andere', 'Website-Änderungen dauern ewig'],
    ['Die Website wirkt veraltet', 'Kunden finden Öffnungszeiten und Preise nicht'],
    ['Nachrichten bleiben zu lange liegen', 'Termine werden doppelt vergeben'],
    ['Angebote schreiben Sie abends', 'Informationen sind überall verteilt', 'Abläufe werden nicht eingehalten', 'Rechnungen gehen spät raus'],
    ['Kunden fragen ständig nach dem Stand', 'Angebote werden nicht nachgefasst', 'Kaum Bewertungen bei Google'],
  ],
};

/** Abschnitt 4: Beweis */
export const BEWEIS = {
  kennzeile: 'Echte Projekte',
  /** nur diese drei (wie auf /geschichte/): eine online, zwei Vorschau, alle mit eigenen Messwerten */
  auswahl: ['Bauwelt Handwerk', 'Destar Lackdoktor', 'Funkelfilm'],
  alle: 'Alle Beispiele ansehen',
  vergleich: 'Im Vergleich mit Baukasten und Agentur',
};

/** Abschnitt 5: Angebot. Sicherheit nur mit Aussagen, die in pakete-abo.ts, site.ts (IN_ALLEN, FAQ) oder vorgehen.ts stehen. */
export const ANGEBOT = {
  kennzeile: 'Pakete',
  titel: 'Zwei Pakete. Feste Monatspreise.',
  lead: 'Einrichtung, Technik und Betreuung sind im Monatspreis enthalten. Keine Einrichtungsgebühr. So bleiben Ihre Kosten planbar.',
  appTitel: 'Die Betriebs-App dazu',
  sicherheit: [
    { icon: 'euro', titel: 'Keine Einrichtungsgebühr', text: 'Auch die Einrichtung von Website und Google-Profil ist im Monatspreis enthalten.' },
    { icon: 'chat', titel: 'Erstgespräch kostenlos', text: 'Rund 20 Minuten, unverbindlich. Wir empfehlen das passende Paket.' },
    { icon: 'server', titel: 'Hosting in Deutschland', text: 'Mit SSL, Domain, Updates und Backups im Monatspreis.' },
    { icon: 'doc', titel: 'Verbindlich erst mit Vertrag', text: 'Kein Online-Kauf: Sie bekommen Vertrag und Auftragsbestätigung per E-Mail.' },
  ] as { icon: IconName; titel: string; text: string }[],
  fragenTitel: 'Häufige Fragen',
  /** Fragen genau so, wie sie in site.ts/pakete-abo.ts stehen (Antworten von dort, über alleFragen() in fragen.ts) */
  fragen: [
    'Gibt es Einrichtungskosten?',
    'Wie lange läuft der Vertrag?',
    'Wie schnell ist meine Website online?',
    'Kann ich später in ein größeres Paket wechseln?',
    'Kann ich meine bestehende Domain mitnehmen?',
    'Sind die Preise netto?',
  ],
  alleFragen: 'Alle Fragen ansehen',
  allePreise: 'Alle Inhalte, Vergleich und Zusatzleistungen',
};

/** Abschnitt 6: Handlung. Überschrift = KUNDENREISE.schluss (Jamil #5662), Ablauf = VORGEHEN.schritte. */
export const HANDLUNG = {
  ablaufTitel: 'So geht es los',
  oder: 'Lieber schreiben?',
  whatsapp: 'Per WhatsApp anfragen',
  waText: 'Hallo waybuild, ich interessiere mich für eine kostenlose Erstberatung.',
};

/** Wörter mit Bindestrich wie „E-Mail-Postfächern“ nicht am Bindestrich umbrechen (sah am Handy aus wie „E-“ / „Mail“):
 *  liefert Textteile, `nb` = in <span class="sn-nb"> (white-space: nowrap) setzen. Nur für kurze Wörter mit „E-Mail“. */
export const nbTeile = (t: string) => t.split(/(E-Mail[\wäöüÄÖÜß-]*)/).filter(Boolean).map((s) => ({ s, nb: s.startsWith('E-Mail') }));
