// Texte und Branchen-Begriffe der zwei Filme für den Startseiten-Entwurf /geschichte/ (Jamil, Talk qh87y3sj #5739–#5756,
// 13.11.2026): „Ich brauche eine Website“ (FilmWebsite.astro, 6 Szenen) und „Ein Tag im Betrieb“ (FilmBetriebstag.astro,
// 7 Szenen mit Uhrzeit). Jede Szene ca. 5 s.
//
// Personalisierung: Branche + Firmenname kommen aus sessionStorage (gleicher Schlüssel/Format wie der Film „So kann es laufen“,
// siehe filmkern.ts). Die Branchendaten stammen aus components/beispiel/branchen.ts (importiert, nicht kopiert); hier stehen nur
// die Begriffe, die der Betriebstag zusätzlich braucht (Einsatzort, Material). Fehlt eine Branche, gelten neutrale Varianten.
// Alle Texte sprechen den Besucher mit „Sie“ an. Rechtliches wie im Drehbuch: alles erfunden/beispielhaft, keine echten Logos.
import { werte, fuelle, KUNDIN, type Branche } from '../../beispiel/branchen';

export interface FilmSzene {
  /** Überschrift (h3) */
  titel: string;
  /** Satz unter dem Bild, Platzhalter {schlüssel} aus werteFilm() */
  vorlage: string;
  /** nur Betriebstag: sichtbare Uhrzeit */
  zeit?: string;
}

export const FILM_ETIKETT = 'Beispielhafte Darstellung';

export const FILM_WEBSITE = {
  name: 'Ich brauche eine Website',
  szenen: [
    { titel: 'Gefunden', vorlage: '{kundin} sucht „{suche}“. {firmaSatz} steht ganz oben.' },
    { titel: 'Die Website öffnet sich', vorlage: 'Die Website von {firma} öffnet sich: modern, schnell und klar am Handy.' },
    { titel: 'Überzeugt', vorlage: 'Leistungen, echte Referenzen und ehrliche Bewertungen: {kundin} sieht sofort, was der Betrieb kann.' },
    { titel: 'Ein Tipp genügt', vorlage: 'Ein Tipp auf „Anfrage“ oder WhatsApp, und die Nachricht ist unterwegs.' },
    { titel: 'Neue Anfrage', vorlage: 'Im Betrieb meldet sich das Handy: „Neue Anfrage“ von {kundin}, mit allen Angaben.' },
    { titel: 'Gefunden werden. Überzeugen. Anfragen bekommen.', vorlage: 'Ihre Website arbeitet für Sie. Später jederzeit erweiterbar, zum Beispiel um Terminbuchung oder Kundenportal.' },
  ] as FilmSzene[],
};

export const FILM_TAG = {
  name: 'Ein Tag im Betrieb',
  szenen: [
    { zeit: '07:30', titel: 'Der Tag ist geplant', vorlage: 'Der Tagesplan steht am Handy: Jeder im Team weiß, wer wann wohin fährt.' },
    { zeit: '09:00', titel: 'Vor Ort erfasst', vorlage: '{vorOrt} kommen Fotos, Notizen und Arbeitszeit direkt in die App.' },
    { zeit: '11:00', titel: 'Neue Anfrage', vorlage: 'Eine neue Anfrage kommt herein, und {terminImSatz} ist schon gebucht.' },
    { zeit: '13:00', titel: 'Material bestellt', vorlage: 'Material ist mit zwei Tipps bestellt, das Lager ist sofort aktuell.' },
    { zeit: '15:00', titel: 'Geprüft und verschickt', vorlage: '{chef} prüft das Angebot vor dem Versand. Dann geht es mit einem Klick hinaus.' },
    { zeit: '17:00', titel: 'Fertig und abgerechnet', vorlage: 'Auftrag fertig: Die Rechnung entsteht mit einem Klick, und {kundin} sieht alles im Kundenportal.' },
    { zeit: '18:00', titel: 'Feierabend', vorlage: 'Alles ist erfasst, nichts bleibt liegen: Feierabend, kein Papierkram am Abend.' },
  ] as FilmSzene[],
};

