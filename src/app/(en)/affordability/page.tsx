import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { AFFORD } from '@/data/content';

export const metadata: Metadata = { title: 'How Much Mortgage Can I Afford in Dubai?', description: 'Mortgage affordability by monthly salary and by property price, under CBUAE 50% DBR and LTV rules.', alternates: { canonical: '/affordability' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Affordability', href: '/affordability' }]} eyebrow="Affordability" title="How much can you borrow—and how much cash do you need?"
        capsule="UAE mortgage affordability is set by two CBUAE rules: total debt repayments cannot exceed 50% of gross income, and loan-to-value is capped at 80% for expat first homes up to AED 5M. These pages work both directions—from your salary to a price, and from a price to the cash needed." />
      <Section title="By monthly salary"><LinkGrid cols={4} links={AFFORD.filter((a) => a.kind === 'salary').map((a) => ({ title: `AED ${a.amount.toLocaleString('en-US')}${a.plus ? '+' : ''} / month`, href: `/affordability/${a.slug}` }))} /></Section>
      <Section tone="mist" title="By property price"><LinkGrid cols={4} links={AFFORD.filter((a) => a.kind === 'price').map((a) => ({ title: `AED ${(a.amount / 1e6).toLocaleString('en-US')}M${a.plus ? '+' : ''}`, body: a.title, href: `/affordability/${a.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
