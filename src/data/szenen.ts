// Handgezeichnete Erklär-Szenen (rough.js, beim Build gerendert) – Muster aus dem Bauwelt-Projekt,
// Motive auf „Website as a Service“ übertragen (Vision 17.10.2026). Jede Szene hochkant (Handy) und quer (Desktop).
import { Zeichner, F, type Szene } from '../lib/rough-szene';
import { steps } from '../config/site';
import { VERSPRECHEN } from '../config/versprechen';

export type Ansicht = 'mobil' | 'desktop';
export type SzenenName = 'weg' | 'betreuung' | 'siegel';

/* ─────────────── Motive (Mittelpunkt cx/cy, Maßstab s ≈ 1 → ~70 px) ─────────────── */

/** Sprechblasen = Erstgespräch */
function sprechblasen(z: Zeichner, cx: number, cy: number, s = 1) {
  z.rundRechteck(cx - 38 * s, cy - 30 * s, 50 * s, 34 * s, 9 * s);
  z.linie(cx - 26 * s, cy + 4 * s, cx - 32 * s, cy + 14 * s, {}, 0.2);
  for (let i = 0; i < 3; i++) z.kreis(cx + (-25 + i * 12) * s, cy - 13 * s, 4 * s, { fill: F.strich, fillStyle: 'solid', strokeWidth: 1 }, 0.2);
  z.rundRechteck(cx - 8 * s, cy - 2 * s, 46 * s, 30 * s, 9 * s, { fill: F.gold, fillStyle: 'hachure', hachureGap: 5, fillWeight: 1.4 });
  z.linie(cx + 26 * s, cy + 28 * s, cx + 32 * s, cy + 38 * s, {}, 0.2);
}

/** Chip mit „KI“ = KI-gestützte Umsetzung */
function kiChip(z: Zeichner, cx: number, cy: number, s = 1) {
  const h = 26 * s;
  for (let i = -1; i <= 1; i++) {
    const o = i * 14 * s;
    z.linie(cx + o, cy - h, cx + o, cy - h - 10 * s, { strokeWidth: 2 }, 0.15);
    z.linie(cx + o, cy + h, cx + o, cy + h + 10 * s, { strokeWidth: 2 }, 0.15);
    z.linie(cx - h, cy + o, cx - h - 10 * s, cy + o, { strokeWidth: 2 }, 0.15);
    z.linie(cx + h, cy + o, cx + h + 10 * s, cy + o, { strokeWidth: 2 }, 0.15);
  }
  z.rundRechteck(cx - h, cy - h, 2 * h, 2 * h, 7 * s, { fill: F.goldHell, fillStyle: 'solid', strokeWidth: 2.4 });
  z.gruppe('puls', () => {
    z.text(cx, cy + 7 * s, 'KI', { groesse: 20 * s, farbe: F.goldDunkel });
  });
}

function dokument(z: Zeichner, cx: number, cy: number, s = 1) {
  const x = cx - 24 * s, y = cy - 34 * s;
  z.pfad(`M${x} ${y}H${x + 34 * s}L${x + 48 * s} ${y + 14 * s}V${y + 68 * s}H${x}Z`);
  z.linie(x + 34 * s, y, x + 34 * s, y + 14 * s, { strokeWidth: 1.8 }, 0.2);
  z.linie(x + 34 * s, y + 14 * s, x + 48 * s, y + 14 * s, { strokeWidth: 1.8 }, 0.2);
  for (let i = 0; i < 3; i++) z.linie(x + 9 * s, y + (26 + i * 11) * s, x + 38 * s, y + (26 + i * 11) * s, { stroke: F.grau, strokeWidth: 1.8 }, 0.25);
  z.text(cx + 10 * s, y + 60 * s, '€', { groesse: 14 * s, farbe: F.goldDunkel, anker: 'end' });
}

