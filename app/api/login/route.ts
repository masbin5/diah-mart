import { NextRequest, NextResponse } from 'next/server';
import { isAdmin, makeToken, passwordOk } from '../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return NextResponse.json({ ok: isAdmin(req) });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (!passwordOk(String(body?.password ?? ''))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin', makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin', '', { path: '/', maxAge: 0 });
  return res;
}