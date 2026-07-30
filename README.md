# lisandra-theme

Repo tema Shopify untuk **Lisandra The Label** (`lisandrathelabel.com`).
Basis: tema keluarga **Horizon**. Repo ini dimulai dari nol — kode tema belum ada di sini
dan **harus di-pull dari store** sebagai commit baseline sebelum pekerjaan apa pun dimulai.

Rencana kerja lengkap ada di [`docs/01-audit-and-plan.md`](docs/01-audit-and-plan.md).

---

## Prasyarat

- Node.js 20+
- Shopify CLI: `npm i -g @shopify/cli@latest`
- Akses Staff dengan permission **Themes** ke store Lisandra
- Git

## Setup pertama kali (sekali saja, oleh siapa pun yang punya akses admin)

```bash
git clone <repo-url> lisandra-theme && cd lisandra-theme

# 1. login
shopify auth login --store lisandrathelabel.com

# 2. lihat daftar tema, catat ID tema LIVE
shopify theme list --store lisandrathelabel.com

# 3. tarik tema live apa adanya -> ini jadi baseline
shopify theme pull --store lisandrathelabel.com --theme <ID_TEMA_LIVE>

# 4. commit baseline TANPA modifikasi apa pun
git add -A
git commit -m "chore: baseline — snapshot tema live per <tanggal>"
git tag baseline-live
git push origin main --tags
```

> ⚠️ Commit baseline harus benar-benar bersih. Kalau tercampur perubahan kita,
> kita kehilangan kemampuan diff "apa yang kita ubah vs apa yang bawaan Horizon" —
> dan merge saat Shopify merilis update Horizon akan jadi mimpi buruk.

Setelah baseline masuk, pindahkan file dari `assets/` dan `blocks/` di repo ini
ke posisinya (mereka memang sudah di path yang benar), lalu lanjut ke bagian *Alur kerja harian*.

## Alur kerja harian

```bash
git checkout -b feat/pdp-size-chart

# dev server dengan hot reload, tidak menyentuh tema mana pun di store
shopify theme dev --store lisandrathelabel.com

# push ke tema unpublished untuk review owner
shopify theme push --unpublished --theme "WIP — pdp-size-chart"
shopify theme share   # -> link preview untuk owner
```

Owner approve → merge ke `main` → publish lewat admin (bukan lewat CLI, supaya
ada jejak siapa yang publish dan kapan).

## Strategi branch

| Branch | Isi | Aturan |
|---|---|---|
| `main` | Cerminan tema yang **live** | Hanya lewat PR. Tag setiap publish: `live-YYYY-MM-DD` |
| `develop` | Integrasi semua fitur, dipush ke tema staging tetap | Boleh push langsung |
| `feat/*` | Satu section/blok per branch | Dihapus setelah merge |
| `horizon-upgrade/*` | Merge update tema dari Shopify | Lihat `docs/03-runbook.md` |

## Aturan penting

1. **Jangan pernah edit lewat Shopify code editor.** Perubahan di admin tidak masuk repo dan
   akan tertimpa pada push berikutnya. Semua perubahan kode lewat repo.
2. **Semua CSS custom kita hanya di dua file**: `assets/brand-type.css` dan `assets/brand.css`.
   Sisanya file bawaan Horizon dibiarkan sebisa mungkin utuh. Ini yang membuat upgrade tema murah.
3. **Setiap kali file bawaan Horizon terpaksa disentuh**, catat di
   `docs/02-conventions.md` bagian *Modified core files* — nama file, baris, alasan.
4. `config/settings_data.json` **tidak** di-commit dari hasil edit theme editor sembarangan;
   lihat catatan di `.gitignore`.
5. Perubahan katalog (variant, nama produk, metafield, sort) **tidak bisa disandbox** —
   itu berlaku ke data live. Urutannya ada di `docs/03-runbook.md`.

## Struktur

```
assets/brand-type.css    @font-face + override variabel tipografi Horizon
assets/brand.css         token warna, spacing, product card, PDP, craft spec strip
blocks/craft-spec.liquid Theme block: baris fakta produksi (elemen signature)
blocks/shop-the-set.liquid  Theme block: bundling set di PDP
blocks/breadcrumbs.liquid   Theme block: breadcrumb + JSON-LD
snippets/                Partial yang dipakai ulang lintas blok
docs/                    Audit, konvensi, runbook rilis
```

## Status

- [x] Repo scaffold
- [ ] Baseline tema live di-pull & di-commit
- [ ] Verifikasi nama variabel CSS Horizon (lihat komentar di `assets/brand-type.css`)
- [ ] Font terpasang
- [ ] Blok custom terdaftar & lolos `shopify theme check`
