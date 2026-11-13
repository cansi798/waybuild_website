// Ablauf der zwei Filme auf /geschichte/ (Jamil, Talk qh87y3sj #5739–#5756, 13.11.2026): FilmWebsite.astro, FilmBetriebstag.astro.
// Markup: FilmBuehne.astro, Stil: filme.css (+ CSS je Szene), Texte: daten.ts. Gleiches Muster wie src/scripts/beispiel.ts.
//
// ── Schnittstelle für die Seite ────────────────────────────────────────────────────────────────────────────────────────────
// Personalisierung: Branche + Firmenname stehen in sessionStorage unter dem Schlüssel 'waybuild-beispiel-film' als JSON
//   {"b":"<branchen-id aus components/beispiel/branchen.ts>","f":"<Firmenname>"} – derselbe Schlüssel und dasselbe Format wie
//   der Film „So kann es laufen“ (SPEICHER in src/scripts/beispiel.ts). Ohne Eintrag: Standardbranche (Maler).
// Änderung melden: Die Seite schreibt sessionStorage und löst danach aus
//     window.dispatchEvent(new CustomEvent('waybuild:personalisierung'));
//   Optional mit detail {b, f} (gleiches Format) – dann gilt detail statt sessionStorage. Alle Filme auf der Seite übernehmen
//   die Werte sofort (nur textContent, nie innerHTML; der Name wird mit saubereFirma() gekürzt/gesäubert). Der bestehende Film
//   löst kein Event aus; sein Auswahl-Formular ([data-bsp-wahl]) wird zusätzlich beim Absenden mitgehört.
// Weg-Wechsel: Die Seite /geschichte/ blendet Abschnitte je Weg ein/aus und löst danach aus
//     window.dispatchEvent(new CustomEvent('waybuild:weg', { detail: { weg: 'website' | 'anfragen' | 'betrieb' } }));
//   Jeder Film misst dann neu, ob er sichtbar ist: ausgeblendete Filme halten sofort an, der sichtbare spielt (wie beim
//   Scrollen: mind. halb im Bild, Tab sichtbar). Der Wert von weg wird nicht ausgewertet – es zählt nur die Sichtbarkeit.
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// Modi (Klasse an .gf):
// - .gf--film (JS): ein Bildschirm, Szene für Szene, je ca. 5 s (data-dauer am Szenen-Rahmen), die Phasen der Szene im Takt.
//   Autoplay nur, solange die Bühne zu mindestens der Hälfte sichtbar ist und der Tab sichtbar ist. Pause-Knopf (WCAG 2.2.2).
//   Am Ende hält der Film an und bietet „Nochmal ansehen“.
// - .gf--still (zusätzlich bei prefers-reduced-motion): kein Autoplay, keine Phasen → jede Szene im Endzustand.
// - ohne JS: alle Szenen als Karten untereinander.
// Mehrere Filme pro Seite: jede Instanz hat eigenen Zustand; Tastatur gilt für den Film mit Fokus bzw. (Pfeiltasten ohne Fokus)
// für den am weitesten sichtbaren Film.
// Test-Hilfe: ?gfilm=<website|tag>&gszene=N (1 … n) springt zu Szene N und spielt ab; zusätzlich &gphase=K hält auf Phase K.
import { findeBranche, saubereFirma } from '../../beispiel/branchen';
import { werteFilm } from './daten';

export const EREIGNIS = 'waybuild:personalisierung';
export const EREIGNIS_WEG = 'waybuild:weg';
/** = SPEICHER in src/scripts/beispiel.ts (dort nicht exportiert; Format {b, f}) */
export const SPEICHER = 'waybuild-beispiel-film';

interface Wahl { b: string; f: string }
interface Schritt { li: HTMLElement; wurzel: HTMLElement | null; phasen: number; dauer: number; zeiten: number[]; titel: string }
interface Film { el: HTMLElement; anteil: number; taste: (e: KeyboardEvent) => void; anwenden: (w: Wahl | null) => void; messen: () => void }

const gemerkt = (): Wahl | null => {
  try {
    const roh = sessionStorage.getItem(SPEICHER);
    if (!roh) return null;
    const o = JSON.parse(roh);
    return { b: String(o?.b ?? ''), f: saubereFirma(String(o?.f ?? '')) };
  } catch { return null; }
};

const filme: Film[] = [];
let zaehler = 0;
const mqRuhig = matchMedia('(prefers-reduced-motion: reduce)');
const such = new URLSearchParams(location.search);

