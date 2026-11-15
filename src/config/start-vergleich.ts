// STARTSEITE: Vergleichstabelle (Jamil Talk qh87y3sj #5871–#5873, 14.11.2026): Überschrift „Die meisten Lösungen lösen nur einen
// Teil des Problems.“, drei Anbieter-Arten, sieben Punkte mit ✓ / ⚠ / ✗ (Wortlaut und Bewertung aus Jamils Tabelle), die alten
// sechs Fragen und „Selbst machen“ sind auf der Startseite raus. Nur Anbieter-Arten, keine Namen (UWG § 6), Hinweis bleibt darunter.
// Zusatztexte („Neues Projekt“, „Extra-System“) entfernt, nur Symbole (Jamil #5908). /warum-waybuild/ nutzt weiter VERGLEICH aus variante.ts (bis Jamil anders entscheidet).
export type Stufe = 'ja' | 'teils' | 'nein';

export const VERGLEICH_START = {
  kennzeile: 'Im Vergleich',
  titel: 'Die meisten Lösungen lösen nur einen Teil des Problems.',
  /** lang = Tabellenkopf am PC, kurz = schmale Bildschirme, zusatz = zweite, kleinere Zeile */
  spalten: [
    { lang: 'Website-Baukasten', kurz: 'Baukasten' } as { lang: string; kurz: string; zusatz?: string; zusatzKurz?: string },
    { lang: 'Klassische Agentur', kurz: 'Agentur', zusatz: '/ IT-Dienstleister', zusatzKurz: '/ IT' }, // + IT-Dienstleister: Jamil #5889 (zweite, kleinere Zeile)
    { lang: 'webgold', kurz: 'webgold' },
  ],
  // Sachlicher nach Audit #5953 W1 (Jamil #6011, 15.11.2026, UWG § 6): kein pauschales „Nein“ mehr für Agenturen; „Inhalte pflegen“
  // ehrlich nach unserem Modell (wir pflegen, Sie schicken eine Nachricht); eine Zeile, in der der Baukasten vorn liegt.
  zeilen: [
    { punkt: 'Website online bringen', werte: [{ s: 'ja' }, { s: 'ja' }, { s: 'ja' }] },
    { punkt: 'Inhalte werden für Sie gepflegt, per Nachricht', werte: [{ s: 'nein' }, { s: 'teils' }, { s: 'ja' }] }, // vorher „Neue Inhalte selbst pflegen“ (ja/teils/ja)
    { punkt: 'Individuelle Prozesse digitalisieren', werte: [{ s: 'nein' }, { s: 'teils' }, { s: 'ja' }] },
    { punkt: 'Kundenanfragen zentral verwalten', werte: [{ s: 'nein' }, { s: 'teils' }, { s: 'ja' }] },
    { punkt: 'Mit Ihrem Unternehmen mitwachsen', werte: [{ s: 'teils' }, { s: 'teils' }, { s: 'ja' }] },
    { punkt: 'Fester Ansprechpartner', werte: [{ s: 'teils' }, { s: 'teils' }, { s: 'ja' }] }, // Baukasten vorher „nein“ (meist Support-Team)
    { punkt: 'Planbare monatliche Kosten', werte: [{ s: 'ja' }, { s: 'teils' }, { s: 'ja' }] }, // Agentur vorher „nein“ (meist Projektpreis, Wartung extra)
    { punkt: 'Niedrigster Einstiegspreis', werte: [{ s: 'ja' }, { s: 'teils' }, { s: 'teils' }] }, // hier liegt der Baukasten vorn
  ] as { punkt: string; werte: { s: Stufe; notiz?: string }[] }[],
  /** Bedeutung der Zeichen (für Screenreader und Legende) */
  stufen: { ja: 'Ja', teils: 'Eingeschränkt', nein: 'Nein' } as Record<Stufe, string>,
};
