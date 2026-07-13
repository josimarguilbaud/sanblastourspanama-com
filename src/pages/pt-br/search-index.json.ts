import { getCollection } from 'astro:content';

const LOCALE = 'pt-br';
const PREFIX = '/pt-br';

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
      .map((e) => ({ title: e.data.name, url: `${PREFIX}/islands/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Ilha' })),
    ...tours
      .filter((e) => e.id.startsWith(`${LOCALE}/`))
      .map((e) => ({ title: e.data.name, url: `${PREFIX}/tours/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Passeio' })),
    ...packages
      .filter((e) => e.id.startsWith(`${LOCALE}/`))
      .map((e) => ({ title: e.data.name, url: `${PREFIX}/tours/packages/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Pacote' })),
    ...guides
      .filter((e) => e.id.startsWith(`${LOCALE}/`))
      .map((e) => ({ title: e.data.title, url: `${PREFIX}/guides/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Guia' })),
    ...posts
      .filter((e) => e.id.startsWith(`${LOCALE}/`) && !e.data.draft)
      .map((e) => ({ title: e.data.title, url: `${PREFIX}/blog/${e.id.replace(`${LOCALE}/`, '')}`, type: 'Blog' })),
  ];

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
