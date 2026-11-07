import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { PageHero, Section, FaqList, CtaBand, LinkGrid } from '@/components/ui';
import { LeadForm } from '@/components/client';
import { ADVISORY } from '@/data/content';

export const dynamicParams = false;
export const generateStaticParams = () => ADVISORY.map((a) => ({ slug: a.slug }));
const find = (s: string) => ADVISORY.find((a) => a.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = find((await params).slug);
  return a ? { title: a.title, description: a.capsule.slice(0, 158), alternates: { canonical: `/advisory/${a.slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = find((await params).slug);
  if (!a) notFound();
  return (
    <>
      <PageHero crumbs={[{ name: 'Advisory', href: '/advisory' }, { name: a.name, href: `/advisory/${a.slug}` }]} eyebrow="360° advisory desk" title={a.title} capsule={a.capsule} />
      <Section title="What the desk handles">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <ul className="space-y-3">{a.points.map((p) => <li key={p} className="flex gap-3 text-[17px] text-ink"><Check className="mt-1 shrink-0 text-teal" size={18} />{p}</li>)}</ul>
          <LeadForm topic={a.name} />
        </div>
      </Section>
      <Section tone="mist" title="FAQ"><div className="max-w-3xl"><FaqList faqs={a.faqs} /></div></Section>
      <Section title="Other advisory services"><LinkGrid cols={4} links={ADVISORY.filter((x) => x.slug !== a.slug).map((x) => ({ title: x.name, href: `/advisory/${x.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