function starte(el: HTMLElement) {
  if (el.dataset.gfInstanz) return;
  zaehler += 1;
  el.dataset.gfInstanz = `gf-${zaehler}`;
  const buehne = el.querySelector<HTMLElement>('[data-gf-buehne]');
  if (!buehne) return;
  const $ = <T extends Element = HTMLElement>(s: string) => el.querySelector<T>(s);
  const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
  const art = el.dataset.gfilm || '';
  const name = el.dataset.gfName || '';
  const segmente = $$<HTMLButtonElement>('.gf-segment');
  const pauseKnopf = $<HTMLButtonElement>('[data-gf="pause"]');
  const tastenText = $('[data-gf-tastentext]');
  const ansage = $('[data-gf-ansage]');
  const nochmalP = $('[data-gf-nochmal]');

  const schritte: Schritt[] = $$('[data-gf-schritt]').map((li) => {
    const wurzel = li.querySelector<HTMLElement>(':scope > .gf-bild > .gf-sz');
    const phasen = Math.max(1, Math.min(6, parseInt(wurzel?.dataset.phasen ?? '1', 10) || 1));
    const dauer = Math.max(4500, Math.min(5500, parseInt(wurzel?.dataset.dauer ?? '5000', 10) || 5000));
    // Phase 1 kurz nach dem Auftritt, die letzte Phase steht noch gut 1 s
    const zeiten = Array.from({ length: phasen }, (_, k) => Math.round(120 + (phasen > 1 ? (k * (dauer - 1220)) / (phasen - 1) : 0)));
    return { li, wurzel, phasen, dauer, zeiten, titel: '' };
  });
  const letzte = schritte.length - 1;
  const titelLesen = () => schritte.forEach((s) => { s.titel = (s.li.querySelector('h3')?.textContent ?? '').replace(/\s+/g, ' ').trim(); });
  titelLesen();

  let still = mqRuhig.matches;
  let aktuell = -1;
  let wollen = !still;
  let sichtbar = !('IntersectionObserver' in window);
  let spielt = false;
  let fertig = false;
  let uhren: number[] = [];
  let beginn = 0;
  let vergangen = 0;
  let firmaJetzt = '';
  const meinTest = such.get('gfilm') === art;
  const testSzene = meinTest && such.has('gszene') ? Math.max(1, Math.min(schritte.length, parseInt(such.get('gszene') ?? '1', 10) || 1)) - 1 : -1;
  const testPhase = meinTest && such.has('gphase') ? Math.max(0, parseInt(such.get('gphase') ?? '0', 10) || 0) : -1;

  // ── Phasen ──
  const setzePhase = (s: Schritt, phase: number, aktiv: boolean) => {
    const w = s.wurzel;
    if (!w) return;
    if (still) { delete w.dataset.phase; delete w.dataset.erreicht; w.removeAttribute('data-aktiv'); return; }
    const p = Math.min(phase, s.phasen);
    if (w.dataset.phase !== String(p)) {
      w.dataset.phase = String(p);
      w.dataset.erreicht = Array.from({ length: p }, (_, k) => k + 1).join(' ');
    }
    w.toggleAttribute('data-aktiv', aktiv);
  };

  // ── Personalisierung (nur textContent) ──
  const anwenden = (wahl: Wahl | null) => {
    const b = findeBranche(wahl?.b);
    const firma = saubereFirma(wahl?.f ?? '');
    firmaJetzt = firma;
    const W = werteFilm(b, firma);
    $$('[data-p]').forEach((n) => { const v = W[n.dataset.p || '']; if (v !== undefined && n.textContent !== v) n.textContent = v; });
    $$('[data-p-zeichen]').forEach((n) => {
      const text = W[n.dataset.pZeichen || ''] ?? '';
      const zeichen = [...text];
      n.replaceChildren(...zeichen.map((z, i) => {
        const span = document.createElement('span');
        span.className = 'gf-z';
        span.textContent = z === ' ' ? ' ' : z;
        span.style.setProperty('--i', String(i));
        return span;
      }));
      n.style.setProperty('--gf-schritt', `${Math.min(45, Math.round(900 / Math.max(1, zeichen.length)))}ms`);
    });
    $$('.gf-satz[data-vorlage]').forEach((n) => { n.textContent = (n.dataset.vorlage || '').replace(/\{(\w+)\}/g, (_, k: string) => W[k] ?? ''); });
    titelLesen();
  };

  // ── Ablauf ──
  const uhrenWeg = () => { uhren.forEach((u) => clearTimeout(u)); uhren = []; };
  const leiste = (i: number, ende: boolean) => {
    const s = schritte[i];
    segmente.forEach((seg) => {
      const z = parseInt(seg.dataset.gfZu ?? '0', 10);
      const jetzt = z === i && !ende && !still;
      seg.classList.toggle('ist-voll', z < i || (z === i && (ende || still)));
      if (seg.classList.contains('ist-jetzt') !== jetzt || jetzt) {
        seg.classList.remove('ist-jetzt');
        if (jetzt) { seg.style.setProperty('--gf-segment-dauer', `${s.dauer}ms`); void seg.offsetWidth; seg.classList.add('ist-jetzt'); }
      }
      seg.toggleAttribute('aria-current', z === i);
    });
  };
  const knopfStand = () => {
    if (pauseKnopf) {
      const laeuft = wollen && !fertig;
      const text = fertig ? pauseKnopf.dataset.textNochmal : laeuft ? pauseKnopf.dataset.textPause : pauseKnopf.dataset.textAbspielen;
      pauseKnopf.setAttribute('aria-label', text || '');
      if (tastenText) tastenText.textContent = text || '';
      pauseKnopf.classList.toggle('ist-pause', !laeuft && !fertig);
      pauseKnopf.classList.toggle('ist-ende', fertig);
    }
    el.classList.toggle('gf--pausiert', !spielt && testPhase < 0);
    el.classList.toggle('gf--ende', fertig);
    if (nochmalP) nochmalP.hidden = !(fertig || (still && aktuell === letzte));
  };

  /** Szene i zeigen; ende = gleich im Endzustand (manuell angesteuert, angehalten, reduziert) */
  const zeige = (i: number, ende: boolean) => {
    uhrenWeg();
    const vorher = aktuell;
    aktuell = i;
    const fokusWeg = vorher >= 0 && vorher !== i && schritte[vorher].li.contains(document.activeElement);
    schritte.forEach((s, k) => {
      s.li.classList.toggle('ist-aktiv', k === i);
      s.li.classList.toggle('ist-vorbei', k < i);
      if (k < i) setzePhase(s, s.phasen, false);
      else if (k > i) setzePhase(s, 0, false);
    });
    const s = schritte[i];
    setzePhase(s, ende ? s.phasen : 0, !ende);
    if (testPhase >= 0 && i === testSzene) setzePhase(s, testPhase, true);
    vergangen = ende ? s.dauer : 0;
    leiste(i, ende);
    if (ansage) ansage.textContent = `${name}. ${s.titel}`;
    if (fokusWeg) buehne.focus({ preventScroll: true });
    abgleich(true);
  };

  const planen = () => {
    uhrenWeg();
    const s = schritte[aktuell];
    if (!s) return;
    beginn = performance.now() - vergangen;
    s.zeiten.forEach((t, k) => {
      if (t < vergangen) return;
      uhren.push(window.setTimeout(() => setzePhase(s, k + 1, true), t - vergangen));
    });
    uhren.push(window.setTimeout(() => {
      if (aktuell < letzte) { zeige(aktuell + 1, false); return; }
      // Ende: angehalten im Endzustand, „Nochmal ansehen“
      fertig = true; wollen = false; vergangen = s.dauer;
      setzePhase(s, s.phasen, false);
      leiste(aktuell, true);
      abgleich();
    }, Math.max(0, s.dauer - vergangen)));
  };
  /** Abspielen/Anhalten nach Wunsch, Sichtbarkeit und Tab abgleichen */
  const abgleich = (neu = false) => {
    const soll = !still && wollen && !fertig && sichtbar && !document.hidden && testPhase < 0;
    if (soll && (!spielt || neu)) { spielt = true; planen(); }
    else if (!soll && spielt) { spielt = false; vergangen = Math.min(schritte[aktuell]?.dauer ?? 0, performance.now() - beginn); uhrenWeg(); }
    else if (!soll) uhrenWeg();
    knopfStand();
  };

  // ── Bedienung ──
  const geheZu = (i: number) => {
    const ziel = Math.max(0, Math.min(letzte, i));
    if (i > letzte) { // „Weiter“ auf der letzten Szene: Ende
      fertig = true; wollen = false; zeige(letzte, true); return;
    }
    fertig = false;
    zeige(ziel, !wollen || still);
  };
  const nochmal = () => { fertig = false; wollen = !still; zeige(0, still); };
  const umschalten = () => {
    if (fertig) { nochmal(); return; }
    wollen = !wollen;
    if (wollen && vergangen >= (schritte[aktuell]?.dauer ?? 0)) { geheZu(aktuell + 1); return; }
    abgleich();
  };

  el.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-gf], [data-gf-zu]');
    if (!t || !el.contains(t)) return;
    if (t.dataset.gfZu !== undefined) { geheZu(parseInt(t.dataset.gfZu, 10) || 0); return; }
    const was = t.dataset.gf;
    if (was === 'pause') umschalten();
    else if (was === 'vor') geheZu(aktuell + 1);
    else if (was === 'zurueck') geheZu(aktuell - 1);
    else if (was === 'nochmal') { nochmal(); buehne.focus({ preventScroll: true }); }
  });
  const taste = (e: KeyboardEvent, mitLeertaste = true) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const ziel = e.target as HTMLElement;
    const imFeld = ziel.closest?.('input, textarea, select, [contenteditable="true"]');
    const istKnopf = ziel.closest?.('button, a, summary');
    if (mitLeertaste && (e.key === ' ' || e.key === 'Spacebar') && !imFeld && !istKnopf) { e.preventDefault(); umschalten(); }
    else if (e.key === 'ArrowRight' && !imFeld) { e.preventDefault(); geheZu(aktuell + 1); }
    else if (e.key === 'ArrowLeft' && !imFeld) { e.preventDefault(); geheZu(aktuell - 1); }
  };
  buehne.addEventListener('keydown', (e) => taste(e));

  /** Sichtbarkeit selbst messen (nach dem Ein-/Ausblenden eines Abschnitts, bevor der IntersectionObserver meldet) */
  const messen = () => {
    const r = buehne.getBoundingClientRect();
    const hoehe = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
    const breite = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0));
    const anteil = r.width > 0 && r.height > 0 ? (hoehe * breite) / (r.width * r.height) : 0;
    eintrag.anteil = anteil;
    sichtbar = anteil >= 0.5;
    abgleich();
  };
  const eintrag: Film = { el, anteil: 0, taste: (e) => taste(e, false), anwenden, messen };
  filme.push(eintrag);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((e) => { eintrag.anteil = e[0].intersectionRatio; sichtbar = e[0].intersectionRatio >= 0.5; abgleich(); }, { threshold: [0, 0.25, 0.5, 0.75, 1] }).observe(buehne);
  }
  document.addEventListener('visibilitychange', () => abgleich());

  const modus = () => {
    still = mqRuhig.matches;
    el.classList.add('gf--film');
    el.classList.toggle('gf--still', still);
    if (still) wollen = false;
  };
  mqRuhig.addEventListener('change', () => { modus(); zeige(aktuell, true); });

  // ── Los ──
  modus();
  buehne.tabIndex = -1;
  buehne.setAttribute('role', 'region');
  buehne.setAttribute('aria-roledescription', 'Film');
  buehne.setAttribute('aria-label', `Film: ${name}`);
  const steuerung = $('[data-gf-steuerung]');
  if (steuerung) steuerung.hidden = false;
  $('[data-gf-hilfe]')?.removeAttribute('hidden');
  anwenden(gemerkt());
  if (testSzene >= 0) { if (testPhase >= 0) wollen = false; zeige(testSzene, false); }
  else zeige(0, still);

  // für Tests/Fehlersuche
  (el as HTMLElement & { __gf?: object }).__gf = {
    art, instanz: el.dataset.gfInstanz,
    schritt: () => ({ i: aktuell, nr: aktuell + 1, n: schritte.length, spielt, wollen, sichtbar, fertig, still }),
    firma: () => firmaJetzt,
  };
}

