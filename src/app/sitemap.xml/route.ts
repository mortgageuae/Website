import { text } from '@/lib/feeds';
import { SITE } from '@/data/site';
export const dynamic = 'force-static';
const maps = ['core', 'banks', 'handover', 'communities', 'ar'];
export const GET = () => text(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${maps.map((m) => `  <sitemap><loc>${SITE.url}/sitemap-${m}.xml</loc><lastmod>${SITE.asOfISO}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>\n`, 'application/xml');
