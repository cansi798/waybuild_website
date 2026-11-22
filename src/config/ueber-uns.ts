// Texte der Seite /ueber-uns/ (Jamil #6055, 15.11.2026). Positionierung aus variante.ts (Fr. 20), Fakten aus site.ts (Fr. 11).

/** Kopf der Seite. Vorher „Wir bauen digitale Unternehmensplattformen.“ – jetzt derselbe Positionierungssatz wie überall (Fr. 20). */
export const UEBER_KOPF = {
  titel: 'Wir sind ==webgold==.', // ==…== = goldener Marker (Jamil #7016)
  leadNach: 'Für kleine und mittlere Unternehmen, ohne technische Hürden, lange Projekte oder hohe Einmalinvestitionen.',
};

/** Gründungsgeschichte (Jamil #6055 Fr. 10: „ok, erfinde erstmal was als Platzhalter“). ENTWURF, nur in der Vorschau sichtbar und
 *  dort deutlich als Entwurf markiert. Nur belegte Fakten: Gründung 2026 (Fr. 11), Norderstedt (Impressum), Can Technik / Jamil
 *  Kundenkontakt (Fr. 19). Keine erfundenen Zahlen. Vor dem Start von Can und Jamil in eigenen Worten bestätigen oder ersetzen,
 *  dann `bestaetigt: true` (erst dann erscheint der Text auch im Live-Build, ohne Entwurfs-Markierung). */
export const GRUENDUNG = {
  bestaetigt: false,
  titel: 'Wie webgold entstanden ist',
  etikett: 'Entwurf (Platzhalter)',
  hinweis: 'Platzhalter-Text, von Can und Jamil noch nicht bestätigt. Vor dem Start in eigenen Worten ersetzen.',
  absaetze: [
    'Wir haben webgold 2026 in Norderstedt gegründet. Der Anlass war etwas, das wir bei Betrieben immer wieder gesehen haben: Die Arbeit ist gut, aber online sieht man davon wenig. Und Anfragen gehen zwischen E-Mail, Telefon und WhatsApp unter.',
    'Can kümmert sich im Hintergrund um die Technik. Jamil ist für unsere Kunden da, vom ersten Gespräch bis zur Betreuung. Zusammen wollen wir, dass Sie sich um Ihr Geschäft kümmern können, während Website und Abläufe einfach funktionieren.',
  ],
};

/** Überschrift über den belegten Fakten (Werte aus site.ts → FAKTEN) */
export const FAKTEN_TITEL = 'Kurz und belegbar';
