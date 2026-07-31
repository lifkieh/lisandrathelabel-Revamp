# Konvensi

## Prinsip utama

Horizon adalah tema yang **terus di-update Shopify**. Setiap file bawaan yang kita sentuh
adalah utang yang harus dibayar saat upgrade. Jadi urutan preferensi:

1. Setting theme editor (nol biaya upgrade)
2. Theme block baru di `blocks/` (nol biaya upgrade)
3. CSS override di `brand.css` / `brand-type.css` (biaya rendah)
4. Edit file bawaan Horizon (biaya tinggi — **wajib dicatat di bawah**)

## Penamaan

| Hal | Aturan | Contoh |
|---|---|---|
| File custom kita | prefix `brand-` | `assets/brand.css` |
| Class CSS custom | prefix `ls-` | `.ls-craft-spec` |
| Custom property | prefix `--ls-` | `--ls-cocoa` |
| Theme block | kebab-case, deskriptif | `blocks/shop-the-set.liquid` |
| Branch | `feat/`, `fix/`, `chore/`, `horizon-upgrade/` | `feat/pdp-size-chart` |

Prefix bukan kosmetik: itu yang membuat `git diff` saat upgrade tema bisa dibaca dalam
hitungan menit, bukan jam.

## Commit

Conventional commits. Scope = area toko.

```
feat(pdp): size chart drawer + fit table dari metafield
fix(plp): default sort ke manual, sold-out ke akhir
chore(seo): meta title & description semua collection
docs(runbook): urutan migrasi varian warna
```

## Metafield yang dipakai kode ini

Buat di **Settings → Custom data → Products** sebelum blok mana pun dipasang.

| Namespace.key | Tipe | Dipakai di |
|---|---|---|
| `custom.craft_spec` | Single line text | `blocks/craft-spec.liquid` |
| `custom.days_to_make` | Integer | craft-spec, craft band |
| `custom.batch_size` | Integer | craft-spec, badge scarcity |
| `custom.yarn` | Single line text | craft-spec, accordion |
| `custom.pairs_with` | Product reference (list) | `blocks/shop-the-set.liquid` |
| `custom.model_height` | Single line text | product card, PDP |
| `custom.model_size` | Single line text | product card, PDP |
| `custom.fit_notes` | Rich text | accordion Fit & sizing |
| `custom.sheerness` | Single line text | accordion; menurunkan retur |

Aturan: **kalau metafield kosong, blok tidak merender apa pun.** Jangan pernah pasang
nilai default yang mengarang — semua angka produksi harus dikonfirmasi ke owner.

## Modified core files

Setiap kali file bawaan Horizon terpaksa diubah, tambahkan baris di sini.

| File | Perubahan | Alasan | Tanggal | PR |
|---|---|---|---|---|
| `layout/theme.liquid` | tambah `<link>` ke brand-type.css & brand.css + preload 2 woff2 | tidak ada cara lain memuat CSS custom global | _belum_ | — |

## Temuan dari showcase

Catatan untuk **implementasi tema asli**, bukan untuk diperbaiki di mockup.

- **Breakpoint mobile mockup ada di `max-width: 860px`.** Akibatnya iPad portrait (820px)
  ikut mendapat grid **2 kolom** — sama seperti HP. Saat tema asli dibangun, perlu
  **breakpoint menengah** (mis. tablet) supaya tablet mendapat **3–4 kolom**, tidak jatuh
  ke layout HP. Di showcase, preset Tablet sengaja diset **1024px** (bukan 820px) agar
  tombol Desktop/Tablet/Mobile benar-benar menghasilkan tiga layout berbeda.

## Aksesibilitas — floor yang tidak boleh turun

- Kontras teks minimal 4.5:1 (`--ls-ink60` di atas putih lolos; jangan dipakai di atas `--ls-sand` untuk teks kecil)
- Semua kontrol punya `:focus-visible` yang terlihat
- Swatch & size pakai `<button>` + `aria-pressed`, bukan `<div>`
- `prefers-reduced-motion` dihormati
- Semua gambar produk punya alt deskriptif: `[produk], [warna], [konteks foto]`
