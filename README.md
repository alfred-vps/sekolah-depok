# Riset Sekolah 🏫

Cari, filter, dan bandingkan sekolah dari berbagai jenjang dan kota di Indonesia.

Mulai dari 32 SD di Depok — siap diperluas ke jenjang lain (SMP, SMA) dan kota lain.

## 🔗 Tautan

- **Frontend:** https://riset-sekolah.pages.dev
- **Repo:** `alfred-vps/riset-sekolah`
- **Admin:** `/admin` (password-protected)

## 🛠 Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 14.2 + TypeScript + Tailwind CSS |
| Database | Supabase (Postgres) |
| API | Cloudflare Pages Functions |
| Deploy | Cloudflare Pages |

## 📁 Struktur

```
.hermes/projects/riset-sekolah/
├── AGENTS.md              ← Project definition
├── CHANGELOG.md            ← Version history
├── .hermes/
│   ├── continuity.md       ← Session continuity
│   └── plans/              ← Implementation plans
├── decisions/              ← ADRs
├── docs/                   ← Architecture docs
├── references/             ← Research & references
├── artifacts/              ← Build outputs
├── data/schools/           ← Backup data (MD files)
├── supabase/               ← Supabase CLI config
├── frontend/               ← Next.js app
│   ├── src/app/            ← Pages
│   ├── src/components/     ← React components
│   ├── src/lib/            ← Helpers
│   ├── functions/          ← Cloudflare Pages Functions
│   └── package.json
└── deploy.sh               ← Build + deploy script
```

## 🚀 Deploy

```bash
cd .hermes/projects/riset-sekolah
./deploy.sh
```

## 📊 Versi

| Versi | Stack | Deploy | Scope |
|-------|-------|--------|-------|
| V1 | Static HTML | GitHub Pages | SD Depok |
| V2 | Next.js (static) | Cloudflare Pages | SD Depok |
| V3 | Next.js + Supabase | Cloudflare Pages | SD Depok |
| V3.1 | Next.js + Supabase | Cloudflare Pages | **Multi-jenjang & multi-kota** 🔜 |
