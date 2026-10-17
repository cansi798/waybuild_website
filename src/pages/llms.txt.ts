// /llms.txt – kompakte Zusammenfassung für KI-Suchen (ChatGPT, Perplexity, Gemini …).
// Wird beim Build aus der Konfiguration erzeugt, damit Angebot & Leistungen immer aktuell sind.
import type { APIRoute } from 'astro';
import { company, faqs, isMissing, PHONE_IS_PLACEHOLDER, WAAS, INKLUSIVE, MODELL, OFFER, BERATUNG_THEMEN, preisLang } from '../config/site';
import { absolute } from '../lib/paths';
import { branchen } from '../config/branchen';
import { leistungenNach } from '../config/leistungen';
import { SAEULEN, NETTO_HINWEIS } from '../config/angebot';
import { ZIELGRUPPEN, PLATTFORM } from '../config/home';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const artikel = await getCollection('ratgeber');
  const url = (p: string) => absolute(p, site);
  const lines = [
    `# ${company.legalName}`,
    '',
    `> Keine klassische Webagentur: ${company.name} baut digitale Unternehmensplattformen für kleine und mittlere Unternehmen (B2B) aus ${company.city}. ${company.slogan}`,
    '',
    NETTO_HINWEIS,
    '',
    `## Das Angebot: ${WAAS.name}`,
    `${WAAS.claim} Bewusst keine Pakete oder Tarife – eine Lösung. ${OFFER}`,
    `- Enthalten: ${INKLUSIVE.map((i) => i.title).join(', ')}.`,
    `- Geschäftsmodell: ${MODELL.join(', ')}.`,
    `- Preis: ${preisLang()}.`,
    `- Arbeitsweise: persönliche Beratung (${BERATUNG_THEMEN.join(', ')}), danach KI-gestützte Umsetzung in Rekordzeit, dann kontinuierliche Verbesserung. KI ersetzt keine guten Ideen – sie beschleunigt die Umsetzung.`,
    `- Zielgruppe: ${ZIELGRUPPEN.map((z) => z.title).join(', ')}.`,
    '',
    '## Was wir im Rahmen von Website as a Service bauen',
    ...leistungenNach('websites').map((l) => `- [${l.title}](${url(`/leistungen/${l.slug}/`)}): ${l.teaser}`),
    '',
    '## Ausbaustufen auf Anfrage (individuelles Angebot)',
    ...SAEULEN.filter((s) => s.id !== 'websites').flatMap((s) => [
      `### ${s.title}`,
      s.claim,
      ...leistungenNach(s.id).map((l) => `- [${l.title}](${url(`/leistungen/${l.slug}/`)}): ${l.teaser}`),
      '',
    ]),
    '## Vision (in Entwicklung, noch kein Produkt)',
    '- Die intelligente Website: verbindet Besucherstatistiken, Anfragen, Suchbegriffe, CRM-Daten, Search Console, Bewertungen, Referenzen, Angebots- und Conversion-Daten und verbessert sich kontinuierlich – vom digitalen Schaufenster zum aktiven Vertriebsmitarbeiter.',
    `- Langfristig: ein digitales Betriebssystem für KMU mit ${PLATTFORM.map((p) => p.title.replace(/­/g, '')).join(', ')}. Die Website ist der erste Schritt.`,
    '',
    '## Häufige Fragen',
    ...faqs.map((f) => `- ${f.q} ${f.a}`),
    '',
    '## Seiten',
    `- [Startseite](${url('/')})`,
    `- [Leistungen](${url('/leistungen/')}): Website as a Service und Ausbaustufen`,
    `- [Preis](${url('/preise/')}): ein Angebot, ein fester Monatspreis`,
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
