# QA-Checkliste (je Runde)

Werkzeuge: Build wie CI im node:22-Container (`npm run check`, `npm run build`, `npm run seo`), Playwright 1.48.2 (Chromium) + axe-core (WCAG 2.1 A/AA), eigene Skripte im Scratchpad (`l22.cjs` Seiten-Check, `l22e2e.cjs` Formular-Wege mit abgefangenem Versand).

| Runde | check | build | seo | axe+Querscroll 390/1440 | E2E Formulare | Gate |
|---|---|---|---|---|---|---|
| 0 Baseline | 0 Fehler | ok | 61 Seiten ok | 57 Seiten × 2 ok | 4 FAIL (MKT-001) | – |
| 1 | 0 Fehler | ok | 61 Seiten ok | Kernseiten (/, /kontakt/, /danke/, /preise/) × 2 ok | 20/20 ok (inkl. Rückfall E-Mail-Programm) | PASS_WITH_LIMITATIONS (nur Chromium, kein echter Versand) |
| 2 | 0 Fehler | ok | 61 Seiten ok | /, /kontakt/, /danke/?weg=schnell, /danke/?weg=gespraech × 2 ok | 24/24 ok (inkl. Danke je Weg) | PASS_WITH_LIMITATIONS |
| 3 | 0 Fehler | ok | 61 Seiten ok | 10 Seiten × 2 mit WCAG 2.2 + Best Practice: nur target-size /beispiele/ 390 (Ausnahme) | Chromium 24/24, WebKit 24/24 | PASS_WITH_LIMITATIONS |
| 4 | 0 Fehler | ok | 61 Seiten ok | Ratgeber, Blog, Warum webgold, / × 2 ok | Buchung (Preise → Fenster → Kontakt → Versand) + Leistung/Ratgeber/Warum-wir je 390/1440 ok; E2E 24/24 | PASS_WITH_LIMITATIONS |
