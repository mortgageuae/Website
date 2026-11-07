import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArHero, ArSection, ArFacts, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_UI, AR_STOCK } from '@/data/ar';
import { COMMUNITIES, AR_COMMUNITIES, EMIRATES, communityBy } from '@/data/communities';
import { coverage } from '@/lib/derive';

export const dynamicParams = false;
export const generateStaticParams = () => AR_COMMUNITIES.map((s) => COMMUNITIES.find((c) => c.slug === s)!).map((c) => ({ emirate: c.emirate, community: c.slug }));
const n = (x: number) => Math.round(x).toLocaleString('en-US');

export async function generateMetadata({ params }: { params: Promise<{ emirate: string; community: string }> }): Promise<Metadata> {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  return c ? { title: `التمويل العقاري في ${c.ar ?? c.name}: الأسعار والعوائد`, alternates: { canonical: `/ar/areas/${emirate}/${community}`, languages: { 'en-AE': `/areas/${emirate}/${community}` } } } : {};
}

export default async function Page({ params }: { params: Promise<{ emirate: string; community: string }> }) {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  if (!c || !AR_COMMUNITIES.includes(c.slug)) notFound();
  const k = coverage(c);
  const name = c.ar ?? c.name;
  return (
    <>
      <ArHero crumbs={[[AR_UI.areas, '/ar#areas'], [name, `/ar/areas/${emirate}/${community}`]]} eyebrow={`${EMIRATES[c.emirate].ar} · ${AR_STOCK[c.stock]}`} title={`الشراء بالتمويل العقاري في ${name}: الأسعار والعوائد وتغطية القسط`}
        capsule={`يبلغ متوسط السعر في ${name} نحو ${n(c.psf)} درهم للقدم المربعة بعائد إيجاري إجمالي يقارب ${c.yieldPct}%. ويبلغ القسط الشهري لوحدة نموذجية بقيمة ${c.typical} مليون درهم نحو ${n(k.res)} درهم بتمويل 80% وسعر 3.99%، مقابل إيجار شهري يقارب ${n(k.rentMo)} درهم.`} en={`/areas/${emirate}/${community}`} />
      <ArSection title="لمحة عن السوق">
        <ArFacts facts={[['السعر للقدم المربعة', `AED ${n(c.psf)}`], ['العائد الإجمالي', `${c.yieldPct}%`], ['قيمة الوحدة النموذجية', `AED ${c.typical}M`], ['الإيجار السنوي', `AED ${n(c.rent)}`], ['القسط بتمويل 80%', `AED ${n(k.res)}`], ['النقد المطلوب (20%)', `AED ${n(k.cash)}`]]} />
        <p className="mt-3 text-xs text-slate">أرقام استرشادية تُحدَّث شهرياً.</p>
      </ArSection>
      <ArSection tone="mist" title="الإيجار مقابل الشراء"><div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug="rent-vs-buy-dubai" lang="ar" initial={{ price: Math.min(30_000_000, k.price), rent: Math.min(1_000_000, Math.round(c.rent / 5000) * 5000) }} /></div></ArSection>
      <ArSection title="مجتمعات أخرى"><ArLinks links={AR_COMMUNITIES.filter((s) => s !== c.slug).slice(0, 8).map((s) => COMMUNITIES.find((x) => x.slug === s)!).map((x) => ({ title: x.ar ?? x.name, body: `${x.yieldPct}%`, href: `/ar/areas/${x.emirate}/${x.slug}` }))} /></ArSection>
    </>
  );
}
