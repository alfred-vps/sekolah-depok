# Riset SD Depok — Cari & Filter Sekolah Dasar di Depok

**One-liner:** Cari, filter, dan bandingkan SD negeri/swasta di Kota Depok. 32+ sekolah dari 9 kecamatan. Lengkap dengan admin CRUD via Supabase.

**Tagline:** Temukan sekolah terbaik untuk putra-putri Anda.

## Target Audience

- **Orang tua** di Depok yang mencari SD untuk anaknya (intake 2028)
- **Masyarakat** yang ingin membandingkan biaya, akreditasi, kurikulum, dan fasilitas SD

## Brand Identity

- **Nama:** Riset SD Depok
- **Domain:** riset-sd.pages.dev / riset-sd.arifyahya.web.id
- **Warna:** Blue-600 (#2563EB) primary, gray background
- **Font:** Sistem font stack

## Architecture (Cloudflare + Supabase)

```
[Browser] ← Static Next.js → [Cloudflare Pages] → [Supabase DB]
                                    ↓
                     [Cloudflare Pages Functions]
                     /api/admin/schools (CRUD)
```

- **Frontend:** Next.js 14.2 (App Router, TypeScript, Tailwind CSS) — static export
- **Data:** Supabase table `schools` (32 records, RLS enabled)
- **API:** Cloudflare Pages Functions — CRUD proxy ke Supabase
- **Auth:** Password-based admin (`X-Admin-Key` header)
- **Build:** Static export — data di-fetch build-time dari Supabase
- **Deployment:** `wrangler pages deploy` — manual via `deploy.sh`

## Features

1. **Filter multidimensi:** jenis, kurikulum, biaya, lokasi, akreditasi, fasilitas, program
2. **Search:** cari nama/deskripsi/lokasi
3. **Admin CRUD:** `/admin` — tambah, edit, hapus sekolah (password-protected)
4. **32 SD:** 9 negeri + 23 swasta, tersebar di 9 kecamatan

## Key Decisions

- **Static export** — performa maksimal, data di-bake di build-time
- **Supabase** — database serverless, RLS untuk keamanan
- **Cloudflare Pages Functions** — API edge tanpa server

## Current Status

**V3 — Live.** Supabase terintegrasi, admin CRUD berfungsi, deployed ke Cloudflare Pages.
