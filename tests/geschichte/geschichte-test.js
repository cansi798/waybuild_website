// Browser-Prüfung der Entwurfsseite /geschichte/ (Jamil, Talk qh87y3sj #5739–#5756, 13.11.2026).
// Aufruf (im Playwright-Image, siehe pw.sh): node geschichte-test.js <Basis-URL> <Ausgabeordner> [teile]
// Teile: layout,wege,person,merken,tastatur,still,ohnejs,meta,cls,andere,axe,bilder
const { chromium, webkit } = require('playwright');
const fs = require('fs'); const path = require('path');
const BASIS = process.argv[2].replace(/\/$/, ''); const OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const TEILE = (process.argv[4] || 'layout,wege,person,merken,tastatur,still,ohnejs,meta,cls,andere,axe,bilder').split(',');
const SEITE = `${BASIS}/geschichte/`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const erg = [];
const log = (name, ok, info = '') => { erg.push({ name, ok }); console.log(`${ok ? 'OK  ' : 'FEHL'} ${name}${info ? ' – ' + info : ''}`); };
const geh = async (p, u) => { for (let i = 0; i < 4; i++) { try { return await p.goto(u, { waitUntil: 'load', timeout: 45000 }); } catch (e) { console.log('retry', u); } } };
const BREITEN = [
  { n: '320', o: { viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  { n: '375', o: { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  { n: '390', o: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  { n: '768', o: { viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true } },
  { n: '1024', o: { viewport: { width: 1024, height: 768 } } },
  { n: '1280', o: { viewport: { width: 1280, height: 800 } } },
  { n: '1440', o: { viewport: { width: 1440, height: 900 } } },
];
const B390 = BREITEN[2].o; const B1440 = BREITEN[6].o;
const WEGE = ['website', 'anfragen', 'betrieb'];
const FILM_SPEICHER = 'waybuild-beispiel-film';
const fehlerWache = (p, liste) => { p.on('pageerror', (e) => liste.push(e.message)); p.on('console', (m) => { if (m.type() === 'error' && !/favicon|404|Failed to load resource/.test(m.text())) liste.push(m.text()); }); };
const BOESE = '<img src=x onerror="window.__xss=1">Ä&Ö "Bau" <b>';

// Was ist gerade sichtbar?
const stand = (p) => p.evaluate(() => {
  const sicht = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  const q = (s) => document.querySelector(s);
  const ring = (sel) => { const el = q(sel); return el ? getComputedStyle(el).boxShadow !== 'none' : false; };
  return {
    weg: document.documentElement.dataset.weg,
    problem: [...document.querySelectorAll('.gs-problem__weg')].filter(sicht).map((e) => e.dataset.gsWeg),
    film: [...document.querySelectorAll('.gs-film')].filter(sicht).map((e) => e.dataset.gsWeg),
    empfehlung: [...document.querySelectorAll('.gs-empfehlung')].filter(sicht).map((e) => e.dataset.gsWeg),
    beispielSichtbar: sicht(q('[data-beispiel]')),
    ringBasis: ring('.gs-angebot .pk[aria-labelledby="pk-basis"]'),
    ringPlus: ring('.gs-angebot .pk[aria-labelledby="pk-plus"]'),
    ringKomplett: ring('.gs-angebot .pm'),
    knoepfe: [...document.querySelectorAll('[data-gs-weg-knopf][aria-pressed="true"]')].map((k) => k.dataset.gsWegKnopf),
    quer: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});
const waehleWeg = async (p, w) => { await p.click(`.gs-weg:has(input[value="${w}"])`); await sleep(450); };

(async () => {
  const B = { chromium: await chromium.launch(), webkit: await webkit.launch() };

  // ── Layout: 320–1440, kein Querscrollen in jedem Weg, keine Fehler
  if (TEILE.includes('layout')) for (const bn of ['chromium', 'webkit']) for (const w of BREITEN) {
    const ctx = await B[bn].newContext(w.o); const p = await ctx.newPage(); const fe = []; fehlerWache(p, fe);
    await geh(p, SEITE); await sleep(400);
    const schlecht = [];
    for (const weg of WEGE) {
      await waehleWeg(p, weg);
      const s = await stand(p);
      if (s.quer > 0) schlecht.push(`${weg}: quer ${s.quer}px`);
      // Elemente breiter als der Bildschirm?
      const breit = await p.evaluate(() => [...document.querySelectorAll('main *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !e.closest('.sr-only, dialog, [hidden], .bsp-szene__bild, .bsp-leiste'); }).slice(0, 3).map((e) => `${e.tagName}.${[...e.classList].join('.')}`));
      if (breit.length) schlecht.push(`${weg}: breit ${breit.join(',')}`);
    }
    log(`Layout ${bn} ${w.n}: ohne Querscrollen, ohne Fehler`, !schlecht.length && !fe.length, [...schlecht, ...fe].join(' | '));
    await ctx.close();
  }

  // ── Wegwahl wechselt Problem, Film und Paket (Hero-Karten und Umschalter)
  if (TEILE.includes('wege')) for (const bn of ['chromium', 'webkit']) for (const [o, n] of [[B390, '390'], [B1440, '1440']]) {
    const ctx = await B[bn].newContext(o); const p = await ctx.newPage(); const fe = []; fehlerWache(p, fe);
    await geh(p, SEITE);
    const s0 = await stand(p);
    log(`Wege ${bn} ${n}: Standard = anfragen`, s0.weg === 'anfragen' && s0.problem.join() === 'anfragen' && s0.film.join() === 'anfragen', JSON.stringify(s0));
    const soll = { website: [true, false, false], anfragen: [false, true, false], betrieb: [false, false, true] };
    for (const weg of WEGE) {
      await waehleWeg(p, weg);
      const s = await stand(p);
      const ok = s.weg === weg && s.problem.join() === weg && s.film.join() === weg && s.empfehlung.join() === weg && s.knoepfe.length === 3 && s.knoepfe.every((k) => k === weg)
        && JSON.stringify([s.ringBasis, s.ringPlus, s.ringKomplett]) === JSON.stringify(soll[weg]) && s.beispielSichtbar === (weg === 'anfragen');
      log(`Wege ${bn} ${n}: Karte „${weg}“ → Problem, Film, Paket`, ok, JSON.stringify(s));
    }
    // Umschalter im Angebot
    await p.locator('.gs-angebot [data-gs-weg-knopf="website"]').click(); await sleep(450);
    const s2 = await stand(p);
    const radio = await p.evaluate(() => document.querySelector('input[name="gs-weg"]:checked')?.value);
    log(`Wege ${bn} ${n}: Umschalter im Angebot wechselt alles + Hero-Karte`, s2.weg === 'website' && s2.problem.join() === 'website' && radio === 'website' && s2.ringBasis, JSON.stringify(s2));
    // Film-Platzhalter oder echter Film je Weg
    const filme = await p.evaluate(() => ({ website: !!document.querySelector('#film-website .gs-film__folgt'), betrieb: !!document.querySelector('#film-betrieb .gs-film__folgt') }));
    console.log(`     (Film website ${filme.website ? 'Platzhalter' : 'eingebunden'}, betrieb ${filme.betrieb ? 'Platzhalter' : 'eingebunden'})`);
    log(`Wege ${bn} ${n}: ohne Fehler`, !fe.length, fe.join(' | '));
    await ctx.close();
  }

  // ── Personalisierung: Branche + Name bis zur Handlung, Sonderzeichen nur als Text, Film nachgezogen
  if (TEILE.includes('person')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext(B390); const p = await ctx.newPage(); const fe = []; fehlerWache(p, fe);
    await geh(p, SEITE);
    await p.click('.gs-chip:has(input[value="elektro"])');
    await p.fill('input[name="gs-firma"]', BOESE);
    await waehleWeg(p, 'website');
    await p.click('.gs-form__los'); await sleep(900);
    const r = await p.evaluate((F) => {
      const t = (s) => document.querySelector(s)?.textContent ?? '';
      let gesp = null; try { gesp = JSON.parse(sessionStorage.getItem(F)); } catch (e) {}
      return {
        lead: t('.gs-problem .lead'), a1: t('#weg-website .gs-schmerz__text'), b1: t('#weg-anfragen .gs-schmerz__text'),
        such: t('[data-g="suchNaehe"]'), handlung: t('#gs-handlung-h'), empf: t('.gs-empfehlung[data-gs-weg="website"] .gs-empfehlung__kopf'),
        imgs: document.querySelectorAll('main img[src="x"], [data-gs-v] *').length, xss: window.__xss === 1, gesp,
        filmBranche: document.querySelector('input[name="bsp-branche"]:checked')?.value, filmFirma: document.querySelector('input[name="bsp-firma"]')?.value,
        filmSchluss: window.__bspFilm?.firma(), oben: Math.round(document.getElementById('problem').getBoundingClientRect().top), fokus: document.activeElement?.id,
        wa: document.querySelector('[data-gs-wa]')?.getAttribute('href') ?? '',
      };
    }, FILM_SPEICHER);
    const name = BOESE.replace(/\s+/g, ' ').trim().slice(0, 40).trim();
    log(`Person ${bn}: Name in Problem, Empfehlung und Handlung als Text`, r.lead.includes(name) && r.handlung.includes(`bei ${name} aussehen`) && r.empf.includes(name), `${r.lead} | ${r.handlung} | ${r.empf}`);
    log(`Person ${bn}: Sonderzeichen nur Text (kein img/b, kein Skript)`, r.imgs === 0 && !r.xss, `imgs ${r.imgs} xss ${r.xss}`);
    log(`Person ${bn}: Branche wirkt (Elektriker)`, r.a1.includes('„Elektriker in der Nähe“') && r.such === 'Elektriker in der Nähe' && r.b1.includes('Elektroarbeiten Küche'), `${r.a1} | ${r.such} | ${r.b1}`);
    log(`Person ${bn}: gleicher Speicher wie der Film + Film nachgezogen`, r.gesp && r.gesp.b === 'elektro' && r.gesp.f === name && r.filmBranche === 'elektro' && r.filmFirma === name && r.filmSchluss === name, JSON.stringify(r.gesp) + ` film ${r.filmBranche}/${r.filmSchluss}`);
    log(`Person ${bn}: Knopf scrollt zum Problem, Fokus auf Überschrift`, Math.abs(r.oben) < 140 && r.fokus === 'gs-problem-h', `top ${r.oben} fokus ${r.fokus}`);
    log(`Person ${bn}: WhatsApp-Text nennt den Weg, nicht den Namen`, /Ich%20brauche%20eine%20Website|Ich\+brauche\+eine\+Website/.test(r.wa) && !r.wa.includes('onerror'), r.wa.slice(0, 160));
    // Name löschen → „bei Ihnen“
    await p.fill('input[name="gs-firma"]', ''); await sleep(100);
    const h2 = await p.textContent('#gs-handlung-h');
    log(`Person ${bn}: ohne Name „bei Ihnen“`, h2.includes('wie das bei Ihnen aussehen würde'), h2);
    log(`Person ${bn}: ohne Fehler`, !fe.length, fe.join(' | '));
    await p.screenshot({ path: path.join(OUT, `person-${bn}-390.png`), fullPage: false });
    await ctx.close();
  }

  // ── Merken: Weg, Branche, Name bleiben nach Neuladen; Film liest dieselbe Wahl
  if (TEILE.includes('merken')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext(B1440); const p = await ctx.newPage(); const fe = []; fehlerWache(p, fe);
    await geh(p, SEITE);
    await waehleWeg(p, 'betrieb'); await p.click('.gs-chip:has(input[value="foto"])'); await p.fill('input[name="gs-firma"]', 'Studio Licht');
    await geh(p, SEITE); await sleep(300);
    const r = await p.evaluate(() => ({ weg: document.documentElement.dataset.weg, b: document.querySelector('input[name="gs-branche"]:checked')?.value, f: document.querySelector('input[name="gs-firma"]').value, h: document.querySelector('#gs-handlung-h').textContent, film: window.__bspFilm?.firma() }));
    log(`Merken ${bn}: nach Neuladen gleicher Weg, Branche, Name`, r.weg === 'betrieb' && r.b === 'foto' && r.f === 'Studio Licht' && r.h.includes('bei Studio Licht') && r.film === 'Studio Licht', JSON.stringify(r));
    // so-kann-es-laufen liest dieselbe Wahl
    await geh(p, `${BASIS}/so-kann-es-laufen/`); await sleep(300);
    const f2 = await p.evaluate(() => ({ b: document.querySelector('input[name="bsp-branche"]:checked')?.value, f: window.__bspFilm?.firma() }));
    log(`Merken ${bn}: /so-kann-es-laufen/ übernimmt die Wahl`, f2.b === 'foto' && f2.f === 'Studio Licht', JSON.stringify(f2));
    log(`Merken ${bn}: ohne Fehler`, !fe.length, fe.join(' | '));
    await ctx.close();
  }

  // ── Tastatur: Pfeiltasten in den Wegkarten, Enter auf Umschalter, Fokus sichtbar
  if (TEILE.includes('tastatur')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext(B1440); const p = await ctx.newPage(); const fe = []; fehlerWache(p, fe);
    await geh(p, SEITE);
    // per Tab zur gewählten Wegkarte (wie ein Tastaturnutzer)
    for (let i = 0; i < 40; i++) { await p.keyboard.press('Tab'); if (await p.evaluate(() => document.activeElement?.name === 'gs-weg')) break; }
    await p.keyboard.press('ArrowRight'); await sleep(150);
    const w1 = await p.evaluate(() => document.documentElement.dataset.weg);
    const umriss = await p.evaluate(() => getComputedStyle(document.activeElement.closest('.gs-weg')).outlineStyle);
    await p.focus('.gs-problem [data-gs-weg-knopf="website"]'); await p.keyboard.press('Enter'); await sleep(150);
    const w2 = await p.evaluate(() => document.documentElement.dataset.weg);
    log(`Tastatur ${bn}: Pfeil → betrieb, Enter auf Umschalter → website, Fokusrahmen`, w1 === 'betrieb' && w2 === 'website' && umriss !== 'none', `${w1} ${w2} ${umriss}`);
    await ctx.close();
  }

  // ── Reduzierte Bewegung
  if (TEILE.includes('still')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext({ ...B390, reducedMotion: 'reduce' }); const p = await ctx.newPage(); const fe = []; fehlerWache(p, fe);
    await geh(p, SEITE);
    await waehleWeg(p, 'betrieb'); const s = await stand(p);
    const tr = await p.evaluate(() => getComputedStyle(document.querySelector('.gs-weg')).transitionDuration);
    await p.click('.gs-form__los'); await sleep(200);
    const top = await p.evaluate(() => Math.round(document.getElementById('problem').getBoundingClientRect().top));
    log(`Still ${bn}: ohne Übergänge, Sprung statt Gleiten, Wegwahl geht`, s.weg === 'betrieb' && /^0s/.test(tr) && Math.abs(top) < 140 && !fe.length, `${tr} top ${top} ${fe.join('|')}`);
    await ctx.close();
  }

  // ── Ohne JS: alles sichtbar
  if (TEILE.includes('ohnejs')) for (const bn of ['chromium', 'webkit']) for (const [o, n] of [[BREITEN[0].o, '320'], [B1440, '1440']]) {
    const ctx = await B[bn].newContext({ ...o, javaScriptEnabled: false }); const p = await ctx.newPage();
    await geh(p, SEITE);
    const s = await stand(p);
    const r = await p.evaluate(() => {
      const sicht = (el) => !!el && el.getClientRects().length > 0;
      return { form: sicht(document.querySelector('[data-gs-form]')), nav: sicht(document.querySelector('.gs-ohnejs')), umschalter: [...document.querySelectorAll('.gs-wegwahl')].some(sicht), labels: [...document.querySelectorAll('.gs-weglabel')].filter(sicht).length, szenen: [...document.querySelectorAll('.bsp-szene')].filter(sicht).length };
    });
    log(`Ohne JS ${bn} ${n}: alle drei Wege untereinander (Problem, Film, Empfehlung)`, s.problem.length === 3 && s.film.length === 3 && s.empfehlung.length === 3 && s.quer <= 0, JSON.stringify(s));
    log(`Ohne JS ${bn} ${n}: Sprungmarken statt Formular, Wegnamen sichtbar, Film als Karten`, !r.form && r.nav && !r.umschalter && r.labels === 6 && r.szenen >= 13, JSON.stringify(r));
    if (bn === 'chromium') await p.screenshot({ path: path.join(OUT, `ohnejs-${n}.png`), fullPage: true });
    await ctx.close();
  }

  // ── noindex, Titel, keine Links aus Menü/Seiten
  if (TEILE.includes('meta')) {
    const ctx = await B.chromium.newContext(B1440); const p = await ctx.newPage();
    await geh(p, SEITE);
    const m = await p.evaluate(() => ({ robots: document.querySelector('meta[name="robots"]')?.content, h1: document.querySelectorAll('h1').length, title: document.title }));
    log('Meta: noindex gesetzt, genau eine h1', /noindex/.test(m.robots) && m.h1 === 1, JSON.stringify(m));
    const links = [];
    for (const u of ['/', '/preise/', '/so-kann-es-laufen/', '/kontakt/']) { await geh(p, BASIS + u); links.push(...await p.evaluate(() => [...document.querySelectorAll('a[href*="geschichte"]')].map((a) => a.href))); }
    log('Meta: nirgends verlinkt (Start, Preise, Beispiel, Kontakt)', !links.length, links.join(' '));
    await ctx.close();
  }

  // ── CLS (chromium): Laden + Wegwahl im Hero (ohne Schieben unten), Scrollen bis unten
  if (TEILE.includes('cls')) for (const [o, n] of [[B390, '390'], [B1440, '1440']]) for (const vorher of [null, 'website']) {
    const ctx = await B.chromium.newContext(o);
    if (vorher) await ctx.addInitScript((w) => { try { sessionStorage.setItem('waybuild-geschichte-weg', w); sessionStorage.setItem('waybuild-beispiel-film', JSON.stringify({ b: 'shk', f: 'Bad Muster' })); } catch (e) {} }, vorher);
    const p = await ctx.newPage();
    await p.addInitScript(() => { window.__cls = 0; window.__roh = 0; window.__quellen = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__roh += e.value;
      // Schriftwechsel (Ersatzschrift → Jost/Montserrat, auf allen Seiten der Website gleich): nur Textknoten, die sich höchstens 3 px verschieben, gleiche Größe
      const nurSchrift = e.sources.every((q) => (q.node && q.node.nodeType === 3 && Math.abs(q.previousRect.y - q.currentRect.y) <= 3 && Math.abs(q.previousRect.height - q.currentRect.height) <= 1) || (q.node && q.node.closest && q.node.closest('.hdr, .preview-bar, .todo-badge')));
      if (!nurSchrift) window.__cls += e.value; window.__quellen.push(`${e.value.toFixed(4)}@${Math.round(e.startTime)}: ${e.sources.map((q) => q.node ? (q.node.nodeType === 3 ? 'T:' + (q.node.parentElement?.className || q.node.parentElement?.nodeName) + '«' + q.node.textContent.slice(0, 18) + '» ' + JSON.stringify([Math.round(q.previousRect.y), Math.round(q.currentRect.y), Math.round(q.previousRect.height), Math.round(q.currentRect.height)]) : (q.node.id || q.node.className || q.node.nodeName)) : '?').join(', ')}`); } }).observe({ type: 'layout-shift', buffered: true }); });
    await geh(p, SEITE); await sleep(1500);
    const [c1, roh, q] = await p.evaluate(() => [window.__cls, window.__roh, window.__quellen]);
    log(`CLS ${n}${vorher ? ' (gemerkter Weg)' : ''}: Laden ohne Layoutsprung (Schriftwechsel getrennt: ${roh.toFixed(4)})`, c1 < 0.001, `${c1.toFixed(4)} ${q.join(' | ')}`);
    await ctx.close();
  }

  // ── Startseite und /so-kann-es-laufen/ laufen unverändert (kein Fehler, Film läuft)
  if (TEILE.includes('andere')) for (const bn of ['chromium', 'webkit']) {
    const ctx = await B[bn].newContext(B1440); const p = await ctx.newPage(); const fe = []; fehlerWache(p, fe);
    await geh(p, `${BASIS}/`); const h1 = await p.evaluate(() => document.querySelector('h1')?.getAttribute('aria-label') || document.querySelector('h1')?.textContent);
    await geh(p, `${BASIS}/so-kann-es-laufen/`); await sleep(500);
    const film = await p.evaluate(() => window.__bspFilm?.schritt());
    log(`Andere ${bn}: Startseite + Beispiel ohne Fehler, Film da`, !!h1 && !!film && !fe.length, `${h1} | ${JSON.stringify(film)} | ${fe.join('|')}`);
    await ctx.close();
  }

  // ── axe (chromium, je Weg)
  if (TEILE.includes('axe')) {
    let axe = null; try { axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8'); } catch (e) { console.log('axe-core fehlt'); }
    if (axe) for (const [o, n] of [[B390, '390'], [B1440, '1440']]) {
      const ctx = await B.chromium.newContext({ ...o, reducedMotion: 'reduce' }); const p = await ctx.newPage();
      await geh(p, SEITE);
      for (const weg of WEGE) {
        await waehleWeg(p, weg);
        await p.addScriptTag({ content: axe });
        const v = await p.evaluate(async () => (await window.axe.run({ exclude: [['.preview-bar'], ['.todo-badge']] }, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] })).violations.map((x) => `${x.id}(${x.nodes.length}): ${x.nodes.slice(0, 2).map((nd) => nd.target.join(' ')).join(' ; ')}`));
        log(`axe ${n} ${weg}`, !v.length, v.join(' | '));
      }
      await ctx.close();
    }
  }

  // ── Bilder je Weg (chromium, 390 + 1440, ganze Seite + erster Bildschirm)
  if (TEILE.includes('bilder')) for (const [o, n] of [[B390, '390'], [B1440, '1440']]) {
    const ctx = await B.chromium.newContext({ ...o, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await geh(p, SEITE);
    await p.screenshot({ path: path.join(OUT, `start-${n}.png`) });
    for (const weg of WEGE) {
      await waehleWeg(p, weg);
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.evaluate((w) => { const b = document.querySelector(`#film-${w} [data-bsp-buehne]`) || document.querySelector(`#film-${w}`); window.scrollTo(0, b.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(b).scrollMarginTop) || 72)); }, weg); await sleep(600);
      await p.screenshot({ path: path.join(OUT, `${weg}-${n}-film.png`) });
      for (const id of ['problem', 'loesung', 'pakete', 'pk-basis', 'komplettpaket', 'so-arbeiten-wir', 'erstberatung']) {
        await p.evaluate((i) => { const el = document.getElementById(i); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 70); }, id); await sleep(300);
        await p.screenshot({ path: path.join(OUT, `${weg}-${n}-${id}.png`) });
      }
    }
    await p.screenshot({ path: path.join(OUT, `ganz-${n}.png`), fullPage: true });
    await ctx.close();
  }

  await B.chromium.close(); await B.webkit.close();
  const fehl = erg.filter((e) => !e.ok);
  console.log(`\n${erg.length - fehl.length}/${erg.length} OK`);
  process.exit(fehl.length ? 1 : 0);
})();
