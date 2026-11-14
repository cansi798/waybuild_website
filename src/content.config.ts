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
    // Einheitlicher Aufbau aller Leistungsseiten im Stil der neuen Startseite (Jamil, Talk qh87y3sj #5892, 14.11.2026).
    // Alle Felder optional: fehlt eines, lässt LeistungSeite.astro den Teil weg bzw. nutzt einen ruhigen Standardtext.
    // In Texten sind **fett** und [Link](/pfad/) erlaubt (einfache Umwandlung in LeistungSeite.astro, Basis-Pfad über href()).
    /** „Kennen Sie das?“: drei typische Probleme */
    probleme: z.array(z.object({ titel: z.string(), text: z.string() })).max(4).optional(),
    /** „Was Sie bekommen“: Leistungsumfang; `gruppe` = optionale Zwischenzeile (z. B. „Im Paket Basis“) */
    umfang: z.array(z.object({ titel: z.string().optional(), text: z.string(), gruppe: z.string().optional() })).optional(),
    /** Satz unter dem Leistungsumfang (Hinweise, Verweise) */
    umfangHinweis: z.string().optional(),
    /** „So läuft es ab“: 3–5 Schritte, Zeitangaben nur „in der Regel“ */
    schritte: z.array(z.object({ titel: z.string(), text: z.string() })).min(2).max(5).optional(),
    /** „Passendes Paket“: Paket-IDs aus src/config/pakete-abo.ts; leer = auf Anfrage */
    pakete: z.array(z.enum(['basis', 'plus'])).optional(),
    /** true = im Paketteil die einmaligen Extras (EINMALIG_DAZU aus pakete-abo.ts) mit Festpreis zeigen */
    extras: z.boolean().optional(),
    /** Erklärung zum Paket (ohne Preise; Preise kommen nur aus pakete-abo.ts) */
    paketText: z.string().optional(),
    /** „Passt das zu Ihnen?“ */
    passt: z.string().optional(),
    /** Verwandte Leistungen (Slugs), gezeigt unter „Was Sie bekommen“ */
    verwandt: z.array(z.string()).optional(),
  }),
});

export const collections = { ratgeber, blog, leistungen };
