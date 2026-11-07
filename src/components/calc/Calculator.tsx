'use client';
import { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CALCS, type Row } from './registry';

type Lang = 'en' | 'ar';
const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

export function fmt(r: Row) {
  if (typeof r.v === 'string') return r.v;
  switch (r.f) {
    case 'pct': return `${r.v.toFixed(2)}%`;
    case 'mo': return `${aed(r.v)}/mo`;
    case 'yrs': return `${r.v.toFixed(1)} yrs`;
    case 'raw': return String(r.v);
    default: return aed(r.v);
  }
}

export default function Calculator({ slug, lang = 'en', compact = false, initial }: { slug: string; lang?: Lang; compact?: boolean; initial?: Record<string, number> }) {
  const def = CALCS[slug];
  const [v, setV] = useState<Record<string, number>>(() => ({ ...Object.fromEntries(def.inputs.map((i) => [i.k, i.def])), ...initial }));
  const out = useMemo(() => def.compute(v), [def, v]);
  const [copied, setCopied] = useState(false);
  const maxBar = out.bars ? Math.max(...out.bars.map((b) => Math.abs(b.v))) || 1 : 1;
  const inputs = compact ? def.inputs.slice(0, 4) : def.inputs;

  return (
    <div className="calc grid gap-6 lg:grid-cols-[1.1fr_1fr]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="space-y-5">
        {inputs.map((i) => (
          <div key={i.k}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <label htmlFor={`${slug}-${i.k}`} className="text-sm font-medium text-ink">{i.label[lang]}</label>
              {!i.options && (
                <span className="num text-sm font-semibold text-navy">
                  {i.unit === 'AED' ? aed(v[i.k]) : `${v[i.k]}${i.unit === '%' ? '%' : i.unit === 'yrs' ? (lang === 'ar' ? ' سنة' : ' yrs') : ''}`}
                </span>
              )}
            </div>
            {i.options ? (
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={i.label[lang]}>
                {i.options.map((o) => (
                  <button key={o.v} type="button" role="radio" aria-checked={v[i.k] === o.v}
                    onClick={() => setV((s) => ({ ...s, [i.k]: o.v }))}
                    className={`chip ${v[i.k] === o.v ? 'chip-on' : ''}`}>{o.label[lang]}</button>
                ))}
              </div>
            ) : (
              <input id={`${slug}-${i.k}`} type="range" min={i.min} max={i.max} step={i.step} value={v[i.k]}
                onChange={(e) => setV((s) => ({ ...s, [i.k]: Number(e.target.value) }))} className="range w-full" />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-card bg-navy p-6 text-white" aria-live="polite">
        <p className="text-sm text-white/70">{out.hero.label[lang]}</p>
        <p className="num mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{fmt(out.hero)}</p>
        <dl className="mt-5 divide-y divide-white/10 text-sm">
          {out.rows.map((r) => (
            <div key={r.label.en} className="flex items-baseline justify-between gap-4 py-2">
              <dt className={r.strong ? 'font-semibold' : 'text-white/75'}>{r.label[lang]}</dt>
              <dd className={`num text-end ${r.strong ? 'font-semibold text-mint' : ''}`}>{fmt(r)}</dd>
            </div>
          ))}
        </dl>
        {out.bars && (
          <div className="mt-4 space-y-1.5" aria-hidden="true">
            {out.bars.map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-xs">
                <span className="w-16 shrink-0 text-white/70">{b.label}</span>
                <span className={`h-2 rounded-full ${b.hl ? 'bg-mint' : 'bg-white/30'}`} style={{ width: `${(Math.abs(b.v) / maxBar) * 100}%` }} />
              </div>
            ))}
          </div>
        )}
        {out.note && <p className="mt-4 text-xs text-white/60">{out.note[lang]}</p>}
      </div>

      {out.text && (
        <div className="lg:col-span-2">
          <div className="relative rounded-card border border-line bg-white">
            <button type="button" className="btn btn-ghost absolute end-3 top-3 !px-3 !py-1.5 text-xs"
              onClick={() => { navigator.clipboard?.writeText(out.text!); setCopied(true); setTimeout(() => setCopied(false), 1800); }}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy clauses'}
            </button>
            <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap p-6 pt-14 font-mono text-[13px] leading-relaxed text-ink" dir="ltr">{out.text}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
