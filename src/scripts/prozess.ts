// waybuild Website, „So arbeiten wir“ (Jamil, Talk 4487/4488, 03.11.2026): Engine 1:1 aus der waybuild Hauptseite
// (src/scripts/denkweise.ts, Stand fab7c2a) – Scroll-Kopplung, Lese-Tempo, reduzierte Bewegung, nur Breitenänderung.
// Änderungen dort bitte hier nachziehen.
//
// Startseite „Denkweise“: EINE durchgehende Linie über die ganze Seite, scrollgekoppelt.
//
// Aufbau
// - Wegpunkte: Elemente mit [data-weg] in Dokument-Reihenfolge. Werte: "start" | "durch" | "ein" (Linie endet hier,
//   die Szene zeichnet ihr Inneres selbst) | "aus" (Linie geht hier weiter). [data-weg-nur="d"|"m"] gilt nur am
//   Desktop bzw. Handy; [data-weg-x="links"|"rechts"] legt die Linie neben ein Textelement.
//   Zwischen zwei Wegpunkten entsteht eine weiche S-Kurve mit senkrechten Tangenten (wie ein Weg, nicht geometrisch).
// - Die Spitze der Linie folgt einer Lese-Höhe im Fenster (62 %); beim Laden zeichnet sie sich im Hero einmal von selbst.
// - Szenen [data-szene]: Fortschritt 0…1, solange die Spitze durch ihre Fläche läuft. Elemente darin tragen
//   [data-an="art:a-b[:min] …"] mit art = zeichnen | linear | auf | aus | blende | wachsen | erscheinen | links |
//   rechts | breit | hoch | fliessen | einfaedeln | weg (Wegpunkte selbst nie verschieben, sonst stimmt die Messung nicht),
//   a-b = Bereich im Szenen-Fortschritt oder "auto" (nach Lage des Elements in der Szene) oder "sicht[+d]" (sobald das
//   Element unten ins Bild kommt, bei ~92 % der Fensterhöhe; d verzögert im Szenen-Fortschritt). Zusätzlich daempfen
//   (wie aus, aber bei reduzierter Bewegung nicht) – z. B. Pills, die beim Einfließen an ihre Kopie (.dw-geist) übergeben und ausblenden.
// - Lese-Szenen (Jamil, Talk 4324–4326: „länger sichtbar, damit man Zeit hat zu lesen“):
//   [data-bereich="von bis"] erweitert den Fortschritt über 0…1 hinaus (z. B. "-0.7 1.25": Elemente stehen schon, wenn
//   die Szene unten ins Bild kommt, und fließen erst ein, wenn der Knoten etwa in der Bildmitte steht).
//   [data-tempo="v"] begrenzt, wie schnell der Fortschritt laufen darf (v pro Sekunde, echte Zeit): schnelles Scrollen
//   oder ein Sprung über einen Link springt nicht ans Ende, die Szene spielt sich in Ruhe ab. Spuren "linear" (Linien,
//   die an die Hauptlinie anschließen) folgen weiter direkt dem Scrollen. Außerhalb des Bildes wird nicht gespielt.
// - Kreis-Szenen mit [data-zu="p"]: ab Fortschritt p bekommt die Szene die Klasse ist-zu (Kreis geschlossen), solange
//   sie im Bild ist zusätzlich ist-sichtbar (nur dann läuft der Dauer-Fluss per CSS).
//
// Performance: alle Maße einmal messen (Laden, Schriften, Größenänderung, Kopfzeilen-Wechsel); pro Frame nur scrollY
// lesen, Nachschlagetabelle statt getPointAtLength, nur sichtbare Szenen, nur transform/opacity/dashoffset schreiben
// und nur, wenn sich der Wert ändert. Reduzierte Bewegung: alles fertig gezeichnet, keine Animation.

type Spur = { art: string; a: number; b: number; min: number; auto: boolean; sicht: number };
type Item = { el: HTMLElement | SVGElement; spuren: Spur[]; alt: Record<string, string> };
type Szene = { el: HTMLElement; top: number; h: number; items: Item[]; p: number; r: number; neu: boolean; ende: boolean; zu: number; von: number; bis: number; tempo: number };

