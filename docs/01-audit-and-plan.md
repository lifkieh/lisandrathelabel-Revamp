# Lisandra The Label — Audit Shopify, Redesign & Rencana Peningkatan Penjualan

**Disusun:** 30 Juli 2026
**Scope pekerjaan:** layouting, perbaikan flow, peningkatan konversi/penjualan, copywriting, sistem tipografi
**Platform terdeteksi:** Shopify, tema keluarga **Horizon** (bukan Dawn)
**Bukti tema:** meta `view-transition: same-origin`, blok `ProductInformation-template--…`, cart drawer + account dropdown, tombol "Add / Added", filter PLP native — semua ciri Horizon (Summer Editions 2025/2026), bukan Dawn/OS2.0 lama.
**Katalog saat ini:** 31 produk aktif, rentang harga Rp 319.000 – Rp 1.999.000, ±9 produk sedang diskon.

---

## 0. Ringkasan eksekutif — 10 hal yang paling berpengaruh ke penjualan

Diurutkan berdasarkan **dampak ke revenue ÷ effort**. Nomor 1–4 bisa dieksekusi tanpa desain sama sekali dan biasanya menghasilkan lompatan terbesar.

| # | Masalah | Dampak | Effort |
|---|---|---|---|
| 1 | **Warna dijual sebagai produk terpisah** (Amara Top vs "Amara Top Black", Tala Butter vs Tala Ivory, Mentari Butter vs Mentari Ivory) | Swatch warna native Horizon tidak bisa jalan, SEO & sinyal best-seller terpecah, harga jadi tidak konsisten (Amara Beige Rp 899.000 sementara Amara Black Rp 599.000 → terlihat seperti error harga) | S |
| 2 | **Set dijual terpisah tanpa opsi bundle** (Amara/Tala/Maia/Cieli/Baia/Sira/Aruna top+skirt, Orla/Zena bikini top+bottom) | AOV tertinggal 40–80%. Ini uang yang sudah ada di katalog, cuma belum dibungkus | S |
| 3 | **Default sort `/collections/all` = Alphabetically A–Z** | Produk pertama yang dilihat pengunjung = Alana Dress diskon 50%. Anchor harga rusak sejak detik pertama | XS |
| 4 | **Nol social proof di seluruh situs** (tanpa review, rating, UGC, press, stockist yang terlihat) | Di harga Rp 1–2 juta untuk brand yang belum dikenal, ini penghambat konversi nomor satu | S |
| 5 | **PDP tidak ada size guide, estimasi kirim, info retur, status stok** | Size guide cuma ada di footer sebagai 2 file gambar. Untuk knitwear yang stretch, keraguan ukuran = keranjang ditinggal | M |
| 6 | **Blok "You May Also Like" di PDP kosong** | Cross-sell gratis yang tidak jalan | XS |
| 7 | **Hero video 1080p / 7,2 Mbps, H1 tidak ada, CTA salah arah** | LCP berat di 4G (mayoritas trafik ID+turis), CTA hero ke `/collections/all` bukan koleksi kampanye | M |
| 8 | **SEO dasar rusak** — title homepage `www.lisandrathelabel.com`, meta description Our Story = `Test`, collection tanpa deskripsi, alt text = nama file (`FOr Mentari Long Dress`) | Kehilangan trafik organik gratis di keyword bernilai tinggi ("crochet dress Bali", "resort wear Bali") | S |
| 9 | **Diskon 50% bercampur di grid utama, permanen** | Melatih pelanggan untuk menunggu markdown; merusak positioning "kept for years, not seasons" | S |
| 10 | **Struktur URL & navigasi tidak konsisten** — menu `SETS` mengarah ke `/collections/top`, `TOPS` ke `/collections/tops`; hero ke `/collections/cielo-tropico-collection` sementara menu ke `/collections/cielo-tropico` | Risiko 404, kebingungan, SEO terbelah | S |

**Target realistis pasca eksekusi penuh (12 minggu):** conversion rate +60–110% relatif, AOV +25–40% (dari bundling set + cross-sell), sesi organik +30% (dari perbaikan SEO + halaman konten). Angka ini bukan janji — nanti diverifikasi lewat baseline di bagian §9.

---

## 1. Audit detail per halaman

### 1.1 Homepage

**Yang sudah ada (urutan section):**
1. Announcement bar → 2. Hero video full-bleed → 3. Collection list (Sets / Dresses / Swim) → 4. Back In Stock (6 produk) → 5. Best Sellers (6 produk) → 6. Newsletter → 7. Footer

**Temuan:**

- **Tidak ada H1.** Tagline hero (*"Hand-knit & crochet goddess silhouettes for the sun-drenched woman…"*) di-render sebagai `h5`. Homepage secara teknis tidak punya heading utama → sinyal SEO dan aksesibilitas hilang.
- **Hero video 1080p, 7,2 Mbps** (`817b848f…HD-1080p-7.2Mbps.mp4`). Ini LCP killer di jaringan seluler Indonesia. Poster image sudah ada, bagus, tapi videonya perlu diturunkan ke ≤720p / ≤2,5 Mbps + versi mobile terpisah + `preload="none"` di mobile.
- **CTA hero salah arah.** Tombol "Shop the Collection" → `/collections/all`. Kalau hero-nya kampanye *Cielo Tropico*, CTA harus ke koleksi itu. Juga: hero image di atas mengarah ke `/collections/cielo-tropico-collection` sementara menu "NEW ARRIVALS" → `/collections/cielo-tropico`. **Salah satu dari dua handle ini kemungkinan 404 — wajib diverifikasi lewat browser.**
- **Collection list hanya 3 tile** (Sets, Dresses, Swim) padahal menu punya 6 kategori. Tops & Bottoms tidak punya pintu masuk dari homepage.
- **Tidak ada:** band cerita/kerajinan, social proof, UGC/TikTok feed, bantuan ukuran, baris trust (shipping/retur/pembayaran), editorial "shop the look", stockist.
- **Announcement bar campur mata uang:** *"Free international shipping on orders over USD 200 | Indonesia free shipping"* — harga tampil dalam IDR tapi threshold dalam USD. Pengunjung ID harus mengkonversi sendiri, dan tidak jelas apakah "Indonesia free shipping" itu tanpa minimum.
- **Newsletter 10% off hanya di footer.** Tidak ada popup/entry point di atas fold. Ini penawaran terbaik yang dimiliki brand dan disembunyikan di bawah.
- **Tidak ada breadcrumb** di seluruh situs.

### 1.2 Collection / PLP (`/collections/all`)

**Temuan:**

