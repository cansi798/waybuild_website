// 3D-Bühne im Hero von /neu/ (Stufe 3): einmaliger Lauf von etwa 11 Sekunden, danach Ruhe (Bild steht, keine Bildberechnung).
// Die Szene zeichnet nur, was die Zeitachse (zeitachse.ts) für die aktuelle Zeit vorgibt; die Zeit kommt von der Uhr,
// nicht von der Bildzahl. Gerechnet wird im Anzeige-Farbraum (linear + flat in start.tsx), damit das erste Bild
// zum Standbild passt. Effekte: feines Leuchten (Bloom) und Randabdunklung (Vignette, wächst erst mit dem Aufbau);
// Kanten glättet der Effekt-Durchlauf.
import { useCallback, useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import type { EffectComposer as Komponist, VignetteEffect } from 'postprocessing';
import { Group, type PerspectiveCamera } from 'three';
import Lichtpunkt from './Lichtpunkt';
import Verwaltung from './Verwaltung';
import Website from './Website';
import { E, type Anwender, type Melder } from './form';
import { DAUER, zustand } from './zeitachse';

// Nur was die Szene als Element braucht (die Effekte hängen an einer Gruppe); so bleibt three.js schlank
extend({ Group });

export type Laufstand = 'laeuft' | 'steht' | 'ruhe';
export type Steuer = { umschalten: () => void };

export type SzeneProps = {
  onBereit?: () => void; // erstes Bild steht
  onAusfall?: () => void; // zurück zum Standbild
  fest?: boolean; // ?3d=fest: auch Software-Darstellung, ohne Bildraten-Wächter
  t?: number; // &t=<Sekunden>: Szene steht an dieser Stelle still
  onStation?: (nr: number) => void; // erreichte Station 0 … 4, sonst -1 (für die Beschriftungen unter der Bühne)
  onLauf?: (stand: Laufstand) => void; // für den Knopf Anhalten / Abspielen
  steuer?: Steuer; // die Szene trägt hier ihr Umschalten ein
  kante?: () => number; // freier Rand links und rechts der Zeichnung, Anteil der Bühnenbreite
  strich?: () => number; // Strichbreite in Einheiten der Zeichnung
};

const BLICK = 26; // Öffnungswinkel der Kamera in Grad (lang, ruhig)
const BREITE = 732; // Breite der Zeichnung in ihren Einheiten
const NEIGUNG = (3 * Math.PI) / 180; // höchstens 3° mit der Maus
const MESSEN = 60; // Bilder für den Bildraten-Wächter
const RAND = 0.25; // stärkste Randabdunklung (im Entwurf 0: das erste Bild gleicht dem Standbild)

export default function Szene({ onBereit, onAusfall, fest, t, onStation, onLauf, steuer, kante, strich }: SzeneProps) {
  const gl = useThree((s) => s.gl);
  const kamera = useThree((s) => s.camera) as PerspectiveCamera;
  const groesse = useThree((s) => s.size);
  const setFrameloop = useThree((s) => s.setFrameloop);
  const setDpr = useThree((s) => s.setDpr);
  const invalidate = useThree((s) => s.invalidate);

  const [effekte, setEffekte] = useState(true);
  const komponist = useRef<Komponist>(null);
  const rand = useRef<VignetteEffect>(null);
  const anwender = useRef(new Set<Anwender>());
  const melde = useCallback<Melder>((f) => {
    anwender.current.add(f);
    return () => anwender.current.delete(f);
  }, []);

  const steht = fest === true && typeof t === 'number';
  const lauf = useRef({
    t: steht ? (t as number) : 0,
    laeuft: !steht,
    letzte: 0,
    sichtbar: true,
    bereit: 0,
    gemeldet: false,
    aus: false,
    bilder: 0,
    summe: 0,
    station: -2,
    stand: '' as Laufstand | '',
    abstand: 12,
    breite: 2 * E,
    neig: [0, 0],
    ziel: [0, 0],
  });

  // Bildtakt: unsichtbar = nichts, im Lauf = jedes Bild, sonst nur auf Anforderung
  const takt = useCallback(() => {
    const l = lauf.current;
    l.letzte = 0;
    if (l.aus || !l.sichtbar) {
      setFrameloop('never');
      return;
    }
    setFrameloop(l.laeuft && l.t < DAUER ? 'always' : 'demand');
    invalidate();
  }, [setFrameloop, invalidate]);

  const meldeStand = useCallback(() => {
    const l = lauf.current;
    const stand: Laufstand = l.t >= DAUER ? 'ruhe' : l.laeuft ? 'laeuft' : 'steht';
    if (stand !== l.stand) {
      l.stand = stand;
      onLauf?.(stand);
    }
  }, [onLauf]);

  const ausfall = useCallback(() => {
    const l = lauf.current;
    if (l.aus) return;
    l.aus = true;
    setFrameloop('never');
    onAusfall?.();
  }, [setFrameloop, onAusfall]);

  // Knopf Anhalten / Abspielen: im Lauf anhalten, sonst weiter; nach dem Ende von vorn
  useEffect(() => {
    if (!steuer) return;
    steuer.umschalten = () => {
      const l = lauf.current;
      if (l.t >= DAUER) {
        l.t = 0;
        l.laeuft = true;
      } else {
        l.laeuft = !l.laeuft;
      }
      meldeStand();
      takt();
    };
    return () => {
      steuer.umschalten = () => {};
    };
  }, [steuer, takt, meldeStand]);

  // Kein Rendern, wenn die Bühne nicht im Bild ist oder der Tab im Hintergrund liegt; Kontextverlust = Ausfall
  useEffect(() => {
    const l = lauf.current;
    const flaeche = gl.domElement;
    let imBild = true;
    const pruefe = () => {
      const sichtbar = imBild && !document.hidden;
      if (sichtbar === l.sichtbar) return;
      l.sichtbar = sichtbar;
      takt();
    };
    const waechter = new IntersectionObserver(
      ([e]) => {
        imBild = e.isIntersecting;
        pruefe();
      },
      { threshold: 0.05 },
    );
    waechter.observe(flaeche);
    document.addEventListener('visibilitychange', pruefe);
    flaeche.addEventListener('webglcontextlost', ausfall);

    // Leichte Neigung mit der Maus, nur am Desktop und erst im Ruhebild
    const fein = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const rahmen = flaeche.parentElement;
    const zeig = (e: PointerEvent) => {
      const r = flaeche.getBoundingClientRect();
      l.ziel = [
        -Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)) * NEIGUNG,
        Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)) * NEIGUNG * 0.6,
      ];
      if (l.t >= DAUER) invalidate();
    };
    const weg = () => {
      l.ziel = [0, 0];
      if (l.t >= DAUER) invalidate();
    };
    if (fein && rahmen) {
      rahmen.addEventListener('pointermove', zeig);
      rahmen.addEventListener('pointerleave', weg);
    }
    return () => {
      waechter.disconnect();
      document.removeEventListener('visibilitychange', pruefe);
      flaeche.removeEventListener('webglcontextlost', ausfall);
      rahmen?.removeEventListener('pointermove', zeig);
      rahmen?.removeEventListener('pointerleave', weg);
    };
  }, [gl, takt, ausfall, invalidate]);

  // Ausschnitt: frontal füllt die Zeichnung die Bühne genau wie das Standbild (gleiche Ränder, gleiche Strichbreite)
  useEffect(() => {
    const l = lauf.current;
    const rand = Math.min(0.2, Math.max(0, kante?.() ?? 0.045));
    const hoehe = ((BREITE * E) / (1 - 2 * rand)) * (groesse.height / Math.max(1, groesse.width));
    l.abstand = hoehe / 2 / Math.tan((BLICK * Math.PI) / 360);
    l.breite = (strich?.() ?? 2) * E;
    kamera.fov = BLICK;
    kamera.near = 0.1;
    kamera.far = 100;
    kamera.updateProjectionMatrix();
    takt();
  }, [groesse, kamera, kante, strich, takt]);

  useFrame((state) => {
    const l = lauf.current;
    if (l.aus) return;
    const jetzt = performance.now();
    // Zeit von der Uhr: auch ein langsames Bild zählt voll mit. Erst über 2 s gilt eine Lücke als Pause (Rechner schlief).
    const dt = l.letzte ? Math.min((jetzt - l.letzte) / 1000, 2) : 0;
    l.letzte = jetzt;

    // "Bereit" erst, wenn zwei Bilder mit vollständigem Effekt-Durchlauf gezeichnet sind
    if (!l.gemeldet) {
      if (l.bereit >= 2) {
        l.gemeldet = true;
        onBereit?.();
        meldeStand();
      } else {
        if (!effekte || (komponist.current?.passes.length ?? 0) > 1) l.bereit++;
        state.invalidate();
      }
    } else if (l.laeuft && l.t < DAUER) {
      l.t = Math.min(DAUER, l.t + dt);
      // Bildraten-Wächter: die ersten Bilder messen (die zwei allerersten übersetzen noch Shader)
      if (!fest && dt > 0 && l.bilder < MESSEN + 2) {
        l.bilder++;
        // ein einzelner Hänger zählt höchstens als 0,1 s, damit er allein nicht zum Ausfall führt
        if (l.bilder > 2) l.summe += Math.min(dt, 0.1);
        if (l.bilder === MESSEN + 2) {
          const ms = (l.summe / MESSEN) * 1000;
          if (ms > 40) {
            ausfall();
            return;
          }
          if (ms > 24) {
            setEffekte(false);
            setDpr(1);
          }
        }
      }
      if (l.t >= DAUER) {
        meldeStand();
        takt();
      }
    }

    const z = zustand(l.t);
    for (const f of anwender.current) f(z, l.breite);
    if (rand.current) rand.current.darkness = RAND * z.rand;

    // Neigung mit der Maus nur im Ruhebild; weich nachziehen, dann wieder Ruhe
    const ruhe = l.t >= DAUER;
    const ziel = ruhe ? l.ziel : [0, 0];
    let rest = 0;
    for (let i = 0; i < 2; i++) {
      const d = ziel[i] - l.neig[i];
      l.neig[i] += d * (ruhe ? Math.min(1, dt * 6 + 0.04) : 1);
      rest = Math.max(rest, Math.abs(ziel[i] - l.neig[i]));
    }
    if (ruhe && rest > 0.0004) state.invalidate();

    const dreh = z.kamera.dreh + l.neig[0];
    const kipp = z.kamera.kipp + l.neig[1];
    const a = l.abstand * z.kamera.weite;
    kamera.position.set(Math.sin(dreh) * Math.cos(kipp) * a, Math.sin(kipp) * a, Math.cos(dreh) * Math.cos(kipp) * a);
    kamera.lookAt(0, 0, 0);

    if (z.station !== l.station) {
      l.station = z.station;
      onStation?.(z.station);
    }
  }, -1);

  return (
    <>
      <Website melde={melde} />
      <Verwaltung melde={melde} />
      <Lichtpunkt melde={melde} />
      {effekte && (
        <EffectComposer ref={komponist} multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={0.85} luminanceSmoothing={0.2} intensity={0.9} radius={0.7} />
          <Vignette ref={rand} offset={0.5} darkness={0} />
        </EffectComposer>
      )}
    </>
  );
}
