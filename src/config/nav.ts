// Navigation mit Dropdown-Gruppen (Bauwelt-Muster): Desktop Dropdown, mobil aufklappbare Gruppen.
// „Branchen“ entfernt (Jamil, Talk qh87y3sj #5261, 09.11.2026); die Seiten /website-fuer/ bleiben erreichbar, aber unverlinkt.
// „Leistungen“ ist nach Säulen gruppiert (group) und wird auf dem Desktop als mehrspaltiges Panel gezeigt.
import { leistungen, leistungAb } from './leistungen';
import { SAEULEN } from './angebot';
import type { IconName } from './site';

export type NavChild = { label: string; path: string; icon?: IconName; desc?: string; group?: string };
export type NavItem = { label: string; path?: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: 'Leistungen',
    children: [
      ...SAEULEN.flatMap((s) =>
        leistungen
          .filter((l) => l.saeule === s.id)
          .map((l) => ({ label: l.title, path: `/leistungen/${l.slug}/`, icon: l.icon, desc: leistungAb(l), group: s.title })),
      ),
      { label: 'Alle Leistungen im Überblick', path: '/leistungen/' },
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
      { label: 'Alles im Überblick', path: '/wissen/' },
    ],
  },
  {
    label: 'Unternehmen',
    children: [
      { label: 'Warum waybuild', path: '/warum-waybuild/', icon: 'compass', desc: 'Was uns von anderen Anbietern unterscheidet' },
      { label: 'Über uns', path: '/ueber-uns/', icon: 'user', desc: 'Wer hinter waybuild steht' },
      { label: 'Referenzen', path: '/referenzen/', icon: 'eye', desc: 'Muster-Beispiele unserer Arbeit' },
      { label: 'Kontakt', path: '/kontakt/', icon: 'chat', desc: 'Erstgespräch, Telefon, WhatsApp' },
    ],
  },
];
