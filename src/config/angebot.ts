// Angebot jenseits des Website-Abos (Wunsch 11.10.2026): Säulen, Pakete, Stundensätze, Abo-Übersicht.
// EINZIGE Quelle für diese Preise – Detailseiten, /preise/, Startseite, llms.txt und JSON-LD lesen von hier.
// Herleitung der Preise: docs/wettbewerbsanalyse-2026-10.md. Alle Preise netto zzgl. 19 % USt., nur B2B.
import { plans, type IconName } from './site';

export type Saeule = 'websites' | 'software' | 'cloud' | 'beratung';

export type Paket = {
  name: string;
  /** Für wen – ein kurzer Satz */
  fuer: string;
  /** Angezeigter Preis inkl. „ab“, z. B. „ab 2.900 €“ oder „7,90 €“ */
  preis: string;
  /** Numerischer Preis (netto) für JSON-LD */
  wert: number;
  /** z. B. „pro Nutzer / Monat“, „einmalig“ */
  einheit: string;
  /** Wiederkehrend (Abo) oder einmalig */
  monatlich: boolean;
  /** Kleingedrucktes unter dem Preis, z. B. Mindestmenge */
  hinweis?: string;
  features: string[];
  highlight?: boolean;
};

export type Zusatz = { name: string; preis: string };

/** Stundensatz/Tagessatz netto – Basis für alles, was nicht im Paket steckt. */
export const STUNDENSATZ = 95;
export const TAGESSATZ = 760;
/** Zusatzstunden für Kunden mit Pflege-/Betreuungsvertrag */
export const STUNDENSATZ_VERTRAG = 85;

/** Laufzeit-Regel für alle Abos (wie beim Website-Abo). */
export const ABO_LAUFZEIT = '12 Monate Mindestlaufzeit, danach monatlich kündbar';
/** Für Übersichten mit allen Abos (Markt-Monitoring ist die Ausnahme) */
export const ABO_LAUFZEIT_ALLE = `${ABO_LAUFZEIT} (Ausnahme: Markt-Monitoring ist monatlich kündbar)`;
export const NETTO_HINWEIS = 'Alle Preise netto zzgl. 19 % USt. Unser Angebot richtet sich ausschließlich an Unternehmen, Selbstständige und Institutionen.';
export const REAKTION_HINWEIS = 'Antwortzeiten gelten werktags (Mo–Fr, 9–18 Uhr) und beschreiben, wann wir mit der Bearbeitung beginnen – nicht die Lösungszeit.';

const eur = (n: number, ab = false) =>
  `${ab ? 'ab ' : ''}${new Intl.NumberFormat('de-DE', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n)} €`;

/* ───────────── Software ───────────── */

export const SOFTWARE_PROJEKTE: Paket[] = [
  {
    name: 'Konzept-Workshop',
    fuer: 'Für den sicheren Start: erst verstehen, dann bauen',
    preis: eur(1490), wert: 1490, einheit: 'Festpreis, einmalig', monatlich: false,
    hinweis: 'Wird bei Beauftragung der Umsetzung vollständig angerechnet',
    features: ['2 Tage Analyse & Workshop (vor Ort oder per Video)', 'Aufnahme Ihrer Abläufe und Anforderungen', 'Lösungsskizze mit Klick-Prototyp', 'Festpreis-Angebot für die Umsetzung'],
  },
  {
    name: 'Tool & Automatisierung',
    fuer: 'Für wiederkehrende Abläufe, die heute Zeit kosten',
    preis: eur(2900, true), wert: 2900, einheit: 'Festpreis, einmalig', monatlich: false,
    features: ['Interne Tools, Formulare und Auswertungen', 'Schnittstellen zwischen Ihren Programmen (z. B. Shop, Buchhaltung, CRM)', 'Automatisierung von E-Mails, Dokumenten, Exporten', 'Dokumentation & Einweisung'],
    highlight: true,
  },
  {
    name: 'Fachanwendung',
    fuer: 'Für Kernprozesse, die keine Standardsoftware abbildet',
    preis: eur(19000, true), wert: 19000, einheit: 'Festpreis nach Konzept', monatlich: false,
    features: ['Individuelle Geschäftsanwendung mit Rollen & Rechten', 'Datenbank, Schnittstellen, Berichte', 'Umsetzung in Etappen mit Zwischenständen', 'Quellcode und Dokumentation gehören Ihnen'],
  },
];

