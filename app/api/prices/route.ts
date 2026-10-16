import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '../../lib/auth';
import { redis } from '../../lib/db';

export const dynamic = 'force-dynamic';
const KEY = 'prices';

export async function GET() {
  try {
    const data = await redis.get<Record<string, number>>(KEY);
    return NextResponse.json(data ?? {});
  } catch {
    return NextResponse.json({});
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const clean: Record<string, number> = {};
  for (const [k, v] of Object.entries(body ?? {})) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) clean[k] = Math.round(n);
  }
  await redis.set(KEY, clean);
  return NextResponse.json({ ok: true });
}