# waybuild_website

Website der **Waybuild UG (haftungsbeschränkt)** – Websites im Abo.
Gebaut mit [Astro](https://astro.build) als rein statische Seite, deployed per GitHub Actions auf GitHub Pages.

**Vorschau (nur Ansicht, nicht für Google):** https://cansi798.github.io/waybuild_website/
**Live (später):** eigener Server unter https://waybuild.de
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
npm run dev      # http://localhost:4321/
npm run build:preview   # Build wie die GitHub-Pages-Vorschau
npm run check    # Typprüfung
npm run build    # statischer Build nach dist/
```

> Das Projekt liegt in einem VirtualBox-Shared-Folder. Deshalb `bin-links=false` in `.npmrc`
> und die Skripte rufen Astro direkt über `node node_modules/astro/bin/astro.mjs` auf.

## Deployment

### Vorschau – GitHub Pages
Jeder Push auf `main` aktualisiert automatisch die **Vorschau**. Sie ist bewusst für Suchmaschinen gesperrt
(`noindex`, `robots.txt: Disallow`) und zeigt oben ein „Vorschau“-Banner – so gibt es später keinen Duplicate Content.

### Live gehen (eigener Server)
Die Live-Version wird bei **jedem Push automatisch mitgebaut**:
GitHub → Actions → letzter Lauf → *Artifacts* → **`waybuild-server-upload`** herunterladen und entpacken.

Oder lokal:
```bash
cp .env.example .env     # Web3Forms-Key eintragen
npm run build            # erzeugt dist/ für https://waybuild.de (inkl. .htaccess)
```

Dann den **Inhalt** von `dist/` (inkl. der versteckten Datei `.htaccess`) per SFTP/FTP in das Web-Verzeichnis
des Servers laden (z. B. `htdocs/` oder `/var/www/waybuild`).

| Server | Konfiguration |
|---|---|
| Apache (IONOS, Strato, all-inkl …) | `.htaccess` liegt automatisch im Build: HTTPS, 404, Caching, Sicherheits-Header |
| nginx (VPS) | Vorlage: [`server/nginx.conf.example`](server/nginx.conf.example) |

Vor dem Live-Gang: Hoster in `src/config/site.ts → company.hoster` eintragen (Datenschutz), `SHOW_HINTS = false`.
Andere Domain als waybuild.de? → `SITE` beim Build setzen und die Domain in `server/.htaccess` anpassen.

### Kontaktformular

Ohne Konfiguration öffnet das Formular das E-Mail-Programm (`mailto:`).
Für echten Versand einen Dienst wie Web3Forms oder Formspree nutzen und den Access-Key als
Repository-Variable `WEB3FORMS_KEY` (GitHub) bzw. in `.env` (lokal) setzen – danach Datenschutzerklärung um den Dienst ergänzen.

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
