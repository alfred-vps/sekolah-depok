# Continuity — Riset SD Depok (sekolah-depok)

## Last Session: 2026-05-28

### Completed
- Supabase table `schools` created + seeded (32 records)
- Admin CRUD page at `/admin` (password: PASS_APPS_RISETSD)
- Cloudflare Pages Functions: `/api/admin/schools` (GET/POST/PUT/DELETE)
- RLS enabled + anon read policy
- Deploy script `deploy.sh` (build → copy functions → wrangler deploy)
- GitHub repo `sekolah-depok` sync (V1 → V3 history preserved)
- Restructured to `.hermes/projects/` convention

### Next Steps
- [ ] Custom domain provisioning (riset-sd.arifyahya.web.id)
- [ ] Connect Cloudflare Pages → GitHub for auto-deploy
- [ ] Add bulk import (upload multiple schools from CSV)

### Open Questions
- [ ] Auto-deploy from GitHub? (vs manual `deploy.sh`)
- [ ] Add school images/photos?
- [ ] Public API for the school directory?
