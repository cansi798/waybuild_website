// Startseite, Neudesign 13.11.2026 (Jamil Talk qh87y3sj #5810): Kundenreise mit stehendem Bildrahmen (components/startneu/SnReise.astro).
// Das Layout (zwei Spalten, Rahmen sticky) entscheidet allein das CSS (html.js + Breite + keine reduzierte Bewegung), damit beim
// Laden nichts springt (CLS 0). Hier nur: welche Station steht gerade in der Bildschirmmitte → passende Szene und Punkt aktiv.
// IntersectionObserver mit einer schmalen Linie in der Mitte des Fensters, kein Scroll-Listener.
const raster = document.querySelector<HTMLElement>('[data-reise]');

if (raster && 'IntersectionObserver' in window) {
  const stationen = Array.from(raster.querySelectorAll<HTMLElement>('[data-station]'));
  const szenen = Array.from(raster.querySelectorAll<HTMLElement>('[data-szene]'));
  const punkte = Array.from(raster.querySelectorAll<HTMLElement>('[data-punkt]'));
  let aktiv = 0;
  const setze = (i: number) => {
    if (i === aktiv) return;
    aktiv = i;
    szenen.forEach((s, k) => s.classList.toggle('ist-aktiv', k === i));
    punkte.forEach((p, k) => p.classList.toggle('ist-aktiv', k === i));
    stationen.forEach((s, k) => s.classList.toggle('ist-aktiv', k === i));
  };
  stationen[0]?.classList.add('ist-aktiv');
  const io = new IntersectionObserver((eintraege) => {
    for (const e of eintraege) if (e.isIntersecting) setze(Number((e.target as HTMLElement).dataset.station) || 0);
  }, { rootMargin: '-48% 0px -48% 0px', threshold: 0 });
  stationen.forEach((s) => io.observe(s));
}

// Problem-Liste (components/startneu/SnProblem.astro, Jamil #5828): PC mit Maus = Bildfläche zeigt das Problem unter Maus/Fokus und
// wechselt im Sichtbereich von selbst, bis jemand eingreift; Handy/Tablet = Aufklappliste (Tippen öffnet, nochmal Tippen schließt).
// Welche Darstellung gilt, entscheidet dieselbe Media Query wie im CSS.
const feld = document.querySelector<HTMLElement>('[data-pfeld]');

if (feld) {
  const zeilen = Array.from(feld.querySelectorAll<HTMLElement>('[data-pp]'));
  const knoepfe = zeilen.map((z) => z.querySelector<HTMLButtonElement>('.sn-pp__knopf')!);
  const pc = window.matchMedia('(min-width: 1000px) and (hover: hover) and (pointer: fine)');
  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  let aktiv = 0;
  let selbst: number | undefined;
  let eingegriffen = false;

  const setze = (i: number) => {
    aktiv = i;
    zeilen.forEach((z, k) => z.classList.toggle('ist-aktiv', k === i));
    knoepfe.forEach((b, k) => b.setAttribute('aria-expanded', String(k === i)));
  };
  const stoppe = () => { eingegriffen = true; window.clearInterval(selbst); selbst = undefined; };
  const starte = () => {
    if (eingegriffen || selbst !== undefined || !pc.matches || ruhig.matches) return;
    selbst = window.setInterval(() => setze((aktiv + 1) % zeilen.length), 3800);
  };
  const halte = () => { window.clearInterval(selbst); selbst = undefined; };

  zeilen.forEach((z, i) => {
    z.addEventListener('mouseenter', () => { if (pc.matches) { stoppe(); setze(i); } });
    knoepfe[i].addEventListener('focus', () => { if (pc.matches) { stoppe(); setze(i); } });
    knoepfe[i].addEventListener('click', () => {
      stoppe();
      if (pc.matches) setze(i);
      else setze(aktiv === i ? -1 : i); // -1 = alle zu
    });
  });
  // Am PC ist immer eins offen: beim Wechsel vom Handy- ins PC-Layout (Fenster breiter) ggf. das erste zeigen
  pc.addEventListener('change', () => { if (pc.matches && aktiv < 0) setze(0); if (!pc.matches) halte(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? starte() : halte()), { threshold: 0.35 }).observe(feld);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) halte(); });
}

export {}; // Modul (eigener Gültigkeitsbereich, kein Namenskonflikt mit anderen Skripten)
