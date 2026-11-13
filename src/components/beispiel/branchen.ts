// Branchen für den personalisierten Film „So kann es laufen“ (Jamil, Talk qh87y3sj #5683/#5709–#5715, 13.11.2026:
// „noch individueller“ – der Besucher wählt seine Branche und tippt optional seinen Firmennamen, der ganze Film läuft dann
// mit SEINEM Namen, seinen Leistungen, Preis-Einheiten, Formularfeldern, Angebotsposten …).
//
// So wird es benutzt
// - Die Szenen (szenen/SzeneNN.astro) rendern die Standardbranche (Maler, Drehbuch wörtlich) und markieren jeden
//   branchen-abhängigen Text mit data-p="<schlüssel>" (Schlüssel = Feld aus werte()).
// - scripts/beispiel.ts ruft im Browser werte(branche, firma) auf und setzt NUR textContent (nie innerHTML) – die
//   Eingabe des Besuchers wird also immer als Text gezeigt. Nichts wird gesendet; gemerkt nur in sessionStorage.
// - Neue Branche: einen Eintrag in BRANCHEN ergänzen (alle Felder wie beim Maler). Beträge netto in Euro, die Summen
//   (inkl. 19 % MwSt.) und die Zwischenwerte des Preisrechners rechnet werte() selbst aus.
// Rechtliches (Drehbuch): alles erfunden/beispielhaft, keine echten Firmen, Preise nur als Beispiel.

export interface Posten { name: string; menge: string; netto: number }
export interface Branche {
  id: string;
  /** Name auf dem Auswahl-Chip */
  label: string;
  /** Firmenname im Beispiel, wenn der Besucher keinen eintippt */
  firma: string;
  /** Firma am Satzanfang (z. B. „Der Malerbetrieb Muster“); fehlt es, wird der Name genommen */
  firmaSatz?: string;
  /** Art des Betriebs im Suchtreffer */
  art: string;
  /** Suchbegriff (Leistung), die Suche lautet „<suchwort> in Musterstadt“ */
  suchwort: string;
  /** „Frau Weber sucht …“ */
  sucht: string;
  /** wer das Angebot prüft (Satzanfang) und „Zur Prüfung an …“ */
  chef: string;
  chefAn: string;
  /** Website: Überschrift (zwei Zeilen), Bild-Unterschrift, vier Arbeiten, drei Preise */
  held: [string, string];
  bildchip: string;
  arbeiten: [string, string, string, string];
  preise: [{ was: string; preis: string }, { was: string; preis: string }, { was: string; preis: string }];
  /** Preisrechner: drei Fragen; die erste Option bzw. die zweite Umfang-Option ist die gewählte */
  rechner: {
    frage1: string; optionen: [string, string, string, string, string];
    frage2: string; einheit: string; min: number; max: number; wert: number;
    frage3: string; umfang: [string, string];
    von: number; bis: number;
  };
  /** Termin (Szene 4/5/6) */
  termin: { art: string; imSatz: string; ort: string; dauer: string; info: string };
  /** Kurzname des Vorhabens („Wohnzimmer“) */
  projekt: string;
  /** Aufnahme beim Termin (Szene 6/7): Abschnitt 1 mit drei Zeilen, Abschnitt 2 mit Auswahl */
  aufnahme: {
    titel: string;
    zeilen: [{ name: string; wert: string; kurz: string; kurzWert: string }, { name: string; wert: string; kurz: string; kurzWert: string }, { name: string; wert: string; kurz: string; kurzWert: string }];
    wahlTitel: string; wahl: string; wahlKurz: string;
  };
  /** Angebot: drei feste Posten + ein Posten, den der Chef in Szene 8 anpasst */
  posten: [Posten, Posten, Posten];
  anpassung: { name: string; alt: { menge: string; netto: number }; neu: { menge: string; netto: number } };
  /** Mail/Portal */
  leistung: string;
  auftrag: string;
  detail: string;
  angebotTitel: string;
  /** Szene 11: Fortschritt */
  arbeit: { tage: string; schritte: [{ zeit: string; text: string }, { zeit: string; text: string }, { zeit: string; text: string }] };
  abnahme: string;
  fertig: string;
  bewertung: string;
}

