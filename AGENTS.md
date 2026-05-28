# Riset Sekolah — Cari, Filter & Bandingkan Sekolah di Indonesia

**One-liner:** Cari, filter, dan bandingkan sekolah dari berbagai jenjang (SD, SMP, SMA) dan kota/kabupaten di Indonesia. Admin CRUD via Supabase.

**Tagline:** Temukan sekolah terbaik untuk putra-putri Anda.

## Target Audience

- **Orang tua** yang mencari sekolah untuk anaknya
- **Masyarakat** yang ingin membandingkan biaya, akreditasi, kurikulum, dan fasilitas sekolah

## Brand Identity

- **Nama:** Riset Sekolah
- **Domain:** riset-sekolah.pages.dev
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
- **Data:** Supabase table `schools` (multi-jenjang, multi-kota)
- **API:** Cloudflare Pages Functions — CRUD proxy ke Supabase
- **Auth:** Password-based admin (`X-Admin-Key` header)
- **Build:** Static export — data di-fetch build-time dari Supabase
- **Deployment:** `wrangler pages deploy` — manual via `deploy.sh`

## Features

1. **Multi-jenjang:** SD, SMP, SMA — filter berdasarkan jenjang pendidikan
2. **Multi-kota:** Daftar sekolah dari berbagai kota/kabupaten
3. **Filter multidimensi:** jenis, kurikulum, biaya, lokasi, akreditasi, fasilitas, program
4. **Search:** cari nama/deskripsi/lokasi
5. **Admin CRUD:** `/admin` — tambah, edit, hapus sekolah (password-protected)

## Data Saat Ini

- **32 SD** di **Kota Depok** (9 kecamatan) — data awal, siap diperluas

## Key Decisions

- **Static export** — performa maksimal, data di-bake di build-time
- **Supabase** — database serverless, multi-tenant siap
- **Cloudflare Pages Functions** — API edge tanpa server

## Current Status

**V3 — Live.** Data awal 32 SD Depok. Scope diperluas ke multi-jenjang & multi-kota.
