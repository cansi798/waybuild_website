// Gemeinsamer Kern für Scroll-Bühnen (verallgemeinert aus der Kundenreise-Bühne vom 12.11.2026, src/scripts/kundenreise.ts).
// Genutzt von: Kundenreise auf der Startseite (kundenreise.ts) und „So kann es laufen“ (beispiel.ts, Jamil Talk qh87y3sj
// #5678/#5680, 13.11.2026).
//
// Drei Modi, die der Kern selbst wählt und bei Änderung der Fenstergröße/Bewegungs-Einstellung neu setzt:
// - 'buehne'  (Media Query `mqBuehne` passt, keine reduzierte Bewegung): Der hohe Bereich bekommt per CSS seine Höhe
//              (Bildschirm + je Scroll-Stück ein Stück Weg), die Bühne darin ist sticky. Der Kern misst die Lage (nur bei
//              Größenänderung) und ruft je Bild (requestAnimationFrame, passiver Scroll-Listener) `aufStueck` mit dem
//              aktuellen Scroll-Stück und dem Anteil darin auf. Bewegung macht CSS (nur transform/opacity).
// - 'gleiten' (sonst, mit IntersectionObserver): `aufErscheinen` je Schritt, sobald er ins Bild kommt (einmal).
// - 'ruhig'   (reduzierte Bewegung oder ohne IntersectionObserver): keine Klasse, alles statisch sichtbar.
// Ohne JS greift keiner der Modi – das CSS muss in der Grundform (ohne Modus-Klasse) alles lesbar zeigen.

export type BuehnenModus = 'buehne' | 'gleiten' | 'ruhig' | '';

export interface BuehnenOptionen {
  /** hoher Bereich (bestimmt den Scrollweg) */
  bereich: HTMLElement;
  /** sticky Bühne im Bereich */
  buehne: HTMLElement;
  /** Schritte/Karten (für den Gleiten-Modus beobachtet) */
  schritte: HTMLElement[];
  /** Anzahl Scroll-Stücke im Bühnen-Modus */
  stuecke: number;
  /** Klassen am Bereich für die Modi */
  klassen: { buehne: string; gleiten: string };
  /** Media Query für den Bühnen-Modus (z. B. '(min-width: 48rem) and (min-height: 36rem)') */
  mqBuehne: string;
  /** Bühnen-Modus, je Bild: stueck = 0 … stuecke−1, anteil = 0 … 1 innerhalb des Stücks, roh = ungeklemmter Fortschritt
   *  über den ganzen Weg (< 0: Bühne steht noch nicht, > 1: Bühne vorbei) */
  aufStueck: (stueck: number, anteil: number, roh: number) => void;
  /** nach jedem Moduswechsel (Zustände zurücksetzen); läuft vor dem ersten aufStueck/aufErscheinen */
  aufModus?: (modus: BuehnenModus) => void;
  /** Gleiten-Modus: Schritt kommt ins Bild (oder liegt schon darüber) */
  aufErscheinen?: (schritt: HTMLElement) => void;
  ioOptionen?: IntersectionObserverInit;
}

export interface Buehne {
  modus: () => BuehnenModus;
  /** Bühnen-Modus: zu einem Scroll-Stück springen (anteil 0 … 1 im Stück, Standard Mitte) */
  springe: (stueck: number, anteil?: number) => void;
  /** Lage neu messen und neu zeichnen */
  neu: () => void;
}

export function erstelleBuehne(o: BuehnenOptionen): Buehne {
  const { bereich, buehne, schritte, stuecke } = o;
  const mqRuhig = matchMedia('(prefers-reduced-motion: reduce)');
  const mqBuehne = matchMedia(o.mqBuehne);
  let modus: BuehnenModus = '';
  let io: IntersectionObserver | null = null;
  let oben = 0; // Oberkante des Bereichs (Dokument)
  let weg = 1; // Scrollweg, auf dem die Bühne steht
  let klebt = 0; // sticky top der Bühne
  let geplant = false;

  const messen = () => {
    oben = bereich.getBoundingClientRect().top + window.scrollY;
    weg = Math.max(1, bereich.offsetHeight - buehne.offsetHeight);
    klebt = parseFloat(getComputedStyle(buehne).top) || 0;
  };
  const zeigen = () => {
    geplant = false;
    if (modus !== 'buehne') return;
    const roh = (window.scrollY + klebt - oben) / weg;
    const p = Math.min(1, Math.max(0, roh));
    const stueck = Math.min(stuecke - 1, Math.floor(p * stuecke));
    const anteil = Math.min(1, Math.max(0, p * stuecke - stueck));
    o.aufStueck(stueck, anteil, roh);
  };
  const planen = () => {
    if (geplant || modus !== 'buehne') return;
    geplant = true;
    requestAnimationFrame(zeigen);
  };

  const setzen = () => {
    const neu: BuehnenModus = mqRuhig.matches ? 'ruhig' : mqBuehne.matches ? 'buehne' : 'IntersectionObserver' in window ? 'gleiten' : 'ruhig';
    if (neu === modus) return;
    modus = neu;
    io?.disconnect();
    io = null;
    bereich.classList.toggle(o.klassen.buehne, modus === 'buehne');
    bereich.classList.toggle(o.klassen.gleiten, modus === 'gleiten');
    o.aufModus?.(modus);
    if (modus === 'buehne') {
      messen();
      zeigen();
    } else if (modus === 'gleiten') {
      io = new IntersectionObserver((eintraege) => {
        eintraege.forEach((e) => {
          // sichtbar oder schon oberhalb (Sprung tiefer in die Seite): zeigen und nicht weiter beobachten
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) { o.aufErscheinen?.(e.target as HTMLElement); io?.unobserve(e.target); }
        });
      }, o.ioOptionen ?? { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      schritte.forEach((s) => io?.observe(s));
    }
  };

  const springe = (stueck: number, anteil = 0.5) => {
    if (modus !== 'buehne') return;
    messen();
    const y = oben - klebt + (weg * (stueck + anteil)) / stuecke;
    window.scrollTo({ top: Math.round(y), behavior: 'instant' as ScrollBehavior });
    zeigen();
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

  return { modus: () => modus, springe, neu: () => { if (modus === 'buehne') { messen(); zeigen(); } } };
}
