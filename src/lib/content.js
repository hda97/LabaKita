// Pengambilan artikel yang sudah terbit dan aturan tautan terkait.
import { getCollection } from 'astro:content';
import { calculatorContent } from '../data/calculator-content.js';

export async function getArticles() {
  const all = await getCollection('artikel', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.updated - a.data.updated || a.data.title.localeCompare(b.data.title));
}

export const formatTanggal = (d) =>
  d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Artikel terkait: 2 dari pilar yang sama, 2 dari pilar lain (sesuai aturan internal link). */
export function relatedArticles(current, all) {
  const others = all.filter((a) => a.id !== current.id);
  const same = others.filter((a) => a.data.pilar === current.data.pilar).slice(0, 2);
  const cross = others.filter((a) => a.data.pilar !== current.data.pilar).slice(0, 2);
  return { same, cross };
}

export const calcBySlug = (slug) => calculatorContent.find((c) => c.slug === slug);
