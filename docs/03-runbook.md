# Runbook

## A. Rilis tema

```bash
# 1. pastikan bersih
shopify theme check --fail-level error

# 2. push ke tema unpublished, minta approval
shopify theme push --unpublished --theme "WIP — <nama fitur>"
shopify theme share

# 3. setelah approve: publish LEWAT ADMIN, bukan CLI
#    (supaya ada jejak siapa & kapan di Shopify activity log)

# 4. tag
git tag live-$(date +%F) && git push --tags
```

**Rollback:** tema lama jangan dihapus minimal 14 hari setelah publish.
Rollback = publish ulang tema lama dari admin. Hitungan detik, bukan menit.

## B. Update tema Horizon dari Shopify

```bash
git checkout -b horizon-upgrade/$(date +%F)
# Ambil versi Horizon terbaru sebagai tema terpisah di store, pull ke folder sementara,
# lalu diff terhadap tag `baseline-live`:
diff -ru tmp/horizon-new/ ./ | less
```

Yang perlu dicek setelah merge: 4 slot tipografi masih terhubung ke variabel kita
(`grep -rn "\-\-font" assets/*.css`), semua blok `ls-` masih terdaftar di theme editor,
dan `shopify theme check` bersih.

## C. Migrasi varian warna — TIDAK BISA DISANDBOX

Ini menyentuh data live. Urutan ini menjaga SEO dan link yang beredar di iklan/bio IG.

Produk yang digabung: `amara-top` + `amara-top-1` · `amara-wrap-skirt` + `amara-wrap-skirt-black`
· `tala-mini-skirt` + `tala-mini-skirt-ivory` · `for-mentari-long-dress` + `mentari-dress-ivory`

1. **Export CSV** semua produk sebagai backup. Simpan di luar repo.
2. Catat handle lama + URL lama + jumlah inventory per varian.
3. Di produk yang dipertahankan, tambahkan opsi **Color**, buat varian untuk warna kedua.
4. Pindahkan **inventory, SKU, barcode, harga, dan gambar** ke varian baru.
   Pastikan harga konsisten — saat ini Amara Top Beige Rp 899.000 sementara
   Amara Top Black Rp 599.000; putuskan harga finalnya sebelum migrasi.
5. Assign gambar ke varian (Horizon butuh ini agar swatch mengganti galeri).
6. Baru setelah semua benar: **archive** produk lama (jangan delete dulu).
7. Pasang **301 redirect** handle lama → handle baru di Online Store → Navigation → URL Redirects.
8. Perbarui link di: bio Instagram, katalog Meta/TikTok Shop, email yang terjadwal, Pinterest.
9. Verifikasi handle lama benar-benar redirect, bukan 404.
10. Setelah 30 hari tanpa masalah, produk lama boleh dihapus.

Kerjakan **satu pasang produk per sesi**, di jam trafik terendah.

## D. Urutan aman untuk pekerjaan katalog lain

Dari paling tidak berisiko ke paling berisiko:

1. Metafield (menambah data, tidak menghapus apa pun)
2. Alt text, meta title, meta description
3. Sort order koleksi + setting sold-out-to-end
4. Product type & tag
5. Judul produk (**setelah** memastikan handle tidak ikut berubah — Shopify tidak
   otomatis mengubah handle saat judul diubah, tapi verifikasi tetap wajib)
6. Handle koleksi (butuh 301)
7. Penggabungan varian (lihat C)

## E. Checklist QA sebelum publish

- [ ] Checkout end-to-end di mobile, sekali dengan metode pembayaran lokal (QRIS/VA)
- [ ] Cart drawer: tambah, ubah qty, hapus, progress ongkir
- [ ] PDP: ganti warna → galeri & harga ikut berubah; size sold out ter-disable
- [ ] Size chart terbuka di mobile
- [ ] Blok rekomendasi produk **terisi** (sekarang kosong di live)
- [ ] Halaman 404 & hasil pencarian kosong
- [ ] PageSpeed mobile: LCP < 2.5s di homepage, PLP, PDP
- [ ] Keyboard-only: menu, filter, swatch, size, accordion, add to cart
- [ ] Semua handle lama redirect, tidak ada 404
- [ ] Tidak ada teks placeholder yang lolos (cek: `Test`, `Lorem`, `REPLACE_WITH`)
