import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { SITE } from '@/data/site';

export const metadata: Metadata = { title: 'Client Portal Login' };

export default function Page() {
  return (
    <section className="grid-bg bg-mist py-20">
      <div className="wrap max-w-md">
        <div className="card !p-8 text-center">
          <img src="/brand/symbol-teal.svg" alt="" width={56} height={56} className="mx-auto h-14 w-14" />
          <h1 className="mt-5 font-display text-2xl font-bold">Sign in to your mortgage</h1>
          <p className="mt-2 text-sm text-slate">Track every stage, upload documents and see every deadline.</p>
          <Link href="/portal/dashboard" className="btn btn-dark mt-8 w-full"><ShieldCheck size={17} /> Sign in with UAE PASS</Link>
          <Link href="/portal/dashboard" className="btn btn-ghost mt-3 w-full"><MessageCircle size={17} /> Non-resident? WhatsApp OTP link</Link>
          <p className="mt-6 text-xs text-slate">Live accounts: {SITE.portalUrl.replace('https://', '')} · Preview opens with sample data.</p>
        </div>
      </div>
    </section>
  );
}
