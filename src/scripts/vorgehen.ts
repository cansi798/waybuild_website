// „So gehen wir vor“ (Jamil #5188/#5190): Schritte erscheinen beim ersten Sichtkontakt nacheinander, die Linie zeichnet sich.
// Nur mit IntersectionObserver und ohne reduzierte Bewegung; sonst (und ohne JS) bleibt alles sichtbar. Einmalig, kein Scroll-Handler.
const listen = document.querySelectorAll<HTMLElement>('[data-vorgehen]');
const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!ruhig && 'IntersectionObserver' in window && listen.length) {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('ist-los');
      io.unobserve(e.target);
    }),
    { threshold: 0.2 },
  );
  listen.forEach((el) => {
    // Schon sichtbar (z. B. Sprung auf #erstberatung): nicht erst verstecken
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return;
    el.classList.add('vg-bereit');
    io.observe(el);
  });
}

export {};
