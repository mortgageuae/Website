import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { COMPARISONS } from '@/data/compare';

export const metadata: Metadata = { title: 'UAE Mortgage Rates by Bank — November 2026', description: 'Rates, EIBOR revert margins and floors for 24 UAE banks plus 15 head-to-head comparisons.', alternates: { canonical: '/rates' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Rates', href: '/rates' }]} eyebrow="Rates" title="UAE mortgage rates, revert margins and floors by bank"
        capsule="Betterway tracks 24 UAE mortgage lenders: introductory 1- and 2-year fixed rates from 3.75%, 3- and 5-year fixed rates, the 3-month EIBOR revert margin (+1.00% to +1.99%), minimum floor rates, overpayment allowances and non-resident LTV. Start with the rate bible or compare two banks head to head." />
      <Section title="Benchmarks"><LinkGrid cols={2} links={[{ title: '24-Bank Rate & Revert Bible', body: 'The full table with five-year cost ranking.', href: '/rates/uae-mortgage-rates-eibor-revert-bible', tag: 'Master table' }, { title: 'EIBOR Live Tracker', body: '1M, 3M and 6M EIBOR with revert-rate impact.', href: '/rates/eibor-live-tracker', tag: '3M 4.45%' }]} /></Section>
      <Section tone="mist" title="24 bank rate pages"><LinkGrid cols={4} links={BANKS.map((b) => ({ title: b.name, body: `From ${b.intro}% · EIBOR + ${b.margin.toFixed(2)}%`, href: `/rates/${b.slug}` }))} /></Section>
      <Section id="compare" title="15 head-to-head comparisons"><LinkGrid links={COMPARISONS.map((c) => ({ title: c.title, href: `/rates/compare/${c.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
