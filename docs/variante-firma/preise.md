# Variante „an firma.de orientiert“: Preisvorschlag

Stand 08.11.2026 · Auftrag Jamil (Talk WS-0007 qh87y3sj, #5016/#5017) · **nur Vorschlag, die Preise legen Can und Jamil fest**

Vorschau: /variante/, /variante/pakete/, /variante/gruender/ (noindex, nicht in der Sitemap).
Die normale Startseite, /preise/, der Abo-Baukasten, PAKETE in site.ts und die AGB sind unverändert.

---

## 1. Die Regel

Drei feste Monatspakete, **keine Einmalkosten**.

Einmalige Arbeiten (Logo, Google-Profil einrichten, Ortsseiten, KI-Aufbereitung) werden über die Mindestlaufzeit von 24 Monaten in den Monatspreis eingerechnet:

    Paketpreis = Summe der Monatsbausteine + Summe (Einmalpreis ÷ 24)
                 → auf den nächsten Betrag mit ,99 gerundet

Alle Einzelpreise kommen aus dem Baukasten der Startseite (`BAUKASTEN` in src/config/startseite.ts, Stand Jamil #4924/#4925). Die Seite rechnet live aus dieser Quelle (src/config/variante.ts), es gibt also nur eine Zahlenquelle.

| Baustein | Preis heute (Baukasten) | Anteil je Monat |
|---|---|---|
| Ihre Website | 69,99 €/Monat | 69,99 € |
| E-Mail-Postfächer mit Signatur | 9,99 €/Monat | 9,99 € |
| In KI-Antworten auftauchen | 190 € einmalig | 7,92 € |
| Google-Profil einrichten | 199 € einmalig | 8,29 € |
| Google-Profil pflegen | 19,99 €/Monat | 19,99 € |
| Bei Google besser gefunden (5 Seiten) | 390 € einmalig | 16,25 € |
| Monatsbericht | 19,99 €/Monat | 19,99 € |
| Logo und Geschäftspapiere | 790 € einmalig | 32,92 € |
| Laufende Verbesserung | 99,99 €/Monat | 99,99 € |
| Monatlicher KI-Check | 14,99 €/Monat | 14,99 € |
| Online-Terminbuchung | 24,99 €/Monat | 24,99 € |
| Jede weitere Seite | 69 € einmalig | 2,88 € → 2,99 € |

Alle Preise netto zzgl. 19 % MwSt.

---

## 2. Die drei Pakete (Vorschlag)

| Paket | Inhalt („… inklusive“) | exakt | **Vorschlag netto** | brutto | 24 Monate netto |
|---|---|---|---|---|---|
| **Basis** | Website, E-Mail-Postfächer mit Signatur, KI-Aufbereitung | 87,90 € | **87,99 €** | 104,71 € | 2.111,76 € |
| **Plus** (Empfehlung) | Basis + Google-Profil einrichten + Google-Profil pflegen + 5 Orts-/Leistungsseiten + Monatsbericht | 152,42 € | **151,99 €** | 180,87 € | 3.647,76 € |
| **Komplett** | Plus + Logo und Geschäftspapiere + Laufende Verbesserung + monatlicher KI-Check | 300,32 € | **299,99 €** | 356,99 € | 7.199,76 € |

Auf Wunsch dazu (monatlich, ohne Einmalkosten): Online-Terminbuchung 24,99 €, jede weitere Orts-/Leistungsseite 2,99 €.
Auf Anfrage: Kundenverwaltung, Abläufe automatisieren, Social Media, Video, Software/Cloud/IT.

Zum Vergleich heute auf /preise/: Fundament 79,99 € · Wegweiser 149,99 € · Wahrzeichen 299,99 €.
Komplett landet genau beim heutigen Wahrzeichen-Preis, enthält aber zusätzlich Google-Pflege und KI-Check (Empfehlung aus dem Preisvergleich f/22843).

Namen bewusst schlicht (Jamil 04.11.: keine Marketing-Fantasienamen): Basis, Plus, Komplett, Gründung.

---

## 3. Gründungspaket (Vorschlag)

| Paket | Inhalt | exakt | **Vorschlag netto** | brutto | 24 Monate netto |
|---|---|---|---|---|---|
| **Gründung** | Website, E-Mail-Postfächer mit Signatur, KI-Aufbereitung, Logo und Geschäftspapiere, Google-Profil einrichten, Online-Terminbuchung, kostenloses Erstgespräch | 154,10 € | **153,99 €** | 183,25 € | 3.695,76 € |

Nur unsere echten Leistungen. Ausdrücklich NICHT: Steuer- oder Rechtsberatung, Gewerbeanmeldung, Notar, Handelsregister, Businessplan/Finanzierung (steht so auf /variante/gruender/).

---

## 4. Offene Entscheidungen für Can und Jamil

1. **Preise** insgesamt (Vorschlag oben). Alternative: glatte Preise (89,99 / 149,99 / 299,99 / 149,99 €) mit kleinem Paketvorteil.
2. **Was passiert ab Monat 25?** Die Einmalanteile sind dann bezahlt. Vorschlag: Preis sinkt auf die reinen Monatsbausteine (Basis 79,99 · Plus 119,99 · Komplett 234,99 · Gründung 104,99 €). Auf der Seite als rot markierter Platzhalter.
3. **Logo bei Monatszahlung:** Wem gehören die Nutzungsrechte nach Vertragsende? Muss anwaltlich geklärt werden (Mietmodell, AGB). Auf der Seite als Platzhalter.
4. **Kündigung vor Ablauf:** Bei vorzeitigem Ende sind die Einmalanteile noch nicht bezahlt. Die 24 Monate Mindestlaufzeit decken das; AGB-Prüfung nötig.
5. **„Nicht im Preis enthalten“** (Fotograf, Bildlizenzen, Druck, fremde Lizenzen): Liste bestätigen (Platzhalter).
6. Die Variante widerspricht dem aktuellen Baukasten (Einmalpreise) und /preise/. Erst nach eurer Entscheidung eine Seite umstellen.

---

## 5. Frage von Jamil: „Ich brauche kein Logo, warum soll ich monatlich mehr zahlen? Verhandeln?“

### Was ich bei anderen Anbietern gefunden habe (abgerufen 08.11.2026)

- Website-Abo-Anbieter arbeiten mit **festen Paketinhalten** und festen Preisen, meist Einrichtung + Monatspreis. Mehr Leistung gibt es über **Zusatzoptionen** oder den **Wechsel ins größere Paket**, große Vorhaben über ein **individuelles Angebot**. [1][2][3][4]
- Xictron: drei feste Pakete, „Ein Wechsel nach oben ist jederzeit zum Monatsersten möglich“, „Preisänderungen während der Mindestlaufzeit gibt es nicht“, Darüberhinausgehendes als Festpreisangebot nach dem Erstgespräch. [1][5]
- Webwerk: drei Pakete, Funktionen „modular“ dazubuchbar, ohne ins nächste Paket zu wechseln; größere Projekte auf Anfrage. [2]
- adfera: Pakete bauen aufeinander auf, Zusatzoptionen mit Preis (z. B. weitere Sprache). [3]
- Studiomeyer: zwei feste Pakete, individuelle Projekte mit verbindlichem Festpreis nach dem Briefing; „Was dazukommt, bekommst du vorher als eigenes Angebot.“ [4]
- **Rabatte oder Verhandlung** nennt keiner dieser Anbieter. Einen ausdrücklichen **Leistungstausch** (Logo raus, etwas anderes rein) habe ich bei keinem gefunden; das wäre also eine eigene, kundenfreundliche Regel von uns (auf der Website trotzdem nicht „nur bei uns“ schreiben, UWG).
- Hintergrund: Feste Pakete sind „Preisbündelung“. Bei der reinen Bündelung gibt es nur das Paket, bei der gemischten Bündelung Paket oder Einzelkauf. Bündel lohnen sich, weil Kunden einzelne Teile unterschiedlich viel wert sind. [6][7]

### Empfehlung (so auf /variante/pakete/ umgesetzt)

1. **Fester Paketinhalt**, fester Preis.
2. **Gleichwertiger Leistungstausch** möglich: statt Logo z. B. weitere Ortsseiten oder die Terminbuchung.
3. **Alternativ das kleinere Paket** (Plus enthält kein Logo).
4. **Individuelles Angebot** ab größerem Umfang (Kundenverwaltung, Abläufe, Software).
5. **Keine Verhandlungsrabatte** bei den Paketen: Jeder zahlt für dieselbe Leistung denselben Preis. Das ist fair, planbar und vermeidet, dass gutes Verhandeln belohnt wird statt Treue.

### Quellen

- [1] Xictron, Website-Abo: https://www.xictron.com/de/website-abo/
- [2] Webwerk Agentur, Pricing and Plans: https://www.webwerk-agentur.de/en/p/pricing-and-plans
- [3] adfera, Website mieten: https://adfera.de/leistungen/website-mieten/
- [4] Studiomeyer, Webdesign-Preise: https://studiomeyer.io/de/webdesign/preise
- [5] Xictron, FAQ Kosten: https://www.xictron.com/de/faq/kategorie/kosten/
- [6] Studyflix, Preisbündelung: https://studyflix.de/wirtschaft/preisbundelung-1186
- [7] Simon-Kucher, Warum Bundling auch in einer digitalen Welt nicht out ist: https://www.simon-kucher.com/de/insights/warum-bundling-auch-einer-digitalen-welt-nicht-out-ist
- Intern: Preisvergleich Website-Abo und Bausteine, NC f/22843; firma.de-Vergleich, NC f/23882.

Die Anbieterseiten sind Eigenwerbung; Aussagen nur so weit belegt, wie sie dort stehen.

---

## 6. Variante entfernen

Ordner `src/pages/variante`, `src/components/variante`, Datei `src/config/variante.ts` und diesen Ordner `docs/variante-firma` löschen, dazu die Zeile `&& !/\/variante\//.test(page)` im Sitemap-Filter in `astro.config.mjs`.
