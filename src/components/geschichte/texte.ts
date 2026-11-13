// Entwurf „Startseite als geführte Geschichte“ (/geschichte/, Jamil, Talk qh87y3sj #5739–#5756, „Leg los“, 13.11.2026).
// Konzept: Aufmerksamkeit (Hero + drei Wege) → Problem (3 Schmerzpunkte je Weg) → Lösung (Film je Weg) → Beweis
// (Referenzen, So arbeiten wir, Team) → Angebot (Paket je Weg) → Handlung (Erstberatung + WhatsApp).
// Alle Texte dieser Seite stehen hier. Preise, Referenzen, Team und Ablauf kommen NICHT von hier, sondern aus den
// bestehenden Daten (config/pakete-abo.ts, config/startseite.ts, config/vorgehen.ts).
// Platzhalter in {geschweiften Klammern} füllt das Skript (geschichte.ts) mit der gewählten Branche und dem Firmennamen,
// immer nur als Text (textContent). Ohne JS steht der Standardtext (Maler bzw. „Ihr Betrieb“) da.

export type WegId = 'website' | 'anfragen' | 'betrieb';

export interface Schmerz { titel: string; text: string; vorlage?: string; grafik: string }
export interface Weg {
  id: WegId;
  /** Buchstabe aus dem Konzept (a/b/c), nur intern */
  kurz: 'a' | 'b' | 'c';
  /** Text auf der Auswahlkarte */
  titel: string;
  unter: string;
  /** Problem-Abschnitt */
  schmerzen: [Schmerz, Schmerz, Schmerz];
  /** Lösung: Satz über dem Film */
  loesung: string;
  /** Angebot: Empfehlungssatz (Preise setzt GAngebot.astro aus pakete-abo.ts dazu) */
  paket: string;
}

export const GESCHICHTE_SEITE = {
  titel: 'Mehr Anfragen, weniger Papierkram',
  description: 'Wählen Sie Ihren Weg: Website, mehr Anfragen mit schnelleren Angeboten oder der ganze Betrieb digital. Mit Beispiel-Film, Preisen und Erstberatung.',
};

export const HERO = {
  kennzeile: 'Website, Anfragen und Arbeitsalltag',
  titel: ['Mehr Anfragen.', 'Weniger Papierkram.'],
  unter: 'Wir bauen und betreuen, was Ihr Betrieb online braucht. Von der Website bis zur eigenen Software für Ihre Aufträge.',
  frage: 'Wie sähe das bei Ihnen aus?',
  frageUnter: 'Wählen Sie Ihren Weg. Der Rest der Seite erzählt dann Ihre Geschichte.',
  wegeLegende: 'Ihr Weg',
  branchenLegende: 'Ihre Branche',
  feld: 'Ihr Firmenname (freiwillig)',
  platzhalter: 'z. B. Muster GmbH',
  knopf: 'Meine Geschichte ansehen',
  hinweis: 'Ihre Eingabe bleibt in Ihrem Browser und wird nicht gesendet.',
  ohneJs: 'Springen Sie direkt zu Ihrem Weg:',
};

