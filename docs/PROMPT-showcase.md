# Prompt untuk Claude Code — Showcase multi-versi

Cara pakai:

```bash
cd lisandra-theme
mkdir -p showcase/versions
cp docs/design-*.html showcase/versions/     # 5 file mockup
claude
```

Lalu tempel prompt di bawah ini.

---

## PROMPT (salin mulai dari sini)

Saya butuh sebuah **showcase statis** untuk memperlihatkan beberapa versi desain storefront ke
owner brand (non-teknis), supaya dia bisa berpindah-pindah antar versi dan membandingkannya.

### Konteks

- Ini repo tema Shopify (Horizon) untuk brand resortwear Lisandra The Label. Baca `README.md`,
  `docs/01-audit-and-plan.md`, dan `docs/02-conventions.md` dulu sebelum mulai.
- Di `showcase/versions/` sudah ada beberapa file HTML mockup yang berdiri sendiri
  (masing-masing punya `<style>` sendiri, saling bertabrakan kalau digabung ke satu DOM).
- Nama file dan label yang harus tampil:

  | File | Label | Sub-label |
  |---|---|---|
  | `design-direction-v2.html` | v1 | Arah desain awal |
  | `design-v2.html` | v2 | Navbar Uniqlo + grid custom |
  | `design-v2-5.html` | v2.5 | Atelier + perbaikan seperlunya |
  | `design-v3-atelier.html` | v3 | Shopify Atelier, stock |
  | `design-v3-5.html` | v3.5 | Permak penuh |

### Yang harus dibangun

Sebuah shell di `showcase/index.html` + `showcase/app.js` + `showcase/app.css`, plus
`showcase/versions.json` sebagai satu-satunya sumber daftar versi.

**Wajib pakai `<iframe>` untuk merender tiap versi.** Jangan inline atau gabungkan HTML-nya ke
dalam satu dokumen — CSS antar versi pasti bertabrakan, dan file versi tidak boleh diubah sama
sekali. Iframe juga yang membuat simulasi lebar viewport bisa akurat.

Fitur:

1. **Top bar** berisi nama brand, pill selector versi (v1 / v2 / v2.5 / v3 / v3.5), dan kontrol
   di kanan. Sticky.
2. **Viewport switcher**: Desktop (100%), Tablet (820px), Mobile (390px). Iframe di-resize, di
   tengah, dengan bingkai tipis saat bukan desktop. Ini krusial — owner akan menilai dari HP.
3. **Mode banding**: toggle "Compare", lalu pilih dua versi → tampil berdampingan, scroll masing-
   masing independen. Di layar sempit, tumpuk vertikal.
4. **Deep link**: `#v2-5` membuka versi itu langsung; `#compare=v2-5,v3-5` membuka mode banding.
   URL ikut ter-update saat ganti versi, supaya link bisa dikirim ke owner lewat WhatsApp.
5. **Panel catatan** yang bisa dibuka-tutup di sisi kanan, isinya per versi: ringkasan, apa yang
   ditambahkan, perkiraan effort, dan daftar risiko. Sumber teksnya dari `versions.json`, bukan
   hardcode di JS.
6. **Banner peringatan** yang selalu terlihat: semua angka (rating, jumlah review, sisa stok,
   nomor batch, tabel ukuran) masih placeholder dan belum diverifikasi ke owner. Ini tidak boleh
   bisa ditutup permanen — owner harus terus melihatnya.
7. **Tombol "Buka di tab baru"** untuk versi yang sedang aktif.
8. **Keyboard**: panah kiri/kanan untuk pindah versi, angka 1–5 untuk lompat langsung.

### Batasan

- **Vanilla HTML/CSS/JS. Tanpa framework, tanpa build step, tanpa dependency.** Harus bisa dibuka
  dengan double-click `index.html` maupun lewat `python3 -m http.server`.
- **Jangan menyentuh isi file di `showcase/versions/`.** Kalau ada yang perlu diperbaiki di sana,
  laporkan ke saya, jangan diedit sendiri.
- Shell-nya harus **netral secara visual** — abu-abu/putih, sans-serif sistem, minimal. Shell tidak
  boleh terlihat seperti bagian dari desain yang sedang dinilai, karena akan mengacaukan penilaian.
- Aksesibilitas: pill selector pakai `role="tablist"`, fokus terlihat, `prefers-reduced-motion`
  dihormati, iframe punya `title`.
- Mobile: shell-nya sendiri harus tetap terpakai di layar 390px.

### Menambah versi baru

Menambah versi harus cukup dengan: taruh file HTML di `showcase/versions/`, tambah satu objek di
`versions.json`. Tidak ada perubahan lain di mana pun. Tulis ini di `showcase/README.md` beserta
contoh objeknya.

### Catatan penting soal gambar

Semua mockup meng-hotlink foto dari CDN Shopify Lisandra, jadi butuh internet. Tambahkan skrip
`showcase/fetch-assets.sh` yang mengunduh gambar-gambar itu ke `showcase/assets/` dan membuat
salinan versi offline di `showcase/versions-offline/` dengan URL yang sudah di-rewrite. Jangan
timpa file asli. Skrip ini opsional dijalankan; showcase tetap harus jalan tanpanya.

### Yang saya harapkan sebagai hasil

1. Struktur file seperti di atas
2. `showcase/README.md`: cara menjalankan, cara menambah versi, cara deploy ke GitHub Pages
3. Commit dengan pesan conventional commit
4. Setelah selesai, jalankan server lokal dan **verifikasi sendiri** dengan membuka halamannya:
   pindah versi, ganti viewport, mode banding, deep link, dan tampilan di lebar 390px. Laporkan
   apa yang kamu cek dan hasilnya.

Kerjakan bertahap: buat `versions.json` dan shell minimal dulu, pastikan iframe-nya render, baru
tambahkan viewport switcher, mode banding, deep link, dan panel catatan. Tunjukkan hasil di setiap
tahap sebelum lanjut.

## (salin sampai sini)

---

## Prompt lanjutan — menambah versi baru

> Tambahkan versi baru ke showcase: `showcase/versions/design-v4.html`, label "v4",
> sub-label "<isi>". Catatan untuk panel: ringkasan <isi>, effort <isi>, risiko <isi>.
> Ikuti prosedur di `showcase/README.md` — hanya taruh file dan tambah entri di `versions.json`,
> jangan ubah `app.js` kecuali memang tidak terhindarkan. Verifikasi dengan membuka halamannya.

## Prompt lanjutan — deploy untuk owner

> Deploy `showcase/` ke GitHub Pages lewat GitHub Actions, hanya folder itu, branch `main`.
> Tambahkan `noindex` supaya tidak terindeks Google. Beri saya URL final dan langkah yang
> perlu saya lakukan manual di setting repo.
