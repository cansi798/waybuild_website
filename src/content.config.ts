// Content-Collections: Ratgeber-Artikel als Markdown in src/content/ratgeber/, Blog-Beiträge in src/content/blog/
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ratgeber' }),
  schema: z.object({
    title: z.string().max(52), // + " | Waybuild" ≤ 60 Zeichen
    description: z.string().min(70).max(160),
    /** Kurzfassung ganz oben – für Eilige (und KI-Suchen) */
    kurz: z.array(z.string()).min(2).max(4),
    datum: z.coerce.date(),
    /** Optional: Leistung (slug aus config/leistungen.ts), die statt „Website as a Service“ am Ende empfohlen wird */
    leistung: z.string().optional(),
  }),
});

// Blog (Jamil, Talk qh87y3sj #5264, 09.11.2026: Hauptpunkt „Wissen“ = Ratgeber, Fragen und Blog).
// draft: true = Entwurf für Jamil zum Gegenlesen: Seite wird gebaut (Vorschau), zeigt „Entwurf – wird noch geprüft“,
// steht auf noindex, nicht in der Sitemap (astro.config.mjs) und nicht in llms.txt.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(52), // + " | Waybuild" ≤ 60 Zeichen
    description: z.string().min(70).max(160),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { ratgeber, blog };
