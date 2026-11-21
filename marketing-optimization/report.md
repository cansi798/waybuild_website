# Abschlussbericht Marketing Optimization Loop (webgold, 21./22.11.2026)

## 1. Zeitbudget
- Vorgabe Can: bis 22.11.2026 02:00 Uhr (Europe/Berlin). Start 21.11. 23:54.
- Genutzt: 23:54 bis ca. 00:55 für Baseline, 8 Runden und Gesamtprüfung. Danach habe ich bewusst gestoppt: Die übrigen Punkte betreffen Jamils Texte, Gestaltung oder Cans Go-live-Entscheidung. Für die Website selbst gibt es keinen prüfbaren Hebel mit gutem Nutzen-Risiko-Verhältnis mehr (Leitsatz: Qualität vor Menge).
- 8 Runden, jede einzeln geprüft, committet, in main gemergt, von GitHub Actions gebaut und im Talk gemeldet.

## 2. Ziel und Ausgangslage
- Ziel: mehr qualifizierte Anfragen (Erstberatung, Gespräch „Unternehmens-DNA“, Schnellstart-Vorschau, Paketanfrage).
- Datenbasis: keine Analytics, keine Search Console, kein Formular-Endpunkt in der Vorschau. Bewertung daher nur heuristisch.
- Baseline technisch sauber: check 0 Fehler, SEO-Skript 61 Seiten ohne Befund, axe WCAG 2.1 AA auf 57 Seiten × 390/1440 ohne Befund, kein Querscrollen, LCP lokal 0,2–0,9 s, CLS 0.
- Größter Engpass in der Baseline: Der Haupt-Knopf „Kostenlose Beratung/Erstberatung“ öffnete die Paket- und Extras-Wahl, und das Anliegen ging beim Senden verloren (E2E 4 FAIL).

## 3. Umgesetzt (Commits auf main)
| Runde | Commit | Änderung | Dateien |
|---|---|---|---|
| 1 | f5bcd76 | Haupt-Knopf ohne Paketwahl, Anliegen wird gesendet (MKT-001); Paket aus Preis-Karte im Formular-Betreff (MKT-002) | kontakt.astro, J6Preise.astro, J6Start.astro |
| 2 | e99c128 | llms.txt mit aktueller Startseite, wörtlich (MKT-003); Danke-Seite je Weg (MKT-004) | llms.txt.ts, J6Start.astro, danke.astro |
| 3 | 9a15c41 | WCAG 2.2: Vergleich-Spaltenköpfe am Handy benannt, Kontakt-Landmark, Vorschau-Leiste (MKT-009) | start-vergleich.css, kontakt.astro, BaseLayout.astro |
| 4 | 3e45a9e | „Kostenlose Erstberatung“ überall gleiches Ziel (MKT-011) | startseite.ts (ERSTBERATUNG_PFAD), Header, StickyBar, MobileMenu, warum-wir, blog/[id], ratgeber/[id] |
| 5 | d3db060 | ContactPage/AboutPage-Daten (MKT-012) | schema.ts, kontakt.astro, ueber-uns.astro |
| 6 | daba656 | Danke-Seite nach Paketanfrage „Vertrag per E-Mail“, 404 mit Beratungsknopf (MKT-013) | kontakt.astro, danke.astro, 404.astro |
| 7 | b1d68c6 | Handy-Leiste über den Startseiten-Formularen aus (MKT-014); Paketfeld nur im zuletzt gewählten Formular | StickyBar.astro, J6Start.astro |
| 8 | e87e76f | Nicht gendern (Kontakt-Platzhalter, 2 Ratgeber); Telefon-oder-E-Mail-Feld ohne E-Mail-Tastatur (MKT-015) | kontakt.astro, 2 Ratgeber, J6Start.astro |

Nicht angefasst: Jamils Startseiten-Texte, Abschnittsfolge und Gestaltung, Preise/PAKETE/IN_ALLEN, AGB, Rechtstexte, /neu/. Kein Tracking, keine neuen Drittanbieter, kein Deploy auf ALL-INKL/webgold.io.