const MALER: Branche = {
  id: 'maler', label: 'Maler', firma: 'Malerbetrieb Muster', firmaSatz: 'Der Malerbetrieb Muster', art: 'Malerbetrieb', suchwort: 'Maler',
  sucht: 'einen Maler', chef: 'Der Meister', chefAn: 'an den Meister',
  held: ['Schöne Räume.', 'Saubere Arbeit.'], bildchip: 'Wohnzimmer · Musterstadt',
  arbeiten: ['Treppenhaus', 'Fassade', 'Kinderzimmer', 'Altbau'],
  preise: [{ was: 'Wände streichen', preis: 'ab 11 €/m²' }, { was: 'Decke streichen', preis: 'ab 10 €/m²' }, { was: 'Tapezieren', preis: 'ab 18 €/m²' }],
  rechner: { frage1: 'Welcher Raum?', optionen: ['Wohnzimmer', 'Schlafzimmer', 'Küche', 'Flur', 'Bad'], frage2: 'Wie groß?', einheit: 'm²', min: 5, max: 60, wert: 25,
    frage3: 'Was wird gestrichen?', umfang: ['Nur Wände', 'Wände und Decke'], von: 1200, bis: 1500 },
  termin: { art: 'Besichtigung', imSatz: 'der Besichtigungstermin', ort: 'Bei Ihnen zu Hause, Musterstadt', dauer: 'ca. 30 Minuten · kostenlos', info: 'Besichtigung bei Ihnen zu Hause' },
  projekt: 'Wohnzimmer',
  aufnahme: { titel: 'Flächen', zeilen: [
    { name: 'Wände streichen', wert: '62 m²', kurz: 'Wände', kurzWert: '62 m²' },
    { name: 'Decke streichen', wert: '25 m²', kurz: 'Decke', kurzWert: '25 m²' },
    { name: 'Risse spachteln', wert: '2 Stellen', kurz: 'Risse', kurzWert: '2' }],
    wahlTitel: 'Farbe', wahl: 'Wände: Salbei · Decke: Weiß', wahlKurz: 'Salbei' },
  posten: [{ name: 'Abdecken und Abkleben', menge: 'pauschal', netto: 140 }, { name: 'Decke streichen, Weiß', menge: '25 m²', netto: 225 }, { name: 'Wände streichen, Salbei', menge: '62 m²', netto: 620 }],
  anpassung: { name: 'Risse spachteln', alt: { menge: '2 Std.', netto: 130 }, neu: { menge: '3 Std.', netto: 195 } },
  leistung: 'Wände und Decke streichen', auftrag: 'Wohnzimmer streichen', detail: 'Wände in Salbei · Decke in Weiß', angebotTitel: 'Malerarbeiten Wohnzimmer',
  arbeit: { tage: 'Tag 1 von 2', schritte: [{ zeit: '8:00', text: 'Team ist da, alles abgedeckt' }, { zeit: '11:30', text: 'Risse gespachtelt' }, { zeit: '17:30', text: 'Decke fertig, Wände begonnen' }] },
  abnahme: 'Abnahme', fertig: 'Ihr Wohnzimmer ist fertig', bewertung: '„Sauber, schnell und super freundlich. Gerne wieder!“',
};

