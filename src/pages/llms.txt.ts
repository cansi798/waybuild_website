// /llms.txt – kompakte Zusammenfassung für KI-Suchen (ChatGPT, Perplexity, Gemini …).
// Wird beim Build aus der Konfiguration erzeugt, damit Preise & Leistungen immer aktuell sind.
import type { APIRoute } from 'astro';
import { company, plans, usps, faqs, allPlansInclude, isMissing, SETUP_FEE, OFFER } from '../config/site';
import { absolute } from '../lib/paths';
import { branchen } from '../config/branchen';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const artikel = await getCollection('ratgeber');
  const url = (p: string) => absolute(p, site);
  const list = (items: string[]) => items.join(', ').replace(/\.$/, '');
  const lines = [
    `# ${company.legalName}`,
    '',
    `> ${company.slogan} Websites im Abo für kleine und mittlere Unternehmen in Deutschland – ohne WordPress, mit Hosting, Domain, unbegrenzten E-Mail-Postfächern und Wartung zum festen Monatspreis.`,
    '',
    '## Tarife (Preise netto zzgl. 19 % USt.)',
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
    `- [Leistungen](${url('/leistungen/')}): Webdesign, Hosting, E-Mail, Domain, SEO, Wartung`,
    `- [Preise](${url('/preise/')}): Tarife, Jahrespreise, Zusatzleistungen`,
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
    ...(isMissing(company.phone) ? [] : [`- Telefon: ${company.phone}`]),
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
