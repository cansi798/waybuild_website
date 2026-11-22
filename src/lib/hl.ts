// Jamil #7016/#7017 (22.11.2026): Schlüsselwörter in Überschriften mit goldenem Marker. In Texten/Config steht das Wort zwischen
// doppelten Gleichheitszeichen, z. B. 'Wo Betriebe heute ==Kunden und Zeit== verlieren'. hl() macht daraus HTML mit <mark class="hl">
// (Stil: global.css), ohneHl() liefert reinen Text für <title>, Meta, JSON-LD, aria-label usw.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Text mit ==Markern== → sicheres HTML mit <mark class="hl"> (alles andere wird escaped). */
export const hl = (text: string): string => esc(text).replace(/==(.+?)==/g, '<mark class="hl">$1</mark>');

/** Marker entfernen (reiner Text). */
export const ohneHl = (text: string): string => text.replace(/==/g, '');
