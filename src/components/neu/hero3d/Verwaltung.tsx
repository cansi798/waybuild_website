// Rechte Hälfte der 3D-Bühne: die Tafel der Auftragsverwaltung mit fünf Stationen an einer Schiene.
// Maße wie im Standbild (HeroPoster.astro). Die erste Station ist schon im Entwurf erreicht, die übrigen sind leise.
import { useEffect, useMemo } from 'react';
import { Group } from 'three';
import { Bau, eck, kreis, netz, raeume, type Melder, type Netz } from './form';
import { setze } from './Website';
import { STATION_X, STATION_Y } from './zeitachse';

const LEISE = 0.5;

function bauen() {
  const rahmen = eck(566, 54, 198, 492, 14);
  const tafel = netz(
    new Bau()
      .flaeche(rahmen, { a: 0.045, art: 2, glut: 0 })
      .flaeche(rahmen, { a: 0.05, glut: 0 })
      .linie(rahmen, { zu: true })
      .linie([[566, 92], [764, 92]])
      .linie([[588, 73], [652, 73]], { dick: 2.4 }),
    10,
  );

  const stationen = STATION_Y.map((y, i) => {
    const a = i ? LEISE : 1;
    const b = new Bau().flaeche(eck(620, y - 28, 124, 56, 9), { a: 0.14, aRand: 0.1, glut: 0.5 });
    // Schiene: das Stück von der Station davor bis hierher
    if (i) b.linie([[STATION_X, y - 78], [STATION_X, y - 11]], { a: LEISE });
    b.linie(eck(620, y - 28, 124, 56, 9), { zu: true, a })
      .linie([[636, y - 8], [706, y - 8]], { a })
      .linie([[636, y + 8], [680, y + 8]], { a: LEISE })
      .linie(kreis(STATION_X, y, 7), { zu: true });
    // Punkt der Station: bei der ersten von Anfang an gefüllt, sonst mit der Ankunft der Karte
    b.flaeche(kreis(STATION_X, y, 7, 20), { a: 1, art: i ? 1 : 2 });
    return netz(b, 11 + i);
  });

  const alle: Netz[] = [tafel, ...stationen];
  const gruppe = new Group();
  gruppe.add(...alle);
  return { tafel, stationen, alle, gruppe };
}

export default function Verwaltung({ melde }: { melde: Melder }) {
  const teile = useMemo(bauen, []);
  useEffect(() => {
    const ab = melde((z, breite) => {
      setze(teile.tafel, z.tafel, breite, 0.5);
      teile.stationen.forEach((m, i) => setze(m, z.stationen[i], breite, 1.5));
    });
    return () => {
      ab();
      raeume(teile.alle);
    };
  }, [teile, melde]);
  return <primitive object={teile.gruppe} />;
}
