// /llms.txt – kompakte Zusammenfassung für KI-Suchen (ChatGPT, Perplexity, Gemini …).
// Wird beim Build aus der Konfiguration erzeugt, damit Preise & Leistungen immer aktuell sind.
import type { APIRoute } from 'astro';
import { company, plans, usps, faqs, allPlansInclude, isMissing, SETUP_FEE, OFFER, PHONE_IS_PLACEHOLDER } from '../config/site';
import { absolute } from '../lib/paths';
import { branchen } from '../config/branchen';
import { leistungen, leistungenNach, leistungAb } from '../config/leistungen';
import { SAEULEN, ABO_UEBERSICHT, STUNDENSATZ, TAGESSATZ, NETTO_HINWEIS, ABO_LAUFZEIT, type Paket } from '../config/angebot';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const artikel = await getCollection('ratgeber');
  const url = (p: string) => absolute(p, site);
  const list = (items: string[]) => items.join(', ').replace(/\.$/, '');
  const lines = [
    `# ${company.legalName}`,
    '',
    `> ${company.slogan} B2B-Anbieter aus ${company.city} für kleine und mittlere Unternehmen in Deutschland: Websites im Abo (ohne WordPress, mit Hosting, Domain, unbegrenzten E-Mail-Postfächern und Wartung), individuelle Software und Web-Entwicklung, Nextcloud-Hosting, Cloud- und IT-Betreuung sowie Wettbewerbsanalysen – aus einer Hand zu festen Preisen.`,
    '',
    `${NETTO_HINWEIS}`,
    '',
    '## Leistungen nach Bereichen',
    ...SAEULEN.flatMap((s) => [
      `### ${s.title} (${s.ab})`,
      s.claim,
      ...leistungenNach(s.id).map((l) => `- [${l.title}](${url(`/leistungen/${l.slug}/`)}): ${l.teaser} ${leistungAb(l)}.`),
      '',
    ]),
    '## Pakete & Preise außerhalb des Website-Abos (netto)',
    ...leistungen.filter((l) => l.pakete).flatMap((l) => [
      `### ${l.title}`,
      ...l.pakete!.map((p: Paket) => `- ${p.name}: ${p.preis} ${p.einheit}${p.hinweis ? ` (${p.hinweis})` : ''}. ${p.features.join(', ')}.`),
      ...(l.zusatz ?? []).map((z) => `- ${z.name}: ${z.preis}`),
      '',
    ]),
    `- Stundensatz ${STUNDENSATZ} €, Tagessatz ${TAGESSATZ} € (netto). Abos: ${ABO_LAUFZEIT}.`,
    '',
    '## Alle Abos auf einen Blick',
    ...ABO_UEBERSICHT.map((a) => `- ${a.name}: ${a.preis} – ${a.inhalt}`),
    '',
    '## Website-Tarife (Preise netto zzgl. 19 % USt.)',
    `Angebot: ${OFFER}`,
    ...plans.map((p) => `- ${p.name} (${p.tagline}): ${p.monthly} € / Monat. ${list(p.features)}.`),
    `- In jedem Tarif: ${allPlansInclude.join(', ')}.`,
    `- Einrichtung einmalig ${SETUP_FEE} € für alle Tarife – entfällt bei jährlicher Zahlung. Mindestlaufzeit 12 Monate, danach monatlich kündbar.`,
    '',
    '## Besonderheiten',
    ...usps.map((u) => `- ${u.title}: ${u.text}`),
    '',
    '## Häufige Fragen',
    ...faqs.map((f) => `- ${f.q} ${f.a}`),
    '',
    '## Seiten',
    `- [Startseite](${url('/')})`,
    `- [Leistungen](${url('/leistungen/')}): Websites, Software, Cloud & IT, Beratung`,
    `- [Preise](${url('/preise/')}): Website-Tarife, Software-Projekte, Pflege-Abos, Nextcloud, IT-Betreuung, Wettbewerbsanalyse, Stundensätze`,
    `- [Warum waybuild](${url('/warum-waybuild/')}): Vergleich der Anbieter-Typen Baukasten, Freelancer, Agentur und waybuild`,
    `- [Über uns](${url('/ueber-uns/')})`,
    `- [Kontakt](${url('/kontakt/')}): kostenloses Erstgespräch`,
    '',
    '## Branchen',
    ...branchen.map((b) => `- [Website für ${b.name}](${url(`/website-fuer/${b.slug}/`)}): ${b.claim}`),
    '',
    '## Ratgeber',
    ...artikel.map((a) => `- [${a.data.title}](${url(`/ratgeber/${a.id}/`)}): ${a.data.kurz.join(' ')}`),
    '',
    '## Kontakt',
    `- E-Mail: ${company.email}`,
    ...(isMissing(company.phone) || PHONE_IS_PLACEHOLDER ? [] : [`- Telefon: ${company.phone}`]),
    `- Anschrift: ${company.legalName}, ${company.street}, ${company.zip} ${company.city}`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
