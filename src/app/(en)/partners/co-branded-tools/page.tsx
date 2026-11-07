import type { Metadata } from 'next';
import AppShell, { HUB_NAV } from '@/components/AppShell';
import { CoBrandLink } from '@/components/AppClient';

export const metadata: Metadata = { title: 'Co-Branded Tools' };

export default function Page() {
  return (
    <AppShell title="Partner Hub" sub="hub.betterwaymortgages.com" nav={HUB_NAV} active="/partners/co-branded-tools">
      <h1 className="mb-2 font-display text-2xl font-bold">Co-branded buyer calculator</h1>
      <p className="mb-6 max-w-2xl text-slate">Share a calculator link carrying your name and RERA BRN. Every enquiry from it is attributed to you.</p>
      <CoBrandLink />
    </AppShell>
  );
}
