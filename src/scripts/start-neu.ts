// Startseite, Neudesign 13.11.2026 (Jamil Talk qh87y3sj #5810): Kundenreise mit stehendem Bildrahmen (components/startneu/SnReise.astro).
// Das Layout (zwei Spalten, Rahmen sticky) entscheidet allein das CSS (html.js + Breite + keine reduzierte Bewegung), damit beim
// Laden nichts springt (CLS 0). Hier nur: welche Station steht gerade in der Bildschirmmitte → passende Szene und Punkt aktiv.
// IntersectionObserver mit einer schmalen Linie in der Mitte des Fensters, kein Scroll-Listener.
const raster = document.querySelector<HTMLElement>('[data-reise]');

if (raster && 'IntersectionObserver' in window) {
  const stationen = Array.from(raster.querySelectorAll<HTMLElement>('[data-station]'));
  const szenen = Array.from(raster.querySelectorAll<HTMLElement>('[data-szene]'));
  let aktiv = 0;
  const setze = (i: number) => {
    if (i === aktiv) return;
    aktiv = i;
    szenen.forEach((s, k) => s.classList.toggle('ist-aktiv', k === i));
    stationen.forEach((s, k) => s.classList.toggle('ist-aktiv', k === i));
  };
  stationen[0]?.classList.add('ist-aktiv');
  const io = new IntersectionObserver((eintraege) => {
    for (const e of eintraege) if (e.isIntersecting) setze(Number((e.target as HTMLElement).dataset.station) || 0);
  }, { rootMargin: '-48% 0px -48% 0px', threshold: 0 });
  stationen.forEach((s) => io.observe(s));
}

// Problem-Kacheln (components/startneu/SnProblem.astro, Jamil #5828/#5833): Kachel wählen = passende Bildfläche einblenden.
// PC mit Maus: Maus/Fokus wählt, im Sichtbereich wechselt es von selbst, bis jemand eingreift. Handy/Tablet: Tippen wählt.
const feld = document.querySelector<HTMLElement>('[data-pfeld]');

if (feld) {
  const kacheln = Array.from(feld.querySelectorAll<HTMLButtonElement>('[data-pp]'));
  const flaechen = Array.from(feld.querySelectorAll<HTMLElement>('[data-pd]'));
  const pc = window.matchMedia('(min-width: 1000px) and (hover: hover) and (pointer: fine)');
  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  let aktiv = 0;
  let selbst: number | undefined;
  let eingegriffen = false;

  const setze = (i: number) => {
    aktiv = i;
    kacheln.forEach((k, n) => { k.classList.toggle('ist-aktiv', n === i); k.setAttribute('aria-expanded', String(n === i)); });
    flaechen.forEach((f, n) => f.classList.toggle('ist-aktiv', n === i));
  };
  const halte = () => { window.clearInterval(selbst); selbst = undefined; };
  const stoppe = () => { eingegriffen = true; halte(); };
  const starte = () => {
    if (eingegriffen || selbst !== undefined || !pc.matches || ruhig.matches) return;
    selbst = window.setInterval(() => setze((aktiv + 1) % kacheln.length), 3800);
  };

  kacheln.forEach((k, i) => {
    k.addEventListener('mouseenter', () => { if (pc.matches) { stoppe(); setze(i); } });
    k.addEventListener('focus', () => { stoppe(); setze(i); });
    k.addEventListener('click', () => { stoppe(); setze(i); });
  });
  pc.addEventListener('change', () => { if (!pc.matches) halte(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? starte() : halte()), { threshold: 0.35 }).observe(feld);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) halte(); });
}

export {}; // Modul (eigener Gültigkeitsbereich, kein Namenskonflikt mit anderen Skripten)
