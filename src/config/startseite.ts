// Startseite der waybuild Website (Stand 06.11.2026 abends). Alle Texte WÖRTLICH von Jamil:
//   Hero: Headline 4771, Subheadline 4783, Animation 4784 (Kundengeschichte in fünf Stationen)
//   (Abschnitt 1 „Kunden erleben keine einzelnen Systeme.“ entfernt, Jamil 4806) · 2 Bausteine (4786/4787) · 3 Verstehen. Empfehlen. Umsetzen. (4788)
//   · 4 Alles zwischen erstem Kontakt und zufriedenem Kunden (4789, + Pakete) · 5 Darauf können Sie sich verlassen (4790/4791)
//   · „Woran wir glauben“ (4795/4796) seit 4809 in Abschnitt 3, seit 4868–4870 verdichtet
//   · Check (Konzept 4768; am 09.11. entfernt, #5211–#5213) · Abschluss (4792) · Claim (4793)
// Frühere Stände: „Unternehmensauftritt“ (4768, nach Website Rethinking, NC Rethinking_Unternehmensauftritt_2026-11-06),
// „Besucherreise“ (05.11.). Preise/Pakete NICHT hier, sondern immer aus PAKETE in site.ts (Verknüpfung in index.astro).
// Die alte Startseite (vor dem 05.11., /hauptseite-alt/) ist gelöscht (Jamil, Talk qh87y3sj #5322); Sicherung Branch vor-aufraeumen-20261109.

import type { IconName } from './site';

/** Früherer Text-Name der Startseite. Seit Logo C (Jamil, Talk qh87y3sj #5226/#5227 „überall“) nicht mehr angezeigt:
 *  Kopfzeile, Fußzeile und Claim zeigen das Logo (src/components/Logo.astro). Bleibt nur als Notiz stehen. */
export const MARKE = 'rethink.website';

/** Kontaktseite mit vorbelegtem Anliegen (Feld „paket“ geht in den Betreff der Anfrage, Interesse = Website, max. 60 Zeichen). */
export const ANLIEGEN = {
  erstberatung: { label: 'Kostenlose Erstberatung', paket: 'Kostenlose Erstberatung' },
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
  stationen: ['Aufmerksamkeit', 'Vertrauen', 'Anfrage', 'Bearbeitung', 'Betreuung'],
};

/* Abschnitt 3 „Verstehen. Empfehlen. Umsetzen. Verbessern.“ (VERSTEHEN, Jamil 4788/4795/4796, #4988/#4989) am 09.11.2026 entfernt:
 * ersetzt durch „So gehen wir vor“ nach der Kundenreise (Jamil, Talk qh87y3sj #5188/#5190; Texte src/config/vorgehen.ts).
 * Sicherung: Branch vor-so-gehen-wir-vor-20261109. */

