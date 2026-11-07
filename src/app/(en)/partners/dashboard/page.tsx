import type { Metadata } from 'next';
import AppShell, { HUB_NAV } from '@/components/AppShell';
import { aed } from '@/components/ui';

export const metadata: Metadata = { title: 'Partner Dashboard' };

const ROWS = [['Buyer A.', 'Dubai Hills villa', 3_200_000, 'Valuation', 'Gold'], ['Buyer B.', 'JVC apartment', 950_000, 'Pre-approval', 'Gold'], ['Buyer C.', 'Marina Shores handover', 1_880_000, 'FOL issued', 'Gold'], ['Buyer D.', 'Business Bay buyout', 1_400_000, 'Disbursed', 'Gold']] as const;

export default function Page() {
  return (
    <AppShell title="Partner Hub" sub="hub.betterwaymortgages.com" nav={HUB_NAV} active="/partners/dashboard">
      <h1 className="mb-6 font-display text-2xl font-bold">Your pipeline</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[['Tier', 'Gold · 35%'], ['Closed (12 months)', '7'], ['Projected payouts', aed(ROWS.reduce((s, r) => s + r[2] * 0.008 * 0.35, 0))]].map(([k, v]) => <div key={k} className="card"><p className="text-sm text-slate">{k}</p><p className="num mt-1 text-2xl font-semibold text-navy">{v}</p></div>)}
      </div>
      <div className="overflow-x-auto rounded-card border border-line bg-white">
        <table className="table-bw min-w-[600px]"><thead><tr><th>Client</th><th>Property</th><th>Loan</th><th>Stage</th><th>Est. payout</th></tr></thead>
          <tbody className="num">{ROWS.map(([c, p, l, s]) => <tr key={c}><td className="font-sans">{c}</td><td className="font-sans">{p}</td><td>{aed(l)}</td><td className="font-sans"><span className="tag">{s}</span></td><td>{aed(l * 0.008 * 0.35)}</td></tr>)}</tbody>
        </table>
      </div>
    </AppShell>
  );
}