export const BRANCHEN: Branche[] = [
  MALER,
  {
    id: 'elektro', label: 'Elektriker', firma: 'Elektro Muster', art: 'Elektrobetrieb', suchwort: 'Elektriker', sucht: 'einen Elektriker', chef: 'Der Meister', chefAn: 'an den Meister',
    held: ['Sicherer Strom.', 'Saubere Arbeit.'], bildchip: 'Küche · Musterstadt', arbeiten: ['Altbau', 'Wallbox', 'Smart Home', 'Zählerschrank'],
    preise: [{ was: 'Steckdose setzen', preis: 'ab 59 €/Stück' }, { was: 'Leuchte anschließen', preis: 'ab 49 €/Stück' }, { was: 'E-Check Wohnung', preis: 'ab 149 €' }],
    rechner: { frage1: 'Welcher Raum?', optionen: ['Küche', 'Wohnzimmer', 'Bad', 'Flur', 'Keller'], frage2: 'Wie viele Steckdosen?', einheit: 'Stück', min: 1, max: 20, wert: 8,
      frage3: 'Was kommt dazu?', umfang: ['Nur Steckdosen', 'Mit Leuchten'], von: 1100, bis: 1400 },
    termin: { art: 'Vor-Ort-Termin', imSatz: 'der Vor-Ort-Termin', ort: 'Bei Ihnen zu Hause, Musterstadt', dauer: 'ca. 30 Minuten · kostenlos', info: 'Vor-Ort-Termin bei Ihnen zu Hause' },
    projekt: 'Küche',
    aufnahme: { titel: 'Elektrik', zeilen: [
      { name: 'Steckdosen neu', wert: '8 Stück', kurz: 'Steckdosen', kurzWert: '8' },
      { name: 'Deckenleuchten', wert: '3 Stück', kurz: 'Leuchten', kurzWert: '3' },
      { name: 'Leitung verlegen', wert: '14 m', kurz: 'Leitung', kurzWert: '14 m' }],
      wahlTitel: 'Schalter', wahl: 'Schalter: Weiß matt · Rahmen: Anthrazit', wahlKurz: 'Weiß matt' },
    posten: [{ name: 'Steckdosen setzen', menge: '8 Stück', netto: 440 }, { name: 'Leuchten anschließen', menge: '3 Stück', netto: 165 }, { name: 'Leitung verlegen', menge: '14 m', netto: 280 }],
    anpassung: { name: 'Schlitze schließen', alt: { menge: '2 Std.', netto: 130 }, neu: { menge: '3 Std.', netto: 195 } },
    leistung: 'Steckdosen und Leuchten', auftrag: 'Küche neu verkabeln', detail: '8 Steckdosen · 3 Leuchten', angebotTitel: 'Elektroarbeiten Küche',
    arbeit: { tage: 'Tag 1 von 2', schritte: [{ zeit: '8:00', text: 'Strom aus, alles abgedeckt' }, { zeit: '11:30', text: 'Leitungen verlegt' }, { zeit: '17:30', text: 'Steckdosen gesetzt' }] },
    abnahme: 'Abnahme', fertig: 'Ihre Küche ist fertig', bewertung: '„Pünktlich, sauber und alles erklärt. Gerne wieder!“',
  },
  {
    id: 'shk', label: 'SHK / Sanitär', firma: 'Sanitär Muster', art: 'Sanitär und Heizung', suchwort: 'Sanitär', sucht: 'einen Sanitärbetrieb', chef: 'Der Meister', chefAn: 'an den Meister',
    held: ['Neues Bad.', 'Ohne Stress.'], bildchip: 'Bad · Musterstadt', arbeiten: ['Badsanierung', 'Heizung', 'Dusche', 'Gäste-WC'],
    preise: [{ was: 'Armatur tauschen', preis: 'ab 89 €' }, { was: 'WC montieren', preis: 'ab 290 €' }, { was: 'Heizung warten', preis: 'ab 149 €' }],
    rechner: { frage1: 'Was planen Sie?', optionen: ['Bad', 'Gäste-WC', 'Dusche', 'Heizung', 'Küche'], frage2: 'Wie groß?', einheit: 'm²', min: 2, max: 20, wert: 8,
      frage3: 'Wie viel wird neu?', umfang: ['Teilweise', 'Komplett neu'], von: 8500, bis: 10500 },
    termin: { art: 'Vor-Ort-Termin', imSatz: 'der Vor-Ort-Termin', ort: 'Bei Ihnen zu Hause, Musterstadt', dauer: 'ca. 45 Minuten · kostenlos', info: 'Vor-Ort-Termin bei Ihnen zu Hause' },
    projekt: 'Bad',
    aufnahme: { titel: 'Maße', zeilen: [
      { name: 'Bad', wert: '8 m²', kurz: 'Bad', kurzWert: '8 m²' },
      { name: 'Fliesen', wert: '22 m²', kurz: 'Fliesen', kurzWert: '22 m²' },
      { name: 'Anschlüsse', wert: '3 Stück', kurz: 'Anschl.', kurzWert: '3' }],
      wahlTitel: 'Fliesen', wahl: 'Wand: Sand · Boden: Anthrazit', wahlKurz: 'Sand' },
    posten: [{ name: 'Rückbau und Entsorgung', menge: 'pauschal', netto: 1200 }, { name: 'Fliesen Wand und Boden', menge: '22 m²', netto: 2860 }, { name: 'Dusche bodengleich', menge: '1 Stück', netto: 2400 }],
    anpassung: { name: 'Waschtisch montieren', alt: { menge: 'ohne Schrank', netto: 900 }, neu: { menge: 'mit Schrank', netto: 1350 } },
    leistung: 'Bad komplett neu', auftrag: 'Bad sanieren', detail: 'Dusche bodengleich · Fliesen in Sand', angebotTitel: 'Badsanierung',
    arbeit: { tage: 'Tag 1 von 8', schritte: [{ zeit: '8:00', text: 'Team ist da, alles abgedeckt' }, { zeit: '11:30', text: 'Alte Fliesen entfernt' }, { zeit: '17:30', text: 'Leitungen verlegt' }] },
    abnahme: 'Abnahme', fertig: 'Ihr neues Bad ist fertig', bewertung: '„Sauber, schnell und super freundlich. Gerne wieder!“',
  },
  {
    id: 'dach', label: 'Dachdecker', firma: 'Dachdeckerei Muster', firmaSatz: 'Die Dachdeckerei Muster', art: 'Dachdeckerei', suchwort: 'Dachdecker', sucht: 'einen Dachdecker', chef: 'Der Meister', chefAn: 'an den Meister',
    held: ['Dicht und sicher.', 'Saubere Arbeit.'], bildchip: 'Einfamilienhaus · Musterstadt', arbeiten: ['Steildach', 'Flachdach', 'Dachfenster', 'Dachrinne'],
    preise: [{ was: 'Dach neu eindecken', preis: 'ab 120 €/m²' }, { was: 'Dachrinne erneuern', preis: 'ab 45 €/m' }, { was: 'Dachfenster einbauen', preis: 'ab 890 €' }],
    rechner: { frage1: 'Welches Dach?', optionen: ['Satteldach', 'Walmdach', 'Flachdach', 'Pultdach', 'Carport'], frage2: 'Wie groß?', einheit: 'm²', min: 20, max: 200, wert: 80,
      frage3: 'Was wird gemacht?', umfang: ['Reparieren', 'Neu eindecken'], von: 13000, bis: 16000 },
    termin: { art: 'Dach-Check', imSatz: 'der Dach-Check', ort: 'Bei Ihnen vor Ort, Musterstadt', dauer: 'ca. 45 Minuten · kostenlos', info: 'Dach-Check bei Ihnen vor Ort' },
    projekt: 'Satteldach',
    aufnahme: { titel: 'Dach', zeilen: [
      { name: 'Dachfläche', wert: '80 m²', kurz: 'Fläche', kurzWert: '80 m²' },
      { name: 'Dachrinne', wert: '16 m', kurz: 'Rinne', kurzWert: '16 m' },
      { name: 'Dachfenster', wert: '1 Stück', kurz: 'Fenster', kurzWert: '1' }],
      wahlTitel: 'Ziegel', wahl: 'Ziegel: Anthrazit · Rinne: Zink', wahlKurz: 'Anthrazit' },
    posten: [{ name: 'Gerüst stellen', menge: 'pauschal', netto: 1800 }, { name: 'Alte Ziegel abnehmen', menge: '80 m²', netto: 2400 }, { name: 'Neu eindecken', menge: '80 m²', netto: 7600 }],
    anpassung: { name: 'Dachrinne erneuern', alt: { menge: '12 m', netto: 540 }, neu: { menge: '16 m', netto: 720 } },
    leistung: 'Dach neu eindecken', auftrag: 'Dach neu eindecken', detail: 'Ziegel in Anthrazit · Rinne aus Zink', angebotTitel: 'Dacharbeiten Satteldach',
    arbeit: { tage: 'Tag 1 von 5', schritte: [{ zeit: '7:30', text: 'Gerüst steht, alles gesichert' }, { zeit: '11:30', text: 'Alte Ziegel abgenommen' }, { zeit: '17:30', text: 'Lattung neu, Ziegel folgen' }] },
    abnahme: 'Abnahme', fertig: 'Ihr Dach ist fertig', bewertung: '„Sauber, schnell und super freundlich. Gerne wieder!“',
  },
  {
    id: 'galabau', label: 'Garten- und Landschaftsbau', firma: 'Garten Muster', art: 'Garten- und Landschaftsbau', suchwort: 'Gartenbau', sucht: 'einen Gartenbauer', chef: 'Der Meister', chefAn: 'an den Meister',
    held: ['Ihr Garten.', 'Wie gemalt.'], bildchip: 'Garten · Musterstadt', arbeiten: ['Terrasse', 'Rasen', 'Hecke', 'Teich'],
    preise: [{ was: 'Rasen neu anlegen', preis: 'ab 12 €/m²' }, { was: 'Terrasse pflastern', preis: 'ab 95 €/m²' }, { was: 'Hecke schneiden', preis: 'ab 4 €/m' }],
    rechner: { frage1: 'Was planen Sie?', optionen: ['Terrasse', 'Rasen', 'Weg', 'Beet', 'Hecke'], frage2: 'Wie groß?', einheit: 'm²', min: 5, max: 80, wert: 30,
      frage3: 'Welcher Belag?', umfang: ['Beton', 'Naturstein'], von: 4200, bis: 5200 },
    termin: { art: 'Gartentermin', imSatz: 'der Gartentermin', ort: 'Bei Ihnen im Garten, Musterstadt', dauer: 'ca. 30 Minuten · kostenlos', info: 'Gartentermin bei Ihnen vor Ort' },
    projekt: 'Terrasse',
    aufnahme: { titel: 'Flächen', zeilen: [
      { name: 'Terrasse', wert: '30 m²', kurz: 'Terrasse', kurzWert: '30 m²' },
      { name: 'Randsteine', wert: '20 m', kurz: 'Rand', kurzWert: '20 m' },
      { name: 'Stufen', wert: '2 Stück', kurz: 'Stufen', kurzWert: '2' }],
      wahlTitel: 'Belag', wahl: 'Naturstein: Sand · Fugen: Grau', wahlKurz: 'Naturstein' },
    posten: [{ name: 'Aushub und Entsorgung', menge: '30 m²', netto: 900 }, { name: 'Unterbau verdichten', menge: '30 m²', netto: 750 }, { name: 'Naturstein verlegen', menge: '30 m²', netto: 2100 }],
    anpassung: { name: 'Randsteine setzen', alt: { menge: '14 m', netto: 280 }, neu: { menge: '20 m', netto: 400 } },
    leistung: 'Terrasse aus Naturstein', auftrag: 'Terrasse anlegen', detail: 'Naturstein in Sand · 30 m²', angebotTitel: 'Gartenbau Terrasse',
    arbeit: { tage: 'Tag 1 von 3', schritte: [{ zeit: '7:30', text: 'Team ist da, Fläche abgesteckt' }, { zeit: '11:30', text: 'Aushub fertig' }, { zeit: '17:30', text: 'Unterbau verdichtet' }] },
    abnahme: 'Abnahme', fertig: 'Ihre Terrasse ist fertig', bewertung: '„Sauber, schnell und super freundlich. Gerne wieder!“',
  },
  {
    id: 'foto', label: 'Fotograf', firma: 'Fotostudio Muster', firmaSatz: 'Das Fotostudio Muster', art: 'Fotostudio', suchwort: 'Fotograf', sucht: 'einen Fotografen', chef: 'Die Fotografin', chefAn: 'an die Fotografin',
    held: ['Echte Momente.', 'Schöne Bilder.'], bildchip: 'Familienfoto · Musterstadt', arbeiten: ['Hochzeit', 'Familie', 'Business', 'Produkte'],
    preise: [{ was: 'Porträt-Shooting', preis: 'ab 149 €' }, { was: 'Familien-Shooting', preis: 'ab 249 €' }, { was: 'Hochzeit', preis: 'ab 1.290 €' }],
    rechner: { frage1: 'Welcher Anlass?', optionen: ['Hochzeit', 'Familie', 'Business', 'Baby', 'Feier'], frage2: 'Wie lange?', einheit: 'Std.', min: 1, max: 12, wert: 6,
      frage3: 'Was gehört dazu?', umfang: ['Nur Bilder', 'Bilder und Album'], von: 1900, bis: 2300 },
    termin: { art: 'Vorgespräch', imSatz: 'das Vorgespräch', ort: 'Im Studio, Musterstadt', dauer: 'ca. 30 Minuten · kostenlos', info: 'Vorgespräch im Studio' },
    projekt: 'Hochzeit',
    aufnahme: { titel: 'Ablauf', zeilen: [
      { name: 'Trauung', wert: '14:00 Uhr', kurz: 'Trauung', kurzWert: '14 Uhr' },
      { name: 'Feier', wert: 'bis 20:00 Uhr', kurz: 'Feier', kurzWert: '20 Uhr' },
      { name: 'Gruppenbilder', wert: '3 Gruppen', kurz: 'Gruppen', kurzWert: '3' }],
      wahlTitel: 'Stil', wahl: 'Natürlich · Farbe und Schwarz-Weiß', wahlKurz: 'Natürlich' },
    posten: [{ name: 'Begleitung Trauung und Feier', menge: '6 Std.', netto: 1080 }, { name: 'Bildbearbeitung', menge: '300 Bilder', netto: 360 }, { name: 'Online-Galerie', menge: 'pauschal', netto: 90 }],
    anpassung: { name: 'Fotoalbum', alt: { menge: '20 Seiten', netto: 190 }, neu: { menge: '30 Seiten', netto: 260 } },
    leistung: 'Hochzeit mit Album', auftrag: 'Hochzeit fotografieren', detail: '6 Stunden · Album mit 30 Seiten', angebotTitel: 'Fotografie Hochzeit',
    arbeit: { tage: 'Tag 1 von 1', schritte: [{ zeit: '13:30', text: 'Vor Ort, Licht geprüft' }, { zeit: '14:00', text: 'Trauung fotografiert' }, { zeit: '18:00', text: 'Gruppenbilder fertig' }] },
    abnahme: 'Bilder freigeben', fertig: 'Ihre Bilder sind fertig', bewertung: '„Wunderschöne Bilder und so entspannt. Sehr gerne wieder!“',
  },
  {
    id: 'fahrschule', label: 'Fahrschule', firma: 'Fahrschule Muster', firmaSatz: 'Die Fahrschule Muster', art: 'Fahrschule', suchwort: 'Fahrschule', sucht: 'eine Fahrschule', chef: 'Der Fahrlehrer', chefAn: 'an den Fahrlehrer',
    held: ['Sicher ans Ziel.', 'Mit Geduld.'], bildchip: 'Klasse B · Musterstadt', arbeiten: ['Klasse B', 'Motorrad', 'Automatik', 'Auffrischung'],
    preise: [{ was: 'Grundgebühr Klasse B', preis: 'ab 390 €' }, { was: 'Fahrstunde', preis: 'ab 65 €' }, { was: 'Sonderfahrt', preis: 'ab 85 €' }],
    rechner: { frage1: 'Welche Klasse?', optionen: ['Klasse B', 'B197', 'A2', 'BE', 'AM'], frage2: 'Wie viele Fahrstunden?', einheit: 'Std.', min: 10, max: 60, wert: 28,
      frage3: 'Was brauchen Sie?', umfang: ['Nur Praxis', 'Theorie und Praxis'], von: 3800, bis: 4400 },
    termin: { art: 'Beratung', imSatz: 'der Beratungstermin', ort: 'In der Fahrschule, Musterstadt', dauer: 'ca. 20 Minuten · kostenlos', info: 'Beratung in der Fahrschule' },
    projekt: 'Klasse B',
    aufnahme: { titel: 'Stand', zeilen: [
      { name: 'Fahrerfahrung', wert: 'keine', kurz: 'Erfahrung', kurzWert: 'keine' },
      { name: 'Fahrstunden pro Woche', wert: '2', kurz: 'pro Woche', kurzWert: '2' },
      { name: 'Theorie ab', wert: 'Montag', kurz: 'Theorie', kurzWert: 'Mo' }],
      wahlTitel: 'Fahrzeug', wahl: 'Schaltwagen · Kurs: Intensiv', wahlKurz: 'Schaltwagen' },
    posten: [{ name: 'Grundgebühr Klasse B', menge: 'pauschal', netto: 390 }, { name: 'Fahrstunden', menge: '28 × 45 Min.', netto: 1820 }, { name: 'Sonderfahrten', menge: '12 × 45 Min.', netto: 1020 }],
    anpassung: { name: 'Vorstellung zur Prüfung', alt: { menge: 'Praxis', netto: 180 }, neu: { menge: 'Theorie und Praxis', netto: 260 } },
    leistung: 'Führerschein Klasse B', auftrag: 'Führerschein Klasse B', detail: '28 Fahrstunden · Theorie inklusive', angebotTitel: 'Ausbildung Klasse B',
    arbeit: { tage: 'Woche 1 von 8', schritte: [{ zeit: '16:00', text: 'Theorie: Vorfahrt' }, { zeit: '17:30', text: 'Erste Fahrstunde' }, { zeit: '18:15', text: 'Lernstand: gut' }] },
    abnahme: 'Abschluss', fertig: 'Bestanden, herzlichen Glückwunsch!', bewertung: '„Super geduldig und gut erklärt. Klare Empfehlung!“',
  },
  {
    id: 'coach', label: 'Coach / Berater', firma: 'Coaching Muster', art: 'Coaching und Beratung', suchwort: 'Coach', sucht: 'einen Coach', chef: 'Die Beraterin', chefAn: 'an die Beraterin',
    held: ['Klarer Kopf.', 'Klare Ziele.'], bildchip: 'Beratung · Musterstadt', arbeiten: ['Einzeln', 'Team', 'Workshop', 'Online'],
    preise: [{ was: 'Erstgespräch', preis: 'kostenlos' }, { was: 'Sitzung (60 Min.)', preis: 'ab 120 €' }, { was: 'Paket 5 Sitzungen', preis: 'ab 540 €' }],
    rechner: { frage1: 'Worum geht es?', optionen: ['Führung', 'Beruf', 'Team', 'Neustart', 'Stress'], frage2: 'Wie viele Sitzungen?', einheit: 'Sitzungen', min: 1, max: 20, wert: 8,
      frage3: 'Wie möchten Sie?', umfang: ['Nur online', 'Vor Ort und online'], von: 1200, bis: 1500 },
    termin: { art: 'Kennenlernen', imSatz: 'das Kennenlerngespräch', ort: 'In der Praxis, Musterstadt', dauer: 'ca. 30 Minuten · kostenlos', info: 'Kennenlerngespräch in der Praxis' },
    projekt: 'Führung',
    aufnahme: { titel: 'Ziele', zeilen: [
      { name: 'Thema', wert: 'Führung', kurz: 'Thema', kurzWert: 'Führung' },
      { name: 'Sitzungen', wert: '8', kurz: 'Sitzungen', kurzWert: '8' },
      { name: 'Rhythmus', wert: 'alle 2 Wochen', kurz: 'Rhythmus', kurzWert: '14 Tage' }],
      wahlTitel: 'Format', wahl: 'Vor Ort und online · abends', wahlKurz: 'Vor Ort' },
    posten: [{ name: 'Auftaktgespräch', menge: '90 Min.', netto: 150 }, { name: 'Coaching-Sitzungen', menge: '8 × 60 Min.', netto: 880 }, { name: 'Arbeitsmaterial', menge: 'pauschal', netto: 40 }],
    anpassung: { name: 'Abschlussgespräch', alt: { menge: '60 Min.', netto: 110 }, neu: { menge: '90 Min.', netto: 150 } },
    leistung: 'Coaching Führung', auftrag: 'Coaching Führung', detail: '8 Sitzungen · vor Ort und online', angebotTitel: 'Coaching Führung',
    arbeit: { tage: 'Sitzung 1 von 8', schritte: [{ zeit: '18:00', text: 'Ziele festgehalten' }, { zeit: '18:40', text: 'Erste Übung besprochen' }, { zeit: '19:00', text: 'Aufgabe bis zum nächsten Mal' }] },
    abnahme: 'Abschluss', fertig: 'Ihr Coaching ist abgeschlossen', bewertung: '„Klar, herzlich und wirksam. Sehr gerne wieder!“',
  },
  {
    id: 'kosmetik', label: 'Kosmetik', firma: 'Kosmetikstudio Muster', firmaSatz: 'Das Kosmetikstudio Muster', art: 'Kosmetikstudio', suchwort: 'Kosmetik', sucht: 'ein Kosmetikstudio', chef: 'Die Inhaberin', chefAn: 'an die Inhaberin',
    held: ['Zeit für Sie.', 'Spürbar gepflegt.'], bildchip: 'Studio · Musterstadt', arbeiten: ['Gesicht', 'Hände', 'Wimpern', 'Wellness'],
    preise: [{ was: 'Gesichtsbehandlung', preis: 'ab 69 €' }, { was: 'Maniküre', preis: 'ab 35 €' }, { was: 'Wimpernlifting', preis: 'ab 59 €' }],
    rechner: { frage1: 'Welche Behandlung?', optionen: ['Gesicht', 'Hände', 'Füße', 'Wimpern', 'Massage'], frage2: 'Wie viele Termine?', einheit: 'Termine', min: 1, max: 12, wert: 5,
      frage3: 'Was soll es sein?', umfang: ['Einzeltermine', 'Pflege-Paket'], von: 400, bis: 500 },
    termin: { art: 'Hautanalyse', imSatz: 'die Hautanalyse', ort: 'Im Studio, Musterstadt', dauer: 'ca. 20 Minuten · kostenlos', info: 'Hautanalyse im Studio' },
    projekt: 'Pflege-Paket',
    aufnahme: { titel: 'Haut', zeilen: [
      { name: 'Hauttyp', wert: 'Mischhaut', kurz: 'Hauttyp', kurzWert: 'Misch' },
      { name: 'Wunsch', wert: 'Feuchtigkeit', kurz: 'Wunsch', kurzWert: 'Feucht.' },
      { name: 'Allergien', wert: 'keine', kurz: 'Allergien', kurzWert: 'keine' }],
      wahlTitel: 'Pflege', wahl: 'Duft: neutral · Produkte: vegan', wahlKurz: 'Vegan' },
    posten: [{ name: 'Hautanalyse', menge: 'pauschal', netto: 30 }, { name: 'Gesichtsbehandlung', menge: '5 × 60 Min.', netto: 290 }, { name: 'Pflegeprodukte', menge: '1 Set', netto: 45 }],
    anpassung: { name: 'Augenbrauen', alt: { menge: 'Form', netto: 15 }, neu: { menge: 'Form und Farbe', netto: 25 } },
    leistung: 'Pflege-Paket Gesicht', auftrag: 'Pflege-Paket Gesicht', detail: '5 Behandlungen · vegane Produkte', angebotTitel: 'Pflege-Paket Gesicht',
    arbeit: { tage: 'Termin 1 von 5', schritte: [{ zeit: '10:00', text: 'Hautanalyse fertig' }, { zeit: '10:30', text: 'Reinigung und Maske' }, { zeit: '11:00', text: 'Pflegeplan erstellt' }] },
    abnahme: 'Abschluss', fertig: 'Ihr Pflege-Paket ist fertig', bewertung: '„Total entspannend und super beraten. Gerne wieder!“',
  },
  {
    id: 'reinigung', label: 'Reinigung', firma: 'Reinigung Muster', art: 'Gebäudereinigung', suchwort: 'Reinigung', sucht: 'eine Reinigungsfirma', chef: 'Die Inhaberin', chefAn: 'an die Inhaberin',
    held: ['Alles sauber.', 'Ganz zuverlässig.'], bildchip: 'Büro · Musterstadt', arbeiten: ['Büro', 'Treppenhaus', 'Fenster', 'Praxis'],
    preise: [{ was: 'Büroreinigung', preis: 'ab 1,80 €/m²' }, { was: 'Fenster putzen', preis: 'ab 3 €/m²' }, { was: 'Grundreinigung', preis: 'ab 4 €/m²' }],
    rechner: { frage1: 'Was wird gereinigt?', optionen: ['Büro', 'Praxis', 'Treppenhaus', 'Wohnung', 'Laden'], frage2: 'Wie groß?', einheit: 'm²', min: 50, max: 600, wert: 250,
      frage3: 'Wie oft?', umfang: ['Einmalig', 'Jede Woche'], von: 600, bis: 700 },
    termin: { art: 'Besichtigung', imSatz: 'der Besichtigungstermin', ort: 'Bei Ihnen vor Ort, Musterstadt', dauer: 'ca. 30 Minuten · kostenlos', info: 'Besichtigung bei Ihnen vor Ort' },
    projekt: 'Büro',
    aufnahme: { titel: 'Flächen', zeilen: [
      { name: 'Bürofläche', wert: '250 m²', kurz: 'Büro', kurzWert: '250 m²' },
      { name: 'Sanitärräume', wert: '2 Räume', kurz: 'Sanitär', kurzWert: '2' },
      { name: 'Fenster', wert: '18 Stück', kurz: 'Fenster', kurzWert: '18' }],
      wahlTitel: 'Rhythmus', wahl: 'Jede Woche · freitags ab 17 Uhr', wahlKurz: 'Wöchentlich' },
    posten: [{ name: 'Büroreinigung wöchentlich', menge: '250 m²', netto: 400 }, { name: 'Sanitärräume', menge: '2 Räume', netto: 80 }, { name: 'Müll und Papier', menge: 'pauschal', netto: 20 }],
    anpassung: { name: 'Fenster innen', alt: { menge: 'alle 3 Monate', netto: 30 }, neu: { menge: 'jeden Monat', netto: 60 } },
    leistung: 'Büroreinigung jede Woche', auftrag: 'Büroreinigung', detail: '250 m² · jede Woche freitags', angebotTitel: 'Büroreinigung pro Monat',
    arbeit: { tage: 'Woche 1', schritte: [{ zeit: '17:00', text: 'Team ist da' }, { zeit: '18:30', text: 'Büros und Küche fertig' }, { zeit: '19:30', text: 'Sanitär fertig, Müll entsorgt' }] },
    abnahme: 'Abnahme', fertig: 'Ihr Büro ist sauber', bewertung: '„Gründlich, leise und immer pünktlich. Klare Empfehlung!“',
  },
  {
    id: 'andere', label: 'Andere', firma: 'Betrieb Muster', firmaSatz: 'Der Betrieb Muster', art: 'Dienstleistung', suchwort: 'Dienstleister', sucht: 'einen Dienstleister', chef: 'Die Chefin', chefAn: 'an die Chefin',
    held: ['Gute Arbeit.', 'Klare Preise.'], bildchip: 'Projekt · Musterstadt', arbeiten: ['Beratung', 'Umsetzung', 'Service', 'Wartung'],
    preise: [{ was: 'Erstgespräch', preis: 'kostenlos' }, { was: 'Arbeitsstunde', preis: 'ab 65 €' }, { was: 'Paket klein', preis: 'ab 390 €' }],
    rechner: { frage1: 'Was brauchen Sie?', optionen: ['Umsetzung', 'Beratung', 'Service', 'Wartung', 'Paket'], frage2: 'Wie viele Stunden?', einheit: 'Std.', min: 1, max: 40, wert: 15,
      frage3: 'Welcher Umfang?', umfang: ['Einmalig', 'Mit Service'], von: 1200, bis: 1500 },
    termin: { art: 'Erstgespräch', imSatz: 'das Erstgespräch', ort: 'Bei Ihnen vor Ort, Musterstadt', dauer: 'ca. 30 Minuten · kostenlos', info: 'Erstgespräch bei Ihnen vor Ort' },
    projekt: 'Projekt',
    aufnahme: { titel: 'Umfang', zeilen: [
      { name: 'Leistung', wert: 'Umsetzung', kurz: 'Leistung', kurzWert: 'Umsetz.' },
      { name: 'Aufwand', wert: '12 Std.', kurz: 'Aufwand', kurzWert: '12 Std.' },
      { name: 'Wunschtermin', wert: 'nächste Woche', kurz: 'Termin', kurzWert: 'KW 48' }],
      wahlTitel: 'Wünsche', wahl: 'Mit Service · Termin flexibel', wahlKurz: 'Service' },
    posten: [{ name: 'Vorbereitung', menge: 'pauschal', netto: 120 }, { name: 'Umsetzung', menge: '12 Std.', netto: 780 }, { name: 'Material', menge: 'pauschal', netto: 140 }],
    anpassung: { name: 'Nacharbeit', alt: { menge: '2 Std.', netto: 130 }, neu: { menge: '3 Std.', netto: 195 } },
    leistung: 'Umsetzung mit Service', auftrag: 'Projekt umsetzen', detail: '12 Stunden · mit Service', angebotTitel: 'Angebot Projekt',
    arbeit: { tage: 'Tag 1 von 2', schritte: [{ zeit: '8:00', text: 'Start, alles vorbereitet' }, { zeit: '11:30', text: 'Erster Teil fertig' }, { zeit: '17:30', text: 'Zwischenstand abgestimmt' }] },
    abnahme: 'Abnahme', fertig: 'Ihr Projekt ist fertig', bewertung: '„Sauber, schnell und super freundlich. Gerne wieder!“',
  },
];