/* Abschnitt „Einzelne Lösungen funktionieren.“ (BAUSTEINE) und Abschnitt 4 „Ein Kunde interessiert sich nicht für Ihre Systeme.“
 * (#loesungen: BEREICHE, PAKET_JE_LEISTUNG) am 09.11.2026 entfernt (Jamil, Talk qh87y3sj #5181–#5187: doppelt zur neuen Kundenreise
 * nach dem Hero, Texte in src/config/variante.ts KUNDENREISE). Die Daten des früheren Abo-Baukastens (BAUKASTEN) liegen seitdem bei
 * der archivierten Komponente: archiv/baukasten-20261108/baukasten-daten.ts. Sicherung: Branch vor-kundenreise-20261109. */

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
      ergebnis: 'Google Lighthouse am Handy: Leistung 93, Lighthouse-Wert Barrierefreiheit 100 von 100 (automatische Prüfung).' },
    { name: 'Destar Lackdoktor', branche: 'Autolackiererei, Meisterbetrieb', ort: 'Norderstedt', status: 'vorschau', motiv: 'lack', bild: 'referenzen/destar',
      ausgang: 'Die bisherige Website sollte modernisiert werden, mit den vorhandenen Inhalten.',
      gemacht: 'Neue Website mit „Schaden melden“ in drei Schritten, per WhatsApp oder E-Mail.',
      ergebnis: 'Datenmenge der Startseite von 1,7 MB auf 0,18 MB gesenkt. Hauptinhalt am Handy nach 1,8 statt 11,1 Sekunden sichtbar (alte Website gegen Vorschau).' },
    { name: 'Kerim Tanrikulu', branche: 'Dolmetscher und Übersetzer für Türkisch', ort: 'Hamburg', status: 'vorschau', motiv: 'sprache', bild: 'referenzen/kerim',
      ausgang: 'Die bisherige Baukasten-Website sollte durch einen eigenen Auftritt ersetzt werden.',
      gemacht: 'Zweisprachige Website (Deutsch und Türkisch) mit Einsatzgebiet, Ablauf und Antworten auf häufige Fragen.',
      ergebnis: 'Google Lighthouse am Handy: Leistung 95, Lighthouse-Wert Barrierefreiheit 100 von 100 (automatische Prüfung, Vorschau).' },
    { name: 'Funkelfilm', branche: 'Unternehmensfilme, Videograf', ort: 'Hamburg', status: 'vorschau', motiv: 'film', bild: 'referenzen/funkelfilm',
      ausgang: 'Die alte Website war schwer und langsam: fast 48 MB Daten schon beim Öffnen der Startseite.',
      gemacht: 'Neue Website mit Film im ersten Bildschirm, Projekten, Ablauf und Einsatzgebiet.',
      ergebnis: 'Google Lighthouse am Handy: Leistung 40 (alte Website) und 84 (Vorschau). Datenmenge jetzt 1,0 MB statt 47,8 MB.' },
    { name: 'ilm me up', branche: 'Unabhängige Medienplattform für Wissen', status: 'vorschau', motiv: 'wissen', bild: 'referenzen/ilmmeup',
      ausgang: 'Ein neues Projekt brauchte einen ersten Auftritt.',
      gemacht: 'Website mit Team, Videos und häufigen Fragen, so aufbereitet, dass Google und KI-Assistenten sie gut verstehen.',
      ergebnis: 'Google Lighthouse am Handy: Leistung 89, Lighthouse-Wert Barrierefreiheit 100 von 100 (automatische Prüfung, Vorschau).' },
  ] as Referenz[],
};

/** Preis früh (Jamil #4934 Punkt 4): Zeile im ersten Bildschirm. Betrag seit 08.11.2026 (Jamil #5056) aus
 *  aboPreisAb() in pakete-abo.ts (günstigstes Paket), Link zum Preisteil #pakete. */
export const PREIS_FRUEH = { vor: 'Ihre Website ab', nach: 'im Monat', zusatz: 'netto zzgl. MwSt.', link: 'Pakete ansehen' };

/** „Wer hinter waybuild steht“ (Jamil #4934; Fotos + Zitate freigegeben für den Test: Talk qh87y3sj #5636/#5637, 12.11.2026).
 *  Rollen: Can Geschäftsführer (Impressum/site.ts), Jamil „Chief Operating Officer“ (#5640; vorher „Key Account & Process Manager“).
 *  Fotos: src/assets/bilder/team/<foto>.jpg (Freisteller; Cans Quelle hat nur 256 px, darum höchstens ~180 CSS-px groß, Jamil gleich).
 *  Wird nur in der Vorschau gezeigt (SHOW_HINTS + PUBLIC_PREVIEW, index.astro), solange die Zitate Test-Zitate sind.
 *  Die Zitate NICHT in strukturierte Daten übernehmen. */