- **Default sort = "Alphabetically, A-Z".** Produk pertama = Alana Dress `Rp 1.199.000 → Rp 599.000`. Fix: set sort koleksi ke **Manual** dan kurasi 8 produk pertama (full price, foto terbaik, best seller), atau minimal "Best selling".
- **Produk sold out masih tampil dengan tombol "Add"** (Kayu Bikini Set). Aktifkan setting Shopify untuk melempar out-of-stock ke akhir + ganti tombol jadi "Notify me".
- **Filter belum lengkap.** `Product type` hanya berisi Bikini / Dress / Skirt / Top — padahal ada Shorts (Baia Crochet Shorts) dan Sets. **Tidak ada filter Size**, padahal size adalah variant option (bisa langsung difilter). Belum ada filter berbasis metafield (silhouette, length, occasion, technique).
- **Product type belum rapi** → filter jadi bohong. Perlu taksonomi ulang (lihat §5.2).
- **Card produk kurang informasi.** Sekarang: gambar + nama + harga. Uniqlo/H&M menampilkan: swatch warna, hover gambar kedua, badge (New/Low stock/Sold out), rating, dan — untuk knitwear ini yang krusial — **"Model wears XS-S · 170 cm"**.
- **Judul produk tidak konsisten** karena warna jadi produk terpisah: "Amara Top" berdampingan dengan "Amara Top Black" dan "Amara Wrap Skirt Black". Grid jadi terlihat seperti stok gudang, bukan koleksi kurasi.
- **Alt text = nama file / typo**, dan alt text ini yang muncul di card: `For Aruna Skirt`, `FOr Mentari Long Dress`, `shimmering knit set handmade resortwear bali` (keyword stuffing).
- **9 dari 31 produk diskon**, sebagian sampai −50%, bercampur di grid utama.

### 1.3 PDP (contoh: `/products/zaye-dress`)

**Yang sudah bagus:** 7 gambar termasuk detail shot, deskripsi kaya, catatan fitting ("true to size with generous stretch"), **model measurements lengkap** (Sydney, 170 cm, 83-62-89, size XS-S), care instructions terstruktur. Ini fondasi yang kuat — masalahnya penempatan dan yang hilang.

**Temuan:**

| Elemen | Status | Standar Uniqlo/H&M |
|---|---|---|
| Size guide di PDP | ❌ tidak ada (hanya footer, berupa 2 gambar) | Drawer "Size guide" di sebelah size picker |
| Status stok / low stock | ❌ | "Only 2 left" / "In stock" |
| Estimasi pengiriman | ❌ | "Delivered 2–4 Aug" |
| Ringkasan retur | ❌ | "Free 30-day returns" di dekat tombol |
| Review / rating | ❌ | Bintang + jumlah di bawah judul |
| Ikon pembayaran | ❌ | Di bawah add-to-cart |
| Cross-sell | ⚠️ blok "You May Also Like" **render kosong** | "Complete the look" + "You may also like" |
| Shop the set | ❌ | Wajib — Zaye/Amara/Tala semua punya pasangan |
| Sticky add-to-cart mobile | ❌ | Standar |
| Judul konsisten | ⚠️ SEO title "Zaye Knit Long Dress" vs H1 tampil "Zaye Dress Cocoa" | Satu nama, satu URL, warna sebagai variant |
| Struktur deskripsi | ⚠️ satu paragraf panjang 90+ kata, sama dengan meta description | Hook 2 baris + bullet + accordion |
| Hanya 2 ukuran (XS-S, M-L) | ⚠️ | Perlu dijual lewat data fit, bukan disembunyikan |

### 1.4 Halaman statis

- **Our Story** — copy-nya sebenarnya *bagus* (spesifik: "artisans we know by name", "worn from the water's edge to wherever the evening leads"). Tapi: `meta description = "Test"`, tidak ada foto artisan, tidak ada CTA ke shop, tidak ada bukti (jumlah artisan, jam kerja per piece, jenis benang). Halaman ini seharusnya jadi mesin konversi, bukan halaman buntu.
- **Size Guide** — **hanya 2 file JPG**, tanpa teks HTML. Konsekuensi: tidak bisa dibaca di mobile tanpa zoom, tidak terindeks Google, tidak bisa dipakai di drawer size chart Horizon, tidak accessible, tidak bisa diterjemahkan. Harus dikonversi ke tabel HTML + metafield.
- **Stockists** ditaruh sebagai **blog post** (`/blogs/news/stockists`) — seharusnya halaman dengan peta/daftar; ini aset trust yang terkubur.
- **FAQs / Contact** — perlu diverifikasi di browser (apakah ada WhatsApp, jam respons, ukuran khusus, custom order).

### 1.5 SEO & metadata

| Halaman | Kondisi sekarang | Masalah |
|---|---|---|
| Homepage | `title: www.lisandrathelabel.com – Lisandra The Label`, `og:title: www.lisandrathelabel.com` | Title = URL. Ini kehilangan keyword paling bernilai |
| Our Story | `meta description: Test` | Placeholder ter-publish |
| `/collections/all` | `title: Products`, tanpa meta description | Generik |
| Semua collection | tidak ada deskripsi koleksi | Kehilangan konten & internal linking |
| Size Guide | meta description kosong | — |
| Alt text | nama file + typo + keyword stuffing | Kehilangan Google Images (kanal besar untuk fashion) |
| Struktur data | perlu verifikasi (rating/review schema belum mungkin ada karena belum ada review) | Rich snippet hilang |

### 1.6 Performa & teknis

- Hero mp4 1080p / 7,2 Mbps.
- Collection tile & product image dipanggil pada `width=3840` — jauh di atas kebutuhan.
- Horizon memakai web components + Shadow DOM → **hati-hati memilih app**: app review/bundle/upsell lama sering gagal hook ke variant picker Horizon. Pilih hanya app yang eksplisit menyatakan "Horizon compatible".

---

## 2. Benchmark: Uniqlo vs H&M vs Lisandra

Yang penting bukan meniru tampilannya, tapi meniru **sistemnya**. Uniqlo dan H&M itu mesin konversi dengan disiplin grid dan data produk yang ekstrem.

### 2.1 Yang layak diambil dari Uniqlo

| Praktik | Kenapa jalan | Penerapan di Lisandra |
|---|---|---|
| **Penamaan produk sistematis** ("Women AIRism Cotton Oversized T-Shirt") | Bisa dicari, jelas, mendeskripsikan bahan+bentuk | `Zaye Hand-Knit Maxi Dress` + variant warna. Bukan `Zaye Dress Cocoa` |
| **Grid padat, latar putih bersih, minim dekorasi** | Produk yang jual, bukan bingkainya | Latar putih untuk semua surface shopping; warna hangat hanya untuk band editorial |
| **Data fit di card & PDP** (tinggi model, ukuran yang dipakai) | Menghilangkan keraguan ukuran sebelum klik | Sudah punya data ini di Zaye — standarkan ke semua produk via metafield |
| **Kolom kanan PDP sticky, tombol besar, sudut kotak** | Add-to-cart selalu terlihat | Blok Horizon + sticky bar mobile |
| **Harga & badge promo bertanggal** | Diskon terasa terbatas, bukan permanen | Semua markdown pakai tanggal akhir |
| **Tipografi:** neo-grotesque netral, kerapatan tinggi, angka tabular | Harga & ukuran mudah dipindai | Lihat §3 |

