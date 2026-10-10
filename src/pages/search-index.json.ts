import type { APIRoute } from 'astro';
import { calculatorContent } from '../data/calculator-content.js';
import { getArticles } from '../lib/content.js';

export const GET: APIRoute = async () => {
  const articles = await getArticles();
  const items = [
    ...calculatorContent.map((c) => ({
      url: `/${c.slug}/`,
      title: c.nama,
      description: c.description,
      text: `${c.keyword} ${c.intro}`,
    })),
    ...articles.map((a) => ({
      url: `/${a.id}/`,
      title: a.data.h1,
      description: a.data.description,
      text: `${a.data.keyword} ${a.data.faq.map((f) => f.q).join(' ')}`,
    })),
  ];
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