export const STANDARD = MALER;
export const FIRMA_MAX = 40;
export const ORT = 'Musterstadt';
export const KUNDIN = 'Frau Weber';

export const findeBranche = (id: string | null | undefined): Branche => BRANCHEN.find((b) => b.id === id) ?? STANDARD;

/** Eingabe des Besuchers säubern: Steuerzeichen raus, Leerraum zusammenfassen, höchstens 40 Zeichen. Ausgabe nur als Text. */
export const saubereFirma = (roh: string | null | undefined): string =>
  [...String(roh ?? '').replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202e\u2066-\u2069]/g, '').replace(/\s+/g, ' ').trim()].slice(0, FIRMA_MAX).join('').trim();

/** 1234.5 → „1.234,50“ (ohne Intl, damit Bau und Browser gleich formatieren) */
export const euro = (n: number, nachkomma = 2): string => {
  const [ganz, rest] = (Math.round(n * 100) / 100).toFixed(nachkomma).split('.');
  return ganz.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (rest ? ',' + rest : '');
};
const rund = (n: number, auf: number) => Math.round(n / auf) * auf;

/** Anfangsbuchstaben (1 bzw. 2) eines Namens, nur Buchstaben/Ziffern */
const kuerzel = (name: string, anzahl: number): string => {
  const woerter = name.split(/\s+/).map((w) => [...w].find((z) => /[\p{L}\p{N}]/u.test(z)) ?? '').filter(Boolean);
  return (woerter.slice(0, anzahl).join('') || 'M').toLocaleUpperCase('de-DE');
};

