// Navigation mit Dropdown-Gruppen (Bauwelt-Muster): Desktop Dropdown, mobil aufklappbare Gruppen.
// „Branchen“ entfernt (Jamil, Talk qh87y3sj #5261, 09.11.2026); die Seiten /website-fuer/ sind gelöscht und leiten auf /leistungen/ weiter (#5322).
// „Leistungen“ (Jamil, Talk qh87y3sj #5274 Vorschlag, #5276 „ok“, 09.11.2026): die vier Gruppen der Kundenreise mit den
// 13 neuen Leistungsseiten (menuTitel + kurz aus src/content/leistungen/), auf dem Desktop als Mega-Panel in vier Spalten.
// Bei „Gefunden werden“ und „Vertrauen gewinnen“ steht zusätzlich der Paket-Hinweis (tag), keine Preise.
// Der Altbestand (src/config/leistungen.ts) ist nicht mehr im Menü.
import type { IconName } from './site';

export type NavChild = { label: string; path: string; icon?: IconName; desc?: string; group?: string; tag?: string };
export type NavItem = { label: string; path?: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    // Jamil #7242 (24.11.2026): nur noch zwei Leistungen – Websites und individuelle Software (Web-App).
    // Vorher das Mega-Menü der vier Kundenreise-Gruppen (LEISTUNGEN_META); die einzelnen Leistungsseiten
    // bleiben über /leistungen/ und den Footer erreichbar.
    label: 'Leistungen',
    children: [
      { label: 'Websites', path: '/leistungen/website/', icon: 'layout', desc: 'Gefunden werden und aus Besuchern Anfragen machen' },
      { label: 'Individuelle Software (Web-App)', path: '/leistungen/software/', icon: 'code', desc: 'Software nach Maß, genau für Ihre Abläufe' },
    ],
  },
  { label: 'Preise', path: '/preise/' },
  // „Wissen“ bündelt Ratgeber, Häufige Fragen und Blog (Jamil, Talk qh87y3sj #5264, 09.11.2026); Übersicht /wissen/
  {
    label: 'Wissen',
    children: [
      { label: 'Ratgeber', path: '/ratgeber/', icon: 'book', desc: 'Website, Software und Cloud kurz erklärt' },
      { label: 'Häufige Fragen', path: '/fragen/', icon: 'frage', desc: 'Antworten zu Paketen, Ablauf und Vertrag' },
      { label: 'Blog', path: '/blog/', icon: 'pen', desc: 'Beiträge und Einblicke aus unserer Arbeit' },
      // „Alles im Überblick“ entfernt (Jamil, Talk qh87y3sj #5675, 12.11.2026); /wissen/ bleibt über den Footer erreichbar
    ],
  },
  {
    label: 'Unternehmen',
    children: [
      { label: 'Warum webgold', path: '/warum-wir/', icon: 'compass', desc: 'Was uns von anderen Anbietern unterscheidet' }, // Adresse seit Jamil #6057 Fr. 37 (vorher /warum-waybuild/)
      { label: 'Über uns', path: '/ueber-uns/', icon: 'user', desc: 'Wer hinter webgold steht' },
      { label: 'Beispiele', path: '/beispiele/', icon: 'eye', desc: 'Echte Projekte unserer Kunden' },
      { label: 'So kann es laufen', path: '/so-kann-es-laufen/', icon: 'rocket', desc: 'Film: Website und Web-App im Alltag' }, // Jamil #6055 Fr. 34
      { label: 'Kontakt', path: '/kontakt/', icon: 'chat', desc: 'Erstberatung, Telefon, WhatsApp' },
    ],
  },
];