const alleStarten = () => document.querySelectorAll<HTMLElement>('[data-gfilm]').forEach(starte);
const alleAnwenden = (w?: Wahl | null) => { const wahl = w === undefined ? gemerkt() : w; filme.forEach((f) => f.anwenden(wahl)); };

if (!(window as unknown as { __gfKern?: boolean }).__gfKern) {
  (window as unknown as { __gfKern?: boolean }).__gfKern = true;
  window.addEventListener(EREIGNIS, (e) => {
    const d = (e as CustomEvent).detail as Partial<Wahl> | null | undefined;
    if (d && (typeof d.b === 'string' || typeof d.f === 'string')) alleAnwenden({ b: String(d.b ?? ''), f: saubereFirma(String(d.f ?? '')) });
    else alleAnwenden();
  });
  window.addEventListener(EREIGNIS_WEG, () => {
    filme.forEach((f) => f.messen());
    requestAnimationFrame(() => filme.forEach((f) => f.messen()));
  });
  // Auswahl-Formular des Films „So kann es laufen“ (falls auf derselben Seite): schreibt sessionStorage beim Absenden
  document.addEventListener('submit', (e) => {
    if ((e.target as Element | null)?.matches?.('[data-bsp-wahl]')) window.setTimeout(() => alleAnwenden(), 0);
  });
  // Pfeiltasten ohne Fokus: für den am weitesten sichtbaren Film (mind. halb sichtbar)
  document.addEventListener('keydown', (e) => {
    if (e.target !== document.body && e.target !== document.documentElement) return;
    const vorn = filme.filter((f) => f.anteil >= 0.5).sort((a, b) => b.anteil - a.anteil)[0];
    vorn?.taste(e);
  });
  (window as unknown as { __gfFilme: () => object[] }).__gfFilme = () => filme.map((f) => (f.el as HTMLElement & { __gf?: object }).__gf ?? {});
}
alleStarten();

export {};
