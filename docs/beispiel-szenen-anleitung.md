# Bau-Anleitung: Szenen für „So kann es laufen“

Animiertes Beispiel auf `/so-kann-es-laufen/` (Jamil, Talk qh87y3sj #5678/#5680, 13.11.2026). Das Grundgerüst (Zweig
`beispiel/geruest`) bringt Seite, Scroll-Engine, Geräte, Tokens, Teaser und **Szene 01 als fertige Referenz**. Die Szenen
02–13 sind Platzhalter und werden von Szenen-Agenten gebaut – jede Szene in **genau einer Datei**
`src/components/beispiel/szenen/SzeneNN.astro`.

Verbindlich ist das Drehbuch (in `src/config/beispiel.ts` steht je Szene unter `bild`, was man sieht). Titel und Texte der
Szenen stehen dort wörtlich und werden **nicht** geändert.

> **Stand 13.11.2026 (Jamil, Talk qh87y3sj #5683/#5709–#5715 + Änderung 08:57): Film statt Scroll-Bühne, personalisiert.**
> - Die Seite läuft wie ein **Film ohne Scrollen**: ein Bildschirm (Bühne = sichtbare Höhe), die Szenen wechseln von selbst
>   (je 2–4 s: 3 Phasen 3,3 s, 4 Phasen 3,6 s, eigene Dauer per `SzeneRahmen dauer={…}`), Steuerleiste unten (Zurück,
>   Pause/Abspielen, Weiter, Segment je Szene, Branche ändern), Tastatur (Leertaste, Pfeile), Autoplay nur sichtbar/Tab
>   sichtbar, reduzierte Bewegung = Endzustände ohne Autoplay. Ablauf: `src/scripts/beispiel.ts` (die Scroll-Engine
>   `buehne-kern.ts` nutzt nur noch die Kundenreise).
> - **Personalisierung:** Vor dem Start wählt der Besucher seine Branche und optional seinen Firmennamen. Alle
>   branchen-abhängigen Texte der Szenen tragen `data-p="<schlüssel>"`; die Werte kommen aus
>   `src/components/beispiel/branchen.ts` (`werte(branche, firma)`, eine Datenstruktur je Branche, leicht erweiterbar).
>   Die Szenen rendern die Standardbranche (Maler, Drehbuch wörtlich); im Browser setzt das Skript **nur textContent**.
>   Neue Texte in Szenen immer so einbauen: `<span data-p="firma">{W.firma}</span>` mit `const W = werte(STANDARD)`.
> - **Zeiten in Szenen-CSS** stehen als `calc(Xs * var(--bsp-t, 1))`; im Film ist `--bsp-t: 0.6` (gestrafft), ebenso die
>   Tokens `--bsp-dauer*`, `--bsp-auftritt`. Neue Zeiten bitte genauso schreiben.
> - **Finger auf ein Ziel:** Element mit `data-ziel="<Selektor>"` bekommt in der letzten Phase `--ziel-x/--ziel-y` (Mitte
>   des Ziels relativ zur Szene, gemessen) – so tippt der Finger in Szene 1 in jeder Breite genau auf „Website“.
> - **Safari:** Geräte haben ihre Breite ausdrücklich aus der Höhe (nicht nur `aspect-ratio`), sonst fällt ein Gerät in
>   einem inhaltsbreiten Eltern-Element in WebKit auf Breite 0 (Fehler Szene 8/9).

---

## 1. Was wo liegt

| Datei | Inhalt | Szenen-Agenten |
|---|---|---|
| `src/components/beispiel/szenen/SzeneNN.astro` | Mockup + szenen-eigenes CSS der Szene NN | **bauen** (nur die eigenen Nummern) |
| `src/components/beispiel/SzeneRahmen.astro` | Wurzel jeder Szene (`.sz.szNN`, Phasen-Attribute) | nur benutzen |
| `src/components/beispiel/geraete/Handy.astro`, `Tablet.astro`, `Laptop.astro` | Gerätezeichnungen, Bildschirm = Slot | nur benutzen |
| `src/styles/beispiel-mockup.css` | Tokens (Farben, Größen, Bewegung), Geräte, Bausteine `bm-*`, Keyframes | nur benutzen |
| `src/styles/beispiel.css` | Bühne/Karten (Layout, Leiste, Übergänge zwischen Szenen) | nicht ändern |
| `src/scripts/beispiel.ts` | Film-Ablauf (Schritte, Phasen, Steuerung, Personalisierung) | nicht ändern |
| `src/components/beispiel/branchen.ts` | Branchen-Daten + `werte()` (alle personalisierten Texte) | Branchen ergänzen |
| `src/config/beispiel.ts` | Titel, Texte, Drehbuch-Notizen, Schluss, Teaser | nicht ändern |
| `src/components/beispiel/BeispielBuehne.astro`, `BeispielTeaser.astro`, `Platzhalter.astro` | Bühne, Teaser, Platzhalter | nicht ändern |

Braucht eine Szene etwas Gemeinsames, das es noch nicht gibt: **in der eigenen Szenendatei lösen** (Klassen mit eigenem
Präfix) und im Bericht an den Koordinator vermerken. So bleiben die Zweige konfliktfrei zusammenführbar.

## 2. Szenen-API in Kürze

```astro
---
import SzeneRahmen from '../SzeneRahmen.astro';
import Handy from '../geraete/Handy.astro';
interface Props { variante?: 'buehne' | 'mini' }
const { variante = 'buehne' } = Astro.props;
---
<SzeneRahmen nr={7} phasen={3} takt={1200} format="quer" variante={variante}>
  <Laptop> …Bildschirm-Inhalt… </Laptop>
</SzeneRahmen>
<style is:global> .sz07 … { } </style>
```

- **Props der Szene:** nur `variante` (`'buehne'` Standard, `'mini'` = ruhende Vorschau ohne Phasen, z. B. im Teaser oder
  als „Rückblende“ in Szene 13). Immer an `SzeneRahmen` durchreichen.
- **`SzeneRahmen`-Props:** `nr` (1–13 → Klasse `.sz07`), `phasen` (1–6 Unter-Schritte), `takt` (ms zwischen den Phasen auf
  dem Handy, Standard 900), `format` (`'hoch'` = Handy, `'quer'` = Laptop/Tablet quer/mehrere Geräte nebeneinander; steuert
  die Höhe der Bildfläche in der Kartenansicht), `class` (optional).
- **Engine setzt an `.szNN`:** `data-phase="k"` (0 … phasen), `data-erreicht="1 2 … k"`, `data-aktiv` (Szene wird gerade
  gezeigt). Sonst nichts. **Ohne JS, bei reduzierter Bewegung und in `mini` fehlen alle drei Attribute.**
- **Grundregel:** Das CSS ohne Attribute zeigt den **Endzustand** (letzte Phase). Vorzustände stehen ausschließlich unter
  `.szNN[data-phase]:not([data-erreicht~="k"])` („solange Phase k noch nicht erreicht ist“).
- **Phasenlauf:** Bühne (Rechner): Phase 1 beim Eintritt in die Szene, dann gleichmäßig über das Scroll-Stück der Szene bis
  zur letzten; frühere Szenen stehen auf der letzten Phase, spätere auf 0 (auch rückwärts korrekt). Handy-Karten: beim
  Hereingleiten Phase 0, nach 350 ms Phase 1, dann alle `takt` ms die nächste – einmal. Phase 0 = Ausgangszustand vor der Szene.

## 3. Phasen und CSS-Muster (Referenz: `Szene01.astro`)

```css
/* 1. Grundform = Endzustand */
.sz07-posten { transition: opacity var(--bsp-dauer) var(--bsp-ease), transform var(--bsp-dauer) var(--bsp-ease); }

/* 2. Vorzustand: solange Phase 2 nicht erreicht ist, sind die Posten noch nicht da */
.sz07[data-phase]:not([data-erreicht~="2"]) .sz07-posten { opacity: 0; transform: translateY(calc(12 * var(--px))); }

/* 3. Nacheinander erscheinen: Verzögerung je Element (nth-child oder Modifier-Klassen) */
.sz07-posten:nth-child(2) { transition-delay: calc(1 * var(--bsp-versatz)); }

/* 4. Einmalige Bewegung genau in einer Phase (z. B. Finger tippt): animation an [data-phase="k"] */
.sz07[data-phase="3"] .sz07-tipp { animation: bm-tippen 0.8s var(--bsp-ease) 0.4s both; }

/* 5. Dauerschleife nur, solange die Szene gezeigt wird */
.sz07[data-aktiv]:not([data-erreicht~="1"]) .sz07-marke { animation: bm-blinken 1s steps(1) infinite; }
```

- Wechselt eine Phase, laufen die CSS-Übergänge in beide Richtungen (Scrollen rückwärts setzt zurück). Verzögerungen gelten
  auch beim Zurücksetzen – das ist in Ordnung.
- Die Szene selbst wird ca. 0,2–0,35 s eingeblendet: erste Unter-Bewegung von Phase 1 mit `var(--bsp-auftritt)` verzögern.
- Auf dem Handy kommt die nächste Phase nach `takt` ms. Dauert Phase 1 z. B. 1,4 s (Tippen), `takt` ≥ 1600 wählen.
- „Zahl zählt hoch“ ohne Inline-Styles: z. B. einige fertige Zahlen übereinander stapeln und per Phase nacheinander
  ein-/ausblenden (opacity), oder eine Ziffernspalte per `transform: translateY(…)` rollen.
- „Scroll-Bewegung“ im Bildschirm: Inhalt in einen Block legen und per Phase `transform: translateY(calc(-180 * var(--px)))`.

## 4. Geräte

- `Handy` (Props `status` = Statusleiste, Standard an; `zeit` = Uhrzeit, Standard „10:24“; `class`), Bildschirm 300 Mockup-Px breit.
- `Tablet` (Props `ausrichtung` `'quer'` | `'hoch'`, `class`), Bildschirm 640 bzw. 480 Mockup-Px breit.
- `Laptop` (Prop `class`), Bildschirm 640 Mockup-Px breit.
- Alle: 2 px Kontur `--gr-kontur` (#004f4c), weißes Gehäuse, weicher Schatten, gleiche Radien-Logik. Inhalt des Bildschirms
  ist der Slot; darin `.bm-app` als Standard-Innenabstand (Spalte mit Abstand 12 Mockup-Px).
- **Größe:** Das Gerät füllt die Bildfläche (Größen-Container) so weit wie möglich. Eigene Größe per CSS-Variable an der
  Geräte-Klasse: `--gr-hoehe` (Handy, Tablet) bzw. `--gr-breite` (Laptop), Einheiten `cqh`/`cqw` der Bildfläche.
  Zwei Geräte nebeneinander: eigenen Wrapper mit `container-type: size; width: 100%; height: 100%` bauen und darin die
  Geräte positionieren (Beispiel: `.ph-paar` in `Platzhalter.astro`).
- **Mockup-Pixel:** Im Bildschirm alles in `var(--px)` bzw. den Tokens angeben (`calc(14 * var(--px))`), nie in px/rem –
  dann skaliert das Mockup an jeder Breite gleich. `--px` gilt nur innerhalb von `.gr-schirm`.
- Ein Gerät im Gerät (z. B. Rückblende in Szene 13): innere Szene mit `variante="mini"` einbinden, in einen eigenen Wrapper
  mit `container-type: size` und fester Größe setzen.
- Laptop-Szenen am Handy werden klein (Bildschirm ca. 250 px breit): wenige, große Elemente; Text ist rein bildlich.

## 5. Tokens (`src/styles/beispiel-mockup.css`)

- Farben: `--bsp-tuerkis` #00a6a1, `--bsp-tuerkis-dunkel` #00807b, `--bsp-tinte` #006b68 (Schrift/Knöpfe), `--bsp-nacht`
  #004f4c, `--bsp-creme` #f6f3ee, `--bsp-papier` (App-Hintergrund), `--bsp-weiss`, `--bsp-text`, `--bsp-text-leise`,
  `--bsp-linie`, `--bsp-linie-grau`, `--bsp-flaeche` (zartes Türkis), `--bsp-gerippe` (Platzhalter-Balken), `--bsp-stern`,
  `--bsp-ok` / `--bsp-ok-flaeche`, `--bsp-hinweis` (Benachrichtigungs-Punkt).
- Schrift im Bildschirm: `--bsp-schrift-xs` 10 · `-s` 12 · `-m` 14 (Standard) · `-l` 17 · `-xl` 21 · `-xxl` 28 Mockup-Px.
  Schriften der Seite: `var(--font-head)` (Montserrat) für Namen/Überschriften, sonst Jost.
- Abstände `--bsp-a1` 4 · `a2` 8 · `a3` 12 · `a4` 16 · `a6` 24, Radien `--bsp-r-s` 6 · `r-m` 10 · `r-l` 16 (Mockup-Px).
- Bewegung: `--bsp-dauer-kurz` 0,3 s · `--bsp-dauer` 0,6 s · `--bsp-dauer-lang` 0,9 s, `--bsp-ease` (weich),
  `--bsp-ease-feder` (leicht federnd), `--bsp-versatz` 0,12 s (Abstand beim Nacheinander), `--bsp-auftritt` 0,35 s.
- Bausteine: `.bm-app`, `.bm-titel`, `.bm-klein`, `.bm-karte` (+ `--marke` hervorgehoben), `.bm-knopf` (+ `--hell`),
  `.bm-chip` (+ `--ok`), `.bm-balken` (+ `--kurz/--mittel/--lang`, Gerippe), `.bm-sterne`, `.bm-ok` (Haken-Kreis mit svg),
  `.bm-tipp` (Tipp-Kreis, Grundform unsichtbar, selbst positionieren).
- Keyframes (nur transform/opacity): `bm-tippen`, `bm-blinken`, `bm-puls`, `bm-vibrieren` (Handy vibriert, Szene 5),
  `bm-schimmern` (Szene 13).

## 6. Do / Don't

**Do**
- Alle Klassen der Szene mit `szNN-` beginnen, alle Regeln mit `.szNN` (oder `.szNN-…`) – `<style is:global>`.
- **Spezifität:** Die Bausteine `bm-*` und die Geräte-Klassen `gr-*` haben selbst eine Klasse Spezifität, und die
  Reihenfolge der Stylesheets im Build ist nicht garantiert. Soll eine eigene Regel einen Baustein überschreiben (z. B.
  `.bm-knopf` in einer anderen Farbe oder Größe, `--gr-hoehe` an einem Gerät), immer mit der Szenen-Wurzel davor
  schreiben: `.sz07 .sz07-knopf { … }` statt nur `.sz07-knopf { … }`. Vorzustände (`.sz07[data-phase]:not(…) …`) sind
  ohnehin stärker.
- **Phasen:** höchstens 6 je Szene (bewährt: 3–4). Am Handy dauert eine Szene etwa `350 ms + (phasen − 1) × takt` plus die
  letzte Bewegung – mehr als ca. 6 s wirkt zäh und die Karte ist dann oft schon wieder aus dem Bild gescrollt.
- Nur `transform` und `opacity` animieren (keine Breite/Höhe/Position/Farbe/clip-path animieren).
- Endzustand ohne Attribute vollständig und schön (das sehen Nutzer ohne JS, mit reduzierter Bewegung und im Teaser).
- Mockup bildlich halten: kein Text, der gelesen werden muss. Der lesbare Inhalt ist Titel + Text der Szene (config).
- Inhalte aus dem Drehbuch: „Malerbetrieb Muster“, „Musterstadt“, „Frau Weber“; Preise als Beispiel
  („ca. 1.200–1.500 €“). Szene 7: KI-Angebot sichtbar als **„Vorschlag, wird geprüft“** kennzeichnen.
- Kontraste im Mockup wie auf der Seite (Text `--bsp-text`, Nebentext `--bsp-text-leise`, Türkis-Schrift `--bsp-tinte`).

**Don't**
- Keine `style="…"`-Attribute, kein `define:vars` (erzeugt style-Attribute), kein `element.style` aus Skripten, keine
  eigenen `<script>` in Szenen (die Engine reicht). Die Seite hat derzeit keine CSP (geprüft: BaseLayout, astro.config,
  server/nginx.conf.example; Astro bettet CSS ohnehin inline ein) – trotzdem so bauen, dass eine strenge CSP ohne
  `style-src 'unsafe-inline'` für Attribute nichts kaputt macht.
- Keine `id`-Attribute im Mockup (Szenen erscheinen mehrfach: Bühne, Teaser, Rückblende), keine Links/Knöpfe/Eingabefelder
  (das Mockup ist `aria-hidden`, Knöpfe sind nur gezeichnet: `span.bm-knopf`). SVG-Verläufe mit `id` vermeiden.
- Keine echten Marken oder Logos (kein Suchmaschinen-Logo nachbauen, „Suche“ neutral; keine echten Mail-/Bank-/Kalender-
  Anbieter, keine echten Firmen- oder Personennamen außer den erfundenen).
- Keine Bilder von außen; Fotos „echter Arbeiten“ als gezeichnete Flächen/SVG (Farbflächen, angedeutete Wand/Rolle).
- Keine Änderungen außerhalb der eigenen `SzeneNN.astro` (siehe Tabelle oben).
- Nicht nach `main` mergen, nicht veröffentlichen.

## 7. Arbeitskopie anlegen und lokal testen

```sh
# eigene Arbeitskopie vom Grundgerüst (Beispiel für die Szenen 02–05; Name/Zweig je Agent anpassen)
git -C /home/can/projekte/waybuild_website worktree add -b beispiel/szenen-02-05 \
  /home/can/projekte/waybuild_website-beispiel/szenen-02-05 beispiel/geruest
cd /home/can/projekte/waybuild_website-beispiel/szenen-02-05

# Abhängigkeiten (einmal) + Build wie GitHub Actions (check + build + seo), npm nur im Docker-Container node:22
docker run --rm -v "$PWD":/app -w /app -u $(id -u):$(id -g) -e HOME=/tmp node:22 npm ci --no-audit --no-fund
sh /tmp/claude-1001/-home-can-projekte/7092dfe7-a8e6-4842-9a5e-41f060538bd0/scratchpad/beispiel/bau.sh "$PWD"

# gebaute Seite ausliefern (eigener Port je Agent: 8796, 8797, 8798 …)
S=/tmp/claude-1001/-home-can-projekte/7092dfe7-a8e6-4842-9a5e-41f060538bd0/scratchpad/beispiel
mkdir -p $S/serve-02-05 && ln -sfn "$PWD/dist" $S/serve-02-05/waybuild_website
(cd $S/serve-02-05 && nohup python3 -m http.server 8796 --bind 127.0.0.1 >/dev/null 2>&1 &)
```

- **Eine Szene ansehen:** `http://127.0.0.1:8796/waybuild_website/so-kann-es-laufen/?szene=7` springt zu Szene 7 (Rechner:
  Ende der Szene, Handy: Karte ins Bild). `?szene=7&phase=2` hält Szene 7 auf Phase 2 (`phase=0` = Ausgangszustand).
  `?szene=14` = Schluss.
- **Szenen-Test** (Bilder jeder Phase am Rechner, Handy-Karte nach dem Abspielen, reduziert, ohne JS, Regeln aus Abschnitt 6):
  `cd $S/tests && sh pw.sh szene.js http://127.0.0.1:8796/waybuild_website /s/beispiel/tests/aus/sz02-05 2,3,4,5`
- **Gesamttest** (Seite, Engine, Karten, reduziert, ohne JS, Querscrollen 320–1920, Teaser, WebKit):
  `sh pw.sh beispiel.js http://127.0.0.1:8796/waybuild_website /s/beispiel/tests/aus/ges-02-05` (zum Zwischenprüfen mit
  `schnell` am Ende nur 1440 + 390).
- **Kundenreise der Startseite** (gleicher Kern, darf nicht kaputtgehen):
  `sh pw.sh kundenreise-buehne.js http://127.0.0.1:8796/waybuild_website/ /s/beispiel/tests/aus/kr-02-05`
- `pw.sh` startet Playwright 1.48.2 im Docker-Image `mcr.microsoft.com/playwright:v1.48.2-jammy` (`--network host`).

## 8. Test-Erwartungen (Abnahme je Szene)

- `npm run check`, Build und `npm run seo` grün (`bau.sh`).
- `szene.js` für die eigenen Nummern: alles OK, insbesondere Wurzel `.szNN` mit 1–6 Phasen, kein Platzhalter mehr, keine
  style-Attribute/ids/Links im Mockup, kein „Google“, Gerät passt in die Bildfläche (Rechner und Handy), Text ragt nicht aus
  dem Bildschirm, Handy-Karte erreicht die letzte Phase, reduziert/ohne JS keine Phasen-Attribute.
- `beispiel.js` komplett grün (heute 276 Prüfungen) und `kundenreise-buehne.js` 261/261.
- Bilder ansehen: jede Phase am Rechner (1440) und die Handy-Karte (390) – Endzustand stimmig, Drehbuch erkennbar.
- Commit deutsch, Bezug „(Jamil Talk qh87y3sj #5678/#5680, 13.11.2026)“ + Zeile
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`; eigenen Zweig pushen, nicht `main`.
