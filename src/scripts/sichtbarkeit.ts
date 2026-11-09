// „Was wir für Ihre Sichtbarkeit tun.“ (Jamil, Talk qh87y3sj #5363): jedes Feld bewegt sich einmal beim ersten Sichtkontakt
// (Balken wachsen, Linie zeichnet sich, Markierung fällt, Antwort erscheint Wort für Wort). Nur mit IntersectionObserver und ohne
// reduzierte Bewegung; sonst (und ohne JS) steht alles fertig da. Schon sichtbare Felder werden nicht erst versteckt.
const felder = document.querySelectorAll<HTMLElement>('[data-sicht]');
const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!ruhig && 'IntersectionObserver' in window && felder.length) {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('ist-los');
      io.unobserve(e.target);
    }),
    { threshold: 0.35 },
  );
  felder.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return;
    el.classList.add('sb-bereit');
    io.observe(el);
  });
}

export {};