/** Steuerleiste (Beschriftungen wie beim Film „So kann es laufen“) */
export const FILM_STEUERUNG = {
  zurueck: 'Zurück',
  pause: 'Pause',
  abspielen: 'Abspielen',
  vor: 'Weiter',
  nochmal: 'Nochmal ansehen',
  szenen: 'Szenen',
  zuSzene: 'Zu Szene',
  hilfe: 'Leertaste: Pause oder Abspielen. Pfeiltasten: vorige oder nächste Szene.',
};

/** Zusätzliche Begriffe je Branche (id aus branchen.ts). Handwerk: Baustelle, sonst Termin beim Kunden. */
interface Einsatz { ort: string; vorOrt: string; material: [string, string, string] }
const HANDWERK = { ort: 'Baustelle', vorOrt: 'Auf der Baustelle' };
const NEUTRAL: Einsatz = { ort: 'Termin', vorOrt: 'Beim Kunden', material: ['Verbrauchsmaterial', 'Ersatzteile', 'Kleinmaterial'] };
const EINSATZ: Record<string, Einsatz> = {
  maler: { ...HANDWERK, material: ['Wandfarbe Salbei, 10 l', 'Abdeckfolie', 'Kreppband'] },
  elektro: { ...HANDWERK, material: ['Steckdosen, Weiß matt', 'Leitung 3 × 1,5 mm²', 'Abzweigdosen'] },
  shk: { ...HANDWERK, material: ['Fliesenkleber, 25 kg', 'Silikon, sanitär', 'Eckventile'] },
  dach: { ...HANDWERK, material: ['Dachziegel, Anthrazit', 'Dachlatten', 'Unterspannbahn'] },
  galabau: { ...HANDWERK, material: ['Natursteinplatten', 'Splitt 2/5', 'Randsteine'] },
  reinigung: { ort: 'Objekt', vorOrt: 'Beim Kunden vor Ort', material: ['Allzweckreiniger, 10 l', 'Mikrofasertücher', 'Müllbeutel'] },
  foto: { ort: 'Shooting', vorOrt: 'Beim Shooting', material: ['Speicherkarten', 'Fotoalben', 'Akkus'] },
  fahrschule: { ort: 'Fahrstunde', vorOrt: 'In der Fahrstunde', material: ['Lernbögen', 'Warnwesten', 'Prüfungsbögen'] },
  coach: { ort: 'Sitzung', vorOrt: 'Beim Kunden', material: ['Arbeitsmappen', 'Moderationskarten', 'Flipchart-Papier'] },
  kosmetik: { ort: 'Termin', vorOrt: 'Im Studio', material: ['Pflegemasken', 'Reinigungsgel', 'Wattepads'] },
};

const gross = (s: string) => (s ? s.charAt(0).toLocaleUpperCase('de-DE') + s.slice(1) : s);

/** Alle Texte beider Filme: werte() aus branchen.ts + eigene Schlüssel. Ausgabe im Browser nur per textContent. */
export function werteFilm(b: Branche, eigeneFirma = ''): Record<string, string> {
  const w = werte(b, eigeneFirma);
  const e = EINSATZ[b.id] ?? NEUTRAL;
  return {
    ...w,
    kundin: KUNDIN,
    ortWort: e.ort,
    vorOrt: e.vorOrt,
    mat0: e.material[0], mat1: e.material[1], mat2: e.material[2],
    terminImSatzGross: gross(w.terminImSatz),
    terminGebucht: `${b.termin.art} gebucht`,
    anfrageLeistung: `${KUNDIN} · ${b.leistung}`,
    // Website des Betriebs: Kennzeile über der Überschrift
    seiteKennzeile: `${b.art} in Musterstadt`,
    portalKopf: `Kundenportal · ${w.firma}`,
    vonFirma: `Website · ${w.firma}`,
  };
}

/** Satz einer Szene mit den Standard-Werten (Bau) bzw. den Werten des Besuchers (Browser) */
export const satz = (sz: FilmSzene, w: Record<string, string>) => fuelle(sz.vorlage, w);
