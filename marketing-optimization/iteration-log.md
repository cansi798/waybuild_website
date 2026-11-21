# Iterationsprotokoll

## Runde 0 – Baseline (21.11. 23:54–00:15)
- Build wie CI (npm ci, check 0 Fehler/0 Warnungen-Ergebnis, build, seo „Keine Probleme in 61 Seiten“): grün.
- E2E (eigenes Playwright-Skript, Versand abgefangen): 4 FAIL – Haupt-CTA zeigt Paketwahl + verliert Anliegen (390 und 1440).
## Runde 1 – Haupt-Weg zur Anfrage (00:00–00:25)
- MKT-001: /kontakt/ erkennt ?paket=Kostenlose Erstberatung (Haupt-Knopf) als Anliegen → keine Paket-/Extras-Wahl, Anliegen im Betreff, in den Daten und in der E-Mail. Datei: src/pages/kontakt.astro
- MKT-002: Preis-Knöpfe (J6Preise data-paket) → verstecktes Feld paket im Mini-Formular (J6Start), Betreff „… – Paket: X“. Dateien: J6Preise.astro, J6Start.astro
- Prüfung: check 0 Fehler, build ok, seo 61 ok, axe/Querscroll Kernseiten 390/1440 ok, E2E 20/20. Gate PASS_WITH_LIMITATIONS.
- Wirkung: unverified (keine Messdaten), Hypothese.
## Runde 2 – KI-Suche und Danke-Seite (00:15–00:30)
- MKT-003: src/pages/llms.txt.ts – Abschnitt Startseite aus config/start-6176.ts (J_HERO, J_PROBLEM_NEU, J_MASS, J_ERST, J_UMSTIEG, J_PREISE, J_START) und Vergleich aus start-vergleich.ts.
- MKT-004: J6Start.astro (data-weg, ?weg=…), danke.astro (Schritte 3–4 je Weg aus J_START/J_ERST).
- Prüfung: check 0, build, seo 61 ok, axe/Querscroll 390/1440 ok, E2E 24/24, Sichtprüfung Danke 390/1440. Gate PASS_WITH_LIMITATIONS.
## Runde 3 – Barrierefreiheit WCAG 2.2 und Tempo (00:25–00:35)
- Tempo gemessen (lokal, ohne Drosselung): / LCP 0,6–0,7 s, CLS 0, 5 Anfragen, HTML 272 KB roh/63 KB gzip; /kontakt/ 0,2–0,3 s; /preise/ 0,25–0,4 s; /beispiele/ 0,8–0,9 s. Kein akuter Engpass → MKT-008 zurückgestellt.
- MKT-009: start-vergleich.css (Spaltenkopf am Handy nur optisch versteckt), kontakt.astro (div statt aside), BaseLayout.astro (Vorschau-Leiste als aside mit Namen).
- Prüfung: check 0, build, seo 61, axe WCAG 2.2 + Best Practice 10 Seiten × 2, E2E Chromium + WebKit je 24/24, Sichtprüfung Vergleich 390 und Kontakt 1440 unverändert.
## Runde 4 – ein Haupt-Knopf, ein Verhalten (00:21–00:30)
- Neuer Buchungstest: /preise/ → Fenster „Paket anfragen“ (Extra Logo) → /kontakt/?paket=…&buchen=1 → Versand „Buchung: …“ mit Extras: grün, keine JS-Fehler.
- Fund: Ratgeber/Blog „Kostenlose Erstberatung“ öffnete die Paketwahl ohne Vorauswahl; Kopfzeile/Leiste/Menü auf Unterseiten ohne Anliegen.
- MKT-011: ERSTBERATUNG_PFAD in config/startseite.ts; Header, StickyBar, MobileMenu, warum-wir, blog/[id], ratgeber/[id].
- Prüfung: check 0, build, seo 61, axe 4 Seiten × 2, Buchungs-/Link-Test 390/1440, E2E 24/24.
## Runde 5 – strukturierte Daten (00:25–00:30)
- MKT-012: seitenSchema() in src/lib/schema.ts; ContactPage auf /kontakt/, AboutPage auf /ueber-uns/ (Name/Beschreibung = Title/Description der Seite, @id-Verweise auf #organization/#website).
- Geprüft: alle 147 JSON-LD-Blöcke im Build parsen; check, build, seo, axe, E2E grün.
## Runde 6 – Erwartung nach der Paketanfrage, 404 (00:30–00:37)
- MKT-013: kontakt.astro (&weg=buchung nach ?buchen=1), danke.astro (Schritt 3 „Vertrag per E-Mail“), 404.astro (dritter Knopf Erstberatung).
- Prüfung: check, build, seo, axe 404 + Danke-Buchung, Buchungsweg inkl. Danke, E2E 24/24.
## Runde 7 – Handy: Leiste über den Formularen, unabhängiges Review (00:28–00:35)
- Sichtprüfung Startseite 390 je Abschnitt: Leiste verdeckt Felder im Formular-Abschnitt.
- MKT-014: StickyBar.astro (IntersectionObserver auf #kontakt-start). J6Start.astro: Paketfeld vor dem Setzen in beiden Formularen leeren (Review-Hinweis).
- Unabhängiges Review (Subagent, nur lesend) von kontakt/danke/J6Start/J6Preise: keine Fehler mit hoher Sicherheit, XSS-frei (nur textContent/value), HTML-Struktur ok.
- Prüfung: check, build, seo, axe Kernseiten, Leisten-Test Chromium + WebKit, E2E 24/24.
