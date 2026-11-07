import type { Metadata } from 'next';
import Link from 'next/link';
import { ArHero, ArSection, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_PRODUCTS, AR_UI } from '@/data/ar';
import { PRODUCTS } from '@/data/products';
import { TOOLS, AR_CALCS } from '@/data/tools';
import { BANKS } from '@/data/banks';
import { COMMUNITIES, AR_COMMUNITIES } from '@/data/communities';

export const metadata: Metadata = { title: 'قارن 24 بنكاً بطلب واحد — أسعار ثابتة تبدأ من 3.75%', alternates: { canonical: '/ar', languages: { 'en-AE': '/' } } };

export default function Page() {
  return (
    <>
      <ArHero crumbs={[]} eyebrow="استشارات تمويل عقاري مسجلة · دون رسوم على العميل" title="قارن 24 بنكاً إماراتياً بطلب واحد، بأسعار ثابتة تبدأ من 3.75%*"
        capsule="سواء كنت تشتري مسكنك الأول في دبي، أو تموّل تسليم عقار على الخارطة، أو تنقل تمويلك لخفض القسط، يقارن فريق الاكتتاب براتب ثابت في النصر بلازا جميع العروض جنباً إلى جنب، دون أي رسوم وساطة عليك." en="/" />
      <ArSection id="mortgages" title={AR_UI.mortgages}>
        <ArLinks links={Object.keys(AR_PRODUCTS).map((s) => ({ title: PRODUCTS.find((p) => p.slug === s)!.ar, body: AR_PRODUCTS[s].points[0], href: `/ar/mortgages/${s}` }))} />
      </ArSection>
      <ArSection id="calculators" tone="mist" title="حاسبة التمويل والتكاليف المقدمة">
        <div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug="mortgage-calculator" lang="ar" /></div>
        <div className="mt-8"><ArLinks links={AR_CALCS.map((s) => ({ title: TOOLS.find((t) => t.slug === s)!.ar, href: `/ar/calculators/${s}` }))} /></div>
      </ArSection>
      <ArSection id="rates" title="أسعار التمويل لدى 24 بنكاً">
        <ArLinks links={BANKS.map((b) => ({ title: b.ar, body: `من ${b.intro}% · إيبور + ${b.margin.toFixed(2)}%`, href: `/ar/rates/${b.slug}` }))} />
      </ArSection>
      <ArSection id="areas" tone="mist" title="أبرز مجتمعات الفلل ومشاريع التسليم">
        <ArLinks links={AR_COMMUNITIES.map((s) => COMMUNITIES.find((c) => c.slug === s)!).map((c) => ({ title: c.ar ?? c.name, body: `${c.yieldPct}% عائد إجمالي`, href: `/ar/areas/${c.emirate}/${c.slug}` }))} />
      </ArSection>
      <section className="py-10"><div className="wrap text-sm text-slate">{AR_UI.disclosure} <Link href="/privacy-and-cbuae-disclosure" className="text-teal underline">الإفصاح الكامل</Link></div></section>
    </>
  );
}
