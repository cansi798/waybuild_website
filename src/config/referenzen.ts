// Referenzen nach Bereichen (Jamil, Talk qh87y3sj #5288, 09.11.2026: „unter Referenzen einen Bereich dafür schaffen“).
// /referenzen/ zeigt je Bereich einen eigenen Abschnitt mit Sprungmarke (#websites …). Weitere Bereiche wie „Software“
// einfach als neuen Eintrag ergänzen, sobald es freigegebene Projekte gibt (gleicher Kartentyp Referenz aus startseite.ts).
// Die Website-Projekte selbst stehen in REFERENZEN (src/config/startseite.ts) und erscheinen auch auf der Startseite
// und auf /leistungen/website/.
import { REFERENZEN, type Referenz } from './startseite';

export type ReferenzBereich = { id: string; titel: string; text: string; liste: Referenz[] };

export const REFERENZ_BEREICHE: ReferenzBereich[] = [
  { id: 'websites', titel: 'Websites', text: REFERENZEN.einleitung, liste: REFERENZEN.liste },
];
