// Kundenreise als „Bühne“ (Jamil, Talk qh87y3sj #5596/#5598/#5599/#5601/#5602, Variante A, 12.11.2026; Sicherung Tag
// vor-kundenreise-buehne-20261112). Stil: src/styles/kundenreise.css (.krb-*), Markup: src/pages/index.astro (#kundenreise).
// Ersetzt die Journey-Map mit Glühbirnen-Knöpfen (die Antworten stehen jetzt immer sichtbar in jedem Schritt).
// Scroll-Mechanik (Modi, Messen, Scroll je Bild, Hereingleiten) seit 13.11.2026 im gemeinsamen Kern src/scripts/buehne-kern.ts
// (auch für „So kann es laufen“, beispiel.ts); hier nur noch, was die Kundenreise daraus macht:
// - Rechner (ab 48rem breit und 36rem hoch): .krb--buehne. Aus dem Scroll-Stück den aktiven Schritt bestimmen (.ist-aktiv,
//   frühere .ist-vorbei) und die Fortschrittsleiste setzen (.ist-voll je erreichtem Schritt, Schritt für Schritt). Seit #5621
//   (12.11.2026) ein Stück mehr: darin bekommt das Ziel .ist-cta, der Haken verwandelt sich in den Knopf „Jetzt starten“.
// - Handy und kleine Fenster: .krb--gleiten, jede Karte gleitet beim Hereinscrollen einmal herein (.ist-da).
// - Reduzierte Bewegung oder ohne JS: keine Klasse, alles sofort sichtbar untereinander.
import { erstelleBuehne } from './buehne-kern';

const bereich = document.querySelector<HTMLElement>('[data-kundenreise]');
const buehne = bereich?.querySelector<HTMLElement>('.krb-buehne');

if (bereich && buehne) {
  const schritte = Array.from(bereich.querySelectorAll<HTMLElement>('[data-krb-schritt]'));
  const segmente = Array.from(bereich.querySelectorAll<HTMLElement>('.krb-segment'));
  const n = schritte.length;
  const ziel = schritte[n - 1];
  const zielLink = ziel?.querySelector<HTMLAnchorElement>('a');
  // Scroll-Stücke: je Schritt eines, dazu das letzte, in dem der Haken zum Knopf „Jetzt starten“ wird (Jamil #5621)
  const stuecke = n + 1;
  bereich.style.setProperty('--krb-n', String(stuecke));
  let aktiv = -1;
  const fuellung: string[] = [];

  const kr = erstelleBuehne({
    bereich, buehne, schritte, stuecke,
    klassen: { buehne: 'krb--buehne', gleiten: 'krb--gleiten' },
    mqBuehne: '(min-width: 48rem) and (min-height: 36rem)',
    aufModus: () => {
      schritte.forEach((s) => s.classList.remove('ist-aktiv', 'ist-vorbei', 'ist-da', 'ist-cta'));
      segmente.forEach((seg) => seg.classList.remove('ist-voll'));
      aktiv = -1;
      fuellung.length = 0;
    },
    aufStueck: (stueck) => {
      const k = Math.min(n - 1, stueck);
      if (k !== aktiv) {
        aktiv = k;
        schritte.forEach((s, i) => {
          s.classList.toggle('ist-aktiv', i === k);
          s.classList.toggle('ist-vorbei', i < k);
        });
      }
      ziel?.classList.toggle('ist-cta', stueck === stuecke - 1);
      // Leiste: ein Segment je Schritt (inkl. Ziel), voll erst wenn der Schritt erreicht ist, nie anteilig (Jamil #5624)
      segmente.forEach((seg, i) => {
        const voll = i <= k;
        if (fuellung[i] !== String(voll)) { fuellung[i] = String(voll); seg.classList.toggle('ist-voll', voll); }
      });
    },
    aufErscheinen: (s) => s.classList.add('ist-da'),
  });

  // Tastatur: bekommt der Knopf auf der Bühne den Fokus, bevor er erschienen ist, zum letzten Scroll-Stück springen
  zielLink?.addEventListener('focus', () => {
    if (kr.modus() !== 'buehne' || !ziel || ziel.classList.contains('ist-cta')) return;
    kr.springe(stuecke - 1, 0.5);
  });
}

export {}; // Modul (eigener Gültigkeitsbereich)
