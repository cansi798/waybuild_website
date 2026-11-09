// Leistungen NEU (Jamil, Talk qh87y3sj #5274 Vorschlag, #5276 „ok“, 09.11.2026): vier Gruppen entlang der Kundenreise,
// je Leistung eine eigene Seite (Inhalte: src/content/leistungen/<slug>.md). Nur aus der Startseite abgeleitet.
// Der Altbestand (src/config/leistungen.ts) ist seitdem aus Menü, Footer und Übersicht entfernt; die alten Seiten bleiben
// erreichbar, stehen aber auf noindex und fehlen in der Sitemap (Liste: ALT_SLUGS_NOINDEX unten, Jamil entscheidet später).
import { getCollection, type CollectionEntry } from 'astro:content';
import type { IconName } from './site';

export type GruppeId = 'gefunden' | 'vertrauen' | 'anfragen' | 'betreuung';
export type StationId = 'aufmerksamkeit' | 'vertrauen' | 'anfrage' | 'bearbeitung' | 'betreuung';
export type LeistungNeu = CollectionEntry<'leistungen'>;

/** Gruppen in fester Reihenfolge, Slugs je Gruppe genau wie im Vorschlag #5274 */
export const GRUPPEN: { id: GruppeId; titel: string; text: string; slugs: string[] }[] = [
  { id: 'gefunden', titel: 'Gefunden werden', text: 'Damit Kunden Sie bei Google, auf Karten und in sozialen Netzwerken entdecken.', slugs: ['website', 'google-profil', 'suchmaschinen-optimierung', 'social-media'] },
  { id: 'vertrauen', titel: 'Vertrauen gewinnen', text: 'Damit Interessenten verstehen, was Sie anbieten, und sich für Sie entscheiden.', slugs: ['inhalte', 'auftritt', 'bewertungen'] },
  { id: 'anfragen', titel: 'Anfragen und Abläufe', text: 'Damit aus Interesse ein Kontakt wird und keine Anfrage liegen bleibt.', slugs: ['anfragen', 'terminbuchung', 'ablaeufe'] },
  { id: 'betreuung', titel: 'Betreuung und Verbesserung', text: 'Damit Ihre Website aktuell bleibt und aus Kunden zufriedene Kunden werden.', slugs: ['betreuung', 'auswertung', 'nachfassen'] },
];

/** Stationen der Kundenreise (Startseite #kundenreise, Namen wie in variante.ts KUNDENREISE) */
export const STATIONEN: Record<StationId, { nr: number; name: string }> = {
  aufmerksamkeit: { nr: 1, name: 'Aufmerksamkeit' },
  vertrauen: { nr: 2, name: 'Vertrauen' },
  anfrage: { nr: 3, name: 'Anfrage' },
  bearbeitung: { nr: 4, name: 'Bearbeitung' },
  betreuung: { nr: 5, name: 'Betreuung' },
};

/** Symbol je Leistung (Menü, Übersicht) */
export const ICONS: Record<string, IconName> = {
  website: 'layout', 'google-profil': 'pin', 'suchmaschinen-optimierung': 'search', 'social-media': 'users',
  inhalte: 'pen', auftritt: 'stern', bewertungen: 'chat',
  anfragen: 'mail', terminbuchung: 'calendar', ablaeufe: 'ablauf',
  betreuung: 'tools', auswertung: 'chart', nachfassen: 'refresh',
};

/** Menü: Paket-Hinweis nur bei den Stationen 1 und 2 (Gefunden werden, Vertrauen gewinnen), wie im Vorschlag #5274 */
export const PAKET_IM_MENUE: GruppeId[] = ['gefunden', 'vertrauen'];

/** Alte Leistungsseiten (src/config/leistungen.ts), die seit 09.11.2026 unverlinkt und auf noindex stehen.
 *  Muss mit dem Sitemap-Filter in astro.config.mjs übereinstimmen. Löschen/Weiterleiten entscheidet Jamil. */
export const ALT_SLUGS_NOINDEX = [
  'business-website', 'online-shop', 'landingpage', 'website-relaunch', 'betreuung-pflege',
  'individuelle-software', 'software-webentwicklung', 'nextcloud', 'cloud-it', 'wettbewerbsanalyse', 'abo-wartung',
];

export const gruppeById = (id: GruppeId) => GRUPPEN.find((g) => g.id === id)!;

/** Frontmatter der Leistungsseiten SYNCHRON (für Menü/nav.ts, das kein await kennt), Reihenfolge wie GRUPPEN */
type Meta = { slug: string; menuTitel: string; kurz: string; paket: string; gruppe: GruppeId };
const dateien = import.meta.glob<{ frontmatter: Omit<Meta, 'slug'> }>('../content/leistungen/*.md', { eager: true });
export const LEISTUNGEN_META: Meta[] = GRUPPEN.flatMap((g) =>
  g.slugs.flatMap((slug) => {
    const fm = dateien[`../content/leistungen/${slug}.md`]?.frontmatter;
    return fm ? [{ slug, menuTitel: fm.menuTitel, kurz: fm.kurz, paket: fm.paket, gruppe: fm.gruppe }] : [];
  }),
);

/** „auf Anfrage“ einheitlich groß geschrieben anzeigen */
export const paketAnzeige = (p: string) => (p.trim().toLowerCase() === 'auf anfrage' ? 'Auf Anfrage' : p);

/** Alle neuen Leistungen in Gruppen-Reihenfolge */
export async function leistungenNeu(): Promise<LeistungNeu[]> {
  const alle = await getCollection('leistungen');
  const reihe = GRUPPEN.flatMap((g) => g.slugs);
  return alle.sort((a, b) => reihe.indexOf(a.id) - reihe.indexOf(b.id));
}

/** Gruppen mit ihren Einträgen */
export async function gruppenMitLeistungen() {
  const alle = await leistungenNeu();
  return GRUPPEN.map((g) => ({ ...g, eintraege: alle.filter((l) => l.data.gruppe === g.id) }));
}
