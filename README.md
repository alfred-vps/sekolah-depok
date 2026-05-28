# Riset SD Depok 🏫

Cari dan filter Sekolah Dasar di Kota Depok. 32+ sekolah dari 9 kecamatan.

## 📊 Versi

| Versi | Stack | Deploy | Status |
|-------|-------|--------|--------|
| **V1** | Static HTML | GitHub Pages | 📁 `v1-index.html` (arsip) |
| **V2** | Next.js 14 (static) | Cloudflare Pages | Migrasi ke V3 |
| **V3 (current)** | Next.js 14 + Supabase + CF Functions | Cloudflare Pages | ✅ Live |

## 🚀 Live

- **Frontend:** https://riset-sd.pages.dev
- **Domain:** https://riset-sd.arifyahya.web.id
- **Admin:** `/admin` (password-protected)

## 🛠 Stack

- Next.js 14.2 (static export)
- Tailwind CSS
- Supabase (database + auth)
- Cloudflare Pages + Functions

## 📦 Deploy

```bash
./deploy.sh
```

## 📁 Struktur

```
frontend/          — Next.js app
  src/app/         — Pages (main + admin)
  src/lib/         — Helpers (supabase, schools, filters)
  src/components/  — React components
  functions/       — Cloudflare Pages Functions (CRUD API)
data/schools/      — Backup data (MD files)
supabase/          — Supabase CLI config
