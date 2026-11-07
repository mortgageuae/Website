import type { Metadata } from 'next';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { DEVELOPERS, PROJECTS } from '@/data/handover';

export const metadata: Metadata = { title: 'Dubai Off-Plan Handover Mortgage Guide (2026)', description: 'How CBUAE’s 50% under-construction cap shifts to 80% LTV at handover, Oqood-to-title fees and valuation-uplift cash-out.', alternates: { canonical: '/handover/dubai-off-plan-handover-mortgage-guide' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Off-plan handover', href: '/handover' }, { name: 'Handover guide', href: '/handover/dubai-off-plan-handover-mortgage-guide' }]} eyebrow="Master guide" title="Dubai off-plan handover mortgage guide: from 50% to 80% LTV"
        capsule="Off-plan sales are 71.6% of Dubai transactions in 2026, and buyers on 60/40, 70/30 and 80/20 plans are reaching completion. CBUAE caps under-construction lending at 50% LTV, but within 60–90 days of handover banks treat the unit as ready property—up to 80% LTV for residents—if it is on their Approved Project List." />
      <Section title="The handover numbers">
        <Facts facts={[['Under-construction LTV', '50%'], ['Handover LTV (resident)', '80%'], ['Handover LTV (National)', '85%'], ['Non-resident', '60–65%'], ['DLD 4% at handover', 'Not payable'], ['Fees due', '0.25% + AED 290, AED 4,200, AED 580, AED 3,150']]} />
      </Section>
      <Section tone="mist" title="Five steps to completion">
        <ol className="grid gap-4 md:grid-cols-5">
          {['Check APL coverage for your tower', 'Dual-bank pre-approval 60–90 days out', 'Bank valuation on completion', 'Final Offer Letter & developer NOC', 'Pay developer, Oqood → title deed'].map((s, i) => <li key={s} className="card"><span className="num text-sm text-teal">0{i + 1}</span><p className="mt-2 font-medium text-navy">{s}</p></li>)}
        </ol>
      </Section>
      <Section title="Valuation-uplift cash-out" intro="Bought at AED 2.0M on 80/20, valued AED 2.8M at handover: 80% LTV is AED 2.24M—AED 400,000 to the developer, up to AED 1.84M released.">
        <div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug="handover-equity-release" /></div>
      </Section>
      <Section tone="mist" title="14 developer APL hubs"><LinkGrid cols={4} links={DEVELOPERS.filter((d) => d.hub).map((d) => ({ title: d.name, body: `${PROJECTS.filter((p) => p.dev === d.slug).length} projects`, href: `/handover/${d.slug}` }))} /></Section>
      <Section title="FAQ"><div className="max-w-3xl"><FaqList faqs={[
        { q: 'What is an Approved Project List (APL)?', a: 'Each bank’s list of developers and specific towers it will lend on. If your tower is not on a bank’s APL, that bank cannot finance it.' },
        { q: 'Can I get cash back at handover?', a: 'Yes, at banks lending on fresh handover valuation—subject to 80% LTV and the 50% DBR test.' },
        { q: 'What happens with a post-handover payment plan?', a: 'You can keep paying the developer or refinance the remaining balance with a mortgage once title is issued.' },
      ]} /></div></Section>
      <CtaBand />
    </>
  );
}
