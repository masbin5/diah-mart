'use client';

import { useEffect, useState } from 'react';
import { products } from '../data';

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [prices, setPrices] = useState<Record<number, string>>({});
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/login').then(r => r.json()).then(d => setAuthed(d.ok)).catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch('/api/prices').then(r => r.json()).then((saved: Record<string, number>) => {
      const m: Record<number, string> = {};
      products.forEach(p => { m[p.id] = String(saved[p.id] ?? p.price); });
      setPrices(m);
    });
  }, [authed]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const r = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (r.ok) { setPassword(''); setAuthed(true); } else setError('Password salah');
  };

  const logout = async () => {
    await fetch('/api/login', { method: 'DELETE' });
    setAuthed(false);
  };

  const save = async () => {
    setStatus('Menyimpan...');
    const r = await fetch('/api/prices', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prices),
    });
    setStatus(r.ok ? '✅ Tersimpan! Harga di website sudah berubah.' : '❌ Gagal menyimpan. Coba login ulang.');
  };

  const box: React.CSSProperties = { maxWidth: 720, margin: '0 auto', padding: 20, fontFamily: 'system-ui, sans-serif' };
  const input: React.CSSProperties = { padding: '10px 12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 };
  const btn: React.CSSProperties = { padding: '10px 18px', border: 0, borderRadius: 8, background: '#0b5d3b', color: '#fff', fontSize: 16, cursor: 'pointer' };

  if (authed === null) return <div style={box}>Memuat...</div>;

  if (!authed) {
    return (
      <div style={{ ...box, maxWidth: 380, marginTop: 80 }}>
        <h1>Admin DIAH MART</h1>
        <form onSubmit={login} style={{ display: 'grid', gap: 12 }}>
          <input style={input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
          {error && <span style={{ color: 'crimson' }}>{error}</span>}
          <button style={btn} type="submit">Masuk</button>
          <a href="/">← Kembali ke toko</a>
        </form>
      </div>
    );
  }

  const list = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={box}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0 }}>Edit Harga</h1>
        <span style={{ display: 'flex', gap: 12 }}>
          <a href="/">Lihat toko</a>
          <button onClick={logout} style={{ ...btn, background: '#666', padding: '6px 12px' }}>Keluar</button>
        </span>
      </div>
      <input style={{ ...input, width: '100%', boxSizing: 'border-box', margin: '16px 0' }} placeholder="Cari produk..." value={q} onChange={e => setQ(e.target.value)} />
      <div style={{ display: 'grid', gap: 8 }}>
        {list.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <span style={{ flex: 1 }}>{p.emoji} {p.name} <small style={{ color: '#888' }}>/ {p.unit}</small></span>
            <span>Rp</span>
            <input
              style={{ ...input, width: 120 }}
              inputMode="numeric"
              value={prices[p.id] ?? ''}
              onChange={e => setPrices(s => ({ ...s, [p.id]: e.target.value.replace(/\D/g, '') }))}
            />
          </div>
        ))}
      </div>
      <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={btn} onClick={save}>Simpan semua harga</button>
        <span>{status}</span>
      </div>
    </div>
  );
}