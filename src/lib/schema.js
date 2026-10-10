// Data terstruktur (schema.org JSON-LD).
import site from '../../site.config.mjs';

const abs = (path) => new URL(path, site.url).href;

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.href),
  })),
});

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const author = () => ({ '@type': 'Person', name: site.owner.name, url: abs('/tentang/') });

export const articleSchema = ({ title, description, path, published, updated }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  mainEntityOfPage: abs(path),
  datePublished: published.toISOString(),
  dateModified: updated.toISOString(),
  inLanguage: 'id-ID',
  author: author(),
  publisher: { '@type': 'Organization', name: site.name, url: site.url },
});

export const webAppSchema = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url: abs(path),
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  inLanguage: 'id-ID',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
  publisher: { '@type': 'Organization', name: site.name, url: site.url },
});