Catatan teknis: situs & app Uniqlo memakai **TT Commons Pro** (TypeType), sementara logonya berbasis Helvetica Neue Bold yang dimodifikasi.

### 2.2 Yang layak diambil dari H&M

| Praktik | Kenapa jalan | Penerapan di Lisandra |
|---|---|---|
| **Hero tidak full-screen** — produk sudah kelihatan di fold pertama | Waktu ke produk pertama jauh lebih cepat | Hero 62–72vh, bukan 100vh |
| **Sistem 2 typeface:** sans geometris (HM Sans) + serif kontras tinggi (HM Amperserif) | Sans untuk UI/harga, serif untuk suara brand | Struktur yang sama, lihat §3 |
| **Accordion PDP:** Description / Materials & care / Delivery & payment | Info lengkap tanpa halaman panjang | Description / Fit & sizing / Craft & materials / Care / Shipping & returns |
| **"Notify me" untuk out-of-stock** | Menangkap demand yang biasanya hilang | Wajib — produk handmade sering habis |
| **Favorite / wishlist** | Repeat visit untuk barang harga tinggi | Penting di rentang Rp 1–2 juta |
| **Filter bar sticky + chip filter aktif** | Navigasi katalog cepat | Native Horizon, cukup dikonfigurasi |
| **Footer service yang tebal** | Menjawab keraguan tanpa perlu bertanya | Sudah ada, perlu diperkuat |

### 2.3 Matriks kesenjangan

| Fitur | Uniqlo | H&M | Lisandra sekarang | Prioritas |
|---|---|---|---|---|
| Swatch warna di card & PDP | ada | ada | tidak (warna = produk terpisah) | **P0** |
| Size guide di PDP | ada | ada | tidak | **P0** |
| Review / rating | ada | ada | tidak | **P0** |
| Cross-sell berfungsi | ada | ada | blok kosong | **P0** |
| Bundle / shop the set | ada | ada | tidak | **P0** |
| Estimasi kirim di PDP | ada | ada | tidak | P1 |
| Notify me (OOS) | ada | ada | tidak | P1 |
| Wishlist | ada | ada | tidak | P1 |
| Sticky ATC mobile | ada | ada | tidak | P1 |
| Breadcrumb | ada | ada | tidak | P1 |
| Filter ukuran | ada | ada | tidak | P1 |
| Editorial / lookbook | ada | ada | tidak | P2 |
| Cerita kerajinan | lemah | lemah | **kuat (aset unggulan)** | pertahankan & perkuat |

**Poin strategis:** Uniqlo dan H&M **tidak bisa** bersaing di cerita artisan, hand-knit 2 hari per piece, dan small batch. Itu keunggulan struktural Lisandra. Jadi arah desainnya bukan "jadi seperti Uniqlo", tapi: **ambil disiplin ritel mereka, pasang di atas kredibilitas kerajinan yang tidak mereka miliki.**

---

## 3. Sistem tipografi & desain

### 3.1 Soal "font disamain" — ini pertimbangannya

Font Uniqlo dan H&M **tidak bisa dipakai secara legal**: HM Sans / HM Ampersand / HM Amperserif adalah typeface eksklusif H&M (dikembangkan Monotype bersama The Studio) dan tidak dijual. Uniqlo memakai TT Commons Pro yang **bisa** dilisensi resmi dari TypeType.

Dan sejujurnya: menyamakan font 1:1 dengan fast fashion itu justru melawan kepentingan Lisandra. Harga Rp 1–2 juta untuk hand-knit tidak boleh terasa seperti Rp 199.000. Yang benar-benar bikin Uniqlo/H&M terasa rapi bukan nama fontnya, tapi: **satu sans netral untuk semua UI, angka tabular untuk harga, letterspacing uppercase yang disiplin, dan type scale yang ketat.** Itu yang saya replikasi.

### 3.2 Stack yang direkomendasikan

**Opsi A — gratis & langsung jalan (rekomendasi saya)**

| Peran | Typeface | Alasan |
|---|---|---|
| Body / UI / harga / nav | **Inter** (variable, OFL) | Neo-grotesque paling dekat ke Helvetica/TT Commons; angka tabular; tajam di ukuran kecil — persis kebutuhan harga & tabel ukuran |
| Display / editorial | **Bodoni Moda** (variable, OFL) | Didone kontras tinggi — struktur yang sama dengan pasangan serif H&M. Bukan Playfair Display, yang sudah terlalu umum dan langsung terasa template Shopify |
| Accent / eyebrow / label | Inter, uppercase, `letter-spacing: .14em`, 11px | Micro-label ala Uniqlo |

**Opsi B — jika owner mau investasi lisensi (paling mirip referensi)**

| Peran | Typeface | Biaya |
|---|---|---|
| Body / UI | **TT Commons Pro** (TypeType) — font yang dipakai situs Uniqlo | web license, sekali bayar |
| Display | **PP Editorial New** (Pangram Pangram) atau **Söhne** (Klim) | web license |

Opsi A cukup untuk 95% kasus dan nol biaya + nol risiko lisensi. Jangan pernah upload font replika "H&M" hasil download gratisan ke store komersial — itu masalah hukum, bukan masalah desain.

### 3.3 Type scale (desktop / mobile)

```
Display XL   Bodoni Moda 400   64 / 40 px   line-height .95   tracking -.02em   -> hero
Display L    Bodoni Moda 400   40 / 28 px   line-height 1.05  tracking -.01em   -> judul section
Display M    Bodoni Moda 400   28 / 22 px   line-height 1.15                    -> nama produk PDP
Body L       Inter 400         17 / 16 px   line-height 1.55                    -> deskripsi
Body M       Inter 400         15 / 14 px   line-height 1.5                     -> UI, card
Body S       Inter 400         13 / 13 px   line-height 1.45                    -> catatan, care
Price        Inter 500         17 / 16 px   tabular-nums
Label        Inter 500         11 / 11 px   uppercase  tracking .14em
Craft spec   Inter 500         10.5 px      uppercase  tracking .16em           -> signature (3.6)
```

Aturan: **maksimal 2 ukuran display per halaman.** Kesan mahal datang dari pengulangan yang disiplin, bukan dari variasi.

### 3.4 Palet warna

```
Paper      #FFFFFF   latar semua surface shopping (grid, PDP) - putih menjual produk
Sand       #EFE9E0   latar band editorial / cerita saja
Cocoa      #2E2320   ink utama, tombol, footer
Ink-60     #6E6259   teks sekunder
Line       #E4DED6   hairline 1px - pembatas, bukan shadow
Butter     #D9A93A   aksen tunggal (dari warna produk Butter Yellow); hanya untuk badge & progress bar ongkir
Sale       #9A3F2B   khusus harga diskon - jangan dipakai untuk hal lain
```

