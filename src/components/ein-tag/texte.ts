// Texte der Test-Seite „Ein Tag mit der Web-App“ (Jamil, Talk qh87y3sj #7102/#7107, freigegeben #7108 „ja baue eine Vorschau“).
// Neutral, ohne Branchenbeispiele. Je Station nur ein Satz unter dem Bildschirm (Jamil #7102: weniger Text, mehr zeigen).

export const EIN_TAG_SEITE = {
  titel: 'Ein Tag mit der Web-App',
  description: 'Ein Arbeitstag von 07:30 bis 18:00: Was eine eigene Web-App in jedem Moment für Ihren Betrieb erledigt.',
  kennzeile: 'Vorschau',
  h1: 'Ein Tag mit der ==Web-App==',
  lead: 'Scrollen Sie durch einen ganz normalen Arbeitstag. Rechts sehen Sie, was die App in diesem Moment für Sie erledigt.',
};

export type StationId = 'start' | 'vorort' | 'portal' | 'buero' | 'feierabend';

export interface Station {
  id: StationId;
  zeit: string; // HH:MM
  titel: string;
  satz: string;
  geraet: 'handy' | 'laptop';
}

export const STATIONEN: Station[] = [
  { id: 'start', zeit: '07:30', titel: 'Der Tag startet', satz: 'Die Termine des Tages stehen bereit, ein Tipp öffnet die Adresse.', geraet: 'handy' },
  { id: 'vorort', zeit: '10:00', titel: 'Vor Ort', satz: 'Das Foto landet direkt beim richtigen Kunden.', geraet: 'handy' },
  { id: 'portal', zeit: '13:00', titel: 'Der Kunde fragt nicht mehr nach', satz: 'Ihr Kunde sieht selbst, wie weit sein Auftrag ist.', geraet: 'handy' },
  { id: 'buero', zeit: '16:00', titel: 'Im Büro', satz: 'Alles ist auf einen Blick da, nichts wird abgetippt.', geraet: 'laptop' },
  { id: 'feierabend', zeit: '18:00', titel: 'Feierabend', satz: 'Der Tag ist erledigt und dokumentiert.', geraet: 'handy' },
];

export const EIN_TAG_SCHLUSS = {
  titel: 'So kann Ihr Alltag aussehen.',
  frage: 'Welche Funktion fehlt Ihnen?',
  knopf: 'Kostenlose Erstberatung',
};
