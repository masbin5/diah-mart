import { createHmac, timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

const secret = () => process.env.ADMIN_SECRET ?? '';

export const makeToken = () =>
  createHmac('sha256', secret()).update('diahmart-admin').digest('hex');

export function isAdmin(req: NextRequest) {
  const t = req.cookies.get('admin')?.value;
  if (!t || !secret()) return false;
  const a = Buffer.from(t);
  const b = Buffer.from(makeToken());
  return a.length === b.length && timingSafeEqual(a, b);
}

export function passwordOk(input: string) {
  const real = process.env.ADMIN_PASSWORD ?? '';
  const a = Buffer.from(input);
  const b = Buffer.from(real);
  return real.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}