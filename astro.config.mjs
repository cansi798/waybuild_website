// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { tabellenPlugin } from './src/lib/markdown-tabellen.mjs';

// Standard = Live-Version für den eigenen Server (waybuild.de, Pfad "/").
// Die GitHub-Pages-VORSCHAU setzt SITE, BASE und PUBLIC_PREVIEW=true im Workflow.
const site = process.env.SITE ?? 'https://waybuild.de';
const base = process.env.BASE ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      lastmod: new Date(),
      // Rechtstexte, interne Seiten und 404 nicht in die Sitemap
      filter: (page) => !/\/(impressum|datenschutz|agb|404|checkliste|danke|hauptseite-alt)\/?$/.test(page)
        // Frühere Variante /variante/ (Jamil #5016) ist seit 08.11.2026 (#5056) die richtige /preise/-Seite; unter /variante/ stehen nur noch Weiterleitungsseiten (src/pages/variante/[...pfad].astro), nie in die Sitemap
        && !/\/variante\//.test(page),
    }),
  ],
  // Ratgeber-Tabellen: per Tastatur erreichbarer Scroll-Bereich + Name für leere Kopfzellen (Jamil, Talk qh87y3sj #5215)
  // (satteri() ist Astros Standard-Prozessor; hier nur um das Tabellen-Plugin ergänzt)
  markdown: { processor: satteri({ hastPlugins: [tabellenPlugin] }) },
  build: { inlineStylesheets: 'always' },
});
