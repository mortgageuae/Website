// The 360-page master inventory (sitemap PDF), plus hub/index pages. Drives XML sitemaps, /sitemap and the count check.
import { PRODUCTS } from '@/data/products';
import { COUNTRIES } from '@/data/countries';
import { TOOLS, toolHref, AR_CALCS } from '@/data/tools';
import { BANKS } from '@/data/banks';
import { COMPARISONS } from '@/data/compare';
import { DEVELOPERS, PROJECTS } from '@/data/handover';
import { COMMUNITIES, AR_COMMUNITIES } from '@/data/communities';
import { AFFORD, ADVISORY, GUIDES } from '@/data/content';
import { AR_PRODUCTS } from '@/data/ar';

export type Route = { path: string; silo: number; wave: 1 | 2 | 3; title: string; map: 'core' | 'banks' | 'handover' | 'communities' | 'ar' };

const r = (path: string, silo: number, wave: 1 | 2 | 3, title: string, map: Route['map']): Route => ({ path, silo, wave, title, map });

export const ROUTES: Route[] = [
  // Silo 01 (10)
  r('/', 1, 1, 'Home', 'core'), r('/about-us', 1, 1, 'About us', 'core'), r('/why-betterway-vs-direct-bank', 1, 1, 'Betterway vs direct bank', 'core'),
  r('/our-underwriters', 1, 1, 'Our underwriters', 'core'), r('/reviews', 1, 1, 'Reviews', 'core'), r('/contact', 1, 1, 'Contact', 'core'), r('/careers', 1, 1, 'Careers', 'core'),
  r('/privacy-and-cbuae-disclosure', 1, 1, 'Privacy & CBUAE disclosure', 'core'), r('/llms.txt', 1, 1, 'llms.txt', 'core'), r('/llms-full.txt', 1, 1, 'llms-full.txt', 'core'),
  // Silo 02 (14)
  ...PRODUCTS.map((p) => r(`/mortgages/${p.slug}`, 2, 1, p.name, 'core')),
  // Silo 03 (12)
  ...TOOLS.map((t) => r(toolHref(t), 3, 1, t.name, 'core')),
  // Silo 04 (41)
  r('/rates/uae-mortgage-rates-eibor-revert-bible', 4, 1, '24-bank rate bible', 'core'), r('/rates/eibor-live-tracker', 4, 1, 'EIBOR tracker', 'core'),
  ...BANKS.map((b) => r(`/rates/${b.slug}`, 4, 2, b.name, 'banks')),
  ...COMPARISONS.map((c) => r(`/rates/compare/${c.slug}`, 4, 2, c.title, 'banks')),
  // Silo 05 (95)
  r('/handover/dubai-off-plan-handover-mortgage-guide', 5, 2, 'Off-plan handover guide', 'handover'),
  ...DEVELOPERS.filter((d) => d.hub).map((d) => r(`/handover/${d.slug}`, 5, 3, d.name, 'handover')),
  ...PROJECTS.map((p) => r(`/handover/${p.dev}/${p.slug}`, 5, p.wave, p.name, 'handover')),
  // Silo 06 (60)
  ...COMMUNITIES.map((c) => r(`/areas/${c.emirate}/${c.slug}`, 6, 3, c.name, 'communities')),
  // Silo 07 (25)
  ...COUNTRIES.map((c) => r(`/mortgages/non-resident-${c.slug}`, 7, 2, `Non-resident: ${c.name}`, 'core')),
  // Silo 08 (15), 09 (8), 10 (10)
  ...AFFORD.map((a) => r(`/affordability/${a.slug}`, 8, 3, a.title, 'communities')),
  ...ADVISORY.map((a) => r(`/advisory/${a.slug}`, 9, 3, a.name, 'core')),
  ...GUIDES.map((g) => r(`/guides/${g.slug}`, 10, 1, g.title, 'core')),
  // Silo 11 (10) — app views, excluded from XML sitemaps
  ...['login', 'dashboard', 'vault', 'closing-pack', 'homeowner-radar'].map((s) => r(`/portal/${s}`, 11, 2, `Portal: ${s}`, 'core')),
  r('/partners', 11, 2, 'Partner Hub', 'core'), ...['register', 'dashboard', 'co-branded-tools', 'payouts'].map((s) => r(`/partners/${s}`, 11, 2, `Partners: ${s}`, 'core')),
  // Silo 12 (60)
  r('/ar', 12, 3, 'العربية', 'ar'),
  ...Object.keys(AR_PRODUCTS).map((s) => r(`/ar/mortgages/${s}`, 12, 3, s, 'ar')),
  ...AR_CALCS.map((s) => r(`/ar/calculators/${s}`, 12, 3, s, 'ar')),
  ...BANKS.map((b) => r(`/ar/rates/${b.slug}`, 12, 3, b.ar, 'ar')),
  ...AR_COMMUNITIES.map((s) => COMMUNITIES.find((c) => c.slug === s)!).map((c) => r(`/ar/areas/${c.emirate}/${c.slug}`, 12, 3, c.ar ?? c.name, 'ar')),
];

/** Navigational hub pages added on top of the 360 (not counted in the blueprint). */
export const HUBS = ['/mortgages', '/calculators', '/rates', '/handover', '/areas', '/areas/dubai', '/areas/abu-dhabi', '/areas/northern', '/affordability', '/advisory', '/guides', '/sitemap'];

export const indexable = (x: Route) => x.silo !== 11 && !x.path.endsWith('.txt');
