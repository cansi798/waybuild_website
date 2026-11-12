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

// Leistungen NEU (Jamil, Talk qh87y3sj #5274 Vorschlag, #5276 „ok“, 09.11.2026): 12 Seiten in 4 Gruppen (seit #5630 ohne Social Media), nur aus der
// Startseite abgeleitet. Seiten unter /leistungen/<slug>/ (src/pages/leistungen/[slug].astro), Gruppen/Reihenfolge in
// src/config/leistungen-neu.ts. Links im Text als /leistungen/<slug>/ schreiben; den Basis-Pfad setzt
// src/lib/markdown-basislinks.mjs beim Bauen davor. Keine Preise in diesen Dateien (Preise nur auf /preise/).
const leistungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/leistungen' }),
  schema: z.object({
    title: z.string().max(52), // H1 und <title> (+ " | Waybuild")
    menuTitel: z.string().max(30),
    gruppe: z.enum(['gefunden', 'vertrauen', 'anfragen', 'betreuung']),
    station: z.enum(['aufmerksamkeit', 'vertrauen', 'anfrage', 'bearbeitung', 'betreuung']),
    kurz: z.string().max(100),
    description: z.string().min(70).max(165),
    /** Paket-Hinweis nur wie auf der Startseite belegt, sonst „auf Anfrage“ */
    paket: z.string(),
    fragen: z.array(z.object({ frage: z.string(), antwort: z.string() })).min(1),
  }),
});

export const collections = { ratgeber, blog, leistungen };
