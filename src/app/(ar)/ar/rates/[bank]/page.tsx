import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArHero, ArSection, ArFacts, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_UI, AR_TYPE } from '@/data/ar';
import { BANKS, revert } from '@/data/banks';

export const dynamicParams = false;
export const generateStaticParams = () => BANKS.map((b) => ({ bank: b.slug }));
const find = (s: string) => BANKS.find((b) => b.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ bank: string }> }): Promise<Metadata> {
  const b = find((await params).bank);
  return b ? { title: `أسعار التمويل العقاري لدى ${b.ar} 2026`, alternates: { canonical: `/ar/rates/${b.slug}`, languages: { 'en-AE': `/rates/${b.slug}` } } } : {};
}

export default async function Page({ params }: { params: Promise<{ bank: string }> }) {
  const b = find((await params).bank);
  if (!b) notFound();
  const kind = b.type === 'Islamic' ? 'معدل ربح' : 'سعر فائدة';
  return (
    <>
      <ArHero crumbs={[[AR_UI.rates, '/ar#rates'], [b.ar, `/ar/rates/${b.slug}`]]} eyebrow={`${AR_TYPE[b.type]} · ${b.name}`} title={`أسعار التمويل العقاري لدى ${b.ar} (نوفمبر 2026)`}
        capsule={`يقدم ${b.ar} ${kind} ثابتاً يبدأ من ${b.intro}% لمدة ${b.introTerm === '1Y' ? 'سنة' : 'سنتين'}، و${b.fixed3}% لثلاث سنوات، و${b.fixed5}% لخمس سنوات. بعد الفترة الثابتة يتحول إلى إيبور 3 أشهر مضافاً إليه ${b.margin.toFixed(2)}% (أي ${revert(b).toFixed(2)}% حالياً) بحد أدنى ${b.floor}%، مع سداد جزئي مجاني حتى ${b.overpay}% سنوياً.`} en={`/rates/${b.slug}`} />
      <ArSection title="ملخص الشروط">
        <ArFacts facts={[['السعر الثابت الأولي', `${b.intro}%`], ['ثابت 3 سنوات', `${b.fixed3}%`], ['ثابت 5 سنوات', `${b.fixed5}%`], ['هامش ما بعد الفترة الثابتة', `+${b.margin.toFixed(2)}%`], ['الحد الأدنى للسعر', `${b.floor}%`], ['رسوم الشراء', b.feePurchase], ['السداد المبكر المجاني', `${b.overpay}%`], ['احتساب حدود البطاقات', `${b.ccFactor}%`], ['تمويل غير المقيمين', b.nrLtv ? `${b.nrLtv}%` : '—']]} />
      </ArSection>
      <ArSection tone="mist" title="احسب القسط مع هذا البنك"><div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug="mortgage-calculator" lang="ar" initial={{ rate: b.fixed3 }} /></div></ArSection>
      <ArSection title="بنوك أخرى"><ArLinks links={BANKS.filter((x) => x.slug !== b.slug && x.type === b.type).slice(0, 4).map((x) => ({ title: x.ar, body: `من ${x.intro}%`, href: `/ar/rates/${x.slug}` }))} /></ArSection>
    </>
  );
}
