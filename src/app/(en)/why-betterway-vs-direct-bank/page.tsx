import type { Metadata } from 'next';
import { PageHero, Section, CtaBand, FaqList, aed } from '@/components/ui';
import { fixedThenRevert } from '@/lib/math';
import { bankBy } from '@/data/banks';

export const metadata: Metadata = { title: 'Betterway vs Going Direct to a UAE Bank', description: 'Side-by-side underwriting and revert-margin comparison: a salaried 24-bank desk versus applying directly to one UAE bank.', alternates: { canonical: '/why-betterway-vs-direct-bank' } };

export default function Page() {
  const dib = bankBy('dib')!, sib = bankBy('sib')!;
  const a = fixedThenRevert(1_500_000, 25, dib.intro, 1, 4.45, dib.margin, dib.floor, 5);
  const b = fixedThenRevert(1_500_000, 25, sib.intro, 1, 4.45, sib.margin, sib.floor, 5);
  return (
    <>
      <PageHero crumbs={[{ name: 'Betterway vs going direct', href: '/why-betterway-vs-direct-bank' }]} eyebrow="Compare" title="Betterway salaried desk vs going direct to a UAE bank"
        capsule="Going direct gets you one bank’s product and one valuer panel. A salaried 24-bank desk compares every lender’s intro rate, revert margin and floor, files a backup application in parallel and costs the client nothing—banks pay the same rate either way and remunerate the desk on disbursal." />
      <Section title="Same loan, different five-year cost">
        <p className="lead max-w-3xl">On AED 1.5M over 25 years, the lowest headline rate is not the cheapest loan. Over five years:</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[[sib, b], [dib, a]].map(([bk, r]) => {
            const B = bk as typeof dib, R = r as typeof a;
            return (
              <div key={B.key} className="card">
                <p className="font-display text-lg font-semibold text-navy">{B.name}</p>
                <p className="mt-1 text-sm text-slate">Intro {B.intro}% ({B.introTerm}) → EIBOR + {B.margin.toFixed(2)}%, floor {B.floor}%</p>
                <p className="num mt-5 text-3xl font-semibold text-navy">{aed(R.cost)}</p>
                <p className="text-sm text-slate">interest paid in 5 years</p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section tone="mist" title="What changes when you use a desk">
        <div className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="table-bw min-w-[640px]">
            <thead><tr><th>Stage</th><th>Betterway</th><th>Direct to one bank</th></tr></thead>
            <tbody>
              {[['Affordability', 'Run at 3% and 5% card-limit banks', 'One bank’s policy'], ['Pre-approval', 'Primary + backup bank, 48h', 'Single application'], ['Valuation', 'Different valuer panels; appeal desk', 'One valuer'], ['Offer letter', 'Revert margin, floor and clawback checked', 'Read by you alone'], ['Life insurance', 'External assignment where it saves', 'Bank policy'], ['Transfer', 'Cheque split & trustee booking handled', 'Coordinated by you']].map(([s, x, y]) => <tr key={s}><th scope="row" className="font-medium text-navy">{s}</th><td className="text-teal">{x}</td><td className="text-slate">{y}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="FAQ"><div className="max-w-3xl"><FaqList faqs={[{ q: 'Is the bank rate higher through a broker?', a: 'No. Banks price the same product identically; panel volume can unlock exceptions.' }, { q: 'When should I go direct?', a: 'If you already hold a private-banking relationship with preferential pricing, we will tell you—and still check revert and floor terms.' }]} /></div></Section>
      <CtaBand />
    </>
  );
}
