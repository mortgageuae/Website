'use client';
import { useEffect, useState } from 'react';
import { Check, AlertTriangle, Copy } from 'lucide-react';

/** Days/hours countdown to a date `days` from first render (sample deadline). */
export function Countdown({ label, days, tone = 'teal' }: { label: string; days: number; tone?: 'teal' | 'warn' }) {
  const [now, setNow] = useState<number | null>(null);
  const [end] = useState(() => Date.now() + days * 864e5);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 60_000); return () => clearInterval(t); }, []);
  const ms = Math.max(0, end - (now ?? end - days * 864e5));
  const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5);
  return (
    <div className="card">
      <p className="text-sm text-slate">{label}</p>
      <p className={`num mt-1 text-3xl font-semibold ${tone === 'warn' ? 'text-warn' : 'text-navy'}`}>{d}d {String(h).padStart(2, '0')}h</p>
    </div>
  );
}

const VAULT: Record<string, [string, string, string, boolean][]> = {
  'Salaried resident': [
    ['Passport & Emirates ID', 'Auto-pulled via UAE PASS', 'MRZ expiry > 180 days, matches EID', true],
    ['Salary certificate', 'Dated within 30 days', 'Date < 30 days', true],
    ['6 months payslips', 'Consecutive months', 'Flags any missing month', true],
    ['6 months bank statements', 'PDF from bank', 'Parses 6 salary credits; flags undeclared EMIs', false],
    ['AECB consent', 'Digital via UAE PASS', 'Extracts total card limits for 5% vs 3% DBR', true],
  ],
  'Self-employed resident': [
    ['Passport & Emirates ID', 'Auto-pulled via UAE PASS', 'MRZ expiry > 180 days', true],
    ['Trade licence (≥ 2 yrs)', 'Plus MOA / share certificate', 'Licence age and shareholding', true],
    ['2 years audited financials', 'Signed by auditor', 'Net profit + add-backs', false],
    ['6m personal + 12m corporate statements', 'PDF', 'Turnover consistency; bounced cheques', false],
    ['Personal + company AECB', 'Digital consent', 'Card limits and company facilities', true],
  ],
  'Non-resident': [
    ['Passport', 'Valid > 6 months', 'MRZ expiry check', true],
    ['6 months payslips + tax return', 'P60/SA302, W-2/1040, ITR, NOA…', 'Matches country template', false],
    ['6 months international statements', 'Showing IBAN / SWIFT', 'Salary credits and FX', true],
    ['Home-country credit report', 'Experian, Equifax, CIBIL, SCHUFA…', 'Extracts limits for DBR', false],
  ],
};

export function VaultMatrix() {
  const [p, setP] = useState('Salaried resident');
  const rows = VAULT[p];
  const done = rows.filter((r) => r[3]).length;
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">{Object.keys(VAULT).map((k) => <button key={k} type="button" className={`chip ${p === k ? 'chip-on' : ''}`} onClick={() => setP(k)}>{k}</button>)}</div>
      <p className="mb-3 text-sm text-slate"><b className="num text-navy">{done}/{rows.length}</b> verified · forward missing files to the WhatsApp desk and they slot in automatically.</p>
      <div className="divide-y divide-line rounded-card border border-line bg-white">
        {rows.map(([doc, spec, rule, ok]) => (
          <div key={doc} className="grid gap-2 p-4 sm:grid-cols-[1.2fr_1fr_1.4fr_auto] sm:items-center">
            <p className="font-medium text-navy">{doc}</p><p className="text-sm text-slate">{spec}</p><p className="text-sm text-slate">{rule}</p>
            <span className={`tag ${ok ? '' : '!bg-amber-50 !text-warn'}`}>{ok ? <><Check size={13} className="me-1" />Verified</> : <><AlertTriangle size={13} className="me-1" />Needed</>}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CoBrandLink() {
  const [name, setName] = useState('Karim');
  const [brn, setBrn] = useState('48219');
  const [copied, setCopied] = useState(false);
  const url = `https://betterwaymortgages.com/calculators/mortgage-calculator?agent=${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}-brn${encodeURIComponent(brn)}`;
  const field = 'mt-1.5 w-full rounded-btn border border-line bg-white px-3.5 py-3 text-[15px] outline-none focus:border-teal';
  return (
    <div className="card grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-navy">Agent name<input className={field} value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label className="text-sm font-medium text-navy">RERA BRN<input className={field} inputMode="numeric" value={brn} onChange={(e) => setBrn(e.target.value.replace(/\D/g, ''))} /></label>
      </div>
      <div className="flex items-center gap-2 rounded-btn bg-mist p-3"><code className="min-w-0 flex-1 truncate text-sm text-navy">{url}</code>
        <button type="button" className="btn btn-dark !py-2" onClick={() => { navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <Check size={15} /> : <Copy size={15} />} Copy</button>
      </div>
      <p className="text-xs text-slate">Buyers who open this link are attributed to you for 180 days.</p>
    </div>
  );
}
