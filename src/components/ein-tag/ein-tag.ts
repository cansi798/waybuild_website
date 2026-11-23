// „Ein Tag mit der Web-App“ (Jamil #7107/#7108): Ablauf über die Scroll-Position.
// PC (ab 960 px Breite und 600 px Höhe): .et--buehne → Abschnitt sticky, Station = Scroll-Fortschritt, Uhr läuft zwischen den Zeiten weiter.
// Schmaler: Stationen untereinander, IntersectionObserver startet die Animation einer Station, sobald sie im Bild ist.
// „Bewegung reduzieren“: Skript macht nichts → alle Stationen statisch im Endzustand (wie ohne JS).

const root = document.querySelector<HTMLElement>('[data-et]');
const bewegungAus = window.matchMedia('(prefers-reduced-motion: reduce)');

function minuten(zeit: string): number {
  const [h, m] = zeit.split(':').map(Number);
  return h * 60 + m;
}
function alsZeit(min: number): string {
  const h = Math.floor(min / 60);
  const m = Math.floor(min % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
const weich = (t: number) => t * t * (3 - 2 * t);

if (root && !bewegungAus.matches) {
  const buehne = root.querySelector<HTMLElement>('.et-buehne')!;
  const sticky = root.querySelector<HTMLElement>('.et-sticky')!;
  const stationen = [...root.querySelectorAll<HTMLElement>('[data-et-station]')];
  const marken = [...root.querySelectorAll<HTMLElement>('[data-et-marke]')];
  const uhr = root.querySelector<HTMLElement>('[data-et-uhr]')!;
  const zeiten = stationen.map((s) => minuten(s.dataset.zeit ?? '00:00'));
  const pc = window.matchMedia('(min-width: 960px) and (min-height: 600px)');
  const n = stationen.length;

  root.classList.add('et--js');

  let aktiv = -1;
  let rafId = 0;
  let beobachter: IntersectionObserver | null = null;

  const setzeAktiv = (i: number) => {
    if (i === aktiv) return;
    aktiv = i;
    stationen.forEach((s, k) => {
      s.classList.toggle('ist-aktiv', k === i);
      s.classList.toggle('ist-vorbei', k < i);
    });
    marken.forEach((m, k) => {
      m.classList.toggle('ist-aktiv', k === i);
      m.classList.toggle('ist-erreicht', k <= i);
    });
  };

  const aufScroll = () => {
    rafId = 0;
    const r = buehne.getBoundingClientRect();
    const weg = r.height - sticky.offsetHeight;
    const top = parseFloat(getComputedStyle(sticky).top) || 0;
    const p = Math.min(1, Math.max(0, (top - r.top) / Math.max(1, weg)));
    // Jede Station hat 1/n des Wegs: erst steht die Uhr, im letzten Teil läuft sie zur nächsten Zeit
    const seg = Math.min(n - 0.0001, p * n);
    const i = Math.floor(seg);
    const f = seg - i;
    const lauf = i < n - 1 ? weich(Math.max(0, (f - 0.5) / 0.5)) : 0;
    const min = zeiten[i] + lauf * ((zeiten[i + 1] ?? zeiten[i]) - zeiten[i]);
    uhr.textContent = alsZeit(min);
    root.style.setProperty('--et-p', String(i / (n - 1) + lauf / (n - 1)));
    setzeAktiv(i);
  };
  const anfordern = () => { if (!rafId) rafId = requestAnimationFrame(aufScroll); };

  const modusPc = () => {
    beobachter?.disconnect();
    beobachter = null;
    root.classList.add('et--buehne');
    aktiv = -1;
    window.addEventListener('scroll', anfordern, { passive: true });
    window.addEventListener('resize', anfordern);
    aufScroll();
  };

  const modusHandy = () => {
    window.removeEventListener('scroll', anfordern);
    window.removeEventListener('resize', anfordern);
    root.classList.remove('et--buehne');
    root.style.removeProperty('--et-p');
    aktiv = -1;
    stationen.forEach((s) => s.classList.remove('ist-aktiv', 'ist-vorbei'));
    beobachter = new IntersectionObserver((eintraege) => {
      for (const e of eintraege) {
        if (e.isIntersecting) {
          e.target.closest('[data-et-station]')?.classList.add('ist-aktiv'); // beobachtet wird die Abbildung
          beobachter?.unobserve(e.target); // einmal abspielen, dann im Endzustand bleiben
        }
      }
    }, { rootMargin: '0px 0px -30% 0px', threshold: 0.2 });
    stationen.forEach((s) => beobachter!.observe(s.querySelector('.et-station__bild') ?? s));
  };

  const wechsel = () => (pc.matches ? modusPc() : modusHandy());
  pc.addEventListener('change', wechsel);
  bewegungAus.addEventListener('change', () => window.location.reload());
  wechsel();
}
