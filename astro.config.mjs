// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
      filter: (page) => !/\/(impressum|datenschutz|agb|404|checkliste|danke)\/?$/.test(page),
    }),
  ],
  build: { inlineStylesheets: 'always' },
});
