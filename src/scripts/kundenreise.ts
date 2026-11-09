// Kundenreise als Journey-Map direkt nach dem Hero (Jamil, Talk qh87y3sj #5184/#5185/#5187, 09.11.2026), Stil in variante-start.css (.kr-*).
// Qualitätsprüfung (Jamil, Talk qh87y3sj #5204, 09.11.2026):
// - PC (ab 1000 px): Leistungen stehen immer offen da, die Überschriften sind reine Überschriften (kein Knopf, kein aria-expanded).
// - Unter 1000 px setzt das Skript in jede Überschrift einen Knopf (aria-expanded) für ihre Leistungen. Offen ist eine Station,
//   solange die Maus darüber ist, der Knopf per Tastatur den Fokus hat (:focus-visible) oder sie per Klick/Antippen festgehalten
//   ist; ein zweiter Klick schließt sie wieder, Escape ebenso. Touch löst kein Darüberfahren aus, dort zählt nur das Antippen.
//   Wechselt die Breite (Fenster, Drehen), wird der Knopf entfernt bzw. wieder eingesetzt.
// - Ohne JS steht alles offen da (Überschriften ohne Knopf, .kr-js fehlt). Bei reduzierter Bewegung startet alles offen und
//   ohne Bewegung, Knöpfe funktionieren trotzdem.
// - Aufbau nur ohne reduzierte Bewegung und mit IntersectionObserver: .kr-bereit (vorher verstecken), sobald die Karte ins Bild
//   kommt (threshold 0, unten 15 % Rand, damit sie beim Hereinscrollen nie leer ist) einmal .ist-los (Kurve bzw. Linie zeichnet
//   sich, Stationen blenden nacheinander ein; Zeiten in CSS).
const karte = document.querySelector<HTMLElement>('[data-kundenreise]');

if (karte) {
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pc = matchMedia('(min-width: 1000px)');
  karte.classList.add('kr-js');

  const modi: (() => void)[] = [];
  karte.querySelectorAll<HTMLElement>('.kr-station').forEach((station) => {
    const name = station.querySelector<HTMLElement>('.kr-name');
    const frage = station.querySelector<HTMLElement>('.kr-frage');
    const liste = station.querySelector<HTMLElement>('.kr-leistungen');
    if (!name || !liste) return;
    const text = name.textContent ?? '';
    const knopf = document.createElement('button');
    knopf.type = 'button';
    knopf.className = 'kr-knopf';
    knopf.textContent = text;
    knopf.setAttribute('aria-controls', liste.id);
    if (frage) knopf.setAttribute('aria-describedby', frage.id);

    let fest = ruhig; // per Klick festgehalten (bei reduzierter Bewegung: alles offen)
    let schwebt = false;
    let fokus = false;
    const setzen = () => {
      const auf = !pc.matches && (fest || schwebt || fokus);
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

    modi.push(() => {
      if (pc.matches) { if (knopf.isConnected) name.replaceChildren(text); }
      else if (!knopf.isConnected) name.replaceChildren(knopf);
      setzen();
    });
  });
  const umschalten = () => modi.forEach((m) => m());
  umschalten();
  pc.addEventListener('change', umschalten);

  if (!ruhig && 'IntersectionObserver' in window) {
    karte.classList.add('kr-bereit');
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { karte.classList.add('ist-los'); io.disconnect(); }
    }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    io.observe(karte);
  }
}

export {}; // Modul (eigener Gültigkeitsbereich)
