import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artikel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artikel' }),
  schema: z.object({
    title: z.string(),
    h1: z.string(),
    description: z.string().min(140).max(155),
    pilar: z.enum(['panduan', 'modal', 'hobi']),
    keyword: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    kalkulator: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3).max(5),
    draft: z.boolean().default(false),
  }),
});

export const collections = { artikel };
