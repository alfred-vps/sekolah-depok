# Riset SD Depok 🏫

Cari, filter, dan bandingkan SD negeri/swasta di Kota Depok. 32+ sekolah dari 9 kecamatan.

## 🔗 Tautan

- **Frontend:** https://riset-sd.pages.dev
- **Domain:** https://riset-sd.arifyahya.web.id
- **Admin:** `/admin` (password-protected)
- **Repo:** `alfred-vps/sekolah-depok`

## 🛠 Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 14.2 + TypeScript + Tailwind CSS |
| Database | Supabase (Postgres) |
| API | Cloudflare Pages Functions |
| Deploy | Cloudflare Pages |

## 📁 Struktur

```
.hermes/projects/sekolah-depok/
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
cd .hermes/projects/sekolah-depok
./deploy.sh
```

## 📊 Versi

| Versi | Stack | Deploy | Status |
|-------|-------|--------|--------|
| V1 | Static HTML | GitHub Pages | 📁 `v1-index.html` |
| V2 | Next.js (static) | Cloudflare Pages | ✅ Migrated |
| V3 | Next.js + Supabase | Cloudflare Pages | ✅ Live |
