# waybuild_website

Website der **Waybuild UG (haftungsbeschränkt)** – Websites im Abo.
Gebaut mit [Astro](https://astro.build) als rein statische Seite, deployed per GitHub Actions auf GitHub Pages.

**Live:** https://cansi798.github.io/waybuild_website/
**CI-Handbuch:** nur lokal unter `intern/Waybuild-CI-Handbuch.pdf` (Ordner `intern/` wird nicht gepusht)

## Inhalte pflegen

Fast alles steht zentral in [`src/config/site.ts`](src/config/site.ts):

| Was | Wo |
|---|---|
| Firmendaten (Adresse, HRB, USt-ID, E-Mail, Telefon) | `company` – alle `TODO`-Werte ersetzen |
| Tarife & Preise (netto) | `plans` |
| Zusatzleistungen | `addons` |
| Vorteile, Vergleich WordPress, Ablauf | `usps`, `comparison`, `steps` |
| FAQ (auch als FAQPage-JSON-LD und in `/llms.txt` für KI-Suchen) | `faqs` |

## Bilder

Bilder einfach in **`src/assets/bilder/`** ablegen – sie werden beim Build automatisch zu AVIF/WebP in passenden
Größen optimiert. Welche Datei wohin gehört: [`src/assets/bilder/LIESMICH.md`](src/assets/bilder/LIESMICH.md).
KI-Prompts im Waybuild-Stil: [`src/assets/bilder/KI-PROMPTS.md`](src/assets/bilder/KI-PROMPTS.md).

## Hinweise & Launch-Checkliste

Solange Daten fehlen, zeigt die Website gelbe **„Fehlt: …“**-Hinweise genau an der Stelle, wo etwas nachgetragen werden muss
(Impressum, Kontakt, Über uns, AGB, Referenzen …). Unten rechts zeigt ein Badge, wie viele Punkte noch offen sind.

- Übersicht aller offenen Punkte: **`/checkliste/`** (wird automatisch aus `src/config/launch.ts` + Firmendaten erzeugt)
- Firmendaten eintragen → Hinweise verschwinden automatisch
- Vor dem offiziellen Start: `SHOW_HINTS = false` in `src/config/site.ts` → alle Hinweise und Platzhalter-Bereiche weg

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:4321/waybuild_website/
npm run check    # Typprüfung
npm run build    # statischer Build nach dist/
```

> Das Projekt liegt in einem VirtualBox-Shared-Folder. Deshalb `bin-links=false` in `.npmrc`
> und die Skripte rufen Astro direkt über `node node_modules/astro/bin/astro.mjs` auf.

## Deployment

Jeder Push auf `main` baut und veröffentlicht automatisch ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

### Eigene Domain (z. B. waybuild.de) aktivieren

1. In `.github/workflows/deploy.yml`: `SITE: https://waybuild.de` und `BASE: /`
2. `public/CNAME` mit Inhalt `waybuild.de` anlegen
3. In `public/robots.txt` die Sitemap-URL anpassen, in `public/site.webmanifest` `start_url`/`scope` auf `/`
4. Beim Domain-Anbieter DNS auf GitHub Pages zeigen lassen, dann im Repo unter *Settings → Pages* die Domain eintragen

Erst mit eigener Domain liest Google die `robots.txt` (sie muss im Domain-Root liegen).

### Kontaktformular

Ohne Konfiguration öffnet das Formular das E-Mail-Programm (`mailto:`).
Für echten Versand einen Dienst wie Web3Forms oder Formspree nutzen und die Endpoint-URL als
`PUBLIC_FORM_ENDPOINT` im Workflow (`env:`) setzen – danach Datenschutzerklärung um den Dienst ergänzen.

## Qualität (Lighthouse, mobil)

| Seite | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Start | 100 | 100 | 100 | 100 |
| Leistungen | 97 | 100 | 100 | 100 |
| Preise | 100 | 100 | 100 | 100 |
| Kontakt | 100 | 100 | 100 | 100 |

## SEO-Bausteine

Prüfung: `npm run seo` (läuft auch bei jedem Deploy – bei Fehlern wird nicht veröffentlicht).


- Title, Description, Canonical, Open Graph & Twitter Card pro Seite (`src/layouts/BaseLayout.astro`)
- JSON-LD: `Organization`, `WebSite`, `Service` mit `Offer`s (netto), `FAQPage`, `BreadcrumbList` (`src/lib/schema.ts`)
- `sitemap-index.xml` (ohne Rechtstexte, Checkliste, Danke-Seite), `robots.txt`
- Sichtbare Breadcrumbs, `lastmod` in der Sitemap, `max-image-preview:large`
- `/llms.txt` für KI-Suchen (ChatGPT, Perplexity, Gemini), automatisch aus der Konfiguration erzeugt
- Mit vollständiger Adresse wird zusätzlich `ProfessionalService` (lokales Unternehmen) ausgegeben
- Keine Cookies, kein Tracking, Schriften lokal – kein Cookie-Banner nötig
- Bewusst **kein** Font-Preload: kostete 300 ms Blocking Time ohne LCP-Gewinn (gemessen)
