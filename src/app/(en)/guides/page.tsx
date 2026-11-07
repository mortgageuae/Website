import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { GUIDES } from '@/data/content';

export const metadata: Metadata = { title: 'UAE Mortgage Regulatory & Underwriting Playbooks', description: 'Form F clauses, credit-card DBR, liability letters, clawbacks, income assessment, AECB scores, joint mortgages and transfer day.', alternates: { canonical: '/guides' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Guides', href: '/guides' }]} eyebrow="Guides" title="Underwriting playbooks for UAE buyers"
        capsule="Ten deep playbooks on the rules that decide UAE mortgage outcomes: Form F protection clauses, credit-card limits and DBR, seller liability letters, buyout clawbacks, how bonuses and rent are assessed, AECB scores, joint borrowers, post-handover buyouts, Golden Visa NOCs and transfer day." />
      <Section title="10 playbooks"><LinkGrid links={GUIDES.map((g) => ({ title: g.title, body: g.capsule.split('. ')[0] + '.', href: `/guides/${g.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
