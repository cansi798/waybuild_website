// ENTWURF „Pakete 2027“ (Can, Talk qh87y3sj 4499–4501, 04.11.2026) – NOCH NICHT FREIGEGEBEN.
// Drei Abo-Pakete, Endkundenpreise inkl. 19 % USt (Cans Kalkulation: Bruttopreise).
// Erst nach „Go“ von Can und Jamil in config/site.ts → PAKETE übernehmen und live stellen.

export type Paket2027 = {
  id: 'auftritt' | 'wachstum' | 'marke';
  name: string;
  /** Kurz-Nutzen unter dem Namen */
  kurz: string;
  /** Monatspreis brutto (inkl. 19 % USt) */
  brutto: number;
  /** Für wen – ein Satz aus Kundensicht */
  fuer: string;
  /** Herausgehobene Extras (Signatur, Briefe, Logo) */
  extras: string[];
  features: string[];
  empfohlen?: boolean;
};

export const UST = 0.19;
export const netto = (brutto: number) => Math.round((brutto / (1 + UST)) * 100) / 100;
export const euro2 = (n: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

/** Einführungspreis Paket 1 für die ersten 20 Kunden (Dauer noch festlegen). */
export const EINFUEHRUNG = { brutto: 39.99, kunden: 20, paket: 'auftritt' as const };

export const PAKETE_2027: Paket2027[] = [
  {
    id: 'auftritt',
    name: 'Auftritt',
    kurz: 'Professionell online, ohne Startkosten',
    brutto: 79.99,
    fuer: 'Für Selbstständige und kleine Betriebe, die gut gefunden werden und seriös auftreten wollen.',
    extras: ['E-Mail-Signatur nach DIN 5008'],
    features: [
      'Website mit bis zu 5 Seiten nach persönlichem Erstgespräch',
      'Texte schreiben wir mit Ihnen (KI-gestützt, von uns geprüft)',
      'Google-Unternehmensprofil eingerichtet, Basis-SEO',
      'Hosting, SSL, .de-Domain, Updates und Backups',
      'Änderungen per Sprachnachricht oder Text',
      'Antwort innerhalb von 2 Werktagen',
    ],
  },
  {
    id: 'wachstum',
    name: 'Wachstum',
    kurz: 'Mehr Sichtbarkeit, mehr Anfragen',
    brutto: 149.99,
    fuer: 'Für Unternehmen, die über ihre Website regelmäßig neue Kunden gewinnen wollen.',
    extras: ['E-Mail-Signatur nach DIN 5008', 'Briefvorlage nach DIN 5008 mit Ihrem Logo'],
    features: [
      'Alles aus „Auftritt“, bis zu 10 Seiten',
      '3 lokale Seiten für Ihre Orte oder Leistungen',
      'Google-Profil-Pflege: 2 Beiträge im Monat',
      'Monatsbericht: Besucher, Anfragen, Suchbegriffe',
      'Wir verbessern den Weg zur Anfrage laufend',
      'Antwort innerhalb von 1 Werktag',
    ],
    empfohlen: true,
  },
  {
    id: 'marke',
    name: 'Marke',
    kurz: 'Website, Logo und Geschäftspapiere aus einer Hand',
    brutto: 299.99,
    fuer: 'Für Gründer und Betriebe, die einen einheitlichen Auftritt von der Website bis zum Brief wollen.',
    extras: ['Logo-Design', 'CI-Geschäftsbriefe nach DIN 5008', 'E-Mail-Signatur nach DIN 5008'],
    features: [
      'Alles aus „Wachstum“, bis zu 20 Seiten plus News',
      'Logo: 3 Entwürfe, 2 Korrekturrunden, Dateien für Web und Druck',
      'Kurzer CI-Leitfaden: Farben, Schriften, Logo-Einsatz',
      'Briefbogen, Angebots- und Rechnungsvorlage nach DIN 5008',
      '6 lokale Seiten, Quartalsgespräch zur Weiterentwicklung',
      'Antwort am selben Werktag',
    ],
  },
];

/** In allen drei Paketen enthalten. */
export const IN_ALLEN_2027 = [
  '0 € Einrichtung',
  'Persönliches Erstgespräch',
  'Eigenes Design statt Baukasten-Vorlage',
  'Für Handy, Tablet und PC optimiert',
  'Hosting, SSL und Domain',
  'Wartung, Updates und Backups',
  'Änderungen per Sprachnachricht oder Text',
  'E-Mail-Signatur nach DIN 5008',
];

/** Was uns von anderen Website-Abos abhebt (Stand Wettbewerbsanalyse 04.11.2026). */
export const ABHEBEN_2027 = [
  { titel: '0 € Einrichtung', text: 'Viele Anbieter verlangen 200 bis 1.500 € vorab. Bei uns zahlen Sie nur den Monatspreis.' },
  { titel: 'Änderungen per Nachricht', text: 'Sprachnachricht oder Text genügt. Kein Stundenkonto mit 30 Minuten im Monat.' },
  { titel: 'Mehr als eine Website', text: 'E-Mail-Signatur, Briefvorlage und Logo nach DIN 5008, passend zur Website.' },
  { titel: '12 Monate statt 24 oder 36', text: 'Kurze Mindestlaufzeit, danach monatlich kündbar.' },
];

export const LAUFZEIT_2027 = '12 Monate Mindestlaufzeit, danach monatlich kündbar (Vorschlag)';
