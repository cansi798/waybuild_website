// Bühne „So kann es laufen“ (Jamil, Talk qh87y3sj #5678/#5680, 13.11.2026). Markup: components/beispiel/BeispielBuehne.astro,
// Stil: styles/beispiel.css, Szenen: components/beispiel/szenen/SzeneNN.astro, Anleitung: docs/beispiel-szenen-anleitung.md.
// Scroll-Mechanik (Modi, Messen, Scroll je Bild, Hereingleiten) = gemeinsamer Kern src/scripts/buehne-kern.ts (wie Kundenreise).
//
// Schritte = 13 Szenen + Schluss, je ein Scroll-Stück. Die Engine setzt:
// - am Schritt (li): .ist-aktiv / .ist-vorbei (Bühne), .ist-da (Handy-Karten) – Bewegung der Schritte selbst (styles/beispiel.css)
// - an der Szenen-Wurzel (.sz, SzeneRahmen.astro): data-phase="k", data-erreicht="1 … k", data-aktiv – Unter-Animationen
//   der Szene (szenen-eigenes CSS). Phasenzahl aus data-phasen, Takt (Handy) aus data-takt.
//   Bühne: Phase 1 beim Eintritt in die Szene, dann über ihr Scroll-Stück verteilt bis zur letzten; frühere Szenen stehen auf
//   der letzten Phase, spätere auf 0. Vor dem Andocken der Bühne (roh < 0) steht Szene 1 auf Phase 0.
//   Handy-Karten: beim Hereingleiten einmal Phase 1 … letzte im Takt.
// - Fortschrittsleiste: 13 Segmente, .ist-voll je erreichter Szene, nie anteilig.
// Ruhig (reduzierte Bewegung) und ohne JS: nichts gesetzt → Endzustand jeder Szene, alles untereinander lesbar.
// Test-Hilfe: ?szene=N springt zu Szene N (14 = Schluss); ?szene=N&phase=K hält Szene N auf Phase K (nur zum Prüfen).
import { erstelleBuehne } from './buehne-kern';

const bereich = document.querySelector<HTMLElement>('[data-beispiel]');
const buehne = bereich?.querySelector<HTMLElement>('.bsp-buehne');

interface Szene { li: HTMLElement; wurzel: HTMLElement | null; phasen: number; takt: number; phase: number; aktiv: boolean; uhr: number[] }

