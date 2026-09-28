// Content-Collections: Ratgeber-Artikel als Markdown in src/content/ratgeber/
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
    /** Tarif, der am Ende empfohlen wird */
    tarif: z.enum(['start', 'business', 'premium']).default('business'),
  }),
});

export const collections = { ratgeber };
