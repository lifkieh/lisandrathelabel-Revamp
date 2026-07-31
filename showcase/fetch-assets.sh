#!/usr/bin/env bash
#
# fetch-assets.sh — OPSIONAL.
#
# Semua mockup di versions/ meng-hotlink foto dari CDN Lisandra (butuh internet).
# Skrip ini mengunduh gambar-gambar itu ke showcase/assets/ lalu membuat salinan
# offline di showcase/versions-offline/ dengan URL yang sudah di-rewrite ke path lokal.
#
# - File asli di versions/ TIDAK disentuh.
# - Showcase tetap jalan tanpa skrip ini. Setelah dijalankan, buka dengan ?offline=1
#   (mis. http://localhost:8000/index.html?offline=1) untuk memakai gambar lokal.
#
# Butuh: bash, curl, sed, grep, dan salah satu dari sha1sum/shasum.
#
set -euo pipefail
cd "$(dirname "$0")"          # -> showcase/

SRC=versions
OUT=versions-offline
ASSETS=assets

command -v curl >/dev/null || { echo "curl tidak ditemukan."; exit 1; }

mkdir -p "$OUT" "$ASSETS"

hash_of() {
  printf '%s' "$1" | { if command -v sha1sum >/dev/null 2>&1; then sha1sum; else shasum; fi; } | cut -c1-16
}

localname() {
  local url="$1" base ext
  base="${url%%\?*}"          # buang query string
  ext="${base##*.}"
  case "$ext" in
    jpg|jpeg|png|webp|gif|svg|avif) : ;;
    *) ext=img ;;
  esac
  printf '%s.%s' "$(hash_of "$url")" "$ext"
}

# Hanya URL yang jelas gambar (hindari me-rewrite link nav ke domain yang sama).
IMG_RE='https://lisandrathelabel\.com[^"'"'"' )]+\.(jpg|jpeg|png|webp|gif|avif|svg)(\?[^"'"'"' )]*)?'

mapfile -t URLS < <(grep -rhoE "$IMG_RE" "$SRC" | sort -u)
echo "Menemukan ${#URLS[@]} URL gambar unik."

# 1) Unduh (lewati yang sudah ada)
for url in "${URLS[@]}"; do
  fn="$(localname "$url")"
  if [ ! -f "$ASSETS/$fn" ]; then
    echo "  unduh -> $fn"
    curl -fsSL "$url" -o "$ASSETS/$fn" || echo "  (GAGAL: $url)"
  fi
done

# 2) Salin versi apa adanya ke versions-offline/ (jangan sentuh versions/)
for f in "$SRC"/*.html; do
  cp "$f" "$OUT/$(basename "$f")"
done

# 3) Rewrite URL -> path lokal di salinan offline saja
for url in "${URLS[@]}"; do
  fn="$(localname "$url")"
  esc_url=$(printf '%s' "$url" | sed -e 's/[\/&|]/\\&/g')   # aman untuk sed (delimiter |)
  rep="../$ASSETS/$fn"
  for f in "$OUT"/*.html; do
    sed -i "s|$esc_url|$rep|g" "$f"
  done
done

echo "Selesai."
echo "  Gambar : $ASSETS/"
echo "  Offline: $OUT/  (buka showcase dengan ?offline=1)"