function chat(z: Zeichner, cx: number, cy: number, s = 1) {
  z.rundRechteck(cx - 26 * s, cy - 20 * s, 52 * s, 34 * s, 10 * s);
  z.linie(cx - 14 * s, cy + 14 * s, cx - 20 * s, cy + 26 * s, {}, 0.2);
  z.linie(cx - 20 * s, cy + 26 * s, cx - 4 * s, cy + 14 * s, {}, 0.2);
  z.gruppe('puls', () => {
    for (let i = 0; i < 3; i++) z.kreis(cx + (i - 1) * 12 * s, cy - 3 * s, 6 * s, { fill: F.gold, fillStyle: 'solid', strokeWidth: 1 }, 0.15);
  });
}

/** Balkendiagramm = Zahlen im Blick */
function diagramm(z: Zeichner, cx: number, cy: number, s = 1) {
  z.linie(cx - 30 * s, cy + 26 * s, cx + 30 * s, cy + 26 * s, { strokeWidth: 2.2 }, 0.3);
  const h = [18, 30, 24, 42];
  h.forEach((hh, i) => {
    const x = cx - 24 * s + i * 14 * s;
    z.rechteck(x, cy + 26 * s - hh * s, 10 * s, hh * s, i === 3 ? { fill: F.gold, fillStyle: 'solid', strokeWidth: 1.6 } : { fill: F.goldHell, fillStyle: 'solid', strokeWidth: 1.6 }, 0.3);
  });
  z.kurve([[cx - 22 * s, cy + 4 * s], [cx - 6 * s, cy - 4 * s], [cx + 10 * s, cy - 10 * s], [cx + 26 * s, cy - 24 * s]], { stroke: F.goldDunkel, strokeWidth: 2.4 }, 0.5);
}

function pfeilKreis(z: Zeichner, cx: number, cy: number, s = 1) {
  z.pfad(`M${cx + 22 * s} ${cy - 6 * s}A${24 * s} ${24 * s} 0 1 0 ${cx + 24 * s} ${cy + 4 * s}`, { strokeWidth: 2.6 }, 0.6);
  z.pfad(`M${cx + 12 * s} ${cy - 8 * s}L${cx + 24 * s} ${cy - 6 * s}L${cx + 22 * s} ${cy - 18 * s}`, { stroke: F.goldDunkel, strokeWidth: 2.6 }, 0.3);
  z.kreis(cx, cy, 10 * s, { fill: F.gold, fillStyle: 'solid', strokeWidth: 1.4 }, 0.2);
}

/** Handy mit Website-Status */
function handy(z: Zeichner, x: number, y: number, b: number, h: number) {
  z.rundRechteck(x, y, b, h, 16, { strokeWidth: 2.8 }, 0.9);
  z.linie(x + b / 2 - 16, y + 13, x + b / 2 + 16, y + 13, { strokeWidth: 2.4 }, 0.2);
  const ix = x + 16, ib = b - 32;
  z.bei(z.jetzt + 0.6);
  z.text(x + b / 2, y + 40, 'Ihre Website', { groesse: 12 });
  z.rechteck(ix, y + 50, ib, 10, { strokeWidth: 1.6 }, 0.3);
  z.rechteck(ix, y + 50, ib * 0.8, 10, { fill: F.gold, fillStyle: 'solid', stroke: F.gold, strokeWidth: 1 }, 0.4);
  const zeilen = [true, true, true, false];
  zeilen.forEach((fertig, i) => {
    const zy = y + 82 + i * 26;
    z.kreis(ix + 6, zy, 12, fertig ? { fill: F.gold, fillStyle: 'solid', strokeWidth: 1.4 } : { strokeWidth: 1.4 }, 0.2);
    z.linie(ix + 18, zy, ix + ib, zy, { stroke: F.grau, strokeWidth: 2 }, 0.3);
  });
  z.rundRechteck(ix, y + h - 44, ib, 26, 8, { fill: F.goldHell, fillStyle: 'solid', strokeWidth: 1.6 }, 0.4);
  z.text(x + b / 2, y + h - 27, 'Online', { groesse: 11 });
}

