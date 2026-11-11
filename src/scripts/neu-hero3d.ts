// Nachlader der 3D-Bühne im Hero von /neu/ (Paket 1). Dieses kleine Skript lädt sofort mit, die Szene selbst nicht.
//
// Reihenfolge: Seite fertig geladen → (am Telefon: erste Berührung, erstes Scrollen oder erste Taste) → Bühne im Bild →
//   Browser im Leerlauf → erst dann der dynamische Import. Bis dahin und bei jedem Fehler steht das Standbild.
// Prüfung darf3d() gleich beim Start: Wunsch nach weniger Bewegung oder Datensparen, langsames Netz, schwaches Gerät → kein 3D.
//   Ob eine echte Grafikkarte da ist, prüft erst der Nachlader im Leerlauf (die Probe kostet Rechenzeit).
// Schalter in der Adresse (für Prüfungen):
//   ?3d=aus   kein 3D
//   ?3d=an    überspringt nur die Geräteprüfung
//   ?3d=fest  erzwingt die Szene auch in Software-Darstellung, ohne Warten auf eine Geste und ohne Bildraten-Wächter;
//             mit &t=<Sekunden> steht die Szene an dieser Stelle der Zeitachse still
//   Wünsche des Besuchers (weniger Bewegung, Datensparen) gelten bei beiden weiter: dann bleibt das Standbild.

type Netz = { saveData?: boolean; effectiveType?: string };
type Geraet = Navigator & { connection?: Netz; deviceMemory?: number };

const frage = new URLSearchParams(location.search);
const wunsch = frage.get('3d');
const fest = wunsch === 'fest';
const erzwungen = fest || wunsch === 'an'; // ohne Geräteprüfung

/** Echte Grafikkarte? Software-Darstellung (ohne Beschleunigung) zählt nicht. */
function grafikkarte(): boolean {
  try {
    const gl = document.createElement('canvas').getContext('webgl2', { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(name);
  } catch {
    return false;
  }
}

function darf3d(): boolean {
  if (wunsch === 'aus' || !('IntersectionObserver' in window)) return false;
  const nav = navigator as Geraet;
  const netz = nav.connection;
  // Wünsche des Besuchers zuerst: sie gelten auch mit den Prüfschaltern
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (netz?.saveData || matchMedia('(prefers-reduced-data: reduce)').matches) return false;
  if (erzwungen) return true;
  if (netz?.effectiveType && /(^|-)[23]g$/.test(netz.effectiveType)) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return false;
  return true;
}

/** Am Telefon erst nach dem ersten Zeichen, dass jemand die Seite benutzt. */
function nachGeste(weiter: () => void): void {
  if (fest || !matchMedia('(max-width: 999px) and (pointer: coarse)').matches) return weiter();
  const arten = ['pointerdown', 'touchstart', 'scroll', 'keydown'] as const;
  const los = () => {
    arten.forEach((art) => removeEventListener(art, los));
    weiter();
  };
  arten.forEach((art) => addEventListener(art, los, { passive: true }));
}

function einrichten(buehne: HTMLElement): void {
  const ziel = buehne.querySelector<HTMLElement>('[data-hero3d-ziel]');
  if (!ziel) return;
  let raeumen: (() => void) | undefined;

  const laden = async () => {
    if (!erzwungen && !grafikkarte()) return; // Standbild bleibt
    try {
      const { starten } = await import('../components/neu/hero3d/start.tsx');
      const t = Number(frage.get('t') ?? NaN);
      raeumen = starten(ziel, {
        onBereit: () => buehne.classList.add('ist-3d'),
        onAusfall: () => buehne.classList.remove('ist-3d'),
        ...(fest ? { fest, ...(Number.isFinite(t) ? { t } : {}) } : {}),
      });
    } catch {
      buehne.classList.remove('ist-3d'); // Standbild bleibt
    }
  };

  const imLeerlauf = () =>
    'requestIdleCallback' in window ? requestIdleCallback(() => void laden(), { timeout: 2500 }) : setTimeout(() => void laden(), 400);

  const wennSichtbar = () => {
    const io = new IntersectionObserver(
      (liste) => {
        if (!liste.some((e) => e.isIntersecting)) return;
        io.disconnect();
        imLeerlauf();
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(buehne);
  };

  addEventListener('pagehide', () => {
    raeumen?.();
    raeumen = undefined;
    buehne.classList.remove('ist-3d');
  });

  const start = () => nachGeste(wennSichtbar);
  if (document.readyState === 'complete') start();
  else addEventListener('load', start, { once: true });
}

const buehne = document.querySelector<HTMLElement>('[data-hero3d]');
if (buehne && darf3d()) einrichten(buehne);

export {};