Aturan: **shadow = 0, border-radius = 0** (kecuali swatch warna yang bulat). Semua separasi pakai hairline. Ini yang bikin terasa department store, bukan template Shopify.

### 3.5 Pemetaan ke slot Horizon

Horizon punya 4 slot tipografi di **Theme settings → Typography**: `Heading`, `Subheading`, `Body`, `Accent`. Petakan:

- `Heading` → Bodoni Moda
- `Subheading` → Inter Medium (uppercase tracked lewat CSS)
- `Body` → Inter
- `Accent` → Inter Medium

**Cara pasang custom font di Horizon (urutan yang benar):**

1. **Duplicate tema dulu** (Online Store → Themes → ⋯ → Duplicate). Jangan pernah kerja di tema live.
2. Upload file **.woff2** ke **Content → Files** — bukan ke folder Assets lewat code editor, karena file font bisa korup di jalur itu.
3. Buat asset CSS baru, mis. `assets/brand-type.css`, isi `@font-face` + override variabel font Horizon.
4. Panggil di `layout/theme.liquid`, dengan `preload` hanya untuk 2 file yang dipakai above-the-fold.
5. Verifikasi: variabel font Horizon menggerakkan **semua** preset tipografi, jadi kalau variabelnya di-override, seluruh store konsisten tanpa perlu `!important` berhamburan.

Kalau tidak ingin menyentuh kode, ada app blok custom font khusus Horizon (~$5/bln). Tapi override CSS langsung lebih cepat, gratis, dan tidak menambah dependency.

Konsekuensi yang harus disadari: override CSS perlu di-merge ulang setiap update tema. Simpan semua perubahan dalam **satu file** (`brand-type.css` + `brand.css`) supaya merge-nya sepele.

### 3.6 Elemen signature — "craft spec strip"

Satu elemen yang bikin situs ini tidak mungkin dikira template. Di setiap product card dan PDP, ada satu baris micro-label berisi **fakta produksi yang benar**, bukan badge "sustainable" generik:

```
HAND-KNIT · 2 DAYS PER PIECE · 100% RAYON · BALI
CROCHET · SMALL BATCH OF 12 · MADE TO ORDER
```

Kenapa ini kuat: (a) datanya sudah dimiliki brand — deskripsi Zaye sudah menyebut dikerjakan dua hari; (b) langsung menjustifikasi harga; (c) tidak bisa disalin Uniqlo/H&M; (d) implementasinya sepele, satu metafield `craft_spec` per produk. Ini juga menggantikan semua badge eco generik yang cuma bikin brand terlihat sama dengan brand lain.

---

## 4. Blueprint layout per template

Format: section — isi — tujuan. Semua bisa dibangun dengan blok native Horizon; yang butuh kode ditandai [kode].

### 4.1 Homepage

```
1  Announcement bar - 3 pesan rotasi, market-aware          -> trust + threshold ongkir
2  Header - logo tengah, mega menu bergambar [kode]         -> navigasi cepat
3  Hero 68vh - video mobile <=720p + poster, H1 asli, 2 CTA -> posisi brand + jalan ke produk
4  Shop by category - 6 tile (Dresses/Sets/Tops/Bottoms/Swim/Sale)
5  Best Sellers - 8 produk, card lengkap + swatch + craft spec
6  Craft band - 3 angka: hari kerja / jumlah artisan / ukuran batch [kode]
7  Shop the set - 3 set lengkap dengan harga bundle [kode]  -> pendorong AOV
8  Editorial "Cielo Tropico" - lookbook + shop the look
9  Reviews - 3 review + rating agregat                      -> social proof
10 Instagram / TikTok UGC - 6 tile
11 Newsletter inline (bukan cuma footer)
12 Trust row - shipping / retur / pembayaran / stockist
13 Footer
```

Prinsip urutan: **produk harus muncul sebelum scroll kedua.** Sekarang pengunjung harus melewati hero full-screen plus 3 tile kategori dulu.

### 4.2 Collection / PLP

```
Breadcrumb [kode]
H1 koleksi + deskripsi 2 baris (SEO + konteks)
Filter bar sticky: Size / Color / Type / Price / In stock  |  Sort: Featured (manual, terkurasi)
Grid 4 kolom desktop, 2 kolom mobile
Card: gambar 3:4 -> gambar kedua saat hover / swatch warna / nama / harga /
      craft spec / "Model wears M-L" / badge (New, Only 2 left, Sold out -> Notify me)
Setiap 12 produk: 1 tile editorial full-bleed [kode]
Bawah halaman: teks koleksi 150-200 kata (SEO) + link ke Size Guide & The Craft
```

### 4.3 PDP — bagian paling berdampak

```
Breadcrumb [kode]
GALERI (kiri 60%)                      | INFO (kanan 40%, sticky)
Grid 2 kolom, bukan carousel           | Eyebrow: HAND-KNIT / CIELO TROPICO
(Uniqlo & H&M pakai grid: lebih        | H1 nama produk, tanpa warna
banyak terlihat, klik lebih sedikit)   | Rating + jumlah review -> jump link
Wajib ada: 1 detail shot jahitan,      | Harga (+ strikethrough kalau sale)
1 shot dipakai model full body,        | Swatch warna, nama warna tampil
1 flat lay                             | Size XS-S / M-L + link [Size guide] [kode]
                                       | Status stok: "Only 2 left"
                                       | [ Add to cart ]  + wishlist
                                       | Estimasi kirim + retur, satu baris
                                       | Ikon pembayaran
                                       | Craft spec strip
                                       | Accordion: Description / Fit & sizing (tabel +
                                       | ukuran model) / Craft & materials / Care /
                                       | Shipping & returns
Shop the set - pasangan produk + harga bundle [kode]
You may also like - 4 produk (PERBAIKI blok yang sekarang kosong)
Reviews dengan foto
Sticky add-to-cart bar di mobile [kode]
```

### 4.4 Cart drawer

Tambahkan: **progress bar gratis ongkir** ("Rp 340.000 lagi untuk gratis ongkir", pakai currency market aktif), cross-sell 2 produk, catatan retur, opsi gift note. Cart drawer Horizon sudah ada, tinggal ditambah blok.

### 4.5 Halaman baru yang perlu dibuat

| Halaman | Tujuan | Prioritas |
|---|---|---|
| **The Craft** (`/pages/the-craft`) | Proses, foto artisan, benang, waktu pengerjaan — mesin konversi + SEO | P0 |
| **Size Guide** (ditulis ulang jadi HTML) | Tabel, cara ukur, catatan stretch; dipakai juga di drawer PDP | P0 |
| **Stockists** (jadi page, bukan blog post) | Trust + SEO lokal Bali | P1 |
| **Journal** (3–4 artikel: what to pack for Bali, cara merawat rajut, artisan spotlight) | SEO organik + isi email | P2 |
| **Care & Repair** | Justifikasi klaim "kept for years, not seasons" | P2 |