/** Alle Texte des Films für eine Branche (+ optional eigener Firmenname). Schlüssel = data-p in den Szenen. */
export function werte(b: Branche, eigeneFirma = ''): Record<string, string> {
  const name = saubereFirma(eigeneFirma);
  const firma = name || b.firma;
  const r = b.rechner;
  const nettoAlt = b.posten.reduce((s, p) => s + p.netto, 0) + b.anpassung.alt.netto;
  const nettoNeu = nettoAlt - b.anpassung.alt.netto + b.anpassung.neu.netto;
  const w: Record<string, string> = {
    firma, firmaSatz: name || b.firmaSatz || b.firma, kuerzel: kuerzel(firma, 1), kuerzel2: kuerzel(firma, 2),
    art: b.art, suche: `${b.suchwort} in ${ORT}`, sucht: b.sucht, chef: b.chef, chefAn: b.chefAn,
    held1: b.held[0], held2: b.held[1], bildchip: b.bildchip,
    rFrage1: r.frage1, rFrage2: r.frage2, rFrage3: r.frage3, rEinheit: r.einheit,
    rMin: `${r.min} ${r.einheit}`, rMax: `${r.max} ${r.einheit}`, rStart: String(r.min), rWert: String(r.wert),
    rUmfang1: r.umfang[0], rUmfang2: r.umfang[1],
    rPreis: `${euro(r.von, 0)}–${euro(r.bis, 0)} €`,
    rSumme: `${r.optionen[0]} · ${r.wert} ${r.einheit} · ${r.umfang[1]}`,
    terminArt: b.termin.art, terminBuchen: `${b.termin.art} buchen`, terminImSatz: b.termin.imSatz, terminOrt: b.termin.ort, terminDauer: b.termin.dauer, terminInfo: b.termin.info,
    terminNeu: `Neuer Termin: ${b.termin.art}`,
    terminKalender: `${b.termin.art} im Kalender eingetragen: Do 19.11., 10:00`,
    terminKopf: `${b.termin.art} · ${KUNDIN}`,
    projekt: b.projekt, projektOrt: `${b.projekt} · ${ORT}`, kundeProjekt: `${KUNDIN} · ${b.projekt}`, anliegen: `${b.projekt} · ${r.wert} ${r.einheit}`,
    aTitel: b.aufnahme.titel, aWahlTitel: b.aufnahme.wahlTitel, aWahl: b.aufnahme.wahl, aWahlKurz: b.aufnahme.wahlKurz,
    anpName: b.anpassung.name, anpMengeAlt: b.anpassung.alt.menge, anpMengeNeu: b.anpassung.neu.menge,
    anpPreisAlt: `${euro(b.anpassung.alt.netto)} €`, anpPreisNeu: `${euro(b.anpassung.neu.netto)} €`,
    summeAlt: `${euro(nettoAlt * 1.19)} €`, summeNeu: `${euro(nettoNeu * 1.19)} €`, mwst: `${euro(nettoNeu * 0.19)} €`,
    leistung: b.leistung, auftrag: b.auftrag, detail: b.detail, angebotTitel: b.angebotTitel,
    mailBetreff: `Ihr Angebot von ${firma}`, gruss: `Ihr Team von ${firma}`,
    tage: b.arbeit.tage, abnahme: b.abnahme, abnahmeBestaetigen: `${b.abnahme} bestätigen`, abnahmeBestaetigt: `${b.abnahme} bestätigt`,
    rechnungFolgt: `Rechnung folgt nach: ${b.abnahme}`, fertig: b.fertig, bewertung: b.bewertung,
  };
  // Standard (Maler, ohne eigenen Namen): Betreff und Gruß wie im Drehbuch
  if (!name && b.id === STANDARD.id) { w.mailBetreff = 'Ihr Angebot vom Malerbetrieb Muster'; w.gruss = 'Ihr Malerbetrieb Muster'; w.terminNeu = 'Neuer Besichtigungstermin';
    w.terminKalender = 'Besichtigung im Kalender eingetragen: Do 19.11., 10:00'; w.rechnungFolgt = 'Rechnung folgt nach der Abnahme'; }
  r.optionen.forEach((o, i) => { w[`rOpt${i}`] = o; });
  [0.2, 0.45, 0.7, 0.85].forEach((f, i) => { w[`rWertZw${i}`] = String(Math.round(r.min + (r.wert - r.min) * f)); });
  [0.2, 0.4, 0.6, 0.8].forEach((f, i) => { const auf = r.von >= 2000 ? 100 : 10; w[`rPreisZw${i}`] = `${euro(rund(r.von * f, auf), 0)}–${euro(rund(r.bis * f, auf), 0)} €`; });
  b.arbeiten.forEach((a, i) => { w[`arbeit${i}`] = a; });
  b.preise.forEach((p, i) => { w[`preisWas${i}`] = p.was; w[`preis${i}`] = p.preis; });
  b.aufnahme.zeilen.forEach((z, i) => { w[`aName${i}`] = z.name; w[`aWert${i}`] = z.wert; w[`aKurz${i}`] = z.kurz; w[`aKurzWert${i}`] = z.kurzWert; });
  b.posten.forEach((p, i) => { w[`pName${i}`] = p.name; w[`pMenge${i}`] = p.menge; w[`pPreis${i}`] = `${euro(p.netto)} €`; });
  b.arbeit.schritte.forEach((s, i) => { w[`aZeit${i}`] = s.zeit; w[`aText${i}`] = s.text; });
  return w;
}

/** Platzhalter {schluessel} in einer Vorlage füllen (für die Szenentexte unter dem Bild) */
export const fuelle = (vorlage: string, w: Record<string, string>): string => vorlage.replace(/\{(\w+)\}/g, (_, k: string) => w[k] ?? '');
