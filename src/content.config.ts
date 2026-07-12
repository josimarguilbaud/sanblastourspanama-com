import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One Markdown file per locale per entity (src/content/islands/en/chichime.md,
// src/content/islands/es/chichime.md, ...). If a locale's file doesn't exist
// yet, that translation simply isn't published — the file's presence in the
// repo IS the human-review gate, no separate CMS/approval flag needed.
const islands = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/islands' }),
  schema: z.object({
    name: z.string(),
    sector: z.string().optional(),
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    lat: z.number().optional(),
    lng: z.number().optional(),
    bestFor: z.array(z.string()).default([]),
    isInhabited: z.boolean().default(false),
    relatedTourKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    heroImage: z.string().optional(),
    relatedGuideSlugs: z.array(z.string()).default([]),
    relatedIslandSlugs: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    heroImage: z.string().optional(),
    publishedAt: z.date(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

// The business's real bookable catalog: 5 day tours + 5 overnight cabin
// types (see widget/database/seeders/DayTourRebrandSeeder.php and
// SanBlasStaySeeder.php in the main app repo — this content describes those
// same real products, it does not invent new ones). No hardcoded prices:
// PriceCalculationService/Tour.prices is the live source of truth, this is
// marketing copy that always sends bookers to the widget for current rates.
const tours = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tours' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['day-tour', 'overnight']),
    tagline: z.string(),
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    duration: z.string(),
    bestFor: z.array(z.string()).default([]),
    tourKey: z.string().optional(),
    relatedIslandSlugs: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

// Custom packages: real concepts assembled from the real day-tour/overnight
// catalog above, with no fixed price or fixed island — every one is
// coordinated over WhatsApp around the traveler's actual dates and group.
// Modeled as its own collection (not `tours`) because these are marketing
// concepts, not bookable SKUs with a `tourKey` in the pricing engine.
const packages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/packages' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    duration: z.string(),
    heroImage: z.string(),
    highlights: z.array(z.string()).default([]),
    relatedTourSlugs: z.array(z.string()).default([]),
    relatedIslandSlugs: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { islands, guides, posts, tours, packages };
