export const STORE = {
  name: "DIAH MART",
  whatsapp: "6281918090604",
  whatsappDisplay: "0819-1809-0604",
  address:
    "Villa Permata Blok D13 No.1, Sindangsari, Kec. Pasar Kemis, Kabupaten Tangerang, Banten 15560, Indonesia",
  hours: "Senin–Jumat: 08.00–22.00\nSabtu–Minggu: 08.00–21.30",
  instagram: "",
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  emoji: string;
  color: string;
  label?: string;
  image?: string;
};

export const categories = [
  { name: "Semua", emoji: "🛍️" },
  { name: "Frozen Food", emoji: "❄️" },
  { name: "Sembako", emoji: "🍚" },
  { name: "Kebutuhan Dapur", emoji: "🍳" },
  { name: "Rumah Tangga", emoji: "🧹" },
];

export const products: Product[] = [
  // ==================================
  // FROZEN FOOD
  // ==================================
  { id: 101, name: "Nugget Soeco 1kg", category: "Frozen Food", price: 34000, unit: "pack", emoji: "🍗", color: "peach", image: "/produk/nugget-soeco-1kg.jpg" },
  { id: 102, name: "Nugget Soeco 500g", category: "Frozen Food", price: 18000, unit: "pack", emoji: "🍗", color: "peach", image: "/produk/nugget-soeco-500g.jpg" },
  { id: 103, name: "Nugget Ayam Crispy Soeco 225g", category: "Frozen Food", price: 12000, unit: "pack", emoji: "🍗", color: "peach", image: "/produk/nugget-crispy-soeco-225g.jpg" },
  { id: 104, name: "Nugget Kanzler", category: "Frozen Food", price: 40000, unit: "pack", emoji: "🍗", color: "peach", label: "Favorit", image: "/produk/nugget-kanzler.jpg" },
  { id: 105, name: "Nugget Champ 235g", category: "Frozen Food", price: 18000, unit: "pack", emoji: "🍗", color: "peach", image: "/produk/nugget-champ-235g.jpg" },
  { id: 106, name: "Nugget Bartoz 500g", category: "Frozen Food", price: 24000, unit: "pack", emoji: "🍗", color: "peach", image: "/produk/nugget-bartoz-500g.jpg" },
  { id: 107, name: "Sosis Champ", category: "Frozen Food", price: 18000, unit: "pack", emoji: "🌭", color: "pink", image: "/produk/sosis-champ.jpg" },
  { id: 108, name: "Sosis Gebooy 500g", category: "Frozen Food", price: 18000, unit: "pack", emoji: "🌭", color: "pink", image: "/produk/sosis-gebooy-500g.jpg" },
  { id: 109, name: "Sosis Gebooy 420g", category: "Frozen Food", price: 13000, unit: "pack", emoji: "🌭", color: "pink", image: "/produk/sosis-gebooy-250g.jpg" },
  { id: 110, name: "Sosis Muantap 500g", category: "Frozen Food", price: 28000, unit: "pack", emoji: "🌭", color: "pink", image: "/produk/sosis-muantap-500g.jpg" },
  { id: 111, name: "Bakso Sapi Warisan", category: "Frozen Food", price: 28000, unit: "pack", emoji: "🍡", color: "yellow", image: "/produk/bakso-sapi-warisan.jpg" },
  { id: 112, name: "Sunfish Bakso Ikan Mix 500g", category: "Frozen Food", price: 28000, unit: "pack", emoji: "🍡", color: "yellow", image: "/produk/sunfish-bakso-ikan-mix-500g.jpg" },
  { id: 113, name: "Fish Roll 250g", category: "Frozen Food", price: 15000, unit: "pack", emoji: "🍥", color: "yellow", image: "/produk/fish-roll-250g.jpg" },
  { id: 114, name: "Cedea Crab Stick", category: "Frozen Food", price: 18000, unit: "pack", emoji: "🦀", color: "pink", image: "/produk/cedea-crab-stick.jpg" },
  { id: 115, name: "Cedea Tomyum Steamboat 300g", category: "Frozen Food", price: 24000, unit: "pack", emoji: "🍲", color: "peach", image: "/produk/cedea-tomyum-steamboat-300g.jpg" },
  { id: 116, name: "Gogo French Fries 1kg", category: "Frozen Food", price: 30000, unit: "pack", emoji: "🍟", color: "yellow", image: "/produk/gogo-french-fries-1kg.jpg" },
  { id: 117, name: "KK Shoestring French Fries", category: "Frozen Food", price: 28000, unit: "pack", emoji: "🍟", color: "yellow", image: "/produk/kk-shoestring-french-fries.jpg" },
  { id: 118, name: "Nippao Coklat 30 pcs (480g)", category: "Frozen Food", price: 16000, unit: "pack", emoji: "🍫", color: "yellow", image: "/produk/nippao-coklat-480g.jpg" },

  // ==================================
  // SEMBAKO
  // ==================================
  { id: 21, name: "Beras Medium 1kg", category: "Sembako", price: 16000, unit: "kg", emoji: "🍚", color: "yellow" },
  { id: 22, name: "Beras Medium 5kg", category: "Sembako", price: 76000, unit: "karung", emoji: "🍚", color: "yellow", label: "Kebutuhan Pokok" },
  { id: 23, name: "Beras Premium 5kg", category: "Sembako", price: 85000, unit: "karung", emoji: "🍚", color: "yellow" },
  { id: 24, name: "Gula Pasir 1kg", category: "Sembako", price: 19000, unit: "kg", emoji: "🧂", color: "blue" },
    { id: 25, name: "Minyak Goreng Sunco 1 Liter", category: "Sembako", price: 24000, unit: "pouch", emoji: "🛢️", color: "yellow", image: "/produk/minyak-sunco-1l.jpg" },
  { id: 26, name: "Minyak Goreng Sunco 2 Liter", category: "Sembako", price: 44000, unit: "pouch", emoji: "🛢️", color: "yellow", image: "/produk/minyak-sunco-2l.jpg" },
  { id: 27, name: "Minyakita 1 Liter", category: "Sembako", price: 18500, unit: "pouch", emoji: "🛢️", color: "yellow", image: "/produk/minyakita-1l.jpg" },
  { id: 86, name: "Minyak Goreng Filma 2 Liter", category: "Sembako", price: 42000, unit: "pouch", emoji: "🛢️", color: "yellow", image: "/produk/minyak-filma-2l.jpg" },
  { id: 87, name: "Minyak Goreng Kunci Mas 2 Liter", category: "Sembako", price: 42000, unit: "pouch", emoji: "🛢️", color: "yellow", image: "/produk/minyak-kunci-mas-2l.jpg" },
  { id: 88, name: "Minyakita 2 Liter", category: "Sembako", price: 38000, unit: "pouch", emoji: "🛢️", color: "yellow", image: "/produk/minyakita-2l.jpg" },
  { id: 210, name: "Minyak Goreng Sachet", category: "Sembako", price: 2000, unit: "sachet", emoji: "🛢️", color: "yellow", image: "/produk/minyak-goreng-sachet.jpg" },
  { id: 28, name: "Tepung Terigu Segitiga Biru 1kg", category: "Sembako", price: 15500, unit: "pack", emoji: "🌾", color: "blue" },
  { id: 29, name: "Tepung Terigu Cakra Kembar 1kg", category: "Sembako", price: 16500, unit: "pack", emoji: "🌾", color: "yellow" },
  { id: 30, name: "Tepung Tapioka 500g", category: "Sembako", price: 8500, unit: "pack", emoji: "🌾", color: "blue" },
  { id: 31, name: "Garam Beryodium 250g", category: "Sembako", price: 4500, unit: "pack", emoji: "🧂", color: "blue" },
  { id: 32, name: "Telur Ayam Negeri 1kg", category: "Sembako", price: 31000, unit: "kg", emoji: "🥚", color: "yellow" },
  { id: 33, name: "Indomie Goreng Original", category: "Sembako", price: 3500, unit: "pcs", emoji: "🍜", color: "peach", label: "Favorit", image: "/produk/indomie-goreng-original.jpg" },
  { id: 34, name: "Indomie Ayam Bawang", category: "Sembako", price: 3000, unit: "pcs", emoji: "🍜", color: "yellow", image: "/produk/indomie-ayam-bawang.jpg" },
  { id: 35, name: "Indomie Soto Mie", category: "Sembako", price: 3000, unit: "pcs", emoji: "🍜", color: "yellow", image: "/produk/indomie-soto-mie.jpg" },
  { id: 81, name: "Indomie Rendang", category: "Sembako", price: 3500, unit: "pcs", emoji: "🍜", color: "peach", image: "/produk/indomie-rendang.jpg" },
  { id: 82, name: "Indomie Mi Goreng Aceh", category: "Sembako", price: 3500, unit: "pcs", emoji: "🍜", color: "peach", image: "/produk/indomie-mi-goreng-aceh.jpg" },
  { id: 83, name: "Indomie Ayam Geprek", category: "Sembako", price: 3500, unit: "pcs", emoji: "🍜", color: "peach", image: "/produk/indomie-ayam-geprek.jpg" },
  { id: 84, name: "Indomie Goreng Jumbo", category: "Sembako", price: 4500, unit: "pcs", emoji: "🍜", color: "peach", image: "/produk/indomie-goreng-jumbo.jpg" },
  { id: 85, name: "Indomie Rendang Jumbo", category: "Sembako", price: 4500, unit: "pcs", emoji: "🍜", color: "peach", image: "/produk/indomie-rendang-jumbo.jpg" },
  { id: 36, name: "Mie Sedaap Goreng", category: "Sembako", price: 4000, unit: "pcs", emoji: "🍜", color: "peach", image: "/produk/mie-sedaap-goreng.jpg" },
  { id: 235, name: "Pop Mie Cup Reguler", category: "Sembako", price: 5000, unit: "cup", emoji: "🍜", color: "peach", image: "/produk/pop-mie-cup.jpg" },
  { id: 37, name: "Bihun Jagung 320g", category: "Sembako", price: 9500, unit: "pack", emoji: "🍝", color: "yellow" },
  { id: 38, name: "Kecap Manis Sachet 60ml", category: "Sembako", price: 3500, unit: "sachet", emoji: "🍶", color: "peach" },
  { id: 39, name: "Susu Kental Manis Sachet", category: "Sembako", price: 2500, unit: "sachet", emoji: "🥛", color: "blue" },
  { id: 40, name: "Teh Celup Isi 25", category: "Sembako", price: 8500, unit: "box", emoji: "🍵", color: "green" },
  { id: 209, name: "Delfi Chachi Minis", category: "Sembako", price: 1000, unit: "pcs", emoji: "🍫", color: "peach", image: "/produk/delfi-chachi-minis.jpg" },
  { id: 233, name: "Frisian Flag Energo Sachet Kecil", category: "Sembako", price: 3000, unit: "sachet", emoji: "🥛", color: "blue", image: "/produk/frisian-flag-energo-kecil.jpg" },
  { id: 234, name: "Frisian Flag Energo Pouch Besar", category: "Sembako", price: 10000, unit: "pouch", emoji: "🥛", color: "blue", image: "/produk/frisian-flag-energo-besar.jpg" },
  { id: 236, name: "Cap Panda Minuman Kaleng", category: "Sembako", price: 4000, unit: "kaleng", emoji: "🥤", color: "green", image: "/produk/cap-panda-kaleng.jpg" },
  { id: 239, name: "Mie Superior 2kg", category: "Sembako", price: 33000, unit: "pack", emoji: "🍝", color: "yellow", image: "/produk/mie-superior-2kg.jpg" },
  { id: 240, name: "Mie Superior 600g", category: "Sembako", price: 12000, unit: "pack", emoji: "🍝", color: "yellow", image: "/produk/mie-superior-600g.jpg" },
  { id: 241, name: "Cleo Botol Kecil (1 Karton)", category: "Sembako", price: 20000, unit: "karton", emoji: "💧", color: "blue", image: "/produk/cleo-botol-kecil-karton.jpg" },
  { id: 242, name: "Aquviva Botol Kecil (1 Karton)", category: "Sembako", price: 21000, unit: "karton", emoji: "💧", color: "blue", image: "/produk/aquviva-botol-kecil-karton.jpg" },
  // ==================================
  // KEBUTUHAN DAPUR
  // ==================================
  { id: 41, name: "Kecap Manis Bango 135ml", category: "Kebutuhan Dapur", price: 12000, unit: "botol", emoji: "🍶", color: "peach" },
  { id: 42, name: "Kecap Manis ABC 135ml", category: "Kebutuhan Dapur", price: 10000, unit: "botol", emoji: "🍶", color: "peach" },
  { id: 43, name: "Saus Sambal ABC 135ml", category: "Kebutuhan Dapur", price: 9500, unit: "botol", emoji: "🌶️", color: "pink" },
  { id: 44, name: "Saus Tomat ABC 135ml", category: "Kebutuhan Dapur", price: 9500, unit: "botol", emoji: "🍅", color: "pink" },
  { id: 45, name: "Saus Tiram Sachet", category: "Kebutuhan Dapur", price: 3500, unit: "sachet", emoji: "🥣", color: "yellow" },
  { id: 46, name: "Royco Ayam 100g", category: "Kebutuhan Dapur", price: 6500, unit: "pack", emoji: "🧂", color: "yellow" },
  { id: 47, name: "Royco Sapi 100g", category: "Kebutuhan Dapur", price: 6500, unit: "pack", emoji: "🧂", color: "peach" },
  { id: 48, name: "Masako Ayam 100g", category: "Kebutuhan Dapur", price: 6500, unit: "pack", emoji: "🧂", color: "yellow" },
  { id: 49, name: "Ladaku Merica Bubuk 4g", category: "Kebutuhan Dapur", price: 2500, unit: "sachet", emoji: "🧂", color: "blue" },
  { id: 50, name: "Ketumbar Bubuk 25g", category: "Kebutuhan Dapur", price: 4500, unit: "pack", emoji: "🌿", color: "green" },
  { id: 51, name: "Bawang Putih 250g", category: "Kebutuhan Dapur", price: 12000, unit: "pack", emoji: "🧄", color: "yellow" },
  { id: 52, name: "Bawang Merah 250g", category: "Kebutuhan Dapur", price: 14000, unit: "pack", emoji: "🧅", color: "pink" },
  { id: 53, name: "Cabai Merah 250g", category: "Kebutuhan Dapur", price: 18000, unit: "pack", emoji: "🌶️", color: "pink" },
  { id: 54, name: "Cabai Rawit 250g", category: "Kebutuhan Dapur", price: 19000, unit: "pack", emoji: "🌶️", color: "pink" },
  { id: 55, name: "Tepung Maizena 150g", category: "Kebutuhan Dapur", price: 7500, unit: "pack", emoji: "🌽", color: "yellow" },
  { id: 56, name: "Tepung Beras 500g", category: "Kebutuhan Dapur", price: 8500, unit: "pack", emoji: "🌾", color: "blue" },
  { id: 57, name: "Margarin Blue Band 200g", category: "Kebutuhan Dapur", price: 12000, unit: "pack", emoji: "🧈", color: "yellow" },
  { id: 58, name: "Santan Instan Kara 65ml", category: "Kebutuhan Dapur", price: 5000, unit: "pcs", emoji: "🥥", color: "blue" },
  { id: 59, name: "Cuka Makan 150ml", category: "Kebutuhan Dapur", price: 6000, unit: "botol", emoji: "🍶", color: "blue" },
  { id: 60, name: "Bumbu Racik Ayam Goreng", category: "Kebutuhan Dapur", price: 4500, unit: "sachet", emoji: "🍗", color: "yellow" },
  { id: 201, name: "Indofood Racik Gule Daging", category: "Kebutuhan Dapur", price: 2500, unit: "sachet", emoji: "🍛", color: "yellow", image: "/produk/indofood-racik-gule-daging.jpg" },
  { id: 202, name: "Indofood Racik Ikan Goreng", category: "Kebutuhan Dapur", price: 2200, unit: "sachet", emoji: "🐟", color: "blue", image: "/produk/indofood-racik-ikan-goreng.jpg" },
  { id: 203, name: "Indofood Racik Varian Lainnya", category: "Kebutuhan Dapur", price: 2500, unit: "sachet", emoji: "🧂", color: "yellow" },
  { id: 204, name: "Sasa Tepung Bumbu Serbaguna 80g", category: "Kebutuhan Dapur", price: 3000, unit: "pack", emoji: "🌾", color: "yellow", image: "/produk/sasa-tepung-bumbu-serbaguna-80g.jpg" },
  { id: 205, name: "Sasa Tepung Bumbu Bakwan 90g", category: "Kebutuhan Dapur", price: 3000, unit: "pack", emoji: "🌾", color: "yellow", image: "/produk/sasa-tepung-bumbu-bakwan-90g.jpg" },
  { id: 206, name: "Sasa Tepung Pisang Goreng Vanilla 210g", category: "Kebutuhan Dapur", price: 6500, unit: "pack", emoji: "🍌", color: "yellow", image: "/produk/sasa-tepung-pisang-goreng-210g.jpg" },
  { id: 207, name: "MamaQu Bumbu Tabur Barbeque", category: "Kebutuhan Dapur", price: 2500, unit: "sachet", emoji: "🍖", color: "peach", image: "/produk/mamaqu-bumbu-tabur-barbeque.jpg" },
  { id: 208, name: "Kobe Nasi Goreng Poll Pedas", category: "Kebutuhan Dapur", price: 2500, unit: "sachet", emoji: "🍳", color: "pink", image: "/produk/kobe-nasi-goreng-poll-pedas.jpg" },
  { id: 211, name: "Bumbu Sachet Lainnya", category: "Kebutuhan Dapur", price: 1500, unit: "sachet", emoji: "🧂", color: "yellow" },

  // ==================================
  // RUMAH TANGGA
  // ==================================
  { id: 61, name: "Sunlight Jeruk Nipis 210ml", category: "Rumah Tangga", price: 7000, unit: "pouch", emoji: "🧽", color: "green" },
  { id: 62, name: "Sunlight Jeruk Nipis 400ml", category: "Rumah Tangga", price: 12500, unit: "pouch", emoji: "🧽", color: "green" },
  { id: 63, name: "Mama Lemon 400ml", category: "Rumah Tangga", price: 11000, unit: "pouch", emoji: "🧽", color: "yellow" },
  { id: 64, name: "Rinso Deterjen Bubuk 400g", category: "Rumah Tangga", price: 11500, unit: "pack", emoji: "🧺", color: "blue" },
  { id: 65, name: "Daia Deterjen Bubuk 400g", category: "Rumah Tangga", price: 10000, unit: "pack", emoji: "🧺", color: "pink" },
  { id: 66, name: "So Klin Deterjen Bubuk 400g", category: "Rumah Tangga", price: 10500, unit: "pack", emoji: "🧺", color: "blue" },
  { id: 67, name: "Molto Pewangi Pakaian 250ml", category: "Rumah Tangga", price: 11000, unit: "pouch", emoji: "🌸", color: "pink" },
  { id: 68, name: "Downy Pewangi Pakaian 250ml", category: "Rumah Tangga", price: 13000, unit: "pouch", emoji: "🌸", color: "pink" },
  { id: 69, name: "Wipol Pembersih Lantai 750ml", category: "Rumah Tangga", price: 17500, unit: "botol", emoji: "🧹", color: "green" },
  { id: 70, name: "Super Pell Pembersih Lantai 750ml", category: "Rumah Tangga", price: 16000, unit: "botol", emoji: "🧹", color: "green" },
  { id: 71, name: "Baygon Semprot 400ml", category: "Rumah Tangga", price: 30000, unit: "kaleng", emoji: "🦟", color: "blue" },
  { id: 72, name: "Obat Nyamuk Bakar 1 Pack", category: "Rumah Tangga", price: 6500, unit: "pack", emoji: "🦟", color: "green" },
  { id: 73, name: "Tisu Wajah 250 Sheets", category: "Rumah Tangga", price: 12500, unit: "pack", emoji: "🧻", color: "blue" },
  { id: 74, name: "Tisu Toilet 1 Roll", category: "Rumah Tangga", price: 5500, unit: "roll", emoji: "🧻", color: "blue" },
  { id: 75, name: "Sabun Mandi Lifebuoy Batang", category: "Rumah Tangga", price: 5500, unit: "pcs", emoji: "🧼", color: "pink" },
  { id: 76, name: "Sabun Mandi Lux Batang", category: "Rumah Tangga", price: 6000, unit: "pcs", emoji: "🧼", color: "pink" },
  { id: 77, name: "Pasta Gigi Pepsodent 75g", category: "Rumah Tangga", price: 9000, unit: "tube", emoji: "🪥", color: "blue" },
  { id: 78, name: "Sikat Gigi", category: "Rumah Tangga", price: 5500, unit: "pcs", emoji: "🪥", color: "blue" },
  { id: 79, name: "Spons Cuci Piring", category: "Rumah Tangga", price: 4500, unit: "pcs", emoji: "🧽", color: "yellow" },
  { id: 80, name: "Kantong Sampah Ukuran Sedang", category: "Rumah Tangga", price: 10500, unit: "pack", emoji: "🗑️", color: "green" },
  { id: 212, name: "Sunlight Rhamno Power Sachet", category: "Rumah Tangga", price: 1000, unit: "sachet", emoji: "🧽", color: "green", image: "/produk/sunlight-rhamno-sachet.jpg" },
  { id: 213, name: "Sunlight Rhamno Power Pouch 650ml", category: "Rumah Tangga", price: 9000, unit: "pouch", emoji: "🧽", color: "green", image: "/produk/sunlight-rhamno-pouch-650ml.jpg" },
  { id: 214, name: "Ekonomi Pencuci Piring 650ml", category: "Rumah Tangga", price: 7000, unit: "pouch", emoji: "🧽", color: "yellow", image: "/produk/ekonomi-pencuci-piring-650ml.jpg" },
  { id: 215, name: "So Klin Pewangi Sachet Pink", category: "Rumah Tangga", price: 1000, unit: "sachet", emoji: "🌸", color: "pink", image: "/produk/so-klin-pewangi-pink.jpg" },
  { id: 216, name: "So Klin Pewangi Sachet Kuning", category: "Rumah Tangga", price: 1000, unit: "sachet", emoji: "🌼", color: "yellow", image: "/produk/so-klin-pewangi-kuning.jpg" },
  { id: 217, name: "So Klin Softener Refill 800ml", category: "Rumah Tangga", price: 14000, unit: "pouch", emoji: "🌸", color: "pink", image: "/produk/so-klin-softener-800ml.jpg" },
  { id: 218, name: "Molto Active Fresh Sachet", category: "Rumah Tangga", price: 1000, unit: "sachet", emoji: "🌸", color: "blue", image: "/produk/molto-active-fresh-sachet.jpg" },
  { id: 219, name: "Molto Active Fresh Refill 800ml", category: "Rumah Tangga", price: 14000, unit: "pouch", emoji: "🌸", color: "blue", image: "/produk/molto-active-fresh-800ml.jpg" },
  { id: 220, name: "Mawar Super Laundry Black Mystique", category: "Rumah Tangga", price: 1500, unit: "sachet", emoji: "🧺", color: "pink", image: "/produk/mawar-super-laundry-black-mystique.jpg" },
  { id: 221, name: "Daia Detergen + Softener 87g", category: "Rumah Tangga", price: 5000, unit: "sachet", emoji: "🧺", color: "pink", image: "/produk/daia-detergen-softener-87g.jpg" },
  { id: 222, name: "Rinso Anti Noda Sachet", category: "Rumah Tangga", price: 1000, unit: "sachet", emoji: "🧺", color: "blue", image: "/produk/rinso-anti-noda-sachet.jpg" },
  { id: 223, name: "Rinso Detergen Bubuk 195g", category: "Rumah Tangga", price: 4500, unit: "pack", emoji: "🧺", color: "blue", image: "/produk/rinso-bubuk-195g.jpg" },
  { id: 224, name: "HIT Spray Aerosol 600ml", category: "Rumah Tangga", price: 25000, unit: "kaleng", emoji: "🦟", color: "green", image: "/produk/hit-spray-600ml.jpg" },
  { id: 225, name: "VAPE Spray Aerosol", category: "Rumah Tangga", price: 19000, unit: "kaleng", emoji: "🦟", color: "blue", image: "/produk/vape-spray-aerosol.jpg" },
  { id: 226, name: "VAPE Electric (Alat)", category: "Rumah Tangga", price: 15000, unit: "pcs", emoji: "🔌", color: "blue", image: "/produk/vape-electric-alat.jpg" },
  { id: 227, name: "VAPE Electric Isi Ulang Cairan", category: "Rumah Tangga", price: 10000, unit: "pcs", emoji: "🦟", color: "blue", image: "/produk/vape-electric-isi-ulang.jpg" },
  { id: 228, name: "HIT Mat", category: "Rumah Tangga", price: 1000, unit: "lembar", emoji: "🦟", color: "green", image: "/produk/hit-mat.jpg" },
  { id: 229, name: "HIT Liquid Isi Ulang", category: "Rumah Tangga", price: 10000, unit: "pcs", emoji: "🦟", color: "green", image: "/produk/hit-liquid-isi-ulang.jpg" },
  { id: 230, name: "HIT Good Knight Obat Nyamuk Bakar", category: "Rumah Tangga", price: 1000, unit: "keping", emoji: "🦟", color: "green", image: "/produk/good-knight-obat-nyamuk-bakar.jpg" },
  { id: 231, name: "HIT King Kong Obat Nyamuk Bakar", category: "Rumah Tangga", price: 1000, unit: "keping", emoji: "🦟", color: "green", image: "/produk/king-kong-obat-nyamuk-bakar.jpg" },
  { id: 232, name: "Stella Air Freshener Refill", category: "Rumah Tangga", price: 12000, unit: "pcs", emoji: "🌺", color: "pink", image: "/produk/stella-air-freshener-refill.jpg" },
  { id: 237, name: "Minyak Kayu Putih Cap Lang 15ml", category: "Rumah Tangga", price: 7000, unit: "botol", emoji: "🌿", color: "green", image: "/produk/kayu-putih-cap-lang-15ml.jpg" },
  { id: 238, name: "Minyak Kayu Putih Cap Lang 30ml", category: "Rumah Tangga", price: 12000, unit: "botol", emoji: "🌿", color: "green", image: "/produk/kayu-putih-cap-lang-30ml.jpg" },
];