# Bildquellen (Stockfotos)

Stockfotos von Menschen bei der Arbeit, eingefügt auf Wunsch von Jamil (Talk qh87y3sj #5362, 10.11.2026).
Ordner: `src/assets/bilder/stock/`. Zuordnung zu den Seiten und Alt-Texte: `src/config/bilder.ts`.

## Lizenz

Alle Fotos stammen von **Unsplash** und stehen unter der **Unsplash License** (https://unsplash.com/license):
kostenlos, auch gewerblich nutzbar, ohne Namensnennung. Nicht erlaubt ist u. a., die Fotos unverändert zu verkaufen
oder damit einen vergleichbaren Bilderdienst aufzubauen. Bei jedem Foto stand auf der Unsplash-Seite
„Free to use under the Unsplash License“ (kein Unsplash+).

Heruntergeladen am **10.11.2026** über die normale öffentliche Bildadresse von Unsplash (`images.unsplash.com`,
1600 px breit, JPEG). Die Website erzeugt daraus beim Build AVIF- und WebP-Versionen.

## Regeln (UWG)

- Die Fotos zeigen **weder unser Team noch unsere Kunden**. Keine Namen, keine Bildunterschriften, nichts, was das andeutet.
- Nicht neben „Wer hinter waybuild steht“, Kundenstimmen oder Referenzen als „unser Kunde“ einsetzen.
- Alt-Texte beginnen mit „Symbolfoto:“ und beschreiben nur die Szene.

## Fotos

| Datei | Szene | Fotograf / Fotografin | Unsplash-Seite | Foto-ID (images.unsplash.com) |
|---|---|---|---|---|
| `stock/beratung-laptop.jpg` | Zwei Personen im Büro schauen auf einen Laptop | Vitaly Gariev (https://unsplash.com/@silverkblack) | https://unsplash.com/photos/two-people-collaborating-at-a-desk-with-a-laptop-FXVt6t0tkmI | photo-1758873268394-443e1ac80032 |
| `stock/empfang-tablet.jpg` | Frau am Empfangstresen mit Tablet | Bluestonex (https://unsplash.com/@bluestonex_apphaus) | https://unsplash.com/photos/Li6MH3rfyPo | photo-1759143545924-beb85b33c0f1 |
| `stock/gaertnerei-beratung.jpg` | Beratung in einer Gärtnerei | Vitaly Gariev (https://unsplash.com/@silverkblack) | https://unsplash.com/photos/JtzfzdoHzo4 | photo-1758524055384-6b54143f32ed |
| `stock/imbiss-handy.jpg` | Mann am Imbissstand mit Handy | Ali Mkumbwa (https://unsplash.com/@mkumbwajr) | https://unsplash.com/photos/uk3ey_vhDKA | photo-1687422808248-f807f4ea2a2e |
| `stock/laden-laptop.jpg` | Frau im Bekleidungsgeschäft, telefoniert am Laptop | Vitaly Gariev (https://unsplash.com/@silverkblack) | https://unsplash.com/photos/woman-working-on-a-laptop-surrounded-by-clothes-b4BUv1nnhys | photo-1753161618037-e6a8f740fd47 |
| `stock/schneiderei-telefon.jpg` | Frau in einer Schneiderei, telefoniert am Laptop | Vitaly Gariev (https://unsplash.com/@silverkblack) | https://unsplash.com/photos/fashion-designer-on-the-phone-working-on-a-laptop-kk4J92iaSBk | photo-1753164597612-5e71b83fda91 |
| `stock/tablet-tisch.jpg` | Frau am Holztisch mit Tablet | Brooke Cagle (https://unsplash.com/@brookecagle) | https://unsplash.com/photos/JBwcenOuRCg | photo-1543269664-56d93c1b41a6 |
| `stock/team-besprechung.jpg` | Drei Personen besprechen sich am runden Tisch | Vitaly Gariev (https://unsplash.com/@silverkblack) | https://unsplash.com/photos/omGSZqBXkqY | photo-1714974528737-3e6c7e4d11af |
| `stock/werkstatt-moebel.jpg` | Person bearbeitet in einer Werkstatt einen alten Rahmen | Bob van Aubel (https://unsplash.com/@bobvanaubel) | https://unsplash.com/photos/WsE66WTJCwE | photo-1728379891769-5429538b17fc |
| `stock/werkstatt-tablet.jpg` | Älterer Mann in einer Töpferwerkstatt mit Tablet | Vitaly Gariev (https://unsplash.com/@silverkblack) | https://unsplash.com/photos/man-using-tablet-in-pottery-workshop-H4nhvYQzj10 | photo-1794209166683-070e7a3b7324 |

Geprüft: keine gut sichtbaren Markenlogos, keine bekannten Personen. Aussortiert wurden u. a. Fotos mit Starbucks-Becher,
Kassen-Logo (Square), Kreditkarten-Logos und gestellte Studiofotos vor farbigem Hintergrund.

Neues Stockfoto: Datei nach `stock/` legen, in `src/config/bilder.ts` eintragen (Alt-Text „Symbolfoto: …“) und hier
eine Zeile mit Quelle, Fotograf, Lizenz und Datum ergänzen.

# Bildschirmfotos Referenz Bauwelt Handwerk (Jamil #6384/#6385, 19.11.2026)

Im Wechsler „Websites und Software nach Maß“ der Startseite (`components/start6176/J6Wechsler.astro`, Alt-Texte in
`config/start-6176.ts` → `J_MASS.bauwelt`). Eigene Arbeit von waybuild/webgold für Bauwelt Handwerk; Nennung nur mit Zustimmung von Bauwelt.

| Datei | Herkunft |
|---|---|
| `referenzen/bauwelt-kalkulator.png` | Seit Jamil #6922 ersetzt durch Bildschirmfoto 1280×754 des Ergebnisses „Ihre erste Preisspanne“ (Badsanierung 8 m², Bauwelt-Kalkulator, Testeingabe). Vorher: neu aufgenommen 19.11.2026 (Playwright, 960 × 660 px, 2×) von https://www.bauwelt-handwerk.de/rechner/ – Badsanierung 8 m², nur angesehen, nichts abgeschickt |
| `referenzen/bauwelt-auftrag.png` | Vorhandenes Bildschirmfoto aus der CRM-Testumgebung (Nextcloud Team/CRM System/Screenshots Kontaktweg 02.11.2026, `4-auftrag-desktop.png`), nur Testdaten; Einsatzort-Adresse unscharf gemacht; seit #6427 ohne linke Menüleiste zugeschnitten; seit Jamil #6900 ersetzt durch hellen CRM-Screenshot „Badsanierung“ (1280×765, Testdaten, ungekürzt) |
| `referenzen/bauwelt-kundenportal.png` | (seit Jamil #7095, 23.11.2026: Seitenhintergrund im Bild weiß statt Creme, Karten mit feiner Linie nachgezogen; Skript scratchpad k7095/weiss2.py) (seit Jamil #6906: heller Portal-Screenshot „Badsanierung“, Team auf Jürgen und Sabine gekürzt, Termin Mo 22.11. mit Jürgen – nachbearbeitet)  Vorhandenes Bildschirmfoto aus einem CRM-Testlauf (27.10.2026, Testdaten), oberer Teil; Fußzeile mit Kontaktdaten abgeschnitten |
