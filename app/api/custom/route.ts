import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '../../lib/auth';
import { redis } from '../../lib/db';

export const dynamic = 'force-dynamic';

const CATS = ['Frozen Food', 'Sembako', 'Kebutuhan Dapur', 'Rumah Tangga'];
const COLORS: Record<string, string> = {
  'Frozen Food': 'peach',
  'Sembako': 'yellow',
  'Kebutuhan Dapur': 'pink',
  'Rumah Tangga': 'blue',
};

export async function GET() {
  try {
    const data = await redis.get<unknown[]>('custom');
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const body = await req.json().catch(() => []);
  const list = Array.isArray(body) ? body : [];
  const clean = list
    .map((o: Record<string, unknown>) => {
      const category = CATS.includes(String(o.category)) ? String(o.category) : 'Sembako';
      const price = Number(o.price);
      const stock = o.stock === null || o.stock === undefined || o.stock === '' ? null : Number(o.stock);
      return {
        id: Math.floor(Number(o.id)),
        name: String(o.name ?? '').trim().slice(0, 120),
        category,
        price: Number.isFinite(price) && price >= 0 ? Math.round(price) : 0,
        unit: String(o.unit ?? 'pcs').trim().slice(0, 20) || 'pcs',
        emoji: String(o.emoji ?? '🛒').slice(0, 8) || '🛒',
        color: COLORS[category],
        stock: stock !== null && Number.isFinite(stock) && stock >= 0 ? Math.floor(stock) : null,
      };
    })
    .filter(p => p.name && Number.isFinite(p.id) && p.id > 1000);
  await redis.set('custom', clean);
  return NextResponse.json({ ok: true });
}