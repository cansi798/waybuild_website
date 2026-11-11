// Zeitachse der 3D-Bühne: reine Funktion, Zeit t in Sekunden → vollständiger Zustand der Szene.
// Kein Zugriff auf Uhr, DOM oder three.js; die Szene zeichnet nur, was hier steht. Gleiche Zeit = gleiches Bild
// (damit lässt sich jeder Moment als Standbild prüfen: ?3d=fest&t=<Sekunden>).
// Drehbuch: 0–1,2 Entwurf · 1,2–5 Website entsteht · 5–6 Übergabe · 6–10 Auftragsverwaltung entsteht · 10–11 Ruhe.
// Orte stehen in den Einheiten der Zeichnung (HeroPoster.astro), Höhen (hub, z) in Welt-Einheiten.

export const DAUER = 11;

// Fünf Stationen der Tafel (y Mitte, wie im Standbild) und der Moment, in dem die Karte dort ankommt
export const STATION_X = 596;
export const STATION_Y = [140, 229, 318, 407, 496] as const;
export const ANKUNFT = [6, 6.9, 7.8, 8.7, 9.6] as const;

// Linie vom Knopf zur ersten Station (wie im Standbild)
export const KURVE: readonly [number, number][] = [
  [442, 458],
  [540, 458],
  [500, 140],
  [589, 140],
];

export type Baustein = {
  auf: number; // 0 = Strichzeichnung, 1 = aufgebaut (Flächen da)
  glut: number; // Leuchten, 0 = keins
  hub: number; // Abstand über der Grundfläche
};

export type Zustand = {
  t: number;
  ruhe: boolean; // Lauf beendet, Bild steht
  kamera: { dreh: number; kipp: number; weite: number }; // Winkel in Bogenmaß, weite = Vielfaches des Abstands
  fenster: Baustein;
  kopf: Baustein;
  titel: Baustein;
  bild: Baustein;
  karten: [Baustein, Baustein, Baustein];
  knopf: Baustein;
  fuss: Baustein;
  kurve: { glut: number };
  tafel: Baustein;
  stationen: Baustein[];
  // Lichtpunkt: Ort, Höhe, Kern (Punkt), Schein (Hof), karte (0 = Punkt, 1 = kleine Karte)
  licht: { x: number; y: number; z: number; kern: number; schein: number; karte: number };
  rand: number; // Randabdunklung 0 … 1 (im Entwurf 0, damit das erste Bild dem Standbild gleicht)
  station: number; // gerade erreichte Station 0 … 4, sonst -1
};

const klemme = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
// Weiche Kurve ohne Knick an Anfang und Ende
const weich = (x: number) => {
  const k = klemme(x);
  return k * k * k * (k * (k * 6 - 15) + 10);
};
const rampe = (t: number, von: number, bis: number) => weich((t - von) / (bis - von));
const misch = (a: number, b: number, k: number) => a + (b - a) * k;
// Aufleuchten ab t0: steigt in "an" Sekunden, klingt in "ab" Sekunden auf "rest" ab
const impuls = (t: number, t0: number, an: number, ab: number, rest = 0) =>
  rampe(t, t0, t0 + an) * misch(1, rest, rampe(t, t0 + an, t0 + an + ab));

// Aufbau eines Bausteins zwischen von und bis; er leuchtet beim Fertigwerden kurz auf
function baustein(t: number, von: number, bis: number, hub: number, rest = 0): Baustein {
  const auf = rampe(t, von, bis);
  return { auf, glut: impuls(t, von + (bis - von) * 0.35, (bis - von) * 0.65, 1.3, rest), hub: hub * auf };
}

// Ort des Lichtpunkts im Standbild (auf der Linie) und der Moment, in dem er dort erlischt und am Fenster neu erscheint
const ORT_ENTWURF: readonly [number, number] = [519, 299];
const WECHSEL = 0.9;

// Weg des Lichtpunkts bis zum Knopf: [Zeit, x, y]; zwischen zwei Marken weich, an jeder Marke kurz ruhig
const WEG: readonly [number, number, number][] = [
  [1.2, 52, 92], // oben links am Browserfenster
  [1.75, 236, 120], // Kopfzeile
  [2.1, 66, 182], // Überschrift, Anfang
  [2.6, 236, 182], // Überschrift, Ende
  [3.15, 359, 208], // Bild
  [3.6, 121, 354], // Karte 1
  [3.9, 253, 354], // Karte 2
  [4.2, 385, 354], // Karte 3
  [4.65, 388, 458], // Knopf
  [5, 442, 458], // rechter Rand des Knopfs, Anfang der Linie
];

export function kurvenort(u: number): [number, number] {
  const v = 1 - u;
  const k = [v * v * v, 3 * v * v * u, 3 * v * u * u, u * u * u];
  return [
    k[0] * KURVE[0][0] + k[1] * KURVE[1][0] + k[2] * KURVE[2][0] + k[3] * KURVE[3][0],
    k[0] * KURVE[0][1] + k[1] * KURVE[1][1] + k[2] * KURVE[2][1] + k[3] * KURVE[3][1],
  ];
}

