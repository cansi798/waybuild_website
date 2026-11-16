// Startseite, Bewegung nach Jamil #6182 (Talk qh87y3sj, 16.11.2026): „visuelle Überzeugung, minimalistisch, passende Animationen“.
// Nur eingebaute Browser-Technik, keine Bibliothek. Stil und Zeiten: styles/start-6176.css (Abschnitt „Bewegung #6182“).
// - Einblenden: Elemente mit .j6-ein bekommen .ist-da, sobald sie ins Bild kommen (einmal). Was gleichzeitig hereinkommt,
//   erscheint gestaffelt (--j6-v). Nur mit JS + IntersectionObserver + ohne reduzierte Bewegung (html.j6-an), sonst alles sofort da.
// - Hero: Chat-Ablauf läuft per CSS einmal; kommt der Hero später erneut ins Bild, läuft er genau ein weiteres Mal.
// - Hero: dezente 3D-Neigung des Handys bei Mausbewegung, nur (pointer: fine) und nur transform.
const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');

// Hero-Chat: so weit nach oben rücken, dass die letzte Antwort ganz zu sehen ist (--jh-hoch, CSS). Aus dem Layout gemessen
// (offsetTop/-Height), nicht aus scrollHeight: das wäre von der Verschiebung selbst beeinflusst. Gilt auch bei reduzierter Bewegung.
function hoehe(chat: HTMLElement) {
  const miss = () => {
    const letzte = chat.lastElementChild as HTMLElement | null;
    if (!letzte) return;
    const unten = letzte.offsetTop - chat.offsetTop + letzte.offsetHeight + parseFloat(getComputedStyle(chat).paddingBottom || '0');
    chat.style.setProperty('--jh-hoch', `${-Math.max(0, Math.ceil(unten - chat.clientHeight))}px`);
  };
  miss();
  if ('ResizeObserver' in window) new ResizeObserver(miss).observe(chat);
}
const chatRuhig = document.querySelector<HTMLElement>('[data-jh-chat]');
if (chatRuhig && (ruhig.matches || !('IntersectionObserver' in window))) hoehe(chatRuhig);

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

  // Hero-Chat: startet, sobald er im Bild ist; rückt am Ende so weit hoch, dass die letzte Antwort ganz sichtbar ist;
  // war er nach dem ersten Ablauf (ca. 7 s) aus dem Bild und kommt wieder, läuft er genau ein weiteres Mal.
  const chat = chatRuhig;
  if (chat) {
    hoehe(chat);
    let start = 0;
    let weg = false;
    let wiederholt = false;
    const beob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { if (start && performance.now() - start > 7000) weg = true; return; }
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

  // 3D-Neigung (nur Maus/Trackpad)
  const geraet = document.querySelector<HTMLElement>('[data-jh-geraet]');
  const handy = geraet?.querySelector<HTMLElement>('.jh-handy');
  const fein = window.matchMedia('(hover: hover) and (pointer: fine)');
  const hero = geraet?.closest<HTMLElement>('.jh');
  if (geraet && handy && hero && fein.matches) {
    let rahmen = 0;
    let x = 0;
    let y = 0;
    const setze = () => {
      rahmen = 0;
      handy.style.transform = `perspective(1100px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    };
    hero.addEventListener('pointermove', (ev) => {
      if (ev.pointerType !== 'mouse') return;
      const r = handy.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, (ev.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      y = Math.max(-1, Math.min(1, (ev.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      if (!rahmen) rahmen = requestAnimationFrame(setze);
    });
    hero.addEventListener('pointerleave', () => { x = 0; y = 0; if (!rahmen) rahmen = requestAnimationFrame(setze); });
    handy.classList.add('jh-handy--neigen');
  }
}

export {};
