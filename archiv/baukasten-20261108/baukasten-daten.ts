// ARCHIV (09.11.2026): Daten des früheren Abo-Baukastens, bis dahin in src/config/startseite.ts. Seit dem Entfernen von
// Abschnitt 4 (#loesungen, Jamil Talk qh87y3sj #5181–#5187) nutzt sie keine Seite mehr. Zum Zurückholen diese Datei nach
// src/config/ kopieren; Baukasten.astro importiert sie von dort ('../../config/baukasten-daten'). Preise NICHT mehr gültig.
export type StationId = 'aufmerksamkeit' | 'anfrage' | 'bearbeitung' | 'betreuung';

/** dazu = „Was dazugehört“ in den vier Karten von Abschnitt 4 (Jamil 4909, 07.11.2026: Preise und „Im Basispaket“ dort
 *  entfernen, stattdessen auflisten, was dazugehört). NUR aus vorhandenen Texten: PAKETE/IN_ALLEN (site.ts), Leistungsseiten
 *  (leistungen.ts: business-website, website-relaunch, betreuung-pflege), FAQ (site.ts, branchen.ts), angebot.ts (Automatisierung),
 *  CHECK und VERSTEHEN (hier). Preise stehen nur im Baukasten darunter. */
/** ARCHIV-HINWEIS (Jamil #5056, 08.11.2026): Der Abo-Baukasten wird NICHT mehr angezeigt (ersetzt durch die drei Pakete,
 *  src/config/pakete-abo.ts). Die Daten bleiben hier, weil Abschnitt 4 (#loesungen) seine Leistungsliste samt „dazu“ daraus
 *  erzeugt (ohne Preise) und damit der Baukasten zurückgeholt werden kann (Komponente: archiv/baukasten-20261108/).
 *  Die Preise unten sind damit NICHT mehr gültig. */
/** Abo-Baukasten (Jamil 4879, TESTANGEBOT nur auf der Startseite). Preise NETTO zzgl. MwSt., Stand 08.11.2026
 *  (Jamil 4924/4925, Quelle Preisvergleich NC f/22843). Ein Baustein hat einen Monatspreis (`preis`), einen einmaligen
 *  Festpreis (`einmalig`) oder keinen von beiden (= auf Anfrage). `zu` = optionale Ergänzung, nur wählbar, wenn der
 *  Hauptbaustein mit dieser id gewählt ist (erscheint im Baukasten unter ihm; in Abschnitt 4 wird ihr `dazu` an den Hauptbaustein angehängt).
 *  /preise/, PAKETE/IN_ALLEN (site.ts), angebot.ts und AGB sind davon NICHT berührt. */
