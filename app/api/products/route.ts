import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '../../lib/auth';
import { redis } from '../../lib/db';

export const dynamic = 'force-dynamic';

type Override = { name?: string; price?: number; stock?: number | null };

export async function GET() {
  try {
    const [ov, legacy] = await Promise.all([
      redis.get<Record<string, Override>>('overrides'),
      redis.get<Record<string, number>>('prices'),
    ]);
    const out: Record<string, Override> = { ...(ov ?? {}) };
    // harga lama dari versi sebelumnya tetap dipakai kalau belum ada data baru
    for (const [id, price] of Object.entries(legacy ?? {})) {
      out[id] = { price, ...(out[id] ?? {}) };
    }
    return NextResponse.json(out);
  } catch {
    return NextResponse.json({});
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const clean: Record<string, Override> = {};
  for (const [id, v] of Object.entries(body ?? {})) {
    const o = v as Override;
    const item: Override = {};
    if (typeof o.name === 'string' && o.name.trim()) item.name = o.name.trim().slice(0, 120);
    const price = Number(o.price);
    if (Number.isFinite(price) && price >= 0) item.price = Math.round(price);
    if (o.stock === null || o.stock === undefined) item.stock = null;
    else {
      const s = Number(o.stock);
      item.stock = Number.isFinite(s) && s >= 0 ? Math.floor(s) : null;
    }
    clean[id] = item;
  }
  await redis.set('overrides', clean);
  return NextResponse.json({ ok: true });
}