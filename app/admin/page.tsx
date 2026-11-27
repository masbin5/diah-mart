'use client';

import { useEffect, useState } from 'react';
import { categories, products } from '../data';

type Row = { name: string; price: string; stock: string };
type Saved = Record<string, { name?: string; price?: number; stock?: number | null }>;
type NewItem = { id: number; name: string; category: string; price: string; unit: string; emoji: string; stock: string };
type CustomApi = { id: number; name: string; category: string; price: number; unit: string; emoji: string; stock: number | null };

const CATS = categories.filter(c => c.name !== 'Semua').map(c => c.name);

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [rows, setRows] = useState<Record<number, Row>>({});
  const [custom, setCustom] = useState<NewItem[]>([]);
  const [draft, setDraft] = useState({ name: '', category: CATS[0], price: '', unit: 'pack', emoji: '🛒', stock: '' });
  const [draftMsg, setDraftMsg] = useState('');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Semua');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/login').then(r => r.json()).then(d => setAuthed(d.ok)).catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch('/api/products').then(r => r.json()).then((saved: Saved) => {
      const m: Record<number, Row> = {};
      products.forEach(p => {
        const o = saved[p.id];
        m[p.id] = {
          name: o?.name ?? p.name,
          price: String(o?.price ?? p.price),
          stock: o?.stock == null ? '' : String(o.stock),
        };
      });
      setRows(m);
    }).catch(() => {
      const m: Record<number, Row> = {};
      products.forEach(p => { m[p.id] = { name: p.name, price: String(p.price), stock: '' }; });
      setRows(m);
    });
    fetch('/api/custom').then(r => r.json()).then((list: CustomApi[]) => {
      setCustom(list.map(c => ({ ...c, price: String(c.price), stock: c.stock == null ? '' : String(c.stock) })));
    }).catch(() => {});
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

  const setRow = (id: number, patch: Partial<Row>) =>
    setRows(s => ({ ...s, [id]: { ...s[id], ...patch } }));

  const setNew = (id: number, patch: Partial<NewItem>) =>
    setCustom(list => list.map(c => (c.id === id ? { ...c, ...patch } : c)));

  const addProduct = () => {
    if (!draft.name.trim()) { setDraftMsg('Nama barang wajib diisi.'); return; }
    if (!draft.price) { setDraftMsg('Harga wajib diisi.'); return; }
    const id = Math.max(1000, ...custom.map(c => c.id)) + 1;
    setCustom(list => [...list, { id, ...draft, name: draft.name.trim() }]);
    setDraft({ ...draft, name: '', price: '', stock: '' });
    setDraftMsg('Ditambahkan di daftar "Produk tambahan" di bawah. Klik "Simpan semua" supaya tampil di website.');
  };

  const removeNew = (id: number) => {
    if (confirm('Hapus produk ini? (berlaku setelah klik Simpan semua)')) {
      setCustom(list => list.filter(c => c.id !== id));
    }
  };

  const save = async () => {
    setStatus('Menyimpan...');
    const body: Record<number, { name: string; price: number; stock: number | null }> = {};
    products.forEach(p => {
      const r = rows[p.id];
      if (!r) return;
      body[p.id] = {
        name: r.name.trim() || p.name,
        price: Number(r.price) || 0,
        stock: r.stock === '' ? null : Number(r.stock),
      };
    });
    const customBody = custom.map(c => ({
      ...c,
      price: Number(c.price) || 0,
      stock: c.stock === '' ? null : Number(c.stock),
    }));
    try {
      const headers = { 'Content-Type': 'application/json' };
      const [a, b] = await Promise.all([
        fetch('/api/products', { method: 'PUT', headers, body: JSON.stringify(body) }),
        fetch('/api/custom', { method: 'PUT', headers, body: JSON.stringify(customBody) }),
      ]);
      if (a.ok && b.ok) {
        setStatus('✅ Tersimpan! Website sudah memakai data terbaru.');
      } else if (a.status === 401 || b.status === 401) {
        setStatus('❌ Sesi habis. Klik Keluar lalu login lagi (cek juga ADMIN_SECRET di Vercel).');
      } else if ([a.status, b.status].some(s => s === 404 || s === 405)) {
        setStatus('❌ File API belum ter-deploy. Pastikan app/api/products dan app/api/custom sudah di-push.');
      } else {
        setStatus(`❌ Server error (${a.status}/${b.status}). Cek koneksi database Upstash di Vercel.`);
      }
    } catch {
      setStatus('❌ Tidak bisa terhubung ke server. Cek internet lalu coba lagi.');
    }
  };

  const box: React.CSSProperties = { maxWidth: 960, margin: '0 auto', padding: 20, fontFamily: 'system-ui, sans-serif' };
  const input: React.CSSProperties = { padding: '9px 11px', border: '1px solid #ccc', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' };
  const btn: React.CSSProperties = { padding: '10px 18px', border: 0, borderRadius: 8, background: '#7c3aed', color: '#fff', fontSize: 16, cursor: 'pointer' };

  if (authed === null) return <div style={box}>Memuat...</div>;

  if (!authed) {
    return (
      <div style={{ ...box, maxWidth: 380, marginTop: 80 }}>
        <h1>Admin DIAH MART</h1>
        <form onSubmit={login} style={{ display: 'grid', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <input
              style={{ ...input, width: '100%', paddingRight: 80 }}
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', border: 0, background: 'none', color: '#7c3aed', fontWeight: 700, cursor: 'pointer' }}
            >
              {showPw ? 'Sembunyi' : 'Lihat'}
            </button>
          </div>
          {error && <span style={{ color: 'crimson' }}>{error}</span>}
          <button style={btn} type="submit">Masuk</button>
          <a href="/">← Kembali ke toko</a>
        </form>
      </div>
    );
  }

  const list = products.filter(p => {
    const name = (rows[p.id]?.name ?? p.name).toLowerCase();
    return (cat === 'Semua' || p.category === cat) && name.includes(q.toLowerCase());
  });

  return (
    <div style={box}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0 }}>Atur Produk</h1>
        <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/">Lihat toko</a>
          <button onClick={logout} style={{ ...btn, background: '#666', padding: '6px 12px' }}>Keluar</button>
        </span>
      </div>

      {/* ===== Tambah produk baru ===== */}
      <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 12, padding: 16, margin: '18px 0' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 18 }}>➕ Tambah produk baru</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input style={{ ...input, width: 60, textAlign: 'center' }} value={draft.emoji} onChange={e => setDraft({ ...draft, emoji: e.target.value })} aria-label="Emoji" />
          <input style={{ ...input, flex: 1, minWidth: 200 }} placeholder="Nama barang" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
          <select style={input} value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
          <input style={{ ...input, width: 110 }} inputMode="numeric" placeholder="Harga (Rp)" value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value.replace(/\D/g, '') })} />
          <input style={{ ...input, width: 90 }} placeholder="Satuan" value={draft.unit} onChange={e => setDraft({ ...draft, unit: e.target.value })} />
          <input style={{ ...input, width: 80 }} inputMode="numeric" placeholder="Stok" value={draft.stock} onChange={e => setDraft({ ...draft, stock: e.target.value.replace(/\D/g, '') })} />
          <button style={btn} onClick={addProduct}>Tambah</button>
        </div>
        {draftMsg && <p style={{ margin: '10px 0 0', fontSize: 13, color: '#6d28d9' }}>{draftMsg}</p>}
      </div>

      {/* ===== Produk tambahan ===== */}
      {custom.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Produk tambahan ({custom.length})</h2>
          {custom.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #eee', flexWrap: 'wrap' }}>
              <input style={{ ...input, width: 54, textAlign: 'center' }} value={c.emoji} onChange={e => setNew(c.id, { emoji: e.target.value })} />
              <input style={{ ...input, flex: 1, minWidth: 160 }} value={c.name} onChange={e => setNew(c.id, { name: e.target.value })} />
              <select style={input} value={c.category} onChange={e => setNew(c.id, { category: e.target.value })}>
                {CATS.map(k => <option key={k}>{k}</option>)}
              </select>
              <input style={{ ...input, width: 100 }} inputMode="numeric" value={c.price} onChange={e => setNew(c.id, { price: e.target.value.replace(/\D/g, '') })} />
              <input style={{ ...input, width: 80 }} value={c.unit} onChange={e => setNew(c.id, { unit: e.target.value })} />
              <input style={{ ...input, width: 70 }} inputMode="numeric" placeholder="∞" value={c.stock} onChange={e => setNew(c.id, { stock: e.target.value.replace(/\D/g, '') })} />
              <button onClick={() => removeNew(c.id)} style={{ ...btn, background: '#dc2626', padding: '8px 12px', fontSize: 14 }}>Hapus</button>
            </div>
          ))}
        </div>
      )}

      {/* ===== Produk bawaan ===== */}
      <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Produk bawaan</h2>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '0 0 6px' }}>
        <input style={{ ...input, flex: 1, minWidth: 180 }} placeholder="Cari produk..." value={q} onChange={e => setQ(e.target.value)} />
        <select style={input} value={cat} onChange={e => setCat(e.target.value)}>
          {categories.map(c => <option key={c.name}>{c.name}</option>)}
        </select>
      </div>
      <p style={{ color: '#777', fontSize: 13, margin: '0 0 12px' }}>
        Stok dikosongkan = tidak dihitung (selalu tersedia). Stok 0 = tampil &ldquo;Stok habis&rdquo; di website.
      </p>

      <div style={{ display: 'flex', gap: 8, fontSize: 12, color: '#888', padding: '0 0 6px', fontWeight: 700 }}>
        <span style={{ flex: 1, minWidth: 160 }}>NAMA BARANG</span>
        <span style={{ width: 110 }}>HARGA (Rp)</span>
        <span style={{ width: 80 }}>STOK</span>
      </div>

      <div>
        {list.map(p => {
          const r = rows[p.id];
          if (!r) return null;
          const habis = r.stock !== '' && Number(r.stock) === 0;
          return (
            <div key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #eee', flexWrap: 'wrap', background: habis ? '#fef2f2' : undefined }}>
              <span style={{ fontSize: 22 }}>{p.emoji}</span>
              <input style={{ ...input, flex: 1, minWidth: 160 }} value={r.name} onChange={e => setRow(p.id, { name: e.target.value })} />
              <input style={{ ...input, width: 110 }} inputMode="numeric" value={r.price} onChange={e => setRow(p.id, { price: e.target.value.replace(/\D/g, '') })} />
              <input style={{ ...input, width: 80 }} inputMode="numeric" placeholder="∞" value={r.stock} onChange={e => setRow(p.id, { stock: e.target.value.replace(/\D/g, '') })} />
            </div>
          );
        })}
      </div>

      <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={btn} onClick={save}>Simpan semua</button>
        <span>{status}</span>
      </div>
    </div>
  );
}