// Startseite, zwei Abschnitte nach der Kundenreise (09.11.2026). Alle Texte WÖRTLICH von Jamil (Talk qh87y3sj), nicht umformulieren.
// Komponenten: src/components/start/SoGehenWirVor.astro und src/components/start/Prinzipien.astro, Stil src/styles/vorgehen.css,
// Einblenden (beide Abschnitte) src/scripts/vorgehen.ts. Nie „aus einer Hand“.
import type { IconName } from './site';

/** „So gehen wir vor“ (Jamil #5188, freigegeben „ok 2b 3 ja“ #5190; Schritt-Texte allgemeiner für alle Pakete #5279). 2b: Jamils sechs Fragen werden NICHT gezeigt.
 *  Ersetzt den Abschnitt „Verstehen. Empfehlen. Umsetzen. Verbessern.“; Anker #denkweise (Abschnitt) und #erstberatung
 *  (Schritt 1 mit dem Erstgespräch) bleiben, damit alte Links weiter treffen. */
export const VORGEHEN = {
  titel: 'So gehen wir vor',
  unter: 'Wir betrachten Ihr Unternehmen aus Sicht Ihrer Kunden.',
  intro: 'Bevor wir Empfehlungen aussprechen, schauen wir uns an, wie Ihr Unternehmen tatsächlich erlebt wird.',
  ueberleitung: 'Denn jeder dieser Schritte beeinflusst die Erfahrung Ihrer Kunden.',
  schritte: [
    {
      wort: 'Verstehen',
      text: 'Wir schauen uns an, wie Ihr Unternehmen heute wahrgenommen wird und was Ihre Kunden wirklich brauchen.',
      hinweis: 'Start: kostenloses Erstgespräch, rund 20 Minuten.',
      anker: 'erstberatung',
    },
    {
      wort: 'Verbinden',
      text: 'Wir sorgen dafür, dass alles, was Sie mit uns umsetzen, zusammenpasst. Von der Website bis zu Ihren Abläufen.',
      betont: 'Nicht nebeneinander. Sondern miteinander.',
    },
    {
      wort: 'Verbessern',
      text: 'Wir entwickeln Schritt für Schritt weiter, was für Ihre Kunden den größten Unterschied macht.',
    },
  ] as { wort: string; text: string; hinweis?: string; betont?: string; anker?: string }[],
};

/** „Wir versprechen Ihnen“ (Jamil, Talk qh87y3sj #5336: „drastisch kürzen … unsere Versprechen aufzählen“): fünf kurze Versprechen,
 *  je ein Satz mit eigenem Linien-Icon (src/components/Icon.astro). Ersetzt „So arbeiten wir.“ mit den drei langen Prinzipien
 *  Verantwortung, Einfachheit, Verlässlichkeit (#5192/#5194; Sicherung Branch vor-versprechen-20261109). Jamils „jederzeit“ beim
 *  vierten Versprechen bewusst weggelassen (kein absolutes Versprechen). */
export const PRINZIPIEN: { titel: string; liste: { icon: IconName; text: string }[] } = {
  titel: 'Wir versprechen Ihnen',
  liste: [
    { icon: 'idee', text: 'Wir denken mit und sagen offen, wenn es einen besseren Weg gibt.' },
    { icon: 'target', text: 'Wir empfehlen, was zu Ihnen passt, auch wenn es für uns nicht die lukrativste Wahl ist.' },
    { icon: 'ablauf', text: 'Sie beschreiben das Ziel, wir kümmern uns um den Weg dorthin.' },
    { icon: 'eye', text: 'Sie wissen, woran Sie sind.' },
    { icon: 'impuls', text: 'Offene Punkte gehen wir zügig an, statt sie liegen zu lassen.' },
  ],
};
