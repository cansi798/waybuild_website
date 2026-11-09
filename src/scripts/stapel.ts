// Stapel-Effekt der Startseite (Jamil, Talk qh87y3sj #5146, 08.11.2026; Vorbild Funkelfilm Commit 4a874f7):
// Jeder Abschnitt (main[data-stapel] > section) bleibt beim Scrollen stehen (CSS position: sticky), der nächste schiebt sich
// mit runder Oberkante und Schatten darüber; der verdeckte Abschnitt dunkelt bis 15 % ab und tritt auf 0,97 zurück.
// Hier nur:
//  - je Abschnitt --h (Höhe, per ResizeObserver; ändert sich nur bei Größenänderung) → CSS: top = min(Kopf, 100svh − Leiste − Höhe),
//    so bleiben hohe Abschnitte (Handy) stehen, wenn ihr ENDE erreicht ist, und werden vollständig gelesen;
//  - je Abschnitt --deckt (0…1): ohne Layout-Abfragen beim Scrollen aus gespeicherten natürlichen Lagen + scrollY, einmal je Bild
//    (requestAnimationFrame, passiver Listener);
//  - sanftes Einrasten per JS: Bleibt das Scrollen nahe (≤ 15 % Bildschirmhöhe, höchstens 120 px) vor/nach einem
//    Abschnittsanfang stehen, gleitet die Seite dorthin. CSS scroll-snap (proximity) wurde getestet und verworfen: bei
//    1920 × 1080 zog es nach kleinen Rad-Schritten immer wieder an den Anfang zurück (Seite „klemmte“);
//  - Sprungmarken (#pakete usw.) landen an der natürlichen Lage, nicht an der gerade „klebenden“.
// Bei reduzierter Bewegung oder ohne ResizeObserver: nichts davon, normales Scrollen.
const main = document.querySelector<HTMLElement>('main[data-stapel]');
const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (main && !ruhig && 'ResizeObserver' in window) {
  const html = document.documentElement;
  const kopf = document.getElementById('siteHeader');
  const karten = Array.from(main.children).filter((el): el is HTMLElement => el.tagName === 'SECTION');
  const hoehen = karten.map(() => 0);
  const oben0: number[] = [];
  const zuletzt: number[] = karten.map(() => -1);
  let kopfH = 0;
  let geplant = false;

  // Abdunkel-Schicht je Abschnitt
  karten.forEach((k) => { const s = document.createElement('span'); s.className = 'stapel-schatten'; s.setAttribute('aria-hidden', 'true'); k.appendChild(s); });

  const lagen = () => {
    // natürliche Lage (ohne sticky): Oberkante von main + Summe der Höhen davor
    let y = main.getBoundingClientRect().top + window.scrollY;
    kopfH = kopf ? kopf.offsetHeight : 0;
    for (let i = 0; i < karten.length; i++) { oben0[i] = y; y += hoehen[i]; }
  };
  const decken = () => {
    geplant = false;
    const Y = window.scrollY, vh = window.innerHeight, weg = Math.max(1, vh - kopfH);
    for (let i = 0; i < karten.length - 1; i++) {
      const p = Math.min(1, Math.max(0, (vh - (oben0[i + 1] - Y)) / weg));
      if (Math.abs(zuletzt[i] - p) > 0.004 || (p === 0) !== (zuletzt[i] === 0)) { zuletzt[i] = p; karten[i].style.setProperty('--deckt', p.toFixed(3)); }
    }
  };
  const planen = (alles = false) => { if (geplant) return; geplant = true; requestAnimationFrame(() => { if (alles) lagen(); decken(); }); };

  let gemessen = false;
  let wacheNach: () => void = () => {};
  let sprungBis = 0;
  const ro = new ResizeObserver((eintraege) => {
    for (const e of eintraege) {
      const i = karten.indexOf(e.target as HTMLElement);
      if (i < 0) continue;
      const h = e.borderBoxSize?.[0]?.blockSize ?? (e.target as HTMLElement).offsetHeight;
      hoehen[i] = h; (e.target as HTMLElement).style.setProperty('--h', `${Math.round(h)}px`);
    }
    lagen(); decken();
    if (!gemessen) { gemessen = true; if (location.hash) springe(location.hash, false); }
    wacheNach();
  });
  karten.forEach((k) => ro.observe(k));
  html.classList.add('stapeln');
  window.addEventListener('scroll', () => planen(), { passive: true });
  window.addEventListener('resize', () => planen(true), { passive: true });

  // Sprungmarken: Ziel an seiner natürlichen Lage anfahren (Abschnittsanfang + Abstand des Ziels im Abschnitt)
  // Abstand oben = Höhe der Kopfzeile (nicht scroll-padding aus getComputedStyle: WebKit liefert dort einen anderen Wert)
  const abstandOben = () => (kopf ? kopf.offsetHeight : kopfH);
  // Natürliche Lage des Ziels exakt messen: Stapel kurz aus (kein sticky/transform), messen, wieder an. Nur bei Klick/Laden,
  // nie beim Scrollen. (Rechnen aus gespeicherten Lagen wich in WebKit beim Laden mit #anker um ~50 px ab.)
  const zielY = (ziel: HTMLElement) => {
    if (!karten.some((k) => k === ziel || k.contains(ziel))) return null;
    html.classList.remove('stapeln');
    const y = ziel.getBoundingClientRect().top + window.scrollY - abstandOben();
    html.classList.add('stapeln');
    return Math.max(0, y);
  };
  const springe = (hash: string, sanft: boolean) => {
    if (!hash || hash === '#') return false;
    let ziel: HTMLElement | null = null;
    try { ziel = document.querySelector<HTMLElement>(decodeURIComponent(hash)); } catch { return false; }
    if (!ziel) return false;
    const y = zielY(ziel);
    if (y === null) return false;
    sprungBis = performance.now() + 1500; // danach nicht gleich wieder einrasten
    // „instant“ statt „auto“: auto folgt dem globalen scroll-behavior: smooth und würde gleiten
    window.scrollTo({ top: y, behavior: sanft ? 'smooth' : ('instant' as ScrollBehavior) });
    return true;
  };
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return;
    if (springe(a.hash, true)) { e.preventDefault(); history.pushState(null, '', a.hash); }
  });
  // Seite mit #anker geöffnet: nach dem ersten Messen (oben im ResizeObserver) und nach dem Laden (WebKit scrollt selbst nach)
  // WebKit springt nach „load“ selbst noch einmal zum Anker, und Schriften/Bilder ändern danach noch Höhen: in den ersten
  // 3 s nach dem Laden bei jeder fremden Bewegung, jeder Höhenänderung und wenn die Schriften fertig sind, neu ausrichten
  // (entprellt), solange der Besucher nicht selbst scrollt.
  let selbst = false;
  ['wheel', 'touchmove', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, () => { selbst = true; }, { passive: true, once: true }));
  let wacheBis = 0, wacheT = 0;
  const nachstellen = () => {
    if (!location.hash || selbst || performance.now() > wacheBis) return;
    clearTimeout(wacheT);
    wacheT = window.setTimeout(() => { if (!selbst) { lagen(); springe(location.hash, false); } }, 120);
  };
  wacheNach = nachstellen;
  window.addEventListener('load', () => {
    if (!location.hash) return;
    wacheBis = performance.now() + 3000;
    nachstellen();
    window.addEventListener('scroll', nachstellen, { passive: true });
    document.fonts?.ready.then(nachstellen);
  });

  // Sanftes Einrasten nach dem Scrollen (nicht während Finger/Maus gedrückt, nicht nach eigenem Sprung)
  let gedrueckt = false, eigen = false, ruheTimer = 0;
  window.addEventListener('pointerdown', () => { gedrueckt = true; }, { passive: true });
  window.addEventListener('pointerup', () => { gedrueckt = false; }, { passive: true });
  window.addEventListener('touchstart', () => { gedrueckt = true; }, { passive: true });
  window.addEventListener('touchend', () => { gedrueckt = false; }, { passive: true });
  const einrasten = () => {
    if (gedrueckt || performance.now() < sprungBis) return;
    if (eigen) { eigen = false; return; }
    const Y = window.scrollY, vh = window.innerHeight, grenze = Math.min(120, vh * 0.15);
    let bestes: number | null = null;
    for (let i = 1; i < karten.length; i++) { const ziel = oben0[i] - kopfH; const d = Math.abs(ziel - Y); if (d > 2 && d <= grenze && (bestes === null || d < Math.abs(bestes - Y))) bestes = ziel; }
    if (bestes !== null) { eigen = true; window.scrollTo({ top: bestes, behavior: 'smooth' }); }
  };
  const fenster: Window = window; // eigene Variable, damit TypeScript „window“ im else-Zweig nicht auf never verengt
  if ('onscrollend' in fenster) window.addEventListener('scrollend', einrasten, { passive: true });
  else window.addEventListener('scroll', () => { clearTimeout(ruheTimer); ruheTimer = window.setTimeout(einrasten, 180); }, { passive: true });
}

export {}; // Modul (eigener Gültigkeitsbereich, kein Namenskonflikt mit startseite.ts)