const SIEGEL_MOTIV: Record<string, (z: Zeichner, cx: number, cy: number, s: number) => void> = {
  live14: (z, cx, cy, s) => z.text(cx, cy + 8 * s, '14 T.', { groesse: 19 * s, farbe: F.goldDunkel }),
  festpreis: (z, cx, cy, s) => z.text(cx, cy + 11 * s, '€', { groesse: 32 * s, farbe: F.goldDunkel }),
  ansprechpartner: (z, cx, cy, s) => {
    z.kreis(cx, cy - 7 * s, 15 * s, { strokeWidth: 2.2 }, 0.3);
    z.pfad(`M${cx - 14 * s} ${cy + 18 * s}Q${cx - 14 * s} ${cy + 3 * s} ${cx} ${cy + 3 * s}Q${cx + 14 * s} ${cy + 3 * s} ${cx + 14 * s} ${cy + 18 * s}`, { stroke: F.goldDunkel, strokeWidth: 2.4 }, 0.3);
  },
  speed: (z, cx, cy, s) => {
    z.pfad(`M${cx - 18 * s} ${cy + 8 * s}A${18 * s} ${18 * s} 0 0 1 ${cx + 18 * s} ${cy + 8 * s}`, { strokeWidth: 2.4 }, 0.4);
    z.linie(cx, cy + 8 * s, cx + 11 * s, cy - 6 * s, { stroke: F.goldDunkel, strokeWidth: 2.6 }, 0.3);
    z.kreis(cx, cy + 8 * s, 5 * s, { fill: F.gold, fillStyle: 'solid', strokeWidth: 1.2 }, 0.2);
  },
  hosting: (z, cx, cy, s) => {
    z.rundRechteck(cx - 17 * s, cy - 16 * s, 34 * s, 12 * s, 3 * s, { strokeWidth: 2 }, 0.3);
    z.rundRechteck(cx - 17 * s, cy + 2 * s, 34 * s, 12 * s, 3 * s, { strokeWidth: 2 }, 0.3);
    z.kreis(cx - 11 * s, cy - 10 * s, 4 * s, { fill: F.gold, fillStyle: 'solid', strokeWidth: 1 }, 0.1);
    z.kreis(cx - 11 * s, cy + 8 * s, 4 * s, { fill: F.gold, fillStyle: 'solid', strokeWidth: 1 }, 0.1);
  },
  code: (z, cx, cy, s) => z.text(cx, cy + 8 * s, '</>', { groesse: 20 * s, farbe: F.goldDunkel }),
  // Geschäftsmodell (Vision 17.10.2026)
  einrichtung: (z, cx, cy, s) => z.text(cx, cy + 8 * s, '0 €', { groesse: 21 * s, farbe: F.goldDunkel }),
  laufzeit: (z, cx, cy, s) => {
    z.text(cx, cy + 4 * s, '24', { groesse: 24 * s, farbe: F.goldDunkel });
    z.text(cx, cy + 20 * s, 'Monate', { groesse: 9 * s, gewicht: 600, farbe: F.text2 });
  },
  eigentum: (z, cx, cy, s) => z.text(cx, cy + 8 * s, '</>', { groesse: 20 * s, farbe: F.goldDunkel }),
  transparenz: (z, cx, cy, s) => {
    z.pfad(`M${cx - 22 * s} ${cy}Q${cx} ${cy - 20 * s} ${cx + 22 * s} ${cy}Q${cx} ${cy + 20 * s} ${cx - 22 * s} ${cy}Z`, { strokeWidth: 2.2 }, 0.4);
    z.kreis(cx, cy, 13 * s, { fill: F.gold, fillStyle: 'solid', strokeWidth: 1.4 }, 0.2);
  },
  lockin: (z, cx, cy, s) => {
    z.rundRechteck(cx - 14 * s, cy - 2 * s, 28 * s, 22 * s, 4 * s, { fill: F.goldHell, fillStyle: 'solid', strokeWidth: 2.2 }, 0.3);
    z.pfad(`M${cx - 8 * s} ${cy - 2 * s}V${cy - 12 * s}A${8 * s} ${8 * s} 0 0 1 ${cx + 7 * s} ${cy - 16 * s}`, { stroke: F.goldDunkel, strokeWidth: 2.6 }, 0.3);
  },
};

