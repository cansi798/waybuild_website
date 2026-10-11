# Angebotserweiterung waybuild (Websites · Software · Cloud & IT · Beratung) – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die Website vom reinen Website-Abo zum B2B-Komplettanbieter erweitern – sechs neue Leistungen mit Detailseiten, transparente Preise inkl. Abo-Modelle je Säule, „Warum waybuild“-Positionierung, offene Launch-Punkte schließen.

**Architecture:** Eine neue Konfigurationsdatei `src/config/angebot.ts` ist die einzige Quelle für Säulen, Pakete und Stundensätze. `src/config/leistungen.ts` bekommt die neuen Leistungen im bestehenden `Leistung`-Typ (erweitert um `saeule`, optional `pakete`/`problem`/`ablauf`; `plan` wird optional). Die bestehende Vorlage `src/pages/leistungen/[slug].astro` rendert Website-Tarif **oder** Paket-Karten. Navigation, Footer, Startseite, `/preise/`, `llms.txt` und JSON-LD lesen aus denselben Daten.

**Tech Stack:** Astro 7 (statisch), TypeScript, eigene CSS-Komponenten, rough.js-Szenen (bestehend), GitHub Pages.

**Spec:** Kundenauftrag Can 11.10.2026 (Auftragstext im Chat) + Recherche `docs/wettbewerbsanalyse-2026-10.md`.

## Global Constraints

- Nur B2B; alle Preise **netto zzgl. 19 % USt.**, sichtbar auf jeder Preisangabe-Seite.
- Website-Tarife bleiben **Start 149 / Business 249 / Premium 459 €** (Analyse: wettbewerbsfähig), Einrichtung 490 €.
- Neue Preise exakt wie in `docs/wettbewerbsanalyse-2026-10.md` Abschnitte 2–5.
- Farben/Fonts/Komponenten unverändert (`--accent #00a6a1`, `--accent-ink #006b68`, `--dark #004f4c` …), Haupt-CTA „Erstgespräch“.
- Keine erfundenen Kundenzahlen, Zitate, Logos, Zertifikate, Auszeichnungen; keine echten Wettbewerber nennen; Referenzen bleiben „Muster“.
- SEO-Audit: Title ≤ 60 Zeichen inkl. „ | Waybuild“, Description 70–160, genau ein `<h1>`, keine Überschriften-Sprünge, kein „TODO“ im JSON-LD, keine toten Links.
- Fehlende Inhaber-Daten (Telefon, HRB, USt-ID, Web3Forms-Key, echte Referenzen) bleiben als markierte Platzhalter.

## Review Focus

- Mobile (Pixel 7, 412 px): neue Paket-Karten, Preistabellen und Mega-Dropdown dürfen nicht horizontal überlaufen → Screenshot je Seite prüfen.
- Leistungen ohne Website-Tarif (`plan` undefined) dürfen in Kacheln/Footer/Kontakt-Links keine „undefined“-Texte oder `?tarif=undefined` erzeugen → `grep -r undefined dist/**/*.html` leer.
- Kontaktformular: Links von neuen Leistungen (`?leistung=nextcloud`) müssen das Formular sinnvoll vorbelegen (Interesse-Feld) statt nur Tarif-Radio.
- Desktop-Dropdown mit ~12 Einträgen muss in 1440×900 vollständig sichtbar sein (gruppiert, mehrspaltig).
- Preisangaben müssen überall aus `angebot.ts` kommen (kein doppelt gepflegter Preis) → `grep -rn "11,90\|7,90" src` nur in `angebot.ts`.

---

### Task 1: Datenmodell – Säulen, Pakete, neue Leistungen

**Files:**
- Create: `src/config/angebot.ts`
- Modify: `src/config/leistungen.ts`, `src/config/site.ts` (IconName um `code`, `cloud`, `cpu`, `compass`, `layers`, `lock` erweitern; Firmendaten Adresse/GF), `src/components/Icon.astro`

**Interfaces:**
- Produces: `type Saeule = 'websites' | 'software' | 'cloud' | 'beratung'`; `SAEULEN: { id: Saeule; title: string; claim: string; icon: IconName }[]`;
  `type Paket = { name: string; preis: string; einheit: string; hinweis?: string; features: string[]; highlight?: boolean }`;
  `STUNDENSATZ = 95`, `TAGESSATZ = 760`; `ABO_UEBERSICHT` (Liste aller Abos für /preise und /leistungen/abo-wartung/).
- `Leistung` erweitert: `saeule: Saeule`, `plan?: 'start'|'business'|'premium'`, `pakete?: Paket[]`, `paketeTitel?: string`, `problem?: string[]`, `ablauf?: {title:string; text:string}[]`.
- Neue Slugs: `individuelle-software`, `software-webentwicklung`, `nextcloud`, `cloud-it`, `wettbewerbsanalyse`, `abo-wartung`.
- `leistungenNach(saeule: Saeule): Leistung[]`.

