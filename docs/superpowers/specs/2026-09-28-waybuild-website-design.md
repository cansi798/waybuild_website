# Waybuild Website – Design

## Ziel
Marketing-Website der Waybuild UG (haftungsbeschränkt). Verkauft Websites im Abo
(Einrichtungsgebühr + Monatspreis, inkl. Hosting, Domain, SSL, unbegrenzte E-Mail-Postfächer,
Wartung). Erfolg = qualifizierte Anfragen über das Kontaktformular.

## Zielgruppe
Kleine Unternehmen in Deutschland (Handwerk, Praxen, Dienstleister, Gastronomie). B2B –
alle Preise **netto** zzgl. 19 % USt.

## Positionierung (vs. Wettbewerb)
Markt: 19–199 € mtl., 0–499 € Einrichtung, meist 24 Monate Laufzeit, WordPress-Templates,
2–10 E-Mail-Adressen.

Waybuild hebt sich ab durch:
1. **Unbegrenzte E-Mail-Postfächer** in allen Tarifen
2. **12 statt 24 Monate** Mindestlaufzeit, danach monatlich kündbar
3. **Kein WordPress** – statische Astro-Seiten: schneller, sicherer, wartungsarm
4. **PageSpeed-Garantie 90+** (mobil)
5. **Live in 14 Tagen** nach Erhalt der Inhalte
6. **Code-Übergabe** nach Ablauf der Mindestlaufzeit möglich
7. **SEO + GEO** (Optimierung für Google und KI-Suchen)

## Tarife (netto)
| | Start | Business (empfohlen) | Premium |
|---|---|---|---|
| Einrichtung | 290 € | 590 € | 1.190 € |
| Monatlich | 49 € | 89 € | 169 € |
| Seiten | bis 5 | bis 12 | unbegrenzt |
| Änderungen/Monat | 30 Min | 90 Min | 4 Std |
| SEO | technisches SEO | + lokales SEO, Google-Unternehmensprofil | + monatliche SEO-Betreuung & Report |
| Support-Reaktion | 48 h | 24 h | 4 h (werktags) |

Alle: Hosting (EU), .de-Domain, SSL, unbegrenzte Postfächer, Backups, Updates,
Impressum/Datenschutz-Struktur, Kontaktformular. Jahreszahlung: 2 Monate gratis.
Add-ons: zusätzliche Domain, Mehrsprachigkeit, Online-Terminbuchung, Texterstellung, Fotos.

## Technik
- Astro (statisch), kein Client-JS außer Mobile-Menü und Formular-Handling
- Selbst gehostete Schriften (DSGVO, keine Google-Fonts-Requests), kein Tracking, keine Cookies
- SEO: pro Seite Title/Description/Canonical, Open Graph, JSON-LD (Organization, Service
  mit Offers, FAQPage, BreadcrumbList), Sitemap, robots.txt, semantisches HTML, `lang="de"`
- Zentrale Konfiguration `src/config/site.ts` (Firmendaten, Tarife) – Platzhalter bis Daten vorliegen
- Kontaktformular: Endpoint via `PUBLIC_FORM_ENDPOINT` (z. B. Web3Forms/Formspree), sonst `mailto:`-Fallback
- Deployment: GitHub Actions → GitHub Pages; `SITE`/`BASE` per Env, später eigene Domain

## Seiten
`/` (Hero, USPs, Leistungen, Tarife, Vergleich, Ablauf, FAQ, CTA), `/preise`, `/leistungen`,
`/kontakt`, `/impressum`, `/datenschutz`, `404`.

## Prüfung
Nach jedem Schritt: `astro check` + `astro build`, Build-Output auf Meta/JSON-LD prüfen,
Screenshots mobil/desktop (Playwright), dann Commit + Push.