/* ─────────────── Szenen ─────────────── */

// Arbeitsweise (Vision 17.10.2026): Beratung → KI-Umsetzung → kontinuierliche Verbesserung
const WEG_MOTIVE = [sprechblasen, kiChip, diagramm];
const WEG_UNTER: string[][] = [['Persönlich, mit Ihnen'], ['In Rekordzeit online'], ['Kontinuierlich,', 'Schritt für Schritt']];

function weg(a: Ansicht): Szene {
  const z = new Zeichner();
  const mobil = a === 'mobil';
  const n = WEG_MOTIVE.length;
  const B = mobil ? 360 : 1000;
  const pos: [number, number][] = WEG_MOTIVE.map((_, i) => (mobil ? [i % 2 ? 280 : 80, 76 + i * 130] : [(B / n) * (i + 0.5), 96]));
  const H = mobil ? pos[n - 1][1] + 74 : 300;

  pos.forEach(([cx, cy], i) => {
    const t = 0.2 + i * 1.15;
    z.bei(t);
    WEG_MOTIVE[i](z, cx, cy, 1);
    z.bei(t + 0.3);
    const bx = cx - 52, by = cy - 46;
    z.kreis(bx, by, 28, { fill: F.gold, fillStyle: 'solid', strokeWidth: 1.8 }, 0.3);
    z.text(bx, by + 5, String(i + 1), { groesse: 14 });
    z.bei(t + 0.6);
    if (mobil) {
      const links = i % 2 === 0;
      const tx = links ? 150 : 210;
      const anker = links ? 'start' : 'end';
      z.text(tx, cy - 2, steps[i].title, { groesse: 15.5, anker });
      WEG_UNTER[i].forEach((zeile, k) => z.text(tx, cy + 18 + k * 17, zeile, { groesse: 13, gewicht: 400, farbe: F.text2, anker }));
    } else {
      z.text(cx, 206, steps[i].title, { groesse: 18 });
      WEG_UNTER[i].forEach((zeile, k) => z.text(cx, 232 + k * 20, zeile, { groesse: 14.5, gewicht: 400, farbe: F.text2 }));
    }
    if (i < n - 1) {
      z.bei(t + 0.85);
      const [nx, ny] = pos[i + 1];
      // Leiterbahn (digitaler Stil): mobil im Zickzack nach unten, quer als gerade Bahn
      const midY = (cy + 44 + ny - 52) / 2;
      const pkt: [number, number][] = mobil
        ? [[cx, cy + 44], [cx, midY], [nx, midY], [nx, ny - 52]]
        : [[cx + 62, cy], [nx - 62, ny]];
      z.leitung(pkt, { stroke: F.gold, strokeWidth: 2.4 }, 0.6);
    }
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 0.2 + (n - 1) * 1.15 + 1.2 };
}

const BETREUUNG_TEILE = [
  { motiv: chat, zeilen: ['Änderungen per E-Mail', 'wir setzen um'] },
  { motiv: (z: Zeichner, x: number, y: number) => dokument(z, x, y, 0.72), zeilen: ['Rechnungen & Verträge', 'an einem Ort'] },
  { motiv: diagramm, zeilen: ['Zahlen im Blick', 'Besucher, Anfragen, Tempo'] },
  { motiv: pfeilKreis, zeilen: ['Immer aktuell', 'Updates, Backups,', 'Sicherheit'] },
];

function betreuung(a: Ansicht): Szene {
  const z = new Zeichner();
  const mobil = a === 'mobil';
  const B = mobil ? 360 : 1000, H = mobil ? 536 : 316;
  const ph = { x: mobil ? 115 : 435, y: 12, b: 130, h: 236 };
  z.bei(0.1);
  handy(z, ph.x, ph.y, ph.b, ph.h);

  const pos: [number, number][] = mobil ? [[90, 316], [270, 316], [90, 436], [270, 436]] : [[170, 88], [170, 216], [830, 88], [830, 216]];
  pos.forEach(([cx, cy], i) => {
    const t = 2.0 + i * 0.75;
    if (!mobil) {
      z.bei(t - 0.3);
      const links = cx < 500;
      const sx = links ? ph.x - 8 : ph.x + ph.b + 8;
      const sy = ph.y + 70 + (i % 2) * 110;
      const ex = links ? cx + 110 : cx - 110;
      const mx = (sx + ex) / 2;
      z.leitung([[sx, sy], [mx, sy], [mx, cy - 6], [ex, cy - 6]], { stroke: F.gold, strokeWidth: 2.2 }, 0.5);
    }
    z.bei(t);
    z.gruppe('stempel', () => BETREUUNG_TEILE[i].motiv(z, cx, mobil ? cy - 22 : cy - 14, 1));
    z.bei(t + 0.35);
    const ty = mobil ? cy + 32 : cy + 42;
    const [kopf, ...rest] = BETREUUNG_TEILE[i].zeilen;
    z.text(cx, ty, kopf, { groesse: mobil ? 13.5 : 16 });
    rest.forEach((zeile, k) => z.text(cx, ty + (mobil ? 18 : 21) * (k + 1), zeile, { groesse: mobil ? 12.5 : 14, gewicht: 400, farbe: F.text2 }));
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 2.0 + 3 * 0.75 + 1 };
}

function siegel(a: Ansicht): Szene {
  const z = new Zeichner();
  const mobil = a === 'mobil';
  const n = VERSPRECHEN.length;
  const reihen = mobil ? [3, 3] : [n];
  const B = mobil ? 360 : 1000;
  const rh = 150;
  const H = mobil ? reihen.length * rh + 10 : 230;
  const d = mobil ? 78 : 100;
  const s = mobil ? 0.9 : 1.15;
  const pos: [number, number][] = [];
  reihen.forEach((anz, r) => {
    const sp = mobil ? 120 : B / anz;
    const start = (B - sp * anz) / 2 + sp / 2;
    for (let k = 0; k < anz; k++) pos.push([start + k * sp, mobil ? 56 + r * rh : 70]);
  });
  VERSPRECHEN.forEach((v, i) => {
    const [cx, cy] = pos[i];
    const t = 0.2 + i * 0.55;
    z.bei(t);
    z.gruppe('stempel', () => {
      z.kreis(cx, cy, d, { strokeWidth: 2.6 }, 0.5);
      z.kreis(cx, cy, d - 14, { stroke: F.gold, strokeWidth: 2 }, 0.5);
      z.markiereFluss();
      z.bei(t + 0.3);
      SIEGEL_MOTIV[v.id]?.(z, cx, cy, s);
    });
    z.bei(t + 0.45);
    const [z1, z2] = !mobil && v.id === 'ansprechpartner' ? ['Ein', 'Ansprechpartner'] : v.zeilen;
    const ty = cy + d / 2 + (mobil ? 22 : 28);
    z.text(cx, ty, z1, { groesse: mobil ? 13 : 15, gewicht: 600 });
    z.text(cx, ty + (mobil ? 17 : 20), z2, { groesse: mobil ? 13 : 15, gewicht: 600 });
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 0.2 + (n - 1) * 0.55 + 1 };
}

export const SZENEN: Record<SzenenName, (a: Ansicht) => Szene> = { weg, betreuung, siegel };
