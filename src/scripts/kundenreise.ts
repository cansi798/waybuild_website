// Kundenreise als „Bühne“ (Jamil, Talk qh87y3sj #5596/#5598/#5599/#5601/#5602, Variante A, 12.11.2026; Sicherung Tag
// vor-kundenreise-buehne-20261112). Stil: src/styles/kundenreise.css (.krb-*), Markup: src/pages/index.astro (#kundenreise).
// Ersetzt die Journey-Map mit Glühbirnen-Knöpfen (die Antworten stehen jetzt immer sichtbar in jedem Schritt).
// - Rechner (ab 48rem breit und 36rem hoch): .krb--buehne. Der Bereich bekommt per CSS seine feste Höhe (Bildschirm + je Schritt
//   ein Scroll-Stück), die Bühne darin ist sticky. Hier nur: aus der Scroll-Lage den aktiven Schritt bestimmen (.ist-aktiv,
//   frühere .ist-vorbei) und die Fortschrittsleiste füllen (--f je Segment). Einmal je Bild (requestAnimationFrame, passiv),
//   Lagen nur bei Größenänderung gemessen. Bewegung macht CSS (nur transform/opacity).
// - Handy und kleine Fenster: .krb--gleiten, jede Karte gleitet beim Hereinscrollen einmal herein (IntersectionObserver).
// - Reduzierte Bewegung oder ohne JS: keine Klasse, alles sofort sichtbar untereinander.
// Wechselt die Fenstergröße oder die Bewegungs-Einstellung, wird der Zustand neu gesetzt.
const bereich = document.querySelector<HTMLElement>('[data-kundenreise]');
const buehne = bereich?.querySelector<HTMLElement>('.krb-buehne');

if (bereich && buehne) {
  const schritte = Array.from(bereich.querySelectorAll<HTMLElement>('[data-krb-schritt]'));
  const segmente = Array.from(bereich.querySelectorAll<HTMLElement>('.krb-segment'));
  const n = schritte.length;
  bereich.style.setProperty('--krb-n', String(n));
  const mqRuhig = matchMedia('(prefers-reduced-motion: reduce)');
  const mqBuehne = matchMedia('(min-width: 48rem) and (min-height: 36rem)');
  let modus = '';
  let io: IntersectionObserver | null = null;
  let oben = 0; // Oberkante des Bereichs (Dokument)
  let weg = 1; // Scrollweg, auf dem die Bühne steht
  let klebt = 0; // sticky top der Bühne
  let aktiv = -1;
  let geplant = false;
  const fuellung: string[] = [];

  const messen = () => {
    oben = bereich.getBoundingClientRect().top + window.scrollY;
    weg = Math.max(1, bereich.offsetHeight - buehne.offsetHeight);
    klebt = parseFloat(getComputedStyle(buehne).top) || 0;
  };
  const zeigen = () => {
    geplant = false;
    if (modus !== 'buehne') return;
    const p = Math.min(1, Math.max(0, (window.scrollY + klebt - oben) / weg));
    const k = Math.min(n - 1, Math.floor(p * n));
    if (k !== aktiv) {
      aktiv = k;
      schritte.forEach((s, i) => {
        s.classList.toggle('ist-aktiv', i === k);
        s.classList.toggle('ist-vorbei', i < k);
      });
    }
    segmente.forEach((seg, i) => {
      const f = Math.min(1, Math.max(0, p * n - i)).toFixed(3);
      if (fuellung[i] !== f) { fuellung[i] = f; seg.style.setProperty('--f', f); }
    });
  };
  const planen = () => {
    if (geplant || modus !== 'buehne') return;
    geplant = true;
    requestAnimationFrame(zeigen);
  };

  const setzen = () => {
    const neu = mqRuhig.matches ? 'ruhig' : mqBuehne.matches ? 'buehne' : 'IntersectionObserver' in window ? 'gleiten' : 'ruhig';
    if (neu === modus) return;
    modus = neu;
    io?.disconnect();
    io = null;
    bereich.classList.toggle('krb--buehne', modus === 'buehne');
    bereich.classList.toggle('krb--gleiten', modus === 'gleiten');
    schritte.forEach((s) => s.classList.remove('ist-aktiv', 'ist-vorbei', 'ist-da'));
    aktiv = -1;
    fuellung.length = 0;
    if (modus === 'buehne') {
      messen();
      zeigen();
    } else if (modus === 'gleiten') {
      io = new IntersectionObserver((eintraege) => {
        eintraege.forEach((e) => {
          // sichtbar oder schon oberhalb (Sprung tiefer in die Seite): zeigen und nicht weiter beobachten
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) { e.target.classList.add('ist-da'); io?.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      schritte.forEach((s) => io?.observe(s));
    }
  };

  setzen();
  mqRuhig.addEventListener('change', setzen);
  mqBuehne.addEventListener('change', setzen);
  window.addEventListener('scroll', planen, { passive: true });
  window.addEventListener('resize', () => { if (modus === 'buehne') { messen(); planen(); } }, { passive: true });
  // Höhen darüber ändern sich noch (Schriften, Bilder): Lage neu messen
  if ('ResizeObserver' in window) {
    const inhalt = document.querySelector('main');
    if (inhalt) new ResizeObserver(() => { if (modus === 'buehne') { messen(); planen(); } }).observe(inhalt);
  }
}

export {}; // Modul (eigener Gültigkeitsbereich)