- [ ] Step 1: `angebot.ts` mit allen Paketen/Preisen anlegen, `leistungen.ts` erweitern (bestehende 5 bekommen `saeule: 'websites'`).
- [ ] Step 2: `npm run check` (Docker) → 0 errors.

### Task 2: Detailseiten-Vorlage + Grafiken

**Files:** Modify `src/pages/leistungen/[slug].astro`, `src/components/LeistungGrafik.astro` (neue `art`: `software`, `code`, `cloud`, `it`, `analyse`, `abo`).

- [ ] Step 1: Vorlage: Problem/Nutzen-Block (wenn `problem`), Umfang, Text, Ablauf (wenn `ablauf`), Pakete-Grid (wenn `pakete`) **sonst** bisheriger Tarif-Block, Siegel, FAQ, „Weitere Leistungen“ nur gleiche Säule + Link Übersicht. Titel/Description ohne „im Abo“, wenn kein `plan`. JSON-LD `Service` mit `offers` aus Paketen.
- [ ] Step 2: Kontakt-Link `?leistung=<slug>` (+ `tarif` nur wenn `plan`).
- [ ] Step 3: Build + SEO-Audit grün.

### Task 3: Leistungen-Übersicht, Navigation, Footer, Kontakt

**Files:** Modify `src/pages/leistungen/index.astro`, `src/config/nav.ts`, `src/components/Header.astro`, `src/components/MobileMenu.astro`, `src/components/Footer.astro`, `src/pages/kontakt.astro`.

- [ ] Step 1: Übersicht in Säulen-Sektionen mit Anker (`#websites`, `#software`, `#cloud`, `#beratung`).
- [ ] Step 2: `NavChild` + optional `group`; Desktop-Dropdown „Leistungen“ mehrspaltig gruppiert; Mobil Gruppenüberschriften; Unternehmen-Menü + „Warum waybuild“.
- [ ] Step 3: Footer-Spalte „Leistungen“ nach Säulen; Kontakt: Feld „Interesse“ (Select mit Säulen/Leistungen), vorbelegt aus `?leistung=`.

### Task 4: /preise – vollständige Preisübersicht

**Files:** Modify `src/pages/preise.astro`, `src/lib/schema.ts` (Offer-Liste um neue Abos ergänzen).

- [ ] Step 1: Sprungnavigation je Säule; Websites (bestehende Karten/Matrix/Jahr/Add-ons), Software (Projekt-ab-Preise + Pflege S/M/L), Cloud & IT (Nextcloud je Nutzer, IT-Betreuung je Arbeitsplatz, Server), Beratung (Analyse-Pakete), Stundensätze, Hinweisbox „netto, nur Unternehmen“.
- [ ] Step 2: SEO-Audit grün (Title ≤ 60).

### Task 5: „Warum waybuild“-Seite

**Files:** Create `src/pages/warum-waybuild.astro`; Modify `src/config/angebot.ts` (Vergleichsdaten `ANBIETER_VERGLEICH`).

- [ ] Step 1: Vergleichstabelle Baukasten / Freelancer / Klassische Agentur / waybuild (Typen, keine Namen), Alleinstellungsmerkmale (nur belegbare), Hinweis „Wir betreiben selbst …“, CTA.

### Task 6: Startseite, llms.txt, Schema

**Files:** Modify `src/components/LeistungKarten.astro` (Säulen-Teaser), `src/config/home.ts` (Hero-Begriffe/Eyebrow), `src/pages/llms.txt.ts`, `src/pages/index.astro`.

- [ ] Step 1: Startseiten-Kacheln zeigen 4 Säulen mit Unterleistungen + „ab“-Preis.
- [ ] Step 2: llms.txt um Säulen, Pakete, Preise, neue Seiten erweitern.

### Task 7: Offene Punkte & Rechtstexte

**Files:** Modify `src/config/site.ts` (Adresse Kuno-Liesenberg-Kehre 32a, 22844 Norderstedt; GF Can Siebert), `src/pages/datenschutz.astro` (Web3Forms immer erwähnen, WhatsApp-Kontakt), `src/pages/agb.astro` (Geltung für alle Leistungen, Kontingent-Übertrag 3 Monate wie FAQ), `src/config/launch.ts` (neue Punkte), README.

- [ ] Step 1: Änderungen + Checkliste aktualisieren.

### Task 8: Verifikation & Auslieferung

- [ ] Step 1: Docker-Build + `npm run seo` → „✓ Keine Probleme“.
- [ ] Step 2: Playwright-Screenshots 1440 + Pixel 7 für `/`, `/leistungen/`, 6 Detailseiten, `/preise/`, `/warum-waybuild/` → selbst ansehen, Layoutfehler beheben.
- [ ] Step 3: Logische Commits (deutsch, Co-Authored-By), `git push origin main`, Pages-Deploy abwarten, `curl` mit Cache-Buster auf neue Inhalte prüfen.
