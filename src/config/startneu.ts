// STARTSEITE unter dem Hero, Neudesign (Jamil, Sprachnachricht Talk qh87y3sj #5810, 13.11.2026: „komplett neu designen, passend
// zu unserem Design … Inhalte dazu, wenn nötig, Überflüssiges entfernen … den Hero nicht anfassen“; davor „tob dich aus“).
// Sicherung des alten Stands: Tag vor-startseite-neudesign-20261113. Sechs Teile wie abgestimmt (#5787–#5791):
//   1 Aufmerksamkeit (Hero unverändert + zwei Produkte) · 2 Problem · 3 Lösung (Kundenreise mit den Leistungen je Station, Beispiel)
//   · 4 Beweis (echte Projekte, „Ganz entspannt“, Team nur Vorschau) · 5 Angebot (Pakete, Sicherheit, Fragen) · 6 Handlung (Ablauf + Erstberatung)
// Hier stehen NUR die neuen, verbindenden Texte. Jamils Texte kommen unverändert aus ihren Dateien (KUNDENREISE in variante.ts,
// ENTSPANNT/REFERENZEN/TEAM/CLAIM in startseite.ts, VORGEHEN in vorgehen.ts). Preise und Leistungen NIE hier, immer aus pakete-abo.ts.
import type { IconName } from './site';
import type { AboPaket } from './pakete-abo';

/** Abschnitt 1, zweiter Teil: zwei Produkte (Texte wie bisher in start/StartProdukte.astro, #5787–#5791) */
export const PRODUKTE = {
  titel: 'Eine Website, die Kunden bringt. Und eine App, die Ihnen Arbeit abnimmt.',
  lead: 'Sie starten mit der Website. Die Betriebs-App kommt dazu, wenn Sie so weit sind.',
  website: { titel: 'Ihre Website', text: 'Von uns gebaut und danach betreut.', chat: 'Änderungen jederzeit per Chat oder Sprachnachricht.', link: 'Pakete ansehen' },
  app: { titel: 'Ihre Betriebs-App', link: 'So kann es bei Ihnen laufen' },
};

/** Abschnitt 2: Problem. Drei Schmerzpunkte mit den Strichgrafiken aus /geschichte/ (Texte wie bisher, #5787–#5791) */
export const PROBLEM = {
  kennzeile: 'Kennen Sie das?',
  titel: 'Gute Arbeit allein reicht heute nicht.',
  punkte: [
    { grafik: 'suche', titel: 'Kunden suchen Sie. Und finden andere.', text: 'Wer bei Google nicht weit oben steht oder eine veraltete Seite hat, bekommt die Anfrage nicht.' },
    { grafik: 'abend', titel: 'Angebote schreiben Sie abends.', text: 'Nach dem Arbeitstag noch Preise ausrechnen und Texte tippen. Bis das Angebot raus ist, vergehen Tage.' },
    { grafik: 'rechnung', titel: 'Rechnungen gehen spät raus.', text: 'Zeiten, Material und Notizen liegen verteilt. Bis alles beisammen ist, kommt Ihr Geld später als nötig.' },
  ],
  ueberleitung: 'Genau das lösen wir.',
};

/** Abschnitt 3: je Station der Kundenreise, womit wir den guten Zustand erreichen. Verweise auf Leistungen in pakete-abo.ts
 *  (paket + id → Text genau wie dort definiert) bzw. das Komplettpaket. Ersetzt den Abschnitt „So machen wir aus Besuchern Kunden.“
 *  (UMSETZUNG), dessen fünf Punkte hier je Station stehen. Reihenfolge = KUNDENREISE.stationen. */
export type LeistungsVerweis = { paket: AboPaket['id']; id: string } | { komplett: true };
export const REISE = {
  symbole: ['eye', 'shield', 'chat', 'ablauf', 'users'] as IconName[],
  grafiken: ['aufmerksamkeit', 'vertrauen', 'anfrage', 'bearbeitung', 'betreuung'] as const,
  dafuer: 'Dafür sorgen wir mit',
  leistungen: [
    [{ paket: 'basis', id: 'website' }, { paket: 'basis', id: 'seo' }, { paket: 'basis', id: 'google-profil' }],
    [{ paket: 'basis', id: 'website' }, { paket: 'plus', id: 'google-pflege' }, { paket: 'basis', id: 'ki' }],
    [{ paket: 'basis', id: 'website' }, { paket: 'basis', id: 'email' }, { paket: 'plus', id: 'mail-ordner' }],
    [{ komplett: true }, { paket: 'plus', id: 'mail-ordner' }],
    [{ komplett: true }, { paket: 'plus', id: 'bericht' }],
  ] as LeistungsVerweis[][],
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
