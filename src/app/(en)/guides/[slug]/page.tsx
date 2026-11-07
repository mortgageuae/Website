import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, FaqList, CtaBand, LinkGrid, JsonLd } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { GUIDES } from '@/data/content';
import { toolBy } from '@/data/tools';
import { SITE } from '@/data/site';

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));
const find = (s: string) => GUIDES.find((g) => g.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = find((await params).slug);
  return g ? { title: g.title, description: g.capsule.slice(0, 158), alternates: { canonical: `/guides/${g.slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const g = find((await params).slug);
  if (!g) notFound();
  const tool = g.tool ? toolBy(g.tool) : undefined;
  return (
    <>
      <PageHero crumbs={[{ name: 'Guides', href: '/guides' }, { name: g.title, href: `/guides/${g.slug}` }]} eyebrow="Underwriting playbook" title={g.title} capsule={g.capsule} />
      <Section title="The playbook">
        <ol className="max-w-3xl space-y-8">
          {g.steps.map((s, i) => (
            <li key={s.h} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="num flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 font-semibold text-teal">{i + 1}</span>
              <div><h3 className="h3">{s.h}</h3><p className="mt-2 leading-relaxed text-slate">{s.p}</p></div>
            </li>
          ))}
        </ol>
      </Section>
      {tool && <Section tone="mist" title={tool.name} intro={tool.capsule}><div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug={tool.slug} /></div><Link href={`/${tool.base}/${tool.slug}`} className="btn btn-ghost mt-6">Open full tool</Link></Section>}
      <Section title="FAQ"><div className="max-w-3xl"><FaqList faqs={g.faqs} /></div></Section>
      <Section tone="mist" title="More playbooks"><LinkGrid links={GUIDES.filter((x) => x.slug !== g.slug).slice(0, 6).map((x) => ({ title: x.title, href: `/guides/${x.slug}` }))} /></Section>
      <CtaBand />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.capsule, dateModified: SITE.asOfISO, author: { '@id': `${SITE.url}/#org` }, publisher: { '@id': `${SITE.url}/#org` }, mainEntityOfPage: `${SITE.url}/guides/${g.slug}` }} />
    </>
  );
}
