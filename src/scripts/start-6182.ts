// Startseite, Bewegung nach Jamil #6182 (Talk qh87y3sj, 16.11.2026): „visuelle Überzeugung, minimalistisch, passende Animationen“.
// Nur eingebaute Browser-Technik, keine Bibliothek. Stil und Zeiten: styles/start-6176.css (Abschnitt „Bewegung #6182“).
// - Einblenden: Elemente mit .j6-ein bekommen .ist-da, sobald sie ins Bild kommen (einmal). Was gleichzeitig hereinkommt,
//   erscheint gestaffelt (--j6-v). Nur mit JS + IntersectionObserver + ohne reduzierte Bewegung (html.j6-an), sonst alles sofort da.
// - Hero: Beispiel-Ablauf (Jamil #6192: Nachricht → Ergebnis → Häkchen, 1 → 2 → 3) läuft per CSS einmal; kommt der Hero später
//   erneut ins Bild, läuft er genau ein weiteres Mal. (Handy-Mockup, Chat-Hochrücken und 3D-Neigung entfallen seit #6192.)
// - Seit Jamil #6369 (19.11.2026): Hero-Animation „Anfrage senden → Dashboard“ (J6Fluss) als Schleife, pausiert außerhalb des Bildes
//   und bei verstecktem Tab (Klasse .jf--laeuft). Die Beispiele oben sind dann ausgeblendet (ALT_ZEIGEN.heroBeispieleAlt).
const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!ruhig.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('j6-an');

  const io = new IntersectionObserver((eintraege) => {
    let k = 0;
    for (const e of eintraege) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.style.setProperty('--j6-v', `${Math.min(k, 6) * 90}ms`);
      el.classList.add('ist-da');
      io.unobserve(el);
      k++;
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll<HTMLElement>('.j6-ein').forEach((el) => io.observe(el));

  // Hero-Beispiele: starten, sobald sie im Bild sind; waren sie nach dem ersten Ablauf (ca. 7,5 s) aus dem Bild und kommen
  // wieder, laufen sie genau ein weiteres Mal.
  const chat = document.querySelector<HTMLElement>('[data-jh-chat]');
  if (chat) {
    let start = 0;
    let weg = false;
    let wiederholt = false;
    const beob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { if (start && performance.now() - start > 8000) weg = true; return; }
      if (!start) { start = performance.now(); chat.classList.add('jh-laeuft'); return; }
      if (!weg || wiederholt) return;
      wiederholt = true;
      beob.disconnect();
      chat.classList.add('jh-neu');
      void chat.offsetWidth; // Animationen zurücksetzen
      chat.classList.remove('jh-neu');
    }, { threshold: 0.3 });
    beob.observe(chat);
  }

  // Hero-Animation (Jamil #6369): Endlosschleife läuft nur, solange sie im Bild und der Tab sichtbar ist (spart Akku/CPU).
  const fluss = document.querySelector<HTMLElement>('[data-jf]');
  // Start erst kurz nach dem Laden (die Schleife soll den Seitenaufbau nicht belasten); bis dahin steht sie still am Anfang.
  if (fluss) {
    const los = () => {
      let imBild = false;
      const setzen = () => fluss.classList.toggle('jf--laeuft', imBild && !document.hidden);
      new IntersectionObserver(([e]) => { imBild = e.isIntersecting; setzen(); }, { threshold: 0.1 }).observe(fluss);
      document.addEventListener('visibilitychange', setzen);
    };
    const spaeter = () => window.setTimeout(los, 900);
    if (document.readyState === 'complete') spaeter(); else window.addEventListener('load', spaeter, { once: true });
  }
}

export {};
