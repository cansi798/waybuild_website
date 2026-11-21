# Backlog (priority = impact×confidence / effort×risk, Schätzung)

| id | Phase | Seite | Problem | Hypothese | I | C | E | R | Prio | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| MKT-001 | Decision | /kontakt/ | Haupt-Knopf (Hero, Kopfzeile, Leiste) öffnete Paket- und Extras-Wahl mit Preisen; Anliegen „Kostenlose Erstberatung“ ging beim Senden verloren | Ohne Paketwahl weniger Abbrüche; Anfrage im Postfach richtig zugeordnet | 5 | 4 | 1 | 1 | 20 | erledigt R1 |
| MKT-002 | Decision | / (Preise → Formular) | Gewähltes Paket ging auf dem Weg zum Mini-Formular verloren | Paket im Betreff → bessere Vorbereitung des Rückrufs (Lead-Qualität) | 3 | 4 | 1 | 1 | 12 | erledigt R1 |
| MKT-003 | Awareness/GEO | /llms.txt | KI-Zusammenfassung beschreibt die alte Startseite (Kundenreise), nicht Jamils aktuelle Abschnitte | Aktuelle, wörtliche Inhalte → KI-Antworten passen zur Seite | 3 | 3 | 2 | 1 | 4,5 | erledigt R2 |
| MKT-004 | Retention | /danke/ | Danke-Seite gleich für Gespräch, Schnellstart, Erstberatung | Passende nächste Schritte je Weg → weniger Unsicherheit, bessere Vorbereitung | 3 | 3 | 2 | 1 | 4,5 | erledigt R2 |
| MKT-005 | Decision | /kontakt/, /danke/, Startseite | Zeitangaben widersprechen sich (Erstberatung 30 Min. vs. Gespräch 15–20 Min.) | einheitlich → mehr Vertrauen | 2 | 4 | 1 | 1 | 8 | Frage an Jamil (Text) |
| MKT-006 | Consideration | Startseite Abschnitt 6 | „Am beliebtesten“ ohne Beleg (UWG § 5) | ohne/mit Beleg | 2 | 3 | 1 | 1 | 6 | Frage an Jamil |
| MKT-007 | Decision | alle Formulare | Vorschau ohne WEB3FORMS_KEY → nur E-Mail-Programm; am Handy oft kein Mailprogramm eingerichtet | Endpunkt (CRM) vor Go-live Pflicht | 5 | 4 | 3 | 2 | 3,3 | Blocker für Live, Entscheidung Can (CRM-Anschluss) |
| MKT-008 | alle | Startseite | 179 KB Inline-CSS (gzip gesamt 63 KB), auch für ausgeblendete Abschnitte | Ungenutztes CSS raus → schneller am Handy | 2 | 2 | 3 | 3 | 0,4 | zurückgestellt (Risiko für Jamils ALT_ZEIGEN-Schalter; LCP lokal 0,6–0,9 s, CLS 0) |
| MKT-009 | alle | Kontakt, Vergleich, Vorschau-Leiste | axe WCAG 2.2/Best Practice: Spaltenköpfe des Vergleichs am Handy ohne Namen, „aside“ in section, Vorschau-Leiste außerhalb von Landmarks | Screenreader-Nutzer verstehen Tabelle und Seite | 2 | 5 | 1 | 1 | 10 | erledigt R3 |
| MKT-010 | Decision | /kontakt/ | Am PC beginnt das Formular erst bei ca. 680 px (großer Seitenkopf), am Handy noch tiefer | Formular früher sichtbar → mehr Anfragen | 3 | 2 | 2 | 2 | 1,5 | Frage an Jamil (Gestaltung Unterseiten) |
| MKT-011 | Decision | Ratgeber, Blog, Warum webgold, Kopfzeile/Leiste/Menü auf Unterseiten | Knopf „Kostenlose Erstberatung“ führte je nach Seite zu verschiedenen Formular-Zuständen (mit/ohne Paketwahl, ohne Anliegen) | Ein Haupt-Knopf, ein Verhalten → weniger Reibung, Anfragen eindeutig | 3 | 4 | 1 | 1 | 12 | erledigt R4 |
| MKT-012 | Awareness/GEO | /kontakt/, /ueber-uns/ | Kein Seiten-Typ in den strukturierten Daten | ContactPage/AboutPage mit Verweis auf Organisation → klarere Einordnung durch Suchmaschinen und KI | 2 | 3 | 1 | 1 | 6 | erledigt R5 |
| MKT-013 | Retention | /danke/, /404 | Nach „Paket anfragen“ sagte die Danke-Seite „Erstgespräch 30 Min.“ statt Vertrag per E-Mail; 404 ohne Weg zur Beratung | passende Erwartung nach Paketanfrage; keine Sackgasse | 2 | 4 | 1 | 1 | 8 | erledigt R6 |
| MKT-014 | Decision | / (Handy) | Leiste „Kostenlose Erstberatung + WhatsApp“ blieb über den Formularen unten sichtbar, verdeckte Felder und konkurrierte mit den Formular-Knöpfen | Leiste dort aus → ungestörtes Ausfüllen | 3 | 3 | 1 | 1 | 9 | erledigt R7 |
