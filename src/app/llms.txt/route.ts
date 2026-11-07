import { text, llms } from '@/lib/feeds';
export const dynamic = 'force-static';
export const GET = () => text(llms(), 'text/markdown');
