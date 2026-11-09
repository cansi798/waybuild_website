// Zusammenspiel direkt nach dem Hero (Jamil, Talk qh87y3sj #5176/#5178/#5179, 09.11.2026), Stil in variante-start.css (.zs-*).
// - Zeichnet die feine Linie (SVG-Pfad in Pixeln der Figur): PC durch die Mitten der sieben Kacheln, an „CRM“ rechts heraus, als
//   ruhige Schleife zurück nach links und durch die vier Stationen; unter 900 px (Kacheln untereinander) senkrecht.
// - Setzt je Kachel und Station --t (ms), wann die Linie sie erreicht (Linie läuft linear), dazu --start und --zug.
// - Bewegung nur ohne reduzierte Bewegung und mit IntersectionObserver: dann .zs-bereit (vorher verstecken) und beim ersten
//   Sichtkontakt einmal .ist-los. Sonst steht alles fertig da (Linie voll gezeichnet). Ohne JS: CSS-Linien, alles sichtbar.
const figur = document.querySelector<HTMLElement>('[data-zusammenspiel]');
const pfad = figur?.querySelector<SVGPathElement>('.zs-linie path');

if (figur && pfad) {
  const START = 1100; // ms: Linie startet, während die letzten Kacheln noch einblenden
  const ZUG = 3400; // ms: Dauer der ganzen Linie
  const R = 16; // Radius der Bögen
  const kacheln = [...figur.querySelectorAll<HTMLElement>('.zs-kachel')];
  const stationen = [...figur.querySelectorAll<HTMLElement>('.zs-station')];
  const bewegt = !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window;
  let los = false;

  // Lage relativ zur Figur über offsetLeft/offsetTop (unabhängig von laufenden transforms)
  const lage = (el: HTMLElement) => {
    let x = 0, y = 0;
    for (let e: HTMLElement | null = el; e && e !== figur; e = e.offsetParent as HTMLElement | null) { x += e.offsetLeft; y += e.offsetTop; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight, mx: x + el.offsetWidth / 2, my: y + el.offsetHeight / 2 };
  };
  const r1 = (n: number) => Math.round(n * 10) / 10;

  const zeichnen = () => {
    const sym = kacheln.map((k) => lage(k.querySelector<HTMLElement>('.zs-symbol')!));
    const pkt = stationen.map((s) => lage(s.querySelector<HTMLElement>('.zs-punkt')!));
    if (sym.length < 2 || !pkt.length) return;
    const a = sym[0], z = sym[sym.length - 1], p0 = pkt[0], pz = pkt[pkt.length - 1];
    let d: string;
    let bei: number[]; // Weg der Linie bis zu jeder Kachel, dann jeder Station (px)
    let gesamt: number;
    if (Math.abs(sym[1].mx - a.mx) < 2) {
      // untereinander: senkrecht durch die Mitten
      d = `M${r1(a.mx)} ${r1(a.my)}V${r1(pz.my)}`;
      gesamt = pz.my - a.my;
      bei = [...sym, ...pkt].map((q) => q.my - a.my);
      pfad.setAttribute('d', d);
    } else {
      // Rücklauf als ruhige Schleife: rechts neben „CRM“ nach unten, waagerecht zurück nach links (zwischen Namen und Stationen),
      // links im Halbkreis hinunter und von links in die erste Station
      const ul = figur.querySelector<HTMLElement>('.zs-kacheln')!;
      const yS = ul.offsetTop + ul.offsetHeight + 10; // unter den Kachel-Namen
      const xd = z.x + z.w + R; // rechts neben „CRM“
      const yM = yS + (p0.my - yS) * 0.35; // Höhe des Rücklaufs
      const r2 = (p0.my - yM) / 2; // Halbkreis links
      const xu = p0.mx - 2 * R - r2;
      d = `M${r1(a.mx)} ${r1(a.my)}H${r1(xd - R)}A${R} ${R} 0 0 1 ${r1(xd)} ${r1(a.my + R)}V${r1(yM - R)}A${R} ${R} 0 0 1 ${r1(xd - R)} ${r1(yM)}`
        + `H${r1(xu)}A${r1(r2)} ${r1(r2)} 0 0 0 ${r1(xu)} ${r1(p0.my)}H${r1(pz.mx)}`;
      pfad.setAttribute('d', d);
      gesamt = pfad.getTotalLength();
      bei = [...sym.map((q) => q.mx - a.mx), ...pkt.map((q) => gesamt - (pz.mx - q.mx))];
    }
    if (!los) {
      const ziele = [...kacheln, ...stationen];
      bei.forEach((l, i) => ziele[i].style.setProperty('--t', `${Math.round(START + (ZUG * l) / Math.max(1, gesamt))}ms`));
    }
  };

  figur.style.setProperty('--start', `${START}ms`);
  figur.style.setProperty('--zug', `${ZUG}ms`);
  zeichnen();
  figur.classList.add('zs-js');
  new ResizeObserver(() => zeichnen()).observe(figur);
  document.fonts?.ready.then(zeichnen);

  if (bewegt) {
    figur.classList.add('zs-bereit');
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { los = true; figur.classList.add('ist-los'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(figur);
  }
}

export {}; // Modul (eigener Gültigkeitsbereich)
