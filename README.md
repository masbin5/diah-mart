# DIAH MART — Website Toko

Website Next.js responsif untuk toko frozen food, sembako, kebutuhan dapur, dan rumah tangga. Keranjang dan checkout melalui WhatsApp tanpa backend/biaya database.

## Jalankan lokal
1. Install Node.js 20+.
2. Di terminal: `npm install`
3. Lalu: `npm run dev`
4. Buka http://localhost:3000

## WAJIB EDIT SEBELUM DIPUBLIKASIKAN
Buka **app/data.ts**:
- `STORE.whatsapp`: ganti dengan nomor WA toko, format `628123456789` (tanpa `+`, spasi, dan angka 0 pertama).
- `STORE.address`: isi alamat sebenarnya.
- `STORE.hours`: isi jam operasional sebenarnya.
- `STORE.instagram`: opsional.
- `products`: sesuaikan nama, harga, satuan dan kategori dengan barang yang benar-benar dijual. Saat ini 12 produk dan harga **hanya contoh**, bukan harga toko.

Produk memakai emoji ilustrasi agar langsung tampil dan tidak perlu mengurus foto produk. Jika ingin foto asli, lanjutkan dengan menambahkan gambar ke folder `public` dan mengganti bagian emoji di halaman.

## Deploy Vercel gratis
1. Upload isi folder project ini ke repository baru GitHub.
2. Buka https://vercel.com/new dan pilih repository-nya.
3. Framework akan terdeteksi sebagai Next.js. Klik **Deploy**.
4. Vercel memberi domain `.vercel.app` gratis pada paket Hobby, sesuai kebijakan penggunaan Vercel.
5. Saat ada perubahan di GitHub, Vercel dapat deploy ulang otomatis.

## Penting
- Website tidak memproses pembayaran. Pesanan disusun sebagai pesan yang dibuka di WhatsApp pelanggan.
- Stok dan harga **tidak tersinkron otomatis**; konfirmasi dilakukan lewat WhatsApp.
- Tidak ada biaya database atau fitur login.
- Pastikan ketentuan Vercel Hobby sesuai penggunaan website toko / bisnis Anda. Jika penggunaan komersial tidak tercakup di paket gratis, pilih hosting yang memperbolehkan komersial.

## Alternatif GRATIS untuk toko (direkomendasikan)
Karena Vercel Hobby melarang penggunaan komersial, gunakan Cloudflare Pages untuk toko ini setelah memastikan syarat layanan yang berlaku:
1. Hubungkan GitHub pada https://dash.cloudflare.com/ → Workers & Pages → Create → Pages → Connect to Git.
2. Pilih repository DIAH MART.
3. Build command: `npm run build`; build output directory: `out`.
4. Deploy; Cloudflare akan menyediakan subdomain `*.pages.dev`.

Project dikonfigurasi dengan `output: 'export'`, jadi halaman bisa dihosting sebagai situs statis tanpa server.