---

## 5. Copywriting — siap tempel

### 5.1 Voice guide (4 aturan)

1. **Angka mengalahkan kata sifat.** "Two days on the needles" > "crafted with love". Brand ini punya fakta produksi yang langka — pakai.
2. **Nol frasa mati.** Blacklist: *elevate your wardrobe, effortlessly chic, must-have, timeless elegance, indulge, embrace, curated collection, luxury redefined.*
3. **Jujur soal produk.** Kalau sheer, bilang sheer. Kejujuran menjual barang harga tinggi dan menekan retur.
4. **Tombol memakai kata kerja yang menjelaskan akibatnya.** "Add to cart", bukan "Submit". Nama aksi konsisten dari tombol sampai notifikasi.

### 5.2 Announcement bar (3 pesan rotasi)

```
Free shipping across Indonesia · Worldwide free over USD 200
Hand-knit in Bali, in batches of twelve
Sizing questions? Chat with us on WhatsApp before you order
```
Untuk pengunjung Indonesia, ganti threshold jadi IDR lewat Shopify Markets, jangan campur USD dengan harga IDR.

### 5.3 Hero

**Opsi A (rekomendasi — fakta + tempat)**
> H1: **Hand-knit in Bali, two days at a time**
> Sub: Small-batch resortwear made by artisans we know by name. Twelve pieces per style, then it's gone.
> CTA utama: `Shop Cielo Tropico` · CTA sekunder: `See how it's made`

**Opsi B (lebih editorial)**
> H1: **Made slowly, for the long evenings**
> Sub: Hand-knit and crochet pieces from Bali. One artisan, two days, one dress.

**Opsi C (mempertahankan bahasa brand yang sudah ada)**
> H1: **Goddess silhouettes, made stitch by stitch**
> Sub: Hand-knit in small batches in Bali. Built to be worn for years, not seasons.

Yang penting: ini harus jadi `h1` asli, bukan `h5` seperti sekarang.

### 5.4 Judul section homepage

| Sekarang | Ganti jadi | Subline |
|---|---|---|
| (tidak ada) | **Shop by category** | — |
| Back In Stock | **Back in stock** | Restocked this week. Batches of twelve rarely last the month. |
| Best Sellers | **Best sellers** | Ranked by what actually leaves first. |
| (tidak ada) | **Twelve at a time** | Every piece is knit by hand in Bali. Here's what that means. |
| (tidak ada) | **Wear it as a set** | Top and skirt made from one dye lot. Buy the pair, save 10%. |
| (tidak ada) | **What people say** | — |

### 5.5 Craft band (angka — isi dengan data asli dari owner)

```
2 days        One artisan, one dress, start to finish
12 pieces     The size of a single batch
9 artisans    In two villages, paid per piece, not per hour
```
Wajib diverifikasi ke owner sebelum publish. Kalau angkanya tidak akurat, jangan dipakai — klaim palsu adalah risiko brand *dan* risiko hukum.

### 5.6 Template deskripsi PDP

Struktur baku untuk semua produk:

```
[Eyebrow]      HAND-KNIT · CIELO TROPICO
[Hook]         2 baris. Apa barangnya + kapan dipakai. Tanpa kata sifat kosong.
[4 bullet]     Craft fact · Detail fit · Bahan · Catatan jujur (sheer/stretch/lining)
[Accordion]    Description · Fit & sizing · Craft & materials · Care · Shipping & returns
```

**Contoh jadi — Zaye (sebelum: satu paragraf 90 kata, identik dengan meta description):**

> **Zaye Hand-Knit Maxi Dress**
> *HAND-KNIT · CIELO TROPICO*
>
> Two days on the needles, then it skims wherever you happen to have curves. Open back, raisin beads, straps you can set yourself — made for the part of the evening that runs long.
>
> - Knit entirely by hand by one artisan over two days
> - Adjustable back straps, so one size covers a real range
> - Lightly sheer — reads beautifully at golden hour, and you'll want something underneath for dinner
> - 100% rayon, hand-knit in Bali. Colour: Cocoa
>
> **Fit & sizing** — True to size with generous stretch; the knit adapts to your shape, so each size spans a wider range than usual. XS-S fits AU 6–10, M-L fits AU 10–14. Sydney wears XS-S — height 170 cm, bust 83, waist 62, hip 89.
> **Craft & materials** — 100% rayon yarn, hand-knit in Bali. Raisin beads set into the open back by hand. Made in batches of twelve, so slight variation between pieces is normal — and the point.
> **Care** — Hand wash cold. Don't wring, don't tumble dry. Dry flat, store folded.
> **Shipping & returns** — Free shipping across Indonesia. Ships in 1–2 business days. 14-day returns on unworn pieces.

**Contoh set — Amara (Top + Wrap Skirt):**
> **Wear it as a set** — Amara Top and Amara Wrap Skirt are knit from the same dye lot, so the beige matches exactly. Rp 1.898.000 separately, Rp 1.708.000 as a set.

### 5.7 Size Guide (ganti 2 file gambar dengan ini)

> **Sizing, honestly**
> We make two sizes, and that's deliberate. Every piece is hand-knit in stretch rayon, so one size covers a wider range than woven clothing does.
>
> | Size | Fits bust | Fits waist | Fits hip | Roughly |
> |---|---|---|---|---|
> | XS-S | 78–88 cm | 58–68 cm | 84–94 cm | AU 6–10 / US 2–6 / EU 34–38 |
> | M-L | 88–98 cm | 68–78 cm | 94–104 cm | AU 10–14 / US 6–10 / EU 38–42 |
>
> **How to measure** — Bust: around the fullest part, tape level. Waist: the narrowest point, usually just above the navel. Hip: around the fullest part, feet together.
> **Between sizes?** Size down for a sculpted fit, up for a relaxed one. The knit will do the rest.
> **Still unsure?** Message us on WhatsApp with your measurements. We'll tell you honestly which one to take — and we'd rather do that than process a return.

Angka di tabel di atas adalah **placeholder** — ambil angka final dari dua file JPG size guide yang sudah ada, lalu ganti.

### 5.8 Our Story — tambahkan penutup (copy yang ada sudah kuat, jangan dihapus)

> **Made by nine people, not a factory**
> Our knitters work from their homes in two villages outside Ubud, paid per piece. A dress takes two days. That's why we make twelve at a time, and why the next batch is worth waiting for.
>
> `Read how a piece is made` · `Shop the current batch`

### 5.9 Newsletter

**Judul:** First look at the next batch
**Body:** Twelve pieces per style, and the list hears first. Sign up for 10% off your first order.
**Tombol:** `Get 10% off`
**Setelah submit:** `Check your inbox — your code is on the way.`

