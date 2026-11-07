import { text, llmsFull } from '@/lib/feeds';
export const dynamic = 'force-static';
export const GET = () => text(llmsFull(), 'text/markdown');
