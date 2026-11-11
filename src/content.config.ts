import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// .pages.yml (Pages CMS) mirrors these schemas field by field.
// Change a field here and change it there too, or the editor will save files that break the build.

// News: one Markdown file per post. New posts start as drafts (see src/lib/drafts.ts).
const actualitat = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualitat' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      image: image(),
      imageAlt: z.string().min(1, "Descriu la imatge per a qui no la pot veure"),
      draft: z.boolean().default(true),
    }),
});

// Calendar: rehearsals and performances. `start` keeps the local time the editor typed
// ("2026-11-14T19:30"), so it is stored as text and never shifted to UTC.
const localDateTime = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 16) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/, 'Format: AAAA-MM-DD o AAAA-MM-DDTHH:MM')
);

const calendari = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/calendari' }),
  schema: z.object({
    title: z.string(),
    start: localDateTime,
    type: z.enum(['assaig', 'actuacio', 'diada', 'altres']),
    location: z.string(),
    summary: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { actualitat, calendari };