const root = document.querySelector<HTMLElement>('[data-denkweise]');
if (root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const breit = window.matchMedia('(min-width: 960px)');
  const svg = root.querySelector<SVGSVGElement>('.dw-linie')!;
  // Je Teilstück ein eigener <path>: Chrome beginnt das Strichmuster an jedem Teilpfad (M) neu,
  // deshalb wird jedes Stück einzeln über seinen Anteil an der Gesamtlänge aufgedeckt.
  const vorlage = svg.querySelector<SVGPathElement>('path')!;
  // Über dunklen Flächen ([data-linie-hell], z. B. Verlässlichkeit) liegt eine helle Kopie der Linie, auf deren
  // Rechtecke beschnitten: so bleibt die türkise Linie überall sichtbar (Jamil, Talk 3922).
  const NS = 'http://www.w3.org/2000/svg';
  const clip = document.createElementNS(NS, 'clipPath'); clip.id = 'dw-hell-clip';
  const defs = document.createElementNS(NS, 'defs'); defs.appendChild(clip); svg.insertBefore(defs, svg.firstChild);
  const hell = document.createElementNS(NS, 'g'); hell.setAttribute('class', 'dw-linie-hell'); hell.setAttribute('clip-path', 'url(#dw-hell-clip)'); svg.appendChild(hell);
  let stuecke: { el: SVGPathElement; el2: SVGPathElement; start: number; len: number; off: string }[] = [];
  const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const glatt = (t: number) => t * t * (3 - 2 * t);

  const parse = (s: string): Spur[] => s.trim().split(/\s+/).map((tok) => {
    const [art, bereich = 'auto', min = '0'] = tok.split(':');
    if (bereich === 'auto') return { art, a: 0, b: 1, min: +min, auto: true, sicht: -1 };
    if (bereich.startsWith('sicht')) return { art, a: 0, b: 1, min: +min, auto: false, sicht: +(bereich.split('+')[1] || 0) };
    const m = bereich.match(/^(-?[\d.]+)-(-?[\d.]+)$/);
    return { art, a: m ? +m[1] : 0, b: m ? +m[2] : 1, min: +min, auto: false, sicht: -1 };
  });

  const szenen: Szene[] = Array.from(root.querySelectorAll<HTMLElement>('[data-szene]')).map((el) => {
    const [von = 0, bis = 1] = (el.dataset.bereich || '').trim().split(/\s+/).filter(Boolean).map(Number);
    return {
      el, top: 0, h: 1, p: NaN, r: NaN, neu: true, ende: el.hasAttribute('data-szene-ende'), zu: el.dataset.zu ? +el.dataset.zu : -1,
      von, bis, tempo: el.dataset.tempo ? +el.dataset.tempo : 0,
      items: Array.from(el.querySelectorAll<HTMLElement>('[data-an]')).map((it) => ({ el: it, spuren: parse(it.dataset.an || ''), alt: {} })),
    };
  });

  // Elemente außerhalb einer Szene können über [data-an-ref] an eine Szene mit [data-szene-id] gekoppelt werden
  root.querySelectorAll<HTMLElement>('[data-an-ref]').forEach((it) => {
    const s = szenen.find((x) => x.el.dataset.szeneId === it.dataset.anRef);
    if (s) s.items.push({ el: it, spuren: parse(it.dataset.an || ''), alt: {} });
  });

  let L = 1, N = 1, maxY = new Float32Array(1), offset = '', introVon = 0, introBis = 0, introStart = 0, introAktiv = false, introWert = 0, rootTop = 0;
  // Fensterhöhe nur beim Messen bzw. bei geänderter Breite übernehmen: iOS Safari meldet beim Scrollen neue Höhen
  // (Adressleiste), sonst würde die Linie dabei springen
  let vh = window.innerHeight, vw = window.innerWidth;
  const SCHRITT = 6;

  const messen = () => {
    const rr = root.getBoundingClientRect();
    rootTop = rr.top + window.scrollY;
    vh = window.innerHeight; vw = window.innerWidth;
    const w = root.clientWidth, h = root.scrollHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('width', String(w)); svg.setAttribute('height', String(h));
    const modus = breit.matches ? 'd' : 'm';
    const punkte: { x: number; y: number; typ: string }[] = [];
    root.querySelectorAll<HTMLElement>('[data-weg]').forEach((el) => {
      const nur = el.dataset.wegNur; if (nur && nur !== modus) return;
      if (!el.getClientRects().length) return; // ausgeblendete Variante
      const r = el.getBoundingClientRect();
      const xm = el.dataset.wegX;
      const x = (xm === 'links' ? r.left - 28 : xm === 'rechts' ? r.right + 28 : r.left + r.width / 2) - rr.left;
      punkte.push({ x, y: r.top + r.height / 2 - rr.top, typ: el.dataset.weg || 'durch' });
    });
    const ds: string[] = [];
    const heroStart = punkte[0]?.typ === 'start';
    punkte.forEach((pt, i) => {
      const vor = punkte[i - 1];
      if (!vor || vor.typ === 'ein') { ds.push(`M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`); return; }
      const dy = pt.y - vor.y, k = 0.55;
      ds[ds.length - 1] += ` C ${vor.x.toFixed(1)} ${(vor.y + dy * k).toFixed(1)} ${pt.x.toFixed(1)} ${(pt.y - dy * k).toFixed(1)} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    });
    const teile = ds.filter((d) => d.includes('C'));
    while (stuecke.length > teile.length) { const st = stuecke.pop()!; st.el.remove(); st.el2.remove(); }
    while (stuecke.length < teile.length) {
      const el = vorlage.cloneNode() as SVGPathElement, el2 = vorlage.cloneNode() as SVGPathElement;
      svg.insertBefore(el, hell); hell.appendChild(el2); stuecke.push({ el, el2, start: 0, len: 1, off: '' });
    }
    vorlage.style.display = 'none';
    // Hero-Prozess (Idee → … → Verbessern) ist ein eigenes, kräftigeres Stück; die Scroll-Linie beginnt bei Kapitel 1
    stuecke.forEach((st, i) => { const h = heroStart && i === 0; st.el.classList.toggle('dw-strich--hero', h); st.el2.classList.toggle('dw-strich--hero', h); });
    clip.replaceChildren();
    root.querySelectorAll<HTMLElement>('[data-linie-hell]').forEach((el) => {
      const r = el.getBoundingClientRect(); if (!r.height) return;
      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', '0'); rect.setAttribute('y', (r.top - rr.top).toFixed(1));
      rect.setAttribute('width', String(w)); rect.setAttribute('height', r.height.toFixed(1));
      clip.appendChild(rect);
    });
    hell.style.display = clip.childNodes.length ? '' : 'none';
    L = 0;
    stuecke.forEach((st, i) => {
      st.el.setAttribute('d', teile[i]); st.el.style.display = '';
      st.el2.setAttribute('d', teile[i]); st.el2.style.display = '';
      st.start = L; st.len = Math.max(1, st.el.getTotalLength()); L += st.len; st.off = '';
      st.el.style.strokeDasharray = st.el2.style.strokeDasharray = `${st.len.toFixed(1)} ${(st.len + 10).toFixed(1)}`;
    });
    L = Math.max(1, L);
    N = Math.ceil(L / SCHRITT);
    maxY = new Float32Array(N + 1);
    let m = -1e9, si = 0;
    for (let i = 0; i <= N; i++) {
      const l = (i / N) * L;
      while (si < stuecke.length - 1 && l > stuecke[si].start + stuecke[si].len) si++;
      const st = stuecke[si]; if (!st) break;
      const y = st.el.getPointAtLength(clamp(l - st.start, 0, st.len)).y; if (y > m) m = y; maxY[i] = m;
    }
    offset = '';
    szenen.forEach((s) => {
      const r = s.el.getBoundingClientRect();
      s.top = r.top - rr.top; s.h = Math.max(1, r.height); s.neu = true;
      s.items.forEach((it) => it.spuren.forEach((sp) => {
        if (!sp.auto && sp.sicht < 0) return;
        // Lage in Ruhe (ohne die Verschiebung, die gerade gesetzt ist): Mitte des Elements relativ zur Szene
        const ir = (it.el as Element).getBoundingClientRect();
        const ym = ir.top + ir.height / 2 - r.top;
        if (sp.sicht >= 0) {
          // Element-Mitte bei 92 % der Fensterhöhe (Szenenoberkante im Bild bei 0.62·vh − p·0.85·h)
          sp.a = Math.max(s.von, (ym - 0.30 * vh) / (s.h * 0.85)) + sp.sicht; sp.b = sp.a + 0.08;
          return;
        }
        const yr = clamp(ym / s.h);
        sp.a = clamp(yr - 0.12); sp.b = clamp(yr + 0.02, sp.a + 0.04);
      }));
    });
    const iv = punkte[0], ib = root.querySelector<HTMLElement>('[data-intro-ende]');
    introVon = iv ? iv.y : 0;
    introBis = ib ? ib.getBoundingClientRect().top + ib.offsetHeight / 2 - rr.top + 24 : introVon;
  };

  /** gezeichnete Länge, bis die Linie die Höhe y erreicht */
  const laengeBis = (y: number) => {
    if (y >= maxY[N]) return L;
    if (y <= maxY[0]) return 0;
    let lo = 0, hi = N;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (maxY[mid] >= y) hi = mid; else lo = mid; }
    // Sprung zwischen zwei Stücken (Lücke an einer Szene): nicht in das nächste Stück hinein interpolieren,
    // sonst steht dort vorzeitig ein kurzer Strich bzw. Punkt
    const dyS = maxY[hi] - maxY[lo];
    if (dyS > SCHRITT * 3) {
      const a = (lo / N) * L, b = (hi / N) * L;
      const naechstes = stuecke.find((st) => st.start > a && st.start <= b);
      if (naechstes) return naechstes.start;   // vorheriges Stück ganz, vom nächsten noch nichts
    }
    const f = (y - maxY[lo]) / Math.max(0.001, dyS);
    return ((lo + clamp(f)) / N) * L;
  };

  const setz = (it: Item, prop: string, wert: string) => {
    if (it.alt[prop] === wert) return;
    it.alt[prop] = wert;
    (it.el as HTMLElement).style.setProperty(prop, wert);
  };

  // Strichmuster der Szenen-Linien: "1 2" mit Versatz bis 1.05 (CSS), damit ein noch nicht gezeichneter Strich keinen
  // runden Punkt an seinem Anfang zeigt (Jamil, Screenshot 4326: Punkt unter dem Erkenntnis-Knoten)
  const VOR = 1.05;
  const anwenden = (s: Szene, p: number, roh: number) => {
    for (const it of s.items) {
      let op = 1, tf = '', dash = -1, opNutzt = false;
      for (const sp of it.spuren) {
        const t = glatt(clamp((p - sp.a) / Math.max(0.001, sp.b - sp.a)));
        switch (sp.art) {
          case 'zeichnen': dash = (1 - t) * VOR; break;
          case 'linear': dash = (1 - clamp((roh - sp.a) / Math.max(0.001, sp.b - sp.a))) * VOR; break;
          case 'auf': op *= t; opNutzt = true; tf += ` translate3d(0, ${((1 - t) * 10).toFixed(1)}px, 0)`; break;
          case 'aus': op *= 1 - (1 - sp.min) * t; opNutzt = true; break;
          case 'daempfen': if (!reduce) { op *= 1 - (1 - sp.min) * t; opNutzt = true; } break;
          case 'blende': op *= t; opNutzt = true; break;
          // ausblenden, nur mit Bewegung (bei reduzierter Bewegung bleibt das Element stehen), z. B. Gruppen-Label der Idee
          case 'weg': if (!reduce) { op *= 1 - t; opNutzt = true; } break;
          case 'wachsen': tf += ` scale(${t.toFixed(3)})`; break;
          case 'erscheinen': op *= t; opNutzt = true; tf += ` scale(${(0.6 + 0.4 * t).toFixed(3)})`; break;
          case 'links': op *= t; opNutzt = true; tf += ` translate3d(${(-(1 - t) * 28).toFixed(1)}px, 0, 0)`; break;
          case 'rechts': op *= t; opNutzt = true; tf += ` translate3d(${((1 - t) * 28).toFixed(1)}px, 0, 0)`; break;
          case 'breit': tf += ` scaleX(${t.toFixed(3)})`; break;
          case 'hoch': tf += ` scaleY(${t.toFixed(4)})`; break;
          // Idee fließt aus ihrer Ruhelage (--ox/--oy in cqw) in den Knoten, schrumpft und verschmilzt (Talk 4007);
          // bei reduzierter Bewegung bleibt sie ruhig in der Ruhelage
          case 'fliessen': {
            const r = reduce ? 1 : 1 - t;
            tf += ` translate(calc(var(--ox) * ${r.toFixed(3)} * 1cqw), calc(var(--oy) * ${r.toFixed(3)} * 1cqw)) scale(${(0.18 + 0.82 * r).toFixed(3)})`;
            if (!reduce) { op *= 1 - glatt(clamp((t - 0.55) / 0.45)); opNutzt = true; }
            break;
          }
          // Talk 4128 (Idee, alle Gruppen über dem Knoten): erst seitlich auf die Linie und klein werden, dann an der Linie
          // hinab in den Knoten – so laufen die Karten durch die Lücke zwischen den noch wartenden Karten darunter
          case 'einfaedeln': {
            const rx = reduce ? 1 : 1 - glatt(clamp(t / 0.45));
            const ry = reduce ? 1 : 1 - glatt(clamp((t - 0.25) / 0.75));
            const sc = reduce ? 1 : 0.18 + 0.82 * (1 - glatt(clamp(t / 0.6)));
            tf += ` translate(calc(var(--ox) * ${rx.toFixed(3)} * 1cqw), calc(var(--oy) * ${ry.toFixed(3)} * 1cqw)) scale(${sc.toFixed(3)})`;
            if (!reduce) { op *= 1 - glatt(clamp((t - 0.55) / 0.45)); opNutzt = true; }
            break;
          }
        }
      }
      if (dash >= 0) setz(it, 'stroke-dashoffset', dash.toFixed(4));
      if (opNutzt) setz(it, 'opacity', op.toFixed(3));
      if (tf) setz(it, 'transform', tf.trim());
    }
    // Kreis-Szenen [data-zu]: ab diesem Fortschritt ist der Kreis geschlossen (Türkis, Pfeile, Fluss per CSS)
    if (s.zu >= 0) s.el.classList.toggle('ist-zu', p >= s.zu);
  };

  let laeuft = false, fertig = false, letzt = 0, holtAuf = false;
  const zeichnen = (jetzt = performance.now()) => {
    laeuft = false;
    const sy = window.scrollY;
    // echte Zeit seit dem letzten Bild (max. 0,25 s, sonst Zeitlupe auf langsamen Geräten); nach einer Pause ein Bild
    const dt = holtAuf ? clamp((jetzt - letzt) / 1000, 0, 0.25) : 1 / 60;
    letzt = jetzt; holtAuf = false;
    let spitze = reduce ? 1e9 : sy + vh * 0.62 - rootTop;
    // Einmaliges Zeichnen im Hero beim Laden; danach bleibt der Hero-Abschnitt gezeichnet (kein Zurückziehen)
    if (introAktiv) {
      const t = clamp((jetzt - introStart) / 2400);
      introWert = introVon + (introBis - introVon) * (1 - Math.pow(1 - t, 3));
      if (t >= 1) introAktiv = false; else anfordern();
    }
    spitze = Math.max(spitze, introWert);
    const len = laengeBis(spitze), o = len.toFixed(1);
    if (o !== offset) {
      offset = o;
      for (const st of stuecke) {
        // +3 (> halbe Strichbreite): kein runder Punkt (Strich der Länge 0) am Anfang noch nicht gezeichneter Stücke
        const so = (st.len - clamp(len - st.start, 0, st.len) + 3).toFixed(1);
        if (so !== st.off) { st.off = so; st.el.style.strokeDashoffset = st.el2.style.strokeDashoffset = so; }
      }
    }
    let ende = false;
    for (const s of szenen) {
      // Szenen sind fertig, wenn die Spitze 85 % ihrer Höhe erreicht: so steht das Ergebnis noch gut sichtbar im Bild
      const roh = clamp((spitze - s.top) / (s.h * 0.85), s.von, s.bis);
      let p = roh;
      if (s.tempo > 0 && !reduce) {
        // Lese-Szenen: Fortschritt läuft dem Scrollen höchstens mit s.tempo pro Sekunde hinterher. Ganz außerhalb des
        // Bildes wird nicht gespielt (sofort auf Stand). Erstes Bild: im Bild von vorn beginnen (kein Sprung ans Ende).
        const oben = s.top + rootTop - sy;
        const draussen = oben > vh * 1.5 || oben + s.h < -vh * 0.5;
        const alt = Number.isNaN(s.p) ? (draussen ? roh : s.von) : s.p;
        if (draussen) p = roh;
        else {
          const max = s.tempo * dt;
          p = alt + clamp(roh - alt, -max, max);
          if (p !== roh) holtAuf = true;
        }
      }
      if (s.ende && p >= 0.88) ende = true;
      // Szenen vor oder hinter der Spitze haben p = 0 bzw. 1 und werden nach dem ersten Mal nicht mehr angefasst
      if (p === s.p && roh === s.r && !s.neu) continue;
      s.p = p; s.r = roh; s.neu = false;
      anwenden(s, p, roh);
    }
    if (holtAuf) anfordern();
    if (ende !== fertig) { fertig = ende; root.classList.toggle('dw--fertig', ende); }
  };
  const anfordern = () => { if (!laeuft) { laeuft = true; requestAnimationFrame(zeichnen); } };
  const neu = () => { messen(); zeichnen(); };

  if (!reduce) root.classList.add('dw--live');
  neu();
  // Dauer-Fluss der Kreise läuft nur, solange der Kreis im Bild ist (sonst pausiert, spart Rechenzeit)
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('ist-sichtbar', e.isIntersecting)));
    szenen.forEach((s) => { if (s.zu >= 0) io.observe(s.el); });
    // Glimmen von Idee- und Verbessern-Kreis im Hero sowie deren Lichtschimmer ebenfalls nur im Bild (Talk 3930/3933)
    root.querySelectorAll('.dw-ideebild__knoten, .dw-verstehen__kreis').forEach((el) => io.observe(el));
  }
  // Talk 4057: kein Einzeichnen im Hero mehr (die Hero-Linie ist ein festes SVG in index.astro)
  window.addEventListener('scroll', anfordern, { passive: true });
  let rz = 0;
  const spaeter = () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(neu); };
  if ('ResizeObserver' in window) new ResizeObserver(spaeter).observe(root);
  // Fenstergröße: nur eine geänderte Breite zählt (iOS meldet beim Scrollen neue Höhen, Kerim-Regel)
  window.addEventListener('resize', () => { if (window.innerWidth !== vw) spaeter(); });
  document.fonts?.ready.then(spaeter);
  // Kopfzeile schrumpft (72 → 62 px) und verschiebt alles darunter: nach der Übergangszeit neu messen
  let kz = 0;
  new MutationObserver(() => { clearTimeout(kz); kz = window.setTimeout(spaeter, 260); }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}