export const TEAM = {
  titel: 'Wer hinter waybuild steht',
  einleitung: 'Sie sprechen mit Menschen, nicht mit einer Hotline.',
  personen: [
    // Test-Zitat, vor Livegang von Can/Jamil bestätigen lassen (Jamil #5636/#5637: „erfinden, nur für den Test“)
    { name: 'Can Siebert', rolle: 'Chief Executive Officer', foto: 'team/can-siebert', alt: 'Can Siebert, Chief Executive Officer von waybuild', // Jamil #5869, 14.11.2026 (Impressum bleibt „Geschäftsführer“)
      zitat: 'Unsere Kunden sollen sich um ihr Geschäft kümmern. Um alles, was dafür online laufen muss, kümmern wir uns.' },
    // Test-Zitat, vor Livegang von Can/Jamil bestätigen lassen (Jamil #5636/#5637: „erfinden, nur für den Test“)
    { name: 'Jamil Iqbal', rolle: 'Chief Operating Officer', foto: 'team/jamil-iqbal', alt: 'Jamil Iqbal, Chief Operating Officer von waybuild',
      zitat: 'Hinter jeder Anfrage steht ein Mensch, der Hilfe sucht. Deshalb sorgen wir dafür, dass keine verloren geht.' },
  ],
};

/** Kundenstimmen (Jamil #4934 Punkt 3). BEWUSST NUR PLATZHALTER: keine erfundenen Zitate, keine Kundennamen, keine Sterne
 *  (erfundene Bewertungen wären irreführend, UWG). Seit Jamil #5289 nicht mehr angezeigt (index.astro: STIMMEN_ZEIGEN = false);
 *  bleibt für spätere echte, freigegebene Kundenstimmen. Offen in der Checkliste. */
export const STIMMEN = {
  titel: 'Was unsere Kunden sagen',
  platzhalter: 'Platzhalter',
  zitat: 'Beispiel: Hier steht bald ein echtes Zitat unserer Kunden.',
  quellen: ['Kundenstimme folgt (z. B. Handwerk)', 'Kundenstimme folgt (z. B. Dienstleistung)', 'Kundenstimme folgt (z. B. Kreativbranche)'],
};

/* „So läuft die Erstberatung“ (Jamil #4934 Punkt 5): Anker #erstberatung sitzt seit 09.11.2026 auf Schritt 1 („Verstehen“)
 * von „So gehen wir vor“ (src/config/vorgehen.ts). */

/** Abschnitt 5 (4790/4791): große Schlagworte, viel Weißraum, keine Icons */
export const VERLASSEN = {
  titel: 'Darauf können Sie sich verlassen',
  saetze: ['Wir übernehmen Verantwortung.', 'Wir denken mit.', 'Wir halten Dinge einfach.', 'Wir empfehlen nicht das Meiste.', 'Wir empfehlen das Richtige.'],
};

/* Kundenreise-Check (CHECK, Typ Ampel; Jamil 4835) am 09.11.2026 von der Startseite entfernt (Jamil, Talk qh87y3sj #5211–#5213),
 * samt Komponente start/Check.astro und ANLIEGEN.analyse (nur dort genutzt). Sicherung: Branch vor-runde2-20261109. */

/** Claim (4793): seit 09.11.2026 große Überschrift des Abschlusses (Jamil, Talk qh87y3sj #5290), als Slogan in JSON-LD und im Title */
export const CLAIM = 'Von Anfang bis Wachstum.';

/** „Was Sie davon haben.“ (#vorteile, Jamil, Talk qh87y3sj #5381, 10.11.2026: „Warum sollte der Websitebesucher unser Kunde werden?“).
 *  Sechs Vorteile aus Sicht des Besuchers, direkt nach der Kundenreise. NUR Belegtes von der Website: Pakete/Preise aus pakete-abo.ts
 *  (keine Einrichtungsgebühr, Monatsbericht ab Plus, Ordner ab Plus, Vorlagen + Terminbuchung in Komplett), 14 Tage aus vorgehen.ts,
 *  fester Ansprechpartner aus dem Vergleich. Keine Zahlen zu Platzierungen, keine absoluten Versprechen (UWG).
 *  icon = Name aus Icon.astro, paket = kleines Etikett (nur wenn nicht in allen Paketen enthalten). */
