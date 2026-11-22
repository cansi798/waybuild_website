// /llms.txt – kompakte Zusammenfassung für KI-Suchen (ChatGPT, Perplexity, Gemini …).
// Wird beim Build aus der Konfiguration erzeugt, damit Angebot & Leistungen immer aktuell sind.
import { ohneHl } from '../lib/hl';
import type { APIRoute } from 'astro';
import { company, faqs, isMissing, PHONE_IS_PLACEHOLDER, FAKTEN, whatsappLink, WAAS, MODELL, OFFER, BERATUNG_THEMEN, PAKETE, IN_ALLEN, PREIS_HINWEIS, formatEuro, brutto, HOURS, einmaligZeile } from '../config/site';
import { EINMALIG_DAZU, AUF_ANFRAGE, aboPreisAb, KOMPLETTPAKET, komplettZeile, kombiPreise, kombiZeile } from '../config/pakete-abo';
import { absolute } from '../lib/paths';
import { gruppenMitLeistungen } from '../config/leistungen-neu';
import { ZIELGRUPPEN, PLATTFORM } from '../config/home';
import { getCollection } from 'astro:content';
import { CLAIM } from '../config/startseite';
import { J_HERO, J_PROBLEM_NEU, J_MASS, J_ERST, J_UMSTIEG, J_PREISE, J_START, ALT_ZEIGEN } from '../config/start-6176';
import { VERGLEICH_START } from '../config/start-vergleich';
import { START_ABLAUF_KURZ } from '../config/start-ablauf';
import { SEITEN_MAX } from '../config/pakete-abo';
import { SICHTBARKEIT, PANELS } from '../config/sichtbarkeit';

