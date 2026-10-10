// Navigation mit Dropdown-Gruppen (Bauwelt-Muster): Desktop Dropdown, mobil aufklappbare Gruppen.
import { leistungen } from './leistungen';
import { branchen } from './branchen';
import type { IconName } from './site';

export type NavChild = { label: string; path: string; icon?: IconName; desc?: string };
export type NavItem = { label: string; path?: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: 'Leistungen',
    children: [
      ...leistungen.map((l) => ({ label: l.title, path: `/leistungen/${l.slug}/`, icon: l.icon, desc: l.teaser.split(' – ')[0].split('. ')[0] })),
      { label: 'Alle Leistungen', path: '/leistungen/' },
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
      { label: 'Über uns', path: '/ueber-uns/', icon: 'user', desc: 'Wer hinter waybuild steht' },
      { label: 'Referenzen', path: '/referenzen/', icon: 'eye', desc: 'Beispiele unserer Arbeit' },
      { label: 'Warum kein WordPress', path: '/#warum', icon: 'gauge', desc: 'Eigene Technologie statt Baukasten' },
      { label: 'Ratgeber', path: '/ratgeber/', icon: 'doc', desc: 'Wissen rund um Ihre Website' },
      { label: 'Kontakt', path: '/kontakt/', icon: 'chat', desc: 'Erstgespräch, Telefon, WhatsApp' },
    ],
  },
];
