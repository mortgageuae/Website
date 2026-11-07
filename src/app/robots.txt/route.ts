import { text } from '@/lib/feeds';
import { SITE } from '@/data/site';
export const dynamic = 'force-static';
const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Bingbot', 'Googlebot'];
export const GET = () => text(`${bots.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /portal/\nDisallow: /partners/dashboard\nDisallow: /partners/payouts\n`).join('\n')}
User-agent: *
Allow: /
Disallow: /portal/
Disallow: /partners/dashboard
Disallow: /partners/payouts

Sitemap: ${SITE.url}/sitemap.xml
# LLM knowledge base: ${SITE.url}/llms-full.txt
`);
