import type { Metadata } from 'next';
import AppShell, { PORTAL_NAV } from '@/components/AppShell';
import { Countdown } from '@/components/AppClient';

export const metadata: Metadata = { title: 'Mortgage Tracker' };

const STAGES = ['Profile & vault', 'Dual-bank pre-approval', 'Valuation', 'Final Offer Letter', 'DLD transfer'];
const EVENTS = [
  ['EVT_01', 'Portal live', 'Pre-vetted loan AED 2.56M · 24-bank range 3.89%–4.49%', 'done'],
  ['EVT_02', 'Document alert', 'March bank statement missing—replied by WhatsApp PDF', 'done'],
  ['EVT_03', 'Submitted to primary & backup bank', 'Emirates NBD + HSBC, 48h SLA', 'done'],
  ['EVT_04', 'Pre-approval issued', 'Safe to sign Form F', 'done'],
  ['EVT_05', 'Valuation scheduled', 'Thursday 2:30 PM · ValuStrat', 'now'],
  ['EVT_06', 'Valuation report', 'Down-valuation shield on standby', 'next'],
  ['EVT_07', 'Final Offer Letter', 'Starts the 15-day seller liability letter clock', 'next'],
  ['EVT_08', '72-hour cheque pack', 'Exact payee split for seller, DLD and trustee', 'next'],
  ['EVT_09', 'Disbursal & e-title deed', 'Homeowner vault and 90-day pre-revert radar activate', 'next'],
];

export default function Page() {
  return (
    <AppShell title="Client portal" sub="portal.betterwaymortgages.com" nav={PORTAL_NAV} active="/portal/dashboard">
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="font-display text-2xl font-bold">Villa 14, Dubai Hills Estate</h1><span className="tag">Stage 3 of 5</span></div>
        <p className="num mt-1 text-sm text-slate">AED 3,200,000 · 80% LTV · Emirates NBD (primary) · HSBC (backup)</p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-5">
          {STAGES.map((s, i) => <li key={s} className={`rounded-xl border p-3 text-sm ${i < 2 ? 'border-teal bg-teal-50' : i === 2 ? 'border-teal' : 'border-line'}`}><span className="num text-xs text-teal">0{i + 1}</span><span className="mt-1 block font-medium text-navy">{s}</span></li>)}
        </ol>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Countdown label="Form F (MOU) expires in" days={17} />
        <Countdown label="FOL deadline under Special Condition 1" days={11} tone="warn" />
        <Countdown label="Seller liability letter (starts at FOL)" days={15} />
      </div>
      <div className="card mt-6">
        <h2 className="font-display text-lg font-semibold">Timeline</h2>
        <ol className="mt-4 space-y-4">
          {EVENTS.map(([id, t, d, s]) => (
            <li key={id} className="grid grid-cols-[1.25rem_1fr] gap-3">
              <span className={`mt-1.5 h-3 w-3 rounded-full ${s === 'done' ? 'bg-teal' : s === 'now' ? 'bg-teal ring-4 ring-teal/20' : 'bg-line'}`} />
              <div><p className="font-medium text-navy">{t} <span className="num text-xs text-slate">{id}</span></p><p className="text-sm text-slate">{d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </AppShell>
  );
}
