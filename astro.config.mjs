// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { satteri } from '@astrojs/markdown-satteri';
import { tabellenPlugin } from './src/lib/markdown-tabellen.mjs';
import { basisLinksPlugin } from './src/lib/markdown-basislinks.mjs';
import { readdirSync, readFileSync, existsSync } from 'node:fs';

// Blog-Entwürfe (draft: true im Frontmatter) nicht in die Sitemap (Jamil #5264: Entwürfe nur zum Gegenlesen)
const blogDir = new URL('./src/content/blog/', import.meta.url);
const blogEntwuerfe = existsSync(blogDir)
  ? readdirSync(blogDir).filter((f) => f.endsWith('.md') && /^draft:\s*true\s*$/m.test(readFileSync(new URL(f, blogDir), 'utf8').split(/^---\s*$/m)[1] ?? '')).map((f) => f.replace(/\.md$/, ''))
  : [];

// Standard = Live-Version für den eigenen Server (waybuild.de, Pfad "/").
// Die GitHub-Pages-VORSCHAU setzt SITE, BASE und PUBLIC_PREVIEW=true im Workflow.
const site = process.env.SITE ?? 'https://waybuild.de';
const base = process.env.BASE ?? '/';

// Weiterleitungsseiten gelöschter Adressen nie in die Sitemap (Jamil, Talk qh87y3sj #5322, Q6/Q7): alte Leistungsseiten
// (gleiche Liste wie ALT_WEITERLEITUNGEN in src/config/leistungen-neu.ts) und alle Adressen unter /website-fuer/.
const altLeistungen = ['business-website', 'online-shop', 'landingpage', 'website-relaunch', 'betreuung-pflege',
  'individuelle-software', 'software-webentwicklung', 'nextcloud', 'cloud-it', 'wettbewerbsanalyse', 'abo-wartung', 'social-media'];

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    // React nur für die 3D-Bühne der zweiten Startseite /neu/ (three.js); alle anderen Seiten bleiben ohne React
    react({ include: ['**/components/neu/**'] }),
    sitemap({
      lastmod: new Date(),
      // Rechtstexte, interne Seiten und 404 nicht in die Sitemap
      filter: (page) => !/\/(impressum|datenschutz|agb|404|checkliste|danke|referenzen)\/?$/.test(page)
        && !new URL(page).pathname.startsWith(`${base.replace(/\/+$/, '')}/neu/`) // zweite Startseite /neu/: nicht in die Sitemap
        && !/\/website-fuer\//.test(page)
        && !blogEntwuerfe.some((id) => page.replace(/\/$/, '').endsWith(`/blog/${id}`))
        && !altLeistungen.some((slug) => page.replace(/\/$/, '').endsWith(`/leistungen/${slug}`)),
    }),
  ],
  // Ratgeber-Tabellen: per Tastatur erreichbarer Scroll-Bereich + Name für leere Kopfzellen (Jamil, Talk qh87y3sj #5215)
  // (satteri() ist Astros Standard-Prozessor; hier nur um das Tabellen-Plugin ergänzt)
  // Basis-Pfad vor internen Markdown-Links (Leistungsseiten, Jamil #5274/#5276)
  markdown: { processor: satteri({ hastPlugins: [tabellenPlugin, basisLinksPlugin(base)] }) },
  build: { inlineStylesheets: 'always' },
});
