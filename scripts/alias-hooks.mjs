// Node test resolver: maps '@/x' to src/x.ts(x) and resolves extension-less relative TS imports.
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
const src = path.resolve(fileURLToPath(import.meta.url), '../../src');
const tryExt = (p) => ['', '.ts', '.tsx', '/index.ts'].map((e) => p + e).find((f) => existsSync(f) && !f.endsWith('/'));
export async function resolve(spec, ctx, next) {
  if (spec.startsWith('@/')) return next(pathToFileURL(tryExt(path.join(src, spec.slice(2)))).href, ctx);
  if (spec.startsWith('.') && ctx.parentURL?.startsWith('file:')) {
    const f = tryExt(path.resolve(path.dirname(fileURLToPath(ctx.parentURL)), spec));
    if (f) return next(pathToFileURL(f).href, ctx);
  }
  return next(spec, ctx);
}