export const WEGE: Weg[] = [
  {
    id: 'website', kurz: 'a',
    titel: 'Ich brauche eine Website',
    unter: 'Gut gefunden werden und seriös auftreten.',
    schmerzen: [
      { titel: 'Niemand findet Sie online.', grafik: 'suche',
        text: 'Wer „Maler in der Nähe“ sucht, landet bei der Konkurrenz und nicht bei Ihnen.',
        vorlage: 'Wer „{suchwort} in der Nähe“ sucht, landet bei der Konkurrenz und nicht bei Ihnen.' },
      { titel: 'Die Website ist in die Jahre gekommen.', grafik: 'alt',
        text: 'Alte Fotos, alte Preise, am Handy kaum lesbar. Viele springen ab, bevor sie anrufen.' },
      { titel: 'Anfragen am Telefon gehen unter.', grafik: 'telefon',
        text: 'Während Sie beim Kunden sind, klingelt es im Büro. Wer nicht durchkommt, ruft beim Nächsten an.' },
    ],
    loesung: 'Eine Website, die Ihre Arbeit zeigt und Anfragen sauber zu Ihnen bringt.',
    paket: 'Für Ihre Website passt das Paket Basis.',
  },
  {
    id: 'anfragen', kurz: 'b',
    titel: 'Mehr Anfragen und schnellere Angebote',
    unter: 'Vom ersten Klick bis zum Angebot ohne Umwege.',
    schmerzen: [
      { titel: 'Angebote kosten Ihre Abende.', grafik: 'abend',
        text: 'Nach dem Termin sitzen Sie abends noch Stunden am Angebot „Malerarbeiten Wohnzimmer“.',
        vorlage: 'Nach dem Termin sitzen Sie abends noch Stunden am Angebot „{angebotTitel}“.' },
      { titel: 'Kunden fragen ständig nach dem Stand.', grafik: 'stand',
        text: '„Wann geht es los?“ Jede Nachfrage kostet Sie einen Anruf oder eine Nachricht.' },
      { titel: 'Zettelwirtschaft.', grafik: 'zettel',
        text: 'Notizen vom Termin, Fotos im Handy, Preise im Kopf. Nichts liegt an einem Ort.' },
    ],
    loesung: 'Vom Suchtreffer über das Angebot bis zur Rechnung, alles greift ineinander.',
    paket: 'Für mehr Anfragen passt das Paket Plus. Für schnellere Angebote kommt das Komplettpaket dazu.',
  },
  {
    id: 'betrieb', kurz: 'c',
    titel: 'Mein ganzer Betrieb digital',
    unter: 'Planung, Zeiten und Rechnungen in einer Software.',
    schmerzen: [
      { titel: 'Die Tagesplanung ist jeden Morgen Chaos.', grafik: 'plan',
        text: 'Wer ist heute wo? Termine stehen im Kalender, auf Zetteln und im Kopf.' },
      { titel: 'Zeiten und Material stehen auf Papier.', grafik: 'papier',
        text: 'Stundenzettel und Materiallisten werden abends abgetippt, wenn sie nicht verloren gehen.' },
      { titel: 'Rechnungen gehen spät raus.', grafik: 'rechnung',
        text: 'Bis alles beisammen ist, vergehen Wochen. Ihr Geld kommt später als nötig.' },
    ],
    loesung: 'Ein Tag im Betrieb: Planung, Zeiten, Material und Rechnung in einer Software, die zu Ihren Abläufen passt.',
    paket: 'Für Ihren ganzen Betrieb passt das Komplettpaket, zusammen mit Basis oder Plus.',
  },
];

export const STANDARD_WEG: WegId = 'anfragen';
/** sessionStorage-Schlüssel für den gewählten Weg (Branche + Firma liegen unter dem Schlüssel des Films, siehe geschichte.ts) */
export const WEG_SPEICHER = 'waybuild-geschichte-weg';

export const PROBLEM = {
  kennzeile: 'Das kennen Sie',
  titel: 'Kennen Sie das?',
  lead: 'So geht es vielen Betrieben wie Ihrem.',
  leadFirma: 'So geht es vielen Betrieben wie {firma}.',
};

export const LOESUNG = {
  kennzeile: 'Die Lösung',
  titel: 'So löst waybuild das.',
  /** Titel des Startbilds im bestehenden Film (dort sonst „Wie sähe das bei Ihnen aus?“, doppelt zum Hero) */
  filmStart: 'So kann es bei Ihnen laufen.',
  filmStartFirma: 'So kann es bei {firma} laufen.',
  platzhalter: 'Film folgt',
  platzhalterText: 'Dieser Film ist noch in Arbeit.',
};

export const WEG_WAHL = { legende: 'Weg wechseln', aktiv: 'Ihr Weg' };

export const BEWEIS = {
  kennzeile: 'Darauf können Sie bauen',
  referenzenTitel: 'Echte Projekte unserer Kunden.',
  alle: 'Alle Beispiele ansehen',
  arbeitenTitel: 'So arbeiten wir.',
  arbeitenUnter: 'In drei Schritten zu Ihrer Lösung.',
};

export const ANGEBOT = {
  kennzeile: 'Pakete',
  titel: 'Klare Preise. Feste Monatspreise.',
  lead: 'Einrichtung, Technik und Betreuung sind im Monatspreis enthalten. Keine Einrichtungsgebühr.',
  empfehlung: 'Unsere Empfehlung für Sie',
  wachsenTitel: 'Klein anfangen, jederzeit erweitern.',
  wachsenText: 'Starten Sie mit dem, was Sie heute brauchen. Ein Wechsel in ein größeres Paket ist möglich, sagen Sie uns einfach Bescheid.',
  alle: 'Alle Inhalte, Vergleich und Zusatzleistungen ansehen',
};

export const HANDLUNG = {
  kennzeile: 'Ihr nächster Schritt',
  titel: 'Wir zeigen Ihnen in 20 Minuten, wie das bei Ihnen aussehen würde.',
  /** {firma} = Firmenname des Besuchers (nur als Text gesetzt) */
  titelFirma: 'Wir zeigen Ihnen in 20 Minuten, wie das bei {firma} aussehen würde.',
  text: 'Kostenlos und unverbindlich. Wir hören zu und empfehlen das passende Paket.',
  whatsapp: 'Per WhatsApp schreiben',
  waText: 'Hallo waybuild, ich interessiere mich für eine kostenlose Erstberatung.',
  waTextWeg: 'Hallo waybuild, ich interessiere mich für eine kostenlose Erstberatung. Mein Thema: {weg}.',
};
