// STARTSEITE, Abschnitt direkt nach dem Hero: „Ganz gleich, wo Sie gerade stehen.“ – zwei gleichwertige Einstiege (Website /
// Abläufe digitalisieren). Texte wörtlich von Jamil Talk qh87y3sj #5848, 14.11.2026. Komponente: components/startneu/SnWege.astro.
// Nur die Linktexte am Kartenende stehen nicht in Jamils Nachricht (schlichte Verweise auf vorhandene Seiten).
import type { IconName } from './site';

export interface Weg {
  bild: 'website' | 'app';
  frage: string;
  text: string;
  ideal: string;
  icon: IconName;
  link: { text: string; pfad: string };
}

export const WEGE = {
  titel: 'Ganz gleich, wo Sie gerade stehen.',
  lead: 'Jedes Unternehmen verfolgt ähnliche Ziele: sichtbar sein, Vertrauen schaffen und effizient arbeiten. Die Herausforderungen dahinter sind jedoch unterschiedlich.',
  /** Jamil #5927 (14.11.2026): Kunden sollen nicht denken, sie müssten sich entscheiden – „+“ zwischen den Karten und dieser Satz
   *  darunter (von uns formuliert; inhaltlich korrekt: die Web-App gibt es nur zusammen mit einem Website-Paket). */
  beides: {
    kurz: 'Einzeln oder zusammen',
    titel: 'Sie müssen sich nicht entscheiden.',
    text: 'Starten Sie mit der Website und nehmen Sie die Web-App dazu, wenn es passt. Oder buchen Sie beides von Anfang an zusammen. Am stärksten wirken die beiden gemeinsam.',
    link: { text: 'Website + Web-App im Paket', pfad: '/#pakete' },
  },
  karten: [
    {
      bild: 'website',
      frage: 'Sie möchten online professioneller auftreten?',
      text: 'Eine moderne Website sorgt dafür, dass Interessenten verstehen, was Sie anbieten, Vertrauen aufbauen und mit Ihnen Kontakt aufnehmen.',
      ideal: 'Ideal für Unternehmen, die ihre Sichtbarkeit verbessern oder ihren Auftritt modernisieren möchten.',
      icon: 'target',
      link: { text: 'Mehr zu Websites', pfad: '/leistungen/website/' }, // direkt zur Seite Website (Jamil #6038, Audit L2)
    },
    {
      bild: 'app',
      frage: 'Sie möchten Abläufe digitalisieren?',
      text: 'Wenn Informationen verstreut sind, Aufgaben manuell verwaltet werden oder Prozesse unnötig Zeit kosten, helfen individuelle Web-Apps dabei, Arbeitsabläufe zu vereinfachen und zu zentralisieren.',
      ideal: 'Ideal für Unternehmen, die wachsen und effizienter arbeiten möchten.',
      icon: 'chart',
      link: { text: 'Mehr zu Web-Apps', pfad: '/leistungen/ablaeufe/' }, // Jamil #5921 (vorher „So kann es laufen“)
    },
  ] satisfies Weg[],
};
