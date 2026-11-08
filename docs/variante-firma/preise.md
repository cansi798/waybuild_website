# Pakete Basis · Plus · Komplett: Preise und Herkunft

## 0. Umgesetzt als richtige Website (08.11.2026, Jamil #5056 „ok go“)

Die Variante ist seit 08.11.2026 abends die richtige Website. Datenquelle: `src/config/pakete-abo.ts` (keine Imports, Preise nie fest in Texte).

| Paket | netto / Monat | brutto / Monat | netto / Jahr | brutto / Jahr (12 × Monat brutto) |
|---|---|---|---|---|
| Basis | 79,99 € | 95,19 € | 959,88 € | 1.142,28 € |
| Plus (Empfehlung) | 149,99 € | 178,49 € | 1.799,88 € | 2.141,88 € |
| Komplett | 299,99 € | 356,99 € | 3.599,88 € | 4.283,88 € |

Einrichtung 0 €, 24 Monate Mindestlaufzeit (kleiner Hinweis), danach monatlich kündbar.

Einmalig dazubuchen (Festpreis netto): Logo 590 € · E-Mail-Signatur nach DIN 5008 49 € · Geschäftspapiere nach DIN 5008 (Briefbogen, Angebot, Rechnung) 190 € · Visitenkarten (Gestaltung als Druckdatei) 89 €.

Umsetzung #5056 Punkt 1–7: Jahreskosten statt „über 24 Monate“; Preise auf einer Höhe (Etikett über der Karte, CSS subgrid);
Wertzeile „mindestens rund 309 €“ entfernt; Gründungs-Satz und Gründungspaket entfernt; Einzelpreise wie oben; /preise/ mit Paketen,
Vergleichstabelle, Jahreskosten, Einmalig dazubuchen, Leistungstausch, FAQ, B2B-Hinweis; Startseite Preisteil #pakete kompakt (Anker #baukasten bleibt);
Baukasten nicht mehr angezeigt (Komponente `archiv/baukasten-20261108/`, Daten BAUKASTEN weiter in startseite.ts für Abschnitt 4 ohne Preise);
Banner und /variante/ entfernt (Code `archiv/variante-firma-20261108/`), alte Adressen /variante/, /variante/pakete/, /variante/gruender/ leiten auf /preise/ weiter.
Sicherung des Stands davor: Branch `vor-pakete-live-20261108` (= 6d0d389).

