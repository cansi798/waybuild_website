# QA-Checkliste (je Runde)

Werkzeuge: Build wie CI im node:22-Container (`npm run check`, `npm run build`, `npm run seo`), Playwright 1.48.2 (Chromium) + axe-core (WCAG 2.1 A/AA), eigene Skripte im Scratchpad (`l22.cjs` Seiten-Check, `l22e2e.cjs` Formular-Wege mit abgefangenem Versand).

| Runde | check | build | seo | axe+Querscroll 390/1440 | E2E Formulare | Gate |
|---|---|---|---|---|---|---|
| 0 Baseline | 0 Fehler | ok | 61 Seiten ok | 57 Seiten × 2 ok | 4 FAIL (MKT-001) | – |
| 1 | 0 Fehler | ok | 61 Seiten ok | Kernseiten (/, /kontakt/, /danke/, /preise/) × 2 ok | 20/20 ok (inkl. Rückfall E-Mail-Programm) | PASS_WITH_LIMITATIONS (nur Chromium, kein echter Versand) |
