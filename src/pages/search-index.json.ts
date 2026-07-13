import { getCollection } from 'astro:content';

const LOCALE = 'en';
const PREFIX = '';

export async function GET() {
  const [islands, tours, packages, guides, posts] = await Promise.all([
    getCollection('islands'),
    getCollection('tours'),
    getCollection('packages'),
    getCollection('guides'),
    getCollection('posts'),
  ]);

  const entries = [
    ...islands
      .filter((e) => e.id.startsWith(`${LOCALE}/`))
      .map((e) => ({ title: e.data.name, url: `${PREFIX}/islands/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Island' })),
    ...tours
      .filter((e) => e.id.startsWith(`${LOCALE}/`))
      .map((e) => ({ title: e.data.name, url: `${PREFIX}/tours/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Tour' })),
    ...packages
      .filter((e) => e.id.startsWith(`${LOCALE}/`))
      .map((e) => ({ title: e.data.name, url: `${PREFIX}/tours/packages/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Package' })),
    ...guides
      .filter((e) => e.id.startsWith(`${LOCALE}/`))
      .map((e) => ({ title: e.data.title, url: `${PREFIX}/guides/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Guide' })),
    ...posts
      .filter((e) => e.id.startsWith(`${LOCALE}/`) && !e.data.draft)
      .map((e) => ({ title: e.data.title, url: `${PREFIX}/blog/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Blog' })),
  ];

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