Popup: tampilkan pada 25% scroll atau exit intent, **jangan** pada 2 detik pertama.

### 5.10 Cart & state kosong

- Cart kosong: **"Nothing here yet."** / `Shop the current batch`
- Progress ongkir: **"Rp 340.000 away from free shipping"** → setelah tercapai: **"Free shipping unlocked."**
- Cross-sell di cart: **"Goes with this"**
- Sold out: badge **"Sold out"** + tombol **"Notify me when it's back"** → konfirmasi: **"We'll email you the day it returns."**

### 5.11 Meta title & description (tempel langsung ke Shopify SEO fields)

| Halaman | Title (≤60 kar.) | Description (≤155 kar.) |
|---|---|---|
| Homepage | `Lisandra The Label — Hand-Knit Resortwear Made in Bali` | `Hand-knit and crochet resortwear made in small batches by Balinese artisans. Twelve pieces per style. Free shipping across Indonesia.` |
| /collections/all | `Shop All — Hand-Knit Resortwear \| Lisandra The Label` | `Every piece we make: hand-knit dresses, sets, tops and swim from Bali. Small batches, ethically made, shipped worldwide.` |
| /collections/dresses | `Hand-Knit & Crochet Dresses \| Lisandra The Label` | `Knit maxi and mini dresses hand-made in Bali. Two days per piece, twelve per batch. Free shipping across Indonesia.` |
| Sets | `Matching Knit Sets — Top & Skirt \| Lisandra The Label` | `Hand-knit two-piece sets from one dye lot, so the colour matches exactly. Buy the pair and save 10%.` |
| Swim | `Crochet & Knit Swimwear Made in Bali \| Lisandra The Label` | `Hand-crocheted bikinis and swim pieces made in small batches in Bali. Mix your own top and bottom sizes.` |
| Best Sellers | `Best Sellers — Most-Wanted Knit Pieces \| Lisandra The Label` | `The styles that leave first. Hand-knit in Bali in batches of twelve, restocked when the artisans finish the next run.` |
| Our Story | `Our Story — Made by Nine Artisans in Bali` | `Lisandra is a Bali-born resortwear label. Every piece is hand-knit or crocheted in small batches by artisans we know by name.` |
| Zaye (contoh produk) | `Zaye Hand-Knit Maxi Dress — Cocoa \| Lisandra` | `A hand-knit maxi with an open back and adjustable straps. Two days per piece, 100% rayon, made in Bali. Free shipping in Indonesia.` |

Hapus juga `meta description: Test` di Our Story dan isi meta description Size Guide.

### 5.12 Alt text

Aturan: `[nama produk], [warna], [konteks foto]`. Contoh: `Zaye hand-knit maxi dress in cocoa, open back detail`. Hapus semua alt text berisi nama file dan typo (`FOr Mentari Long Dress`, `For Aruna Skirt`) serta keyword stuffing (`shimmering knit set handmade resortwear bali`).

### 5.13 Alur email (Shopify Email atau Klaviyo)

| Flow | Timing | Sudut copy |
|---|---|---|
| Welcome (1 email) | langsung | Kode 10% + satu paragraf soal batch dua belas + 3 best seller |
| Abandoned cart | 1 jam / 24 jam | Email 1: "Still deciding on the size?" + link size guide + WhatsApp. Email 2: peringatan stok batch, bukan diskon |
| Back in stock | otomatis | "The next batch is finished" |
| Post-purchase | H+1 | "How it was made" + cara perawatan — turunkan retur, naikkan attachment |
| Review request | H+10 | Minta foto, tawarkan diskon untuk order berikutnya |
| Win-back | H+60 | Batch baru, bukan diskon |

### 5.14 Bahasa Indonesia

Situs sekarang 100% Inggris. Untuk market Indonesia, tambahkan Bahasa Indonesia lewat **Shopify Markets + Translate & Adapt**: minimal untuk PDP, size guide, ongkir/retur, dan checkout. Pembeli lokal di rentang Rp 1–2 juta membaca kebijakan retur sebelum bayar — kalau hanya ada dalam bahasa Inggris, sebagian akan mundur.

---

## 6. Perbaikan katalog & merchandising

Bagian ini tidak butuh desain sama sekali, dan efeknya ke revenue paling cepat.

### 6.1 Gabungkan warna jadi variant (P0)

| Produk terpisah sekarang | Jadi |
|---|---|
| `amara-top` (Beige) + `amara-top-1` (Black) | 1 produk, opsi Color: Beige / Black |
| `amara-wrap-skirt` + `amara-wrap-skirt-black` | 1 produk |
| `tala-mini-skirt` (Butter) + `tala-mini-skirt-ivory` | 1 produk |
| `for-mentari-long-dress` (Butter) + `mentari-dress-ivory` | 1 produk |

Manfaat: swatch warna native Horizon aktif, satu URL mengumpulkan seluruh SEO & review, sinyal best-seller tidak terpecah, dan **inkonsistensi harga hilang** (sekarang Amara Top Beige Rp 899.000 sementara Amara Top Black Rp 599.000 — pembeli akan menganggap yang beige kemahalan atau ada error).
Wajib: pasang **301 redirect** dari handle yang dihapus.

### 6.2 Rapikan penamaan produk (konvensi Uniqlo)

`[Nama] + [Teknik] + [Silhouette]`, warna jadi variant:

| Sekarang | Jadi |
|---|---|
| Zaye Dress Cocoa / Zaye Knit Long Dress | **Zaye Hand-Knit Maxi Dress** |
| Amara Top Black | **Amara Hand-Knit Top** |
| Baia Crochet Top | **Baia Crochet Top** (sudah benar) |
| For Aruna Skirt | **Aruna Knit Skirt** |
| Tala Mini Skirt Butter Yellow | **Tala Hand-Knit Mini Skirt** |

Nama SEO title dan judul yang tampil harus sama.

### 6.3 Product type & handle

- **Product type** yang benar: `Dress`, `Top`, `Skirt`, `Shorts`, `Set`, `Bikini Top`, `Bikini Bottom`, `Cover-up`. Sekarang filter hanya menampilkan 4 tipe, jadi Shorts dan Set tidak bisa difilter sama sekali.
- **Handle koleksi** harus cocok dengan labelnya: `SETS` sekarang mengarah ke `/collections/top` — ganti jadi `/collections/sets`, `bottom` → `bottoms`. Pasang 301 untuk yang lama.
- **Verifikasi** `/collections/cielo-tropico` vs `/collections/cielo-tropico-collection` — hero dan menu memakai handle berbeda. Salah satu berpotensi 404.

### 6.4 Metafield yang perlu dibuat (product metafields)

