# Changelog

## 2026-05-28 — V3: Supabase + Admin CRUD

- Migrasi data dari file MD ke Supabase (32 sekolah)
- Buat table `schools` + seed via Management API
- Admin CRUD page di `/admin` (password-protected)
- Cloudflare Pages Functions: `/api/admin/schools` (GET/POST/PUT/DELETE)
- RLS: anon read-only, admin via service_role key
- Restruktur proyek sesuai konvensi `.hermes/projects/` (LedgerSnap pattern)
- GitHub repo `sekolah-depok` di-update dengan V3 full history

## 2026-05-27 — V2: Deploy ke Cloudflare Pages

- Pindah dari GitHub Pages (V1) ke Cloudflare Pages
- Upgrade dari static HTML ke Next.js 14.2 (App Router, TypeScript, Tailwind)
- Data: file markdown di `data/schools/*.md` via gray-matter
- Filter: jenis, kurikulum, biaya, lokasi, akreditasi, fasilitas, program
- Domain: riset-sd.pages.dev + riset-sd.arifyahya.web.id

## 2026-05-23 — V1: Static HTML (GitHub Pages)

- Halaman static HTML dengan 32 SD dari 9 kecamatan
- Deploy via GitHub Pages
- Filter sidebar + mobile overlay
