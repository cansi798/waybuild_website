// SEO-Audit über den Build-Output (dist/). Aufruf: node scripts/seo-audit.mjs
// Prüft jede HTML-Seite auf die wichtigsten On-Page-Faktoren und findet tote interne Links.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const BASE = (process.env.BASE ?? '/').replace(/\/+$/, '');
const PREVIEW = process.env.PUBLIC_PREVIEW === 'true';
const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(DIST);

const text = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
let problems = 0;
const report = (file, msg) => { problems++; console.log(`  ✗ ${msg}`); };

for (const file of files.sort()) {
  const html = readFileSync(file, 'utf8');
  const page = file.replace(DIST, '').replace(/index\.html$/, '');
  // In der Vorschau ist alles noindex – dann trotzdem alle Regeln prüfen (außer bewusst interne Seiten)
  const noindex = PREVIEW
    ? /\/(impressum|datenschutz|agb|404|checkliste|danke)/.test(file)
    : /<meta name="robots" content="noindex/.test(html);
  console.log(`\n${page}${noindex ? '  (noindex)' : ''}`);

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!title) report(file, 'kein <title>');
  else if (title.length > 60 && !noindex) report(file, `Title zu lang (${title.length} > 60): ${title}`);
  if (!desc) report(file, 'keine Meta-Description');
  else if (!noindex && (desc.length < 70 || desc.length > 160)) report(file, `Description ${desc.length} Zeichen (Ziel 70–160)`);

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) report(file, `${h1s.length} × <h1> (genau 1 erwartet)`);

  // Überschriften-Hierarchie: kein Sprung um mehr als eine Ebene nach unten
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) report(file, `Überschriften-Sprung h${levels[i - 1]} → h${l}`); });

  if (!/<link rel="canonical" href="https:\/\/[^"]+\/"/.test(html)) report(file, 'Canonical fehlt oder ohne abschließenden Slash');
  if (!/<html lang="de"/.test(html)) report(file, 'lang="de" fehlt');
  if (!/property="og:image"/.test(html)) report(file, 'og:image fehlt');

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) if (!/\balt=/.test(img)) report(file, `Bild ohne alt: ${img.slice(0, 60)}`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const j = JSON.parse(m[1]);
      if (JSON.stringify(j).includes('TODO')) report(file, `JSON-LD enthält TODO (${j['@type']})`);
    } catch { report(file, 'JSON-LD ungültig'); }
  }

  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (BASE && !href.startsWith(BASE + '/')) { report(file, `Link ohne Base-Pfad: ${href}`); continue; }
    const rel = href.slice(BASE.length) || '/';
    const target = join(DIST, rel, rel.endsWith('/') ? 'index.html' : '');
    if (!existsSync(target)) report(file, `toter Link: ${href}`);
  }
}
console.log(`\n${problems === 0 ? '✓ Keine Probleme' : `✗ ${problems} Probleme`} in ${files.length} Seiten`);
process.exit(problems ? 1 : 0);