export type Baustein = { id: string; name: string; text: string; preis?: number; einmalig?: number; hinweis?: string; zu?: string; station: StationId; dazu: string[] };
export const BAUKASTEN = {
  titel: 'Stellen Sie Ihr Abo zusammen',
  einleitung: 'Sie starten mit Ihrer Website und buchen nur dazu, was Sie wirklich brauchen. Monatspreis und einmalige Kosten passen sich sofort an.',
  test: 'Testangebot. Die genauen Konditionen besprechen wir gern mit Ihnen.',
  basis: {
    name: 'Ihre Website', preis: 69.99,
    teile: [
      { text: 'Neue Website, passt auf Handy und PC', station: 'aufmerksamkeit',
        dazu: ['Keine Seitenbegrenzung', 'Optimiert für Handy, Tablet und PC', 'Texte schreiben wir mit Ihnen, KI-gestützt und von uns geprüft', 'Impressum und Datenschutzerklärung nach aktuellem Stand'] },
      { text: 'Vorab: Analyse und unsere Empfehlung für Sie', station: 'aufmerksamkeit',
        dazu: ['Erstgespräch: Wir lernen Ihr Unternehmen kennen', 'Analyse Ihrer bestehenden Website und Ihrer Google-Platzierungen', 'Gemeinsam klären wir Zielgruppen und Positionierung', 'Wir sagen offen, was sich lohnt'] },
      { text: 'Kontaktformular und direkte Kontaktwege', station: 'anfrage',
        dazu: ['Anfrage- und Kontaktformulare', 'Direkte Kontaktwege, zum Beispiel Anruf, E-Mail oder WhatsApp'] },
      { text: 'Änderungen per Text, Screenshot oder Sprachnachricht', station: 'betreuung', hinweis: 'Kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr).',
        dazu: ['Texte, Bilder, Öffnungszeiten, Team, Aktionen', 'Kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr)', 'Ein persönlicher Ansprechpartner', 'Im fairen Rahmen'] },
      { text: 'Sichere Technik: Hosting in Deutschland, Updates und Sicherungen', station: 'betreuung',
        dazu: ['Hosting in Deutschland, DSGVO-orientiert', 'SSL-Verschlüsselung und Domainverwaltung', 'Sicherheitsupdates, Überwachung und Backups', 'Läuft im Hintergrund, ohne Aufwand für Sie'] },
    ] as { text: string; station: StationId; hinweis?: string; dazu: string[] }[],
  },
  bausteine: [
    { id: 'google-profil', name: 'Google-Profil', text: 'Ihr Eintrag bei Google und Google Maps, eingerichtet mit Fotos, Leistungen und Öffnungszeiten.', einmalig: 199, station: 'aufmerksamkeit',
      dazu: ['Eintrag bei Google und Google Maps eingerichtet', 'Fotos, Leistungen und Öffnungszeiten eingetragen', 'Passend zu Ihrer Website'] },
    { id: 'google-pflege', name: 'Google-Profil pflegen', text: 'Wir halten Fotos, Leistungen und Öffnungszeiten in Ihrem Profil aktuell.', preis: 19.99, zu: 'google-profil', station: 'aufmerksamkeit',
      dazu: ['Laufend gepflegt: Fotos, Leistungen und Öffnungszeiten bleiben aktuell'] },
    { id: 'gefunden', name: 'Bei Google besser gefunden werden', text: 'Bis zu 5 eigene Seiten für Ihre Orte und Leistungen, mit den Wörtern, nach denen Ihre Kunden suchen.', einmalig: 390, hinweis: 'Jede weitere Seite 69 €.', station: 'aufmerksamkeit',
      dazu: ['Wir finden heraus, wonach Ihre Kunden suchen, und richten Ihre Seiten gezielt darauf aus', 'Ihr Google-Profil wird mit der Website verknüpft, damit Sie vor Ort besser gefunden werden'] },
    { id: 'ki', name: 'In KI-Antworten auftauchen', text: 'Ihre Seite so aufbereitet, dass ChatGPT und andere KI-Assistenten Ihr Angebot richtig verstehen.', einmalig: 190, station: 'aufmerksamkeit',
      dazu: ['Ihre Seite so aufbereitet, dass ChatGPT und andere KI-Assistenten Ihr Angebot richtig verstehen', 'In leichter Sprache erklärt, was wir dafür tun'] },
    { id: 'ki-check', name: 'Monatlicher KI-Check', text: 'Wir prüfen jeden Monat, ob KI-Assistenten Ihr Unternehmen richtig nennen.', preis: 14.99, zu: 'ki', station: 'aufmerksamkeit',
      dazu: ['Jeden Monat geprüft, ob KI-Assistenten Ihr Unternehmen richtig nennen'] },
    { id: 'social', name: 'Social Media', text: 'Profile und Beiträge, passend zu Ihrem Auftritt.', station: 'aufmerksamkeit',
      dazu: ['Profile eingerichtet, zum Beispiel bei Instagram, Facebook oder LinkedIn', 'Passend zu Ihrem Auftritt gestaltet', 'Regelmäßige Beiträge auf Anfrage'] },
    { id: 'video', name: 'Video', text: 'Kurze Filme über Ihr Unternehmen und Ihre Arbeit.', station: 'aufmerksamkeit',
      dazu: ['Kurze Filme über Ihr Unternehmen und Ihre Arbeit'] },
    { id: 'email', name: 'E-Mail-Postfächer mit Signatur', text: 'Bis zu 20 Postfächer mit Ihrer Adresse, eingerichtet, mit einheitlicher Signatur.', preis: 9.99, station: 'anfrage',
      dazu: ['Bis zu 20 Postfächer mit Ihrer Adresse', 'Fertig eingerichtet', 'Einheitliche E-Mail-Signatur nach DIN 5008'] },
    { id: 'termin', name: 'Online-Terminbuchung', text: 'Kunden buchen freie Termine direkt auf Ihrer Website.', preis: 24.99, station: 'anfrage',
      dazu: ['Kunden buchen freie Termine direkt auf Ihrer Website', 'Rund um die Uhr', 'Ein bestehendes Buchungssystem lässt sich einbinden'] },
    { id: 'kunden', name: 'Kundenverwaltung', text: 'Alle Anfragen und Kunden an einem Ort, nichts geht verloren.', station: 'anfrage',
      dazu: ['Alle Anfragen und Kunden an einem Ort', 'Statt verteilt auf E-Mail, Handy und Zettel'] },
    { id: 'logo', name: 'Logo und Geschäftspapiere', text: 'Logo, Briefbogen, Angebot und Rechnung im gleichen Stil.', einmalig: 790, station: 'bearbeitung',
      dazu: ['Logo: 3 Entwürfe, 2 Korrekturrunden, Dateien für Web und Druck', 'Briefbogen, Angebot und Rechnung nach DIN 5008, im gleichen Stil', 'Kurzer Leitfaden: Farben, Schriften, Logo-Einsatz'] },
    { id: 'ablaeufe', name: 'Abläufe automatisieren', text: 'Wiederkehrende Aufgaben laufen von allein, zum Beispiel Bestätigungen und Erinnerungen.', station: 'bearbeitung',
      dazu: ['Wiederkehrende Aufgaben laufen von allein', 'Zum Beispiel Bestätigungen und Erinnerungen', 'Daten fließen zwischen Ihren Programmen, statt abgetippt zu werden'] },
    { id: 'bericht', name: 'Monatsbericht', text: 'Jeden Monat kurz und verständlich: Besucher, Anfragen, Suchbegriffe.', preis: 19.99, station: 'betreuung',
      dazu: ['Besucher, Anfragen, Suchbegriffe', 'Jeden Monat, kurz und verständlich'] },
    { id: 'optimierung', name: 'Laufende Verbesserung', text: 'Jeden Monat werten wir aus, was Besucher tun, ändern 2 bis 3 Dinge und prüfen, ob es wirkt. Alle drei Monate ein Gespräch.', preis: 99.99, station: 'betreuung',
      dazu: [
        'Jeden Monat werten wir aus, woher Ihre Besucher kommen, wo sie abspringen und welche Seiten Anfragen bringen.',
        'Daraus ändern wir jeden Monat 2 bis 3 Dinge nach Absprache, zum Beispiel einen klareren Knopf, einen kürzeren Weg zum Kontakt oder eine neue Antwort in den häufigen Fragen.',
        'Nach einem Monat prüfen wir, ob es etwas gebracht hat. Wenn nicht, ändern wir es zurück oder versuchen etwas anderes.',
        'Alle drei Monate ein Gespräch: Was hat sich getan, was ist als Nächstes dran?',
        'Im Paket Plus: 1 Verbesserung im Monat am Weg bis zur Anfrage',
      ] },
  ] as Baustein[],
  summeKopf: 'Ihr Abo',
  cta: 'Paket anfragen',
  ctaHinweis: 'Ihre Auswahl übernehmen wir in das Anfrageformular. Dort sehen Sie sie und können sie ändern.',
  laufzeit: '24 Monate Mindestlaufzeit, danach monatlich kündbar.',
  /** Präzisierung (08.11.): die Website selbst ohne Einrichtungskosten, Zusatzleistungen teils einmalig */
  einrichtung: 'Die Website selbst ohne Einrichtungskosten. Einmalige Zusatzleistungen mit Festpreis.',
  einmaligLabel: 'einmalig, Festpreis',
};
