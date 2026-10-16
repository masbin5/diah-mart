'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Clock3, Instagram, MapPin, Menu, Minus, Phone, Plus, Search, ShoppingBag, ShoppingBasket, Snowflake, Sparkles, Trash2, X } from 'lucide-react';
import { STORE, categories, products, type Product } from './data';

type Cart = Record<number, number>;

// Nama file logo di folder /public (huruf besar/kecil harus persis sama)
const LOGO_SRC = '/Diahmartt.png';

const rupiah = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
const waLink = (message: string) => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.address)}`;

// Logo di-crop lewat CSS supaya ruang putih di sekelilingnya tidak ikut tampil
function Logo({ width = 130, height = 88 }: { width?: number; height?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="DIAH MART"
      width={width}
      height={height}
      style={{ width, height, objectFit: 'cover', objectPosition: '50% 46%', display: 'block' }}
    />
  );
}

export default function Home() {
  const [category, setCategory] = useState('Semua');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [note, setNote] = useState('');
  const [delivery, setDelivery] = useState<'Ambil di toko' | 'Tanya pengantaran'>('Ambil di toko');
  const [prices, setPrices] = useState<Record<number, number>>({});

  // Ambil harga terbaru dari database (diatur lewat halaman /admin)
  useEffect(() => {
    fetch('/api/prices')
      .then(r => r.json())
      .then(setPrices)
      .catch(() => {}); // kalau gagal, pakai harga bawaan di data.ts
  }, []);

  const items = useMemo(() => products.map(p => ({ ...p, price: prices[p.id] ?? p.price })), [prices]);

  const filtered = useMemo(() => items.filter(p => (category === 'Semua' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())), [items, category, search]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const selected = items.filter(p => cart[p.id] > 0);
  const total = selected.reduce((a, p) => a + p.price * cart[p.id], 0);
  const updateCart = (id: number, delta: number) => setCart(current => { const next = { ...current }; next[id] = Math.max(0, (next[id] ?? 0) + delta); if (!next[id]) delete next[id]; return next; });
  const checkout = () => {
    if (!selected.length) return;
    const lines = selected.map((p, i) => `${i + 1}. ${p.name} (${cart[p.id]} × ${rupiah(p.price)}) = ${rupiah(cart[p.id] * p.price)}`).join('\n');
    const msg = `Halo DIAH MART! Saya mau pesan:\n\n${lines}\n\n*Estimasi total: ${rupiah(total)}*\nNama: ${buyerName.trim() || '-'}\nMetode: ${delivery}\nCatatan: ${note.trim() || '-'}\n\nMohon konfirmasi stok, harga terbaru, dan detail pemesanan ya. Terima kasih!`;
    window.open(waLink(msg), '_blank', 'noopener,noreferrer');
  };
  const toProducts = () => { document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' }); setMobileNav(false); };

  return <>
    <div className="announcement"><Sparkles size={14} /> Belanja kebutuhan harian jadi lebih gampang di DIAH MART <Sparkles size={14} /></div>
    <header className="header"><div className="container nav">
      <a className="brand" href="#beranda" aria-label="DIAH MART beranda"><Logo width={96} height={62} /></a>
      <nav className={mobileNav ? 'nav-links open' : 'nav-links'}><a href="#beranda" onClick={() => setMobileNav(false)}>Beranda</a><a href="#kategori" onClick={() => setMobileNav(false)}>Kategori</a><a href="#produk" onClick={() => setMobileNav(false)}>Produk</a><a href="#tentang" onClick={() => setMobileNav(false)}>Tentang Kami</a><a href="/admin">Admin</a></nav>
      <div className="nav-actions"><button className="cart-btn" onClick={() => setCartOpen(true)} aria-label={`Keranjang berisi ${count} barang`}><ShoppingBag size={21} /><span>Keranjang</span>{count > 0 && <b>{count}</b>}</button><button className="menu-btn" onClick={() => setMobileNav(v => !v)} aria-label="Buka menu">{mobileNav ? <X /> : <Menu />}</button></div>
    </div></header>

    <main>
      <section id="beranda" className="hero"><div className="container hero-inner"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> Toko kebutuhan harian keluarga</div><h1>Belanja harian,<br /><em>jadi lebih mudah.</em> <span className="star">✳</span></h1><p>Dari frozen food favorit sampai sembako, kebutuhan dapur, dan perlengkapan rumah. Semua bisa kamu cari di <strong>DIAH MART!</strong></p><div className="hero-buttons"><button className="primary" onClick={toProducts}>Mulai Belanja <ArrowRight size={18} /></button><a className="secondary" href={waLink('Halo DIAH MART, saya mau tanya produk yang tersedia.')} target="_blank" rel="noreferrer">Tanya via WhatsApp <ArrowRight size={17} /></a></div><div className="hero-proof"><span><Check size={16} /> Pilihan kebutuhan harian</span><span><Check size={16} /> Pesan praktis via WhatsApp</span></div></div><div className="hero-art" aria-label="Ilustrasi aneka kebutuhan belanja"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="hero-large-bag"><ShoppingBasket size={136} strokeWidth={1.5} /></div><div className="art-item item-a">🥦</div><div className="art-item item-b">🥖</div><div className="art-item item-c">🍗</div><div className="art-item item-d">🥛</div><div className="floating-label"><Snowflake size={20} /> <span>Frozen &amp; fresh<br /><b>pilihan keluarga</b></span></div><div className="circle-sticker">Yuk,<br />belanja! <span>✦</span></div></div></div><div className="hero-wave" /></section>

      <section id="kategori" className="section categories-section"><div className="container"><div className="section-head"><div><span className="overline">APA YANG KAMU BUTUHKAN?</span><h2>Belanja sesuai <em>kebutuhanmu</em></h2><p>Pilih kategori yang kamu cari, semuanya ada di satu tempat.</p></div><button className="text-link" onClick={toProducts}>Lihat semua produk <ArrowRight size={17} /></button></div><div className="category-grid">{categories.filter(c => c.name !== 'Semua').map((c, i) => <button className={`category-card category-${i}`} key={c.name} onClick={() => { setCategory(c.name); toProducts(); }}><span className="category-emoji">{c.emoji}</span><strong>{c.name}</strong><span className="category-action"><ArrowRight size={19} /></span></button>)}</div></div></section>

      <section className="perks"><div className="container perk-grid"><div><span className="perk-icon"><ShoppingBag size={23} /></span><span><strong>Belanja lebih praktis</strong><small>Pilih barang dari rumah</small></span></div><div><span className="perk-icon"><Snowflake size={23} /></span><span><strong>Frozen food &amp; sembako</strong><small>Kebutuhan sehari-hari</small></span></div><div><span className="perk-icon"><Phone size={23} /></span><span><strong>Pesan via WhatsApp</strong><small>Konfirmasi langsung ke toko</small></span></div></div></section>

      <section id="produk" className="section products-section"><div className="container"><div className="section-head"><div><span className="overline">PILIHAN DIAH MART</span><h2>Produk untuk <em>setiap hari</em></h2><p>Cari barang yang kamu butuhkan dan tambahkan ke keranjang.</p></div><span className="stock-note">Harga &amp; stok dikonfirmasi saat pesan</span></div><div className="toolbar"><div className="chips">{categories.map(c => <button key={c.name} onClick={() => setCategory(c.name)} className={category === c.name ? 'chip active' : 'chip'}>{c.emoji} {c.name}</button>)}</div><label className="search"><Search size={19} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." aria-label="Cari produk" /></label></div>
      {filtered.length ? <div className="product-grid">{filtered.map((p: Product) => <article className="product-card" key={p.id}><div className={`product-art ${p.color}`}><span className="product-emoji">{p.emoji}</span>{p.label && <span className="product-label">{p.label}</span>}</div><div className="product-info"><span className="product-cat">{p.category}</span><h3>{p.name}</h3><div className="price">{rupiah(p.price)}<small> / {p.unit}</small></div><button className="add-button" onClick={() => updateCart(p.id, 1)}>{cart[p.id] ? <><Check size={17} /> Tambah lagi ({cart[p.id]})</> : <><Plus size={17} /> Tambah ke keranjang</>}</button></div></article>)}</div> : <div className="empty-state">🔍 Produk tidak ditemukan. Coba kata kunci lain atau kategori berbeda.</div>}
      <p className="disclaimer">* Produk, gambar ilustrasi, dan harga di website ini merupakan data contoh. Pastikan informasi diperbarui sesuai stok DIAH MART.</p></div></section>

      <section className="cta-section"><div className="container"><div className="cta-card"><div><span className="overline">BUTUH SESUATU?</span><h2>Belum nemu barang <em>yang dicari?</em></h2><p>Chat langsung ke DIAH MART, tanya ketersediaan barang atau konfirmasi pesanan.</p><a className="cta-white" href={waLink('Halo DIAH MART! Saya mau tanya ketersediaan barang.')} target="_blank" rel="noreferrer">Chat via WhatsApp <ArrowRight size={19} /></a></div><div className="cta-art">🛍️<span>💚</span></div></div></div></section>

      <section id="tentang" className="section about-section"><div className="container about-grid"><div><span className="overline">KENALAN YUK!</span><h2>Hai, kami <em>DIAH MART!</em> 👋</h2><p>DIAH MART adalah toko kebutuhan sehari-hari yang menyediakan beragam pilihan frozen food, sembako, bahan dan kebutuhan dapur, serta perlengkapan rumah tangga.</p><p>Kami ingin bikin belanja kebutuhan keluarga terasa lebih dekat, simpel, dan nyaman.</p><a className="primary about-button" href={waLink('Halo DIAH MART, boleh minta informasi toko?')} target="_blank" rel="noreferrer">Hubungi Toko <ArrowRight size={17} /></a></div><div className="info-card"><h3>Informasi Toko</h3><div><MapPin size={20} /><span><strong>Alamat</strong><a href={mapsLink} target="_blank" rel="noopener noreferrer">{STORE.address}</a></span></div><div><Clock3 size={20} /><span><strong>Jam Operasional</strong><small style={{ whiteSpace: 'pre-line' }}>{STORE.hours}</small></span></div><div><Phone size={20} /><span><strong>Hubungi Kami</strong><a href={waLink('Halo DIAH MART!')} target="_blank" rel="noopener noreferrer">WhatsApp: {STORE.whatsappDisplay}</a></span></div>{STORE.instagram && <div><Instagram size={20} /><span><strong>Instagram</strong><a href={STORE.instagram} target="_blank" rel="noreferrer">Kunjungi akun kami</a></span></div>}</div></div></section>
    </main>

    <footer><div className="container footer-content"><div className="footer-brand"><div className="brand"><Logo width={150} height={100} /></div><p>Frozen food, sembako, kebutuhan dapur &amp; rumah tangga untuk sehari-hari.</p></div><div><strong>Jelajahi</strong><a href="#beranda">Beranda</a><a href="#kategori">Kategori</a><a href="#produk">Produk</a><a href="#tentang">Tentang</a></div><div><strong>Kontak</strong><a href={waLink('Halo DIAH MART!')} target="_blank" rel="noreferrer">WhatsApp Toko</a><a href={mapsLink} target="_blank" rel="noopener noreferrer">{STORE.address}</a><span style={{ whiteSpace: 'pre-line' }}>{STORE.hours}</span></div></div><div className="container copyright">© {new Date().getFullYear()} DIAH MART. Dibuat dengan 💚 untuk belanja keluarga.</div></footer>

    {cartOpen && <div className="cart-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setCartOpen(false); }}><aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Keranjang belanja"><div className="cart-header"><div><h2>Keranjangmu 🛍️</h2><p>{count} barang dipilih</p></div><button onClick={() => setCartOpen(false)} aria-label="Tutup keranjang"><X /></button></div><div className="cart-body">{selected.length ? selected.map(p => <div className="cart-item" key={p.id}><div className={`cart-item-art ${p.color}`}>{p.emoji}</div><div className="cart-item-info"><strong>{p.name}</strong><small>{rupiah(p.price)} / {p.unit}</small><div className="quantity"><button onClick={() => updateCart(p.id, -1)} aria-label={`Kurangi ${p.name}`}><Minus size={14} /></button><b>{cart[p.id]}</b><button onClick={() => updateCart(p.id, 1)} aria-label={`Tambah ${p.name}`}><Plus size={14} /></button></div></div><button className="delete" aria-label={`Hapus ${p.name}`} onClick={() => setCart(c => { const n = { ...c }; delete n[p.id]; return n; })}><Trash2 size={17} /></button></div>) : <div className="cart-empty"><ShoppingBag size={48} /><h3>Keranjang masih kosong</h3><p>Yuk, pilih dulu produk favoritmu!</p><button className="primary" onClick={() => { setCartOpen(false); toProducts(); }}>Lihat Produk <ArrowRight size={17} /></button></div>}</div>{selected.length > 0 && <div className="cart-footer"><label>Nama pemesan (opsional)<input value={buyerName} onChange={e => setBuyerName(e.target.value)} placeholder="Nama kamu" /></label><label>Cara pemesanan <select value={delivery} onChange={e => setDelivery(e.target.value as typeof delivery)}><option>Ambil di toko</option><option>Tanya pengantaran</option></select></label><label>Catatan (opsional)<textarea rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Mis. mau tanya stok dan ongkir" /></label><div className="total"><span>Estimasi total</span><strong>{rupiah(total)}</strong></div><p className="cart-caption">Harga &amp; ketersediaan final dikonfirmasi oleh toko melalui WhatsApp.</p><button className="checkout" onClick={checkout}>Pesan lewat WhatsApp <ArrowRight size={19} /></button></div>}</aside></div>}
  </>;
}