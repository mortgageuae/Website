import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPage from '@/components/ToolPage';
import { TOOLS, toolBy } from '@/data/tools';

export const dynamicParams = false;
export const generateStaticParams = () => TOOLS.filter((t) => t.base === 'calculators').map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = toolBy((await params).slug);
  return t ? { title: t.title, description: t.capsule.slice(0, 158), alternates: { canonical: `/calculators/${t.slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const t = toolBy((await params).slug);
  if (!t || t.base !== 'calculators') notFound();
  return <ToolPage t={t} />;
}