export const WEBDEV_PAKETE: Paket[] = [
  {
    name: 'Entwicklung nach Aufwand',
    fuer: 'Für Erweiterungen bestehender Systeme',
    preis: eur(STUNDENSATZ), wert: STUNDENSATZ, einheit: 'pro Stunde', monatlich: false,
    hinweis: `Tagessatz ${eur(TAGESSATZ)} · Abrechnung im 15-Minuten-Takt`,
    features: ['Anpassungen an bestehenden Web-Anwendungen', 'Fehleranalyse & Performance-Optimierung', 'Transparente Zeiterfassung', 'Kein Mindestumfang'],
  },
  {
    name: 'Web-Anwendung (MVP)',
    fuer: 'Für neue digitale Produkte und Kundenportale',
    preis: eur(7900, true), wert: 7900, einheit: 'Festpreis, einmalig', monatlich: false,
    features: ['Konzept, UX-Entwurf und Umsetzung', 'Kundenportal, Buchungs- oder Bestellsystem, Dashboard', 'Login, Rollen, Datenbank, Schnittstellen', 'Läuft auf jedem Gerät – ohne App-Store'],
    highlight: true,
  },
  {
    name: 'Schnittstelle / API',
    fuer: 'Für Programme, die miteinander reden sollen',
    preis: eur(1900, true), wert: 1900, einheit: 'Festpreis, einmalig', monatlich: false,
    features: ['Anbindung an Warenwirtschaft, CRM, Zahlungsanbieter', 'Datenabgleich statt Abtippen', 'Fehlerprotokoll & Benachrichtigung', 'Dokumentierte, wartbare Lösung'],
  },
];

export const PFLEGE_PAKETE: Paket[] = [
  {
    name: 'Pflege S',
    fuer: 'Für kleine Anwendungen und Tools',
    preis: eur(249), wert: 249, einheit: 'pro Monat', monatlich: true,
    features: ['Betrieb & Hosting in Deutschland', 'Sicherheitsupdates, Backups, Überwachung', '2 Std. Weiterentwicklung / Monat', 'Antwortzeit: nächster Werktag'],
  },
  {
    name: 'Pflege M',
    fuer: 'Für Anwendungen im täglichen Einsatz',
    preis: eur(590), wert: 590, einheit: 'pro Monat', monatlich: true,
    features: ['Alles aus S', '6 Std. Weiterentwicklung / Monat', 'Antwortzeit: 8 Std. (werktags)', 'Quartalsweise Abstimmung der nächsten Schritte'],
    highlight: true,
  },
  {
    name: 'Pflege L',
    fuer: 'Für geschäftskritische Software',
    preis: eur(1190), wert: 1190, einheit: 'pro Monat', monatlich: true,
    features: ['Alles aus M', '14 Std. Weiterentwicklung / Monat', 'Antwortzeit: 4 Std. (werktags)', 'Monatlicher Roadmap-Termin & Bericht'],
  },
];

/* ───────────── Cloud & IT ───────────── */

