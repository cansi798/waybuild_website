// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE/BASE kommen aus der Umgebung (GitHub Actions). Bei eigener Domain: BASE="/".
const site = process.env.SITE ?? 'https://cansi798.github.io';
const base = process.env.BASE ?? '/waybuild_website';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