export const VORTEILE = {
  eyebrow: 'Ihre Vorteile',
  titel: 'Was Sie davon haben.',
  intro: 'Sie kümmern sich um Ihre Kunden. Wir sorgen dafür, dass Ihr Auftritt Sie dabei unterstützt.',
  liste: [
    { icon: 'search', titel: 'Besser gefunden werden', text: 'Ihre Website ist von Anfang an so aufgebaut, dass Google und KI-Assistenten wie ChatGPT Ihr Angebot gut verstehen. Das erhöht die Chance, dass Kunden Sie finden, wenn sie nach Ihrer Leistung suchen.' },
    { icon: 'mail', titel: 'Weniger Arbeit mit Anfragen und Angeboten', text: 'Anfragen kommen geordnet bei Ihnen an und gehen nicht im Posteingang unter. Ordner im Postfach, Vorlagen für Angebote und eine Online-Terminbuchung sparen Ihnen wiederkehrende Handgriffe.', paket: 'Je nach Paket' },
    { icon: 'euro', titel: 'Feste Monatspreise', text: 'Einrichtung, Technik und Betreuung sind im Monatspreis enthalten, ohne Einrichtungsgebühr. Sie wissen vorher, was Sie jeden Monat zahlen.' },
    { icon: 'user', titel: 'Ein fester Ansprechpartner', text: 'Statt einer Hotline haben Sie einen festen Ansprechpartner, der Ihr Projekt kennt. Änderungen schicken Sie einfach per Nachricht, auch als Sprachnachricht.' },
    { icon: 'rocket', titel: 'Schnell online', text: 'Bei Websites in der Regel 14 Tage, nachdem Ihre Inhalte vorliegen. Die Technik richten wir ein, Sie geben frei.' },
    { icon: 'chart', titel: 'Sehen, was Ihre Website bringt', text: 'Jeden Monat ein kurzer Bericht mit Besuchern, Anfragen und Suchbegriffen, verständlich erklärt. So sehen Sie, was funktioniert.', paket: 'Ab Paket Plus' },
  ] as { icon: IconName; titel: string; text: string; paket?: string }[],
};

/** Abschluss (4792): Überschrift = Claim, darunter CTA. Alte Überschrift + Absatz entfernt (Jamil #5290).
 *  Seit Jamil, Talk qh87y3sj #5381 (10.11.2026): über dem Knopf eine kurze Antwort „Warum waybuild?“ in drei Sätzen. */
export const ABSCHLUSS = {
  titel: CLAIM,
  warumTitel: 'Warum waybuild?',
  warum: [
    'Wir betrachten nicht nur Ihre Website, sondern den ganzen Weg Ihrer Kunden, von der ersten Suche bis zur Betreuung nach dem Auftrag.',
    'Sie zahlen einen festen Monatspreis ohne Einrichtungsgebühr und haben einen festen Ansprechpartner.',
    'Ihr Auftritt wächst mit Ihrem Unternehmen, Schritt für Schritt von der Website bis zur Software.',
  ],
  cta: 'Unternehmensauftritt bewerten lassen',
  unterCta: 'Kurzes Gespräch. Klare Einschätzung. Konkrete Empfehlungen.',
};

/** Für Meta-Description, JSON-LD und llms.txt */
export const BOTSCHAFT = {
  titel: CLAIM,
  description: 'Von der ersten Aufmerksamkeit bis zum zufriedenen Kunden: Website, Anfrage, Bearbeitung und Betreuung, aufeinander abgestimmt. Für kleine und mittlere Unternehmen.',
  service: 'Digitale Unternehmensabläufe für kleine und mittlere Unternehmen, von der ersten Aufmerksamkeit bis zum zufriedenen Kunden: neue Website mit Analyse und Empfehlung, Änderungen per Text, Screenshot oder Sprachnachricht; zubuchbar Google-Profil, bei Google besser gefunden werden, in KI-Antworten auftauchen, E-Mail-Postfächer, Online-Terminbuchung, Logo und Geschäftspapiere, Monatsbericht und laufende Verbesserung; Kundenverwaltung, automatische Abläufe und Video auf Anfrage.' /* Social Media entfernt, Jamil #5630 */,
};