export const NEXTCLOUD_PAKETE: Paket[] = [
  {
    name: 'Cloud Team',
    fuer: 'Für kleine Teams, die Dropbox & Co. ablösen',
    preis: eur(7.9), wert: 7.9, einheit: 'pro Nutzer / Monat', monatlich: true,
    hinweis: `mind. 5 Nutzer · ab ${eur(39.5)} / Monat`,
    features: ['Eigene Nextcloud unter Ihrer Domain', 'Dateien, Kalender, Kontakte, Aufgaben', 'Talk: Chat & Videocalls im kleinen Kreis', '50 GB pro Nutzer, Zwei-Faktor-Anmeldung', 'Tägliche Backups & Updates', 'Antwortzeit: nächster Werktag'],
  },
  {
    name: 'Cloud Business',
    fuer: 'Für Unternehmen, die zusammen an Dokumenten arbeiten',
    preis: eur(11.9), wert: 11.9, einheit: 'pro Nutzer / Monat', monatlich: true,
    hinweis: `mind. 10 Nutzer · ab ${eur(119)} / Monat`,
    features: ['Alles aus Team', 'Online-Office: Texte, Tabellen, Präsentationen im Browser', 'Videokonferenzen über High-Performance-Backend', '100 GB pro Nutzer, Ihr Logo & Ihre Farben', 'Antwortzeit: 8 Std. (werktags)'],
    highlight: true,
  },
  {
    name: 'Cloud Dediziert',
    fuer: 'Für größere Teams und besondere Anforderungen',
    preis: eur(14.9, true), wert: 14.9, einheit: 'pro Nutzer / Monat', monatlich: true,
    hinweis: 'ab 25 Nutzern · eigener Server',
    features: ['Alles aus Business', 'Eigener Server nur für Ihr Unternehmen', 'Digitales Dokumentenarchiv mit Texterkennung (Paperless)', 'Anbindung an Ihre Benutzerverwaltung (LDAP/SSO)', 'Antwortzeit: 4 Std. (werktags)'],
  },
];

export const NEXTCLOUD_ZUSATZ: Zusatz[] = [
  { name: 'Einrichtung Cloud Team', preis: eur(390, true) + ' einmalig' },
  { name: 'Einrichtung Cloud Business / Dediziert', preis: eur(790, true) + ' einmalig' },
  { name: 'Umzug von Dropbox, Google Drive, OneDrive o. ä.', preis: 'nach Aufwand, Festpreis vorab' },
  { name: 'Nextcloud auf Ihrem eigenen Server (On-Premise)', preis: eur(1490, true) + ' einmalig' },
  { name: 'Wartung On-Premise-Nextcloud', preis: eur(149, true) + ' / Monat' },
  { name: 'Zusätzlicher Speicher', preis: '5 € je 100 GB / Monat' },
];

export const IT_PAKETE: Paket[] = [
  {
    name: 'IT-Basis',
    fuer: 'Für Betriebe, die vorbeugen statt reparieren wollen',
    preis: eur(29), wert: 29, einheit: 'pro Arbeitsplatz / Monat', monatlich: true,
    hinweis: 'mind. 5 Arbeitsplätze',
    features: ['Überwachung von Rechnern & Backups', 'Automatische Sicherheitsupdates', 'Fernwartungs-Zugang', `Einsätze nach Aufwand (${eur(STUNDENSATZ_VERTRAG)} / Std.)`, 'Antwortzeit: nächster Werktag'],
  },
  {
    name: 'IT-Business',
    fuer: 'Für Unternehmen ohne eigene IT-Abteilung',
    preis: eur(59), wert: 59, einheit: 'pro Arbeitsplatz / Monat', monatlich: true,
    hinweis: 'mind. 5 Arbeitsplätze',
    features: ['Alles aus Basis', 'Helpdesk per Telefon & Fernwartung inklusive (Fair Use)', 'Benutzer, Postfächer & Rechte verwalten', 'Sicherheits-Grundschutz: 2FA, Passwortmanager', 'Antwortzeit: 4 Std. (werktags)'],
    highlight: true,
  },
  {
    name: 'Server-Betreuung',
    fuer: 'Für Server und Cloud-Server, die laufen müssen',
    preis: eur(149, true), wert: 149, einheit: 'pro Server / Monat', monatlich: true,
    features: ['Überwachung rund um die Uhr mit Alarmierung', 'Updates, Härtung, Zertifikate', 'Backups mit regelmäßigem Wiederherstellungstest', 'Monatlicher Statusbericht'],
  },
];

