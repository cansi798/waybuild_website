// Stapel-Effekt nur am Hero (Jamil, Talk qh87y3sj #5146, eingeschränkt #5152–#5155, 09.11.2026):
// Der Hero bleibt beim Scrollen stehen (CSS position: sticky, nur innerhalb von .stapel-paar), der nächste Abschnitt gleitet mit
// runder Oberkante und Schatten darüber; der Hero dunkelt dabei bis 15 % ab und tritt auf 0,97 zurück. Danach scrollt die Seite
// ganz normal: kein weiterer Abschnitt bleibt stehen, kein Einrasten, Sprungmarken wie gewohnt (Browser).
// Hier nur:
//  - --h (Höhe des Heros, per ResizeObserver) → CSS: top = min(Kopf, 100svh − Leiste − Höhe), damit ein hoher Hero (Handy)
//    erst stehen bleibt, wenn sein Ende sichtbar ist;
//  - --deckt (0…1) aus der gespeicherten natürlichen Lage des nächsten Abschnitts + scrollY, ohne Layout-Abfragen beim Scrollen,
//    einmal je Bild (requestAnimationFrame, passiver Listener).
// Bei reduzierter Bewegung oder ohne ResizeObserver: nichts davon, normales Scrollen.
const paar = document.querySelector<HTMLElement>('main[data-stapel] > .stapel-paar');
const hero = paar?.querySelector<HTMLElement>(':scope > .v-hero');
const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (paar && hero && hero.nextElementSibling && !ruhig && 'ResizeObserver' in window) {
  const kopf = document.getElementById('siteHeader');
  let naechsterOben = 0; // natürliche Oberkante des nächsten Abschnitts (Dokument-Koordinaten)
  let kopfH = 0;
  let zuletzt = -1;
  let geplant = false;

  const schatten = document.createElement('span');
  schatten.className = 'stapel-schatten';
  schatten.setAttribute('aria-hidden', 'true');
  hero.appendChild(schatten);

  const lagen = () => {
    kopfH = kopf ? kopf.offsetHeight : 0;
    naechsterOben = paar.getBoundingClientRect().top + window.scrollY + hero.offsetHeight;
  };
  const decken = () => {
    geplant = false;
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh - (naechsterOben - window.scrollY)) / Math.max(1, vh - kopfH)));
    if (Math.abs(zuletzt - p) > 0.004 || (p === 0) !== (zuletzt === 0)) { zuletzt = p; hero.style.setProperty('--deckt', p.toFixed(3)); }
    // ganz verdeckt (seit der Kundenreise-Bühne, 12.11.2026, ein langer Weg): bewegten Verlauf anhalten, spart Rechenzeit
    hero.classList.toggle('ist-verdeckt', p >= 1);
  };
  const planen = (alles = false) => {
    if (geplant) return;
    geplant = true;
    requestAnimationFrame(() => { if (alles) lagen(); decken(); });
  };

  new ResizeObserver(([e]) => {
    const h = e.borderBoxSize?.[0]?.blockSize ?? hero.offsetHeight;
    hero.style.setProperty('--h', `${Math.round(h)}px`);
    lagen(); decken();
  }).observe(hero);
  document.documentElement.classList.add('stapeln');
  window.addEventListener('scroll', () => planen(), { passive: true });
  window.addEventListener('resize', () => planen(true), { passive: true });
}

// Seite mit #anker geöffnet (gilt immer, auch bei reduzierter Bewegung): Schriften und Bilder ändern danach noch Höhen darüber,
// und WebKit hält die Lage dabei nicht fest (kein Scroll-Anchoring, Ziel lag sonst bis ~140 px daneben). Darum bis 3 s nach dem
// Laden bei jeder Höhenänderung von main, nach „load“ und wenn die Schriften fertig sind, das Ziel neu ausrichten, solange der
// Besucher nicht selbst scrollt. Klicks auf Sprungmarken übernimmt der Browser (scroll-padding = Kopfzeile).
if (location.hash.length > 1 && 'ResizeObserver' in window) {
  let ziel: Element | null = null;
  try { ziel = document.querySelector(decodeURIComponent(location.hash)); } catch { /* kein gültiger Selektor */ }
  const inhalt = document.querySelector('main');
  if (ziel && inhalt) {
    const anker = ziel;
    let selbst = false;
    ['wheel', 'touchmove', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, () => { selbst = true; }, { passive: true, once: true }));
    let bis = performance.now() + 3000;
    const ausrichten = () => {
      if (!selbst && performance.now() < bis) anker.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    };
    const ro = new ResizeObserver(ausrichten);
    ro.observe(inhalt);
    window.addEventListener('load', () => { bis = performance.now() + 3000; ausrichten(); window.setTimeout(() => ro.disconnect(), 3000); }, { once: true });
    document.fonts?.ready.then(ausrichten);
  }
}

export {}; // Modul (eigener Gültigkeitsbereich, kein Namenskonflikt mit startseite.ts)
