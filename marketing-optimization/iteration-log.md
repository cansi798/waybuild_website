# Iterationsprotokoll

## Runde 0 – Baseline (21.11. 23:54–00:15)
- Build wie CI (npm ci, check 0 Fehler/0 Warnungen-Ergebnis, build, seo „Keine Probleme in 61 Seiten“): grün.
- E2E (eigenes Playwright-Skript, Versand abgefangen): 4 FAIL – Haupt-CTA zeigt Paketwahl + verliert Anliegen (390 und 1440).
## Runde 1 – Haupt-Weg zur Anfrage (00:00–00:25)
- MKT-001: /kontakt/ erkennt ?paket=Kostenlose Erstberatung (Haupt-Knopf) als Anliegen → keine Paket-/Extras-Wahl, Anliegen im Betreff, in den Daten und in der E-Mail. Datei: src/pages/kontakt.astro
- MKT-002: Preis-Knöpfe (J6Preise data-paket) → verstecktes Feld paket im Mini-Formular (J6Start), Betreff „… – Paket: X“. Dateien: J6Preise.astro, J6Start.astro
- Prüfung: check 0 Fehler, build ok, seo 61 ok, axe/Querscroll Kernseiten 390/1440 ok, E2E 20/20. Gate PASS_WITH_LIMITATIONS.
- Wirkung: unverified (keine Messdaten), Hypothese.
