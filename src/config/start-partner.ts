// STARTSEITE, Abschnitt „Ein Partner für Ihre gesamte digitale Entwicklung.“ (Jamil Talk qh87y3sj #5854, 14.11.2026).
// Texte wörtlich aus Jamils Nachricht, zwei Korrekturen:
//   - Kennzeile: Marke seit 14.11.2026 „webgold“ (Jamil, Talk #5913).
//   - „Alles aus einer Hand“: Jamils „… aus einem Ansprechpartner“ ist holprig, daher „… von einem Ansprechpartner“.
// Komponente: src/components/startneu/SnPartner.astro, Stil: src/styles/start-partner.css.
import type { IconName } from './site';

export const PARTNER = {
  kenn: 'Warum Unternehmen mit webgold arbeiten',
  titel: 'Ein Partner für Ihre gesamte digitale Entwicklung.',
  vorteile: [
    { icon: 'compass', titel: 'Individuelle Lösungen', text: 'Keine Standardpakete, sondern Lösungen, die zu Ihrem Unternehmen passen.' },
    { icon: 'layers', titel: 'Alles aus einer Hand', text: 'Website, Web-Apps und Weiterentwicklung von einem Ansprechpartner.' },
    { icon: 'refresh', titel: 'Langfristige Zusammenarbeit', text: 'Wir begleiten Unternehmen nicht nur beim Start, sondern auch beim nächsten Wachstumsschritt.' },
    { icon: 'shield', titel: 'Zukunftssichere Systeme', text: 'Digitale Lösungen, die heute funktionieren und morgen erweitert werden können.' },
  ] as { icon: IconName; titel: string; text: string }[],
};
