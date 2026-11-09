// /llms.txt – kompakte Zusammenfassung für KI-Suchen (ChatGPT, Perplexity, Gemini …).
// Wird beim Build aus der Konfiguration erzeugt, damit Angebot & Leistungen immer aktuell sind.
import type { APIRoute } from 'astro';
import { company, faqs, isMissing, PHONE_IS_PLACEHOLDER, WAAS, INKLUSIVE, MODELL, OFFER, BERATUNG_THEMEN, PAKETE, IN_ALLEN, PREIS_HINWEIS, formatEuro, brutto, HOURS, einmaligZeile } from '../config/site';
import { EINMALIG_DAZU, AUF_ANFRAGE, aboPreisAb } from '../config/pakete-abo';
import { absolute } from '../lib/paths';
import { gruppenMitLeistungen } from '../config/leistungen-neu';
import { ZIELGRUPPEN, PLATTFORM } from '../config/home';
import { getCollection } from 'astro:content';
import { CLAIM, BOTSCHAFT } from '../config/startseite';
import { V_HERO, KUNDENREISE, VERGLEICH, ZEITLEISTE } from '../config/variante';
import { VORGEHEN, PRINZIPIEN } from '../config/vorgehen';

export const GET: APIRoute = async ({ site }) => {
  const artikel = await getCollection('ratgeber');
  // Leistungen NEU: 4 Gruppen / 13 Leistungen (Jamil, Talk qh87y3sj #5274/#5276); Altbestand nicht mehr aufgeführt
  const gruppen = await gruppenMitLeistungen();
  // Blog (Jamil #5264): nur freigegebene Beiträge, Entwürfe (draft: true) bleiben draußen
  const blog = (await getCollection('blog')).filter((b) => !b.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const url = (p: string) => absolute(p, site);
  const lines = [
    `# ${company.legalName}`,
    '',
    `> ${company.name} aus ${company.city} (bei Hamburg) erstellt und betreut Websites für kleine und mittlere Unternehmen (nur B2B) als Website as a Service: in drei festen Monatspaketen (${PAKETE.map((p) => p.name).join(', ')}) ab ${formatEuro(aboPreisAb())} im Monat netto zzgl. MwSt., ohne Einrichtungskosten und ohne Seitenbegrenzung. Langfristig baut ${company.name} daraus digitale Unternehmensplattformen. Leitsatz: ${company.slogan}`,
    '',
    PREIS_HINWEIS,
    '',
    `## Startseite: ${V_HERO.titel.replace(/\.$/, '')}`,
    `${V_HERO.titel} ${V_HERO.unter}`,
    `- ${BOTSCHAFT.service}`,
    `- ${KUNDENREISE.titel} ${KUNDENREISE.intro} Die Kundenreise in fünf Stationen: ${KUNDENREISE.stationen.map((st) => `${st.name} (${st.frage} Im besten Fall: ${st.antwort})`).join('; ')}. ${KUNDENREISE.schluss}`,
    `- ${VORGEHEN.titel}: ${VORGEHEN.unter} ${VORGEHEN.intro} ${VORGEHEN.ueberleitung} ${VORGEHEN.schritte.map((s, i) => `${i + 1}. ${s.wort}: ${s.text}${s.betont ? ` ${s.betont}` : ''}${s.hinweis ? ` ${s.hinweis}` : ''}`).join(' ')}`,
    `- ${PRINZIPIEN.titel} ${PRINZIPIEN.liste.map((p) => `${p.wort}: ${p.leit} ${p.zeilen.join(' ')} ${p.schluss.join(' ')}`).join(' ')}`,
    `- Drei feste Monatspakete: ${PAKETE.map((p) => `${p.name} ${formatEuro(p.preis)}`).join(', ')} im Monat netto zzgl. MwSt., ohne Einrichtungskosten. Einmalig dazubuchbar: ${einmaligZeile()} (Festpreis netto). Auf Anfrage: ${AUF_ANFRAGE.join(', ')}.`,
    `- Vergleich nach Anbieter-Art (${VERGLEICH.spalten.join(', ')}): ${VERGLEICH.zeilen.map((z) => `${z.frage} waybuild: ${z.werte[3]}`).join('; ')}. ${VERGLEICH.hinweis}`,
    `- Leitsatz: ${CLAIM}`,
    '',
    `## Das Angebot: ${WAAS.name}`,
    `${WAAS.claim} Drei feste Monatspakete ohne Einrichtungskosten; Logo, Geschäftspapiere, Visitenkarten und E-Mail-Signatur sind einmalig dazubuchbar. ${OFFER}`,
    `- In allen Paketen: ${IN_ALLEN.join(', ')}.`,
    `- Enthalten: ${INKLUSIVE.map((i) => i.title).join(', ')}.`,
    `- Geschäftsmodell: ${MODELL.join(', ')}.`,
    ...PAKETE.map((p) => `- Paket ${p.name}: ${formatEuro(p.preis)} pro Monat netto zzgl. MwSt. (${formatEuro(brutto(p.preis))} inkl. MwSt.). ${p.kurz}. ${p.features.join(', ')}.`),
    `- ${EINMALIG_DAZU.titel} (einmaliger Festpreis netto zzgl. MwSt., keine monatlichen Kosten): ${EINMALIG_DAZU.liste.map((e) => `${e.name} ${formatEuro(e.preis)} (${e.text.replace(/\.$/, '')})`).join('; ')}; Gesamtpaket ${EINMALIG_DAZU.gesamt.name} ${formatEuro(EINMALIG_DAZU.gesamt.preis)} statt ${formatEuro(EINMALIG_DAZU.liste.reduce((s, e) => s + e.preis, 0))}.`,
    '- Buchung: Auf den Paketkarten führt „Direkt buchen“ zu einem Fenster mit den Extras und dann zum Kontaktformular mit Vorauswahl. Kein Online-Kauf: Vertrag und Auftragsbestätigung kommen per E-Mail, erst damit ist die Buchung verbindlich.',
    `- Laufzeit: ${WAAS.laufzeit} (mit einem Monat Frist zum Monatsende).`,
    `- Ablauf: ${ZEITLEISTE.map((s, i) => `${i + 1}. ${s.titel}`).join(', ')}. Online in der Regel innerhalb von 14 Tagen, nachdem die Inhalte vorliegen.`,
    '- Service-Versprechen: bei uns antwortet ein Mensch, keine Maschine (fester Ansprechpartner), Änderungen per Sprachnachricht, kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr), Antwort in der Regel am nächsten Werktag, Technik (Hosting, Updates, Backups) inklusive, keine Überraschungen auf der Rechnung.',
    `- Arbeitsweise: zuerst persönliche Beratung (${BERATUNG_THEMEN.join(', ')}), danach eine KI-gestützte und deshalb schnelle Umsetzung, anschließend laufende Verbesserung. Strategie und Ideen kommen von Menschen.`,
    `- Zielgruppe: ${ZIELGRUPPEN.map((z) => z.title).join(', ')}.`,
    '',
    '## Leistungen (entlang der Kundenreise, je Leistung eine eigene Seite)',
    ...gruppen.flatMap((g) => [
      `### ${g.titel}`,
      g.text,
      ...g.eintraege.map((l) => `- [${l.data.menuTitel}: ${l.data.title}](${url(`/leistungen/${l.id}/`)}): ${l.data.kurz} Paket: ${l.data.paket}.`),
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
    `- [Leistungen](${url('/leistungen/')}): alle Leistungen in vier Gruppen (${gruppen.map((g) => g.titel).join(', ')})`,
    `- [Beispiele](${url('/beispiele/')}): echte Projekte unserer Kunden, Bereich Websites`,
    `- [Preise](${url('/preise/')}): ${PAKETE.map((p) => `${p.name} ${formatEuro(p.preis)}`).join(' / ')} pro Monat, netto zzgl. MwSt.`,
    `- [Warum waybuild](${url('/warum-waybuild/')}): Vergleich der Anbieter-Typen Baukasten, Freelancer, Agentur und waybuild`,
    `- [Wissen](${url('/wissen/')}): Übersicht über Ratgeber, Häufige Fragen und Blog`,
    `- [Häufige Fragen](${url('/fragen/')}): Pakete und Preise, Ablauf, Technik und Vertrag`,
    `- [Blog](${url('/blog/')}): Beiträge zu Websites, Sichtbarkeit bei Google und KI-Suche`,
    `- [Über uns](${url('/ueber-uns/')})`,
    `- [Kontakt](${url('/kontakt/')}): kostenlose Erstberatung`,
    '',
    '## Ratgeber',
    ...artikel.map((a) => `- [${a.data.title}](${url(`/ratgeber/${a.id}/`)}): ${a.data.kurz.join(' ')}`),
    '',
    ...(blog.length ? ['## Blog', ...blog.map((b) => `- [${b.data.title}](${url(`/blog/${b.id}/`)}): ${b.data.description}`), ''] : []),
    '## Kontakt',
    `- E-Mail: ${company.email}`,
    ...(isMissing(company.phone) || PHONE_IS_PLACEHOLDER ? [] : [`- Telefon: ${company.phone}`]),
    `- Anschrift: ${company.legalName}, ${company.street}, ${company.zip} ${company.city}`,
    `- Erreichbar: ${HOURS}`,
    `- Erstberatung: kostenlos und unverbindlich, Anfrage über ${url('/kontakt/')}`,
    '',
    '## Für wen nicht',
    '- Privatpersonen: Das Angebot richtet sich ausschließlich an Unternehmen, Selbstständige und Institutionen.',
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
