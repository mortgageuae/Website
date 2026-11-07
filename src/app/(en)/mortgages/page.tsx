import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { PRODUCTS } from '@/data/products';
import { COUNTRIES } from '@/data/countries';

export const metadata: Metadata = { title: 'UAE Mortgage Products & Buyer Profiles', description: 'All 14 Betterway mortgage products and 25 non-resident country guides.', alternates: { canonical: '/mortgages' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Mortgages', href: '/mortgages' }]} eyebrow="Mortgages" title="Every UAE mortgage, for every kind of buyer"
        capsule="Betterway arranges residential, Islamic, off-plan, buyout, equity-release, non-resident, Golden Visa, construction and mega-loan finance across 24 UAE lenders. Each product page sets out CBUAE LTV caps, the documents banks ask for and a live calculator." />
      <Section title="14 mortgage products"><LinkGrid links={PRODUCTS.map((p) => ({ title: p.name, body: p.card, href: `/mortgages/${p.slug}`, tag: p.badge }))} /></Section>
      <Section tone="mist" title="Non-resident guides by country"><LinkGrid cols={4} links={COUNTRIES.map((c) => ({ title: c.name, body: `${c.ltv} LTV · ${c.fx}`, href: `/mortgages/non-resident-${c.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