| Metafield | Tipe | Dipakai untuk |
|---|---|---|
| `craft_spec` | single line text | Craft spec strip di card & PDP |
| `days_to_make` | integer | Craft band, PDP |
| `batch_size` | integer | Scarcity yang jujur |
| `model_height` / `model_size` / `model_measurements` | text | Data fit di card & PDP |
| `fit_notes` | rich text | Accordion Fit & sizing |
| `pairs_with` | product reference (list) | Shop the set |
| `sheerness` | text (Opaque / Semi-sheer / Sheer) | Kejujuran fit; menurunkan retur |
| `yarn` | text | Craft & materials |

Metafield ini yang membuat card produk terasa "bukan template" — isinya data nyata, bukan dekorasi.

### 6.5 Bundling set (pendorong AOV terbesar)

Pasangan yang sudah ada di katalog dan belum dibundel: Amara (top+skirt), Tala (top+skirt), Maia (top+skirt), Cieli (top+skirt), Baia (top+shorts), Sira (top+skirt), Aruna (top+skirt), Orla (bikini top+bottom), Zena (bikini top+bottom).

Implementasi: **Shopify Bundles (app native, gratis)** untuk membuat produk set dengan diskon 10%, plus blok "Wear it as a set" di PDP yang memakai metafield `pairs_with`. Untuk swim, pertahankan penjualan terpisah (pembeli sering butuh ukuran atas/bawah berbeda) tapi tawarkan "Buy as a set" di PDP.

### 6.6 Strategi diskon (perbaikan brand + margin)

Sekarang: 9 dari 31 produk diskon, sampai −50%, bercampur di grid utama, tanpa tanggal akhir. Untuk brand yang mengklaim *"kept for years, not seasons"*, ini kontradiktif dan melatih pelanggan menunggu.

Yang saya sarankan:
1. Pindahkan semua item markdown ke koleksi **Archive** terpisah, keluar dari grid utama.
2. Batasi maksimal 20–30% off untuk item reguler; simpan diskon dalam untuk sample sale bertanggal.
3. Ganti diskon permanen dengan **scarcity yang jujur** ("Batch of twelve. Four left.") — untuk produk handmade, ini lebih kuat daripada potongan harga, dan tidak memakan margin.
4. Perbaiki dulu inkonsistensi Amara Beige/Black sebelum apa pun.

### 6.7 Sort & tata grid

- `/collections/all` → sort **Manual**, kurasi 8 produk pertama: full price, foto terbaik, ada stok.
- Aktifkan "Sold out products to the end of the collection".
- Semua koleksi kategori → sort Manual atau Best selling, bukan Alphabetically.

---

## 7. Stack app & checkout

### 7.1 App yang dibutuhkan (jaga tetap tipis)

| Fungsi | Rekomendasi | Catatan |
|---|---|---|
| Review + foto | Judge.me atau Loox | **Wajib cek dukungan Horizon** — Horizon pakai web components + Shadow DOM, banyak app lama gagal hook ke variant picker |
| Bundles | **Shopify Bundles** (native, gratis) | Hindari app pihak ketiga kalau native cukup |
| Back in stock | Shopify native / app ringan | Kritis untuk small batch |
| Email | Shopify Email (murah) atau Klaviyo (kalau mau flow serius) | Mulai dari Shopify Email, migrasi kalau list >2.000 |
| Wishlist | app ringan | P1 |
| Size chart | fitur native Horizon | Jangan pakai app kalau tema sudah punya |
| Translasi | Translate & Adapt (native) | Untuk Bahasa Indonesia |

Aturan: setiap app menambah beban JS. Kalau bisa dikerjakan dengan blok tema, kerjakan dengan blok tema.

### 7.2 Checkout & pembayaran (perlu diverifikasi di admin)

Ini harus dicek langsung di admin — saya tidak bisa melihat setting checkout dari luar:

- **Metode pembayaran lokal:** pembeli Indonesia mengharapkan **QRIS, transfer/VA, GoPay/OVO/ShopeePay**, dan sebagian besar mengharapkan opsi COD. Shopify Payments tidak tersedia di semua wilayah — verifikasi gateway aktif (Midtrans / Xendit / DOKU adalah jalur umum untuk merchant ID) dan pastikan QRIS aktif. Kalau pengunjung ID hanya melihat form kartu kredit, kebocoran di checkout akan besar.
- **Internasional:** kartu + PayPal + Shop Pay (jika tersedia), dan tampilkan estimasi bea masuk untuk pengiriman ke luar negeri.
- **Shopify Markets:** harga IDR untuk Indonesia, USD untuk internasional, dengan threshold ongkir yang cocok per market (jangan campur seperti announcement bar sekarang).
- **Tampilkan ikon pembayaran** di PDP dan footer. Di harga Rp 1–2 juta, ini bukan dekorasi.

---

## 8. Cara kerja tanpa merusak store live

### 8.1 Soal "free trial sebelum deploy" — ada koreksi penting

Free trial Shopify (3 hari gratis, lalu $1/bulan untuk 3 bulan) itu untuk **store baru**. Kalau kita pakai itu, kita dapat store kosong tanpa 31 produk Lisandra, tanpa foto, tanpa order history — jadi tidak cocok untuk pekerjaan ini.

Yang benar untuk store yang sudah jalan, dan ini **gratis dan tanpa batas waktu**:

```
1. Online Store -> Themes -> [...] -> Duplicate
   -> "Lisandra v2 - WIP". Tema live tidak tersentuh.
2. Kerjakan semua layouting, blok, dan kode di tema duplikat.
3. Bagikan "Preview" link ke owner untuk approval
   (tema unpublished bisa dipreview lewat link tanpa perlu di-publish).
4. Semua perubahan katalog (variant, nama produk, metafield, sort)
   memang berlaku ke store live -> jadi lakukan bertahap, di jam sepi,
   dan mulai dari yang tidak merusak (metafield, alt text, meta title).
5. Publish tema baru saat approved. Simpan tema lama sebagai rollback.
```

Kalau butuh sandbox betulan yang benar-benar terpisah (untuk uji app atau perubahan katalog yang berisiko), jalurnya adalah **development store** lewat akun Shopify Partners — gratis, dan produk bisa diimpor lewat CSV export dari store live.

Ringkasnya: **tidak perlu bayar apa pun untuk fase build.** Yang tetap perlu diperhatikan: sebagian pekerjaan (katalog) tidak bisa disandbox, jadi butuh urutan yang hati-hati.

### 8.2 Daftar tugas untuk Claude extension di Chrome

Saya tidak bisa login ke admin, jadi ini yang perlu dikerjakan/diverifikasi lewat browser. Urutkan dari atas:

