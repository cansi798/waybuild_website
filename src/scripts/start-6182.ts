// Startseite, Bewegung nach Jamil #6182 (Talk qh87y3sj, 16.11.2026): „visuelle Überzeugung, minimalistisch, passende Animationen“.
// Nur eingebaute Browser-Technik, keine Bibliothek. Stil und Zeiten: styles/start-6176.css (Abschnitt „Bewegung #6182“).
// - Einblenden: Elemente mit .j6-ein bekommen .ist-da, sobald sie ins Bild kommen (einmal). Was gleichzeitig hereinkommt,
//   erscheint gestaffelt (--j6-v). Nur mit JS + IntersectionObserver + ohne reduzierte Bewegung (html.j6-an), sonst alles sofort da.
// - Hero: Beispiel-Ablauf (Jamil #6192: Nachricht → Ergebnis → Häkchen, 1 → 2 → 3) läuft per CSS einmal; kommt der Hero später
//   erneut ins Bild, läuft er genau ein weiteres Mal. (Handy-Mockup, Chat-Hochrücken und 3D-Neigung entfallen seit #6192.)
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
}

export {};
