// /llms.txt – kompakte Zusammenfassung für KI-Suchen (ChatGPT, Perplexity, Gemini …).
// Wird beim Build aus der Konfiguration erzeugt, damit Angebot & Leistungen immer aktuell sind.
import type { APIRoute } from 'astro';
import { company, faqs, isMissing, PHONE_IS_PLACEHOLDER, WAAS, INKLUSIVE, MODELL, OFFER, BERATUNG_THEMEN, PAKETE, formatEuro, steps, HOURS } from '../config/site';
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
    `> ${company.name} aus ${company.city} (bei Hamburg) erstellt und betreut Websites für kleine und mittlere Unternehmen (nur B2B) als Website as a Service: ab ${formatEuro(Math.min(...PAKETE.map((p) => p.preis)))} im Monat netto, ohne Einrichtungskosten. Langfristig baut ${company.name} daraus digitale Unternehmensplattformen. Leitsatz: ${company.slogan}`,
    '',
    NETTO_HINWEIS,
    '',
    `## Das Angebot: ${WAAS.name}`,
    `${WAAS.claim} Zwei Varianten. ${OFFER}`,
    `- Enthalten: ${INKLUSIVE.map((i) => i.title).join(', ')}.`,
    `- Geschäftsmodell: ${MODELL.join(', ')}.`,
    ...PAKETE.map((p) => `- ${p.name}: ${formatEuro(p.preis)} pro Monat, netto zzgl. MwSt. ${p.kurz}. ${p.features.join(', ')}.`),
    `- Ablauf: ${steps.map((s, i) => `${i + 1}. ${s.title}`).join(', ')}. Online spätestens 14 Tage, nachdem die Inhalte vorliegen.`,
    '- Service-Versprechen: immer ein Mensch als fester Ansprechpartner, Änderungen per Sprachnachricht, kleine Änderungen oft in Minuten online, Antwort spätestens am nächsten Werktag, Technik (Hosting, Updates, Backups) inklusive, keine Überraschungen auf der Rechnung.',
    `- Arbeitsweise: zuerst persönliche Beratung (${BERATUNG_THEMEN.join(', ')}), danach eine KI-gestützte und deshalb schnelle Umsetzung, anschließend laufende Verbesserung. Strategie und Ideen kommen von Menschen.`,
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
    '## Vision',
    `- Langfristig: ein digitales Betriebssystem für KMU mit ${PLATTFORM.map((p) => p.title.replace(/­/g, '')).join(', ')}. Die Website ist der erste Schritt.`,
    '',
    '## Häufige Fragen',
    ...faqs.map((f) => `- ${f.q} ${f.a}`),
    '',
    '## Seiten',
    `- [Startseite](${url('/')})`,
    `- [Leistungen](${url('/leistungen/')}): Website as a Service und Ausbaustufen`,
    `- [Preise](${url('/preise/')}): ${PAKETE.map((p) => `${p.name} ${formatEuro(p.preis)}`).join(' / ')} pro Monat, netto`,
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
    `- Erreichbar: ${HOURS}`,
    `- Erstgespräch: kostenlos und unverbindlich, Anfrage über ${url('/kontakt/')}`,
    '',
    '## Für wen nicht',
    '- Privatpersonen: Das Angebot richtet sich ausschließlich an Unternehmen, Selbstständige und Institutionen.',
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
