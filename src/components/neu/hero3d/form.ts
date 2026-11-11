// Formen der 3D-Bühne: Striche und Flächen aus den Maßen des Standbilds (HeroPoster.astro), ohne Texturen und ohne Schrift.
// Gerechnet wird in den Einheiten der Zeichnung (Ausschnitt 34 52 732 496); E macht daraus Welt-Einheiten, Mitte = (400, 300).
// Farben stehen als Anzeige-Werte (0 … 1) in den Ecken: Die Leinwand mischt dann wie das SVG, das erste Bild deckt sich.
import { BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, NormalBlending, ShaderMaterial } from 'three';
import type { Zustand } from './zeitachse';

export const E = 0.01;
export const MITTE: readonly [number, number] = [400, 300];

export type P = [number, number];
export type Farbe = readonly [number, number, number];

export const HELL: Farbe = [0x5f / 255, 0xe0 / 255, 0xda / 255]; // --accent-light, Strich der Zeichnung
export const AKZENT: Farbe = [0, 0xa6 / 255, 0xa1 / 255]; // --accent, der eine Knopf
export const BAHN: Farbe = [0xc9 / 255, 1, 0xfb / 255]; // geschwungene Linie
export const LICHT: Farbe = [0xea / 255, 1, 0xfd / 255]; // Kern des Lichtpunkts
export const WEISS: Farbe = [1, 1, 1];

// Art einer Ecke: 0 = Strich (wird mit dem Aufbau kräftiger), 1 = Fläche (erscheint mit dem Aufbau), 2 = unverändert
export type Art = 0 | 1 | 2;
type Stil = { farbe?: Farbe; a?: number; art?: Art; glut?: number };

const welt = ([x, y]: P): P => [(x - MITTE[0]) * E, (MITTE[1] - y) * E];

// Abgerundetes Rechteck als geschlossener Linienzug (wie eck() im Standbild)
export function eck(x: number, y: number, w: number, h: number, r: number, teile = 6): P[] {
  const aus: P[] = [];
  const ecken: [number, number, number][] = [
    [x + w - r, y + r, -90],
    [x + w - r, y + h - r, 0],
    [x + r, y + h - r, 90],
    [x + r, y + r, 180],
  ];
  for (const [cx, cy, start] of ecken) {
    for (let i = 0; i <= teile; i++) {
      const w0 = ((start + (90 * i) / teile) * Math.PI) / 180;
      aus.push([cx + Math.cos(w0) * r, cy + Math.sin(w0) * r]);
    }
  }
  return aus;
}

export function kreis(cx: number, cy: number, r: number, teile = 28): P[] {
  const aus: P[] = [];
  for (let i = 0; i < teile; i++) {
    const w0 = (i / teile) * Math.PI * 2;
    aus.push([cx + Math.cos(w0) * r, cy + Math.sin(w0) * r]);
  }
  return aus;
}

// Sammelt Ecken für genau ein Netz (ein Baustein = ein Zeichenaufruf)
export class Bau {
  private pos: number[] = [];
  private nor: number[] = [];
  private farbe: number[] = [];
  private art: number[] = [];
  private index: number[] = [];

  private ecke(p: P, n: P, s: Required<Stil>, z = 0): number {
    this.pos.push(p[0], p[1], z);
    this.nor.push(n[0], n[1]);
    this.farbe.push(s.farbe[0], s.farbe[1], s.farbe[2], s.a);
    this.art.push(s.art, s.glut);
    return this.pos.length / 3 - 1;
  }

