// Eigene Seite /fragen/ „Häufige Fragen“ (Jamil, Talk qh87y3sj #5136–#5138, 08.11.2026).
// Sammelt ALLE Fragen ohne Doppelte aus den beiden Quellen und ordnet sie nach Themen:
//   1. src/config/site.ts → faqs (allgemeine FAQ, Antworten mit Preisen aus pakete-abo.ts)
//   2. src/config/pakete-abo.ts → FAQ_PAKETE (Paket-FAQ, auch auf /preise/; daraus kamen die Fragen der Startseite #fragen)
// Doppelte: gleiche Frage ODER gleiche Antwort. Bei gleicher Frage gewinnt die Fassung ohne Platzhalter und mit der
// ausführlicheren Antwort. Platzhalter (offene Entscheidungen) nur in der Vorschau, nie im JSON-LD.
// Neue Fragen bitte in einer der beiden Quellen ergänzen und unten einem Thema zuordnen; ohne Zuordnung landen sie unter
// „Weitere Fragen“.
import { faqs } from './site';
import { FAQ_PAKETE } from './pakete-abo';

export type Frage = { q: string; a: string; platzhalter?: boolean };

export const FRAGEN_TITEL = 'Häufige Fragen';

/** Themen in dieser Reihenfolge; Zuordnung über den genauen Fragetext. */
const THEMEN: { id: string; titel: string; fragen: string[] }[] = [
  { id: 'pakete', titel: 'Pakete und Preise', fragen: [
    'Was kostet eine Website bei webgold?',
    'Was ist der Unterschied zwischen den Paketen?',
    'Gibt es Einrichtungskosten?',
    'Was kostet ein Paket im Jahr?',
    'Was kann ich einmalig dazubuchen?',
    'Ich brauche kein Logo. Muss ich das mitbezahlen?',
    'Kann ich über den Preis verhandeln?',
    'Sind die Preise netto?',
    'Kann ich die Web-App ohne Website buchen?', // Jamil #6038, Audit F3
  ] },
  { id: 'ablauf', titel: 'Ablauf', fragen: [
    'Wie schnell ist meine Website online?',
    'Welche Rolle spielt KI?',
    'Wie viele Seiten bekommt meine Website?',
  ] },
  { id: 'technik', titel: 'Technik und Betreuung', fragen: [
    'Was ist bei Website as a Service enthalten?',
    'Kann ich meine bestehende Domain mitnehmen?',
    'Ich habe schon eine Website. Was passiert damit?', // Jamil #6038, Audit F3
    'Bietet webgold auch Software, Cloud und IT an?',
  ] },
  // Jamil #5933 (14.11.2026): Fragen, die Ängste nehmen (Antworten in site.ts → faqs)
  { id: 'sorgen', titel: 'Sorgen und Sicherheit', fragen: [
    'Was passiert mit meinen alten E-Mails?',
    'Wie lange dauert die Umstellung?',
    'Kann ich während der Umstellung normal weiterarbeiten?',
    'Muss ich mich mit Technik auskennen?',
    'Was ist, wenn mir die Website nicht gefällt?',
    'Was passiert bei Problemen oder Ausfällen?',
    'Ich habe wenig Zeit. Schaffe ich das neben dem Tagesgeschäft?',
  ] },
  { id: 'vertrag', titel: 'Vertrag', fragen: [
    'Wie lange läuft der Vertrag?',
    'Was passiert nach 24 Monaten?',
    'Kann ich später in ein größeres Paket wechseln?',
    'Kann ich das Paket später wechseln?',
  ] },
];

const norm = (t: string) => t.toLowerCase().replace(/\s+/g, ' ').trim();

/** Alle Fragen ohne Doppelte (Reihenfolge: site.ts zuerst, dann Paket-FAQ). */
export const alleFragen = (): Frage[] => {
  const liste: Frage[] = [];
  for (const f of [...faqs, ...FAQ_PAKETE] as Frage[]) {
    const gleich = liste.findIndex((x) => norm(x.q) === norm(f.q) || norm(x.a) === norm(f.a));
    if (gleich < 0) { liste.push(f); continue; }
    const alt = liste[gleich];
    // bessere Fassung behalten: ohne Platzhalter vor mit Platzhalter, sonst die längere Antwort
    const besser = alt.platzhalter && !f.platzhalter ? f : !alt.platzhalter && f.platzhalter ? alt : f.a.length > alt.a.length ? f : alt;
    liste[gleich] = besser;
  }
  return liste;
};

/** Fragen nach Themen gruppiert; nicht zugeordnete Fragen unter „Weitere Fragen“. */
export const fragenNachThema = () => {
  const alle = alleFragen();
  const benutzt = new Set<Frage>();
  const gruppen = THEMEN.map((t) => {
    const fragen = t.fragen.map((q) => alle.find((f) => norm(f.q) === norm(q))).filter((f): f is Frage => !!f && !benutzt.has(f));
    fragen.forEach((f) => benutzt.add(f));
    return { id: t.id, titel: t.titel, fragen };
  });
  const rest = alle.filter((f) => !benutzt.has(f));
  if (rest.length) gruppen.push({ id: 'weitere', titel: 'Weitere Fragen', fragen: rest });
  return gruppen.filter((g) => g.fragen.length);
};