/** Zwei Abschnitte zwischen Kundenreise und Preisen (Jamil, Talk qh87y3sj #5664/#5665/#5666, „ok“ #5670/#5672, 12.11.2026;
 *  Sicherung Tag vor-umsetzung-entspannt-20261112). Texte WÖRTLICH von Jamil. Seit dem Neudesign 13.11.2026 (#5810): ENTSPANNT steht in
 *  components/startneu/SnBeweis.astro, die Punkte von UMSETZUNG je Station in der Kundenreise (SnReise.astro, config/startneu.ts REISE);
 *  UMSETZUNG selbst nutzt nur noch llms.txt. Frühere Komponente start/KartenAbschnitt.astro (gelöscht),
 *  Stil src/styles/karten-abschnitt.css. Karten mit großem Symbol (Stil der Kundenreise, ohne Kreis), keine Paket-Etiketten.
 *  Hinweis: „Alles aus einer Hand“ ist Jamils ausdrücklicher Wortlaut in #5666 (frühere Regel „nie ‚aus einer Hand‘“ damit überholt). */
export type KartenAbschnitt = { id: string; kennzeile: string; titel: string; intro: string; karten: { icon: IconName; titel: string; text: string }[] };
export const UMSETZUNG: KartenAbschnitt = {
  id: 'umsetzung',
  kennzeile: 'So setzen wir es um',
  titel: 'So machen wir aus Besuchern Kunden.',
  intro: 'Versprechen sind schnell gemacht. Hier sehen Sie, womit wir sie halten.',
  karten: [
    { icon: 'layout', titel: 'Eine Website, die begeistert', text: 'Modern, hochwertig und so gebaut, dass Ihre Kunden sofort finden, was sie suchen. Für Google und KI-Assistenten wie ChatGPT optimiert, damit man Sie auch findet.' },
    { icon: 'pin', titel: 'Ihr Google-Profil', text: 'Wer Sie sucht, sieht sofort Öffnungszeiten, Fotos und begeisterte Bewertungen. Wir richten alles ein und halten es aktuell.' },
    { icon: 'stern', titel: 'Bewertungen dort, wo Ihre Kunden suchen', text: 'Ob Google oder die wichtigste Plattform Ihrer Branche, zufriedene Kunden bewerten Sie dort, wo neue Kunden nachschauen.' },
    { icon: 'portal', titel: 'Ihre eigene Web-App für Anfragen', text: 'Eine einfache Anwendung im Browser, ohne Installation. Alle Anfragen an einem Ort, auf einen Blick, was offen ist, und Antworten, Angebote und Termine mit wenigen Klicks. So wird aus einer Anfrage schneller ein Auftrag.' },
    { icon: 'chart', titel: 'Messen, was wirkt', text: 'Jeden Monat schauen wir auf Besucher, Anfragen und Bewertungen. Was funktioniert, bauen wir aus. Was nicht wirkt, verbessern wir.' },
  ],
};
export const ENTSPANNT: KartenAbschnitt = {
  id: 'entspannt',
  kennzeile: 'Warum waybuild',
  titel: 'Ganz entspannt. Das ist unser Motto.',
  intro: 'Sie haben eine Idee oder wollen etwas ändern? Sagen Sie es uns einfach. Den Rest erledigen wir.',
  karten: [
    { icon: 'mic', titel: 'Einfach per Sprachnachricht', text: 'Neues Foto, andere Öffnungszeiten, eine Idee für Ihre Software. Schicken Sie uns eine Sprachnachricht oder ein paar Zeilen. Kein Formular, kein Ticket, kein Fachchinesisch.' },
    { icon: 'spark', titel: 'Auch das Ungewöhnliche', text: 'Auch sehr individuelle Wünsche nehmen wir ernst. Es gibt fast keine Grenzen. Was möglich ist, setzen wir um.' },
    { icon: 'zap', titel: 'Schnell erledigt', text: 'Kleine Änderungen sind meist in kürzester Zeit online. Bei größeren sagen wir Ihnen vorher, wie lange es dauert.' },
    { icon: 'user', titel: 'Alles aus einer Hand', text: 'Website, Google-Profil und Software bei einem Ansprechpartner. Sie müssen nichts koordinieren und niemandem hinterhertelefonieren.' },
  ],
};
