// Menyisipkan unit iklan di dalam artikel Markdown (Fase 8 workflow):
// - satu setelah paragraf pembuka (slot afterIntro)
// - satu sebelum subjudul H2 setiap kali sudah lewat minimal ~350 kata sejak iklan terakhir (slot inArticle)
// Tidak melakukan apa-apa selama adsEnabled = false atau ID slot belum diisi.
import site from '../../site.config.mjs';

const WORDS_BETWEEN_ADS = 350;

const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children || []).map(textOf).join(' ');

const countWords = (node) => textOf(node).split(/\s+/).filter(Boolean).length;

function adNode(slot) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['ad'] },
    children: [
      { type: 'element', tagName: 'span', properties: { className: ['ad-label'] }, children: [{ type: 'text', value: 'Iklan' }] },
      {
        type: 'element',
        tagName: 'ins',
        properties: {
          className: ['adsbygoogle'],
          style: 'display:block',
          dataAdClient: site.adsenseClient,
          dataAdSlot: slot,
          dataAdFormat: 'auto',
          dataFullWidthResponsive: 'true',
        },
        children: [],
      },
      {
        type: 'element',
        tagName: 'script',
        properties: {},
        children: [{ type: 'text', value: '(window.adsbygoogle = window.adsbygoogle || []).push({});' }],
      },
    ],
  };
}

export default function rehypeAds() {
  return (tree) => {
    if (!site.adsEnabled || !site.adsenseClient) return;
    const { afterIntro, inArticle } = site.adSlots;
    const out = [];
    let introDone = false;
    let words = 0;
    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2' && inArticle && words >= WORDS_BETWEEN_ADS) {
        out.push(adNode(inArticle));
        words = 0;
      }
      out.push(node);
      if (node.type === 'element') {
        words += countWords(node);
        if (!introDone && node.tagName === 'p') {
          introDone = true;
          if (afterIntro) {
            out.push(adNode(afterIntro));
            words = 0;
          }
        }
      }
    }
    tree.children = out;
  };
}