export const GET: APIRoute = async ({ site }) => {
  const artikel = await getCollection('ratgeber');
  // Leistungen NEU: 4 Gruppen / 12 Leistungen (Jamil, Talk qh87y3sj #5274/#5276; Social Media entfernt #5630); Altbestand nicht mehr aufgeführt
  const gruppen = await gruppenMitLeistungen();
  // Blog (Jamil #5264): nur freigegebene Beiträge, Entwürfe (draft: true) bleiben draußen
  const blog = (await getCollection('blog')).filter((b) => !b.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const url = (p: string) => absolute(p, site);
  // Komplettpaket (Jamil #5450–#5464): optional zusätzlich zu Basis oder Plus, Kombipreise nicht mit dem Gesamtpaket der Extras
  // Seit Jamil #6400: Software einzeln oder kombinierbar, ohne Kombipreise
  const komplett = kombiPreise().length
    ? `${komplettZeile()} ${KOMPLETTPAKET.kurz} Kombipreise: ${kombiPreise().map(kombiZeile).join('; ')}${KOMPLETTPAKET.kombiMitGruenderpaket ? '' : ` (nicht zusammen mit dem Gesamtpaket „${EINMALIG_DAZU.gesamt.name}“)`}.`
    : `${komplettZeile()} ${KOMPLETTPAKET.kurz} Enthalten: ${KOMPLETTPAKET.software.join(', ')}.`;
  const lines = [
    `# ${company.name} – ein Angebot der ${company.legalName}`, // Jamil #6055 Fr. 22
    '',
    `> ${company.name} aus ${company.city} (bei Hamburg) erstellt und betreut Websites für kleine und mittlere Unternehmen (nur B2B) als Website-Abo, auf Wunsch mit Web-App: in drei Paketen (${PAKETE.map((p) => p.name).join(', ')} und ${KOMPLETTPAKET.name}, kombinierbar oder einzeln) ab ${formatEuro(aboPreisAb())} im Monat netto zzgl. MwSt., ohne Einrichtungskosten, mit bis zu ${SEITEN_MAX} Seiten. Langfristig baut ${company.name} daraus digitale Unternehmensplattformen. Leitsatz: ${company.slogan}`,
    '',
    PREIS_HINWEIS,
    '',
    // Startseite (Loop 22.11.2026, MKT-003): aktuelle Abschnitte nach Jamil #6176–#6518, Texte wörtlich aus config/start-6176.ts.
    // Vorher standen hier Kundenreise, „Umsetzung“, „Ganz entspannt“ und Vorgehen der früheren Startseite (nicht mehr sichtbar).
    `## Startseite: ${J_HERO.titel}`,
    J_HERO.unter,
    `- ${J_HERO.preiszeile.join(' · ')}`,
    `- ${J_PROBLEM_NEU.titel}: ${J_PROBLEM_NEU.karten.map((k) => `${k.titel} (${k.text})`).join('; ')}.`,
    `- ${J_MASS.titel}. ${J_MASS.unter} Beispiele aus dem Alltag: ${J_MASS.schritte.slice(0, ALT_ZEIGEN.individuellTab ? 4 : 3).map((st) => `${st.titel}: ${st.zeigt}`).join(' ')} ${J_MASS.browserKurz}.`,
    `- ${J_ERST.titel} ${J_ERST.unter} ${J_ERST.karten.map((k) => `${k.nr} ${k.titel}: ${'varianten' in k ? k.varianten.map((v) => v.text).join(' ') : 'punkte' in k ? `${k.einleitung} ${k.punkte.map((pk) => `${pk.name} ${pk.text}`).join('; ')}. ${k.schluss}` : k.text}`).join(' ')}`,
    `- ${J_UMSTIEG.titel}. ${J_UMSTIEG.unter} ${J_UMSTIEG.karten.map((k) => `${k.frage} ${k.antwort}`).join(' ')}`,
    `- ${J_PREISE.titel} ${J_PREISE.unter} ${J_PREISE.hinweis}`,
    `- ${J_START.titel} ${J_START.unter} Weg 1: ${J_START.gespraech.art}, ${J_START.gespraech.titel}: ${J_START.gespraech.text} Weg 2: ${J_START.schnell.art}, ${J_START.schnell.titel}: ${J_START.schnell.text} Beide Wege über das Formular unten auf der Startseite (${url('/#kontakt-start')}) oder über ${url('/kontakt/')}.`,
    `- ${VERGLEICH_START.titel} Vergleich mit ${VERGLEICH_START.spalten.slice(0, 2).map((sp) => sp.lang).join(' und ')} (${url('/warum-wir/')}): ${VERGLEICH_START.zeilen.map((z) => `${z.punkt}: ${z.werte.map((w, i) => `${VERGLEICH_START.spalten[i].kurz} ${VERGLEICH_START.stufen[w.s]}`).join(', ')}`).join('; ')}.`,
    `- Leitsatz: ${CLAIM}`,
    '',
    `## Das Angebot: ${WAAS.name}`,
    `${WAAS.claim} Drei Pakete ohne Einrichtungskosten: zwei Website-Pakete und das ${KOMPLETTPAKET.name}; Logo, Geschäftspapiere, Visitenkarten und E-Mail-Signatur sind einmalig dazubuchbar. ${OFFER}`,
    `- In allen Paketen: ${IN_ALLEN.join(', ')}.`,
    `- Geschäftsmodell: ${MODELL.join(', ')}.`,
    ...PAKETE.map((p) => `- Paket ${p.name}: ${formatEuro(p.preis)} pro Monat netto zzgl. MwSt. (${formatEuro(brutto(p.preis))} inkl. MwSt.). ${p.kurz}. ${p.features.join(', ')}.`),
    // Auftragsverwaltungs-Liste und Ablauf stehen nicht mehr auf der Karte (Jamil #5606/#5610/#5641)
    `- ${KOMPLETTPAKET.name}: ${komplett}`,
    `- ${EINMALIG_DAZU.titel} (einmaliger Festpreis netto zzgl. MwSt., keine monatlichen Kosten): ${EINMALIG_DAZU.liste.map((e) => `${e.name} ${formatEuro(e.preis)} (${e.text.replace(/\.$/, '')})`).join('; ')}; Gesamtpaket ${EINMALIG_DAZU.gesamt.name} ${formatEuro(EINMALIG_DAZU.gesamt.preis)} statt ${formatEuro(EINMALIG_DAZU.liste.reduce((s, e) => s + e.preis, 0))}.`,
    '- Paketanfrage: Auf den Paketkarten führt „Paket anfragen“ zu einem Fenster mit Paketwahl, „Individuelle Software“ und den Extras und dann zum Kontaktformular mit Vorauswahl. Kein Online-Kauf: Vertrag und Auftragsbestätigung kommen per E-Mail, erst damit ist die Buchung verbindlich.',
    `- Laufzeit: ${WAAS.laufzeit} (mit einem Monat Frist zum Monatsende).`,
    `- Ablauf in fünf Schritten (Jamil #6055 Fr. 14): ${START_ABLAUF_KURZ.schritte.map((s, i) => `${i + 1}. ${s.titel} (${s.zeit}): ${s.text}`).join(' ')} Websites sind in der Regel innerhalb von 14 Tagen online, nachdem die Inhalte vorliegen.`,
    '- Service-Versprechen: bei uns antwortet ein Mensch, keine Maschine (fester Ansprechpartner), Änderungen per Sprachnachricht, kleine Änderungen in der Regel innerhalb von 1 Stunde (werktags 9 bis 17 Uhr), Antwort in der Regel am nächsten Werktag, Technik (Hosting, Updates, Backups) inklusive, keine Überraschungen auf der Rechnung.',
    `- Arbeitsweise: zuerst persönliche Beratung (${BERATUNG_THEMEN.join(', ')}), danach eine KI-gestützte und deshalb schnelle Umsetzung, anschließend laufende Verbesserung. Strategie und Ideen kommen von Menschen.`,
    `- Zielgruppe: ${ZIELGRUPPEN.map((z) => z.title).join(', ')}.`,
    '',
    '## Leistungen (entlang der Kundenreise, je Leistung eine eigene Seite)',
    // Arbeitsweise Sichtbarkeit (Jamil #5363), seit #5634 auf der Seite Suchmaschinen-Optimierung
    `Auf der Seite Suchmaschinen-Optimierung (${url('/leistungen/suchmaschinen-optimierung/')}): ${SICHTBARKEIT.titel} ${Object.values(PANELS).map((p) => `${p.titel} ${p.text} (${p.paket})`).join(' ')}`,
    '',
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
    `- [Preise](${url('/preise/')}): ${PAKETE.map((p) => `${p.name} ${formatEuro(p.preis)}`).join(' / ')} pro Monat, netto zzgl. MwSt., optional ${komplettZeile()}`,
    `- [Warum webgold](${url('/warum-wir/')}): Vergleich der Anbieter-Typen ${VERGLEICH_START.spalten.map((sp) => sp.lang + (sp.zusatz ? ' ' + sp.zusatz : '')).join(', ')}`,
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
    ...(isMissing(company.phone) || PHONE_IS_PLACEHOLDER ? [] : [`- Telefon: ${company.phone}`, `- WhatsApp: ${whatsappLink().split('?')[0]}`]), // Jamil #6055 Fr. 1/2
    `- Anschrift: ${company.legalName}, ${company.street}, ${company.zip} ${company.city}`,
    `- Fakten: ${FAKTEN.map((x) => `${x.wert} ${x.text}`).join(', ')}`, // Jamil #6055 Fr. 11
    `- Erreichbar: ${HOURS}`,
    `- Erstberatung: kostenlos und unverbindlich, Anfrage über ${url('/kontakt/')}`,
    '',
    '## Für wen nicht',
    '- Privatpersonen: Das Angebot richtet sich ausschließlich an Unternehmen, Selbstständige und Institutionen.',
  ];
  // Marker ==…== der Überschriften (Jamil #7016, lib/hl.ts) gehören nicht in den reinen Text
  return new Response(ohneHl(lines.join('\n')) + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
