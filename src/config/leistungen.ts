// Leistungs-Stammdaten (Altbestand, verschlankt). Die alten Leistungsseiten /leistungen/<slug>/ sind gelöscht (Jamil, Talk
// qh87y3sj #5322, Q6) und leiten weiter (ALT_WEITERLEITUNGEN in leistungen-neu.ts); die neuen Leistungen stehen in
// src/content/leistungen/. Diese Liste liefert nur noch, was andere Seiten lesen: Ausbaustufen auf /preise/, die Auswahl
// „Worum geht es?“ und ?leistung=<slug> im Kontaktformular sowie die Empfehlungsbox der Ratgeber-Artikel (Feld leistung).
import { WAAS, paketVon, formatEuro } from './site';
import type { AboPaket } from './pakete-abo';
import type { Saeule } from './angebot';

export type Leistung = {
  slug: string;
  saeule: Saeule;
  title: string;
  /** Kurztext (Ratgeber-Empfehlungsbox) */
  teaser: string;
  /** Nur Website-Leistungen: ab welchem Paket enthalten (ohne `ab` = Paket klären wir im Erstgespräch) */
  paket?: { ab?: AboPaket['id'] };
};

export const leistungen: Leistung[] = [
  { saeule: 'websites', slug: 'business-website', title: 'Business-Website', teaser: 'Leistungen, Team, Referenzen und Kontakt, so geplant, dass Anfragen kommen.', paket: { ab: 'basis' } },
  { saeule: 'websites', slug: 'online-shop', title: 'Online-Shop', teaser: 'Produkte, Warenkorb, Bezahlung und Versand in einem Shop, der zu Ihrem Sortiment passt.' },
  { saeule: 'websites', slug: 'landingpage', title: 'Landingpage', teaser: 'Eine Seite für eine Kampagne, ein Produkt oder eine Dienstleistung, schnell online.', paket: { ab: 'basis' } },
  { saeule: 'websites', slug: 'website-relaunch', title: 'Website-Relaunch', teaser: 'Ihre bestehende Seite ist langsam, unsicher oder veraltet? Wir bauen sie neu, ohne dass sie ausfällt.', paket: { ab: 'basis' } },
  { saeule: 'websites', slug: 'betreuung-pflege', title: 'Betreuung & Verbesserung', teaser: 'Wartung, Backups, Sicherheit und Änderungen, dazu laufende Verbesserungen. Alles über einen Ansprechpartner.', paket: { ab: 'basis' } },
  { saeule: 'software', slug: 'individuelle-software', title: 'Individuelle Software', teaser: 'Maßgeschneiderte Programme, Tools und Automatisierungen für Unternehmen.' },
  { saeule: 'software', slug: 'software-webentwicklung', title: 'Software- & Webentwicklung', teaser: 'Kundenportale, Buchungssysteme, Dashboards und Schnittstellen, von Konzept bis Betrieb.' },
  { saeule: 'cloud', slug: 'nextcloud', title: 'Nextcloud für Unternehmen', teaser: 'Dateien, Kalender, Videocalls und Office in Ihrer eigenen Cloud, auf Wunsch in Ihrem Design.' },
  { saeule: 'cloud', slug: 'cloud-it', title: 'Cloud- & IT-Lösungen', teaser: 'Server, Backups, Arbeitsplätze und Betreuung: sicher eingerichtet und laufend betreut.' },
  { saeule: 'beratung', slug: 'wettbewerbsanalyse', title: 'Wettbewerbsanalyse', teaser: 'Vergleichbare Anbieter, Leistungen, Preise und Ihre Vorteile, klar aufbereitet.' },
  { saeule: 'software', slug: 'abo-wartung', title: 'Betreuung im Abo', teaser: `Statt vieler Abos: ${WAAS.name}. Betreuung für Software, Cloud und IT auf Anfrage.` },
];

export const leistungBySlug = (slug: string) => leistungen.find((l) => l.slug === slug);
export const leistungenNach = (saeule: Saeule) => leistungen.filter((l) => l.saeule === saeule);
/** Kurz-Label: ab welchem Paket (Preis aus pakete-abo.ts) bzw. „auf Anfrage“. */
export const leistungAb = (l: Leistung) => {
  if (l.saeule !== 'websites') return 'Ausbaustufe · auf Anfrage';
  if (!l.paket?.ab) return `Im ${WAAS.name}`;
  const p = paketVon(l.paket.ab);
  return `Ab Paket ${p.name} · ${formatEuro(p.preis)} / Monat`;
};
