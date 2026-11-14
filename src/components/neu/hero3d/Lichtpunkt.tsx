// Lichtpunkt der 3D-Bühne: Hof, Kern und die kleine Karte, zu der er bei der Übergabe wird; dazu die geschwungene Linie.
// Der Hof ist ein Fächer mit Verlauf zur Kante (wie der Verlauf im Standbild), keine Textur.
import { useEffect, useMemo } from 'react';
import { Group } from 'three';
import { BAHN, Bau, E, LICHT, MITTE, eck, kreis, netz, raeume, type Farbe, type Melder, type Netz, type P } from './form';
import { kurvenort } from './zeitachse';

// Zwei dunkle Zeilen auf der hellen Karte (Farbe des Grundes), damit sie als Karte lesbar bleibt
const TINTE: Farbe = [0, 0x4f / 255, 0x4c / 255];

function bauen() {
  const linie: P[] = [];
  for (let i = 0; i <= 40; i++) linie.push(kurvenort(i / 40));
  const kurve = netz(new Bau().linie(linie, { farbe: BAHN }), 20);

  // Formen um die Mitte der Zeichnung gebaut; den Ort setzt die Zeitachse
  const [mx, my] = MITTE;
  const schein = netz(new Bau().flaeche(kreis(mx, my, 30, 32), { a: 0.55, aRand: 0, art: 2, glut: 0 }), 21);
  const karte = netz(
    new Bau()
      .flaeche(eck(mx - 15, my - 10, 30, 20, 5), { farbe: LICHT, a: 0.96, art: 2 })
      .linie([[mx - 8, my - 3], [mx + 8, my - 3]], { farbe: TINTE, art: 2, glut: 0 })
      .linie([[mx - 8, my + 3], [mx + 2, my + 3]], { farbe: TINTE, art: 2, glut: 0 }),
    22,
  );
  const kern = netz(new Bau().flaeche(kreis(mx, my, 6, 24), { farbe: LICHT, a: 1, art: 2 }), 23);

  const fahrend = new Group();
  fahrend.add(schein, karte, kern);
  const gruppe = new Group();
  gruppe.add(kurve, fahrend);
  const alle: Netz[] = [kurve, schein, karte, kern];
  return { kurve, schein, karte, kern, fahrend, gruppe, alle };
}

export default function Lichtpunkt({ melde }: { melde: Melder }) {
  const teile = useMemo(bauen, []);
  useEffect(() => {
    const { kurve, schein, karte, kern, fahrend } = teile;
    const ab = melde((z, breite) => {
      const l = z.licht;
      kurve.material.uniforms.uBreite.value = breite;
      kurve.material.uniforms.uGlut.value = z.kurve.glut;
      kurve.position.z = 0.02;
      fahrend.position.set((l.x - MITTE[0]) * E, (MITTE[1] - l.y) * E, l.z);
      schein.material.uniforms.uDeck.value = Math.min(1.8, l.schein / 0.55);
      schein.visible = l.schein > 0.002;
      kern.scale.setScalar(Math.max(l.kern, 0.0001));
      kern.visible = l.kern > 0.002;
      karte.material.uniforms.uBreite.value = breite;
      karte.material.uniforms.uGlut.value = 0.3 * l.karte;
      karte.scale.setScalar(Math.max(l.karte, 0.0001));
      karte.visible = l.karte > 0.002;
    });
    return () => {
      ab();
      raeume(teile.alle);
    };
  }, [teile, melde]);
  return <primitive object={teile.gruppe} />;
}
