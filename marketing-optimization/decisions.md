# Entscheidungen und offene Fragen (Loop 22.11.2026)

## Freigegeben / Rahmen
- Can 21.11. 23:53: Laufzeit bis 22.11. 02:00. Can 23:55: „Bitte immer Empfehlung direkt umsetzen und GitHub pushen.“
- Website-Fragen: Empfehlung selbst entscheiden. NICHT für Jamils Texte, Struktur, Preise, Rechtliches → nur sammeln (unten).

## Selbst entschieden
- D1: Haupt-Knopf „Kostenlose Erstberatung“ öffnet auf /kontakt/ keine Paket-/Extras-Wahl mehr; Anliegen wird mitgesendet (MKT-001).
- D2: Paket-Knöpfe der Startseite geben das Paket als verstecktes Feld ans Formular weiter, sichtbar nur im Betreff der Anfrage (MKT-002). Keine sichtbare Änderung an Jamils Karten.

## Offene Fragen an Jamil / Can (nummeriert, mit Empfehlung)
1. **Bewertung „Am beliebtesten“ (Preis-Karte Profi-Website):** Es gibt noch keine Zahlen, die das belegen; nach UWG § 5 kann das als irreführend gelten. *Empfehlung:* „Unsere Empfehlung“ statt „Am beliebtesten“ (die Zeile darüber sagt schon „Beliebt / Empfehlung“). Jamils Text → nur gesammelt.
2. **Zeitangabe Erstgespräch:** Kontaktseite und Danke-Seite sagen „30 Min. Erstberatung“, die Startseite „Unternehmens-DNA aufnehmen (15–20 Min.)“. *Empfehlung:* überall „15–20 Min.“ (Jamils neuere Angabe #6402). Jamils Text → nur gesammelt.
3. **„Kostenlose Vorschau in Rekordzeit“ (Abschnitt 4, Karte 02):** „Rekordzeit“ ist ein Superlativ ohne Vergleichsmaßstab. *Empfehlung:* „Kostenlose Vorschau in wenigen Tagen“ oder „… schon am nächsten Werktag“. Jamils Text → nur gesammelt.
4. **Absolute Versprechen:** „Nichts geht verloren“ (Umstieg, Karte 3), „Kein Risiko“ (Abschnitt 4), „zu 100 % kostenlos“. *Empfehlung:* „Ihre Daten ziehen vollständig mit um“ statt „Nichts geht verloren“; „Kein Risiko“ bleibt, weil Vorschau kostenlos und unverbindlich ist. Jamils Text → nur gesammelt.
5. **Formular-Versand vor Go-live (Can):** In der Vorschau ist kein Versand-Schlüssel gesetzt, alle Formulare öffnen nur das E-Mail-Programm. Am Handy ist das oft nicht eingerichtet, die Anfrage geht dann verloren. *Empfehlung:* vor dem Livegang den CRM-Anschluss oder einen eigenen Formular-Endpunkt auf dem Server (kein neuer Drittanbieter) einrichten. Entscheidung Can.
- D3: llms.txt (Text für KI-Suchen) beschreibt jetzt die aktuelle Startseite mit Jamils Texten wörtlich; Kundenreise, „Umsetzung“, „Ganz entspannt“, alter Vergleich und Vorgehen (nicht mehr sichtbar) entfernt (MKT-003).
- D4: Danke-Seite zeigt je Weg passende Schritte 3–4 (Gespräch 15–20 Min. + Vorschau-Zeiten bzw. Website-Vorschau am nächsten Werktag + „Wenn es passt“). Angaben nur aus Jamils Texten (MKT-004). Standard-Danke unverändert.
6. **Kontaktseite: Formular weiter nach oben?** Am PC beginnt das Formular erst nach dem großen Seitenkopf (ca. 680 px), am Handy noch tiefer. *Empfehlung:* auf /kontakt/ den Seitenkopf niedriger (z. B. halbe Höhe), damit das Formular schon im ersten Bild anfängt. Gestaltung der Unterseiten ist Jamils Bereich → nur gesammelt.
- D5: axe-Funde nach WCAG 2.2/Best Practice behoben (MKT-009). Ausnahme bewusst gelassen: die 13 schmalen Szenen-Striche im Beispiel-Film am Handy (target-size) – dieselbe Funktion haben die großen Knöpfe „zurück/weiter“ (WCAG 2.5.8, Ausnahme „gleichwertige Bedienung“).
- D6: Alle Knöpfe „Kostenlose Erstberatung“ (Kopfzeile, Leiste, Handy-Menü auf allen Seiten, Ratgeber, Blog, Warum webgold) führen zum selben schlanken Formular mit Anliegen (MKT-011). Der Preis-Block in Ratgebern bleibt beim Paket-Formular.
- D7: Danke-Seite nach „Paket anfragen“ zeigt „Vertrag per E-Mail – mit Auftragsbestätigung, erst damit verbindlich“ (Inhalt wie BUCHEN.kaufHinweis); 404 bekommt den Knopf „Kostenlose Erstberatung“ (MKT-013).
- D8: Leiste am Handy blendet sich auf der Startseite aus, solange der Formular-Abschnitt unten im Bild ist (MKT-014). Hinweis aus dem Review umgesetzt: Paket aus Preis-Karte steht nur im zuletzt gewählten Formular.
7. **„Mitarbeitende“ in Jamils Startseiten-Texten** (Problem-Karte 4 „Neue Mitarbeitende brauchen Wochen …“, Umstieg-Karte 2 „Meine Mitarbeitenden haben keine Zeit …“): Laut Hausregel wird nicht gegendert. *Empfehlung:* „Neue Mitarbeiter“ / „Meine Mitarbeiter“. Jamils Text → nur gesammelt. (In Kontaktformular und zwei Ratgebern selbst geändert, D9.)
- D9: Kein Gendern: „Mitarbeitende“ → „Mitarbeiter“ im Platzhalter des Kontaktformulars und in zwei Ratgebern. Feld „Telefonnummer oder E-Mail“ im Gespräch-Formular ohne E-Mail-Tastatur, damit am Handy Ziffern leicht gehen.
8. **/preise/: Hauptüberschrift doppelt.** H1 („Drei Pakete. Feste Monatspreise.“) und die erste H2 im Paket-Abschnitt sind wortgleich. Für Google und Screenreader ist das eine Wiederholung. *Empfehlung:* die H2 auf /preise/ z. B. „Die Pakete im Überblick“ nennen. Jamils Text → nur gesammelt.