**Verifikasi (sebelum menyentuh apa pun):**
1. Konfirmasi nama & versi tema di Online Store → Themes (apakah Horizon, dan preset mana).
2. Cek `/collections/cielo-tropico` **dan** `/collections/cielo-tropico-collection` — mana yang 404.
3. Screenshot tampilan mobile: homepage, PLP, PDP, cart drawer, checkout step 1.
4. Cek Settings → Payments: gateway aktif, apakah QRIS/VA/e-wallet/COD tersedia.
5. Cek Settings → Markets: market aktif, currency, threshold ongkir per market.
6. Cek app yang terinstal (beban JS) + apakah ada app yang tidak dipakai.
7. Analytics → baseline 90 hari: sessions, conversion rate, AOV, top landing page, drop-off checkout, share mobile vs desktop, top negara.
8. Jalankan PageSpeed Insights mobile untuk homepage, PLP, PDP → catat LCP & CLS.
9. Cek apakah blok "You May Also Like" tidak terkonfigurasi atau bug tema.

**Quick win (bisa hari ini, risiko nol):**
10. Ganti meta title homepage (sekarang berisi URL) + semua meta title/description dari §5.11.
11. Hapus `meta description: Test` di Our Story.
12. Ubah default sort `/collections/all` → Manual, kurasi 8 produk pertama.
13. Aktifkan "sold out products to the end".
14. Perbaiki alt text yang typo & keyword stuffing.
15. Perbaiki handle menu `SETS` → koleksi yang benar.
16. Konfigurasi blok product recommendation di PDP supaya tidak kosong.
17. Aktifkan size chart native Horizon di PDP.

**Baru setelah itu:** duplicate tema → mulai layouting.

### 8.3 Yang perlu diminta dari owner

| Kebutuhan | Kenapa |
|---|---|
| Angka asli: hari per piece, ukuran batch, jumlah artisan | Semua copywriting craft bergantung pada ini. Jangan mengarang |
| Foto artisan & proses (5–10 frame) | Halaman The Craft + craft band. Tanpa ini, cerita brand cuma teks |
| Tabel ukuran dalam bentuk teks/angka | Untuk mengganti 2 file JPG |
| Kebijakan retur final (hari, siapa bayar ongkir) | Perlu tampil di PDP; ambiguitas membunuh konversi |
| SLA pengiriman ID & internasional | Untuk estimasi kirim di PDP |
| Testimoni/DM pembeli yang sudah ada | Jembatan sampai review app terkumpul |
| Nomor WhatsApp bisnis | Kanal konversi terbesar untuk fashion di Indonesia |
| Keputusan lisensi font (Opsi A gratis vs Opsi B berbayar) | Menentukan langkah §3.5 |
| Konfirmasi rencana perluasan size range | Dua ukuran membatasi ceiling revenue |

---

## 9. Pengukuran

### 9.1 Baseline yang harus dicatat sebelum perubahan apa pun

Sessions · conversion rate (total, mobile, desktop) · AOV · unit per order · add-to-cart rate · cart→checkout rate · checkout→purchase rate · LCP mobile · top 10 landing page · share trafik per negara · return rate per produk.

Tanpa baseline, tidak ada cara membuktikan pekerjaan ini berhasil — dan tidak ada cara mendeteksi kalau ada yang justru rusak.

### 9.2 Metrik per perubahan

| Perubahan | Metrik utama | Ekspektasi arah |
|---|---|---|
| Warna → variant + swatch | PDP → add-to-cart rate | naik |
| Bundle set | unit per order, AOV | naik |
| Size guide di PDP + fit data | return rate, add-to-cart | retur turun |
| Review | conversion rate | naik |
| Cross-sell aktif | unit per order | naik |
| Hero lebih ringan | LCP mobile, bounce | LCP turun |
| Perbaikan SEO | sesi organik, impresi | naik dalam 4–8 minggu |
| Diskon dirapikan | margin per order | naik |

### 9.3 Yang layak di-A/B test (setelah trafik cukup)

Hero: video vs still image · panjang copy PDP · posisi bundle (di atas vs di bawah fold) · scarcity jujur vs diskon · popup di 25% scroll vs exit intent.

---

## 10. Rencana kerja

| Minggu | Fokus | Output |
|---|---|---|
| **1** | Verifikasi + quick win + baseline | Item 1–17 di §8.2 selesai. Tema duplikat siap. Baseline tercatat |
| **2** | Katalog | Warna digabung jadi variant + 301, penamaan produk, product type, metafield, handle koleksi, sort |
| **3** | Sistem desain | Font terpasang, palet, spacing, product card baru, header/mega menu |
| **4** | PDP | Layout baru, size chart, accordion, stok, estimasi kirim, cross-sell, sticky ATC mobile |
| **5** | PLP + homepage | Filter, breadcrumb, tile editorial, urutan section homepage baru, craft band |
| **6** | Konten & copy | Semua copy §5 masuk, halaman The Craft, Size Guide HTML, Stockists |
| **7** | Konversi | Bundle, review app, back-in-stock, wishlist, progress bar cart, popup, alur email |
| **8** | QA + publish | QA mobile, uji checkout end-to-end, PageSpeed, publish, jaga tema lama untuk rollback |
| **9–12** | Iterasi | Kumpulkan review, A/B test, Bahasa Indonesia, artikel Journal, laporan hasil vs baseline |

### 10.1 Kalau waktunya cuma satu minggu

Urutan ini saja sudah memberi porsi terbesar dari hasil: **§6.1 (warna jadi variant) → §6.7 (sort) → size chart di PDP → perbaiki cross-sell kosong → §5.11 (meta title) → bundle set → install review app.** Semuanya bisa dikerjakan tanpa menyentuh satu baris CSS.

### 10.2 Risiko

| Risiko | Mitigasi |
|---|---|
| Merge konflik saat update tema Horizon | Semua CSS custom di 1–2 file; catat setiap override |
| App review/upsell tidak kompatibel Horizon (Shadow DOM) | Uji di tema duplikat sebelum beli |
| Menggabungkan produk memutus link lama (iklan, IG bio, DM) | 301 redirect wajib; perbarui link di bio & katalog iklan |
| Klaim craft tidak akurat | Verifikasi semua angka ke owner sebelum publish |
| Foto tidak cukup untuk layout editorial | Horizon sangat bergantung pada kualitas foto — kalau foto kurang, kurangi section editorial, jangan paksakan |
| Perubahan katalog tidak bisa disandbox | Kerjakan bertahap di jam sepi, satu jenis perubahan per sesi |

---

## Lampiran: yang belum bisa saya verifikasi dari luar

1. Nama & versi preset tema yang tepat (indikatornya kuat mengarah ke Horizon, tapi konfirmasi lewat admin).
2. Isi halaman FAQs & Contact.
3. Gateway pembayaran & metode yang aktif.
4. Setting Shopify Markets & currency.
5. Level stok per varian (mempengaruhi copy scarcity).
6. Angka di dua file gambar size guide.
7. Apakah `/collections/cielo-tropico-collection` masih hidup.
8. Data analytics (conversion rate, AOV, LCP) — semua target di dokumen ini perlu dikalibrasi ulang setelah baseline masuk.
