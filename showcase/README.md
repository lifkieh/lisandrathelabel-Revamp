# Showcase multi-versi — Lisandra The Label

Halaman statis untuk memperlihatkan beberapa versi desain storefront ke owner brand,
supaya bisa berpindah antar versi dan membandingkannya. Vanilla HTML/CSS/JS — tanpa
framework, tanpa build step, tanpa dependency.

Tiap versi dirender di dalam `<iframe>` sendiri, jadi CSS antar versi tidak bertabrakan
dan file versi tidak perlu diubah sama sekali.

## Menjalankan

Dua cara:

- **Double-click** `index.html`. _Catatan:_ di beberapa browser, `file://` memblokir
  `fetch()` sehingga `versions.json` gagal dimuat. Kalau halaman kosong, pakai cara kedua.
- **Server lokal** (disarankan):

  ```bash
  cd showcase
  python3 -m http.server 8000
  # buka http://localhost:8000/
  ```

Gambar di mockup di-hotlink dari CDN Lisandra, jadi butuh internet. Untuk mode offline,
lihat [Aset offline](#aset-offline).

## Fitur

| Fitur | Cara pakai |
|---|---|
| Pilih versi | Pill v1 / v2 / v2.5 / v3 / v3.5 di top bar |
| Viewport | Desktop (100%) · Tablet (1024px) · Mobile (390px). Lebar iframe diubah **nyata**, bukan `scale()`, supaya media query dokumen versi benar-benar menyala |
| Bandingkan | Tombol **Bandingkan** → pilih 2 versi → tampil berdampingan, scroll independen. Layar sempit: tumpuk vertikal |
| Deep link | `#v2-5` buka versi itu; `#compare=v2-5,v3-5` buka mode banding. URL ikut ter-update saat ganti versi (bisa dikirim lewat WhatsApp) |
| Catatan | Tombol **Catatan** → panel kanan berisi ringkasan/tambahan/effort/risiko per versi, sumbernya `versions.json` |
| Keyboard | `←` / `→` pindah versi, `1`–`5` lompat langsung. Nonaktif saat fokus di input/iframe |
| Buka di tab baru | Membuka file versi yang sedang aktif |

Banner peringatan (semua angka masih placeholder) sengaja **selalu terlihat dan tidak
bisa ditutup**.

## Menambah versi baru

Cukup **dua langkah**, tanpa mengubah apa pun yang lain:

1. Taruh file HTML mandiri di `showcase/versions/` (punya `<style>` sendiri).
2. Tambah satu objek di `showcase/versions.json` pada array `versions`:

   ```json
   {
     "id": "v4",
     "file": "design-v4.html",
     "label": "v4",
     "sublabel": "Deskripsi singkat",
     "notes": {
       "summary": "Ringkasan versi ini.",
       "added": ["komponen baru A", "komponen baru B"],
       "effort": "perkiraan kerja",
       "risks": ["risiko kalau ada"]
     }
   }
   ```

`id` dipakai untuk deep link (`#v4`), jadi buat unik dan aman-URL (huruf/angka/`-`).
Tidak ada perubahan di `index.html`, `app.js`, atau `app.css`.

## Aset offline

`versions/` meng-hotlink foto dari CDN Lisandra. Untuk salinan offline:

```bash
cd showcase
bash fetch-assets.sh
```

Skrip mengunduh gambar ke `assets/` dan membuat salinan versi di `versions-offline/`
dengan URL yang sudah di-rewrite. File asli di `versions/` tidak disentuh. Setelah itu:

```
http://localhost:8000/index.html?offline=1
```

Tanpa `?offline=1`, showcase memakai file `versions/` (online). Skrip ini opsional —
showcase tetap jalan tanpanya.

## Deploy ke GitHub Pages

Hanya folder `showcase/` yang di-deploy, dari branch `main`, lewat GitHub Actions.
`index.html` sudah memasang `<meta name="robots" content="noindex, nofollow">` supaya
tidak terindeks Google.

1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Tambah `.github/workflows/pages.yml` (path artifact menunjuk ke folder showcase):

   ```yaml
   name: Deploy showcase to Pages
   on:
     push:
       branches: [main]
       paths: ['lisandra-theme/showcase/**']
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/configure-pages@v5
         - uses: actions/upload-pages-artifact@v3
           with:
             path: lisandra-theme/showcase
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

3. Push ke `main`. URL final muncul di tab **Actions** dan di **Settings → Pages**,
   biasanya `https://<user>.github.io/<repo>/`.

> Jalankan `fetch-assets.sh` sebelum deploy hanya kalau ingin gambar ikut ter-host dan
> tidak bergantung ke CDN Lisandra. Tanpa itu, halaman tetap tampil selama CDN online.