export const IT_ZUSATZ: Zusatz[] = [
  { name: 'IT-Sicherheits-Check (Bestandsaufnahme + Maßnahmenplan)', preis: eur(490, true) + ' einmalig' },
  { name: 'Onboarding & Inventur bei Vertragsstart', preis: eur(290, true) + ' einmalig' },
  { name: 'Einsätze ohne Betreuungsvertrag', preis: `${eur(STUNDENSATZ)} / Std.` },
  { name: 'Einrichtung E-Mail, Microsoft 365 oder Google Workspace', preis: 'nach Aufwand, Festpreis vorab' },
];

/* ───────────── Beratung ───────────── */

export const ANALYSE_PAKETE: Paket[] = [
  {
    name: 'Analyse Kompakt',
    fuer: 'Für einen schnellen, ehrlichen Marktüberblick',
    preis: eur(690), wert: 690, einheit: 'Festpreis, einmalig', monatlich: false,
    features: ['Bis zu 5 Wettbewerber', 'Leistungen, Preise, Online-Auftritt im Vergleich', 'Bericht (PDF) mit klaren Empfehlungen', '45 Min. Ergebnisbesprechung'],
  },
  {
    name: 'Analyse Standard',
    fuer: 'Für Positionierung, Preisgestaltung und neue Angebote',
    preis: eur(1490), wert: 1490, einheit: 'Festpreis, einmalig', monatlich: false,
    features: ['Bis zu 10 Wettbewerber', 'Stärken-Schwächen-Analyse (SWOT)', 'Preisempfehlung & Positionierung', 'Website- und Google-Sichtbarkeit im Vergleich', '2 Std. Workshop mit Maßnahmenplan'],
    highlight: true,
  },
  {
    name: 'Markt-Monitoring',
    fuer: 'Für alle, die dauerhaft am Ball bleiben wollen',
    preis: eur(149), wert: 149, einheit: 'pro Monat', monatlich: true,
    hinweis: 'nach einer Analyse buchbar · monatlich kündbar',
    features: ['Vierteljährliches Update zu Preisen & Angeboten', 'Neue Wettbewerber im Blick', 'Kurzbericht mit Handlungsempfehlung', 'Telefonische Rückfragen inklusive'],
  },
];

export const ANALYSE_ZUSATZ: Zusatz[] = [
  { name: 'Anrechnung auf ein Website- oder Software-Projekt (innerhalb von 3 Monaten)', preis: '50 % des Analysepreises' },
  { name: 'Weitere Wettbewerber', preis: eur(90, true) + ' je Anbieter' },
];

/* ───────────── Säulen ───────────── */

const ab = (p: Paket[]) => Math.min(...p.map((x) => x.wert));

export const SAEULEN: { id: Saeule; title: string; claim: string; icon: IconName; ab: string; head: [string, string] }[] = [
  { id: 'websites', title: 'Websites', icon: 'layout', head: ['Websites, die ', 'Anfragen bringen'], claim: 'Individuelle Websites im Abo – Design, Hosting, Domain, E-Mail und Pflege inklusive.', ab: `ab ${Math.min(...plans.map((p) => p.monthly))} € / Monat` },
  { id: 'software', title: 'Software', icon: 'code', head: ['Software, die Ihre Abläufe ', 'vereinfacht'], claim: 'Individuelle Software, Web-Anwendungen und Schnittstellen – geplant, entwickelt und dauerhaft gepflegt.', ab: `Projekte ab ${eur(ab([...SOFTWARE_PROJEKTE.slice(1), ...WEBDEV_PAKETE.slice(1)]))} · Pflege ab ${eur(ab(PFLEGE_PAKETE))} / Monat` },
  { id: 'cloud', title: 'Cloud & IT', icon: 'cloud', head: ['IT und Cloud, die einfach ', 'laufen'], claim: 'Eigene Nextcloud, sichere IT-Infrastruktur und Betreuung – mit Servern in Deutschland.', ab: `ab ${eur(ab(NEXTCLOUD_PAKETE))} pro Nutzer / Monat` },
  { id: 'beratung', title: 'Beratung', icon: 'compass', head: ['Entscheidungen auf ', 'fundierter Basis'], claim: 'Wettbewerbsanalyse: Wo stehen Sie im Markt – und wo liegt Ihr Vorsprung?', ab: `ab ${eur(ab(ANALYSE_PAKETE.filter((p) => !p.monatlich)))} Festpreis` },
];

