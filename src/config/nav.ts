// Navigation mit Dropdown-Gruppen (Bauwelt-Muster): Desktop Dropdown, mobil aufklappbare Gruppen.
// „Leistungen“ ist nach Säulen gruppiert (group) und wird auf dem Desktop als mehrspaltiges Panel gezeigt.
import { leistungen, leistungAb } from './leistungen';
import { branchen } from './branchen';
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
  {
    label: 'Branchen',
    children: [
      ...branchen.map((b) => ({ label: b.name, path: `/website-fuer/${b.slug}/`, icon: 'globe' as IconName, desc: b.claim })),
      { label: 'Alle Branchen', path: '/website-fuer/' },
    ],
  },
  { label: 'Preise', path: '/preise/' },
  {
    label: 'Unternehmen',
    children: [
      { label: 'Warum waybuild', path: '/warum-waybuild/', icon: 'compass', desc: 'Was uns von anderen Anbietern unterscheidet' },
      { label: 'Über uns', path: '/ueber-uns/', icon: 'user', desc: 'Wer hinter waybuild steht' },
      { label: 'Referenzen', path: '/referenzen/', icon: 'eye', desc: 'Muster-Beispiele unserer Arbeit' },
      { label: 'Ratgeber', path: '/ratgeber/', icon: 'doc', desc: 'Wissen zu Website, Software & Cloud' },
      { label: 'Kontakt', path: '/kontakt/', icon: 'chat', desc: 'Erstgespräch, Telefon, WhatsApp' },
    ],
  },
];