  // Strich entlang eines Linienzugs; die Breite kommt erst im Shader dazu (uBreite), "dick" ist ihr Vielfaches.
  // Offene Enden stehen eine halbe Breite über (wie die runden Enden im Standbild).
  linie(punkte: P[], stil: Stil & { dick?: number; zu?: boolean } = {}): this {
    const s = { farbe: stil.farbe ?? HELL, a: stil.a ?? 1, art: stil.art ?? 0, glut: stil.glut ?? 1 } as Required<Stil>;
    const dick = (stil.dick ?? 1) * 0.5;
    const zu = stil.zu ?? false;
    const p = punkte.map(welt);
    const n = p.length;
    if (n < 2) return this;
    const richtung = (a: P, b: P): P => {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const l = Math.hypot(dx, dy) || 1;
      return [dx / l, dy / l];
    };
    const paare: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const vor = i > 0 ? p[i - 1] : zu ? p[n - 1] : null;
      const nach = i < n - 1 ? p[i + 1] : zu ? p[0] : null;
      const d0 = vor ? richtung(vor, p[i]) : null;
      const d1 = nach ? richtung(p[i], nach) : null;
      const n0: P | null = d0 ? [-d0[1], d0[0]] : null;
      const n1: P | null = d1 ? [-d1[1], d1[0]] : null;
      let m: P;
      let kappe: P = [0, 0];
      if (n0 && n1) {
        // Gehrung: Mittel der beiden Normalen, auf volle Breite gestreckt (begrenzt gegen spitze Ecken)
        const mx = n0[0] + n1[0];
        const my = n0[1] + n1[1];
        const l = Math.hypot(mx, my) || 1;
        const k = Math.min(2.2, 1 / Math.max(0.2, (mx / l) * n1[0] + (my / l) * n1[1]));
        m = [(mx / l) * k, (my / l) * k];
      } else if (n1 && d1) {
        m = n1;
        kappe = [-d1[0], -d1[1]];
      } else {
        m = n0 as P;
        kappe = d0 as P;
      }
      const a = this.ecke(p[i], [(m[0] + kappe[0]) * dick, (m[1] + kappe[1]) * dick], s);
      const b = this.ecke(p[i], [(-m[0] + kappe[0]) * dick, (-m[1] + kappe[1]) * dick], s);
      paare.push([a, b]);
    }
    const ende = zu ? n : n - 1;
    for (let i = 0; i < ende; i++) {
      const [a, b] = paare[i];
      const [c, d] = paare[(i + 1) % n];
      this.index.push(a, b, c, b, d, c);
    }
    return this;
  }

  // Mehrere gerade Striche auf einmal: [x1, y1, x2, y2]
  striche(liste: [number, number, number, number][], stil: Stil & { dick?: number } = {}): this {
    for (const [x1, y1, x2, y2] of liste) this.linie([[x1, y1], [x2, y2]], stil);
    return this;
  }

  // Gefüllte, nach außen gewölbte Form (Fächer um die Mitte); mitte/aussen erlauben einen weichen Verlauf zum Rand
  flaeche(punkte: P[], stil: Stil & { aRand?: number } = {}): this {
    const s = { farbe: stil.farbe ?? HELL, a: stil.a ?? 1, art: stil.art ?? 1, glut: stil.glut ?? 1 } as Required<Stil>;
    const rand = { ...s, a: stil.aRand ?? s.a };
    const p = punkte.map(welt);
    let mx = 0;
    let my = 0;
    for (const q of p) {
      mx += q[0];
      my += q[1];
    }
    const mitte = this.ecke([mx / p.length, my / p.length], [0, 0], s);
    const ring = p.map((q) => this.ecke(q, [0, 0], rand));
    for (let i = 0; i < ring.length; i++) this.index.push(mitte, ring[i], ring[(i + 1) % ring.length]);
    return this;
  }

  geometrie(): BufferGeometry {
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(this.pos, 3));
    g.setAttribute('aNormale', new Float32BufferAttribute(this.nor, 2));
    g.setAttribute('aFarbe', new Float32BufferAttribute(this.farbe, 4));
    g.setAttribute('aArt', new Float32BufferAttribute(this.art, 2));
    g.setIndex(this.index);
    return g;
  }
}

const ECKEN = /* glsl */ `
attribute vec2 aNormale;
attribute vec4 aFarbe;
attribute vec2 aArt;
uniform float uBreite;
uniform float uFuell;
uniform float uGlut;
uniform float uDeck;
varying vec4 vFarbe;
void main() {
  vec3 p = position;
  p.xy += aNormale * uBreite;
  float a = aFarbe.a;
  if (aArt.x < 0.5) a = mix(a, 1.0, uFuell * 0.55);
  else if (aArt.x < 1.5) a *= uFuell;
  vFarbe = vec4(aFarbe.rgb * (1.0 + uGlut * aArt.y), a * uDeck);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const FLAECHE = /* glsl */ `
varying vec4 vFarbe;
void main() {
  gl_FragColor = vFarbe;
}`;

export type Stoff = ShaderMaterial & {
  uniforms: { uBreite: { value: number }; uFuell: { value: number }; uGlut: { value: number }; uDeck: { value: number } };
};

// Ein Stoff je Netz: gleiche Programme, eigene Werte (Aufbau, Glut, Deckkraft, Strichbreite)
export function stoff(): Stoff {
  return new ShaderMaterial({
    vertexShader: ECKEN,
    fragmentShader: FLAECHE,
    uniforms: { uBreite: { value: 2 * E }, uFuell: { value: 0 }, uGlut: { value: 0 }, uDeck: { value: 1 } },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: NormalBlending,
    side: DoubleSide,
    toneMapped: false,
  }) as Stoff;
}

export type Netz = Mesh<BufferGeometry, Stoff>;

// Netz aus einem Bau: ohne Tiefenprüfung, die Reihenfolge legt "ordnung" fest (hinten zuerst)
export function netz(bau: Bau, ordnung: number): Netz {
  const m = new Mesh(bau.geometrie(), stoff());
  m.frustumCulled = false; // Ecken wandern im Shader (Strichbreite), der Hüllkörper stimmt nicht
  m.renderOrder = ordnung;
  return m;
}

export function raeume(netze: Netz[]): void {
  for (const m of netze) {
    m.geometry.dispose();
    m.material.dispose();
  }
}

// Jeder Teil der Bühne meldet eine Funktion an, die den Zustand auf seine Netze überträgt (breite = Strich in Welt-Einheiten)
export type Anwender = (z: Zustand, breite: number) => void;
export type Melder = (f: Anwender) => () => void;
