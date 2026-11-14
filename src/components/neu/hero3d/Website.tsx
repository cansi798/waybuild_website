// Linke Hälfte der 3D-Bühne: das Browserfenster mit den Bausteinen der Website.
// Maße wie im Standbild (HeroPoster.astro). Jeder Baustein ist ein Netz: Striche (von Anfang an da) und Flächen (kommen mit dem Aufbau).
import { useEffect, useMemo } from 'react';
import { Group } from 'three';
import { AKZENT, Bau, WEISS, eck, kreis, netz, raeume, type Melder, type Netz, type P } from './form';
import type { Baustein } from './zeitachse';

const KARTEN = [64, 196, 328];
const LEISE = 0.5;

function bauen() {
  const rahmen = eck(36, 54, 434, 492, 14);
  const fenster = new Bau()
    .flaeche(rahmen, { a: 0.045, art: 2, glut: 0 })
    .flaeche(rahmen, { a: 0.05, glut: 0 })
    .linie(rahmen, { zu: true })
    .linie([[36, 92], [470, 92]])
    .linie(eck(158, 64, 190, 18, 9), { zu: true, a: LEISE });
  for (const x of [60, 76, 92]) fenster.flaeche(kreis(x, 73, 4, 16), { a: LEISE, art: 0 });

  const kopf = new Bau()
    .flaeche(eck(52, 104, 402, 32, 9), { a: 0.1, glut: 0.4 })
    .linie([[66, 120], [110, 120]], { dick: 2.4 })
    .striche([[330, 120, 358, 120], [372, 120, 400, 120], [414, 120, 442, 120]], { a: LEISE });

  // Überschrift: aus zwei dicken Strichen werden zwei Balken
  const titel = new Bau()
    .linie([[66, 170], [236, 170]], { dick: 2.4 })
    .linie([[66, 195], [198, 195]], { dick: 2.4 })
    .flaeche(eck(62, 163, 178, 14, 5), { a: 0.92 })
    .flaeche(eck(62, 188, 140, 14, 5), { a: 0.92 })
    .striche([[64, 226, 232, 226], [64, 242, 190, 242]], { a: LEISE });

  // Bild: Fläche, Bergzug als Fläche, Sonne
  const berg: P[] = [[290, 252], [328, 208], [353, 235], [372, 214], [414, 252]];
  const bild = new Bau().flaeche(eck(276, 150, 166, 116, 10), { a: 0.2, aRand: 0.1, glut: 0.5 });
  for (let i = 0; i < berg.length - 1; i++) {
    bild.flaeche([berg[i], berg[i + 1], [berg[i + 1][0], 256], [berg[i][0], 256]], { a: 0.3, glut: 0.6 });
  }
  bild
    .linie(eck(276, 150, 166, 116, 10), { zu: true })
    .linie(berg, { a: LEISE })
    .flaeche(kreis(414, 178, 8, 20), { a: LEISE, art: 0 });

  const karten = KARTEN.map((x) =>
    new Bau()
      .flaeche(eck(x, 302, 114, 104, 10), { a: 0.13, aRand: 0.09, glut: 0.5 })
      .linie(eck(x, 302, 114, 104, 10), { zu: true })
      .flaeche(kreis(x + 23, 331, 7, 20), { a: LEISE, art: 0 })
      .striche([[x + 16, 362, x + 82, 362], [x + 16, 378, x + 58, 378]], { a: LEISE }),
  );

  // Zeile neben dem Knopf und Fußzeile
  const fuss = new Bau()
    .linie([[64, 450], [214, 450]])
    .striche(
      [
        [64, 466, 172, 466],
        [64, 502, 442, 502],
        [64, 524, 108, 524],
        [122, 524, 166, 524],
        [180, 524, 224, 524],
        [398, 524, 442, 524],
      ],
      { a: LEISE },
    );

  // Der eine türkisfarbene Knopf: schon im Entwurf gefüllt, später das einzige dauerhafte Leuchten.
  // Sein Hof (Verlauf nach außen) kommt erst mit dem Aufbau, die Fläche selbst behält ihre Farbe.
  const knopf = new Bau()
    .flaeche(eck(304, 410, 168, 96, 48, 10), { farbe: AKZENT, a: 0.6, aRand: 0, glut: 0 })
    .flaeche(eck(334, 440, 108, 36, 18, 10), { farbe: AKZENT, a: 1, art: 2 })
    .linie([[362, 458], [414, 458]], { farbe: WEISS, art: 2, glut: 0.15 });

  const netze = {
    fenster: netz(fenster, 0),
    fuss: netz(fuss, 1),
    kopf: netz(kopf, 2),
    karten: karten.map((b, i) => netz(b, 3 + i)),
    titel: netz(titel, 6),
    bild: netz(bild, 7),
    knopf: netz(knopf, 8),
  };
  const alle: Netz[] = [netze.fenster, netze.fuss, netze.kopf, ...netze.karten, netze.titel, netze.bild, netze.knopf];
  const gruppe = new Group();
  gruppe.add(...alle);
  return { netze, alle, gruppe };
}

// Zustand eines Bausteins auf sein Netz übertragen
export function setze(m: Netz, b: Baustein, breite: number, glut = 1): void {
  const u = m.material.uniforms;
  u.uBreite.value = breite;
  u.uFuell.value = b.auf;
  u.uGlut.value = b.glut * glut;
  m.position.z = b.hub;
}

export default function Website({ melde }: { melde: Melder }) {
  const teile = useMemo(bauen, []);
  useEffect(() => {
    const n = teile.netze;
    const ab = melde((z, breite) => {
      setze(n.fenster, z.fenster, breite, 0.5);
      setze(n.kopf, z.kopf, breite, 0.9);
      setze(n.titel, z.titel, breite, 0.7);
      setze(n.bild, z.bild, breite, 1.1);
      n.karten.forEach((m, i) => setze(m, z.karten[i], breite, 1));
      setze(n.fuss, z.fuss, breite, 0.5);
      setze(n.knopf, z.knopf, breite, 1.5);
    });
    return () => {
      ab();
      raeume(teile.alle);
    };
  }, [teile, melde]);
  return <primitive object={teile.gruppe} />;
}
