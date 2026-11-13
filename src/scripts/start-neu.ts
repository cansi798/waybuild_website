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

export {}; // Modul (eigener Gültigkeitsbereich, kein Namenskonflikt mit anderen Skripten)