function ort(t: number): [number, number] {
  if (t < WECHSEL) return [ORT_ENTWURF[0], ORT_ENTWURF[1]];
  if (t <= WEG[0][0]) return [WEG[0][1], WEG[0][2]];
  if (t <= 5) {
    for (let i = 1; i < WEG.length; i++) {
      if (t <= WEG[i][0]) {
        const [t0, x0, y0] = WEG[i - 1];
        const [t1, x1, y1] = WEG[i];
        const k = rampe(t, t0, t1);
        // Leichter Bogen statt einer Geraden: der Punkt schwingt, er ruckt nicht
        const bogen = Math.sin(k * Math.PI) * 0.06;
        return [misch(x0, x1, k) - (y1 - y0) * bogen, misch(y0, y1, k) + (x1 - x0) * bogen];
      }
    }
  }
  if (t < ANKUNFT[0]) {
    // Übergabe: auf der geschwungenen Linie nach rechts, zuletzt an die erste Station heran
    const [x, y] = kurvenort(rampe(t, 5, 5.94));
    return [x + (STATION_X - KURVE[3][0]) * rampe(t, 5.7, 6), y];
  }
  // Tafel: von Station zu Station, an jeder kurz stehen
  let y: number = STATION_Y[0];
  for (let i = 1; i < STATION_Y.length; i++) {
    y = misch(y, STATION_Y[i], rampe(t, ANKUNFT[i - 1] + 0.3, ANKUNFT[i]));
  }
  return [STATION_X, y];
}

export function zustand(zeit: number): Zustand {
  const t = Math.min(Math.max(Number.isFinite(zeit) ? zeit : 0, 0), DAUER);

  // Kamera: frontal → zur Website gekippt (zusammen etwa 18°) → zur Tafel geschwenkt → Ruhe mit beiden im Bild
  const hin = rampe(t, 1.2, 5);
  const rueber = rampe(t, 5, 6.8);
  const heim = rampe(t, 9.9, DAUER);
  const dreh = misch(misch(0, -0.26, hin), 0.17, rueber);
  const kipp = misch(misch(0, 0.17, hin), 0.15, rueber);
  const kamera = {
    dreh: misch(dreh, -0.13, heim),
    kipp: misch(kipp, 0.13, heim),
    weite: misch(misch(1, 1.1, hin), 1.07, heim),
  };

  // Website: versetzte Einsätze, jeder Baustein hebt sich ein Stück weiter ab
  const fenster = baustein(t, 1.2, 2.1, 0);
  const kopf = baustein(t, 1.35, 2.05, 0.1);
  const titel = baustein(t, 1.95, 2.75, 0.2);
  const bild = baustein(t, 2.7, 3.5, 0.3);
  const karten: [Baustein, Baustein, Baustein] = [
    baustein(t, 3.3, 3.95, 0.18),
    baustein(t, 3.6, 4.25, 0.24),
    baustein(t, 3.9, 4.55, 0.3),
  ];
  const fuss = baustein(t, 4.2, 5, 0.06);
  // Der Knopf bleibt als einziger leicht am Leuchten; bei der Übergabe pulst er einmal
  const knopf = baustein(t, 4.4, 5, 0.4, 0.1);
  knopf.glut = Math.max(knopf.glut, impuls(t, 4.9, 0.25, 1.4, 0.1));

  // Übergabe: die Linie leuchtet, solange die Karte auf ihr unterwegs ist
  const kurveGlut = impuls(t, 4.95, 0.4, 1.6, 0.12);

  // Auftragsverwaltung: Tafel baut sich auf, jede Station wird bei Ankunft der Karte fertig und leuchtet auf
  const tafel = baustein(t, 5.45, 6.4, 0);
  const stationen = ANKUNFT.map((an, i) => {
    const b = baustein(t, an - 0.2, an + 0.45, 0.14 + i * 0.03);
    b.glut = impuls(t, an - 0.05, 0.22, 1.1);
    return b;
  });
  let station = -1;
  for (let i = 0; i < ANKUNFT.length; i++) if (t >= ANKUNFT[i]) station = i;
  if (t >= 10.6) station = -1;

  // Lichtpunkt: steht wie im Standbild, erlischt dort und erscheint oben links am Fenster; zeichnet nach,
  // wird am Knopf zur kleinen Karte
  const [x, y] = ort(t);
  const da = t < WECHSEL ? 1 - rampe(t, 0.55, WECHSEL) : rampe(t, WECHSEL, 1.2);
  const karte = rampe(t, 5, 5.35) * (1 - rampe(t, 9.95, 10.6));
  let puls = 0;
  for (const an of ANKUNFT) puls = Math.max(puls, impuls(t, an - 0.05, 0.2, 0.7));
  const licht = {
    x,
    y,
    // Über der Website schwebt der Punkt höher; an der Tafel liegt die Karte knapp über den Stationen (deckt deren Punkt)
    z: misch(misch(0, 0.5, rampe(t, 1.2, 2)), 0.34, rampe(t, 5.4, 6)),
    kern: da * (1 - rampe(t, 5, 5.3)),
    schein: da * (0.55 + 0.35 * puls + 0.25 * impuls(t, 4.9, 0.3, 0.8)) * (1 - rampe(t, 10, 10.7)),
    karte,
  };

  return {
    t,
    ruhe: t >= DAUER,
    kamera,
    fenster,
    kopf,
    titel,
    bild,
    karten,
    knopf,
    fuss,
    kurve: { glut: kurveGlut },
    tafel,
    stationen,
    licht,
    rand: rampe(t, 1.2, 4),
    station,
  };
}
