# Changelog

## 2026-05-28 — V3.1: Rename ke Riset Sekolah

- **Rename proyek:** `sekolah-depok` → `riset-sekolah`
- **Scope diperluas:** dari SD Depok → multi-jenjang (SD, SMP, SMA) & multi-kota
- **GitHub repo:** `alfred-vps/sekolah-depok` → `alfred-vps/riset-sekolah`
- **Cloudflare Pages:** `riset-sd` → `riset-sekolah` (deploy baru)
- **Data saat ini tetap:** 32 SD Depok

## 2026-05-28 — V3: Supabase + Admin CRUD

- Migrasi data dari file MD ke Supabase (32 sekolah)
- Buat table `schools` + seed via Management API
- Admin CRUD page di `/admin` (password-protected)
- Cloudflare Pages Functions: `/api/admin/schools` (GET/POST/PUT/DELETE)
- RLS: anon read-only, admin via service_role key
- Restruktur proyek sesuai konvensi `.hermes/projects/` (LedgerSnap pattern)
- GitHub repo di-update dengan V3 full history

## 2026-05-27 — V2: Deploy ke Cloudflare Pages

- Pindah dari GitHub Pages (V1) ke Cloudflare Pages
- Upgrade dari static HTML ke Next.js 14.2 (App Router, TypeScript, Tailwind)
- Data: file markdown di `data/schools/*.md` via gray-matter
- Filter: jenis, kurikulum, biaya, lokasi, akreditasi, fasilitas, program
- Domain awal: riset-sd.pages.dev

## 2026-05-23 — V1: Static HTML (GitHub Pages)

- Halaman static HTML dengan 32 SD dari 9 kecamatan
- Deploy via GitHub Pages
- Filter sidebar + mobile overlay
