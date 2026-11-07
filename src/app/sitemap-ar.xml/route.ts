import { urlset, mapPaths } from '@/lib/feeds';
export const dynamic = 'force-static';
export const GET = () => urlset(mapPaths('ar'));
