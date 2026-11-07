import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { ADVISORY } from '@/data/content';

export const metadata: Metadata = { title: '360° Private Client, Wills & Commercial Desk', description: 'Commercial finance, SME lending, conveyancing, DIFC wills, external life insurance, wholesale FX, remote PoA and valuation appeals.', alternates: { canonical: '/advisory' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Advisory', href: '/advisory' }]} eyebrow="Advisory" title="Everything around the mortgage, handled by one desk"
        capsule="Beyond the loan, Betterway’s advisory desk covers commercial property finance up to AED 600M, SME lending, RERA conveyancing, DIFC wills, external life insurance, wholesale FX, remote Power of Attorney closings and valuation appeals—so one team carries the file from Form F to title deed." />
      <Section title="Eight advisory services"><LinkGrid cols={4} links={ADVISORY.map((a) => ({ title: a.name, body: a.capsule.split('. ')[0] + '.', href: `/advisory/${a.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
