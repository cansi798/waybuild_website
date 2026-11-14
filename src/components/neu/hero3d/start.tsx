// Einstieg der 3D-Bühne im Hero von /neu/ (Stufe 3). Wird vom Lader (src/scripts/neu-hero3d.ts) erst nach "load" und nur
// bei geeignetem Gerät dynamisch geladen. Hier steht alles, was das Dokument berührt: Leinwand anlegen, Maße vom Standbild
// ablesen, Knopf Anhalten / Abspielen, Hervorhebung der Stations-Beschriftungen. starten() gibt den Abbau zurück.
import { createRoot } from '@react-three/fiber';
import Szene, { type Laufstand, type Steuer, type SzeneProps } from './Szene';

export type { SzeneProps } from './Szene';

const ANHALTEN = 'Animation anhalten';
const ABSPIELEN = 'Animation abspielen';

export function starten(ziel: HTMLElement, props: SzeneProps = {}): () => void {
  const buehne = ziel.parentElement;
  const zeichnung = buehne?.querySelector('svg') ?? null;
  const knopf = buehne?.parentElement?.querySelector<HTMLButtonElement>('[data-hero3d-knopf]') ?? null;
  const knopfText = knopf?.querySelector<HTMLElement>('[data-hero3d-knopf-text]') ?? null;
  const stationen = Array.from(buehne?.parentElement?.querySelectorAll<HTMLElement>('[data-hero3d-station]') ?? []);

  const flaeche = document.createElement('canvas');
  flaeche.style.cssText = 'display:block;width:100%;height:100%';
  ziel.appendChild(flaeche);

  const steuer: Steuer = { umschalten: () => {} };
  let abgebaut = false;

  // Rand und Strichbreite stehen im Stil des Standbilds; die Szene übernimmt beides, damit sich die Bilder decken
  const kante = () => {
    const b = ziel.getBoundingClientRect().width;
    const z = zeichnung?.getBoundingClientRect().width ?? 0;
    return b > 0 && z > 0 ? Math.max(0, (1 - z / b) / 2) : 0.045;
  };
  const strich = () => {
    const s = zeichnung ? parseFloat(getComputedStyle(zeichnung).getPropertyValue('--nh-strich')) : NaN;
    return Number.isFinite(s) && s > 0 ? s : 2.2;
  };

  const zeigeStation = (nr: number) => {
    for (const li of stationen) li.classList.toggle('ist-an', Number(li.dataset.hero3dStation) === nr);
  };
  const zeigeLauf = (stand: Laufstand) => {
    ziel.dataset.hero3dStand = stand;
    if (!knopf) return;
    knopf.dataset.stand = stand;
    if (knopfText) knopfText.textContent = stand === 'laeuft' ? ANHALTEN : ABSPIELEN;
  };
  const druecken = () => steuer.umschalten();

  const wurzel = createRoot(flaeche);
  const mass = () => {
    const r = ziel.getBoundingClientRect();
    return { width: Math.max(1, Math.round(r.width)), height: Math.max(1, Math.round(r.height)), top: 0, left: 0 };
  };
  const einrichten = () =>
    wurzel.configure({
      size: mass(),
      dpr: [1, 1.75],
      linear: true,
      flat: true,
      frameloop: 'demand',
      camera: { fov: 26, near: 0.1, far: 100, position: [0, 0, 12] },
      gl: { antialias: true, alpha: true, powerPreference: 'high-performance' },
    });

  const abbau = () => {
    if (abgebaut) return;
    abgebaut = true;
    groesse.disconnect();
    knopf?.removeEventListener('click', druecken);
    // Stand der Fokus auf dem Knopf, geht er an die Bühne (dort steht jetzt das Standbild), nicht ins Leere
    const fokus = knopf !== null && document.activeElement === knopf;
    if (knopf) knopf.hidden = true;
    if (fokus && buehne) {
      buehne.tabIndex = -1;
      buehne.addEventListener('blur', () => buehne.removeAttribute('tabindex'), { once: true });
      buehne.focus({ preventScroll: true });
    }
    zeigeStation(-1);
    delete ziel.dataset.hero3dStand;
    try {
      wurzel.unmount();
    } catch {
      // Abbau ohne fertigen Aufbau: nichts zu tun
    }
    flaeche.remove();
  };
  const ausfall = () => {
    if (abgebaut) return;
    abbau();
    props.onAusfall?.();
  };

  const groesse = new ResizeObserver(() => {
    if (!abgebaut) void einrichten().catch(() => {});
  });

  einrichten()
    .then(() => {
      if (abgebaut) return;
      wurzel.render(
        <Szene
          {...props}
          steuer={steuer}
          kante={kante}
          strich={strich}
          onStation={zeigeStation}
          onLauf={zeigeLauf}
          onAusfall={ausfall}
          onBereit={() => {
            if (abgebaut) return;
            if (knopf) {
              knopf.hidden = false;
              knopf.addEventListener('click', druecken);
            }
            props.onBereit?.();
          }}
        />,
      );
      groesse.observe(ziel);
    })
    .catch(ausfall);

  return abbau;
}
