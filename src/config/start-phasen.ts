// STARTSEITE: „Lösungen für jede Unternehmensphase“ – vier Phasen als aufsteigender Weg (Wachstum sichtbar machen).
// Texte wörtlich von Jamil Talk qh87y3sj #5852, 14.11.2026. Komponente: components/startneu/SnPhasen.astro. Icons von uns gewählt.
import type { IconName } from './site';

export interface Phase {
  titel: string;
  kern: string;
  text: string;
  icon: IconName;
}

export const PHASEN = {
  titel: 'Lösungen für jede Unternehmens\u00ADphase', // \u00AD = weiche Trennung, sonst bei 320 px zu breit
  lead: 'Digitale Bausteine, die mit Ihrem Unternehmen wachsen.', // Jamil #5883: nicht zweimal „Lösungen“ am Satzanfang (vorher „Lösungen, die …“)
  phasen: [
    {
      titel: 'Professionelle Website',
      kern: 'Der erste Eindruck entscheidet.',
      text: 'Wir entwickeln Websites, die Vertrauen schaffen, Leistungen verständlich darstellen und Interessenten zu Anfragen machen.',
      icon: 'layout',
    },
    {
      titel: 'Kunden\u00ADanfragen strukturieren', // \u00AD: in schmalen Spalten sauber trennen
      kern: 'Neue Anfragen sollen nicht zwischen E-Mails und Telefonnotizen verschwinden.',
      text: 'Wir schaffen digitale Prozesse, die Anfragen automatisch erfassen und übersichtlich verwalten.',
      icon: 'mail',
    },
    {
      titel: 'Arbeits\u00ADabläufe digitalisieren',
      kern: 'Viele Aufgaben wiederholen sich täglich.',
      text: 'Mit individuellen WebApps digitalisieren wir interne Abläufe, Dokumentationen, Freigaben, Kundenprozesse oder Verwaltungsaufgaben.',
      icon: 'ablauf',
    },
    {
      titel: 'Wachstum ermöglichen',
      kern: 'Wenn Website und interne Prozesse aufeinander abgestimmt sind, entsteht ein digitales Fundament, das mit Ihrem Unternehmen wächst.',
      text: '',
      icon: 'rocket',
    },
  ] satisfies Phase[],
};
