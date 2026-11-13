// Film „So kann es laufen“ (Jamil, Talk qh87y3sj #5683/#5709–#5715 + Änderung 08:57, 13.11.2026). Markup:
// components/beispiel/BeispielBuehne.astro, Stil: styles/beispiel.css, Szenen: components/beispiel/szenen/SzeneNN.astro,
// Branchen-Daten: components/beispiel/branchen.ts, Anleitung: docs/beispiel-szenen-anleitung.md.
//
// Schritte: Start (Branche wählen) → 13 Szenen → Branchen-Wechsel (nur ohne eigene Auswahl) → Schluss.
// Modi (Klasse am Bereich):
// - .bsp--film  (JS): ein Bildschirm, ein Schritt nach dem anderen. Ohne reduzierte Bewegung läuft er von selbst:
//               jede Szene 3,3 s (3 Phasen) bzw. 3,6 s (4 Phasen), die Phasen der Szene im Takt darin. Autoplay nur, solange
//               die Bühne zu mindestens der Hälfte sichtbar ist und der Tab sichtbar ist; Pause-Knopf (WCAG 2.2.2).
// - .bsp--still (zusätzlich bei prefers-reduced-motion): kein Autoplay, keine Phasen → jede Szene im Endzustand, Weiter per
//               Knopf/Pfeiltaste.
// - ohne JS: keine Klasse, alle Szenen als Karten untereinander (Grundform).
// An der Szenen-Wurzel (.sz, SzeneRahmen.astro) setzt die Engine data-phase="k", data-erreicht="1 … k" und data-aktiv
// (Unter-Animationen der Szene, szenen-eigenes CSS). Elemente mit data-ziel="<Selektor>" (Finger in Szene 1) bekommen
// --ziel-x/--ziel-y = Mitte des Ziel-Elements, gemessen mit getBoundingClientRect relativ zur Szenen-Wurzel (Jamil #5683:
// der Klick muss genau auf „Website“ landen, in jeder Breite).
// Personalisierung: werte(branche, firma) aus branchen.ts → textContent aller [data-p] (nie innerHTML: Eingaben bleiben
// Text). Gemerkt nur in sessionStorage, gesendet wird nichts.
// Test-Hilfe: ?szene=N (0 = Start, 1–13, 14 = Branchen, 15 = Schluss) springt zu Schritt N und spielt ab;
// ?szene=N&phase=K hält Szene N angehalten auf Phase K.
import { findeBranche, werte, fuelle, saubereFirma, STANDARD } from '../components/beispiel/branchen';

const bereich = document.querySelector<HTMLElement>('[data-beispiel]');
const buehne = bereich?.querySelector<HTMLElement>('[data-bsp-buehne]');

type Art = 'start' | 'szene' | 'branchen' | 'schluss';
interface Schritt { li: HTMLElement; art: Art; nr: number; titel: string; wurzel: HTMLElement | null; phasen: number; dauer: number; zeiten: number[] }

const START_DAUER = 4500;
const SPEICHER = 'waybuild-beispiel-film';

