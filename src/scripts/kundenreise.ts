// Kundenreise als Journey-Map direkt nach dem Hero (Jamil, Talk qh87y3sj #5184/#5185/#5187, 09.11.2026), Stil in variante-start.css (.kr-*).
// - Knöpfe: jede Station ist ein Knopf (aria-expanded) für ihre Leistungen. Offen ist eine Station, solange die Maus darüber ist,
//   der Knopf per Tastatur den Fokus hat (:focus-visible) oder sie per Klick/Antippen festgehalten ist; ein zweiter Klick schließt
//   sie wieder, Escape ebenso. Touch löst kein Darüberfahren aus, dort zählt nur das Antippen.
// - Ohne JS steht alles offen da (aria-expanded="true" im HTML, .kr-js fehlt). Bei reduzierter Bewegung startet alles offen und
//   ohne Bewegung, Knöpfe funktionieren trotzdem.
// - Aufbau nur ohne reduzierte Bewegung und mit IntersectionObserver: .kr-bereit (vorher verstecken), beim ersten Sichtkontakt
//   einmal .ist-los (Kurve zeichnet sich, Stationen blenden nacheinander ein; Zeiten in CSS).
const karte = document.querySelector<HTMLElement>('[data-kundenreise]');

if (karte) {
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  karte.classList.add('kr-js');

  karte.querySelectorAll<HTMLElement>('.kr-station').forEach((station) => {
    const knopf = station.querySelector<HTMLButtonElement>('.kr-knopf');
    if (!knopf) return;
    let fest = ruhig; // per Klick festgehalten (bei reduzierter Bewegung: alles offen)
    let schwebt = false;
    let fokus = false;
    const setzen = () => {
      const auf = fest || schwebt || fokus;
      knopf.setAttribute('aria-expanded', String(auf));
      station.classList.toggle('ist-offen', auf);
    };
    station.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { schwebt = true; setzen(); } });
    station.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { schwebt = false; setzen(); } });
    knopf.addEventListener('focus', () => { if (knopf.matches(':focus-visible')) { fokus = true; setzen(); } });
    knopf.addEventListener('blur', () => { fokus = false; setzen(); });
    knopf.addEventListener('click', () => {
      // erster Klick hält fest (auch wenn die Station durch Maus/Fokus schon offen ist), zweiter Klick schließt
      fest = !fest;
      if (!fest) { schwebt = false; fokus = false; }
      setzen();
    });
    knopf.addEventListener('keydown', (e) => { if (e.key === 'Escape') { fest = false; schwebt = false; fokus = false; setzen(); } });
    setzen();
  });

  if (!ruhig && 'IntersectionObserver' in window) {
    karte.classList.add('kr-bereit');
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { karte.classList.add('ist-los'); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(karte);
  }
}

export {}; // Modul (eigener Gültigkeitsbereich)