## 4. Validiert
- Jede Runde: Build wie CI (astro check 0 Fehler, build, `npm run seo` 61 Seiten ohne Befund), axe auf den geänderten Seiten bei 390 und 1440, kein Querscrollen.
- Eigene E2E-Tests (Playwright 1.48.2, Versand an Web3Forms abgefangen, kein echter Versand):
  - Formular-Wege 24 Prüfpunkte: Haupt-Knopf → Kontakt → Danke, Paket-Link, Preis-Karte → Schnellstart, Gespräch mit Telefonnummer, Rückfall E-Mail-Programm, Pflichtfeld-Fehler
  - Buchungsweg /preise/ → Fenster → Kontakt → Versand → Danke, dazu Leistung-, Ratgeber- und Warum-wir-Links
  - Handy-Leiste
  - jeweils in Chromium und WebKit (Safari-Technik)
- WCAG 2.2 + Best Practice auf 10 Kernseiten: nur `target-size` der Szenen-Striche im Beispiel-Film (Ausnahme „gleichwertige Bedienung“ über die Knöpfe zurück/weiter).
- Alle 147 JSON-LD-Blöcke gültig.
- Unabhängiges Code-Review (Subagent, nur lesend): keine Befunde mit hoher Sicherheit. Den einen Hinweis habe ich umgesetzt.
- Gesamtprüfung am Ende (Stand e87e76f): axe + Querscrollen auf allen 57 Seiten × 390/1440 = 114/114 ok; alle E2E-Läufe in Chromium und WebKit fehlerfrei.
- GitHub Actions: alle Läufe grün. Pages-Vorschau stichprobenartig geprüft (data-paket, data-anliegen, llms.txt, Kopfzeilen-Link).

## 5. Wirkung
- Gemessen: nichts (keine Daten).
- Plausibel, aber ungemessen: weniger Abbrüche am Haupt-Weg, eindeutig zugeordnete Anfragen, korrektere KI-Zusammenfassung, klarere Erwartung nach dem Absenden, ungestörtes Ausfüllen am Handy.
- Messvorschläge ohne Tracking: experiment-register.md.

## 6. Offene Risiken und nötige Freigaben
- **Blocker vor Go-live (Can):** Kein Versand-Schlüssel bzw. CRM-Anschluss. Alle Formulare öffnen nur das E-Mail-Programm, am Handy oft ohne Ergebnis (Frage 5).
- Jamils Texte mit UWG- oder Hausregel-Risiko: „Am beliebtesten“ (1), „Rekordzeit“ (3), absolute Versprechen (4), „Mitarbeitende“ (7). Uneinheitliche Zeit fürs Erstgespräch, 30 Min. vs. 15–20 Min. (2).
- Gestaltung: Formular auf /kontakt/ erst unterhalb des großen Seitenkopfs (6); /preise/ H1 = H2 (8).
- Tests nur in Headless-Chromium und -WebKit, nicht auf echten Geräten. Der Test-Chrome trennt keine deutschen Silben.

## 7. Nächste Iteration (Top 3)
1. Formular-Versand für Go-live klären (CRM-Endpunkt oder eigener Server-Endpunkt) und echten End-to-End-Versand testen.
2. Jamils Antworten auf Fragen 1–4, 7, 8 einarbeiten (kleine Textänderungen, UWG-sicherer).
3. Kontaktseite: Formular ins erste Bild holen (Frage 6), danach Inline-CSS der Startseite verschlanken (MKT-008), wenn die ausgeblendeten Abschnitte endgültig entfallen.

## 8. Quality Gates (Endstand e87e76f)
| Gate | Status |
|---|---|
| G1 Funktion | PASS: alle Formular-, Buchungs- und Leisten-Wege grün in Chromium und WebKit. Echter Versand NOT_VERIFIED (kein Schlüssel) |
| G2 UX und Mobile | PASS_WITH_LIMITATIONS: 390/1440 ohne Querscrollen, Sichtprüfung der geänderten Stellen, keine echten Geräte |
| G3 Accessibility | PASS: WCAG 2.1 AA auf allen Seiten, WCAG 2.2 auf Kernseiten mit dokumentierter Ausnahme |
| G4 Performance | PASS: keine Verschlechterung, LCP lokal < 1 s, CLS 0 |
| G5 SEO und Content | PASS: SEO-Skript 61 Seiten, noindex nur Vorschau/Danke wie vorher, JSON-LD gültig, keine erfundenen Aussagen |
| G6 Datenschutz und Sicherheit | PASS: kein Tracking, keine neuen Drittanbieter, keine Secrets, nur textContent/value für URL-Werte |
| G7 Evidenz | PASS: Protokoll, QA-Tabelle, Backlog, Commits je Runde |

Rollback: jede Runde ist ein eigener Commit auf main (`git revert <commit>`). Basis vorher: 6f31f9a.