export const saeuleById = (id: Saeule) => SAEULEN.find((s) => s.id === id)!;

/* ───────────── Alle Abos auf einen Blick ───────────── */

export const ABO_UEBERSICHT: { saeule: Saeule; name: string; preis: string; inhalt: string; path: string }[] = [
  { saeule: 'websites', name: 'Website-Abo', preis: `ab ${Math.min(...plans.map((p) => p.monthly))} € / Monat`, inhalt: 'Design, Hosting, Domain, unbegrenzte E-Mail-Postfächer, Pflege und Änderungen', path: '/preise/#websites' },
  { saeule: 'software', name: 'Software-Pflege', preis: `ab ${eur(ab(PFLEGE_PAKETE))} / Monat`, inhalt: 'Betrieb, Sicherheitsupdates, Überwachung und Stunden für Weiterentwicklung', path: '/leistungen/abo-wartung/' },
  { saeule: 'cloud', name: 'Nextcloud-Hosting', preis: `ab ${eur(ab(NEXTCLOUD_PAKETE))} pro Nutzer / Monat`, inhalt: 'Eigene Cloud mit Dateien, Kalender, Talk, Online-Office und Backups', path: '/leistungen/nextcloud/' },
  { saeule: 'cloud', name: 'IT-Betreuung', preis: `ab ${eur(ab(IT_PAKETE.slice(0, 2)))} pro Arbeitsplatz / Monat`, inhalt: 'Überwachung, Updates, Helpdesk und Sicherheits-Grundschutz', path: '/leistungen/cloud-it/' },
  { saeule: 'cloud', name: 'Server-Betreuung', preis: `ab ${eur(IT_PAKETE[2].wert)} pro Server / Monat`, inhalt: 'Überwachung, Updates, Härtung, getestete Backups', path: '/leistungen/cloud-it/' },
  { saeule: 'beratung', name: 'Markt-Monitoring', preis: `${eur(ANALYSE_PAKETE[2].wert)} / Monat`, inhalt: 'Vierteljährliches Update zu Preisen und Angeboten Ihrer Wettbewerber', path: '/leistungen/wettbewerbsanalyse/' },
];

/* ───────────── Positionierung (nur Anbieter-TYPEN, keine echten Wettbewerber) ───────────── */

export const ANBIETER_TYPEN = ['Baukasten', 'Freelancer', 'Klassische Agentur', 'waybuild'] as const;
export const ANBIETER_VERGLEICH: { kriterium: string; werte: [string, string, string, string] }[] = [
  { kriterium: 'Kosten', werte: ['Niedrig – aber viel Eigenarbeit', 'Projektpreis, Pflege extra', 'Meist fünfstellige Projekte', 'Fester Monatspreis oder Festpreis'] },
  { kriterium: 'Individuelle Lösung', werte: ['Vorlagen', 'Ja', 'Ja', 'Ja – Website, Software, Cloud'] },
  { kriterium: 'Wer kümmert sich danach?', werte: ['Sie selbst', 'Je nach Verfügbarkeit', 'Ticket oder Account-Manager', 'Fester Ansprechpartner'] },
  { kriterium: 'Antwortzeiten', werte: ['Support-Forum', 'Selten vereinbart', 'Im Wartungsvertrag', 'Im Tarif festgelegt'] },
  { kriterium: 'Leistungen aus einer Hand', werte: ['Nur Website', 'Meist ein Fachgebiet', 'Breit, oft mit Subunternehmern', 'Website, Software, Cloud & IT'] },
  { kriterium: 'Vertragsbindung', werte: ['Monatlich', 'Pro Projekt', 'Projekt + Wartungsvertrag', '12 Monate, danach monatlich'] },
  { kriterium: 'Ihre Daten & Ihr Code', werte: ['Beim Plattformanbieter', 'Unterschiedlich', 'Unterschiedlich', 'Software-Code gehört Ihnen, Website-Übernahme möglich, Server in Deutschland'] },
];
