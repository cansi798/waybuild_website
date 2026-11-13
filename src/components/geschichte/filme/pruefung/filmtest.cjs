// Browser-Prüfung der zwei Filme auf /geschichte/ (Jamil, Talk qh87y3sj #5739–#5756, 13.11.2026) an der Testseite /film-test/.
// Aufruf im Image mcr.microsoft.com/playwright:v1.48.2-jammy (NODE_PATH mit playwright@1.48.2):
//   node filmtest.cjs <Basis-URL, z. B. http://127.0.0.1:8833/waybuild_website> <Ausgabeordner> [teile]
// Teile: layout,auto,steuer,still,person,zwei,weg,bilder (Standard: alle)
const { chromium, webkit, devices } = require('playwright');
const fs = require('fs'); const path = require('path');
const BASIS = process.argv[2].replace(/\/$/, ''); const OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const TEILE = (process.argv[4] || 'layout,auto,steuer,still,person,zwei,weg,bilder').split(',');
const SEITE = `${BASIS}/film-test/`;
const SPEICHER = 'waybuild-beispiel-film';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const erg = [];
const log = (name, ok, info = '') => { erg.push({ name, ok }); console.log(`${ok ? 'OK  ' : 'FEHL'} ${name}${info ? ' – ' + info : ''}`); };
const geh = async (p, u) => { for (let i = 0; i < 4; i++) { try { return await p.goto(u, { waitUntil: 'load', timeout: 45000 }); } catch (e) { console.log('retry', u); } } };
const BREITEN = [
  { n: '320', o: { viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  { n: '375', o: { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  { n: '390', o: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  { n: '768', o: { viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true } },
  { n: '1280', o: { viewport: { width: 1280, height: 800 } } },
  { n: '1440', o: { viewport: { width: 1440, height: 900 } } },
];
const merke = (ctx, b, f) => ctx.addInitScript(([k, b, f]) => { try { sessionStorage.setItem(k, JSON.stringify({ b, f })); } catch (e) {} }, [SPEICHER, b, f]);
const wache = (p, l) => { p.on('pageerror', (e) => l.push(e.message)); p.on('console', (m) => { if (m.type() === 'error' && !/favicon|404/.test(m.text())) l.push(m.text()); }); };
// k = Index der Film-Instanz auf der Seite (0 Website, 1 Betriebstag, 2 Website zweimal)
const zeigeFilm = (p, k) => p.evaluate((k) => {
  const b = document.querySelectorAll('[data-gf-buehne]')[k];
  const kopf = parseFloat(getComputedStyle(b).scrollMarginTop) || 0;
  window.scrollTo({ top: b.getBoundingClientRect().top + scrollY - kopf, behavior: 'instant' });
}, k);
const st = (p, k) => p.evaluate((k) => document.querySelectorAll('[data-gfilm]')[k].__gf.schritt(), k);
const klick = (p, k, sel) => p.evaluate(([k, sel]) => document.querySelectorAll('[data-gfilm]')[k].querySelector(sel).click(), [k, sel]);

(async () => {
  const B = { chromium: await chromium.launch(), webkit: await webkit.launch() };

  // A Layout: kein Querscrollen, Bühne zwischen Kopfzeile und Leiste unten, Text frei über der Steuerleiste
  if (TEILE.includes('layout')) for (const bn of ['chromium', 'webkit']) for (const w of BREITEN) {
    const ctx = await B[bn].newContext(w.o); const p = await ctx.newPage(); const fe = []; wache(p, fe);
    const schlecht = [];
    for (const [art, k, n] of [['website', 0, 6], ['tag', 1, 7]]) for (let s = 1; s <= n; s++) {
      await geh(p, `${SEITE}?gfilm=${art}&gszene=${s}&gphase=9`); await zeigeFilm(p, k); await sleep(700);
      const m = await p.evaluate((k) => {
        const film = document.querySelectorAll('[data-gfilm]')[k];
        const b = film.querySelector('[data-gf-buehne]').getBoundingClientRect();
        const kopf = document.querySelector('.hdr')?.getBoundingClientRect().bottom ?? 0;
        const leiste = [...document.querySelectorAll('body *')].find((e) => getComputedStyle(e).position === 'fixed' && e.getBoundingClientRect().bottom >= innerHeight - 1 && e.offsetHeight > 30 && e.offsetHeight < 140);
        const unten = leiste ? leiste.getBoundingClientRect().top : innerHeight;
        const steuer = film.querySelector('[data-gf-steuerung]').getBoundingClientRect();
        const li = film.querySelector('.gf-schritt.ist-aktiv');
        const tr = li.querySelector('.gf-text').getBoundingClientRect();
        const gr = [...li.querySelectorAll('.gr, .gfw6-bild')].map((g) => g.getBoundingClientRect());
        const bild = li.querySelector('.gf-bild').getBoundingClientRect();
        return { top: b.top, bottom: b.bottom, kopf, unten, sw: document.documentElement.scrollWidth - document.documentElement.clientWidth, steuerTop: steuer.top, textBottom: tr.bottom,
          geraetAus: gr.some((g) => g.width < 40 || g.left < bild.left - 2 || g.right > bild.right + 2 || g.top < bild.top - 2 || g.bottom > bild.bottom + 2) };
      }, k);
      const f = [];
      if (m.sw > 0) f.push(`quer ${m.sw}px`);
      if (m.top < m.kopf - 1.5) f.push(`oben ${Math.round(m.top)}<${Math.round(m.kopf)}`);
      if (m.bottom > m.unten + 1.5) f.push(`unten ${Math.round(m.bottom)}>${Math.round(m.unten)}`);
      if (m.textBottom > m.steuerTop + 1) f.push(`Text unter Leiste`);
      if (m.geraetAus) f.push('Gerät außerhalb/zu schmal');
      if (f.length) schlecht.push(`${art}${s}: ${f.join(', ')}`);
    }
    log(`Layout ${bn} ${w.n}: kein Querscrollen, Bühne im Bild, Geräte im Bild`, !schlecht.length && !fe.length, [...schlecht, ...fe].join(' | '));
    await ctx.close();
  }

  // B Autoplay: Szenen nacheinander, je ca. 5 s, am Ende angehalten mit „Nochmal ansehen“
  if (TEILE.includes('auto')) for (const [bn, o, nm] of [['chromium', BREITEN[5].o, '1440'], ['webkit', devices['iPhone 13'], 'iPhone13']]) for (const [k, n, art] of [[0, 6, 'website'], [1, 7, 'tag']]) {
    const ctx = await B[bn].newContext(o); const p = await ctx.newPage(); const fe = []; wache(p, fe);
    await geh(p, SEITE); await zeigeFilm(p, k);
    const t0 = Date.now(); const spur = []; let letzt = -1; let ende = null;
    while (Date.now() - t0 < 50000) {
      const s = await st(p, k);
      if (s.i !== letzt) { spur.push({ i: s.i, t: Date.now() - t0 }); letzt = s.i; }
      if (s.fertig) { ende = { s, t: Date.now() - t0 }; break; }
      await sleep(30);
    }
    const reihe = spur.map((x) => x.i).join(',');
    const dauern = spur.map((x, j) => ((j + 1 < spur.length ? spur[j + 1].t : ende ? ende.t : NaN) - x.t));
    // erste Szene startet beim Sichtbarwerden: Dauer ab dem ersten gemessenen Spielen (die erste Messung ist leicht kürzer)
    const aus = dauern.slice(1).filter((d) => !(d >= 4400 && d <= 5700));
    log(`Autoplay ${bn} ${nm} ${art}: Reihenfolge`, reihe === Array.from({ length: n }, (_, i) => i).join(','), reihe);
    log(`Autoplay ${bn} ${nm} ${art}: jede Szene ca. 5 s (4,4–5,7)`, !aus.length && dauern.length === n, dauern.map((d) => (d / 1000).toFixed(2)).join(' '));
    const e2 = await p.evaluate((k) => { const f = document.querySelectorAll('[data-gfilm]')[k]; const b = f.querySelector('[data-gf-nochmal]'); const knopf = f.querySelector('[data-gf="pause"]');
      return { sichtbar: !!b && !b.hidden && b.offsetHeight > 0, label: knopf.getAttribute('aria-label') }; }, k);
    log(`Autoplay ${bn} ${nm} ${art}: Ende angehalten + „Nochmal ansehen“`, !!ende && !ende.s.spielt && e2.sichtbar && e2.label === 'Nochmal ansehen', JSON.stringify(e2));
    await klick(p, k, '[data-gf="nochmal"]'); await sleep(300); const n1 = await st(p, k);
    log(`Autoplay ${bn} ${nm} ${art}: „Nochmal ansehen“ startet von vorn`, n1.i === 0 && n1.spielt && !n1.fertig, JSON.stringify(n1));
    log(`Autoplay ${bn} ${nm} ${art}: keine Fehler`, !fe.length, fe.join(' | '));
    await ctx.close();
  }

  // C Steuerung
  if (TEILE.includes('steuer')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext(BREITEN[5].o); const p = await ctx.newPage();
    await geh(p, `${SEITE}?gfilm=tag&gszene=2`); await zeigeFilm(p, 1); await sleep(300);
    const knopf = async () => p.evaluate(() => { const b = document.querySelectorAll('[data-gfilm]')[1].querySelector('[data-gf="pause"]'); return { a: b.getAttribute('aria-label'), t: b.textContent.trim() }; });
    await klick(p, 1, '[data-gf="pause"]'); const l1 = await knopf();
    const a = await st(p, 1); await sleep(5600); const b = await st(p, 1);
    log(`Steuerung ${bn}: Pause hält an, Knopf heißt „Abspielen“`, a.i === b.i && !b.spielt && l1.a === 'Abspielen' && l1.t === 'Abspielen', `${a.i}→${b.i} ${JSON.stringify(l1)}`);
    await klick(p, 1, '[data-gf="pause"]'); const l2 = await knopf(); await sleep(5400); const c = await st(p, 1);
    log(`Steuerung ${bn}: Abspielen läuft weiter, Knopf heißt „Pause“`, c.i > b.i && c.spielt && l2.a === 'Pause', `${b.i}→${c.i} ${JSON.stringify(l2)}`);
    await klick(p, 1, '.gf-segment[data-gf-zu="5"]'); await sleep(150); const d = await st(p, 1);
    await klick(p, 1, '[data-gf="vor"]'); await sleep(100); const e = await st(p, 1);
    await klick(p, 1, '[data-gf="zurueck"]'); await klick(p, 1, '[data-gf="zurueck"]'); await sleep(100); const f = await st(p, 1);
    log(`Steuerung ${bn}: Segment springt, Weiter, Zurück`, d.i === 5 && e.i === 6 && f.i === 4, `${d.i} ${e.i} ${f.i}`);
    await p.evaluate(() => document.querySelectorAll('[data-gf-buehne]')[1].focus());
    await p.keyboard.press('ArrowRight'); await sleep(80); const g = await st(p, 1);
    await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft'); await sleep(80); const h = await st(p, 1);
    const w0 = (await st(p, 1)).wollen; const y0 = await p.evaluate(() => scrollY); await p.keyboard.press(' '); await sleep(80); const w1 = (await st(p, 1)).wollen;
    log(`Steuerung ${bn}: Tastatur in der Bühne (Pfeile, Leertaste ohne Scrollen)`, g.i === 5 && h.i === 3 && w0 !== w1 && (await p.evaluate(() => scrollY)) === y0, `${g.i} ${h.i} ${w0}->${w1}`);
    await p.evaluate(() => document.activeElement.blur()); const v0 = (await st(p, 1)).i; await p.keyboard.press('ArrowRight'); await sleep(80); const v1 = (await st(p, 1)).i;
    const andere = await st(p, 0);
    log(`Steuerung ${bn}: Pfeiltaste ohne Fokus gilt nur dem sichtbaren Film`, v1 === v0 + 1, `${v0}->${v1}, Website-Film i=${andere.i}`);
    // Tab verborgen
    if (!(await st(p, 1)).wollen) await klick(p, 1, '[data-gf="pause"]');
    await p.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
    await sleep(100); const t1 = await st(p, 1); await sleep(5300); const t2 = await st(p, 1);
    await p.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange')); });
    await sleep(100); const t3 = await st(p, 1);
    log(`Steuerung ${bn}: verborgener Tab hält an, danach weiter`, !t1.spielt && t1.i === t2.i && t3.spielt, `${t1.spielt}/${t1.i}/${t2.i}/${t3.spielt}`);
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await sleep(900); const o1 = await st(p, 1);
    log(`Steuerung ${bn}: aus dem Bild → hält an`, !o1.spielt && !o1.sichtbar, JSON.stringify(o1));
    const aria = await p.evaluate(() => { const f = document.querySelectorAll('[data-gfilm]')[1]; return { live: f.querySelector('[data-gf-ansage]').getAttribute('aria-live'), text: f.querySelector('[data-gf-ansage]').textContent, seg: f.querySelector('.gf-segment').getAttribute('aria-label'), rolle: f.querySelector('[data-gf-buehne]').getAttribute('aria-label') }; });
    log(`Steuerung ${bn}: aria-live, Segmente beschriftet`, aria.live === 'polite' && /Szene \d von 7, \d\d:\d\d Uhr/.test(aria.text) && aria.seg === 'Zu Szene 1: 07:30 Uhr, Der Tag ist geplant', JSON.stringify(aria));
    await ctx.close();
  }

  // D reduzierte Bewegung
  if (TEILE.includes('still')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext({ ...BREITEN[2].o, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await geh(p, SEITE); await zeigeFilm(p, 1); await sleep(5600);
    const m = await p.evaluate(() => ({ still: document.querySelectorAll('.gf--still').length, phasen: document.querySelectorAll('.gf-sz[data-phase]').length }));
    const s0 = await st(p, 1);
    await klick(p, 1, '[data-gf="vor"]'); await sleep(100); const s1 = await st(p, 1);
    await klick(p, 1, '.gf-segment[data-gf-zu="6"]'); await sleep(100);
    const ende = await p.evaluate(() => { const b = document.querySelectorAll('[data-gfilm]')[1].querySelector('[data-gf-nochmal]'); return !b.hidden; });
    await p.screenshot({ path: path.join(OUT, `still-${bn}.png`) });
    log(`Reduziert ${bn}: kein Autoplay, Endzustände, Weiter per Knopf, „Nochmal ansehen“ am Ende`, m.still === 3 && m.phasen === 0 && s0.i === 0 && !s0.spielt && s1.i === 1 && ende, JSON.stringify({ m, s0, s1: s1.i, ende }));
    await ctx.close();
  }

  // E Personalisierung: 3 Branchen + Name mit HTML-Zeichen (nur Text), Event zur Laufzeit
  if (TEILE.includes('person')) for (const bn of ['chromium', 'webkit']) for (const [id, suche, ort] of [['elektro', 'Elektriker in Musterstadt', 'Baustelle'], ['foto', 'Fotograf in Musterstadt', 'Shooting'], ['coach', 'Coach in Musterstadt', 'Sitzung']]) {
    const ctx = await B[bn].newContext(BREITEN[2].o); const NAME = '<b>Schmidt & Söhne</b>';
    await merke(ctx, id, NAME);
    const p = await ctx.newPage(); const fe = []; wache(p, fe);
    await geh(p, SEITE); await sleep(300);
    const m = await p.evaluate(() => {
      const f = [...document.querySelectorAll('[data-p="firma"]')];
      const tag = document.querySelectorAll('[data-gfilm]')[1];
      return { texte: [...new Set(f.map((e) => e.textContent))], anzahl: f.length, html: f[0].innerHTML, kinder: f.some((e) => e.children.length), boldDa: !!document.querySelector('.gf b b, .gf-sz b > b'),
        suche: [...document.querySelector('.gfw1-text').children].map((z) => z.textContent).join('').replace(/\u00a0/g, ' '),
        satz1: document.querySelector('[data-gfilm="website"] .gf-satz').textContent, ort: tag.querySelector('[data-p="ortWort"]').textContent, satz2: tag.querySelectorAll('.gf-satz')[1].textContent };
    });
    const ok = m.texte.length === 1 && m.texte[0] === NAME && m.anzahl > 10 && /&lt;b&gt;/.test(m.html) && !m.kinder && m.suche === suche && m.satz1.includes(NAME) && m.ort === ort;
    log(`Personalisierung ${bn} ${id}: Name nur als Text, Suche, Begriffe`, ok && !fe.length, JSON.stringify(m).slice(0, 360));
    if (id === 'elektro') {
      await p.evaluate(() => { sessionStorage.setItem('waybuild-beispiel-film', JSON.stringify({ b: 'dach', f: 'Dach & Co' })); window.dispatchEvent(new CustomEvent('waybuild:personalisierung')); });
      await sleep(100);
      const n = await p.evaluate(() => ({ f: [...new Set([...document.querySelectorAll('[data-p="firma"]')].map((e) => e.textContent))], s: document.querySelector('.gfw1-text').textContent.replace(/\u00a0/g, ' ') }));
      await p.evaluate(() => window.dispatchEvent(new CustomEvent('waybuild:personalisierung', { detail: { b: 'nichtda', f: '' } })));
      await sleep(100);
      const z = await p.evaluate(() => ({ f: document.querySelector('[data-p="firma"]').textContent, s: document.querySelector('.gfw1-text').textContent.replace(/\u00a0/g, ' ') }));
      log(`Personalisierung ${bn}: Event 'waybuild:personalisierung' (Speicher + detail, unbekannt → Standard)`, n.f.length === 1 && n.f[0] === 'Dach & Co' && n.s === 'Dachdecker in Musterstadt' && z.f === 'Malerbetrieb Muster' && z.s === 'Maler in Musterstadt', JSON.stringify({ n, z }));
    }
    await ctx.close();
  }
  if (TEILE.includes('person')) {
    const ctx = await B.chromium.newContext(BREITEN[2].o); const p = await ctx.newPage(); await geh(p, SEITE); await sleep(200);
    const m = await p.evaluate(() => ({ f: document.querySelector('[data-p="firma"]').textContent, s: document.querySelector('.gfw1-text').textContent.replace(/\u00a0/g, ' ') }));
    log('Personalisierung: ohne Auswahl Standardbranche (Maler)', m.f === 'Malerbetrieb Muster' && m.s === 'Maler in Musterstadt', JSON.stringify(m));
    await ctx.close();
  }

  // F zwei Instanzen derselben Komponente stören sich nicht
  if (TEILE.includes('zwei')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext({ viewport: { width: 1440, height: 2600 } }); const p = await ctx.newPage(); const fe = []; wache(p, fe);
    await geh(p, SEITE);
    // beide Website-Filme gleichzeitig sichtbar machen: Seite so scrollen, dass Film 3 im Bild ist, Film 1 per Testhöhe ebenfalls
    const ids = await p.evaluate(() => { const f = [...document.querySelectorAll('[data-gfilm]')]; return { inst: f.map((e) => e.dataset.gfInstanz), ids: document.querySelectorAll('.gf [id]').length }; });
    await klick(p, 2, '[data-gf="pause"]'); await klick(p, 2, '.gf-segment[data-gf-zu="3"]'); await sleep(150);
    const a0 = await st(p, 0); const a2 = await st(p, 2);
    await klick(p, 0, '[data-gf="pause"]'); await sleep(100);
    const b0 = await st(p, 0); const b2 = await st(p, 2);
    log(`Zwei Instanzen ${bn}: eigene Kennung, keine IDs, Springen/Pause nur im eigenen Film`, new Set(ids.inst).size === 3 && ids.ids === 0 && a2.i === 3 && !a2.wollen && a0.i !== 3 && a0.wollen && !b0.wollen && b2.i === 3 && !fe.length, JSON.stringify({ ids, a0, a2, b0, b2, fe }));
    await ctx.close();
  }

  // F2 Weg-Wechsel der Seite /geschichte/: ausgeblendeter Film hält sofort an, wieder eingeblendet spielt er
  if (TEILE.includes('weg')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext(BREITEN[5].o); const p = await ctx.newPage(); const fe = []; wache(p, fe);
    await geh(p, SEITE); await zeigeFilm(p, 0); await sleep(500);
    const a = await st(p, 0);
    await p.evaluate(() => { document.querySelectorAll('[data-gfilm]')[0].style.display = 'none'; window.dispatchEvent(new CustomEvent('waybuild:weg', { detail: { weg: 'betrieb' } })); });
    await sleep(50); const b = await st(p, 0);
    await p.evaluate(() => { document.querySelectorAll('[data-gfilm]')[0].style.display = ''; window.dispatchEvent(new CustomEvent('waybuild:weg', { detail: { weg: 'website' } })); });
    await sleep(100); const c = await st(p, 0);
    log(`Weg-Event ${bn}: ausgeblendet → Pause, eingeblendet → spielt`, a.spielt && !b.spielt && !b.sichtbar && c.spielt && !fe.length, JSON.stringify({ a: a.spielt, b: b.spielt, c: c.spielt, fe }));
    await ctx.close();
  }

  // G Bilder je Szene (Endzustand + Zwischenphase) für die Sichtprüfung
  if (TEILE.includes('bilder')) for (const [bn, o, nm] of [['webkit', devices['iPhone 13'], 'iphone13'], ['chromium', BREITEN[5].o, '1440'], ['chromium', BREITEN[0].o, '320']]) {
    const ctx = await B[bn].newContext(o); if (nm === '1440') await merke(ctx, 'elektro', '<b>Schmidt & Söhne</b>');
    const p = await ctx.newPage(); const fe = []; wache(p, fe);
    for (const [art, k, n] of [['website', 0, 6], ['tag', 1, 7]]) for (let s = 1; s <= n; s++) for (const ph of (nm === 'iphone13' ? [9, 1] : [9])) {
      await geh(p, `${SEITE}?gfilm=${art}&gszene=${s}&gphase=${ph}`); await zeigeFilm(p, k); await sleep(ph === 9 ? 1500 : 1300);
      const g = await p.evaluate((k) => [...document.querySelectorAll('[data-gfilm]')[k].querySelectorAll('.gf-schritt.ist-aktiv .gr')].map((e) => Math.round(e.getBoundingClientRect().width)), k);
      if (g.some((w) => w < 40)) fe.push(`${art}${s}: Gerät Breite ${g.join('/')}`);
      await p.screenshot({ path: path.join(OUT, `${nm}-${art}${s}-p${ph}.png`) });
    }
    log(`Bilder ${bn} ${nm}: aufgenommen, Geräte haben Breite`, !fe.length, fe.join(' | '));
    await ctx.close();
  }

  await B.chromium.close(); await B.webkit.close();
  const f = erg.filter((e) => !e.ok);
  console.log(`\n${erg.length - f.length}/${erg.length} OK`);
  process.exit(f.length ? 1 : 0);
})();