if (bereich && buehne) {
  const schritte = Array.from(bereich.querySelectorAll<HTMLElement>('[data-bsp-schritt]'));
  const segmente = Array.from(bereich.querySelectorAll<HTMLElement>('.bsp-segment'));
  const schluss = bereich.querySelector<HTMLElement>('.bsp-schluss');
  const schlussLink = schluss?.querySelector<HTMLAnchorElement>('a');
  const stuecke = schritte.length; // 13 Szenen + Schluss
  const szenen: Szene[] = schritte.filter((li) => li !== schluss).map((li) => {
    const wurzel = li.querySelector<HTMLElement>(':scope > .bsp-szene__bild > .sz');
    return {
      li, wurzel,
      phasen: Math.max(1, Math.min(6, parseInt(wurzel?.dataset.phasen ?? '1', 10) || 1)),
      takt: Math.max(200, parseInt(wurzel?.dataset.takt ?? '900', 10) || 900),
      phase: -1, aktiv: false, uhr: [],
    };
  });

  // Test-Hilfe ?szene=N[&phase=K]
  const such = new URLSearchParams(location.search);
  const zielSzene = Math.min(stuecke, Math.max(0, parseInt(such.get('szene') ?? '0', 10) || 0)) - 1; // Index, -1 = keiner
  const festePhase = such.has('phase') ? Math.max(0, parseInt(such.get('phase') ?? '0', 10) || 0) : -1;

  let aktiv = -1;
  const fuellung: boolean[] = [];

  const setzePhase = (s: Szene, phase: number, istAktiv: boolean) => {
    if (!s.wurzel) return;
    const i = szenen.indexOf(s);
    const p = i === zielSzene && festePhase >= 0 ? Math.min(festePhase, s.phasen) : Math.min(phase, s.phasen);
    if (p !== s.phase) {
      s.phase = p;
      s.wurzel.dataset.phase = String(p);
      s.wurzel.dataset.erreicht = Array.from({ length: p }, (_, k) => k + 1).join(' ');
    }
    if (istAktiv !== s.aktiv) { s.aktiv = istAktiv; s.wurzel.toggleAttribute('data-aktiv', istAktiv); }
  };
  const leeren = (s: Szene) => {
    s.uhr.forEach((u) => clearTimeout(u));
    s.uhr = [];
    s.phase = -1;
    s.aktiv = false;
    if (s.wurzel) { delete s.wurzel.dataset.phase; delete s.wurzel.dataset.erreicht; s.wurzel.removeAttribute('data-aktiv'); }
  };
  const leiste = (k: number) => {
    segmente.forEach((seg, i) => {
      const voll = i <= k;
      if (fuellung[i] !== voll) { fuellung[i] = voll; seg.classList.toggle('ist-voll', voll); }
    });
  };

  const bsp = erstelleBuehne({
    bereich, buehne, schritte, stuecke,
    klassen: { buehne: 'bsp--buehne', gleiten: 'bsp--gleiten' },
    mqBuehne: '(min-width: 48rem) and (min-height: 36rem)',
    aufModus: (modus) => {
      schritte.forEach((li) => li.classList.remove('ist-aktiv', 'ist-vorbei', 'ist-da'));
      segmente.forEach((seg) => seg.classList.remove('ist-voll'));
      fuellung.length = 0;
      aktiv = -1;
      szenen.forEach(leeren);
      // Bühne und Karten starten im Ausgangszustand (Phase 0); ruhig: keine Attribute = Endzustand
      if (modus === 'buehne' || modus === 'gleiten') szenen.forEach((s) => setzePhase(s, 0, false));
    },
    aufStueck: (stueck, anteil, roh) => {
      const k = stueck; // 0 … 12 Szenen, 13 Schluss
      if (k !== aktiv) {
        aktiv = k;
        schritte.forEach((li, i) => {
          li.classList.toggle('ist-aktiv', i === k);
          li.classList.toggle('ist-vorbei', i < k);
        });
        leiste(k);
      }
      szenen.forEach((s, i) => {
        if (i < k) setzePhase(s, s.phasen, false);
        else if (i > k) setzePhase(s, 0, false);
        else setzePhase(s, roh < 0 ? 0 : 1 + Math.floor(anteil * s.phasen), true);
      });
    },
    aufErscheinen: (li) => {
      li.classList.add('ist-da');
      const s = szenen.find((x) => x.li === li);
      if (!s) return;
      setzePhase(s, 0, true);
      // Phase 1 nach dem Hereingleiten, dann im Takt bis zur letzten (einmal)
      for (let p = 1; p <= s.phasen; p++) {
        s.uhr.push(window.setTimeout(() => setzePhase(s, p, true), 350 + (p - 1) * s.takt));
      }
    },
  });

  // Tastatur: bekommt der Knopf „Jetzt starten“ auf der Bühne den Fokus, bevor der Schluss da ist, zum Schluss springen
  schlussLink?.addEventListener('focus', () => {
    if (bsp.modus() !== 'buehne' || schluss?.classList.contains('ist-aktiv')) return;
    bsp.springe(stuecke - 1, 0.5);
  });

  // Test-Hilfe: zur Szene springen (Bühne: Mitte der gewünschten Phase bzw. letzte Phase; Karten: ins Bild holen)
  if (zielSzene >= 0) {
    const springen = () => {
      if (bsp.modus() === 'buehne') {
        const s = szenen[zielSzene];
        const n = s?.phasen ?? 1;
        const anteil = festePhase >= 1 ? (Math.min(festePhase, n) - 0.5) / n : 1 - 0.5 / n;
        bsp.springe(zielSzene, s ? anteil : 0.5);
      } else {
        schritte[zielSzene]?.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
      }
    };
    if (document.readyState === 'complete') requestAnimationFrame(springen);
    else window.addEventListener('load', () => requestAnimationFrame(springen), { once: true });
  }
}

export {}; // Modul (eigener Gültigkeitsbereich)
