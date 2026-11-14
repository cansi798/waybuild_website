// STARTSEITE, Abschnitt „Warum Website und WebApp zusammen besonders stark sind“ (Jamil Talk qh87y3sj #5853, 14.11.2026).
// Texte wörtlich aus Jamils Nachricht. Komponente: src/components/startneu/SnSystem.astro, Stil: src/styles/start-system.css.
// Herzstück ist die Fluss-Grafik „Website → Anfrage → Bearbeitung → Kunde“ (vier Stationen, Icons aus IconName).
import type { IconName } from './site';

export const SYSTEM = {
  titel: 'Warum Website und WebApp zusammen besonders stark sind',
  unterzeile: 'Ein System statt vieler Einzellösungen.',
  problem: [
    'Viele Unternehmen nutzen verschiedene Werkzeuge für Website, Kommunikation, Verwaltung und interne Organisation.',
    'Das führt oft zu doppelter Arbeit, Medienbrüchen und unnötigem Aufwand.',
  ],
  ganzheitlich: 'Wir denken digitale Lösungen ganzheitlich:',
  /** Fluss in Jamils Reihenfolge (#5853: „Website → Anfrage → Bearbeitung → Kunde“) */
  fluss: [
    { icon: 'layout', name: 'Website' },
    { icon: 'mail', name: 'Anfrage' },
    { icon: 'tools', name: 'Bearbeitung' },
    { icon: 'user', name: 'Kunde' },
  ] as { icon: IconName; name: string }[],
  flussLabel: 'Ablauf: Website, Anfrage, Bearbeitung, Kunde',
  verbund: 'Alle Bausteine greifen ineinander und unterstützen Ihre täglichen Abläufe.',
  nutzenTitel: 'Nutzenpunkte',
  nutzen: [
    'Weniger manuelle Arbeit',
    'Weniger Informationsverluste',
    'Schnellere Prozesse',
    'Höhere Transparenz',
    'Mehr Zeit für Ihr Kerngeschäft',
  ],
};
