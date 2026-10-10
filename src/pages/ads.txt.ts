import type { APIRoute } from 'astro';
import site from '../../site.config.mjs';

// AdSense meminta baris: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
export const GET: APIRoute = () => {
  const pub = site.adsenseClient.replace(/^ca-/, '');
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : '# Isi adsenseClient di site.config.mjs untuk mengaktifkan ads.txt\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