Weggefallen gegenüber der Variante: monatliche Zusätze „Online-Terminbuchung 24,99 €“ und „Weitere Seite 2,99 €“ (nicht in #5056 genannt).
Offen (nur Vorschau, rot): Preis ab Monat 25, Logo-Rechte nach Vertragsende, Liste „Nicht im Preis enthalten“.

Alles ab hier ist die Herleitung der Variante (Stand 16:30) und nur noch Geschichte.

---

## Herleitung: Variante „an firma.de orientiert“ (Preisvorschlag)

Stand 08.11.2026, 16:30 · Auftrag Jamil (Talk WS-0007 qh87y3sj, #5016/#5017; Preise und Inhalte #5028–#5035; Komplett und „einmalig dazubuchen“ #5041/#5042) · **nur Vorschlag, die Preise legen Can und Jamil fest**

Vorschau: /variante/, /variante/pakete/, /variante/gruender/ (noindex, nicht in der Sitemap).
Die normale Startseite, /preise/, der Abo-Baukasten, PAKETE in site.ts und die AGB sind unverändert.

---

## 1. Die Regel (Stand 08.11.2026, 16:30)

Drei feste Monatspakete, **keine Einmalkosten**. Einmalige Arbeiten (Logo, Google-Profil einrichten, Suchmaschinen-Optimierung beim Erstellen, KI-Aufbereitung) stecken im festen Monatspreis.

**Die Preise sind von Jamil gesetzt** (Talk WS-0007 qh87y3sj, #5028–#5035, 08.11.2026 16:22–16:26, „bitte umsetzen“). Sie kommen **nicht mehr** aus der Rechnung „Monatsbausteine + Einmalpreis ÷ 24“ (die alte Rechnung steht unten in Abschnitt 4 zum Nachlesen). In src/config/variante.ts steht der Preis je Paket als feste Zahl (`preis`), brutto rechnet `brutto()` aus site.ts (× 1,19, kaufmännisch gerundet).

Weiterhin **Vorschlag zur Entscheidung durch Can und Jamil**.

---

## 2. Die Pakete (Vorschlag)

| Paket | Inhalt („… inklusive“) | **netto / Monat** | brutto | 24 Monate netto | 24 Monate brutto |
|---|---|---|---|---|---|
| **Basis** | Website · Suchmaschinen-Optimierung beim Erstellen · E-Mail-Postfächer mit Signatur · Aufbereitung für KI-Assistenten | **79,99 €** | 95,19 € | 1.919,76 € | 2.284,51 € |
| **Plus** (Empfehlung) | Alles aus Basis · Google-Profil einrichten · Google-Profil pflegen · Erweiterte Suchmaschinen-Optimierung · E-Mail-Organisation mit Unterordnern · Monatsbericht · Monatlicher KI-Check · Den Weg bis zur Anfrage verbessern | **149,99 €** | 178,49 € | 3.599,76 € | 4.283,71 € |
| **Komplett** | Alles aus Plus · Logo und Geschäftspapiere · E-Mail-Vorlagen im gleichen Stil · Online-Terminbuchung · Social-Media-Profile eingerichtet · Website in einer zweiten Sprache · Laufende Verbesserung (2 bis 3 im Monat + Strategiegespräch alle drei Monate) · Bevorzugte Bearbeitung | **299,99 €** (unverändert) | 356,99 € | 7.199,76 € | 8.567,71 € |
| **Gründung** | Website · E-Mail-Postfächer mit Signatur · KI-Aufbereitung · Logo und Geschäftspapiere · Google-Profil einrichten · Online-Terminbuchung | **153,99 €** (unverändert) | 183,25 € | 3.695,76 € | 4.397,95 € |

Änderungen 08.11.2026 16:30 (Jamil #5028–#5035):

- Basis: 87,99 → **79,99 €**; neu „Suchmaschinen-Optimierung beim Erstellen“ (klare Seitentitel und Beschreibungen, saubere Überschriften, schnelle Ladezeit, gut auf dem Handy).
- Plus: 151,99 → **149,99 €**; **entfernt** „5 Seiten für Ihre Orte und Leistungen“ (Ortsseiten); neu „Erweiterte Suchmaschinen-Optimierung“ (Suchbegriffe der Kunden, Seiten darauf ausgerichtet, Google-Profil mit der Website verknüpft), „E-Mail-Organisation mit Unterordnern“ (Ordner und Regeln, wie „Postfächer mit Ordnern/Regeln“ beim Wegweiser), „Monatlicher KI-Check“ (#5035, war bisher nur in Komplett), „Den Weg bis zur Anfrage verbessern“. Monatsbericht und Google-Profil bleiben.
- Komplett: Preis unverändert. Erbt die Plus-Änderungen (keine Ortsseiten mehr, dafür erweiterte Optimierung). KI-Check kommt jetzt über Plus.
- Gründung: unverändert.
- Keine Prozentzahlen, keine Ranking- oder Platz-1-Versprechen (UWG).

Änderungen 08.11.2026 ~16:45 (Jamil #5041/#5042 „ok – alles umsetzen“):

- Komplett (299,99 € bleibt) aufgewertet: neu Online-Terminbuchung (Bestätigung und Erinnerung automatisch), Social-Media-Profile eingerichtet (z. B. Instagram, Facebook, LinkedIn), Website in einer zweiten Sprache, Bevorzugte Bearbeitung (Änderungswünsche kommen zuerst dran, **keine** Stunden-Zusage), E-Mail-Vorlagen für Angebote und Antworten im gleichen Stil. Logo und Geschäftspapiere bleiben.
- Unterschied Verbesserung: Plus = jeden Monat prüfen, **1** Verbesserung am Weg bis zur Anfrage. Komplett = **2 bis 3** Verbesserungen im Monat, dazu alle drei Monate ein Strategiegespräch. In der Tabelle eine Zeile „Weg bis zur Anfrage verbessern“ mit beiden Umfängen.
- Satz unter Komplett: eigener Auftritt + mehr Kunden + wir kümmern uns aktiv.
- Neuer Kasten „Für Gründer und alle, die neu starten: einmalig dazubuchen“ (unter den Paketen auf /variante/pakete/ und auf /variante/gruender/): Logo 790 € einmalig (aus BAUKASTEN), E-Mail-Signatur nach DIN 5008, Geschäftspapiere nach DIN 5008 (Briefbogen, Angebot, Rechnung), Visitenkarten (Gestaltung, Druck nicht enthalten) jeweils „Festpreis auf Anfrage“. Hinweis „Einmaliger Festpreis, keine monatlichen Kosten“.
- Zusatz „Online-Terminbuchung“ (24,99 €/Monat) bleibt für Basis und Plus; Text: „Im Paket Komplett schon enthalten“.

Vergleichstabelle auf /variante/pakete/: Zeile „Suchmaschinen-Optimierung“ Basis „Grundoptimierung beim Erstellen“, Plus und Komplett „Erweiterte Optimierung“; „E-Mail-Organisation mit Ordnern“, „Monatlicher KI-Check“ und „Weg bis zur Anfrage verbessern“ je Plus ✓, Komplett ✓.

Auf Wunsch dazu (monatlich, ohne Einmalkosten): Online-Terminbuchung 24,99 €, weitere Seite für einen Ort oder eine Leistung 2,99 € (69 € ÷ 24, als Zusatz unverändert).
Auf Anfrage: Kundenverwaltung, Abläufe automatisieren, Social Media, Video, Software/Cloud/IT.

Zum Vergleich heute auf /preise/: Fundament 79,99 € · Wegweiser 149,99 € · Wahrzeichen 299,99 €. Basis, Plus und Komplett liegen damit auf denselben Preisen.

Namen bewusst schlicht (Jamil 04.11.: keine Marketing-Fantasienamen): Basis, Plus, Komplett, Gründung.

Nur echte Leistungen im Gründungspaket. Ausdrücklich NICHT: Steuer- oder Rechtsberatung, Gewerbeanmeldung, Notar, Handelsregister, Businessplan/Finanzierung (steht so auf /variante/gruender/).

### 2a. Wertzeile Komplett: „Einzeln gebucht wären das mindestens rund 309 € im Monat, im Paket 299,99 €“

Gerechnet NUR mit Leistungen, die im Baukasten (`BAUKASTEN`, src/config/startseite.ts) einen Preis haben, nach der Regel Monatsbaustein + Einmalpreis ÷ 24. Die Seite rechnet live (`einzelWert()` in src/config/variante.ts) und rundet ab.

| Leistung in Komplett | Baukasten | Anteil je Monat |
|---|---|---|
| Website | 69,99 €/Monat | 69,99 € |
| E-Mail-Postfächer mit Signatur | 9,99 €/Monat | 9,99 € |
| Aufbereitung für KI-Assistenten | 190 € einmalig ÷ 24 | 7,92 € |
| Google-Profil einrichten | 199 € einmalig ÷ 24 | 8,29 € |
| Google-Profil pflegen | 19,99 €/Monat | 19,99 € |
| Monatsbericht | 19,99 €/Monat | 19,99 € |
| Monatlicher KI-Check | 14,99 €/Monat | 14,99 € |
| Logo und Geschäftspapiere | 790 € einmalig ÷ 24 | 32,92 € |
| Online-Terminbuchung | 24,99 €/Monat | 24,99 € |
| Laufende Verbesserung (2 bis 3 im Monat, Gespräch alle drei Monate) | 99,99 €/Monat | 99,99 € |
| **Summe** | | **309,06 €** → „mindestens rund 309 €“ |

Nicht mitgerechnet, weil es dafür keinen Baustein-Preis gibt: Suchmaschinen-Optimierung (beide Stufen; der alte Baustein „Bei Google besser gefunden werden“ 390 € waren die Ortsseiten und ist nicht dasselbe), E-Mail-Organisation mit Unterordnern, „Weg bis zur Anfrage“ (in Komplett durch „Laufende Verbesserung“ ersetzt, nicht doppelt gezählt), E-Mail-Vorlagen, Social-Media-Profile (Baustein „Social Media“ ohne Preis), zweite Sprache, Bevorzugte Bearbeitung. Darum „mindestens“. Ehrlich aufgehen tut es knapp: Der Paketvorteil aus Baustein-Preisen sind rund 9 € im Monat, der eigentliche Mehrwert liegt in den Leistungen ohne Einzelpreis.

Für Basis und Plus gibt es keine Wertzeile (nicht beauftragt): Basis aus Baukasten-Preisen 87,90 € (über 79,99 €), Plus 151,16 € (ohne Ortsseiten, also nur gut 1 € über 149,99 €; als Werbeaussage zu knapp).

---

## 3. Offene Entscheidungen für Can und Jamil

1. **Preise** insgesamt (Vorschlag oben, von Jamil gesetzt).
2. **Gründung (153,99 €) ist jetzt teurer als Plus (149,99 €)** und enthält keine Suchmaschinen-Optimierung beim Erstellen (Basis schon). Bleibt das so, oder bekommt Gründung die Grundoptimierung bzw. einen neuen Preis?
3. **Was passiert ab Monat 25?** Die frühere Idee „Preis sinkt um die Einmalanteile“ passt nicht mehr zu gesetzten Preisen. Auf der Seite steht jetzt als rot markierter Platzhalter: offen, Can und Jamil entscheiden.
4. **Logo bei Monatszahlung:** Wem gehören die Nutzungsrechte nach Vertragsende? Muss anwaltlich geklärt werden (Mietmodell, AGB). Platzhalter.
5. **Kündigung vor Ablauf:** 24 Monate Mindestlaufzeit; AGB-Prüfung nötig.
6. **„Nicht im Preis enthalten“** (Fotograf, Bildlizenzen, Druck, fremde Lizenzen): Liste bestätigen (Platzhalter).
7. **Logo-Preis im Kasten „einmalig dazubuchen“:** Im Baukasten kosten „Logo und Geschäftspapiere“ zusammen 790 €. Im Kasten steht jetzt Logo allein 790 € und Geschäftspapiere zusätzlich „Festpreis auf Anfrage“. Soll das Logo allein günstiger werden, oder Logo + Geschäftspapiere zusammen 790 € bleiben?
8. **Festpreise auf Anfrage** für Signatur, Geschäftspapiere, Visitenkarten festlegen.
9. **Komplett-Leistungen ohne Preisbasis** (zweite Sprache: Umfang/Übersetzung durch wen? Social Media: welche und wie viele Profile? Bevorzugte Bearbeitung: wie organisiert?) vor einer Veröffentlichung genauer fassen.
10. **Zusatz „Weitere Seite für einen Ort oder eine Leistung“ (2,99 €)** bleibt buchbar, obwohl Ortsseiten nicht mehr im Plus-Paket sind. Behalten oder streichen?
11. Die Variante widerspricht dem aktuellen Baukasten (Einmalpreise). Erst nach eurer Entscheidung eine Seite umstellen.

---

## 4. Frühere Rechnung (bis 08.11.2026 16:30, nur zum Nachlesen)

Bis zu Jamils Festlegung rechnete die Seite die Preise live aus dem Baukasten (`BAUKASTEN` in src/config/startseite.ts):

    Paketpreis = Summe der Monatsbausteine + Summe (Einmalpreis ÷ 24) → auf den nächsten Betrag mit ,99

| Baustein | Preis (Baukasten) | Anteil je Monat |
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

Ergebnis damals: Basis 87,99 € · Plus 151,99 € · Komplett 299,99 € · Gründung 153,99 € (ab Monat 25 als Idee: 79,99 / 119,99 / 234,99 / 104,99 €). Komplett und Gründung behalten diese Preise.

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
2. **Gleichwertiger Leistungstausch** möglich: statt Logo z. B. die Terminbuchung.
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
