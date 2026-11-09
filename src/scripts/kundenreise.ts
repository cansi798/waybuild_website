// Kundenreise als Journey-Map direkt nach dem Hero (Jamil, Talk qh87y3sj #5184/#5185/#5187, 09.11.2026), Stil in variante-start.css (.kr-*).
// Antworten statt Leistungen (Jamil, Talk qh87y3sj #5275, 09.11.2026; Sicherung vor-kundenreise-antworten-20261109):
// - Unter jeder Frage steht im HTML ein Symbol-Knopf (.kr-symbol, hidden, aria-controls → .kr-antwort). Das Skript zeigt die
//   Knöpfe, klappt alle Antworten zu (.kr-klapp) und öffnet per Klick/Antippen/Enter/Leertaste genau eine (.ist-offen an der
//   Station, aria-expanded); ein zweiter Klick oder Escape schließt sie, eine andere zu öffnen schließt die vorige. Gleich am PC
//   und am Handy. Nach dem ersten Öffnen hört das Pulsieren der Symbole auf (.kr-gesehen).
// - Ohne JS oder bei reduzierter Bewegung bleiben die Knöpfe versteckt und alle Antworten offen (statisch).
// - Aufbau nur ohne reduzierte Bewegung und mit IntersectionObserver: .kr-bereit (vorher verstecken), sobald die Karte ins Bild
//   kommt (threshold 0, unten 15 % Rand, damit sie beim Hereinscrollen nie leer ist) einmal .ist-los (Kurve bzw. Linie zeichnet
//   sich, Stationen blenden nacheinander ein, Symbole pulsieren dreimal; Zeiten in CSS).
const karte = document.querySelector<HTMLElement>('[data-kundenreise]');

if (karte) {
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  karte.classList.add('kr-js');

  if (!ruhig) {
    type Paar = { station: HTMLElement; knopf: HTMLButtonElement };
    const paare: Paar[] = [];
    karte.querySelectorAll<HTMLElement>('.kr-station').forEach((station) => {
      const knopf = station.querySelector<HTMLButtonElement>('.kr-symbol');
      if (knopf) paare.push({ station, knopf });
    });
    const oeffnen = (offen: Paar | null) => {
      paare.forEach((p) => {
        const auf = p === offen;
        p.knopf.setAttribute('aria-expanded', String(auf));
        p.station.classList.toggle('ist-offen', auf);
      });
      if (offen) karte.classList.add('kr-gesehen');
    };
    paare.forEach((p) => {
      p.knopf.hidden = false;
      p.knopf.addEventListener('click', () => oeffnen(p.station.classList.contains('ist-offen') ? null : p));
      p.knopf.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && p.station.classList.contains('ist-offen')) { e.preventDefault(); oeffnen(null); }
      });
    });
    oeffnen(null);
    karte.classList.add('kr-klapp');
  }

  if (!ruhig && 'IntersectionObserver' in window) {
    karte.classList.add('kr-bereit');
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { karte.classList.add('ist-los'); io.disconnect(); }
    }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    io.observe(karte);
  }
}

export {}; // Modul (eigener Gültigkeitsbereich)
