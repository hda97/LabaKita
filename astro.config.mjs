import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import site from './site.config.mjs';
import rehypeAds from './src/lib/rehype-ads.mjs';

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  markdown: {
    // Pemroses unified (remark/rehype) dipakai supaya plugin penyisip iklan bisa berjalan.
    processor: unified({ rehypePlugins: [rehypeAds] }),
  },
});