if (bereich && buehne) {
  const $ = <T extends Element = HTMLElement>(s: string) => bereich.querySelector<T>(s);
  const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(bereich.querySelectorAll<T>(s));
  const lis = $$('[data-bsp-schritt]');
  const segmente = $$<HTMLButtonElement>('.bsp-segment');
  const steuerung = $('[data-bsp-steuerung]');
  const pauseKnopf = $<HTMLButtonElement>('[data-bsp="pause"]');
  const ansage = $('[data-bsp-ansage]');
  const form = $<HTMLFormElement>('[data-bsp-wahl]');
  const autoText = $('[data-bsp-auto]');
  const losKnopf = $<HTMLButtonElement>('[data-bsp-los]');
  const firmaFeld = form?.querySelector<HTMLInputElement>('input[name="bsp-firma"]') ?? null;

  const schritte: Schritt[] = lis.map((li) => {
    const art = (li.dataset.bspSchritt as Art) || 'szene';
    const wurzel = li.querySelector<HTMLElement>(':scope > .bsp-szene__bild > .sz');
    const phasen = Math.max(1, Math.min(6, parseInt(wurzel?.dataset.phasen ?? '1', 10) || 1));
    const nr = art === 'szene' ? parseInt(li.id.replace('szene-', ''), 10) || 0 : 0;
    const eigen = Math.max(4500, Math.min(5500, parseInt(wurzel?.dataset.dauer ?? '', 10) || 0));
    const dauer = art === 'start' ? START_DAUER : art === 'schluss' ? 0 : wurzel?.dataset.dauer ? eigen : art === 'branchen' ? 5000 : phasen >= 4 ? 5200 : 4800;
    // Phase 1 kurz nach dem Auftritt, die letzte Phase steht noch gut 1 s, bevor die nächste Szene kommt
    const zeiten = art === 'szene' || art === 'branchen'
      ? Array.from({ length: phasen }, (_, k) => Math.round(120 + (phasen > 1 ? (k * (dauer - 1220)) / (phasen - 1) : 0)))
      : [];
    const titel = (li.querySelector('h2')?.textContent ?? '').replace(/\s+/g, ' ').trim();
    return { li, art, nr, titel, wurzel, phasen, dauer, zeiten };
  });
  const index = (art: Art, nr = 0) => schritte.findIndex((s) => s.art === art && (art !== 'szene' || s.nr === nr));
  const iStart = index('start');
  const iBranchen = index('branchen');
  const iSchluss = index('schluss');
  const iErste = index('szene', 1);

  const mqRuhig = matchMedia('(prefers-reduced-motion: reduce)');
  let still = mqRuhig.matches;
  let aktuell = -1;
  let wollen = true; // Besucher will abspielen (Pause-Knopf)
  let sichtbar = !('IntersectionObserver' in window);
  let startHalten = false; // Besucher füllt den Start aus → kein automatischer Start
  let spielt = false;
  let gewaehlt = false; // eigene Branche/Firma gewählt → kein Branchen-Wechsel am Ende
  let firmaJetzt = '';
  let uhren: number[] = [];
  let beginn = 0; // performance.now() beim (gedachten) Beginn des Schritts
  let vergangen = 0; // ms im Schritt, wenn angehalten
  const such = new URLSearchParams(location.search);
  const testSchritt = such.has('szene') ? Math.max(0, Math.min(15, parseInt(such.get('szene') ?? '0', 10) || 0)) : -1;
  const testPhase = such.has('phase') ? Math.max(0, parseInt(such.get('phase') ?? '0', 10) || 0) : -1;

  // ── Szenen-Phasen ──
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
    if (p === s.phasen) { zielen(s); window.setTimeout(() => zielen(s), 420); }
  };
  // Finger/Zeiger: Ziel-Mitte relativ zur Szenen-Wurzel (Skalierung der Übergänge herausgerechnet)
  const zielen = (s: Schritt) => {
    const w = s.wurzel;
    if (!w) return;
    w.querySelectorAll<HTMLElement>('[data-ziel]').forEach((zeiger) => {
      const ziel = w.querySelector<HTMLElement>(zeiger.dataset.ziel || '');
      if (!ziel) return;
      const rw = w.getBoundingClientRect();
      const rz = ziel.getBoundingClientRect();
      if (!rw.width || !rz.width) return;
      const f = w.offsetWidth / rw.width;
      zeiger.style.setProperty('--ziel-x', `${((rz.left + rz.width / 2 - rw.left) * f).toFixed(1)}px`);
      zeiger.style.setProperty('--ziel-y', `${((rz.top + rz.height / 2 - rw.top) * f).toFixed(1)}px`);
    });
  };

  // ── Personalisierung ──
  const personalisieren = (branchenId: string, firmaRoh: string) => {
    const b = findeBranche(branchenId);
    const firma = saubereFirma(firmaRoh);
    firmaJetzt = firma;
    const W = werte(b, firma);
    $$('[data-p]').forEach((el) => { const v = W[el.dataset.p || '']; if (v !== undefined && el.textContent !== v) el.textContent = v; });
    $$('[data-p-zeichen]').forEach((el) => {
      const text = W[el.dataset.pZeichen || ''] ?? '';
      const zeichen = [...text];
      const teile = zeichen.map((z, i) => {
        const span = document.createElement('span');
        span.className = 'sz01-z';
        span.textContent = z === ' ' ? ' ' : z;
        span.style.setProperty('--i', String(i));
        return span;
      });
      el.replaceChildren(...teile);
      el.style.setProperty('--sz01-schritt', `${Math.min(38, Math.round(600 / Math.max(1, zeichen.length)))}ms`);
    });
    $$('.bsp-szene__satz[data-vorlage]').forEach((el) => { el.textContent = fuelle(el.dataset.vorlage || '', W); });
    const schlussTitel = $('[data-bsp-schluss-titel]');
    if (schlussTitel) schlussTitel.textContent = firma ? fuelle(schlussTitel.dataset.vorlageFirma || '', W) : schlussTitel.dataset.standard || schlussTitel.textContent || '';
    schritte.forEach((s) => { s.titel = (s.li.querySelector('h2')?.textContent ?? '').replace(/\s+/g, ' ').trim(); });
  };
  const schlussTitel = $('[data-bsp-schluss-titel]');
  if (schlussTitel) schlussTitel.dataset.standard = schlussTitel.textContent || '';

  const merken = (b: string, f: string) => { try { sessionStorage.setItem(SPEICHER, JSON.stringify({ b, f })); } catch { /* privat/gesperrt */ } };
  const gemerkt = (): { b: string; f: string } | null => {
    try { const roh = sessionStorage.getItem(SPEICHER); if (!roh) return null; const o = JSON.parse(roh); return { b: String(o.b ?? ''), f: saubereFirma(String(o.f ?? '')) }; } catch { return null; }
  };
  const auswahl = () => ({
    b: form?.querySelector<HTMLInputElement>('input[name="bsp-branche"]:checked')?.value ?? STANDARD.id,
    f: saubereFirma(firmaFeld?.value ?? ''),
  });

  // ── Ablauf ──
  const uhrenWeg = () => { uhren.forEach((u) => clearTimeout(u)); uhren = []; };
  const naechster = (i: number) => {
    let n = i + 1;
    if (n === iBranchen && gewaehlt) n += 1;
    return Math.min(n, schritte.length - 1);
  };
  const vorheriger = (i: number) => {
    let n = i - 1;
    if (n === iBranchen && gewaehlt) n -= 1;
    return Math.max(0, n);
  };
  const leiste = (i: number, ende: boolean) => {
    const s = schritte[i];
    const nr = s?.art === 'szene' ? s.nr : s?.art === 'branchen' || s?.art === 'schluss' ? 99 : 0;
    segmente.forEach((seg) => {
      const z = parseInt(seg.dataset.bspZu ?? '0', 10);
      const jetzt = z === nr && !ende && !still;
      seg.classList.toggle('ist-voll', z < nr || (z === nr && (ende || still)));
      if (seg.classList.contains('ist-jetzt') !== jetzt || jetzt) {
        seg.classList.remove('ist-jetzt');
        if (jetzt) { seg.style.setProperty('--bsp-segment-dauer', `${s.dauer}ms`); void seg.offsetWidth; seg.classList.add('ist-jetzt'); }
      }
      seg.toggleAttribute('aria-current', z === nr);
    });
  };
  const knopfStand = () => {
    if (!pauseKnopf) return;
    const laeuft = wollen && aktuell !== iSchluss;
    pauseKnopf.setAttribute('aria-label', (laeuft ? pauseKnopf.dataset.textPause : pauseKnopf.dataset.textWeiter) || '');
    pauseKnopf.classList.toggle('ist-pause', !laeuft);
    bereich.classList.toggle('bsp--pausiert', !spielt && testPhase < 0); // Test-Hilfe ?phase: Unter-Animationen laufen
    if (autoText) autoText.hidden = startHalten || still || !wollen;
    losKnopf?.classList.toggle('ist-auto', aktuell === iStart && spielt && !startHalten);
  };

  /** Schritt i zeigen. ende = gleich im Endzustand (manuell angesteuert, angehalten oder reduziert) */
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
    if (!ende && testSchritt >= 0 && testPhase >= 0 && i === testSchritt) setzePhase(s, testPhase, true);
    vergangen = ende ? s.dauer : 0;
    leiste(i, ende);
    if (ansage) ansage.textContent = s.art === 'szene' ? s.titel : s.titel;
    if (fokusWeg) buehne.focus({ preventScroll: true });
    abgleich(true);
  };

  const planen = () => {
    uhrenWeg();
    const s = schritte[aktuell];
    if (!s || s.art === 'schluss') return;
    if (s.art === 'start' && startHalten) return;
    beginn = performance.now() - vergangen;
    s.zeiten.forEach((t, k) => {
      if (t < vergangen) return;
      uhren.push(window.setTimeout(() => setzePhase(s, k + 1, true), t - vergangen));
    });
    uhren.push(window.setTimeout(() => {
      const n = naechster(aktuell);
      zeige(n, false);
      if (n === iSchluss) { wollen = false; abgleich(); }
    }, Math.max(0, s.dauer - vergangen)));
  };
  /** Abspielen/Anhalten nach Wunsch, Sichtbarkeit und Tab abgleichen */
  const abgleich = (neuerSchritt = false) => {
    const soll = !still && wollen && sichtbar && !document.hidden && aktuell !== iSchluss && !(testPhase >= 0);
    if (soll && (!spielt || neuerSchritt)) { spielt = true; planen(); }
    else if (!soll && spielt) { spielt = false; vergangen = Math.min(schritte[aktuell]?.dauer ?? 0, performance.now() - beginn); uhrenWeg(); }
    else if (!soll) uhrenWeg();
    knopfStand();
  };

  // ── Bedienung ──
  const geheZu = (i: number) => { zeige(i, !wollen || still); };
  const umschalten = () => {
    if (aktuell === iSchluss) { wollen = true; zeige(iErste, false); return; }
    wollen = !wollen;
    if (wollen && aktuell === iStart) startHalten = false;
    if (wollen && vergangen >= (schritte[aktuell]?.dauer ?? 0)) { zeige(naechster(aktuell), false); return; }
    abgleich();
  };
  const zumStart = () => {
    wollen = false;
    startHalten = true;
    zeige(iStart, true);
    window.setTimeout(() => form?.querySelector<HTMLInputElement>('input[name="bsp-branche"]:checked')?.focus({ preventScroll: true }), 50);
  };

  bereich.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-bsp], [data-bsp-zu]');
    if (!t) return;
    const was = t.dataset.bsp;
    if (t.dataset.bspZu) { geheZu(index('szene', parseInt(t.dataset.bspZu, 10))); return; }
    if (was === 'pause') umschalten();
    else if (was === 'vor') geheZu(naechster(aktuell));
    else if (was === 'zurueck') geheZu(vorheriger(aktuell));
    else if (was === 'branche') zumStart();
    else if (was === 'nochmal') { wollen = !still; zeige(iErste, still); if (still) buehne.focus({ preventScroll: true }); }
  });
  const taste = (e: KeyboardEvent) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const ziel = e.target as HTMLElement;
    const imFeld = ziel.closest('input, textarea, select, [contenteditable="true"]');
    const istKnopf = ziel.closest('button, a, summary');
    if ((e.key === ' ' || e.key === 'Spacebar') && !imFeld && !istKnopf) { e.preventDefault(); umschalten(); }
    else if (e.key === 'ArrowRight' && !imFeld) { e.preventDefault(); geheZu(naechster(aktuell)); }
    else if (e.key === 'ArrowLeft' && !imFeld) { e.preventDefault(); geheZu(vorheriger(aktuell)); }
  };
  buehne.addEventListener('keydown', taste);
  // Tastatur auch ohne Fokus in der Bühne, solange sie sichtbar ist und nichts anderes den Fokus hat
  document.addEventListener('keydown', (e) => {
    if (!sichtbar || buehne.contains(e.target as Node)) return;
    if (e.target !== document.body && e.target !== document.documentElement) return;
    taste(e);
  });

  // Start-Formular
  if (form) {
    const halten = () => { if (aktuell === iStart && !startHalten) { startHalten = true; abgleich(true); } };
    form.addEventListener('pointerdown', halten);
    form.addEventListener('focusin', (e) => { if ((e as FocusEvent).relatedTarget) halten(); });
    form.addEventListener('keydown', halten);
    form.addEventListener('change', () => { const a = auswahl(); personalisieren(a.b, a.f); });
    firmaFeld?.addEventListener('input', () => { const a = auswahl(); personalisieren(a.b, a.f); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const a = auswahl();
      if (firmaFeld && firmaFeld.value !== a.f) firmaFeld.value = a.f;
      gewaehlt = true;
      personalisieren(a.b, a.f);
      merken(a.b, a.f);
      wollen = !still;
      startHalten = false;
      zeige(iErste, still);
      buehne.focus({ preventScroll: true });
      const r = buehne.getBoundingClientRect();
      const oben = parseFloat(getComputedStyle(buehne).scrollMarginTop) || 0; // = Kopfzeile
      if (Math.abs(r.top - oben) > 2) window.scrollTo({ top: Math.round(r.top + window.scrollY - oben), behavior: mqRuhig.matches ? 'auto' : 'smooth' });
    });
  }

  // Sichtbarkeit
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((e) => { sichtbar = e[0].intersectionRatio >= 0.5; abgleich(); }, { threshold: [0, 0.5, 1] }).observe(buehne);
  }
  document.addEventListener('visibilitychange', () => abgleich());
  window.addEventListener('resize', () => { const s = schritte[aktuell]; if (s && s.wurzel?.dataset.phase === String(s.phasen)) zielen(s); }, { passive: true });

  const modus = () => {
    still = mqRuhig.matches;
    bereich.classList.add('bsp--film');
    bereich.classList.toggle('bsp--still', still);
    if (still) wollen = false;
  };
  mqRuhig.addEventListener('change', () => { modus(); zeige(aktuell, true); });

  // ── Los ──
  modus();
  buehne.tabIndex = -1;
  buehne.setAttribute('role', 'region');
  buehne.setAttribute('aria-roledescription', 'Film');
  buehne.setAttribute('aria-label', 'Beispiel als Film: So kann es laufen');
  $$('[data-bsp-nurjs]').forEach((el) => { el.hidden = false; });
  schritte[iStart].li.hidden = false;
  if (steuerung) steuerung.hidden = false;
  $('[data-bsp-hilfe]')?.removeAttribute('hidden');
  const alt = gemerkt();
  if (alt) {
    const radio = form?.querySelector<HTMLInputElement>(`input[name="bsp-branche"][value="${CSS.escape(alt.b)}"]`);
    if (radio) radio.checked = true;
    if (firmaFeld) firmaFeld.value = alt.f;
    gewaehlt = true;
    if (autoText) autoText.textContent = 'Startet gleich mit Ihrer Auswahl';
  }
  const a0 = auswahl();
  personalisieren(a0.b, a0.f);
  if (testSchritt >= 0) {
    const ziel = testSchritt === 0 ? iStart : testSchritt === 14 ? iBranchen : testSchritt === 15 ? iSchluss : index('szene', testSchritt);
    if (testPhase >= 0) wollen = false;
    zeige(Math.max(0, ziel), false);
  } else {
    zeige(iStart, still);
  }
  // für Tests/Fehlersuche
  (window as unknown as { __bspFilm: object }).__bspFilm = {
    schritt: () => ({ i: aktuell, art: schritte[aktuell]?.art, nr: schritte[aktuell]?.nr, spielt, wollen, sichtbar }),
    firma: () => firmaJetzt,
  };
}

export {}; // Modul (eigener Gültigkeitsbereich)
