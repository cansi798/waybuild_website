// Bewegung der Startseite „Unternehmensauftritt“ (Jamil, Talk 4768). Nur transform, opacity und stroke-dashoffset.
// 1. [data-p]: Fortschritt --p (0…1) beim Scrollen, nur solange das Element im Sichtbereich ist (rAF-gedrosselt).
//    data-p="vs": Bühne „Verschmelzen“ (Hero / Ergebnis), sonst Standard-Verlauf (Oberkante 85 % → 25 % der Fensterhöhe,
//    verlängert um einen Teil der Elementhöhe).
// 2. [data-fokus]: Karte im Fokus (Arbeitsweise) als data-aktiv am Container.
// 3. [data-zeichne]: Klasse .ist-los beim ersten Sichtkontakt (Linien zeichnen, Folgen erscheinen).
// 4. [data-schweben] / [data-schleife]: Dauer-Animationen laufen nur im Sichtbereich (.ist-sichtbar).
// Bei reduzierter Bewegung: nichts davon außer 3 (dort greifen CSS-Endzustände); ohne JS steht alles fertig da.
const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const zeichne = document.querySelectorAll<HTMLElement>('[data-zeichne]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('ist-los'); io.unobserve(e.target); } }),
    { threshold: 0.3 },
  );
  zeichne.forEach((el) => io.observe(el));
} else zeichne.forEach((el) => el.classList.add('ist-los'));

if (!ruhig && 'IntersectionObserver' in window) {
  const sichtbar = new IntersectionObserver(
    (es) => es.forEach((e) => e.target.classList.toggle('ist-sichtbar', e.isIntersecting)),
    { rootMargin: '0px' },
  );
  document.querySelectorAll('[data-schweben], [data-schleife]').forEach((el) => sichtbar.observe(el));

  const els = [...document.querySelectorAll<HTMLElement>('[data-p], [data-fokus]')];
  const aktiv = new Set<HTMLElement>();
  let geplant = false;

  const rechne = () => {
    geplant = false;
    const vh = innerHeight;
    aktiv.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (el.hasAttribute('data-fokus')) {
        const karten = [...el.children] as HTMLElement[];
        let idx = 0;
        if (karten.length > 1 && Math.abs(karten[0].getBoundingClientRect().top - karten[1].getBoundingClientRect().top) < 4) {
          // nebeneinander: Fokus wandert mit dem Fortschritt durch die Karten
          const p = clamp((vh * 0.8 - r.top) / (vh * 0.5 + r.height * 0.5));
          idx = Math.min(karten.length - 1, Math.floor(p * karten.length));
        } else {
          // untereinander: die Karte, die der Bildschirmmitte am nächsten ist
          let best = Infinity;
          karten.forEach((k, i) => { const kr = k.getBoundingClientRect(); const d = Math.abs(kr.top + kr.height / 2 - vh * 0.5); if (d < best) { best = d; idx = i; } });
        }
        if (el.dataset.aktiv !== String(idx)) el.dataset.aktiv = String(idx);
        return;
      }
      let p: number;
      if (el.dataset.p === 'vs') {
        // Bühne verschmilzt, während sie von ihrer Startposition bis ins obere Drittel wandert
        // (im Hero: Startposition = Lage beim Laden, damit oben beim Laden alles einzeln schwebt)
        const start = el.closest('.sh') ? Math.min(vh * 0.95, r.top + scrollY) : vh * 0.95;
        const ziel = vh * 0.38 - r.height * 0.5;
        const weg = Math.max(260, start - ziel);
        p = clamp((start - r.top) / weg);
      } else {
        const f = Number(el.dataset.pLang || 0.35);
        p = clamp((vh * 0.85 - r.top) / (vh * 0.6 + r.height * f));
      }
      el.style.setProperty('--p', p.toFixed(3));
    });
  };
  const plane = () => { if (!geplant) { geplant = true; requestAnimationFrame(rechne); } };

  // Beim Laden NICHT rechnen (kein erzwungenes Layout, gut für die Ladezeit): oben gilt ohnehin --p: 0.
  // Erst beim Scrollen; wurde die Seite schon gescrollt geladen (Anker, Zurück), einmal nach dem Laden.
  let los = false;
  const nah = new IntersectionObserver(
    (es) => { es.forEach((e) => (e.isIntersecting ? aktiv.add(e.target as HTMLElement) : aktiv.delete(e.target as HTMLElement))); if (los) plane(); },
    { rootMargin: '15% 0px' },
  );
  els.forEach((el) => nah.observe(el));
  const start = () => { los = true; plane(); };
  addEventListener('scroll', () => (los ? plane() : start()), { passive: true });
  addEventListener('resize', plane, { passive: true });
  addEventListener('load', () => setTimeout(() => { if (!los && scrollY > 0) start(); }, 1200), { once: true });
}
